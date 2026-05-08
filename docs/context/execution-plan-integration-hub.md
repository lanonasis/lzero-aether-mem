# Execution Plan: Integration Hub — Platform Connectors & Context Spaces

_Version: 1.0 — 2026-05-08_
_Status: Ready for handoff — Phase 1 ingestion connectors_

---

## What This Is

The Integration Hub is the mechanism that lets users plug their existing platforms — Notion, Slack, and others — into their memory bank, and separate their context between personal and team workspaces.

**The defining user experience:**

> A user reacts to a Slack thread with 🧠. The thread is silently saved as a memory entry tagged `[team]`. Later, they ask the Memory Concierge "what did we decide about the API contract in the Slack discussion last week?" and get a precise answer drawn from that saved thread — without leaving their workflow to manually save anything.

The Integration Hub is not about replacing those platforms. It is about capturing knowledge from wherever work happens and making it accessible through the memory bank's intelligence layer.

---

## Two Concerns in This Plan

This plan covers two distinct but related concerns that share infrastructure:

1. **Platform Connectors** — how content flows into and out of the memory bank from Notion, Slack, and generic sources
2. **Context Spaces** — how memories are separated between personal and team contexts, and how the Concierge and search respect that boundary

These are implemented as separate features but must be designed together, because a memory created from a Slack team channel must land in the team context space automatically — not the personal space.

---

## Current State

| Feature | State |
|---------|-------|
| Memory creation | Manual only (UI + API) |
| Context separation (personal/team) | `organization_id` field exists on memories — but no enforced "space" concept at the application layer |
| Notion connector | Not implemented |
| Slack connector | Not implemented |
| Generic webhook ingestion | Not implemented |
| Team context in Concierge / search | Not scoped — all memories returned regardless of context space |

---

## Part 1: Context Spaces

Context spaces are a prerequisite for platform connectors. Every connector must know which space to write to.

### Space model

A "space" is a named, scoped view of the memory bank. Every memory belongs to exactly one space.

```typescript
type MemorySpace = 'personal' | 'team' | string;  // string allows custom named spaces
```

**Personal space**: Memories visible only to the authenticated user. `organization_id = null`, `space = 'personal'`.

**Team space**: Memories visible to all members of the user's organization. `organization_id = user.organization_id`, `space = 'team'`.

Custom spaces (e.g., "project-alpha", "client-xyz") are Phase 2. Phase 1 ships only `personal` and `team`.

### Schema addition

**Migration** (additive — no breaking changes):

```sql
ALTER TABLE memories
  ADD COLUMN IF NOT EXISTS space TEXT NOT NULL DEFAULT 'personal'
    CHECK (space IN ('personal', 'team'));

CREATE INDEX IF NOT EXISTS idx_memories_space ON memories(organization_id, space);
```

All existing memories default to `'personal'`. Migrations are safe — no data loss.

### API contract extension

All memory endpoints that accept or return memories gain a `space` field:

```
POST /api/v1/memories
{ ..., space?: 'personal' | 'team' }   // default: 'personal'

GET /api/v1/memories?space=team         // filter by space
POST /api/v1/memories/search
{ ..., space?: 'personal' | 'team' | 'all' }  // default: 'all'
```

The `space` field is enforced server-side:
- `space: 'team'` requires `organization_id` to be set on the user's account — returns 400 if user has no org
- `space: 'personal'` ignores `organization_id` entirely

### Context bundle and Concierge space scoping

**File**: `POST /api/v1/context`

Add `space` parameter:
```typescript
{ ..., space?: 'personal' | 'team' | 'all' }  // default: 'all'
```

**File**: `POST /api/v1/concierge/chat`

Add `space` parameter:
```typescript
{ ..., space?: 'personal' | 'team' | 'all' }  // default: 'all'
```

The Concierge must respect space boundaries. A user asking in "personal" mode must never get responses drawing from team memories, and vice versa. This is enforced in the context bundle compilation step, not in the LLM prompt.

### Frontend space selector

All surfaces that surface memories must show a space selector. Recommended positions:
- **VS Code**: Dropdown in the IDEPanel header (between "New Memory" and search)
- **Mobile PWA**: Toggle at the top of the memory list view
- **Web Extension**: Tab selector in the sidepanel (Personal / Team)
- **Memory Concierge chat**: Space scope indicator in the chat header; user can switch before sending

Add to `LanonasisConfig.features`:
```typescript
contextSpaces?: boolean;  // default: true (ship with Phase 1)
```

---

## Part 2: Platform Connectors

### Connector architecture

All connectors follow the same pattern:

