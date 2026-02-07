/**
 * Memory Cache
 * IndexedDB-based offline cache with sync queue
 * Uses @lanonasis/memory-client for API consistency
 */

import { openDB, type IDBPDatabase, type DBSchema } from 'idb';
import {
  type MemoryEntry,
} from '@lanonasis/memory-client';

export interface CachedMemory {
  id: string;
  title: string;
  content: string;
  memory_type: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  source_url?: string;
  // Local-only fields
  _pending?: 'create' | 'update' | 'delete';
  _localId?: string;
  _cachedAt?: number;
}

export interface SyncStatus {
  isOnline: boolean;
  lastSyncAt: number | null;
  pendingCount: number;
  isSyncing: boolean;
}

interface CachedEmbedding {
  id: string;
  embedding: number[];
  contentHash: string;
  createdAt: number;
}

interface MemoryDB extends DBSchema {
  memories: {
    key: string;
    value: CachedMemory;
    indexes: {
      'by-created': string;
      'by-pending': string;
    };
  };
  embeddings: {
    key: string;
    value: CachedEmbedding;
  };
  meta: {
    key: string;
    value: unknown;
  };
}

const DB_NAME = 'l0-memory-cache';
const DB_VERSION = 2;
const DEFAULT_API_URL = 'https://api.lanonasis.com';
const DEFAULT_TIMEOUT_MS = 15000;

function normalizeApiUrl(raw: string): string {
  // The SDK always appends `/api/v1`, so treat the configured URL as a base origin.
  // Users often paste `.../api` or `.../api/v1`; normalize those to the origin.
  try {
    const u = new URL(raw.trim());
    return u.origin;
  } catch {
    return raw.trim();
  }
}

type ApiResult<T> = { data?: T; error?: string };

function unwrapListResponse(payload: unknown): unknown[] {
  // The API responses in this repo vary a bit by client:
  // - { data: { memories: [...] } }
  // - { memories: [...] }
  // - { data: [...] }
  // - [...]
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];
  const p: any = payload;

  const candidates = [
    p?.data?.memories,
    p?.memories,
    p?.data?.data,
    p?.data,
  ];

  for (const c of candidates) {
    if (Array.isArray(c)) return c;
  }
  return [];
}

export class MemoryCache {
  private db: IDBPDatabase<MemoryDB> | null = null;
  private isOnline = true;
  private isSyncing = false;
  private lastSyncAt: number | null = null;
  private networkListenersInstalled = false;

  constructor() {
    // Register listeners synchronously during the worker's initial evaluation.
    // Chrome warns if these are added after an `await` in an async initializer.
    this.refreshOnlineStatus();
    this.installNetworkListeners();
  }

