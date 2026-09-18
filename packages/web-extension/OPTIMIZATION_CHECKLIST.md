# Chrome Extension Optimization Checklist

Track your progress as you apply performance, MV3-compliance, and publishing-prep fixes to the L0 Memory extension.

> **Read this first.** This checklist is organized in five phases. Do NOT start Phase 1 until Phase 0 (MV3 audit) is green — perf work on top of broken MV3 plumbing just moves the goalposts. Phase 4 (CWS prep) is non-negotiable if you intend to publish.

---

## 🛡️ Phase 0: MV3 Compliance Audit (do this first)

Catches the class of bugs the perf-only checklists never surface. None of these are "optimizations" — they are correctness. Every box must be ✅ before Phase 1.

### Assets & Manifest

- [ ] **Icons are real, per-size files** (15 min)
  - Files: `public/icons/icon-16.png`, `icon-32.png`, `icon-48.png`, `icon-128.png`
  - Each file must be a real PNG at the exact pixel dimensions (not four copies of one 128×128 file).
  - Verify: `file public/icons/*.png` reports the right size for each.
  - If you cannot generate per-size PNGs, **omit the keys entirely** — don't ship a 128×128 PNG labelled as 16×16.
  - `vite.config.ts:50` should only `copyFileSync` the files that actually exist.

- [ ] **`manifest.json` validates with no warnings** (5 min)
  - Run: `npx web-ext lint --source-dir dist` (or load unpacked in `chrome://extensions` with verbose errors)
  - No missing icons, no invalid `commands`, no broken `web_accessible_resources` paths.

### Permissions & Host Access

- [ ] **Audit `content_scripts` matches** (10 min)
  - File: `manifest.json:42-48`
  - Current: `<all_urls>`. A memory tool that reacts to user actions (right-click, popup, side panel) does NOT need to inject on every page.
  - Action: either narrow to specific sites the user opts into, OR keep `<all_urls>` AND add a one-line justification in `CHROMEWEBSTORE.md`.

- [ ] **Audit `optional_host_permissions`** (5 min)
  - File: `manifest.json:65-67`
  - Current: `<all_urls>`. The extension already has `api.lanonasis.com` + `auth.lanonasis.com` in `host_permissions`. `<all_urls>` is almost certainly unused.
  - Action: remove it unless `Options.tsx` `ensureHostPermissionForOrigin()` is actually used by a real flow. Document any remaining entries in `CHROMEWEBSTORE.md`.

- [ ] **`activeTab` vs `tabs` decision is intentional** (5 min)
  - File: `manifest.json:54`
  - If you read `tab.url` / `tab.title` from the service worker, you need `"tabs"` permission (the `activeTab` from a content-script button does not propagate into SW `onMessage` handlers).
  - `background/index.ts:54, 61` calls `chrome.tabs.query({active: true, currentWindow: true})` — that needs `tabs`, not `activeTab`.

### Service Worker Hygiene

- [ ] **No state stored in module-level variables that needs to survive SW termination** (10 min)
  - Files: `src/background/index.ts:25, 44, 47`, `src/background/cache.ts`
  - Current: `const cache = new MemoryCache(); setupOmnibox(cache); setupSync(cache);` run at module top level. The SW terminates after ~30s of inactivity; on cold start the module re-runs and re-instantiates everything.
  - Action: keep module-level *registrations* (cache instance, listener `addListener` calls, `setupSync()` call) — these re-run on every cold wake and that is the canonical MV3 pattern. **But**: any state that must persist across wakes must be read from `chrome.storage` at the top of every handler (the `cache.ts` `syncIfDue()` pattern already does this). Do NOT move listeners inside `chrome.runtime.onStartup` — that races with the very first alarm event.

- [ ] **No `setTimeout` / `setInterval` for deferred work in the SW** (10 min)
  - Files: `src/background/offscreenManager.ts`, `src/background/contextMenu.ts:81`
  - Current: `setTimeout(() => sendMessage, N)` after `chrome.sidePanel.open()` is racy — the side panel may not be wired yet.
  - Action: use `chrome.alarms` for any SW-side delay. For the side-panel race, stash the pending message in `chrome.storage.session` keyed by `tabId` and have `SidePanel.tsx` drain the queue in a `useEffect` on mount.

- [ ] **`chrome.runtime.onMessage` listeners `return true` for async responses** (2 min)
  - File: `src/background/index.ts:79`
  - Already correct. ✅

### Offscreen Document Rules

- [ ] **Offscreen document uses ONLY `chrome.runtime` + Web APIs** (15 min)
  - File: `src/offscreen/*` (build entry at `vite.config.ts:101`)
  - Offscreen documents do NOT have access to `chrome.action`, `chrome.tabs`, `chrome.downloads`, etc.
  - Action: audit every `chrome.*` call in the offscreen page. Anything that isn't `chrome.runtime.sendMessage` / `chrome.runtime.getURL` must be moved to the service worker.

