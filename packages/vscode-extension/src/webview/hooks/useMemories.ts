/**
 * Memories Hook for VS Code Extension
 * Uses LanonasisContext for memory CRUD operations
 */
import { useState, useMemo, useCallback } from 'react';
import { useLanonasisContext, type MemoryEntry, type CreateMemoryRequest } from '../context/LanonasisContext';

// Map MemoryEntry to the Memory type used in UI components
export interface Memory {
    id: string;
    title: string;
    content: string;
    type: string;
    tags: string[];
    date?: Date;
    createdAt?: string;
    updatedAt?: string;
}

function mapMemoryEntry(entry: MemoryEntry): Memory {
    return {
        id: entry.id,
        title: entry.title,
        content: entry.content,
        type: entry.memory_type,
        tags: entry.tags || [],
        date: entry.created_at ? new Date(entry.created_at) : undefined,
        createdAt: entry.created_at,
        updatedAt: entry.updated_at,
    };
}

export const useMemories = (_isAuthenticated?: boolean) => {
    const {
        isAuthenticated,
        memories: rawMemories,
        isLoadingMemories,
        memoryError,
        fetchMemories,
        searchMemories: searchApi,
        createMemory: createApi,
        deleteMemory: deleteApi,
    } = useLanonasisContext();

    const [searchQuery, setSearchQuery] = useState('');

    // Map MemoryEntry[] to Memory[]
    const memories = useMemo(() => {
        return rawMemories.map(mapMemoryEntry);
    }, [rawMemories]);

    const filteredMemories = useMemo(() => {
        if (!searchQuery) return memories;
        const lowerQuery = searchQuery.toLowerCase();
        return memories.filter(
            m =>
                m.title.toLowerCase().includes(lowerQuery) ||
                m.content.toLowerCase().includes(lowerQuery)
        );
    }, [memories, searchQuery]);

    const searchMemories = useCallback(async (query: string) => {
        if (!isAuthenticated) return [];
        const results = await searchApi(query);
        return results.map(mapMemoryEntry);
    }, [isAuthenticated, searchApi]);

    const createMemory = useCallback(async (data: Partial<CreateMemoryRequest>): Promise<Memory | undefined> => {
        if (!isAuthenticated) return undefined;
        try {
            const created = await createApi({
                title: data.title || 'Untitled',
                content: data.content || '',
                memory_type: (data.memory_type as any) || 'note',
                tags: data.tags || [],
            });
            return created ? mapMemoryEntry(created) : undefined;
        } catch (err) {
            console.error('Failed to create memory:', err);
            return undefined;
        }
    }, [isAuthenticated, createApi]);

    const deleteMemory = useCallback(async (id: string) => {
        if (!isAuthenticated) return;
        await deleteApi(id);
    }, [isAuthenticated, deleteApi]);

    const refetch = useCallback(async () => {
        if (!isAuthenticated) return;
        await fetchMemories();
    }, [isAuthenticated, fetchMemories]);

    return {
        memories,
        searchQuery,
        setSearchQuery,
        filteredMemories,
        isLoading: isLoadingMemories,
        error: memoryError,
        searchMemories,
        createMemory,
        updateMemory: async () => undefined, // Not implemented yet
        deleteMemory,
        refetch,
    };
};