  private refreshOnlineStatus(): void {
    // `navigator.onLine` is not guaranteed in every worker runtime; guard it.
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const online = (navigator as any)?.onLine;
      if (typeof online === 'boolean') this.isOnline = online;
    } catch {
      // Keep previous value
    }
  }

  private installNetworkListeners(): void {
    if (this.networkListenersInstalled) return;
    this.networkListenersInstalled = true;

    self.addEventListener('online', () => {
      this.isOnline = true;
    });
    self.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  async init(): Promise<void> {
    this.db = await openDB<MemoryDB>(DB_NAME, DB_VERSION, {
      upgrade(db, oldVersion) {
        // Version 1: memories and meta stores
        if (oldVersion < 1) {
          const memoriesStore = db.createObjectStore('memories', { keyPath: 'id' });
          memoriesStore.createIndex('by-created', 'created_at');
          memoriesStore.createIndex('by-pending', '_pending');
          db.createObjectStore('meta');
        }

        // Version 2: add embeddings store for on-device AI
        if (oldVersion < 2) {
          if (!db.objectStoreNames.contains('embeddings')) {
            db.createObjectStore('embeddings', { keyPath: 'id' });
          }
        }
      },
    });

    // Load last sync time
    const meta = await this.db.get('meta', 'lastSyncAt');
    this.lastSyncAt = (meta as number) || null;

    // Refresh online status (listeners are installed in the constructor).
    this.refreshOnlineStatus();

    console.log('[MemoryCache] Initialized');
  }

  /**
   * Get auth + API url from extension storage.
   */
  private async getAuthConfig(): Promise<{ token: string; apiUrl: string } | null> {
    const { authToken, apiUrl } = await chrome.storage.local.get(['authToken', 'apiUrl']);
    if (!authToken) {
      console.log('[MemoryCache] No API key available');
      return null;
    }

    const effectiveApiUrl = normalizeApiUrl(apiUrl || DEFAULT_API_URL);
    return { token: authToken, apiUrl: effectiveApiUrl };
  }

  /**
   * Browser-extension safe API request helper.
   * We intentionally do not set forbidden headers (like User-Agent).
   */
  private async apiRequest<T>(
    endpoint: string,
    init: RequestInit & { timeoutMs?: number } = {}
  ): Promise<ApiResult<T>> {
    const cfg = await this.getAuthConfig();
    if (!cfg) return { error: 'No auth token' };

    const url = `${cfg.apiUrl}/api/v1${endpoint}`;
    console.log('[MemoryCache] API Request:', url);

    const controller = new AbortController();
    const timeoutMs = init.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(url, {
        ...init,
        // Prevent any accidental cookie credential involvement from impacting CORS.
        credentials: 'omit',
        cache: 'no-store',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': cfg.token,
          ...(init.headers || {}),
        },
      });

      clearTimeout(timeoutId);

      const contentType = res.headers.get('content-type') || '';
      const body = contentType.includes('application/json') ? await res.json() : await res.text();

      if (!res.ok) {
        const message =
          typeof body === 'object' && body && 'error' in body
            ? String((body as any).error)
            : `HTTP ${res.status}: ${res.statusText}`;
        return { error: message };
      }

      this.isOnline = true;
      return { data: body as T };
    } catch (err) {
      clearTimeout(timeoutId);

      const message = err instanceof Error ? err.message : 'Network error';
      console.error('[MemoryCache] API Error:', message, err);
      if (message.toLowerCase().includes('fetch') || message.toLowerCase().includes('network')) {
        this.isOnline = false;
      }
      return { error: message };
    }
  }

  getStatus(): SyncStatus {
    return {
      isOnline: this.isOnline,
      lastSyncAt: this.lastSyncAt,
      pendingCount: 0, // Will be calculated
      isSyncing: this.isSyncing,
    };
  }

  async getMemories(): Promise<CachedMemory[]> {
    if (!this.db) await this.init();
    const all = await this.db!.getAll('memories');
    return all.sort((a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  async getPendingMemories(): Promise<CachedMemory[]> {
    if (!this.db) await this.init();
    const all = await this.db!.getAll('memories');
    return all.filter(m => m._pending);
  }

  async addLocal(memory: Omit<CachedMemory, 'id' | 'created_at' | 'updated_at'>): Promise<CachedMemory> {
    if (!this.db) await this.init();

    const localId = `local_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const now = new Date().toISOString();

    const newMemory: CachedMemory = {
      ...memory,
      id: localId,
      created_at: now,
      updated_at: now,
      _pending: 'create',
      _localId: localId,
      _cachedAt: Date.now(),
    };

    await this.db!.put('memories', newMemory);
    console.log('[MemoryCache] Added local memory:', newMemory.title);

    // Try to sync immediately if online
    if (this.isOnline) {
      void this.syncOne(newMemory);
    }

    return newMemory;
  }

  async updateFromApi(memories: CachedMemory[]): Promise<void> {
    if (!this.db) await this.init();

    const tx = this.db!.transaction('memories', 'readwrite');

    // Clear non-pending memories
    const existing = await tx.store.getAll();
    for (const mem of existing) {
      if (!mem._pending) {
        await tx.store.delete(mem.id);
      }
    }

    // Add new memories
    for (const mem of memories) {
      await tx.store.put({
        ...mem,
        _cachedAt: Date.now(),
      });
    }

    await tx.done;

    // Update last sync time
    this.lastSyncAt = Date.now();
    await this.db!.put('meta', this.lastSyncAt, 'lastSyncAt');

    console.log('[MemoryCache] Updated from API:', memories.length, 'memories');
  }

  async markSynced(localId: string, serverMemory: CachedMemory): Promise<void> {
    if (!this.db) await this.init();

    // Delete local version
    await this.db!.delete('memories', localId);

    // Add server version
    await this.db!.put('memories', {
      ...serverMemory,
      _pending: undefined,
      _localId: undefined,
      _cachedAt: Date.now(),
    });
  }

  searchLocal(_query: string): CachedMemory[] {
    // This is synchronous for omnibox, so we use a simple approach
    // Real implementation would be async
    return [];
  }

  async searchLocalAsync(query: string): Promise<CachedMemory[]> {
    if (!this.db) await this.init();

    const q = query.toLowerCase();
    const all = await this.db!.getAll('memories');

    // Extract intent keywords
    const findPatterns = [
      /find\s+(?:my\s+)?(.+)/i,
      /search\s+(?:for\s+)?(.+)/i,
      /show\s+(?:me\s+)?(.+)/i,
    ];

    let searchTerms = q;
    for (const pattern of findPatterns) {
      const match = q.match(pattern);
      if (match) {
        searchTerms = match[1] || q;
        break;
      }
    }

    const keywords = searchTerms.split(/\s+/).filter(w => w.length > 2);

    if (keywords.length === 0) {
      return all.slice(0, 5);
    }

    // Score each memory
    const scored = all.map(m => {
      let score = 0;
      const titleLower = m.title.toLowerCase();
      const contentLower = m.content.toLowerCase();

      for (const kw of keywords) {
        if (titleLower.includes(kw)) score += 3;
        if (contentLower.includes(kw)) score += 1;
        if (m.tags.some(t => t.toLowerCase().includes(kw))) score += 2;
      }

      return { memory: m, score };
    });

    return scored
      .filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map(s => s.memory);
  }

  async sync(): Promise<void> {
    if (this.isSyncing || !this.isOnline) return;

    this.isSyncing = true;
    console.log('[MemoryCache] Starting sync...');

    try {
      const cfg = await this.getAuthConfig();
      if (!cfg) {
        console.log('[MemoryCache] No auth token, skipping sync');
        return;
      }

      // Sync pending memories first
      const pending = await this.getPendingMemories();
      for (const mem of pending) {
        await this.syncOne(mem);
      }

      // Fetch latest from API (REST endpoints used across this repo)
      const response = await this.apiRequest<unknown>('/memories/list?limit=100', { method: 'GET' });

      if (response.data) {
        const list = unwrapListResponse(response.data) as MemoryEntry[];
        const memories = list.map((m: MemoryEntry) => ({
          id: m.id,
          title: m.title,
          content: m.content,
          memory_type: m.memory_type,
          tags: m.tags,
          created_at: m.created_at,
          updated_at: m.updated_at,
        })) as CachedMemory[];
        await this.updateFromApi(memories);
      } else if (response.error) {
        console.warn('[MemoryCache] Sync list failed:', response.error);
      }
    } catch (err) {
      console.error('[MemoryCache] Sync error:', err);
    } finally {
      this.isSyncing = false;
    }
  }

  private async syncOne(memory: CachedMemory): Promise<void> {
    try {
      const cfg = await this.getAuthConfig();
      if (!cfg) return;

      // Create memory
      const response = await this.apiRequest<unknown>('/memories', {
        method: 'POST',
        body: JSON.stringify({
          title: memory.title,
          content: memory.content,
          memory_type: memory.memory_type as 'context' | 'project' | 'knowledge' | 'reference' | 'personal' | 'workflow',
          tags: memory.tags,
        }),
      });

      if (response.data) {
        const created = (response.data as any)?.data ?? (response.data as any)?.memory ?? response.data;
        const serverMemory: CachedMemory = {
          id: created.id,
          title: created.title,
          content: created.content,
          memory_type: created.memory_type,
          tags: created.tags,
          created_at: created.created_at,
          updated_at: created.updated_at,
        };
        await this.markSynced(memory.id, serverMemory);
        console.log('[MemoryCache] Synced memory:', memory.title);
      } else if (response.error) {
        console.warn('[MemoryCache] Create failed:', response.error);
      }
    } catch (err) {
      console.error('[MemoryCache] Failed to sync memory:', err);
    }
  }

  /**
   * Search memories using the SDK (semantic search when online)
   */
  async searchWithApi(query: string): Promise<CachedMemory[]> {
    try {
      const cfg = await this.getAuthConfig();
      if (!cfg || !this.isOnline) {
        // Fallback to local search
        return this.searchLocalAsync(query);
      }

      const response = await this.apiRequest<unknown>(
        '/memories/search',
        {
          method: 'POST',
          body: JSON.stringify({
            query,
            limit: 10,
            threshold: 0.5,
          }),
        }
      );

      if (response.data) {
        const results =
          (response.data as any)?.data?.results ??
          (response.data as any)?.results ??
          (response.data as any)?.data ??
          [];
        if (!Array.isArray(results)) return this.searchLocalAsync(query);

        return (results as MemoryEntry[]).map((r) => ({
          id: r.id,
          title: r.title,
          content: r.content,
          memory_type: r.memory_type,
          tags: r.tags,
          created_at: r.created_at,
          updated_at: r.updated_at,
        })) as CachedMemory[];
      }
    } catch (err) {
      console.error('[MemoryCache] Search API error, falling back to local:', err);
    }

    // Fallback to local search
    return this.searchLocalAsync(query);
  }

  // ============================================
  // Embedding Storage (for on-device AI)
  // ============================================

  /**
   * Get cached embedding for a memory
   */
  async getEmbedding(memoryId: string): Promise<number[] | null> {
    if (!this.db) await this.init();
    const cached = await this.db!.get('embeddings', memoryId);
    return cached?.embedding || null;
  }

  /**
   * Store embedding for a memory
   */
  async storeEmbedding(memoryId: string, embedding: number[], contentHash: string): Promise<void> {
    if (!this.db) await this.init();
    await this.db!.put('embeddings', {
      id: memoryId,
      embedding,
      contentHash,
      createdAt: Date.now(),
    });
  }

  /**
   * Get all cached embeddings
   */
  async getAllEmbeddings(): Promise<Map<string, number[]>> {
    if (!this.db) await this.init();
    const all = await this.db!.getAll('embeddings');
    const map = new Map<string, number[]>();
    for (const item of all) {
      map.set(item.id, item.embedding);
    }
    return map;
  }

  /**
   * Check if embedding is stale (content changed)
   */
  async isEmbeddingStale(memoryId: string, currentContentHash: string): Promise<boolean> {
    if (!this.db) await this.init();
    const cached = await this.db!.get('embeddings', memoryId);
    if (!cached) return true;
    return cached.contentHash !== currentContentHash;
  }

  /**
   * Delete embedding for a memory
   */
  async deleteEmbedding(memoryId: string): Promise<void> {
    if (!this.db) await this.init();
    await this.db!.delete('embeddings', memoryId);
  }

  /**
   * Clear all embeddings
   */
  async clearEmbeddings(): Promise<void> {
    if (!this.db) await this.init();
    await this.db!.clear('embeddings');
    console.log('[MemoryCache] Embeddings cache cleared');
  }

  async clear(): Promise<void> {
    if (!this.db) await this.init();
    await this.db!.clear('memories');
    await this.db!.clear('embeddings');
    await this.db!.clear('meta');
    this.lastSyncAt = null;
  }
}

export type { CachedEmbedding };
