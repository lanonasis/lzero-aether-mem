# Context Engineering Progress - LanOnasis Aether Memory

## Workflow Instructions

This file tracks all context engineering work for the LanOnasis Aether Memory project. When continuing in a new chat, start with:
> "Continue context engineering - read `docs/context/context-engineering-progress.md` for project settings and current status, then help with the next phase."

## Documentation Guidelines

- **ADR files**: `architecture/decisions/adr-XXX-decision-title.md`
- **Component files**: `components/[component-name]-context.md`
- **Workflow files**: `workflows/[workflow-name].md`
- **All files use Markdown** with standardized headers for AI parsing

## Project Specifications

| Property | Value |
|----------|-------|
| **Name** | LanOnasis Aether Memory |
| **Purpose** | Cross-platform Memory-as-a-Service (MaaS) with on-device AI |
| **Tech Stack** | React 19, TypeScript, Tailwind CSS, Vite, Bun, Turbo, Express, Drizzle ORM, PostgreSQL |
| **AI/ML** | Transformers.js + ONNX Runtime (all-MiniLM-L6-v2 quantized) |
| **Architecture** | Monorepo, multi-package (web, mobile PWA, VSCode ext, web ext) |
| **SDK** | `@lanonasis/mem-intel-sdk` v2.1.0 |
| **Package Manager** | Bun 1.3.2 |
| **Build Tool** | Turbo 2.8.9 |
| **Node** | >= 20.0.0 |

## Completed Phases

### Phase 1: Discovery & Planning
- ✅ Analyzed existing codebase structure
- ✅ Read all key documentation files (README, ARCHITECTURE, ROADMAP, MIGRATION, DEPLOYMENT, SETUP_CHECKLIST)
- ✅ Identified major architectural decisions and components
- ✅ Created directory structure: `docs/context/`
- ✅ Created `context-engineering-progress.md`
- ✅ Created `project-overview.md`
- ✅ Created ADR-001: SDK Migration (local engine -> npm package)
- ✅ Created ADR-002: Monorepo Structure (Turbo + Bun workspaces)
- ✅ Created ADR-003: On-Device AI Architecture (Transformers.js + ONNX)
- ✅ Created component context: shared-package
- ✅ Created component context: server-backend
- ✅ Created component context: client-web-app
- ✅ Created component context: vscode-extension
- ✅ Created component context: mobile-pwa
- ✅ Created component context: web-extension

### Phase 2: Core Documentation
- ✅ Created ADR-004: Offline-First Architecture
- ✅ Created ADR-005: Database Choice (PostgreSQL + Drizzle)
- ✅ Created `architecture/system-design.md` with detailed data flow
- ✅ Created workflow documentation: `workflows/development.md`
- ✅ Created workflow documentation: `workflows/deployment.md`

## Current Status / Findings

### Key Architectural Discoveries
1. **Build System Fix**: Migration from local `context-intelligence-engine` (1,468 lines, OOM errors) to `@lanonasis/mem-intel-sdk` reduced build time from failure to ~30s.
2. **Cross-Platform SDK Pattern**: All packages consume `packages/shared` which re-exports `@lanonasis/mem-intel-sdk` types.
3. **Offline-First PWA**: Mobile PWA uses service workers with local embedding generation (no network required for semantic search).
4. **Backend Simplicity**: Express server with Drizzle ORM, simple REST API for memories + API keys. No complex microservices.
5. **Core Module**: `core/` exports compliance manager, version manager, and brand constants (seems like a branding/governance layer).

### Codemap Reconciliation (2026-05-08)
Cross-referenced the AI-generated codemap with actual file system. Key corrections applied to context docs:

