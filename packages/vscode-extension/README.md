# L0 Memory (VS Code Extension)

[![VS Code Marketplace](https://img.shields.io/visual-studio-marketplace/v/lanonasis.lzero-memory?label=VS%20Code%20Marketplace&logo=visual-studio-code&style=flat-square)](https://marketplace.visualstudio.com/items?itemName=lanonasis.lzero-memory)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/lanonasis.lzero-memory?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=lanonasis.lzero-memory)
[![Rating](https://img.shields.io/visual-studio-marketplace/r/lanonasis.lzero-memory?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=lanonasis.lzero-memory)
[![License](https://img.shields.io/github/license/lanonasis/lzero-aether-mem?style=flat-square)](https://github.com/lanonasis/lzero-aether-mem/blob/main/LICENSE)

L0 Memory is the **LanOnasis Memory-as-a-Service companion** for VS Code.

It brings your cross-platform memory system directly into the editor with:

- **Rich sidebar UI** built with React (IDEPanel)
- **Editor selection → memory chat** via `L0 Memory: Create Memory from Selection`
- **Clipboard integration** for attaching snippets and copying memories
- **API key management** backed by the LanOnasis MaaS `/api/v1` services

## Features

- **L0-branded sidebar** with Memory Assistant, Memories list, and Chat
- **Secure auth**
  - `L0 Memory: Authenticate` stores your API key in VS Code SecretStorage
  - API base URL is configurable via `LanOnasis › Api Url`
- **MaaS integration**
  - Uses the shared L0/LanOnasis SDK to talk to `/api/v1/memory` and security APIs
- **VS Code integration**
  - Command palette entries
  - Uses the current editor selection as memory/chat input
  - Clipboard read/write bridged through the VS Code host

## Commands

- `L0 Memory: Authenticate` (`lzeroMemory.authenticate`)
- `L0 Memory: Create Memory from Selection` (`lzeroMemory.createMemoryFromSelection`)

## Configuration

Under `LanOnasis` settings:

- **`lanonasis.apiUrl`** – Base URL for the LanOnasis Memory API (default: `https://api.lanonasis.com/api/v1`).

## Requirements

- VS Code `^1.80.0`
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
