/**
 * Memory Cache for VS Code Extension
 * Provides offline-first caching using globalState
 * Syncs with API when online
 */

import * as vscode from 'vscode';

// Use environment variable if available, fall back to default
const SUPABASE_ORIGIN = process.env.SUPABASE_URL || 'https://mxtsdgkwzjzlttpotole.supabase.co';
const SYSTEM_HEALTH_URL = `${SUPABASE_ORIGIN}/functions/v1/system-health`;

export interface CachedMemory {
  id: string;
  title: string;
  content: string;
  memory_type: string;
  tags: string[];
  created_at: string;
  updated_at: string;
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

const CACHE_KEYS = {
  MEMORIES: 'lzero.memories.cache',
  PENDING_QUEUE: 'lzero.memories.pending',
  LAST_SYNC: 'lzero.memories.lastSync',
} as const;

export class MemoryCache {
  private memories: CachedMemory[] = [];
  private pendingQueue: CachedMemory[] = [];
  private lastSyncAt: number | null = null;
  private isSyncing = false;
  private isOnline = true;

  constructor(
    private readonly context: vscode.ExtensionContext,
    private readonly output: vscode.OutputChannel,
  ) {
    this.loadFromStorage();
    this.setupNetworkListener();
  }

  private loadFromStorage(): void {
    try {
      const cached = this.context.globalState.get<CachedMemory[]>(CACHE_KEYS.MEMORIES, []);
      const pending = this.context.globalState.get<CachedMemory[]>(CACHE_KEYS.PENDING_QUEUE, []);
      const lastSync = this.context.globalState.get<number | null>(CACHE_KEYS.LAST_SYNC, null);

      this.memories = cached;
      this.pendingQueue = pending;
      this.lastSyncAt = lastSync;

      this.output.appendLine(`[MemoryCache] Loaded ${this.memories.length} cached memories, ${this.pendingQueue.length} pending`);
    } catch (err) {
      this.output.appendLine(`[MemoryCache] Load error: ${err}`);
    }
  }

  private async saveToStorage(): Promise<void> {
    try {
      await this.context.globalState.update(CACHE_KEYS.MEMORIES, this.memories);
      await this.context.globalState.update(CACHE_KEYS.PENDING_QUEUE, this.pendingQueue);
      await this.context.globalState.update(CACHE_KEYS.LAST_SYNC, this.lastSyncAt);
    } catch (err) {
      this.output.appendLine(`[MemoryCache] Save error: ${err}`);
    }
  }

  private setupNetworkListener(): void {
    // VS Code doesn't have window.navigator.onLine, so we use a periodic health check
    // and infer network state from API response success/failure
    this.isOnline = true;

    // Periodic connectivity check every 30 seconds when extension is active
    this.startConnectivityCheck();
  }

  private connectivityCheckInterval: NodeJS.Timeout | null = null;

