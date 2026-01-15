import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { ExtensionContext, OutputChannel } from 'vscode';
import { MemoryCache } from '../memoryCache';

const createMockContext = (): ExtensionContext => {
    const store = new Map<string, unknown>();

    return {
        globalState: {
            get: <T>(key: string, defaultValue: T): T => {
                return store.has(key) ? (store.get(key) as T) : defaultValue;
            },
            update: async (key: string, value: unknown): Promise<void> => {
                store.set(key, value);
            },
        },
    } as unknown as ExtensionContext;
};

const createMockOutput = (): OutputChannel => {
    return {
        appendLine: vi.fn(),
    } as unknown as OutputChannel;
};

describe('MemoryCache', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }));
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.unstubAllGlobals();
    });

    it('adds local memories and queues for sync', async () => {
        const cache = new MemoryCache(createMockContext(), createMockOutput());

        const created = await cache.addLocal({
            title: 'Test memory',
            content: 'Hello world',
            memory_type: 'note',
            tags: ['test'],
        });

        expect(created._pending).toBe('create');
        expect(cache.getMemories()).toHaveLength(1);
        expect(cache.getPendingQueue()).toHaveLength(1);

        cache.stopConnectivityCheck();
    });

    it('keeps create pending status when updating a local memory', async () => {
        const cache = new MemoryCache(createMockContext(), createMockOutput());

        const created = await cache.addLocal({
            title: 'Draft memory',
            content: 'Initial',
            memory_type: 'note',
            tags: ['draft'],
        });

        await cache.queueUpdate(created.id, { title: 'Updated title' });

        const memory = cache.getMemories()[0];
        expect(memory.title).toBe('Updated title');
        expect(memory._pending).toBe('create');

        cache.stopConnectivityCheck();
    });

    it('removes unsynced local memory when queued for delete', async () => {
        const cache = new MemoryCache(createMockContext(), createMockOutput());

        const created = await cache.addLocal({
            title: 'Temp memory',
            content: 'To be deleted',
            memory_type: 'note',
            tags: ['temp'],
        });

        await cache.queueDelete(created.id);

        expect(cache.getMemories()).toHaveLength(0);
        expect(cache.getPendingQueue()).toHaveLength(0);

        cache.stopConnectivityCheck();
    });

    it('marks local memory as synced with server id', async () => {
        const cache = new MemoryCache(createMockContext(), createMockOutput());

        const created = await cache.addLocal({
            title: 'Local memory',
            content: 'Will sync',
            memory_type: 'note',
            tags: ['sync'],
        });

        await cache.markSynced(created.id, {
            id: 'server-1',
            title: 'Local memory',
            content: 'Will sync',
            memory_type: 'note',
            tags: ['sync'],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        });

        const memories = cache.getMemories();
        expect(memories).toHaveLength(1);
        expect(memories[0].id).toBe('server-1');
        expect(memories[0]._pending).toBeUndefined();
        expect(memories[0]._localId).toBeUndefined();
        expect(cache.getPendingQueue()).toHaveLength(0);

        cache.stopConnectivityCheck();
    });

    it('updates cache from API and records sync status', async () => {
        const cache = new MemoryCache(createMockContext(), createMockOutput());

        await cache.updateFromApi([
            {
                id: 'remote-1',
                title: 'Remote memory',
                content: 'Fetched',
                memory_type: 'note',
                tags: ['remote'],
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            },
        ]);

        expect(cache.getMemories()).toHaveLength(1);
        const status = cache.getStatus();
        expect(status.isOnline).toBe(true);
        expect(status.lastSyncAt).not.toBeNull();

        cache.stopConnectivityCheck();
    });
});
