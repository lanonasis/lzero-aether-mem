# Root Directory Reorganization Plan — lzero-aether-mem

**Date**: 2026-05-08
**Status**: Ready for execution
**Automated by**: LANA (subagent-driven development)

## Situation

The root directory has:
- **14 stale/historical markdown files** — superseded by `docs/context/`
- **9 tracked .vsix files** — binary artifacts that should not be in git
- **Duplicate content** — `AGENTS.md` == `CLAUDE.md` (identical, 133 lines each)
- **~2.4MB in `attached_assets/`** — screenshots, CPU profiles, pasted content

---

## Phase 1: Move Stale .md Files → `docs/legacy/`

### Files to Move (14 .md + 1 .ts)

| Root File | Destination | Reason |
|-----------|-------------|--------|
| `ARCHITECTURE.md` | `docs/legacy/architecture-old.md` | Superseded by `docs/context/architecture/system-design.md` |
| `DEPLOYMENT.md` | `docs/legacy/deployment-old.md` | Superseded by `docs/context/workflows/deployment.md` |
| `ALIGNMENT_PLAN.md` | `docs/legacy/alignment-plan.md` | Mobile PWA desktop alignment — superseded |
| `BACKEND_SETUP_PLAN.md` | `docs/legacy/backend-setup-plan.md` | Historical (707 lines) |
| `CHANGES_MADE.md` | `docs/legacy/changes-made-migration.md` | Migration log — historical (461 lines) |
| `MEM_INTEL_SDK_MIGRATION.md` | `docs/legacy/sdk-migration-guide.md` | Historical (394 lines) |
| `MIGRATION_DECISION.md` | `docs/legacy/migration-decision.md` | Historical decision record (363 lines) |
| `IMPLEMENTATION_ROADMAP.md` | `docs/legacy/implementation-roadmap.md` | Historical (452 lines) |
| `SETUP_CHECKLIST.md` | `docs/legacy/setup-checklist.md` | Partially in other docs |
| `TURBOREPO-SETUP.md` | `docs/legacy/turborepo-setup.md` | Historical (207 lines) |
| `QUICK_DEMO_GUIDE.md` | `docs/legacy/quick-demo-guide.md` | Submission demo — not current |
| `DEMO_FIXES_APPLIED.md` | `docs/legacy/demo-fixes-applied.md` | Demo fixes — not current |
| `README-NEW.md` | `docs/legacy/readme-new-old.md` | Older README version |
| `SDK_INTEGRATION_EXAMPLES.ts` | `docs/legacy/sdk-integration-examples.ts` | Code examples belong in docs, not root |

### Delete (not move)

| File | Reason |
|------|--------|
| `CLAUDE.md` | **Identical to `AGENTS.md`** — duplicate, RTK instructions only need one home |

---

## Phase 2: Remove Tracked .vsix Files (git only, keep local)

```bash
git rm --cached \
  packages/vscode-extension/lzero-memory-0.1.0.vsix \
  packages/vscode-extension/lzero-memory-0.1.1.vsix \
  packages/vscode-extension/lzero-memory-0.2.0.vsix \
  packages/vscode-extension/lzero-memory-0.3.0.vsix \
  packages/vscode-extension/lzero-memory-0.3.1.vsix \
  packages/vscode-extension/lzero-memory-0.4.1.vsix \
  packages/vscode-extension/lzero-memory-0.4.2.vsix \
  packages/vscode-extension/lzero-memory-0.4.3.vsix \
  packages/vscode-extension/lzero-memory-0.4.4.vsix
```

Note: `lzero-memory-0.4.6.vsix` (183KB, clean) is **NOT** removed.

---

## Phase 3: Additional Cleanup

| Action | Details |
|--------|---------|
| Move `.replit` | → `docs/legacy/replit-config.md` |
| Move `Documentation/API_URL_GUIDE.md` | → `docs/legacy/api-url-guide.md` |
| Untrack `attached_assets/` | `git rm --cached -r attached_assets/` (keep local) |
| Add `attached_assets/` to `.gitignore` | If not already present |
| Remove empty `Documentation/` | After moving `API_URL_GUIDE.md` |

---

## Phase 4: Create `docs/legacy/README.md` Index

Index file explaining the legacy folder, with a table of all moved files.

---

## Phase 5: Update Root README.md

Add a "Documentation" section noting:
- `docs/context/` — current project documentation
- `docs/legacy/` — superseded historical documents

---

## Commit Message

```
chore: reorganize root directory — move stale docs to docs/legacy/

- 14 stale .md + 1 .ts moved to docs/legacy/ (superseded by docs/context/)
- CLAUDE.md deleted (exact duplicate of AGENTS.md)
- 9 tracked .vsix files removed from git (git rm --cached, local files preserved)
- attached_assets/ untracked from git (keep local, add to .gitignore)
- Documentation/ directory cleaned up
- docs/legacy/README.md index created
- Root README.md updated with docs structure pointer
```

---

## Expected Result

**Before**: ~33 root files, 14 stale .md files
**After**: ~15 root files (config, essential docs, build files only)

**Git history**: Fully preserved — all file content unchanged in history.

---

## Files Kept at Root (not moved)

```
README.md              # Main project README
AGENTS.md              # RTK instructions (CLAUDE.md deleted as duplicate)
package.json           # Monorepo manifest
bun.lock               # Package lock
turbo.json             # Build pipeline config
tsconfig.json          # TypeScript config
vite.config.ts         # Vite config
vercel.json            # Vercel deployment
drizzle.config.ts      # DB migration config
components.json        # shadcn/ui config
postcss.config.js      # PostCSS
build.sh               # Build script
vitest.workspace.ts    # Test config
.gitignore             # Already correct
.env                   # Already correct
.env.production.example
```

_Last updated: 2026-05-08 by LANA_