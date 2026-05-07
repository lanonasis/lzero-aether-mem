# ADR-001: Migration from Local Engine to @lanonasis/mem-intel-sdk

Status: Accepted | Date: 2025-12-19

## Context

The project originally included a local package `packages/context-intelligence-engine` that provided memory analysis, pattern detection, and duplicate detection. This package was:
- 1,468 lines in a single file
- Not imported anywhere in the codebase
- Causing OOM (out-of-memory) errors during build (required ~40GB heap)
- Tightly coupled to MCP server concerns
- Duplicating functionality that existed in a separately maintained SDK

## Decision

Replace the local `context-intelligence-engine` with the published npm package `@lanonasis/mem-intel-sdk`.

## Alternatives Considered

1. **Fix and keep local package** - Rejected: Would require significant refactoring for a package with zero current usage. Maintenance burden would remain.
2. **Inline logic into each package** - Rejected: Would create duplication across web, mobile, VSCode, and web extension packages.
3. **Use @lanonasis/mem-intel-sdk** - Accepted: Already published, tested, optimized. Provides modular imports, React hooks, mobile optimizations, and independent versioning.

## Consequences

**Positive:**
- Build completes in ~30s (previously failed with OOM)
- Zero type errors after migration
- All packages can import SDK functionality consistently
- SDK updates propagate to all packages automatically
- Reduced maintenance burden (centralized in SDK repo)

**Negative:**
- External dependency adds versioning risk (mitigated by pinning version)
- SDK API changes require compatibility updates
- Requires internet for initial `bun install` (but not for runtime)

## Implementation

- Installed `@lanonasis/mem-intel-sdk` at root `package.json`
- Updated `packages/shared/src/types/index.ts` to re-export SDK types
- Archived old package to `_archive/context-intelligence-engine-legacy/`
- Removed failing build filters from `turbo.json`
