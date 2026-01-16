import type { OutputChannel } from 'vscode';
import { SecureApiKeyService } from './SecureApiKeyService';
import type { CreateMemoryRequest, MemoryEntry, MemorySearchResult, UpdateMemoryRequest } from '../types/memory-aligned';

export class MemoryService {
    constructor(
        private readonly secureApiKeyService: SecureApiKeyService,
        private readonly output: OutputChannel,
        private readonly edgeFunctionsUrl: string,
    ) { }

    async isAuthenticated(): Promise<boolean> {
        return await this.secureApiKeyService.hasApiKey();
    }

    private async getAuthHeaders(): Promise<Record<string, string>> {
        const credentials = await this.secureApiKeyService.getStoredCredentials();
        if (!credentials) {
            throw new Error('Not authenticated');
        }

        if (credentials.type === 'oauth') {
            return {
                Authorization: `Bearer ${credentials.token}`,
                'Content-Type': 'application/json',
            };
        }

        return {
            'X-API-Key': credentials.token,
            'Content-Type': 'application/json',
        };
    }

    async testConnection(): Promise<void> {
        const headers = await this.getAuthHeaders();
        const response = await fetch(`${this.edgeFunctionsUrl}/functions/v1/system-health`, {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            const body = await response.text();
            throw new Error(`Health check failed (${response.status}): ${body}`);
        }
    }

    async listMemories(limit: number = 100): Promise<MemoryEntry[]> {
        const headers = await this.getAuthHeaders();
        const response = await fetch(`${this.edgeFunctionsUrl}/functions/v1/memory-list?limit=${limit}`, {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            const body = await response.text();
            throw new Error(`List memories failed (${response.status}): ${body}`);
        }

        const data = await response.json();
        const memories = (data.data?.memories || data.memories || data.data || data || []) as MemoryEntry[];
        return memories;
    }

    async searchMemories(query: string, options: { limit?: number; threshold?: number } = {}): Promise<MemorySearchResult[]> {
        const headers = await this.getAuthHeaders();
        const response = await fetch(`${this.edgeFunctionsUrl}/functions/v1/memory-search`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                query,
                limit: options.limit ?? 10,
                threshold: options.threshold ?? 0.7,
            }),
        });

        if (!response.ok) {
            const body = await response.text();
            throw new Error(`Search memories failed (${response.status}): ${body}`);
        }

        const data = await response.json();
        const results = (data.data?.results || data.results || data.data || []) as MemorySearchResult[];
        return results;
    }

    async createMemory(request: CreateMemoryRequest): Promise<MemoryEntry> {
        const headers = await this.getAuthHeaders();
        const response = await fetch(`${this.edgeFunctionsUrl}/functions/v1/memory-create`, {
            method: 'POST',
            headers,
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            const body = await response.text();
            throw new Error(`Create memory failed (${response.status}): ${body}`);
        }

        const data = await response.json();
        return (data.data || data.memory || data) as MemoryEntry;
    }

    async updateMemory(id: string, updates: UpdateMemoryRequest): Promise<MemoryEntry> {
        const headers = await this.getAuthHeaders();
        const response = await fetch(`${this.edgeFunctionsUrl}/functions/v1/memory-update`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                id,
                ...updates,
            }),
        });

        if (!response.ok) {
            const body = await response.text();
            throw new Error(`Update memory failed (${response.status}): ${body}`);
        }

        const data = await response.json();
        return (data.data || data.memory || data) as MemoryEntry;
    }

    async deleteMemory(id: string): Promise<void> {
        const headers = await this.getAuthHeaders();
        const response = await fetch(`${this.edgeFunctionsUrl}/functions/v1/memory-delete`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ id }),
        });

        if (!response.ok) {
            const body = await response.text();
            throw new Error(`Delete memory failed (${response.status}): ${body}`);
        }
    }

    async getMemory(id: string): Promise<MemoryEntry> {
        const headers = await this.getAuthHeaders();
        const response = await fetch(`${this.edgeFunctionsUrl}/functions/v1/memory-get?id=${encodeURIComponent(id)}`, {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            const body = await response.text();
            throw new Error(`Get memory failed (${response.status}): ${body}`);
        }

        const data = await response.json();
        return (data.data || data.memory || data) as MemoryEntry;
    }
}
