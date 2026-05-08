/**
 * LanOnasis Shared Types
 * Compatible with the real MaaS API
 */

import { LucideIcon } from 'lucide-react';

// ============================================
// Core Memory Types
// ============================================

import {
  MemoryTypeValue as MemoryType,
  PatternAnalysis,
  TagSuggestion,
  RelatedMemory,
  DuplicatePair,
  Insight,
  MemoryHealth,
} from "@lanonasis/mem-intel-sdk";

export type {
  MemoryType,
  PatternAnalysis,
  TagSuggestion,
  RelatedMemory,
  DuplicatePair,
  Insight,
  MemoryHealth,
};

export interface Memory {
  id: string;
  title: string;
  content: string;
  type: MemoryType;
  tags: string[];
  embedding?: number[];
  createdAt: Date | string;
  updatedAt: Date | string;
  synced?: boolean;

  // API may return these
  user_id?: string;
  organization_id?: string;

  // Intelligence layer fields (Phase 1)
  status?: 'active' | 'archived' | 'draft';
  topicId?: string;
  topic_id?: string;

  // Context space (Integration Hub)
  space?: 'personal' | 'team';

  // UI helpers (optional)
  icon?: LucideIcon;
}

// ============================================
// Topic Types
// ============================================

export interface AppMemoryTopic {
  id: string;
  name: string;
  parentId?: string | null;
  color?: string;
  icon?: string;
  isSystem?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// ============================================
// Reasoning Cache Types (Backend Phase 1+)
// Stub types — verified against SDK when @lanonasis/memory-client ships new methods
// ============================================

export interface InferredConclusion {
  id: string;
  subject_id: string;
  organization_id: string | null;
  conclusion_type: 'explicit' | 'deductive' | 'inductive' | 'abductive';
  content: string;
  confidence: number;
  evidence_memory_ids: string[];
  scope: string | null;
  freshness: string;
  superseded_by: string | null;
  contradiction_group_id: string | null;
  source_job_id: string | null;
  created_at: string;
}

export interface ReasoningJob {
  id: string;
  subject_id: string;
  organization_id: string | null;
  source_memory_ids: string[];
  status: 'pending' | 'running' | 'completed' | 'failed';
  source_event: 'memory.create' | 'memory.update' | 'manual.flush' | 'reprocess';
  pending_token_count: number;
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
  error: string | null;
}

// ============================================
// Context Bundle Types (Backend Phase 3+)
// ============================================

export interface ContextBundle {
  format: 'openai' | 'anthropic' | 'mcp' | 'json';
  bundle: unknown;
  metadata: {
    tokens_used: number;
    sources: string[];
    freshness: string;
  };
}

// ============================================
// Concierge Types (Memory Concierge plan)
// ============================================

export interface ConciergeCitation {
  memory_id: string;
  title: string;
  relevance_score: number;
}

export interface DriftSignal {
  signal: string;
  evidence_memory_ids: string[];
  suggested_action: string;
}

export interface ConciergeMessage {
  role: 'user' | 'assistant';
  content: string;
  citations?: ConciergeCitation[];
  driftSignals?: DriftSignal[];
  isStreaming?: boolean;
}



export interface CreateMemoryInput {
  title: string;
  content: string;
  type?: MemoryType;
  tags?: string[];
  embedding?: number[];
}

export interface SearchOptions {
  limit?: number;
  threshold?: number;
  types?: MemoryType[];
  tags?: string[];
}

// ============================================
// User & Auth
// ============================================

export interface User {
  id: string;
  name?: string;
  email: string;
  avatar?: string;
}

// ============================================
// API Keys
// ============================================

export interface ApiKey {
  id: string;
  name: string;
  scope: 'read' | 'write' | 'read:write' | 'full' | 'relay-read' | 'relay-write' | 'relay-admin';
  environment: 'development' | 'staging' | 'production';
  token?: string;
  created_at?: string;
  last_used_at?: string;
  // Relay fields (Agent Relay plan)
  relay_allowed_tools?: string[];
  relay_subject_id?: string;
}

// ============================================
// Sync
// ============================================

export interface SyncStatus {
  pending: number;
  lastSync: Date | null;
  isOnline: boolean;
}

// ============================================
// AI
// ============================================

export interface EmbeddingResult {
  embedding: number[];
  model: string;
  dimensions: number;
  computeTimeMs: number;
  device: 'cpu' | 'webgpu' | 'wasm';
}

// ============================================
// API Responses
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}
