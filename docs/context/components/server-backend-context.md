# Server Backend Context

## Purpose

Express-based REST API providing memory CRUD, semantic search, and API key management. Acts as the cloud sync backend for offline-first clients. The local Express server is legacy infrastructure from the hackathon prototype; the active runtime for the VS Code extension uses hosted API services via `@lanonasis/mem-intel-sdk`. See "Legacy Status" below.

## Key Files

| File | Status | Description |
|------|--------|-------------|
| `server/routes/index.ts` | ✅ Active | Route registration — delegates to sub-routers |
| `server/routes/memories.routes.ts` | ✅ Active | Memory CRUD + search routes |
| `server/routes/keys.routes.ts` | ✅ Active | API key management routes |
| `server/routes.ts` | ⚠️ Legacy | Old consolidated routes file — superseded by `routes/` |
| `server/storage.ts` | ✅ Active | Database access layer (Drizzle ORM queries) |
| `server/db.ts` | ✅ Active | Database connection (PostgreSQL via `@neondatabase/serverless`) |
| `server/mock-storage.ts` | ✅ Dev | In-memory storage for dev/testing without DB |
| `server/vite.ts` | ✅ Dev | Vite dev server integration |

## Actual API Endpoints (Implemented)

### Memory Routes (`server/routes/memories.routes.ts`)

| Method | Path | VS Code Extension Route | Notes |
|--------|------|------------------------|-------|
| GET | `/api/memories` | `/api/memories` | List user's memories |
| GET | `/api/memories/search` | `/memory/search` (POST) | Semantic search; extension uses POST |
| POST | `/api/memories` | `/memory` (POST) | Create memory |
| PATCH | `/api/memories/:id` | `/memory/update` (POST) | Update memory |
| DELETE | `/api/memories/:id` | `/memory/delete?id=` | Delete memory |
| GET | `/api/memories/list` | — | Extension uses `/memory/list?limit=100` |

> **Note**: The VS Code extension (v0.4.3+) migrated from Supabase Edge Function paths (`/functions/v1/memory-*`) to REST API endpoints (`/memory/*`). Extension-side route constants are defined in `packages/vscode-extension/src/extension.ts` (lines 46–50).

### Key Routes (`server/routes/keys.routes.ts`)

| Method | Path | VS Code Extension Route | Notes |
|--------|------|------------------------|-------|
| GET | `/auth/api-keys` | `/api/v1/api-keys` (fixed in v0.4.5) | List API keys; extension strips `/auth` prefix |
| POST | `/auth/api-keys` | — | Generate new API key |
| POST | `/auth/api-keys/:id/rotate` | — | Rotate API key |
| POST | `/auth/api-keys/:id/revoke` | — | Revoke API key |

> **Route discrepancy**: `keys.routes.ts` uses `/auth/api-keys/*` but the extension was updated in v0.4.5 to use `/api/v1/api-keys` — the server routes need alignment to remove the `/auth` prefix or the extension needs to proxy through a different path.

## Planned / Aspirational Endpoints

| Endpoint | Status | Notes |
|----------|--------|-------|
| POST `/api/auth/validate` | ❌ Not implemented | Referenced in mobile auth flow in codemap; does NOT exist in `server/routes/`. Needs implementation if mobile auth flow is prioritized. |
| GET `/api/memories/list` | ⚠️ In extension, not server | Extension uses `/memory/list?limit=100&sortBy=updated_at&sortOrder=desc` but server only has `/api/memories` (no limit/sort params) |
| POST `/memory/search` | ✅ Extension-only | Extension uses this; server-side has `GET /api/memories/search?q=` |

## Database Schema (`shared/schema.ts`)

- `users` — id, username, password
- `memories` — id, userId, title, content, type (enum: context/project/knowledge/reference/personal/workflow), tags[], createdAt, updatedAt
- `api_keys` — id, userId, name, token, scope, environment, createdAt, lastRotated, lastUsed

## Dependencies

- `express` — Web framework
- `drizzle-orm` + `drizzle-zod` — ORM and schema validation
- `@neondatabase/serverless` — PostgreSQL connection (serverless-compatible)
- `zod` — Runtime validation

## Integration Points

- **Client/Web**: Consumes REST API for cloud sync
- **Mobile PWA**: Syncs queued local changes when online
- **VSCode Extension**: Uses hosted API services (not `server/`); `server/` is legacy

## Legacy Status ⚠️

> The `server/` directory is a **legacy hackathon prototype**. The active runtime path for the VS Code extension and other packages uses hosted API services via `@lanonasis/mem-intel-sdk` — not this local Express server. Route mismatches here are NOT current production blockers unless the local server is reactivated for self-hosted deployment.

## Constraints

- Authentication is simplified (`req.user?.id` check); production uses Clerk/Auth.js
- Rate limiting and CORS configured in `server/index.ts`
- `storage.ts` is the abstraction layer; swapping `mock-storage.ts` requires no route changes

## Dev Commands

```bash
bun run dev:server   # tsx watch server/index.ts
```

## Last Verified

2026-05-08 — endpoint table verified against actual source in `server/routes/memories.routes.ts` and `server/routes/keys.routes.ts` at commit `87b6a2b` (main).
