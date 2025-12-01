import * as vscode from 'vscode';

class MemorySidebarProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'lanonasis.memorySidebar';

  constructor(
    private readonly context: vscode.ExtensionContext,
    private readonly output: vscode.OutputChannel,
  ) {}

  resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken,
  ): void {
    const webview = webviewView.webview;

    webview.options = {
      enableScripts: true,
    };

    this.output.appendLine(
      '[LanOnasis] Initializing sidebar webview using bundled React UI',
    );

    webview.html = this.getWebviewHtml(webview);
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
    vscode.commands.registerCommand('lanonasis.authenticate', async () => {
      output.appendLine('[LanOnasis] Authenticate command invoked');
      // TODO: In a later phase, wire this to OAuth/API key flows using SecretStorage.
      await vscode.window.showInformationMessage(
        'LanOnasis: Authentication will be handled by the browser panel for now.',
      );
    }),
  );

  output.appendLine('[LanOnasis] Extension activated');
}

export function deactivate() {
  // No-op for now
}
