# L0 Memory Browser Extension - Implementation Guide

This guide documents the architecture and implementation patterns for the L0 Memory Browser Extension, ensuring consistency with the Mobile PWA and VS Code Extension.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser Extension                         │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────────┐  ┌─────────┐  ┌───────────┐  │
│  │  Popup  │  │  Side Panel │  │ Options │  │  Content  │  │
│  │  (React)│  │   (React)   │  │ (React) │  │  Script   │  │
│  └────┬────┘  └──────┬──────┘  └────┬────┘  └─────┬─────┘  │
│       │              │              │             │         │
│       └──────────────┴──────────────┴─────────────┘         │
│                          │                                   │
│                   chrome.runtime.sendMessage                 │
│                          │                                   │
│                          ▼                                   │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Background Service Worker                 │  │
│  │  ┌─────────────┐  ┌──────────┐  ┌─────────────────┐  │  │
│  │  │MemoryCache  │  │ContextMenu│  │ Omnibox Handler│  │  │
│  │  │ (IndexedDB) │  │  Handler  │  │                 │  │  │
│  │  └─────────────┘  └──────────┘  └─────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
│                          │                                   │
│                          ▼                                   │
│              LanOnasis API (api.lanonasis.com)              │
└─────────────────────────────────────────────────────────────┘
```

## Consistency with Other Platforms

### Shared Patterns

| Feature | Mobile PWA | VS Code Extension | Browser Extension |
|---------|------------|-------------------|-------------------|
| **Memory Cache** | IndexedDB + Zustand | globalState | IndexedDB |
| **Offline Support** | Service Worker | globalState queue | IndexedDB + alarms |
| **AI Search** | On-device (Transformers.js) | Extension host | Background worker |
| **Auth Storage** | localStorage | SecretStorage | chrome.storage.local |
| **UI Framework** | React + Tailwind | React + Tailwind | React + Tailwind |

### UI Component Mapping

The browser extension uses the same component patterns as the demo:

```
Demo (client/src/packages/web-extension/)    →    Extension (packages/web-extension/src/)
├── RichPanel.tsx                            →    ├── sidepanel/SidePanel.tsx
├── Dashboard.tsx                            →    ├── popup/Popup.tsx
└── (shared components)                      →    └── components/
                                                      ├── ui/button.tsx
                                                      ├── ui/input.tsx
                                                      ├── ui/badge.tsx
                                                      ├── ui/scroll-area.tsx
                                                      └── lano-logo.tsx
```

## Message Passing Protocol

All components communicate with the background service worker using a consistent message format:

```typescript
interface Message {
  type: string;
  payload?: any;
}

// Message Types
type MessageType =
  | 'GET_MEMORIES'
  | 'SEARCH_MEMORIES'
  | 'CREATE_MEMORY'
  | 'SYNC_MEMORIES'
  | 'GET_SYNC_STATUS'
  | 'GET_AUTH_STATUS'
  | 'SET_AUTH_TOKEN'
  | 'LOGOUT'
  | 'SEARCH_QUERY';  // For omnibox/context menu → side panel
```

### Example Usage

```typescript
// From popup/sidepanel
chrome.runtime.sendMessage(
  { type: 'SEARCH_MEMORIES', payload: { query: 'OAuth' } },
  (response) => {
    if (Array.isArray(response)) {
      setMemories(response);
    }
  }
);
```

## Memory Cache Implementation

The cache uses IndexedDB for persistent storage, matching the Mobile PWA pattern:

```typescript
interface CachedMemory {
  id: string;
  title: string;
  content: string;
  memory_type: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  source_url?: string;
  // Local-only fields
  _pending?: 'create' | 'update' | 'delete';
  _localId?: string;
  _cachedAt?: number;
}
```

### Sync Strategy

1. **Immediate sync** - When online, sync immediately after local create
2. **Background sync** - Every 5 minutes via chrome.alarms
3. **Manual sync** - User-triggered via UI button
4. **Startup sync** - 5 seconds after extension loads

## Keyboard Shortcuts

| Shortcut | Action | Implementation |
|----------|--------|----------------|
| `Alt+M` | Open popup | `_execute_action` command |
| `Alt+Shift+M` | Open side panel | `open_side_panel` command |
| `Alt+S` | Save selection | `save_selection` command |

## Context Menu Integration

```
L0 Memory
├── Save "[selection]" as Memory
├── Search Memories for "[selection]"
├── ─────────────────────────────
└── Open L0 Memory Panel
```

## Omnibox Integration

Type `mem` followed by a space in the address bar:

```
mem OAuth implementation
     ↓
[Suggestions from local cache]
     ↓
[Opens side panel with search results]
```

## Development Workflow

### Setup

```bash
cd packages/web-extension
npm install
```

### Development

```bash
npm run dev          # Watch mode with HMR
```

Load unpacked:
1. Chrome: `chrome://extensions` → Enable Developer Mode → Load unpacked → Select `dist/`
2. Firefox: `about:debugging` → This Firefox → Load Temporary Add-on

### Build

```bash
npm run build        # Production build
npm run package      # Create ZIP for store submission
```

## Testing Checklist

- [ ] Popup opens and displays memories
- [ ] Side panel opens with full UI
- [ ] Context menu appears on text selection
- [ ] "Save as Memory" creates memory
- [ ] "Search Memories" opens side panel with query
- [ ] Omnibox suggestions appear
- [ ] Offline indicator shows when disconnected
- [ ] Pending sync count updates
- [ ] Manual sync works
- [ ] Background sync triggers
- [ ] Options page saves API key
- [ ] Logout clears all data

## Store Submission

### Chrome Web Store

1. Create developer account ($5 one-time fee)
2. Prepare assets:
   - 128x128 icon
   - 1280x800 screenshot
   - 440x280 tile image
3. Submit ZIP from `npm run package:chrome`

### Firefox Add-ons

1. Create developer account (free)
2. Submit ZIP from `npm run package:firefox`
3. May need source code for review

## Future Enhancements

1. **On-device AI** - Port Transformers.js to service worker (when supported)
2. **Cross-browser sync** - Sync memories across browsers
3. **Tab context** - Auto-capture context from active tab
4. **Snippet highlighting** - Highlight saved snippets on pages
5. **Safari support** - Web Extension API for Safari

## Related Documentation

- [Mobile PWA README](../mobile-pwa/README.md)
- [VS Code Extension README](../vscode-extension/README.md)
- [Shared SDK](../shared/README.md)
- [Main Project README](../../README.md)
