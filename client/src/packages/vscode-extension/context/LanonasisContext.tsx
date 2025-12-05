/**
 * Lanonasis Context Provider
 * Uses official @lanonasis/oauth-client and @lanonasis/memory-client SDKs
 */

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import {
  ApiKeyStorage,
  TokenStorage,
  DesktopOAuthFlow,
  type TokenResponse,
} from "@lanonasis/oauth-client";
import {
  createMemoryClient,
  type MemoryEntry,
  type CreateMemoryRequest,
} from "@lanonasis/memory-client";

// VS Code API - use existing global declaration
// window.vscode is already declared elsewhere

// ============================================
// Types
// ============================================

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  error: string | null;
}

interface LanonasisContextValue extends AuthState {
  // Auth methods
  loginWithOAuth: () => Promise<void>;
  loginWithApiKey: (apiKey: string) => Promise<void>;
  logout: () => void;

  // Memory methods
  memories: MemoryEntry[];
  isLoadingMemories: boolean;
  memoryError: string | null;
  fetchMemories: () => Promise<void>;
  searchMemories: (query: string) => Promise<MemoryEntry[]>;
  createMemory: (data: CreateMemoryRequest) => Promise<MemoryEntry | null>;
  deleteMemory: (id: string) => Promise<void>;
}

// ============================================
// Context
// ============================================

const LanonasisContext = createContext<LanonasisContextValue | null>(null);

// ============================================
// Configuration
// ============================================

const DEFAULT_CONFIG = {
  clientId: "lanonasis-vscode-extension",
  authBaseUrl: "https://auth.lanonasis.com",
  apiUrl: "https://api.lanonasis.com",
};

// ============================================
// Provider
// ============================================

interface LanonasisProviderProps {
  children: ReactNode;
  config?: {
    clientId?: string;
    authBaseUrl?: string;
    apiUrl?: string;
  };
}

