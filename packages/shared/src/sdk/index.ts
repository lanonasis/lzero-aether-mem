/**
 * LanOnasis Shared SDK
 * Cross-platform Memory-as-a-Service client
 * Works in VS Code, Web Dashboard, Mobile PWA, and CLI
 */

import { Memory, CreateMemoryInput, SearchOptions, ApiKey, User } from '../types';
import { LocalEmbeddingEngine } from '../ai/embeddings';

// Environment detection
const isNode = typeof window === 'undefined';
const isMobile = !isNode && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

export interface LanonasisConfig {
  baseUrl?: string;
  apiKey?: string;
  enableOffline?: boolean;
  enableLocalAI?: boolean;
  onAuthChange?: (authenticated: boolean) => void;
}

export interface SyncStatus {
  pending: number;
  lastSync: Date | null;
  isOnline: boolean;
}

class OfflineQueue {
  private queue: Array<{ action: string; payload: any; timestamp: number }> = [];
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
      console.warn('Failed to load offline queue:', e);
    }
  }

  private persist() {
    if (isNode) return;
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.queue));
    } catch (e) {
      console.warn('Failed to persist offline queue:', e);
    }
  }

  add(action: string, payload: any) {
    this.queue.push({ action, payload, timestamp: Date.now() });
    this.persist();
  }

  getAll() {
    return [...this.queue];
  }

  clear() {
    this.queue = [];
    this.persist();
  }

  get length() {
    return this.queue.length;
  }
}

class MemoryClient {
  private baseUrl: string;
  private getToken: () => string | null;
  private embeddingEngine: LocalEmbeddingEngine | null = null;
  private offlineQueue: OfflineQueue;
  private cache: Map<string, { data: Memory[]; timestamp: number }> = new Map();
  private cacheTimeout = 5 * 60 * 1000; // 5 minutes

  constructor(
    baseUrl: string,
    getToken: () => string | null,
    private config: LanonasisConfig
  ) {
    this.baseUrl = baseUrl;
    this.getToken = getToken;
    this.offlineQueue = new OfflineQueue();

    if (config.enableLocalAI && !isNode) {
      this.initLocalAI();
    }
  }

