# Changelog

All notable changes to the L0 Memory VS Code Extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

[0.1.1]: https://github.com/lanonasis/lzero-aether-mem/releases/tag/vscode-extension-v0.1.1
[0.1.0]: https://github.com/lanonasis/lzero-aether-mem/releases/tag/vscode-extension-v0.1.0
