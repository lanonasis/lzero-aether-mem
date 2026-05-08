# Execution Plan: SDK Intelligence Feature Surfacing

_Version: 2.1 — Updated 2026-05-08 — Backend Sync Amendment_
_Status: Ready for Implementation — Phase 1 foundation_

---

## Executive Summary

**Objective**: Surface the ~80% of `@lanonasis/memory-client` v2.2.0 and `@lanonasis/mem-intel-sdk` v2.1.0 capabilities currently unused across all application surfaces — and align the rollout with the backend context-engine upgrade in progress in `lan-onasis-monorepo`.

**Current State**: Apps use basic CRUD and basic search only. Intelligence features (pattern analysis, tag suggestions, related memories, duplicates, insights, health score) are available in the SDK but wired to zero surfaces. Interactive AI assistant ("ask me anything") features exist at varying maturity levels across surfaces but all rely on ad-hoc retrieval logic instead of the purpose-built context infrastructure being built on the backend.

**v2.1 Change**: This version incorporates the backend upgrade plan (`lan-onasis-monorepo/docs/upgrade/`) and the interactive AI assistant gap analysis. Three amendments applied:
- **Amendment A**: Add `InferredConclusion` / `ReasoningJob` types and two new feature flags in Phase 1
- **Amendment B**: New Phase 2.5 — Reasoning Cache & Context Bundle hooks (gated on backend phases)
- **Amendment C**: New Phase 6 — "Ask Me Anything" Chat Interface Upgrade (gated on backend Phase 3)

---

## Backend Sync — Dependency Map

The backend upgrade (`lan-onasis-monorepo`) runs in parallel on its own timeline. This plan has two hard dependency points on that work.

| Backend Deliverable | Backend Phase | What It Unlocks Here |
|---------------------|--------------|----------------------|
| `listInferredConclusions`, `getReasoningJobStatus`, `flushReasoningQueue` added to `@lanonasis/memory-client` | **Backend Phase 1** (weeks 1–2) | Track B dep addition; `useInferredConclusions()` hook; `InferredConclusion` type validation |
| `POST /api/v1/context` endpoint + `compileContext()` SDK method | **Backend Phase 3** (week 4) | `useContextBundle()` hook; Phase 6 chat interface upgrades |

**Do not block Phase 1–4 on backend work.** Everything up through Track A rollout (Phase 4) can ship independently. Phases 2.5 and 6 are explicitly gated — they have feature flags defaulting `false` until the backend handoff is received and verified.

### Interactive AI Assistant — Current State

Before Phase 6 can be planned, the execution crew must understand the current state of the "ask me anything" chat feature across surfaces:

| Surface | File | Implementation State | What's Missing |
|---------|------|---------------------|----------------|
| VS Code | `packages/vscode-extension/src/chatParticipant.ts` | **Full** — `@memory` chat participant, `/save` `/find` `/list` commands, natural language intent parsing | Uses `POST /memory/search` only — no reasoning context, no pre-compiled bundle |
| Mobile PWA | `packages/mobile-pwa/src/components/ChatInterface.tsx` | **Full** — Xenova on-device AI + cloud AI + text fallback, multi-tier search | Rolls its own retrieval; should use server context bundle as a superior "Full Context" tier |
| Web Extension | `packages/web-extension/src/sidepanel/SidePanel.tsx` | **Partial** — `ChatMessage` interface + `handleSendChat()` + search integration | No conversational AI response generation; search result only, not a dialogue |
| Mobile Native | `apps/mobile/` | **Not implemented** | No chat or AI assistant of any kind |
| CLI | — | **Not implemented** | No CLI application exists in this repo |

Phase 6 upgrades VS Code, Mobile PWA, and Web Extension. Mobile Native and CLI are out of scope for this plan.

---

## Phase 0 — Verified Capability Matrix (DONE)

### Finding 1: There are TWO separate SDKs, not one

