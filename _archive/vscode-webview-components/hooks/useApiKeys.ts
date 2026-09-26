/**
 * API Keys Hook for VS Code Extension
 * Manages API keys for the extension
 * Note: Full security SDK integration TBD - currently provides basic state management
 */
import { useState, useCallback, useEffect } from 'react';

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
        if (!isAuthenticated) {
            setApiKeys([]);
            return;
        }

        // API key list fetching would go here when security SDK is integrated
        // For now, just initialize empty state
        setIsLoading(false);
    }, [isAuthenticated]);

    const generateKey = useCallback(
        async (name: string, scope: string = 'read:write'): Promise<ApiKey | undefined> => {
            if (!isAuthenticated) return;
            setIsLoading(true);
            setError(null);

            try {
                // Generate a local API key for now (would integrate with security SDK later)
                const newKey: ApiKey = {
                    id: crypto.randomUUID(),
                    name,
                    scope,
                    token: `lns_${btoa(crypto.randomUUID()).replace(/[^a-zA-Z0-9]/g, '').slice(0, 32)}`,
                    lastUsed: new Date().toISOString(),
                };
                setApiKeys(prev => [...prev, newKey]);
                return newKey;
            } catch (err) {
                const message = (err as Error).message;
                setError(message);
                console.error('Failed to generate API key:', err);
            } finally {
                setIsLoading(false);
            }
        },
        [isAuthenticated],
    );

    const rotateKey = useCallback(
        async (id: string): Promise<ApiKey | undefined> => {
            if (!isAuthenticated) return;
            setIsLoading(true);
            setError(null);

            try {
                const newToken = `lns_${btoa(crypto.randomUUID()).replace(/[^a-zA-Z0-9]/g, '').slice(0, 32)}`;
                setApiKeys(prev => prev.map(k =>
                    k.id === id ? { ...k, token: newToken, lastUsed: new Date().toISOString() } : k
                ));
                const rotated = apiKeys.find(k => k.id === id);
                return rotated ? { ...rotated, token: newToken } : undefined;
            } catch (err) {
                const message = (err as Error).message;
                setError(message);
                console.error('Failed to rotate API key:', err);
            } finally {
                setIsLoading(false);
            }
        },
        [isAuthenticated, apiKeys],
    );

    const revokeKey = useCallback(
        async (id: string) => {
            if (!isAuthenticated) return;
            setIsLoading(true);
            setError(null);

            try {
                setApiKeys(prev => prev.filter(k => k.id !== id));
            } catch (err) {
                const message = (err as Error).message;
                setError(message);
                console.error('Failed to revoke API key:', err);
            } finally {
                setIsLoading(false);
            }
        },
        [isAuthenticated],
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
