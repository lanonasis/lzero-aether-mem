#!/usr/bin/env bash
# Launch the L0 Memory extension in a debuggable Chrome for live review.
#
# Why this exists:
#   * Chrome 137+ ignores --load-extension on branded Chrome builds, so we cannot
#     boot a throwaway profile with the unpacked extension.
#   * Chrome 136+ refuses --remote-debugging-port with the *default* user-data-dir,
#     so we cannot attach to the browser the user is already running.
#   * The workaround is to copy the profile that already has the extension
#     registered (developer mode -> Load unpacked) into a scratch dir and launch
#     from there. The copied profile keeps the extension entry, so no re-install.
#
# Usage:
#   packages/web-extension/scripts/dev-chrome.sh            # build, copy profile, launch
#   packages/web-extension/scripts/dev-chrome.sh --no-build  # reuse existing dist
#   packages/web-extension/scripts/dev-chrome.sh --open      # also open the side panel page
#
# Then point chrome-devtools-mcp at it (see ~/.pi/agent/mcp.json):
#   chrome-devtools-mcp --browserUrl http://127.0.0.1:9222
set -euo pipefail

PORT="${L0_CDP_PORT:-9222}"
PROFILE_NAME="${L0_CHROME_PROFILE:-Profile 2}"     # profile that has the unpacked extension
CHROME_SRC="$HOME/Library/Application Support/Google/Chrome"
PKG_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SCRATCH="$PKG_DIR/.dev-chrome"
DIST="$PKG_DIR/dist"

do_build=1
do_open=0
for arg in "$@"; do
  case "$arg" in
    --no-build) do_build=0 ;;
    --open) do_open=1 ;;
    *) echo "unknown flag: $arg" >&2; exit 2 ;;
  esac
done

[ "$do_build" = 1 ] && (cd "$PKG_DIR" && bun run build)

if [ ! -d "$CHROME_SRC/$PROFILE_NAME" ]; then
  echo "profile '$PROFILE_NAME' not found in $CHROME_SRC" >&2
  echo "set L0_CHROME_PROFILE to the profile that has the unpacked extension loaded" >&2
  exit 1
fi

echo "→ syncing profile '$PROFILE_NAME' into $SCRATCH"
rm -rf "$SCRATCH"
mkdir -p "$SCRATCH/Default"
rsync -a \
  --exclude 'Extensions/' --exclude 'Service Worker/' --exclude 'WebStorage/' \
  --exclude 'History*' --exclude 'Favicons/' --exclude 'Sessions*' --exclude 'DIPS*' \
  --exclude 'Extension Rules/' --exclude 'Extension Scripts/' --exclude 'Safe Browsing/' \
  --exclude 'GrShaderCache/' --exclude 'component_crx_cache/' --exclude 'Cache/' \
  "$CHROME_SRC/$PROFILE_NAME/" "$SCRATCH/Default/"
cp "$CHROME_SRC/Local State" "$SCRATCH/Local State"

echo "→ launching Chrome on :$PORT (data dir: $SCRATCH)"
pkill -f "user-data-dir=$SCRATCH" 2>/dev/null || true
sleep 1
nohup "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --user-data-dir="$SCRATCH" --profile-directory=Default \
  --remote-debugging-port="$PORT" \
  --no-first-run --no-default-browser-check \
  about:blank > "$SCRATCH/chrome.log" 2>&1 &

for i in $(seq 1 30); do
  curl -sf "http://127.0.0.1:$PORT/json/version" >/dev/null && break
  sleep 0.5
done
curl -sf "http://127.0.0.1:$PORT/json/version" >/dev/null || { echo "CDP did not come up; see $SCRATCH/chrome.log" >&2; exit 1; }

# Resolve the extension id from the profile rather than from live targets: the
# MV3 service worker is lazy, so a freshly launched Chrome usually has no target
# for our extension yet, while built-in component extensions do expose
# offscreen.html / service-worker-loader.js pages.
EXT_ID=$(python3 - "$SCRATCH/Default/Secure Preferences" "$DIST" <<'PY' 2>/dev/null || true
import json, sys
prefs, dist = sys.argv[1], sys.argv[2].rstrip('/')
try:
    data = json.load(open(prefs))
except Exception:
    sys.exit(0)
for ext_id, entry in data.get('extensions', {}).get('settings', {}).items():
    if entry.get('location') == 4 and (entry.get('path') or '').rstrip('/') == dist:
        print(ext_id)
        break
PY
)

if [ -z "$EXT_ID" ]; then
  echo "→ Chrome is up, but '$PROFILE_NAME' has no unpacked extension registered from:" >&2
  echo "    $DIST" >&2
  echo "  Load it once via chrome://extensions (Developer mode → Load unpacked), then rerun." >&2
  exit 1
fi
echo "$EXT_ID" > "$SCRATCH/ext-id"

PANEL_URL="chrome-extension://$EXT_ID/src/sidepanel/index.html"
echo "→ extension id: $EXT_ID"
echo "→ side panel:   $PANEL_URL"
echo
echo "  Spot-check from the shell:"
echo "    node packages/web-extension/scripts/l0-cdp.mjs probe"
echo "    node packages/web-extension/scripts/l0-cdp.mjs shot /tmp/panel.png"

if [ "$do_open" = 1 ]; then
  curl -sf -X PUT "http://127.0.0.1:$PORT/json/new?$PANEL_URL" >/dev/null
  echo "→ opened the side panel page in a tab"
fi
