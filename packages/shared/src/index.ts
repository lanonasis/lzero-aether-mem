/**
 * LanOnasis Shared Package
 * Cross-platform SDK, AI Engine, Types, and Theme
 * 
 * Used by:
 * - Web Landing Page (client/)
 * - Mobile PWA (packages/mobile-pwa/)
 * - VS Code Extension
 * - CLI
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

// Theme exports (design tokens for cross-platform consistency)
export {
  theme,
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  animation,
  breakpoints,
  zIndex,
  generateCssVariables,
  tailwindTheme,
} from './theme/index';

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
