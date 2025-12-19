import * as vscode from 'vscode';
import { generateRandomString, sha256Base64Url } from './crypto';
import { MemoryCache, CachedMemory } from './memoryCache';
import { MemoryChatParticipant } from './chatParticipant';

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope?: string;
  issued_at?: number;
}

const STORAGE_KEYS = {
  API_KEY: 'lanonasis.apiKey',
  OAUTH_TOKENS: 'lanonasis.tokens',
} as const;

// API configuration
const getApiUrl = (): string => {
  const config = vscode.workspace.getConfiguration('lzero');
  return config.get<string>('apiUrl') || 'https://api.lanonasis.com/api/v1';
};

const VALID_API_KEY_PREFIXES = ['lano_', 'lns_'] as const;

function isValidApiKeyFormat(apiKey: string): boolean {
  return VALID_API_KEY_PREFIXES.some(prefix => apiKey.startsWith(prefix));
}

const OAUTH_CONFIG = {
  clientId: 'vscode-extension',
  authBaseUrl: 'https://auth.lanonasis.com',
  redirectUri: 'vscode://lanonasis.lzero-memory/callback',
  scope: 'memories:read memories:write memories:delete profile',
} as const;

class VSCodeOAuthFlow {
  private pendingAuth: {
    codeVerifier: string;
    state: string;
    resolve: (code: string) => void;
    reject: (error: Error) => void;
  } | null = null;

  constructor(private readonly output: vscode.OutputChannel) { }

  private async generateCodeChallenge(verifier: string): Promise<string> {
    return sha256Base64Url(verifier);
  }

  private buildAuthorizationUrl(codeChallenge: string, state: string): string {
    const params = new URLSearchParams({
      client_id: OAUTH_CONFIG.clientId,
      response_type: 'code',
      redirect_uri: OAUTH_CONFIG.redirectUri,
      scope: OAUTH_CONFIG.scope,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
      state: state,
    });
    return OAUTH_CONFIG.authBaseUrl + '/oauth/authorize?' + params.toString();
  }

  private async exchangeCodeForTokens(code: string, codeVerifier: string): Promise<TokenResponse> {
    const response = await fetch(OAUTH_CONFIG.authBaseUrl + '/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        code,
        client_id: OAUTH_CONFIG.clientId,
        redirect_uri: OAUTH_CONFIG.redirectUri,
        code_verifier: codeVerifier,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error_description || data.error || 'Token exchange failed');
    }
    return data as TokenResponse;
  }

  public handleCallback(uri: vscode.Uri): void {
    if (!this.pendingAuth) {
      this.output.appendLine('[LanOnasis] Received OAuth callback but no pending auth');
      return;
    }

    const params = new URLSearchParams(uri.query);
    const code = params.get('code');
    const state = params.get('state');
    const error = params.get('error');

    if (error) {
      const errorDesc = params.get('error_description') || error;
      this.pendingAuth.reject(new Error(errorDesc));
      this.pendingAuth = null;
      return;
    }

    if (state !== this.pendingAuth.state) {
      this.pendingAuth.reject(new Error('State mismatch'));
      this.pendingAuth = null;
      return;
    }

    if (!code) {
      this.pendingAuth.reject(new Error('No authorization code received'));
      this.pendingAuth = null;
      return;
    }

    this.pendingAuth.resolve(code);
  }

  public async authenticate(): Promise<TokenResponse> {
    const codeVerifier = generateRandomString(43);
    const codeChallenge = await this.generateCodeChallenge(codeVerifier);
    const state = generateRandomString(32);
    const authUrl = this.buildAuthorizationUrl(codeChallenge, state);

    const codePromise = new Promise<string>((resolve, reject) => {
      this.pendingAuth = { codeVerifier, state, resolve, reject };
      setTimeout(() => {
        if (this.pendingAuth) {
          this.pendingAuth.reject(new Error('OAuth flow timed out'));
          this.pendingAuth = null;
        }
      }, 5 * 60 * 1000);
    });

    this.output.appendLine('[LanOnasis] Opening browser for OAuth...');
    const opened = await vscode.env.openExternal(vscode.Uri.parse(authUrl));
    if (!opened) {
      this.pendingAuth = null;
      throw new Error('Failed to open browser');
    }

    const code = await codePromise;
    this.output.appendLine('[LanOnasis] Exchanging code for tokens...');
    const tokens = await this.exchangeCodeForTokens(code, codeVerifier);
    this.pendingAuth = null;
    return tokens;
  }
}

class MemorySidebarProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'lzero.memorySidebar';
  private view?: vscode.WebviewView;

  constructor(
    private readonly context: vscode.ExtensionContext,
    private readonly output: vscode.OutputChannel,
    private readonly oauthFlow: VSCodeOAuthFlow,
    private readonly cache: MemoryCache,
  ) { }

  resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken,
  ): void {
    this.view = webviewView;
    const webview = webviewView.webview;

    webview.options = {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.joinPath(this.context.extensionUri, 'media')],
    };

    this.output.appendLine('[LanOnasis] Initializing sidebar webview');
    webview.html = this.getWebviewHtml(webview);

    webview.onDidReceiveMessage((message) => {
      if (!message || typeof message !== 'object') return;

      if (message.type === 'lanonasis:webview-ready') {
        this.output.appendLine('[LanOnasis] Webview ready');
        webview.postMessage({ type: 'lanonasis:host-ready' });
        // Serve cached memories immediately for fast UX before any network call
        const memories = this.cache.getMemories();
        const status = this.cache.getStatus();
        webview.postMessage({ type: 'lanonasis:cache:data', payload: { memories, status } });

        void this.sendConfigToWebview(webview);
        return;
      }

      if (message.type === 'lanonasis:request-auth') {
        void this.handleOAuthLogin(webview);
        return;
      }

      if (message.type === 'lanonasis:submit-api-key') {
        const apiKey = message.payload?.apiKey;
        if (apiKey) void this.handleApiKeySubmit(webview, apiKey as string);
        return;
      }

      if (message.type === 'lanonasis:logout') {
        void this.handleLogout(webview);
        return;
      }

      if (message.type === 'lanonasis:clipboard:read') {
        void vscode.env.clipboard.readText().then((text) => {
          webview.postMessage({ type: 'lanonasis:clipboard:read:result', payload: { text } });
        });
        return;
      }

      if (message.type === 'lanonasis:clipboard:write') {
        const text = message.payload?.text;
        if (typeof text === 'string') void vscode.env.clipboard.writeText(text);
        return;
      }

      // Memory cache operations
      if (message.type === 'lanonasis:cache:get') {
        const memories = this.cache.getMemories();
        const status = this.cache.getStatus();
        webview.postMessage({
          type: 'lanonasis:cache:data',
          payload: { memories, status }
        });
        return;
      }

      if (message.type === 'lanonasis:cache:search') {
        const query = message.payload?.query as string;
        if (query) {
          const results = this.cache.semanticSearchLocal(query);
          webview.postMessage({
            type: 'lanonasis:cache:search:result',
            payload: { results, query }
          });
        }
        return;
      }

      if (message.type === 'lanonasis:cache:add') {
        const memory = message.payload?.memory;
        if (memory) {
          void this.cache.addLocal(memory).then((created) => {
            webview.postMessage({
              type: 'lanonasis:cache:added',
              payload: { memory: created }
            });
          });
        }
        return;
      }

      if (message.type === 'lanonasis:cache:sync') {
        void this.syncMemories(webview);
        return;
      }

      if (message.type === 'lanonasis:ai:search') {
        const query = message.payload?.query as string;
        if (query) {
          void this.handleAISearch(webview, query);
        }
        return;
      }
    });
  }

  private async syncMemories(webview: vscode.Webview): Promise<void> {
    this.cache.setSyncing(true);
    webview.postMessage({ type: 'lanonasis:sync:start' });

    try {
      const apiKey = await this.getStoredApiKey();
      if (!apiKey) {
        webview.postMessage({ type: 'lanonasis:sync:error', payload: { error: 'Not authenticated' } });
        return;
      }

      const apiUrl = getApiUrl();
      const response = await fetch(`${apiUrl}/memories?limit=100`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const memories = (data.memories || data || []) as CachedMemory[];
      await this.cache.updateFromApi(memories);
      this.cache.setOnline(true);

      webview.postMessage({
        type: 'lanonasis:sync:complete',
        payload: { memories, status: this.cache.getStatus() }
      });
    } catch (err) {
      this.cache.setOnline(false);
      this.output.appendLine(`[LanOnasis] Sync error: ${err}`);
      webview.postMessage({
        type: 'lanonasis:sync:error',
        payload: { error: String(err) }
      });
    } finally {
      this.cache.setSyncing(false);
    }
  }

  private async handleAISearch(webview: vscode.Webview, query: string): Promise<void> {
    try {
      // First, search local cache
      const localResults = this.cache.semanticSearchLocal(query);

      // Send local results immediately
      webview.postMessage({
        type: 'lanonasis:ai:search:local',
        payload: { results: localResults, query }
      });

      // Then try API semantic search
      const apiKey = await this.getStoredApiKey();
      if (apiKey) {
        const apiUrl = getApiUrl();
        const response = await fetch(`${apiUrl}/memories/search?q=${encodeURIComponent(query)}&limit=10`, {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          const apiResults = (data.memories || data || []) as CachedMemory[];
          webview.postMessage({
            type: 'lanonasis:ai:search:api',
            payload: { results: apiResults, query }
          });
        }
      }
    } catch (err) {
      this.output.appendLine(`[LanOnasis] AI search error: ${err}`);
    }
  }

  private async getStoredApiKey(): Promise<string | undefined> {
    try {
      const tokensJson = await this.context.secrets.get(STORAGE_KEYS.OAUTH_TOKENS);
      if (tokensJson) {
        const tokens: TokenResponse = JSON.parse(tokensJson);
        const issuedAt = tokens.issued_at ?? Date.now();
        const expiresAt = issuedAt + (tokens.expires_in * 1000);
        if (Date.now() <= expiresAt - 5 * 60 * 1000) {
          return tokens.access_token;
        }
      }
    } catch { /* ignore */ }

    try {
      return await this.context.secrets.get(STORAGE_KEYS.API_KEY);
    } catch { /* ignore */ }

    return undefined;
  }

  private async sendConfigToWebview(webview: vscode.Webview): Promise<void> {
    // Try new config first, fall back to old for backward compatibility
    const newConfig = vscode.workspace.getConfiguration('lzero');
    const oldConfig = vscode.workspace.getConfiguration('lanonasis');
    const apiUrl = newConfig.get<string>('apiUrl') ||
      oldConfig.get<string>('apiUrl') ||
      'https://api.lanonasis.com/api/v1';
    let authCredential: string | undefined;

    try {
      const tokensJson = await this.context.secrets.get(STORAGE_KEYS.OAUTH_TOKENS);
      if (tokensJson) {
        const tokens: TokenResponse = JSON.parse(tokensJson);

        // Clear tokens if they have old scopes (memory:* or api_keys:manage)
        const hasOldScopes = tokens.scope && (
          tokens.scope.includes('memory:') ||
          tokens.scope.includes('api_keys:manage')
        );

        if (hasOldScopes) {
          this.output.appendLine('[LanOnasis] Clearing cached tokens with old scopes');
          await this.context.secrets.delete(STORAGE_KEYS.OAUTH_TOKENS);
        } else {
          const issuedAt = tokens.issued_at ?? Date.now();
          const expiresAt = issuedAt + (tokens.expires_in * 1000);
          if (Date.now() <= expiresAt - 5 * 60 * 1000) {
            authCredential = tokens.access_token;
            this.output.appendLine('[LanOnasis] Found valid OAuth token');
          }
        }
      }
    } catch (err) {
      this.output.appendLine('[LanOnasis] Token error: ' + String(err));
    }

    if (!authCredential) {
      try {
        const apiKey = await this.context.secrets.get(STORAGE_KEYS.API_KEY);
        if (apiKey) {
          authCredential = apiKey;
          this.output.appendLine('[LanOnasis] Found API key');
        }
      } catch (err) {
        this.output.appendLine('[LanOnasis] API key error: ' + String(err));
      }
    }

    webview.postMessage({ type: 'lanonasis:config:init', payload: { apiUrl, apiKey: authCredential } });
  }

  private async handleOAuthLogin(webview: vscode.Webview): Promise<void> {
    try {
      const tokens = await this.oauthFlow.authenticate();
      if (!tokens?.access_token) throw new Error('No tokens received');

      const tokensWithTimestamp = { ...tokens, issued_at: Date.now() };
      await this.context.secrets.store(STORAGE_KEYS.OAUTH_TOKENS, JSON.stringify(tokensWithTimestamp));

      webview.postMessage({ type: 'lanonasis:auth:result', payload: { success: true } });
      webview.postMessage({ type: 'lanonasis:config:update', payload: { apiKey: tokens.access_token } });
      await vscode.window.showInformationMessage('LanOnasis: Connected via OAuth!');
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      this.output.appendLine('[LanOnasis] OAuth error: ' + msg);
      webview.postMessage({ type: 'lanonasis:auth:result', payload: { success: false, error: msg } });
    }
  }

  private async handleApiKeySubmit(webview: vscode.Webview, apiKey: string): Promise<void> {
    try {
      if (!apiKey || !isValidApiKeyFormat(apiKey)) {
        webview.postMessage({ type: 'lanonasis:auth:result', payload: { success: false, error: 'Invalid API key format' } });
        return;
      }

      await this.context.secrets.store(STORAGE_KEYS.API_KEY, apiKey);
      webview.postMessage({ type: 'lanonasis:auth:result', payload: { success: true } });
      webview.postMessage({ type: 'lanonasis:config:update', payload: { apiKey } });
      await vscode.window.showInformationMessage('LanOnasis: Connected!');
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      webview.postMessage({ type: 'lanonasis:auth:result', payload: { success: false, error: msg } });
    }
  }

  private async handleLogout(webview: vscode.Webview): Promise<void> {
    try {
      await this.context.secrets.delete(STORAGE_KEYS.API_KEY);
      await this.context.secrets.delete(STORAGE_KEYS.OAUTH_TOKENS);
      webview.postMessage({ type: 'lanonasis:config:update', payload: { apiKey: null } });
      await vscode.window.showInformationMessage('LanOnasis: Logged out');
    } catch (error) {
      this.output.appendLine('[LanOnasis] Logout error: ' + String(error));
    }
  }

  public postMessage(message: unknown) {
    if (this.view) this.view.webview.postMessage(message);
  }

  private getWebviewHtml(webview: vscode.Webview): string {
    const nonce = getNonce();
    const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, 'media', 'sidebar-react.js'));
    const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, 'media', 'lzero-memory.css'));

    const csp = [
      "default-src 'none'",
      "img-src " + webview.cspSource + " https: data:",
      "style-src " + webview.cspSource + " 'unsafe-inline'",
      "font-src " + webview.cspSource + " https: data:",
      "script-src 'nonce-" + nonce + "' 'wasm-unsafe-eval'",
      "connect-src https: wss: http://localhost:*",
    ].join('; ');

    return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta http-equiv="Content-Security-Policy" content="' + csp + '"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><link rel="stylesheet" href="' + styleUri + '"/><title>LanOnasis Memory</title><style>body{background:var(--vscode-sideBar-background,#252526);color:var(--vscode-sideBar-foreground,#ccc);font-family:var(--vscode-font-family,sans-serif);margin:0;padding:0}#loading{padding:20px;text-align:center}#error{padding:20px;color:#f48771;display:none;white-space:pre-wrap;font-size:12px}</style></head><body><div id="loading">Loading L0 Memory...</div><div id="error"></div><div id="root"></div><script nonce="' + nonce + '">var errors=[];window.onerror=function(m,u,l){errors.push(m+" at "+u+":"+l);document.getElementById("error").style.display="block";document.getElementById("error").textContent="JS Error:\\n"+errors.join("\\n");document.getElementById("loading").style.display="none";return false};window.addEventListener("unhandledrejection",function(e){errors.push("Promise: "+(e.reason?.message||e.reason||"Unknown"));document.getElementById("error").style.display="block";document.getElementById("error").textContent="Promise Error:\\n"+errors.join("\\n");document.getElementById("loading").style.display="none"});</script><script nonce="' + nonce + '" type="module" src="' + scriptUri + '" onerror="document.getElementById(\'error\').textContent=\'Failed to load script\';document.getElementById(\'error\').style.display=\'block\';document.getElementById(\'loading\').style.display=\'none\';"></script><script nonce="' + nonce + '">var observer=new MutationObserver(function(){if(document.getElementById("root").children.length>0){document.getElementById("loading").style.display="none";observer.disconnect()}});observer.observe(document.getElementById("root"),{childList:true});setTimeout(function(){if(document.getElementById("root").children.length===0){document.getElementById("error").textContent="React failed to mount";document.getElementById("error").style.display="block";document.getElementById("loading").style.display="none"}},5000);</script></body></html>';
  }
}

