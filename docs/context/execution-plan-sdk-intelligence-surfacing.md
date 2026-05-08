# Execution Plan: SDK Intelligence Feature Surfacing

## Executive Summary

**Objective**: Surface the 80% of `@lanonasis/memory-client` v2.2.0 and `@lanonasis/mem-intel-sdk` capabilities that are currently unused across all application surfaces.

**Current State**: Apps use ~20% of SDK (basic CRUD, basic search). Intelligence features (topics, analytics, enhanced search, pattern analysis, duplicate detection) are available in SDK but wired to zero surfaces.

**Target State**: All intelligence features accessible via `packages/shared` React hooks, surfaced consistently across VS Code extension, web extension, mobile PWA, and mobile native.

---

## 1. Gap Analysis Summary

### 1.1 @lanonasis/memory-client v2.2.0 — Capability Matrix

| Capability | SDK Status | Surfaced Status | Gap Impact |
|------------|-----------|-----------------|------------|
| **Memory CRUD** | ✅ Available | ✅ All surfaces | None |
| **Basic search** | ✅ Available | ✅ All surfaces | None |
| **Memory Topics** (hierarchical) | ✅ Available | ❌ Nowhere | **HIGH** — Organization primitive missing |
| **Enhanced Search** (vector/text/hybrid) | ✅ Available | ❌ Basic only | **HIGH** — Defaulting to inferior search |
| **Content Preprocessing** (chunking, ingestion) | ✅ Available | ❌ Nowhere | **MEDIUM** — Could improve UX |
| **Analytics** (access patterns, popular queries, tag stats) | ✅ Available | ❌ Nowhere | **HIGH** — User insights unavailable |
| **Memory Status** (active/archived/draft) | ✅ Available | ❌ No UI | **MEDIUM** — Lifecycle management missing |

### 1.2 @lanonasis/mem-intel-sdk — Intelligence Matrix

| Intelligence Feature | API Method | Surfaced Status | Gap Impact |
|---------------------|------------|-----------------|------------|
| **Usage patterns & trends** | `analyzePatterns()` | ❌ Unwired | **HIGH** — Analytics unavailable |
| **AI tag suggestions** | `suggestTags()` | ❌ Unwired | **HIGH** — Manual tagging only |
| **Vector-similar memories** | `findRelated()` | ❌ Unwired | **HIGH** — Discovery feature missing |
| **Duplicate detection** | `detectDuplicates()` | ❌ Unwired | **MEDIUM** — Storage inefficiency |
| **Insight extraction** | `extractInsights()` | ❌ Unwired | **HIGH** — AI insights unavailable |
| **Collection health score** | `healthCheck()` | ⚠️ Ping only | **MEDIUM** — Health feature underutilized |

### 1.3 Root Cause Analysis

```
The Gap:
┌─────────────────────────────────────────────────────────────┐
│  @lanonasis/memory-client v2.2.0                              │
│  @lanonasis/mem-intel-sdk                                    │
│       ↓                                                      │
│  packages/shared/src/sdk/                                   │
│       ├── index.ts (LanonasisClient - has intelligence)    │
│       └── react-hooks.tsx (NO intelligence hooks)           │
│       ↓                                                      │
│  All App Surfaces                                           │
│       ├── VS Code extension                                │
│       ├── Web extension                                    │
│       ├── Mobile PWA                                       │
│       └── Mobile native                                    │
│                                                              │
│  Result: Intelligence features NEVER reach any surface      │
└─────────────────────────────────────────────────────────────┘
```

**The Single Point of Failure**: `packages/shared/src/sdk/react-hooks.tsx` only exposes `useMemories`, `useLocalAI`, `useApiKeys`, `useSyncStatus` — zero intelligence hooks.

---

## 2. Execution Strategy

### 2.1 Two-Track Approach

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         EXECUTION STRATEGY                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Track 1: Phase 1 Catch-Up (Ship Now)                                  │
│  ├── Add intelligence hooks to packages/shared                        │
│  ├── Surface per-platform immediately                                  │
│  └── Backend already supports all features                             │
│                                                                         │
│  Track 2: Phase 2 Preparation (Protect Against Churn)                  │
│  ├── Create adapter.ts for API contract isolation                      │
│  ├── Add feature flags for gradual rollout                           │
│  └── Scaffold analytics pages (empty, ready for Phase 2 data)        │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Track 1: Phase 1 Catch-Up — Detailed Plan

