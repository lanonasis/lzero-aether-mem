# Memory Intelligence SDK Migration Guide

## Overview

This document outlines the migration from the local `context-intelligence-engine` package to the optimized `@lanonasis/mem-intel-sdk` npm package.

**Status**: ✅ Migration in progress  
**Started**: December 19, 2025  
**Target Completion**: Complete integration across all packages

---

## Why This Migration?

### Problems with Local Package

- ❌ **Not used** - Zero imports throughout the codebase
- ❌ **Build pressure** - 1,468 lines causing OOM errors during compilation
- ❌ **Monolithic** - Single file with tight coupling to MCP server
- ❌ **Maintenance burden** - Separate versioning and testing

### Benefits of mem-intel-sdk

- ✅ **Optimized** - Published, tested, and production-ready
- ✅ **Modular** - Import only what you need
- ✅ **React support** - Native hooks and components
- ✅ **Lightweight** - Minimal build impact
- ✅ **Independent versioning** - Update on schedule
- ✅ **Active maintenance** - Centralized updates

---

## Package Integration Map

### 1. **Shared Package** (`packages/shared`)

**Purpose**: Core types and utilities  
**SDK Integration**: Memory type definitions, utility functions

```typescript
// packages/shared/src/types/index.ts
import {
  MemoryType,
  MemoryAnalysis,
  PatternInsight,
  DuplicateDetectionResult,
} from "@lanonasis/mem-intel-sdk/types";

// Re-export for consistent types across codebase
export type { MemoryType, MemoryAnalysis, PatternInsight };
```

**Benefits**:

- Unified type system
- Single source of truth
- Consistent across all packages

---

### 2. **Web App** (`client/src`)

**Purpose**: Web-based UI and interactions  
**SDK Integration**: React hooks and components

```typescript
// client/src/hooks/useMemoryIntelligence.ts
import {
  useMemoryAnalysis,
  usePatternDetection,
} from "@lanonasis/mem-intel-sdk/react";

export function useEnhancedMemories(memories: Memory[]) {
  const { analysis, isLoading } = useMemoryAnalysis(memories);
  const { patterns } = usePatternDetection(analysis);

  return { analysis, patterns, isLoading };
}
```

**Available Hooks**:

- `useMemoryAnalysis(memories)` - Analyze memory patterns
- `usePatternDetection(data)` - Detect patterns and clusters
- `useDuplicateDetection(memories)` - Find duplicate memories
- `useTagSuggestions(memory)` - Get smart tag suggestions
- `useMemoryHealth(memories)` - Monitor memory quality

---

### 3. **VSCode Extension** (`packages/vscode-extension`)

**Purpose**: IDE integration  
**SDK Integration**: Memory intelligence tools

```typescript
// packages/vscode-extension/src/services/memoryIntelligence.ts
import { MemoryIntelligenceService } from "@lanonasis/mem-intel-sdk";

export class VSCodeMemoryIntelligence extends MemoryIntelligenceService {
  async analyzeActiveFile() {
    const fileContent = await this.getActiveFileContent();
    return this.analyzeContent(fileContent);
  }

  async suggestMemoriesForContext() {
    const context = await this.extractEditorContext();
    return this.findRelevantMemories(context);
  }
}
```

**Features**:

- In-editor memory suggestions
- Context-aware analysis
- Pattern detection from code

---

### 4. **Mobile PWA** (`packages/mobile-pwa`)

**Purpose**: Mobile app  
**SDK Integration**: Lightweight analysis and caching

```typescript
// packages/mobile-pwa/src/hooks/useMobileMemoryAnalysis.ts
import { useLightMemoryAnalysis } from "@lanonasis/mem-intel-sdk/react";

export function useMobileMemoryEnhancement(memories: Memory[]) {
  // Optimized for mobile - minimal CPU/battery usage
  const { analysis, suggestions } = useLightMemoryAnalysis(memories);

  return { analysis, suggestions };
}
```

**Mobile-Specific Optimizations**:

- Lazy loading
- Cached computations
- Minimal memory footprint

---

### 5. **Web Extension** (`packages/web-extension`)

**Purpose**: Browser extension  
**SDK Integration**: Background and content scripts

```typescript
// packages/web-extension/src/background/memoryIntelligence.ts
import { MemoryIntelligenceService } from "@lanonasis/mem-intel-sdk";

export class WebExtensionMemoryService {
  private intelligenceService: MemoryIntelligenceService;

  async processPageContent(pageHtml: string) {
    const extracted = this.extractRelevantContent(pageHtml);
    const suggestions =
      await this.intelligenceService.suggestMemoryTags(extracted);
    return suggestions;
  }
}
```

---

## Implementation Steps

### Step 1: Dependency Installation

```bash
bun install @lanonasis/mem-intel-sdk
```

### Step 2: Update Shared Package

Update type definitions and re-exports in `packages/shared/src/types/index.ts`

### Step 3: Update Web App (`client/src`)

