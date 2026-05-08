# Execution Plan: SDK Intelligence Feature Surfacing

_Version: 2.0 — Updated 2026-05-08 after Phase 0 verification_
_Status: Ready for Implementation — Phase 1 foundation_

---

## Executive Summary

**Objective**: Surface the ~80% of `@lanonasis/memory-client` v2.2.0 and `@lanonasis/mem-intel-sdk` v2.1.0 capabilities currently unused across all application surfaces.

**Current State**: Apps use basic CRUD and basic search only. Intelligence features (pattern analysis, tag suggestions, related memories, duplicates, insights, health score) are available in the SDK but wired to zero surfaces.

**Approach**: Verify first, adapt second, surface third. A prior version of this plan assumed methods existed — Phase 0 verification has now confirmed which methods exist, which SDK they live in, and whether they are browser-safe.

---

## Phase 0 — Verified Capability Matrix (DONE)

### Finding 1: There are TWO separate SDKs, not one

This is the most critical correction to the original plan.

| SDK | Installed Where | What It Covers |
|-----|-----------------|----------------|
| `@lanonasis/mem-intel-sdk` v2.1.0 | Root + `packages/shared/package.json` | **AI intelligence operations** — pattern analysis, tag suggestions, related memories, duplicates, insights, collection health score |
| `@lanonasis/memory-client` v2.2.0 | Root `package.json` only | **Data operations** — Topics, Enhanced Search (vector/text/hybrid), Analytics, Access Patterns, Preprocessing |

**Consequence**: `packages/shared` currently has direct access to `mem-intel-sdk` but NOT to `memory-client`. Topics, Enhanced Search, and Analytics cannot be wired in the shared layer until `@lanonasis/memory-client` is added to `packages/shared/package.json`.

### Finding 2: All 6 intelligence methods exist and are browser-safe

Verified against `node_modules/@lanonasis/mem-intel-sdk/dist/core/client.d.ts` and runtime JS:

| Method | Exists | Browser-Safe | Requires Network | Return Type | Safe Fallback |
|--------|--------|--------------|-----------------|-------------|---------------|
| `analyzePatterns()` | ✅ | ✅ `fetch()` only | ✅ | `PatternAnalysis` | `null` |
| `suggestTags()` | ✅ | ✅ `fetch()` only | ✅ | `TagSuggestionsResult` | `[]` |
| `findRelated()` | ✅ | ✅ `fetch()` only | ✅ | `RelatedMemoriesResult` | `[]` |
| `detectDuplicates()` | ✅ | ✅ `fetch()` only | ✅ | `DuplicatesResult` | `[]` |
| `extractInsights()` | ✅ | ✅ `fetch()` only | ✅ | `InsightsResult` | `null` |
| `healthCheck()` _(collection)_ | ✅ | ✅ `fetch()` only | ✅ | `MemoryHealth` | `null` |

### Finding 3: `memory-client` v2.2.0 also has verified methods

| Method / Group | Exists | Browser-Safe | Return Type |
|----------------|--------|--------------|-------------|
| Topics (`createTopic`, `getTopics`, `getTopicsHierarchy`, etc.) | ✅ | ✅ | `MemoryTopic[]` |
| `enhancedSearch()` with `search_mode: 'vector' \| 'text' \| 'hybrid'` | ✅ | ✅ | `EnhancedSearchResponse` |
| `getSearchAnalytics()` | ✅ | ✅ | `SearchAnalytics` |
| `getAccessPatterns()` | ✅ | ✅ | `AccessPatterns` |
| `getExtendedStats()` | ✅ | ✅ | `ExtendedMemoryStats` |
| `createMemoryWithPreprocessing()` | ✅ | ✅ | `MemoryEntry` |
| `healthCheck()` _(service ping)_ | ✅ | ✅ | `{ status: string, timestamp: string }` |

### Finding 4: Two distinct healthChecks — MUST NOT conflate

| healthCheck | SDK | Returns | Purpose |
|-------------|-----|---------|---------|
| `MemoryIntelligenceClient.healthCheck()` | `mem-intel-sdk` | `MemoryHealth` — score, embedding coverage, tagging %, recommendations | User-facing **collection quality feature** |
| `CoreMemoryClient.healthCheck()` | `memory-client` | `{ status: string, timestamp: string }` | **Service connectivity ping** (was already used for connection test in VS Code extension) |

These must be exposed as two separate hooks with distinct names and distinct purposes.

### Finding 5: Local `Memory` type is missing `status` and `topicId`

Current `packages/shared/src/types/index.ts` `Memory` interface does not include `status`, `topicId`, or `topic_id`. These must be added before any topic or status UI can be built.

### Finding 6: `mem-intel-sdk` has a React subpath

