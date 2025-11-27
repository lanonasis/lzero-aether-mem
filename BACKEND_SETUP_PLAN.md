# LanOnasis Memory - Backend Services Setup Plan

**Status**: Architecture Planning → Implementation Framework  
**Last Updated**: November 27, 2025  
**Alignment**: Syncs existing PostgreSQL + REST API with VS Code Extension requirements

---

## Table of Contents

1. [Current State Assessment](#current-state-assessment)
2. [Alignment Map](#alignment-map)
3. [Service Architecture](#service-architecture)
4. [Implementation Framework](#implementation-framework)
5. [Phase Breakdown](#phase-breakdown)
6. [Integration Checklist](#integration-checklist)

---

## Current State Assessment

### What Exists ✅

**Backend Infrastructure**:
- ✅ PostgreSQL database with Drizzle ORM
- ✅ REST API routes (`/api/memories`, `/api/keys/*`)
- ✅ Storage layer with CRUD operations
- ✅ User authentication structure
- ✅ API key generation with scoping (dev/staging/prod)
- ✅ Key rotation/revocation endpoints

**Frontend Components**:
- ✅ Modular IDEPanel with hooks/services/components
- ✅ Memory search & filtering
- ✅ Authentication state management
- ✅ VS Code styling compliance
- ✅ React-based webview integration ready

**Database Schema**:
```typescript
users: id, name, email
memories: id, userId, title, content, tags, date, type
apiKeys: id, userId, name, scope, token, createdAt, lastUsed, rotatedAt, revokedAt
```

### What's Missing ❌

**Backend Services** (needed for VS Code Extension):
- ❌ `SecureApiKeyService` - OAuth2 PKCE + VS Code SecretStorage
- ❌ `MemoryService` - Advanced memory operations (enhanced)
- ❌ `ApiKeyService` (VS Code-specific) - Key management for extension
- ❌ Message passing protocol (extension ↔ webview)
- ❌ OAuth2 gateway integration
- ❌ Credential type management (OAuth vs API Key)

**Configuration & Security**:
- ❌ Extension configuration schema
- ❌ Feature flags (useEnhancedUI, etc.)
- ❌ Environment-specific settings
- ❌ OAuth provider credentials

---

## Alignment Map

### Architecture Layer Mapping

| Documentation Layer | Current Status | Action Required |
|-------------------|---|---|
| **Extension Host** (`extension.ts`) | ❌ Not started | Create extension activation file |
| **Service Layer** | ⚠️ Partial (REST API) | Add `SecureApiKeyService`, enhance existing |
| **Provider Layer** | ❌ Not started | Create Tree/Completion providers |
| **Panel Layer** | ✅ Complete (React) | Wire webview communication |
| **Bridge Layer** | ⚠️ Partial (apiClient exists) | Create `PrototypeUIBridge` adapter |
| **External Services** | ⏳ Ready (endpoints exist) | Configure OAuth gateway |

### Service Mapping

| Documentation Service | Current Equivalent | Gap |
|---|---|---|
| `SecureApiKeyService` | None (REST + env vars) | Create for OAuth2 + VS Code integration |
| `MemoryService` | `/api/memories` routes | Extract into service class, add caching |
| `ApiKeyService` | `/api/keys/*` routes | Extract into service class |
| `MemoryCompletionProvider` | None | Create for code completion |
| `MemoryTreeProvider` | None | Create for sidebar tree |

---

## Service Architecture

### New Service Layer Structure

```
backend/
├── services/
│   ├── SecureApiKeyService.ts (CORE)
│   │   ├── OAuth2 PKCE flow
│   │   ├── SecretStorage abstraction
│   │   └── Credential management
│   │
│   ├── MemoryService.ts (Enhanced)
│   │   ├── Memory CRUD (existing REST)
│   │   ├── Vector search prep
│   │   └── Caching layer
│   │
│   ├── ApiKeyService.ts (Extension-specific)
│   │   ├── Key generation
│   │   ├── Rotation logic
│   │   └── Scope validation
│   │
│   └── OAuthGatewayService.ts (New)
│       ├── Token exchange
│       ├── Refresh token flow
│       └── User profile sync
│
├── providers/
│   ├── MemoryTreeProvider.ts
│   ├── ApiKeyTreeProvider.ts
│   └── MemoryCompletionProvider.ts
│
├── protocols/
│   ├── messages.ts (Message types)
│   ├── handlers.ts (Message handlers)
│   └── commands.ts (VS Code commands)
│
└── extension.ts (Entry point)
```

### Database Schema Enhancements

```typescript
// Add to schema.ts
export const oauth_credentials = pgTable('oauth_credentials', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id').references(() => users.id),
  credentialType: varchar('credential_type').notNull(), // 'oauth' | 'apiKey'
  accessToken: varchar('access_token'), // Encrypted
  refreshToken: varchar('refresh_token'), // Encrypted
  tokenExpiresAt: timestamp('token_expires_at'),
  storedAt: timestamp('stored_at').defaultNow(),
});

export const memory_cache = pgTable('memory_cache', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id').references(() => users.id),
  query: varchar('query').notNull(),
  results: text('results'), // JSON
  vectorEmbedding: text('vector_embedding'), // For future ML
  cachedAt: timestamp('cached_at').defaultNow(),
  expiresAt: timestamp('expires_at'),
});

export const audit_logs = pgTable('audit_logs', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id').references(() => users.id),
  action: varchar('action').notNull(), // 'create', 'read', 'update', 'delete'
  entityType: varchar('entity_type').notNull(), // 'memory', 'apiKey'
  entityId: varchar('entity_id').notNull(),
  timestamp: timestamp('timestamp').defaultNow(),
});
```

---

## Implementation Framework

### Phase 1: Foundation (Days 1-2)

**Goal**: Create core service layer that syncs with existing REST API

#### 1.1 Create Service Interfaces

```typescript
// server/services/IMemoryService.ts
export interface IMemoryService {
  getMemories(userId: string): Promise<Memory[]>;
  searchMemories(userId: string, query: string): Promise<Memory[]>;
  createMemory(userId: string, data: InsertMemory): Promise<Memory>;
  updateMemory(userId: string, id: string, updates: Partial<Memory>): Promise<Memory>;
  deleteMemory(userId: string, id: string): Promise<void>;
}

// server/services/ISecureApiKeyService.ts
export interface ISecureApiKeyService {
  initialize(): Promise<void>;
  getApiKey(): Promise<string | null>;
  storeApiKey(apiKey: string): Promise<void>;
  deleteApiKey(): Promise<void>;
  authenticateWithOAuth(): Promise<string | null>;
  getStoredCredentials(): Promise<StoredCredential | null>;
}

// server/services/IApiKeyService.ts
export interface IApiKeyService {
  generateKey(userId: string, name: string, scope: string): Promise<ApiKey>;
  getKeys(userId: string): Promise<ApiKey[]>;
  rotateKey(userId: string, keyId: string): Promise<ApiKey>;
  revokeKey(userId: string, keyId: string): Promise<void>;
  validateKey(token: string): Promise<boolean>;
}
```

#### 1.2 Refactor Existing REST Routes → Services

**Move CRUD logic from routes into services**:

```typescript
// server/services/MemoryService.ts
export class MemoryService implements IMemoryService {
  constructor(private db = db) {}

  async getMemories(userId: string): Promise<Memory[]> {
    // Move from /api/memories route
    return this.db.query.memories.findMany({
      where: eq(memories.userId, userId),
    });
  }

  async searchMemories(userId: string, query: string): Promise<Memory[]> {
    // Move from /api/memories/search route
    return this.db.query.memories.findMany({
      where: and(
        eq(memories.userId, userId),
        or(
          like(memories.title, `%${query}%`),
          like(memories.content, `%${query}%`),
        ),
      ),
    });
  }
  // ... other methods
}
```

**Update routes to use services**:

```typescript
// server/routes.ts (refactored)
const memoryService = new MemoryService();
const apiKeyService = new ApiKeyService();

export async function registerRoutes(app: Express): Promise<Server> {
  app.get('/api/memories', async (req: Request, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ error: 'Unauthorized' });

      const memories = await memoryService.getMemories(userId);
      res.json(memories);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch memories' });
    }
  });
  // ... route definitions remain thin, delegating to services
}
```

#### 1.3 Create SecureApiKeyService

```typescript
// server/services/SecureApiKeyService.ts
export class SecureApiKeyService implements ISecureApiKeyService {
  private apiKey: string | null = null;
  private storageKey = 'lanonasis.apiKey';

  constructor(
    private db = db,
    private config = {
      oauth: {
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        redirectUri: process.env.OAUTH_REDIRECT_URI,
      },
    }
  ) {}

  async initialize(): Promise<void> {
    // Load from SecretStorage or environment
    this.apiKey = process.env.LANONASIS_API_KEY || null;
  }

  async getApiKey(): Promise<string | null> {
    return this.apiKey;
  }

  async storeApiKey(apiKey: string): Promise<void> {
    this.apiKey = apiKey;
    // In production: store in VS Code SecretStorage or secure vault
  }

  async authenticateWithOAuth(): Promise<string | null> {
    // Implement OAuth2 PKCE flow
    // 1. Generate code verifier/challenge
    // 2. Build authorization URL
    // 3. Start callback server
    // 4. Exchange code for token
    // 5. Store token
  }

  async getStoredCredentials(): Promise<StoredCredential | null> {
    const credential = await this.db.query.oauth_credentials.findFirst({
      where: eq(oauth_credentials.credentialType, 'oauth'),
    });
    return credential || null;
  }
}
```

---

### Phase 2: Extension Bridge (Days 3-4)

**Goal**: Connect webview UI to backend services via message protocol

#### 2.1 Create Message Protocol

```typescript
// server/protocols/messages.ts
export type MessageType = 
  | 'memory:search'
  | 'memory:create'
  | 'memory:delete'
  | 'auth:login'
  | 'auth:logout'
  | 'keys:list'
  | 'keys:generate';

export interface Message<T = any> {
  id: string;
  type: MessageType;
  payload: T;
  timestamp: number;
}

export interface MessageResponse<T = any> {
  id: string;
  success: boolean;
  data?: T;
  error?: string;
}

// server/protocols/handlers.ts
export class MessageHandler {
  constructor(
    private memoryService: IMemoryService,
    private apiKeyService: IApiKeyService
  ) {}

  async handle(message: Message, userId: string): Promise<MessageResponse> {
    const { id, type, payload } = message;

    try {
      let data;
      switch (type) {
        case 'memory:search':
          data = await this.memoryService.searchMemories(
            userId,
            payload.query
          );
          break;
        case 'memory:create':
          data = await this.memoryService.createMemory(userId, payload);
          break;
        case 'keys:list':
          data = await this.apiKeyService.getKeys(userId);
          break;
        // ... more handlers
      }

      return { id, success: true, data };
    } catch (error) {
      return { id, success: false, error: (error as Error).message };
    }
  }
}
```

#### 2.2 Create PrototypeUIBridge

```typescript
// server/bridges/PrototypeUIBridge.ts
export class PrototypeUIBridge {
  constructor(
    private memoryService: IMemoryService,
    private apiKeyService: IApiKeyService,
    private authService: AuthService
  ) {}

  // Adapts backend services to UI component needs
  async getUIState(userId: string) {
    return {
      memories: await this.memoryService.getMemories(userId),
      apiKeys: await this.apiKeyService.getKeys(userId),
      isAuthenticated: true, // Check auth status
    };
  }

  async processUIAction(
    userId: string,
    action: string,
    payload: any
  ): Promise<any> {
    switch (action) {
      case 'search':
        return this.memoryService.searchMemories(userId, payload.query);
      case 'createMemory':
        return this.memoryService.createMemory(userId, payload);
      case 'generateKey':
        return this.apiKeyService.generateKey(
          userId,
          payload.name,
          payload.scope
        );
      default:
        throw new Error(`Unknown action: ${action}`);
    }
  }
}
```

---

### Phase 3: Extension Integration (Days 5-6)

**Goal**: Create VS Code extension infrastructure

#### 3.1 Create Extension Entry Point

```typescript
// vscode-extension/src/extension.ts
import * as vscode from 'vscode';
import { SecureApiKeyService } from './services/SecureApiKeyService';
import { MemoryService } from './services/MemoryService';
import { ApiKeyService } from './services/ApiKeyService';
import { MemorySidebarProvider } from './providers/MemorySidebarProvider';

export async function activate(context: vscode.ExtensionContext) {
  const outputChannel = vscode.window.createOutputChannel('LanOnasis');

  // Initialize services
  const secureApiKeyService = new SecureApiKeyService(context, outputChannel);
  await secureApiKeyService.initialize();

  const memoryService = new MemoryService(secureApiKeyService);
  const apiKeyService = new ApiKeyService(secureApiKeyService);

  // Register webview provider
  const sidebarProvider = new MemorySidebarProvider(
    context.extensionUri,
    memoryService,
    apiKeyService,
    secureApiKeyService
  );

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      MemorySidebarProvider.viewType,
      sidebarProvider
    )
  );

  // Register commands
  context.subscriptions.push(
    vscode.commands.registerCommand('lanonasis.authenticate', async () => {
      const token = await secureApiKeyService.authenticateWithOAuth();
      if (token) {
        vscode.window.showInformationMessage(
          'LanOnasis authenticated successfully!'
        );
      }
    })
  );
}
```

#### 3.2 Create Webview Message Handling

```typescript
// vscode-extension/src/providers/MemorySidebarProvider.ts
export class MemorySidebarProvider
  implements vscode.WebviewViewProvider
{
  public static readonly viewType = 'lanonasis.sidebar';

  private webviewView?: vscode.WebviewView;

  async resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this.webviewView = webviewView;

    // Setup webview
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this.getHtmlForWebview(webviewView.webview);

    // Handle messages from webview
    webviewView.webview.onDidReceiveMessage(async message => {
      const response = await this.handleWebviewMessage(message);
      webviewView.webview.postMessage(response);
    });
  }

  private async handleWebviewMessage(message: any) {
    const { id, type, payload } = message;

    try {
      let data;
      switch (type) {
        case 'memory:search':
          data = await this.memoryService.search(payload.query);
          break;
        case 'auth:login':
          data = await this.secureApiKeyService.authenticateWithOAuth();
          break;
        // ... more handlers
      }

      return { id, success: true, data };
    } catch (error) {
      return { id, success: false, error: (error as Error).message };
    }
  }

  private getHtmlForWebview(webview: vscode.Webview): string {
    // Return React app HTML bundled webview
  }
}
```

---

## Phase Breakdown

### Week 1: Foundation

| Day | Task | Files | Deliverable |
|-----|------|-------|-------------|
| 1 | Create service interfaces | `server/services/I*.ts` | Service contracts |
| 2 | Refactor routes → services | `server/services/*.ts` | Decoupled business logic |
| 2 | Create SecureApiKeyService | `server/services/SecureApiKeyService.ts` | Auth core |
| 3 | Create message protocol | `server/protocols/*.ts` | UI ↔ Backend bridge |
| 3 | Create PrototypeUIBridge | `server/bridges/*.ts` | Service adapter |
| 4 | WebSocket setup (optional) | `server/websocket.ts` | Real-time updates |

### Week 2: Extension

| Day | Task | Files | Deliverable |
|-----|------|-------|-------------|
| 5 | Extension entry point | `vscode-extension/src/extension.ts` | Activation flow |
| 5 | Webview provider | `vscode-extension/src/providers/*.ts` | UI integration |
| 6 | Message handlers | `vscode-extension/src/handlers/*.ts` | Event processing |
| 6 | Commands & keybindings | `vscode-extension/src/commands/*.ts` | User interactions |

---

## Integration Checklist

### ✅ Pre-Integration Requirements

- [ ] PostgreSQL database ready with enhanced schema
- [ ] REST API endpoints tested (`/api/memories`, `/api/keys`)
- [ ] React frontend components finalized (IDEPanel refactor)
- [ ] Environment variables configured
  - [ ] `OAUTH_CLIENT_ID`
  - [ ] `OAUTH_CLIENT_SECRET`
  - [ ] `OAUTH_REDIRECT_URI`
  - [ ] `DATABASE_URL`

### 🔧 Backend Setup

- [ ] Service layer created
  - [ ] `SecureApiKeyService` class with OAuth2
  - [ ] `MemoryService` with database queries
  - [ ] `ApiKeyService` with CRUD operations
  - [ ] `OAuthGatewayService` for token exchange
- [ ] Message protocol defined (`messages.ts`, `handlers.ts`)
- [ ] PrototypeUIBridge adapter created
- [ ] REST routes refactored to use services
- [ ] WebSocket support (optional, for real-time sync)

### 🎨 Frontend Integration

- [ ] Webview HTML template created
- [ ] Message sending from React components
- [ ] Message receiving & state updates
- [ ] Error handling & user feedback
- [ ] Authentication flow UI

### 🔐 Security

- [ ] OAuth2 PKCE implemented
- [ ] API key hashing (SHA-256)
- [ ] Secure credential storage
- [ ] Audit logging enabled
- [ ] Rate limiting on API routes
- [ ] CORS configured

### 📦 Extension Package

- [ ] `package.json` metadata complete
- [ ] VS Code extension schema (`contributes.*)
- [ ] Activation events configured
- [ ] Icon/branding assets included
- [ ] README with setup instructions

### 🧪 Testing

- [ ] Unit tests for services
- [ ] Integration tests for routes
- [ ] E2E tests for extension
- [ ] OAuth flow tested
- [ ] API key rotation tested
- [ ] Memory search tested

---

## Environment Configuration

### Required Environment Variables

```bash
# OAuth
OAUTH_CLIENT_ID=your_client_id
OAUTH_CLIENT_SECRET=your_client_secret
OAUTH_REDIRECT_URI=http://localhost:3000/auth/callback

# Database
DATABASE_URL=postgresql://...

# API
API_BASE_URL=http://localhost:5000
EXTENSION_API_KEY_PREFIX=sk_

# Security
JWT_SECRET=your_jwt_secret
ENCRYPTION_KEY=your_encryption_key (for storing tokens)

# Optional: AI Orchestrator
AI_ORCHESTRATOR_URL=https://api.lanonasis.com
VECTOR_DB_URL=https://vector.lanonasis.com
```

### VS Code Extension Settings

```json
{
  "contributes": {
    "configuration": {
      "title": "LanOnasis Memory",
      "properties": {
        "lanonasis.apiKey": {
          "type": "string",
          "description": "API key for LanOnasis Memory"
        },
        "lanonasis.useEnhancedUI": {
          "type": "boolean",
          "default": true,
          "description": "Use React-based UI (enhanced) or basic UI"
        },
        "lanonasis.enableVectorSearch": {
          "type": "boolean",
          "default": false,
          "description": "Enable semantic search with vectors"
        },
        "lanonasis.memorySync": {
          "type": "string",
          "enum": ["local", "cloud", "hybrid"],
          "default": "cloud",
          "description": "Memory synchronization mode"
        }
      }
    }
  }
}
```

---

## Next Steps

1. **Immediate (This Turn)**:
   - [ ] Review this setup plan with architecture team
   - [ ] Confirm Phase 1 approach
   - [ ] Set up database schema additions

2. **Next Turn**:
   - [ ] Implement service layer (Phase 1)
   - [ ] Refactor existing routes
   - [ ] Create SecureApiKeyService

3. **Future**:
   - [ ] Extension integration (Phase 2-3)
   - [ ] OAuth2 gateway setup
   - [ ] Real-time sync with WebSockets
   - [ ] Vector search integration

---

**Document Version**: 1.0  
**Last Reviewed**: November 27, 2025  
**Maintainer**: LanOnasis Backend Team
