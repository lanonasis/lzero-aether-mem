# L0 Memory (VS Code Extension)

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
