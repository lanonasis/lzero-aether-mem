# Ecosystem Grounding — lzero-aether-mem + lan-onasis-monorepo

> **Date**: 2026-05-08  
> **Purpose**: Establish a clear mental model of how both repositories fit together, for use in future context-engineering sessions. This is a knowledge document — not a plan or a task list.

---

## Repositories Are Isolated — Not a Monorepo

These are two **separate git repositories**. They are maintained independently.

| Repo | Role | Primary focus |
|------|------|---------------|
| `lzero-aether-mem` | Client platform | Web app, VS Code extension, mobile PWA, browser extension |
| `lan-onasis-monorepo` | Backend platform | Auth gateway, MCP server, MaaS API, docs site |

**No cross-repo submodules, no shared file paths, no git dependencies between them.** The connection is through **runtime contracts**: HTTP APIs, npm packages, and published SDKs.

---

## The Backend Platform: lan-onasis-monorepo

### Core Components

#### 1. `apps/onasis-core` — Platform core + auth gateway

This is the central platform app. It contains both the React frontend (`src/`) and backend services (`services/`).

```
apps/onasis-core/
├── src/                          # React frontend (Vite + React 19)
├── server/                        # Express entry point (ecosystem.config.cjs, index.js)
├── services/
│   ├── auth-gateway/              # ← PRIMARY AUTH ENDPOINT
│   │   ├── src/
│   │   │   ├── controllers/       # auth.controller.ts, oauth.controller.ts, admin.controller.ts
│   │   │   ├── routes/           # auth.routes.ts, oauth.routes.ts, api-keys.routes.ts, cli.routes.ts, mcp.routes.ts
│   │   │   ├── services/        # oauth.service.ts, user.service.ts, session.service.ts, project-scope.service.ts
│   │   │   ├── middleware/      # Auth + validation middleware
│   │   │   └── index.ts         # Entry point
│   │   ├── config/               # Environment + domain config
│   │   ├── supabase/            # DB migrations + Edge Functions (_shared/)
│   │   └── docs/                # Supabase API documentation
│   ├── api-gateway/             # Unified gateway (consolidated routing)
│   ├── key-manager/             # API key lifecycle management
│   ├── mcp/                     # MCP-related services
│   ├── middleware/              # Shared middleware
│   ├── security/                # Security services
│   └── unified-router/          # Cross-service routing
```

**auth-gateway** is the primary OAuth2 PKCE implementation. It is NOT a submodule — it is a first-class service living inside `apps/onasis-core/services/auth-gateway/`. It has its own `Dockerfile`, `docker-compose.yml`, `nginx.conf`, and deployment scripts.

**Key auth routes in auth-gateway:**
- `auth.routes.ts` — login, register, refresh, logout
- `oauth.routes.ts` — OAuth2 consent + token exchange
- `api-keys.routes.ts` — vendor API key management
- `cli.routes.ts` — CLI-facing auth operations

#### 2. `apps/lanonasis-maas` — Memory-as-a-Service domain

"Domain" not "microservice" — this app owns the memory platform's CLI, API surface, deploy scripts, docs, and nested packages.

```
apps/lanonasis-maas/
├── src/                          # Service implementation
├── cli/                           # CLI surface
├── packages/                      # Nested packages — key for SDK ecosystem
│   ├── memory-sdk/               # @lanonasis/memory-sdk-standalone v1.1.0
│   ├── memory-client/           # @lanonasis/memory-client v2.2.1 (universal MaaS client)
│   ├── lanonasis-sdk/           # (not yet inspected)
│   ├── memory-engine/           # (not yet inspected)
│   ├── recall-forge/            # (not yet inspected)
│   ├── claude-memory/           # Claude memory integration
│   ├── ide-extension-core/      # IDE extension core
│   └── repl-cli/                # REPL CLI tool
├── supabase/                     # DB migrations + Edge Functions
└── docs/                         # App-specific documentation
```

**Important distinction:**
- `packages/memory-sdk` (standalone) → `@lanonasis/memory-sdk-standalone` v1.1.0
- `packages/memory-client` → `@lanonasis/memory-client` v2.2.1
- These are different packages with different purposes

#### 3. `apps/mcp-core` — MCP protocol server

The MCP server that serves `mcp.lanonasis.com`. It has 31+ tools registered. This is what the MCP protocol client connects to.

#### 4. `packages/` — Shared SDK layer

