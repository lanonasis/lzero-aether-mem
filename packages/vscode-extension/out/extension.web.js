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
var vscode7 = __toESM(require("vscode"));

// src/memoryCache.ts
var CACHE_KEYS = {
  MEMORIES: "lzero.memories.cache",
  PENDING_QUEUE: "lzero.memories.pending",
  LAST_SYNC: "lzero.memories.lastSync"
};
var MemoryCache = class {
  constructor(context, output, apiUrl = "https://api.lanonasis.com/api/v1") {
    this.context = context;
    this.output = output;
    this.apiUrl = apiUrl;
    this.memories = [];
    this.pendingQueue = [];
    this.lastSyncAt = null;
    this.isSyncing = false;
    this.isOnline = true;
    this.connectivityCheckInterval = null;
    this.loadFromStorage();
    this.setupNetworkListener();
  }
  loadFromStorage() {
    try {
      const cached = this.context.globalState.get(CACHE_KEYS.MEMORIES, []);
      const pending = this.context.globalState.get(CACHE_KEYS.PENDING_QUEUE, []);
      const lastSync = this.context.globalState.get(CACHE_KEYS.LAST_SYNC, null);
      this.memories = cached;
      this.pendingQueue = pending;
      this.lastSyncAt = lastSync;
      this.output.appendLine(`[MemoryCache] Loaded ${this.memories.length} cached memories, ${this.pendingQueue.length} pending`);
    } catch (err) {
      this.output.appendLine(`[MemoryCache] Load error: ${err}`);
    }
  }
  async saveToStorage() {
    try {
      await this.context.globalState.update(CACHE_KEYS.MEMORIES, this.memories);
      await this.context.globalState.update(CACHE_KEYS.PENDING_QUEUE, this.pendingQueue);
      await this.context.globalState.update(CACHE_KEYS.LAST_SYNC, this.lastSyncAt);
    } catch (err) {
      this.output.appendLine(`[MemoryCache] Save error: ${err}`);
    }
  }
  setupNetworkListener() {
    this.isOnline = true;
    this.startConnectivityCheck();
  }
  startConnectivityCheck() {
    if (this.connectivityCheckInterval) return;
    this.connectivityCheckInterval = setInterval(async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5e3);
        const healthUrl = `${this.apiUrl}/health`;
        const response = await fetch(healthUrl, {
          method: "GET",
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        const wasOffline = !this.isOnline;
        this.isOnline = response.ok;
        if (wasOffline && this.isOnline) {
          this.output.appendLine("[MemoryCache] Network restored - online");
        }
      } catch (err) {
        if (this.isOnline) {
          this.output.appendLine("[MemoryCache] Network check failed - marking offline");
        }
        this.isOnline = false;
      }
    }, 3e4);
  }
  stopConnectivityCheck() {
    if (this.connectivityCheckInterval) {
      clearInterval(this.connectivityCheckInterval);
      this.connectivityCheckInterval = null;
    }
  }
  getStatus() {
    return {
      isOnline: this.isOnline,
      lastSyncAt: this.lastSyncAt,
      pendingCount: this.pendingQueue.length,
      isSyncing: this.isSyncing
    };
  }
  getMemories() {
    return [...this.memories];
  }
  getPendingQueue() {
    return [...this.pendingQueue];
  }
  getMemoryById(id) {
    return this.memories.find((m) => m.id === id || m._localId === id);
  }
  async clearAll() {
    this.memories = [];
    this.pendingQueue = [];
    this.lastSyncAt = null;
    await this.saveToStorage();
  }
  /**
   * Update cache with fresh data from API
   */
  async updateFromApi(apiMemories) {
    this.memories = apiMemories.map((m) => ({
      ...m,
      _cachedAt: Date.now()
    }));
    this.lastSyncAt = Date.now();
    this.isOnline = true;
    await this.saveToStorage();
    this.output.appendLine(`[MemoryCache] Updated cache with ${apiMemories.length} memories from API`);
  }
  /**
   * Add a memory locally (queued for sync if offline)
   */
  async addLocal(memory) {
    const localId = `local_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const newMemory = {
      ...memory,
      id: localId,
      created_at: now,
      updated_at: now,
      _pending: "create",
      _localId: localId,
      _cachedAt: Date.now()
    };
    this.memories.unshift(newMemory);
    this.pendingQueue.push(newMemory);
    await this.saveToStorage();
    this.output.appendLine(`[MemoryCache] Added local memory: ${newMemory.title}`);
    return newMemory;
  }
  /**
   * Mark a memory as synced (replace local ID with server ID)
   */
  async markSynced(localId, serverMemory) {
    const idx = this.memories.findIndex((m) => m.id === localId || m._localId === localId);
    if (idx !== -1) {
      this.memories[idx] = {
        ...serverMemory,
        _pending: void 0,
        _localId: void 0,
        _cachedAt: Date.now()
      };
    }
    this.pendingQueue = this.pendingQueue.filter((m) => m._localId !== localId && m.id !== localId);
    await this.saveToStorage();
  }
  /**
   * Remove a pending item (after successful delete sync)
   */
  async removePending(id) {
    this.pendingQueue = this.pendingQueue.filter((m) => m.id !== id && m._localId !== id);
    this.memories = this.memories.filter((m) => m.id !== id);
    await this.saveToStorage();
  }
  /**
   * Queue a memory update for sync
   */
  async queueUpdate(id, updates) {
    const idx = this.memories.findIndex((m) => m.id === id);
    if (idx === -1) {
      this.output.appendLine(`[MemoryCache] queueUpdate: memory not found for id ${id}`);
      return;
    }
    const existingPending = this.memories[idx]._pending;
    this.memories[idx] = {
      ...this.memories[idx],
      ...updates,
      updated_at: (/* @__PURE__ */ new Date()).toISOString(),
      _pending: existingPending === "create" ? "create" : "update",
      _cachedAt: Date.now()
    };
    const pendingIdx = this.pendingQueue.findIndex((m) => m.id === id);
    if (pendingIdx !== -1) {
      this.pendingQueue[pendingIdx] = this.memories[idx];
    } else {
      this.pendingQueue.push(this.memories[idx]);
    }
    await this.saveToStorage();
  }
  /**
   * Queue a memory delete for sync
   */
  async queueDelete(id) {
    const memory = this.memories.find((m) => m.id === id);
    if (memory) {
      if (memory._localId && memory._pending === "create") {
        this.memories = this.memories.filter((m) => m.id !== id);
        this.pendingQueue = this.pendingQueue.filter((m) => m.id !== id);
      } else {
        const deleteMemory = { ...memory, _pending: "delete" };
        this.memories = this.memories.filter((m) => m.id !== id);
        const pendingIdx = this.pendingQueue.findIndex((m) => m.id === id);
        if (pendingIdx !== -1) {
          this.pendingQueue[pendingIdx] = deleteMemory;
        } else {
          this.pendingQueue.push(deleteMemory);
        }
      }
      await this.saveToStorage();
    }
  }
  /**
   * Search memories locally (simple text match)
   */
  searchLocal(query) {
    const q = query.toLowerCase();
    return this.memories.filter(
      (m) => m.title.toLowerCase().includes(q) || m.content.toLowerCase().includes(q) || m.tags.some((t) => t.toLowerCase().includes(q))
    );
  }
  /**
   * Semantic search using natural language patterns
   * This is a simple keyword-based approach for the extension
   * Real semantic search happens via API
   */
  semanticSearchLocal(query) {
    const q = query.toLowerCase();
    const findPatterns = [
      /find\s+(?:my\s+)?(.+)/i,
      /search\s+(?:for\s+)?(.+)/i,
      /show\s+(?:me\s+)?(.+)/i,
      /get\s+(?:my\s+)?(.+)/i,
      /recall\s+(.+)/i,
      /what\s+(?:was|were|is|are)\s+(?:my\s+)?(.+)/i,
      /where\s+(?:is|are|did)\s+(?:my\s+)?(.+)/i
    ];
    let searchTerms = q;
    for (const pattern of findPatterns) {
      const match = q.match(pattern);
      if (match) {
        searchTerms = match[1] || match[2] || q;
        break;
      }
    }
    const stopWords = ["the", "a", "an", "my", "that", "this", "about", "notes", "note", "memory", "memories"];
    const keywords = searchTerms.split(/\s+/).filter((w) => w.length > 2 && !stopWords.includes(w));
    if (keywords.length === 0) {
      return this.memories.slice(0, 5);
    }
    const scored = this.memories.map((m) => {
      let score = 0;
      const titleLower = m.title.toLowerCase();
      const contentLower = m.content.toLowerCase();
      const tagsLower = m.tags.map((t) => t.toLowerCase());
      for (const kw of keywords) {
        if (titleLower.includes(kw)) score += 3;
        if (contentLower.includes(kw)) score += 1;
        if (tagsLower.some((t) => t.includes(kw))) score += 2;
      }
      return { memory: m, score };
    });
    return scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score).slice(0, 10).map((s) => s.memory);
  }
  setOnline(online) {
    this.isOnline = online;
  }
  setSyncing(syncing) {
    this.isSyncing = syncing;
  }
};

// src/chatParticipant.ts
var vscode = __toESM(require("vscode"));
var PARTICIPANT_ID = "lanonasis.memory";
var MemoryChatParticipant = class {
  constructor(context, output, cache, apiUrl, getApiKey) {
    this.context = context;
    this.output = output;
    this.cache = cache;
    this.apiUrl = apiUrl;
    this.getApiKey = getApiKey;
  }
  register() {
    if (!vscode.chat?.createChatParticipant) {
      this.output.appendLine("[ChatParticipant] Chat API not available in this VS Code version");
      return;
    }
    try {
      this.participant = vscode.chat.createChatParticipant(PARTICIPANT_ID, this.handleRequest.bind(this));
      this.participant.iconPath = vscode.Uri.joinPath(this.context.extensionUri, "media", "icon.png");
      this.participant.followupProvider = {
        provideFollowups: this.provideFollowups.bind(this)
      };
      this.context.subscriptions.push(this.participant);
      this.output.appendLine("[ChatParticipant] Registered @memory chat participant");
    } catch (err) {
      this.output.appendLine(`[ChatParticipant] Registration failed: ${err}`);
    }
  }
  async handleRequest(request, context, stream, token) {
    const query = request.prompt.trim();
    const command = request.command;
    this.output.appendLine(`[ChatParticipant] Request: "${query}", command: "${command || "none"}"`);
    if (command) {
      switch (command) {
        case "save":
          return this.handleCreate(query || "Untitled memory", stream);
        case "find":
          const searchResult = await this.parseIntent(query || "");
          return this.handleSearch({ ...searchResult, query }, stream, token);
        case "list":
          return this.handleList(stream);
        default:
          break;
      }
    }
    const result = await this.parseIntent(query);
    switch (result.action) {
      case "search":
        return this.handleSearch(result, stream, token);
      case "create":
        return this.handleCreate(query, stream);
      case "list":
        return this.handleList(stream);
      case "help":
      default:
        return this.handleHelp(stream);
    }
  }
  async parseIntent(query) {
    const q = query.toLowerCase().trim();
    if (q === "help" || q === "?" || q.includes("how do i") || q.includes("what can you")) {
      return { memories: [], action: "help" };
    }
    if (q === "list" || q === "show all" || q === "all memories" || /^(list|show)\s*(all|my)?\s*memories?$/i.test(q)) {
      return { memories: this.cache.getMemories().slice(0, 10), action: "list" };
    }
    const createPatterns = [
      /^save\s+(.+)/i,
      /^create\s+(?:a\s+)?(?:memory|note)\s*:?\s*(.+)/i,
      /^remember\s+(.+)/i,
      /^store\s+(.+)/i,
      /^\/save\s+(.+)/i
      // Handle /save command format
    ];
    for (const pattern of createPatterns) {
      const match = query.match(pattern);
      if (match && match[1]) {
        this.output.appendLine(`[ChatParticipant] Detected create intent: "${match[1]}"`);
        return { memories: [], action: "create", query };
      }
    }
    const memories = this.cache.semanticSearchLocal(query);
    if (memories.length === 0) {
      const apiMemories = await this.searchApi(query);
      return { memories: apiMemories, action: "search", query };
    }
    return { memories, action: "search", query };
  }
  async searchApi(query) {
    try {
      const apiKey = await this.getApiKey();
      if (!apiKey) return [];
      const response = await fetch(`${this.apiUrl}/memories/search`, {
        method: "POST",
        headers: {
          "X-API-Key": apiKey,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query,
          limit: 5,
          threshold: 0.7
        })
      });
      if (!response.ok) return [];
      const data = await response.json();
      const results = data.data?.results || data.results || data.data || data || [];
      return results;
    } catch (err) {
      this.output.appendLine(`[ChatParticipant] API search error: ${err}`);
      return [];
    }
  }
  async handleSearch(result, stream, token) {
    if (token.isCancellationRequested) {
      return { metadata: { action: "cancelled" } };
    }
    if (result.memories.length === 0) {
      stream.markdown(`No memories found for "${result.query}".

`);
      stream.markdown("\u{1F4A1} *Try creating a new memory with:* `@memory save [your content]`");
      return { metadata: { action: "search", found: 0 } };
    }
    stream.markdown(`## \u{1F9E0} Found ${result.memories.length} relevant memories

`);
    for (const memory of result.memories) {
      const isPending = memory._pending ? " *(pending sync)*" : "";
      stream.markdown(`### ${memory.title}${isPending}
`);
      stream.markdown(`${memory.content.slice(0, 200)}${memory.content.length > 200 ? "..." : ""}

`);
      if (memory.tags.length > 0) {
        stream.markdown(`\u{1F3F7}\uFE0F ${memory.tags.map((t) => `\`${t}\``).join(" ")}

`);
      }
      stream.markdown(`---

`);
    }
    return { metadata: { action: "search", found: result.memories.length } };
  }
  async handleCreate(query, stream) {
    const content = query.replace(/^(save|create|remember|store)\s*(a\s+)?(memory|note)?\s*:?\s*/i, "").trim();
    if (!content) {
      stream.markdown("Please provide content to save. Example:\n\n");
      stream.markdown("`@memory save OAuth uses PKCE flow for mobile apps`");
      return { metadata: { action: "create", success: false } };
    }
    const title = content.slice(0, 50) + (content.length > 50 ? "..." : "");
    const memory = await this.cache.addLocal({
      title,
      content,
      memory_type: "knowledge",
      tags: []
    });
    stream.markdown(`## \u2705 Memory saved

`);
    stream.markdown(`**${memory.title}**

`);
    stream.markdown(`${memory.content}

`);
    stream.markdown(`*Memory will sync when online.*`);
    void this.syncToApi(memory);
    return { metadata: { action: "create", success: true, id: memory.id } };
  }
  async syncToApi(memory) {
    try {
      const apiKey = await this.getApiKey();
      if (!apiKey) return;
      const response = await fetch(`${this.apiUrl}/memories`, {
        method: "POST",
        headers: {
          "X-API-Key": apiKey,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: memory.title,
          content: memory.content,
          memory_type: memory.memory_type,
          tags: memory.tags
        })
      });
      if (response.ok) {
        const data = await response.json();
        const serverMemory = data.data || data.memory || data;
        await this.cache.markSynced(memory.id, serverMemory);
        this.output.appendLine(`[ChatParticipant] Memory synced: ${memory.title}`);
      }
    } catch (err) {
      this.output.appendLine(`[ChatParticipant] Sync error: ${err}`);
    }
  }
  handleList(stream) {
    const memories = this.cache.getMemories().slice(0, 10);
    const status = this.cache.getStatus();
    stream.markdown(`## \u{1F9E0} Your Memories

`);
    if (status.pendingCount > 0) {
      stream.markdown(`\u23F3 *${status.pendingCount} memories pending sync*

`);
    }
    if (memories.length === 0) {
      stream.markdown("No memories yet. Create one with:\n\n");
      stream.markdown("`@memory save [your content]`");
      return { metadata: { action: "list", count: 0 } };
    }
    for (const memory of memories) {
      const isPending = memory._pending ? " \u{1F504}" : "";
      stream.markdown(`- **${memory.title}**${isPending}
`);
    }
    stream.markdown(`
*Showing ${memories.length} most recent memories*`);
    return { metadata: { action: "list", count: memories.length } };
  }
  handleHelp(stream) {
    stream.markdown(`## \u{1F9E0} L0 Memory Assistant

`);
    stream.markdown(`I help you store and recall your development context.

`);
    stream.markdown(`### Commands

`);
    stream.markdown(`| Command | Description |
`);
    stream.markdown(`|---------|-------------|
`);
    stream.markdown(`| \`@memory find [query]\` | Search your memories |
`);
    stream.markdown(`| \`@memory save [content]\` | Save a new memory |
`);
    stream.markdown(`| \`@memory list\` | Show recent memories |
`);
    stream.markdown(`| \`@memory help\` | Show this help |

`);
    stream.markdown(`### Examples

`);
    stream.markdown(`- \`@memory find OAuth implementation\`
`);
    stream.markdown(`- \`@memory what was that regex pattern?\`
`);
    stream.markdown(`- \`@memory save Use PKCE flow for mobile OAuth\`
`);
    return { metadata: { action: "help" } };
  }
  provideFollowups(result, context, token) {
    const action = result.metadata?.action;
    switch (action) {
      case "search":
        return [
          { prompt: "list", label: "\u{1F4CB} Show all memories" },
          { prompt: "save ", label: "\u{1F4BE} Save a new memory" }
        ];
      case "create":
        return [
          { prompt: "list", label: "\u{1F4CB} Show all memories" },
          { prompt: "find ", label: "\u{1F50D} Search memories" }
        ];
      case "list":
        return [
          { prompt: "find ", label: "\u{1F50D} Search memories" },
          { prompt: "save ", label: "\u{1F4BE} Save a new memory" }
        ];
      default:
        return [
          { prompt: "find ", label: "\u{1F50D} Search memories" },
          { prompt: "list", label: "\u{1F4CB} Show all memories" }
        ];
    }
  }
};

