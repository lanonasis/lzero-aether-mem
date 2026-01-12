# LanOnasis API URL Guide

This guide documents the Supabase edge function endpoints used by the LanOnasis Memory platform.

## Base URL

```
https://lanonasis.supabase.co
```

## Authentication

All authenticated endpoints require the `X-API-Key` header:

```bash
-H "X-API-Key: lano_your_api_key_here"
```

API keys follow the format: `lano_*` or `lns_*`

---

## Memory API Endpoints

### Create Memory
```
POST /functions/v1/memory-create
```

**Request Body:**
```json
{
  "title": "API Configuration Guide",
  "content": "Step-by-step guide for configuring the API...",
  "memory_type": "knowledge",
  "tags": ["api", "configuration", "guide"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "API Configuration Guide",
    "content": "...",
    "memory_type": "knowledge",
    "tags": ["api", "configuration", "guide"],
    "created_at": "2025-01-12T00:00:00Z",
    "updated_at": "2025-01-12T00:00:00Z"
  }
}
```

---

### Get Memory by ID
```
GET /functions/v1/memory-get?id=UUID_HERE
```

or

```
POST /functions/v1/memory-get
Content-Type: application/json

{"id": "UUID_HERE"}
```

---

### Update Memory
```
POST /functions/v1/memory-update
```

**Request Body:**
```json
{
  "id": "UUID_HERE",
  "title": "Updated Title",
  "content": "Updated content triggers re-embedding",
  "tags": ["updated", "example"]
}
```

**Notes:**
- Content changes trigger automatic re-embedding
- Supports PUT and PATCH methods as well

---

### Delete Memory
```
POST /functions/v1/memory-delete
```

**Request Body:**
```json
{
  "id": "UUID_HERE"
}
```

or via query parameter:
```
DELETE /functions/v1/memory-delete?id=UUID_HERE
```

---

### List Memories
```
GET /functions/v1/memory-list
```

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `limit` | number | 20 | Max items to return |
| `offset` | number | 0 | Pagination offset |
| `type` | string | - | Filter by memory_type |
| `sortBy` | string | `updated_at` | Sort field |
| `sortOrder` | string | `desc` | `asc` or `desc` |

**Example:**
```bash
curl "https://lanonasis.supabase.co/functions/v1/memory-list?limit=10&type=knowledge&sortBy=updated_at&sortOrder=desc" \
  -H "X-API-Key: lano_your_key"
```

---

### Search Memories (Semantic)
```
POST /functions/v1/memory-search
```

**Request Body:**
```json
{
  "query": "how to configure MCP",
  "limit": 10,
  "threshold": 0.7,
  "memory_type": "knowledge"
}
```

**Parameters:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `query` | string | Yes | Search query text |
| `limit` | number | No | Max results (default: 20) |
| `threshold` | number | No | Similarity threshold 0-1 (default: 0.7) |
| `memory_type` | string | No | Filter by type |

**Response:**
```json
{
  "success": true,
  "data": {
    "results": [
      {
        "id": "uuid",
        "title": "MCP Configuration",
        "content": "...",
        "similarity_score": 0.92
      }
    ],
    "total_results": 5,
    "search_time_ms": 45
  }
}
```

---

### Memory Statistics
```
GET /functions/v1/memory-stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total_memories": 150,
    "memories_by_type": {
      "knowledge": 80,
      "context": 45,
      "reference": 25
    },
    "total_topics": 12
  }
}
```

---

### Bulk Delete
```
POST /functions/v1/memory-bulk-delete
```

**Request Body:**
```json
{
  "ids": ["uuid-1", "uuid-2", "uuid-3"]
}
```

---

## Intelligence API Endpoints

### Health Check (No Auth Required)
```
GET /functions/v1/intelligence-health-check
```

### Suggest Tags
```
POST /functions/v1/intelligence-suggest-tags
```

**Request Body:**
```json
{
  "content": "Text content to analyze for tag suggestions",
  "existing_tags": ["optional", "existing"]
}
```

