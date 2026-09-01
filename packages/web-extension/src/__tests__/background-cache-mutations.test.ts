import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const dbStore = new Map<string, unknown>();

vi.mock('idb', () => ({
  openDB: vi.fn(async () => ({
    get: async (_store: string, key: string) => dbStore.get(key),
    getAll: async () => Array.from(dbStore.values()),
    put: async (_store: string, value: any) => { dbStore.set(value.id, value); },
    delete: async (_store: string, key: string) => { dbStore.delete(key); },
    clear: async () => { dbStore.clear(); },
    transaction: () => ({
      store: {
        getAll: async () => Array.from(dbStore.values()),
        put: async (value: any) => { dbStore.set(value.id, value); },
        delete: async (key: string) => { dbStore.delete(key); },
      },
      done: Promise.resolve(),
    }),
  })),
}));

// MemoryCache's constructor installs `self` (service-worker) online/offline
// listeners; polyfill a no-op `self` for the Node test environment.
if (typeof (globalThis as any).self === 'undefined') {
  (globalThis as any).self = { addEventListener: () => {}, removeEventListener: () => {} };
}

import { buildDeleteMemoryEndpoint, buildUpdateMemoryEndpoint, MemoryCache } from '../background/cache';

function installChromeStorageMock(values: Record<string, unknown>) {
  (globalThis as any).chrome = {
    storage: {
      local: {
        get: async (_keys: string[]) => values,
      },
    },
  };
}

describe('memory endpoint builders', () => {
  it('targets /memory/:id for both update and delete', () => {
    expect(buildUpdateMemoryEndpoint('mem_123')).toBe('/memory/mem_123');
    expect(buildDeleteMemoryEndpoint('mem_123')).toBe('/memory/mem_123');
  });

  it('encodes ids that contain special characters', () => {
    expect(buildUpdateMemoryEndpoint('a/b c')).toBe('/memory/a%2Fb%20c');
  });
});

describe('MemoryCache.updateMemory / deleteMemory', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    dbStore.clear();
    installChromeStorageMock({ l0_auth_token: 'lano_test_123', apiUrl: 'https://api.lanonasis.com' });
    (globalThis as any).fetch = fetchMock;
    fetchMock.mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('sends PUT /memory/:id and caches the returned memory', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: async () => ({
        data: {
          id: 'mem_1',
          title: 'Updated title',
          content: 'Updated content',
          memory_type: 'note',
          tags: ['a', 'b'],
          created_at: '2026-01-01T00:00:00.000Z',
          updated_at: '2026-01-02T00:00:00.000Z',
        },
      }),
    });

    const cache = new MemoryCache();
    const result = await cache.updateMemory('mem_1', { title: 'Updated title', content: 'Updated content', tags: ['a', 'b'] });

    expect(result.success).toBe(true);
    expect(result.memory?.title).toBe('Updated title');

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.lanonasis.com/api/v1/memory/mem_1');
    expect(init.method).toBe('PUT');
    expect(init.headers['X-API-Key']).toBe('lano_test_123');

    const cached = await cache.getMemories();
    expect(cached).toHaveLength(1);
    expect(cached[0].title).toBe('Updated title');
  });

  it('surfaces API errors instead of throwing', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 403,
      statusText: 'Forbidden',
      headers: { get: () => 'application/json' },
      json: async () => ({ error: 'You can only update your own memories' }),
    });

    const cache = new MemoryCache();
    const result = await cache.updateMemory('mem_1', { title: 'x', content: 'y' });

    expect(result.success).toBe(false);
    expect(result.error).toBe('You can only update your own memories');
  });

  it('sends DELETE /memory/:id and removes it from the cache', async () => {
    dbStore.set('mem_1', { id: 'mem_1', title: 'Old', content: 'Old', memory_type: 'note', tags: [], created_at: '', updated_at: '' });
    fetchMock.mockResolvedValue({
      ok: true,
      headers: { get: () => 'application/json' },
      json: async () => ({ success: true, message: 'Memory mem_1 deleted successfully', deleted_id: 'mem_1' }),
    });

    const cache = new MemoryCache();
    const result = await cache.deleteMemory('mem_1');

    expect(result.success).toBe(true);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.lanonasis.com/api/v1/memory/mem_1');
    expect(init.method).toBe('DELETE');
    expect(dbStore.has('mem_1')).toBe(false);
  });

  it('refuses to call the API when not authenticated', async () => {
    installChromeStorageMock({});
    const cache = new MemoryCache();

    const result = await cache.deleteMemory('mem_1');

    expect(result.success).toBe(false);
    expect(result.error).toMatch(/sign in/i);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
