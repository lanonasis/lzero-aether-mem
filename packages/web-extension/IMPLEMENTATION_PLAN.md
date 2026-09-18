# L0 Memory Extension — Consolidated Implementation Plan

**Date:** 2026-09-18
**Status:** Draft
**Scope:** All correctness, resilience, and publishing work for `packages/web-extension`.
**Sources consolidated:**
- `OPTIMIZATION_CHECKLIST.md` (phase 0-5 checklist, derived from deep-research brief)
- `L0-MEMORY-GAP-ANALYSIS.md` (gap analysis of the checklist + critique)
- `guy-gardner-shazam-fire.md` (v2 plan: L0 Memory Implementation Plan v2)

**Prerequisite:** This plan supersedes all three source documents. Use this as the single source of truth for implementation. After P0 completes, the OPTIMIZATION_CHECKLIST.md is repurposed for *performance tuning only* (Phase 1+ of the checklist; correctness items are absorbed here).

---

## 0. Architecture decision gates (answer before executing)

These don't block P0 but must be answered before P4:

1. **Minimum Chrome version:** Stay on 114+ (feature-detect newer APIs) or bump to 150+ for simpler code? Recommended: stay on 116+ for P0–P2; revisit in P2-2.
2. **Popup fate:** If P0-1 removes `default_popup`, what happens to `src/popup/`? Delete entirely, or keep as a non-default route?
3. **Cross-browser scope:** The extension claims Chrome + Firefox + Edge in `package.json`, but uses zero `browser.*` polyfills. Firefox has no `sidePanel` API — this invalidates the primary-UI decision in P0-1. Decide: ship Chrome-only (remove Firefox from description, drop `build:firefox`), or allocate time for a `webextension-polyfill` shim and conditional feature gates. Edge (Chromium) inherits Chrome APIs 1:1.
4. **On-device AI UX:** Is offline `ASK_AI` a product requirement or nice-to-have? Drives whether P4 is mandatory.

---

## 1. State machine (architectural foundation)

Before any code change, define four state machines as explicit enums + transition guards. This is a typed contract that all downstream phases must conform to.

### 1.1 States and storage ownership

| State | Storage | Reason |
|---|---|---|
| **AUTH** = `unauthenticated` \|\| `authenticated` \|\| `expired` | `chrome.storage.local.l0_auth_token` + `chrome.storage.local.userEmail` | Durable, not session-scoped |
| **SYNC** = `idle` \|\| `scheduled` \|\| `running` \|\| `succeeded` \|\| `failed` | `chrome.storage.local.l0_last_sync_attempt_at` + `MemoryCache.isSyncing` (transient) | Throttle timestamp must survive SW termination; in-flight flag does not |
| **AI** = `idle` \|\| `running` \|\| `cancelling` \|\| `cancelled` \|\| `succeeded` \|\| `failed` | SW module memory (`inflightAskAi` Map) | One user at a time; in-memory is correct |
| **PANEL** = `closed` \|\| `open` | Chrome `sidePanel` API events | Not persisted; reflected by listener registration |

### 1.2 State transitions to add

| Machine | From | To | Trigger |
|---|---|---|---|
| AUTH | `*` | `unauthenticated` | `LOGOUT` OR token missing/malformed/expired at `getAuthConfig` |
| AUTH | `unauthenticated` | `authenticated` | `SET_AUTH_TOKEN` with token that decodes + has future `exp` |
| AUTH | `authenticated` | `expired` | 401 from backend OR `exp * 1000 < Date.now() - 30_000` at `getAuthConfig` |
| AUTH | `expired` | `unauthenticated` | Side panel routes to Options page |
| SYNC | `idle` | `scheduled` | Alarm listener fires |
| SYNC | `scheduled` | `running` | Throttle gate passes; `inflight` promise created |
| SYNC | `running` | `succeeded` | API request resolves; `cache.updateFromApi` finishes |
| SYNC | `running` | `failed` | API errors; `inflight` cleared in `finally` |
| AI | `idle` | `running` | `ASK_AI` received, `AbortController` stored |
| AI | `running` | `cancelling` | `CANCEL_ASK_AI` received for matching id |
| AI | `cancelling` | `cancelled` | `AbortController.abort()` propagates; `fetch` rejects with `AbortError` |
| AI | `running` | `succeeded` \|\| `failed` | Response resolves / rejects |
| PANEL | `closed` | `open` | Action click OR `Alt+Shift+M` OR context menu |
| PANEL | `open` | `closed` | User closes (Chrome event) |