`@lanonasis/mem-intel-sdk/react` exports a `MemoryIntelligenceProvider` backed by React Query. This is the correct browser-safe import entrypoint — import from `/react` subpath, not the root.

---

## Corrected Execution Strategy

Two tracks, sequenced by dependency availability.

```
Track A — mem-intel-sdk  (dep already in packages/shared)
├── Can start immediately
├── Intelligence features: patterns, tags, related, duplicates, insights, health score
└── No new package.json changes needed

Track B — memory-client  (dep NOT yet in packages/shared)
├── Blocked until: add @lanonasis/memory-client to packages/shared/package.json
├── Features: Topics, Enhanced Search, Analytics, Preprocessing
└── Start after Track A foundation is stable
```

---

## Phase 1 — Safe Foundation (Both Tracks)

### 1.1 Expand local `Memory` type

**File**: `packages/shared/src/types/index.ts`

Add to the `Memory` interface:

```typescript
export interface Memory {
  // ... existing fields ...
  status?: 'active' | 'archived' | 'draft';
  topicId?: string;
  topic_id?: string;
}

export interface AppMemoryTopic {
  id: string;
  name: string;
  parentId?: string | null;
  color?: string;
  icon?: string;
  isSystem?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
```

### 1.2 Add feature flags to `LanonasisConfig`

**File**: `packages/shared/src/sdk/index.ts`

```typescript
export interface LanonasisConfig {
  // ... existing fields ...
  features?: {
    /** Collection health score card */
    healthScore?: boolean;
    /** AI tag suggestions on create/edit */
    tagSuggestions?: boolean;
    /** Related memories discovery */
    relatedMemories?: boolean;
    /** Pattern analysis panel (Track A) */
    patternAnalysis?: boolean;
    /** Duplicate detection (user-triggered, not background) */
    duplicateDetection?: boolean;
    /** Topic management (Track B — requires memory-client dep) */
    topics?: boolean;
    /** Analytics dashboard (Track B — requires memory-client dep) */
    analytics?: boolean;
    /** Enhanced search mode selector (Track B — requires memory-client dep) */
    enhancedSearch?: boolean;
  };
}

// Phase 1 defaults: Track A on, Track B off until dep added
export const DEFAULT_FEATURES: Required<NonNullable<LanonasisConfig['features']>> = {
  healthScore: true,
  tagSuggestions: true,
  relatedMemories: true,
  patternAnalysis: true,
  duplicateDetection: true,
  topics: false,      // Track B
  analytics: false,   // Track B
  enhancedSearch: false, // Track B
};
```

### 1.3 Create `adapter.ts`

**File**: `packages/shared/src/sdk/adapter.ts`

Purpose: stable app-facing types that absorb Phase 2 contract changes. Apps import `AppMemory` etc., never raw SDK types directly.

```typescript
/**
 * API Adapter Layer
 * Apps import these types. When Phase 2 changes SDK contracts, only this file changes.
 */
import type { MemoryEntry } from '@lanonasis/mem-intel-sdk';
import type { AppMemoryTopic } from '../types';

export function adaptMemoryEntry(raw: MemoryEntry): AppMemory {
  return {
    id: raw.id,
    title: raw.title,
    content: raw.content,
    type: raw.type ?? 'context',
    tags: raw.tags ?? [],
    status: 'active',           // mem-intel-sdk MemoryEntry has no status field yet
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  };
}
```

### 1.4 Create `intelligence-client.ts` — lazy singleton

**File**: `packages/shared/src/sdk/intelligence-client.ts`

```typescript
/**
 * Lazy singleton wrapper around MemoryIntelligenceClient.
 * Import is deferred to avoid bundle-size impact on VS Code and web extensions.
 */
import type { MemoryIntelligenceConfig } from '@lanonasis/mem-intel-sdk';

let client: import('@lanonasis/mem-intel-sdk').MemoryIntelligenceClient | null = null;

export async function getIntelligenceClient(config: MemoryIntelligenceConfig) {
  if (!client) {
    const { MemoryIntelligenceClient } = await import('@lanonasis/mem-intel-sdk');
    client = new MemoryIntelligenceClient(config);
  }
  return client;
}

export function resetIntelligenceClient() {
  client = null;
}
```

---

## Phase 2 — Intelligence Hooks (Track A)

**File**: `packages/shared/src/sdk/react-hooks.tsx` — extend existing file

All hooks must:
- Check `isAuthenticated` before calling
- Check relevant feature flag before calling
- Return safe empty defaults on error or when unauthenticated
- Expose `isLoading` and `error`
- NOT call heavy SDK code on mount unless triggered by user action

### `useMemoryCollectionHealth()`

