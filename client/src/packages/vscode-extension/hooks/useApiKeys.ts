import { useState, useCallback, useEffect } from 'react';
import { apiClient } from '../services/apiClient';

export interface ApiKey {
  id: string;
  name: string;
  scope: string;
  lastUsed?: string;
  token?: string;
}

export const useApiKeys = (isAuthenticated: boolean) => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch keys on mount or when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchKeys = async () => {
      setIsLoading(true);
      try {
        const keys = await apiClient.getApiKeys();
        setApiKeys(Array.isArray(keys) ? keys : []);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
        console.error('Failed to fetch API keys:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKeys();
  }, [isAuthenticated]);

  const generateKey = useCallback(async (name: string, scope: string = 'read:write'): Promise<ApiKey | undefined> => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    try {
      const newKey = (await apiClient.generateApiKey({ name, scope, environment: 'dev' })) as ApiKey;
      setApiKeys(prev => [...prev, newKey]);
      setError(null);
      return newKey;
    } catch (err) {
      const message = (err as Error).message;
      setError(message);
      console.error('Failed to generate key:', err);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const rotateKey = useCallback(async (id: string): Promise<ApiKey | undefined> => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    try {
      const rotated = (await apiClient.rotateApiKey(id)) as ApiKey;
      setApiKeys(prev => prev.map(k => (k.id === id ? rotated : k)));
      setError(null);
      return rotated;
    } catch (err) {
      const message = (err as Error).message;
      setError(message);
      console.error('Failed to rotate key:', err);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const revokeKey = useCallback(async (id: string) => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    try {
      await apiClient.revokeApiKey(id);
      setApiKeys(prev => prev.filter(k => k.id !== id));
      setError(null);
    } catch (err) {
      const message = (err as Error).message;
      setError(message);
      console.error('Failed to revoke key:', err);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  return {
    apiKeys,
    isLoading,
    error,
    generateKey,
    rotateKey,
    revokeKey,
  };
};