| SDK | Installed Where | What It Covers |
|-----|-----------------|----------------|
| `@lanonasis/mem-intel-sdk` v2.1.0 | Root + `packages/shared/package.json` | **AI intelligence operations** — pattern analysis, tag suggestions, related memories, duplicates, insights, collection health score |
| `@lanonasis/memory-client` v2.2.0 | Root `package.json` only | **Data operations** — Topics, Enhanced Search (vector/text/hybrid), Analytics, Access Patterns, Preprocessing; **+ reasoning cache methods post backend Phase 1** |

**Consequence**: `packages/shared` currently has direct access to `mem-intel-sdk` but NOT to `memory-client`. Topics, Enhanced Search, Analytics, and the new reasoning cache methods cannot be wired in the shared layer until `@lanonasis/memory-client` is added to `packages/shared/package.json` — timed after backend Phase 1 ships the new SDK methods.

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

**Post backend Phase 1 — new methods landing in `@lanonasis/memory-client`:**

| Method | Return Type | Purpose |
|--------|-------------|---------|
| `listInferredConclusions({ subject_id, limit, include_superseded })` | `InferredConclusion[]` | Surface pre-reasoned conclusions from the async reasoning cache |
| `getReasoningJobStatus(jobId)` | `ReasoningJob` | Poll status of an async reasoning batch |
| `flushReasoningQueue(subject_id)` | `{ flushed, job_ids, conclusion_count }` | Force immediate reasoning inference for a subject |

These methods do not exist in v2.2.0. Do not attempt to call them until the backend Phase 1 dep bump is confirmed and `@lanonasis/memory-client` version is verified.

### Finding 4: Two distinct healthChecks — MUST NOT conflate

| healthCheck | SDK | Returns | Purpose |
|-------------|-----|---------|---------|
| `MemoryIntelligenceClient.healthCheck()` | `mem-intel-sdk` | `MemoryHealth` — score, embedding coverage, tagging %, recommendations | User-facing **collection quality feature** |
| `CoreMemoryClient.healthCheck()` | `memory-client` | `{ status: string, timestamp: string }` | **Service connectivity ping** (already used in VS Code extension) |

These must be exposed as two separate hooks with distinct names and purposes.

### Finding 5: Local `Memory` type is missing fields

Current `packages/shared/src/types/index.ts` does not include `status`, `topicId`, `topic_id`, `InferredConclusion`, or `ReasoningJob`. All must be added before any reasoning or topic UI can be built.

### Finding 6: `mem-intel-sdk` has a React subpath

`@lanonasis/mem-intel-sdk/react` exports a `MemoryIntelligenceProvider` backed by React Query. This is the correct browser-safe import entrypoint — import from `/react` subpath, not the root.

---

## Corrected Execution Strategy

Three tracks, sequenced by dependency availability.

```
Track A — mem-intel-sdk  (dep already in packages/shared)
├── Can start immediately
├── Intelligence features: patterns, tags, related, duplicates, insights, health score
└── No new package.json changes needed

Track B — memory-client  (dep NOT yet in packages/shared)
├── Blocked until: backend Phase 1 ships + add @lanonasis/memory-client to packages/shared
├── Features: Topics, Enhanced Search, Analytics, Preprocessing
├── Post-backend: InferredConclusions, ReasoningJobStatus, FlushReasoning
└── Start after backend Phase 1 confirmation

Track C — Context Bundle / Chat Upgrade  (requires backend Phase 3)
├── Blocked until: backend Phase 3 ships /api/v1/context
├── Feature: useContextBundle() + all "ask me anything" chat interface upgrades
└── Start after backend Phase 3 API contract is frozen
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

**[Amendment A] Also add reasoning cache types** — local stubs now, verified against SDK types when Track B dep lands:

```typescript
export interface InferredConclusion {
  id: string;
  subject_id: string;
  organization_id: string | null;
  conclusion_type: 'explicit' | 'deductive' | 'inductive' | 'abductive';
  content: string;
  confidence: number;          // 0.0–1.0
  evidence_memory_ids: string[];
  scope: string | null;
  freshness: string;           // ISO timestamp
  superseded_by: string | null;
  contradiction_group_id: string | null;
  source_job_id: string | null;
  created_at: string;
}

