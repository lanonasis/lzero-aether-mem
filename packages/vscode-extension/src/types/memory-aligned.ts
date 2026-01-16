export type MemoryType = 'conversation' | 'knowledge' | 'project' | 'context' | 'reference' | 'personal' | 'workflow';
export type MemoryStatus = 'active' | 'archived' | 'draft' | 'deleted';

export interface MemoryEntry {
    id: string;
    title: string;
    content: string;
    summary?: string;
    memory_type: MemoryType;
    status?: MemoryStatus;
    relevance_score?: number;
    access_count?: number;
    last_accessed?: string;
    user_id?: string;
    topic_id?: string;
    project_ref?: string;
    tags: string[];
    metadata?: Record<string, unknown>;
    created_at: string;
    updated_at: string;
}

export interface MemorySearchResult extends MemoryEntry {
    similarity_score: number;
}

export interface CreateMemoryRequest {
    title: string;
    content: string;
    summary?: string;
    memory_type: MemoryType;
    topic_id?: string;
    project_ref?: string;
    tags?: string[];
    metadata?: Record<string, unknown>;
}

export interface UpdateMemoryRequest extends Partial<CreateMemoryRequest> {
    status?: MemoryStatus;
}
