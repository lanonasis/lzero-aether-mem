# Execution Plan: Chrome Extension Publishing — Professional & Store-Ready

_Version: 1.0 — 2026-05-08_
_Status: Ready for handoff — verified against current source_

---

## Audit: Current State vs Review Requirements

This section is ground truth. Read before touching any file. Do not re-implement what is already done.

### Already Compliant ✅

| Area | Evidence |
|------|----------|
| Manifest V3 | `"manifest_version": 3` |
| Service worker (not background page) | `"background": { "service_worker": "background/index.js", "type": "module" }` |
| Host permissions scoped, not broad | Required: `api.lanonasis.com`, `auth.lanonasis.com` only |
| `<all_urls>` is OPTIONAL | `"optional_host_permissions": ["<all_urls>"]` — user grants on demand |
| `web_accessible_resources` minimal | Only icons exposed, matched to `<all_urls>` (required for icon rendering on any tab) |
| CSP defined | `extension_pages` uses `'self' 'wasm-unsafe-eval'` (safe; wasm-unsafe-eval needed for Xenova WASM AI) |
| Storage uses `chrome.storage.local` | Auth token stored in local extension storage, not synced, not web-accessible |
| Dynamic host permission request | Options page uses `chrome.permissions.request()` for self-hosted API URLs |
| Build produces isolated entry points | Rollup outputs separate chunks: `background/index.js`, `content/index.js`, `assets/*` |
| Localization scaffolded | `_locales/en/messages.json` copied to dist |

---

## Critical Fixes — Blockers for Store Submission

These are bugs or compliance issues that will cause a store rejection or a runtime crash. Fix all of these before packaging.

### Fix 1 — XSS risk in content script notification (`src/content/index.ts`)

**Current code** uses `innerHTML` to inject the save notification and appends a second `<style>` block via `innerHTML`:

```typescript
notification.innerHTML = `<div style="..."><svg>...</svg>...</div><style>@keyframes...</style>`;
// Later:
notification.innerHTML += `<style>@keyframes slideOut...</style>`;
```

The notification content is hardcoded so this is not exploitable today. But `innerHTML +=` is a footgun — future changes that include any user-derived content (memory title, page title) would introduce stored XSS. The Chrome Web Store security review flags `innerHTML` with user-influenced content.

**Fix**: Replace with `document.createElement` + explicit DOM construction. Inject the animation CSS once via a `<style>` element appended to `document.head`:

```typescript
// inject animation CSS once per page
function ensureAnimationStyles(): void {
  if (document.getElementById('l0-memory-styles')) return;
  const style = document.createElement('style');
  style.id = 'l0-memory-styles';
  style.textContent = [
    '@keyframes l0SlideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }',
    '@keyframes l0SlideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }',
  ].join('\n');
  document.head.appendChild(style);
}

function showSaveNotification(): void {
  ensureAnimationStyles();

  const wrapper = document.createElement('div');
  wrapper.style.cssText = [
    'position:fixed', 'bottom:20px', 'right:20px',
    'background:linear-gradient(135deg,#007ACC,#0E639C)',
    'color:white', 'padding:12px 20px', 'border-radius:8px',
    'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
    'font-size:14px', 'box-shadow:0 4px 20px rgba(0,122,204,0.4)',
    'z-index:2147483647', 'display:flex', 'align-items:center', 'gap:8px',
    'animation:l0SlideIn 0.3s ease-out',
  ].join(';');

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '16');
  svg.setAttribute('height', '16');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M20 6L9 17l-5-5');
  svg.appendChild(path);

  const label = document.createTextNode('Saved to L0 Memory');
  wrapper.appendChild(svg);
  wrapper.appendChild(label);
  document.body.appendChild(wrapper);

  setTimeout(() => {
    wrapper.style.animation = 'l0SlideOut 0.3s ease-in forwards';
    setTimeout(() => wrapper.remove(), 300);
  }, 2000);
}
```

**Why `z-index: 2147483647`**: Maximum possible `z-index` value. Ensures the notification appears above all page content including modals.

---

### Fix 2 — `process.env.NODE_ENV` not replaced at compile time (`vite.config.ts`)

**Current define block**:
```typescript
define: {
  'process.env': JSON.stringify({ NODE_ENV: process.env.NODE_ENV || 'production' }),
}
```

This is the same root cause that crashed the VS Code extension webview (see `fix(vscode-extension): eliminate process is not defined`). Rollup replaces `process.env` with the JSON object literal but does NOT statically fold the resulting `{...}.NODE_ENV` property access. React's CJS dev/prod split (`process.env.NODE_ENV === "production" ?`) survives into the bundle. In VS Code's sandboxed webview this threw `ReferenceError`; in the Chrome extension context this causes React to ship both dev and prod builds, roughly doubling bundle size and degrading performance.