- [ ] **Offscreen cleanup uses `chrome.alarms`, not `setTimeout`** (10 min)
  - File: `src/background/offscreenManager.ts`
  - The skill's rule: `setTimeout` dies with the SW. Use `chrome.alarms` so the close happens even after the SW is terminated and re-spun.

### Side Panel & Action

- [ ] **Resolve `default_popup` vs `side_panel` conflict — pick one primary UI** (15 min) — **see also Phase 0.5**
  - Files: `manifest.json:18-30`, `src/background/index.ts:178`
  - Current: `action.default_popup: "src/popup/index.html"` AND `side_panel.default_path: "src/sidepanel/index.html"` AND `setPanelBehavior({ openPanelOnActionClick: false })`. Because `default_popup` is set, the toolbar icon **always opens the popup**, not the Memory Concierge. The side panel is only reachable via the `Alt+Shift+M` command.
  - Action: pick the primary UI.
    - **If side panel is primary**: remove `default_popup`, set `openPanelOnActionClick: true` in `onInstalled`, keep the keyboard shortcut. Bump `minimum_chrome_version` to `116` if `chrome.sidePanel.open()` is called outside an action click.
    - **If popup is primary**: remove `side_panel` entirely (delete the manifest key and the `sidePanel` permission).
    - **If both are wanted**: drop the popup and put a "Quick add" affordance inside the panel that calls `chrome.sidePanel.open()` (the `cookbook.sidepanel-open` pattern).
  - Pitfall: if you drop the popup later, you MUST change `openPanelOnActionClick` to `true` (NOT `openPanelOnActionIconClick` — that variant throws synchronously and silently aborts the SW).

- [ ] **No `chrome.windows.query()` calls** (5 min)
  - Skill rule: `chrome.windows` has no `.query()`. Use `getAll`, `getLastFocused`, or `getCurrent`.

### Code Execution & CSP

- [ ] **No `eval()` / `new Function()` in extension pages** (5 min)
  - File: `manifest.json:104-107`
  - Sandbox CSP allows `'unsafe-eval'`, which is by design — but verify nothing in `src/popup/`, `src/sidepanel/`, or `src/options/` uses it. Those run under `extension_pages` CSP which does NOT allow eval.

- [ ] **No inline `<script>` tags or inline event handlers** (5 min)
  - Grep for `onclick=` and `<script>` in `src/**/*.html`. The build's React plugin shouldn't emit any, but verify.

### User Feedback

- [ ] **Context menu actions show user feedback** (15 min)
  - File: `src/background/contextMenu.ts`
  - "Save selection as memory" should flash a toast, badge, or notification. Right now it silently fires and hopes for the best.

- [ ] **All async operations have error handling** (15 min)
  - Grep: every `await` in the SW should be in a try/catch that surfaces to the UI.

### Code Style

- [ ] **No `.then()` chains — async/await only** (10 min)
  - Grep: `\.then\(` in `src/`. Replace with await + try/catch.
  - `Popup.tsx:43, 48, 56, 67, 81, 91, 92` is the worst offender — every `chrome.runtime.sendMessage` uses callbacks instead of promisifying.

### Phase 0 Verification

- [ ] All Phase 0 items are ✅ or explicitly justified in `CHROMEWEBSTORE.md`
- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] Extension loads unpacked in Chrome with zero console errors
- [ ] Tested: install → first run → options page opens

---

## 🔐 Phase 0.5: Auth & State Correctness (correctness, not perf — do before Phase 1)

These items come from the deep-research brief against `GoogleChrome/chrome-extensions-samples`. They are correctness gaps in MV3 patterns that Phase 0 missed; do them before the performance work in Phase 1.

### Auth (JWT)

- [ ] **Re-validate JWT in SW on every read** (15 min)
  - File: `src/background/cache.ts:88-101`, `:233-242`
  - Current: `looksLikeJwt()` runs in `Options.tsx:504` only, at save time. The SW trusts whatever is in `chrome.storage.local`. Commit `b696563` is partial.
  - Action: move the validation into `cache.ts`'s `getAuthConfig()`. Also validate `iat` is a number and `exp * 1000 > Date.now() - 30_000` (30 s clock-skew tolerance). On failure, clear `l0_auth_token` + `userEmail` and return null.

- [ ] **Add 401 handling + re-login flow** (30 min)
  - File: `src/background/cache.ts:248-301`, `src/sidepanel/SidePanel.tsx:830-865`
  - Current: `apiRequest` returns `{ error: 'HTTP 401 …' }` to the UI raw.
  - Action: detect `res.status === 401`, return `{ error: 'Session expired. Reconnect from the L0 Memory dashboard.', kind: 'auth' }`. Do **not** auto-clear the token (could be a transient backend issue). The side panel already routes `isAuthenticated = false` to `WelcomeView` — pipe `kind: 'auth'` through `chrome.storage.local.lastError` or the response handler so the user lands back on the Options auth form.

