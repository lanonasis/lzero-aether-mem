# L0 Memory Extension — Consolidated Implementation Plan v3

**Date:** 2026-09-18
**Status:** Approved (decisions made)
**Scope:** All correctness, resilience, and publishing work for `packages/web-extension`.

---

## 0. Decisions made

| Decision | Choice | Rationale |
|---|---|---|
| Min Chrome version | **114+ with feature-detect** | Bump to 116 only where live code already calls 116-only APIs (same-day fix, not future risk) |
| Popup fate | **Delete** | `default_popup` removed; `src/popup/` deleted entirely |
| On-device AI | **Architecture open, feature-flagged** | `L0_FF_ON_DEVICE_AI` gates P4 items; code can land without shipping |
| Firefox scope | **Chrome-only for now** | Remove Firefox from `package.json` description, drop `build:firefox` script |

---

## 1. State machine (architectural foundation)

### 1.1 States and storage ownership

| State | Storage | Reason |
|---|---|---|
| **AUTH** = `unauthenticated` \| `authenticated` \| `expired` | `chrome.storage.local.l0_auth_token` + `chrome.storage.local.userEmail` | Durable, not session-scoped |
| **SYNC** = `idle` \| `scheduled` \| `running` \| `succeeded` \| `failed` | `chrome.storage.local.l0_last_sync_attempt_at` + `MemoryCache.isSyncing` (transient) | Throttle timestamp survives SW termination; in-flight flag does not |
| **AI** = `idle` \| `running` \| `cancelling` \| `cancelled` \| `succeeded` \| `failed` | SW module memory (`inflightAskAi` Map) | One user at a time; in-memory is correct |
| **PANEL** = `closed` \| `open` | Chrome `sidePanel` API events | Not persisted; reflected by listener registration |

### 1.2 State transitions

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
| AI | `running` | `succeeded` \| `failed` | Response resolves / rejects |
| PANEL | `closed` | `open` | Action click OR `Alt+Shift+M` OR context menu |
| PANEL | `open` | `closed` | User closes (Chrome event) |

### 1.3 Cross-cutting rule

Sync and AI must not cancel each other when the side panel closes. Panel close ≠ stop all background work. Only `AI` transitions to `cancelled` on explicit user action (Stop button or 401 expiry).

---

## 2. Phase P0 — Correctness

Execute in the order below. Each item has a rollback point.

### P0-1: Side panel primary UI, remove popup

**Files:**
- `packages/web-extension/manifest.json:18-26` — remove `default_popup`
- `packages/web-extension/src/background/index.ts:178` — change `openPanelOnActionClick: false` to `true`, lift to module top level
- `packages/web-extension/src/popup/` — **delete entire directory**
- `packages/web-extension/package.json` — remove `build:firefox`, `package:firefox` scripts; update description to "Chrome"

**Rollback:** revert `manifest.json` and `index.ts`; restore `src/popup/` from git.

**Acceptance tests:**

| Test | Method |
|---|---|
| Toolbar click → side panel opens | Manual: load unpacked, click extension icon |
| Keyboard `Alt+Shift+M` → side panel opens | Manual |
| `cmd.onCommand('open_side_panel')` → side panel opens | Manual |
| `manifest.json` validates | `npm run typecheck && npx web-ext lint --source-dir dist` (after build) |
| `src/popup/` deleted | `ls src/popup/` returns "not found" |

---

### P0-2: Bump minimum_chrome_version to 116 (live bug fix)

**Files:**
- `packages/web-extension/manifest.json:110` — change `"minimum_chrome_version": "114"` to `"116"`

**Why P0:** Five call sites in live code already use `chrome.sidePanel.open({ tabId })` from outside action-click context:
- `omnibox.ts:49`
- `contextMenu.ts:79, 92`
- `index.ts:57`
- `popup/Popup.tsx:104` (deleted in P0-1)

Anyone on Chrome 114/115 who uses omnibox or right-click-search gets a broken `sidePanel.open()`. This is a same-day fix.

