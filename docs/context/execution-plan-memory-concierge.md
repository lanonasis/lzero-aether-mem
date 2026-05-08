# Execution Plan: Memory Concierge — AI Chat Assistant with Memory Context

_Version: 1.0 — 2026-05-08_
_Status: Ready for handoff — Phase 1 foundation (backend + frontend)_

---

## What This Is

The Memory Concierge is the primary missing intelligence layer in the platform. It is not semantic search. It is not CRUD. It is a conversational AI assistant that has your entire memory bank as its working context and responds to natural language questions, comparisons, and reasoning requests as if it already knows your history.

**The defining user experience:**

> "What was our execution architecture for lzero compared to this new memory entry — help spot the drift so we can realign?"

The assistant retrieves relevant memories, compares them against the new input, reasons over the delta, and responds in plain language with actionable insight — in one turn, without the user manually searching, filtering, or assembling context.

This is the "second brain" feature. Every other intelligence feature (tags, related memories, health scores) is infrastructure that feeds this.

---

## Current State — What Exists and What Is Missing

### What exists

| Component | Location | State |
|-----------|----------|-------|
| VS Code `@memory` chat participant | `packages/vscode-extension/src/chatParticipant.ts` | Shell only — retrieves via basic search, no AI synthesis |
| Mobile PWA multi-tier chat | `packages/mobile-pwa/src/components/ChatInterface.tsx` | Xenova on-device AI + cloud search — no memory-context LLM call |
| Web Extension chat input | `packages/web-extension/src/sidepanel/SidePanel.tsx` | Search results display only — no conversational AI response |
| Context bundle endpoint | Backend Phase 3 — `POST /api/v1/context` | Not yet live (pending backend Phase 3) |
| Profile synthesis primitive | Backend Phase 2 — `POST /api/v1/profiles/:subject_id/ask` | Not yet live (pending backend Phase 2) |

### What is missing — the gap

Neither the frontend nor the backend currently has:

1. **A dedicated AI inference endpoint** — an endpoint that takes (memory context bundle + user message + conversation history) and returns a streaming LLM-generated response. The `/api/v1/profiles/ask` primitive (backend Phase 2) returns pre-synthesized profile data, NOT a live LLM conversation response.

2. **Drift detection mode** — a comparison capability that takes a new memory entry or user statement and reasons it against existing patterns, conclusions, and past entries to surface where alignment has shifted.

3. **Conversation persistence** — chat turns are not stored as memories, so context accumulates only within a single session.

4. **Frontend hooks** — `useMemoryConcierge()` hook for managing conversation state, streaming, and citations does not exist.

---

## Architecture

The Concierge sits on top of the context bundle infrastructure as an AI inference layer. Three backend components; one frontend hook.

```
User query
    │
    ▼
POST /api/v1/concierge/chat
    │
    ├─── 1. Compile context bundle (calls /api/v1/context internally)
    │         subject_id, query, token_budget, include: [profile_summary, conclusions, semantic_recall]
    │
    ├─── 2. Build LLM prompt
    │         System: "You are [user's] memory assistant. Context: [compiled bundle]"
    │         User: [user message]
    │         History: [prior turns]
    │
    ├─── 3. Call LLM (Claude claude-sonnet-4-6, streaming)
    │
    └─── 4. Stream response tokens + citations
              citations: MemoryEntry[] — which memories were used
              tokens_used: number
              drift_signals?: string[] — only when drift mode requested
```

### Drift Detection Mode

Triggered by the client passing `mode: 'drift'` with a `reference_entry` (memory ID or inline content). The LLM is additionally instructed to:

1. Compare the reference entry against existing patterns and conclusions
2. Identify specific points of divergence (what changed from previous understanding)
3. Identify alignment points (what is consistent)
4. Suggest a realignment action for each drift signal

This is pure LLM reasoning over the context bundle — no new database tables required.

---

## Backend Deliverables

> **Dependency**: Requires backend Phase 2 (`memory_profiles`) and Phase 3 (`/api/v1/context`) to be live before this endpoint ships. The Concierge calls both internally.

