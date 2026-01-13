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
import { LanonasisClient, LanonasisConfig, SyncStatus } from "./index";
import { Memory, CreateMemoryInput, User } from "../types";

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
    setIsAuthenticated(false);
    setUser(null);
  }, [client]);

  const value = useMemo(
    () => ({
      client,
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

export default useLanonasis;