- [ ] **Stable dev extension ID via `"key"` field** (20 min)
  - File: `manifest.json` (no `key` field today)
  - Action: follow `developer.chrome.com/docs/extensions/mv3/manifest/key` — `bun run build` → zip dist → upload as **draft** to Chrome Developer Dashboard → Package tab → View public key → paste base64 body (no markers) as `"key"` in `manifest.json`. **Remove the dev key before publishing** (or replace with the new pre-publish key).

### State persistence across SW termination

- [ ] **Persist omnibox `latestRequestId` in `chrome.storage.session`** (20 min)
  - File: `src/background/omnibox.ts:14-41`
  - Current: commit `7e85b3f` works within a single SW wake. The SW can be torn down between omnibox keystrokes; on next wake, `latestRequestId` resets to 0 and a late response from the previous wake could clobber the current suggestion.
  - Action: mirror `sample.tabcapture-recorder`'s state-machine discipline — store the counter in `chrome.storage.session` keyed by `OMNIBOX_LATEST_KEY`, check `isLatest(id)` after the async `searchLocalAsync` returns.

- [ ] **Replace `cache.isSyncing: boolean` with `Promise`-cache singleton** (15 min)
  - File: `src/background/sync.ts`, `src/background/cache.ts`
  - Current: boolean has a TOCTOU race — two handlers on the same wake can both pass `if (isSyncing) return;` before either sets the flag.
  - Action: mirror `offscreenManager.ts:creating` — module-scope `let inflight: Promise<void> | null = null;` in the alarm listener; second caller awaits the same in-flight promise instead of starting a second sync.

- [ ] **Add SW broadcast helper for sync / mutation events** (20 min)
  - File: `src/background/index.ts` (extend) — new `src/background/broadcast.ts`
  - Action: implement `broadcastToExtensionPages(type, payload)` from `sample.tabcapture-recorder/service-worker.js:36`. Wrap in try/catch — `chrome.runtime.sendMessage` rejects with `Receiving end does not exist` if the side panel is closed. Call sites: after `cache.sync()`, `CREATE_MEMORY`, `UPDATE_MEMORY`, `DELETE_MEMORY`. Side panel listens via `chrome.runtime.onMessage.addListener` and invalidates React Query or re-fetches.

### Networking safety

- [ ] **Pre-flight `chrome.permissions.contains({ origins })` before fetch** (10 min)
  - File: `src/background/cache.ts:248-294`
  - Action: before each `apiRequest`, validate the origin permission. Mirrors `cookbook.permissions-addhostaccessrequest`. Turns the silent-TypeError pitfall into a clear UX message.

- [ ] **User-driven cancel path for `ASK_AI`** (45 min)
  - Files: `src/background/index.ts` (new `inflightAskAi: Map<string, AbortController>`), `src/background/aiRouter.ts:48-104`, `src/sidepanel/SidePanel.tsx` (Stop button)
  - Action: SW keeps a Map of in-flight AI requests by id; side panel sends `CANCEL_ASK_AI` with the id. `queryAIRouter` accepts an external `AbortSignal`, aborts on its abort event, removes the listener in `finally`. Without this, the user cannot stop a long generation.

---

## 🚀 Phase 1: Quick Wins (30 minutes)

### Critical Fixes - Apply Today

- [ ] **Fix 1: Add Search Debouncing** (2 min)
  - File: `src/sidepanel/SidePanel.tsx`, `src/popup/Popup.tsx`
  - SidePanel already has a `searchDebounceRef` (line 409, 513) ✅ — but Popup does not. Add the same pattern.
  - **DONE** for SidePanel. **TODO** for Popup.
  - Test: Type in search, verify only 1 API call after 280ms
  - Expected: 90% fewer API calls

- [ ] **Fix 2: Memoize MemoryCard Component** (3 min)
  - File: `src/sidepanel/SidePanel.tsx:117`
  - **TODO**: wrap with `React.memo(MemoryCard, (prev, next) => prev.memory.id === next.memory.id && prev.memory.updated_at === next.memory.updated_at)`.
  - Extract to `src/components/MemoryCard.tsx` so it can be code-split.
  - Add `useMemo` for `getMemoryIcon` result, `useMemo` for `formatDate`.
  - Test: Open DevTools Profiler, verify fewer re-renders when typing in search.
  - Expected: 70% fewer re-renders

