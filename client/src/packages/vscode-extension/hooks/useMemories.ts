import { useState, useEffect, useMemo } from 'react';
import { Memory } from '../../shared/types';
import { useLanonasis } from '@lanonasis/shared/sdk/react-hooks';

export const useMemories = (isAuthenticated: boolean) => {
  const { client, isAuthenticated: sdkAuthenticated } = useLanonasis();
  const [memories, setMemories] = useState<Memory[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authenticated = isAuthenticated && sdkAuthenticated;

  useEffect(() => {
    if (!authenticated) return;

    let isCancelled = false;

    const fetchMemories = async () => {
      setIsLoading(true);
      try {
        const data = await client.memory.list();
        if (!isCancelled) {
          setMemories(Array.isArray(data) ? (data as Memory[]) : []);
          setError(null);
        }
      } catch (err) {
        if (!isCancelled) {
          setError((err as Error).message);
          console.error('Failed to fetch memories via /api/v1/memory:', err);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchMemories();

    return () => {
      isCancelled = true;
    };
  }, [authenticated, client]);

  const filteredMemories = useMemo(() => {
    return memories.filter(m =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [memories, searchQuery]);

  const searchMemories = async (query: string) => {
    if (!authenticated) return;
    try {
      const results = await client.memory.search(query);
      setMemories(Array.isArray(results) ? (results as Memory[]) : []);
    } catch (err) {
      console.error('Search via /api/v1/memory/search failed:', err);
    }
  };

  const createMemory = async (data: any): Promise<Memory | undefined> => {
    if (!authenticated) return;
    try {
      const created = await client.memory.create(data);
      const newMemory = created as Memory;
      setMemories(prev => [...prev, newMemory]);
      return newMemory;
    } catch (err) {
      console.error('Failed to create memory via /api/v1/memory:', err);
    }
  };

  const updateMemory = async (
    id: string,
    data: any,
  ): Promise<Memory | undefined> => {
    if (!authenticated) return;
    try {
      const updated = await client.memory.update(id, data);
      const updatedMemory = updated as Memory;
      setMemories(prev => prev.map(m => (m.id === id ? updatedMemory : m)));
      return updatedMemory;
    } catch (err) {
      console.error('Failed to update memory via /api/v1/memory:', err);
    }
  };

  const deleteMemory = async (id: string) => {
    if (!authenticated) return;
    try {
      await client.memory.delete(id);
      setMemories(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      console.error('Failed to delete memory via /api/v1/memory:', err);
    }
  };

  return {
    memories,
    searchQuery,
    setSearchQuery,
    filteredMemories,
    isLoading,
    error,
    searchMemories,
    createMemory,
    updateMemory,
    deleteMemory,
  };
};
