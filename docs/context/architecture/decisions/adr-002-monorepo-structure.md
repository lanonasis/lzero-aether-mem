# ADR-002: Monorepo with Turbo + Bun Workspaces

Status: Accepted | Date: 2025-12-19

## Context

The project targets four distinct platforms (web dashboard, VSCode extension, mobile PWA, browser extension) plus a shared SDK and backend server. Each platform has different build outputs, dependency needs, and runtime environments. A unified build and dependency management system is required.

## Decision

Use a monorepo structure managed by Bun workspaces with Turbo as the build pipeline orchestrator.

## Alternatives Considered

1. **Separate repositories** - Rejected: Would make shared code (types, AI engine, utilities) difficult to keep in sync across platforms.
2. **npm workspaces + Lerna** - Rejected: Turbo provides superior caching and task parallelism. Bun is faster than npm for install and script execution.
3. **pnpm workspaces** - Rejected: Project already uses Bun as package manager; staying within one ecosystem reduces complexity.
4. **Bun workspaces + Turbo** - Accepted: Fast installs, fast builds, integrated caching, and native TypeScript support.

## Consequences

**Positive:**
- Single `bun install` installs all dependencies across packages
- Turbo caches build outputs, skipping unchanged packages
- Shared code in `packages/shared/` is importable by all consumers
- Consistent tooling versions (TypeScript, Vite, etc.) at root level

**Negative:**
- Root `package.json` is large (many dependencies for all platforms)
- Build failure in one package can block others if not filtered correctly
- Requires understanding of Turbo pipeline configuration (`turbo.json`)

## Package Structure

| Package | Path | Build Target |
|---------|------|-------------|
| Root | `./` | Vite (client), Express (server) |
| Shared SDK | `packages/shared/` | TypeScript library |
| Mobile PWA | `packages/mobile-pwa/` | Vite PWA |
| VSCode Ext | `packages/vscode-extension/` | VSCode extension bundle |
| Web Ext | `packages/web-extension/` | Browser extension bundle |

## Build Commands

```bash
bun run build          # Turbo builds all packages
bun run build:shared   # Build shared SDK first
bun run build:web      # Build web dashboard
bun run build:mobile   # Build mobile PWA
bun run build:extension # Build VSCode extension
```
