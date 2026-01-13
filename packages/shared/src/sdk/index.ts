/**
 * LanOnasis Shared SDK - Production Ready
 * Connects to the real MaaS API with offline support and local AI
 */

import { Memory, CreateMemoryInput, User, ApiKey } from '../types';

// ============================================
// Configuration
// ============================================

export interface LanonasisConfig {
  baseUrl?: string;
  apiKey?: string;
  organizationId?: string;
  enableOffline?: boolean;
  enableLocalAI?: boolean;
  debugLogging?: boolean;
  onAuthChange?: (authenticated: boolean) => void;
  onSync?: (status: SyncStatus) => void;
  onError?: (error: Error) => void;
}

export interface SyncStatus {
  pending: number;
  lastSync: Date | null;
  isOnline: boolean;
}

// Environment detection
const isNode = typeof window === 'undefined';
const isMobile = !isNode && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

// ============================================
// Offline Queue
// ============================================

interface QueuedOperation {
  id: string;
  action: 'create' | 'update' | 'delete';
  payload: any;
  timestamp: number;
}

class OfflineQueue {
  private queue: QueuedOperation[] = [];
  private storageKey = 'lanonasis_offline_queue';

  constructor() {
    this.load();
  }

  private load() {
    if (isNode) return;
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) this.queue = JSON.parse(stored);
    } catch (e) {
      console.warn('[SDK] Failed to load offline queue:', e);
    }
  }

  private persist() {
    if (isNode) return;
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.queue));
    } catch (e) {
      console.warn('[SDK] Failed to persist offline queue:', e);
    }
  }

  add(action: QueuedOperation['action'], payload: any) {
    const op: QueuedOperation = {
      id: `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      action,
      payload,
      timestamp: Date.now(),
    };
    this.queue.push(op);
    this.persist();
    return op;
  }

  getAll(): QueuedOperation[] {
    return [...this.queue];
  }

  remove(id: string) {
    this.queue = this.queue.filter(op => op.id !== id);
    this.persist();
  }

  clear() {
    this.queue = [];
    this.persist();
  }

  get length() {
    return this.queue.length;
  }
}

// ============================================
// Local Cache
// ============================================

class LocalCache {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private storageKey = 'lanonasis_cache';
  private ttl = 5 * 60 * 1000; // 5 minutes

  constructor() {
    this.load();
  }

  private load() {
    if (isNode) return;
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.cache = new Map(Object.entries(parsed));
      }
    } catch (e) {
      console.warn('[SDK] Failed to load cache:', e);
    }
  }

  private persist() {
    if (isNode) return;
    try {
      const obj = Object.fromEntries(this.cache);
      localStorage.setItem(this.storageKey, JSON.stringify(obj));
    } catch (e) {
      console.warn('[SDK] Failed to persist cache:', e);
    }
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    
    // Check if expired (but still return for offline use)
    const isExpired = Date.now() - entry.timestamp > this.ttl;
    if (isExpired && navigator.onLine) {
      return null; // Expired and online, force refetch
    }
    
    return entry.data as T;
  }

  set(key: string, data: any) {
    this.cache.set(key, { data, timestamp: Date.now() });
    this.persist();
  }

  invalidate(pattern?: string) {
    if (pattern) {
      for (const key of this.cache.keys()) {
        if (key.includes(pattern)) {
          this.cache.delete(key);
        }
      }
    } else {
      this.cache.clear();
    }
    this.persist();
  }
}

// ============================================
// Memory Client
// ============================================

/**
 * Normalize a memory object to ensure all required fields have defaults
 * Handles both camelCase and snake_case from API
 */
function normalizeMemory(memory: any): Memory {
  return {
    id: memory.id || `unknown_${Date.now()}`,
    title: memory.title || '',
    content: memory.content || '',
    type: memory.type || memory.memory_type || 'note',
    tags: Array.isArray(memory.tags) ? memory.tags : [],
    createdAt: memory.createdAt || memory.created_at || new Date().toISOString(),
    updatedAt: memory.updatedAt || memory.updated_at || new Date().toISOString(),
    synced: memory.synced ?? true,
  };
}

class MemoryClient {
  private baseUrl: string;
  private getHeaders: () => HeadersInit;
  private offlineQueue: OfflineQueue;
  private cache: LocalCache;
  private config: LanonasisConfig;
  private debug: (...args: any[]) => void;
  private warn: (...args: any[]) => void;

  constructor(
    baseUrl: string,
    getHeaders: () => HeadersInit,
    config: LanonasisConfig
  ) {
    this.baseUrl = baseUrl;
    this.getHeaders = getHeaders;
    this.config = config;
    this.offlineQueue = new OfflineQueue();
    this.cache = new LocalCache();
    this.debug = (...args: any[]) => {
      if (this.config.debugLogging) console.log(...args);
    };
    this.warn = (...args: any[]) => {
      if (this.config.debugLogging) console.warn(...args);
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = this.getHeaders();

    try {
      const response = await fetch(url, {
        ...options,
        headers: { ...headers, ...options.headers },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || error.error || `API Error: ${response.status}`);
      }

      const data = await response.json();
      
      // Handle wrapped API responses
      // API returns: { data: {...}, message: '...' } or { success: true/false, data: {...} }
      if (data.success !== undefined) {
        if (!data.success) {
          throw new Error(data.error?.message || 'API request failed');
        }
        return data.data as T;
      }
      
      // Handle { data: {...}, message: '...' } format
      if (data.data !== undefined && (data.message !== undefined || typeof data.data === 'object')) {
        return data.data as T;
      }
      
      return data as T;
    } catch (e: any) {
      if (!navigator.onLine && this.config.enableOffline) {
        throw new Error('OFFLINE');
      }
      throw e;
    }
  }

  /**
   * List all memories
   */
  async list(query?: string): Promise<Memory[]> {
    // ALWAYS load from cache first for instant UI
    const cached = this.cache.get<Memory[]>('memories:all') || [];

    // Return cache immediately if offline
    if (!navigator.onLine) {
      this.debug('[SDK] 📴 Offline - returning cached memories:', cached.length);
      return this.filterMemories(cached, query);
    }

    // Try to fetch from API in background
    if (this.config.enableOffline) {
      try {
        const endpoint = query
          ? `/memory?q=${encodeURIComponent(query)}`
          : '/memory';

        this.debug('[SDK] 📡 Fetching memories from API...');
        const rawMemories = await this.request<any[]>(endpoint);

        // Normalize all memories from API
        const memories = (Array.isArray(rawMemories) ? rawMemories : []).map(m => normalizeMemory({ ...m, synced: true }));

        this.debug('[SDK] ✅ Fetched', memories.length, 'memories from API');

        // Merge API memories with temp local ones (keep temp ones with synced: false)
        const tempMemories = cached.filter(m => m.synced === false);
        const mergedMemories = [...tempMemories, ...memories];

        // Update cache
        this.cache.set('memories:all', mergedMemories);

        return this.filterMemories(mergedMemories, query);
      } catch (e) {
        this.warn('[SDK] ⚠️ API fetch failed, using cached memories:', e);
        // Fall back to cache on error
        return this.filterMemories(cached, query);
      }
    }

    // Offline mode disabled - must succeed
    const endpoint = query
      ? `/memory?q=${encodeURIComponent(query)}`
      : '/memory';

    const rawMemories = await this.request<any[]>(endpoint);

    // Normalize all memories from API
    const memories = (Array.isArray(rawMemories) ? rawMemories : []).map(m => normalizeMemory(m));

    // Update cache
    this.cache.set('memories:all', memories);

    return memories;
  }

  private filterMemories(memories: Memory[], query?: string): Memory[] {
    if (!query) return memories;
    
    const lowerQuery = query.toLowerCase();
    return memories.filter(m => 
      m.title.toLowerCase().includes(lowerQuery) ||
      m.content.toLowerCase().includes(lowerQuery) ||
      m.tags?.some(t => t.toLowerCase().includes(lowerQuery))
    );
  }

  /**
   * Semantic search using vector similarity
   */
  async search(query: string, options?: { limit?: number; threshold?: number }): Promise<Memory[]> {
    try {
      const response = await this.request<Memory[]>('/memory/search', {
        method: 'POST',
        body: JSON.stringify({
          query,
          limit: options?.limit || 10,
          threshold: options?.threshold || 0.7,
        }),
      });
      
      return response;
    } catch (e) {
      // Fall back to text search if semantic search fails
      this.warn('[SDK] Semantic search failed, falling back to text search:', e);
      const all = await this.list();
      return this.filterMemories(all, query);
    }
  }

  /**
   * Create a new memory
   */
  async create(input: CreateMemoryInput): Promise<Memory> {
    const payload = {
      title: input.title,
      content: input.content,
      type: input.type || 'note',
      tags: input.tags || [],
    };

    // Create temp memory immediately for offline-first UX
    const tempMemory: Memory = {
      id: `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...payload,
      createdAt: new Date(),
      updatedAt: new Date(),
      synced: false,
    };

    // Update local cache immediately
    const cached = this.cache.get<Memory[]>('memories:all') || [];
    cached.unshift(tempMemory);
    this.cache.set('memories:all', cached);

    // Try to sync with API if online and offline mode enabled
    if (this.config.enableOffline) {
      if (navigator.onLine) {
        // Try API, but don't fail if it errors
        try {
          this.debug('[SDK] 📡 Syncing memory to API...');
          const rawMemory = await this.request<any>('/memory', {
            method: 'POST',
            body: JSON.stringify(payload),
          });

          this.debug('[SDK] ✅ Memory synced to API:', rawMemory);

          // Normalize and mark as synced
          const memory = normalizeMemory({ ...rawMemory, synced: true });

          // Replace temp with real from API
          const updatedCache = cached.map(m => m.id === tempMemory.id ? memory : m);
          this.cache.set('memories:all', updatedCache);

          return memory;
        } catch (e) {
          this.warn('[SDK] ⚠️ API sync failed, queuing for later:', e);
          // Queue for background sync
          this.offlineQueue.add('create', payload);
          return tempMemory;
        }
      } else {
        // Offline - queue for later
        this.debug('[SDK] 📴 Offline - queuing memory for sync');
        this.offlineQueue.add('create', payload);
        return tempMemory;
      }
    }

    // Offline mode disabled - must succeed
    const rawMemory = await this.request<any>('/memory', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    this.cache.invalidate('memories');
    return normalizeMemory(rawMemory);
  }

  /**
   * Update a memory
   */
  async update(id: string, input: Partial<CreateMemoryInput>): Promise<Memory> {
    if (!navigator.onLine && this.config.enableOffline) {
      this.offlineQueue.add('update', { id, ...input });
      
      // Update cache optimistically
      const cached = this.cache.get<Memory[]>('memories:all');
      if (cached) {
        const index = cached.findIndex(m => m.id === id);
        if (index !== -1) {
          cached[index] = { ...cached[index], ...input, synced: false, updatedAt: new Date() };
          this.cache.set('memories:all', cached);
          return cached[index];
        }
      }
      
      throw new Error('Memory not found in cache');
    }

    const memory = await this.request<Memory>(`/memory/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(input),
    });

    this.cache.invalidate('memories');
    return memory;
  }

  /**
   * Delete a memory
   */
  async delete(id: string): Promise<void> {
    if (!navigator.onLine && this.config.enableOffline) {
      this.offlineQueue.add('delete', { id });
      
      // Remove from cache
      const cached = this.cache.get<Memory[]>('memories:all');
      if (cached) {
        const filtered = cached.filter(m => m.id !== id);
        this.cache.set('memories:all', filtered);
      }
      
      return;
    }

    await this.request(`/memory/${id}`, { method: 'DELETE' });
    this.cache.invalidate('memories');
  }

  /**
   * Sync offline changes
   */
  async sync(): Promise<{ synced: number; failed: number }> {
    const queue = this.offlineQueue.getAll();
    let synced = 0;
    let failed = 0;

    for (const op of queue) {
      try {
        switch (op.action) {
          case 'create':
            await this.request('/memory', {
              method: 'POST',
              body: JSON.stringify(op.payload),
            });
            break;
          case 'update':
            const { id, ...updateData } = op.payload;
            await this.request(`/memory/${id}`, {
              method: 'PATCH',
              body: JSON.stringify(updateData),
            });
            break;
          case 'delete':
            await this.request(`/memory/${op.payload.id}`, {
              method: 'DELETE',
            });
            break;
        }
        this.offlineQueue.remove(op.id);
        synced++;
      } catch (e) {
        this.warn(`[SDK] Sync failed for ${op.action}:`, e);
        failed++;
      }
    }

    if (synced > 0) {
      this.cache.invalidate('memories');
    }

    return { synced, failed };
  }

  /**
   * Get sync status
   */
  getSyncStatus(): SyncStatus {
    return {
      pending: this.offlineQueue.length,
      lastSync: null,
      isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    };
  }
}

// ============================================
// Security Client
// ============================================

class SecurityClient {
  private baseUrl: string;
  private getHeaders: () => HeadersInit;

  constructor(baseUrl: string, getHeaders: () => HeadersInit) {
    this.baseUrl = baseUrl;
    this.getHeaders = getHeaders;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: { ...this.getHeaders(), ...options.headers },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.data || data;
  }

  async generateScopedKey(
    name: string,
    scope: 'read' | 'write' | 'read:write',
    environment: 'development' | 'staging' | 'production'
  ): Promise<ApiKey> {
    return this.request('/keys/generate', {
      method: 'POST',
      body: JSON.stringify({ name, scope, environment }),
    });
  }

  async listKeys(): Promise<ApiKey[]> {
    return this.request('/keys');
  }

  async rotateKey(id: string): Promise<ApiKey> {
    return this.request(`/keys/${id}/rotate`, { method: 'POST' });
  }

  async revokeKey(id: string): Promise<void> {
    await this.request(`/keys/${id}/revoke`, { method: 'POST' });
  }
}

// ============================================
// Main Client
// ============================================

export class LanonasisClient {
  private config: LanonasisConfig;
  private token: string | null = null;
  private user: User | null = null;

  public memory: MemoryClient;
  public security: SecurityClient;
  private debug: (...args: any[]) => void;

  constructor(config: LanonasisConfig = {}) {
    this.config = {
      baseUrl: config.baseUrl || 'https://api.lanonasis.com/api/v1',
      enableOffline: config.enableOffline ?? true,
      enableLocalAI: config.enableLocalAI ?? true,
      debugLogging: config.debugLogging ?? false,
      ...config,
    };
    this.debug = (...args: any[]) => {
      if (this.config.debugLogging) console.log(...args);
    };

    // Use API key if provided
    if (config.apiKey) {
      this.token = config.apiKey;
    }

    // Load persisted session
    this.loadSession();

    const getHeaders = (): HeadersInit => {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (this.token) {
        headers['Authorization'] = `Bearer ${this.token}`;
      }

      // Note: X-Organization-ID header removed due to CORS restrictions
      // Organization ID will be inferred from the API key on the backend

      return headers;
    };

    this.memory = new MemoryClient(this.config.baseUrl!, getHeaders, this.config);
    this.security = new SecurityClient(this.config.baseUrl!, getHeaders);

    // Online/offline listeners
    if (!isNode) {
      window.addEventListener('online', () => this.handleOnline());
      window.addEventListener('offline', () => this.handleOffline());
    }
  }

  private loadSession() {
    if (isNode) return;
    try {
      const stored = localStorage.getItem('lanonasis_session');
      if (stored) {
        const session = JSON.parse(stored);
        this.token = session.token;
        this.user = session.user;
      }
    } catch (e) {
      this.debug('[SDK] Failed to load session:', e);
    }
  }

  private persistSession() {
    if (isNode) return;
    try {
      if (this.token && this.user) {
        localStorage.setItem(
          'lanonasis_session',
          JSON.stringify({ token: this.token, user: this.user })
        );
      } else {
        localStorage.removeItem('lanonasis_session');
      }
    } catch (e) {
      this.debug('[SDK] Failed to persist session:', e);
    }
  }

  private handleOnline() {
    this.debug('[SDK] 📶 Back online - syncing...');
    this.memory.sync().then(({ synced, failed }) => {
      if (synced > 0 || failed > 0) {
        this.debug(`[SDK] ✅ Synced ${synced} items, ${failed} failed`);
      }
    });
  }

  private handleOffline() {
    this.debug('[SDK] 📴 Offline - changes will be queued');
  }

  /**
   * Authenticate (demo mode for hackathon)
   */
  async login(email?: string, password?: string): Promise<User> {
    // For hackathon demo, simulate auth
    if (!email || !password) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.user = {
        id: 'demo-user',
        name: 'Demo User',
        email: 'demo@lanonasis.com',
      };
      this.token = this.config.apiKey || 'demo-token';
      this.persistSession();
      this.config.onAuthChange?.(true);
      
      return this.user;
    }

    // Real auth flow
    const response = await fetch(`${this.config.baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Authentication failed');
    }

    const data = await response.json();
    this.token = data.token || data.data?.token;
    this.user = data.user || data.data?.user;
    this.persistSession();
    this.config.onAuthChange?.(true);

    return this.user!;
  }

  /**
   * Logout
   */
  logout() {
    this.token = null;
    this.user = null;
    this.persistSession();
    this.config.onAuthChange?.(false);
  }

  get isAuthenticated(): boolean {
    return !!this.token;
  }

  get currentUser(): User | null {
    return this.user;
  }

  /**
   * SDK info for debugging
   */
  getInfo() {
    return {
      version: '2.0.0-hackathon',
      platform: isNode ? 'node' : isMobile ? 'mobile' : 'web',
      features: {
        offline: this.config.enableOffline,
        localAI: this.config.enableLocalAI,
      },
      sync: this.memory.getSyncStatus(),
    };
  }
}

export default LanonasisClient;
