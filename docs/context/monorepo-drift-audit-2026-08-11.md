# Monorepo Drift Audit — 2026-08-11

> **Scope**: `packages/vscode-extension` (v0.4.7) and `packages/web-extension` (v0.2.0), audited against the current `lan-onasis-monorepo` backend contract. Supersedes the version-currency claims in `ecosystem-grounding.md` (dated 2026-05-08, now 3 months stale) for these two packages specifically — that doc's repository-boundary model (npm packages + HTTP contracts only, no shared code) is still correct and is the framing this audit used.
>
> **Companion PR**: [lanonasis/lzero-aether-mem#19](https://github.com/lanonasis/lzero-aether-mem/pull/19) — fixed the mechanical/safe items below. This doc is the durable record of everything found, including the larger items that PR does *not* fix.

---

## What was fixed (see PR #19)

| Fix | Package | Why |
|---|---|---|
| Omnibox search called a dead sync stub (`searchLocal`, always `[]`) instead of `searchLocalAsync` | web-extension | Chrome address-bar search never worked at all |
| API key validation only whitelisted `lano_`/`lns_`, rejecting backend-valid `lms_`/`vibe_`/`sk_`/`pk_`/`master_` keys | web-extension | Users with legitimately-issued keys got a false "invalid format" error |
| Stale hardcoded `"v0.1.0"` footer string | web-extension | Cosmetic, but visibly wrong (actual: 0.2.0) |
| `@lanonasis/shared` missing `"private": true` | packages/shared | Name collides with an unrelated, different `@lanonasis/shared` package in the monorepo; publishing this one would clobber that name |
| `downlevelIteration` tsconfig option deprecated under installed TS version, breaking `bun run typecheck` | vscode-extension | Reproducible `TS5101` failure; removal is behaviorally a no-op (target/module already ES2020) |
| Root `dev:extension`/`build:extension` scripts filtered on the extension's old package name (`@lanonasis/vscode-extension`) instead of its real name (`lzero-memory`) | root | Both scripts were silent no-ops |

All fixes verified: both extensions' test suites pass unchanged (5/5 web, 10/10 vscode) and both build cleanly.

---

## What was found but NOT fixed — needs a real decision, not a mechanical patch

### 1. Both extensions bypass the SDKs they declare as dependencies (HIGH — architectural)

**vscode-extension**: `package.json` declares `@lanonasis/memory-client`, `@lanonasis/oauth-client`, `@lanonasis/security-sdk` as runtime dependencies. `grep -rn "from '@lanonasis" src/` returns **zero matches**. `MemoryService.ts`, `SecureApiKeyService.ts`, and `ApiKeyService.ts` all hand-roll their own `fetch`-based HTTP client, PKCE/device-code OAuth implementation, and key validation instead of using the SDKs they claim to depend on.

**web-extension**: `cache.ts` only imports the `MemoryEntry` *type* from `@lanonasis/memory-client` — the SDK client class itself is never instantiated. The extension's own hand-rolled endpoint builders (`buildListMemoriesEndpoint` → `/memory/list`, etc.) are singular-only with no fallback, while the actual SDK (`apps/lanonasis-maas/packages/memory-client/src/core/client.ts`) treats plural `/memories/*` as the real contract and singular as a compat fallback — for `createMemory` specifically, the SDK has **no singular fallback at all**.

**Why this matters**: today this works because `apps/onasis-core/_redirects` still aliases singular↔plural 1:1. But both extensions own 100% of the maintenance burden for staying in sync with backend contract changes (new key prefixes, new auth grant types, endpoint shape changes) with zero upstream-SDK safety net. A backend change that only updates the SDK will silently not reach either extension.

**Decision needed**: migrate both extensions to actually use the declared SDKs (preferred — eliminates duplication and inherits future contract updates for free), or formally drop the unused SDK dependencies and accept the hand-rolled clients as the intentional design (with the maintenance cost that implies).

### 2. `SecureApiKeyService.ts` (vscode-extension) has zero test coverage on security-critical code (HIGH)

807 lines handling OAuth device-code + PKCE flows, the local callback HTTP server, secret storage/migration, and `escapeHtml()` — the exact code a prior internal audit (`vscode-extension-audit-plan-v0.4.6.md`) called out as fixing a "CRITICAL" XSS vulnerability and a credential-exposure vulnerability. No test locks either fix in place; a future refactor could silently reintroduce either.

Also untested: `extension.ts`'s webview API proxy (`isAllowedApiRequestUrl()`, `handleApiRequest()`) — the origin/path allowlist the same prior audit called a fixed "CRITICAL" vuln (direct authenticated API calls from the webview). No regression test exists for a bypass attempt.

### 3. Mock API-key generator in the webview mints deprecated-prefix keys (MEDIUM)

`vscode-extension/src/webview/hooks/useApiKeys.ts:45,68` — `generateKey`/`rotateKey` are local-only stubs (comment: "Full security SDK integration TBD") that fabricate `lns_`-prefixed tokens client-side and never call the backend. Not currently exploitable (no network call happens), but if this UI ever ships as real, it would mint keys in a prefix the backend logs as `DEPRECATED` and never actually register them server-side — non-functional keys handed to users. Should be gated/disabled in the UI or wired to the real backend before it's reachable.

### 4. Web-extension: content-script / background-worker message boundary is untested (MEDIUM — MV3 security surface)

`src/content/index.ts` is the cross-origin messaging boundary between arbitrary web pages' content-script context and the background worker (`SAVE_SELECTION`/`CREATE_MEMORY` messages). Zero test coverage on exactly the kind of boundary Manifest V3 extensions need to defend. Low *current* risk since `manifest.json` declares no `externally_connectable`, but a documented sender-authorization check (`sender.tab && sender.frameId===0` gating) from the extension's own publishing plan was never implemented in `background/index.ts`.

### 5. Coverage gap summary (both packages)

**vscode-extension** — 10,779 bytes of test code across 3 files, essentially unchanged since the v0.4.6 audit measured 11,779 bytes two point releases ago, against `extension.ts` (1,692 lines), `SecureApiKeyService.ts` (807), `ApiKeyService.ts` (409), `chatParticipant.ts` (378 — the request/response correlation logic a prior audit specifically flagged as a fixed regression, with no test locking that fix in).

**web-extension** — only 2 test files, both covering pure helper functions (`normalizeApiUrl`, `looksLikeJwt`, `buildAuthHeaders`, endpoint builders). Zero coverage on: `Options.tsx` (where the API-key validation bug this audit found actually lived), the `MemoryCache` class itself (auth/network I/O — only pure functions are tested), `background/index.ts`'s message router, and everything under `content/`, `omnibox.ts` (whose bug this audit found would have been caught by even a shallow test), `contextMenu.ts`, `sync.ts`, `offscreenManager.ts`. `@vitest/coverage-v8` is installed and `vitest.config.ts` configures a coverage block, but no script ever passes `--coverage` — coverage is configured but never measured.

**Recommended order** (both packages): (1) lock in the two already-fixed security vulnerabilities from the v0.4.6 audit with regression tests before anything else, (2) test the credential-validation/storage code paths specifically (where this audit's concrete bug lived), (3) test the MV3 message-passing boundaries, (4) wire `--coverage` into the web-extension's test script so future gaps are visible instead of silent.

---

## Minor/low-priority items noted, not actioned

- vscode-extension UI copy (`extension.ts:44` `VALID_API_KEY_PREFIXES`, `IDEPanel.tsx` placeholders) still promotes `lano_`/`lns_` equally. Not broken — backend still accepts `lns_` during its deprecation window — but should eventually promote `lano_` only to match the canonical status. Low urgency, UX-only.
- Backend's `handleDeviceCodeGrant` never emits `slow_down`, making the vscode-extension's `slow_down` backoff branch (`SecureApiKeyService.ts:279-283`) dead code. Trivial cleanup, not a bug.
- `apps/lanonasis-maas/CLAUDE.md`'s "API Usage Examples" (plural, path-param, PUT/DELETE style) describes the *standalone Express server*, which per that repo's own CLAUDE.md is explicitly not the production routing path. Neither extension uses that contract, correctly — noting it here so a future audit doesn't mistake it for the live contract (the Netlify `_redirects` → Supabase Edge Function mapping is the real one).

---

_Audit performed 2026-08-11 by parallel agents cross-referencing `packages/vscode-extension` and `packages/web-extension` source against the live `lan-onasis-monorepo` checkout, plus actual test/build execution for both packages._
