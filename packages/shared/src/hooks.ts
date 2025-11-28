import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Memory, CreateMemory, SearchResult } from "./types";

// Mock API client - replace with actual implementation
const api = {
  getMemories: async (): Promise<Memory[]> => {
    // TODO: Implement actual API call
    return [];
  },
  createMemory: async (memory: CreateMemory): Promise<Memory> => {
    // TODO: Implement actual API call
    return {} as Memory;
  },
  searchMemories: async (query: string): Promise<SearchResult[]> => {
    // TODO: Implement actual API call
    return [];
  },
};

export function useMemories() {
  const queryClient = useQueryClient();

  const { data: memories = [], isLoading } = useQuery({
    queryKey: ["memories"],
    queryFn: api.getMemories,
  });

  const createMutation = useMutation({
    mutationFn: api.createMemory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memories"] });
    },
  });

  const searchMutation = useMutation({
    mutationFn: api.searchMemories,
  });

  return {
    memories,
    isLoading,
    createMemory: createMutation.mutate,
    search: searchMutation.mutate,
    searchResults: searchMutation.data,
    isSearching: searchMutation.isPending,
  };
}

export function useLocalAI() {
  // TODO: Implement on-device AI inference
  return {
    isReady: false,
    embed: async (text: string): Promise<number[]> => {
      return [];
    },
    findSimilar: async (
      query: string,
      memories: Memory[],
      limit: number
    ): Promise<SearchResult[]> => {
      return [];
    },
  };
}