#### Week 1: Foundation — Shared Intelligence Layer

**Day 1-2: Create `intelligence-client.ts`**

```typescript
// packages/shared/src/sdk/intelligence-client.ts
// Thin singleton wrapper around MemoryIntelligenceClient

export class IntelligenceClient {
  private static instance: IntelligenceClient;
  private memoryClient: MemoryClient;
  
  private constructor(config: LanonasisConfig) {
    this.memoryClient = new MemoryClient(config);
  }
  
  static getInstance(config?: LanonasisConfig): IntelligenceClient {
    if (!IntelligenceClient.instance) {
      if (!config) throw new Error('Config required for first initialization');
      IntelligenceClient.instance = new IntelligenceClient(config);
    }
    return IntelligenceClient.instance;
  }
  
  // Topics
  async getTopics(): Promise<MemoryTopic[]> { ... }
  async createTopic(topic: CreateTopicInput): Promise<MemoryTopic> { ... }
  async organizeMemory(memoryId: string, topicId: string): Promise<void> { ... }
  
  // Enhanced Search
  async searchAdvanced(query: string, mode: 'vector' | 'text' | 'hybrid'): Promise<Memory[]> { ... }
  
  // Analytics
  async getAnalytics(): Promise<MemoryAnalytics> { ... }
  async getPopularQueries(): Promise<string[]> { ... }
  async getTagStats(): Promise<TagStat[]> { ... }
  
  // Intelligence
  async analyzePatterns(): Promise<PatternAnalysis> { ... }
  async suggestTags(content: string): Promise<string[]> { ... }
  async findRelated(memoryId: string): Promise<Memory[]> { ... }
  async detectDuplicates(): Promise<DuplicateGroup[]> { ... }
  async extractInsights(memoryId: string): Promise<Insight[]> { ... }
  async healthCheck(): Promise<HealthScore> { ... }
}
```

**Day 3-4: Extend `react-hooks.tsx` with Intelligence Hooks**

