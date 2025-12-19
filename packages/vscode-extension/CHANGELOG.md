# Changelog

All notable changes to the L0 Memory VS Code Extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2025-12-19

### Added
- **VS Code for the Web Support** - Extension now works on vscode.dev, github.dev, and GitHub Codespaces
- Dual build system generating both Node.js (`extension.js`) and browser (`extension.web.js`) bundles
- Cross-platform crypto utilities using Web Crypto API
- `extensionKind` configuration for UI and workspace support
- `virtualWorkspaces` and `untrustedWorkspaces` capabilities

### Changed
- Replaced Node.js `crypto` module with Web Crypto API for cross-platform compatibility
- Updated build configuration to produce both desktop and web extension bundles
- Updated description to indicate Desktop & Web support

### Technical
- Added `browser` entry point in package.json
- Added `capabilities` section for virtual workspaces and untrusted workspaces
- Refactored OAuth PKCE flow to use async crypto operations

## [0.2.0] - 2025-12-08

### Added
- **Chat Participant** (`@memory`) for VS Code Chat integration
  - `@memory find [query]` - Semantic search
  - `@memory save [content]` - Create memory
  - `@memory list` - Show recent memories
- **Memory Caching** with offline support using VS Code globalState
- **Natural Language Chat** in sidebar with intent parsing
- **Offline Status Banner** showing connection state and pending sync count
- **AI-Powered Search** via extension host message bridge
- New commands: `L0 Memory: Sync Memories`, `L0 Memory: Search Memories`

### Fixed
- Activity bar icon now uses `currentColor` for proper theme adaptation
- Create and Sync buttons are now always responsive (removed incorrect disabled state)
- Buttons show loading spinners during operations

### Changed
- Minimum VS Code version bumped to 1.93.0 for Chat Participant API
- Added "AI" category to extension

## [0.1.1] - 2025-12-08

### Added
- Marketplace icon (128×128 PNG) for proper display in VS Code and marketplace
- Gallery banner with dark theme branding

### Fixed
- Extension icon now displays correctly in marketplace and extension list
- Reduced VSIX package size from ~3MB to ~123KB by removing stale build artifacts

### Changed
- Cleaned up `.vscodeignore` to exclude unnecessary files

## [0.1.0] - 2025-12-06

### Added
- Initial release of L0 Memory VS Code Extension
- Rich sidebar UI built with React
- OAuth 2.0 PKCE authentication flow
- API key authentication support
- Memory CRUD operations (create, read, delete)
- Semantic search across memories
- Editor selection → memory creation command (`L0 Memory: Create Memory from Selection`)
- Clipboard integration for attaching snippets
- Configurable API endpoint via settings

### Security
- Credentials stored securely in VS Code SecretStorage
- Content Security Policy (CSP) for webview protection

[0.2.0]: https://github.com/lanonasis/lzero-aether-mem/releases/tag/vscode-extension-v0.2.0
[0.1.1]: https://github.com/lanonasis/lzero-aether-mem/releases/tag/vscode-extension-v0.1.1
[0.1.0]: https://github.com/lanonasis/lzero-aether-mem/releases/tag/vscode-extension-v0.1.0