```typescript
export function useMemoryCollectionHealth() {
  const { isAuthenticated, config } = useLanonasis();
  const [health, setHealth] = useState<MemoryHealth | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const check = useCallback(async () => {
    if (!isAuthenticated || !config.features?.healthScore) return null;
    setIsLoading(true);
    setError(null);
    try {
      const client = await getIntelligenceClient({ apiKey: config.apiKey!, apiUrl: config.baseUrl });
      const result = await client.healthCheck({ userId: config.organizationId! });
      setHealth(result.data);
      return result.data;
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Health check failed'));
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, config]);

  useEffect(() => {
    if (isAuthenticated) check();
  }, [isAuthenticated]); // eslint-disable-line react-hooks/exhaustive-deps

  return { health, check, isLoading, error };
}
```

### `useIntelligence()` — facade for on-demand operations

```typescript
export function useIntelligence() {
  const { isAuthenticated, config } = useLanonasis();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const withClient = useCallback(
    async <T>(fn: (c: MemoryIntelligenceClient) => Promise<T>, fallback: T): Promise<T> => {
      if (!isAuthenticated) return fallback;
      setIsLoading(true);
      setError(null);
      try {
        const client = await getIntelligenceClient({ apiKey: config.apiKey!, apiUrl: config.baseUrl });
        return await fn(client);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Intelligence request failed'));
        return fallback;
      } finally {
        setIsLoading(false);
      }
    },
    [isAuthenticated, config]
  );

  const suggestTags = useCallback(
    (memoryId: string) => {
      if (!config.features?.tagSuggestions) return Promise.resolve([]);
      return withClient(
        (c) => c.suggestTags({ memoryId, userId: config.organizationId! }).then(r => r.data.suggestions),
        []
      );
    },
    [withClient, config]
  );

  const findRelated = useCallback(
    (memoryId: string) => {
      if (!config.features?.relatedMemories) return Promise.resolve([]);
      return withClient(
        (c) => c.findRelated({ memoryId, userId: config.organizationId! }).then(r => r.data.related_memories),
        []
      );
    },
    [withClient, config]
  );

  const detectDuplicates = useCallback(
    () => {
      if (!config.features?.duplicateDetection) return Promise.resolve([]);
      return withClient(
        (c) => c.detectDuplicates({ userId: config.organizationId! }).then(r => r.data.duplicate_pairs),
        []
      );
    },
    [withClient, config]
  );

  const extractInsights = useCallback(
    (topic?: string) => {
      return withClient(
        (c) => c.extractInsights({ userId: config.organizationId!, topic }).then(r => r.data),
        null
      );
    },
    [withClient, config]
  );

  const analyzePatterns = useCallback(
    () => {
      if (!config.features?.patternAnalysis) return Promise.resolve(null);
      return withClient(
        (c) => c.analyzePatterns({ userId: config.organizationId! }).then(r => r.data),
        null
      );
    },
    [withClient, config]
  );

  return { suggestTags, findRelated, detectDuplicates, extractInsights, analyzePatterns, isLoading, error };
}
```

---

## Phase 3 — Track B Unblock (when ready)

**Prerequisite**: Add `@lanonasis/memory-client` to `packages/shared/package.json`:

```json
{
  "dependencies": {
    "@lanonasis/mem-intel-sdk": "^2.1.0",
    "@lanonasis/memory-client": "^2.2.0"
  }
}
```

**Then add**:
- `useTopics()` — wraps `CoreMemoryClient` topic CRUD
- `useEnhancedSearch()` — wraps `enhancedSearch()` with `search_mode` selector; fallback to basic search if disabled
- `useAnalytics()` — wraps `getSearchAnalytics()` + `getAccessPatterns()` + `getExtendedStats()`

The feature flags for these are already stubbed in Phase 1 (`topics: false`, `analytics: false`, `enhancedSearch: false`) so apps won't call any of these until the dep is added and flags are flipped.

---

## Phase 4 — Surface Rollout (One Platform First)

**First platform: VS Code extension** — most recently audited, clean build.

### Step 1: Wire health score

Add `HealthCard` component that calls `useMemoryCollectionHealth()`. Insert into `IDEPanel.tsx` as a collapsible sidebar section. This validates the full hook → SDK → API round trip before touching other platforms.

### Step 2: Validate, then roll out

