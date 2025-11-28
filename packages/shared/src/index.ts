/**
 * LanOnasis Shared Package
 * Cross-platform SDK, AI Engine, and Types
 */

// SDK exports
export { LanonasisClient, type LanonasisConfig } from './sdk/index';
export {
  LanonasisProvider,
  useLanonasis,
  useMemories,
  useLocalAI,
  useSyncStatus,
  useApiKeys,
} from './sdk/react-hooks';

// AI exports
export {
  LocalEmbeddingEngine,
  getLocalAIEngine,
  type EmbeddingResult,
  type SummarizationResult,
  type ClassificationResult,
} from './ai/embeddings';

// Type exports
export type {
  Memory,
  MemoryType,
  CreateMemoryInput,
  SearchOptions,
  SearchResult,
  User,
  AuthSession,
  ApiKey,
  SyncStatus,
  SyncResult,
  AIStatus,
  Platform,
  PlatformInfo,
  EventType,
  LanonasisEvent,
  ApiResponse,
  PaginatedResponse,
  MemoryCardProps,
  SearchBarProps,
  ChatInputProps,
} from './types/index';
