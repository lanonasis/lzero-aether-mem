# Execution Plan: Agent Memory Relay — External Agent Access Protocol

_Version: 1.0 — 2026-05-08_
_Status: Ready for handoff — Phase 1 MCP endpoint exposure_

---

## What This Is

The Agent Memory Relay is the protocol that allows external AI agents — Claude Code, custom agents, third-party AI tools, and automation pipelines — to access a user's memory bank programmatically during their own live sessions.

**The defining use case:**

> A user is mid-session with Claude Code. They ask: "Does this architecture match what we decided last month?" Claude Code, configured with the user's memory relay endpoint, calls `memory_concierge_chat` and retrieves a synthesized answer from the user's memory bank — without the user switching context, opening a different app, or manually pasting notes.

The relay is not a new product surface. It is a secure, scoped access layer on top of what already exists — the MCP server, the API, and the context bundle endpoint — exposed in a way that external agents can discover and use with minimal configuration.

---

## Current State — What Exists and What Is Missing

### What exists

| Component | Location | State |
|-----------|----------|-------|
| MCP server | `apps/mcp-core/src/index.ts` | Live — 9+ intelligence tools + memory CRUD + behavior tools |
| API key creation | `mcp-core` tool `create_api_key` | Exists — but no scope/label model for relay-specific keys |
| `memory_compile_context` MCP tool | Backend Phase 3 plan | Not yet live |
| `memory_concierge_chat` MCP tool | Memory Concierge plan | Not yet live |
| Agent SDK methods | `@lanonasis/memory-client` | Exists — `searchMemories`, `listMemories`, `createMemory` etc. |

### What is missing — the gap

1. **No user-accessible MCP endpoint URL** — the MCP server exists but there is no documented, user-configurable endpoint that an external agent can add as an MCP server. The URL format, authentication mechanism, and per-user routing are not defined.

2. **No scoped relay keys** — the existing `create_api_key` tool creates general-purpose keys. A relay key should be: scoped to read-only or specific tools, labeled by use case (e.g. "claude-code-relay"), and revocable independently of other keys.

3. **No agent discovery contract** — there is no documented "connect your agent" flow specifying what URL to configure, what tools are available, and what authentication format to use. Without this, users cannot self-serve the connection.

4. **No context injection mode** — external agents need a single "give me relevant context for this query" call that is optimized for injecting into a system prompt. The `memory_compile_context` MCP tool (backend Phase 3) addresses this, but it must be documented as the primary relay contract.

---

## Architecture

```
External Agent (Claude Code, custom agent, Slack bot, etc.)
    │
    │  configured with: MCP URL + relay API key
    │
    ▼
MCP Endpoint: https://memory.lanonasis.com/mcp/v1
    │  (or self-hosted: http://localhost:PORT/mcp/v1)
    │
    ├── Authenticates via: Authorization: Bearer <relay-api-key>
    │
    ├── Available tools (relay tier):
    │   ├── memory_compile_context      — get context bundle for a query
    │   ├── memory_concierge_chat       — natural language Q&A with memory context
    │   ├── memory_search               — semantic / text / hybrid search
    │   ├── memory_list_inferred_conclusions — pre-reasoned conclusions
    │   └── memory_get                  — retrieve a specific memory by ID
    │
    └── NOT available on relay tier (write-restricted by default):
        ├── memory_create
        ├── memory_update
        ├── memory_delete
        └── admin tools (create_api_key, revoke_api_key, etc.)
```

Write access can be granted per relay key. Default is read-only.

---

## Backend Deliverables

### 1. Relay API key model extension

**File**: `apps/lanonasis-maas/packages/memory-client/src/core/types.ts`

Extend the `ApiKey` type with relay-specific fields:

```typescript
export interface ApiKey {
  id: string;
  label: string;
  created_at: string;
  last_used_at: string | null;
  // New relay fields:
  scope: 'full' | 'relay-read' | 'relay-write' | 'relay-admin';
  relay_allowed_tools?: string[];   // null = all tools for the scope; string[] = specific tools
  relay_subject_id?: string;        // if set, relay is locked to this subject_id
}
```

**New API key creation variant** — add `scope` parameter to the existing key creation endpoint and MCP tool:

```
POST /api/v1/keys
{
  label: string,
  scope: 'full' | 'relay-read' | 'relay-write',
  relay_allowed_tools?: string[],  // optional: restrict to specific MCP tools
  relay_subject_id?: string        // optional: lock to a specific subject
}
```

The existing key creation flow defaults to `scope: 'full'` for backward compatibility.

### 2. MCP endpoint routing

**File**: `apps/lanonasis-maas/src/server.ts`

Add MCP HTTP transport endpoint:

```typescript
app.post('/mcp/v1', mcpHttpHandler);
app.get('/mcp/v1/sse', mcpSseHandler);  // for agents that use SSE transport
```

**`mcpHttpHandler`** — existing `mcp-core` server already handles the MCP protocol. This new route is a thin HTTP adapter:
1. Extracts Bearer token from `Authorization` header
2. Validates it as an API key (existing key validation middleware)
3. Checks `scope` — if `relay-read`, restricts available tool list to relay-safe tools
4. Forwards the MCP JSON-RPC request to the MCP server handler
5. Returns the MCP JSON-RPC response

**Relay-safe tool list** (enforced server-side regardless of key scope):
```typescript
const RELAY_READ_TOOLS = [
  'memory_search',
  'memory_get',
  'memory_list_memories',
  'memory_compile_context',
  'memory_concierge_chat',
  'memory_list_inferred_conclusions',
  'intelligence_find_related',
  'intelligence_extract_insights',
  'intelligence_analyze_patterns',
];

const RELAY_WRITE_TOOLS = [
  ...RELAY_READ_TOOLS,
  'memory_create',
  'memory_update',
];
```

