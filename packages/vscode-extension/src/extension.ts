import * as vscode from 'vscode';
import { MemoryCache, CachedMemory } from './memoryCache';
import { MemoryChatParticipant } from './chatParticipant';
import { SecureApiKeyService } from './services/SecureApiKeyService';
import { MemoryService } from './services/MemoryService';
import { ApiKeyService, ApiKey, Project, CreateApiKeyRequest } from './services/ApiKeyService';
import { MemoryTreeProvider } from './providers/MemoryTreeProvider';
import { ApiKeyTreeProvider, ApiKeyTreeItem, ProjectTreeItem } from './providers/ApiKeyTreeProvider';
import { runDiagnostics, formatDiagnosticResults } from './utils/diagnostics';
import type { MemoryEntry, MemorySearchResult } from './types/memory-aligned';

// API configuration
// Default to the public API URL
const DEFAULT_API_URL = 'https://api.lanonasis.com';

const getApiUrl = (): string => {
  const config = vscode.workspace.getConfiguration('lzero');
  return config.get<string>('apiUrl') || DEFAULT_API_URL;
};

const getMemoryApiUrl = (): string => {
  const config = vscode.workspace.getConfiguration('lzero');
  const apiUrl = config.get<string>('apiUrl') || DEFAULT_API_URL;
  // Ensure we have the /api/v1 path
  if (apiUrl.endsWith('/api/v1')) {
    return apiUrl;
  }
  return `${apiUrl.replace(/\/$/, '')}/api/v1`;
};

const getDashboardUrl = (): string => {
  const config = vscode.workspace.getConfiguration('lzero');
  return config.get<string>('dashboardUrl') || 'https://lanonasis.com/dashboard';
};

// Get base URL without /api/v1 (for memory-client SDK which adds it internally)
const getApiBaseUrl = (): string => {
  const config = vscode.workspace.getConfiguration('lzero');
  const configUrl = config.get<string>('apiUrl') || DEFAULT_API_URL;
  // Strip /api/v1 suffix if present (for SDK compatibility)
  return configUrl.replace(/\/api\/v1\/?$/, '');
};

const VALID_API_KEY_PREFIXES = ['lano_', 'lns_'] as const;

function isValidApiKeyFormat(apiKey: string): boolean {
  return VALID_API_KEY_PREFIXES.some(prefix => apiKey.startsWith(prefix));
}