// src/services/SecureApiKeyService.ts
var vscode2 = __toESM(require("vscode"));
var SecureApiKeyService = class _SecureApiKeyService {
  constructor(context, outputChannel) {
    this.context = context;
    this.outputChannel = outputChannel;
    this.migrationCompleted = false;
  }
  static {
    this.API_KEY_KEY = "lzero.apiKey";
  }
  static {
    this.API_KEY_RAW_KEY = "lzero.apiKey.raw";
  }
  static {
    this.AUTH_TOKEN_KEY = "lzero.authToken";
  }
  static {
    this.REFRESH_TOKEN_KEY = "lzero.refreshToken";
  }
  static {
    this.CREDENTIAL_TYPE_KEY = "lzero.credentialType";
  }
  static {
    // Ports to try for OAuth callback (in order of preference)
    this.CALLBACK_PORTS = [8080, 8081, 8082, 8083, 3e3, 3001];
  }
  static {
    this.OAUTH_TIMEOUT_MS = 5 * 60 * 1e3;
  }
  async initialize() {
    await this.migrateLegacySecrets();
  }
  async getApiKeyOrPrompt() {
    const apiKey = await this.getApiKey();
    if (apiKey) return apiKey;
    const credential = await this.getStoredCredentials();
    if (credential?.type === "oauth") {
      return credential.token;
    }
    return await this.promptForAuthentication();
  }
  async getApiKey() {
    try {
      const rawKey = await this.context.secrets.get(_SecureApiKeyService.API_KEY_RAW_KEY);
      if (rawKey) {
        return rawKey;
      }
      const apiKey = await this.context.secrets.get(_SecureApiKeyService.API_KEY_KEY);
      if (!apiKey) {
        return null;
      }
      const storedType = await this.context.secrets.get(_SecureApiKeyService.CREDENTIAL_TYPE_KEY);
      if (storedType === "oauth" || this.looksLikeJwt(apiKey)) {
        this.log("Retrieved OAuth token from secure storage (unhashed)");
        return apiKey;
      }
      await this.context.secrets.store(_SecureApiKeyService.API_KEY_RAW_KEY, apiKey);
      this.log("Migrated plaintext API key to raw storage");
      return apiKey;
    } catch (error) {
      this.logError("Failed to retrieve API key from secure storage", error);
      return null;
    }
  }
  async hasApiKey() {
    const apiKey = await this.getApiKey();
    if (apiKey) return true;
    const authHeader = await this.getAuthenticationHeader();
    return authHeader !== null;
  }
  async promptForAuthentication() {
    const choice = await vscode2.window.showQuickPick(
      [
        {
          label: "$(key) OAuth (Browser)",
          description: "Authenticate using OAuth2 with browser (Recommended)",
          value: "oauth"
        },
        {
          label: "$(key) API Key",
          description: "Enter API key directly",
          value: "apikey"
        },
        {
          label: "$(circle-slash) Cancel",
          description: "Cancel authentication",
          value: "cancel"
        }
      ],
      {
        placeHolder: "Choose authentication method"
      }
    );
    if (!choice || choice.value === "cancel") {
      return null;
    }
    if (choice.value === "oauth") {
      return await this.authenticateWithOAuthFlow();
    }
    return await this.promptForApiKeyEntry();
  }
  async authenticateWithOAuthFlow() {
    const success = await this.authenticateOAuth();
    if (!success) return null;
    const apiKey = await this.getApiKey();
    if (apiKey) return apiKey;
    const authHeader = await this.getAuthenticationHeader();
    if (authHeader?.startsWith("Bearer ")) {
      return authHeader.replace("Bearer ", "");
    }
    return null;
  }
  async promptForApiKeyEntry() {
    const apiKey = await vscode2.window.showInputBox({
      prompt: "Enter your L0 Memory API Key",
      placeHolder: "Get your API key from api.lanonasis.com",
      password: true,
      ignoreFocusOut: true,
      validateInput: (value) => {
        if (!value || value.trim().length === 0) {
          return "API key is required";
        }
        if (value.length < 20) {
          return "API key seems too short";
        }
        return null;
      }
    });
    if (apiKey) {
      await this.storeApiKey(apiKey, "apiKey");
      await this.context.secrets.delete(_SecureApiKeyService.AUTH_TOKEN_KEY);
      await this.context.secrets.delete(_SecureApiKeyService.REFRESH_TOKEN_KEY);
      this.log("API key stored securely");
      return apiKey;
    }
    return null;
  }
  async storeApiKeyDirect(apiKey) {
    await this.storeApiKey(apiKey, "apiKey");
    await this.context.secrets.delete(_SecureApiKeyService.AUTH_TOKEN_KEY);
    await this.context.secrets.delete(_SecureApiKeyService.REFRESH_TOKEN_KEY);
    this.log("API key stored from webview");
  }
  async authenticateOAuth() {
    try {
      const config = vscode2.workspace.getConfiguration("lzero");
      const authUrl = config.get("authUrl") || "https://auth.lanonasis.com";
      const clientId = "vscode-extension";
      this.log("Starting Device Code authentication flow...");
      const deviceResponse = await fetch(`${authUrl}/oauth/device`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          client_id: clientId,
          scope: "memories:read memories:write memories:delete profile"
        })
      });
      if (!deviceResponse.ok) {
        const errorText = await deviceResponse.text();
        throw new Error(`Failed to request device code: ${deviceResponse.status} ${errorText}`);
      }
      const deviceData = await deviceResponse.json();
      this.log(`Device code received. User code: ${deviceData.user_code}`);
      const openBrowser = await vscode2.window.showInformationMessage(
        `Enter this code in your browser: ${deviceData.user_code}`,
        { modal: true },
        "Open Browser",
        "Copy Code"
      );
      if (openBrowser === "Open Browser") {
        await vscode2.env.openExternal(vscode2.Uri.parse(deviceData.verification_uri_complete));
      } else if (openBrowser === "Copy Code") {
        await vscode2.env.clipboard.writeText(deviceData.user_code);
        await vscode2.env.openExternal(vscode2.Uri.parse(deviceData.verification_uri));
        vscode2.window.showInformationMessage("Code copied! Paste it in the browser window.");
      } else {
        this.log("User cancelled device code flow");
        return false;
      }
      const basePollIntervalMs = Math.max((deviceData.interval || 5) * 1e3, 1e3);
      let pollIntervalMs = basePollIntervalMs;
      const maxPollIntervalMs = 3e4;
      const expiresAt = Date.now() + deviceData.expires_in * 1e3;
      const grantType = "urn:ietf:params:oauth:grant-type:device_code";
      return await vscode2.window.withProgress({
        location: vscode2.ProgressLocation.Notification,
        title: "Waiting for authorization...",
        cancellable: true
      }, async (progress, cancellationToken) => {
        while (Date.now() < expiresAt) {
          if (cancellationToken.isCancellationRequested) {
            this.log("User cancelled device code polling");
            return false;
          }
          await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
          try {
            const tokenResponse = await fetch(`${authUrl}/oauth/token`, {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "application/json"
              },
              body: new URLSearchParams({
                grant_type: grantType,
                device_code: deviceData.device_code,
                client_id: clientId
              }).toString()
            });
            const tokenData = await tokenResponse.json();
            if (tokenData.error === "authorization_pending") {
              progress.report({ message: "Waiting for you to authorize in browser..." });
              pollIntervalMs = basePollIntervalMs;
              continue;
            }
            if (tokenData.error === "slow_down") {
              pollIntervalMs = Math.min(pollIntervalMs * 2, maxPollIntervalMs);
              await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
              continue;
            }
            if (tokenData.error === "access_denied") {
              this.log("User denied authorization");
              vscode2.window.showWarningMessage("Authorization was denied.");
              return false;
            }
            if (tokenData.error === "expired_token") {
              this.log("Device code expired");
              vscode2.window.showWarningMessage("Authorization timed out. Please try again.");
              return false;
            }
            if (tokenData.error) {
              throw new Error(tokenData.error_description || tokenData.error);
            }
            if (tokenData.access_token) {
              await this.storeApiKey(tokenData.access_token, "oauth");
              if (tokenData.refresh_token) {
                await this.context.secrets.store(_SecureApiKeyService.REFRESH_TOKEN_KEY, tokenData.refresh_token);
              }
              const tokenInfo = {
                access_token: tokenData.access_token,
                expires_at: Date.now() + (tokenData.expires_in ? tokenData.expires_in * 1e3 : 36e5)
              };
              await this.context.secrets.store(_SecureApiKeyService.AUTH_TOKEN_KEY, JSON.stringify(tokenInfo));
              this.log("Device code authentication successful!");
              vscode2.window.showInformationMessage("\u2713 Authentication successful!");
              return true;
            }
          } catch (pollError) {
            this.logError("Token polling error", pollError);
            pollIntervalMs = Math.min(pollIntervalMs * 2, maxPollIntervalMs);
          }
        }
        this.log("Device code expired");
        vscode2.window.showWarningMessage("Authorization timed out. Please try again.");
        return false;
      });
    } catch (error) {
      this.logError("Device code authentication failed", error);
      if (vscode2.env.uiKind === vscode2.UIKind.Web) {
        return false;
      }
      this.log("Falling back to PKCE redirect flow...");
      return await this.authenticateOAuthPKCE();
    }
  }
  async authenticateOAuthPKCE() {
    if (vscode2.env.uiKind === vscode2.UIKind.Web) {
      this.log("PKCE flow not supported in web environment");
      return false;
    }
    for (const port of _SecureApiKeyService.CALLBACK_PORTS) {
      try {
        const result = await this.tryPKCEWithPort(port);
        return result;
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        if (message.includes("EADDRINUSE") || message.includes("already in use")) {
          this.log(`Port ${port} is in use, trying next port...`);
          continue;
        }
        throw error;
      }
    }
    this.log("All callback ports are in use");
    throw new Error("Unable to start OAuth callback server - all ports are in use. Please close some applications and try again.");
  }
  async tryPKCEWithPort(port) {
    return new Promise((resolve, reject) => {
      let timeoutId;
      try {
        const config = vscode2.workspace.getConfiguration("lzero");
        const authUrl = config.get("authUrl") || "https://auth.lanonasis.com";
        const clientId = "vscode-extension";
        const redirectUri = `http://localhost:${port}/callback`;
        const codeVerifier = this.generateCodeVerifier();
        const state = this.generateState();
        const startServer = async () => {
          const codeChallenge = await this.generateCodeChallenge(codeVerifier);
          await this.context.secrets.store("lzero.oauth_code_verifier", codeVerifier);
          await this.context.secrets.store("lzero.oauth_state", state);
          const authUrlObj = new URL("/oauth/authorize", authUrl);
          authUrlObj.searchParams.set("client_id", clientId);
          authUrlObj.searchParams.set("response_type", "code");
          authUrlObj.searchParams.set("redirect_uri", redirectUri);
          authUrlObj.searchParams.set("scope", "memories:read memories:write memories:delete profile");
          authUrlObj.searchParams.set("code_challenge", codeChallenge);
          authUrlObj.searchParams.set("code_challenge_method", "S256");
          authUrlObj.searchParams.set("state", state);
          const http = this.getNodeHttp();
          const server = http.createServer(async (req, res) => {
            try {
              if (!req.url) {
                res.writeHead(400, { "Content-Type": "text/plain" });
                res.end("Missing URL");
                return;
              }
              const url = new URL(req.url, `http://localhost:${port}`);
              if (url.pathname === "/callback") {
                const code = url.searchParams.get("code");
                const returnedState = url.searchParams.get("state");
                const error = url.searchParams.get("error");
                const storedState = await this.context.secrets.get("lzero.oauth_state");
                if (returnedState !== storedState) {
                  res.writeHead(400, { "Content-Type": "text/html" });
                  res.end("<h1>Invalid state parameter</h1>");
                  server.close();
                  if (timeoutId) clearTimeout(timeoutId);
                  reject(new Error("Invalid state parameter"));
                  return;
                }
                if (error) {
                  res.writeHead(400, { "Content-Type": "text/html" });
                  res.end(`<h1>OAuth Error: ${error}</h1>`);
                  server.close();
                  if (timeoutId) clearTimeout(timeoutId);
                  reject(new Error(`OAuth error: ${error}`));
                  return;
                }
                if (code) {
                  const token = await this.exchangeCodeForToken(code, codeVerifier, redirectUri, authUrl);
                  await this.storeApiKey(token.access_token, "oauth");
                  if (token.refresh_token) {
                    await this.context.secrets.store(_SecureApiKeyService.REFRESH_TOKEN_KEY, token.refresh_token);
                  }
                  res.writeHead(200, { "Content-Type": "text/html" });
                  res.end(`
                                  <html>
                                    <head><title>Authentication Success</title></head>
                                    <body>
                                      <h1 style="color: green;">\u2713 Authentication Successful!</h1>
                                      <p>You can close this window and return to VS Code.</p>
                                      <script>setTimeout(() => window.close(), 2000);<\/script>
                                    </body>
                                  </html>
                                `);
                  await this.context.secrets.delete("lzero.oauth_code_verifier");
                  await this.context.secrets.delete("lzero.oauth_state");
                  server.close();
                  if (timeoutId) clearTimeout(timeoutId);
                  resolve(true);
                }
              } else {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("Not found");
              }
            } catch (err) {
              res.writeHead(500, { "Content-Type": "text/html" });
              res.end(`<h1>Error: ${err instanceof Error ? err.message : "Unknown error"}</h1>`);
              server.close();
              if (timeoutId) clearTimeout(timeoutId);
              reject(err);
            }
          });
          server.on("error", (err) => {
            if (timeoutId) clearTimeout(timeoutId);
            if (err.code === "EADDRINUSE") {
              reject(new Error(`Port ${port} is already in use. Please close any applications using this port and try again.`));
            } else {
              reject(new Error(`Failed to start OAuth callback server: ${err.message}`));
            }
          });
          server.listen(port, "localhost", () => {
            this.outputChannel.appendLine(`OAuth callback server listening on port ${port}`);
            vscode2.env.openExternal(vscode2.Uri.parse(authUrlObj.toString()));
          });
          timeoutId = setTimeout(() => {
            server.close();
            reject(new Error("OAuth authentication timeout"));
          }, _SecureApiKeyService.OAUTH_TIMEOUT_MS);
        };
        startServer().catch((error) => {
          if (timeoutId) clearTimeout(timeoutId);
          reject(error);
        });
      } catch (error) {
        if (timeoutId) clearTimeout(timeoutId);
        reject(error);
      }
    });
  }
  async getAuthenticationHeader() {
    const credential = await this.getStoredCredentials();
    if (credential?.type === "oauth") {
      return `Bearer ${credential.token}`;
    }
    return null;
  }
  async getStoredCredentials() {
    const authToken = await this.context.secrets.get(_SecureApiKeyService.AUTH_TOKEN_KEY);
    if (authToken) {
      try {
        const token = JSON.parse(authToken);
        if (token?.access_token) {
          if (this.isTokenValid(token)) {
            return { type: "oauth", token: token.access_token };
          }
          this.log("Access token expired, attempting refresh...");
          const refreshedToken = await this.refreshAccessToken();
          if (refreshedToken) {
            return { type: "oauth", token: refreshedToken };
          }
          this.log("Token refresh failed, clearing expired credentials");
          await this.deleteApiKey();
          return null;
        }
      } catch (error) {
        this.logError("Failed to parse stored OAuth token", error);
      }
    }
    const apiKey = await this.getApiKey();
    if (apiKey) {
      const storedType = await this.context.secrets.get(_SecureApiKeyService.CREDENTIAL_TYPE_KEY);
      const inferredType = storedType === "oauth" || storedType === "apiKey" ? storedType : this.looksLikeJwt(apiKey) ? "oauth" : "apiKey";
      return { type: inferredType, token: apiKey };
    }
    return null;
  }
  async refreshAccessToken() {
    try {
      const refreshToken = await this.context.secrets.get(_SecureApiKeyService.REFRESH_TOKEN_KEY);
      if (!refreshToken) {
        this.log("No refresh token available");
        return null;
      }
      const config = vscode2.workspace.getConfiguration("lzero");
      const authUrl = config.get("authUrl") || "https://auth.lanonasis.com";
      const tokenUrl = new URL("/oauth/token", authUrl);
      this.log(`Refreshing token via ${tokenUrl.toString()}`);
      const body = new URLSearchParams({
        grant_type: "refresh_token",
        client_id: "vscode-extension",
        refresh_token: refreshToken
      });
      const response = await fetch(tokenUrl.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json"
        },
        body: body.toString()
      });
      if (!response.ok) {
        const errorText = await response.text();
        this.logError(`Token refresh failed: ${response.status}`, errorText);
        if (response.status === 400 || response.status === 401) {
          await this.context.secrets.delete(_SecureApiKeyService.REFRESH_TOKEN_KEY);
        }
        return null;
      }
      const tokenData = await response.json();
      const newToken = {
        access_token: tokenData.access_token,
        expires_at: Date.now() + (tokenData.expires_in ? tokenData.expires_in * 1e3 : 36e5)
      };
      await this.context.secrets.store(_SecureApiKeyService.AUTH_TOKEN_KEY, JSON.stringify(newToken));
      await this.storeApiKey(tokenData.access_token, "oauth");
      if (tokenData.refresh_token) {
        await this.context.secrets.store(_SecureApiKeyService.REFRESH_TOKEN_KEY, tokenData.refresh_token);
        this.log("Refresh token rotated");
      }
      this.log("Access token refreshed successfully");
      return tokenData.access_token;
    } catch (error) {
      this.logError("Token refresh error", error);
      return null;
    }
  }
  async deleteApiKey() {
    await this.context.secrets.delete(_SecureApiKeyService.API_KEY_KEY);
    await this.context.secrets.delete(_SecureApiKeyService.API_KEY_RAW_KEY);
    await this.context.secrets.delete(_SecureApiKeyService.AUTH_TOKEN_KEY);
    await this.context.secrets.delete(_SecureApiKeyService.REFRESH_TOKEN_KEY);
    await this.context.secrets.delete(_SecureApiKeyService.CREDENTIAL_TYPE_KEY);
    this.log("API key removed from secure storage");
  }
  async storeApiKey(apiKey, type) {
    if (type === "oauth") {
      await this.context.secrets.store(_SecureApiKeyService.API_KEY_RAW_KEY, apiKey);
      await this.context.secrets.store(_SecureApiKeyService.API_KEY_KEY, apiKey);
      await this.context.secrets.store(_SecureApiKeyService.CREDENTIAL_TYPE_KEY, type);
      return;
    }
    await this.context.secrets.store(_SecureApiKeyService.API_KEY_RAW_KEY, apiKey);
    await this.context.secrets.store(_SecureApiKeyService.API_KEY_KEY, apiKey);
    await this.context.secrets.store(_SecureApiKeyService.CREDENTIAL_TYPE_KEY, type);
  }
  async migrateLegacySecrets() {
    if (this.migrationCompleted) {
      return;
    }
    const hasSecureKey = await this.hasApiKey();
    if (hasSecureKey) {
      this.migrationCompleted = true;
      return;
    }
    const legacyApiKey = await this.context.secrets.get("lanonasis.apiKey");
    const legacyTokens = await this.context.secrets.get("lanonasis.tokens");
    if (legacyTokens) {
      try {
        const parsed = JSON.parse(legacyTokens);
        if (parsed.access_token) {
          await this.storeApiKey(parsed.access_token, "oauth");
          this.log("Migrated OAuth token from legacy storage");
        }
      } catch (error) {
        this.logError("Failed to migrate legacy tokens", error);
      }
    } else if (legacyApiKey) {
      await this.storeApiKey(legacyApiKey, "apiKey");
      this.log("Migrated API key from legacy storage");
    }
    this.migrationCompleted = true;
  }
  async exchangeCodeForToken(code, codeVerifier, redirectUri, authUrl) {
    const tokenUrl = new URL("/oauth/token", authUrl);
    const body = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: "vscode-extension",
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier
    });
    const response = await fetch(tokenUrl.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
      },
      body: body.toString()
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Token exchange failed: ${response.status} ${errorText}`);
    }
    const tokenData = await response.json();
    const token = {
      access_token: tokenData.access_token,
      expires_at: Date.now() + (tokenData.expires_in ? tokenData.expires_in * 1e3 : 36e5)
    };
    await this.context.secrets.store(_SecureApiKeyService.AUTH_TOKEN_KEY, JSON.stringify(token));
    return {
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token
    };
  }
  isTokenValid(token) {
    if (!token.expires_at) return true;
    return Date.now() < token.expires_at - 6e4;
  }
  looksLikeJwt(value) {
    const parts = value.split(".");
    if (parts.length !== 3) return false;
    const jwtSegment = /^[A-Za-z0-9-_]+$/;
    return parts.every((segment) => jwtSegment.test(segment));
  }
  generateCodeVerifier() {
    const bytes = this.getRandomBytes(32);
    return this.base64UrlEncode(bytes);
  }
  async generateCodeChallenge(verifier) {
    const crypto = this.getWebCrypto();
    const data = new TextEncoder().encode(verifier);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return this.base64UrlEncode(new Uint8Array(digest));
  }
  generateState() {
    const bytes = this.getRandomBytes(16);
    return Array.from(bytes).map((byte) => byte.toString(16).padStart(2, "0")).join("");
  }
  getWebCrypto() {
    if (globalThis.crypto) {
      return globalThis.crypto;
    }
    throw new Error("WebCrypto is not available in this environment");
  }
  getRandomBytes(length) {
    const crypto = this.getWebCrypto();
    const bytes = new Uint8Array(length);
    crypto.getRandomValues(bytes);
    return bytes;
  }
  base64UrlEncode(bytes) {
    let base64;
    if (typeof Buffer !== "undefined") {
      base64 = Buffer.from(bytes).toString("base64");
    } else {
      let binary = "";
      for (const byte of bytes) {
        binary += String.fromCharCode(byte);
      }
      base64 = btoa(binary);
    }
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  getNodeHttp() {
    const nodeRequire = this.getNodeRequire();
    return nodeRequire("http");
  }
  getNodeRequire() {
    if (typeof __non_webpack_require__ === "function") {
      return __non_webpack_require__;
    }
    if (typeof require !== "undefined") {
      return require;
    }
    if (typeof module !== "undefined" && typeof module.require === "function") {
      return module.require.bind(module);
    }
    throw new Error("Node require not available in this environment");
  }
  log(message) {
    const timestamp = (/* @__PURE__ */ new Date()).toISOString();
    this.outputChannel.appendLine(`[${timestamp}] [SecureApiKeyService] ${message}`);
  }
  logError(message, error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    this.log(`${message}: ${errorMessage}`);
    console.error(message, error);
  }
};

// src/services/MemoryService.ts
var DEFAULT_TIMEOUT_MS = 3e4;
var MemoryService = class {
  constructor(secureApiKeyService, output, apiUrl) {
    this.secureApiKeyService = secureApiKeyService;
    this.output = output;
    this.apiUrl = apiUrl;
  }
  /**
   * Creates a fetch request with timeout support
   */
  async fetchWithTimeout(url, options, timeoutMs = DEFAULT_TIMEOUT_MS) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      return response;
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error(`Request timed out after ${timeoutMs}ms`);
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }
  async isAuthenticated() {
    return await this.secureApiKeyService.hasApiKey();
  }
  async getAuthHeaders() {
    const credentials = await this.secureApiKeyService.getStoredCredentials();
    if (!credentials) {
      throw new Error("Not authenticated");
    }
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${credentials.token}`
    };
  }
  async testConnection() {
    const headers = await this.getAuthHeaders();
    const response = await this.fetchWithTimeout(
      `${this.apiUrl}/health`,
      { method: "GET", headers },
      1e4
      // 10 second timeout for health checks
    );
    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Health check failed (${response.status}): ${body}`);
    }
  }
  async listMemories(limit = 100) {
    const headers = await this.getAuthHeaders();
    const response = await this.fetchWithTimeout(
      `${this.apiUrl}/memories/list?limit=${limit}`,
      { method: "GET", headers }
    );
    if (!response.ok) {
      const body = await response.text();
      throw new Error(`List memories failed (${response.status}): ${body}`);
    }
    const data = await response.json();
    const memories = data.data || data.memories || data || [];
    return Array.isArray(memories) ? memories : [];
  }
  async searchMemories(query, options = {}) {
    const headers = await this.getAuthHeaders();
    const response = await this.fetchWithTimeout(
      `${this.apiUrl}/memories/search`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          query,
          limit: options.limit ?? 10,
          threshold: options.threshold ?? 0.7
        })
      }
    );
    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Search memories failed (${response.status}): ${body}`);
    }
    const data = await response.json();
    const results = data.data?.results || data.results || data.data || [];
    return Array.isArray(results) ? results : [];
  }
  async createMemory(request) {
    const headers = await this.getAuthHeaders();
    const response = await this.fetchWithTimeout(
      `${this.apiUrl}/memories`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(request)
      }
    );
    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Create memory failed (${response.status}): ${body}`);
    }
    const data = await response.json();
    return data.data || data.memory || data;
  }
  async updateMemory(id, updates) {
    const headers = await this.getAuthHeaders();
    const response = await this.fetchWithTimeout(
      `${this.apiUrl}/memory/update`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({ id, ...updates })
      }
    );
    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Update memory failed (${response.status}): ${body}`);
    }
    const data = await response.json();
    return data.data || data.memory || data;
  }
  async deleteMemory(id) {
    const headers = await this.getAuthHeaders();
    const response = await this.fetchWithTimeout(
      `${this.apiUrl}/memory/delete`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({ id })
      }
    );
    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Delete memory failed (${response.status}): ${body}`);
    }
  }
  async getMemory(id) {
    const headers = await this.getAuthHeaders();
    const response = await this.fetchWithTimeout(
      `${this.apiUrl}/memory/${encodeURIComponent(id)}`,
      { method: "GET", headers }
    );
    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Get memory failed (${response.status}): ${body}`);
    }
    const data = await response.json();
    return data.data || data.memory || data;
  }
};