### 1.3 Cross-cutting rule

- **Sync and AI must not cancel each other** when the side panel closes. Panel close ≠ stop all background work. Only `AI` transitions to `cancelled` on explicit user action (Stop button or 401 expiry).

---

## 2. Phase P0 — Correctness

Execute in the order below. Each item has a rollback point. The P0 exit gate is listed at the end.

### P0-1: Pick side panel as primary UI, remove default_popup

**Files:**
- `packages/web-extension/manifest.json:18-30` — remove `default_popup`, keep `default_icon` and `default_title`
- `packages/web-extension/src/background/index.ts:178` — change `setPanelBehavior({ openPanelOnActionClick: false })` to `true` (lift to module top level so it survives SW restart)

**Deps:** none (but depends on P0-2 version bump for `sidePanel.open()` outside action click).

**Rollback:** revert `default_popup` and the `openPanelOnActionClick` value. The popup was unused beyond a visual shortcut to the side panel.

**Acceptance tests:**

| Test | Method |
|---|---|
| Toolbar click → side panel opens | Manual: load unpacked, click extension icon |
| Keyboard `Alt+Shift+M` → side panel opens | Manual |
| `cmd.onCommand('open_side_panel')` → side panel opens | Manual |
| `manifest.json` validates | `npm run typecheck && npx web-ext lint --source-dir dist` (after build) |
| Action icon is the concierge logo | Manual visual |

**Rollback gate:** if `npm run typecheck` or `web-ext lint` fails, revert immediately.

---

### P0-2: Bump minimum_chrome_version to 116

**Files:**
- `packages/web-extension/manifest.json:110` — change `"minimum_chrome_version": "114"` to `"116"`

**Deps:** P0-1 (manifest change).

**Rollback:** revert to `"114"`.

**Why this is P0 (not P5):** Five call sites in live code already use `chrome.sidePanel.open({ tabId })` from outside action-click context:
- `omnibox.ts:49` (omnibox selection)
- `contextMenu.ts:79, 92` (context menu items)
- `index.ts:57` (background message handler)
- `popup/Popup.tsx:104` (popup)

Manifest declares 114 but code needs 116. Anyone on Chrome 114/115 who uses the omnibox or right-click-search gets a broken `sidePanel.open()`, not a future risk. This is a same-day fix.

**Acceptance test:** Verify all five call sites work; confirm manifest field matches.

---

### P0-3: Omnibox request-token generation (UUID, not counter)

**Files:**
- `packages/web-extension/src/background/omnibox.ts:14-41` — replace `latestRequestId` incrementing counter with `OmniboxGeneration` + `chrome.storage.session`
- `packages/web-extension/src/__tests__/omnibox.test.ts` — extend with SW-restart-mock test

**Deps:** none.

**Rollback:** revert to module-scoped counter.

**Implementation:**

```ts
// background/omnibox.ts
chrome.omnibox.onInputChanged.addListener(async (text, suggest) => {
  const generation: OmniboxGeneration = {
    id: crypto.randomUUID(),
    issuedAt: Date.now(),
  };
  await chrome.storage.session.set({ omniboxLatest: generation });

  try {
    const results = await cache.searchLocalAsync(text);
    const { omniboxLatest } = await chrome.storage.session.get('omniboxLatest');
    if (omniboxLatest?.id !== generation.id) return;  // superseded
    suggest(/* ... */);
  } catch (err) {
    const { omniboxLatest } = await chrome.storage.session.get('omniboxLatest');
    if (omniboxLatest?.id !== generation.id) return;
    suggest([]);
  }
});
```

