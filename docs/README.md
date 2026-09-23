# LanOnasis Aether Memory — Project Overview

**Last updated**: 2026-09-23

## What Is This?

LanOnasis is a **Memory-as-a-Service (MaaS)** platform for developers. It lets you capture code snippets, meeting notes, architectural decisions, and API keys — then find them semantically, even offline.

| Property | Value |
|----------|-------|
| **Name** | LanOnasis (Aether Memory) |
| **Purpose** | Cross-platform memory orchestrator with on-device AI |
| **Version** | 2.0.0-hackathon |
| **Runtime** | Bun ≥ 1.3, Node.js ≥ 20 |
| **AI/ML** | Transformers.js + WebGPU (all-MiniLM-L6-v2, 384-dim embeddings) |
| **Auth** | OAuth 2.0 (PKCE) + API keys |
| **SDK** | `@lanonasis/shared` — memory CRUD, security keys, React hooks |

---

## Monorepo Structure

```
lzero-aether-mem/
├── client/                   # Web dashboard (Vite + React + Wouter)
│   ├── src/pages/            # Landing, dashboard, IDE panel
│   ├── src/components/       # RichPanel, PlatformTabs, UI primitives
│   ├── src/packages/         # Web extension + VS Code panel sources
│   └── src/services/         # Auth, API key management
│
├── packages/
│   ├── shared/               # Cross-platform SDK, types, React hooks
│   │   ├── sdk/              # LanonasisClient, hooks
│   │   ├── ai/               # On-device embedding utilities
│   │   └── types/            # Memory, SecurityKey, etc.
│   │
│   ├── vscode-extension/     # VS Code sidebar extension (MV3)
│   │   └── src/              # Extension host, webview, services
│   │
│   ├── web-extension/        # Chrome/Edge browser extension (MV3)
│   │   └── src/              # Content scripts, background, popup
│   │
│   ├── mobile-pwa/           # Vite-based PWA with service worker
│   │   └── src/
│   │
│   └── server/               # Express API server (also at root/server/)
│       └── index.ts
│
├── apps/
│   └── mobile/               # Expo / React Native app
│       └── app/              # expo-router pages
│
├── server/                   # Backend API
├── shared/                   # (deprecated — use packages/shared/)
├── docs/                     # Documentation (see docs/README.md)
├── _archive/                 # Legacy artifacts
└── package.json              # Monorepo root
```

---

## Deployment Surfaces

| Surface | Location | Status |
|---------|----------|--------|
| **Web Dashboard** | `client/` | Live at https://lzero-aether-memmory.vercel.app |
| **VS Code Extension** | `packages/vscode-extension/` | Published on marketplace |
| **Chrome Extension** | `packages/web-extension/` | Build from source |
| **Mobile PWA** | `packages/mobile-pwa/` | Build from source |
| **Mobile (Native)** | `apps/mobile/` | Expo app |

---

## Key Dependencies

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19 + TypeScript + Tailwind CSS + Vite |
| **Routing** | Wouter |
| **State** | TanStack Query + React context |
| **UI** | Radix UI primitives + shadcn/ui |
| **Animation** | Framer Motion |
| **On-device AI** | @xenova/transformers (WebGPU + WASM) |
| **Server** | Express / Hono + Drizzle ORM |
| **Database** | PostgreSQL + pgvector (Neon Serverless) |
| **Build** | Vite + Turbo |
| **Runtime** | Bun |

---

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string |
| `VITE_API_URL` | API base URL (e.g. `https://api.lanonasis.com/api/v1`) |
| `VITE_API_KEY` | API key for client (optional, uses OAuth if not set) |
| `VITE_ORGANIZATION_ID` | Organization context for scoped data |
| `OAUTH_CLIENT_ID` | OAuth 2.0 client ID |
| `OAUTH_CLIENT_SECRET` | OAuth 2.0 client secret |

---

## Documentation Structure

```
docs/
├── README.md            ← You are here
├── context/             # Current authoritative docs
│   ├── architecture/    # ADRs and system design
│   ├── components/      # Component-specific details
│   └── workflows/       # Dev, deploy, test, env, maintenance
├── legacy/              # Historical/superseded documents
└── plans/               # Implementation plans
```

---

## Quick Links

- [Architecture ADRs](docs/context/architecture/decisions/)
- [Component Details](docs/context/components/)
- [Workflows](docs/context/workflows/)
- [VS Code Extension Context](docs/context/components/vscode-extension-context.md)
- [Web Extension Context](docs/context/components/web-extension-context.md)

---

_Last updated: 2026-09-23 by Derick_