export interface ReasoningJob {
  id: string;
  subject_id: string;
  organization_id: string | null;
  source_memory_ids: string[];
  status: 'pending' | 'running' | 'completed' | 'failed';
  source_event: 'memory.create' | 'memory.update' | 'manual.flush' | 'reprocess';
  pending_token_count: number;
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
  error: string | null;
}
```

**[Amendment A] Also add context bundle type** — stub now, verified when backend Phase 3 ships:

```typescript
export interface ContextBundle {
  format: 'openai' | 'anthropic' | 'mcp' | 'json';
  bundle: unknown;             // Format-specific; cast at call site per format
  metadata: {
    tokens_used: number;
    sources: string[];
    freshness: string;
  };
}
```

### 1.2 Add feature flags to `LanonasisConfig`

**File**: `packages/shared/src/sdk/index.ts`

```typescript
export interface LanonasisConfig {
  // ... existing fields ...
  features?: {
    // Track A — mem-intel-sdk already in shared deps — default true
    /** Collection health score card */
    healthScore?: boolean;
    /** AI tag suggestions on create/edit */
    tagSuggestions?: boolean;
    /** Related memories discovery */
    relatedMemories?: boolean;
    /** Pattern analysis panel */
    patternAnalysis?: boolean;
    /** Duplicate detection (user-triggered, not background) */
    duplicateDetection?: boolean;

    // Track B — requires @lanonasis/memory-client in packages/shared — default false
    /** Topic management */
    topics?: boolean;
    /** Analytics dashboard */
    analytics?: boolean;
    /** Enhanced search mode selector */
    enhancedSearch?: boolean;

    // Track B+ — requires backend Phase 1 + Track B dep — default false
    /** Surface pre-reasoned conclusions from the async reasoning cache */
    inferredConclusions?: boolean;

    // Track C — requires backend Phase 3 /api/v1/context — default false
    /** Context bundle compilation for chat interfaces */
    contextBundle?: boolean;
  };
}

// Phase 1 defaults: Track A on, all others off until deps confirmed
export const DEFAULT_FEATURES: Required<NonNullable<LanonasisConfig['features']>> = {
  healthScore: true,
  tagSuggestions: true,
  relatedMemories: true,
  patternAnalysis: true,
  duplicateDetection: true,
  topics: false,             // Track B
  analytics: false,          // Track B
  enhancedSearch: false,     // Track B
  inferredConclusions: false, // Track B+
  contextBundle: false,      // Track C
};
```

### 1.3 Create `adapter.ts`

**File**: `packages/shared/src/sdk/adapter.ts`

Purpose: stable app-facing types that absorb Phase 2 backend contract changes. Apps import `AppMemory` etc., never raw SDK types directly.

```typescript
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

## Phase 2 — Track A Intelligence Hooks

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

## Phase 2.5 — Reasoning Cache & Context Bundle Hooks (Gated)

> **Gate**: `useInferredConclusions` and `useFlushReasoning` — blocked on **backend Phase 1** landing + Track B dep addition.
> `useContextBundle` — blocked on **backend Phase 3** landing.
> All three default to `features.inferredConclusions = false` / `features.contextBundle = false` and are no-ops until the respective gates open.

**File**: `packages/shared/src/sdk/react-hooks.tsx` — add alongside Phase 2 hooks

### `useInferredConclusions(subjectId)` — Track B+

Surfaces pre-reasoned AI conclusions drawn from the user's accumulated memories. Replaces the manual "extract insights" user-triggered flow with a passive background layer.

```typescript
export function useInferredConclusions(subjectId: string) {
  const { isAuthenticated, config } = useLanonasis();
  const [conclusions, setConclusions] = useState<InferredConclusion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async (opts?: { include_superseded?: boolean; limit?: number }) => {
    if (!isAuthenticated || !config.features?.inferredConclusions) return [];
    setIsLoading(true);
    setError(null);
    try {
      // Requires @lanonasis/memory-client >= backend Phase 1 version
      const { CoreMemoryClient } = await import('@lanonasis/memory-client');
      const client = new CoreMemoryClient({ apiKey: config.apiKey!, baseUrl: config.baseUrl });
      const result = await client.listInferredConclusions({
        subject_id: subjectId,
        limit: opts?.limit ?? 20,
        include_superseded: opts?.include_superseded ?? false,
      });
      setConclusions(result.data.conclusions);
      return result.data.conclusions;
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Failed to fetch inferred conclusions'));
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, config, subjectId]);

  useEffect(() => {
    if (isAuthenticated && subjectId) fetch();
  }, [isAuthenticated, subjectId]); // eslint-disable-line react-hooks/exhaustive-deps

  return { conclusions, fetch, isLoading, error };
}
```

