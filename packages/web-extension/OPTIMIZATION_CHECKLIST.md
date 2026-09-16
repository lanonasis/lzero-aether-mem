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

- [ ] **No module-level state that depends on a long-lived process** (20 min)
  - Files: `src/background/index.ts:25, 44, 47`, `src/background/cache.ts`
  - Current: `const cache = new MemoryCache(); setupOmnibox(cache); setupSync(cache);` run at module top level. The SW terminates after ~30s of inactivity; on cold start the module re-runs and re-instantiates everything.
  - Action: re-`init()` inside `chrome.runtime.onStartup` and on first message of each session. Keep `cache` as a module variable but tolerate re-init; do not assume listeners survive.

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

- [ ] **Side panel open trigger is wired** (2 min)
  - Files: `manifest.json:28-30`, `src/background/index.ts:155-158`, `src/background/omnibox.ts:40`, `src/background/contextMenu.ts:79, 92`
  - Current: `setPanelBehavior({ openPanelOnActionClick: false })` because `default_popup` is also set. Side panel is opened via the `open_side_panel` command and context menu. ✅
  - Pitfall: if you later drop the popup, you MUST change this to `true` (NOT `openPanelOnActionIconClick` — that variant throws synchronously).

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
| Icons: all 4 PNGs are 128×128 (one file copied 4x) | High | Phase 0 | Generate per-size PNGs or drop keys | Open |
| MemoryCard not actually memoized despite Fix 2 | High | Phase 1 | Wrap with React.memo, extract to components/ | Open |
| SW module-level cache re-instantiates on every cold start | Medium | Phase 0 | Re-init in onStartup / first-message | Open |
| contextScripts `<all_urls>` is broader than needed | Medium | Phase 0 | Narrow or document in CHROMEWEBSTORE.md | Open |
| optional_host_permissions `<all_urls>` likely unused | Low | Phase 0 | Remove or justify | Open |
| setTimeout after sidePanel.open is racy | Medium | Phase 0 | Use chrome.storage.session pending queue | Open |
| Popup uses .sendMessage callbacks instead of await | Low | Phase 1 | Promisify, use Promise.all | Open |
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

---

**Good luck with your optimization journey! 🚀**
