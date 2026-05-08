/**
 * LanOnasis React Hooks - Production Ready
 * Easy integration with React components
 */

import {
  useState,
  useEffect,
  useCallback,
  useContext,
  createContext,
  useMemo,
  ReactNode,
} from "react";
import {
  LanonasisClient,
  LanonasisConfig,
  LanonasisFeatureFlags,
  DEFAULT_FEATURES,
  SyncStatus,
} from "./index";
import {
  Memory,
  CreateMemoryInput,
  User,
  MemoryHealth,
  InferredConclusion,
  ReasoningJob,
  ContextBundle,
  ConciergeMessage,
  ConciergeCitation,
  DriftSignal,
} from "../types";
import { getIntelligenceClient, resetIntelligenceClient } from "./intelligence-client";

// Lazy load the AI engine to avoid blocking initial render
let LocalEmbeddingEngine: any = null;
const getEmbeddingEngine = async () => {
  if (!LocalEmbeddingEngine) {
    const module = await import("../ai/embeddings");
    LocalEmbeddingEngine = module.LocalEmbeddingEngine;
  }
  return new LocalEmbeddingEngine();
};

// ============================================
// Context
// ============================================

interface LanonasisContextValue {
  client: LanonasisClient;
  config: LanonasisConfig;
  features: Required<LanonasisFeatureFlags>;
  isAuthenticated: boolean;
  isConnecting: boolean;
  user: User | null;
  login: (email?: string, password?: string) => Promise<void>;
  logout: () => void;
  error: Error | null;
}

const LanonasisContext = createContext<LanonasisContextValue | null>(null);

// ============================================
// Provider
// ============================================

export function LanonasisProvider({
  children,
  config,
}: {
  children: ReactNode;
  config?: LanonasisConfig;
}) {
  const [client] = useState(() => new LanonasisClient(config));
  const [isAuthenticated, setIsAuthenticated] = useState(
    client.isAuthenticated
  );
  const [isConnecting, setIsConnecting] = useState(false);
  const [user, setUser] = useState<User | null>(client.currentUser);
  const [error, setError] = useState<Error | null>(null);

  // Handle OAuth callback on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("token")) {
      const token = params.get("token");
      if (token) {
        // Handle token from URL (OAuth flow)
        setIsAuthenticated(true);
        window.history.replaceState({}, "", window.location.pathname);
      }
    }
  }, []);

  const login = useCallback(
    async (email?: string, password?: string) => {
      setIsConnecting(true);
      setError(null);

      try {
        const u = await client.login(email, password);
        setUser(u);
        setIsAuthenticated(true);
      } catch (e) {
        setError(e as Error);
        throw e;
      } finally {
        setIsConnecting(false);
      }
    },
    [client]
  );

  const logout = useCallback(() => {
    client.logout();
    resetIntelligenceClient();
    setIsAuthenticated(false);
    setUser(null);
  }, [client]);

  const value = useMemo(
    () => ({
      client,
      config: client.getConfig(),
      features: client.getFeatures(),
      isAuthenticated,
      isConnecting,
      user,
      login,
      logout,
      error,
    }),
    [client, isAuthenticated, isConnecting, user, login, logout, error]
  );

  return (
    <LanonasisContext.Provider value={value}>
      {children}
    </LanonasisContext.Provider>
  );
}

// ============================================
// Main Hook
// ============================================

export function useLanonasis() {
  const context = useContext(LanonasisContext);

  if (!context) {
    throw new Error("useLanonasis must be used within a LanonasisProvider");
  }

  return context;
}

// ============================================
// Memory Hook
// ============================================

