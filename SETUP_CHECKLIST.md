# LanOnasis Backend Services - Setup Checklist

Quick reference for implementing backend services according to the documented architecture.

---

## Phase 1: Service Layer Foundation

### Step 1: Create Service Interfaces

**File**: `server/services/IMemoryService.ts`
```typescript
// Define the contract all memory services must follow
export interface IMemoryService {
  getMemories(userId: string): Promise<Memory[]>;
  searchMemories(userId: string, query: string): Promise<Memory[]>;
  createMemory(userId: string, data: InsertMemory): Promise<Memory>;
  updateMemory(userId: string, id: string, updates: Partial<Memory>): Promise<Memory>;
  deleteMemory(userId: string, id: string): Promise<void>;
  getMemoiesWithCache?(userId: string): Promise<Memory[]>;
}
```

**File**: `server/services/ISecureApiKeyService.ts`
```typescript
export interface ISecureApiKeyService {
  initialize(): Promise<void>;
  getApiKey(): Promise<string | null>;
  storeApiKey(apiKey: string): Promise<void>;
  deleteApiKey(): Promise<void>;
  authenticateWithOAuth(): Promise<string | null>;
  getStoredCredentials(): Promise<StoredCredential | null>;
  hasApiKey(): Promise<boolean>;
}
```

**File**: `server/services/IApiKeyService.ts`
```typescript
export interface IApiKeyService {
  generateKey(userId: string, name: string, scope: string): Promise<ApiKey>;
  getKeys(userId: string): Promise<ApiKey[]>;
  rotateKey(userId: string, keyId: string): Promise<ApiKey>;
  revokeKey(userId: string, keyId: string): Promise<void>;
  validateKey(token: string): Promise<{ valid: boolean; userId?: string }>;
}
```

### Step 2: Create Service Implementations

**File**: `server/services/MemoryService.ts`
- [ ] Implement `IMemoryService` interface
- [ ] Move logic from `/api/memories` routes
- [ ] Add caching layer (optional)
- [ ] Add vector embedding support (future)

**File**: `server/services/ApiKeyService.ts`
- [ ] Implement `IApiKeyService` interface
- [ ] Move logic from `/api/keys/*` routes
- [ ] Add validation middleware
- [ ] Add rotation logic

**File**: `server/services/SecureApiKeyService.ts`
- [ ] Implement `ISecureApiKeyService` interface
- [ ] Add OAuth2 PKCE support
- [ ] Add credential storage (environment or database)
- [ ] Add token encryption/hashing

### Step 3: Refactor Routes to Use Services

**File**: `server/routes.ts` (modify existing)
- [ ] Create service instances at top
- [ ] Replace inline logic with service calls
- [ ] Keep routes thin (< 20 lines each)
- [ ] Maintain same HTTP interface (backward compatible)

---

## Phase 2: Message Protocol & Bridge

### Step 4: Create Message Protocol

**File**: `server/protocols/messages.ts`
```typescript
export type MessageType = 
  | 'memory:search'
  | 'memory:create'
  | 'memory:update'
  | 'memory:delete'
  | 'auth:login'
  | 'auth:logout'
  | 'keys:list'
  | 'keys:generate'
  | 'keys:rotate'
  | 'keys:revoke';

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
```

### Step 5: Create Message Handlers

**File**: `server/protocols/handlers.ts`
```typescript
export class MessageHandler {
  constructor(
    private memoryService: IMemoryService,
    private apiKeyService: IApiKeyService
  ) {}

  async handle(message: Message, userId: string): Promise<MessageResponse> {
    // Route message to appropriate service
    // Return standardized response format
  }
}
```

### Step 6: Create UI Bridge

**File**: `server/bridges/PrototypeUIBridge.ts`
```typescript
export class PrototypeUIBridge {
  // Adapts services to UI component needs
  // Handles data transformation
  // Manages UI state coordination
}
```

---

## Phase 3: Database Schema Updates

### Step 7: Add OAuth Credentials Table

