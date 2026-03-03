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

        // API keys use X-API-Key header; OAuth tokens use Bearer
        if (credentials.type === 'apikey') {
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
        // Correct endpoint: GET /memories (not /memories/list)
        const response = await this.fetchWithTimeout(
            `${this.apiUrl}/memories?limit=${limit}&sortBy=updated_at&sortOrder=desc`,
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
        // Correct endpoint: POST /memories/search
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
        // Correct endpoint: POST /memories
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
        // Correct endpoint: PUT /memories/{id} (not POST /memory/update)
        const response = await this.fetchWithTimeout(
            `${this.apiUrl}/memories/${encodeURIComponent(id)}`,
            {
                method: 'PUT',
                headers,
                body: JSON.stringify(updates),
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
        // Correct endpoint: DELETE /memories/{id} (not POST /memory/delete)
        const response = await this.fetchWithTimeout(
            `${this.apiUrl}/memories/${encodeURIComponent(id)}`,
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
        // Correct endpoint: GET /memories/{id} (plural, not /memory/{id})
        const response = await this.fetchWithTimeout(
            `${this.apiUrl}/memories/${encodeURIComponent(id)}`,
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