### New endpoint: `POST /api/v1/concierge/chat`

**Location**: `apps/lanonasis-maas/src/routes/concierge.ts` (new file, following `routes/memory.ts` pattern)

**Request contract:**

```typescript
interface ConciergeRequest {
  message: string;
  conversation_history?: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  subject_id?: string;          // defaults to authenticated user_id
  mode?: 'default' | 'drift';  // default: 'default'
  reference_entry?: {           // required when mode = 'drift'
    memory_id?: string;         // reference an existing memory by ID
    content?: string;           // or provide inline content to compare against
  };
  context_opts?: {
    include?: Array<'profile_summary' | 'recent_memories' | 'conclusions' | 'semantic_recall'>;
    token_budget?: number;      // default: 3500 (leaves room for LLM response in 4096 budget)
  };
  stream?: boolean;             // default: true
}
```

**Response (non-stream):**

```typescript
interface ConciergeResponse {
  response: string;
  citations: Array<{
    memory_id: string;
    title: string;
    relevance_score: number;
  }>;
  drift_signals?: Array<{      // only when mode = 'drift'
    signal: string;            // e.g. "Architecture shifted from monolith to microservices"
    evidence_memory_ids: string[];
    suggested_action: string;
  }>;
  metadata: {
    context_tokens_used: number;
    response_tokens: number;
    model: string;
    latency_ms: number;
  };
}
```

**Response (stream):** Server-Sent Events. Each event is a JSON chunk:
```
data: { type: "token", content: "..." }
data: { type: "citations", citations: [...] }
data: { type: "drift_signals", signals: [...] }   // only in drift mode
data: { type: "done", metadata: {...} }
```

**LLM prompt construction — system prompt template:**

```
You are [user's name or "the user's"] personal memory assistant. You have been given a curated context bundle from their memory bank. Use ONLY information from this context to answer questions. When you use a specific memory, cite it by title.

If the user asks about drift, patterns, or comparisons: reason explicitly over the similarities and differences between what they describe and what you find in the context. Be concrete — name specific memories, note specific changes, suggest specific actions.

Context Bundle:
[compiled bundle from /api/v1/context]
```

**Authentication**: `requirePlan('free')` minimum — same middleware as memory routes.

**Rate limiting**: 20 requests per user per minute (Concierge calls are expensive — they compile context AND call an LLM).

**Service file**: `apps/lanonasis-maas/src/services/conciergeService.ts`

```typescript
export class ConciergeService {
  async chat(opts: ConciergeRequest, userId: string): Promise<ConciergeResponse | AsyncIterable<string>>
  private compileContextBundle(opts, userId): Promise<ContextBundle>
  private buildSystemPrompt(bundle: ContextBundle): string
  private buildDriftInstructions(referenceEntry: ReferenceEntry): string
  private callLLM(messages, stream: boolean): Promise<LLMResponse | AsyncIterable<string>>
  private extractCitations(response: string, bundle: ContextBundle): Citation[]
}
```

**Register in server**: `app.use('/api/v1/concierge', conciergeRouter)`

### SDK method

**File**: `apps/lanonasis-maas/packages/memory-client/src/core/client.ts`

```typescript
async chat(opts: ConciergeRequest): Promise<ApiResponse<ConciergeResponse>>
async chatStream(opts: ConciergeRequest): Promise<AsyncIterable<ConciergeStreamChunk>>
```

Export `ConciergeRequest`, `ConciergeResponse`, `ConciergeStreamChunk` from package index.

### MCP tool registration

**File**: `apps/mcp-core/src/index.ts`