// src/services/ApiKeyService.ts
var vscode3 = __toESM(require("vscode"));
var DEFAULT_TIMEOUT_MS2 = 3e4;
var ApiKeyService = class {
  constructor(secureApiKeyService, output) {
    this.secureApiKeyService = secureApiKeyService;
    this.output = output;
    this.baseUrl = "https://api.lanonasis.com";
    this.userInfoCache = null;
    this.userInfoCacheExpiry = 0;
    this.config = vscode3.workspace.getConfiguration("lzero");
    this.updateConfig();
  }
  /**
   * Creates a fetch request with timeout support
   */
  async fetchWithTimeout(url, options, timeoutMs = DEFAULT_TIMEOUT_MS2) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      return response;
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error(`Request timed out after ${timeoutMs}ms`);
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }
  updateConfig() {
    const useGateway = this.config.get("useGateway", false);
    const apiUrl = this.config.get("apiUrl", "https://api.lanonasis.com");
    const gatewayUrl = this.config.get("gatewayUrl", "https://api.lanonasis.com");
    this.baseUrl = this.sanitizeBaseUrl(useGateway ? gatewayUrl : apiUrl);
  }
  refreshConfig() {
    this.config = vscode3.workspace.getConfiguration("lzero");
    this.updateConfig();
  }
  async makeRequest(endpoint, options = {}, timeoutMs = DEFAULT_TIMEOUT_MS2) {
    const credentials = await this.resolveCredentials();
    const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const url = `${this.baseUrl}${normalizedEndpoint}`;
    const authHeaders = credentials.type === "oauth" ? { "Authorization": `Bearer ${credentials.token}` } : { "X-API-Key": credentials.token };
    const response = await this.fetchWithTimeout(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
        ...options.headers
      }
    }, timeoutMs);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`);
    }
    return response.json();
  }
  sanitizeBaseUrl(url) {
    if (!url) {
      return "https://api.lanonasis.com";
    }
    let clean = url.trim();
    clean = clean.replace(/\/+$/, "");
    clean = clean.replace(/\/api\/v1$/i, "").replace(/\/api$/i, "");
    return clean || "https://api.lanonasis.com";
  }
  async resolveCredentials() {
    let credentials = await this.secureApiKeyService.getStoredCredentials();
    if (!credentials) {
      const value = await this.secureApiKeyService.getApiKeyOrPrompt();
      if (!value) {
        throw new Error("API key not configured. Please configure your API key to use L0 Memory services.");
      }
      credentials = await this.secureApiKeyService.getStoredCredentials();
      if (!credentials) {
        credentials = {
          type: this.looksLikeJwt(value) ? "oauth" : "apiKey",
          token: value
        };
      }
    }
    return credentials;
  }
  looksLikeJwt(token) {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return false;
    }
    const jwtSegment = /^[A-Za-z0-9-_]+$/;
    return parts.every((segment) => jwtSegment.test(segment));
  }
  async getProjects() {
    return this.makeRequest("/api/v1/projects");
  }
  async getProject(projectId) {
    return this.makeRequest(`/api/v1/projects/${projectId}`);
  }
  async createProject(request) {
    return this.makeRequest("/api/v1/projects", {
      method: "POST",
      body: JSON.stringify(request)
    });
  }
  async updateProject(projectId, updates) {
    return this.makeRequest(`/api/v1/projects/${projectId}`, {
      method: "PUT",
      body: JSON.stringify(updates)
    });
  }
  async deleteProject(projectId) {
    await this.makeRequest(`/api/v1/projects/${projectId}`, {
      method: "DELETE"
    });
  }
  async getApiKeys(projectId) {
    const endpoint = projectId ? `/api/v1/projects/${projectId}/api-keys` : "/api/v1/api-keys";
    const response = await this.makeRequest(endpoint);
    if (response && typeof response === "object" && "data" in response && Array.isArray(response.data)) {
      return response.data;
    }
    if (Array.isArray(response)) {
      return response;
    }
    return [];
  }
  async getApiKey(keyId) {
    return this.makeRequest(`/api/v1/api-keys/${keyId}`);
  }
  async createApiKey(request) {
    return this.makeRequest("/api/v1/api-keys", {
      method: "POST",
      body: JSON.stringify(request)
    });
  }
  async updateApiKey(keyId, updates) {
    return this.makeRequest(`/api/v1/api-keys/${keyId}`, {
      method: "PUT",
      body: JSON.stringify(updates)
    });
  }
  async deleteApiKey(keyId) {
    await this.makeRequest(`/api/v1/api-keys/${keyId}`, {
      method: "DELETE"
    });
  }
  async rotateApiKey(keyId) {
    return this.makeRequest(`/api/v1/api-keys/${keyId}/rotate`, {
      method: "POST"
    });
  }
  async testConnection() {
    try {
      const credentials = await this.resolveCredentials();
      if (credentials.type === "oauth") {
        const response = await this.fetchWithTimeout(
          `${this.baseUrl}/oauth/introspect`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": `Bearer ${credentials.token}`
            },
            body: new URLSearchParams({ token: credentials.token })
          },
          1e4
          // 10s timeout for connection test
        );
        if (!response.ok) {
          const body = await response.text();
          this.log(`OAuth introspection failed: ${response.status} ${response.statusText} - ${body}`);
          return false;
        }
        const data = await response.json();
        return data.active === true;
      }
      await this.makeRequest("/health", {}, 1e4);
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.log(`Test connection failed: ${message}`);
      return false;
    }
  }
  /**
   * Get user info with caching and smart endpoint selection.
   * Results are cached for 5 minutes to avoid redundant API calls.
   */
  async getUserInfo(forceRefresh = false) {
    const now = Date.now();
    if (!forceRefresh && this.userInfoCache && this.userInfoCacheExpiry > now) {
      return this.userInfoCache;
    }
    const endpointConfigs = [
      { endpoint: "/api/v1/auth/me", method: "GET" },
      { endpoint: "/api/v1/auth/session", method: "GET" },
      { endpoint: "/v1/auth/me", method: "GET" },
      { endpoint: "/v1/auth/session", method: "GET" }
    ];
    let lastError;
    for (const { endpoint, method } of endpointConfigs) {
      try {
        const response = await this.makeRequest(endpoint, { method }, 1e4);
        const normalized = this.normalizeUserInfo(response);
        if (normalized) {
          this.userInfoCache = normalized;
          this.userInfoCacheExpiry = now + 5 * 60 * 1e3;
          this.log(`User info retrieved from ${endpoint}`);
          return normalized;
        }
      } catch (error) {
        lastError = error;
        const message = String(error);
        const isRetryable = message.includes("404") || message.includes("405") || message.includes("Method Not Allowed");
        if (!isRetryable) {
          break;
        }
      }
    }
    this.userInfoCache = null;
    this.userInfoCacheExpiry = 0;
    if (lastError) {
      throw lastError instanceof Error ? lastError : new Error(String(lastError));
    }
    return null;
  }
  /**
   * Clear the user info cache (e.g., on logout)
   */
  clearUserInfoCache() {
    this.userInfoCache = null;
    this.userInfoCacheExpiry = 0;
  }
  normalizeUserInfo(payload) {
    if (!payload || typeof payload !== "object") {
      return null;
    }
    const asRecord = payload;
    const direct = this.readUserFields(asRecord);
    if (direct) return direct;
    const data = asRecord.data;
    if (data && typeof data === "object") {
      const fromData = this.readUserFields(data);
      if (fromData) return fromData;
    }
    const session = asRecord.session;
    if (session && typeof session === "object") {
      const fromSession = this.readUserFields(session);
      if (fromSession) return fromSession;
      const sessionUser = session.user;
      if (sessionUser && typeof sessionUser === "object") {
        const fromSessionUser = this.readUserFields(sessionUser);
        if (fromSessionUser) return fromSessionUser;
      }
    }
    const user = asRecord.user;
    if (user && typeof user === "object") {
      const fromUser = this.readUserFields(user);
      if (fromUser) return fromUser;
    }
    return null;
  }
  readUserFields(source) {
    const id = typeof source.id === "string" ? source.id : typeof source.user_id === "string" ? source.user_id : void 0;
    const email = typeof source.email === "string" ? source.email : typeof source.user_email === "string" ? source.user_email : void 0;
    const name = typeof source.name === "string" ? source.name : typeof source.full_name === "string" ? source.full_name : typeof source.username === "string" ? source.username : void 0;
    if (!id && !email && !name) {
      return null;
    }
    return {
      id: id || "unknown",
      email: email || "unknown",
      name
    };
  }
  log(message) {
    if (!this.output) {
      return;
    }
    this.output.appendLine(`[ApiKeyService] ${message}`);
  }
};

// src/providers/MemoryTreeProvider.ts
var vscode4 = __toESM(require("vscode"));
var MemoryTreeItem = class extends vscode4.TreeItem {
  constructor(memory, collapsibleState) {
    super(memory.title, collapsibleState);
    this.memory = memory;
    this.tooltip = `${memory.title}

