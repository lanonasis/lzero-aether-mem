# Server Backend Context

## Purpose

Express-based REST API providing memory CRUD, semantic search, and API key management. Acts as the cloud sync backend for offline-first clients.

## Key Files

- `server/index.ts` - Express app setup, middleware, server start
- `server/routes/index.ts` - Route registration entry point (delegates to sub-routers)
- `server/routes/memories.routes.ts` - Memory CRUD + search routes
- `server/routes/keys.routes.ts` - API key management routes
- `server/routes.ts` - Legacy consolidated routes file (may be deprecated in favor of routes/)
- `server/storage.ts` - Database access layer (Drizzle ORM queries)
- `server/db.ts` - Database connection initialization (PostgreSQL via `@neondatabase/serverless`)
- `server/mock-storage.ts` - In-memory storage for dev/testing when DB unavailable
- `server/vite.ts` - Vite dev server integration for development

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/memories` | List user's memories |
| GET | `/api/memories/search?q=` | Search memories by query |
| POST | `/api/memories` | Create new memory |
| PATCH | `/api/memories/:id` | Update memory |
| DELETE | `/api/memories/:id` | Delete memory |
| GET | `/api/keys` | List API keys (tokens masked) |
| POST | `/api/keys/generate` | Generate new API key |
| POST | `/api/keys/:id/rotate` | Rotate API key |
| POST | `/api/keys/:id/revoke` | Revoke API key |

## Database Schema (`shared/schema.ts`)

- `users` - id, username, password
- `memories` - id, userId, title, content, type (enum: todo/code/docs/status/workflow), tags[], createdAt, updatedAt
- `api_keys` - id, userId, name, token, scope, environment, createdAt, lastRotated, lastUsed

## Dependencies

- `express` - Web framework
- `drizzle-orm` + `drizzle-zod` - ORM and schema validation
- `@neondatabase/serverless` - PostgreSQL connection (serverless-compatible)
- `zod` - Runtime validation

## Integration Points

- **Client/Web**: Consumes REST API for cloud sync
- **Mobile PWA**: Syncs queued local changes when online
- **VSCode Extension**: May call API for team/shared memories (future)

## Constraints

- Authentication is currently simplified (req.user?.id check); production uses Clerk/Auth.js
- Rate limiting and CORS configured in `server/index.ts`
- `storage.ts` is the abstraction layer; swapping `mock-storage.ts` requires no route changes

## Dev Commands

```bash
bun run dev:server   # tsx watch server/index.ts
```
