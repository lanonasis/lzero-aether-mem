import * as vscode from 'vscode';
import { SecureApiKeyService, StoredCredential } from './SecureApiKeyService';

export interface ApiKey {
    id: string;
    name: string;
    keyType: string;
    environment: string;
    accessLevel: string;
    projectId: string;
    createdAt: string;
    expiresAt?: string;
    tags: string[];
    metadata: Record<string, unknown>;
}

export interface Project {
    id: string;
    name: string;
    description?: string;
    organizationId: string;
    createdAt: string;
    teamMembers: string[];
    settings: Record<string, unknown>;
}

export interface CreateApiKeyRequest {
    name: string;
    value: string;
    keyType: 'api_key' | 'database_url' | 'oauth_token' | 'certificate' | 'ssh_key' | 'webhook_secret' | 'encryption_key';
    environment: 'development' | 'staging' | 'production';
    accessLevel: 'public' | 'authenticated' | 'team' | 'admin' | 'enterprise';
    projectId: string;
    tags?: string[];
    expiresAt?: string;
    rotationFrequency?: number;
    metadata?: Record<string, unknown>;
}

export interface CreateProjectRequest {
    name: string;
    description?: string;
    organizationId: string;
    teamMembers?: string[];
    settings?: Record<string, unknown>;
}

// Default timeout for API requests (30 seconds)
const DEFAULT_TIMEOUT_MS = 30000;

export class ApiKeyService {
    private config: vscode.WorkspaceConfiguration;
    private baseUrl: string = 'https://api.lanonasis.com';
    private userInfoCache: { id: string; email: string; name?: string } | null = null;
    private userInfoCacheExpiry: number = 0;

    constructor(
        private readonly secureApiKeyService: SecureApiKeyService,
        private readonly output?: vscode.OutputChannel,
    ) {
        this.config = vscode.workspace.getConfiguration('lzero');
        this.updateConfig();
    }

