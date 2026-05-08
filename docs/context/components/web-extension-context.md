# Web Extension Context

## Purpose

Browser extension (Manifest v3) that analyzes web page content and suggests related memories. Allows capturing page snippets as memories directly from the browser.

## Key Files

- `packages/web-extension/src/background/index.ts` - Background service worker
- `packages/web-extension/src/services/ContentAnalyzer.ts` - Page content extraction and analysis
- `packages/web-extension/src/popup/index.tsx` - Popup UI (React)
- `packages/web-extension/public/manifest.json` - Extension manifest (v3)
- `packages/web-extension/package.json` - Package manifest

## Architecture

Manifest v3 structure:
- **Background script**: Service worker handles page analysis requests, finds similar memories
- **Content script**: Injected into pages to extract content (if needed)
- **Popup**: React-based UI showing analysis results and similar memories
- **Options page**: Extension settings

## Key Features

- Extract page content and analyze for memory type
- Get tag suggestions from `ContentAnalyzer`
- Find similar memories from user's library
- Quick save with auto-suggested tags
- Option to view duplicate memories

## Integration Points

- **Shared package**: Imports types and SDK utilities
- **mem-intel-sdk**: `MemoryIntelligenceService` for content analysis
- **Backend API**: Optional cloud sync for cross-device memory access

## Build

```bash
bun run build:extension   # May share build command with VSCode extension depending on turbo config
```

Load unpacked extension in Chrome/Edge/Firefox developer mode for testing.

## Constraints

- Manifest v3 limitations: Service workers have limited lifetime, no persistent background pages
- CSP restrictions in extension context affect how scripts are loaded
- Cross-origin restrictions for content scripts on some pages
- Storage limits in extension local storage vs. unlimited IndexedDB
