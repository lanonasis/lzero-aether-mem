/**
 * L0 Memory Chat Participant
 * Enables @memory mentions in VS Code Chat
 * 
 * Users can:
 * - @memory find my OAuth notes
 * - @memory what was that regex pattern?
 * - @memory save this as a code snippet
 */

import * as vscode from 'vscode';
import { MemoryCache, CachedMemory } from './memoryCache';

const PARTICIPANT_ID = 'lanonasis.memory';

interface MemoryParticipantResult {
  memories: CachedMemory[];
  action: 'search' | 'create' | 'list' | 'help';
  query?: string;
}

export class MemoryChatParticipant {
  private participant: vscode.ChatParticipant | undefined;

  constructor(
    private readonly context: vscode.ExtensionContext,
    private readonly output: vscode.OutputChannel,
    private readonly cache: MemoryCache,
    private readonly apiUrl: string,
    private readonly getApiKey: () => Promise<string | undefined>,
  ) { }

  public register(): void {
    // Check if Chat API is available (VS Code 1.85+)
    if (!vscode.chat?.createChatParticipant) {
      this.output.appendLine('[ChatParticipant] Chat API not available in this VS Code version');
      return;
    }

    try {
      this.participant = vscode.chat.createChatParticipant(PARTICIPANT_ID, this.handleRequest.bind(this));
      this.participant.iconPath = vscode.Uri.joinPath(this.context.extensionUri, 'media', 'icon.png');

      // Add follow-up provider
      this.participant.followupProvider = {
        provideFollowups: this.provideFollowups.bind(this),
      };

      this.context.subscriptions.push(this.participant);
      this.output.appendLine('[ChatParticipant] Registered @memory chat participant');
    } catch (err) {
      this.output.appendLine(`[ChatParticipant] Registration failed: ${err}`);
    }
  }

  private async handleRequest(
    request: vscode.ChatRequest,
    context: vscode.ChatContext,
    stream: vscode.ChatResponseStream,
    token: vscode.CancellationToken,
  ): Promise<vscode.ChatResult> {
    const query = request.prompt.trim();
    const command = request.command; // Slash command like /save, /find, /list

    this.output.appendLine(`[ChatParticipant] Request: "${query}", command: "${command || 'none'}"`);

    // Handle slash commands first
    if (command) {
      switch (command) {
        case 'save':
          return this.handleCreate(query || 'Untitled memory', stream);
        case 'find':
          const searchResult = await this.parseIntent(query || '');
          return this.handleSearch({ ...searchResult, query }, stream, token);
        case 'list':
          return this.handleList(stream);
        default:
          // Unknown command, fall through to intent parsing
          break;
      }
    }

    // Parse intent from natural language
    const result = await this.parseIntent(query);

    switch (result.action) {
      case 'search':
        return this.handleSearch(result, stream, token);
      case 'create':
        return this.handleCreate(query, stream);
      case 'list':
        return this.handleList(stream);
      case 'help':
      default:
        return this.handleHelp(stream);
    }
  }

  private async parseIntent(query: string): Promise<MemoryParticipantResult> {
    const q = query.toLowerCase().trim();

    // Help intent
    if (q === 'help' || q === '?' || q.includes('how do i') || q.includes('what can you')) {
      return { memories: [], action: 'help' };
    }

    // List intent
    if (q === 'list' || q === 'show all' || q === 'all memories' || /^(list|show)\s*(all|my)?\s*memories?$/i.test(q)) {
      return { memories: this.cache.getMemories().slice(0, 10), action: 'list' };
    }

    // Create intent - use original query for matching to preserve content
    const createPatterns = [
      /^save\s+(.+)/i,
      /^create\s+(?:a\s+)?(?:memory|note)\s*:?\s*(.+)/i,
      /^remember\s+(.+)/i,
      /^store\s+(.+)/i,
      /^\/save\s+(.+)/i,  // Handle /save command format
    ];
    for (const pattern of createPatterns) {
      const match = query.match(pattern);
      if (match && match[1]) {
        this.output.appendLine(`[ChatParticipant] Detected create intent: "${match[1]}"`);
        return { memories: [], action: 'create', query };
      }
    }

    // Default: search intent
    const memories = this.cache.semanticSearchLocal(query);

    // If no local results, try API
    if (memories.length === 0) {
      const apiMemories = await this.searchApi(query);
      return { memories: apiMemories, action: 'search', query };
    }

    return { memories, action: 'search', query };
  }

  private async searchApi(query: string): Promise<CachedMemory[]> {
    try {
      const apiKey = await this.getApiKey();
      if (!apiKey) return [];

      const response = await fetch(`${this.apiUrl}/memory/search?q=${encodeURIComponent(query)}&limit=5`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) return [];

      const data = await response.json();
      // API returns { data: [...] } or { success: true, data: [...] }
      return (data.data || data.memories || data || []) as CachedMemory[];
    } catch (err) {
      this.output.appendLine(`[ChatParticipant] API search error: ${err}`);
      return [];
    }
  }

