"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
class MemorySidebarProvider {
    constructor(context, output) {
        this.context = context;
        this.output = output;
    }
    resolveWebviewView(webviewView, _context, _token) {
        this.view = webviewView;
        const webview = webviewView.webview;
        webview.options = {
            enableScripts: true,
        };
        this.output.appendLine('[LanOnasis] Initializing sidebar webview using bundled React UI');
        webview.html = this.getWebviewHtml(webview);
        webview.onDidReceiveMessage((message) => {
            if (!message || typeof message !== 'object') {
                return;
            }
            if (message.type === 'lanonasis:webview-ready') {
                this.output.appendLine('[LanOnasis] Webview reported ready');
                webview.postMessage({ type: 'lanonasis:host-ready' });
                void this.sendConfigToWebview(webview);
                return;
            }
            if (message.type === 'lanonasis:clipboard:read') {
                vscode.env.clipboard.readText().then((text) => {
                    webview.postMessage({
                        type: 'lanonasis:clipboard:read:result',
                        payload: { text },
                    });
                });
                return;
            }
            if (message.type === 'lanonasis:clipboard:write') {
                const text = message.payload?.text;
                if (typeof text === 'string') {
                    vscode.env.clipboard.writeText(text).then(undefined, (err) => {
                        this.output.appendLine(`[LanOnasis] Failed to write clipboard text: ${String(err)}`);
                    });
                }
                return;
            }
            const type = message.type ?? 'unknown';
            this.output.appendLine(`[LanOnasis] Received message from webview: type="${type}"`);
        });
    }
    async sendConfigToWebview(webview) {
        const configuration = vscode.workspace.getConfiguration('lanonasis');
        const apiUrl = configuration.get('apiUrl') || 'https://api.lanonasis.com/api/v1';
        const apiKey = await this.context.secrets.get('lanonasis.apiKey');
        this.output.appendLine(`[LanOnasis] Sending config to webview (apiUrl=${apiUrl}, apiKey=${apiKey ? '***' : 'none'})`);
        webview.postMessage({
            type: 'lanonasis:config:init',
            payload: {
                apiUrl,
                apiKey,
            },
        });
    }
    postMessage(message) {
        if (!this.view) {
            this.output.appendLine('[LanOnasis] No active webview to post message to; ignoring message.');
            return;
        }
        this.view.webview.postMessage(message);
    }
    getWebviewHtml(webview) {
        const nonce = getNonce();
        const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, 'media', 'sidebar-react.js'));
        const csp = [
            "default-src 'none'", // Only allow what we explicitly list below
            `img-src ${webview.cspSource} https: data:`,
            `style-src ${webview.cspSource} 'unsafe-inline'`,
            `font-src ${webview.cspSource} https: data:`,
            `script-src 'nonce-${nonce}'`,
        ].join('; ');
        return /* html */ `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="Content-Security-Policy" content="${csp}" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>LanOnasis Memory</title>
  </head>
  <body>
    <div id="root"></div>
    <script nonce="${nonce}" type="module" src="${scriptUri}"></script>
  </body>
</html>`;
    }
}
MemorySidebarProvider.viewType = 'lzero.memorySidebar';
function getNonce() {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let text = '';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
function activate(context) {
    const output = vscode.window.createOutputChannel('LanOnasis Memory');
    const provider = new MemorySidebarProvider(context, output);
    context.subscriptions.push(output, vscode.window.registerWebviewViewProvider(MemorySidebarProvider.viewType, provider, {
        webviewOptions: {
            retainContextWhenHidden: true,
        },
    }), vscode.commands.registerCommand('lzeroMemory.authenticate', async () => {
        output.appendLine('[LanOnasis] Authenticate command invoked');
        // TODO: In a later phase, wire this to OAuth/API key flows using SecretStorage.
        const apiKey = await vscode.window.showInputBox({
            prompt: 'Enter your LanOnasis API key',
            placeHolder: 'lanonasis_xxx...',
            password: true,
            ignoreFocusOut: true,
        });
        if (!apiKey) {
            output.appendLine('[LanOnasis] No API key entered; skipping update.');
            return;
        }
        await context.secrets.store('lanonasis.apiKey', apiKey);
        output.appendLine('[LanOnasis] API key stored in VS Code SecretStorage.');
        provider.postMessage({
            type: 'lanonasis:config:update',
            payload: { apiKey },
        });
        await vscode.window.showInformationMessage('LanOnasis: API key saved for this environment.');
    }), vscode.commands.registerCommand('lzeroMemory.createMemoryFromSelection', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            await vscode.window.showInformationMessage('LanOnasis: No active editor. Open a file and select some text first.');
            return;
        }
        const selection = editor.selection;
        const text = selection.isEmpty
            ? editor.document.getText()
            : editor.document.getText(selection);
        if (!text.trim()) {
            await vscode.window.showInformationMessage('LanOnasis: No text selected and document is empty.');
            return;
        }
        output.appendLine('[LanOnasis] Sending selection to webview as create-from-selection payload');
        provider.postMessage({
            type: 'lanonasis:memory:createFromSelection',
            payload: { text },
        });
        // Optionally ensure the LanOnasis view is visible
        await vscode.commands.executeCommand('workbench.view.extension.lanonasis');
    }));
    output.appendLine('[LanOnasis] Extension activated');
}
function deactivate() {
    // No-op for now
}
//# sourceMappingURL=extension.js.map