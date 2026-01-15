import { useState, useEffect } from 'react';
import { MemoryService } from '../services/MemoryService';
import { AuthService } from '../services/AuthService';
import { ApiKeyService } from '../services/ApiKeyService';
import { Memory, ApiKey } from '../packages/shared/types'; // Keep these types for now as LanonasisClient returns them.

// @lanonasis/memory-sdk client simulation - now delegates to actual services
export class LanonasisClient {
  private apiKey: string | null = null;
  private userId: string | null = null; // Assuming userId is obtained after login

  constructor(apiKey?: string) {
    this.apiKey = apiKey || null;
  }

  isAuthenticated() {
    return !!this.apiKey && !!this.userId;
  }

  async connect(apiKey: string) {
    // In a real scenario, login would validate the API key and return user info
    const user = await AuthService.login({ apiKey });
    if (user) {
      this.apiKey = apiKey;
      this.userId = user.id;
      return { success: true, user: user };
    }
    return { success: false, user: null };
  }

  async disconnect() {
    await AuthService.logout();
    this.apiKey = null;
    this.userId = null;
    return { success: true };
  }

  get memory() {
    if (!this.userId) {
      throw new Error("User not authenticated for memory operations.");
    }
    const currentUserId = this.userId;
    return {
      list: async (query?: string): Promise<Memory[]> => {
        if (query) {
          return MemoryService.searchMemories(currentUserId, query);
        }
        return MemoryService.getMemories(currentUserId);
      },
      add: async (content: string, title?: string) => {
        const newMemory = await MemoryService.createMemory(currentUserId, { content, title: title || content.substring(0, 50) });
        return { success: true, id: newMemory.id, memory: newMemory };
      },
      search: async (query: string): Promise<Memory[]> => {
        return MemoryService.searchMemories(currentUserId, query);
      }
    };
  }

  get keys() {
    if (!this.userId) {
      throw new Error("User not authenticated for API key operations.");
    }
    const currentUserId = this.userId;
    return {
      list: async (): Promise<ApiKey[]> => {
        return ApiKeyService.getApiKeys(currentUserId);
      },
      generate: async (name: string, environment: string) => {
        // Assuming 'scope' for generateApiKey
        const newKey = await ApiKeyService.generateApiKey(currentUserId, name, "read:write");
        // The return type of generate in the mock sdk was a bit different, adjusting to match
        return { id: newKey.id, name: newKey.name, token: newKey.token, masked: `sk_${environment}_...${newKey.token?.slice(-8)}` };
      }
    };
  }
}

// @lanonasis/memory-sdk React hook with auto-connect for demo
export function useLanonasis() {
  const [client] = useState(() => new LanonasisClient());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [user, setUser] = useState<{ id: string; name: string; email?: string } | null>(null);

  // Auto-connect for demo experience - can be removed or made optional later
  useEffect(() => {
    const autoConnect = async () => {
      setIsConnecting(true);
      // Assuming a default API key for demo auto-connection
      const demoApiKey = import.meta.env.VITE_DEMO_API_KEY || "demo_lano_key_2024";
      try {
        const result = await client.connect(demoApiKey);
        if (result.success && result.user) {
          setUser(result.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Auto-connect failed:", error);
      } finally {
        setIsConnecting(false);
      }
    };
    
    const timer = setTimeout(autoConnect, 1500);
    return () => clearTimeout(timer);
  }, [client]);

  const login = async (apiKey: string) => {
    setIsConnecting(true);
    try {
      const result = await client.connect(apiKey);
      if (result.success && result.user) {
        setUser(result.user);
        setIsAuthenticated(true);
      }
      return result;
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, user: null };
    } finally {
      setIsConnecting(false);
    }
  };

  const logout = async () => {
    await client.disconnect();
    setIsAuthenticated(false);
    setUser(null);
  };

  return {
    client,
    isAuthenticated,
    isConnecting,
    user,
    login,
    logout
  };
}
