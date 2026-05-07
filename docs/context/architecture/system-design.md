# System Design - LanOnasis Aether Memory

## Overview

Cross-platform Memory-as-a-Service with on-device AI. Four client surfaces share a common backend and SDK. Embeddings are generated locally; cloud sync is optional but recommended for cross-device access.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLIENT SURFACES                               │
│  ┌────────────┐  ┌──────────────┐  ┌──────────┐  ┌────────────────┐  │
│  │ Web App    │  │ VSCode Ext   │  │ Mobile   │  │ Web Extension  │  │
│  │ (React)    │  │ (Webview)    │  │ PWA      │  │ (Manifest v3)│  │
│  └─────┬──────┘  └──────┬─────┘  └────┬─────┘  └───────┬────────┘  │
│        │                  │              │                │          │
│        └──────────────────┴──────────────┴────────────────┘          │
│                           │                                          │
│                    ┌──────┴──────┐                                   │
│                    │  packages/  │                                   │
│                    │  shared/    │  <- Types, AI engine, SDK hooks   │
│                    └──────┬──────┘                                   │
│                           │                                          │
│                    ┌──────┴──────┐                                   │
│                    │ mem-intel-  │                                   │
│                    │ sdk (npm)   │  <- Pattern/duplicate detection  │
│                    └─────────────┘                                   │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼ HTTP / REST
┌─────────────────────────────────────────────────────────────────────┐
│                        BACKEND (Express)                             │
│  ┌─────────────────┐  ┌──────────────────┐  ┌─────────────────────┐  │
│  │ /api/memories   │  │ /api/keys        │  │ (future: webhooks)  │  │
│  │ CRUD + search   │  │ Generate/rotate  │  │                     │  │
│  └────────┬────────┘  └────────┬─────────┘  └─────────────────────┘  │
│           │                    │                                      │
│           └────────────────────┬─────────────────────────────────────┘
│                                │
│                         ┌──────┴──────┐
│                         │  Drizzle    │
│                         │    ORM      │
│                         └──────┬──────┘
│                                │
│                         ┌──────┴──────┐
│                         │ PostgreSQL  │
│                         │ + pgvector  │
│                         └─────────────┘
└─────────────────────────────────────────────────────────────────────┘
```

## Data Flow: Memory Creation

```
1. User creates memory (any client surface)
   -> Client validates with Zod schema (insertMemorySchema)

2. If online:
   -> POST /api/memories
   -> Server validates again (insertMemorySchema.parse)
   -> storage.createMemory() writes to PostgreSQL
   -> Returns memory with server-generated id + timestamps

3. If offline (mobile PWA):
   -> Write to IndexedDB locally
   -> Generate embedding via Transformers.js (on-device)
   -> Queue sync operation
   -> Show "pending sync" UI indicator

4. On network recovery:
   -> Batch POST queued memories to /api/memories
   -> Server stores + generates server-side embedding (if needed)
   -> Mark local records as synced
```

## Data Flow: Semantic Search

```
1. User enters search query (any client surface)

2. On-device path (offline or mobile):
   -> Generate query embedding locally via Transformers.js
   -> Compare cosine similarity against local memory embeddings
   -> Return top-K results sorted by similarity

3. Server path (cloud search):
   -> GET /api/memories/search?q=...
   -> Server may use pgvector for similarity search
   -> Return results from PostgreSQL
```

## Data Flow: Memory Analysis (SDK)

```
1. User requests analysis (web dashboard or VSCode ext)

2. React hook calls SDK:
   -> useMemoryAnalysis(memories)
   -> usePatternDetection(analysis)
   -> useDuplicateDetection(memories)

3. SDK processes:
   -> MemoryIntelligenceService.analyzeMemory()
   -> Returns patterns, keywords, sentiment, quality score

4. UI updates with analysis results, pattern highlights, duplicate warnings
```

## State Management

| Surface | State Tool | Notes |
|---------|-----------|-------|
| Web App | TanStack Query + Zustand | Server state in Query, UI state in Zustand |
| Mobile PWA | Zustand + localStorage | Offline-first persistence |
| VSCode Ext | VSCode globalState + React useState | Extension storage API |
| Web Ext | chrome.storage + React useState | Browser extension storage |

## Authentication Flow

```
1. User authenticates via Clerk/Auth.js (OAuth or username/password)
2. Server sets session or returns JWT
3. Subsequent requests include auth token
4. req.user?.id extracted in Express middleware
5. All memory/key operations scoped to userId
```

## Build Pipeline (Turbo)

```
Root
  -> packages/shared (tsc)     [must complete first]
  -> client (vite build)       [depends on shared]
  -> packages/mobile-pwa      [depends on shared]
  -> packages/vscode-extension [depends on shared]
  -> packages/web-extension    [depends on shared]
```

Turbo caching means unchanged packages skip rebuilds.

## Deployment Architecture

| Surface | Platform | Build Output |
|---------|----------|-------------|
| Web App | Vercel | `dist/public/` |
| Mobile PWA | Static host / PWA | `packages/mobile-pwa/dist/` |
| VSCode Ext | VSCode Marketplace | `.vsix` file |
| Web Ext | Chrome Web Store / AMO | Extension bundle |
| Backend | Vercel / Node server | `server/index.ts` |

## Security Considerations

- API keys are hashed (SHA-256) before storage
- API key tokens are masked in list responses (only first 12 chars shown)
- OAuth2 PKCE flow for secure authentication
- CORS configured for allowed origins
- Rate limiting on key generation endpoints
- Input validation via Zod on all routes
