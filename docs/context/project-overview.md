# LanOnasis Aether Memory — Project Overview

> **Last updated**: 2026-05-08 — post-audit realignment. See `docs/context/context-engineering-progress.md` for full audit results.

## Quick Navigation for AI

This is the master context file. Based on your current task, refer to:

- **Architecture & Decisions**: `docs/context/architecture/decisions/` folder
- **Component Details**: `docs/context/components/[component-name]-context.md`
- **Progress & Methodology**: `docs/context/context-engineering-progress.md`
- **Audit Report**: `/tmp/lana_vscode_extension_audit_final.md`

## Project Essentials

| Property | Value |
|----------|-------|
| **Name** | LanOnasis Aether Memory |
| **Purpose** | Cross-platform Memory-as-a-Service (MaaS) with on-device AI |
| **Current Status** | Active development — VS Code extension v0.4.6 audited and cleared for release |
| **Tech Stack** | React 19, TypeScript, Tailwind CSS 4, Vite 7, Framer Motion, Bun 1.3.2, Turbo 2.8.9, Express, Drizzle ORM, PostgreSQL (pgvector) |
| **AI/ML** | Transformers.js + ONNX Runtime (all-MiniLM-L6-v2 quantized, 384-dim embeddings) |
| **Auth** | OAuth 2.0 (device code + PKCE) + API key — credentials stored in VS Code SecretStorage |
| **SDK** | `@lanonasis/mem-intel-sdk` v2.1.0 |
| **Architecture** | Monorepo with shared SDK. 4 deployment surfaces: web app, VS Code extension, mobile PWA, browser extension |

## Monorepo Structure (Post-Cleanup)

```
lzero-aether-mem/
├── client/                        # Web dashboard (React + Vite) — NOT the active IDE surface
│   └── src/packages/
│       ├── vscode-extension/      # Embedded copy of IDE extension UI (IDEPanel, components, hooks)
│       │                          # ⚠️ This is a web-embedded copy, NOT the VS Code extension itself
│       └── shared/                # Local types + mock data (duplicates packages/shared)
├── server/                       # Express REST API ⚠️ LEGACY — see server-backend-context.md
│   └── routes/
│       ├── index.ts               # Active route registration
│       ├── memories.routes.ts      # Active — memory CRUD endpoints
│       └── keys.routes.ts         # Active — API key endpoints
├── shared/                        # Database schema (Drizzle) + types
├── core/                         # Compliance manager, version manager, brand constants
├── packages/
│   ├── shared/                   # Cross-platform SDK + types (re-exports @lanonasis/mem-intel-sdk)
│   │   └── src/sdk/index.ts       # ⚠️ Has 5-min TTL cache — not fully documented in initial ADR
│   ├── mobile-pwa/               # ARM-optimized PWA (offline-first, service worker)
│   ├── vscode-extension/         # VS Code sidebar + chat participant (v0.4.6 — audited ✅)
│   └── web-extension/            # Browser extension (content + background scripts)
├── docs/context/                 # ← This documentation system
└── _archive/                     # Legacy context-intelligence-engine + stale VSIX artifacts
```

## Deployment Surfaces

| Surface | Location | Status |
|---------|----------|--------|
| Web dashboard | `client/` | Active — Vercel deployment |
| VS Code extension | `packages/vscode-extension/` | Active — v0.4.6 audited ✅, ~183 KB clean |
| Mobile PWA | `packages/mobile-pwa/` | Active — offline-first PWA |
| Browser extension | `packages/web-extension/` | Active |

## Key Context Files

| File | Purpose |
|------|---------|
| `docs/context/components/vscode-extension-context.md` | **Updated 2026-05-08** — full v0.4.6 architecture, security fixes, API proxy pattern |
| `docs/context/components/server-backend-context.md` | **Updated 2026-05-08** — actual endpoints vs aspirational; legacy server note |
| `docs/context/components/client-web-app-context.md` | Client embedding clarification; `client/src/packages/vscode-extension/` is a web copy |
| `docs/context/architecture/decisions/adr-001-sdk-migration.md` | Why local engine → npm SDK |
| `docs/context/architecture/decisions/adr-002-monorepo-structure.md` | Why Turbo + Bun workspaces |
| `docs/context/architecture/decisions/adr-003-on-device-ai.md` | Why Transformers.js + ONNX |
| `docs/context/context-engineering-progress.md` | Current audit status, PR closures, branch state |

## AI Collaboration Notes

### Coding Standards
- **TypeScript strict**: All packages use TypeScript. Prefer explicit types over `any`.
- **Schema-first**: Database changes go in `shared/schema.ts` first; generate Zod schemas with `drizzle-zod`.
- **Hook pattern**: React logic lives in `src/hooks/`. UI logic stays out of components where possible.
- **Re-export pattern**: `packages/shared/src/types/index.ts` re-exports `@lanonasis/mem-intel-sdk` types.

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
| `shared/schema.ts` | Database schema |
| `server/routes/` | Express route definitions (active: `memories.routes.ts`, `keys.routes.ts`) |
| `server/routes.ts` | ⚠️ Legacy consolidated routes — superseded by `routes/` |
| `server/storage.ts` | Database access layer |
| `packages/shared/src/types/index.ts` | Shared TypeScript types |
| `packages/shared/src/ai/embeddings.ts` | Local embedding engine |
| `packages/shared/src/sdk/index.ts` | SDK with 5-min TTL cache |
| `packages/vscode-extension/src/extension.ts` | Extension host (1,692 lines) |
| `packages/vscode-extension/src/services/SecureApiKeyService.ts` | Credential management (807 lines) |
| `vite.config.ts` | Root Vite config |
| `turbo.json` | Monorepo pipeline |
| `vercel.json` | Deployment headers + routing |

### Environment Variables
- `DATABASE_URL` — PostgreSQL connection
- `VITE_API_URL` — API base URL for client
- `VITE_API_KEY` — API key for client
- `VITE_ORGANIZATION_ID` — Org context
- `OAUTH_CLIENT_ID`, `OAUTH_CLIENT_SECRET` — OAuth config

## Repository State (Post-Audit)

### Branches
| Branch | Status | Notes |
|--------|--------|-------|
| `main` | ✅ Clean | Current working branch |
| `origin/align/mobile-pwa-desktop` | Side branch | Contains restructuring commits (not on main) |
| `origin/Devmode-active` | 🔴 Do not merge | Would delete web-extension, server routes, docs |
| `origin/LZ-1` | ⚠️ Review needed | Adds Expo mobile conflicting with existing PWA |
| `origin/pr16` | Side branch | Has artifact hygiene fixes (`.vsix`/`.tgz` removal) — not merged |

### PRs
| PR | Risk | Action |
|----|------|--------|
| PR #7 `Devmode-active` | 🔴 CRITICAL | **Reject** — would delete `packages/web-extension/`, server routes, `vercel.json`, 11 docs |
| PR #3 `LZ-1` | ⚠️ MEDIUM | Conflicts with existing mobile PWA — rebase or close |
| PR #15 | ✅ Safe | Documentation-only changes |
| PR #16 (from `pr16` branch) | ✅ Safe | Artifact hygiene + bug fixes — **should be merged** |

### Artifacts
- `*.vsix` and `*.tgz` files tracked in git — should be removed (see PR #16)
- `_archive/vscode-extension-assets/` — archived bloated VSIX files preserved for historical reference
- `logs/` folder (~40MB untracked) — Blackbox CLI API logs — should be deleted or gitignored