### `useFlushReasoning()` — Track B+

Lets users manually trigger the reasoning pipeline without waiting for the token-threshold cron. Show a "Refresh insights" button in high-engagement surfaces.

```typescript
export function useFlushReasoning() {
  const { isAuthenticated, config } = useLanonasis();
  const [isFlushing, setIsFlushing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const flush = useCallback(async (subjectId: string) => {
    if (!isAuthenticated || !config.features?.inferredConclusions) return null;
    setIsFlushing(true);
    setError(null);
    try {
      const { CoreMemoryClient } = await import('@lanonasis/memory-client');
      const client = new CoreMemoryClient({ apiKey: config.apiKey!, baseUrl: config.baseUrl });
      const result = await client.flushReasoningQueue(subjectId);
      return result.data;
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Reasoning flush failed'));
      return null;
    } finally {
      setIsFlushing(false);
    }
  }, [isAuthenticated, config]);

  return { flush, isFlushing, error };
}
```

### `useContextBundle(opts)` — Track C

The primary hook for all "ask me anything" chat interfaces. Returns a pre-compiled, token-budgeted context bundle drawn from the user's profile, conclusions, and semantic recall. This is the proper infrastructure for all chat surfaces — replaces all ad-hoc search-and-format retrieval patterns.

```typescript
export interface ContextBundleOptions {
  query?: string;
  include?: Array<'profile_summary' | 'recent_memories' | 'conclusions' | 'semantic_recall'>;
  tokenBudget?: number;
  format?: 'anthropic' | 'openai' | 'mcp' | 'json';
}

export function useContextBundle() {
  const { isAuthenticated, config } = useLanonasis();
  const [bundle, setBundle] = useState<ContextBundle | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const compile = useCallback(async (opts: ContextBundleOptions) => {
    if (!isAuthenticated || !config.features?.contextBundle) return null;
    setIsLoading(true);
    setError(null);
    try {
      // POST /api/v1/context — available after backend Phase 3 ships
      const res = await fetch(`${config.baseUrl}/api/v1/context`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify({
          subject_id: config.organizationId,
          query: opts.query,
          include: opts.include ?? ['profile_summary', 'recent_memories', 'conclusions'],
          token_budget: opts.tokenBudget ?? 4096,
          format: opts.format ?? 'anthropic',
        }),
      });
      if (!res.ok) throw new Error(`Context bundle failed: ${res.status}`);
      const data: ContextBundle = await res.json();
      setBundle(data);
      return data;
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Context bundle failed'));
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, config]);

  return { bundle, compile, isLoading, error };
}
```

---

## Phase 3 — First Surface Validation (VS Code Only)

**Principle**: Do not roll out to any other surface until the full hook → SDK → API round trip is validated in VS Code. One surface first, then widen.

### Step 1 — Wire health score card

Add `HealthCard` component that calls `useMemoryCollectionHealth()`. Insert into `IDEPanel.tsx` as a collapsible sidebar section. Validates the lazy-load chain end-to-end.

**Acceptance criteria for Phase 3 completion:**
- [ ] `HealthCard` renders with real data from `mem-intel-sdk.healthCheck()`
- [ ] Score, embedding coverage %, and at least one recommendation visible
- [ ] No bundle size regression — VS Code extension VSIX must remain under 250 KB
- [ ] Feature flag `healthScore: false` completely suppresses the component (no network call, no render)
- [ ] `useApiHealth()` (service ping) and `useMemoryCollectionHealth()` (collection quality) confirmed as two distinct calls with distinct UI states

### Step 2 — Tag suggestions on memory save

Wire `useIntelligence().suggestTags()` into the VS Code memory creation flow. Tags should appear as a suggestion tray after content is entered, before save is confirmed.

