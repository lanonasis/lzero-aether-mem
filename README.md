# LanOnasis — AI Memory Orchestrator

**Capture, search, and recall your development context across platforms.**

A cross-platform Memory-as-a-Service platform for developers who think in vectors. Store code snippets, meeting notes, architectural decisions, and API keys — then find them semantically, even offline.

[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)](https://lzero-aether-memmory.vercel.app)
[![VS Code Extension](https://img.shields.io/badge/VS_Code-Extension-brightgreen?style=for-the-badge&logo=visualstudio)](https://marketplace.visualstudio.com/items?itemName=lanonasis.lzero-memory)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](packages/vscode-extension/LICENSE)
[![Bun](https://img.shields.io/badge/Run_with-Bun-3d7d47?style=for-the-badge&logo=bun)](https://bun.sh)

---

## What is LanOnasis?

LanOnasis is a **memory orchestrator** for developers. It lets you:

- **Capture context** — paste code, notes, logs, or meeting summaries and let the AI organize them.
- **Search semantically** — find relevant memories by meaning, not just keywords.
- **Stay offline** — on-device embeddings and local-first architecture work without internet.
- **Access everywhere** — VS Code extension, web dashboard, Chrome extension, and mobile apps all sync.

---

## Platforms

| Platform | Description | Link |
|----------|-------------|------|
| **VS Code Extension** | Sidebar panel for capturing and searching memories without leaving your editor. | [Install](https://marketplace.visualstudio.com/items?itemName=lanonasis.lzero-memory) |
| **Web Dashboard** | Full-featured web app for managing memories, API keys, and AI orchestration. | [Live Demo](https://lzero-aether-memmory.vercel.app) |
| **Chrome Extension** | Lightweight side panel for quick context capture from any browser page. | [Source](packages/web-extension/) |
| **Mobile (Native)** | React Native / Expo app for capturing memories on the go. | `apps/mobile/` |
| **Mobile PWA** | Installable progressive web app with offline-first support. | `packages/mobile-pwa/` |
| **CLI / SDK** | Node.js SDKs for integrating memory and security into any app. | `packages/shared/` |

---

## Quick Start

### Prerequisites

- **Bun** ≥ 1.3 (`curl -fsSL https://bun.sh/install | bash`)
- **Node.js** ≥ 20

### Run the Web Dashboard

```bash
bun install
bun run dev:web          # Vite dev server → http://localhost:5000
bun run build:web        # Production build → dist/public/
```

### Run the VS Code Extension

```bash
cd packages/vscode-extension
bun install
bun run dev               # Watch build
bun run build             # Build .vsix
# Install: code --install-extension packages/vscode-extension/lzero-memory-*.vsix
```

### Run the Chrome Extension

```bash
cd packages/web-extension
bun install
bun run dev               # Vite dev server with HMR
bun run build             # Production build
```

### Run the Mobile App (Expo)

```bash
cd apps/mobile
bun install
bun run start             # Expo dev server
```

### Run the Mobile PWA

```bash
cd packages/mobile-pwa
bun install
bun run dev               # Vite dev server
bun run build             # PWA build
```

---

## Architecture

```
lzero-aether-mem/
├── client/                   # Web dashboard (Vite + React + Wouter)
│   ├── src/
│   │   ├── pages/            # Landing, dashboard, IDE panel
│   │   ├── components/       # RichPanel, PlatformTabs, UI primitives
│   │   ├── packages/         # Web extension + VS Code panel sources
│   │   └── services/         # Auth, API key management
│   └── package.json          # (managed via workspace)
│
├── packages/
│   ├── shared/               # Cross-platform SDK, types, React hooks
│   │   └── src/
│   │       ├── sdk/          # LanonasisClient, hooks (useLanonasis, useMemories)
│   │       ├── ai/           # On-device embedding utilities
│   │       └── types/        # Memory, SecurityKey, etc.
│   │
│   ├── vscode-extension/     # VS Code sidebar extension (MV3)
│   │   └── src/
│   │
│   ├── web-extension/        # Chrome/Edge browser extension
│   │   └── src/
│   │
│   ├── mobile-pwa/           # Vite-based PWA with service worker
│   │   └── src/
│   │
│   └── server/               # Node.js API server (Hono/Express)
│       └── index.ts
│
├── apps/
│   └── mobile/               # Expo / React Native app
│       └── app/              # expo-router pages
│
├── server/                   # Backend API (also mirrored in packages/server)
│
├── shared/                   # (deprecated — use packages/shared/)
└── package.json              # Monorepo root
```

### Key Dependencies

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19 + TypeScript + Tailwind CSS + Vite |
| **Routing** | Wouter (lightweight SPA routing) |
| **State** | TanStack Query + React context |
| **UI** | Radix UI primitives + Tailwind |
| **Animation** | Framer Motion |
| **On-device AI** | @xenova/transformers (WebGPU + WASM) |
| **SDK** | `@lanonasis/shared` — memory CRUD, security keys, React hooks |
| **Server** | Hono / Express + Drizzle ORM |
| **Database** | PostgreSQL + pgvector (via Neon Serverless) |
| **Build** | Vite + Turbo |
| **Runtime** | Bun |

---

## Usage Examples

### SDK — Store a Memory

```typescript
import { useLanonasis, useMemories } from "@lanonasis/shared/sdk";

function CaptureNote() {
  const { client, isAuthenticated } = useLanonasis();
  const { createMemory } = useMemories();

  const handleSave = async () => {
    await createMemory({
      title: "OAuth2 PKCE Flow Notes",
      content: "Remember to use PKCE for mobile apps...",
      type: "code",
      tags: ["auth", "mobile"],
    });
  };

  return <button disabled={!isAuthenticated} onClick={handleSave}>Save</button>;
}
```

### SDK — Search Memories

```typescript
const { memories, search } = useMemories();

const results = await search("authentication bug fix", { limit: 10 });
// Returns memories ranked by semantic similarity
```

### SDK — React Hook Usage

```typescript
function MyComponent() {
  const { client, isAuthenticated, isConnecting } = useLanonasis();
  const { memories, createMemory, deleteMemory } = useMemories();
  const { embed, isReady } = useLocalAI();

  return (
    <div>
      {isConnecting ? <p>Connecting...</p> :
       !isAuthenticated ? <p>Please log in</p> :
       <MemoryList memories={memories} />
      }
    </div>
  );
}
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev:web` | Start web dashboard dev server (port 5000) |
| `bun run dev` | Start all workspace dev servers via Turbo |
| `bun run build:web` | Build web dashboard to `dist/public/` |
| `bun run build` | Build everything via Turbo |
| `bun run dev:extension` | VS Code extension watch mode |
| `bun run dev:mobile` | Mobile PWA dev server |
| `bun run dev:mobile-native` | Expo native app |
| `bun run test` | Run all tests via Turbo |
| `bun run lint` | Lint all packages |
| `bun run typecheck` | Type-check all packages |

---

## Deployment

The web dashboard is deployed on Vercel. Every push to `main` triggers an automatic production build.

- **Live site**: https://lzero-aether-memmory.vercel.app
- **Build**: `bash build.sh` → outputs to `dist/public/`
- **Vercel config**: `vercel.json` (rewrites, headers, build commands)

---

## License

MIT License — see `packages/vscode-extension/LICENSE` for details.

---

**Built with ❤️ by LanOnasis**

[GitHub](https://github.com/lanonasis/aether-memory) • [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=lanonasis.lzero-memory)
