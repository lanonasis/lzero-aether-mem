# L0 Memory VS Code Extension - Troubleshooting Guide

> **Last Updated:** December 5, 2025
> **Extension Version:** 0.0.3
> **VS Code Tested:** 1.105.1

---

## Table of Contents

1. [Issue History & Resolutions](#issue-history--resolutions)
2. [Current Known Limitations](#current-known-limitations)
3. [Debugging Checklist](#debugging-checklist)
4. [File Reference](#file-reference)
5. [Quick Rebuild Commands](#quick-rebuild-commands)

---

## Issue History & Resolutions

### Issue 1: Blank Sidebar (No Content Rendered)

**Symptoms:**

- Sidebar shows completely blank/white
- No errors in extension host console
- React components not rendering

**Root Causes & Fixes:**

#### 1.1 CSS Not Linked in Webview HTML

**Problem:** The webview HTML generator wasn't including a link to the CSS file.

**File:** `src/extension.ts`

**Fix Applied:**

```typescript
// Added CSS URI generation
const styleUri = webview.asWebviewUri(
  vscode.Uri.joinPath(this._context.extensionUri, 'media', 'vscode-extension.css')
);

// Added <link> tag in HTML
<link rel="stylesheet" href="${styleUri}" />
```

#### 1.2 Missing localResourceRoots

**Problem:** Webview couldn't access files in the `media/` folder.

**Fix Applied:**

```typescript
webviewView.webview.options = {
  enableScripts: true,
  localResourceRoots: [
    vscode.Uri.joinPath(this._context.extensionUri, "media"),
  ],
};
```

#### 1.3 Content Security Policy (CSP) Too Restrictive

**Problem:** Scripts and styles were blocked by CSP.

**Fix Applied:**

```html
<meta
  http-equiv="Content-Security-Policy"
  content="
  default-src 'none';
  style-src ${cspSource} 'unsafe-inline';
  script-src 'nonce-${nonce}' 'wasm-unsafe-eval';
  img-src ${cspSource} https: data:;
  font-src ${cspSource} data:;
  connect-src https: wss: http://localhost:*;
"
/>
```

**Key CSP additions:**

- `'wasm-unsafe-eval'` - For WebAssembly (AI embeddings)
- `connect-src https: wss: http://localhost:*` - For API calls

---

### Issue 2: Version Mismatch Errors

**Symptoms:**

- `vsce package` fails
- Error: `@types/vscode version X incompatible with engines.vscode`

**Root Cause:** `@types/vscode` was newer than `engines.vscode` in package.json.

**Fix Applied in `package.json`:**

```json
{
  "engines": {
    "vscode": "^1.85.0"
  },
  "devDependencies": {
    "@types/vscode": "^1.85.0"
  }
}
```

**Rule:** `@types/vscode` version must be ≤ `engines.vscode` version.

---

### Issue 3: React Failed to Mount

**Symptoms:**

- Extension loads, but shows "React failed to mount" error
- Console shows dynamic import errors

**Root Cause:** `@xenova/transformers` (AI embedding library) uses dynamic imports and WebAssembly that don't work in VS Code webviews.

**Fix Applied:**

1. **Created stub module** at `src/webview/stubs/transformers.ts`:

```typescript
export const pipeline = async () => {
  throw new Error("@xenova/transformers is not supported in webview context");
};
export const env = { allowLocalModels: false, useBrowserCache: false };
export default { pipeline, env };
```

2. **Added alias in `vite.webview.config.ts`:**

```typescript
resolve: {
  alias: {
    '@xenova/transformers': path.resolve(__dirname, 'src/webview/stubs/transformers.ts'),
  },
},
```

---

### Issue 4: `process is not defined`

**Symptoms:**

- React renders test component but crashes with SDK
- Console error: `ReferenceError: process is not defined`

**Root Cause:** Node.js globals (`process`, `process.env`) don't exist in browser/webview environment.

**Fix Applied in `vite.webview.config.ts`:**

```typescript
define: {
  'process.env': JSON.stringify({
    NODE_ENV: 'production',
    VSCODE_WEBVIEW: 'true',
  }),
  'process.platform': JSON.stringify('browser'),
  'process.version': JSON.stringify(''),
},
```

---

### Issue 5: TypeScript Deprecation Warnings

**Symptoms:**

- IDE shows warnings about `moduleResolution=node10` deprecated
- Warnings about `baseUrl` deprecated

**Fix Applied in `tsconfig.json`:**

```json
{
  "compilerOptions": {
    "ignoreDeprecations": "6.0"
  }
}
```

---

## Current Known Limitations

### ⚠️ AI Embeddings Disabled in Webview

The `@xenova/transformers` library is stubbed out because:

- VS Code webviews have strict CSP
- Dynamic `import()` doesn't work reliably
- Large WASM files (~50MB+) not practical for extension

**Workaround:** AI embeddings should run in the extension host (Node.js context), not the webview. Use message passing:

```typescript
// Webview sends request
vscode.postMessage({ type: "generate-embedding", text: "..." });

// Extension host handles it
webviewView.webview.onDidReceiveMessage((msg) => {
  if (msg.type === "generate-embedding") {
    const embedding = await generateEmbedding(msg.text);
    webviewView.webview.postMessage({ type: "embedding-result", embedding });
  }
});
```

---

## Debugging Checklist

### Sidebar Blank?

1. **Check Developer Tools:**
   - `Cmd+Shift+P` → "Developer: Toggle Developer Tools"
   - Look at Console tab for errors

2. **Verify Build Output:**

   ```bash
   ls -la packages/vscode-extension/media/
   # Should contain: main-*.mjs, vscode-extension.css
   ```

3. **Check Extension Host Logs:**
   - `Cmd+Shift+P` → "Developer: Show Logs" → "Extension Host"

4. **Rebuild Extension:**
   ```bash
   cd packages/vscode-extension
   bun run build:webview
   # Reload VS Code window
   ```

### React Not Rendering?

1. Check for CSP errors in console
2. Verify nonce is in script tag
3. Check if `#root` element exists in HTML
4. Add debug logging in main.tsx

### API Calls Failing?

1. Check CSP `connect-src` includes target domains
2. Verify CORS headers on backend
3. Check network tab in webview devtools

---

## File Reference

| File                         | Purpose                                   |
| ---------------------------- | ----------------------------------------- |
| `src/extension.ts`           | Main extension entry, WebviewViewProvider |
| `src/webview/main.tsx`       | React entry point for webview             |
| `vite.webview.config.ts`     | Vite config for webview bundle            |
| `media/main-*.mjs`           | Built webview JavaScript                  |
| `media/vscode-extension.css` | Built webview CSS                         |
| `tsconfig.json`              | TypeScript config for extension host      |

---

## Quick Rebuild Commands

```bash
# Full rebuild
cd packages/vscode-extension
bun run build:all

# Just webview
bun run build:webview

# Package VSIX
bun run package

# Install VSIX
code --install-extension lanonasis-memory-0.0.3.vsix --force
```

---

## Debug HTML Template

If sidebar is completely blank, temporarily add this debug HTML in `extension.ts`:

```typescript
private _getHtmlForWebview(webview: vscode.Webview): string {
  // ... existing code ...

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="...">
  <link rel="stylesheet" href="${styleUri}" />
  <title>L0 Memory</title>
  <style>
    .debug-error {
      padding: 16px;
      color: #f87171;
      font-family: monospace;
      font-size: 12px;
      background: #1e1e1e;
    }
  </style>
</head>
<body>
  <div id="root"></div>
  <div id="fallback" class="debug-error" style="display:none;">
    React failed to mount. Check console for errors.
  </div>
  <script nonce="${nonce}">
    window.addEventListener('error', function(e) {
      document.getElementById('fallback').style.display = 'block';
      document.getElementById('fallback').textContent = 'Error: ' + e.message;
    });
    setTimeout(function() {
      if (!document.getElementById('root').hasChildNodes()) {
        document.getElementById('fallback').style.display = 'block';
      }
    }, 3000);
  </script>
  <script type="module" nonce="${nonce}" src="${scriptUri}"></script>
</body>
</html>`;
}
```

---

## Contact / Support

For additional help, check:

- VS Code Extension API docs: https://code.visualstudio.com/api
- Vite documentation: https://vitejs.dev
- React in VS Code webviews: https://code.visualstudio.com/api/extension-guides/webview

---

_Document generated from debugging session on December 5, 2025_
