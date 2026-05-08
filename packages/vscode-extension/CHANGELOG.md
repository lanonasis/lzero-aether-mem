# Changelog

All notable changes to the L0 Memory VS Code Extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.7] - 2026-05-08

### Fixed

- **Webview Boot Crash** - Resolved `ReferenceError: process is not defined` that prevented the sidebar from mounting in standard VS Code. The webview bundle now eliminates all `process.*` references at compile time via explicit Vite defines, with a runtime polyfill as a safety net. The issue was masked on Windsurf because Windsurf polyfills `process` in its webview host; VS Code does not.

## [0.4.6] - 2026-03-03

### Fixed

- **Sync State** - Fixed the sidebar sync action getting stuck in a perpetual syncing state after a successful refresh
- **OAuth Callback Safety** - Escaped OAuth callback error output before rendering it in the local callback response
- **Webview Secret Handling** - Removed stored credential echoing from extension host config messages into the webview runtime
- **AI Search Correlation** - Matched async search responses back to the correct request bubble instead of mutating the latest message blindly

### Changed

- Webview API calls now proxy through the extension host for authenticated `/api/*` requests
- Refined sidebar auth state updates so the UI reflects successful sign-in and sync completion more reliably

## [0.4.5] - 2026-01-24

### Fixed

- **API Key Endpoint** - Corrected endpoint path from `/api/v1/auth/api-keys` to `/api/v1/api-keys` to match actual backend route structure
- **Memory Assistant Visibility** - Fixed visibility toggle so Memory Assistant panel displays correctly when activated

### Changed

- Build scripts updated from `npm` to `bun` for faster installs and builds

## [0.4.4] - 2026-01-23

### Fixed

- **API Route Migration** - Migrated from Supabase Edge Function paths to REST API endpoints (`/functions/v1/memory-*` → `/memory/*`)
- **Sync Timeout Handling** - Added explicit timeout handling to sync operations to prevent perpetual loading states

### Changed

- API endpoint routing now uses direct REST paths rather than Supabase Edge Function proxies

## [0.4.3] - 2026-01-16

### Added

- **MemoryService** - Core service class handling memory CRUD operations (create, update, delete, search) with consistent error handling
- **SecureApiKeyService** - Credential management service for secure storage and retrieval of API keys and OAuth tokens via VS Code SecretStorage
- **Diagnostics Utility** - Extension health check combining configuration validation, authentication status, and network connectivity checks

### Technical

- Created unified `memory-aligned.ts` types file for consistent MemoryEntry interfaces across the extension
- Refactored credential storage to use VS Code SecretStorage with migration path from legacy storage keys

## [0.4.2] - 2026-01-15

### Changed

- **API URL Resolution** - Introduced `getEdgeFunctionsUrl()` helper to dynamically determine correct Supabase Edge Function URL based on configuration
- Updated `MemorySidebarProvider` to use edge function URL strategy instead of direct API URL

### Fixed

- **Local Memory Deletion** - `IDEPanel` now correctly handles deletion of locally-cached memories before API sync
- Improved API call reliability by selecting appropriate endpoint based on available configuration

## [0.3.1] - 2025-06-20

### Fixed

- **Chat Participant Commands** - Slash commands (`/save`, `/find`, `/list`) now work correctly
- **API Endpoint** - Fixed incorrect `/memories` (plural) → `/memory` (singular) endpoints
- **API Response Parsing** - Fixed data extraction from API responses (`data.data` vs `data.memories`)
- **SDK URL Handling** - Fixed double path issue where SDK was receiving `/api/v1` twice
- **Settings Button** - Settings button in sidebar now properly opens VS Code settings
- **Sync Error Handling** - Network errors properly mark offline mode; API errors don't affect connection status

### Changed

- Improved TypeScript configuration for module resolution compatibility
- Better separation of API URL (for direct fetch) vs base URL (for SDK/webview)

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

[0.4.6]: https://github.com/lanonasis/lzero-aether-mem/releases/tag/vscode-extension-v0.4.6
[0.4.5]: https://github.com/lanonasis/lzero-aether-mem/releases/tag/vscode-extension-v0.4.5
[0.4.4]: https://github.com/lanonasis/lzero-aether-mem/releases/tag/vscode-extension-v0.4.4
[0.4.3]: https://github.com/lanonasis/lzero-aether-mem/releases/tag/vscode-extension-v0.4.3
[0.4.2]: https://github.com/lanonasis/lzero-aether-mem/releases/tag/vscode-extension-v0.4.2
[0.3.1]: https://github.com/lanonasis/lzero-aether-mem/releases/tag/vscode-extension-v0.3.1
[0.3.0]: https://github.com/lanonasis/lzero-aether-mem/releases/tag/vscode-extension-v0.3.0
[0.2.0]: https://github.com/lanonasis/lzero-aether-mem/releases/tag/vscode-extension-v0.2.0
[0.1.1]: https://github.com/lanonasis/lzero-aether-mem/releases/tag/vscode-extension-v0.1.1
[0.1.0]: https://github.com/lanonasis/lzero-aether-mem/releases/tag/vscode-extension-v0.1.0