**Acceptance criteria:**
- [ ] Suggestions appear within 2s of content entry
- [ ] User can accept all, accept individual, or dismiss
- [ ] `tagSuggestions: false` flag suppresses entirely (no network call)

---

## Phase 4 — Track A Rollout

After Phase 3 passes, roll out identical features to remaining surfaces. No new hooks — all hooks defined in Phase 2 are already available.

| Surface | Feature | Hook |
|---------|---------|------|
| Web extension sidepanel | Related memories below each card | `useIntelligence().findRelated()` |
| Web extension | Tag suggestions in create form | `useIntelligence().suggestTags()` |
| Web extension | Health indicator in header | `useMemoryCollectionHealth()` |
| Mobile PWA | Real health banner (replaces stub in `AIStatusBanner.tsx`) | `useMemoryCollectionHealth()` |
| Mobile PWA | Tag suggestions in QuickCapture | `useIntelligence().suggestTags()` |
| Mobile PWA | Insights card in memory detail | `useIntelligence().extractInsights()` |
| Mobile native | Related memories in memory detail | `useIntelligence().findRelated()` |

**Duplicate detection**: User-triggered only — a "Scan for duplicates" button. Do NOT implement as a background job until rate limits, cache policy, and privacy boundary are confirmed with backend team.

---

## Phase 5 — Track B Unblock

> **Gate**: Confirm `@lanonasis/memory-client` has been updated with backend Phase 1 SDK methods before adding dep to `packages/shared`. Check with backend team or verify the published version includes `listInferredConclusions`.

**Step 1** — Add dep to `packages/shared/package.json`:

```json
{
  "dependencies": {
    "@lanonasis/mem-intel-sdk": "^2.1.0",
    "@lanonasis/memory-client": "^2.2.0"
  }
}
```

**Step 2** — Flip feature flags in `DEFAULT_FEATURES` (after dep confirmed):

```typescript
topics: true,
analytics: true,
enhancedSearch: true,
inferredConclusions: true,  // only if SDK version confirmed to include new methods
```

**Step 3** — Add hooks to `react-hooks.tsx`:
- `useTopics()` — wraps `CoreMemoryClient` topic CRUD
- `useEnhancedSearch()` — wraps `enhancedSearch()` with `search_mode` selector; fallback to basic search if disabled; hide mode selector entirely when `features.enhancedSearch === false`
- `useAnalytics()` — wraps `getSearchAnalytics()` + `getAccessPatterns()` + `getExtendedStats()`

**Enhanced search mapping** (verify with backend before wiring):
- `text` → existing `POST /memory/search` (confirmed)
- `vector` → same endpoint with explicit mode param (verify backend supports)
- `hybrid` → only expose if backend confirms hybrid mode support

---

## Phase 6 — "Ask Me Anything" Chat Interface Upgrade

> **Gate**: Backend Phase 3 (`POST /api/v1/context`) must be live and API contract frozen before this phase starts. Verify with backend team. Feature flag: `contextBundle: true` is the on-switch.

This phase upgrades all chat surfaces from ad-hoc retrieval to the purpose-built context bundle infrastructure. The `useContextBundle()` hook (defined in Phase 2.5) is the only intelligence source these surfaces should use for response generation.

### VS Code — `chatParticipant.ts` upgrade

**Current**: `POST /memory/search` → format results as markdown → stream to VS Code chat
**Target**: `useContextBundle({ query, format: 'anthropic' })` → feed pre-compiled bundle to Claude → stream response

The context bundle already includes profile summary, recent memories, related conclusions, and semantic recall — the participant no longer needs to assemble this manually. The existing intent parser (`/save`, `/find`, `/list` commands) stays unchanged; only the retrieval path for conversational queries changes.

**Acceptance criteria:**
- [ ] `@memory what do I know about OAuth?` returns a synthesized answer, not a raw search results list
- [ ] Response draws on inferred conclusions and profile summary when available (bundle `metadata.sources` visible in debug mode)
- [ ] Bundle compile time + LLM response latency under 5s on fast connection
- [ ] Falls back gracefully to basic search when `contextBundle` flag is false or endpoint unavailable