- [ ] **Fix 3: Fix Memory Leaks** (5 min)
  - File: `src/sidepanel/SidePanel.tsx`
  - Audit every `useEffect`: any `addEventListener`, `setInterval`, `setTimeout`, `chrome.runtime.onMessage` must be cleaned up.
  - `setTimeout` at lines 126, 184 (the `setCopied(false)` ones) leak if the component unmounts. Store ref + clear on unmount.
  - Test: Open extension, close, repeat 10x, check memory in `chrome://extensions → service worker → Inspect`.
  - Expected: Stable memory usage

- [ ] **Fix 4: Lazy Load AI Model** (3 min)
  - File: `src/sidepanel/SidePanel.tsx`
  - Remove auto-initialization
  - Initialize on first search
  - Test: Open extension, verify AI doesn't load until search
  - Expected: 3-5s faster initial load

- [ ] **Fix 5: Batch Database Operations** (5 min)
  - File: `src/background/cache.ts`
  - Use single transaction
  - Parallel operations with `Promise.all()`
  - Test: Sync 100 memories, measure time
  - Expected: 5x faster sync

- [ ] **Fix 6: Remove Console Logs** (1 min)
  - File: `vite.config.ts:91-94`
  - **DONE** ✅ (`drop_console: true` already set). Remove this item or mark complete.

- [ ] **Fix 7: Optimize Popup Load** (3 min)
  - File: `src/popup/Popup.tsx`
  - Fetch auth first, then data
  - Parallel sync status fetch (already parallel with `chrome.runtime.sendMessage` callbacks — promisify and `Promise.all` them)
  - Test: Open popup, measure load time
  - Expected: 50% faster popup

- [ ] **Fix 8: Add Request Cancellation** (4 min)
  - File: `src/background/cache.ts`
  - Add AbortController
  - Cancel previous requests
  - Test: Type fast in search, verify old requests cancelled
  - Expected: No wasted requests

