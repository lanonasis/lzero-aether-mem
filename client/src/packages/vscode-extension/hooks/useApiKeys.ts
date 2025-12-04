import { useState, useCallback, useEffect } from 'react';
import { useLanonasis } from '@lanonasis/shared/sdk/react-hooks';

export interface ApiKey {
  id: string;
  name: string;
  scope: string;
  lastUsed?: string;
  token?: string;
}

export const useApiKeys = (isAuthenticated: boolean) => {
  const { client, isAuthenticated: sdkAuthenticated } = useLanonasis();
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authenticated = isAuthenticated && sdkAuthenticated;

  // Fetch keys on mount or when authenticated
  useEffect(() => {
    if (!authenticated) return;

    let isCancelled = false;

    const fetchKeys = async () => {
      setIsLoading(true);
      try {
        const keys = await client.security.listKeys();
        if (!isCancelled) {
          setApiKeys(Array.isArray(keys) ? (keys as ApiKey[]) : []);
          setError(null);
        }
      } catch (err) {
        if (!isCancelled) {
          // Silently handle 404 - API keys endpoint not available yet
          const message = (err as Error).message;
          if (!message.includes('404')) {
            setError(message);
            console.error('Failed to fetch API keys via security SDK:', err);
          }
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchKeys();

    return () => {
      isCancelled = true;
    };
  }, [authenticated, client]);

  const generateKey = useCallback(
    async (name: string, scope: string = 'read:write'): Promise<ApiKey | undefined> => {
      if (!authenticated) return;
      setIsLoading(true);
      try {
        const newKey = await client.security.generateScopedKey(
          name,
          scope as 'read' | 'write' | 'read:write',
          'development',
        );
        const mapped = newKey as ApiKey;
        setApiKeys(prev => [...prev, mapped]);
        setError(null);
        return mapped;
      } catch (err) {
        const message = (err as Error).message;
        setError(message);
        console.error('Failed to generate API key via security SDK:', err);
      } finally {
        setIsLoading(false);
      }
    },
    [authenticated, client],
  );

  const rotateKey = useCallback(
    async (id: string): Promise<ApiKey | undefined> => {
      if (!authenticated) return;
      setIsLoading(true);
      try {
        const rotated = await client.security.rotateKey(id);
        const mapped = rotated as ApiKey;
        setApiKeys(prev => prev.map(k => (k.id === id ? mapped : k)));
        setError(null);
        return mapped;
      } catch (err) {
        const message = (err as Error).message;
        setError(message);
        console.error('Failed to rotate API key via security SDK:', err);
      } finally {
        setIsLoading(false);
      }
    },
    [authenticated, client],
  );

  const revokeKey = useCallback(
    async (id: string) => {
      if (!authenticated) return;
      setIsLoading(true);
      try {
        await client.security.revokeKey(id);
        setApiKeys(prev => prev.filter(k => k.id !== id));
        setError(null);
      } catch (err) {
        const message = (err as Error).message;
        setError(message);
        console.error('Failed to revoke API key via security SDK:', err);
      } finally {
        setIsLoading(false);
      }
    },
    [authenticated, client],
  );

  return {
    apiKeys,
    isLoading,
    error,
    generateKey,
    rotateKey,
    revokeKey,
  };
};
