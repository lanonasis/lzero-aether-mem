# Shared Package Context

## Purpose

The central SDK layer consumed by all platform-specific packages (web, mobile, VSCode extension, browser extension). Re-exports types and utilities from `@lanonasis/mem-intel-sdk` and provides project-specific extensions like the local embedding engine.

## Key Files

- `packages/shared/src/types/index.ts` - Re-exports SDK types (`MemoryType`, `PatternAnalysis`, `TagSuggestion`, etc.) and defines local interfaces (`Memory`, `CreateMemoryInput`, `SearchOptions`, `User`, `ApiKey`, `SyncStatus`, `EmbeddingResult`, `ApiResponse`)
- `packages/shared/src/ai/embeddings.ts` - Local embedding engine using Transformers.js
- `packages/shared/src/index.ts` - Package entry point
- `packages/shared/src/sdk/` - SDK wrappers and React hooks
- `packages/shared/src/theme/` - Shared theme configuration
- `packages/shared/package.json` - Package manifest (version, exports)

## Dependencies

- `@lanonasis/mem-intel-sdk` - Core memory intelligence functionality
- `@xenova/transformers` - On-device embedding model
- `lucide-react` - Icon type definitions

## Integration Points

**Consumed by:**
- `client/` - Web dashboard imports shared types and AI utilities
- `packages/mobile-pwa/` - Mobile PWA imports shared types and lightweight analysis hooks
- `packages/vscode-extension/` - Extension imports shared types
- `packages/web-extension/` - Browser extension imports shared types

**Build constraint:** Must be built before any consumer package. Use `bun run build:shared`.

## Architecture Patterns

- **Re-export pattern**: Types from `@lanonasis/mem-intel-sdk` are re-exported to provide a single import source for all packages
- **SDK wrapper pattern**: `packages/shared/src/sdk/` wraps SDK hooks with project-specific logic
- **Type augmentation**: Local `Memory` interface extends SDK `Memory` with optional UI helpers (`icon?: LucideIcon`)

## Important Notes

- Do NOT add heavy logic here; this package is imported by all platforms including VSCode extension and browser extension where bundle size matters.
- Embedding engine (`embeddings.ts`) lazily loads the ONNX model on first use.
