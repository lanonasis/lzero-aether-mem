/**
 * Memory Cache
 * IndexedDB-based offline cache with sync queue
 * Uses @lanonasis/memory-client for API consistency
 */

import { openDB, type IDBPDatabase, type DBSchema } from 'idb';
import {
  createMemoryClient,
  type CoreMemoryClient,
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
const API_URL = 'https://lanonasis.supabase.co';

export class MemoryCache {
  private db: IDBPDatabase<MemoryDB> | null = null;
  private client: CoreMemoryClient | null = null;
  private isOnline = true;
  private isSyncing = false;
  private lastSyncAt: number | null = null;

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

    // Check online status
    this.isOnline = navigator.onLine;
    self.addEventListener('online', () => { this.isOnline = true; });
    self.addEventListener('offline', () => { this.isOnline = false; });

    console.log('[MemoryCache] Initialized');
  }

  /**
   * Get or create the memory client with current auth token
   */
  private async getClient(): Promise<CoreMemoryClient | null> {
    const { authToken } = await chrome.storage.local.get('authToken');
    if (!authToken) {
      console.log('[MemoryCache] No auth token available');
      return null;
    }

    if (!this.client) {
      this.client = createMemoryClient({
        apiUrl: API_URL,
        authToken,
        timeout: 15000,
        onError: (error) => {
          console.error('[MemoryCache] API Error:', error.message, error);
          // Mark offline only for network errors
          if (error.message?.includes('fetch') || error.message?.includes('network')) {
            this.isOnline = false;
          }
        },
      });
    } else {
      // Update token in case it changed
      this.client.setAuthToken(authToken);
    }

    return this.client;
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
      const client = await this.getClient();
      if (!client) {
        console.log('[MemoryCache] No auth token, skipping sync');
        return;
      }

      // Sync pending memories first
      const pending = await this.getPendingMemories();
      for (const mem of pending) {
        await this.syncOne(mem);
      }

      // Fetch latest from API using SDK
      const response = await client.listMemories({ limit: 100 });

      if (response.data) {
        const memories = response.data.data.map((m: MemoryEntry) => ({
          id: m.id,
          title: m.title,
          content: m.content,
          memory_type: m.memory_type,
          tags: m.tags,
          created_at: m.created_at,
          updated_at: m.updated_at,
        })) as CachedMemory[];
        await this.updateFromApi(memories);
      }
    } catch (err) {
      console.error('[MemoryCache] Sync error:', err);
    } finally {
      this.isSyncing = false;
    }
  }

  private async syncOne(memory: CachedMemory): Promise<void> {
    try {
      const client = await this.getClient();
      if (!client) return;

      // Use SDK to create memory
      const response = await client.createMemory({
        title: memory.title,
        content: memory.content,
        memory_type: memory.memory_type as 'context' | 'project' | 'knowledge' | 'reference' | 'personal' | 'workflow',
        tags: memory.tags,
      });

      if (response.data) {
        const serverMemory: CachedMemory = {
          id: response.data.id,
          title: response.data.title,
          content: response.data.content,
          memory_type: response.data.memory_type,
          tags: response.data.tags,
          created_at: response.data.created_at,
          updated_at: response.data.updated_at,
        };
        await this.markSynced(memory.id, serverMemory);
        console.log('[MemoryCache] Synced memory:', memory.title);
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
      const client = await this.getClient();
      if (!client || !this.isOnline) {
        // Fallback to local search
        return this.searchLocalAsync(query);
      }

      const response = await client.searchMemories({
        query,
        limit: 10,
        status: 'active',
        threshold: 0.5,
      });

      if (response.data?.results) {
        return response.data.results.map((r) => ({
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

    // Clear client auth
    if (this.client) {
      this.client.clearAuth();
      this.client = null;
    }
  }
}

export type { CachedEmbedding };
