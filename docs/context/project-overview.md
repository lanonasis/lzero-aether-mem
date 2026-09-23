# LanOnasis Aether Memory — Project Overview

> **Last updated**: 2026-09-23

## Quick Navigation for AI

This is the master context file. Based on your current task, refer to:

- **Architecture & Decisions**: `docs/context/architecture/decisions/`
- **Component Details**: `docs/context/components/[component-name]-context.md`
- **Workflows**: `docs/context/workflows/`
- **Progress & Methodology**: `docs/context/context-engineering-progress.md`

## Project Essentials

| Property | Value |
|----------|-------|
| **Name** | LanOnasis Aether Memory |
| **Purpose** | Cross-platform Memory-as-a-Service (MaaS) with on-device AI |
| **Current Status** | Active development |
| **Tech Stack** | React 19, TypeScript, Tailwind CSS 4, Vite 8, Framer Motion, Bun 1.3.2, Turbo 2.9.14, Express, Drizzle ORM, PostgreSQL (pgvector) |
| **AI/ML** | Transformers.js + WebGPU/WASM (all-MiniLM-L6-v2 quantized, 384-dim embeddings) |
| **Auth** | OAuth 2.0 (PKCE) + API key — credentials stored in VS Code SecretStorage |
| **SDK** | `@lanonasis/shared` — memory CRUD, security keys, React hooks |
| **Architecture** | Monorepo with shared SDK. 5 deployment surfaces: web app, VS Code extension, Chrome extension, mobile PWA, native mobile |

## Monorepo Structure (Current)

```
lzero-aether-mem/
├── client/                        # Web dashboard (React + Vite + Wouter)
│   └── src/packages/
│       ├── vscode-extension/      # Web-embedded copy of IDE extension UI
│       └── web-extension/         # Chrome extension sources (Dashboard, RichPanel)
├── packages/
│   ├── shared/                    # Cross-platform SDK + types
│   ├── vscode-extension/          # VS Code sidebar extension (MV3)
│   ├── web-extension/             # Chrome/Edge browser extension (MV3)
│   ├── mobile-pwa/                # Vite-based PWA with service worker
│   └── server/                    # Express API server
├── apps/mobile/                   # Expo / React Native app
├── server/                        # Backend API (root-level mirror)
└── docs/                          # Documentation (docs/README.md)
```

## Deployment Surfaces

| Surface | Location | Status |
|---------|----------|--------|
| Web dashboard | `client/` | Active — Vercel deployment |
| VS Code extension | `packages/vscode-extension/` | Active — published on marketplace |
| Chrome extension | `packages/web-extension/` | Active — build from source |
| Mobile PWA | `packages/mobile-pwa/` | Active — Vite + service worker |
| Mobile (Native) | `apps/mobile/` | Active — Expo/React Native |

## Key Context Files

| File | Purpose |
|------|---------|
| `docs/context/components/vscode-extension-context.md` | Full VS Code extension architecture, security, API proxy |
| `docs/context/components/web-extension-context.md` | Chrome extension architecture |
| `docs/context/components/server-backend-context.md` | API endpoints and server architecture |
| `docs/context/architecture/decisions/adr-001-sdk-migration.md` | Why local engine → npm SDK |
| `docs/context/architecture/decisions/adr-002-monorepo-structure.md` | Why Turbo + Bun workspaces |
| `docs/context/architecture/decisions/adr-003-on-device-ai.md` | Why Transformers.js + ONNX |
| `docs/context/architecture/decisions/adr-004-offline-first-architecture.md` | Offline-first design rationale |
| `docs/context/architecture/decisions/adr-005-database-choice.md` | Database selection rationale |

## AI Collaboration Notes

### Coding Standards

- **TypeScript strict**: All packages use TypeScript. Prefer explicit types over `any`.
- **Schema-first**: Database changes go in `shared/schema.ts` first; generate Zod schemas with `drizzle-zod`.
- **Hook pattern**: React logic lives in `src/hooks/`. UI logic stays out of components where possible.
- **Re-export pattern**: `packages/shared/src/types/index.ts` re-exports SDK types.

### Common Patterns

- **Memory CRUD**: All surfaces perform memory operations via SDK or REST API.
- **Embedding generation**: `packages/shared/src/ai/embeddings.ts` wraps Transformers.js. Works offline.
- **Storage abstraction**: `server/storage.ts` is the DB access layer. `server/mock-storage.ts` for dev.
- **SDK TTL cache**: `packages/shared/src/sdk/index.ts` — 5-minute TTL cache (`ttl = 5 * 60 * 1000`).

### Constraints

- **Build order**: `packages/shared` must build before `client` or any package that imports it.
- **WASM/SharedArrayBuffer**: Vercel deployment requires COOP/COEP headers (`vercel.json`).
- **Node >= 20**: Required.
- **Bun package manager**: Use `bun install`, not `npm install`.

### Important File Paths

| Path | Purpose |
|------|---------|
| `shared/schema.ts` | Database schema (Drizzle) |
| `server/routes/` | Express route definitions |
| `server/storage.ts` | Database access layer |
| `packages/shared/src/types/index.ts` | Shared TypeScript types |
| `packages/shared/src/ai/embeddings.ts` | Local embedding engine |
| `packages/shared/src/sdk/index.ts` | SDK with TTL cache |
| `packages/vscode-extension/src/extension.ts` | Extension host |
| `packages/vscode-extension/src/services/SecureApiKeyService.ts` | Credential management |
| `vite.config.ts` | Root Vite config |
| `turbo.json` | Monorepo pipeline |
| `vercel.json` | Deployment headers + routing |

### Environment Variables

- `DATABASE_URL` — PostgreSQL connection
- `VITE_API_URL` — API base URL for client
- `VITE_API_KEY` — API key for client
- `VITE_ORGANIZATION_ID` — Org context
- `OAUTH_CLIENT_ID`, `OAUTH_CLIENT_SECRET` — OAuth config

## Repository State

### VS Code Extension Version History

| Version | Notes |
|---------|-------|
| 0.4.7 | Latest stable — security fixes and bug fixes |
| 0.4.6 | Full audit cleared — XSS fixes, webview credential hardening |
| 0.4.4 | Major bloat fix (4.3MB → 183KB) |
| 0.3.x | Feature additions |
| 0.1.x | Initial release |

_Last updated: 2026-09-23 by Derick_