| Package | Purpose |
|---------|---------|
| `oauth-client` | Active auth client (NOT `shared-auth` which is deprecated) |
| `security-sdk` | Security utilities |
| `memory-sdk` | `@lanonasis/memory-sdk` v1.0.0 — SDK for memory platform integration |
| `memory-intelligence-engine` | Memory intelligence module |
| `shared`, `shared-db`, `shared-types`, `shared-i18n` | Cross-app normalization |
| `ui-kit`, `brand-kit` | Design system |

---

## The Client Platform: lzero-aether-mem

This is the **four-surface client monorepo**:

```
lzero-aether-mem/
├── client/                        # React web dashboard (NOT the IDE surface)
│   └── src/packages/
│       ├── vscode-extension/       # Web-embedded copy of IDE UI (webview, NOT the VS Code ext)
│       └── shared/                # Local types + mock data
├── server/                        # ⚠️ LEGACY Express server — not the active runtime
├── shared/                        # DB schema + types
├── packages/
│   ├── shared/                   # Cross-platform SDK + types (re-exports @lanonasis/mem-intel-sdk)
│   ├── mobile-pwa/              # ARM-optimized PWA
│   ├── vscode-extension/        # VS Code sidebar + chat participant (v0.4.6 — audited ✅)
│   └── web-extension/          # Browser extension
├── docs/context/                 # ← THIS documentation system
└── _archive/                     # Archived legacy artifacts
```

**Active runtime path**: All packages use `@lanonasis/mem-intel-sdk` v2.1.0 from npm — NOT the local `server/` directory. The `server/` is legacy prototype code.

---

## How the Two Ecosystems Connect

### Runtime Connection Map

```
lzero-aether-mem (client surfaces)
    │
    │ HTTP REST + SDK calls
    ▼
api.lanonasis.com / mcp.lanonasis.com / auth.lanonasis.com
    │
    ▼
lan-onasis-monorepo (backend platform)
    ├── auth-gateway (:4000)  ──► OAuth2 PKCE, login/register, API keys
    ├── unified-gateway (:3000) ──► Memory CRUD, MaaS API
    ├── mcp-core (:3104)       ──► MCP protocol server (31+ tools)
    └── Supabase Edge Functions ──► Intelligence, memory inference
```

### SDK Dependency Graph

```
lzero-aether-mem
└── @lanonasis/mem-intel-sdk (npm) ← published SDK

lan-onasis-monorepo
├── packages/memory-sdk (@lanonasis/memory-sdk-standalone v1.1.0) ← standalone
├── packages/memory-client (@lanonasis/memory-client v2.2.1) ← universal client
├── packages/memory-sdk (@lanonasis/memory-sdk v1.0.0) ← SDK for memory platform
└── apps/lanonasis-maas/
    └── packages/
        ├── memory-client v2.2.1
        └── memory-sdk-standalone v1.1.0
```

**Note**: `@lanonasis/mem-intel-sdk` and `@lanonasis/memory-sdk*` are **different packages** with different purposes. `mem-intel-sdk` appears to be the intelligence/reasoning layer; `memory-sdk` is the raw memory CRUD client.

---

## Key File Locations (lan-onasis-monorepo)

### Auth Gateway — Primary OAuth2 PKCE Implementation
```
apps/onasis-core/services/auth-gateway/src/
├── index.ts                      # Service entry point
├── controllers/
│   ├── auth.controller.ts        # Login, register, refresh, logout
│   └── oauth.controller.ts       # OAuth2 consent + token exchange
├── routes/
│   ├── auth.routes.ts            # /auth/* endpoints
│   ├── oauth.routes.ts           # /oauth/* endpoints
│   └── api-keys.routes.ts       # Vendor API key management
├── services/
│   ├── oauth.service.ts          # OAuth2 PKCE implementation
│   ├── user.service.ts           # User management
│   ├── session.service.ts        # Session lifecycle
│   └── project-scope.service.ts  # Project/tenant scoping
└── middleware/
```

### MaaS Memory Platform
```
apps/lanonasis-maas/
├── src/                          # Core service
├── packages/
│   ├── memory-client/            # @lanonasis/memory-client v2.2.1
│   │   └── src/
│   │       └── index.ts          # Universal MaaS client entry
│   └── memory-sdk/               # @lanonasis/memory-sdk-standalone v1.1.0
│       └── src/
├── supabase/
│   └── migrations/               # Memory platform DB migrations
└── docs/
```

### MCP Server
```
apps/mcp-core/
├── src/
│   ├── index.ts                  # MCP server entry
│   └── tools/                    # MCP tool definitions (31+ tools)
└── package.json
```

