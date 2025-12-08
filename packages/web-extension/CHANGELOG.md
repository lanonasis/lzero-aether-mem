# Changelog

All notable changes to the L0 Memory Browser Extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