Type: ${memory.memory_type}
Created: ${new Date(memory.created_at).toLocaleDateString()}

${memory.content.substring(0, 200)}${memory.content.length > 200 ? "..." : ""}`;
    this.description = memory.memory_type;
    this.contextValue = "memory";
    this.iconPath = this.getIconForMemoryType(memory.memory_type);
    this.command = {
      command: "lzeroMemory.openMemory",
      title: "Open Memory",
      arguments: [memory]
    };
  }
  getIconForMemoryType(type) {
    switch (type) {
      case "conversation":
        return new vscode4.ThemeIcon("comment-discussion");
      case "knowledge":
        return new vscode4.ThemeIcon("book");
      case "project":
        return new vscode4.ThemeIcon("project");
      case "context":
        return new vscode4.ThemeIcon("info");
      case "reference":
        return new vscode4.ThemeIcon("references");
      case "personal":
        return new vscode4.ThemeIcon("account");
      case "workflow":
        return new vscode4.ThemeIcon("settings");
      default:
        return new vscode4.ThemeIcon("file");
    }
  }
};
var MemoryTypeTreeItem = class extends vscode4.TreeItem {
  constructor(memoryType, memories, collapsibleState) {
    super(memoryType, collapsibleState);
    this.memoryType = memoryType;
    this.memories = memories;
    this.tooltip = `${memoryType} (${memories.length} memories)`;
    this.description = `${memories.length} memories`;
    this.contextValue = "memoryType";
    this.iconPath = new vscode4.ThemeIcon("folder");
  }
};
var MemoryTreeProvider = class {
  constructor(memoryService) {
    this.memoryService = memoryService;
    this._onDidChangeTreeData = new vscode4.EventEmitter();
    this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    this.memories = [];
    this.loading = false;
    this.authenticated = false;
    void this.setAuthenticated(false);
  }
  async loadMemories() {
    if (!this.authenticated) {
      this.memories = [];
      this.loading = false;
      this._onDidChangeTreeData.fire();
      return;
    }
    try {
      this.loading = true;
      this.memories = await this.memoryService.listMemories(100);
    } catch (error) {
      this.memories = [];
      if (!(error instanceof Error && error.message.includes("Not authenticated"))) {
        vscode4.window.showErrorMessage(`Failed to load memories: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    } finally {
      this.loading = false;
      this._onDidChangeTreeData.fire();
    }
  }
  refresh() {
    if (!this.authenticated) {
      this.clear();
      return;
    }
    void this.loadMemories();
  }
  async setAuthenticated(authenticated) {
    this.authenticated = authenticated;
    if (authenticated) {
      void this.loadMemories();
    } else {
      this.clear();
    }
  }
  clear() {
    this.loading = false;
    this.memories = [];
    this._onDidChangeTreeData.fire();
  }
  getTreeItem(element) {
    return element;
  }
  getChildren(element) {
    if (!this.authenticated) {
      return Promise.resolve([]);
    }
    if (this.loading) {
      return Promise.resolve([]);
    }
    if (!element) {
      return Promise.resolve(this.getMemoryTypeGroups());
    }
    if (element instanceof MemoryTypeTreeItem) {
      return Promise.resolve(
        element.memories.map(
          (memory) => new MemoryTreeItem(memory, vscode4.TreeItemCollapsibleState.None)
        )
      );
    }
    return Promise.resolve([]);
  }
  getMemoryTypeGroups() {
    const memoryTypes = ["conversation", "knowledge", "project", "context", "reference", "personal", "workflow"];
    const groups = [];
    for (const type of memoryTypes) {
      const memoriesForType = this.memories.filter((memory) => memory.memory_type === type);
      if (memoriesForType.length > 0) {
        groups.push(new MemoryTypeTreeItem(
          type,
          memoriesForType,
          vscode4.TreeItemCollapsibleState.Collapsed
        ));
      }
    }
    return groups;
  }
  getParent(element) {
    if (!this.authenticated) {
      return null;
    }
    if (element instanceof MemoryTreeItem) {
      const memoryType = element.memory.memory_type;
      const memoriesForType = this.memories.filter((memory) => memory.memory_type === memoryType);
      return new MemoryTypeTreeItem(memoryType, memoriesForType, vscode4.TreeItemCollapsibleState.Collapsed);
    }
    return null;
  }
};