```typescript
{
  name: 'memory_concierge_chat',
  description: 'Chat with the memory concierge assistant. Asks a natural language question and receives a personalized response drawn from the user\'s memory bank. Use for any question that benefits from memory context. Supports drift detection mode.',
  inputSchema: {
    type: 'object',
    properties: {
      message: { type: 'string', description: 'Natural language question or request' },
      mode: { type: 'string', enum: ['default', 'drift'], description: 'default: answer from memory; drift: compare reference entry against existing patterns' },
      reference_entry: {
        type: 'object',
        description: 'Required for drift mode. The new entry or statement to compare against existing memory.',
        properties: {
          memory_id: { type: 'string' },
          content: { type: 'string' }
        }
      },
      context_opts: {
        type: 'object',
        properties: {
          token_budget: { type: 'number', description: 'Max tokens for context (default: 3500)' }
        }
      }
    },
    required: ['message']
  }
}
```

---

## Frontend Deliverables

> **Dependency**: The `useMemoryConcierge()` hook requires backend Concierge endpoint to be live. Build the hook and flag it behind `features.concierge` (default `false`) so it can be merged before the endpoint ships.

### Add feature flag

**File**: `packages/shared/src/sdk/index.ts`

Add to `LanonasisConfig.features`:
```typescript
/** AI chat concierge — natural language assistant with memory context */
concierge?: boolean;
```

Add to `DEFAULT_FEATURES`:
```typescript
concierge: false,  // gated on backend concierge endpoint
```

### `useMemoryConcierge()` hook

**File**: `packages/shared/src/sdk/react-hooks.tsx`

```typescript
export interface ConciergeMessage {
  role: 'user' | 'assistant';
  content: string;
  citations?: Citation[];
  driftSignals?: DriftSignal[];
  isStreaming?: boolean;
}

export function useMemoryConcierge() {
  const { isAuthenticated, config } = useLanonasis();
  const [messages, setMessages] = useState<ConciergeMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const send = useCallback(async (
    message: string,
    opts?: { mode?: 'default' | 'drift'; referenceEntry?: ReferenceEntry }
  ) => {
    if (!isAuthenticated || !config.features?.concierge) return;

    const userMessage: ConciergeMessage = { role: 'user', content: message };
    const assistantPlaceholder: ConciergeMessage = {
      role: 'assistant', content: '', isStreaming: true
    };

    setMessages(prev => [...prev, userMessage, assistantPlaceholder]);
    setIsLoading(true);
    setError(null);

    try {
      const { CoreMemoryClient } = await import('@lanonasis/memory-client');
      const client = new CoreMemoryClient({ apiKey: config.apiKey!, baseUrl: config.baseUrl });

      const stream = await client.chatStream({
        message,
        conversation_history: messages.map(m => ({ role: m.role, content: m.content })),
        mode: opts?.mode ?? 'default',
        reference_entry: opts?.referenceEntry,
        stream: true,
      });

      let fullContent = '';
      let citations: Citation[] = [];
      let driftSignals: DriftSignal[] = [];

      for await (const chunk of stream) {
        if (chunk.type === 'token') {
          fullContent += chunk.content;
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: 'assistant', content: fullContent, isStreaming: true
            };
            return updated;
          });
        } else if (chunk.type === 'citations') {
          citations = chunk.citations;
        } else if (chunk.type === 'drift_signals') {
          driftSignals = chunk.signals;
        } else if (chunk.type === 'done') {
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: 'assistant',
              content: fullContent,
              citations,
              driftSignals,
              isStreaming: false,
            };
            return updated;
          });
        }
      }
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Concierge request failed'));
      setMessages(prev => prev.slice(0, -1)); // remove streaming placeholder
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, config, messages]);

  const clear = useCallback(() => setMessages([]), []);

  return { messages, send, clear, isLoading, error };
}
```

### Frontend surface: VS Code

**File**: `packages/vscode-extension/src/chatParticipant.ts`

Replace the current search-only retrieval path for conversational queries with `chatStream()`. Keep `/save`, `/find`, `/list` slash commands using their existing direct API calls — only the free-form natural language path changes.

New behavior for `@memory [natural language query]`:
1. Call `concierge.chatStream({ message: query, stream: true, format: 'anthropic' })`
2. Stream tokens directly to VS Code's `stream.markdown()` response handler
3. After stream completes, append citations as a collapsible `stream.button()` or footnote block

