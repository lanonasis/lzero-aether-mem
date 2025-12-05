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
} from './ai/embeddings';
export type {
  EmbeddingResult,
  SummarizationResult,
  ClassificationResult,
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
  User,
  ApiKey,
  SyncStatus,
  ApiResponse,
} from './types/index';
