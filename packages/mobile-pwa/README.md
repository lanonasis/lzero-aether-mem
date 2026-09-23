# LanOnasis Memory — Mobile PWA

**Progressive Web App with offline-first architecture.**

Install on your phone and access your memory bank from anywhere — even without internet.

## Features

- **Offline-first** — All memories cached locally, syncs when online
- **On-device AI** — Semantic search without cloud calls
- **Installable** — Add to home screen for native-like experience
- **Service Worker** — Background sync and caching

## Development

```bash
cd packages/mobile-pwa
bun install
bun run dev         # Vite dev server
bun run build       # Production build
```

## Build

```bash
bun run build:mobile    # From monorepo root
```

Output goes to `packages/mobile-pwa/dist/` — deploy to any static host (Vercel, Netlify, Cloudflare Pages).