**Rollback:** revert to `"114"`.

**Acceptance test:** All five call sites verified; manifest field updated.

---

### P0-3: Omnibox request-token generation (UUID, not counter)

**Files:**
- `packages/web-extension/src/background/omnibox.ts:14-41` — replace `latestRequestId` incrementing counter with `OmniboxGeneration` + `chrome.storage.session`
- `packages/web-extension/src/__tests__/omnibox.test.ts` — extend with SW-restart-mock test

**Rollback:** revert to module-scoped counter.

**Implementation:**

```ts
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
| Out-of-order resolution | both calls resolve, new-keystroke first | stale request ignored |
| SW restart mid-resolution | two separate `setupOmnibox` invocations | second instance wins |
| Storage write fails | mock `storage.session.set` to reject | listener falls through, no `suggest()` |
| Empty query | `''` | `suggest([])` |

---

### P0-4: `setTimeout(500)` race fix (pending panel queue)

**Files:**
- `packages/web-extension/src/background/omnibox.ts:52` — replace `setTimeout(500)` with storage.session write
- `packages/web-extension/src/background/contextMenu.ts:81` — same pattern
- `packages/web-extension/src/sidepanel/SidePanel.tsx` — on mount, drain `chrome.storage.session.pendingPanelEvents`

**Deps:** P0-3 (uses the same `chrome.storage.session` pattern).

**Rollback:** restore `setTimeout(500, ...)`.

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

**Critical rule:** The SidePanel generates `requestId` once via `crypto.randomUUID()` and puts it in the `ASK_AI` payload; the SW never calls `crypto.randomUUID()` for this — it only ever reads `message.payload.id`.

**Acceptance tests:**

| Case | Setup | Expect |
|---|---|---|
| Cancel mid-flight | `fetch` resolves only after `controller.abort()` | `queryAIRouter` rejects; SW clears `inflightAskAi` |
| Cancel after resolve | cancel arrives after fetch resolves | no-op (id already removed) |
| Cancel with no in-flight | send `CANCEL_ASK_AI` with unknown id | SW returns `{ ok: true }`; no throw |
| `ASK_AI` without id | `payload: { query }` | SW returns `{ success: false, error: 'Missing request id' }` |
| Two concurrent `ASK_AI`s | two ids, two fetches | both tracked; cancel one leaves the other |

---

### P0-6: Broadcast helper for sync/mutation events

**Files:**
- `packages/web-extension/src/background/broadcast.ts` — new file, ~15 lines
- `packages/web-extension/src/background/index.ts` — wire `SYNC_COMPLETED` after `cache.sync()`, `MEMORY_ADDED` after `CREATE_MEMORY`, `MEMORY_UPDATED` after `UPDATE_MEMORY`, `MEMORY_DELETED` after `DELETE_MEMORY`
- `packages/web-extension/src/sidepanel/SidePanel.tsx:613-619` — listener reacts to `MEMORY_ADDED` / `MEMORY_UPDATED` / `MEMORY_DELETED`

**Rollback:** delete `broadcast.ts` and the wire-in call sites; revert the side panel listener.

**Storage layering:**

| Layer | Purpose | Survives SW restart? | Survives panel close? |
|---|---|---|---|
| `chrome.storage.session` | ephemeral handoff (omnibox generation, pending panel events) | No | No (cleared on browser close) |
| `chrome.runtime.sendMessage` | live UI notification (memory added) | N/A | Only if a listener is registered |
| IndexedDB | authoritative local memory cache | Yes | Yes |

**Acceptance tests:**

| Case | Setup | Expect |
|---|---|---|
| SW broadcast with no listener mounted | `sendMessage` rejects | `broadcastToExtensionPages` does not throw (try/catch) |
| Sync completes → side panel receives `SYNC_COMPLETED` | panel mounted during sync | listener fires; React Query invalidates |
| Create from context menu → side panel receives `MEMORY_ADDED` | panel mounted | listener prepends new memory |
| Broadcast with panel closed | send; no listener | no throw |

---

### P0-7: Auth hygiene — JWT decode + 401 handling (symmetric, neither path auto-clears)

**Files:**
- `packages/web-extension/src/background/cache.ts:88-101` — extract `decodeJwtPayload(token): { exp?, iat? } | null` as a pure function
- `packages/web-extension/src/background/cache.ts:233-242` — `getAuthConfig` calls `decodeJwtPayload`; on failure returns `{ kind: 'stale', error: '...' }` — does NOT clear storage (both paths symmetric)
- `packages/web-extension/src/background/cache.ts:248-301` — `apiRequest` returns `{ kind: 'auth' }` on 401, `{ kind: 'forbidden' }` on 403, `{ kind: 'rate_limited' }` on 429 with `retryAfterSeconds`, `{ kind: 'server_error' }` on 5xx

**Symmetric rule:** Neither the client-side `exp` check nor the server-confirmed 401 auto-clears storage. Both surface a discriminant (`kind: 'stale'` vs `kind: 'auth'`) and let the UI decide. A confirmed 401 is ground truth; a client-side `exp` check is a guess. Both deserve the same restraint.

**Rollback:** revert `getAuthConfig` and `apiRequest` to their current shapes.

**Acceptance tests (new `cache-auth-hygiene.test.ts`):**

| Case | Setup | Expect |
|---|---|---|
| Valid JWT in future | `{ exp: Date.now()/1000 + 3600 }` | `getAuthConfig()` returns `{ token, ... }` |
| Expired JWT | `{ exp: Date.now()/1000 - 60 }` | returns `{ kind: 'stale' }`; storage NOT cleared |
| Malformed (not 3 parts) | `"abc.def"` | returns `{ kind: 'stale' }` |
| 30-second clock skew tolerance | `exp = now/1000 - 20` | still returns config |
| 31-second skew | `exp = now/1000 - 31` | returns `{ kind: 'stale' }` |
| Backend 401 | `apiRequest` returns status 401 | `{ kind: 'auth' }` |
| Backend 429 | 429 + Retry-After header | `{ kind: 'rate_limited', retryAfterSeconds: N }` |
| Backend 500 | 500 | `{ kind: 'server_error' }` |

---

### P0-8: Promise-cache sync singleton

**Files:**
- `packages/web-extension/src/background/sync.ts` — replace boolean gate with promise singleton
- `packages/web-extension/src/background/cache.ts:163-167` — keep `isSyncing` for `getStatus()` UI badge; remove the early-return in `sync()` that uses it

**Rollback:** restore `isSyncing` boolean check in `sync()`.

**Acceptance tests:**

| Case | Setup | Expect |
|---|---|---|
| Two overlapping alarms | fire `chrome.alarms.onAlarm` twice synchronously | `cache.sync()` invoked exactly once; second sees in-flight promise |
| Sync throws | `cache.sync` rejects | second still skipped; `inflight` cleared in `finally` |
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

**Deps:** P0-5.

**Rollback:** remove the Stop button + handler.

### P1-2: Runtime broadcasts wired into SidePanel

**Files:**
- `packages/web-extension/src/sidepanel/SidePanel.tsx:613-619` — extend listener to handle `MEMORY_ADDED` / `MEMORY_UPDATED` / `MEMORY_DELETED` / `SYNC_COMPLETED`

**Deps:** P0-6.

### P1-3: Promisify `chrome.runtime.sendMessage` (Popup + SidePanel)

**Files:**
- New `packages/web-extension/src/background/messaging.ts` — promisified `sendMessage<T>(msg): Promise<T>`
- `packages/web-extension/src/sidepanel/SidePanel.tsx` — replace 19 callback calls with `await`
- `packages/web-extension/src/options/Options.tsx` — replace remaining callback calls

**Deps:** none (must be done before auth-state/cancellation plumbing lands on top of 19 more callback sites).

**Rollback:** revert to callback style.

### P1-4: Define the state machine as a typed module

**Files:**
- `packages/web-extension/src/shared/state.ts` — new file, exports `AuthState`, `SyncState`, `AiState`, `PanelState` enums + transition guards

**Deps:** none (orthogonal documentation; types can be used by P0 items but don't gate them).

**Rollback:** delete the file.

---

## 4. Phase P2 — Polish

Only after P1 is green.

### P2-1: Badge for unsynced count

`refreshUnsyncedBadge(cache)` helper; wire into `CREATE_MEMORY` / `DELETE_MEMORY` / `cache.sync()`.

**Files:** new `src/background/badge.ts`, wire in `cache.ts` and `index.ts`.

**Acceptance:** create a memory with no network → badge shows `1`; sync succeeds → badge clears.

### P2-2: Panel lifecycle (`onOpened`, `onClosed`)

Register `chrome.sidePanel.onOpened` and `onClosed` handlers (Chrome 141/142). Do **not** auto-cancel background work — only flush pending UI state.

**Files:** `src/background/index.ts` (handler registration).

**Acceptance:** open panel → onOpened fires; close → onClosed fires; in-flight AI not cancelled.

### P2-3: Narrow permissions

If `Options.tsx` `ensureHostPermissionForOrigin` is unused after P1-3, drop `optional_host_permissions: ["<all_urls>"]`. Drop `content_scripts.matches: ["<all_urls>"]` if the content script is only needed on user-invoked flows (move to `chrome.scripting.executeScript` on demand).

**Files:** `manifest.json:42-48, 66-68`.

**Acceptance:** `web-ext lint` clean; manual smoke test of `Alt+S` "Save selection" still works.

### P2-4: Modern Chrome feature adoptions (feature-detected, Chrome 114+ baseline)

- `chrome.sidePanel.getLayout()` for RTL (Chrome 140)
- `chrome.alarms.create({ persistAcrossSessions: true })` if supported
- `chrome.action.onUserSettingsChanged` (Chrome 130) — show "Pin L0 Memory" hint

**Acceptance:** each feature-detected at runtime; no hard requirement on minimum version bump.

---

## 5. Phase P3 — CWS Publishing Prep

Can run in parallel with P1–P2 (non-blocking).

### P3-1: Create CHROMEWEBSTORE.md at project root

- Single-line description (≤ 132 chars)
- Detailed description (≤ 16,000 chars) with 3-5 bullet features
- Permissions justification — one plain-English reason per entry
- Privacy policy URL
- Version history (0.1.0 — initial release)
- Screenshots needed (at least 1 at 1280×800 or 640×400)

### P3-2: Run `web-ext lint` with zero warnings

### P3-3: Build clean ZIP

`bun run package:chrome` — ZIP excludes `.git/`, `node_modules/`, `.env`, `__tests__/`.

---

## 6. Phase P4 — On-Device AI (Feature-flagged)

Only after P2 is green and the cloud AI path is stable. Gated by `L0_FF_ON_DEVICE_AI`.

### P4-1: On-device `LanguageModel` fallback

**Files:**
- `packages/web-extension/src/sidepanel/aiMode.ts` — new file with `isOnDeviceAvailable()`, `startOnDeviceChat(query, topMemories, signal)`
- `packages/web-extension/src/sidepanel/SidePanel.tsx` — `handleSendChat` falls back to `startOnDeviceChat` when AI Router returns `kind: 'unavailable'` AND `L0_FF_ON_DEVICE_AI` is enabled

**Three rules (enforced by tests):**

| Rule | Test |
|---|---|
| `topK` and `temperature` both set or both omitted | mock `LanguageModel.create`; verify call shape |
| `promptStreaming` chunk is full response, not delta | verify renderer replaces content, not appends |
| First `create()` for `downloadable` model inside a user gesture | grep for `create(` call site; require it to be inside a click handler chain |

### P4-2: `Summarizer` for memory previews (Chrome 138+)

Feature-detected; falls back to first-140-chars if unavailable.

---

## 7. What this plan deliberately does NOT do

- **Client-side JWT signature verification.** Out of scope; impossible without the server's public key. Backend is authoritative.
- **Firefox support.** Chrome-only for P0–P3. Firefox scope can be revisited after shipping.
- **On-device AI RAG over vector store.** P4-1 uses `LanguageModel` with `initialPrompts` for RAG, not the full embedding pipeline.
- **Replace `chrome.runtime.sendMessage` with `chrome.runtime.connect` ports.** Ports are only needed for streaming; defer until AI Router supports SSE.
- **Performance tuning.** Debounce, memoize, virtual scroll, bundle splitting — belong in `OPTIMIZATION_CHECKLIST.md` as a separate performance track, run after P0–P3 are green.

---

## 8. Files changed (consolidated)

| File | P0 | P1 | P2 | P3 | P4 |
|---|---|---|---|---|---|
| `manifest.json` | P0-1, P0-2 | – | P2-3 | – | – |
| `src/background/index.ts` | P0-1, P0-4, P0-5, P0-6, P0-9 | – | P2-2 | – | – |
| `src/background/cache.ts` | P0-4, P0-5, P0-7, P0-8, P0-9 | – | P2-1 | – | – |
| `src/background/sync.ts` | P0-8 | – | – | – | – |
| `src/background/omnibox.ts` | P0-3, P0-4 | – | – | – | – |
| `src/background/contextMenu.ts` | P0-4 | – | – | – | – |
| `src/background/aiRouter.ts` | P0-5 | – | – | – | – |
| `src/background/broadcast.ts` (new) | P0-6 | – | – | – | – |
| `src/background/messaging.ts` (new) | – | P1-3 | – | – | – |
| `src/background/badge.ts` (new) | – | – | P2-1 | – | – |
| `src/sidepanel/SidePanel.tsx` | P0-5, P0-6 | P1-1, P1-2, P1-3 | P2-2 | – | P4-1 |
| `src/sidepanel/aiMode.ts` (new) | – | – | – | – | P4-1 |
| `src/options/Options.tsx` | – | P1-3 | – | – | – |
| `src/shared/state.ts` (new) | – | P1-4 | – | – | – |
| `src/popup/` (directory) | **DELETE** | – | – | – | – |
| `package.json` | P0-1 (remove Firefox) | – | – | – | – |
| New tests | P0-5, P0-7 | – | – | – | P4-1 |
| Extended tests | `omnibox.test.ts` | – | – | – | – |

---

## 9. Risk register

| Risk | Likelihood | Mitigation |
|---|---|---|
| `default_popup` removal breaks `_execute_action` keyboard semantics | Medium | `Alt+M` fires `chrome.action.onClicked` → with no popup, opens side panel. Manual smoke test added to P0-1. |
| Test mocks don't cover SW-restart scenarios | Medium | Two separate `setupOmnibox` calls in the same test, not one |
| `AbortController` race when SW wakes mid-flight | Low | Promise-cache singleton for sync; Map for AI; both have `finally` cleanup |
| `storage.session` writes arrive out of order | Low | UUID token + `issuedAt`; latest write wins by definition |
| Publishing with dev `"key"` field | High if forgotten | Remove in `scripts/package.js` pipeline |
| Side panel + content script interaction regresses | Low | No content script changes in P0/P1 |
| Popup deletion breaks `Alt+M` shortcut description in manifest | Low | `commands._execute_action` description is static text; actual behavior correct |

---

## 10. Sign-off checklist

**Before executing P0:**
- [x] Decisions confirmed (Chrome 114+, delete popup, feature-flag on-device AI, Chrome-only)
- [ ] This plan approved
- [ ] Implementation agent has read this plan

**After each phase:**
- [ ] All listed tests added and passing
- [ ] `npm run typecheck && npm run lint && npm run test && npm run build:chrome` green
- [ ] `npx web-ext lint --source-dir dist` zero warnings
- [ ] Manual smoke tests for that phase's acceptance criteria
- [ ] CHANGELOG updated to mark phase items ✅
