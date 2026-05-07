# Client Web App Context

## Purpose

The primary web dashboard for managing memories. Built as a single-page React application with Vite. Deployed to Vercel.

## Key Files

- `client/src/App.tsx` - Root component, routing, layout
- `client/src/main.tsx` - React DOM entry point
- `client/src/pages/` - Page components (dashboard, IDE panel, etc.)
- `client/src/components/` - Reusable UI components (MemoryCard, MemoryList, etc.)
- `client/src/hooks/` - React hooks (useMemoryIntelligence, etc.)
- `client/src/services/` - API service layer
- `client/src/lib/` - Utility functions, query client setup
- `client/src/packages/vscode-extension/` - **Embedded VSCode extension UI** (IDEPanel, components, hooks) — appears to be a copy/bridge of extension components used within the web dashboard
- `client/src/packages/shared/` - Local shared types and mock data (`types.ts`, `mock-data.ts`)
- `client/src/index.css` - Global styles + Tailwind directives
- `client/index.html` - HTML entry point

## Tech Stack

- React 19, TypeScript
- Tailwind CSS 4 + shadcn/ui patterns
- Framer Motion for animations
- TanStack Query for server state
- Wouter for lightweight routing

## Integration Points

- **Shared package**: Imports types and AI utilities from `packages/shared`
- **Server API**: Calls REST endpoints at `VITE_API_URL`
- **SDK**: Uses `@lanonasis/mem-intel-sdk` React hooks for memory analysis

## Architecture Patterns

- **Hooks over HOCs**: Business logic in `client/src/hooks/`
- **Page-based routing**: Each major view is a page component in `pages/`
- **Service layer**: API calls abstracted in `services/` folder

## Build & Deploy

```bash
bun run build:shared   # Must build shared first
bun run build:web      # vite build -> dist/public/
```

Vercel config in `vercel.json`:
- Output directory: `dist/public`
- COOP/COEP headers for WASM/SharedArrayBuffer
- SPA routing fallback to `/index.html`

## Environment Variables

- `VITE_API_URL` - Backend API base URL
- `VITE_API_KEY` - API key for requests
- `VITE_ORGANIZATION_ID` - Organization context
