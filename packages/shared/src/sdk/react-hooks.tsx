/**
 * React Hooks for LanOnasis SDK
 * Provides easy integration with React components
 */

import { 
  useState, 
  useEffect, 
  useCallback, 
  useContext, 
  createContext,
  useMemo,
  useRef,
  ReactNode 
} from 'react';
import { LanonasisClient, LanonasisConfig } from './index';
import { Memory, CreateMemoryInput, User } from '../types';
import { LocalEmbeddingEngine } from '../ai/embeddings';

// Context for sharing client instance
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

/**
 * Provider component for LanOnasis SDK
 */
export function LanonasisProvider({ 
  children, 
  config 
}: { 
  children: ReactNode; 
  config?: LanonasisConfig 
}) {
  const [client] = useState(() => new LanonasisClient(config));
  const [isAuthenticated, setIsAuthenticated] = useState(client.isAuthenticated);
  const [isConnecting, setIsConnecting] = useState(false);
  const [user, setUser] = useState<User | null>(client.currentUser);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Handle OAuth callback on mount
    const params = new URLSearchParams(window.location.search);
    if (params.has('token')) {
      client.handleOAuthCallback().then((u) => {
        if (u) {
          setUser(u);
          setIsAuthenticated(true);
        }
      });
    }

    // Listen for online/offline
    const handleOnline = () => client.memory.sync();
    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [client]);

  const login = useCallback(async (email?: string, password?: string) => {
    setIsConnecting(true);
    setError(null);
    
    try {
      if (email && password) {
        const u = await client.login(email, password);
        setUser(u);
        setIsAuthenticated(true);
      } else {
        // Demo mode - simulate auth
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsAuthenticated(true);
        setUser({ id: 'demo', name: 'Demo User', email: 'demo@lanonasis.com' });
      }
    } catch (e) {
      setError(e as Error);
      throw e;
    } finally {
      setIsConnecting(false);
    }
  }, [client]);

  const logout = useCallback(() => {
    client.logout();
    setIsAuthenticated(false);
    setUser(null);
  }, [client]);

  const value = useMemo(() => ({
    client,
    isAuthenticated,
    isConnecting,
    user,
    login,
    logout,
    error,
  }), [client, isAuthenticated, isConnecting, user, login, logout, error]);

  return (
    <LanonasisContext.Provider value={value}>
      {children}
    </LanonasisContext.Provider>
  );
}

/**
 * Main hook for accessing LanOnasis SDK
 */
export function useLanonasis() {
  const context = useContext(LanonasisContext);
  
  if (!context) {
    throw new Error('useLanonasis must be used within a LanonasisProvider');
  }
  
  return context;
}

/**
 * Hook for memory operations
 */