**Acceptance tests:**

| Case | Setup | Expect |
|---|---|---|
| Out-of-order resolution | both calls resolve with new-keystroke first | stale request ignored |
| SW restart mid-resolution | simulate via two separate `setupOmnibox` invocations with different storage mocks | second instance still wins |
| Storage write fails | mock `storage.session.set` to reject | listener falls through, no `suggest()` call |
| Empty query | `''` | `suggest([])` |

---

### P0-4: `setTimeout(500)` race fix (pending panel queue)

**Files:**
- `packages/web-extension/src/background/omnibox.ts:52` — replace `setTimeout(500)` with storage.session write
- `packages/web-extension/src/background/contextMenu.ts:81` — same pattern
- `packages/web-extension/src/sidepanel/SidePanel.tsx` — on mount, drain `chrome.storage.session.pendingPanelEvents`

**Deps:** P0-3 (uses the same `chrome.storage.session` pattern).

**Rollback:** restore `setTimeout(500, ...)`.

**Why this matters:** Both `omnibox.ts:52` and `contextMenu.ts:81` open the side panel, then `setTimeout(500)` before `chrome.runtime.sendMessage({ type: 'SEARCH_QUERY' })`. Cold panel bundle load, slow machine, or large memory cache to hydrate can exceed 500ms. `runtime.sendMessage` doesn't queue for listeners that aren't mounted yet — the query is silently lost.

**Fix pattern:** Write the pending event to `chrome.storage.session.pendingPanelEvents` before opening the panel; the panel reads and clears it in a `useEffect` on mount.

**Acceptance tests:**

| Case | Setup | Expect |
|---|---|---|
| Cold panel load > 500ms | mock slow React hydrate | panel receives search query on mount |
| Panel already open | fast path | `sendMessage` succeeds immediately |
| Panel closed, reopen | storage has pending event | panel drains it on mount |

---

### P0-5: `ASK_AI` cancellation — single id, generated by caller

**Files:**
- `packages/web-extension/src/sidepanel/SidePanel.tsx:738-811` — add `aiRequestId` state, Stop button, `handleCancelAi`
- `packages/web-extension/src/background/index.ts:95-108` — add `inflightAskAi: Map<string, AbortController>`, handle `CANCEL_ASK_AI`
- `packages/web-extension/src/background/aiRouter.ts:42-105` — accept `externalSignal: AbortSignal | undefined`, listen for `abort`, remove listener in `finally`
- `packages/web-extension/src/__tests__/ai-cancellation.test.ts` — new file

**Deps:** none (orthogonal to P0-2, P0-3).

**Critical rule (one sentence, prevent the original bug):** The SidePanel generates `requestId` once via `crypto.randomUUID()` and puts it in the `ASK_AI` payload; the SW never calls `crypto.randomUUID()` for this — it only ever reads `message.payload.id`. One sentence, but it's the one that prevents the ID-mismatch cancellation bug.

**Acceptance tests:**

| Case | Setup | Expect |
|---|---|---|
| Cancel mid-flight | `fetch` returns a promise that resolves only after `controller.abort()` | `queryAIRouter` rejects; SW clears `inflightAskAi` |
| Cancel after resolve | cancel arrives after fetch resolves | no-op (id already removed) |
| Cancel with no in-flight | send `CANCEL_ASK_AI` with unknown id | SW returns `{ ok: true }`; no throw |
| `ASK_AI` without id | `payload: { query }` | SW returns `{ success: false, error: 'Missing request id' }` |
| Two concurrent `ASK_AI`s | two ids, two fetches | both tracked; cancel one leaves the other |

---

### P0-6: Broadcast helper for sync/mutation events