```typescript
// packages/shared/src/sdk/react-hooks.tsx
// Add to existing file

// ============================================
// Intelligence Hooks (NEW)
// ============================================

export function useIntelligence() {
  const { client, isAuthenticated } = useLanonasis();
  const [intelligence] = useState(() => IntelligenceClient.getInstance());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const analyzePatterns = useCallback(async () => {
    if (!isAuthenticated) return null;
    setIsLoading(true);
    try {
      return await intelligence.analyzePatterns();
    } finally {
      setIsLoading(false);
    }
  }, [intelligence, isAuthenticated]);
  
  const suggestTags = useCallback(async (content: string) => {
    if (!isAuthenticated) return [];
    return await intelligence.suggestTags(content);
  }, [intelligence, isAuthenticated]);
  
  const findRelated = useCallback(async (memoryId: string) => {
    if (!isAuthenticated) return [];
    return await intelligence.findRelated(memoryId);
  }, [intelligence, isAuthenticated]);
  
  const detectDuplicates = useCallback(async () => {
    if (!isAuthenticated) return [];
    return await intelligence.detectDuplicates();
  }, [intelligence, isAuthenticated]);
  
  const extractInsights = useCallback(async (memoryId: string) => {
    if (!isAuthenticated) return [];
    return await intelligence.extractInsights(memoryId);
  }, [intelligence, isAuthenticated]);
  
  return {
    analyzePatterns,
    suggestTags,
    findRelated,
    detectDuplicates,
    extractInsights,
    isLoading,
    error,
  };
}

export function useMemoryHealth() {
  const { isAuthenticated } = useLanonasis();
  const [intelligence] = useState(() => IntelligenceClient.getInstance());
  const [healthScore, setHealthScore] = useState<HealthScore | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const checkHealth = useCallback(async () => {
    if (!isAuthenticated) return null;
    setIsLoading(true);
    try {
      const score = await intelligence.healthCheck();
      setHealthScore(score);
      return score;
    } finally {
      setIsLoading(false);
    }
  }, [intelligence, isAuthenticated]);
  
  // Auto-check on mount
  useEffect(() => {
    if (isAuthenticated) {
      checkHealth();
    }
  }, [isAuthenticated, checkHealth]);
  
  return {
    healthScore,
    checkHealth,
    isLoading,
  };
}

export function useTopics() {
  const { isAuthenticated } = useLanonasis();
  const [intelligence] = useState(() => IntelligenceClient.getInstance());
  const [topics, setTopics] = useState<MemoryTopic[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const fetchTopics = useCallback(async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    try {
      const result = await intelligence.getTopics();
      setTopics(result);
    } finally {
      setIsLoading(false);
    }
  }, [intelligence, isAuthenticated]);
  
  const createTopic = useCallback(async (input: CreateTopicInput) => {
    if (!isAuthenticated) return null;
    const topic = await intelligence.createTopic(input);
    setTopics(prev => [...prev, topic]);
    return topic;
  }, [intelligence, isAuthenticated]);
  
  const organizeMemory = useCallback(async (memoryId: string, topicId: string) => {
    if (!isAuthenticated) return;
    await intelligence.organizeMemory(memoryId, topicId);
  }, [intelligence, isAuthenticated]);
  
  useEffect(() => {
    if (isAuthenticated) fetchTopics();
  }, [isAuthenticated, fetchTopics]);
  
  return {
    topics,
    isLoading,
    fetchTopics,
    createTopic,
    organizeMemory,
  };
}

export function useEnhancedSearch() {
  const { isAuthenticated } = useLanonasis();
  const [intelligence] = useState(() => IntelligenceClient.getInstance());
  const [results, setResults] = useState<Memory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchMode, setSearchMode] = useState<'vector' | 'text' | 'hybrid'>('hybrid');
  
  const search = useCallback(async (query: string) => {
    if (!isAuthenticated || !query) return [];
    setIsLoading(true);
    try {
      const result = await intelligence.searchAdvanced(query, searchMode);
      setResults(result);
      return result;
    } finally {
      setIsLoading(false);
    }
  }, [intelligence, isAuthenticated, searchMode]);
  
  return {
    results,
    isLoading,
    search,
    searchMode,
    setSearchMode,
  };
}

export function useAnalytics() {
  const { isAuthenticated } = useLanonasis();
  const [intelligence] = useState(() => IntelligenceClient.getInstance());
  const [analytics, setAnalytics] = useState<MemoryAnalytics | null>(null);
  const [popularQueries, setPopularQueries] = useState<string[]>([]);
  const [tagStats, setTagStats] = useState<TagStat[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const fetchAnalytics = useCallback(async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    try {
      const [a, p, t] = await Promise.all([
        intelligence.getAnalytics(),
        intelligence.getPopularQueries(),
        intelligence.getTagStats(),
      ]);
      setAnalytics(a);
      setPopularQueries(p);
      setTagStats(t);
    } finally {
      setIsLoading(false);
    }
  }, [intelligence, isAuthenticated]);
  
  useEffect(() => {
    if (isAuthenticated) fetchAnalytics();
  }, [isAuthenticated, fetchAnalytics]);
  
  return {
    analytics,
    popularQueries,
    tagStats,
    isLoading,
    fetchAnalytics,
  };
}
```

**Day 5: Surface Health Score — VS Code Extension**

**File**: `packages/vscode-extension/src/webview/components/HealthCard.tsx`

```typescript
// New component using useMemoryHealth()
import { useMemoryHealth } from '@lanonasis/shared';

export function HealthCard() {
  const { healthScore, checkHealth, isLoading } = useMemoryHealth();
  
  if (isLoading) return <Spinner />;
  if (!healthScore) return null;
  
  return (
    <Card>
      <CardHeader>Collection Health</CardHeader>
      <CardContent>
        <ScoreGauge score={healthScore.score} />
        <StatsGrid>
          <Stat label="Total Memories" value={healthScore.total} />
          <Stat label="Archived" value={healthScore.archived} />
          <Stat label="Orphaned" value={healthScore.orphaned} />
          <Stat label="Duplicates" value={healthScore.duplicates} />
        </StatsGrid>
        {healthScore.recommendations.length > 0 && (
          <RecommendationsList items={healthScore.recommendations} />
        )}
      </CardContent>
    </Card>
  );
}
```