  private startConnectivityCheck(): void {
    // Don't start multiple intervals
    if (this.connectivityCheckInterval) return;

    this.connectivityCheckInterval = setInterval(async () => {
      try {
        // Use a lightweight health check endpoint
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(SYSTEM_HEALTH_URL, {
          method: 'GET',
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const wasOffline = !this.isOnline;
        this.isOnline = response.ok;

        if (wasOffline && this.isOnline) {
          this.output.appendLine('[MemoryCache] Network restored - online');
        }
      } catch (err) {
        if (this.isOnline) {
          this.output.appendLine('[MemoryCache] Network check failed - marking offline');
        }
        this.isOnline = false;
      }
    }, 30000); // Check every 30 seconds
  }

  public stopConnectivityCheck(): void {
    if (this.connectivityCheckInterval) {
      clearInterval(this.connectivityCheckInterval);
      this.connectivityCheckInterval = null;
    }
  }

  public getStatus(): SyncStatus {
    return {
      isOnline: this.isOnline,
      lastSyncAt: this.lastSyncAt,
      pendingCount: this.pendingQueue.length,
      isSyncing: this.isSyncing,
    };
  }

  public getMemories(): CachedMemory[] {
    return [...this.memories];
  }

  public getPendingQueue(): CachedMemory[] {
    return [...this.pendingQueue];
  }

  public getMemoryById(id: string): CachedMemory | undefined {
    return this.memories.find(m => m.id === id || m._localId === id);
  }

  public async clearAll(): Promise<void> {
    this.memories = [];
    this.pendingQueue = [];
    this.lastSyncAt = null;
    await this.saveToStorage();
  }

  /**
   * Update cache with fresh data from API
   */
  public async updateFromApi(apiMemories: CachedMemory[]): Promise<void> {
    this.memories = apiMemories.map(m => ({
      ...m,
      _cachedAt: Date.now(),
    }));
    this.lastSyncAt = Date.now();
    this.isOnline = true;
    await this.saveToStorage();
    this.output.appendLine(`[MemoryCache] Updated cache with ${apiMemories.length} memories from API`);
  }

  /**
   * Add a memory locally (queued for sync if offline)
   */
  public async addLocal(memory: Omit<CachedMemory, 'id' | 'created_at' | 'updated_at'>): Promise<CachedMemory> {
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

    this.memories.unshift(newMemory);
    this.pendingQueue.push(newMemory);
    await this.saveToStorage();

    this.output.appendLine(`[MemoryCache] Added local memory: ${newMemory.title}`);
    return newMemory;
  }

  /**
   * Mark a memory as synced (replace local ID with server ID)
   */
  public async markSynced(localId: string, serverMemory: CachedMemory): Promise<void> {
    // Update in memories array
    const idx = this.memories.findIndex(m => m.id === localId || m._localId === localId);
    if (idx !== -1) {
      this.memories[idx] = {
        ...serverMemory,
        _pending: undefined,
        _localId: undefined,
        _cachedAt: Date.now(),
      };
    }

    // Remove from pending queue
    this.pendingQueue = this.pendingQueue.filter(m => m._localId !== localId && m.id !== localId);
    await this.saveToStorage();
  }

  /**
   * Remove a pending item (after successful delete sync)
   */
  public async removePending(id: string): Promise<void> {
    this.pendingQueue = this.pendingQueue.filter(m => m.id !== id && m._localId !== id);
    this.memories = this.memories.filter(m => m.id !== id);
    await this.saveToStorage();
  }

  /**
   * Queue a memory update for sync
   */
  public async queueUpdate(id: string, updates: Partial<CachedMemory>): Promise<void> {
    const idx = this.memories.findIndex(m => m.id === id);
    if (idx === -1) {
      this.output.appendLine(`[MemoryCache] queueUpdate: memory not found for id ${id}`);
      return;
    }

    const existingPending = this.memories[idx]._pending;

    this.memories[idx] = {
      ...this.memories[idx],
      ...updates,
      updated_at: new Date().toISOString(),
      _pending: existingPending === 'create' ? 'create' : 'update',
      _cachedAt: Date.now(),
    };

    // Add to pending queue if not already there
    const pendingIdx = this.pendingQueue.findIndex(m => m.id === id);
    if (pendingIdx !== -1) {
      this.pendingQueue[pendingIdx] = this.memories[idx];
    } else {
      this.pendingQueue.push(this.memories[idx]);
    }

    await this.saveToStorage();
  }

  /**
   * Queue a memory delete for sync
   */
  public async queueDelete(id: string): Promise<void> {
    const memory = this.memories.find(m => m.id === id);
    if (memory) {
      // If it's a local-only memory that hasn't been synced, just remove it
      if (memory._localId && memory._pending === 'create') {
        this.memories = this.memories.filter(m => m.id !== id);
        this.pendingQueue = this.pendingQueue.filter(m => m.id !== id);
      } else {
        // Mark for deletion and add to pending queue
        const deleteMemory = { ...memory, _pending: 'delete' as const };
        this.memories = this.memories.filter(m => m.id !== id);

        const pendingIdx = this.pendingQueue.findIndex(m => m.id === id);
        if (pendingIdx !== -1) {
          this.pendingQueue[pendingIdx] = deleteMemory;
        } else {
          this.pendingQueue.push(deleteMemory);
        }
      }
      await this.saveToStorage();
    }
  }

  /**
   * Search memories locally (simple text match)
   */
  public searchLocal(query: string): CachedMemory[] {
    const q = query.toLowerCase();
    return this.memories.filter(m =>
      m.title.toLowerCase().includes(q) ||
      m.content.toLowerCase().includes(q) ||
      m.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  /**
   * Semantic search using natural language patterns
   * This is a simple keyword-based approach for the extension
   * Real semantic search happens via API
   */
  public semanticSearchLocal(query: string): CachedMemory[] {
    const q = query.toLowerCase();

    // Extract intent keywords
    const findPatterns = [
      /find\s+(?:my\s+)?(.+)/i,
      /search\s+(?:for\s+)?(.+)/i,
      /show\s+(?:me\s+)?(.+)/i,
      /get\s+(?:my\s+)?(.+)/i,
      /recall\s+(.+)/i,
      /what\s+(?:was|were|is|are)\s+(?:my\s+)?(.+)/i,
      /where\s+(?:is|are|did)\s+(?:my\s+)?(.+)/i,
    ];

    let searchTerms = q;
    for (const pattern of findPatterns) {
      const match = q.match(pattern);
      if (match) {
        searchTerms = match[1] || match[2] || q;
        break;
      }
    }

    // Remove common words
    const stopWords = ['the', 'a', 'an', 'my', 'that', 'this', 'about', 'notes', 'note', 'memory', 'memories'];
    const keywords = searchTerms
      .split(/\s+/)
      .filter(w => w.length > 2 && !stopWords.includes(w));

    if (keywords.length === 0) {
      return this.memories.slice(0, 5);
    }

    // Score each memory
    const scored = this.memories.map(m => {
      let score = 0;
      const titleLower = m.title.toLowerCase();
      const contentLower = m.content.toLowerCase();
      const tagsLower = m.tags.map(t => t.toLowerCase());

      for (const kw of keywords) {
        if (titleLower.includes(kw)) score += 3;
        if (contentLower.includes(kw)) score += 1;
        if (tagsLower.some(t => t.includes(kw))) score += 2;
      }

      return { memory: m, score };
    });

    return scored
      .filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map(s => s.memory);
  }

  public setOnline(online: boolean): void {
    this.isOnline = online;
  }

  public setSyncing(syncing: boolean): void {
    this.isSyncing = syncing;
  }
}
