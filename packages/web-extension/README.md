# LanOnasis Memory — Chrome Extension

**Memory-as-a-Service companion for your browser.**

## Features

- **Popup Panel** — Quick access to memories from the toolbar
- **Side Panel** (Chrome 114+) — Full-featured memory management
- **Context Menu** — Right-click to save selected text as memory
- **Offline-First** — Works without internet, syncs when online
- **On-Device AI** — Semantic search using local embeddings

## Installation

This extension is not yet published to the Chrome Web Store. To install locally:

1. Build the extension:

```bash
cd packages/web-extension
bun install
bun run build
```

2. Open Chrome and navigate to `chrome://extensions`
3. Enable **Developer mode** (top-right)
4. Click **Load unpacked**
5. Select the `packages/web-extension/dist/` directory

## Development

```bash
cd packages/web-extension
bun run dev       # Watch mode with HMR
bun run build     # Production build
```

## Architecture

- **Background service worker** — Handles page analysis, memory sync
- **Content scripts** — Inject into pages to extract content
- **Popup / Side Panel** — React UI powered by `RichPanel` component
- **Manifest V3** — Compatible with Chrome, Edge, and other Chromium browsers

## Build

```bash
bun run build:extension    # From monorepo root
cd packages/web-extension && bun run build   # Or locally
```
