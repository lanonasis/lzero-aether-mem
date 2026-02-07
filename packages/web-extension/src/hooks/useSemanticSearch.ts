/**
 * Semantic Search Hook for Web Extension
 * Uses offscreen document for on-device AI to bypass CSP restrictions.
 *
 * Progressive enhancement:
 * 1. API semantic search (primary - when online)
 * 2. Local AI embeddings via offscreen (when offline and AI ready)
 * 3. Keyword matching (fallback)
 */

import { useState, useCallback, useRef } from 'react';
import { openDB, type IDBPDatabase } from 'idb';

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

// Cosine similarity calculation
function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export function useSemanticSearch() {
  const [state, setState] = useState<SemanticSearchState>({
    isAIReady: false,
    isAILoading: false,
    loadProgress: 0,
    error: null,
    deviceInfo: '',
  });

  const dbRef = useRef<IDBPDatabase<EmbeddingDB> | null>(null);
  const initAttempted = useRef(false);

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

  // Initialize AI via background script (which uses offscreen document)
  const initializeAI = useCallback(async () => {
    if (state.isAIReady || state.isAILoading || initAttempted.current) return;

    initAttempted.current = true;
    setState(prev => ({ ...prev, isAILoading: true, error: null }));

    try {
      console.log('[SemanticSearch] Initializing AI via offscreen...');

      // Request AI initialization from background script
      const response = await new Promise<{
        isReady: boolean;
        loadProgress: number;
        deviceInfo: string;
        error?: string;
      }>((resolve) => {
        chrome.runtime.sendMessage({ type: 'OFFSCREEN_INIT_AI' }, (res) => {
          if (chrome.runtime.lastError) {
            resolve({
              isReady: false,
              loadProgress: 0,
              deviceInfo: '',
              error: chrome.runtime.lastError.message,
            });
          } else {
            resolve(res || { isReady: false, loadProgress: 0, deviceInfo: '' });
          }
        });
      });

      if (response.error) {
        throw new Error(response.error);
      }

      setState({
        isAIReady: response.isReady,
        isAILoading: false,
        loadProgress: response.loadProgress,
        error: null,
        deviceInfo: response.deviceInfo,
      });

      console.log('[SemanticSearch] AI ready:', response.deviceInfo);
      await initDB();
    } catch (err) {
      console.warn('[SemanticSearch] AI init failed (using API fallback):', err);
      setState(prev => ({
        ...prev,
        isAILoading: false,
        isAIReady: false,
        error: err instanceof Error ? err.message : 'AI initialization failed',
      }));
    }
  }, [state.isAIReady, state.isAILoading, initDB]);

  // Get embedding via offscreen document
  const getEmbedding = useCallback(async (text: string): Promise<number[] | null> => {
    try {
      const response = await new Promise<{ embedding?: number[]; error?: string }>((resolve) => {
        chrome.runtime.sendMessage(
          { type: 'OFFSCREEN_EMBED', payload: { text } },
          (res) => {
            if (chrome.runtime.lastError) {
              resolve({ error: chrome.runtime.lastError.message });
            } else {
              resolve(res || { error: 'No response' });
            }
          }
        );
      });

      if (response.error) {
        console.error('[SemanticSearch] Embedding failed:', response.error);
        return null;
      }

      return response.embedding || null;
    } catch (err) {
      console.error('[SemanticSearch] Embedding error:', err);
      return null;
    }
  }, []);

  // Get or generate embedding for a memory (with caching)
  const getMemoryEmbedding = useCallback(async (memory: Memory): Promise<number[] | null> => {
    if (!dbRef.current) {
      await initDB();
    }

    const contentHash = hashContent(memory.title + ' ' + memory.content);

    // Check cache first
    const cached = await dbRef.current?.get('embeddings', memory.id);
    if (cached && cached.contentHash === contentHash) {
      return cached.embedding;
    }

    // Generate new embedding
    const text = `${memory.title}. ${memory.content}`;
    const embedding = await getEmbedding(text);

    if (embedding && dbRef.current) {
      // Cache it
      await dbRef.current.put('embeddings', {
        id: memory.id,
        embedding,
        contentHash,
        createdAt: Date.now(),
      });
    }

    return embedding;
  }, [initDB, getEmbedding]);

  // Generate embeddings for all memories (background task)
  const generateEmbeddings = useCallback(async (memories: Memory[]): Promise<void> => {
    if (!state.isAIReady) return;

    console.log('[SemanticSearch] Generating embeddings for', memories.length, 'memories...');

    for (const memory of memories) {
      await getMemoryEmbedding(memory);
    }

    console.log('[SemanticSearch] Embeddings generated');
  }, [state.isAIReady, getMemoryEmbedding]);

  // Semantic search using AI
  const searchWithAI = useCallback(async (
    query: string,
    memories: Memory[],
    limit = 10
  ): Promise<SemanticSearchResult[]> => {
    if (!state.isAIReady) {
      return searchWithKeywords(query, memories, limit);
    }

    try {
      console.log('[SemanticSearch] AI search for:', query);
      const startTime = performance.now();

      // Get query embedding
      const queryEmbedding = await getEmbedding(query);
      if (!queryEmbedding) {
        return searchWithKeywords(query, memories, limit);
      }

      // Score all memories
      const scored: SemanticSearchResult[] = [];

      for (const memory of memories) {
        const embedding = await getMemoryEmbedding(memory);
        if (embedding) {
          const score = cosineSimilarity(queryEmbedding, embedding);
          scored.push({ ...memory, score, searchMethod: 'ai' });
        } else {
          const keywordScore = keywordScoreInternal(query, memory);
          scored.push({ ...memory, score: keywordScore, searchMethod: 'keyword' });
        }
      }

      scored.sort((a, b) => b.score - a.score);

      const elapsed = performance.now() - startTime;
      console.log(`[SemanticSearch] AI search completed in ${elapsed.toFixed(0)}ms`);

      return scored
        .filter(r => r.score > 0.3)
        .slice(0, limit);
    } catch (err) {
      console.error('[SemanticSearch] AI search failed:', err);
      return searchWithKeywords(query, memories, limit);
    }
  }, [state.isAIReady, getEmbedding, getMemoryEmbedding]);

  // Keyword search fallback
  const searchWithKeywords = useCallback((
    query: string,
    memories: Memory[],
    limit = 10
  ): SemanticSearchResult[] => {
    console.log('[SemanticSearch] Keyword search for:', query);

    const scored = memories.map(memory => ({
      ...memory,
      score: keywordScoreInternal(query, memory),
      searchMethod: 'keyword' as const,
    }));

    return scored
      .filter(r => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }, []);

  // Main search function - prioritizes API, then AI, then keywords
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

    // If AI is ready and we have local memories, use AI search
    if (state.isAIReady) {
      return searchWithAI(query, memories, limit);
    }

    // Otherwise use keyword search
    return searchWithKeywords(query, memories, limit);
  }, [state.isAIReady, searchWithAI, searchWithKeywords]);

  // Clear embedding cache
  const clearCache = useCallback(async () => {
    if (dbRef.current) {
      await dbRef.current.clear('embeddings');
      console.log('[SemanticSearch] Cache cleared');
    }
  }, []);

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
function keywordScoreInternal(query: string, memory: Memory): number {
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

  return Math.min(score / keywords.length, 1);
}

export default useSemanticSearch;
