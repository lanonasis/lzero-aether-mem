# Changelog

All notable changes to the L0 Memory Browser Extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-09-19

### Added
- **AI Memory Concierge** — Chat with your memory bank via the Onasis AI Router; responses grounded in your own memories
- **On-Device AI** — Privacy-preserving embedding generation using Chrome's built-in AI LanguageModel (feature-flagged, `L0_FF_ON_DEVICE_AI`)
- **Unified input** — Single textarea handles semantic search, memory creation (`save...`), and AI questions
- **Broadcast wiring** — Side panel receives live `MEMORY_ADDED`, `MEMORY_UPDATED`, `DELETE`, `SYNC_COMPLETED` events
- **Onboarding flow** — First-run redirects to Options page for API key setup
- **Graceful degradation** — On-device AI fallback when AI Router is unavailable; memory search fallback when all AI is offline

### Changed
- **Side panel** — Full redesign with type-colored MemoryCards, gradient accents, vibrant send button
- **Badge** — Orange unsynced memory count on toolbar icon; clears on sync
- **Panel behavior** — Side panel disabled on action click; opens via `Alt+Shift+M` or context menu
- **Permissions narrowed** — `<all_urls>` removed from optional host permissions; `sidePanel`, `offscreen`, `scripting` added
- **Popup removed** — Chrome-only, no popup; side panel is the only UI surface
- **Service worker resilience** — Promise-cache singleton prevents double-sync; throttle gate on alarm wakes

### Fixed
- Race condition: service worker restart mid-`fetch` no longer drops sync
- `chrome.alarms.create` no longer passes unsupported `persist` property
- Badge background color uses valid `rgba(0,0,0,0)` instead of `transparent`
- Manifest `id` field removed (not valid for unpacked MV3)
- JWT decode handles missing `exp` claim without throwing

### Security
- API keys stored in `chrome.storage.local`; token validated before every request
- Content Security Policy restricts `extension_pages` to `script-src 'self' 'wasm-unsafe-eval'`
- On-device AI runs in offscreen document, never touches the network

## [0.1.0] - 2025-12-08

### Added
- Initial release of L0 Memory Browser Extension
- **Popup Panel** - Quick access to memories from toolbar
- **Side Panel** - Full-featured memory management (Chrome 114+)
- **Context Menu** - Right-click to save selected text
- **Omnibox Integration** - Type `mem` in address bar to search
- **Offline Support** - IndexedDB caching with background sync
- **Options Page** - API key and settings management
- **Keyboard Shortcuts**
  - `Alt+M` - Open popup
  - `Alt+Shift+M` - Open side panel
  - `Alt+S` - Save selection as memory

### Security
- API keys stored securely in chrome.storage.local
- Content Security Policy for extension pages

[0.1.0]: https://github.com/lanonasis/lzero-aether-mem/releases/tag/web-extension-v0.1.0
