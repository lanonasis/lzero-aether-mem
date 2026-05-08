/**
 * API Adapter Layer
 *
 * Apps import AppMemory and these helpers instead of raw SDK types.
 * When Phase 2 backend changes SDK contracts, only this file changes.
 */

import type { Memory } from '../types';

// ============================================
// AppMemory — stable app-facing memory type
// ============================================

export interface AppMemory {
  id: string;
  title: string;
  content: string;
  type: string;
  tags: string[];
  status: 'active' | 'archived' | 'draft';
  topicId?: string;
  space?: 'personal' | 'team';
  createdAt: string;
  updatedAt: string;
}

// ============================================
// Adapters
// ============================================

/**
 * Normalises a raw memory entry (from API or SDK) to the stable AppMemory shape.
 * Handles both camelCase and snake_case field names from various sources.
 */
export function adaptMemoryEntry(raw: Record<string, unknown>): AppMemory {
  return {
    id: String(raw.id ?? ''),
    title: String(raw.title ?? ''),
    content: String(raw.content ?? ''),
    type: String(raw.type ?? raw.memory_type ?? 'context'),
    tags: Array.isArray(raw.tags) ? (raw.tags as string[]) : [],
    status: (raw.status as AppMemory['status']) ?? 'active',
    topicId: (raw.topicId ?? raw.topic_id) as string | undefined,
    space: (raw.space as AppMemory['space']) ?? 'personal',
    createdAt: String(raw.createdAt ?? raw.created_at ?? new Date().toISOString()),
    updatedAt: String(raw.updatedAt ?? raw.updated_at ?? new Date().toISOString()),
  };
}

/**
 * Converts the shared Memory type to AppMemory.
 */
export function adaptSharedMemory(m: Memory): AppMemory {
  return adaptMemoryEntry(m as unknown as Record<string, unknown>);
}