export function useMemories(options?: { autoFetch?: boolean; searchQuery?: string }) {
  const { client, isAuthenticated } = useLanonasis();
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [searchQuery, setSearchQuery] = useState(options?.searchQuery || '');

  const fetch = useCallback(async (query?: string) => {
    if (!isAuthenticated) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await client.memory.list(query || searchQuery);
      setMemories(result);
    } catch (e) {
      setError(e as Error);
    } finally {
      setIsLoading(false);
    }
  }, [client, isAuthenticated, searchQuery]);

  const search = useCallback(async (query: string) => {
    if (!isAuthenticated) return [];
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await client.memory.search(query);
      setMemories(result);
      return result;
    } catch (e) {
      setError(e as Error);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [client, isAuthenticated]);

  const create = useCallback(async (input: CreateMemoryInput) => {
    setError(null);
    
    try {
      const newMemory = await client.memory.create(input);
      setMemories(prev => [newMemory, ...prev]);
      return newMemory;
    } catch (e) {
      setError(e as Error);
      throw e;
    }
  }, [client]);

  const update = useCallback(async (id: string, input: Partial<CreateMemoryInput>) => {
    setError(null);
    
    try {
      const updated = await client.memory.update(id, input);
      setMemories(prev => prev.map(m => m.id === id ? updated : m));
      return updated;
    } catch (e) {
      setError(e as Error);
      throw e;
    }
  }, [client]);

  const remove = useCallback(async (id: string) => {
    setError(null);
    
    try {
      await client.memory.delete(id);
      setMemories(prev => prev.filter(m => m.id !== id));
    } catch (e) {
      setError(e as Error);
      throw e;
    }
  }, [client]);

  // Auto-fetch on mount and auth change
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

/**
 * Hook for local AI operations
 */
export function useLocalAI() {
  const [engine] = useState(() => new LocalEmbeddingEngine());
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  const [deviceInfo, setDeviceInfo] = useState<string>('');

  const initialize = useCallback(async () => {
    if (isReady) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Poll for progress
      const progressInterval = setInterval(() => {
        setLoadProgress(engine.loadProgress);
      }, 100);
      
      await engine.initialize();
      
      clearInterval(progressInterval);
      setIsReady(true);
      setLoadProgress(100);
      setDeviceInfo(engine.getDeviceInfo());
    } catch (e) {
      // Graceful degradation - AI features disabled but app works
      console.info('ℹ️ Local AI disabled - app will use cloud fallback');
      setError(null); // Don't show error to user
      setIsLoading(false);
      setLoadProgress(0);
    } finally {
      setIsLoading(false);
    }
  }, [engine, isReady]);

  const embed = useCallback(async (text: string) => {
    if (!isReady) await initialize();
    return engine.embed(text);
  }, [engine, isReady, initialize]);

  const summarize = useCallback(async (text: string) => {
    if (!isReady) await initialize();
    return engine.summarize(text);
  }, [engine, isReady, initialize]);

  const findSimilar = useCallback(async (
    query: string,
    items: Array<{ id: string; text: string; embedding?: number[] }>,
    topK?: number
  ) => {
    if (!isReady) await initialize();
    return engine.findSimilar(query, items, topK);
  }, [engine, isReady, initialize]);

  const benchmark = useCallback(async () => {
    if (!isReady) await initialize();
    return engine.benchmark();
  }, [engine, isReady, initialize]);

  return {
    isReady,
    isLoading,
    loadProgress,
    error,
    deviceInfo,
    initialize,
    embed,
    summarize,
    findSimilar,
    benchmark,
  };
}

/**
 * Hook for sync status
 */
export function useSyncStatus() {
  const { client, isAuthenticated } = useLanonasis();
  const [status, setStatus] = useState(client.memory.getSyncStatus());
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      setStatus(client.memory.getSyncStatus());
    }, 1000);

    const handleOnline = async () => {
      setIsSyncing(true);
      await client.memory.sync();
      setIsSyncing(false);
      setStatus(client.memory.getSyncStatus());
    };

    window.addEventListener('online', handleOnline);

    return () => {
      clearInterval(interval);
      window.removeEventListener('online', handleOnline);
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

/**
 * Hook for API key management
 */
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

  const generate = useCallback(async (
    name: string,
    scope: 'read' | 'write' | 'read:write',
    environment: 'development' | 'staging' | 'production'
  ) => {
    try {
      const newKey = await client.security.generateScopedKey(name, scope, environment);
      setKeys(prev => [...prev, newKey]);
      return newKey;
    } catch (e) {
      setError(e as Error);
      throw e;
    }
  }, [client]);

  const rotate = useCallback(async (id: string) => {
    try {
      const rotated = await client.security.rotateKey(id);
      setKeys(prev => prev.map(k => k.id === id ? rotated : k));
      return rotated;
    } catch (e) {
      setError(e as Error);
      throw e;
    }
  }, [client]);

  const revoke = useCallback(async (id: string) => {
    try {
      await client.security.revokeKey(id);
      setKeys(prev => prev.filter(k => k.id !== id));
    } catch (e) {
      setError(e as Error);
      throw e;
    }
  }, [client]);

  useEffect(() => {
    if (isAuthenticated) fetch();
  }, [isAuthenticated, fetch]);

  return {
    keys,
    isLoading,
    error,
    fetch,
    generate,
    rotate,
    revoke,
  };
}

export default useLanonasis;
