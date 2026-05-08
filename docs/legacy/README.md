# Legacy Documentation

This directory contains historical documents that have been superseded by the structured documentation in `../context/`.

## How to Use These Files

These files are kept for historical reference only. **Do not update them.** For current project state, refer to `../context/`.

## File Index

| File | Date (approx.) | Description |
|------|---------------|-------------|
| `alignment-plan.md` | Jan 2026 | Mobile PWA ↔ Desktop alignment plan — superseded by current docs |
| `architecture-old.md` | Dec 2025 | Pre-docs/context architecture doc — superseded by `../context/architecture/system-design.md` |
| `api-url-guide.md` | Jan 2026 | API URL configuration guide — historical |
| `backend-setup-plan.md` | Nov 2025 | Backend services setup plan — historical |
| `changes-made-migration.md` | Dec 2025 | Migration changelog for SDK migration — historical |
| `demo-fixes-applied.md` | Dec 2025 | Demo submission fixes — not current |
| `deployment-old.md` | Dec 2025 | Deployment guide — superseded by `../context/workflows/deployment.md` |
| `implementation-roadmap.md` | Dec 2025 | SDK implementation roadmap — historical |
| `migration-decision.md` | Dec 2025 | Migration decision record — historical |
| `quick-demo-guide.md` | Dec 2025 | Demo guide for a specific submission — not current |
| `readme-new-old.md` | Dec 2025 | Older README version — superseded by root `README.md` |
| `replit-config.md` | 2025 | Replit-specific config — not relevant to general dev |
| `sdk-integration-examples.ts` | Dec 2025 | SDK code examples — superseded by current SDK docs |
| `sdk-migration-guide.md` | Dec 2025 | SDK migration guide — historical |
| `setup-checklist.md` | Nov 2025 | Backend setup checklist — superseded by current docs |
| `turborepo-setup.md` | Dec 2025 | Turborepo setup guide — historical |

## Why These Were Moved

The root directory was cluttered with 16 stale/historical files. They were moved here to:

1. Keep the root directory clean and navigable
2. Preserve git history for all file content
3. Clearly distinguish "current docs" (`../context/`) from "historical reference" (`../legacy/`)

## Current Documentation Structure

```
docs/
├── context/          # Current authoritative docs (read this)
│   ├── components/   # Component-specific context
│   ├── workflows/    # Dev, deploy, test, env, maintenance
│   ├── architecture/ # ADRs and system design
│   └── *.md          # Progress tracker, project overview
├── legacy/           # This folder — historical only
└── plans/            # Implementation plans (active)
```

_Last updated: 2026-05-08 by LANA_