Any tool call not in the allowed list returns a standard MCP error: `{ "error": { "code": -32601, "message": "Tool not available on relay tier" } }`.

### 3. MCP endpoint URL format

The public endpoint must follow this format (document this in the user-facing integration guide):

```
# Cloud (default)
https://memory.lanonasis.com/mcp/v1

# Self-hosted
http://<host>:<port>/mcp/v1
```

Authentication header for all agent connections:
```
Authorization: Bearer lms_relay_<key>
```

The key prefix `lms_relay_` distinguishes relay keys visually from full API keys (`lms_full_`). This is enforced at key creation — not just a label.

### 4. Agent setup guide endpoint

A machine-readable discovery document (analogous to OpenAI's plugin manifest):

```
GET /.well-known/agent-relay.json
→
{
  "name": "LanOnasis Memory",
  "description": "Personal memory bank access for AI agents",
  "mcp_endpoint": "https://memory.lanonasis.com/mcp/v1",
  "auth_scheme": "bearer",
  "key_prefix": "lms_relay_",
  "tools_preview": ["memory_compile_context", "memory_concierge_chat", "memory_search", ...],
  "docs_url": "https://docs.lanonasis.com/agent-relay"
}
```

This allows agents and automation tools to auto-discover the integration details without manual documentation lookup.

---

## Frontend Deliverables

### Relay Key Management UI

A "Connect an Agent" section in the settings/API keys view across platforms. This is not a new page — it is a new tab or section within the existing key management UI.

**VS Code**: Add to the existing settings webview. Show a "Connect to Claude Code" CTA with a one-click flow:
1. User clicks "Connect to Claude Code"
2. System auto-creates a `relay-read` key labeled "claude-code"
3. Displays a copy-ready MCP config snippet:
```json
{
  "mcpServers": {
    "lanonasis-memory": {
      "url": "https://memory.lanonasis.com/mcp/v1",
      "headers": {
        "Authorization": "Bearer lms_relay_<generated-key>"
      }
    }
  }
}
```
4. User pastes this into their Claude settings. Done.

**Mobile PWA / Web Extension**: Show the relay key section with a "Copy MCP config" button. No deep linking — the user configures their agent tool manually.

### Feature flag

Add to `LanonasisConfig.features`:
```typescript
/** Agent relay — MCP endpoint exposure + relay key management */
agentRelay?: boolean;
```

Default `false`. The relay infrastructure itself is backend-only; the frontend flag controls whether the "Connect an Agent" UI section is visible.

---

## Context Injection Pattern for Agents

Document this as the primary recommended pattern for agents using the relay. This is what the agent should do at the start of any session where memory context is relevant:

```javascript
// At session start or on user query, call memory_compile_context
const result = await mcp.call('memory_compile_context', {
  subject_id: userSubjectId,
  query: userQuery,             // semantic recall for the specific query
  include: ['profile_summary', 'conclusions', 'semantic_recall'],
  token_budget: 2000,           // leave budget for the conversation
  format: 'anthropic'           // or 'openai' depending on the agent's LLM
});

// Inject into system prompt
const systemPrompt = `
${existingSystemPrompt}

--- User Memory Context ---
${result.bundle}
--- End Memory Context ---
`;
```

For conversational questions where the agent should synthesize and respond (not just inject context), use `memory_concierge_chat` instead:

```javascript
const result = await mcp.call('memory_concierge_chat', {
  message: userQuery,
  stream: false   // agents usually prefer non-streaming for MCP calls
});
// result.response is ready to surface to the user
```

These two patterns cover 90% of agent use cases. Document both in the integration guide with working code examples.

---

## Acceptance Criteria

### Backend
- [ ] `POST /mcp/v1` accepts valid MCP JSON-RPC and returns correct responses
- [ ] `lms_relay_` prefixed keys are restricted to `RELAY_READ_TOOLS` unless `relay-write` scope was granted at creation
- [ ] Calling a non-allowed tool with a relay key returns MCP error `-32601`, not an auth error
- [ ] `GET /.well-known/agent-relay.json` returns valid JSON discovery doc
- [ ] Relay key creation endpoint accepts `scope`, `relay_allowed_tools`, `relay_subject_id` and persists them
- [ ] Existing full-scope keys are unaffected by the scope model addition (backward compat)
- [ ] Rate limiting applies per relay key, not per user account (so a high-traffic agent doesn't block the user's own requests)

### Frontend
- [ ] "Connect an Agent" section visible in VS Code settings when `features.agentRelay === true`
- [ ] One-click "Connect to Claude Code" flow generates a relay key and renders the MCP config snippet
- [ ] Relay keys labeled with their source ("claude-code", "custom", etc.) in the key list
- [ ] Relay keys show `scope` badge in the key list (read / write)
- [ ] Revoking a relay key removes it from the backend immediately; no grace period

---

## What Is NOT in Scope

- Agent-to-agent memory sharing (two agents sharing a context — requires visibility policy from Backend Phase 4)
- Real-time memory sync push to connected agents (webhook or SSE events when user creates a memory) — deferred
- Agent identity verification (verifying the agent is who it claims to be, not just valid API key) — cryptographic agent identity is a separate security track
- Billing metering per relay key — deferred to billing track
- OAuth flow for agent connections (agent requests access, user approves via OAuth) — Phase 2 of relay; Phase 1 is API key only

---

_Version: 1.0 — 2026-05-08_
_Depends on: Backend Phase 3 (memory_compile_context MCP tool) + Memory Concierge plan (memory_concierge_chat MCP tool)_
_Parallel with: Integration Hub plan (shares relay key infrastructure)_