- [ ] **Fix 9: Offscreen Document Cleanup** (3 min)
  - File: `src/background/offscreenManager.ts`
  - **Use `chrome.alarms`, not `setTimeout`** (per Phase 0 rule).
  - 5-minute idle timeout
  - Auto-close when idle
  - Test: Use extension, wait 5 min, check memory
  - Expected: 40MB memory saved (verify, don't guess)

- [ ] **Fix 10: Parallel Embedding Generation** (4 min)
  - File: `src/hooks/useSemanticSearch.ts`
  - Use `Promise.all()` for embeddings
  - Process in parallel
  - Test: Search with 50 memories, measure time
  - Expected: 10x faster search

---

## 📊 Phase 1 Verification

After completing Phase 1, verify improvements:

### Performance Metrics
- [ ] Initial load time: _____ seconds (target: < 3s)
- [ ] Search latency: _____ ms (target: < 500ms)
- [ ] Memory usage (idle): _____ MB (target: < 50MB, **excluding** AI model)
- [ ] Memory usage (active): _____ MB (target: < 80MB, **excluding** AI model)
- [ ] Memory usage (with AI): _____ MB (record, don't target)
- [ ] API calls per search: _____ (target: 1-2)

### User Experience
- [ ] Popup opens instantly (< 500ms)
- [ ] Typing in search is smooth
- [ ] No lag when scrolling memories
- [ ] Sync completes quickly
- [ ] No console errors

### Technical Validation
- [ ] No memory leaks (test 30 min usage)
- [ ] Event listeners cleaned up
- [ ] Offscreen document closes after idle
- [ ] Database operations are fast
- [ ] Bundle builds successfully

---

## 🎯 Phase 2: High Priority Optimizations (Week 2)

### Code Splitting & Bundle Optimization

- [ ] **Split Vendor Bundles**
  - File: `vite.config.ts:96-115`
  - Separate React, UI, Query, AI bundles
  - Test: Check bundle sizes per entry
  - Expected: 30% smaller initial load

- [ ] **Implement React Query**
  - Files: `src/popup/Popup.tsx`, `src/sidepanel/SidePanel.tsx`
  - `package.json` already has `@tanstack/react-query` (line 27) ✅ — just wire it up.
  - Cache auth status, memories
  - Test: Verify no duplicate API calls
  - Expected: 95% fewer API calls

- [ ] **Optimize Embedding Cache**
  - File: `src/hooks/useSemanticSearch.ts`
  - Batch embedding generation
  - Prefetch in background
  - Test: Generate 100 embeddings, measure time
  - Expected: 5x faster embedding generation

- [ ] **Optimize Search Algorithm**
  - File: `src/hooks/useSemanticSearch.ts`
  - Early termination for low scores
  - Limit processing to top N
  - Test: Search with 1000 memories
  - Expected: 3x faster search

### UI Polish (parity with demo at `client/src/packages/web-extension/RichPanel.tsx`)

- [ ] **Match the demo's `WelcomeView` aesthetic** when unauthenticated
  - Add `framer-motion` fade-in (already a dep at `package.json:31` ✅)
  - Add the gradient logo circle, "Your Memory Awaits" copy, feature grid
  - File: `src/sidepanel/SidePanel.tsx` (or split into `src/sidepanel/Welcome.tsx`)

- [ ] **Add type badges to memory cards**
  - Demo (`RichPanel.tsx:103-105`) shows a colored badge per memory type
  - Extension `MemoryCard` has none

- [ ] **Add AI orchestrator status indicator**
  - Demo shows "Orchestrator Ready" pulse when authenticated
  - File: `src/sidepanel/SidePanel.tsx`

---

## 🔧 Phase 3: Medium Priority Optimizations (Week 3)

### Database & UI Optimizations

- [ ] **Add IndexedDB Indexes**
  - File: `src/background/cache.ts`
  - Add indexes for type, updated_at
  - Use indexes in queries
  - Test: Query by type, measure time
  - Expected: 10x faster filtered queries

- [ ] **Implement Virtual Scrolling**
  - File: `src/sidepanel/SidePanel.tsx`
  - Add `react-window`
  - Render only visible items
  - Test: Scroll through 1000 memories
  - Expected: Smooth 60fps scrolling

- [ ] **Optimize Images**
  - Files: `public/icons/*`
  - Per Phase 0, these are broken. Generate real 16/32/48/128 PNGs from the source 128.
  - Convert to WebP for internal UI assets (not extension icons — Chrome requires PNG).
  - Test: Check bundle size
  - Expected: 50% smaller images

- [ ] **Add Service Worker Caching**
  - File: `background/index.js`
  - Cache static assets
  - Implement Workbox
  - Test: Offline mode
  - Expected: Instant offline load

---

## 🌐 Phase 4: Chrome Web Store Publishing Prep (Week 4)

This phase is what unblocks a real CWS submission. The skill treats this as non-optional.

### Create `CHROMEWEBSTORE.md` at project root

- [ ] **Single-line description** (≤ 132 chars)
  - File: `CHROMEWEBSTORE.md` → "Single-line Description"
  - Lead with function, not feeling. Example: "Save, search, and recall your development context across every tool."

- [ ] **Detailed description** (≤ 16,000 chars)
  - 3-5 bullet features with user-benefit framing
  - NO implementation details (no "uses MutationObserver", no "powered by service worker")

- [ ] **Permissions justification** — one plain-English reason per entry
  - `storage`: "Stores your memories and preferences locally"
  - `contextMenus`: "Lets you save selected text with a right-click"
  - `sidePanel`: "Opens the memory workspace alongside the page"
  - `activeTab`: "Reads the current tab only when you click the extension"
  - `alarms`: "Schedules background sync every N minutes"
  - `offscreen`: "Runs the on-device embedding model in a hidden document"
  - `scripting`: "Injects the content script that captures selected text"
  - `host_permissions api.lanonasis.com`: "Syncs memories to your LanOnasis account"
  - `host_permissions auth.lanonasis.com`: "Authenticates you with LanOnasis"
  - `optional_host_permissions`: justify or remove

- [ ] **Privacy policy URL**
  - Either host on `lanonasis.com/privacy` or generate one (skill has a template)
  - Disclose: what's stored locally, what's sent to the server, what's NOT collected

- [ ] **Version history**
  - 0.1.0 — initial release (note date)
  - Updates per release

- [ ] **Screenshots needed**
  - At least 1 at 1280×800 or 640×400
  - Capture: side panel with memories loaded, popup, options page

### CWS-specific validations

- [ ] **Run `web-ext lint`** with zero warnings
- [ ] **Single-purpose check**: extension does one thing well. If you find yourself wanting to list 6 features in the single-line description, scope it down.
- [ ] **No remote code**: no `eval()`, no `new Function()`, no remote script tags.
- [ ] **No `<all_urls>` without a written justification** in `CHROMEWEBSTORE.md`.
- [ ] **Manifest keys are minimal**: drop `optional_host_permissions` if unused; drop `scripting` if not used in content script invocation.

### Final submission

- [ ] `bun run package:chrome` produces a clean `.zip`
- [ ] ZIP excludes `.git/`, `node_modules/`, `.env`, `CHROMEWEBSTORE.md`, `__tests__/`
- [ ] Submit to Chrome Web Store Dashboard
- [ ] Monitor review status and respond to any rejections within 7 days

---

## 🆕 Phase 5: Modern Platform Adoption (Chrome 130+ — adopt incrementally)

These come from the Chrome whats-new changelog (Chrome 120 → 153). Each item is independent; pick by Chrome version you want to target and user value. None of these break what we already have.

### Minimum Chrome version bumps (pick one when ready)

- [ ] **`minimum_chrome_version: 116`** (immediate) — needed for `chrome.sidePanel.open()` outside action click.
- [ ] **`minimum_chrome_version: 127`** — enables `chrome.action.openPopup()` from anywhere.
- [ ] **`minimum_chrome_version: 130`** — `action.onUserSettingsChanged`, `StorageArea.getKeys()`.
- [ ] **`minimum_chrome_version: 133`** — `chrome.permissions.addHostAccessRequest()`.
- [ ] **`minimum_chrome_version: 138`** — Built-in AI (`LanguageModel`, `Summarizer`, `LanguageDetector`) stable for extensions.
- [ ] **`minimum_chrome_version: 140`** — `chrome.sidePanel.getLayout()`, `onOpened`, `close()`.
- [ ] **`minimum_chrome_version: 142`** — `chrome.sidePanel.onClosed`.
- [ ] **`minimum_chrome_version: 150`** — `chrome.offscreen.hasDocument()`, `chrome.alarms.persistAcrossSessions`, `chrome.contextMenus` `"tab"` context.

### Platform adoptions (independent of min-version bump)

- [ ] **`chrome.sidePanel.onOpened` + `onClosed` lifecycle handlers** (Chrome 141/142) — flush pending writes and cancel in-flight AI work when the panel closes.
- [ ] **`chrome.permissions.addHostAccessRequest({ tabId, documentId })`** (Chrome 133) — replace global `<all_urls>` request with per-tab prompt. Friendlier UX when user clicks "Save page as memory" on an ungranted site.
- [ ] **`chrome.offscreen.hasDocument()`** (Chrome 150) — simplify `src/background/offscreenManager.ts:18-42`. Keep `runtime.getContexts` branch as a fallback only.
- [ ] **`chrome.alarms.create({ persistAcrossSessions: true })`** (Chrome 150) — sync alarm survives browser restarts without a `runtime.onStartup` listener.
- [ ] **`chrome.sidePanel.getLayout()`** (Chrome 140) — call once on side panel mount, mirror `dir` / `data-side` for RTL languages.
- [ ] **`chrome.action.onUserSettingsChanged`** (Chrome 130) — show a one-time "Pin L0 Memory" hint when the user unpins our action.
- [ ] **`StorageArea.getKeys()`** (Chrome 130) — cleaner cache enumeration in `cache.ts`.

### Built-in AI (Chrome 138+, feature-detect with `'LanguageModel' in self`)

- [ ] **On-device fallback for `ASK_AI`** when AI Router is rate-limited (`AiRouterRateLimitError`) or unreachable
  - File: `src/sidepanel/SidePanel.tsx` (new `src/sidepanel/aiMode.ts`)
  - Pattern: `LanguageModel.availability({ expectedInputs, expectedOutputs })` → if `available`, `create({ temperature: 1, topK: 3, initialPrompts: [{ role: 'system', content: '...' + topMemories }] })` → `for await (const chunk of session.promptStreaming(query))` → render chunks (each is the **full response so far**, replace not append). Wrap with `AbortSignal` for the Stop button.
  - Rules: in extensions, `topK` AND `temperature` must both be set or both omitted. First `create()` for a downloadable model must be inside a user gesture.
- [ ] **`Summarizer.summarize(text, { type: 'key-points' })`** for offline memory previews when AI Router is down.
- [ ] **`LanguageDetector.detect(query)`** before forwarding to AI Router — feed the locale hint to reduce rejected requests.

### Future-only (origin trial / Dev / EPP — flag in code comments, no action yet)

- Prompt API for the web (origin trial through Chrome 148).
- Writer / Rewriter / Proofreader APIs (developer trial / origin trial).
- Structured Clone for messaging (opt-in Chrome 148, default-on timing not announced).
- Default-pinned action icon (Chrome 153 experiment).

---

## 🧪 Testing Checklist

### Before Each Fix
- [ ] Record baseline metrics
- [ ] Take Chrome DevTools Performance snapshot
- [ ] Note current memory usage
- [ ] Document current behavior

### After Each Fix
- [ ] Verify fix works as expected
- [ ] Measure improvement
- [ ] Check for regressions
- [ ] Update metrics
- [ ] Commit changes

### Final Testing
- [ ] Load extension in Chrome DevTools
- [ ] Profile CPU usage
- [ ] Profile memory usage
- [ ] Test with 1000+ memories
- [ ] Test offline mode
- [ ] Test AI search
- [ ] Test sync
- [ ] Test on low-end device

### Automated Tests
- [ ] `npm run test` passes (`vitest`)
- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] Consider adding a vitest assertion per fix instead of relying on manual "Test:" steps

---

## 📈 Metrics Tracking

### Baseline (Before Fixes)
```
Date: ___________
Initial Load: _____ s
Search Latency: _____ ms
Memory (idle): _____ MB
Memory (active): _____ MB
Memory (with AI): _____ MB
Bundle Size: _____ MB (per entry: popup / sidepanel / background)
API Calls/Search: _____
```

### After Phase 0 (MV3 Audit)
```
Date: ___________
Notes: Phase 0 is correctness, not perf. The metrics here should be unchanged
or slightly better (less memory churn from bad SW init).
```

### After Phase 1 (Quick Wins)
```
Date: ___________
Initial Load: _____ s (___% improvement)
Search Latency: _____ ms (___% improvement)
Memory (idle): _____ MB (___% improvement)
Memory (active): _____ MB (___% improvement)
Bundle Size: _____ MB (___% improvement)
API Calls/Search: _____ (___% improvement)
```

### After Phase 2 (High Priority)
```
Date: ___________
Initial Load: _____ s (___% improvement)
Search Latency: _____ ms (___% improvement)
Memory (idle): _____ MB (___% improvement)
Memory (active): _____ MB (___% improvement)
Bundle Size: _____ MB (___% improvement)
API Calls/Search: _____ (___% improvement)
```

### After Phase 3 (Medium Priority)
```
Date: ___________
Initial Load: _____ s (___% improvement)
Search Latency: _____ ms (___% improvement)
Memory (idle): _____ MB (___% improvement)
Memory (active): _____ MB (___% improvement)
Bundle Size: _____ MB (___% improvement)
API Calls/Search: _____ (___% improvement)
```

### After Phase 4 (CWS Publishing)
```
Date: ___________
CHROMEWEBSTORE.md: ✅ exists
web-ext lint: ✅ zero warnings
Privacy policy: ✅ live at ____________
CWS review status: ____________
```

---

## 🎯 Success Criteria

Mark complete when ALL criteria are met:

### MV3 Compliance (Phase 0)
- [ ] All Phase 0 items ✅
- [ ] `web-ext lint` clean
- [ ] `chrome.permissions.request()` is called with no `await` before it (if/when used)
- [ ] No `eval()` / `new Function()` / inline scripts
- [ ] Offscreen document uses only `chrome.runtime` + Web APIs

### Performance
- [ ] Initial load < 1 second
- [ ] Search latency < 300ms
- [ ] Memory usage < 50MB idle (excluding AI model)
- [ ] Memory usage < 80MB active (excluding AI model)
- [ ] Bundle size < 2MB per entry
- [ ] API calls = 1 per search

### Quality
- [ ] Zero console errors
- [ ] Zero memory leaks
- [ ] 60fps scrolling
- [ ] No UI freezes
- [ ] Smooth animations
- [ ] UI parity with demo at `client/src/packages/web-extension/RichPanel.tsx`

### User Experience
- [ ] Instant popup opening
- [ ] Real-time search
- [ ] Fast sync
- [ ] Offline support works
- [ ] AI search works
- [ ] Sign-in / Options page matches demo's `WelcomeView` aesthetic

### Publishing Readiness
- [ ] `CHROMEWEBSTORE.md` complete
- [ ] All permissions justified
- [ ] Privacy policy live
- [ ] At least 1 store screenshot
- [ ] Clean `.zip` build

---

## 🐛 Known Issues & Workarounds

Track any issues discovered during optimization:

| Issue | Severity | Discovered In | Workaround | Status |
|-------|----------|---------------|------------|--------|
| Icons: all 4 PNGs are 128×128 (one file copied 4x) | **Blocker** | Phase 0 | Generate per-size PNGs or drop keys | Open |
| `default_popup` + `side_panel` both set → toolbar icon opens popup, not Memory Concierge | **Blocker** | Phase 0 / brief | Pick primary UI; see updated Phase 0 side-panel item | Open |
| `looksLikeJwt` runs in UI only — SW trusts whatever is in storage | **Blocker** | Phase 0.5 / brief | Move into `cache.ts:getAuthConfig()` | Open |
| MemoryCard not actually memoized despite Fix 2 | High | Phase 1 | Wrap with React.memo, extract to components/ | Open |
| No 401 → re-login flow; UI gets raw `{ error: 'HTTP 401 …' }` | High | Phase 0.5 / brief | Add `{ kind: 'auth' }` discriminant + re-route to Options | Open |
| Omnibox stale-response guard is single-wake only (resets on SW restart) | High | Phase 0.5 / brief | Persist counter in `chrome.storage.session` | Open |
| SW `cache.isSyncing` boolean has TOCTOU race | Medium | Phase 0.5 / brief | Replace with `Promise`-cache singleton | Open |
| No `broadcastToExtensionPages` helper — side panel doesn't react to sync/mutations | Medium | Phase 0.5 / brief | Add helper + side-panel listener | Open |
| `ASK_AI` has no user-driven cancel path | Medium | Phase 0.5 / brief | `inflightAskAi` map + `CANCEL_ASK_AI` message | Open |
| Manifest has no `"key"` field — dev extension ID changes on every reload | Medium | Phase 0.5 / brief | Pack + upload-as-draft + paste public key | Open |
| `apiRequest` silently throws when host permission missing | Low | Phase 0.5 / brief | Pre-flight `chrome.permissions.contains({ origins })` | Open |
| SW module-level cache re-instantiates on every cold start (but module-level *registrations* are canonical — storage carries the data) | **Resolved** (not a bug) | Phase 0 | None needed | Closed |
| contentScripts `<all_urls>` is broader than needed | Medium | Phase 0 | Narrow or document in CHROMEWEBSTORE.md | Open |
| optional_host_permissions `<all_urls>` likely unused | Low | Phase 0 | Remove or justify | Open |
| setTimeout after sidePanel.open is racy | Medium | Phase 0 | Use chrome.storage.session pending queue | Open |
| Popup uses .sendMessage callbacks instead of await | **Medium** (was Low) | Phase 1 | Promisify, use Promise.all | Open |
| No built-in AI fallback when AI Router is rate-limited or down | Low | Phase 5 / brief | `LanguageModel.availability()` + offline fallback | Open |
| | | | | |

---

## 📝 Notes & Observations

Document learnings and insights:

```
Date: ___________
Fix Applied: ___________
Observation: ___________
Impact: ___________
Next Steps: ___________
```

---

## ✅ Final Checklist

Before marking optimization complete:

- [ ] All Phase 0 fixes applied
- [ ] All Phase 1 fixes applied
- [ ] All Phase 2 fixes applied
- [ ] All Phase 3 fixes applied
- [ ] All Phase 4 publishing-prep applied
- [ ] All tests passing
- [ ] Metrics meet targets
- [ ] No regressions
- [ ] Documentation updated
- [ ] Code reviewed
- [ ] Beta tested
- [ ] User feedback positive
- [ ] Ready for production

---

## 🚀 Deployment Checklist

Before deploying optimized extension:

- [ ] Build production bundle
- [ ] Test in Chrome
- [ ] Test in Edge (Chromium-based — usually passes Chrome tests)
- [ ] Test in Firefox if `build:firefox` target is supported (verify manifest differences)
- [ ] Verify manifest.json
- [ ] Check permissions against `CHROMEWEBSTORE.md` justifications
- [ ] Test update flow (install over previous version)
- [ ] Prepare release notes
- [ ] Tag version in git
- [ ] Submit to Chrome Web Store (only after Phase 4 is complete)
- [ ] Monitor error reports
- [ ] Track performance metrics

---

**Start Date:** ___________  
**Target Completion:** ___________  
**Actual Completion:** ___________  
**Overall Improvement:** ___________%

---

## 💡 Tips for Success

1. **Do Phase 0 first** — perf work on broken MV3 plumbing is wasted effort
2. **Apply fixes incrementally** — don't change everything at once
3. **Test after each fix** — catch regressions early
4. **Measure everything** — data drives decisions
5. **Document learnings** — help future you
6. **Get feedback** — users notice improvements
7. **Celebrate wins** — performance work is hard!

---

## 📚 Reference

- **Skill**: `chrome-extensions` — Manifest V3 best practices, common pitfalls, store submission
- **Demo UI reference**: `client/src/packages/web-extension/RichPanel.tsx` — visual target for parity
- **CWS docs**: https://developer.chrome.com/docs/webstore/
- **Deep-research brief (2026-09-17)** — 7 parallel research agents against `GoogleChrome/chrome-extensions-samples` and `developer.chrome.com`. Phase 0.5 and Phase 5 are derived from this brief. Saved at: `packages/web-extension/.research/CHROME_EXT_BRIEF_2026-09-17.md` (regenerate with `/research-chrome-extension` workflow)
- **Source samples referenced in the brief**:
  - `cookbook.sidepanel-global` / `cookbook.sidepanel-open` / `cookbook.sidepanel-multiple` / `cookbook.sidepanel-site-specific`
  - `sample.sidepanel-dictionary` — `chrome.storage.session` SW ↔ side-panel bus
  - `sample.tabcapture-recorder` — SW broadcast + offscreen lifecycle
  - `api-samples/alarms`, `api-samples/storage/stylizr`, `api-samples/identity`
  - `api-samples/omnibox/simple-example`, `api-samples/contextMenus/basic`
  - `ai.gemini-on-device`, `ai.gemini-on-device-calendar-mate`, `ai.gemini-on-device-summarization`, `ai.gemini-in-the-cloud`

---

**Good luck with your optimization journey! 🚀**