```typescript
// In shared/schema.ts, add:
export const oauth_credentials = pgTable('oauth_credentials', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id').references(() => users.id),
  credentialType: varchar('credential_type').notNull(),
  accessToken: varchar('access_token'),
  refreshToken: varchar('refresh_token'),
  tokenExpiresAt: timestamp('token_expires_at'),
  storedAt: timestamp('stored_at').defaultNow(),
});
```

### Step 8: Add Memory Cache Table (Optional)

```typescript
// In shared/schema.ts, add:
export const memory_cache = pgTable('memory_cache', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id').references(() => users.id),
  query: varchar('query').notNull(),
  results: text('results'), // JSON
  cachedAt: timestamp('cached_at').defaultNow(),
  expiresAt: timestamp('expires_at'),
});
```

### Step 9: Add Audit Log Table (Optional)

```typescript
// In shared/schema.ts, add:
export const audit_logs = pgTable('audit_logs', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id').references(() => users.id),
  action: varchar('action').notNull(),
  entityType: varchar('entity_type').notNull(),
  entityId: varchar('entity_id').notNull(),
  timestamp: timestamp('timestamp').defaultNow(),
});
```

**Then run**: `npm run db:push`

---

## Phase 4: Extension Integration

### Step 10: Create Extension Entry Point

**File**: `vscode-extension/src/extension.ts`
- [ ] Import services
- [ ] Initialize services on activation
- [ ] Register webview provider
- [ ] Register commands
- [ ] Set context variables

### Step 11: Create Webview Provider

**File**: `vscode-extension/src/providers/MemorySidebarProvider.ts`
- [ ] Implement `vscode.WebviewViewProvider`
- [ ] Setup message passing
- [ ] Handle webview lifecycle
- [ ] Render React component

### Step 12: Setup Message Passing

**File**: `vscode-extension/src/handlers/messageHandler.ts`
- [ ] Receive messages from webview
- [ ] Route to appropriate service
- [ ] Send response back to webview
- [ ] Handle errors gracefully

---

## Configuration & Security

### Step 13: Setup Environment Variables

Create `.env` file with:
```
# OAuth
OAUTH_CLIENT_ID=...
OAUTH_CLIENT_SECRET=...
OAUTH_REDIRECT_URI=http://localhost:3000/auth/callback

# Database
DATABASE_URL=postgresql://...

# API
API_BASE_URL=http://localhost:5000

# Security
ENCRYPTION_KEY=... (for storing OAuth tokens)
```

### Step 14: Implement Security

- [ ] API key hashing (SHA-256)
- [ ] OAuth2 PKCE flow
- [ ] Secure credential storage
- [ ] Rate limiting
- [ ] Input validation
- [ ] CORS configuration

---

## Testing

### Step 15: Unit Tests

- [ ] `MemoryService.test.ts`
- [ ] `ApiKeyService.test.ts`
- [ ] `SecureApiKeyService.test.ts`
- [ ] `MessageHandler.test.ts`

### Step 16: Integration Tests

- [ ] REST API routes
- [ ] Database operations
- [ ] Service interactions
- [ ] Message protocol

### Step 17: E2E Tests

- [ ] Extension activation
- [ ] OAuth flow
- [ ] Memory operations
- [ ] API key management

---

## Deployment

### Step 18: Build & Package

- [ ] Extension builds successfully
- [ ] No TypeScript errors
- [ ] All dependencies resolved
- [ ] Bundle size acceptable

### Step 19: Publish

- [ ] Package to .vsix
- [ ] Publish to VS Code Marketplace
- [ ] Create GitHub release
- [ ] Update documentation

---

## Quick Links

- **Setup Plan**: See `BACKEND_SETUP_PLAN.md`
- **Architecture Doc**: See attached documentation file
- **Current Code**: `server/routes.ts`, `shared/schema.ts`
- **Frontend**: `client/src/packages/vscode-extension/`

---

**Status**: Ready for Phase 1 Implementation  
**Estimated Time**: 2-3 weeks  
**Priority**: Backend services foundation critical for extension integration