### Find Related Memories
```
POST /functions/v1/intelligence-find-related
```

**Request Body:**
```json
{
  "memory_id": "UUID_HERE",
  "limit": 5
}
```

### Detect Duplicates
```
POST /functions/v1/intelligence-detect-duplicates
```

**Request Body:**
```json
{
  "content": "Content to check for duplicates",
  "threshold": 0.85
}
```

### Extract Insights
```
POST /functions/v1/intelligence-extract-insights
```

**Request Body:**
```json
{
  "content": "Long text content to extract key insights from"
}
```

### Analyze Patterns
```
POST /functions/v1/intelligence-analyze-patterns
```

---

## System Endpoints

### Health Check (No Auth Required)
```
GET /functions/v1/system-health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-01-12T00:00:00Z",
  "version": "1.0.0"
}
```

---

## API Key Management

### Generate API Key
```
POST /functions/v1/generate-api-key
```

### Verify API Key
```
POST /functions/v1/verify-api-key
```

### Sync API Key
```
POST /functions/v1/sync-api-key
```

---

## REST API (Direct Table Access)

For direct database access (requires appropriate RLS policies):

| Table | URL | Methods |
|-------|-----|---------|
| `memory_entries` | `/rest/v1/memory_entries` | GET, POST, PATCH, DELETE |
| `organizations` | `/rest/v1/organizations` | GET, POST, PATCH, DELETE |
| `users` | `/rest/v1/users` | GET, POST, PATCH, DELETE |
| `api_keys` | `/rest/v1/api_keys` | GET, POST, PATCH, DELETE |
| `topics` | `/rest/v1/topics` | GET, POST, PATCH, DELETE |
| `audit_log` | `/rest/v1/audit_log` | GET, POST |

---

## URL Mapping (Gateway → Edge Functions)

If using the gateway at `api.lanonasis.com`:

| Gateway URL | Supabase Edge Function |
|-------------|------------------------|
| `/api/v1/memory/search` | `/functions/v1/memory-search` |
| `/api/v1/memory/stats` | `/functions/v1/memory-stats` |
| `/api/v1/memory/list` | `/functions/v1/memory-list` |
| `/api/v1/memory/update` | `/functions/v1/memory-update` |
| `/api/v1/memory/delete` | `/functions/v1/memory-delete` |
| `/api/v1/memory/bulk/delete` | `/functions/v1/memory-bulk-delete` |
| `/api/v1/memory/health` | `/functions/v1/system-health` |
| `/api/v1/memory/:id` | `/functions/v1/memory-get` |
| `/api/v1/memory` (POST) | `/functions/v1/memory-create` |
| `/api/v1/intelligence/*` | `/functions/v1/intelligence-*` |

---

## Error Responses

All endpoints return errors in this format:

```json
{
  "success": false,
  "error": "Error message description",
  "code": "ERROR_CODE"
}
```

Common error codes:
- `401` - Unauthorized (missing or invalid API key)
- `403` - Forbidden (insufficient permissions)
- `404` - Not found
- `422` - Validation error
- `429` - Rate limit exceeded
- `500` - Internal server error

---

## Rate Limits

- **Standard**: 100 requests/minute
- **Search**: 30 requests/minute
- **Bulk operations**: 10 requests/minute

---

## SDK Usage

The `@lanonasis/memory-client` SDK handles these endpoints automatically:

```typescript
import { createMemoryClient } from '@lanonasis/memory-client';

const client = createMemoryClient({
  apiUrl: 'https://lanonasis.supabase.co',
  apiKey: 'lano_your_api_key'
});

// Create
await client.createMemory({ title: 'Test', content: '...' });

// Search
await client.searchMemories({ query: 'test', limit: 10 });

// List
await client.listMemories({ limit: 20 });

// Update
await client.updateMemory('uuid', { title: 'Updated' });

// Delete
await client.deleteMemory('uuid');
```
