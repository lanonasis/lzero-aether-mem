# L0 Memory (VS Code Extension)

[![VS Code Marketplace](https://img.shields.io/visual-studio-marketplace/v/lanonasis.lzero-memory?label=VS%20Code%20Marketplace&logo=visual-studio-code&style=flat-square)](https://marketplace.visualstudio.com/items?itemName=lanonasis.lzero-memory)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/lanonasis.lzero-memory?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=lanonasis.lzero-memory)
[![Rating](https://img.shields.io/visual-studio-marketplace/r/lanonasis.lzero-memory?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=lanonasis.lzero-memory)
[![License](https://img.shields.io/github/license/lanonasis/lzero-aether-mem?style=flat-square)](https://github.com/lanonasis/lzero-aether-mem/blob/main/LICENSE)

L0 Memory is the **LanOnasis Memory-as-a-Service companion** for VS Code.

**🌐 Works everywhere:** VS Code Desktop, [vscode.dev](https://vscode.dev), [github.dev](https://github.dev), and GitHub Codespaces!

It brings your cross-platform memory system directly into the editor with:

- **Chat Participant** (`@memory`) for natural language queries in VS Code Chat
- **Rich sidebar UI** built with React with AI-powered semantic search
- **Offline-first architecture** with local caching and sync queue
- **Editor selection → memory chat** via `L0 Memory: Create Memory from Selection`
- **Clipboard integration** for attaching snippets and copying memories
- **API key management** backed by the LanOnasis MaaS `/api/v1` services

## Platform Support

| Platform | Support |
|----------|---------|
| VS Code Desktop (Windows, macOS, Linux) | ✅ Full Support |
| vscode.dev | ✅ Full Support |
| github.dev | ✅ Full Support |
| GitHub Codespaces | ✅ Full Support |

## Features

### Chat Participant (`@memory`)

Use natural language in VS Code Chat:

```
@memory find my OAuth implementation notes
@memory save Use PKCE flow for mobile OAuth
@memory list
@memory help
```

### Sidebar UI

- **Memory Assistant** - Natural language chat with AI-powered search
- **Memories list** - Browse, search, and manage your memories
- **Offline indicator** - Shows connection status and pending sync count
- **Quick actions** - Create and sync with one click

### Offline-First

- Memories are cached locally using VS Code globalState
- Create memories offline - they sync when back online
- Pending sync queue with visual indicator

### Secure Auth

- `L0 Memory: Authenticate` stores your API key in VS Code SecretStorage
- OAuth 2.0 PKCE flow support
- API base URL is configurable via `lzero.apiUrl`

## Commands

| Command | Description |
|---------|-------------|
| `L0 Memory: Authenticate` | Sign in with OAuth or API key |
| `L0 Memory: Create Memory from Selection` | Save selected text as a memory |
| `L0 Memory: Sync Memories` | Force sync with the server |
| `L0 Memory: Search Memories` | Quick pick search with copy to clipboard |

## Configuration

Under `LanOnasis` settings:

- **`lanonasis.apiUrl`** – Base URL for the LanOnasis Memory API (default: `https://api.lanonasis.com/api/v1`).

## Requirements

- VS Code `^1.93.0` (for Chat Participant support)
- A valid LanOnasis / L0 **API key** for the MaaS backend.

## Notes

This extension is the **L0 Memory** variant and is designed to coexist with any older "LanOnasis Memory" extensions as a separate identifier:

- Publisher: `lanonasis`
- Identifier: `lanonasis.lzero-memory`

## Installation

### From VS Code Marketplace (Recommended)

1. Open VS Code
2. Go to Extensions (`Cmd+Shift+X` / `Ctrl+Shift+X`)
3. Search for "L0 Memory"
4. Click **Install**

Or install via command line:

```bash
code --install-extension lanonasis.lzero-memory
```

### From VSIX File

Download the latest `.vsix` from [GitHub Releases](https://github.com/lanonasis/lzero-aether-mem/releases) and install:

```bash
code --install-extension lzero-memory-*.vsix
```

## Contributing

See the [main repository](https://github.com/lanonasis/lzero-aether-mem) for contribution guidelines.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for release history.

## License

MIT © [LanOnasis](https://lanonasis.com)