**Fix** (same two-layer approach as vscode-extension):

```typescript
define: {
  // Most-specific first — eliminates React CJS dev/prod splits at compile time
  'process.env.NODE_ENV': JSON.stringify('production'),
  'process.env': JSON.stringify({ NODE_ENV: 'production' }),
},
```

Add a rollup output banner as a runtime safety net:

```typescript
rollupOptions: {
  output: {
    banner: 'var process=typeof process!=="undefined"?process:{env:{NODE_ENV:"production"},platform:"browser",version:"",versions:{},browser:true,nextTick:function(cb){return setTimeout(cb,0)}};',
    // ... existing entryFileNames etc.
  },
}
```

**Verify after fix**: `grep -c "process\." dist/assets/*.js` must return 0 (or only the banner polyfill line).

---

### Fix 3 — Content script `<all_urls>` match — justify or restrict

**Current**: `"content_scripts": [{ "matches": ["<all_urls>"] }]`

The content script is 60 lines and only listens for `SAVE_SELECTION` messages from the background. It does not read or transmit page content autonomously. This is a legitimate use case (save selected text from any page), but the Chrome Web Store review team will ask for justification.

**Two options** — choose based on product decision:

**Option A — Justify (recommended for current feature set)**: Keep `<all_urls>` but prepare a justification statement for the store listing:
> "The content script listens for user-initiated text selection saves (via keyboard shortcut or context menu). It never reads page content without explicit user action and transmits only the user's selected text when they choose to save it."

**Option B — Restrict and use `scripting` API**: Remove `content_scripts` from manifest entirely. When the user triggers `save_selection`, use `chrome.scripting.executeScript` from the background instead. This requires adding `"scripting"` to permissions, but eliminates the `<all_urls>` content script declaration. Store reviewers prefer this pattern.

```typescript
// background/index.ts — replace sendMessage approach with scripting.executeScript
if (command === 'save_selection') {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab?.id) {
    const [result] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => window.getSelection()?.toString().trim() ?? '',
    });
    if (result?.result) {
      // save result.result as memory
    }
  }
}
```

If Option B is chosen, remove `content_scripts` from `manifest.json` and add `"scripting"` to `"permissions"`.

**Decision gate**: If the context menu "Save selection" is meant to work on RIGHT-CLICK (not just keyboard shortcut), Option A is simpler. If keyboard-shortcut-only, Option B is cleaner.

---

## Required for Store Submission (Non-Code)

These are not code changes but are hard requirements for the Chrome Web Store submission review.

### Privacy Policy