### Mobile PWA — `ChatInterface.tsx` upgrade

**Current**: Tier 1 = Xenova on-device AI → Tier 2 = cloud AI search → Tier 3 = text fallback
**Target**: Add Tier 0 = "Full Context AI" using `useContextBundle()` above existing tiers

The existing tier cascade stays in place — Tier 0 is additive. When `contextBundle` flag is true and network is available, attempt Tier 0 first. On failure (network, rate limit, cold start), fall through to existing Tier 1 without user-visible error.

**Acceptance criteria:**
- [ ] "Full Context AI" badge appears when Tier 0 responds
- [ ] Response noticeably richer than Tier 2 for queries touching user history
- [ ] Tier cascade falls back correctly on network failure
- [ ] No regression to existing tiers when flag is false

### Web Extension — `SidePanel.tsx` upgrade

**Current**: `handleSendChat()` runs semantic search → renders matching memory cards
**Target**: `handleSendChat()` calls `useContextBundle({ query })` → renders a generated response + supporting memory cards

This promotes the Web Extension from "search with chat UI" to "conversational AI assistant with memory".

**Acceptance criteria:**
- [ ] User receives a synthesized sentence-level response, not just a list of memory cards
- [ ] Supporting memories still shown below the response (provenance)
- [ ] Input placeholder updated: "Ask about your memories..." (currently "Ask anything or paste context to save...")
- [ ] Send triggers context bundle compile, not raw search
- [ ] Graceful degradation: if `contextBundle` flag false, reverts to existing search behavior

---

## Key Constraints

1. **Bundle size**: `intelligence-client.ts` must use dynamic `import()`. Do not import at module top-level. VS Code and browser extensions have strict bundle budgets. VS Code VSIX must stay under 250 KB.

2. **Two healthChecks**: `useMemoryCollectionHealth()` calls `mem-intel-sdk.healthCheck()` (collection quality). The existing connection-test code in the VS Code extension calls `memory-client.healthCheck()` (service ping — rename to `useApiHealth()`). Keep these separate — a low health score is not the same as platform downtime.

3. **Duplicate detection**: User-triggered first. Background scheduling only after rate limits are established.

4. **Enhanced search**: Blocked on Track B dep addition. Hide the mode selector unless `features.enhancedSearch === true`.

5. **Offline behavior**: All hooks must degrade gracefully when offline. Return safe empty defaults on network error. The existing offline queue must not be disrupted.

6. **InferredConclusions timing**: Do NOT add `@lanonasis/memory-client` to `packages/shared` until the backend team confirms the new SDK version is published with the three reasoning methods. Adding the wrong version and then shipping to users creates a silent feature gap that is harder to diagnose than a gated flag.

7. **Context bundle gating**: `useContextBundle()` must be a true no-op when `features.contextBundle === false`. Do not make the fetch call speculatively. The backend Phase 3 endpoint may not exist yet.

8. **Chat interface falls back silently**: All three chat surface upgrades in Phase 6 must silently fall back to their pre-upgrade behavior when the context bundle is unavailable. Users must never see a blank chat or an error caused by a missing backend endpoint.

---

## Testing Requirements

| Test Type | What to Cover |
|-----------|--------------|
| **Adapter contract tests** | API response → `AppMemory`, `AppInsight`, `InferredConclusion` mapping functions |
| **Feature flag tests** | Every disabled feature flag must produce zero SDK/network calls and safe empty defaults |
| **Bundle regression tests** | VS Code + web extension build sizes before/after each phase; VSIX must stay under 250 KB |
| **Offline degradation tests** | All hooks return safe defaults when fetch fails; existing offline queue unaffected |
| **Auth header preservation** | Intelligence calls use correct `X-API-Key` or `Bearer` header |
| **InferredConclusions gate tests** | `useInferredConclusions` and `useFlushReasoning` must be complete no-ops when flag false; no `import('@lanonasis/memory-client')` attempted |
| **Context bundle fallback tests** | Each Phase 6 chat surface falls back to pre-upgrade behavior when `contextBundle` flag false or endpoint returns non-200 |

