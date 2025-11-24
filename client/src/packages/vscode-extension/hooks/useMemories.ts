import { useState, useMemo } from 'react';
import { Memory } from '../../shared/types';

export const useMemories = (memories: Memory[]) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMemories = useMemo(() => {
    return memories.filter(m =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [memories, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredMemories,
  };
};