// src/providers/ApiKeyTreeProvider.ts
var vscode5 = __toESM(require("vscode"));
var ApiKeyTreeItem = class extends vscode5.TreeItem {
  constructor(apiKey, collapsibleState) {
    super(apiKey.name, collapsibleState);
    this.apiKey = apiKey;
    this.tooltip = `${apiKey.name}
Type: ${apiKey.keyType}
Environment: ${apiKey.environment}
Access Level: ${apiKey.accessLevel}`;
    this.description = `${apiKey.environment} \u2022 ${apiKey.keyType}`;
    this.contextValue = "apiKey";
    this.iconPath = this.getIconForKeyType(apiKey.keyType);
    if (apiKey.expiresAt) {
      const expiresAt = new Date(apiKey.expiresAt);
      const now = /* @__PURE__ */ new Date();
      const daysUntilExpiry = Math.floor((expiresAt.getTime() - now.getTime()) / (1e3 * 60 * 60 * 24));
      if (daysUntilExpiry <= 7) {
        this.description += ` \u26A0\uFE0F Expires in ${daysUntilExpiry} days`;
      }
    }
  }
  getIconForKeyType(keyType) {
    const iconMap = {
      api_key: "key",
      database_url: "database",
      oauth_token: "account",
      certificate: "certificate",
      ssh_key: "terminal",
      webhook_secret: "webhook",
      encryption_key: "shield"
    };
    return new vscode5.ThemeIcon(iconMap[keyType] || "key");
  }
};
var ProjectTreeItem = class extends vscode5.TreeItem {
  constructor(project, collapsibleState) {
    super(project.name, collapsibleState);
    this.project = project;
    this.tooltip = `${project.name}
${project.description || "No description"}
Organization: ${project.organizationId}`;
    this.description = project.description ? project.description.substring(0, 50) + "..." : "No description";
    this.contextValue = "project";
    this.iconPath = new vscode5.ThemeIcon("folder");
  }
};
var ApiKeyTreeProvider = class {
  constructor(apiKeyService, output) {
    this.apiKeyService = apiKeyService;
    this.output = output;
    this._onDidChangeTreeData = new vscode5.EventEmitter();
    this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    this.projects = [];
    this.apiKeys = {};
    this.authenticated = false;
  }
  refresh(resetCache = false) {
    if (resetCache) {
      this.clearCache();
    }
    this._onDidChangeTreeData.fire();
  }
  setAuthenticated(authenticated) {
    this.authenticated = authenticated;
    if (!authenticated) {
      this.clear();
    } else {
      this.clear();
      this.refresh();
    }
  }
  clear() {
    this.clearCache();
    this._onDidChangeTreeData.fire();
  }
  getTreeItem(element) {
    return element;
  }
  async getChildren(element) {
    if (!this.authenticated) {
      const authItem = new vscode5.TreeItem("Not authenticated", vscode5.TreeItemCollapsibleState.None);
      authItem.description = "Click to authenticate";
      authItem.iconPath = new vscode5.ThemeIcon("key");
      authItem.contextValue = "notAuthenticated";
      authItem.command = {
        command: "lzeroMemory.authenticate",
        title: "Authenticate",
        arguments: ["oauth"]
      };
      return [authItem];
    }
    try {
      if (!element) {
        this.projects = await this.apiKeyService.getProjects();
        if (this.projects.length === 0) {
          const emptyItem = new vscode5.TreeItem("No projects found", vscode5.TreeItemCollapsibleState.None);
          emptyItem.description = "Click + to create a project";
          emptyItem.iconPath = new vscode5.ThemeIcon("info");
          emptyItem.contextValue = "empty";
          return [emptyItem];
        }
        return this.projects.map(
          (project) => new ProjectTreeItem(project, vscode5.TreeItemCollapsibleState.Collapsed)
        );
      }
      if (element instanceof ProjectTreeItem) {
        const projectId = element.project.id;
        if (!this.apiKeys[projectId]) {
          this.apiKeys[projectId] = await this.apiKeyService.getApiKeys(projectId);
        }
        if (this.apiKeys[projectId].length === 0) {
          const emptyItem = new vscode5.TreeItem("No API keys in this project", vscode5.TreeItemCollapsibleState.None);
          emptyItem.description = "Right-click project to create a key";
          emptyItem.iconPath = new vscode5.ThemeIcon("info");
          emptyItem.contextValue = "empty";
          return [emptyItem];
        }
        return this.apiKeys[projectId].map(
          (apiKey) => new ApiKeyTreeItem(apiKey, vscode5.TreeItemCollapsibleState.None)
        );
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.output.appendLine(`[ApiKeyTreeProvider] Error loading API keys: ${errorMessage}`);
      const errorMsg = error instanceof Error ? error.message : "Unknown error";
      if (errorMsg.includes("401") || errorMsg.includes("No token") || errorMsg.includes("AUTH_TOKEN_MISSING")) {
        const authItem = new vscode5.TreeItem("Authentication required", vscode5.TreeItemCollapsibleState.None);
        authItem.description = "Click to authenticate";
        authItem.iconPath = new vscode5.ThemeIcon("warning");
        authItem.contextValue = "authRequired";
        authItem.command = {
          command: "lzeroMemory.authenticate",
          title: "Authenticate",
          arguments: ["oauth"]
        };
        authItem.tooltip = `Authentication error: ${errorMsg}`;
        return [authItem];
      }
      if (errorMsg.includes("405") || errorMsg.includes("404") || errorMsg.includes("Not Found")) {
        const notAvailableItem = new vscode5.TreeItem("API Key Management", vscode5.TreeItemCollapsibleState.None);
        notAvailableItem.description = "Not available on this server";
        notAvailableItem.iconPath = new vscode5.ThemeIcon("info");
        notAvailableItem.contextValue = "notAvailable";
        notAvailableItem.tooltip = "The API key management endpoints are not available on the current server.";
        return [notAvailableItem];
      }
      const errorItem = new vscode5.TreeItem("Error loading data", vscode5.TreeItemCollapsibleState.None);
      errorItem.description = errorMsg.length > 50 ? errorMsg.substring(0, 50) + "..." : errorMsg;
      errorItem.iconPath = new vscode5.ThemeIcon("error");
      errorItem.contextValue = "error";
      errorItem.tooltip = errorMsg;
      return [errorItem];
    }
    return [];
  }
  async addProject(project) {
    this.projects.push(project);
    this.refresh();
  }
  async updateProject(updatedProject) {
    const index = this.projects.findIndex((p) => p.id === updatedProject.id);
    if (index !== -1) {
      this.projects[index] = updatedProject;
      this.refresh();
    }
  }
  async removeProject(projectId) {
    this.projects = this.projects.filter((p) => p.id !== projectId);
    delete this.apiKeys[projectId];
    this.refresh();
  }
  async addApiKey(projectId, apiKey) {
    if (!this.apiKeys[projectId]) {
      this.apiKeys[projectId] = [];
    }
    this.apiKeys[projectId].push(apiKey);
    this.refresh();
  }
  async updateApiKey(projectId, updatedApiKey) {
    if (this.apiKeys[projectId]) {
      const index = this.apiKeys[projectId].findIndex((k) => k.id === updatedApiKey.id);
      if (index !== -1) {
        this.apiKeys[projectId][index] = updatedApiKey;
        this.refresh();
      }
    }
  }
  async removeApiKey(projectId, apiKeyId) {
    if (this.apiKeys[projectId]) {
      this.apiKeys[projectId] = this.apiKeys[projectId].filter((k) => k.id !== apiKeyId);
      this.refresh();
    }
  }
  clearCache() {
    this.projects = [];
    this.apiKeys = {};
  }
};

// src/utils/diagnostics.ts
var vscode6 = __toESM(require("vscode"));
async function runDiagnostics(context, secureApiKeyService, memoryService, outputChannel) {
  const results = [];
  outputChannel.appendLine("==================================================");
  outputChannel.appendLine("Starting L0 Memory Extension Diagnostics");
  outputChannel.appendLine(`Timestamp: ${(/* @__PURE__ */ new Date()).toISOString()}`);
  outputChannel.appendLine("==================================================\n");
  results.push(await checkExtensionContext(context, outputChannel));
  results.push(await checkVSCodeVersion(outputChannel));
  results.push(await checkConfiguration(outputChannel));
  results.push(await checkAuthentication(secureApiKeyService, outputChannel));
  results.push(await checkNetworkConnectivity(memoryService, outputChannel));
  results.push(await checkStorage(context, outputChannel));
  const overall = determineOverallHealth(results);
  outputChannel.appendLine("\n==================================================");
  outputChannel.appendLine(`Overall Health: ${overall.toUpperCase()}`);
  outputChannel.appendLine("==================================================");
  return {
    overall,
    results,
    timestamp: /* @__PURE__ */ new Date()
  };
}
async function checkExtensionContext(context, outputChannel) {
  outputChannel.appendLine("[1/6] Checking Extension Context...");
  try {
    if (!context) {
      return {
        category: "Extension Context",
        status: "error",
        message: "Extension context is not available",
        action: "Reload VS Code"
      };
    }
    const globalStoragePath = context.globalStorageUri?.fsPath;
    const workspaceStoragePath = context.storageUri?.fsPath;
    outputChannel.appendLine(`  \u2713 Extension ID: ${context.extension.id}`);
    outputChannel.appendLine(`  \u2713 Extension Path: ${context.extensionPath}`);
    outputChannel.appendLine(`  \u2713 Global Storage: ${globalStoragePath || "N/A"}`);
    outputChannel.appendLine(`  \u2713 Workspace Storage: ${workspaceStoragePath || "N/A"}`);
    return {
      category: "Extension Context",
      status: "success",
      message: "Extension context is properly initialized"
    };
  } catch (error) {
    outputChannel.appendLine(`  \u2717 Error: ${error instanceof Error ? error.message : String(error)}`);
    return {
      category: "Extension Context",
      status: "error",
      message: "Failed to check extension context",
      details: error instanceof Error ? error.message : String(error)
    };
  }
}
async function checkVSCodeVersion(outputChannel) {
  outputChannel.appendLine("\n[2/6] Checking VS Code Version...");
  try {
    const version2 = vscode6.version;
    const requiredVersion = "1.93.0";
    outputChannel.appendLine(`  \u2713 Current Version: ${version2}`);
    outputChannel.appendLine(`  \u2713 Required Version: ${requiredVersion}+`);
    const [major, minor] = version2.split(".").map(Number);
    const [reqMajor, reqMinor] = requiredVersion.split(".").map(Number);
    if (major > reqMajor || major === reqMajor && minor >= reqMinor) {
      return {
        category: "VS Code Version",
        status: "success",
        message: `VS Code ${version2} meets minimum requirements`
      };
    }
    return {
      category: "VS Code Version",
      status: "warning",
      message: `VS Code ${version2} is below recommended version ${requiredVersion}`,
      action: "Update VS Code"
    };
  } catch (error) {
    outputChannel.appendLine(`  \u2717 Error: ${error instanceof Error ? error.message : String(error)}`);
    return {
      category: "VS Code Version",
      status: "error",
      message: "Failed to check VS Code version",
      details: error instanceof Error ? error.message : String(error)
    };
  }
}
async function checkConfiguration(outputChannel) {
  outputChannel.appendLine("\n[3/6] Checking Configuration...");
  try {
    const config = vscode6.workspace.getConfiguration("lzero");
    const apiUrl = config.get("apiUrl");
    const gatewayUrl = config.get("gatewayUrl");
    const useGateway = config.get("useGateway");
    const enableApiKeyManagement = config.get("enableApiKeyManagement");
    outputChannel.appendLine(`  \u2713 API URL: ${apiUrl}`);
    outputChannel.appendLine(`  \u2713 Gateway URL: ${gatewayUrl}`);
    outputChannel.appendLine(`  \u2713 Use Gateway: ${useGateway}`);
    outputChannel.appendLine(`  \u2713 API Key Mgmt: ${enableApiKeyManagement}`);
    const issues = [];
    if (!apiUrl) {
      issues.push("API URL not configured");
    }
    if (useGateway && !gatewayUrl) {
      issues.push("Gateway mode enabled but Gateway URL not configured");
    }
    if (issues.length > 0) {
      return {
        category: "Configuration",
        status: "warning",
        message: "Configuration issues detected",
        details: issues.join("; "),
        action: "Check Settings"
      };
    }
    return {
      category: "Configuration",
      status: "success",
      message: "Configuration is valid"
    };
  } catch (error) {
    outputChannel.appendLine(`  \u2717 Error: ${error instanceof Error ? error.message : String(error)}`);
    return {
      category: "Configuration",
      status: "error",
      message: "Failed to check configuration",
      details: error instanceof Error ? error.message : String(error)
    };
  }
}
async function checkAuthentication(secureApiKeyService, outputChannel) {
  outputChannel.appendLine("\n[4/6] Checking Authentication...");
  try {
    const hasApiKey = await secureApiKeyService.hasApiKey();
    if (hasApiKey) {
      outputChannel.appendLine("  \u2713 API key is stored securely");
      try {
        const apiKey = await secureApiKeyService.getApiKey();
        if (apiKey && apiKey.length > 0) {
          outputChannel.appendLine(`  \u2713 API key length: ${apiKey.length} characters`);
          outputChannel.appendLine(`  \u2713 API key prefix: ${apiKey.substring(0, 8)}...`);
          return {
            category: "Authentication",
            status: "success",
            message: "Authenticated with valid API key"
          };
        }
        return {
          category: "Authentication",
          status: "warning",
          message: "API key exists but appears empty",
          action: "Re-authenticate"
        };
      } catch (error) {
        return {
          category: "Authentication",
          status: "warning",
          message: "API key exists but could not be retrieved",
          details: error instanceof Error ? error.message : String(error),
          action: "Re-authenticate"
        };
      }
    }
    outputChannel.appendLine("  \u2139 No API key configured");
    return {
      category: "Authentication",
      status: "info",
      message: "Not authenticated",
      action: "Authenticate"
    };
  } catch (error) {
    outputChannel.appendLine(`  \u2717 Error: ${error instanceof Error ? error.message : String(error)}`);
    return {
      category: "Authentication",
      status: "error",
      message: "Failed to check authentication status",
      details: error instanceof Error ? error.message : String(error)
    };
  }
}
async function checkNetworkConnectivity(memoryService, outputChannel) {
  outputChannel.appendLine("\n[5/6] Checking Network Connectivity...");
  try {
    const authenticated = await memoryService.isAuthenticated();
    if (!authenticated) {
      outputChannel.appendLine("  \u2139 Skipping (not authenticated)");
      return {
        category: "Network Connectivity",
        status: "info",
        message: "Skipped - not authenticated"
      };
    }
    outputChannel.appendLine("  \u23F3 Testing connection...");
    const startTime = Date.now();
    await memoryService.testConnection();
    const duration = Date.now() - startTime;
    outputChannel.appendLine(`  \u2713 Connection successful (${duration}ms)`);
    return {
      category: "Network Connectivity",
      status: "success",
      message: `Connected successfully in ${duration}ms`
    };
  } catch (error) {
    outputChannel.appendLine(`  \u2717 Connection failed: ${error instanceof Error ? error.message : String(error)}`);
    return {
      category: "Network Connectivity",
      status: "error",
      message: "Unable to connect to L0 Memory services",
      details: error instanceof Error ? error.message : String(error),
      action: "Check internet connection"
    };
  }
}
async function checkStorage(context, outputChannel) {
  outputChannel.appendLine("\n[6/6] Checking Storage...");
  try {
    await context.globalState.update("lzero.diagnosticTest", Date.now());
    const testValue = context.globalState.get("lzero.diagnosticTest");
    if (!testValue) {
      outputChannel.appendLine("  \u2717 Global state write/read failed");
      return {
        category: "Storage",
        status: "error",
        message: "Storage system is not working properly",
        action: "Reload VS Code"
      };
    }
    outputChannel.appendLine("  \u2713 Global state is accessible");
    const keys = context.globalState.keys();
    outputChannel.appendLine(`  \u2713 Stored keys: ${keys.length}`);
    const firstTime = context.globalState.get("lzero.firstTime");
    outputChannel.appendLine(`  \u2713 First time flag: ${firstTime}`);
    return {
      category: "Storage",
      status: "success",
      message: "Storage system is working properly"
    };
  } catch (error) {
    outputChannel.appendLine(`  \u2717 Error: ${error instanceof Error ? error.message : String(error)}`);
    return {
      category: "Storage",
      status: "error",
      message: "Storage system check failed",
      details: error instanceof Error ? error.message : String(error)
    };
  }
}
function determineOverallHealth(results) {
  const hasError = results.some((r) => r.status === "error");
  const hasWarning = results.some((r) => r.status === "warning");
  if (hasError) return "critical";
  if (hasWarning) return "degraded";
  return "healthy";
}
function formatDiagnosticResults(health) {
  const statusEmoji = {
    healthy: "\u2705",
    degraded: "\u26A0\uFE0F",
    critical: "\u274C"
  };
  const resultEmoji = {
    success: "\u2705",
    warning: "\u26A0\uFE0F",
    error: "\u274C",
    info: "\u2139\uFE0F"
  };
  let output = `# L0 Memory Extension Diagnostics

`;
  output += `**Overall Health:** ${statusEmoji[health.overall]} ${health.overall.toUpperCase()}
`;
  output += `**Timestamp:** ${health.timestamp.toLocaleString()}

`;
  output += `---

`;
  for (const result of health.results) {
    output += `## ${resultEmoji[result.status]} ${result.category}

`;
    output += `**Status:** ${result.status.toUpperCase()}

`;
    output += `**Message:** ${result.message}

`;
    if (result.details) {
      output += `**Details:** ${result.details}

`;
    }
    if (result.action) {
      output += `**Recommended Action:** ${result.action}

`;
    }
    output += `---

`;
  }
  return output;
}

// src/extension.ts
var DEFAULT_API_URL = "https://api.lanonasis.com";
var getApiUrl = () => {
  const config = vscode7.workspace.getConfiguration("lzero");
  return config.get("apiUrl") || DEFAULT_API_URL;
};
var getMemoryApiUrl = () => {
  const config = vscode7.workspace.getConfiguration("lzero");
  const apiUrl = config.get("apiUrl") || DEFAULT_API_URL;
  if (apiUrl.endsWith("/api/v1")) {
    return apiUrl;
  }
  return `${apiUrl.replace(/\/$/, "")}/api/v1`;
};
var getDashboardUrl = () => {
  const config = vscode7.workspace.getConfiguration("lzero");
  return config.get("dashboardUrl") || "https://lanonasis.com/dashboard";
};
var getApiBaseUrl = () => {
  const config = vscode7.workspace.getConfiguration("lzero");
  const configUrl = config.get("apiUrl") || DEFAULT_API_URL;
  return configUrl.replace(/\/api\/v1\/?$/, "");
};
var VALID_API_KEY_PREFIXES = ["lano_", "lns_"];
function isValidApiKeyFormat(apiKey) {
  return VALID_API_KEY_PREFIXES.some((prefix) => apiKey.startsWith(prefix));
}
function decodeJwtPayload(token) {
  const parts = token.split(".");
  if (parts.length < 2) return null;
  const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - base64.length % 4) % 4);
  try {
    let json = "";
    if (typeof Buffer !== "undefined") {
      json = Buffer.from(padded, "base64").toString("utf8");
    } else if (typeof atob === "function") {
      const binary = atob(padded);
      if (typeof TextDecoder !== "undefined") {
        const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
        json = new TextDecoder().decode(bytes);
      } else {
        json = binary;
      }
    } else {
      return null;
    }
    return JSON.parse(json);
  } catch {
    return null;
  }
}
function getUserProfileFromToken(token) {
  if (!token || !token.includes(".")) return null;
  const payload = decodeJwtPayload(token);
  if (!payload) return null;
  const email = typeof payload.email === "string" ? payload.email : typeof payload.user_email === "string" ? payload.user_email : typeof payload.upn === "string" ? payload.upn : void 0;
  const givenName = typeof payload.given_name === "string" ? payload.given_name : void 0;
  const familyName = typeof payload.family_name === "string" ? payload.family_name : void 0;
  const fullName = [givenName, familyName].filter(Boolean).join(" ");
  const name = typeof payload.name === "string" ? payload.name : typeof payload.preferred_username === "string" ? payload.preferred_username : typeof payload.nickname === "string" ? payload.nickname : fullName || void 0;
  const id = typeof payload.sub === "string" ? payload.sub : void 0;
  if (!email && !name && !id) return null;
  return { id, name, email };
}
var memoryCacheInstance = null;
var MemorySidebarProvider = class {
  constructor(context, output, secureApiKeyService, apiKeyService, cache) {
    this.context = context;
    this.output = output;
    this.secureApiKeyService = secureApiKeyService;
    this.apiKeyService = apiKeyService;
    this.cache = cache;
  }
  static {
    this.viewType = "lzero.memorySidebar";
  }
  resolveWebviewView(webviewView, _context, _token) {
    this.view = webviewView;
    const webview = webviewView.webview;
    webview.options = {
      enableScripts: true,
      localResourceRoots: [vscode7.Uri.joinPath(this.context.extensionUri, "media")]
    };
    this.output.appendLine("[LanOnasis] Initializing sidebar webview");
    webview.html = this.getWebviewHtml(webview);
    webview.onDidReceiveMessage((message) => {
      if (!message || typeof message !== "object") return;
      if (message.type === "lanonasis:webview-ready") {
        this.output.appendLine("[LanOnasis] Webview ready");
        webview.postMessage({ type: "lanonasis:host-ready" });
        const memories = this.cache.getMemories();
        const status = this.cache.getStatus();
        webview.postMessage({ type: "lanonasis:cache:data", payload: { memories, status } });
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
      if (message.type === "lanonasis:open-settings") {
        void vscode7.commands.executeCommand("workbench.action.openSettings", "lzero");
        return;
      }
      if (message.type === "lanonasis:open-dashboard") {
        const section = message.payload?.section;
        const baseUrl = getDashboardUrl();
        const targetUrl = section ? `${baseUrl}#${section}` : baseUrl;
        void vscode7.env.openExternal(vscode7.Uri.parse(targetUrl));
        return;
      }
      if (message.type === "lanonasis:clipboard:read") {
        void vscode7.env.clipboard.readText().then((text) => {
          webview.postMessage({ type: "lanonasis:clipboard:read:result", payload: { text } });
        });
        return;
      }
      if (message.type === "lanonasis:clipboard:write") {
        const text = message.payload?.text;
        if (typeof text === "string") void vscode7.env.clipboard.writeText(text);
        return;
      }
      if (message.type === "lanonasis:cache:get") {
        const memories = this.cache.getMemories();
        const status = this.cache.getStatus();
        webview.postMessage({
          type: "lanonasis:cache:data",
          payload: { memories, status }
        });
        return;
      }
      if (message.type === "lanonasis:cache:search") {
        const query = message.payload?.query;
        if (query) {
          const results = this.cache.semanticSearchLocal(query);
          webview.postMessage({
            type: "lanonasis:cache:search:result",
            payload: { results, query }
          });
        }
        return;
      }
      if (message.type === "lanonasis:cache:add") {
        const memory = message.payload?.memory;
        if (memory) {
          void this.cache.addLocal(memory).then((created) => {
            webview.postMessage({
              type: "lanonasis:cache:added",
              payload: { memory: created }
            });
          });
        }
        return;
      }
      if (message.type === "lanonasis:cache:update") {
        const id = message.payload?.id;
        const updates = message.payload?.updates;
        if (id && updates) {
          void this.cache.queueUpdate(id, updates).then(() => {
            const updated = this.cache.getMemoryById(id);
            webview.postMessage({
              type: "lanonasis:cache:updated",
              payload: { memory: updated, status: this.cache.getStatus() }
            });
          });
        }
        return;
      }
      if (message.type === "lanonasis:cache:delete") {
        const id = message.payload?.id;
        if (id) {
          void this.cache.queueDelete(id).then(() => {
            webview.postMessage({
              type: "lanonasis:cache:deleted",
              payload: { id, status: this.cache.getStatus() }
            });
          });
        }
        return;
      }
      if (message.type === "lanonasis:cache:clear") {
        void this.cache.clearAll().then(() => {
          webview.postMessage({
            type: "lanonasis:cache:cleared",
            payload: { status: this.cache.getStatus() }
          });
        });
        return;
      }
      if (message.type === "lanonasis:cache:sync") {
        void this.syncMemories(webview);
        return;
      }
      if (message.type === "lanonasis:ai:search") {
        const query = message.payload?.query;
        if (query) {
          void this.handleAISearch(webview, query);
        }
        return;
      }
    });
  }
  async syncMemories(webview) {
    this.cache.setSyncing(true);
    webview.postMessage({ type: "lanonasis:sync:start" });
    const syncTimeout = setTimeout(() => {
      this.cache.setSyncing(false);
      this.output.appendLine("[LanOnasis] Sync timed out after 60 seconds");
      webview.postMessage({
        type: "lanonasis:sync:error",
        payload: { error: "Sync timed out after 60 seconds", isNetworkError: true }
      });
    }, 6e4);
    try {
      const headers = await this.getEdgeAuthHeaders();
      if (!headers) {
        clearTimeout(syncTimeout);
        this.cache.setSyncing(false);
        webview.postMessage({ type: "lanonasis:sync:error", payload: { error: "Not authenticated" } });
        return;
      }
      const apiUrl = getMemoryApiUrl();
      const pendingQueue = this.cache.getPendingQueue();
      const syncResults = { success: 0, failed: 0 };
      for (const pending of pendingQueue) {
        try {
          if (pending._pending === "create") {
            const createController = new AbortController();
            const createTimeout = setTimeout(() => createController.abort(), 3e4);
            try {
              const createResponse = await fetch(`${apiUrl}/memories`, {
                method: "POST",
                headers,
                signal: createController.signal,
                body: JSON.stringify({
                  title: pending.title,
                  content: pending.content,
                  memory_type: pending.memory_type,
                  tags: pending.tags
                })
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
          } else if (pending._pending === "update") {
            const updateController = new AbortController();
            const updateTimeout = setTimeout(() => updateController.abort(), 3e4);
            try {
              const updateResponse = await fetch(`${apiUrl}/memory/update`, {
                method: "POST",
                headers,
                signal: updateController.signal,
                body: JSON.stringify({
                  id: pending.id,
                  title: pending.title,
                  content: pending.content,
                  memory_type: pending.memory_type,
                  tags: pending.tags
                })
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
          } else if (pending._pending === "delete") {
            const deleteController = new AbortController();
            const deleteTimeout = setTimeout(() => deleteController.abort(), 3e4);
            try {
              const deleteResponse = await fetch(`${apiUrl}/memory/delete`, {
                method: "POST",
                headers,
                signal: deleteController.signal,
                body: JSON.stringify({ id: pending.id })
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
      const listController = new AbortController();
      const listTimeout = setTimeout(() => listController.abort(), 3e4);
      try {
        const response = await fetch(`${apiUrl}/memories/list?limit=100`, {
          headers,
          signal: listController.signal
        });
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        const memories = data.data?.memories || data.memories || data.data || data || [];
        await this.cache.updateFromApi(memories);
        this.cache.setOnline(true);
        clearTimeout(syncTimeout);
        webview.postMessage({
          type: "lanonasis:sync:complete",
          payload: { memories, status: this.cache.getStatus(), syncResults }
        });
      } finally {
        clearTimeout(listTimeout);
      }
    } catch (err) {
      clearTimeout(syncTimeout);
      const errorStr = String(err);
      const isNetworkError = errorStr.includes("fetch") || errorStr.includes("network") || errorStr.includes("ECONNREFUSED") || errorStr.includes("ETIMEDOUT") || errorStr.includes("AbortError") || errorStr.includes("aborted");
      if (isNetworkError) {
        this.cache.setOnline(false);
      }
      this.output.appendLine(`[LanOnasis] Sync error: ${err}`);
      webview.postMessage({
        type: "lanonasis:sync:error",
        payload: { error: errorStr, isNetworkError }
      });
    } finally {
      clearTimeout(syncTimeout);
      this.cache.setSyncing(false);
    }
  }
  async handleAISearch(webview, query) {
    try {
      const localResults = this.cache.semanticSearchLocal(query);
      webview.postMessage({
        type: "lanonasis:ai:search:local",
        payload: { results: localResults, query }
      });
      const apiKey = await this.getStoredApiKey();
      const headers = await this.getEdgeAuthHeaders();
      if (headers) {
        const apiUrl = getMemoryApiUrl();
        const response = await fetch(`${apiUrl}/memories/search`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            query,
            limit: 10,
            threshold: 0.7
          })
        });
        if (response.ok) {
          const data = await response.json();
          const apiResults = data.data?.results || data.results || data.data || [];
          webview.postMessage({
            type: "lanonasis:ai:search:api",
            payload: { results: apiResults, query }
          });
        }
      }
    } catch (err) {
      this.output.appendLine(`[LanOnasis] AI search error: ${err}`);
    }
  }
  async getStoredApiKey() {
    try {
      const credentials = await this.secureApiKeyService.getStoredCredentials();
      return credentials?.token;
    } catch (err) {
      this.output.appendLine(`[LanOnasis] Failed to get credentials: ${err}`);
      return void 0;
    }
  }
  async getEdgeAuthHeaders() {
    try {
      const credentials = await this.secureApiKeyService.getStoredCredentials();
      if (!credentials) {
        return null;
      }
      if (credentials.type === "oauth") {
        return {
          Authorization: `Bearer ${credentials.token}`,
          "Content-Type": "application/json"
        };
      }
      return {
        "X-API-Key": credentials.token,
        "Content-Type": "application/json"
      };
    } catch (err) {
      this.output.appendLine(`[LanOnasis] Failed to build auth headers: ${err}`);
      return null;
    }
  }
  async sendConfigToWebview(webview) {
    const newConfig = vscode7.workspace.getConfiguration("lzero");
    const oldConfig = vscode7.workspace.getConfiguration("lanonasis");
    const apiUrl = getApiBaseUrl();
    let authCredential;
    let userProfile = null;
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
            this.output.appendLine("[LanOnasis] Failed to load user profile: " + String(error));
          }
        }
        this.output.appendLine("[LanOnasis] Found stored credentials");
      }
    } catch (err) {
      this.output.appendLine("[LanOnasis] Token error: " + String(err));
    }
    webview.postMessage({
      type: "lanonasis:config:init",
      payload: { apiUrl, apiKey: authCredential, user: userProfile }
    });
  }
  async handleOAuthLogin(webview) {
    try {
      const token = await this.secureApiKeyService.authenticateWithOAuthFlow();
      if (!token) throw new Error("No tokens received");
      let userProfile = getUserProfileFromToken(token);
      if (!userProfile) {
        try {
          const apiUser = await this.apiKeyService.getUserInfo();
          if (apiUser) {
            userProfile = { id: apiUser.id, name: apiUser.name, email: apiUser.email };
          }
        } catch (error) {
          this.output.appendLine("[LanOnasis] Failed to load user profile: " + String(error));
        }
      }
      webview.postMessage({ type: "lanonasis:auth:result", payload: { success: true } });
      webview.postMessage({
        type: "lanonasis:config:update",
        payload: { apiKey: token, user: userProfile }
      });
      await vscode7.window.showInformationMessage("LanOnasis: Connected via OAuth!");
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
      await this.secureApiKeyService.storeApiKeyDirect(apiKey);
      let userProfile = null;
      try {
        const apiUser = await this.apiKeyService.getUserInfo();
        if (apiUser) {
          userProfile = { id: apiUser.id, name: apiUser.name, email: apiUser.email };
        }
      } catch (error) {
        this.output.appendLine("[LanOnasis] Failed to load user profile: " + String(error));
      }
      webview.postMessage({ type: "lanonasis:auth:result", payload: { success: true } });
      webview.postMessage({ type: "lanonasis:config:update", payload: { apiKey, user: userProfile } });
      await vscode7.window.showInformationMessage("LanOnasis: Connected!");
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      webview.postMessage({ type: "lanonasis:auth:result", payload: { success: false, error: msg } });
    }
  }
  async handleLogout(webview) {
    try {
      await this.secureApiKeyService.deleteApiKey();
      webview.postMessage({ type: "lanonasis:config:update", payload: { apiKey: null, user: null } });
      await vscode7.window.showInformationMessage("LanOnasis: Logged out");
    } catch (error) {
      this.output.appendLine("[LanOnasis] Logout error: " + String(error));
    }
  }
  postMessage(message) {
    if (this.view) this.view.webview.postMessage(message);
  }
  getWebviewHtml(webview) {
    const nonce = getNonce();
    const scriptUri = webview.asWebviewUri(vscode7.Uri.joinPath(this.context.extensionUri, "media", "sidebar-react.js"));
    const styleUri = webview.asWebviewUri(vscode7.Uri.joinPath(this.context.extensionUri, "media", "lzero-memory.css"));
    const csp = [
      "default-src 'none'",
      "img-src " + webview.cspSource + " https: data:",
      "style-src " + webview.cspSource + " 'unsafe-inline'",
      "font-src " + webview.cspSource + " https: data:",
      "script-src 'nonce-" + nonce + "' 'wasm-unsafe-eval'",
      "connect-src https: wss: http://localhost:*"
    ].join("; ");
    return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta http-equiv="Content-Security-Policy" content="' + csp + '"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><link rel="stylesheet" href="' + styleUri + '"/><title>LanOnasis Memory</title><style>body{background:var(--vscode-sideBar-background,#252526);color:var(--vscode-sideBar-foreground,#ccc);font-family:var(--vscode-font-family,sans-serif);margin:0;padding:0}#loading{padding:20px;text-align:center}#error{padding:20px;color:#f48771;display:none;white-space:pre-wrap;font-size:12px}</style></head><body><div id="loading">Loading L0 Memory...</div><div id="error"></div><div id="root"></div><script nonce="' + nonce + '">var errors=[];window.onerror=function(m,u,l){errors.push(m+" at "+u+":"+l);document.getElementById("error").style.display="block";document.getElementById("error").textContent="JS Error:\\n"+errors.join("\\n");document.getElementById("loading").style.display="none";return false};window.addEventListener("unhandledrejection",function(e){errors.push("Promise: "+(e.reason?.message||e.reason||"Unknown"));document.getElementById("error").style.display="block";document.getElementById("error").textContent="Promise Error:\\n"+errors.join("\\n");document.getElementById("loading").style.display="none"});<\/script><script nonce="' + nonce + '" type="module" src="' + scriptUri + `" onerror="document.getElementById('error').textContent='Failed to load script';document.getElementById('error').style.display='block';document.getElementById('loading').style.display='none';"><\/script><script nonce="` + nonce + '">var observer=new MutationObserver(function(){if(document.getElementById("root").children.length>0){document.getElementById("loading").style.display="none";observer.disconnect()}});observer.observe(document.getElementById("root"),{childList:true});setTimeout(function(){if(document.getElementById("root").children.length===0){document.getElementById("error").textContent="React failed to mount";document.getElementById("error").style.display="block";document.getElementById("loading").style.display="none"}},5000);<\/script></body></html>';
  }
};
function getNonce() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let text = "";
  for (let i = 0; i < 32; i++) text += chars.charAt(Math.floor(Math.random() * chars.length));
  return text;
}
function hasViewId(context, viewId) {
  const views = context.extension?.packageJSON?.contributes?.views;
  if (!views || typeof views !== "object") {
    return false;
  }
  return Object.values(views).some(
    (viewList) => Array.isArray(viewList) && viewList.some((view) => view?.id === viewId)
  );
}
async function activate(context) {
  const output = vscode7.window.createOutputChannel("LanOnasis Memory");
  output.appendLine("[LanOnasis] Extension activating...");
  const secureApiKeyService = new SecureApiKeyService(context, output);
  try {
    await secureApiKeyService.initialize();
    output.appendLine("[LanOnasis] SecureApiKeyService initialized successfully");
  } catch (initError) {
    output.appendLine(`[LanOnasis] SecureApiKeyService initialization warning: ${initError}`);
  }
  const memoryService = new MemoryService(secureApiKeyService, output, getMemoryApiUrl());
  const apiKeyService = new ApiKeyService(secureApiKeyService, output);
  const retainContextWhenHidden = vscode7.workspace.getConfiguration("lzero").get("retainContextWhenHidden", false);
  const cache = new MemoryCache(context, output, getMemoryApiUrl());
  memoryCacheInstance = cache;
  const provider = new MemorySidebarProvider(context, output, secureApiKeyService, apiKeyService, cache);
  const memoryTreeProvider = new MemoryTreeProvider(memoryService);
  const apiKeyTreeProvider = new ApiKeyTreeProvider(apiKeyService, output);
  const hasMemoriesView = hasViewId(context, "lzeroMemories");
  const hasApiKeysView = hasViewId(context, "lzeroApiKeys");
  if (hasMemoriesView) {
    context.subscriptions.push(
      vscode7.window.registerTreeDataProvider("lzeroMemories", memoryTreeProvider)
    );
  } else {
    output.appendLine("[LanOnasis] View id lzeroMemories is not registered. Skipping tree provider.");
  }
  if (hasApiKeysView) {
    context.subscriptions.push(
      vscode7.window.registerTreeDataProvider("lzeroApiKeys", apiKeyTreeProvider)
    );
  } else {
    output.appendLine("[LanOnasis] View id lzeroApiKeys is not registered. Skipping tree provider.");
  }
  void vscode7.commands.executeCommand(
    "setContext",
    "lzero.enableApiKeyManagement",
    vscode7.workspace.getConfiguration("lzero").get("enableApiKeyManagement", true)
  );
  void vscode7.commands.executeCommand("setContext", "lzero.authenticated", false);
  const applyAuthenticationState = async (authenticated) => {
    await vscode7.commands.executeCommand("setContext", "lzero.authenticated", authenticated);
    await memoryTreeProvider.setAuthenticated(authenticated);
    apiKeyTreeProvider.setAuthenticated(authenticated);
  };
  const getApiKey = async () => {
    try {
      const credentials = await secureApiKeyService.getStoredCredentials();
      return credentials?.token;
    } catch (err) {
      output.appendLine(`[LanOnasis] Chat: Failed to get credentials: ${err}`);
      return void 0;
    }
  };
  const chatParticipant = new MemoryChatParticipant(
    context,
    output,
    cache,
    getApiUrl(),
    getApiKey
  );
  chatParticipant.register();
  context.subscriptions.push(
    vscode7.window.registerWebviewViewProvider(MemorySidebarProvider.viewType, provider, {
      webviewOptions: { retainContextWhenHidden }
    })
  );
  context.subscriptions.push(
    vscode7.commands.registerCommand("lzeroMemory.authenticate", async (mode) => {
      try {
        let token = null;
        if (mode === "oauth") {
          token = await secureApiKeyService.authenticateWithOAuthFlow();
        } else if (mode === "apikey") {
          token = await secureApiKeyService.promptForApiKeyEntry();
        } else {
          token = await secureApiKeyService.promptForAuthentication();
        }
        if (token) {
          await applyAuthenticationState(true);
          await vscode7.window.showInformationMessage("L0 Memory: Authenticated!");
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        await vscode7.window.showErrorMessage("L0 Memory: Auth failed - " + msg);
      }
    })
  );
  context.subscriptions.push(
    vscode7.commands.registerCommand("lzeroMemory.createMemoryFromSelection", async () => {
      const editor = vscode7.window.activeTextEditor;
      if (!editor) {
        await vscode7.window.showInformationMessage("No active editor");
        return;
      }
      const text = editor.document.getText(editor.selection);
      if (!text) {
        await vscode7.window.showInformationMessage("No text selected");
        return;
      }
      provider.postMessage({ type: "lanonasis:inject-chat", payload: { text } });
      await vscode7.commands.executeCommand("lzero.memorySidebar.focus");
    })
  );
  context.subscriptions.push(
    vscode7.commands.registerCommand("lzeroMemory.syncMemories", async () => {
      provider.postMessage({ type: "lanonasis:cache:sync" });
      await vscode7.window.showInformationMessage("LanOnasis: Syncing memories...");
    })
  );
  context.subscriptions.push(
    vscode7.commands.registerCommand("lzeroMemory.searchMemories", async () => {
      const query = await vscode7.window.showInputBox({
        prompt: "Search your memories",
        placeHolder: "e.g., OAuth implementation, regex pattern..."
      });
      if (query) {
        const results = cache.semanticSearchLocal(query);
        if (results.length === 0) {
          await vscode7.window.showInformationMessage(`No memories found for "${query}"`);
          return;
        }
        const items = results.map((m) => ({
          label: m.title,
          description: m.memory_type,
          detail: m.content.slice(0, 100) + (m.content.length > 100 ? "..." : ""),
          memory: m
        }));
        const selected = await vscode7.window.showQuickPick(items, {
          placeHolder: `Found ${results.length} memories`,
          matchOnDescription: true,
          matchOnDetail: true
        });
        if (selected) {
          await vscode7.env.clipboard.writeText(selected.memory.content);
          await vscode7.window.showInformationMessage(`Copied "${selected.label}" to clipboard`);
        }
      }
    })
  );
  context.subscriptions.push(
    vscode7.commands.registerCommand("lzeroMemory.openMemory", (memory) => {
      openMemoryInEditor(memory);
    })
  );
  context.subscriptions.push(
    vscode7.commands.registerCommand("lzeroMemory.manageApiKeys", async () => {
      await manageApiKeys(apiKeyService);
    }),
    vscode7.commands.registerCommand("lzeroMemory.createProject", async () => {
      await createProject(apiKeyService, apiKeyTreeProvider);
    }),
    vscode7.commands.registerCommand("lzeroMemory.viewProjects", async () => {
      await viewProjects(apiKeyService);
    }),
    vscode7.commands.registerCommand("lzeroMemory.refreshApiKeys", async () => {
      apiKeyTreeProvider.refresh(true);
    }),
    vscode7.commands.registerCommand("lzeroMemory.viewProjectDetails", async (item) => {
      if (item && item.project) {
        await showProjectDetails(item.project, apiKeyService);
      }
    }),
    vscode7.commands.registerCommand("lzeroMemory.viewApiKeyDetails", async (item) => {
      if (item && item.apiKey) {
        await showApiKeyDetails(item.apiKey);
      }
    }),
    vscode7.commands.registerCommand("lzeroMemory.createApiKey", async (item) => {
      if (item && item.project) {
        await createApiKeyForProject(item.project, apiKeyService, apiKeyTreeProvider);
      } else {
        await createApiKey(apiKeyService, apiKeyTreeProvider);
      }
    }),
    vscode7.commands.registerCommand("lzeroMemory.rotateApiKey", async (item) => {
      if (item && item.apiKey) {
        await rotateApiKey(item.apiKey, apiKeyService, apiKeyTreeProvider);
      }
    }),
    vscode7.commands.registerCommand("lzeroMemory.deleteApiKey", async (item) => {
      if (item && item.apiKey) {
        await deleteApiKey(item.apiKey, apiKeyService, apiKeyTreeProvider);
      }
    }),
    vscode7.commands.registerCommand("lzeroMemory.deleteProject", async (item) => {
      if (item && item.project) {
        await deleteProject(item.project, apiKeyService, apiKeyTreeProvider);
      }
    })
  );
  context.subscriptions.push(
    vscode7.commands.registerCommand("lzeroMemory.checkApiKeyStatus", async () => {
      try {
        const hasApiKey = await secureApiKeyService.hasApiKey();
        const status = hasApiKey ? "\u2705 Configured and stored securely" : "\u274C Not configured";
        if (hasApiKey) {
          vscode7.window.showInformationMessage(
            `API Key Status: ${status}`,
            "Test Connection",
            "View Security Info"
          ).then(async (selection) => {
            if (selection === "Test Connection") {
              vscode7.commands.executeCommand("lzeroMemory.testConnection");
            } else if (selection === "View Security Info") {
              vscode7.env.openExternal(vscode7.Uri.parse("https://docs.lanonasis.com/security/api-keys"));
            }
          });
        } else {
          vscode7.window.showInformationMessage(
            `API Key Status: ${status}`,
            "Connect in Browser",
            "Enter API Key"
          ).then((selection) => {
            if (selection === "Connect in Browser") {
              vscode7.commands.executeCommand("lzeroMemory.authenticate", "oauth");
            } else if (selection === "Enter API Key") {
              vscode7.commands.executeCommand("lzeroMemory.authenticate", "apikey");
            }
          });
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        vscode7.window.showErrorMessage(`Failed to check API key status: ${message}`);
      }
    }),
    vscode7.commands.registerCommand("lzeroMemory.clearApiKey", async () => {
      try {
        const hasApiKey = await secureApiKeyService.hasApiKey();
        if (!hasApiKey) {
          vscode7.window.showInformationMessage("No API key is currently configured.");
          return;
        }
        const confirmed = await vscode7.window.showWarningMessage(
          "Are you sure you want to clear your API key? This will require re-authentication.",
          { modal: true },
          "Clear API Key"
        );
        if (confirmed === "Clear API Key") {
          await secureApiKeyService.deleteApiKey();
          await applyAuthenticationState(false);
          vscode7.window.showInformationMessage("API key cleared successfully.");
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        vscode7.window.showErrorMessage(`Failed to clear API key: ${message}`);
      }
    }),
    vscode7.commands.registerCommand("lzeroMemory.testConnection", async () => {
      try {
        const hasApiKey = await secureApiKeyService.hasApiKey();
        if (!hasApiKey) {
          vscode7.window.showWarningMessage("\u274C No API key configured.");
          return;
        }
        await memoryService.testConnection();
        vscode7.window.showInformationMessage("\u2705 Connection test successful!");
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        vscode7.window.showErrorMessage(`Connection test failed: ${message}`);
      }
    }),
    vscode7.commands.registerCommand("lzeroMemory.runDiagnostics", async () => {
      try {
        output.show();
        output.appendLine("Running comprehensive diagnostics...\n");
        const health = await runDiagnostics(
          context,
          secureApiKeyService,
          memoryService,
          output
        );
        const report = formatDiagnosticResults(health);
        const doc = await vscode7.workspace.openTextDocument({
          content: report,
          language: "markdown"
        });
        await vscode7.window.showTextDocument(doc);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        vscode7.window.showErrorMessage(`Diagnostics failed: ${message}`);
        output.appendLine(`[Diagnostics] Fatal error: ${message}`);
      }
    }),
    vscode7.commands.registerCommand("lzeroMemory.showLogs", () => {
      output.show();
    })
  );
  context.subscriptions.push({ dispose: () => cache.stopConnectivityCheck() });
  try {
    const hasStoredKey = await secureApiKeyService.hasApiKey();
    await applyAuthenticationState(hasStoredKey);
  } catch (error) {
    output.appendLine(`[LanOnasis] Failed to check auth state: ${error instanceof Error ? error.message : String(error)}`);
  }
  output.appendLine("[LanOnasis] Extension activated");
}
function deactivate() {
  memoryCacheInstance?.stopConnectivityCheck();
  memoryCacheInstance = null;
}
async function manageApiKeys(apiKeyService) {
  const quickPickItems = [
    {
      label: "$(key) View API Keys",
      description: "View all API keys across projects",
      command: "view"
    },
    {
      label: "$(add) Create API Key",
      description: "Create a new API key",
      command: "create"
    },
    {
      label: "$(folder) Manage Projects",
      description: "Create and manage API key projects",
      command: "projects"
    },
    {
      label: "$(refresh) Refresh",
      description: "Refresh API key data",
      command: "refresh"
    }
  ];
  const selected = await vscode7.window.showQuickPick(quickPickItems, {
    placeHolder: "Choose an API key management action"
  });
  if (!selected) return;
  switch (selected.command) {
    case "view":
      await viewApiKeys(apiKeyService);
      break;
    case "create":
      await createApiKey(apiKeyService);
      break;
    case "projects":
      await viewProjects(apiKeyService);
      break;
    case "refresh":
      vscode7.commands.executeCommand("lzeroMemory.refreshApiKeys");
      break;
  }
}
async function viewApiKeys(apiKeyService) {
  try {
    vscode7.window.withProgress({
      location: vscode7.ProgressLocation.Notification,
      title: "Loading API keys...",
      cancellable: false
    }, async () => {
      const apiKeys = await apiKeyService.getApiKeys();
      if (apiKeys.length === 0) {
        vscode7.window.showInformationMessage("No API keys found. Create your first API key to get started.");
        return;
      }
      const items = apiKeys.map((key) => ({
        label: key.name,
        description: `${key.environment} \u2022 ${key.keyType} \u2022 ${key.accessLevel}`,
        detail: `Project: ${key.projectId} | Created: ${new Date(key.createdAt).toLocaleDateString()}`,
        apiKey: key
      }));
      const selected = await vscode7.window.showQuickPick(items, {
        placeHolder: `Select an API key (${apiKeys.length} found)`
      });
      if (selected) {
        await showApiKeyDetails(selected.apiKey);
      }
    });
  } catch (error) {
    vscode7.window.showErrorMessage(`Failed to load API keys: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
async function createApiKey(apiKeyService, _apiKeyTreeProvider) {
  try {
    const projects = await apiKeyService.getProjects();
    if (projects.length === 0) {
      const createProjectResponse = await vscode7.window.showInformationMessage(
        "No projects found. You need to create a project first.",
        "Create Project",
        "Cancel"
      );
      if (createProjectResponse === "Create Project") {
        await createProject(apiKeyService, void 0);
      }
      return;
    }
    const projectItems = projects.map((p) => ({
      label: p.name,
      description: p.description || "No description",
      project: p
    }));
    const selectedProject = await vscode7.window.showQuickPick(projectItems, {
      placeHolder: "Select a project for the API key"
    });
    if (!selectedProject) return;
    const name = await vscode7.window.showInputBox({
      prompt: "API Key Name",
      placeHolder: "Enter a name for your API key"
    });
    if (!name) return;
    const value = await vscode7.window.showInputBox({
      prompt: "API Key Value",
      placeHolder: "Enter the API key value",
      password: true
    });
    if (!value) return;
    const keyTypes = [
      { label: "API Key", value: "api_key" },
      { label: "Database URL", value: "database_url" },
      { label: "OAuth Token", value: "oauth_token" },
      { label: "Certificate", value: "certificate" },
      { label: "SSH Key", value: "ssh_key" },
      { label: "Webhook Secret", value: "webhook_secret" },
      { label: "Encryption Key", value: "encryption_key" }
    ];
    const selectedKeyType = await vscode7.window.showQuickPick(keyTypes, {
      placeHolder: "Select key type"
    });
    if (!selectedKeyType) return;
    const config = vscode7.workspace.getConfiguration("lzero");
    const defaultEnv = config.get("defaultEnvironment", "development");
    const environments = [
      { label: "Development", value: "development", picked: defaultEnv === "development" },
      { label: "Staging", value: "staging", picked: defaultEnv === "staging" },
      { label: "Production", value: "production", picked: defaultEnv === "production" }
    ];
    const selectedEnvironment = await vscode7.window.showQuickPick(environments, {
      placeHolder: "Select environment"
    });
    if (!selectedEnvironment) return;
    await vscode7.window.withProgress({
      location: vscode7.ProgressLocation.Notification,
      title: "Creating API key...",
      cancellable: false
    }, async () => {
      await apiKeyService.createApiKey({
        name,
        value,
        keyType: selectedKeyType.value,
        environment: selectedEnvironment.value,
        accessLevel: "team",
        projectId: selectedProject.project.id
      });
    });
    vscode7.window.showInformationMessage(`API key "${name}" created successfully`);
    vscode7.commands.executeCommand("lzeroMemory.refreshApiKeys");
  } catch (error) {
    vscode7.window.showErrorMessage(`Failed to create API key: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
async function createProject(apiKeyService, apiKeyTreeProvider) {
  try {
    const name = await vscode7.window.showInputBox({
      prompt: "Project Name",
      placeHolder: "Enter a name for your project"
    });
    if (!name) return;
    const description = await vscode7.window.showInputBox({
      prompt: "Project Description (optional)",
      placeHolder: "Enter a description for your project"
    });
    const config = vscode7.workspace.getConfiguration("lzero");
    let organizationId = config.get("organizationId");
    if (!organizationId) {
      const orgId = await vscode7.window.showInputBox({
        prompt: "Organization ID",
        placeHolder: "Enter your organization ID"
      });
      if (!orgId) return;
      await config.update("organizationId", orgId, vscode7.ConfigurationTarget.Global);
      organizationId = orgId;
    }
    await vscode7.window.withProgress({
      location: vscode7.ProgressLocation.Notification,
      title: "Creating project...",
      cancellable: false
    }, async () => {
      const project = await apiKeyService.createProject({
        name,
        description,
        organizationId
      });
      if (apiKeyTreeProvider) {
        await apiKeyTreeProvider.addProject(project);
      }
    });
    vscode7.window.showInformationMessage(`Project "${name}" created successfully`);
    vscode7.commands.executeCommand("lzeroMemory.refreshApiKeys");
  } catch (error) {
    vscode7.window.showErrorMessage(`Failed to create project: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
async function viewProjects(apiKeyService) {
  try {
    vscode7.window.withProgress({
      location: vscode7.ProgressLocation.Notification,
      title: "Loading projects...",
      cancellable: false
    }, async () => {
      const projects = await apiKeyService.getProjects();
      if (projects.length === 0) {
        const createProjectResponse = await vscode7.window.showInformationMessage(
          "No projects found. Create your first project to get started.",
          "Create Project",
          "Cancel"
        );
        if (createProjectResponse === "Create Project") {
          await createProject(apiKeyService, void 0);
        }
        return;
      }
      const items = projects.map((project) => ({
        label: project.name,
        description: project.description || "No description",
        detail: `Organization: ${project.organizationId} | Created: ${new Date(project.createdAt).toLocaleDateString()}`,
        project
      }));
      const selected = await vscode7.window.showQuickPick(items, {
        placeHolder: `Select a project (${projects.length} found)`
      });
      if (selected) {
        await showProjectDetails(selected.project, apiKeyService);
      }
    });
  } catch (error) {
    vscode7.window.showErrorMessage(`Failed to load projects: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
async function showApiKeyDetails(apiKey) {
  const content = `# API Key: ${apiKey.name}

**Type:** ${apiKey.keyType}
**Environment:** ${apiKey.environment}
**Access Level:** ${apiKey.accessLevel}
**Project ID:** ${apiKey.projectId}
**Created:** ${new Date(apiKey.createdAt).toLocaleString()}
${apiKey.expiresAt ? `**Expires:** ${new Date(apiKey.expiresAt).toLocaleString()}` : "**Expires:** Never"}

## Tags
${apiKey.tags.length > 0 ? apiKey.tags.map((tag) => `- ${tag}`).join("\n") : "No tags"}

## Metadata

\`\`\`json
${JSON.stringify(apiKey.metadata, null, 2)}
\`\`\`
`;
  vscode7.workspace.openTextDocument({
    content,
    language: "markdown"
  }).then((doc) => {
    vscode7.window.showTextDocument(doc);
  });
}
async function showProjectDetails(project, apiKeyService) {
  try {
    const apiKeys = await apiKeyService.getApiKeys(project.id);
    const content = `# Project: ${project.name}

**Description:** ${project.description || "No description"}
**Organization ID:** ${project.organizationId}
**Created:** ${new Date(project.createdAt).toLocaleString()}
**Team Members:** ${project.teamMembers.length}

## API Keys (${apiKeys.length})
${apiKeys.length > 0 ? apiKeys.map((key) => `- **${key.name}** (${key.keyType}, ${key.environment})`).join("\n") : "No API keys found in this project"}

## Settings

\`\`\`json
${JSON.stringify(project.settings, null, 2)}
\`\`\`
`;
    vscode7.workspace.openTextDocument({
      content,
      language: "markdown"
    }).then((doc) => {
      vscode7.window.showTextDocument(doc);
    });
  } catch (error) {
    vscode7.window.showErrorMessage(`Failed to load project details: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
async function createApiKeyForProject(project, apiKeyService, apiKeyTreeProvider) {
  try {
    const name = await vscode7.window.showInputBox({
      prompt: "API Key Name",
      placeHolder: "Enter a name for your API key"
    });
    if (!name) return;
    const value = await vscode7.window.showInputBox({
      prompt: "API Key Value",
      placeHolder: "Enter the API key value",
      password: true
    });
    if (!value) return;
    const keyTypes = [
      { label: "API Key", value: "api_key" },
      { label: "Database URL", value: "database_url" },
      { label: "OAuth Token", value: "oauth_token" },
      { label: "Certificate", value: "certificate" },
      { label: "SSH Key", value: "ssh_key" },
      { label: "Webhook Secret", value: "webhook_secret" },
      { label: "Encryption Key", value: "encryption_key" }
    ];
    const selectedKeyType = await vscode7.window.showQuickPick(keyTypes, {
      placeHolder: "Select key type"
    });
    if (!selectedKeyType) return;
    const environments = [
      { label: "Development", description: "For development use" },
      { label: "Staging", description: "For staging/testing" },
      { label: "Production", description: "For production use" }
    ];
    const selectedEnv = await vscode7.window.showQuickPick(environments, {
      placeHolder: "Select environment"
    });
    if (!selectedEnv) return;
    const accessLevels = [
      { label: "Public", description: "Publicly accessible" },
      { label: "Authenticated", description: "Requires authentication" },
      { label: "Team", description: "Team members only" },
      { label: "Admin", description: "Administrators only" },
      { label: "Enterprise", description: "Enterprise level access" }
    ];
    const selectedAccess = await vscode7.window.showQuickPick(accessLevels, {
      placeHolder: "Select access level"
    });
    if (!selectedAccess) return;
    const request = {
      name,
      value,
      keyType: selectedKeyType.value,
      environment: selectedEnv.label.toLowerCase(),
      accessLevel: selectedAccess.label.toLowerCase(),
      projectId: project.id
    };
    await vscode7.window.withProgress({
      location: vscode7.ProgressLocation.Notification,
      title: "Creating API key...",
      cancellable: false
    }, async () => {
      const apiKey = await apiKeyService.createApiKey(request);
      vscode7.window.showInformationMessage(`API key "${apiKey.name}" created successfully!`);
      if (apiKeyTreeProvider) {
        await apiKeyTreeProvider.addApiKey(project.id, apiKey);
      }
    });
  } catch (error) {
    vscode7.window.showErrorMessage(`Failed to create API key: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
async function rotateApiKey(apiKey, apiKeyService, apiKeyTreeProvider) {
  try {
    const confirmed = await vscode7.window.showWarningMessage(
      `Are you sure you want to rotate API key "${apiKey.name}"? The old key will be invalidated.`,
      { modal: true },
      "Rotate Key"
    );
    if (confirmed !== "Rotate Key") return;
    await vscode7.window.withProgress({
      location: vscode7.ProgressLocation.Notification,
      title: "Rotating API key...",
      cancellable: false
    }, async () => {
      const rotated = await apiKeyService.rotateApiKey(apiKey.id);
      vscode7.window.showInformationMessage(`API key "${rotated.name}" rotated successfully!`);
      if (apiKeyTreeProvider) {
        await apiKeyTreeProvider.updateApiKey(apiKey.projectId, rotated);
      }
    });
  } catch (error) {
    vscode7.window.showErrorMessage(`Failed to rotate API key: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
async function deleteApiKey(apiKey, apiKeyService, apiKeyTreeProvider) {
  try {
    const confirmed = await vscode7.window.showWarningMessage(
      `Are you sure you want to delete API key "${apiKey.name}"? This action cannot be undone.`,
      { modal: true },
      "Delete"
    );
    if (confirmed !== "Delete") return;
    await vscode7.window.withProgress({
      location: vscode7.ProgressLocation.Notification,
      title: "Deleting API key...",
      cancellable: false
    }, async () => {
      await apiKeyService.deleteApiKey(apiKey.id);
      vscode7.window.showInformationMessage(`API key "${apiKey.name}" deleted successfully.`);
      if (apiKeyTreeProvider) {
        await apiKeyTreeProvider.removeApiKey(apiKey.projectId, apiKey.id);
      }
    });
  } catch (error) {
    vscode7.window.showErrorMessage(`Failed to delete API key: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
async function deleteProject(project, apiKeyService, apiKeyTreeProvider) {
  try {
    const confirmed = await vscode7.window.showWarningMessage(
      `Are you sure you want to delete project "${project.name}"? All API keys in this project will also be deleted. This action cannot be undone.`,
      { modal: true },
      "Delete"
    );
    if (confirmed !== "Delete") return;
    await vscode7.window.withProgress({
      location: vscode7.ProgressLocation.Notification,
      title: "Deleting project...",
      cancellable: false
    }, async () => {
      await apiKeyService.deleteProject(project.id);
      vscode7.window.showInformationMessage(`Project "${project.name}" deleted successfully.`);
      if (apiKeyTreeProvider) {
        await apiKeyTreeProvider.removeProject(project.id);
      }
    });
  } catch (error) {
    vscode7.window.showErrorMessage(`Failed to delete project: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
function openMemoryInEditor(memory) {
  const content = `# ${memory.title}

**Type:** ${memory.memory_type}
**Created:** ${new Date(memory.created_at).toLocaleString()}

---

${memory.content}`;
  vscode7.workspace.openTextDocument({
    content,
    language: "markdown"
  }).then((doc) => {
    vscode7.window.showTextDocument(doc);
  });
}
//# sourceMappingURL=extension.web.js.map