**Integration Point**: Add HealthCard to IDEPanel sidebar as a collapsible section.

---

#### Week 2: Cross-Platform Surfacing

**Day 1-2: Web Extension — Related Memories & Tag Suggestions**

| Feature | Location | Implementation |
|---------|----------|----------------|
| **Related Memories** | SidePanel memory detail | `useIntelligence().findRelated(memoryId)` |
| **Tag Suggestions** | Create/Edit memory form | `useIntelligence().suggestTags(content)` |
| **Health Indicator** | SidePanel header | `useMemoryHealth()` mini gauge |

**Day 3-4: Mobile PWA — Intelligence Panel & Insights**

| Feature | Location | Implementation |
|---------|----------|----------------|
| **AI Status Banner** (replacement) | Home screen | Real health score from `useMemoryHealth()` |
| **Insights Card** | Memory detail | `useIntelligence().extractInsights(memoryId)` |
| **Related Memories** | Memory detail | `useIntelligence().findRelated(memoryId)` |
| **Tag Suggestions** | QuickCapture | `useIntelligence().suggestTags(content)` |

**Day 5: Mobile Native — Memory Detail Enhancement**

**File**: `apps/mobile/app/memories/[id].tsx`

```typescript
// Add Related Memories section using existing MemoryDetailScreen
import { useIntelligence } from '@lanonasis/shared';

export function MemoryDetailScreen({ memoryId }: { memoryId: string }) {
  const { findRelated } = useIntelligence();
  const [related, setRelated] = useState<Memory[]>([]);
  
  useEffect(() => {
    findRelated(memoryId).then(setRelated);
  }, [memoryId, findRelated]);
  
  return (
    <ScrollView>
      {/* Existing memory content */}
      <MemoryContent memoryId={memoryId} />
      
      {/* New: Related Memories section */}
      {related.length > 0 && (
        <Section title="Related Memories">
          {related.map(m => <MemoryCard key={m.id} memory={m} />)}
        </Section>
      )}
    </ScrollView>
  );
}
```

---

#### Week 3: Advanced Features & Analytics Scaffolding

**Day 1-2: Topics Management**

Add to `useTopics()` hook and surface:
- **VS Code**: Topic tree view in sidebar
- **Web Extension**: Topic filter dropdown
- **Mobile PWA**: Topic chips on memory cards
- **Mobile Native**: Topic picker in memory create/edit

**Day 3: Enhanced Search Mode Selector**

```typescript
// Add to all search UIs
<SearchModeSelector
  value={searchMode}
  onChange={setSearchMode}
  options={[
    { value: 'hybrid', label: 'Hybrid (Recommended)', icon: 'sparkles' },
    { value: 'vector', label: 'Semantic', icon: 'brain' },
    { value: 'text', label: 'Exact Match', icon: 'text' },
  ]}
/>
```

**Day 4-5: Analytics Scaffolding (Empty Pages)**

| Surface | Route/Page | Content |
|---------|------------|---------|
| **Mobile PWA** | `/analytics` | Empty charts, ready for Phase 2 data |
| **VS Code** | Intelligence panel tab | Placeholder cards for usage patterns |
| **Web Extension** | Analytics section | Stubbed components |

---

### 2.3 Track 2: Phase 2 Preparation — Contract Protection

#### Adapter Pattern Implementation

**File**: `packages/shared/src/sdk/adapter.ts`

