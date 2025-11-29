/**
 * LanOnasis Shared Types
 * Used across VS Code Extension, Web Dashboard, Mobile PWA, and CLI
 */

import { LucideIcon } from 'lucide-react';

// ============================================
// Core Memory Types
// ============================================

export interface Memory {
  id: string;
  title: string;
  content: string;
  type: MemoryType;
  tags: string[];
  embedding?: number[];
  createdAt: Date;
  updatedAt: Date;
  synced?: boolean;
  
  // UI helpers (optional, for display)
  icon?: LucideIcon;
}

export type MemoryType = 
  | 'code'
  | 'docs'
  | 'todo'
  | 'note'
  | 'snippet'
  | 'workflow'
  | 'status'
  | 'idea';

export interface CreateMemoryInput {
  title: string;
  content: string;
  type?: MemoryType;
  tags?: string[];
}

export interface SearchOptions {
  limit?: number;
  threshold?: number;
  types?: MemoryType[];
  tags?: string[];
  dateRange?: {
    from?: Date;
    to?: Date;
  };
}

export interface SearchResult extends Memory {
  score: number;
  highlight?: string;
}

// ============================================
// User & Authentication
// ============================================

export interface User {
  id: string;
  name?: string;
  email: string;
  avatar?: string;
  createdAt?: Date;
}

export interface AuthSession {
  token: string;
  user: User;
  expiresAt: Date;
}

// ============================================
// API Keys & Security
// ============================================

export interface ApiKey {
  id: string;
  name: string;
  scope: 'read' | 'write' | 'read:write';
  environment: 'development' | 'staging' | 'production';
  token?: string; // Only shown once on creation
  createdAt: Date;
  lastUsedAt?: Date;
  expiresAt?: Date;
}

// ============================================
// Sync & Offline
// ============================================

export interface SyncStatus {
  pending: number;
  lastSync: Date | null;
  isOnline: boolean;
}

export interface SyncResult {
  synced: number;
  failed: number;
  errors?: string[];
}

// ============================================
// AI & Embeddings
// ============================================

export interface EmbeddingResult {
  embedding: number[];
  model: string;
  dimensions: number;
  computeTimeMs: number;
  device: 'cpu' | 'webgpu' | 'wasm';
}

export interface AIStatus {
  available: boolean;
  model: string | null;
  device: string;
  isLoading?: boolean;
  loadProgress?: number;
}

// ============================================
// Platform Detection
// ============================================

export type Platform = 
  | 'vscode'
  | 'web'
  | 'mobile-pwa'
  | 'mobile-native'
  | 'cli'
  | 'chrome-extension';

export interface PlatformInfo {
  platform: Platform;
  version: string;
  device: string;
  isOnline: boolean;
  features: {
    offline: boolean;
    localAI: boolean;
    push: boolean;
  };
}

// ============================================
// Events & Callbacks
// ============================================

export type EventType = 
  | 'memory:created'
  | 'memory:updated'
  | 'memory:deleted'
  | 'sync:started'
  | 'sync:completed'
  | 'auth:login'
  | 'auth:logout'
  | 'ai:ready'
  | 'offline'
  | 'online';

export interface LanonasisEvent<T = any> {
  type: EventType;
  payload: T;
  timestamp: Date;
}

// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

// ============================================
// Configuration
// ============================================

export interface LanonasisConfig {
  baseUrl?: string;
  apiKey?: string;
  enableOffline?: boolean;
  enableLocalAI?: boolean;
  syncInterval?: number;
  onAuthChange?: (authenticated: boolean) => void;
  onSync?: (status: SyncStatus) => void;
  onError?: (error: Error) => void;
}

// ============================================
// Component Props (for UI consistency)
// ============================================

export interface MemoryCardProps {
  memory: Memory;
  onSelect?: (memory: Memory) => void;
  onCopy?: (content: string) => void;
  onDelete?: (id: string) => void;
  onEdit?: (memory: Memory) => void;
  variant?: 'compact' | 'default' | 'expanded';
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (query: string) => void;
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

export interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onAttach?: () => void;
  disabled?: boolean;
  placeholder?: string;
}