  private async initLocalAI() {
    try {
      this.embeddingEngine = new LocalEmbeddingEngine();
      await this.embeddingEngine.initialize();
      console.log('🧠 Local AI engine initialized on ARM device');
    } catch (e) {
      console.warn('Local AI not available:', e);
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, { ...options, headers });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `API Error: ${response.status}`);
      }

      return response.json();
    } catch (e) {
      // Offline handling
      if (this.config.enableOffline && !navigator.onLine) {
        throw new Error('OFFLINE');
      }
      throw e;
    }
  }

  /**
   * List memories with optional search query
   * Uses local cache when offline
   */
  async list(query?: string): Promise<Memory[]> {
    const cacheKey = `list:${query || 'all'}`;
    const cached = this.cache.get(cacheKey);

    // Return cache if fresh or offline
    if (cached && (Date.now() - cached.timestamp < this.cacheTimeout || !navigator.onLine)) {
      let results = cached.data;
      if (query) {
        results = results.filter(
          m =>
            m.title.toLowerCase().includes(query.toLowerCase()) ||
            m.content.toLowerCase().includes(query.toLowerCase())
        );
      }
      return results;
    }

    try {
      const endpoint = query
        ? `/memory?q=${encodeURIComponent(query)}`
        : '/memory';
      const response = await this.request<{ data: Memory[] }>(endpoint);
      const memories = response.data || [];
      
      // Update cache
      this.cache.set(cacheKey, { data: memories, timestamp: Date.now() });
      
      return memories;
    } catch (e) {
      if (cached) return cached.data;
      throw e;
    }
  }

  /**
   * Semantic search using vector similarity
   * Generates embeddings locally on ARM device when available
   */
  async search(query: string, options?: SearchOptions): Promise<Memory[]> {
    // Generate local embedding if available (ARM optimization)
    let localEmbedding: number[] | null = null;
    if (this.embeddingEngine?.isReady) {
      console.log('🚀 Generating embedding locally on ARM...');
      const startTime = performance.now();
      localEmbedding = await this.embeddingEngine.embed(query);
      const elapsed = performance.now() - startTime;
      console.log(`⚡ Local embedding generated in ${elapsed.toFixed(0)}ms`);
    }

    const payload: any = {
      query,
      limit: options?.limit || 10,
      threshold: options?.threshold || 0.7,
    };

    // Include local embedding for server-side comparison
    if (localEmbedding) {
      payload.embedding = localEmbedding;
    }

    const response = await this.request<{ data: Memory[] }>('/memory/search', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return response.data || [];
  }

  /**
   * Create a new memory
   * Generates embedding locally for offline queuing
   */
  async create(input: CreateMemoryInput): Promise<Memory> {
    // Generate local embedding for immediate use
    let embedding: number[] | undefined;
    if (this.embeddingEngine?.isReady) {
      const text = `${input.title} ${input.content}`;
      embedding = await this.embeddingEngine.embed(text);
    }

    const payload = { ...input, embedding };

    // Handle offline mode
    if (!navigator.onLine && this.config.enableOffline) {
      const tempMemory: Memory = {
        id: `temp_${Date.now()}`,
        title: input.title,
        content: input.content,
        type: input.type || 'note',
        tags: input.tags || [],
        createdAt: new Date(),
        updatedAt: new Date(),
        synced: false,
      };

      this.offlineQueue.add('create', payload);
      
      // Update local cache
      const cached = this.cache.get('list:all');
      if (cached) {
        cached.data.unshift(tempMemory);
        this.cache.set('list:all', cached);
      }

      return tempMemory;
    }

    const response = await this.request<{ data: Memory }>('/memory', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return response.data;
  }

  /**
   * Update an existing memory
   */
  async update(id: string, input: Partial<CreateMemoryInput>): Promise<Memory> {
    if (!navigator.onLine && this.config.enableOffline) {
      this.offlineQueue.add('update', { id, ...input });
      
      // Update local cache optimistically
      const cached = this.cache.get('list:all');
      if (cached) {
        const index = cached.data.findIndex(m => m.id === id);
        if (index !== -1) {
          cached.data[index] = { ...cached.data[index], ...input, synced: false };
        }
      }
      
      return cached?.data.find(m => m.id === id) as Memory;
    }

    const response = await this.request<{ data: Memory }>(`/memory/${id}`, {
      method: 'PUT',
      body: JSON.stringify(input),
    });
    return response.data;
  }

  /**
   * Delete a memory
   */
  async delete(id: string): Promise<void> {
    if (!navigator.onLine && this.config.enableOffline) {
      this.offlineQueue.add('delete', { id });
      
      // Remove from cache optimistically
      const cached = this.cache.get('list:all');
      if (cached) {
        cached.data = cached.data.filter(m => m.id !== id);
      }
      
      return;
    }

    await this.request(`/memory/${id}`, { method: 'DELETE' });
  }

  /**
   * Sync offline changes when back online
   */
  async sync(): Promise<{ synced: number; failed: number }> {
    const queue = this.offlineQueue.getAll();
    let synced = 0;
    let failed = 0;

    for (const item of queue) {
      try {
        switch (item.action) {
          case 'create':
            await this.request('/memories', {
              method: 'POST',
              body: JSON.stringify(item.payload),
            });
            break;
          case 'update':
            const { id, ...updateData } = item.payload;
            await this.request(`/memories/${id}`, {
              method: 'PATCH',
              body: JSON.stringify(updateData),
            });
            break;
          case 'delete':
            await this.request(`/memories/${item.payload.id}`, {
              method: 'DELETE',
            });
            break;
        }
        synced++;
      } catch (e) {
        console.error(`Failed to sync ${item.action}:`, e);
        failed++;
      }
    }

    if (synced > 0) {
      this.offlineQueue.clear();
      // Refresh cache
      this.cache.clear();
    }

    return { synced, failed };
  }

  /**
   * Get sync status
   */
  getSyncStatus(): SyncStatus {
    return {
      pending: this.offlineQueue.length,
      lastSync: null, // TODO: Track this
      isOnline: navigator.onLine,
    };
  }

  /**
   * Get local AI status
   */
  getAIStatus() {
    return {
      available: this.embeddingEngine?.isReady || false,
      model: this.embeddingEngine?.modelName || null,
      device: isMobile ? 'ARM Mobile' : 'Desktop',
    };
  }
}

class SecurityClient {
  private baseUrl: string;
  private getToken: () => string | null;

  constructor(baseUrl: string, getToken: () => string | null) {
    this.baseUrl = baseUrl;
    this.getToken = getToken;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, { ...options, headers });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Generate a scoped API key
   */
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

  /**
   * List all API keys
   */
  async listKeys(): Promise<ApiKey[]> {
    return this.request('/keys');
  }

  /**
   * Rotate an API key
   */
  async rotateKey(id: string): Promise<ApiKey> {
    return this.request(`/keys/${id}/rotate`, { method: 'POST' });
  }

  /**
   * Revoke an API key
   */
  async revokeKey(id: string): Promise<void> {
    await this.request(`/keys/${id}/revoke`, { method: 'POST' });
  }
}

/**
 * Main LanOnasis SDK Client
 */
export class LanonasisClient {
  private config: LanonasisConfig;
  private token: string | null = null;
  private user: User | null = null;

  public memory: MemoryClient;
  public security: SecurityClient;

  constructor(config: LanonasisConfig = {}) {
    this.config = {
      baseUrl: config.baseUrl || 'https://api.lanonasis.com/api/v1',
      enableOffline: config.enableOffline ?? true,
      enableLocalAI: config.enableLocalAI ?? true,
      ...config,
    };

    // Load persisted session first
    this.loadSession();
    
    // API key takes precedence over persisted session
    if (config.apiKey) {
      this.token = config.apiKey;
    }

    this.memory = new MemoryClient(
      this.config.baseUrl!,
      () => this.token,
      this.config
    );

    this.security = new SecurityClient(
      this.config.baseUrl!,
      () => this.token
    );

    // Setup online/offline listeners
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
      console.warn('Failed to load session:', e);
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
      console.warn('Failed to persist session:', e);
    }
  }

  private handleOnline() {
    console.log('📶 Back online - syncing...');
    this.memory.sync().then(({ synced, failed }) => {
      console.log(`✅ Synced ${synced} items, ${failed} failed`);
    });
  }

  private handleOffline() {
    console.log('📴 Offline - changes will be queued');
  }

  /**
   * Authenticate with email/password
   */
  async login(email: string, password: string): Promise<User> {
    const response = await fetch(`${this.config.baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Authentication failed');
    }

    const data = await response.json();
    this.token = data.token;
    this.user = data.user;
    this.persistSession();
    this.config.onAuthChange?.(true);

    return data.user;
  }

  /**
   * Authenticate with OAuth (browser redirect)
   */
  async loginWithOAuth(provider: 'google' | 'github'): Promise<void> {
    const callbackUrl = encodeURIComponent(window.location.href);
    window.location.href = `${this.config.baseUrl}/auth/${provider}?callback=${callbackUrl}`;
  }

  /**
   * Handle OAuth callback
   */
  async handleOAuthCallback(): Promise<User | null> {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    
    if (token) {
      this.token = token;
      
      // Fetch user info
      const response = await fetch(`${this.config.baseUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        this.user = await response.json();
        this.persistSession();
        this.config.onAuthChange?.(true);
        
        // Clean up URL
        window.history.replaceState({}, '', window.location.pathname);
        
        return this.user;
      }
    }

    return null;
  }

  /**
   * Logout and clear session
   */
  logout() {
    this.token = null;
    this.user = null;
    this.persistSession();
    this.config.onAuthChange?.(false);
  }

  /**
   * Check if authenticated
   */
  get isAuthenticated(): boolean {
    return !!this.token;
  }

  /**
   * Get current user
   */
  get currentUser(): User | null {
    return this.user;
  }

  /**
   * Get SDK info
   */
  getInfo() {
    return {
      version: '2.0.0-hackathon',
      platform: isNode ? 'node' : isMobile ? 'mobile' : 'web',
      features: {
        offline: this.config.enableOffline,
        localAI: this.config.enableLocalAI,
      },
      ai: this.memory.getAIStatus(),
      sync: this.memory.getSyncStatus(),
    };
  }
}

// React hook for easy integration
export { useLanonasis } from './react-hooks';

// Default export
export default LanonasisClient;