**Files:**
- `packages/web-extension/src/background/broadcast.ts` — new file, ~15 lines
- `packages/web-extension/src/background/index.ts` — wire `SYNC_COMPLETED` after `cache.sync()`, `MEMORY_ADDED` after `CREATE_MEMORY`, `MEMORY_UPDATED` after `UPDATE_MEMORY`, `MEMORY_DELETED` after `DELETE_MEMORY`
- `packages/web-extension/src/sidepanel/SidePanel.tsx:613-619` — `chrome.runtime.onMessage` listener now also reacts to `MEMORY_ADDED` / `MEMORY_UPDATED` / `MEMORY_DELETED` (in addition to existing `SEARCH_QUERY`)

**Deps:** none.

**Rollback:** delete `broadcast.ts` and the wire-in call sites; revert the side panel listener.

**Storage layering (correct per the review):**

| Layer | Purpose | Survives SW restart? | Survives panel close? |
|---|---|---|---|
| `chrome.storage.session` | ephemeral handoff (omnibox generation, pending panel events) | No | No (cleared on browser close) |
| `chrome.runtime.sendMessage` | live UI notification (memory added) | N/A | Only if a listener is registered |
| IndexedDB | authoritative local memory cache | Yes | Yes |

**Acceptance tests:**

| Case | Setup | Expect |
|---|---|---|
| SW broadcast with no listener mounted | `chrome.runtime.sendMessage` rejects | `broadcastToExtensionPages` does not throw (try/catch) |
| Sync completes → side panel receives `SYNC_COMPLETED` | panel mounted during sync | listener fires; React Query invalidates |
| Create from context menu → side panel receives `MEMORY_ADDED` | panel mounted | listener prepends new memory |
| Broadcast with panel closed | send; no listener | no throw; next panel mount reads via `storage.session` if applicable |

---

### P0-7: Auth hygiene — JWT decode + 401 handling (symmetric)

**Files:**
- `packages/web-extension/src/background/cache.ts:88-101` — extract `decodeJwtPayload(token): { exp?, iat? } | null` as a pure function
- `packages/web-extension/src/background/cache.ts:233-242` — `getAuthConfig` calls `decodeJwtPayload`; on failure returns `{ kind: 'stale', error: '...' }` — does NOT clear storage (both paths must be symmetric)
- `packages/web-extension/src/background/cache.ts:248-301` — `apiRequest` returns `{ kind: 'auth' }` on 401, `{ kind: 'forbidden' }` on 403, `{ kind: 'rate_limited' }` on 429 with `retryAfterSeconds`, `{ kind: 'server_error' }` on 5xx

**Deps:** none.

**Rollback:** revert `getAuthConfig` and `apiRequest` to their current shapes.

