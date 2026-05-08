# LanOnasis Aether Memory - Context Overview

## Quick Navigation for AI

This is the master context file. Based on your current task, refer to:

- **Architecture & Decisions**: `docs/context/architecture/decisions/` folder
- **Component Details**: `docs/context/components/[component-name]-context.md`
- **Progress & Methodology**: `docs/context/context-engineering-progress.md`

## Project Essentials

- **Purpose**: Cross-platform Memory-as-a-Service (MaaS) platform. Developers capture, search, and recall development context using on-device AI embeddings. No cloud calls required for semantic search.
- **Tech Stack**:
  - Frontend: React 19, TypeScript, Tailwind CSS 4, Vite 7, Framer Motion
  - State: Zustand, TanStack Query
  - AI/ML: Transformers.js + ONNX Runtime (all-MiniLM-L6-v2 quantized, 384-dim embeddings)
  - Backend: Node.js, Express, Drizzle ORM, PostgreSQL (with pgvector)
  - Build: Bun 1.3.2, Turbo 2.8.9
  - Auth: Clerk/Auth.js
  - UI: Radix UI primitives, Lucide icons, shadcn/ui patterns
- **Architecture Pattern**: Monorepo with shared SDK. Multi-target packages (web app, VSCode extension, mobile PWA, browser extension) consuming a common `packages/shared` layer.
- **Current Focus**: SDK integration (`@lanonasis/mem-intel-sdk` v2.1.0) across all packages. Memory analysis, pattern detection, duplicate detection, and tag suggestions.

## Monorepo Structure

```
lzero-aether-mem/
├── client/              # Web dashboard (React + Vite)
│   └── src/packages/    # Embedded vscode-extension UI + local shared types
├── server/              # Express API + storage layer
│   └── routes/          # Sub-routers: memories.routes.ts, keys.routes.ts
├── shared/              # Database schema (Drizzle) + types
├── core/                # Compliance manager, version manager, brand constants
├── packages/
│   ├── shared/          # Cross-platform SDK & types (re-exports mem-intel-sdk)
│   ├── mobile-pwa/      # ARM-optimized PWA (offline-first)
│   ├── vscode-extension/ # VS Code sidebar panel extension
│   └── web-extension/   # Browser extension (content + background scripts)
├── docs/context/        # <-- This documentation system
└── _archive/            # Legacy context-intelligence-engine (archived)
```

## Key Context Files

| File | Purpose |
|------|---------|
| `docs/context/architecture/decisions/adr-001-sdk-migration.md` | Why local engine was replaced with npm SDK |
| `docs/context/architecture/decisions/adr-002-monorepo-structure.md` | Why Turbo + Bun workspaces |
| `docs/context/architecture/decisions/adr-003-on-device-ai.md` | Why Transformers.js + ONNX for embeddings |
| `docs/context/components/shared-package-context.md` | Shared SDK types, AI utilities, re-exports |
| `docs/context/components/server-backend-context.md` | Express routes, storage, database |
| `docs/context/components/client-web-app-context.md` | Web dashboard, React hooks, pages |
| `docs/context/components/vscode-extension-context.md` | VSCode extension architecture |
| `docs/context/components/mobile-pwa-context.md` | PWA, offline-first, service worker |
| `docs/context/components/web-extension-context.md` | Browser extension content/background |

## AI Collaboration Notes

### Coding Standards
- **TypeScript strict**: All packages use TypeScript. Prefer explicit types over `any`.
- **Schema-first**: Database changes go in `shared/schema.ts` first; generate Zod schemas with `drizzle-zod`.
- **Hook pattern**: React logic lives in `src/hooks/`. UI logic stays out of components where possible.
- **Re-export pattern**: `packages/shared/src/types/index.ts` re-exports `@lanonasis/mem-intel-sdk` types for unified imports.

### Common Patterns
- **Memory CRUD**: All surfaces (web, mobile, ext) perform the same memory operations via the SDK or REST API.
- **Embedding generation**: `packages/shared/src/ai/embeddings.ts` wraps Transformers.js. Used offline.
- **Storage abstraction**: `server/storage.ts` is the single interface for DB operations. `server/mock-storage.ts` exists for dev/testing.

### Constraints
- **Build order**: `packages/shared` must build before `client` or any package that imports it.
- **WASM/SharedArrayBuffer**: Vercel deployment requires COOP/COEP headers (configured in `vercel.json`).
- **Node >= 20**: Required for native features and dependency compatibility.
- **Bun package manager**: Use `bun install`, not `npm install`.

### Important File Paths
- `shared/schema.ts` - Database schema (users, memories, api_keys)
- `server/routes/` - Express route definitions (REST API sub-routers)
- `server/storage.ts` - Database access layer
- `packages/shared/src/types/index.ts` - Shared TypeScript types
- `packages/shared/src/ai/embeddings.ts` - Local embedding engine
- `vite.config.ts` - Root Vite config (builds client/)
- `turbo.json` - Monorepo pipeline config
- `vercel.json` - Deployment headers + routing

### Environment Variables
Key vars used across the project:
- `DATABASE_URL` - PostgreSQL connection
- `VITE_API_URL` - API base URL for client
- `VITE_API_KEY` - API key for client
- `VITE_ORGANIZATION_ID` - Org ID for client
- `OAUTH_CLIENT_ID`, `OAUTH_CLIENT_SECRET` - OAuth config
