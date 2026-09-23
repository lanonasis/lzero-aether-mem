# Project Summary

## Overall Goal
Debug and fix the L0 Memory browser extension's popup/sidepanel that was showing a blank white screen after building, with focus on resolving Chrome CSP (Content Security Policy) violations and extension loading issues.

## Key Knowledge

### Project Structure
- **Repo**: `/Users/onasis/dev-hub/projects/lzero-aether-mem` (monorepo with Turborepo)
- **Extension package**: `packages/web-extension/`
- **Entry points**: popup, sidepanel, options, offscreen (HTML files in `src/*/index.html`)
- **Build output**: `packages/web-extension/dist/`

### Build System
- **Vite 8.x** (rolldown-based bundler) with `@vitejs/plugin-react` and `@tailwindcss/vite`
- **React 19.3.0-canary** (version `19.3.0-canary-378973b3-20251205`)
- **Build command**: `bun run build` (in `packages/web-extension/`)
- **Dev command**: `bun run dev` (watches and rebuilds)
- **HTML path fixer**: custom Vite plugin rewrites `src="assets/...` → `src="../../assets/...` for extension-relative paths

### Architecture Decisions
- **Offscreen document** (`src/offscreen/`) handles AI inference with `@xenova/transformers` — intentionally isolated to bypass CSP restrictions for eval/WASM usage
- **Transformers.js** (`@xenova/transformers`) is only lazy-loaded in the offscreen context, NOT in popup/sidepanel (dynamic import with justification in manifest)
- **No `eval()` or `new Function()`** exists in popup/sidepanel bundles — verified exhaustively

### CSP Policy (manifest.json)
- **extension_pages**: `script-src 'self' 'wasm-unsafe-eval'; object-src 'self'` — Chrome MV3 forbids `'unsafe-eval'`
- **sandbox**: Allows `'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval'` (separate policy)
- **`<all_urls>`** in optional_host_permissions covers localhost access
- **`wasm-unsafe-eval`** covers the `@xenova/transformers` WASM JIT compilation needs

### Dev Server Connection
- Chrome DevTools Protocol (CDP) on `localhost:9222` — requires `--remote-allow-origins=*` flag
- Brave Browser runs on port 9222 for remote debugging (Brave is used as Chromium-compatible debug target)
- **Python `websocket-client`** works for CDP communication (Node 22 native WebSocket failed with 500 errors)
- CDP launches with: `--remote-debugging-port=9222 --remote-allow-origins=* --no-first-run --user-data-dir=/tmp/brave-cdp-*`
- `npx chrome-devtools-mcp@latest` has npm override conflicts that prevent installation

### Dependencies
- `@lanonasis/shared` (workspace dependency)
- `@lanonasis/mem-intel-sdk` (re-exported types)
- `idb` (IndexedDB wrapper) — no eval usage
- `@radix-ui/react-scroll-area`, `@radix-ui/react-dialog` — no eval usage
- `@tanstack/react-query` — no eval usage
- `zustand` — no eval usage
- `framer-motion` — dependency but not actually imported by extension code (dead dependency)

### File Layout (dist/)
```
dist/
├── manifest.json          # Copied from source
├── icons/                 # Copied from public/icons
├── _locales/en/messages.json
├── background/index.js    # Service worker
├── content/index.js       # Content script
└── assets/
    ├── globals-BO1ONLFb.css    # Tailwind styles
    ├── globals-BPVuqCq6.js     # React + shared deps (218KB)
    ├── shared-BneRZOwk.js      # Shared components (120KB)
    ├── popup-CmdsXRKY.js       # Popup entry (8.5KB) — CLEAN
    ├── sidepanel-DRsDacFB.js   # Sidepanel entry (25KB)
    ├── options-D_epcc9Z.js     # Options entry (18KB)
    ├── offscreen-Cq2CuxcU.js   # Offscreen (3.5KB)
    ├── transformers-B5BTZrUU.js # WASM AI model (811KB) — HAS eval
    ├── build-9_kkBp1l.js       # idb polyfill
    └── rolldown-runtime-*.js
```

### Git History (relevant)
- `cf32f63` — revert(extension): remove malformed localhost host_permissions
- `11d2e90` — fix(extension): remove unsafe-eval from CSP — relies on wasm-unsafe-eval for transformers.js
- `407e5ee` — fix(extension): add unsafe-eval to CSP and localhost host permissions (REVERTED)
- `d8fa5aa` — feat(deps): upgrade vite to 8.x across all workspace packages

### Uncommitted Changes
- `packages/shared/src/index.ts` — modified
- `packages/shared/src/types/index.ts` — modified
- `packages/web-extension/src/popup/Popup.tsx` — modified
- `packages/web-extension/src/sidepanel/SidePanel.tsx` — modified
- New components: `packages/web-extension/src/components/shared/` (scoped key dialog, welcome view, memory card, etc.)
- New UI components: `packages/web-extension/src/components/ui/dialog.tsx`, `separator.tsx`

## Recent Actions

1. **Fixed Chrome CSP error** — `'unsafe-eval'` was causing "Failed to load extension" errors. Removed it from `extension_pages` CSP, keeping only `'wasm-unsafe-eval'` which is Chrome-approved for WASM JIT compilation.

2. **Fixed malformed host permissions** — `http://localhost:*` and `ws://localhost:*` were rejected by Chrome (port wildcard `*` is invalid). Reverted to `<all_urls>` which covers localhost.

3. **Exhaustive bundle analysis** — Verified popup/sidepanel/opt/offscreen bundles have ZERO `eval()` and ZERO `new Function()` usage. Only the transformers bundle (811KB, loaded in offscreen document only) uses eval.

4. **Verified all HTML paths** resolve correctly from `dist/src/*/index.html` → `dist/assets/...`.

5. **Tried multiple CDP approaches** — Chrome/Brave with remote debugging, Python websocket-client, Node 22 native WebSocket, puppeteer — all faced port conflicts, CSP rejection, or connection refused errors.

6. **Brave CDP with `--remote-allow-origins=*`** was the working approach but had stability issues (processes killed, port 9222 conflicted with existing instances).

## Current Plan

### Status: CSP FIX COMPLETE — BLANK POPUP IS SEPARATE ISSUE

**What's resolved:**
- [DONE] Chrome CSP now loads the extension without errors
- [DONE] Manifest validation passes
- [DONE] All bundles verified clean of eval usage
- [DONE] HTML-to-asset path resolution correct

**What's unresolved:**
- [TODO] Popup shows blank screen — likely a **runtime JS crash** (not CSP-related)
- [TODO] Need to manually inspect the popup in Brave/Chrome DevTools to see console errors

**Next steps for the user:**
1. Uninstall the existing L0 Memory extension from `chrome://extensions/` (check "Also delete browsing data")
2. Load unpacked extension from `packages/web-extension/dist/` in Brave
3. Right-click the extension popup → "Inspect popup" to open DevTools
4. Check the **Console** tab for any red JavaScript error messages — this will pinpoint the crash
5. If the popup still loads blank, check the **Sources** tab to verify JS files are loaded and not blocked

**Diagnostic queries to run once CDP is accessible:**
- `Runtime.evaluate("document.title + ' | ' + window.location.href")` — page info
- `Runtime.evaluate("JSON.stringify([...document.querySelectorAll('*')].map(el => el.tagName))")` — DOM structure
- Enable `Runtime.consoleAPICalled` listener to capture runtime errors
- Enable `Runtime.exceptionThrown` listener to catch unhandled exceptions

---

## Summary Metadata
**Update time**: 2026-09-23T16:06:03.355Z