**Why symmetric:** A client-side `exp` check is a *guess* (clock skew, token format you haven't seen). A confirmed 401 from the server is *ground truth*. Both should surface a discriminant (`kind: 'stale'` vs `kind: 'auth'`) and let the UI decide what to do (which is what the 401 item already does — just apply the same restraint to the JWT-freshness path). Neither path auto-clears storage.

**Acceptance tests (new `cache-auth-hygiene.test.ts`):**

| Case | Setup | Expect |
|---|---|---|
| Valid JWT in future | `{ exp: Date.now()/1000 + 3600 }` | `getAuthConfig()` returns `{ token, ... }` |
| Expired JWT | `{ exp: Date.now()/1000 - 60 }` | returns `{ kind: 'stale' }`; storage NOT cleared |
| Malformed (not 3 parts) | `"abc.def"` | returns `{ kind: 'stale' }` |
| 30-second clock skew tolerance | `exp = now/1000 - 20` | still returns config |
| 31-second skew | `exp = now/1000 - 31` | returns `{ kind: 'stale' }` |
| Backend 401 | `apiRequest` returns status 401 | `{ kind: 'auth' }` with user-friendly message |
| Backend 429 | `apiRequest` returns status 429 + Retry-After header | `{ kind: 'rate_limited', retryAfterSeconds: N }` |
| Backend 500 | `apiRequest` returns status 500 | `{ kind: 'server_error' }` |

**Additional test — apiRequest status differentiation (new `api-request-status.test.ts`):**

| Case | Setup | Expect |
|---|---|---|
| Host permission missing | clear `host_permissions` for test origin | `apiRequest` returns `{ kind: 'permission_denied' }` instead of throwing `TypeError` |
| Host permission present | existing `manifest.json` | behavior unchanged |

---

### P0-8: Promise-cache sync singleton

**Files:**
- `packages/web-extension/src/background/sync.ts` (replace boolean gate with promise singleton)
- `packages/web-extension/src/background/cache.ts:163-167` — keep `isSyncing` for `getStatus()` UI badge; remove the early-return in `sync()` that uses it

**Deps:** none.

**Rollback:** restore `isSyncing` boolean check in `sync()`.

**Acceptance tests:**

| Case | Setup | Expect |
|---|---|---|
| Two overlapping alarms | fire `chrome.alarms.onAlarm` twice synchronously | `cache.sync()` invoked exactly once; second invocation sees the in-flight promise |
| Sync throws | `cache.sync` rejects | second invocation still skipped; `inflight` cleared in `finally` |
| `getStatus` reflects | after sync runs | `isSyncing === true` while in-flight, `false` after |

---

### P0-9: Pre-flight `chrome.permissions.contains()` before `apiRequest`

**Files:**
- `packages/web-extension/src/background/cache.ts:248-254` — add `contains({ origins: [...] })` check at the top of `apiRequest`

**Deps:** P0-7.

**Rollback:** remove the check.

**Acceptance test:**

| Case | Setup | Expect |
|---|---|---|
| Host permission missing | clear `host_permissions` for test origin | `apiRequest` returns `{ error: 'Host permission not granted…' }` instead of throwing `TypeError` |
| Host permission present | existing `manifest.json` | behavior unchanged |

---

### P0-10: Stable dev extension ID via `"key"` field

**Files:**
- `packages/web-extension/manifest.json` — add `"key"` (single-line base64) when ready to publish; remove for dev builds

**Deps:** none. Procedural — pack, upload as draft, copy public key.

**Rollback:** delete the `"key"` field.

---

## P0 Exit Gate (all must be green before P1):

- `npm run typecheck` passes
- `npm run lint` passes
- `npm run test` passes with the new test cases added
- `npm run build:chrome` produces a clean dist
- `npx web-ext lint --source-dir dist` reports zero warnings
- Manual: load unpacked → toolbar click opens side panel → search returns results → create memory → sync runs once
- Manual: kill SW via `chrome://extensions → service worker → Stop`, repeat — no double sync, side panel reacts to broadcast

---

## 3. Phase P1 — UX Resilience

Only start P1 after the P0 exit gate is green.

### P1-1: AI cancellation UI

**Files:**
- `packages/web-extension/src/sidepanel/SidePanel.tsx:738-811, 1073-1111` — Stop button visible while `isSending`; `handleCancelAi` sends `CANCEL_ASK_AI`

**Deps:** P0-5 (SW handler must exist).

**Rollback:** remove the Stop button + handler.

**Acceptance tests:**

| Case | Setup | Expect |
|---|---|---|
| Cancel a 45s generation at 2s | trigger `ASK_AI` with slow `fetch` mock | UI shows Stop; click → generation aborts within 200ms; UI returns to idle |
| Cancel after resolve | fetch resolves at 100ms; user clicks Stop at 200ms | no-op; no error toast |
| Cancel during pending create (not ASK_AI) | user in `CREATE_MEMORY` flow | Stop button hidden |

---

### P1-2: Runtime broadcasts wired into SidePanel

**Files:**
- `packages/web-extension/src/sidepanel/SidePanel.tsx:613-619` — extend listener to handle `MEMORY_ADDED` / `MEMORY_UPDATED` / `MEMORY_DELETED` / `SYNC_COMPLETED`

**Deps:** P0-6.

**Rollback:** revert the listener.

**Acceptance test:**

| Case | Setup | Expect |
|---|---|---|
| Create from context menu | context menu while panel open | panel prepends the new memory without a manual refresh |
| Delete from another surface | panel open, delete from options page | panel removes the row without a manual refresh |
| Sync completes | panel open, sync fires | panel refreshes its `syncStatus` badge |

---

### P1-3: Promisify `chrome.runtime.sendMessage` (all callback → await)

**Files:**
- New `packages/web-extension/src/background/messaging.ts` — promisified `sendMessage<T>(msg): Promise<T>`
- `packages/web-extension/src/popup/Popup.tsx` — replace 8 callback calls with `await`
- `packages/web-extension/src/sidepanel/SidePanel.tsx` — replace 19 callback calls with `await`

**Deps:** none (but must be done before P2 auth-state/cancellation plumbing lands on top of 19 more callback sites).

**Rollback:** revert to callback style.

**Why this is P1 and not P5:** Both popup (8 sites) and side panel (19 sites) use callback-style messaging. Promisifying saves a rewrite when the auth-state/cancellation work lands. Chrome 148 also added promise-returning listeners, making this the natural direction.

---

### P1-4: Define the state machine as a typed module

**Files:**
- `packages/web-extension/src/shared/state.ts` — new file, exports `AuthState`, `SyncState`, `AiState`, `PanelState` enums + transition guards

**Deps:** none (orthogonal documentation; types can be used by P0 items but don't gate them).

**Rollback:** delete the file.

This is a typed contract that future code must conform to. Adding types is non-breaking.

---

## 4. Phase P2 — Polish

Only after P1 is green.

### P2-1: Badge for unsynced count

`refreshUnsyncedBadge(cache)` helper; wire into `CREATE_MEMORY` / `DELETE_MEMORY` / `cache.sync()`; call `chrome.action.setBadgeText({ text: unsynced > 0 ? String(unsynced) : '' })`.

**Files:** new `src/background/badge.ts`, wire in `cache.ts` and `index.ts`.

**Acceptance:** create a memory with no network → badge shows `1`; sync succeeds → badge clears.

---

### P2-2: Panel lifecycle (`onOpened`, `onClosed`)

Register `chrome.sidePanel.onOpened` and `onClosed` handlers (Chrome 141/142). Do **not** auto-cancel background work — only flush pending UI state.

**Files:** `src/background/index.ts` (handler registration).

**Acceptance:** open panel → onOpened fires; close → onClosed fires; in-flight AI not cancelled.

---

### P2-3: Narrow permissions

If `Options.tsx` `ensureHostPermissionForOrigin` is unused after P1-3, drop `optional_host_permissions: ["<all_urls>"]`. Drop `content_scripts.matches: ["<all_urls>"]` if the content script is only needed on user-invoked flows (move to `chrome.scripting.executeScript` on demand).

**Files:** `manifest.json:42-48, 66-68`.

**Acceptance:** `web-ext lint` clean; manual smoke test of `Alt+S` "Save selection" still works.

---

## 5. Phase P3 — CWS Publishing Prep

Can run in parallel with P1–P2 (non-blocking).

### P3-1: Create CHROMEWEBSTORE.md at project root

- Single-line description (≤ 132 chars)
- Detailed description (≤ 16,000 chars) with 3-5 bullet features, user-benefit framing, NO implementation details
- Permissions justification — one plain-English reason per entry
- Privacy policy URL
- Version history (0.1.0 — initial release)
- Screenshots needed (at least 1 at 1280×800 or 640×400)

### P3-2: Run `web-ext lint` with zero warnings

### P3-3: Build clean ZIP

`bun run package:chrome` — ZIP excludes `.git/`, `node_modules/`, `.env`, `__tests__/`.

---

## 6. Phase P4 — Capability Expansion

Only after P2 is green and the cloud AI path is stable.

### P4-1: On-device `LanguageModel` fallback

**Files:**
- `packages/web-extension/src/sidepanel/aiMode.ts` — new file with `isOnDeviceAvailable()`, `startOnDeviceChat(query, topMemories, signal)`
- `packages/web-extension/src/sidepanel/SidePanel.tsx:738-811` — `handleSendChat` falls back to `startOnDeviceChat` when AI Router returns `kind: 'unavailable'`

**Three rules (must be enforced by tests):**

| Rule | Test |
|---|---|
| `topK` and `temperature` both set or both omitted | mock `LanguageModel.create`; verify call shape |
| `promptStreaming` chunk is full response, not delta | verify renderer replaces content, not appends |
| First `create()` for `downloadable` model inside a user gesture | grep for `create(` call site; require it to be inside a click handler chain |

---

## 7. What this plan deliberately does NOT do

- **Client-side JWT signature verification.** Out of scope; impossible without the server's public key. Backend is authoritative.
- **Migrate Popup entirely.** If P0-1 removes `default_popup`, the popup (`src/popup/Popup.tsx`) becomes orphaned. Decide in P2-3: drop the popup code path entirely, or keep the popup as a non-default UI.
- **On-device AI RAG over vector store.** P4-1 uses `LanguageModel` with `initialPrompts` for RAG, not the full embedding pipeline. The existing transformers.js offscreen embedding pipeline stays as-is.
- **Replace `chrome.runtime.sendMessage` with `chrome.runtime.connect` ports.** Ports are only needed for streaming; today's AI Router returns a single response. Defer until the router supports SSE.
- **Performance tuning.** Debounce, memoize, virtual scroll, bundle splitting — these belong in `OPTIMIZATION_CHECKLIST.md` as a separate performance track. Run them after P0–P3 are green.

---

## 8. Files changed (consolidated)

| File | P0 | P1 | P2 | P3 | P4 |
|---|---|---|---|---|---|
| `manifest.json` | P0-1, P0-2 | – | P2-3 | – | – |
| `src/background/index.ts` | P0-1, P0-4, P0-5, P0-6, P0-9 | – | P2-2 | – | – |
| `src/background/cache.ts` | P0-4, P0-5, P0-7, P0-8, P0-9 | – | P2-1 | – | – |
| `src/background/sync.ts` | P0-3 | – | – | – | – |
| `src/background/omnibox.ts` | P0-2, P0-4 | – | – | – | – |
| `src/background/contextMenu.ts` | P0-4 | – | – | – | – |
| `src/background/aiRouter.ts` | P0-5 | – | – | – | – |
| `src/background/broadcast.ts` (new) | P0-6 | – | – | – | – |
| `src/background/badge.ts` (new) | – | – | P2-1 | – | – |
| `src/background/messaging.ts` (new) | – | P1-3 | – | – | – |
| `src/background/offscreenManager.ts` | P0-4 (alarm fix) | – | – | – | – |
| `src/sidepanel/SidePanel.tsx` | P0-5, P0-6, P1-1 | P1-3 | P2-2 | P4-1 | – |
| `src/sidepanel/aiMode.ts` (new) | – | – | – | – | P4-1 |
| `src/options/Options.tsx` | – | P1-2 | – | – | – |
| `src/popup/Popup.tsx` | – | P1-3 | – | – | – |
| `src/shared/state.ts` (new) | – | P1-4 | – | – | – |
| New tests | P0-5, P0-7 | – | – | – | P4-1 |
| Extended tests | P0-2, `omnibox.test.ts` | – | – | – | – |

---

## 9. Risk register

| Risk | Likelihood | Mitigation |
|---|---|---|
| `default_popup` removal breaks existing keyboard command `_execute_action` semantics | Medium | `Alt+M` is wired to `_execute_action` which fires `chrome.action.onClicked`; with no popup, that opens the side panel. Add a manual smoke test. |
| Test mocks don't cover SW-restart scenarios | Medium | Use two separate `setupOmnibox` calls in the same test, not just one |
| `AbortController` race when SW wakes mid-flight | Low | The promise-cache singleton for sync; the Map for AI; both have `finally` cleanup |
| `storage.session` writes arrive out of order | Low | UUID token + `issuedAt` timestamp; the *latest write wins*, by definition |
| Publishing with dev `"key"` field | High if forgotten | Remove the key field in the publish pipeline (see `scripts/package.js`) |
| Side panel + content script interaction regresses | Low | No content script changes in P0/P1 |
| **Firefox build breaks** (no `sidePanel` / `offscreen` APIs) | **High** if ignored | **P0-9 browser capability matrix** gates all phases. Decide Chrome-only vs polyfill shim before any code lands. |

---

## 10. Testing matrix (consolidated)

### Service worker

| Test | File |
|---|---|
| SW terminate → wake → state correct | extend `background-sync.test.ts` |
| Two alarms → one sync | P0-3 acceptance |
| Storage read/write race in `getAuthConfig` (parallel calls) | new `cache-auth-hygiene.test.ts` |

### Sync

| Test | File |
|---|---|
| Two overlapping alarms → one sync | P0-3 |
| Sync throws → in-flight cleared, second call still skipped | P0-3 |
| Throttle gate (`l0_last_sync_attempt_at`) holds across SW restart | extend `background-sync.test.ts` |

### Auth

| Test | File |
|---|---|
| Valid JWT in future | P0-7 |
| Expired JWT → NOT auto-cleared | P0-7 |
| Malformed JWT | P0-7 |
| 30-second clock skew tolerance | P0-7 |
| Backend remains authoritative for signature | documentation in `cache.ts` header |
| 401 → `{ kind: 'auth' }` | P0-7 |
| 429 → `{ kind: 'rate_limited', retryAfterSeconds }` | P0-7 |
| 500 → `{ kind: 'server_error' }` | P0-7 |

### Omnibox

| Test | File |
|---|---|
| Out-of-order resolution | existing `omnibox.test.ts` |
| SW restart mid-resolution | extend `omnibox.test.ts` with second `setupOmnibox` call |
| Storage write fails | extend `omnibox.test.ts` |
| setTimeout(500) race fix (pending queue drains on mount) | new `omnibox-queue.test.ts` |

### AI

| Test | File |
|---|---|
| Cancel mid-flight | new `ai-cancellation.test.ts` |
| Cancel after resolve | new |
| Cancel with unknown id | new |
| `ASK_AI` without id | new |
| Two concurrent `ASK_AI`s | new |
| Existing AI Router tests | existing `ai-router.test.ts` |

### Messaging

| Test | File |
|---|---|
| Panel open + SW broadcast → listener fires | new `broadcast.test.ts` |
| Panel closed + SW broadcast → no throw | new |
| Search query handoff (omnibox → panel) | new |
| Promisified sendMessage works | new `messaging.test.ts` |

### Permissions

| Test | File |
|---|---|
| Host permission missing → friendly error | P0-9 |
| Pre-flight `permissions.contains()` blocks unauthorized fetch | P0-9 |

### UI / rendering

| Test | File |
|---|---|
| Toolbar click → side panel opens | manual |
| Keyboard `Alt+Shift+M` → side panel opens | manual |
| Context menu → side panel opens | manual |

---

## 11. Sign-off checklist

Before executing P0:

- [ ] This consolidated plan approved
- [ ] Decision on Firefox scope (Chrome-only vs polyfill shim)
- [ ] Decision on Chrome version floor (116+ vs 150+)
- [ ] Decision on popup fate (delete vs keep as non-default)
- [ ] Implementation agent has read all three source documents AND this consolidated plan

After each phase:

- [ ] All listed tests added and passing
- [ ] `npm run typecheck && npm run lint && npm run test && npm run build:chrome` green
- [ ] `npx web-ext lint --source-dir dist` zero warnings
- [ ] Manual smoke tests for that phase's acceptance criteria
- [ ] CHANGELOG / `OPTIMIZATION_CHECKLIST.md` updated to mark phase items ✅
