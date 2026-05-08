# Archived: VS Code Extension Build Artifacts

## Why This Exists

These artifacts were committed to `packages/vscode-extension/` during development but should NOT have been tracked in git. They are preserved here for historical reference only — they should NOT be used for any current or future build.

## Files Archived

| File | Size | Why Archived |
|------|------|-------------|
| `lzero-memory-0.4.3.vsix` | 4.3 MB | This was the VSIX that exposed the "bloat" issue in the v0.4.6 release audit. Contains `lzero-memory-0.4.3.tgz` inside, which was accidentally committed via commit `5fcd5cc`. It was meant to be excluded but `*.tgz` was missing from `.vscodeignore`. Preserved as evidence of the artifact hygiene issue. |

## What Was Wrong

1. `*.tgz` was missing from `packages/vscode-extension/.vscodeignore`
2. `media/**` was explicitly included via `!media/**`
3. A stale tgz was committed to git at `5fcd5cc` (then "deleted" in same commit, but not on main branch)
4. The `pr16` branch (`d4e46cc` + `d8f95d9`) had the correct fix but was never merged to main

## Correct Fix (applied to main after this archive)

1. `git rm --cached packages/vscode-extension/lzero-memory-0.4.3.vsix` (removes from git index)
2. Add `*.tgz` to `packages/vscode-extension/.vscodeignore`
3. Rebuild: `cd packages/vscode-extension && vsce package`
4. Expected clean VSIX size: ~700 KB

## See Also

- Audit report: `/tmp/lana_vscode_extension_audit_final.md`
- PR that fixed this (branch): `origin/pr16` — commits `d4e46cc`, `d8f95d9`
- Context engineering progress: `docs/context/context-engineering-progress.md`

## DO NOT

- Do NOT re-commit these artifacts to git
- Do NOT use these VSIX files for any deployment
- Do NOT extract or repurpose contents from these archives