```
External Platform (Notion, Slack, etc.)
    │
    │  sends content via webhook OR OAuth callback
    │
    ▼
POST /api/v1/integrations/ingest
    │
    ├─── Source detection (which platform sent this)
    ├─── Content normalization (platform-specific → MemoryEntry shape)
    ├─── Space assignment (personal/team based on source context)
    ├─── Tags injection (auto-tag with source: ['slack', 'notion', etc.])
    └─── Memory creation (calls existing memory-create pipeline)
```

The ingest endpoint is the single entry point for all connectors. Platform-specific logic lives in normalizer functions, not in separate endpoints.

### Generic ingest endpoint

**File**: `apps/lanonasis-maas/src/routes/integrations.ts`

```
POST /api/v1/integrations/ingest
Authorization: Bearer <relay-api-key with write scope>
{
  source: 'notion' | 'slack' | 'generic',
  content: string,              // raw content from the platform
  title?: string,               // optional — inferred if absent
  space?: 'personal' | 'team', // default: inferred from source context
  tags?: string[],              // merged with auto-tags
  source_url?: string,          // URL to the original item in the source platform
  source_metadata?: Record<string, unknown>  // platform-specific metadata
}

→ 201 { memory_id: string, space: string, tags: string[] }
```

This endpoint is the foundation. All platform connectors use it. Users can also call it directly from automation tools (Zapier, Make, n8n, etc.) without needing a platform-specific connector.

---

### Connector 1: Slack

**Mechanism**: Slack slash command + emoji reaction trigger.

**Slash command** `lanonasis remember [optional label]`:
- Posts to `POST /api/v1/integrations/ingest` with the current message/thread content
- `space` assigned based on channel type: DM → personal, public/private channel → team
- Auto-tags: `['slack', 'thread', channel-name]`
- Response: ephemeral "Saved to your [personal/team] memory ✓"

**Emoji reaction trigger** (🧠 or configurable):
- Slack event subscription on `reaction_added`
- When user reacts with 🧠 to any message: save that message as a memory
- Same space assignment and tagging logic as slash command

**Slack app configuration required** (documented in integration guide):
- Create a Slack app at api.slack.com
- Add slash command pointing to `POST /api/v1/integrations/slack/command`
- Add event subscription for `reaction_added` pointing to `POST /api/v1/integrations/slack/events`
- OAuth install flow for workspace authorization

**Backend files**:
- `apps/lanonasis-maas/src/routes/integrations/slack.ts` — handles Slack event verification + command parsing
- `apps/lanonasis-maas/src/services/connectors/slackConnector.ts` — normalizes Slack message format → MemoryEntry

**Slack message normalizer output**:
```typescript
{
  title: `Slack: ${channelName} — ${truncated(messageText, 60)}`,
  content: fullMessageText + threadReplies,  // include thread context
  space: isDirectMessage ? 'personal' : 'team',
  tags: ['slack', `slack-channel:${channelName}`, 'team-capture'],
  source_url: slackMessagePermalink,
  source_metadata: { channel_id, message_ts, user_id }
}
```

---

### Connector 2: Notion

**Mechanism**: Manual sync button + webhook on page updates.

**Manual sync** (Phase 1):
- User connects Notion via OAuth in the Integration Hub settings
- Selects which Notion databases or pages to sync
- Clicking "Sync now" imports selected pages as memory entries
- Each Notion page → one memory entry; Notion blocks → content field

**Webhook sync** (Phase 2 — Notion webhooks are in beta):
- When Notion notifies of a page update, re-sync that page
- Space assignment: user configures per-database whether content is personal or team

**Notion OAuth flow**:
```
User clicks "Connect Notion"
    │
    ▼
Redirect to https://api.notion.com/v1/oauth/authorize?...
    │
    ▼
User grants access
    │
    ▼
Callback: POST /api/v1/integrations/notion/callback
    │
    ▼
Store access token (encrypted) against user_id
    │
    ▼
Return to Integration Hub settings with "Connected" state
```

**Notion page normalizer output**:
```typescript
{
  title: notionPageTitle,
  content: extractedBlocks.join('\n\n'),  // flatten Notion block tree to text
  space: userConfiguredSpaceForDatabase,  // user sets this per-database in settings
  tags: ['notion', `notion-db:${databaseId}`, ...userDefinedTags],
  source_url: notionPageUrl,
  source_metadata: { page_id, database_id, last_edited_time }
}
```

**Backend files**:
- `apps/lanonasis-maas/src/routes/integrations/notion.ts` — OAuth callback + sync endpoints
- `apps/lanonasis-maas/src/services/connectors/notionConnector.ts` — page fetching + block normalization

**Sync endpoint**:
```
POST /api/v1/integrations/notion/sync
{ page_ids?: string[], database_ids?: string[] }
→ 202 { queued: number, estimated_ms: number }
```
Sync is async — returns immediately and processes in background (same non-blocking pattern as memory inference queue).

---