export function LanonasisProvider({
  children,
  config,
}: LanonasisProviderProps) {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };

  // Auth state
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    error: null,
  });

  // Memory state
  const [memories, setMemories] = useState<MemoryEntry[]>([]);
  const [isLoadingMemories, setIsLoadingMemories] = useState(false);
  const [memoryError, setMemoryError] = useState<string | null>(null);

  // Storage instances
  const [tokenStorage] = useState(() => new TokenStorage());
  const [apiKeyStorage] = useState(() => new ApiKeyStorage());

  // Memory client (will be set after auth)
  const [memoryClient, setMemoryClient] = useState<ReturnType<
    typeof createMemoryClient
  > | null>(null);

  // ============================================
  // Initialize - Check for existing credentials
  // ============================================

  useEffect(() => {
    const initialize = async () => {
      try {
        // Initialize API key storage (handles migration)
        await apiKeyStorage.initialize();

        // Check for existing tokens
        const tokens = await tokenStorage.retrieve();
        if (tokens && !tokenStorage.isTokenExpired(tokens)) {
          // Valid OAuth token exists
          const client = createMemoryClient({
            apiUrl: mergedConfig.apiUrl,
            authToken: tokens.access_token,
          });
          setMemoryClient(client);
          setAuthState({
            isAuthenticated: true,
            isLoading: false,
            user: { id: "oauth-user", email: "user@lanonasis.com" },
            error: null,
          });
          return;
        }

        // Check for existing API key
        const apiKey = await apiKeyStorage.getApiKey();
        if (apiKey) {
          const client = createMemoryClient({
            apiUrl: mergedConfig.apiUrl,
            apiKey,
          });
          setMemoryClient(client);
          setAuthState({
            isAuthenticated: true,
            isLoading: false,
            user: { id: "apikey-user", email: "user@lanonasis.com" },
            error: null,
          });
          return;
        }

        // No valid credentials
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          user: null,
          error: null,
        });
      } catch (err) {
        console.error("[LanonasisContext] Init error:", err);
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          user: null,
          error: "Failed to initialize authentication",
        });
      }
    };

    initialize();
  }, [mergedConfig.apiUrl]);

  // ============================================
  // Auth Methods
  // ============================================

  const loginWithOAuth = useCallback(async () => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // For VS Code webview, we need to use message passing to the extension host
      // The extension host will handle the actual OAuth flow
      if (window.vscode?.postMessage) {
        window.vscode.postMessage({ type: "lanonasis:auth:oauth" });
        // The extension will post back the result
        return;
      }

      // Fallback for non-webview contexts (e.g., browser testing)
      const oauthFlow = new DesktopOAuthFlow({
        clientId: mergedConfig.clientId,
        authBaseUrl: mergedConfig.authBaseUrl,
        scope: "mcp:read mcp:write",
      });

      const tokens = await oauthFlow.authenticate();
      await tokenStorage.store(tokens);

      const client = createMemoryClient({
        apiUrl: mergedConfig.apiUrl,
        authToken: tokens.access_token,
      });
      setMemoryClient(client);

      setAuthState({
        isAuthenticated: true,
        isLoading: false,
        user: { id: "oauth-user", email: "user@lanonasis.com" },
        error: null,
      });
    } catch (err) {
      console.error("[LanonasisContext] OAuth error:", err);
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error:
          err instanceof Error ? err.message : "OAuth authentication failed",
      }));
    }
  }, [mergedConfig, tokenStorage]);

  const loginWithApiKey = useCallback(
    async (apiKey: string) => {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        // Validate API key format
        if (!apiKey || apiKey.trim().length < 10) {
          throw new Error("Invalid API key format");
        }

        // Test the API key by making a request
        const client = createMemoryClient({
          apiUrl: mergedConfig.apiUrl,
          apiKey: apiKey.trim(),
        });

        // Test connection
        const health = await client.healthCheck();
        if (health.error) {
          throw new Error(health.error);
        }

        // Store the API key
        await apiKeyStorage.store({
          apiKey: apiKey.trim(),
          environment: "production",
          createdAt: new Date().toISOString(),
        });

        setMemoryClient(client);
        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          user: { id: "apikey-user", email: "user@lanonasis.com" },
          error: null,
        });
      } catch (err) {
        console.error("[LanonasisContext] API key auth error:", err);
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          error:
            err instanceof Error
              ? err.message
              : "API key authentication failed",
        }));
      }
    },
    [mergedConfig.apiUrl, apiKeyStorage]
  );

  const logout = useCallback(async () => {
    try {
      await tokenStorage.clear();
      await apiKeyStorage.clear();
      setMemoryClient(null);
      setMemories([]);
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: null,
      });
    } catch (err) {
      console.error("[LanonasisContext] Logout error:", err);
    }
  }, [tokenStorage, apiKeyStorage]);

  // ============================================
  // Memory Methods
  // ============================================

  const fetchMemories = useCallback(async () => {
    if (!memoryClient) return;

    setIsLoadingMemories(true);
    setMemoryError(null);

    try {
      const response = await memoryClient.listMemories({ limit: 50 });
      if (response.error) {
        throw new Error(response.error);
      }
      // Handle both response formats
      const data = response.data as any;
      const memoriesList =
        data?.memories || data?.items || (Array.isArray(data) ? data : []);
      setMemories(memoriesList);
    } catch (err) {
      console.error("[LanonasisContext] Fetch memories error:", err);
      setMemoryError(
        err instanceof Error ? err.message : "Failed to fetch memories"
      );
    } finally {
      setIsLoadingMemories(false);
    }
  }, [memoryClient]);

  const searchMemories = useCallback(
    async (query: string): Promise<MemoryEntry[]> => {
      if (!memoryClient) return [];

      try {
        const response = await memoryClient.searchMemories({
          query,
          limit: 20,
          threshold: 0.7,
          status: "active",
        });
        if (response.error) {
          throw new Error(response.error);
        }
        const results = response.data?.results || [];
        return results;
      } catch (err) {
        console.error("[LanonasisContext] Search error:", err);
        return [];
      }
    },
    [memoryClient]
  );

  const createMemory = useCallback(
    async (data: CreateMemoryRequest): Promise<MemoryEntry | null> => {
      if (!memoryClient) return null;

      try {
        const response = await memoryClient.createMemory(data);
        if (response.error) {
          throw new Error(response.error);
        }
        const newMemory = response.data;
        if (newMemory) {
          setMemories((prev) => [newMemory, ...prev]);
        }
        return newMemory || null;
      } catch (err) {
        console.error("[LanonasisContext] Create memory error:", err);
        throw err;
      }
    },
    [memoryClient]
  );

  const deleteMemory = useCallback(
    async (id: string) => {
      if (!memoryClient) return;

      try {
        const response = await memoryClient.deleteMemory(id);
        if (response.error) {
          throw new Error(response.error);
        }
        setMemories((prev) => prev.filter((m) => m.id !== id));
      } catch (err) {
        console.error("[LanonasisContext] Delete memory error:", err);
        throw err;
      }
    },
    [memoryClient]
  );

  // ============================================
  // Auto-fetch memories on auth
  // ============================================

  useEffect(() => {
    if (authState.isAuthenticated && memoryClient) {
      fetchMemories();
    }
  }, [authState.isAuthenticated, memoryClient, fetchMemories]);

  // ============================================
  // Listen for messages from extension host
  // ============================================

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;
      if (!message || typeof message !== "object") return;

      switch (message.type) {
        case "lanonasis:auth:oauth:success": {
          const tokens = message.payload as TokenResponse;
          tokenStorage.store(tokens).then(() => {
            const client = createMemoryClient({
              apiUrl: mergedConfig.apiUrl,
              authToken: tokens.access_token,
            });
            setMemoryClient(client);
            setAuthState({
              isAuthenticated: true,
              isLoading: false,
              user: {
                id: "oauth-user",
                email: message.payload?.email || "user@lanonasis.com",
              },
              error: null,
            });
          });
          break;
        }
        case "lanonasis:auth:oauth:error": {
          setAuthState((prev) => ({
            ...prev,
            isLoading: false,
            error: message.payload?.error || "OAuth authentication failed",
          }));
          break;
        }
        case "lanonasis:config:init":
        case "lanonasis:config:update": {
          // Handle config updates from extension host
          const apiKey = message.payload?.apiKey;
          if (apiKey && !authState.isAuthenticated) {
            loginWithApiKey(apiKey);
          }
          break;
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [
    mergedConfig.apiUrl,
    tokenStorage,
    authState.isAuthenticated,
    loginWithApiKey,
  ]);

  // ============================================
  // Context Value
  // ============================================

  const value: LanonasisContextValue = {
    ...authState,
    loginWithOAuth,
    loginWithApiKey,
    logout,
    memories,
    isLoadingMemories,
    memoryError,
    fetchMemories,
    searchMemories,
    createMemory,
    deleteMemory,
  };

  return (
    <LanonasisContext.Provider value={value}>
      {children}
    </LanonasisContext.Provider>
  );
}

// ============================================
// Hook
// ============================================

export function useLanonasisContext() {
  const context = useContext(LanonasisContext);
  if (!context) {
    throw new Error(
      "useLanonasisContext must be used within a LanonasisProvider"
    );
  }
  return context;
}

// Export types
export type {
  User,
  AuthState,
  LanonasisContextValue,
  MemoryEntry,
  CreateMemoryRequest,
};