**Drift detection trigger in VS Code**: if the user's message contains the word "compare", "drift", "vs", "versus", or "changed", prompt:
> "Would you like me to run drift analysis? (Reply 'yes' or select a memory to compare against)"

This is a UX nudge, not automatic — do not trigger drift mode silently.

### Frontend surface: Mobile PWA

**File**: `packages/mobile-pwa/src/components/ChatInterface.tsx`

Add `useMemoryConcierge()` as Tier 0 above the existing Xenova tier. Implementation:
- When `features.concierge === true`: attempt Tier 0 first
- Show "Memory Concierge" badge on the response (analogous to existing "Cloud AI" / "On-Device AI" badges)
- Stream tokens into the message bubble progressively
- Show citations as collapsible footnote chips below the response
- "Detect drift" button appears when a memory card is selected and user opens chat

### Frontend surface: Web Extension

**File**: `packages/web-extension/src/sidepanel/SidePanel.tsx`

Replace `handleSendChat()` to use `useMemoryConcierge()`. Change the placeholder:
- Before: `"Ask anything or paste context to save..."`
- After: `"Ask your memory assistant..."`

Show streaming response in the chat thread. Citations render as mini memory cards below the response. A "Drift check" icon button appears when a memory card is in focus.

---

## Conversation Persistence (Optional — Phase 2)

Not in scope for Phase 1. In Phase 2, add a `persist_turns?: boolean` option to the concierge endpoint that automatically creates two memory entries per conversation turn:
- User question → `memory_type: 'context'`, `tags: ['concierge-turn', 'user']`
- Assistant response → `memory_type: 'context'`, `tags: ['concierge-turn', 'assistant']`

This closes the loop: the assistant's responses become part of the memory bank it draws from in future sessions. Out of scope until rate limits and storage implications are confirmed with product.

---

## Acceptance Criteria

### Backend
- [ ] `POST /api/v1/concierge/chat` responds within 8s for non-streaming, starts streaming within 2s
- [ ] Default mode returns a synthesized natural language response drawing from memory context — not a raw list of search results
- [ ] Drift mode returns at least one `drift_signal` when a reference entry meaningfully differs from existing patterns; returns empty signals (not error) when no drift detected
- [ ] Citations reference real memory IDs from the context bundle used in the response
- [ ] Rate limit (20 req/min) enforced — returns 429 with retry-after header
- [ ] `features.concierge = false` or missing endpoint returns graceful error, does not crash frontend
- [ ] Feature flag `FEATURE_CONCIERGE` environment variable gates the endpoint (same pattern as `FEATURE_MEMORY_REASONING_QUEUE`)

### Frontend
- [ ] `useMemoryConcierge()` is a complete no-op when `config.features.concierge === false` (no import of memory-client, no network call)
- [ ] Streaming tokens render progressively — user sees first word within 2s of sending
- [ ] Citations visible after stream completes
- [ ] VS Code: drift detection nudge appears on comparison-intent queries
- [ ] Mobile PWA: "Memory Concierge" tier badge renders; falls back to Tier 1 if endpoint unavailable
- [ ] Web Extension: conversational response renders above citation cards; existing search fallback works when flag false
- [ ] No bundle size regression — VS Code VSIX stays under 250 KB

---

## What Is NOT in Scope

- Multi-user / team concierge sessions (Phase 2+)
- Persistent conversation memory (Phase 2)
- Audio/voice input (separate track)
- Concierge-initiated proactive nudges ("You haven't reviewed X in 30 days") — requires notification infrastructure
- Fine-tuning the LLM on user memories — out of scope entirely; the context bundle approach is sufficient
- Training data collection from concierge turns — legal review required before this is considered

---

_Version: 1.0 — 2026-05-08_
_Depends on: Backend Phase 2 (profiles) + Backend Phase 3 (/api/v1/context) + SDK Intelligence Phase 2.5 (useContextBundle)_
