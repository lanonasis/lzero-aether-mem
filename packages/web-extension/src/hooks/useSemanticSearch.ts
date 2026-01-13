/**
 * Semantic Search Hook for Web Extension
 * Uses LocalEmbeddingEngine from @lanonasis/shared for on-device AI search
 *
 * Progressive enhancement:
 * 1. Local AI embeddings (when ready)
 * 2. API semantic search (when online)
 * 3. Keyword matching (fallback)
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { openDB, type IDBPDatabase } from 'idb';
import { getLocalAIEngine, type LocalEmbeddingEngine } from '@lanonasis/shared';

interface CachedEmbedding {
  id: string;
  embedding: number[];
  contentHash: string;
  createdAt: number;
}

interface EmbeddingDB {
  embeddings: {
    key: string;
    value: CachedEmbedding;
  };
}

interface Memory {
  id: string;
  title: string;
  content: string;
  memory_type: string;
  tags: string[];
  created_at: string;
  _pending?: string;
}

interface SemanticSearchState {
  isAIReady: boolean;
  isAILoading: boolean;
  loadProgress: number;
  error: string | null;
  deviceInfo: string;
}

interface SemanticSearchResult extends Memory {
  score: number;
  searchMethod: 'ai' | 'api' | 'keyword';
}

const DB_NAME = 'l0-embeddings-cache';
const DB_VERSION = 1;

// Simple hash function for content change detection
function hashContent(content: string): string {
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

export function useSemanticSearch() {
  const [state, setState] = useState<SemanticSearchState>({
    isAIReady: false,
    isAILoading: false,
    loadProgress: 0,
    error: null,
    deviceInfo: '',
  });

  const engineRef = useRef<LocalEmbeddingEngine | null>(null);
  const dbRef = useRef<IDBPDatabase<EmbeddingDB> | null>(null);
  const initPromiseRef = useRef<Promise<void> | null>(null);

  // Initialize IndexedDB for embedding storage
  const initDB = useCallback(async () => {
    if (dbRef.current) return dbRef.current;

    dbRef.current = await openDB<EmbeddingDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('embeddings')) {
          db.createObjectStore('embeddings', { keyPath: 'id' });
        }
      },
    });

    return dbRef.current;
  }, []);

  // Initialize the AI engine
  const initializeAI = useCallback(async () => {
    if (initPromiseRef.current) return initPromiseRef.current;
    if (state.isAIReady || state.isAILoading) return;

    initPromiseRef.current = (async () => {
      setState(prev => ({ ...prev, isAILoading: true, error: null }));

      try {
        console.log('[SemanticSearch] 🧠 Initializing on-device AI...');
        const engine = getLocalAIEngine();

        // Poll for progress
        const progressInterval = setInterval(() => {
          if (engine.loadProgress !== undefined) {
            setState(prev => ({ ...prev, loadProgress: engine.loadProgress }));
          }
        }, 100);

        await engine.initialize();

        clearInterval(progressInterval);
        engineRef.current = engine;

        setState({
          isAIReady: true,
          isAILoading: false,
          loadProgress: 100,
          error: null,
          deviceInfo: engine.getDeviceInfo(),
        });

        console.log('[SemanticSearch] ✅ AI ready on:', engine.getDeviceInfo());

        // Initialize DB
        await initDB();
      } catch (err) {
        console.error('[SemanticSearch] ❌ AI init failed:', err);
        setState(prev => ({
          ...prev,
          isAILoading: false,
          error: err instanceof Error ? err.message : 'AI initialization failed',
        }));
        initPromiseRef.current = null;
      }
    })();

    return initPromiseRef.current;
  }, [state.isAIReady, state.isAILoading, initDB]);

  // Get or generate embedding for a memory
  const getEmbedding = useCallback(async (memory: Memory): Promise<number[] | null> => {
    if (!engineRef.current || !dbRef.current) return null;

    const contentHash = hashContent(memory.title + ' ' + memory.content);

    // Check cache first
    const cached = await dbRef.current.get('embeddings', memory.id);
    if (cached && cached.contentHash === contentHash) {
      return cached.embedding;
    }

    // Generate new embedding
    try {
      const text = `${memory.title}. ${memory.content}`;
      const embedding = await engineRef.current.embed(text);

      // Cache it
      await dbRef.current.put('embeddings', {
        id: memory.id,
        embedding,
        contentHash,
        createdAt: Date.now(),
      });

      return embedding;
    } catch (err) {
      console.error('[SemanticSearch] Embedding failed for:', memory.id, err);
      return null;
    }
  }, []);

  // Generate embeddings for all memories (background task)
  const generateEmbeddings = useCallback(async (memories: Memory[]): Promise<void> => {
    if (!engineRef.current) return;

    console.log('[SemanticSearch] Generating embeddings for', memories.length, 'memories...');

    for (const memory of memories) {
      await getEmbedding(memory);
    }

    console.log('[SemanticSearch] ✅ Embeddings generated');
  }, [getEmbedding]);

  // Semantic search using AI
  const searchWithAI = useCallback(async (
    query: string,
    memories: Memory[],
    limit = 10
  ): Promise<SemanticSearchResult[]> => {
    if (!engineRef.current) {
      console.log('[SemanticSearch] AI not ready, falling back to keyword search');
      return searchWithKeywords(query, memories, limit);
    }

    try {
      console.log('[SemanticSearch] 🔍 AI search for:', query);
      const startTime = performance.now();

      // Get query embedding
      const queryEmbedding = await engineRef.current.embed(query);

      // Get embeddings for all memories and score them
      const scored: SemanticSearchResult[] = [];

      for (const memory of memories) {
        const embedding = await getEmbedding(memory);
        if (embedding) {
          const score = engineRef.current.cosineSimilarity(queryEmbedding, embedding);
          scored.push({ ...memory, score, searchMethod: 'ai' });
        } else {
          // Fall back to keyword score for memories without embeddings
          const keywordScore = keywordScore_internal(query, memory);
          scored.push({ ...memory, score: keywordScore, searchMethod: 'keyword' });
        }
      }

      // Sort by score descending
      scored.sort((a, b) => b.score - a.score);

      const elapsed = performance.now() - startTime;
      console.log(`[SemanticSearch] ⚡ AI search completed in ${elapsed.toFixed(0)}ms`);

      // Filter by threshold and limit
      return scored
        .filter(r => r.score > 0.3)
        .slice(0, limit);
    } catch (err) {
      console.error('[SemanticSearch] AI search failed:', err);
      return searchWithKeywords(query, memories, limit);
    }
  }, [getEmbedding]);

  // Keyword search fallback
  const searchWithKeywords = useCallback((
    query: string,
    memories: Memory[],
    limit = 10
  ): SemanticSearchResult[] => {
    console.log('[SemanticSearch] 📝 Keyword search for:', query);

    const scored = memories.map(memory => ({
      ...memory,
      score: keywordScore_internal(query, memory),
      searchMethod: 'keyword' as const,
    }));

    return scored
      .filter(r => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }, []);

  // Main search function - uses AI when available
  const search = useCallback(async (
    query: string,
    memories: Memory[],
    limit = 10
  ): Promise<SemanticSearchResult[]> => {
    if (!query.trim()) {
      return memories.slice(0, limit).map(m => ({
        ...m,
        score: 1,
        searchMethod: 'keyword' as const,
      }));
    }

    if (state.isAIReady && engineRef.current) {
      return searchWithAI(query, memories, limit);
    }

    return searchWithKeywords(query, memories, limit);
  }, [state.isAIReady, searchWithAI, searchWithKeywords]);

  // Clear embedding cache
  const clearCache = useCallback(async () => {
    if (dbRef.current) {
      await dbRef.current.clear('embeddings');
      console.log('[SemanticSearch] Cache cleared');
    }
  }, []);

  // Auto-initialize on mount
  useEffect(() => {
    initializeAI();
  }, [initializeAI]);

  return {
    // State
    isAIReady: state.isAIReady,
    isAILoading: state.isAILoading,
    loadProgress: state.loadProgress,
    error: state.error,
    deviceInfo: state.deviceInfo,

    // Methods
    initializeAI,
    search,
    searchWithAI,
    searchWithKeywords,
    generateEmbeddings,
    clearCache,
  };
}

// Internal keyword scoring function
function keywordScore_internal(query: string, memory: Memory): number {
  const q = query.toLowerCase();
  const keywords = q.split(/\s+/).filter(w => w.length > 2);

  if (keywords.length === 0) return 0.5;

  let score = 0;
  const titleLower = memory.title.toLowerCase();
  const contentLower = memory.content.toLowerCase();
  const tagsLower = memory.tags.map(t => t.toLowerCase());

  for (const kw of keywords) {
    if (titleLower.includes(kw)) score += 0.3;
    if (contentLower.includes(kw)) score += 0.1;
    if (tagsLower.some(t => t.includes(kw))) score += 0.2;
  }

  // Normalize to 0-1 range
  return Math.min(score / keywords.length, 1);
}

export default useSemanticSearch;
