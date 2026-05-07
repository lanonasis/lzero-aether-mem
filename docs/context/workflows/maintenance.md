# Maintenance & Update Procedures

## SDK Updates

`@lanonasis/mem-intel-sdk` is a critical dependency. When a new version is released:

1. **Review changelog** for breaking changes
2. **Update version** in root `package.json`
3. **Run typecheck**: `bun run typecheck`
4. **Build all packages**: `bun run build`
5. **Test integration points**:
   - Memory analysis in web dashboard
   - Pattern detection in VSCode extension
   - Duplicate detection in mobile PWA
6. **Update `packages/shared/src/types/index.ts`** if new types are introduced
7. **Update documentation** if API changes affect ADR-001

## Database Migrations

When modifying `shared/schema.ts`:

```bash
# Generate migration
npx drizzle-kit generate

# Review generated SQL in drizzle/migrations/

# Apply to dev database
npx drizzle-kit migrate

# Apply to production (after code review)
DATABASE_URL=$PROD_DB_URL npx drizzle-kit migrate
```

## Adding a New Package

When adding a new platform package (e.g., desktop app):

1. Create directory under `packages/`
2. Add to root `package.json` workspaces array
3. Add to `turbo.json` pipeline dependencies
4. Re-export SDK types in `packages/shared/src/types/index.ts` if needed
5. Build shared first: `bun run build:shared`
6. Add package-specific build script to root `package.json`

## Dependency Updates

```bash
# Check outdated packages
rtk bun outdated

# Update specific package
bun update react

# Update all (caution in monorepo)
bun update

# After update
bun run typecheck
bun run test
bun run build
```

## Context Documentation Updates

When codebase changes affect architectural decisions:

1. **Update relevant ADR** with a "Revision History" section
2. **Update component context** if file structure changes
3. **Update `project-overview.md`** if tech stack changes
4. **Update `context-engineering-progress.md`** with new findings

### When to Create New ADRs

Create a new ADR when:
- A new major dependency is introduced
- Build system changes significantly
- Authentication method changes
- Database schema has breaking changes
- A new platform package is added

## Performance Monitoring

### Build Performance

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| Full build time | < 2 min | > 5 min |
| Shared package build | < 10s | > 30s |
| Type check | < 30s | > 2 min |

Monitor with:
```bash
rtk bun run build
rtk bun run typecheck
```

### Runtime Performance

| Metric | Target | Notes |
|--------|--------|-------|
| Embedding generation | < 100ms | On ARM devices |
| Memory search | < 200ms | Local semantic search |
| API response | < 300ms | Server memory CRUD |
| App shell load | < 2s | PWA first paint |

## Security Maintenance

- Rotate API keys every 90 days (automated via `lastRotated` field)
- Review `core/security/compliance-manager.js` for regulation updates
- Keep `@lanonasis/mem-intel-sdk` updated for security patches
- Review OAuth scopes annually

## Cleanup Tasks

### Monthly
- Review and archive stale branches
- Check `bun outdated` for security updates
- Verify `_archive/` folder contents are still needed

### Quarterly
- Review ADRs for relevance; deprecate obsolete ones
- Audit environment variables in deployment platforms
- Test full build on clean environment (CI simulation)

### Annually
- Review tech stack for modern alternatives
- Update Node.js/Bun minimum versions if needed
- Refresh README and marketing docs from context docs