- Import React hooks
- Create custom hooks wrapping SDK functionality
- Update component props and state

### Step 4: Update VSCode Extension

- Implement `MemoryIntelligenceService`
- Add analysis commands
- Update panel displays

### Step 5: Update Mobile PWA

- Use lightweight analysis functions
- Implement caching strategies
- Test on real devices

### Step 6: Update Web Extension

- Integrate with content scripts
- Add background analysis
- Update popup/options UI

### Step 7: Testing & Validation

```bash
bun run test
bun run build
```

---

## Archived Package

### `context-intelligence-engine` Status

- **Location**: `packages/context-intelligence-engine/`
- **Action**: Archived (can be deleted or moved to `_archive/`)
- **Reason**: Functionality replaced by `@lanonasis/mem-intel-sdk`

If you need to reference it later:

```bash
# Archive it
mv packages/context-intelligence-engine _archive/context-intelligence-engine-v1

# Or delete it
rm -rf packages/context-intelligence-engine
```

---

## SDK API Reference

### Core Types

```typescript
interface Memory {
  id: string;
  title: string;
  content: string;
  type: MemoryType;
  tags: string[];
  embedding?: number[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface MemoryAnalysis {
  memory: Memory;
  patterns: string[];
  keywords: string[];
  sentiment: "positive" | "neutral" | "negative";
  quality: number; // 0-100
}

interface PatternInsight {
  pattern: string;
  frequency: number;
  memories: Memory[];
  confidence: number;
}
```

### Core Methods

```typescript
// Analysis
MemoryIntelligenceService.analyzeMemory(memory: Memory): Promise<MemoryAnalysis>
MemoryIntelligenceService.analyzeMany(memories: Memory[]): Promise<MemoryAnalysis[]>

// Pattern Detection
MemoryIntelligenceService.detectPatterns(memories: Memory[]): Promise<PatternInsight[]>
MemoryIntelligenceService.detectDuplicates(memories: Memory[]): Promise<DuplicateDetectionResult>

// Smart Features
MemoryIntelligenceService.suggestTags(memory: Memory): Promise<string[]>
MemoryIntelligenceService.suggestRelated(memory: Memory): Promise<Memory[]>
MemoryIntelligenceService.assessHealth(memories: Memory[]): Promise<HealthReport>
```

### React Hooks

```typescript
// Hooks for React components
useMemoryAnalysis(memories: Memory[]): { analysis, isLoading, error }
usePatternDetection(memories: Memory[]): { patterns, isLoading }
useDuplicateDetection(memories: Memory[]): { duplicates, isLoading }
useTagSuggestions(memory: Memory): { suggestions, isLoading }
useMemoryHealth(memories: Memory[]): { health, recommendations }

// Lightweight mobile hook
useLightMemoryAnalysis(memories: Memory[], options: LightAnalysisOptions)
```

---

## Development Workflow

### Local Testing

```bash
# Install SDK locally
bun install @lanonasis/mem-intel-sdk

# Run with SDK
bun run dev

# Test builds
bun run build

# Run tests
bun run test
```

### Debugging

```bash
# Enable SDK debug output
export DEBUG=@lanonasis/mem-intel-sdk:*
bun run dev
```

### Performance Monitoring

The SDK includes built-in performance metrics:

```typescript
import { getPerformanceMetrics } from "@lanonasis/mem-intel-sdk/diagnostics";

const metrics = getPerformanceMetrics();
console.log(metrics);
// {
//   analysisTime: 145,
//   patternDetectionTime: 230,
//   memoryUsage: 45.2,
//   ...
// }
```

---

## Migration Checklist

- [ ] Install `@lanonasis/mem-intel-sdk`
- [ ] Update `packages/shared/src/types/index.ts`
- [ ] Update `client/src` React hooks and components
- [ ] Update `packages/vscode-extension` service layer
- [ ] Update `packages/mobile-pwa` with light analysis
- [ ] Update `packages/web-extension` scripts
- [ ] Run full test suite: `bun run test`
- [ ] Build all packages: `bun run build`
- [ ] Verify no TypeScript errors: `bun run typecheck`
- [ ] Archive `context-intelligence-engine` folder
- [ ] Update this document with completion status

---

## Rollback Plan

If issues arise, revert to local package:

```bash
# Restore archived folder
mv _archive/context-intelligence-engine-v1 packages/context-intelligence-engine

# Remove SDK dependency
bun remove @lanonasis/mem-intel-sdk

# Rebuild
bun run build
```

---

## Support & Resources

- **SDK Repository**: https://github.com/lanonasis/mem-intel-sdk
- **Documentation**: https://mem-intel-sdk.lanonasis.com
- **Issues**: Open on SDK repo or here
- **Questions**: See SDK documentation or contact maintainers

---

## Next Steps

1. Install the SDK
2. Update shared types
3. Create example implementations in each package
4. Test integration with real data
5. Monitor performance metrics
6. Gather team feedback
7. Archive legacy package
