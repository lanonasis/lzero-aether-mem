# Mobile PWA Context

## Purpose

ARM-optimized Progressive Web App for capturing and searching memories on mobile devices. Designed for offline-first operation with on-device AI embedding generation.

## Key Files

- `packages/mobile-pwa/src/MobileApp.tsx` - Root mobile app component
- `packages/mobile-pwa/src/hooks/useLightweightAnalysis.ts` - Battery/CPU-optimized analysis hook
- `packages/mobile-pwa/public/manifest.json` - PWA manifest
- `packages/mobile-pwa/public/sw.js` - Service worker for offline caching
- `packages/mobile-pwa/index.html` - HTML entry
- `packages/mobile-pwa/package.json` - Package manifest

## Tech Stack

- React 19 + TypeScript
- Vite + PWA plugin
- Service Worker + Workbox (or custom `sw.js`)
- Framer Motion for native-feeling gestures
- Tailwind CSS for styling

## Offline-First Architecture

1. **Memories cached locally** in IndexedDB / localStorage
2. **Embeddings generated on-device** - no network required for semantic search
3. **Sync queue**: Changes made offline are queued and synced when connection returns
4. **Service worker** caches app shell + assets for instant load

## Integration Points

- **Shared package**: Imports types and `useLightMemoryAnalysis` from SDK
- **Backend API**: Syncs to cloud when online (`/api/memories` endpoints)
- **On-device AI**: Uses `packages/shared/src/ai/embeddings.ts` directly

## Mobile Optimizations

- Lazy loading of heavy components
- Cached computations (embedding results stored locally)
- Minimal memory footprint (unload model when app backgrounded)
- Haptic feedback via Framer Motion / native APIs
- Dark mode by default

## Build

```bash
bun run dev:mobile    # Development server
bun run build:mobile  # Production build
```

## Testing

Test on real devices or emulators:
- iOS Safari (Add to Home Screen)
- Android Chrome (Add to Home Screen)
- Desktop mobile viewport (responsive testing)
- Network throttled (offline simulation)