    /**
     * Creates a fetch request with timeout support
     */
    private async fetchWithTimeout(
        url: string,
        options: RequestInit,
        timeoutMs: number = DEFAULT_TIMEOUT_MS
    ): Promise<Response> {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal,
            });
            return response;
        } catch (error) {
            if (error instanceof Error && error.name === 'AbortError') {
                throw new Error(`Request timed out after ${timeoutMs}ms`);
            }
            throw error;
        } finally {
            clearTimeout(timeoutId);
        }
    }

    private updateConfig(): void {
        const useGateway = this.config.get<boolean>('useGateway', false);
        const apiUrl = this.config.get<string>('apiUrl', 'https://api.lanonasis.com');
        const gatewayUrl = this.config.get<string>('gatewayUrl', 'https://api.lanonasis.com');

        this.baseUrl = this.sanitizeBaseUrl(useGateway ? gatewayUrl : apiUrl);
    }

    refreshConfig(): void {
        this.config = vscode.workspace.getConfiguration('lzero');
        this.updateConfig();
    }

    private async makeRequest<T>(endpoint: string, options: RequestInit = {}, timeoutMs: number = DEFAULT_TIMEOUT_MS): Promise<T> {
        const credentials = await this.resolveCredentials();
        const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
        const url = `${this.baseUrl}${normalizedEndpoint}`;
        const authHeaders: Record<string, string> = credentials.type === 'oauth'
            ? { 'Authorization': `Bearer ${credentials.token}` }
            : { 'X-API-Key': credentials.token };

        const response = await this.fetchWithTimeout(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...authHeaders,
                ...options.headers
            }
        }, timeoutMs);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`);
        }

        return response.json();
    }

    private sanitizeBaseUrl(url: string): string {
        if (!url) {
            return 'https://api.lanonasis.com';
        }

        let clean = url.trim();
        clean = clean.replace(/\/+$/, '');
        clean = clean.replace(/\/api\/v1$/i, '').replace(/\/api$/i, '');

        return clean || 'https://api.lanonasis.com';
    }

    private async resolveCredentials(): Promise<StoredCredential> {
        let credentials = await this.secureApiKeyService.getStoredCredentials();

        if (!credentials) {
            const value = await this.secureApiKeyService.getApiKeyOrPrompt();
            if (!value) {
                throw new Error('API key not configured. Please configure your API key to use L0 Memory services.');
            }

            credentials = await this.secureApiKeyService.getStoredCredentials();

            if (!credentials) {
                credentials = {
                    type: this.looksLikeJwt(value) ? 'oauth' : 'apiKey',
                    token: value
                };
            }
        }

        return credentials;
    }

    private looksLikeJwt(token: string): boolean {
        const parts = token.split('.');
        if (parts.length !== 3) {
            return false;
        }
        const jwtSegment = /^[A-Za-z0-9-_]+$/;
        return parts.every(segment => jwtSegment.test(segment));
    }

    async getProjects(): Promise<Project[]> {
        return this.makeRequest<Project[]>('/api/v1/projects');
    }

    async getProject(projectId: string): Promise<Project> {
        return this.makeRequest<Project>(`/api/v1/projects/${projectId}`);
    }

    async createProject(request: CreateProjectRequest): Promise<Project> {
        return this.makeRequest<Project>('/api/v1/projects', {
            method: 'POST',
            body: JSON.stringify(request)
        });
    }

    async updateProject(projectId: string, updates: Partial<CreateProjectRequest>): Promise<Project> {
        return this.makeRequest<Project>(`/api/v1/projects/${projectId}`, {
            method: 'PUT',
            body: JSON.stringify(updates)
        });
    }

    async deleteProject(projectId: string): Promise<void> {
        await this.makeRequest<void>(`/api/v1/projects/${projectId}`, {
            method: 'DELETE'
        });
    }

    async getApiKeys(projectId?: string): Promise<ApiKey[]> {
        const endpoint = projectId ? `/api/v1/projects/${projectId}/api-keys` : '/api/v1/auth/api-keys';
        const response = await this.makeRequest<ApiKey[] | { success: boolean; data: ApiKey[] }>(endpoint);

        if (response && typeof response === 'object' && 'data' in response && Array.isArray(response.data)) {
            return response.data;
        }

        if (Array.isArray(response)) {
            return response;
        }

        return [];
    }

    async getApiKey(keyId: string): Promise<ApiKey> {
        return this.makeRequest<ApiKey>(`/api/v1/auth/api-keys/${keyId}`);
    }

    async createApiKey(request: CreateApiKeyRequest): Promise<ApiKey> {
        return this.makeRequest<ApiKey>('/api/v1/auth/api-keys', {
            method: 'POST',
            body: JSON.stringify(request)
        });
    }

    async updateApiKey(keyId: string, updates: Partial<CreateApiKeyRequest>): Promise<ApiKey> {
        return this.makeRequest<ApiKey>(`/api/v1/auth/api-keys/${keyId}`, {
            method: 'PUT',
            body: JSON.stringify(updates)
        });
    }

    async deleteApiKey(keyId: string): Promise<void> {
        await this.makeRequest<void>(`/api/v1/auth/api-keys/${keyId}`, {
            method: 'DELETE'
        });
    }

    async rotateApiKey(keyId: string): Promise<ApiKey> {
        return this.makeRequest<ApiKey>(`/api/v1/auth/api-keys/${keyId}/rotate`, {
            method: 'POST'
        });
    }

    async testConnection(): Promise<boolean> {
        try {
            const credentials = await this.resolveCredentials();

            if (credentials.type === 'oauth') {
                const response = await this.fetchWithTimeout(
                    `${this.baseUrl}/oauth/introspect`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': `Bearer ${credentials.token}`
                        },
                        body: new URLSearchParams({ token: credentials.token })
                    },
                    10000 // 10s timeout for connection test
                );

                if (!response.ok) {
                    const body = await response.text();
                    this.log(`OAuth introspection failed: ${response.status} ${response.statusText} - ${body}`);
                    return false;
                }

                const data = await response.json() as { active?: boolean };
                return data.active === true;
            }

            await this.makeRequest<{ status: string }>('/health', {}, 10000);
            return true;
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            this.log(`Test connection failed: ${message}`);
            return false;
        }
    }

    /**
     * Get user info with caching and smart endpoint selection.
     * Results are cached for 5 minutes to avoid redundant API calls.
     */
    async getUserInfo(forceRefresh: boolean = false): Promise<{ id: string; email: string; name?: string } | null> {
        // Check cache first (5 minute TTL)
        const now = Date.now();
        if (!forceRefresh && this.userInfoCache && this.userInfoCacheExpiry > now) {
            return this.userInfoCache;
        }

        // Try most likely endpoints first (prioritize GET /api/v1/auth/me)
        const endpointConfigs: Array<{ endpoint: string; method: 'GET' | 'POST' }> = [
            { endpoint: '/api/v1/auth/me', method: 'GET' },
            { endpoint: '/api/v1/auth/session', method: 'GET' },
            { endpoint: '/v1/auth/me', method: 'GET' },
            { endpoint: '/v1/auth/session', method: 'GET' },
        ];

        let lastError: unknown;

        for (const { endpoint, method } of endpointConfigs) {
            try {
                const response = await this.makeRequest<unknown>(endpoint, { method }, 10000); // 10s timeout for user info
                const normalized = this.normalizeUserInfo(response);
                if (normalized) {
                    // Cache successful result for 5 minutes
                    this.userInfoCache = normalized;
                    this.userInfoCacheExpiry = now + 5 * 60 * 1000;
                    this.log(`User info retrieved from ${endpoint}`);
                    return normalized;
                }
            } catch (error) {
                lastError = error;
                const message = String(error);
                // Only continue on 404/405 errors, fail fast on auth errors
                const isRetryable = message.includes('404') || message.includes('405') || message.includes('Method Not Allowed');
                if (!isRetryable) {
                    // Auth error or server error - don't try more endpoints
                    break;
                }
            }
        }

        // Clear cache on failure
        this.userInfoCache = null;
        this.userInfoCacheExpiry = 0;

        if (lastError) {
            throw lastError instanceof Error ? lastError : new Error(String(lastError));
        }

        return null;
    }

    /**
     * Clear the user info cache (e.g., on logout)
     */
    clearUserInfoCache(): void {
        this.userInfoCache = null;
        this.userInfoCacheExpiry = 0;
    }

    private normalizeUserInfo(payload: unknown): { id: string; email: string; name?: string } | null {
        if (!payload || typeof payload !== 'object') {
            return null;
        }

        const asRecord = payload as Record<string, unknown>;
        const direct = this.readUserFields(asRecord);
        if (direct) return direct;

        const data = asRecord.data;
        if (data && typeof data === 'object') {
            const fromData = this.readUserFields(data as Record<string, unknown>);
            if (fromData) return fromData;
        }

        const session = asRecord.session;
        if (session && typeof session === 'object') {
            const fromSession = this.readUserFields(session as Record<string, unknown>);
            if (fromSession) return fromSession;
            const sessionUser = (session as Record<string, unknown>).user;
            if (sessionUser && typeof sessionUser === 'object') {
                const fromSessionUser = this.readUserFields(sessionUser as Record<string, unknown>);
                if (fromSessionUser) return fromSessionUser;
            }
        }

        const user = asRecord.user;
        if (user && typeof user === 'object') {
            const fromUser = this.readUserFields(user as Record<string, unknown>);
            if (fromUser) return fromUser;
        }

        return null;
    }

    private readUserFields(source: Record<string, unknown>): { id: string; email: string; name?: string } | null {
        const id = typeof source.id === 'string' ? source.id : typeof source.user_id === 'string' ? source.user_id : undefined;
        const email = typeof source.email === 'string' ? source.email : typeof source.user_email === 'string' ? source.user_email : undefined;
        const name = typeof source.name === 'string'
            ? source.name
            : typeof source.full_name === 'string'
                ? source.full_name
                : typeof source.username === 'string'
                    ? source.username
                    : undefined;

        if (!id && !email && !name) {
            return null;
        }

        return {
            id: id || 'unknown',
            email: email || 'unknown',
            name,
        };
    }

    private log(message: string): void {
        if (!this.output) {
            return;
        }
        this.output.appendLine(`[ApiKeyService] ${message}`);
    }
}