### Connector 3: Generic Webhook

A platform-agnostic ingest URL that any system can POST to. No platform-specific normalization — the caller is responsible for formatting the payload.

This is the `POST /api/v1/integrations/ingest` endpoint described in the connector architecture section above. It requires a relay-write API key in the Authorization header.

Use cases: Zapier zaps, Make automations, n8n workflows, custom scripts. No UI needed — the URL and key are all that's required.

---

## Integration Hub Settings UI

A new "Integrations" section in the settings view across platforms. Phase 1 ships with:

| Section | Content |
|---------|---------|
| Context Spaces | Toggle: Personal / Team; space selector default |
| Connected Platforms | Notion: OAuth connect button; connection status; sync trigger; space assignment per database |
| Connected Platforms | Slack: Installation link to Slack app; connection status; reaction emoji config |
| Relay Keys | (shared with Agent Relay plan) List of relay keys with scope badges |
| Ingest URL | Generic webhook URL with copy button; shows relay-write key for pasting |

**Feature flag**:
```typescript
integrationHub?: boolean;   // default: false — gated until connectors are live
```

---

## Content Separation in the Concierge and Search

When context spaces ship, the Concierge and search must respect boundaries explicitly. The execution crew must implement these rules without exception:

1. **Default behavior**: When no space is specified by the user, return memories from ALL spaces the user has access to (personal + any team they belong to). This preserves existing behavior.

2. **Explicit personal query**: When `space: 'personal'` is set, ONLY return personal memories. Never include team memories regardless of relevance.

3. **Explicit team query**: When `space: 'team'` is set, ONLY return team memories. Require the user to be a member of an organization; return 403 if not.

4. **Connector-originated memories**: Memories created by Slack or Notion connectors carry their space assignment permanently. The user cannot change a team memory to personal after creation (prevents accidental data exfiltration from team context).

5. **Concierge citations**: When the Concierge cites a memory from the team space in a personal-space session (which should not happen if constraint 2 is enforced), it must be treated as a bug and logged — not silently included.

---

## Acceptance Criteria

### Context Spaces
- [ ] All memory endpoints accept and return `space` field
- [ ] `space: 'team'` requires org membership; returns 400 if user has no org
- [ ] Existing memories default to `space: 'personal'` (no data migration needed beyond setting default)
- [ ] Context bundle and Concierge filter by space when `space` param is provided
- [ ] A personal-space Concierge session never cites a team memory
- [ ] Space selector renders in VS Code, Mobile PWA, and Web Extension
- [ ] Feature flag `contextSpaces: false` hides the selector; queries return all spaces as before

### Slack Connector
- [ ] `/lanonasis remember` command saves the current message as a memory with correct space and tags
- [ ] 🧠 emoji reaction on any message saves that message
- [ ] DM reactions → personal space; channel reactions → team space
- [ ] Slack event verification (signing secret check) implemented — reject requests with invalid signatures
- [ ] Memory creation is async — Slack does not time out (response within 3s; memory created in background)

### Notion Connector
- [ ] OAuth connect flow completes and stores token
- [ ] Manual sync imports Notion pages as memories with correct title, content, tags
- [ ] Sync is non-blocking — endpoint returns 202 immediately
- [ ] Duplicate sync detection: syncing the same Notion page twice updates the existing memory rather than creating a duplicate (match on `source_metadata.page_id`)
- [ ] User can disconnect Notion (revokes token, does not delete already-synced memories)

### Generic Ingest
- [ ] `POST /api/v1/integrations/ingest` with valid relay-write key creates a memory
- [ ] Invalid or read-only key returns 403
- [ ] Missing `content` field returns 400

### Integration Hub UI
- [ ] Integrations section visible when `features.integrationHub === true`
- [ ] Notion shows connected/disconnected state accurately
- [ ] Slack shows installation link and configured emoji
- [ ] All existing features unaffected when `features.integrationHub === false`

---

## What Is NOT in Scope

- GitHub connector (code context memory — separate engineering track)
- Email connector (MIME parsing complexity; legal implications — deferred)
- Real-time Notion sync via webhooks (Notion webhooks in beta — Phase 2 when stable)
- Memory export back to Notion (reverse sync — Phase 2)
- Team admin controls (which team members can access team memories, approval workflow) — requires visibility policy from Backend Phase 4
- Cross-organization sharing — not planned
- GDPR data portability export (full user data export) — separate compliance track
- Billing differentiation between personal and team spaces — billing track

---

_Version: 1.0 — 2026-05-08_
_Depends on: Context Spaces schema migration (new) + Generic ingest endpoint (new) + Agent Relay plan (relay-write key) + Backend Phase 4 (visibility policy — for team admin controls)_
_Parallel with: Memory Concierge plan + Agent Relay plan_