function getNonce(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let text = '';
  for (let i = 0; i < 32; i++) text += chars.charAt(Math.floor(Math.random() * chars.length));
  return text;
}

export function activate(context: vscode.ExtensionContext) {
  const output = vscode.window.createOutputChannel('LanOnasis Memory');
  output.appendLine('[LanOnasis] Extension activating...');

  // Read retainContextWhenHidden setting (default false)
  const retainContextWhenHidden = vscode.workspace
    .getConfiguration('lzero')
    .get<boolean>('retainContextWhenHidden', false);

  // Initialize memory cache
  const cache = new MemoryCache(context, output);

  const oauthFlow = new VSCodeOAuthFlow(output);

  const uriHandler = vscode.window.registerUriHandler({
    handleUri(uri: vscode.Uri) {
      output.appendLine('[LanOnasis] URI callback: ' + uri.path);
      if (uri.path === '/callback') oauthFlow.handleCallback(uri);
    },
  });
  context.subscriptions.push(uriHandler);

  const provider = new MemorySidebarProvider(context, output, oauthFlow, cache);

  // Initialize Chat Participant (@memory)
  const getApiKey = async (): Promise<string | undefined> => {
    try {
      const tokensJson = await context.secrets.get(STORAGE_KEYS.OAUTH_TOKENS);
      if (tokensJson) {
        const tokens: TokenResponse = JSON.parse(tokensJson);
        return tokens.access_token;
      }
    } catch { /* ignore */ }
    try {
      return await context.secrets.get(STORAGE_KEYS.API_KEY);
    } catch { /* ignore */ }
    return undefined;
  };

  const chatParticipant = new MemoryChatParticipant(
    context,
    output,
    cache,
    getApiUrl(),
    getApiKey,
  );
  chatParticipant.register();

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(MemorySidebarProvider.viewType, provider, {
      webviewOptions: { retainContextWhenHidden },
    }),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('lzeroMemory.authenticate', async () => {
      try {
        const tokens = await oauthFlow.authenticate();
        if (tokens.access_token) {
          await context.secrets.store(STORAGE_KEYS.OAUTH_TOKENS, JSON.stringify({ ...tokens, issued_at: Date.now() }));
          await vscode.window.showInformationMessage('LanOnasis: Authenticated!');
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        await vscode.window.showErrorMessage('LanOnasis: Auth failed - ' + msg);
      }
    }),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('lzeroMemory.createMemoryFromSelection', async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) { await vscode.window.showInformationMessage('No active editor'); return; }
      const text = editor.document.getText(editor.selection);
      if (!text) { await vscode.window.showInformationMessage('No text selected'); return; }
      provider.postMessage({ type: 'lanonasis:inject-chat', payload: { text } });
      await vscode.commands.executeCommand('lzero.memorySidebar.focus');
    }),
  );

  // Sync memories command
  context.subscriptions.push(
    vscode.commands.registerCommand('lzeroMemory.syncMemories', async () => {
      provider.postMessage({ type: 'lanonasis:cache:sync' });
      await vscode.window.showInformationMessage('LanOnasis: Syncing memories...');
    }),
  );

  // Search memories command with quick pick
  context.subscriptions.push(
    vscode.commands.registerCommand('lzeroMemory.searchMemories', async () => {
      const query = await vscode.window.showInputBox({
        prompt: 'Search your memories',
        placeHolder: 'e.g., OAuth implementation, regex pattern...',
      });
      if (query) {
        const results = cache.semanticSearchLocal(query);
        if (results.length === 0) {
          await vscode.window.showInformationMessage(`No memories found for "${query}"`);
          return;
        }
        const items = results.map(m => ({
          label: m.title,
          description: m.memory_type,
          detail: m.content.slice(0, 100) + (m.content.length > 100 ? '...' : ''),
          memory: m,
        }));
        const selected = await vscode.window.showQuickPick(items, {
          placeHolder: `Found ${results.length} memories`,
          matchOnDescription: true,
          matchOnDetail: true,
        });
        if (selected) {
          // Copy to clipboard
          await vscode.env.clipboard.writeText(selected.memory.content);
          await vscode.window.showInformationMessage(`Copied "${selected.label}" to clipboard`);
        }
      }
    }),
  );

  output.appendLine('[LanOnasis] Extension activated');
}

export function deactivate() { }