```typescript
/**
 * API Adapter Layer
 * 
 * Purpose: Isolate apps from Phase 2 backend contract changes.
 * When Phase 2 changes API shapes, only this file changes.
 */

import type { 
  Memory as Phase1Memory,
  CreateMemoryInput as Phase1CreateMemoryInput,
  MemoryTopic as Phase1MemoryTopic,
  PatternAnalysis as Phase1PatternAnalysis,
  // ... Phase 1 types
} from '@lanonasis/memory-client';

// Internal app-facing types (stable)
export interface AppMemory {
  id: string;
  title: string;
  content: string;
  type: string;
  tags: string[];
  status: 'active' | 'archived' | 'draft';
  topicId?: string;
  createdAt: string;
  updatedAt: string;
  // ... stable fields
}

export interface AppPatternAnalysis {
  patterns: Pattern[];
  trends: Trend[];
  recommendations: string[];
  // ... stable fields
}

// Adapter functions
export function adaptMemory(phase1Memory: Phase1Memory): AppMemory {
  return {
    id: phase1Memory.id,
    title: phase1Memory.title,
    content: phase1Memory.content,
    type: phase1Memory.memory_type || 'context',
    tags: phase1Memory.tags || [],
    status: phase1Memory.status || 'active',
    topicId: phase1Memory.topic_id,
    createdAt: phase1Memory.created_at,
    updatedAt: phase1Memory.updated_at,
  };
}

export function adaptCreateMemoryInput(
  appInput: Partial<AppMemory>
): Phase1CreateMemoryInput {
  return {
    title: appInput.title!,
    content: appInput.content!,
    memory_type: appInput.type,
    tags: appInput.tags,
    // ... map fields
  };
}

// When Phase 2 changes contracts:
// 1. Import new Phase 2 types
// 2. Update adapter functions
// 3. Apps continue using AppMemory (no changes)
```

#### Feature Flags Configuration

**File**: `packages/shared/src/sdk/index.ts` (extend LanonasisConfig)

```typescript
export interface LanonasisConfig {
  apiUrl: string;
  apiKey?: string;
  // ... existing fields
  
  /**
   * Feature flags for gradual rollout of intelligence features.
   * Use to disable features until Phase 2 backend is ready.
   */
  features?: {
    /** Enable memory health score display */
    healthScore?: boolean;
    /** Enable AI tag suggestions */
    tagSuggestions?: boolean;
    /** Enable related memories discovery */
    relatedMemories?: boolean;
    /** Enable pattern analysis panel */
    patternAnalysis?: boolean;
    /** Enable duplicate detection */
    duplicateDetection?: boolean;
    /** Enable topic management */
    topics?: boolean;
    /** Enable analytics dashboard (requires Phase 2) */
    analytics?: boolean;
    /** Enable enhanced search modes */
    enhancedSearch?: boolean;
  };
}

// Default: all Phase 1 features enabled, Phase 2 disabled
export const DEFAULT_FEATURES: Required<LanonasisConfig['features']> = {
  healthScore: true,
  tagSuggestions: true,
  relatedMemories: true,
  patternAnalysis: false, // Phase 2
  duplicateDetection: true,
  topics: true,
  analytics: false, // Phase 2
  enhancedSearch: true,
};
```

---

## 3. Implementation Sequence

### Priority Order

```
┌─────────────────────────────────────────────────────────────────────┐
│  WEEK 1 — Foundation (Highest Leverage)                             │
│  ├─ Day 1-2: Create intelligence-client.ts                         │
│  ├─ Day 3-4: Add hooks to react-hooks.tsx                          │
│  └─ Day 5: Surface health score in VS Code                         │
│                                                                     │
│  WEEK 2 — Cross-Platform Surfacing                                  │
│  ├─ Day 1-2: Web extension (related, suggestions)                  │
│  ├─ Day 3-4: Mobile PWA (insights, related, suggestions)           │
│  └─ Day 5: Mobile native (related memories)                       │
│                                                                     │
│  WEEK 3 — Advanced Features & Phase 2 Prep                          │
│  ├─ Day 1-2: Topics management across all surfaces                 │
│  ├─ Day 3: Enhanced search mode selector                           │
│  ├─ Day 4-5: Analytics scaffolding + adapter.ts                    │
│  └─ Final: Feature flags wired to config                           │
│                                                                     │
│  PHASE 2 — Contract Absorption                                      │
│  └─ Adapter.ts absorbs backend changes, apps unchanged             │
└─────────────────────────────────────────────────────────────────────┘
```

### First Action (Immediate)

**Add `useIntelligence()` to `packages/shared/src/sdk/react-hooks.tsx`**

This single action unblocks every surface simultaneously. All apps consuming `@lanonasis/shared` immediately gain access to intelligence features.

---

## 4. Surfacing Per Platform

### 4.1 VS Code Extension

| Feature | UI Location | Hook Used |
|---------|-------------|-----------|
| **Health Score Card** | Sidebar panel (new section) | `useMemoryHealth()` |
| **Related Memories** | Memory detail view | `useIntelligence().findRelated()` |
| **Tag Suggestions** | Create memory form | `useIntelligence().suggestTags()` |
| **Intelligence Panel** | New sidebar tab | `useIntelligence()`, `useAnalytics()` |
| **Topic Tree** | Sidebar tree view | `useTopics()` |