export function useMemories(options?: { autoFetch?: boolean }) {
  const { client, isAuthenticated } = useLanonasis();
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetch = useCallback(
    async (query?: string) => {
      if (!isAuthenticated) return;

      setIsLoading(true);
      setError(null);

      try {
        const result = await client.memory.list(query);
        setMemories(result);
      } catch (e) {
        setError(e as Error);
        console.error("[useMemories] Fetch error:", e);
      } finally {
        setIsLoading(false);
      }
    },
    [client, isAuthenticated]
  );

  const search = useCallback(
    async (query: string): Promise<Memory[]> => {
      if (!isAuthenticated) return [];

      setIsLoading(true);
      setError(null);

      try {
        const result = await client.memory.search(query);
        setMemories(result);
        return result;
      } catch (e) {
        setError(e as Error);
        console.error("[useMemories] Search error:", e);
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    [client, isAuthenticated]
  );

  const create = useCallback(
    async (input: CreateMemoryInput) => {
      console.log("[useMemories] 🚀 Creating memory:", input);
      setError(null);

      try {
        console.log("[useMemories] 📡 Calling API...");
        const newMemory = await client.memory.create(input);
        console.log("[useMemories] ✅ Memory created:", newMemory);
        setMemories((prev) => [newMemory, ...prev]);
        return newMemory;
      } catch (e) {
        console.error("[useMemories] ❌ Create failed:", e);
        setError(e as Error);
        throw e;
      }
    },
    [client]
  );

  const update = useCallback(
    async (id: string, input: Partial<CreateMemoryInput>) => {
      setError(null);

      try {
        const updated = await client.memory.update(id, input);
        setMemories((prev) => prev.map((m) => (m.id === id ? updated : m)));
        return updated;
      } catch (e) {
        setError(e as Error);
        throw e;
      }
    },
    [client]
  );

  const remove = useCallback(
    async (id: string) => {
      setError(null);

      try {
        await client.memory.delete(id);
        setMemories((prev) => prev.filter((m) => m.id !== id));
      } catch (e) {
        setError(e as Error);
        throw e;
      }
    },
    [client]
  );

  // Auto-fetch on mount
  useEffect(() => {
    if (options?.autoFetch !== false && isAuthenticated) {
      fetch();
    }
  }, [isAuthenticated, options?.autoFetch, fetch]);

  // Debounced search
  useEffect(() => {
    if (!searchQuery) {
      fetch();
      return;
    }

    const timer = setTimeout(() => fetch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery, fetch]);

  return {
    memories,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    fetch,
    search,
    create,
    update,
    remove,
    syncStatus: client.memory.getSyncStatus(),
  };
}

// ============================================
// Local AI Hook
// ============================================

export function useLocalAI() {
  const [engine, setEngine] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  const [deviceInfo, setDeviceInfo] = useState<string>("");
  const [hasInitialized, setHasInitialized] = useState(false);

  const initialize = useCallback(async () => {
    if (isReady || isLoading || hasInitialized) return;

    setHasInitialized(true);

    setIsLoading(true);
    setError(null);

    try {
      console.log("[useLocalAI] 🧠 Initializing on-device AI...");
      const eng = await getEmbeddingEngine();

      // Poll for progress
      const progressInterval = setInterval(() => {
        if (eng.loadProgress !== undefined) {
          setLoadProgress(eng.loadProgress);
        }
      }, 100);

      await eng.initialize();

      clearInterval(progressInterval);
      setEngine(eng);
      setIsReady(true);
      setLoadProgress(100);
      setDeviceInfo(eng.getDeviceInfo());

      console.log("[useLocalAI] ✅ AI ready on:", eng.getDeviceInfo());
    } catch (e) {
      console.error("[useLocalAI] ❌ Init failed:", e);
      setError(e as Error);
      // Reset hasInitialized to allow retries
      setHasInitialized(false);
      // Don't throw - graceful degradation
    } finally {
      setIsLoading(false);
    }
  }, [isReady, isLoading, hasInitialized]);

  const embed = useCallback(
    async (text: string): Promise<number[]> => {
      if (!engine) {
        await initialize();
      }
      if (!engine) {
        throw new Error("AI engine not available");
      }
      return engine.embed(text);
    },
    [engine, initialize]
  );

  const benchmark = useCallback(async () => {
    if (!engine) {
      await initialize();
    }
    if (!engine) {
      return {
        device: "Unknown",
        compute: "unavailable",
        embeddingTimeMs: 0,
        dimensions: 0,
      };
    }
    return engine.benchmark();
  }, [engine, initialize]);

  // Auto-initialize on mount
  useEffect(() => {
    if (!hasInitialized) {
      initialize();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isReady,
    isLoading,
    loadProgress,
    error,
    deviceInfo,
    initialize,
    embed: isReady ? embed : null,
    benchmark,
  };
}

// ============================================
// Sync Status Hook
// ============================================

export function useSyncStatus() {
  const { client, isAuthenticated } = useLanonasis();
  const [status, setStatus] = useState<SyncStatus>(
    client.memory.getSyncStatus()
  );
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    // Poll for status changes
    const interval = setInterval(() => {
      setStatus(client.memory.getSyncStatus());
    }, 2000);

    // Listen for online events
    const handleOnline = async () => {
      setIsSyncing(true);
      await client.memory.sync();
      setIsSyncing(false);
      setStatus(client.memory.getSyncStatus());
    };

    window.addEventListener("online", handleOnline);

    return () => {
      clearInterval(interval);
      window.removeEventListener("online", handleOnline);
    };
  }, [client, isAuthenticated]);

  const sync = useCallback(async () => {
    setIsSyncing(true);
    const result = await client.memory.sync();
    setIsSyncing(false);
    setStatus(client.memory.getSyncStatus());
    return result;
  }, [client]);

  return { ...status, isSyncing, sync };
}

// ============================================
// API Keys Hook
// ============================================

export function useApiKeys() {
  const { client, isAuthenticated } = useLanonasis();
  const [keys, setKeys] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    if (!isAuthenticated) return;

    setIsLoading(true);
    try {
      const result = await client.security.listKeys();
      setKeys(result);
    } catch (e) {
      setError(e as Error);
    } finally {
      setIsLoading(false);
    }
  }, [client, isAuthenticated]);

  const generate = useCallback(
    async (
      name: string,
      scope: "read" | "write" | "read:write",
      environment: "development" | "staging" | "production"
    ) => {
      const newKey = await client.security.generateScopedKey(
        name,
        scope,
        environment
      );
      setKeys((prev) => [...prev, newKey]);
      return newKey;
    },
    [client]
  );

  const rotate = useCallback(
    async (id: string) => {
      const rotated = await client.security.rotateKey(id);
      setKeys((prev) => prev.map((k) => (k.id === id ? rotated : k)));
      return rotated;
    },
    [client]
  );

  const revoke = useCallback(
    async (id: string) => {
      await client.security.revokeKey(id);
      setKeys((prev) => prev.filter((k) => k.id !== id));
    },
    [client]
  );

  useEffect(() => {
    if (isAuthenticated) fetch();
  }, [isAuthenticated, fetch]);

  return { keys, isLoading, error, fetch, generate, rotate, revoke };
}

// ============================================
// Security SDK Hook (for SecurityKeyDialog)
// ============================================

export function useSecuritySDK(): {
  client: any;
  isInitialized: boolean;
  initialize: () => Promise<void>;
} {
  const { client, isAuthenticated } = useLanonasis();
  const [isInitialized, setIsInitialized] = useState(isAuthenticated);

  const initialize = useCallback(async () => {
    setIsInitialized(true);
  }, []);

  return {
    client: client.security,
    isInitialized,
    initialize,
  };
}

// ============================================
// Phase 2 — Track A Intelligence Hooks
// ============================================

/**
 * Collection health score from mem-intel-sdk.
 * Distinct from useApiHealth (service ping) — this is a collection quality feature.
 */
export function useMemoryCollectionHealth() {
  const { isAuthenticated, config, features } = useLanonasis();
  const [health, setHealth] = useState<MemoryHealth | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const check = useCallback(async () => {
    if (!isAuthenticated || !features.healthScore) return null;
    if (!config.apiKey || !config.baseUrl) return null;
    setIsLoading(true);
    setError(null);
    try {
      const client = await getIntelligenceClient({
        apiKey: config.apiKey,
        apiUrl: config.baseUrl,
      });
      const result = await client.healthCheck({ userId: config.organizationId ?? '' });
      setHealth(result.data ?? null);
      return result.data ?? null;
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Health check failed'));
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, config, features.healthScore]);

  useEffect(() => {
    if (isAuthenticated) check();
  }, [isAuthenticated]); // eslint-disable-line react-hooks/exhaustive-deps

  return { health, check, isLoading, error };
}

/**
 * Facade for on-demand intelligence operations (tags, related, duplicates, insights, patterns).
 * All methods are no-ops when the corresponding feature flag is false.
 */
export function useIntelligence() {
  const { isAuthenticated, config, features } = useLanonasis();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const withClient = useCallback(
    async <T,>(
      fn: (c: Awaited<ReturnType<typeof getIntelligenceClient>>) => Promise<T>,
      fallback: T
    ): Promise<T> => {
      if (!isAuthenticated || !config.apiKey || !config.baseUrl) return fallback;
      setIsLoading(true);
      setError(null);
      try {
        const client = await getIntelligenceClient({
          apiKey: config.apiKey,
          apiUrl: config.baseUrl,
        });
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
    (memoryId: string): Promise<string[]> => {
      if (!features.tagSuggestions) return Promise.resolve([]);
      return withClient(
        (c) =>
          c
            .suggestTags({ memoryId, userId: config.organizationId ?? '' })
            .then((r: any) => (r.data?.suggestions ?? []) as string[]),
        [] as string[]
      );
    },
    [withClient, config, features.tagSuggestions]
  );

  const findRelated = useCallback(
    (memoryId: string): Promise<unknown[]> => {
      if (!features.relatedMemories) return Promise.resolve([]);
      return withClient(
        (c) =>
          c
            .findRelated({ memoryId, userId: config.organizationId ?? '' })
            .then((r: any) => (r.data?.related_memories ?? []) as unknown[]),
        [] as unknown[]
      );
    },
    [withClient, config, features.relatedMemories]
  );

  const detectDuplicates = useCallback((): Promise<unknown[]> => {
    if (!features.duplicateDetection) return Promise.resolve([]);
    return withClient(
      (c) =>
        c
          .detectDuplicates({ userId: config.organizationId ?? '' })
          .then((r: any) => (r.data?.duplicate_pairs ?? []) as unknown[]),
      [] as unknown[]
    );
  }, [withClient, config, features.duplicateDetection]);

  const extractInsights = useCallback(
    (topic?: string): Promise<unknown> => {
      return withClient(
        (c) =>
          c
            .extractInsights({ userId: config.organizationId ?? '', topic })
            .then((r: any) => r.data ?? null),
        null
      );
    },
    [withClient, config]
  );

  const analyzePatterns = useCallback((): Promise<unknown> => {
    if (!features.patternAnalysis) return Promise.resolve(null);
    return withClient(
      (c) =>
        c
          .analyzePatterns({ userId: config.organizationId ?? '' })
          .then((r: any) => r.data ?? null),
      null
    );
  }, [withClient, config, features.patternAnalysis]);

  return {
    suggestTags,
    findRelated,
    detectDuplicates,
    extractInsights,
    analyzePatterns,
    isLoading,
    error,
  };
}

// ============================================
// Phase 2.5 — Reasoning Cache & Context Bundle Hooks (Gated)
// These are no-ops until feature flags are enabled after backend handoffs.
// ============================================

/**
 * Lists pre-reasoned AI conclusions for a subject.
 * No-op when features.inferredConclusions === false.
 * Gate: backend Phase 1 + @lanonasis/memory-client dep addition.
 */
export function useInferredConclusions(subjectId: string) {
  const { isAuthenticated, config, features } = useLanonasis();
  const [conclusions, setConclusions] = useState<InferredConclusion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(
    async (opts?: { include_superseded?: boolean; limit?: number }) => {
      if (!isAuthenticated || !features.inferredConclusions) return [];
      setIsLoading(true);
      setError(null);
      try {
        // Requires @lanonasis/memory-client with listInferredConclusions (post backend Phase 1)
        const { CoreMemoryClient } = await import('@lanonasis/memory-client' as any);
        const client = new CoreMemoryClient({
          apiKey: config.apiKey,
          baseUrl: config.baseUrl,
        });
        const result = await client.listInferredConclusions({
          subject_id: subjectId,
          limit: opts?.limit ?? 20,
          include_superseded: opts?.include_superseded ?? false,
        });
        const data = result.data?.conclusions ?? [];
        setConclusions(data);
        return data;
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Failed to fetch inferred conclusions'));
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    [isAuthenticated, config, features.inferredConclusions, subjectId]
  );

  useEffect(() => {
    if (isAuthenticated && subjectId && features.inferredConclusions) fetch();
  }, [isAuthenticated, subjectId, features.inferredConclusions]); // eslint-disable-line react-hooks/exhaustive-deps

  return { conclusions, fetch, isLoading, error };
}

/**
 * Forces immediate reasoning inference for a subject.
 * No-op when features.inferredConclusions === false.
 * Gate: backend Phase 1 + @lanonasis/memory-client dep addition.
 */
export function useFlushReasoning() {
  const { isAuthenticated, config, features } = useLanonasis();
  const [isFlushing, setIsFlushing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const flush = useCallback(
    async (subjectId: string) => {
      if (!isAuthenticated || !features.inferredConclusions) return null;
      setIsFlushing(true);
      setError(null);
      try {
        const { CoreMemoryClient } = await import('@lanonasis/memory-client' as any);
        const client = new CoreMemoryClient({
          apiKey: config.apiKey,
          baseUrl: config.baseUrl,
        });
        const result = await client.flushReasoningQueue(subjectId);
        return result.data ?? null;
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Reasoning flush failed'));
        return null;
      } finally {
        setIsFlushing(false);
      }
    },
    [isAuthenticated, config, features.inferredConclusions]
  );

  return { flush, isFlushing, error };
}

/**
 * Compiles a context bundle via POST /api/v1/context.
 * No-op when features.contextBundle === false.
 * Gate: backend Phase 3.
 */
export function useContextBundle() {
  const { isAuthenticated, config, features } = useLanonasis();
  const [bundle, setBundle] = useState<ContextBundle | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const compile = useCallback(
    async (opts: {
      query?: string;
      include?: Array<'profile_summary' | 'recent_memories' | 'conclusions' | 'semantic_recall'>;
      tokenBudget?: number;
      format?: 'anthropic' | 'openai' | 'mcp' | 'json';
    }) => {
      if (!isAuthenticated || !features.contextBundle) return null;
      if (!config.apiKey || !config.baseUrl) return null;
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`${config.baseUrl}/api/v1/context`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${config.apiKey}`,
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
    },
    [isAuthenticated, config, features.contextBundle]
  );

  return { bundle, compile, isLoading, error };
}

// ============================================
// Memory Concierge Hook (Gated — requires backend concierge endpoint)
// ============================================

/**
 * Conversational AI assistant with full memory context.
 * No-op when features.concierge === false.
 * Gate: backend Phase 2 (profiles) + backend Phase 3 (/api/v1/context).
 */
export function useMemoryConcierge() {
  const { isAuthenticated, config, features } = useLanonasis();
  const [messages, setMessages] = useState<ConciergeMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const send = useCallback(
    async (
      message: string,
      opts?: {
        mode?: 'default' | 'drift';
        referenceEntry?: { memory_id?: string; content?: string };
      }
    ) => {
      if (!isAuthenticated || !features.concierge) return;
      if (!config.apiKey || !config.baseUrl) return;

      const userMsg: ConciergeMessage = { role: 'user', content: message };
      const placeholder: ConciergeMessage = {
        role: 'assistant',
        content: '',
        isStreaming: true,
      };

      setMessages((prev) => [...prev, userMsg, placeholder]);
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(`${config.baseUrl}/api/v1/concierge/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${config.apiKey}`,
          },
          body: JSON.stringify({
            message,
            conversation_history: messages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
            mode: opts?.mode ?? 'default',
            reference_entry: opts?.referenceEntry,
            stream: true,
          }),
        });

        if (!res.ok || !res.body) {
          throw new Error(`Concierge request failed: ${res.status}`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let fullContent = '';
        let citations: ConciergeCitation[] = [];
        let driftSignals: DriftSignal[] = [];

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const lines = decoder.decode(value).split('\n');
          for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            try {
              const chunk = JSON.parse(line.slice(6));
              if (chunk.type === 'token') {
                fullContent += chunk.content;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: 'assistant',
                    content: fullContent,
                    isStreaming: true,
                  };
                  return updated;
                });
              } else if (chunk.type === 'citations') {
                citations = chunk.citations;
              } else if (chunk.type === 'drift_signals') {
                driftSignals = chunk.signals;
              } else if (chunk.type === 'done') {
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: 'assistant',
                    content: fullContent,
                    citations,
                    driftSignals,
                    isStreaming: false,
                  };
                  return updated;
                });
              }
            } catch {
              // skip malformed SSE chunks
            }
          }
        }
      } catch (e) {
        setError(e instanceof Error ? e : new Error('Concierge request failed'));
        setMessages((prev) => prev.slice(0, -1)); // remove streaming placeholder
      } finally {
        setIsLoading(false);
      }
    },
    [isAuthenticated, config, features.concierge, messages]
  );

  const clear = useCallback(() => setMessages([]), []);

  return { messages, send, clear, isLoading, error };
}

export default useLanonasis;
