/*
 * Browser-only shim for @lanonasis/oauth-client.
 * The official package bundles multiple Node/Electron dependencies that break
 * in the Vite dev server. This shim provides the minimal pieces that our web
 * preview needs so we can exercise the VS Code UI flows without the heavy
 * native requirements. The full SDK is still used by the VS Code extension
 * and other Node runtimes.
 */

// ---------------------------------------------------------
// Types copied from @lanonasis/oauth-client for compatibility
// ---------------------------------------------------------

export interface TokenResponse {
    access_token: string;
    refresh_token?: string;
    expires_in: number;
    token_type: string;
    scope?: string;
    issued_at?: number;
}

export interface OAuthConfig {
    clientId: string;
    authBaseUrl?: string;
    redirectUri?: string;
    scope?: string;
}

export interface ApiKeyData {
    apiKey: string;
    organizationId?: string;
    userId?: string;
    environment?: "development" | "staging" | "production";
    createdAt?: string;
    expiresAt?: string;
    metadata?: Record<string, unknown>;
}

const TOKEN_STORAGE_KEY = "lanonasis.oauth.tokens";
const API_KEY_STORAGE_KEY = "lanonasis.oauth.api-key";

function getStorage(): Storage | null {
    if (typeof window === "undefined") return null;
    try {
        return window.localStorage;
    } catch {
        return null;
    }
}

function serialize(data: unknown): string {
    return JSON.stringify(data);
}

function deserialize<T>(raw: string | null): T | null {
    if (!raw) return null;
    try {
        return JSON.parse(raw) as T;
    } catch {
        return null;
    }
}

// ---------------------------------------------------------
// Token Storage
// ---------------------------------------------------------

export class TokenStorage {
    private storageKey = TOKEN_STORAGE_KEY;
    private fallback: TokenResponse | null = null;

    async store(tokens: TokenResponse): Promise<void> {
        const payload: TokenResponse = {
            ...tokens,
            issued_at: tokens.issued_at ?? Math.floor(Date.now() / 1000),
        };

        const storage = getStorage();
        if (storage) {
            storage.setItem(this.storageKey, serialize(payload));
        } else {
            this.fallback = payload;
        }
    }

    async retrieve(): Promise<TokenResponse | null> {
        const storage = getStorage();
        if (storage) {
            return deserialize<TokenResponse>(storage.getItem(this.storageKey));
        }
        return this.fallback;
    }

    async clear(): Promise<void> {
        const storage = getStorage();
        if (storage) {
            storage.removeItem(this.storageKey);
        }
        this.fallback = null;
    }

    isTokenExpired(tokens: TokenResponse & { issued_at?: number }): boolean {
        const issuedAt = tokens.issued_at ?? Math.floor(Date.now() / 1000);
        const expiresIn = Math.max(tokens.expires_in ?? 0, 0);
        const now = Math.floor(Date.now() / 1000);
        // Refresh a little early to avoid race conditions.
        return issuedAt + expiresIn - 30 <= now;
    }
}

// ---------------------------------------------------------
// API Key Storage
// ---------------------------------------------------------

export class ApiKeyStorage {
    private storageKey = API_KEY_STORAGE_KEY;
    private fallback: ApiKeyData | null = null;
    private initialized = false;

    async initialize(): Promise<void> {
        this.initialized = true;
    }

    async store(data: ApiKeyData): Promise<void> {
        if (!this.initialized) await this.initialize();
        const payload: ApiKeyData = {
            ...data,
            createdAt: data.createdAt ?? new Date().toISOString(),
        };

        const storage = getStorage();
        if (storage) {
            storage.setItem(this.storageKey, serialize(payload));
        } else {
            this.fallback = payload;
        }
    }

    async retrieve(): Promise<ApiKeyData | null> {
        const storage = getStorage();
        if (storage) {
            return deserialize<ApiKeyData>(storage.getItem(this.storageKey));
        }
        return this.fallback;
    }

    async getApiKey(): Promise<string | null> {
        const data = await this.retrieve();
        return data?.apiKey ?? null;
    }

    async hasApiKey(): Promise<boolean> {
        return (await this.getApiKey()) !== null;
    }

    async clear(): Promise<void> {
        const storage = getStorage();
        if (storage) {
            storage.removeItem(this.storageKey);
        }
        this.fallback = null;
    }

    isExpired(data: ApiKeyData): boolean {
        if (!data.expiresAt) return false;
        const expires = Date.parse(data.expiresAt);
        return Number.isFinite(expires) ? Date.now() >= expires : false;
    }

    async updateMetadata(metadata: Record<string, unknown>): Promise<void> {
        const current = await this.retrieve();
        if (!current) return;
        await this.store({ ...current, metadata: { ...current.metadata, ...metadata } });
    }
}

// ---------------------------------------------------------
// Desktop OAuth Flow (browser stub)
// ---------------------------------------------------------

export class DesktopOAuthFlow {
    constructor(private readonly config: OAuthConfig) { }

    async authenticate(): Promise<TokenResponse> {
        throw new Error(
            "Desktop OAuth flow isn't available in the browser preview. Use the VS Code extension or switch to API key login while developing."
        );
    }
}
