"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(extension_exports);
var vscode = __toESM(require("vscode"));
var crypto = __toESM(require("crypto"));
var STORAGE_KEYS = {
  API_KEY: "lanonasis.apiKey",
  OAUTH_TOKENS: "lanonasis.tokens"
};
var VALID_API_KEY_PREFIXES = ["lano_", "lns_"];
function isValidApiKeyFormat(apiKey) {
  return VALID_API_KEY_PREFIXES.some((prefix) => apiKey.startsWith(prefix));
}
var OAUTH_CONFIG = {
  clientId: "lzero-memory-vscode",
  authBaseUrl: "https://auth.lanonasis.com",
  redirectUri: "vscode://lanonasis.lzero-memory/callback",
  scope: "memory:read memory:write api_keys:manage"
};
var VSCodeOAuthFlow = class {
  constructor(output) {
    this.output = output;
    this.pendingAuth = null;
  }
  generateRandomString(length = 32) {
    const bytes = crypto.randomBytes(length);
    return bytes.toString("base64url").slice(0, length);
  }
  generateCodeChallenge(verifier) {
    const hash = crypto.createHash("sha256").update(verifier).digest();
    return hash.toString("base64url");
  }
  buildAuthorizationUrl(codeChallenge, state) {
    const params = new URLSearchParams({
      client_id: OAUTH_CONFIG.clientId,
      response_type: "code",
      redirect_uri: OAUTH_CONFIG.redirectUri,
      scope: OAUTH_CONFIG.scope,
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
      state
    });
    return OAUTH_CONFIG.authBaseUrl + "/oauth/authorize?" + params.toString();
  }
  async exchangeCodeForTokens(code, codeVerifier) {
    const response = await fetch(OAUTH_CONFIG.authBaseUrl + "/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code,
        client_id: OAUTH_CONFIG.clientId,
        redirect_uri: OAUTH_CONFIG.redirectUri,
        code_verifier: codeVerifier
      })
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error_description || data.error || "Token exchange failed");
    }
    return data;
  }
  handleCallback(uri) {
    if (!this.pendingAuth) {
      this.output.appendLine("[LanOnasis] Received OAuth callback but no pending auth");
      return;
    }
    const params = new URLSearchParams(uri.query);
    const code = params.get("code");
    const state = params.get("state");
    const error = params.get("error");
    if (error) {
      const errorDesc = params.get("error_description") || error;
      this.pendingAuth.reject(new Error(errorDesc));
      this.pendingAuth = null;
      return;
    }
    if (state !== this.pendingAuth.state) {
      this.pendingAuth.reject(new Error("State mismatch"));
      this.pendingAuth = null;
      return;
    }
    if (!code) {
      this.pendingAuth.reject(new Error("No authorization code received"));
      this.pendingAuth = null;
      return;
    }
    this.pendingAuth.resolve(code);
  }
  async authenticate() {
    const codeVerifier = this.generateRandomString(43);
    const codeChallenge = this.generateCodeChallenge(codeVerifier);
    const state = this.generateRandomString(32);
    const authUrl = this.buildAuthorizationUrl(codeChallenge, state);
    const codePromise = new Promise((resolve, reject) => {
      this.pendingAuth = { codeVerifier, state, resolve, reject };
      setTimeout(() => {
        if (this.pendingAuth) {
          this.pendingAuth.reject(new Error("OAuth flow timed out"));
          this.pendingAuth = null;
        }
      }, 5 * 60 * 1e3);
    });
    this.output.appendLine("[LanOnasis] Opening browser for OAuth...");
    const opened = await vscode.env.openExternal(vscode.Uri.parse(authUrl));
    if (!opened) {
      this.pendingAuth = null;
      throw new Error("Failed to open browser");
    }
    const code = await codePromise;
    this.output.appendLine("[LanOnasis] Exchanging code for tokens...");
    const tokens = await this.exchangeCodeForTokens(code, codeVerifier);
    this.pendingAuth = null;
    return tokens;
  }
};
var MemorySidebarProvider = class {
  constructor(context, output, oauthFlow) {
    this.context = context;
    this.output = output;
    this.oauthFlow = oauthFlow;
  }
  static {
    this.viewType = "lzero.memorySidebar";
  }
  resolveWebviewView(webviewView, _context, _token) {
    this.view = webviewView;
    const webview = webviewView.webview;
    webview.options = {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.joinPath(this.context.extensionUri, "media")]
    };
    this.output.appendLine("[LanOnasis] Initializing sidebar webview");
    webview.html = this.getWebviewHtml(webview);
    webview.onDidReceiveMessage((message) => {
      if (!message || typeof message !== "object") return;
      if (message.type === "lanonasis:webview-ready") {
        this.output.appendLine("[LanOnasis] Webview ready");
        webview.postMessage({ type: "lanonasis:host-ready" });
        void this.sendConfigToWebview(webview);
        return;
      }
      if (message.type === "lanonasis:request-auth") {
        void this.handleOAuthLogin(webview);
        return;
      }
      if (message.type === "lanonasis:submit-api-key") {
        const apiKey = message.payload?.apiKey;
        if (apiKey) void this.handleApiKeySubmit(webview, apiKey);
        return;
      }
      if (message.type === "lanonasis:logout") {
        void this.handleLogout(webview);
        return;
      }
      if (message.type === "lanonasis:clipboard:read") {
        void vscode.env.clipboard.readText().then((text) => {
          webview.postMessage({ type: "lanonasis:clipboard:read:result", payload: { text } });
        });
        return;
      }
      if (message.type === "lanonasis:clipboard:write") {
        const text = message.payload?.text;
        if (typeof text === "string") void vscode.env.clipboard.writeText(text);
        return;
      }
    });
  }
  async sendConfigToWebview(webview) {
    const configuration = vscode.workspace.getConfiguration("lanonasis");
    const apiUrl = configuration.get("apiUrl") || "https://api.lanonasis.com/api/v1";
    let authCredential;
    try {
      const tokensJson = await this.context.secrets.get(STORAGE_KEYS.OAUTH_TOKENS);
      if (tokensJson) {
        const tokens = JSON.parse(tokensJson);
        const issuedAt = tokens.issued_at ?? Date.now();
        const expiresAt = issuedAt + tokens.expires_in * 1e3;
        if (Date.now() <= expiresAt - 5 * 60 * 1e3) {
          authCredential = tokens.access_token;
          this.output.appendLine("[LanOnasis] Found valid OAuth token");
        }
      }
    } catch (err) {
      this.output.appendLine("[LanOnasis] Token error: " + String(err));
    }
    if (!authCredential) {
      try {
        const apiKey = await this.context.secrets.get(STORAGE_KEYS.API_KEY);
        if (apiKey) {
          authCredential = apiKey;
          this.output.appendLine("[LanOnasis] Found API key");
        }
      } catch (err) {
        this.output.appendLine("[LanOnasis] API key error: " + String(err));
      }
    }
    webview.postMessage({ type: "lanonasis:config:init", payload: { apiUrl, apiKey: authCredential } });
  }
  async handleOAuthLogin(webview) {
    try {
      const tokens = await this.oauthFlow.authenticate();
      if (!tokens?.access_token) throw new Error("No tokens received");
      const tokensWithTimestamp = { ...tokens, issued_at: Date.now() };
      await this.context.secrets.store(STORAGE_KEYS.OAUTH_TOKENS, JSON.stringify(tokensWithTimestamp));
      webview.postMessage({ type: "lanonasis:auth:result", payload: { success: true } });
      webview.postMessage({ type: "lanonasis:config:update", payload: { apiKey: tokens.access_token } });
      await vscode.window.showInformationMessage("LanOnasis: Connected via OAuth!");
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      this.output.appendLine("[LanOnasis] OAuth error: " + msg);
      webview.postMessage({ type: "lanonasis:auth:result", payload: { success: false, error: msg } });
    }
  }
  async handleApiKeySubmit(webview, apiKey) {
    try {
      if (!apiKey || !isValidApiKeyFormat(apiKey)) {
        webview.postMessage({ type: "lanonasis:auth:result", payload: { success: false, error: "Invalid API key format" } });
        return;
      }
      await this.context.secrets.store(STORAGE_KEYS.API_KEY, apiKey);
      webview.postMessage({ type: "lanonasis:auth:result", payload: { success: true } });
      webview.postMessage({ type: "lanonasis:config:update", payload: { apiKey } });
      await vscode.window.showInformationMessage("LanOnasis: Connected!");
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      webview.postMessage({ type: "lanonasis:auth:result", payload: { success: false, error: msg } });
    }
  }
  async handleLogout(webview) {
    try {
      await this.context.secrets.delete(STORAGE_KEYS.API_KEY);
      await this.context.secrets.delete(STORAGE_KEYS.OAUTH_TOKENS);
      webview.postMessage({ type: "lanonasis:config:update", payload: { apiKey: null } });
      await vscode.window.showInformationMessage("LanOnasis: Logged out");
    } catch (error) {
      this.output.appendLine("[LanOnasis] Logout error: " + String(error));
    }
  }
  postMessage(message) {
    if (this.view) this.view.webview.postMessage(message);
  }
  getWebviewHtml(webview) {
    const nonce = getNonce();
    const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, "media", "sidebar-react.js"));
    const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, "media", "lzero-memory.css"));
    const csp = [
      "default-src 'none'",
      "img-src " + webview.cspSource + " https: data:",
      "style-src " + webview.cspSource + " 'unsafe-inline'",
      "font-src " + webview.cspSource + " https: data:",
      "script-src 'nonce-" + nonce + "' 'wasm-unsafe-eval'",
      "connect-src https: wss: http://localhost:*"
    ].join("; ");
    return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta http-equiv="Content-Security-Policy" content="' + csp + '"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><link rel="stylesheet" href="' + styleUri + '"/><title>LanOnasis Memory</title><style>body{background:var(--vscode-sideBar-background,#252526);color:var(--vscode-sideBar-foreground,#ccc);font-family:var(--vscode-font-family,sans-serif);margin:0;padding:0}#loading{padding:20px;text-align:center}#error{padding:20px;color:#f48771;display:none;white-space:pre-wrap;font-size:12px}</style></head><body><div id="loading">Loading L0 Memory...</div><div id="error"></div><div id="root"></div><script nonce="' + nonce + '">var errors=[];window.onerror=function(m,u,l){errors.push(m+" at "+u+":"+l);document.getElementById("error").style.display="block";document.getElementById("error").textContent="JS Error:\\n"+errors.join("\\n");document.getElementById("loading").style.display="none";return false};window.addEventListener("unhandledrejection",function(e){errors.push("Promise: "+(e.reason?.message||e.reason||"Unknown"));document.getElementById("error").style.display="block";document.getElementById("error").textContent="Promise Error:\\n"+errors.join("\\n");document.getElementById("loading").style.display="none"});</script><script nonce="' + nonce + '" type="module" src="' + scriptUri + `" onerror="document.getElementById('error').textContent='Failed to load script';document.getElementById('error').style.display='block';document.getElementById('loading').style.display='none';"></script><script nonce="` + nonce + '">var observer=new MutationObserver(function(){if(document.getElementById("root").children.length>0){document.getElementById("loading").style.display="none";observer.disconnect()}});observer.observe(document.getElementById("root"),{childList:true});setTimeout(function(){if(document.getElementById("root").children.length===0){document.getElementById("error").textContent="React failed to mount";document.getElementById("error").style.display="block";document.getElementById("loading").style.display="none"}},5000);</script></body></html>';
  }
};
function getNonce() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let text = "";
  for (let i = 0; i < 32; i++) text += chars.charAt(Math.floor(Math.random() * chars.length));
  return text;
}
function activate(context) {
  const output = vscode.window.createOutputChannel("LanOnasis Memory");
  output.appendLine("[LanOnasis] Extension activating...");
  const oauthFlow = new VSCodeOAuthFlow(output);
  const uriHandler = vscode.window.registerUriHandler({
    handleUri(uri) {
      output.appendLine("[LanOnasis] URI callback: " + uri.path);
      if (uri.path === "/callback") oauthFlow.handleCallback(uri);
    }
  });
  context.subscriptions.push(uriHandler);
  const provider = new MemorySidebarProvider(context, output, oauthFlow);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(MemorySidebarProvider.viewType, provider, { webviewOptions: { retainContextWhenHidden: true } })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("lzeroMemory.authenticate", async () => {
      try {
        const tokens = await oauthFlow.authenticate();
        if (tokens.access_token) {
          await context.secrets.store(STORAGE_KEYS.OAUTH_TOKENS, JSON.stringify({ ...tokens, issued_at: Date.now() }));
          await vscode.window.showInformationMessage("LanOnasis: Authenticated!");
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        await vscode.window.showErrorMessage("LanOnasis: Auth failed - " + msg);
      }
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("lzeroMemory.createMemoryFromSelection", async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        await vscode.window.showInformationMessage("No active editor");
        return;
      }
      const text = editor.document.getText(editor.selection);
      if (!text) {
        await vscode.window.showInformationMessage("No text selected");
        return;
      }
      provider.postMessage({ type: "lanonasis:inject-chat", payload: { text } });
      await vscode.commands.executeCommand("lzero.memorySidebar.focus");
    })
  );
  output.appendLine("[LanOnasis] Extension activated");
}
function deactivate() {
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
//# sourceMappingURL=extension.js.map
