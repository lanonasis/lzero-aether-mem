import * as vscode from 'vscode';

class MemorySidebarProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'lzero.memorySidebar';

  constructor(
    private readonly context: vscode.ExtensionContext,
    private readonly output: vscode.OutputChannel,
  ) {}

  private view?: vscode.WebviewView;

  resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken,
  ): void {
    this.view = webviewView;
    const webview = webviewView.webview;

    webview.options = {
      enableScripts: true,
    };

    this.output.appendLine(
      '[LanOnasis] Initializing sidebar webview using bundled React UI',
    );

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
        const text = (message as { payload?: { text?: string } }).payload?.text;
        if (typeof text === 'string') {
          vscode.env.clipboard.writeText(text).then(
            undefined,
            (err: unknown) => {
              this.output.appendLine(
                `[LanOnasis] Failed to write clipboard text: ${String(err)}`,
              );
            },
          );
        }
        return;
      }

      const type = (message as { type?: string }).type ?? 'unknown';
      this.output.appendLine(
        `[LanOnasis] Received message from webview: type="${type}"`,
      );
    });
  }

  private async sendConfigToWebview(webview: vscode.Webview): Promise<void> {
    const configuration = vscode.workspace.getConfiguration('lanonasis');
    const apiUrl =
      configuration.get<string>('apiUrl') || 'https://api.lanonasis.com/api/v1';
    const apiKey = await this.context.secrets.get('lanonasis.apiKey');

    this.output.appendLine(
      `[LanOnasis] Sending config to webview (apiUrl=${apiUrl}, apiKey=${
        apiKey ? '***' : 'none'
      })`,
    );

    webview.postMessage({
      type: 'lanonasis:config:init',
      payload: {
        apiUrl,
        apiKey,
      },
    });
  }
  public postMessage(message: unknown) {
    if (!this.view) {
      this.output.appendLine(
        '[LanOnasis] No active webview to post message to; ignoring message.',
      );
      return;
    }

    this.view.webview.postMessage(message);
  }

  private getWebviewHtml(webview: vscode.Webview): string {
    const nonce = getNonce();

    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(
        this.context.extensionUri,
        'media',
        'sidebar-react.js',
      ),
    );

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

function getNonce(): string {
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let text = '';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export function activate(context: vscode.ExtensionContext) {
  const output = vscode.window.createOutputChannel('LanOnasis Memory');
  const provider = new MemorySidebarProvider(context, output);

  context.subscriptions.push(
    output,
    vscode.window.registerWebviewViewProvider(
      MemorySidebarProvider.viewType,
      provider,
      {
        webviewOptions: {
          retainContextWhenHidden: true,
        },
      },
    ),
    vscode.commands.registerCommand('lzeroMemory.authenticate', async () => {
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
      output.appendLine(
        '[LanOnasis] API key stored in VS Code SecretStorage.',
      );

      provider.postMessage({
        type: 'lanonasis:config:update',
        payload: { apiKey },
      });

      await vscode.window.showInformationMessage(
        'LanOnasis: API key saved for this environment.',
      );
    }),
    vscode.commands.registerCommand(
      'lzeroMemory.createMemoryFromSelection',
      async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
          await vscode.window.showInformationMessage(
            'LanOnasis: No active editor. Open a file and select some text first.',
          );
          return;
        }

        const selection = editor.selection;
        const text = selection.isEmpty
          ? editor.document.getText()
          : editor.document.getText(selection);

        if (!text.trim()) {
          await vscode.window.showInformationMessage(
            'LanOnasis: No text selected and document is empty.',
          );
          return;
        }

        output.appendLine(
          '[LanOnasis] Sending selection to webview as create-from-selection payload',
        );

        provider.postMessage({
          type: 'lanonasis:memory:createFromSelection',
          payload: { text },
        });

        // Optionally ensure the LanOnasis view is visible
        await vscode.commands.executeCommand(
          'workbench.view.extension.lanonasis',
        );
      },
    ),
  );

  output.appendLine('[LanOnasis] Extension activated');
}

export function deactivate() {
  // No-op for now
}