  private async handleSearch(
    result: MemoryParticipantResult,
    stream: vscode.ChatResponseStream,
    token: vscode.CancellationToken,
  ): Promise<vscode.ChatResult> {
    if (token.isCancellationRequested) {
      return { metadata: { action: 'cancelled' } };
    }

    if (result.memories.length === 0) {
      stream.markdown(`No memories found for "${result.query}".\n\n`);
      stream.markdown('💡 *Try creating a new memory with:* `@memory save [your content]`');
      return { metadata: { action: 'search', found: 0 } };
    }

    stream.markdown(`## 🧠 Found ${result.memories.length} relevant memories\n\n`);

    for (const memory of result.memories) {
      const isPending = memory._pending ? ' *(pending sync)*' : '';
      stream.markdown(`### ${memory.title}${isPending}\n`);
      stream.markdown(`${memory.content.slice(0, 200)}${memory.content.length > 200 ? '...' : ''}\n\n`);

      if (memory.tags.length > 0) {
        stream.markdown(`🏷️ ${memory.tags.map(t => `\`${t}\``).join(' ')}\n\n`);
      }

      stream.markdown(`---\n\n`);
    }

    return { metadata: { action: 'search', found: result.memories.length } };
  }

  private async handleCreate(
    query: string,
    stream: vscode.ChatResponseStream,
  ): Promise<vscode.ChatResult> {
    // Extract content from query
    const content = query
      .replace(/^(save|create|remember|store)\s*(a\s+)?(memory|note)?\s*:?\s*/i, '')
      .trim();

    if (!content) {
      stream.markdown('Please provide content to save. Example:\n\n');
      stream.markdown('`@memory save OAuth uses PKCE flow for mobile apps`');
      return { metadata: { action: 'create', success: false } };
    }

    // Create locally
    const title = content.slice(0, 50) + (content.length > 50 ? '...' : '');
    const memory = await this.cache.addLocal({
      title,
      content,
      memory_type: 'knowledge',
      tags: [],
    });

    stream.markdown(`## ✅ Memory saved\n\n`);
    stream.markdown(`**${memory.title}**\n\n`);
    stream.markdown(`${memory.content}\n\n`);
    stream.markdown(`*Memory will sync when online.*`);

    // Try to sync immediately
    void this.syncToApi(memory);

    return { metadata: { action: 'create', success: true, id: memory.id } };
  }

  private async syncToApi(memory: CachedMemory): Promise<void> {
    try {
      const apiKey = await this.getApiKey();
      if (!apiKey) return;

      const response = await fetch(`${this.apiUrl}/memory`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: memory.title,
          content: memory.content,
          memory_type: memory.memory_type,
          tags: memory.tags,
        }),
      });

      if (response.ok) {
        const serverMemory = await response.json();
        await this.cache.markSynced(memory.id, serverMemory);
        this.output.appendLine(`[ChatParticipant] Memory synced: ${memory.title}`);
      }
    } catch (err) {
      this.output.appendLine(`[ChatParticipant] Sync error: ${err}`);
    }
  }

  private handleList(stream: vscode.ChatResponseStream): vscode.ChatResult {
    const memories = this.cache.getMemories().slice(0, 10);
    const status = this.cache.getStatus();

    stream.markdown(`## 🧠 Your Memories\n\n`);

    if (status.pendingCount > 0) {
      stream.markdown(`⏳ *${status.pendingCount} memories pending sync*\n\n`);
    }

    if (memories.length === 0) {
      stream.markdown('No memories yet. Create one with:\n\n');
      stream.markdown('`@memory save [your content]`');
      return { metadata: { action: 'list', count: 0 } };
    }

    for (const memory of memories) {
      const isPending = memory._pending ? ' 🔄' : '';
      stream.markdown(`- **${memory.title}**${isPending}\n`);
    }

    stream.markdown(`\n*Showing ${memories.length} most recent memories*`);

    return { metadata: { action: 'list', count: memories.length } };
  }

  private handleHelp(stream: vscode.ChatResponseStream): vscode.ChatResult {
    stream.markdown(`## 🧠 L0 Memory Assistant\n\n`);
    stream.markdown(`I help you store and recall your development context.\n\n`);
    stream.markdown(`### Commands\n\n`);
    stream.markdown(`| Command | Description |\n`);
    stream.markdown(`|---------|-------------|\n`);
    stream.markdown(`| \`@memory find [query]\` | Search your memories |\n`);
    stream.markdown(`| \`@memory save [content]\` | Save a new memory |\n`);
    stream.markdown(`| \`@memory list\` | Show recent memories |\n`);
    stream.markdown(`| \`@memory help\` | Show this help |\n\n`);
    stream.markdown(`### Examples\n\n`);
    stream.markdown(`- \`@memory find OAuth implementation\`\n`);
    stream.markdown(`- \`@memory what was that regex pattern?\`\n`);
    stream.markdown(`- \`@memory save Use PKCE flow for mobile OAuth\`\n`);

    return { metadata: { action: 'help' } };
  }

  private provideFollowups(
    result: vscode.ChatResult,
    context: vscode.ChatContext,
    token: vscode.CancellationToken,
  ): vscode.ChatFollowup[] {
    const action = (result.metadata as any)?.action;

    switch (action) {
      case 'search':
        return [
          { prompt: 'list', label: '📋 Show all memories' },
          { prompt: 'save ', label: '💾 Save a new memory' },
        ];
      case 'create':
        return [
          { prompt: 'list', label: '📋 Show all memories' },
          { prompt: 'find ', label: '🔍 Search memories' },
        ];
      case 'list':
        return [
          { prompt: 'find ', label: '🔍 Search memories' },
          { prompt: 'save ', label: '💾 Save a new memory' },
        ];
      default:
        return [
          { prompt: 'find ', label: '🔍 Search memories' },
          { prompt: 'list', label: '📋 Show all memories' },
        ];
    }
  }
}
