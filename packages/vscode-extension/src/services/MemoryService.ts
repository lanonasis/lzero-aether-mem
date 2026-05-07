import type { OutputChannel } from 'vscode';
import { SecureApiKeyService } from './SecureApiKeyService';
import type { CreateMemoryRequest, MemoryEntry, MemorySearchResult, UpdateMemoryRequest } from '../types/memory-aligned';

// Default timeout for API requests (30 seconds)
const DEFAULT_TIMEOUT_MS = 30000;

const buildMemoryListUrl = (apiUrl: string, limit: number): string =>
    `${apiUrl}/memory/list?limit=${limit}&sortBy=updated_at&sortOrder=desc`;

const buildMemorySearchUrl = (apiUrl: string): string =>
    `${apiUrl}/memory/search`;

const buildMemoryCreateUrl = (apiUrl: string): string =>
    `${apiUrl}/memory`;

const buildMemoryUpdateUrl = (apiUrl: string): string =>
    `${apiUrl}/memory/update`;

const buildMemoryDeleteUrl = (apiUrl: string, id: string): string =>
    `${apiUrl}/memory/delete?id=${encodeURIComponent(id)}`;

const buildMemoryGetUrl = (apiUrl: string, id: string): string =>
    `${apiUrl}/memory/get?id=${encodeURIComponent(id)}`;

const withCompatibleMemoryType = <T extends { memory_type?: string }>(payload: T): T & { type?: string } => ({
    ...payload,
    ...(payload.memory_type ? { type: payload.memory_type } : {}),
});

export class MemoryService {
    constructor(
        private readonly secureApiKeyService: SecureApiKeyService,
        private readonly output: OutputChannel,
        private readonly apiUrl: string,
    ) { }

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

    async isAuthenticated(): Promise<boolean> {
        return await this.secureApiKeyService.hasApiKey();
    }

    private async getAuthHeaders(): Promise<Record<string, string>> {
        const credentials = await this.secureApiKeyService.getStoredCredentials();
        if (!credentials) {
            throw new Error('Not authenticated');
        }

        // API keys use X-API-Key header; OAuth tokens use Bearer
        if (credentials.type === 'apiKey') {
            return {
                'Content-Type': 'application/json',
                'X-API-Key': credentials.token,
            };
        }

        return {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${credentials.token}`,
        };
    }

    async testConnection(): Promise<void> {
        const headers = await this.getAuthHeaders();
        const response = await this.fetchWithTimeout(
            `${this.apiUrl}/health`,
            { method: 'GET', headers },
            10000 // 10 second timeout for health checks
        );

        if (!response.ok) {
            const body = await response.text();
            throw new Error(`Health check failed (${response.status}): ${body}`);
        }
    }

    async listMemories(limit: number = 100): Promise<MemoryEntry[]> {
        const headers = await this.getAuthHeaders();
        // Use the explicit proxy list route for maximum compatibility with the live gateway.
        const response = await this.fetchWithTimeout(
            buildMemoryListUrl(this.apiUrl, limit),
            { method: 'GET', headers }
        );

        if (!response.ok) {
            const body = await response.text();
            throw new Error(`List memories failed (${response.status}): ${body}`);
        }

        const data = await response.json();
        // API returns { data: [...] } or { memories: [...] } or bare array
        const memories = (data.data || data.memories || data || []) as MemoryEntry[];
        return Array.isArray(memories) ? memories : [];
    }

    async searchMemories(query: string, options: { limit?: number; threshold?: number } = {}): Promise<MemorySearchResult[]> {
        const headers = await this.getAuthHeaders();
        const response = await this.fetchWithTimeout(
            buildMemorySearchUrl(this.apiUrl),
            {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    query,
                    limit: options.limit ?? 10,
                    threshold: options.threshold ?? 0.7,
                }),
            }
        );

        if (!response.ok) {
            const body = await response.text();
            throw new Error(`Search memories failed (${response.status}): ${body}`);
        }

        const data = await response.json();
        const results = (data.data?.results || data.results || data.data || []) as MemorySearchResult[];
        return Array.isArray(results) ? results : [];
    }

    async createMemory(request: CreateMemoryRequest): Promise<MemoryEntry> {
        const headers = await this.getAuthHeaders();
        const response = await this.fetchWithTimeout(
            buildMemoryCreateUrl(this.apiUrl),
            {
                method: 'POST',
                headers,
                body: JSON.stringify(withCompatibleMemoryType(request)),
            }
        );

        if (!response.ok) {
            const body = await response.text();
            throw new Error(`Create memory failed (${response.status}): ${body}`);
        }

        const data = await response.json();
        return (data.data || data.memory || data) as MemoryEntry;
    }

    async updateMemory(id: string, updates: UpdateMemoryRequest): Promise<MemoryEntry> {
        const headers = await this.getAuthHeaders();
        const response = await this.fetchWithTimeout(
            buildMemoryUpdateUrl(this.apiUrl),
            {
                method: 'POST',
                headers,
                body: JSON.stringify(withCompatibleMemoryType({ id, ...updates })),
            }
        );

        if (!response.ok) {
            const body = await response.text();
            throw new Error(`Update memory failed (${response.status}): ${body}`);
        }

        const data = await response.json();
        return (data.data || data.memory || data) as MemoryEntry;
    }

    async deleteMemory(id: string): Promise<void> {
        const headers = await this.getAuthHeaders();
        const response = await this.fetchWithTimeout(
            buildMemoryDeleteUrl(this.apiUrl, id),
            {
                method: 'DELETE',
                headers,
            }
        );

        if (!response.ok) {
            const body = await response.text();
            throw new Error(`Delete memory failed (${response.status}): ${body}`);
        }
    }

    async getMemory(id: string): Promise<MemoryEntry> {
        const headers = await this.getAuthHeaders();
        const response = await this.fetchWithTimeout(
            buildMemoryGetUrl(this.apiUrl, id),
            { method: 'GET', headers }
        );

        if (!response.ok) {
            const body = await response.text();
            throw new Error(`Get memory failed (${response.status}): ${body}`);
        }

        const data = await response.json();
        return (data.data || data.memory || data) as MemoryEntry;
    }
}
