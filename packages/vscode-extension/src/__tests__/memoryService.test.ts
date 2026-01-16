import { afterEach, describe, expect, it, vi } from 'vitest';
import type { OutputChannel } from 'vscode';
import { MemoryService } from '../services/MemoryService';
import type { MemoryEntry } from '../types/memory-aligned';

const createOutput = (): OutputChannel => ({
    appendLine: vi.fn(),
} as unknown as OutputChannel);

const createMemory = (overrides: Partial<MemoryEntry> = {}): MemoryEntry => ({
    id: 'mem-1',
    title: 'Test memory',
    content: 'Content',
    memory_type: 'context',
    tags: ['test'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...overrides,
});

describe('MemoryService', () => {
    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('lists memories using OAuth header', async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ data: { memories: [createMemory()] } }),
        });
        vi.stubGlobal('fetch', fetchMock);

        const secureApiKeyService = {
            getStoredCredentials: vi.fn().mockResolvedValue({ type: 'oauth', token: 'oauth-token' }),
            hasApiKey: vi.fn().mockResolvedValue(true),
        };

        const service = new MemoryService(
            secureApiKeyService as any,
            createOutput(),
            'https://lanonasis.supabase.co',
        );

        const memories = await service.listMemories();

        expect(memories).toHaveLength(1);
        expect(fetchMock).toHaveBeenCalledTimes(1);
        const [url, init] = fetchMock.mock.calls[0];
        expect(url).toContain('/functions/v1/memory-list?limit=100');
        expect(init?.headers).toMatchObject({ Authorization: 'Bearer oauth-token' });
    });

    it('creates memories with API key header', async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ memory: createMemory({ id: 'mem-2' }) }),
        });
        vi.stubGlobal('fetch', fetchMock);

        const secureApiKeyService = {
            getStoredCredentials: vi.fn().mockResolvedValue({ type: 'apiKey', token: 'lano_test' }),
        };

        const service = new MemoryService(
            secureApiKeyService as any,
            createOutput(),
            'https://lanonasis.supabase.co',
        );

        const created = await service.createMemory({
            title: 'New memory',
            content: 'New content',
            memory_type: 'context',
            tags: ['new'],
        });

        expect(created.id).toBe('mem-2');
        const [, init] = fetchMock.mock.calls[0];
        expect(init?.headers).toMatchObject({ 'X-API-Key': 'lano_test' });
    });

    it('throws on failed API response', async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: false,
            status: 500,
            text: async () => 'Server error',
        });
        vi.stubGlobal('fetch', fetchMock);

        const secureApiKeyService = {
            getStoredCredentials: vi.fn().mockResolvedValue({ type: 'apiKey', token: 'lano_test' }),
        };

        const service = new MemoryService(
            secureApiKeyService as any,
            createOutput(),
            'https://lanonasis.supabase.co',
        );

        await expect(service.listMemories()).rejects.toThrow('List memories failed');
    });
});
