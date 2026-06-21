# ERRORS

## 2026-05-08 19:07 UTC - package-manager

**Context:** Installing `terser` as a dev dependency in `packages/web-extension`

**Signal:** `npm install -D terser` failed with:
```
npm error Cannot read properties of null (reading 'matches')
npm error A complete log of this running at: ~/.npm/_logs/2026-05-08T19_07_10_884Z-debug-0.log
```
`bun add -D terser` also timed out (30s) but actually completed.

**Resolution:** Use `bun` for package management in this workspace. npm has null-reference issues in this environment.

**Promoted:** skill — prefer `bun` over `npm` for all installs in this workspace.

---

## 2026-05-08 19:06 UTC - lint-noise

**Context:** Patching `vite.config.ts` to add terser minify config

**Signal:** Lint output showed TypeScript errors from `node_modules/.bun/vite@7.2.7/...` and other pre-existing issues in the workspace. These were not caused by the patch.

**Resolution:** Pre-existing lint errors in node_modules and workspace config files are noise; focus on errors in files being modified. The patch itself applied correctly and the build succeeded.

**Promoted:** none — expected behavior, no workflow change needed.