/**
 * Mobile Memories Hook
 * Wraps @lanonasis/shared hooks to match desktop useMemories API
 */

import { useCallback } from 'react';
import { useMemories as useSharedMemories, useLanonasis, type Memory, type MemoryType } from '@lanonasis/shared';

export interface CreateMemoryRequest {
  title: string;
  content: string;
  memory_type?: string;
  tags?: string[];
}

export const useMemories = (_isAuthenticated?: boolean) => {
  const {
    memories: rawMemories,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    search,
    create,
    update,
    remove,
    fetch,
  } = useSharedMemories();

  const { isAuthenticated } = useLanonasis();

  // Search memories (semantic search)
  const searchMemories = useCallback(
    async (query: string): Promise<Memory[]> => {
      if (!isAuthenticated) return [];
      return search(query);
    },
    [isAuthenticated, search]
  );

  // Create memory
  const createMemory = useCallback(
    async (data: Partial<CreateMemoryRequest>): Promise<Memory | undefined> => {
      if (!isAuthenticated) return undefined;
      try {
        const created = await create({
          title: data.title || 'Untitled',
          content: data.content || '',
          type: (data.memory_type as MemoryType) || 'context',
          tags: data.tags || [],
        });
        return created;
      } catch (err) {
        console.error('Failed to create memory:', err);
        return undefined;
      }
    },
    [isAuthenticated, create]
  );

  // Delete memory
  const deleteMemory = useCallback(
    async (id: string): Promise<void> => {
      if (!isAuthenticated) return;
      await remove(id);
    },
    [isAuthenticated, remove]
  );

  // Update memory
  const updateMemory = useCallback(
    async (
      id: string,
      data: Partial<CreateMemoryRequest>
    ): Promise<Memory | undefined> => {
      if (!isAuthenticated) return undefined;
      try {
        const updated = await update(id, {
          title: data.title,
          content: data.content,
          type: data.memory_type as MemoryType,
          tags: data.tags,
        });
        return updated;
      } catch (err) {
        console.error('Failed to update memory:', err);
        return undefined;
      }
    },
    [isAuthenticated, update]
  );

  // Refetch memories (SDK uses fetch, not refresh)
  const refetch = useCallback(async (): Promise<void> => {
    if (!isAuthenticated) return;
    await fetch();
  }, [isAuthenticated, fetch]);

  return {
    memories: rawMemories,
    searchQuery,
    setSearchQuery,
    filteredMemories: rawMemories,
    isLoading,
    error,
    searchMemories,
    createMemory,
    updateMemory,
    deleteMemory,
    refetch,
  };
};
