import { useState, useEffect, useMemo } from 'react';
import { Memory } from '../../shared/types';
import { apiClient } from '../services/apiClient';

export const useMemories = (isAuthenticated: boolean) => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchMemories = async () => {
      setIsLoading(true);
      try {
        const data = await apiClient.getMemories();
        setMemories(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
        console.error('Failed to fetch memories:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMemories();
  }, [isAuthenticated]);

  const filteredMemories = useMemo(() => {
    return memories.filter(m =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [memories, searchQuery]);

  const searchMemories = async (query: string) => {
    if (!isAuthenticated) return;
    try {
      const results = await apiClient.searchMemories(query);
      setMemories(Array.isArray(results) ? results : []);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  const createMemory = async (data: any): Promise<Memory | undefined> => {
    if (!isAuthenticated) return;
    try {
      const newMemory = (await apiClient.createMemory(data)) as Memory;
      setMemories([...memories, newMemory]);
      return newMemory;
    } catch (err) {
      console.error('Failed to create memory:', err);
    }
  };

  const updateMemory = async (id: string, data: any): Promise<Memory | undefined> => {
    if (!isAuthenticated) return;
    try {
      const updated = (await apiClient.updateMemory(id, data)) as Memory;
      setMemories(memories.map(m => (m.id === id ? updated : m)));
      return updated;
    } catch (err) {
      console.error('Failed to update memory:', err);
    }
  };

  const deleteMemory = async (id: string) => {
    if (!isAuthenticated) return;
    try {
      await apiClient.deleteMemory(id);
      setMemories(memories.filter(m => m.id !== id));
    } catch (err) {
      console.error('Failed to delete memory:', err);
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
