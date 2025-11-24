import { useState, useCallback } from 'react';

export interface ApiKey {
  id: string;
  name: string;
  scope: string;
  lastUsed: string;
  token?: string;
}

export const useApiKeys = (initialKeys: ApiKey[] = []) => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(initialKeys);
  const [isLoading, setIsLoading] = useState(false);

  const generateKey = useCallback(async (name: string, scope: string) => {
    setIsLoading(true);
    try {
      // API call would happen here
      const newKey: ApiKey = {
        id: `key-${Date.now()}`,
        name,
        scope,
        lastUsed: 'Never',
        token: `sk_${scope}_${Math.random().toString(36).substr(2, 32)}`,
      };
      setApiKeys(prev => [...prev, newKey]);
      return newKey;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const rotateKey = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      // API call would happen here
      setApiKeys(prev =>
        prev.map(k =>
          k.id === id
            ? { ...k, token: `sk_${k.scope}_${Math.random().toString(36).substr(2, 32)}` }
            : k
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const revokeKey = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      // API call would happen here
      setApiKeys(prev => prev.filter(k => k.id !== id));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    apiKeys,
    isLoading,
    generateKey,
    rotateKey,
    revokeKey,
  };
};
