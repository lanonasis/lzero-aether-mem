# Development Workflow

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- Bun 1.3.2 (install via `npm install -g bun` or `curl -fsSL https://bun.sh/install | bash`)
- PostgreSQL database (or use mock-storage for development)

### Installation

```bash
# Clone repository
git clone https://github.com/lanonasis/aether-memory.git
cd aether-memory

# Install all dependencies (monorepo)
bun install

# Verify SDK is present
ls node_modules/@lanonasis/mem-intel-sdk
```

## Development Commands

| Command | Purpose |
|---------|---------|
| `bun run dev` | Start all dev servers via Turbo |
| `bun run dev:web` | Web dashboard only (Vite, port 5000) |
| `bun run dev:mobile` | Mobile PWA only |
| `bun run dev:extension` | VSCode extension watch mode |
| `bun run dev:server` | Express API server (tsx watch) |
| `bun run dev:all` | Web + Mobile simultaneously |

## Building

| Command | Purpose |
|---------|---------|
| `bun run build` | Build all packages via Turbo |
| `bun run build:shared` | Build shared SDK first (REQUIRED before web/client) |
| `bun run build:web` | Build web dashboard |
| `bun run build:mobile` | Build mobile PWA |
| `bun run build:extension` | Build VSCode extension |

**Important**: Always run `bun run build:shared` before building the web app or any package that imports `packages/shared`.

## Testing

```bash
bun run test      # Run all package tests via Turbo
bun run lint      # Run linters
bun run typecheck # TypeScript type checking across all packages
```

## Code Organization

### Adding a New Memory Type

1. Update `shared/schema.ts` - Add enum value to `memories.type`
2. Update `packages/shared/src/types/index.ts` - Add to `MemoryType` if needed
3. Update UI components that render type badges/icons
4. Run `bun run typecheck` to verify

### Adding a New API Endpoint

1. Add route in the relevant `server/routes/` sub-router
2. Add storage method in `server/storage.ts` (and `mock-storage.ts`)
3. Update schema in `shared/schema.ts` if new data model
4. Add Zod validation using `drizzle-zod` schemas
5. Test with `bun run dev:server`

### Adding SDK Features

1. Check if `@lanonasis/mem-intel-sdk` already supports the feature
2. Update `packages/shared/src/types/index.ts` to re-export new types
3. Create wrapper hook in `client/src/hooks/` or `packages/shared/src/sdk/`
4. Update component props to accept new analysis results

## Git Workflow

```bash
# Feature branch
git checkout -b feature/my-feature

# Commit
rtk git add . && rtk git commit -m "feat: description"

# Push
rtk git push origin feature/my-feature
```

## Common Issues

### "Cannot find module '@lanonasis/shared'"
- Run `bun run build:shared` first
- Verify `packages/shared/package.json` has correct `exports`

### "turbo: command not found"
- Install dependencies: `bun install`
- Turbo is a devDependency at root

### Build fails with OOM
- Ensure `packages/context-intelligence-engine` is archived/removed
- Verify `@lanonasis/mem-intel-sdk` is installed (not local engine)
- Run `bun run clean` and `bun install` to reset

### TypeScript errors after SDK update
- Check `packages/shared/src/types/index.ts` re-exports match new SDK version
- Pin SDK version in `package.json` if breaking changes
