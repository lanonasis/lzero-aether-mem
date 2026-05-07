# VSCode Extension Context

## Purpose

VS Code sidebar panel extension that provides memory search, capture, and intelligence features directly in the IDE. Allows developers to recall context without leaving their editor.

## Key Files

- `packages/vscode-extension/src/extension.ts` - Extension activation, command registration
- `packages/vscode-extension/src/services/MemoryIntelligenceService.ts` - Wraps SDK for VSCode context
- `packages/vscode-extension/src/providers/MemorySidebarProvider.ts` - Webview panel provider
- `packages/vscode-extension/src/handlers/messageHandler.ts` - Webview <-> extension message passing
- `packages/vscode-extension/package.json` - Extension manifest (commands, views, activation events)
- `packages/vscode-extension/media/` - Static assets for webview
- `packages/vscode-extension/out/` - Compiled output

## Architecture

The extension uses a **webview-based sidebar**:
1. `MemorySidebarProvider` implements `vscode.WebviewViewProvider`
2. Renders a React app inside the webview
3. `messageHandler.ts` bridges webview messages to extension commands
4. `MemoryIntelligenceService` analyzes active editor context using `@lanonasis/mem-intel-sdk`

## Commands (Planned)

- `lanonasis.analyzeContext` - Analyze current editor content
- `lanonasis.detectDuplicates` - Find duplicate code patterns
- `lanonasis.suggestTags` - Smart tag suggestions for selected text
- `lanonasis.assessQuality` - Memory quality metrics

## Integration Points

- **Shared package**: Imports types and SDK types
- **mem-intel-sdk**: `MemoryIntelligenceService` extended for editor context
- **Backend API**: May sync memories to cloud (optional)

## Build

```bash
bun run build:extension   # Compiles TypeScript, bundles for VSCode
```

Install locally:
```bash
code --install-extension packages/vscode-extension/lanonasis-memory-*.vsix
```

## Constraints

- Bundle size matters: VSCode extension marketplace has size limits
- Webview runs in isolated context; message passing is required for file system access
- Activation events should be minimal to avoid slowing VSCode startup
