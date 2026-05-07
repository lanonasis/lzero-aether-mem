# ADR-004: Offline-First Architecture for Mobile PWA

Status: Accepted | Date: 2025-12-19

## Context

Aether Memory targets developers who may be commuting, traveling, or working in areas with poor connectivity. The mobile PWA must allow capturing memories and performing semantic search without an internet connection. Data must sync seamlessly when connectivity returns.

## Decision

Implement an offline-first architecture for the mobile PWA using:
- Local IndexedDB for memory storage
- On-device embedding generation (no network required)
- Service worker for app shell + asset caching
- Sync queue for pending changes
- Conflict resolution: last-write-wins with manual merge option

## Alternatives Considered

1. **Online-only with caching** - Rejected: Violates core use case (subway, airplane, remote areas).
2. **Native iOS/Android apps** - Rejected: Increases development overhead by 2x; PWA provides cross-platform reach with single codebase.
3. **Offline-first PWA** - Accepted: Meets all requirements with one codebase, installable on all platforms, syncs when online.

## Consequences

**Positive:**
- Full functionality without network access
- Faster perceived performance (local reads)
- Reduced server load (batch syncs instead of per-action)
- Works on all platforms that support PWAs

**Negative:**
- Sync complexity: handling conflicts, retries, deduplication
- Storage limits: IndexedDB quotas vary by browser/OS
- Embedding model must be cached locally (~22MB)
- Service worker updates require careful cache invalidation

## Sync Strategy

```
User Action (Offline)
  -> IndexedDB write
  -> Sync queue entry (pending)
  -> UI shows "sync pending" indicator

Network Recovery
  -> Window 'online' event
  -> Dequeue and batch send to /api/memories
  -> Mark synced in local DB
  -> Pull server changes (two-way sync)
```

## Key Files

- `packages/mobile-pwa/public/sw.js` - Service worker
- `packages/mobile-pwa/src/hooks/useLightweightAnalysis.ts` - Offline-capable analysis
- `packages/shared/src/types/index.ts` - `SyncStatus` interface
