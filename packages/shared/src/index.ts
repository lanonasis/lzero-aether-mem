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
export {
  LanonasisClient,
  type LanonasisConfig,
  type LanonasisFeatureFlags,
  DEFAULT_FEATURES,
} from './sdk/index';
export {
  LanonasisProvider,
  useLanonasis,
  useMemories,
  useLocalAI,
  useSyncStatus,
  useApiKeys,
  // Phase 2 — Track A intelligence hooks
  useMemoryCollectionHealth,
  useIntelligence,
  // Phase 2.5 — Gated hooks (flags off until backend handoffs)
  useInferredConclusions,
  useFlushReasoning,
  useContextBundle,
  // Memory Concierge (gated)
  useMemoryConcierge,
} from './sdk/react-hooks';

// Adapter exports
export {
  type AppMemory,
  adaptMemoryEntry,
  adaptSharedMemory,
} from './sdk/adapter';

// Intelligence client utilities
export {
  getIntelligenceClient,
  resetIntelligenceClient,
} from './sdk/intelligence-client';

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
  // Intelligence layer types
  AppMemoryTopic,
  InferredConclusion,
  ReasoningJob,
  ContextBundle,
  ConciergeMessage,
  ConciergeCitation,
  DriftSignal,
  // Re-exported from mem-intel-sdk for convenience
  PatternAnalysis,
  TagSuggestion,
  RelatedMemory,
  DuplicatePair,
  Insight,
  MemoryHealth,
} from './types/index';