| Surface | Feature | Hook |
|---------|---------|------|
| VS Code extension | Health score card | `useMemoryCollectionHealth()` |
| VS Code extension | Tag suggestions on create | `useIntelligence().suggestTags()` |
| VS Code extension | Related memories in detail | `useIntelligence().findRelated()` |
| Web extension sidepanel | Related memories below each card | `useIntelligence().findRelated()` |
| Web extension | Tag suggestions in create form | `useIntelligence().suggestTags()` |
| Web extension | Health indicator in header | `useMemoryCollectionHealth()` |
| Mobile PWA | Real health banner (replaces stub) | `useMemoryCollectionHealth()` |
| Mobile PWA | Tag suggestions in QuickCapture | `useIntelligence().suggestTags()` |
| Mobile PWA | Insights card in memory detail | `useIntelligence().extractInsights()` |
| Mobile native | Related memories in memory detail | `useIntelligence().findRelated()` |

**Duplicate detection**: User-triggered only (a "Scan for duplicates" button). Do NOT implement as a background job until rate limits, cache policy, and privacy boundary are defined.

---

## Key Constraints

1. **Bundle size**: `intelligence-client.ts` must use dynamic `import()`. Do not import at module top-level. VS Code and browser extensions have strict bundle budgets.

2. **Two healthChecks**: `useMemoryCollectionHealth()` calls `mem-intel-sdk.healthCheck()` (collection quality). The existing connection-test `healthCheck()` in the VS Code extension calls `memory-client.healthCheck()` (service ping). Keep these separate — a low health score is not the same as platform downtime.

3. **Duplicate detection**: User-triggered first. Background scheduling only after rate limits are established.

4. **Enhanced search**: Blocked on Track B dep addition. When implemented, map `text` → existing `/memory/search`, `vector` → same with explicit mode param, `hybrid` → only if backend confirms support. Hide the mode selector unless `features.enhancedSearch === true`.

5. **Offline behavior**: Intelligence hooks must degrade gracefully when offline. All hooks return safe empty defaults on network error. The existing offline queue must not be disrupted.

6. **Separate `useApiHealth()`**: The existing VS Code connection healthCheck should be renamed/kept as `useApiHealth()` (service ping). `useMemoryCollectionHealth()` is the collection quality feature. Never merge these.

---

## Testing Requirements

Beyond unit tests for hooks:

| Test Type | What to Cover |
|-----------|--------------|
| **Adapter contract tests** | API response → `AppMemory`, `AppInsight`, etc. mapping functions |
| **Feature flag tests** | Disabled features must not call SDK/network |
| **Bundle regression tests** | VS Code + web extension build sizes before/after |
| **Offline degradation tests** | Hooks return safe defaults when fetch fails |
| **Auth header preservation** | Intelligence calls use correct `X-API-Key` or `Bearer` header |

---

## Revised Execution Sequence

```
Phase 0 — DONE  (verified capability matrix)

Phase 1 — Foundation
  ├── Expand Memory type: add status, topicId
  ├── Add features to LanonasisConfig (flags default: Track A on, Track B off)
  ├── Create adapter.ts with AppMemory mapping
  └── Create intelligence-client.ts as lazy dynamic import

Phase 2 — Track A Hooks (mem-intel-sdk, dep already available)
  ├── Add useMemoryCollectionHealth()
  ├── Add useIntelligence() (suggestTags, findRelated, detectDuplicates, extractInsights, analyzePatterns)
  └── Export from packages/shared/src/sdk/index.ts

Phase 3 — First Surface Validation (VS Code only)
  ├── HealthCard component → IDEPanel sidebar
  └── Tag suggestions on memory save
  Verify end-to-end before any other surface

Phase 4 — Track A Rollout to remaining surfaces
  ├── Web extension: related + tag suggestions + health indicator
  ├── Mobile PWA: health banner + tag suggestions + insights
  └── Mobile native: related memories in detail screen

Phase 5 — Track B Unblock (when ready)
  ├── Add @lanonasis/memory-client to packages/shared/package.json
  ├── Add useTopics(), useEnhancedSearch(), useAnalytics()
  ├── Flip feature flags: topics/analytics/enhancedSearch to true
  └── Roll out Topics UI + Analytics pages across surfaces
```

---

## ADR to Create

- **ADR-006**: SDK Intelligence Surfacing — Two-SDK Architecture, Adapter Pattern, Feature Flags
  - Records the decision to wrap `mem-intel-sdk` (Track A) and `memory-client` (Track B) behind a shared adapter layer
  - Documents the lazy-load requirement for extension bundle safety
  - Documents the two-healthCheck distinction

---

## Documentation to Update After Implementation

- `docs/context/components/shared-package-context.md` — add new hooks
- `docs/context/context-engineering-progress.md` — mark Phase 1-4 complete as they land
- `docs/context/architecture/decisions/adr-006-intelligence-surfacing.md` — create new

---

_Version: 2.0 — Updated 2026-05-08 post Phase 0 verification_
_Previous version assumed methods existed without runtime verification. This version is grounded in confirmed SDK surface._