interface UserProfile {
  id?: string;
  name?: string;
  email?: string;
}

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  const parts = token.split('.');
  if (parts.length < 2) return null;
  const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
  try {
    let json = '';
    if (typeof Buffer !== 'undefined') {
      json = Buffer.from(padded, 'base64').toString('utf8');
    } else if (typeof atob === 'function') {
      const binary = atob(padded);
      if (typeof TextDecoder !== 'undefined') {
        const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
        json = new TextDecoder().decode(bytes);
      } else {
        json = binary;
      }
    } else {
      return null;
    }
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function getUserProfileFromToken(token?: string): UserProfile | null {
  if (!token || !token.includes('.')) return null;
  const payload = decodeJwtPayload(token);
  if (!payload) return null;

  const email =
    typeof payload.email === 'string'
      ? payload.email
      : typeof payload.user_email === 'string'
        ? payload.user_email
        : typeof payload.upn === 'string'
          ? payload.upn
          : undefined;
  const givenName = typeof payload.given_name === 'string' ? payload.given_name : undefined;
  const familyName = typeof payload.family_name === 'string' ? payload.family_name : undefined;
  const fullName = [givenName, familyName].filter(Boolean).join(' ');
  const name =
    typeof payload.name === 'string'
      ? payload.name
      : typeof payload.preferred_username === 'string'
        ? payload.preferred_username
        : typeof payload.nickname === 'string'
          ? payload.nickname
          : fullName || undefined;
  const id = typeof payload.sub === 'string' ? payload.sub : undefined;

  if (!email && !name && !id) return null;
  return { id, name, email };
}

let memoryCacheInstance: MemoryCache | null = null;

class MemorySidebarProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'lzero.memorySidebar';
  private view?: vscode.WebviewView;

  constructor(
    private readonly context: vscode.ExtensionContext,
    private readonly output: vscode.OutputChannel,
    private readonly secureApiKeyService: SecureApiKeyService,
    private readonly apiKeyService: ApiKeyService,
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

    webview.onDidReceiveMessage((message: any) => {
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

      if (message.type === 'lanonasis:open-settings') {
        void vscode.commands.executeCommand('workbench.action.openSettings', 'lzero');
        return;
      }

      if (message.type === 'lanonasis:open-dashboard') {
        const section = message.payload?.section as string | undefined;
        const baseUrl = getDashboardUrl();
        const targetUrl = section ? `${baseUrl}#${section}` : baseUrl;
        void vscode.env.openExternal(vscode.Uri.parse(targetUrl));
        return;
      }

      if (message.type === 'lanonasis:clipboard:read') {
        void vscode.env.clipboard.readText().then((text: string) => {
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

      if (message.type === 'lanonasis:cache:update') {
        const id = message.payload?.id as string | undefined;
        const updates = message.payload?.updates as Partial<CachedMemory> | undefined;
        if (id && updates) {
          void this.cache.queueUpdate(id, updates).then(() => {
            const updated = this.cache.getMemoryById(id);
            webview.postMessage({
              type: 'lanonasis:cache:updated',
              payload: { memory: updated, status: this.cache.getStatus() }
            });
          });
        }
        return;
      }

      if (message.type === 'lanonasis:cache:delete') {
        const id = message.payload?.id as string | undefined;
        if (id) {
          void this.cache.queueDelete(id).then(() => {
            webview.postMessage({
              type: 'lanonasis:cache:deleted',
              payload: { id, status: this.cache.getStatus() }
            });
          });
        }
        return;
      }

      if (message.type === 'lanonasis:cache:clear') {
        void this.cache.clearAll().then(() => {
          webview.postMessage({
            type: 'lanonasis:cache:cleared',
            payload: { status: this.cache.getStatus() }
          });
        });
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

    // Master timeout for entire sync operation (60 seconds)
    const syncTimeout = setTimeout(() => {
      this.cache.setSyncing(false);
      this.output.appendLine('[LanOnasis] Sync timed out after 60 seconds');
      webview.postMessage({
        type: 'lanonasis:sync:error',
        payload: { error: 'Sync timed out after 60 seconds', isNetworkError: true }
      });
    }, 60000);

    try {
      const headers = await this.getEdgeAuthHeaders();
      if (!headers) {
        clearTimeout(syncTimeout);
        this.cache.setSyncing(false);
        webview.postMessage({ type: 'lanonasis:sync:error', payload: { error: 'Not authenticated' } });
        return;
      }

      const apiUrl = getMemoryApiUrl();

      // Step 1: Push pending changes to API (using Supabase edge functions)
      const pendingQueue = this.cache.getPendingQueue();
      const syncResults: { success: number; failed: number } = { success: 0, failed: 0 };

      for (const pending of pendingQueue) {
        try {
          if (pending._pending === 'create') {
            // POST /memories (REST API)
            const createController = new AbortController();
            const createTimeout = setTimeout(() => createController.abort(), 30000);

            try {
              const createResponse = await fetch(`${apiUrl}/memories`, {
                method: 'POST',
                headers,
                signal: createController.signal,
                body: JSON.stringify({
                  title: pending.title,
                  content: pending.content,
                  memory_type: pending.memory_type,
                  tags: pending.tags,
                }),
              });

              if (createResponse.ok) {
                const created = await createResponse.json();
                const serverMemory = created.data || created.memory || created;
                await this.cache.markSynced(pending._localId || pending.id, serverMemory);
                syncResults.success++;
                this.output.appendLine(`[LanOnasis] Synced new memory: ${pending.title}`);
              } else {
                syncResults.failed++;
                this.output.appendLine(`[LanOnasis] Failed to sync memory: ${pending.title} (${createResponse.status})`);
              }
            } finally {
              clearTimeout(createTimeout);
            }
          } else if (pending._pending === 'update') {
            // POST /memory/update (REST API)
            const updateController = new AbortController();
            const updateTimeout = setTimeout(() => updateController.abort(), 30000);

            try {
              const updateResponse = await fetch(`${apiUrl}/memory/update`, {
                method: 'POST',
                headers,
                signal: updateController.signal,
                body: JSON.stringify({
                  id: pending.id,
                  title: pending.title,
                  content: pending.content,
                  memory_type: pending.memory_type,
                  tags: pending.tags,
                }),
              });

              if (updateResponse.ok) {
                const updated = await updateResponse.json();
                const serverMemory = updated.data || updated.memory || updated;
                await this.cache.markSynced(pending.id, serverMemory);
                syncResults.success++;
              } else {
                syncResults.failed++;
              }
            } finally {
              clearTimeout(updateTimeout);
            }
          } else if (pending._pending === 'delete') {
            // POST /memory/delete (REST API)
            const deleteController = new AbortController();
            const deleteTimeout = setTimeout(() => deleteController.abort(), 30000);

            try {
              const deleteResponse = await fetch(`${apiUrl}/memory/delete`, {
                method: 'POST',
                headers,
                signal: deleteController.signal,
                body: JSON.stringify({ id: pending.id }),
              });

              if (deleteResponse.ok) {
                await this.cache.removePending(pending.id);
                syncResults.success++;
              } else {
                syncResults.failed++;
              }
            } finally {
              clearTimeout(deleteTimeout);
            }
          }
        } catch (pendingErr) {
          syncResults.failed++;
          this.output.appendLine(`[LanOnasis] Error syncing pending item: ${pendingErr}`);
        }
      }

      if (pendingQueue.length > 0) {
        this.output.appendLine(`[LanOnasis] Sync results: ${syncResults.success} succeeded, ${syncResults.failed} failed`);
      }

      // Step 2: Fetch fresh data from API - GET /memories/list (REST API)
      const listController = new AbortController();
      const listTimeout = setTimeout(() => listController.abort(), 30000);

      try {
        const response = await fetch(`${apiUrl}/memories/list?limit=100`, {
          headers,
          signal: listController.signal
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        // API returns { data: { memories: [...] } } or { memories: [...] }
        const memories = (data.data?.memories || data.memories || data.data || data || []) as CachedMemory[];
        await this.cache.updateFromApi(memories);
        this.cache.setOnline(true);

        clearTimeout(syncTimeout);
        webview.postMessage({
          type: 'lanonasis:sync:complete',
          payload: { memories, status: this.cache.getStatus(), syncResults }
        });
      } finally {
        clearTimeout(listTimeout);
      }
    } catch (err) {
      clearTimeout(syncTimeout);
      // Only mark as offline for network errors, not API errors (404, 401, etc.)
      const errorStr = String(err);
      const isNetworkError = errorStr.includes('fetch') ||
        errorStr.includes('network') ||
        errorStr.includes('ECONNREFUSED') ||
        errorStr.includes('ETIMEDOUT') ||
        errorStr.includes('AbortError') ||
        errorStr.includes('aborted');
      if (isNetworkError) {
        this.cache.setOnline(false);
      }
      this.output.appendLine(`[LanOnasis] Sync error: ${err}`);
      webview.postMessage({
        type: 'lanonasis:sync:error',
        payload: { error: errorStr, isNetworkError }
      });
    } finally {
      clearTimeout(syncTimeout);
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

      // Then try API semantic search via REST API
      const apiKey = await this.getStoredApiKey();
      const headers = await this.getEdgeAuthHeaders();
      if (headers) {
        const apiUrl = getMemoryApiUrl();
        const response = await fetch(`${apiUrl}/memories/search`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            query,
            limit: 10,
            threshold: 0.7,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          // API returns { data: { results: [...] } } or { results: [...] }
          const apiResults = (data.data?.results || data.results || data.data || []) as CachedMemory[];
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
      const credentials = await this.secureApiKeyService.getStoredCredentials();
      return credentials?.token;
    } catch (err) {
      this.output.appendLine(`[LanOnasis] Failed to get credentials: ${err}`);
      return undefined;
    }
  }

  private async getEdgeAuthHeaders(): Promise<Record<string, string> | null> {
    try {
      const credentials = await this.secureApiKeyService.getStoredCredentials();
      if (!credentials) {
        return null;
      }

      if (credentials.type === 'oauth') {
        return {
          Authorization: `Bearer ${credentials.token}`,
          'Content-Type': 'application/json',
        };
      }

      return {
        'X-API-Key': credentials.token,
        'Content-Type': 'application/json',
      };
    } catch (err) {
      this.output.appendLine(`[LanOnasis] Failed to build auth headers: ${err}`);
      return null;
    }
  }

  private async sendConfigToWebview(webview: vscode.Webview): Promise<void> {
    // Try new config first, fall back to old for backward compatibility
    const newConfig = vscode.workspace.getConfiguration('lzero');
    const oldConfig = vscode.workspace.getConfiguration('lanonasis');
    // Send base URL to webview (memory-client SDK adds /api/v1 internally)
    const apiUrl = getApiBaseUrl();
    let authCredential: string | undefined;
    let userProfile: UserProfile | null = null;

    try {
      const credentials = await this.secureApiKeyService.getStoredCredentials();
      if (credentials?.token) {
        authCredential = credentials.token;
        userProfile = getUserProfileFromToken(credentials.token);
        if (!userProfile) {
          try {
            const apiUser = await this.apiKeyService.getUserInfo();
            if (apiUser) {
              userProfile = { id: apiUser.id, name: apiUser.name, email: apiUser.email };
            }
          } catch (error) {
            this.output.appendLine('[LanOnasis] Failed to load user profile: ' + String(error));
          }
        }
        this.output.appendLine('[LanOnasis] Found stored credentials');
      }
    } catch (err) {
      this.output.appendLine('[LanOnasis] Token error: ' + String(err));
    }

    webview.postMessage({
      type: 'lanonasis:config:init',
      payload: { apiUrl, apiKey: authCredential, user: userProfile },
    });
  }

  private async handleOAuthLogin(webview: vscode.Webview): Promise<void> {
    try {
      const token = await this.secureApiKeyService.authenticateWithOAuthFlow();
      if (!token) throw new Error('No tokens received');

      let userProfile = getUserProfileFromToken(token);
      if (!userProfile) {
        try {
          const apiUser = await this.apiKeyService.getUserInfo();
          if (apiUser) {
            userProfile = { id: apiUser.id, name: apiUser.name, email: apiUser.email };
          }
        } catch (error) {
          this.output.appendLine('[LanOnasis] Failed to load user profile: ' + String(error));
        }
      }

      webview.postMessage({ type: 'lanonasis:auth:result', payload: { success: true } });
      webview.postMessage({
        type: 'lanonasis:config:update',
        payload: { apiKey: token, user: userProfile },
      });
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

      await this.secureApiKeyService.storeApiKeyDirect(apiKey);
      let userProfile: UserProfile | null = null;
      try {
        const apiUser = await this.apiKeyService.getUserInfo();
        if (apiUser) {
          userProfile = { id: apiUser.id, name: apiUser.name, email: apiUser.email };
        }
      } catch (error) {
        this.output.appendLine('[LanOnasis] Failed to load user profile: ' + String(error));
      }
      webview.postMessage({ type: 'lanonasis:auth:result', payload: { success: true } });
      webview.postMessage({ type: 'lanonasis:config:update', payload: { apiKey, user: userProfile } });
      await vscode.window.showInformationMessage('LanOnasis: Connected!');
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      webview.postMessage({ type: 'lanonasis:auth:result', payload: { success: false, error: msg } });
    }
  }

  private async handleLogout(webview: vscode.Webview): Promise<void> {
    try {
      await this.secureApiKeyService.deleteApiKey();
      webview.postMessage({ type: 'lanonasis:config:update', payload: { apiKey: null, user: null } });
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

function hasViewId(context: vscode.ExtensionContext, viewId: string): boolean {
  const views = context.extension?.packageJSON?.contributes?.views;
  if (!views || typeof views !== 'object') {
    return false;
  }

  return Object.values(views).some((viewList) =>
    Array.isArray(viewList) && viewList.some((view) => view?.id === viewId)
  );
}

/**
 * Entry point for the LanOnasis Memory VS Code extension.
 *
 * This function is called by VS Code when the extension is activated. It is
 * responsible for:
 * - Creating the shared output channel used for logging extension activity.
 * - Initializing the {@link SecureApiKeyService} and starting any required
 *   asynchronous setup (for example, loading or migrating stored credentials).
 * - Constructing core services such as {@link MemoryService} and
 *   {@link ApiKeyService}, which provide access to remote APIs and memory data.
 * - Reading relevant workspace configuration (e.g. `lzero.retainContextWhenHidden`).
 * - Initializing the in-memory cache and any tree or webview providers used
 *   by the extension UI.
 * - Registering commands, views, participants, and other VS Code contributions
 *   on the provided extension context.
 *
 * The activation logic should remain fast and idempotent, as it runs on every
 * activation of the extension and must not block the VS Code UI.
 *
 * @param context VS Code extension context providing workspace-global services,
 *                subscriptions, global state, and access to the secrets store.
 */
export async function activate(context: vscode.ExtensionContext) {
  const output = vscode.window.createOutputChannel('LanOnasis Memory');
  output.appendLine('[LanOnasis] Extension activating...');

  const secureApiKeyService = new SecureApiKeyService(context, output);

  // Properly await initialization to ensure credentials are migrated before use
  try {
    await secureApiKeyService.initialize();
    output.appendLine('[LanOnasis] SecureApiKeyService initialized successfully');
  } catch (initError) {
    output.appendLine(`[LanOnasis] SecureApiKeyService initialization warning: ${initError}`);
    // Continue anyway - the extension can still work without migration
  }

  const memoryService = new MemoryService(secureApiKeyService, output, getMemoryApiUrl());
  const apiKeyService = new ApiKeyService(secureApiKeyService, output);

  // Read retainContextWhenHidden setting (default false)
  const retainContextWhenHidden = vscode.workspace
    .getConfiguration('lzero')
    .get<boolean>('retainContextWhenHidden', false);

  // Initialize memory cache
  const cache = new MemoryCache(context, output, getMemoryApiUrl());
  memoryCacheInstance = cache;

  const provider = new MemorySidebarProvider(context, output, secureApiKeyService, apiKeyService, cache);

  const memoryTreeProvider = new MemoryTreeProvider(memoryService);
  const apiKeyTreeProvider = new ApiKeyTreeProvider(apiKeyService, output);

  const hasMemoriesView = hasViewId(context, 'lzeroMemories');
  const hasApiKeysView = hasViewId(context, 'lzeroApiKeys');

  if (hasMemoriesView) {
    context.subscriptions.push(
      vscode.window.registerTreeDataProvider('lzeroMemories', memoryTreeProvider),
    );
  } else {
    output.appendLine('[LanOnasis] View id lzeroMemories is not registered. Skipping tree provider.');
  }

  if (hasApiKeysView) {
    context.subscriptions.push(
      vscode.window.registerTreeDataProvider('lzeroApiKeys', apiKeyTreeProvider),
    );
  } else {
    output.appendLine('[LanOnasis] View id lzeroApiKeys is not registered. Skipping tree provider.');
  }

  void vscode.commands.executeCommand('setContext', 'lzero.enableApiKeyManagement',
    vscode.workspace.getConfiguration('lzero').get<boolean>('enableApiKeyManagement', true)
  );
  void vscode.commands.executeCommand('setContext', 'lzero.authenticated', false);

  const applyAuthenticationState = async (authenticated: boolean) => {
    await vscode.commands.executeCommand('setContext', 'lzero.authenticated', authenticated);
    await memoryTreeProvider.setAuthenticated(authenticated);
    apiKeyTreeProvider.setAuthenticated(authenticated);
  };

  // Initialize Chat Participant (@memory)
  const getApiKey = async (): Promise<string | undefined> => {
    try {
      const credentials = await secureApiKeyService.getStoredCredentials();
      return credentials?.token;
    } catch (err) {
      output.appendLine(`[LanOnasis] Chat: Failed to get credentials: ${err}`);
      return undefined;
    }
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
    vscode.commands.registerCommand('lzeroMemory.authenticate', async (mode?: 'oauth' | 'apikey') => {
      try {
        let token: string | null = null;

        if (mode === 'oauth') {
          token = await secureApiKeyService.authenticateWithOAuthFlow();
        } else if (mode === 'apikey') {
          token = await secureApiKeyService.promptForApiKeyEntry();
        } else {
          token = await secureApiKeyService.promptForAuthentication();
        }

        if (token) {
          await applyAuthenticationState(true);
          await vscode.window.showInformationMessage('L0 Memory: Authenticated!');
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        await vscode.window.showErrorMessage('L0 Memory: Auth failed - ' + msg);
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

  context.subscriptions.push(
    vscode.commands.registerCommand('lzeroMemory.openMemory', (memory: MemoryEntry | MemorySearchResult) => {
      openMemoryInEditor(memory);
    }),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('lzeroMemory.manageApiKeys', async () => {
      await manageApiKeys(apiKeyService);
    }),
    vscode.commands.registerCommand('lzeroMemory.createProject', async () => {
      await createProject(apiKeyService, apiKeyTreeProvider);
    }),
    vscode.commands.registerCommand('lzeroMemory.viewProjects', async () => {
      await viewProjects(apiKeyService);
    }),
    vscode.commands.registerCommand('lzeroMemory.refreshApiKeys', async () => {
      apiKeyTreeProvider.refresh(true);
    }),
    vscode.commands.registerCommand('lzeroMemory.viewProjectDetails', async (item: ProjectTreeItem) => {
      if (item && item.project) {
        await showProjectDetails(item.project, apiKeyService);
      }
    }),
    vscode.commands.registerCommand('lzeroMemory.viewApiKeyDetails', async (item: ApiKeyTreeItem) => {
      if (item && item.apiKey) {
        await showApiKeyDetails(item.apiKey);
      }
    }),
    vscode.commands.registerCommand('lzeroMemory.createApiKey', async (item: ProjectTreeItem) => {
      if (item && item.project) {
        await createApiKeyForProject(item.project, apiKeyService, apiKeyTreeProvider);
      } else {
        await createApiKey(apiKeyService, apiKeyTreeProvider);
      }
    }),
    vscode.commands.registerCommand('lzeroMemory.rotateApiKey', async (item: ApiKeyTreeItem) => {
      if (item && item.apiKey) {
        await rotateApiKey(item.apiKey, apiKeyService, apiKeyTreeProvider);
      }
    }),
    vscode.commands.registerCommand('lzeroMemory.deleteApiKey', async (item: ApiKeyTreeItem) => {
      if (item && item.apiKey) {
        await deleteApiKey(item.apiKey, apiKeyService, apiKeyTreeProvider);
      }
    }),
    vscode.commands.registerCommand('lzeroMemory.deleteProject', async (item: ProjectTreeItem) => {
      if (item && item.project) {
        await deleteProject(item.project, apiKeyService, apiKeyTreeProvider);
      }
    }),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('lzeroMemory.checkApiKeyStatus', async () => {
      try {
        const hasApiKey = await secureApiKeyService.hasApiKey();
        const status = hasApiKey ? '✅ Configured and stored securely' : '❌ Not configured';

        if (hasApiKey) {
          vscode.window.showInformationMessage(
            `API Key Status: ${status}`,
            'Test Connection',
            'View Security Info'
          ).then(async (selection) => {
            if (selection === 'Test Connection') {
              vscode.commands.executeCommand('lzeroMemory.testConnection');
            } else if (selection === 'View Security Info') {
              vscode.env.openExternal(vscode.Uri.parse('https://docs.lanonasis.com/security/api-keys'));
            }
          });
        } else {
          vscode.window.showInformationMessage(
            `API Key Status: ${status}`,
            'Connect in Browser',
            'Enter API Key'
          ).then((selection) => {
            if (selection === 'Connect in Browser') {
              vscode.commands.executeCommand('lzeroMemory.authenticate', 'oauth');
            } else if (selection === 'Enter API Key') {
              vscode.commands.executeCommand('lzeroMemory.authenticate', 'apikey');
            }
          });
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        vscode.window.showErrorMessage(`Failed to check API key status: ${message}`);
      }
    }),
    vscode.commands.registerCommand('lzeroMemory.clearApiKey', async () => {
      try {
        const hasApiKey = await secureApiKeyService.hasApiKey();
        if (!hasApiKey) {
          vscode.window.showInformationMessage('No API key is currently configured.');
          return;
        }

        const confirmed = await vscode.window.showWarningMessage(
          'Are you sure you want to clear your API key? This will require re-authentication.',
          { modal: true },
          'Clear API Key'
        );

        if (confirmed === 'Clear API Key') {
          await secureApiKeyService.deleteApiKey();
          await applyAuthenticationState(false);
          vscode.window.showInformationMessage('API key cleared successfully.');
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        vscode.window.showErrorMessage(`Failed to clear API key: ${message}`);
      }
    }),
    vscode.commands.registerCommand('lzeroMemory.testConnection', async () => {
      try {
        const hasApiKey = await secureApiKeyService.hasApiKey();
        if (!hasApiKey) {
          vscode.window.showWarningMessage('❌ No API key configured.');
          return;
        }

        await memoryService.testConnection();
        vscode.window.showInformationMessage('✅ Connection test successful!');
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        vscode.window.showErrorMessage(`Connection test failed: ${message}`);
      }
    }),
    vscode.commands.registerCommand('lzeroMemory.runDiagnostics', async () => {
      try {
        output.show();
        output.appendLine('Running comprehensive diagnostics...\n');

        const health = await runDiagnostics(
          context,
          secureApiKeyService,
          memoryService,
          output
        );

        const report = formatDiagnosticResults(health);

        const doc = await vscode.workspace.openTextDocument({
          content: report,
          language: 'markdown'
        });

        await vscode.window.showTextDocument(doc);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        vscode.window.showErrorMessage(`Diagnostics failed: ${message}`);
        output.appendLine(`[Diagnostics] Fatal error: ${message}`);
      }
    }),
    vscode.commands.registerCommand('lzeroMemory.showLogs', () => {
      output.show();
    }),
  );

  context.subscriptions.push({ dispose: () => cache.stopConnectivityCheck() });

  try {
    const hasStoredKey = await secureApiKeyService.hasApiKey();
    await applyAuthenticationState(hasStoredKey);
  } catch (error) {
    output.appendLine(`[LanOnasis] Failed to check auth state: ${error instanceof Error ? error.message : String(error)}`);
  }

  output.appendLine('[LanOnasis] Extension activated');
}

export function deactivate() {
  memoryCacheInstance?.stopConnectivityCheck();
  memoryCacheInstance = null;
}

// ============================================================================
// API KEY MANAGEMENT HELPERS
// ============================================================================

async function manageApiKeys(apiKeyService: ApiKeyService) {
  const quickPickItems = [
    {
      label: '$(key) View API Keys',
      description: 'View all API keys across projects',
      command: 'view'
    },
    {
      label: '$(add) Create API Key',
      description: 'Create a new API key',
      command: 'create'
    },
    {
      label: '$(folder) Manage Projects',
      description: 'Create and manage API key projects',
      command: 'projects'
    },
    {
      label: '$(refresh) Refresh',
      description: 'Refresh API key data',
      command: 'refresh'
    }
  ];

  const selected = await vscode.window.showQuickPick(quickPickItems, {
    placeHolder: 'Choose an API key management action'
  });

  if (!selected) return;

  switch (selected.command) {
    case 'view':
      await viewApiKeys(apiKeyService);
      break;
    case 'create':
      await createApiKey(apiKeyService);
      break;
    case 'projects':
      await viewProjects(apiKeyService);
      break;
    case 'refresh':
      vscode.commands.executeCommand('lzeroMemory.refreshApiKeys');
      break;
  }
}

async function viewApiKeys(apiKeyService: ApiKeyService) {
  try {
    vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: 'Loading API keys...',
      cancellable: false
    }, async () => {
      const apiKeys = await apiKeyService.getApiKeys();

      if (apiKeys.length === 0) {
        vscode.window.showInformationMessage('No API keys found. Create your first API key to get started.');
        return;
      }

      const items = apiKeys.map(key => ({
        label: key.name,
        description: `${key.environment} • ${key.keyType} • ${key.accessLevel}`,
        detail: `Project: ${key.projectId} | Created: ${new Date(key.createdAt).toLocaleDateString()}`,
        apiKey: key
      }));

      const selected = await vscode.window.showQuickPick(items, {
        placeHolder: `Select an API key (${apiKeys.length} found)`
      });

      if (selected) {
        await showApiKeyDetails(selected.apiKey);
      }
    });
  } catch (error) {
    vscode.window.showErrorMessage(`Failed to load API keys: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function createApiKey(apiKeyService: ApiKeyService, _apiKeyTreeProvider?: ApiKeyTreeProvider) {
  try {
    const projects = await apiKeyService.getProjects();

    if (projects.length === 0) {
      const createProjectResponse = await vscode.window.showInformationMessage(
        'No projects found. You need to create a project first.',
        'Create Project', 'Cancel'
      );

      if (createProjectResponse === 'Create Project') {
        await createProject(apiKeyService, undefined);
      }
      return;
    }

    const projectItems = projects.map(p => ({
      label: p.name,
      description: p.description || 'No description',
      project: p
    }));

    const selectedProject = await vscode.window.showQuickPick(projectItems, {
      placeHolder: 'Select a project for the API key'
    });

    if (!selectedProject) return;

    const name = await vscode.window.showInputBox({
      prompt: 'API Key Name',
      placeHolder: 'Enter a name for your API key'
    });

    if (!name) return;

    const value = await vscode.window.showInputBox({
      prompt: 'API Key Value',
      placeHolder: 'Enter the API key value',
      password: true
    });

    if (!value) return;

    type KeyTypeOption = vscode.QuickPickItem & { value: CreateApiKeyRequest['keyType'] };
    const keyTypes: KeyTypeOption[] = [
      { label: 'API Key', value: 'api_key' },
      { label: 'Database URL', value: 'database_url' },
      { label: 'OAuth Token', value: 'oauth_token' },
      { label: 'Certificate', value: 'certificate' },
      { label: 'SSH Key', value: 'ssh_key' },
      { label: 'Webhook Secret', value: 'webhook_secret' },
      { label: 'Encryption Key', value: 'encryption_key' }
    ];

    const selectedKeyType = await vscode.window.showQuickPick(keyTypes, {
      placeHolder: 'Select key type'
    });

    if (!selectedKeyType) return;

    const config = vscode.workspace.getConfiguration('lzero');
    const defaultEnv = config.get<string>('defaultEnvironment', 'development');

    type EnvironmentOption = vscode.QuickPickItem & { value: CreateApiKeyRequest['environment'] };
    const environments: EnvironmentOption[] = [
      { label: 'Development', value: 'development', picked: defaultEnv === 'development' },
      { label: 'Staging', value: 'staging', picked: defaultEnv === 'staging' },
      { label: 'Production', value: 'production', picked: defaultEnv === 'production' }
    ];

    const selectedEnvironment = await vscode.window.showQuickPick(environments, {
      placeHolder: 'Select environment'
    });

    if (!selectedEnvironment) return;

    await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: 'Creating API key...',
      cancellable: false
    }, async () => {
      await apiKeyService.createApiKey({
        name,
        value,
        keyType: selectedKeyType.value,
        environment: selectedEnvironment.value,
        accessLevel: 'team',
        projectId: selectedProject.project.id
      });
    });

    vscode.window.showInformationMessage(`API key "${name}" created successfully`);
    vscode.commands.executeCommand('lzeroMemory.refreshApiKeys');

  } catch (error) {
    vscode.window.showErrorMessage(`Failed to create API key: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function createProject(apiKeyService: ApiKeyService, apiKeyTreeProvider: ApiKeyTreeProvider | undefined) {
  try {
    const name = await vscode.window.showInputBox({
      prompt: 'Project Name',
      placeHolder: 'Enter a name for your project'
    });

    if (!name) return;

    const description = await vscode.window.showInputBox({
      prompt: 'Project Description (optional)',
      placeHolder: 'Enter a description for your project'
    });

    const config = vscode.workspace.getConfiguration('lzero');
    let organizationId = config.get<string>('organizationId');

    if (!organizationId) {
      const orgId = await vscode.window.showInputBox({
        prompt: 'Organization ID',
        placeHolder: 'Enter your organization ID'
      });

      if (!orgId) return;

      await config.update('organizationId', orgId, vscode.ConfigurationTarget.Global);
      organizationId = orgId;
    }

    await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: 'Creating project...',
      cancellable: false
    }, async () => {
      const project = await apiKeyService.createProject({
        name,
        description,
        organizationId: organizationId
      });

      if (apiKeyTreeProvider) {
        await apiKeyTreeProvider.addProject(project);
      }
    });

    vscode.window.showInformationMessage(`Project "${name}" created successfully`);
    vscode.commands.executeCommand('lzeroMemory.refreshApiKeys');

  } catch (error) {
    vscode.window.showErrorMessage(`Failed to create project: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function viewProjects(apiKeyService: ApiKeyService) {
  try {
    vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: 'Loading projects...',
      cancellable: false
    }, async () => {
      const projects = await apiKeyService.getProjects();

      if (projects.length === 0) {
        const createProjectResponse = await vscode.window.showInformationMessage(
          'No projects found. Create your first project to get started.',
          'Create Project', 'Cancel'
        );

        if (createProjectResponse === 'Create Project') {
          await createProject(apiKeyService, undefined);
        }
        return;
      }

      const items = projects.map(project => ({
        label: project.name,
        description: project.description || 'No description',
        detail: `Organization: ${project.organizationId} | Created: ${new Date(project.createdAt).toLocaleDateString()}`,
        project
      }));

      const selected = await vscode.window.showQuickPick(items, {
        placeHolder: `Select a project (${projects.length} found)`
      });

      if (selected) {
        await showProjectDetails(selected.project, apiKeyService);
      }
    });
  } catch (error) {
    vscode.window.showErrorMessage(`Failed to load projects: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function showApiKeyDetails(apiKey: ApiKey) {
  const content = `# API Key: ${apiKey.name}

**Type:** ${apiKey.keyType}
**Environment:** ${apiKey.environment}
**Access Level:** ${apiKey.accessLevel}
**Project ID:** ${apiKey.projectId}
**Created:** ${new Date(apiKey.createdAt).toLocaleString()}
${apiKey.expiresAt ? `**Expires:** ${new Date(apiKey.expiresAt).toLocaleString()}` : '**Expires:** Never'}

## Tags
${apiKey.tags.length > 0 ? apiKey.tags.map((tag: string) => `- ${tag}`).join('\n') : 'No tags'}

## Metadata

\`\`\`json
${JSON.stringify(apiKey.metadata, null, 2)}
\`\`\`
`;

  vscode.workspace.openTextDocument({
    content,
    language: 'markdown'
  }).then(doc => {
    vscode.window.showTextDocument(doc);
  });
}

async function showProjectDetails(project: Project, apiKeyService: ApiKeyService) {
  try {
    const apiKeys = await apiKeyService.getApiKeys(project.id);

    const content = `# Project: ${project.name}

**Description:** ${project.description || 'No description'}
**Organization ID:** ${project.organizationId}
**Created:** ${new Date(project.createdAt).toLocaleString()}
**Team Members:** ${project.teamMembers.length}

## API Keys (${apiKeys.length})
${apiKeys.length > 0 ?
        apiKeys.map((key: ApiKey) => `- **${key.name}** (${key.keyType}, ${key.environment})`).join('\n') :
        'No API keys found in this project'
      }

## Settings

\`\`\`json
${JSON.stringify(project.settings, null, 2)}
\`\`\`
`;

    vscode.workspace.openTextDocument({
      content,
      language: 'markdown'
    }).then((doc: vscode.TextDocument) => {
      vscode.window.showTextDocument(doc);
    });
  } catch (error) {
    vscode.window.showErrorMessage(`Failed to load project details: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function createApiKeyForProject(project: Project, apiKeyService: ApiKeyService, apiKeyTreeProvider?: ApiKeyTreeProvider) {
  try {
    const name = await vscode.window.showInputBox({
      prompt: 'API Key Name',
      placeHolder: 'Enter a name for your API key'
    });

    if (!name) return;

    const value = await vscode.window.showInputBox({
      prompt: 'API Key Value',
      placeHolder: 'Enter the API key value',
      password: true
    });

    if (!value) return;

    type KeyTypeOption = vscode.QuickPickItem & { value: CreateApiKeyRequest['keyType'] };
    const keyTypes: KeyTypeOption[] = [
      { label: 'API Key', value: 'api_key' },
      { label: 'Database URL', value: 'database_url' },
      { label: 'OAuth Token', value: 'oauth_token' },
      { label: 'Certificate', value: 'certificate' },
      { label: 'SSH Key', value: 'ssh_key' },
      { label: 'Webhook Secret', value: 'webhook_secret' },
      { label: 'Encryption Key', value: 'encryption_key' }
    ];

    const selectedKeyType = await vscode.window.showQuickPick(keyTypes, {
      placeHolder: 'Select key type'
    });

    if (!selectedKeyType) return;

    const environments: vscode.QuickPickItem[] = [
      { label: 'Development', description: 'For development use' },
      { label: 'Staging', description: 'For staging/testing' },
      { label: 'Production', description: 'For production use' }
    ];

    const selectedEnv = await vscode.window.showQuickPick(environments, {
      placeHolder: 'Select environment'
    });

    if (!selectedEnv) return;

    const accessLevels: vscode.QuickPickItem[] = [
      { label: 'Public', description: 'Publicly accessible' },
      { label: 'Authenticated', description: 'Requires authentication' },
      { label: 'Team', description: 'Team members only' },
      { label: 'Admin', description: 'Administrators only' },
      { label: 'Enterprise', description: 'Enterprise level access' }
    ];

    const selectedAccess = await vscode.window.showQuickPick(accessLevels, {
      placeHolder: 'Select access level'
    });

    if (!selectedAccess) return;

    const request: CreateApiKeyRequest = {
      name,
      value,
      keyType: selectedKeyType.value,
      environment: selectedEnv.label.toLowerCase() as 'development' | 'staging' | 'production',
      accessLevel: selectedAccess.label.toLowerCase() as 'public' | 'authenticated' | 'team' | 'admin' | 'enterprise',
      projectId: project.id
    };

    await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: 'Creating API key...',
      cancellable: false
    }, async () => {
      const apiKey = await apiKeyService.createApiKey(request);
      vscode.window.showInformationMessage(`API key "${apiKey.name}" created successfully!`);

      if (apiKeyTreeProvider) {
        await apiKeyTreeProvider.addApiKey(project.id, apiKey);
      }
    });
  } catch (error) {
    vscode.window.showErrorMessage(`Failed to create API key: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function rotateApiKey(apiKey: ApiKey, apiKeyService: ApiKeyService, apiKeyTreeProvider?: ApiKeyTreeProvider) {
  try {
    const confirmed = await vscode.window.showWarningMessage(
      `Are you sure you want to rotate API key "${apiKey.name}"? The old key will be invalidated.`,
      { modal: true },
      'Rotate Key'
    );

    if (confirmed !== 'Rotate Key') return;

    await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: 'Rotating API key...',
      cancellable: false
    }, async () => {
      const rotated = await apiKeyService.rotateApiKey(apiKey.id);
      vscode.window.showInformationMessage(`API key "${rotated.name}" rotated successfully!`);

      if (apiKeyTreeProvider) {
        await apiKeyTreeProvider.updateApiKey(apiKey.projectId, rotated);
      }
    });
  } catch (error) {
    vscode.window.showErrorMessage(`Failed to rotate API key: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function deleteApiKey(apiKey: ApiKey, apiKeyService: ApiKeyService, apiKeyTreeProvider?: ApiKeyTreeProvider) {
  try {
    const confirmed = await vscode.window.showWarningMessage(
      `Are you sure you want to delete API key "${apiKey.name}"? This action cannot be undone.`,
      { modal: true },
      'Delete'
    );

    if (confirmed !== 'Delete') return;

    await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: 'Deleting API key...',
      cancellable: false
    }, async () => {
      await apiKeyService.deleteApiKey(apiKey.id);
      vscode.window.showInformationMessage(`API key "${apiKey.name}" deleted successfully.`);

      if (apiKeyTreeProvider) {
        await apiKeyTreeProvider.removeApiKey(apiKey.projectId, apiKey.id);
      }
    });
  } catch (error) {
    vscode.window.showErrorMessage(`Failed to delete API key: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function deleteProject(project: Project, apiKeyService: ApiKeyService, apiKeyTreeProvider?: ApiKeyTreeProvider) {
  try {
    const confirmed = await vscode.window.showWarningMessage(
      `Are you sure you want to delete project "${project.name}"? All API keys in this project will also be deleted. This action cannot be undone.`,
      { modal: true },
      'Delete'
    );

    if (confirmed !== 'Delete') return;

    await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: 'Deleting project...',
      cancellable: false
    }, async () => {
      await apiKeyService.deleteProject(project.id);
      vscode.window.showInformationMessage(`Project "${project.name}" deleted successfully.`);

      if (apiKeyTreeProvider) {
        await apiKeyTreeProvider.removeProject(project.id);
      }
    });
  } catch (error) {
    vscode.window.showErrorMessage(`Failed to delete project: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

function openMemoryInEditor(memory: MemoryEntry | MemorySearchResult) {
  const content = `# ${memory.title}\n\n**Type:** ${memory.memory_type}\n**Created:** ${new Date(memory.created_at).toLocaleString()}\n\n---\n\n${memory.content}`;

  vscode.workspace.openTextDocument({
    content,
    language: 'markdown'
  }).then(doc => {
    vscode.window.showTextDocument(doc);
  });
}