---

## Revised Execution Sequence

```
Phase 0 — DONE  (verified capability matrix, two-SDK split confirmed)

Phase 1 — Foundation  [start now, no backend dependency]
  ├── Expand Memory type: status, topicId, InferredConclusion, ReasoningJob, ContextBundle stubs
  ├── Add features to LanonasisConfig (Track A defaults true; Track B/C defaults false)
  ├── Create adapter.ts with AppMemory mapping
  └── Create intelligence-client.ts as lazy dynamic import

Phase 2 — Track A Intelligence Hooks  [start now, no backend dependency]
  ├── Add useMemoryCollectionHealth()
  ├── Add useIntelligence() (suggestTags, findRelated, detectDuplicates, extractInsights, analyzePatterns)
  └── Export from packages/shared/src/sdk/index.ts

Phase 2.5 — Reasoning & Context Bundle Hook Stubs  [code now, gated by flags]
  ├── Add useInferredConclusions() — flag: inferredConclusions (default false)
  ├── Add useFlushReasoning() — flag: inferredConclusions (default false)
  └── Add useContextBundle() — flag: contextBundle (default false)

Phase 3 — First Surface Validation (VS Code only)  [no backend dependency]
  ├── HealthCard component → IDEPanel sidebar (useMemoryCollectionHealth)
  └── Tag suggestions on memory save (useIntelligence.suggestTags)
  Verify end-to-end before touching any other surface

Phase 4 — Track A Rollout  [no backend dependency]
  ├── Web extension: related + tag suggestions + health indicator
  ├── Mobile PWA: health banner + tag suggestions + insights
  └── Mobile native: related memories in detail screen

  ← BACKEND HANDOFF POINT 1: backend Phase 1 ships new memory-client SDK methods

Phase 5 — Track B Unblock  [gated: backend Phase 1 + dep addition]
  ├── Verify @lanonasis/memory-client published version includes listInferredConclusions
  ├── Add @lanonasis/memory-client to packages/shared/package.json
  ├── Add useTopics(), useEnhancedSearch(), useAnalytics()
  ├── Flip flags: topics/analytics/enhancedSearch/inferredConclusions → true
  └── Roll out Topics UI + Analytics pages + InferredConclusions panel across surfaces

  ← BACKEND HANDOFF POINT 2: backend Phase 3 ships /api/v1/context endpoint

Phase 6 — "Ask Me Anything" Chat Upgrade  [gated: backend Phase 3]
  ├── Confirm /api/v1/context API contract with backend team
  ├── Flip flag: contextBundle → true
  ├── VS Code chatParticipant.ts: replace search retrieval with useContextBundle({ format: 'anthropic' })
  ├── Mobile PWA ChatInterface.tsx: add "Full Context AI" Tier 0 above existing tiers
  └── Web Extension SidePanel.tsx: upgrade from search-only to conversational response + sources
```

---

## ADR to Create

- **ADR-006**: SDK Intelligence Surfacing — Two-SDK Architecture, Adapter Pattern, Feature Flags
  - Two-SDK split (`mem-intel-sdk` Track A, `memory-client` Track B)
  - Lazy-load requirement for extension bundle safety
  - Two-healthCheck distinction (`useMemoryCollectionHealth` vs `useApiHealth`)
  - Feature flag gating strategy for backend-dependent phases
  - Context bundle as the unified intelligence layer for all chat surfaces

---

## Documentation to Update After Implementation

- `docs/context/components/shared-package-context.md` — add new hooks
- `docs/context/context-engineering-progress.md` — mark phases complete as they land
- `docs/context/architecture/decisions/adr-006-intelligence-surfacing.md` — create new
- `docs/context/components/vscode-extension-context.md` — note chatParticipant upgrade
- `docs/context/components/web-extension-context.md` — note SidePanel upgrade

---

_Version: 2.1 — Updated 2026-05-08 — Backend sync amendment (InferredConclusions types, reasoning hooks, context bundle, Phase 6 chat upgrade)_
_Previous version (2.0) was grounded in SDK surface verification but did not account for the backend context-engine upgrade timeline or the interactive AI assistant surface gap._