### 4.2 Web Extension (SidePanel)

| Feature | UI Location | Hook Used |
|---------|-------------|-----------|
| **Related Section** | Below each memory card | `useIntelligence().findRelated()` |
| **Health Indicator** | Header gauge | `useMemoryHealth()` |
| **Tag Suggestions** | Create/edit form | `useIntelligence().suggestTags()` |
| **Duplicate Detection** | Background badge | `useIntelligence().detectDuplicates()` |

### 4.3 Mobile PWA

| Feature | UI Location | Hook Used |
|---------|-------------|-----------|
| **AI Status Banner** (real) | Home screen header | `useMemoryHealth()` |
| **Insights Card** | Memory detail | `useIntelligence().extractInsights()` |
| **Related Memories** | Memory detail | `useIntelligence().findRelated()` |
| **Tag Suggestions** | QuickCapture | `useIntelligence().suggestTags()` |
| **Topics** | Memory chips + filter | `useTopics()` |
| **Analytics Page** | `/analytics` route | `useAnalytics()` (stubbed) |

### 4.4 Mobile Native

| Feature | UI Location | Hook Used |
|---------|-------------|-----------|
| **Related Memories** | Memory detail screen | `useIntelligence().findRelated()` |
| **Tag Suggestions** | Create/edit screen | `useIntelligence().suggestTags()` |
| **Topic Picker** | Memory form | `useTopics()` |

---

## 5. Testing Strategy

### 5.1 Unit Tests

```typescript
// packages/shared/src/sdk/__tests__/intelligence-hooks.test.tsx

describe('useIntelligence', () => {
  it('should suggest tags for content', async () => {
    const { result } = renderHook(() => useIntelligence(), {
      wrapper: LanonasisProvider,
    });
    
    const tags = await result.current.suggestTags('React hooks pattern');
    expect(tags).toContain('react');
    expect(tags).toContain('hooks');
  });
  
  it('should find related memories', async () => {
    const { result } = renderHook(() => useIntelligence(), {
      wrapper: LanonasisProvider,
    });
    
    const related = await result.current.findRelated('memory-123');
    expect(related).toBeInstanceOf(Array);
  });
});

describe('useMemoryHealth', () => {
  it('should fetch health score on mount when authenticated', async () => {
    const { result, waitFor } = renderHook(() => useMemoryHealth(), {
      wrapper: AuthenticatedProvider,
    });
    
    await waitFor(() => result.current.healthScore !== null);
    expect(result.current.healthScore?.score).toBeGreaterThan(0);
  });
});
```

### 5.2 Integration Tests Per Surface

| Surface | Test Scenario |
|---------|----------------|
| **VS Code** | Health card renders with score, recommendations display |
| **Web Ext** | Related memories load when viewing memory detail |
| **Mobile PWA** | Tag suggestions appear while typing in QuickCapture |
| **Mobile Native** | Related memories section renders in memory detail |

### 5.3 E2E Tests

```typescript
// Test: End-to-end intelligence flow
describe('Intelligence E2E', () => {
  it('should suggest tags, save memory, find related', async () => {
    // 1. User creates memory with tag suggestions
    const suggestions = await intelligence.suggestTags('Docker containerization');
    
    // 2. User saves memory with suggested tags
    const memory = await client.memory.create({
      title: 'Docker Guide',
      content: 'Docker containerization...',
      tags: suggestions.slice(0, 3),
    });
    
    // 3. User views related memories
    const related = await intelligence.findRelated(memory.id);
    expect(related.length).toBeGreaterThan(0);
  });
});
```

---

## 6. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| **SDK methods don't exist** (fake API) | Medium | High | Verify SDK source first; stub if needed |
| **Performance degradation** (AI operations slow) | Medium | Medium | Add loading states; debounce suggestions |
| **Hook compatibility issues** | Low | High | Test in all React versions (18, 19) |
| **Phase 2 contract changes break adapter** | High | Medium | Adapter pattern isolates changes; test suite |
| **Bundle size increase** | Medium | Low | Tree-shaking; lazy load intelligence client |
| **Feature flag confusion** | Medium | Low | Document defaults; add dev mode override |

