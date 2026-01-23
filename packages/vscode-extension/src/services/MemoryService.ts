import type { OutputChannel } from 'vscode';
import { SecureApiKeyService } from './SecureApiKeyService';
import type { CreateMemoryRequest, MemoryEntry, MemorySearchResult, UpdateMemoryRequest } from '../types/memory-aligned';

// Default timeout for API requests (30 seconds)
const DEFAULT_TIMEOUT_MS = 30000;

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

        // Both OAuth tokens and API keys use Bearer authorization
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
        const response = await this.fetchWithTimeout(
            `${this.apiUrl}/memories/list?limit=${limit}`,
            { method: 'GET', headers }
        );

        if (!response.ok) {
            const body = await response.text();
            throw new Error(`List memories failed (${response.status}): ${body}`);
        }

        const data = await response.json();
        // Handle various response formats
        const memories = (data.data || data.memories || data || []) as MemoryEntry[];
        return Array.isArray(memories) ? memories : [];
    }

    async searchMemories(query: string, options: { limit?: number; threshold?: number } = {}): Promise<MemorySearchResult[]> {
        const headers = await this.getAuthHeaders();
        const response = await this.fetchWithTimeout(
            `${this.apiUrl}/memories/search`,
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
            `${this.apiUrl}/memories`,
            {
                method: 'POST',
                headers,
                body: JSON.stringify(request),
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
            `${this.apiUrl}/memory/update`,
            {
                method: 'POST',
                headers,
                body: JSON.stringify({ id, ...updates }),
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
            `${this.apiUrl}/memory/delete`,
            {
                method: 'POST',
                headers,
                body: JSON.stringify({ id }),
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
            `${this.apiUrl}/memory/${encodeURIComponent(id)}`,
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
