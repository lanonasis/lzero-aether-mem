# L0 Memory Browser Extension

[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/placeholder?label=Chrome%20Web%20Store&logo=google-chrome&style=flat-square)](https://chrome.google.com/webstore)
[![Firefox Add-ons](https://img.shields.io/amo/v/placeholder?label=Firefox%20Add-ons&logo=firefox&style=flat-square)](https://addons.mozilla.org)
[![License](https://img.shields.io/github/license/lanonasis/lzero-aether-mem?style=flat-square)](https://github.com/lanonasis/lzero-aether-mem/blob/main/LICENSE)

L0 Memory is the **LanOnasis Memory-as-a-Service companion** for web browsers.

It brings your cross-platform memory system to Chrome, Firefox, Edge, and other Chromium-based browsers with:

- **Popup Panel** - Quick access to memories from the toolbar
- **Side Panel** - Full-featured memory management (Chrome 114+)
- **Context Menu** - Right-click to save selected text as memory
- **Omnibox Integration** - Type `mem` in address bar to search
- **Offline-First Architecture** - Works without internet, syncs when online
- **On-Device AI** - Semantic search using local embeddings

## Features

### Popup Panel
- Quick memory search
- Recent memories list
- One-click memory creation
- Sync status indicator

### Side Panel (Chrome 114+)
- Full RichPanel UI matching mobile PWA
- Memory Assistant chat interface
- Semantic search with AI
- Security key management

### Context Menu
- "Save to L0 Memory" on text selection
- "Search L0 Memory" for selected text
- Quick capture from any webpage

### Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| `Alt+M` | Open popup |
| `Alt+Shift+M` | Open side panel |
| `Alt+S` | Save selection as memory |

### Offline Support
- Memories cached in IndexedDB
- Background sync when online
- Pending queue indicator
- On-device semantic search

## Installation

### From Chrome Web Store (Recommended)
1. Visit the [Chrome Web Store](https://chrome.google.com/webstore)
2. Search for "L0 Memory"
3. Click **Add to Chrome**

### From Firefox Add-ons
1. Visit [Firefox Add-ons](https://addons.mozilla.org)
2. Search for "L0 Memory"
3. Click **Add to Firefox**

### Development Build
```bash
cd packages/web-extension
npm install
npm run dev        # Development with hot reload
npm run build      # Production build
npm run package    # Create distributable ZIP
```

Load unpacked extension:
1. Chrome: `chrome://extensions` → Enable Developer Mode → Load unpacked → Select `dist/`
2. Firefox: `about:debugging` → This Firefox → Load Temporary Add-on → Select `dist/manifest.json`

## Architecture

```
packages/web-extension/
├── src/
│   ├── background/          # Service worker (MV3)
│   │   ├── index.ts         # Main background script
│   │   ├── contextMenu.ts   # Context menu handlers
│   │   ├── omnibox.ts       # Address bar integration
│   │   └── sync.ts          # Background sync logic
│   ├── popup/               # Toolbar popup
│   │   ├── Popup.tsx        # React popup component
│   │   ├── index.html       # Popup HTML
│   │   └── main.tsx         # React entry
│   ├── sidepanel/           # Side panel (Chrome 114+)
│   │   ├── SidePanel.tsx    # Full RichPanel UI
│   │   ├── index.html       # Side panel HTML
│   │   └── main.tsx         # React entry
│   ├── content/             # Content scripts
│   │   └── index.ts         # Page integration
│   ├── options/             # Options page
│   │   ├── Options.tsx      # Settings UI
│   │   └── index.html       # Options HTML
│   ├── shared/              # Shared utilities
│   │   ├── storage.ts       # Chrome storage wrapper
│   │   ├── messaging.ts     # Message passing
│   │   └── cache.ts         # IndexedDB cache
│   └── styles/              # Shared styles
│       └── globals.css      # Tailwind base
├── public/
│   ├── icons/               # Extension icons
│   │   ├── icon-16.png
│   │   ├── icon-32.png
│   │   ├── icon-48.png
│   │   └── icon-128.png
│   └── _locales/            # i18n
│       └── en/messages.json
├── manifest.json            # Extension manifest (MV3)
├── vite.config.ts           # Vite build config
├── tailwind.config.ts       # Tailwind config
└── package.json
```

## Manifest V3 Compatibility

This extension uses Manifest V3 for:
- **Service Workers** instead of background pages
- **chrome.storage.session** for ephemeral data
- **chrome.sidePanel** API for side panel
- **Declarative Net Request** for any network rules

## Cross-Browser Support

| Feature | Chrome | Firefox | Edge | Safari |
|---------|--------|---------|------|--------|
| Popup | ✅ | ✅ | ✅ | ✅ |
| Side Panel | ✅ | ❌ | ✅ | ❌ |
| Context Menu | ✅ | ✅ | ✅ | ✅ |
| Omnibox | ✅ | ✅ | ✅ | ❌ |
| IndexedDB | ✅ | ✅ | ✅ | ✅ |
| Service Worker | ✅ | ✅ | ✅ | ✅ |

## Configuration

### Extension Options
- **API URL** - LanOnasis API endpoint
- **Sync Interval** - Background sync frequency
- **Offline Mode** - Enable/disable offline caching
- **AI Model** - Select embedding model for search

### Permissions
```json
{
  "permissions": [
    "storage",
    "contextMenus",
    "sidePanel",
    "activeTab"
  ],
  "host_permissions": [
    "https://api.lanonasis.com/*"
  ]
}
```

## Development

### Prerequisites
- Node.js 18+
- npm or bun

### Commands
```bash
npm run dev          # Start dev server with HMR
npm run build        # Production build
npm run build:chrome # Chrome-specific build
npm run build:firefox # Firefox-specific build
npm run package      # Create ZIP for store submission
npm run lint         # ESLint
npm run typecheck    # TypeScript check
```

### Testing
```bash
npm run test         # Unit tests
npm run test:e2e     # E2E tests with Playwright
```

## Contributing

See the [main repository](https://github.com/lanonasis/lzero-aether-mem) for contribution guidelines.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for release history.

## License

MIT © [LanOnasis](https://lanonasis.com)