---

## 7. Success Metrics

### 7.1 Code Metrics

| Metric | Before | After | Target |
|--------|--------|-------|--------|
| SDK surface coverage | 20% | 80%+ | ✅ All intelligence features accessible |
| Hooks in shared package | 6 | 11+ | ✅ useIntelligence, useMemoryHealth, useTopics, useEnhancedSearch, useAnalytics |
| Adapter layer | 0 files | 1 file | ✅ adapter.ts exists |
| Feature flags | 0 | 8 | ✅ All features toggleable |

### 7.2 User-Facing Metrics

| Feature | Surfaced In | Verification |
|---------|-------------|--------------|
| Health Score | VS Code, Mobile PWA | Visual indicator renders |
| Tag Suggestions | All surfaces | Suggestions appear on create/edit |
| Related Memories | All surfaces | Related section loads |
| Topics | All surfaces | Topic CRUD works |
| Enhanced Search | All surfaces | Mode selector works |
| Analytics | All surfaces | Analytics page accessible (stubbed) |

---

## 8. Documentation Requirements

### 8.1 Code Documentation

- [ ] JSDoc for all new hooks
- [ ] README update for `packages/shared`
- [ ] ADR-008: Intelligence Feature Surfacing (new ADR)

### 8.2 User Documentation

- [ ] VS Code extension: Changelog entry for new features
- [ ] Mobile PWA: Feature guide for health score, topics
- [ ] Web extension: README update

### 8.3 Context Engineering

- [ ] Update `shared-package-context.md` with new hooks
- [ ] Add `adr-008-intelligence-surfacing.md`
- [ ] Update `context-engineering-progress.md`

---

## 9. Immediate Next Steps

### Ready to Execute Now

1. **Verify SDK Methods Exist**
   ```bash
   cd packages/shared
   grep -r "suggestTags\|findRelated\|analyzePatterns\|detectDuplicates" node_modules/@lanonasis/
   ```

2. **Create `intelligence-client.ts`**
   - File: `packages/shared/src/sdk/intelligence-client.ts`
   - Wraps MemoryIntelligenceClient
   - Exposes all intelligence methods

3. **Extend `react-hooks.tsx`**
   - Add `useIntelligence()`
   - Add `useMemoryHealth()`
   - Add `useTopics()`
   - Add `useEnhancedSearch()`
   - Add `useAnalytics()`

4. **Verify in One Surface**
   - Add health score to VS Code extension
   - Test end-to-end
   - Validate pattern works

5. **Roll Out to All Surfaces**
   - Web extension
   - Mobile PWA
   - Mobile native

---

## 10. Appendix: File Inventory

### New Files

| File | Purpose | Lines (Est.) |
|------|---------|--------------|
| `packages/shared/src/sdk/intelligence-client.ts` | SDK wrapper | ~150 |
| `packages/shared/src/sdk/adapter.ts` | Contract isolation | ~200 |
| `packages/shared/src/sdk/__tests__/intelligence-hooks.test.tsx` | Unit tests | ~300 |

### Modified Files

| File | Changes |
|------|---------|
| `packages/shared/src/sdk/react-hooks.tsx` | Add 5 new hooks (~300 lines) |
| `packages/shared/src/sdk/index.ts` | Add feature flags, export hooks |
| `packages/vscode-extension/src/webview/components/HealthCard.tsx` | New component |
| `packages/vscode-extension/src/webview/IDEPanel.tsx` | Add HealthCard section |
| `packages/web-extension/src/sidepanel/SidePanel.tsx` | Add related memories |
| `packages/mobile-pwa/src/components/AIStatusBanner.tsx` | Replace stub with real |
| `packages/mobile-pwa/src/app/analytics/page.tsx` | New stubbed page |

---

*Execution Plan Version*: 1.0  
*Created*: 2026-05-08  
*Status*: Ready for Execution  
*Priority*: High — Unlocks 80% of SDK capabilities

</thinking>

Now let me create this comprehensive execution plan document:

<function=write_to_file>
<parameter=TargetFile>/Users/seyederick/DevOps/projects/archive/lzero-aether-mem/docs/context/execution-plan-sdk-intelligence-surfacing.md