1. **Server routes split**: `server/routes/` contains `index.ts`, `memories.routes.ts`, `keys.routes.ts`. Legacy `server/routes.ts` exists but is superseded.
2. **Client packages embedding**: `client/src/packages/vscode-extension/` contains a copy/bridge of VSCode extension UI (`IDEPanel.tsx`, components, hooks) embedded inside the web dashboard. `client/src/packages/shared/` has local types and mock data. This duplication pattern was missed in initial discovery.
3. **SDK TTL cache**: `packages/shared/src/sdk/index.ts` implements a 5-minute TTL cache (`ttl = 5 * 60 * 1000`) with `load()` persistence. Not documented in initial component context.
4. **Codemap inaccuracies**: `/api/auth/validate` endpoint is referenced in codemap (mobile auth flow) but does NOT exist in `server/routes/`. Likely aspirational/planned.
5. **Codemap stale line numbers**: Header notes line numbers may be outdated — verified key paths against actual files.

### Repo State Review (from logs investigation)
- **`logs/` folder**: ~40MB of untracked OpenAI API logs from Blackbox CLI. Should be deleted or added to `.gitignore`.
- **Branch state**: Current branch `align/mobile-pwa-desktop` (2 commits ahead of local `main`). Local `main` is 1 commit ahead, 1 behind `origin/main`.
- **PR #7 (`Devmode-active`)**: CRITICAL — would delete entire `packages/web-extension/`, server routes, `vercel.json`, and 11 documentation files. **DO NOT MERGE**.
- **PR #3 (`LZ-1`)**: Architectural refactor adding `apps/mobile/` (Expo/React Native). Conflicts with existing mobile PWA. Requires rebase/review before merge.
- **PR #15**: Safe — documentation-only changes to web-extension optimization guides.

### File Locations
| Document | Path |
|----------|------|
| Progress tracker | `docs/context/context-engineering-progress.md` |
| Master overview | `docs/context/project-overview.md` |
| ADR-001 SDK Migration | `docs/context/architecture/decisions/adr-001-sdk-migration.md` |
| ADR-002 Monorepo | `docs/context/architecture/decisions/adr-002-monorepo-structure.md` |
| ADR-003 On-Device AI | `docs/context/architecture/decisions/adr-003-on-device-ai.md` |
| Shared Package | `docs/context/components/shared-package-context.md` |
| Server Backend | `docs/context/components/server-backend-context.md` |
| Client Web App | `docs/context/components/client-web-app-context.md` |
| VSCode Extension | `docs/context/components/vscode-extension-context.md` |
| Mobile PWA | `docs/context/components/mobile-pwa-context.md` |
| Web Extension | `docs/context/components/web-extension-context.md` |
| System Design | `docs/context/architecture/system-design.md` |
| Development Workflow | `docs/context/workflows/development.md` |
| Deployment Workflow | `docs/context/workflows/deployment.md` |
| Testing Strategy | `docs/context/workflows/testing.md` |
| Environment Variables | `docs/context/workflows/environment.md` |
| Maintenance Procedures | `docs/context/workflows/maintenance.md` |
| Codemap (AI-generated) | `docs/context/architecture/codemap-sample.md` |

## Next Steps

### ✅ All 3 Phases Complete

The core context engineering system is fully documented. Optional enhancements if needed:

- **ADR-006**: Authentication Architecture (Clerk/Auth.js vs alternatives)
- **ADR-007**: State Management (TanStack Query + Zustand vs Redux/MobX)
- **Component deep-dive**: `core/` module (compliance, versioning)
- **Troubleshooting guide**: Common errors and resolutions
- **API reference**: Full REST endpoint documentation
- **Onboarding guide**: New developer quick-start from context docs

### 🔴 Urgent Repo Hygiene (from branch audit)
- **Delete `logs/` folder** (~40MB untracked Blackbox CLI logs) or add to `.gitignore`
- **Reconcile `main` branch**: Local main is 1 ahead / 1 behind origin — push or reset
- **Close/Reject PR #7 (`Devmode-active`)**: Would destroy web-extension, server routes, deployment docs
- **Review PR #3 (`LZ-1`)**: Adds Expo mobile app that conflicts with existing PWA — needs rebase
- **Clean stale branches**: `Devmode-active`, `LZ-1` branches are conflicting and divergent

## Methodology Notes

- **Phase limit**: Maximum 3 phases per session to avoid context overload.
- **Confirmation required**: Before any file overwrites or structural changes.
- **Backup policy**: Existing docs are preserved; context files are additive.
