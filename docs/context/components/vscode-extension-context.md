# VS Code Extension Context

## Purpose

VS Code sidebar panel extension that provides memory search, capture, and intelligence features directly in the IDE. Allows developers to recall context without leaving their editor. Supports both desktop VS Code and VS Code for the Web (vscode.dev, github.dev, Codespaces).

**Current version**: `0.4.6` (commit `b85f930`) — all critical security fixes verified ✅

## Key Files (v0.4.6)

| File | Lines | Purpose |
|------|-------|---------|
| `src/extension.ts` | 1,692 | Extension activation, command registration, webview provider, sync logic |
| `src/services/SecureApiKeyService.ts` | 807 | Credential storage, OAuth PKCE + device code flows, token management |
| `src/services/MemoryService.ts` | ~400 | Memory CRUD operations (create, update, delete, search) |
| `src/services/ApiKeyService.ts` | ~600 | API key management (list, create, rotate, revoke) |
| `src/chatParticipant.ts` | 378 | VS Code Chat integration (`@memory find/save/list`) |
| `src/memoryCache.ts` | ~300 | Local caching via `vscode.globalState` with offline support |
| `src/webview/IDEPanel.tsx` | 2,250 | Main sidebar React UI — chat, memory list, sync status |
| `src/webview/main.tsx` | 441 | Webview entry point — installs API bridge proxy, message handling |
| `src/providers/MemoryTreeProvider.ts` | ~300 | Tree view for memories in Explorer sidebar |
| `src/providers/ApiKeyTreeProvider.ts` | ~500 | Tree view for API keys |
| `src/crypto.ts` | ~100 | Web Crypto utilities for cross-platform compatibility |

## Architecture (v0.4.6)

### Webview Proxy Pattern (Critical Security Fix)

The extension uses a **host-mediated API proxy** to prevent credential exposure:

```
Webview (React UI)
    │ postMessage({ type: 'lanonasis:api:request', payload: { url, method, headers, body } })
    ▼
Extension Host (extension.ts)
    │ Validates URL (must match allowed origin + /api/*)
    │ Strips auth headers from webview request
    │ Injects Authorization/X-API-Key from SecretStorage
    ▼
Remote API (api.lanonasis.com)
```

**No credentials are ever passed to the webview.** The webview's `window.fetch` is monkey-patched in `main.tsx` to route `/api/*` requests through the extension host.

### Message Types (extension ↔ webview)

| Direction | Type | Purpose |
|-----------|------|---------|
| ← webview | `lanonasis:webview-ready` | Webview initialized |
| → webview | `lanonasis:host-ready` | Extension host ready |
| → webview | `lanonasis:config:init` | Auth config (no secrets) |
| ← webview | `lanonasis:request-auth` | Trigger OAuth/API key flow |
| ← webview | `lanonasis:submit-api-key` | API key from user input |
| ← webview | `lanonasis:api:request` | Proxied API call |
| → webview | `lanonasis:api:response` | Proxied API response |
| ←/→ | `lanonasis:sync:*` | Sync state machine |
| ←/→ | `lanonasis:ai:search*` | AI search with requestId correlation |

## Commands (Implemented)

| Command | Description |
|---------|-------------|
| `lzeroMemory.authenticate` | Trigger OAuth or API key authentication |
| `lzeroMemory.createMemoryFromSelection` | Create memory from editor selection |
| `lzeroMemory.syncMemories` | Force full sync |
| `lzeroMemory.searchMemories` | Open search panel |
| `lzeroMemory.manageApiKeys` | Open API key management |
| `lzeroMemory.createProject` | Create a new project |
| `lzeroMemory.viewProjects` | View projects |
| `lzeroMemory.rotateApiKey` | Rotate an API key |

## Chat Participant

- **Participant ID**: `lanonasis.memory`
- **Commands**: `@memory find [query]`, `@memory save [content]`, `@memory list`
- **Fix in v0.4.6**: AI search responses are now correctly matched to originating request via `requestId` (previously blind mutation of last assistant message)

## Authentication (SecureApiKeyService)

Two flows supported:
1. **OAuth 2.0 Device Code Flow** — primary, recommended
2. **OAuth 2.0 PKCE Flow** — fallback if device code fails

**Token storage**: VS Code `SecretStorage` only — credentials never touch `globalState` or `workspaceState`.

**Migration path**: Legacy keys (`lanonasis.apiKey`, `lanonasis.tokens`) migrated on first run via `migrateLegacySecrets()`.

## VSIX Build & Publishing

```bash
cd packages/vscode-extension
bun run build && bun run build:webview
vsce package          # Creates .vsix
vsce publish          # Publishes to marketplace
```

**Build artifact**: `lzero-memory-0.4.6.vsix` — clean size ~183 KB (fixed from 4.3 MB bloat on 2026-05-08).

### VSIX Artifact Hygiene

- `*.vsix` and `*.tgz` are excluded from `.vscodeignore` (root `.gitignore` also excludes both)
- Stale artifacts from v0.4.3-v0.4.5 period are archived in `_archive/vscode-extension-assets/`
- All `.vsix` files are tracked in git — should be removed (see `pr16` branch for proper fix)

## v0.4.6 Security Fixes (All Verified ✅)

| Fix | Risk | Verification |
|-----|------|-------------|
| OAuth XSS — `escapeHtml()` on callback errors | CRITICAL | Applied to all error output in PKCE callback server |
| Webview credential removal | CRITICAL | `sendConfigToWebview()` sends only `{apiUrl, isAuthenticated, authMethod, user}` |
| AI search correlation via requestId | HIGH | `IDEPanel.tsx` uses `activeAiRequestIdRef` to match responses |
| Sync state stuck (isSyncing flag) | HIGH | `setSyncing(false)` called before posting `sync:complete` |

## Known Issues

| Issue | Severity | Status |
|-------|----------|--------|
| VSIX bloat (4.3 MB stale tgz) | HIGH | ✅ FIXED 2026-05-08 — `.vscodeignore` updated, VSIX rebuilt at 183 KB |
| CHANGELOG missing 0.4.2–0.4.5 | MEDIUM | ✅ FIXED 2026-05-08 — entries written |
| Stale `.vsix` files in git | LOW | Should be removed via `git rm` + `.gitignore` update |
| PR #7 (`Devmode-active`) destructive | CRITICAL | Do not merge — would delete web-extension, server routes, docs |
| PR #3 (`LZ-1`) Expo conflict | MEDIUM | Conflicts with existing PWA — needs rebase before review |

## Build Commands

```bash
bun run build          # Compile TypeScript (desktop + web bundles)
bun run build:webview  # Build React webview (Vite)
bun run test           # Vitest unit tests
bun run typecheck      # tsc --noEmit
bun run clean          # Remove out/, media/sidebar-react.*
```

## Constraints

- Minimum VS Code version: `1.93.0` (Chat Participant API requirement)
- Webview runs in isolated context; all API calls must proxy through extension host
- Activation: `onStartupFinished` (non-blocking)
- `extensionKind`: `ExtensionKind.UI` (desktop) + `ExtensionKind.Web` (web)

## Last Verified

2026-05-08 — full source audited at commit `87b6a2b` (main branch).
