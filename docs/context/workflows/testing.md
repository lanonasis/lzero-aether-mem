# Testing Strategy

## Overview

The project uses a layered testing approach: unit tests for shared utilities, integration tests for API routes, and manual testing for platform-specific packages (VSCode extension, browser extension, mobile PWA).

## Test Infrastructure

- **Runner**: Vitest 4 (configured at root and in `packages/shared`)
- **Coverage**: `@vitest/coverage-v8`
- **Workspace config**: `vitest.workspace.ts` at root
- **Command**: `bun run test`

## Unit Tests

### Shared Package (`packages/shared`)

| Test File | What It Tests |
|-----------|--------------|
| `packages/shared/src/__tests__/*.test.ts` | Type utilities, AI engine helpers, SDK wrappers |

Run:
```bash
cd packages/shared && bun test
# or from root: bun run test --filter=@lanonasis/shared
```

### Server Utilities

| Area | Suggested Test File | Status |
|------|---------------------|--------|
| Storage layer | `server/__tests__/storage.test.ts` | Not yet created |
| Route handlers | `server/__tests__/routes.test.ts` | Not yet created |
| Schema validation | `shared/__tests__/schema.test.ts` | Not yet created |

### Core Module

| Area | Suggested Test File | Status |
|------|---------------------|--------|
| Compliance manager | `core/__tests__/compliance-manager.test.ts` | Not yet created |
| Version manager | `core/__tests__/version-manager.test.ts` | Not yet created |

## Integration Tests

### API Endpoints

Test the Express server with a test database or `mock-storage.ts`:

```typescript
// Suggested approach
import { createApp } from "../server/index";
import request from "supertest";

const app = createApp({ storage: mockStorage });

describe("/api/memories", () => {
  it("creates a memory", async () => {
    const res = await request(app)
      .post("/api/memories")
      .set("Authorization", "Bearer test-token")
      .send({ title: "Test", content: "Body", type: "docs" });
    expect(res.status).toBe(201);
  });
});
```

### Cross-Package Integration

Verify that `packages/shared` builds and its exports are importable by all consumers:

```bash
bun run build:shared
bun run typecheck
```

## E2E / Manual Testing

### Web Dashboard

```bash
bun run dev:web
# Manual checks:
# 1. Create memory
# 2. Search memories (semantic)
# 3. Update memory
# 4. Delete memory
# 5. Check offline indicator (throttle network)
```

### Mobile PWA

```bash
bun run dev:mobile
# Test on:
# - iOS Safari (real device or simulator)
# - Android Chrome
# - Desktop mobile viewport
# - Offline mode (airplane mode)
```

### VSCode Extension

```bash
bun run build:extension
# In VSCode:
# 1. Run "Extension Development Host"
# 2. Open memory sidebar
# 3. Create memory from selection
# 4. Test commands
```

### Web Extension

```bash
# Build and load unpacked in Chrome
# 1. Visit a webpage
# 2. Open extension popup
# 3. Analyze page content
# 4. Save as memory
```

## Test Checklist Before Releases

- [ ] `bun run test` passes in all packages
- [ ] `bun run typecheck` has zero errors
- [ ] `bun run lint` has zero warnings
- [ ] `bun run build` completes without OOM
- [ ] Web dashboard: memory CRUD works
- [ ] Mobile PWA: offline creation + sync works
- [ ] VSCode extension: activation + commands work
- [ ] Web extension: popup + content analysis works
- [ ] Semantic search returns relevant results
- [ ] SDK pattern detection shows insights