Must be a publicly accessible URL. Must disclose:
- What data is collected (memory entries, selected text, API key)
- Where it is stored (user's own LanOnasis account via API; local `chrome.storage.local`)
- Whether it is shared with third parties (no — except the user's own LanOnasis instance)
- How users can delete their data (via the dashboard or API)
- Contact information for privacy inquiries

**Location**: Host at `https://lanonasis.com/privacy` or a dedicated docs URL. This URL must be entered in the Chrome Web Store developer dashboard listing.

### Store Listing Assets

Prepare before submitting. Minimum required by the Web Store:

| Asset | Size | Notes |
|-------|------|-------|
| Icon | 128×128 PNG | Already in `public/icons/icon-128.png` — verify no transparency issues |
| Screenshots | 1280×800 or 640×400 | Min 1, max 5. Show: side panel with memories, context menu save, search results |
| Promotional tile (small) | 440×280 PNG | Used on the Web Store search results page |

**Screenshot recommendations** (in order of impact):
1. Side panel open with recent memories visible
2. Text selection → context menu → "Save to L0 Memory"
3. Omnibox `mem ` search returning results
4. Options page with API connection confirmed

### Store Description

Write two versions:
- **Short** (≤132 chars): `"Your AI-powered second brain for the browser. Save, search, and chat with your memory bank from any tab."`
- **Long** (≤16,384 chars): Expand on the core value proposition from `execution-plan-memory-concierge.md §What This Is`. Include: how to install, how to connect to a LanOnasis account, what the keyboard shortcuts do, a privacy statement.

### Developer Account

Register at [chromewebstore.google.com/u/0/developer/dashboard](https://chromewebstore.google.com/u/0/developer/dashboard). One-time $5 registration fee. Use a team Google account, not a personal one, if multiple people need dashboard access.

---

## Version Strategy

Current version in `manifest.json`: `0.1.0`

**Recommendation**: Ship the first public version as `0.2.0` (reflects that internal testing at `0.1.x` is complete). Reserve `1.0.0` for when the Memory Concierge feature (Phase 6 of the intelligence surfacing plan) ships — that is the full "second brain" experience.

Bump `"version"` in `manifest.json`. The Web Store uses this field; it must be higher than any previously submitted version.

**Patch cadence after launch**: Follow the same pattern as the VS Code extension — patch releases (x.x.N) for bug fixes, minor bumps (x.N.0) for new features.

---

## UI/UX Improvements

These are not blockers for store submission but are the difference between a 3-star and 5-star product.

### Onboarding Welcome Page (Priority)

`chrome.runtime.openOptionsPage()` on install opens the settings page — functional but cold. Replace with a dedicated `src/welcome/index.html` page that:
- Confirms the extension is installed
- Shows the three main actions (save selection, open side panel, omnibox search)
- Has a single CTA: "Connect your LanOnasis account" → opens options page
- Shows keyboard shortcuts

```json
// manifest.json addition
"web_accessible_resources": [
  { "resources": ["icons/*"], "matches": ["<all_urls>"] },
  { "resources": ["src/welcome/index.html"], "matches": ["chrome-extension://*/*"] }
]
```

Open on install:
```typescript
if (details.reason === 'install') {
  chrome.tabs.create({ url: chrome.runtime.getURL('src/welcome/index.html') });
}
```

### Side Panel Input Placeholder

Current: `"Ask anything or paste context to save..."`

Per Phase 6 of the intelligence surfacing plan (once `features.concierge` is enabled):
Update to: `"Ask your memory assistant..."` when concierge is active; keep current text when it's not.

This is a minor string change but signals the product's evolution to users.

### Popup Size

Current popup has no fixed dimensions declared. Add to `Popup.tsx` root element:
```typescript
<div className="w-[380px] min-h-[500px] max-h-[600px] overflow-y-auto">
```
Chrome enforces a minimum popup width of 25px and maximum of 800px. Explicitly declaring dimensions prevents layout shifts between machines with different default font sizes.

### Extension Context Menu Label

Current context menu is set up in `src/background/contextMenu.ts`. Verify the menu item label is:
- `"Save to L0 Memory"` (action-oriented, matches the VS Code extension pattern)
- NOT `"Save to LanOnasis"` or a generic label

---

## Security Hardening

### Message Validation

`src/background/index.ts` `handleMessage()` accepts messages from any sender. Content scripts are isolated, but for defense-in-depth, validate the message structure before acting:

```typescript
async function handleMessage(
  message: unknown,
  sender: chrome.runtime.MessageSender
): Promise<any> {
  // Reject messages from web pages (only accept from extension itself)
  if (sender.tab && sender.frameId === 0 && message.type !== 'CREATE_MEMORY') {
    // CREATE_MEMORY is the only message content scripts send
    return { error: 'Unauthorized message source' };
  }

  if (!message || typeof message !== 'object' || !('type' in message)) {
    return { error: 'Malformed message' };
  }

  // ... existing switch statement
}
```

### API Key Storage Key Name

Current: `chrome.storage.local.set({ authToken: ... })`

The key name `authToken` is generic. If any third-party extension somehow gets read access to storage (not possible in practice without user permission, but during security review this is noted), an attacker would know exactly what to look for.

Recommendation: namespace to `l0_auth_token`. Update in `background/index.ts`, `options/Options.tsx`, and any other read locations. This is a one-time rename, not a breaking change.

---

## Performance Checklist

The extension already uses correct patterns. Verify these hold after any changes:

- [ ] Service worker does NOT keep itself alive with a heartbeat. The MV3 service worker terminates when idle — this is correct behavior, not a bug.
- [ ] `chrome.storage.local` reads are cached in `MemoryCache` (already done in `background/cache.ts`)
- [ ] The offscreen document (Xenova AI) is created LAZILY — only on `OFFSCREEN_INIT_AI` message, never on service worker startup. Verify `hasOffscreenDocument()` guard is in place before any `getOffscreenAIStatus()` call. (Already implemented — confirm it stays this way.)
- [ ] No `console.log` in production build. The Vite build does not strip console logs by default. Add `build: { minify: 'terser', terserOptions: { compress: { drop_console: true } } }` OR remove console.log calls before the production build. The current code has multiple `console.log` calls in `background/index.ts` and `content/index.ts`.

---

## Build and Publish Workflow

### Build Command for Store Submission

```bash
# From the monorepo root
bun run --cwd packages/web-extension build:chrome
# Output: packages/web-extension/dist/

# Package as zip
bun run --cwd packages/web-extension package:chrome
# Output: packages/web-extension/lzero-memory-chrome.zip
```

Verify the zip contains:
```
manifest.json          ← must be at root, not nested
icons/                 ← icon-16.png, icon-32.png, icon-48.png, icon-128.png
background/index.js
content/index.js
assets/                ← hashed chunk files
src/popup/index.html
src/sidepanel/index.html
src/options/index.html
src/offscreen/index.html
_locales/en/messages.json
```

### Automate Publishing (CI/CD)

Use the Chrome Web Store Publish API to publish from CI once the initial listing is created manually.

**GitHub Actions example:**
```yaml
- name: Upload to Chrome Web Store
  uses: trmcnvn/chrome-addon@v2
  with:
    extension: lzero-memory-chrome.zip
    app-id: ${{ secrets.CHROME_EXTENSION_ID }}
    client-id: ${{ secrets.CHROME_CLIENT_ID }}
    client-secret: ${{ secrets.CHROME_CLIENT_SECRET }}
    refresh-token: ${{ secrets.CHROME_REFRESH_TOKEN }}
```

Required secrets: obtained from Google API Console with the Chrome Web Store API enabled.

### Staged Rollout

After the first submission is approved, all subsequent version updates can use staged rollouts:
- Go to the extension's dashboard page
- Under "Publishing", select "Staged rollout"
- Start at 10% of users for 48 hours, check for crash reports, then expand to 100%

This requires at least some existing users. Staged rollout is available only on the first update after initial publication, not on the initial submission.

---

## Acceptance Criteria

Before submitting to the Chrome Web Store, all of the following must pass:

### Code
- [ ] `src/content/index.ts` — `showSaveNotification()` uses DOM methods only, zero `innerHTML`
- [ ] `vite.config.ts` — `process.env.NODE_ENV` explicitly defined; `grep -c "process\." dist/assets/*.js` returns 0
- [ ] `src/background/index.ts` — message handler validates `typeof message === 'object' && 'type' in message`
- [ ] Auth token key renamed from `authToken` to `l0_auth_token` across all storage reads/writes

### Manifest
- [ ] `"version"` is `"0.2.0"` or higher (never same as a previously submitted version)
- [ ] All four icon sizes present in `public/icons/` and referenced in manifest
- [ ] `"minimum_chrome_version"` set to `"114"` or higher (side panel API requires 114+)

### Store Listing (required before submission)
- [ ] Privacy policy URL is live and publicly accessible
- [ ] Short description ≤ 132 characters
- [ ] Long description written and reviewed
- [ ] Minimum 1 screenshot (1280×800)
- [ ] Promotional tile (440×280)
- [ ] Developer account registered and two-factor authentication enabled

### Build
- [ ] `bun run build:chrome` completes with zero errors
- [ ] `dist/manifest.json` is at the zip root (not nested under `dist/`)
- [ ] No `.tgz`, `.vsix`, or other build artifacts in the zip
- [ ] Total zip size ≤ 10 MB (Chrome Web Store hard limit)

### Permissions Justification (prepare as text for store review responses)
- `activeTab` — needed to open the side panel on the active tab and to get the URL for the context menu save
- `sidePanel` — required to register and open the side panel
- `storage` — stores auth token and memory cache in `chrome.storage.local`
- `contextMenus` — provides the right-click "Save to L0 Memory" option
- `alarms` — schedules background sync of memories at intervals
- `offscreen` — required to run the Xenova WASM AI model for on-device embeddings in a non-visible context (MV3 service workers cannot run WASM directly)

---

## What Is NOT in Scope

- Firefox submission (separate review process; the `build:firefox` script exists but MV3 compatibility between Chrome and Firefox differs for side panel API)
- Edge submission (uses Chrome Web Store extensions, no separate submission needed)
- Safari extension port (requires Xcode + Mac App Store submission — entirely separate)
- Memory Concierge UI in the extension (Phase 6 of `execution-plan-memory-concierge.md` — gated on backend Phase 3; ship `0.2.0` without it)
- Automated testing in CI before publish (no Playwright/Puppeteer extension tests exist yet — separate test infrastructure track)

---

_Version: 1.0 — 2026-05-08_
_Verified against: `packages/web-extension/manifest.json`, `vite.config.ts`, `src/background/index.ts`, `src/content/index.ts`, Chrome Web Store developer policies (current as of 2026-05)_
