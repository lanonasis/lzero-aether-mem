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
  
  // UI helpers (optional)
  icon?: LucideIcon;
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
  scope: 'read' | 'write' | 'read:write';
  environment: 'development' | 'staging' | 'production';
  token?: string;
  created_at?: string;
  last_used_at?: string;
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