### Shared Auth & Security Packages
```
packages/
├── oauth-client/                  # @lanonasis/oauth-client — ACTIVE
├── security-sdk/                  # @lanonasis/security-sdk
├── shared-auth/                   # ⚠️ DEPRECATED — do not use
└── shared-types/
```

---

## Key Learnings for Future Sessions

### 1. Repositories are isolated — respect the boundary
The two repos don't share file paths. `lzero-aether-mem` references `lan-onasis-monorepo` through:
- npm packages (published SDKs)
- HTTP API endpoints (runtime)
- Documentation (conceptual reference)

There is no `git submodule` linking them.

### 2. `auth-gateway` is a full service, not a config
`apps/onasis-core/services/auth-gateway/` is a complete Node.js service with its own routes, controllers, services, middleware, database migrations, Docker setup, and deployment scripts. It runs on port `:4000` and is the canonical OAuth2 PKCE endpoint.

### 3. `server/` in lzero-aether-mem is legacy
The `server/` directory in lzero-aether-mem is a prototype Express server. The active runtime uses `@lanonasis/mem-intel-sdk` from npm. Do not use `server/` as a reference for how the current system works.

### 4. Multiple memory SDK packages exist — don't conflate them
- `@lanonasis/mem-intel-sdk` — intelligence + reasoning layer (used by lzero-aether-mem)
- `@lanonasis/memory-sdk-standalone` — standalone memory SDK (lanonasis-maas/packages/memory-sdk)
- `@lanonasis/memory-client` — universal MaaS client v2.2.1
- `@lanonasis/memory-sdk` — memory platform SDK v1.0.0

These have different purposes and different versions.

### 5. `shared-auth` is deprecated — use `oauth-client`
Any work involving auth should reference `packages/oauth-client` (in monorepo) or the auth-gateway service — NOT `packages/shared-auth`.

### 6. `apps/docs-lanonasis` is a Docusaurus app — treat it as a product
The docs app is not just a markdown site. It has its own build pipeline, OpenAPI generation scripts, and serves as the public-facing product documentation. It is NOT the same as root `/docs`.

### 7. Canonical truth rule applies in both repos
In both repos, **current manifests and source layout** outrank narrative docs when they conflict. The monorepo has significant evidence of consolidation from multiple standalone repositories — expect historical residue.

---

## Ecosystem Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│  lzero-aether-mem (client platform)                                 │
│  ├── VS Code extension (v0.4.6 ✅)                                 │
│  ├── Mobile PWA (offline-first)                                    │
│  ├── Browser extension (Manifest v3)                               │
│  └── Web dashboard                                                  │
│       └── packages/shared/ ──► @lanonasis/mem-intel-sdk (npm)      │
└─────────────────────────────────────────────────────────────────────┘
                                   │
                         HTTP (REST + MCP)
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│  lan-onasis-monorepo (backend platform)                            │
│                                                                     │
│  auth.lanonasis.com (:4000)                                        │
│  └── apps/onasis-core/services/auth-gateway/  ← OAuth2 PKCE        │
│                                                                     │
│  mcp.lanonasis.com (:3104)                                         │
│  └── apps/mcp-core/  ← MCP protocol server (31+ tools)            │
│                                                                     │
│  api.lanonasis.com (:3000)                                         │
│  └── unified-gateway/ + apps/lanonasis-maas/  ← Memory MaaS       │
│       └── packages/memory-client/ (@lanonasis/memory-client v2.2.1)│
│                                                                     │
│  docs.lanonasis.com                                                 │
│  └── apps/docs-lanonasis/  ← Docusaurus public docs                │
│                                                                     │
│  packages/                                                         │
│  ├── oauth-client ──► ACTIVE auth abstraction                       │
│  ├── memory-sdk (@lanonasis/memory-sdk v1.0.0)                     │
│  └── memory-intelligence-engine                                    │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Navigation for Future Sessions

| Question | Start here |
|----------|-----------|
| How does auth work in the monorepo? | `apps/onasis-core/services/auth-gateway/src/` |
| What is the memory SDK structure? | `apps/lanonasis-maas/packages/memory-client/` |
| What's the MCP server surface? | `apps/mcp-core/src/` |
| Where are the Supabase Edge Functions? | `apps/onasis-core/supabase/functions/` |
| What's the public docs structure? | `apps/docs-lanonasis/docs/` |
| How does lzero-aether-mem connect? | `packages/shared/src/sdk/` (uses `@lanonasis/mem-intel-sdk`) |
| What packages exist? | `packages/` (oauth-client, security-sdk, memory-sdk, etc.) |

---

_Last updated: 2026-05-08 — Initial ecosystem grounding document created during cross-repo documentation review._