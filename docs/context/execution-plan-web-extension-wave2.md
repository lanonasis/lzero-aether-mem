# Web Extension Wave 2 — Execution Plan

_Date: 2026-05-08 · Status: Ready to execute  
Branch: `main` (lzero-aether-mem)  
Handoff: `docs/context/handoff-web-extension-wave1.md`

---

## Context

Wave 1 landed all 6 code fixes (innerHTML → DOM, Rollup banner, message validation, `authToken` → `l0_auth_token`, `scripting` permission) and the SidePanel redesign (header avatar, inline settings, dismissible assistant response, unified input). Committed at `f8678b4`.

Wave 2 deliverables are explicitly defined in the handoff. No new scope.

---

## Phase 0 — Verify Clean State

```bash
cd /Users/onasis/dev-hub/projects/lzero-aether-mem

# Confirm we're on main, clean
rtk git status
# Expected: working tree clean

# Check current version
cat packages/web-extension/manifest.json | grep '"version"'
# Expected: "0.1.0"
```

---

## Phase 1 — Version Bump + Terser Config

### 1.1 Bump `manifest.json` → `0.2.0`

**File**: `packages/web-extension/manifest.json`

```diff
-  "version": "0.1.0",
+  "version": "0.2.0",
```

Also update `packages/web-extension/package.json` `"version"` to `"0.2.0"` for consistency.

### 1.2 Add Terser Console Drop

**File**: `packages/web-extension/vite.config.ts`

After line 87 (`build: {`), add:

```typescript
build: {
  minify: 'terser',
  terserOptions: {
    compress: {
      drop_console: true,
    },
  },
```

Full `build:` block should become:

```typescript
build: {
  outDir: 'dist',
  emptyOutDir: true,
  minify: 'terser',
  terserOptions: {
    compress: {
      drop_console: true,
    },
  },
  rollupOptions: {
    // ... existing input/output config unchanged ...
  },
},
```

**Note**: `terser` must be installed. Verify:
```bash
ls node_modules/terser 2>/dev/null && echo "installed" || echo "not found"
```

If not installed:
```bash
bun add -D terser
```

### 1.3 Build Verification

```bash
# Build for Chrome
bun run --cwd packages/web-extension build:chrome

# Verify no process. references survived (banner is fine)
grep -c "process\." packages/web-extension/dist/background/index.js 2>/dev/null || echo "0"
grep -c "process\." packages/web-extension/dist/content/index.js 2>/dev/null || echo "0"

# Verify no console.log survived
grep -c "console\.log" packages/web-extension/dist/assets/*.js 2>/dev/null | grep -v ":0" || echo "none found"

# Verify package size
du -sh packages/web-extension/dist/
```

Expected: 0 `process.` occurrences (banner polyfill line is fine), 0 `console.log` occurrences, dist < 10 MB.

---

## Phase 2 — Store Listing Assets

All non-code items from the handoff. These do not require code changes but must be produced/collected.

### 2.1 Privacy Policy

**Location**: `https://lanonasis.com/privacy` (to be hosted)

Draft already reviewed in Wave 1 session. Needs:
- Company name filled in
- Dashboard URL (`https://app.lanonasis.com` or similar)
- Support email filled in
- Date filled in

### 2.2 Fix 3 Justification Statement (for Chrome Web Store review)

> "The content script listens for user-initiated text selection saves (via keyboard shortcut or context menu). It never reads page content without explicit user action and transmits only the user's selected text when they choose to save it."

Print this text and keep it ready for the developer dashboard submission form.

### 2.3 Screenshots (minimum 1 at 1280×800)

Priority order:
1. **Side panel with memories** — open the extension, show a populated memory list with the filter bar and input
2. **Text selection → context menu → "Save to L0 Memory"** — show the content script in action
3. **Omnibox search** — show `l0` keyword search in Chrome omnibox
4. **Options page** — show the settings/API key page

### 2.4 Promotional Tile

**440×280 PNG** — Chrome Web Store search results tile.

Design direction: Dark background, L0 Memory logo/name, tagline "Your AI-powered second brain". Submit as PNG.

### 2.5 Short Description (≤132 chars)

Suggested (already drafted in handoff):
> `"Your AI-powered second brain for the browser. Save, search, and chat with your memory bank from any tab."`

Character count: 107 ✓

### 2.6 Long Description (≤16,384 chars)

Source: `docs/context/execution-plan-web-extension-publishing.md` §Store Description.
Copy the full draft from that file into the developer dashboard.

### 2.7 Developer Account

- Register at [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
- $5 one-time registration fee
- Enable 2FA on Google account
- Configure **Store Listing** tab with items from Phase 2.1–2.6

---

## Phase 3 — Package + (Optional) Test Upload

### 3.1 Package the Extension

```bash
bun run --cwd packages/web-extension package:chrome
# Output: packages/web-extension/lzero-memory-chrome.zip
```

Verify zip contents:
```bash
unzip -l packages/web-extension/lzero-memory-chrome.zip | head -20
# Expected: manifest.json at root, icon-NN.png files, assets/ directory
```

### 3.2 Developer Dashboard Upload (optional — verify listing works before public)

Upload the zip to the Chrome Web Store developer dashboard. This is the **test submission** path — can be used to validate the listing renders correctly before making public.

---

## Phase 4 — Commit Wave 2 Changes

```bash
rtk git add -A
rtk git commit -m "feat(web-extension): wave 2 — version bump, terser console drop, store assets"
```

---

## Acceptance Criteria

| Item | Check |
|------|-------|
| `manifest.json` version → `0.2.0` | `grep '"version"' manifest.json` → `"0.2.0"` |
| Terser `drop_console` in vite.config | Config present and build succeeds |
| `console.log` absent from dist bundles | `grep -r "console\.log" dist/` returns nothing |
| Privacy policy URL ready | Text finalized with company name + date |
| Fix 3 statement ready | Text printed/saved |
| At least 1 screenshot at 1280×800 | File exists |
| Promotional tile 440×280 PNG | File exists |
| Short description ≤132 chars | Char count verified |
| Long description ≤16384 chars | Char count verified |
| Developer account registered | 2FA enabled, $5 paid |
| `lzero-memory-chrome.zip` produced | File exists, < 10 MB, manifest at root |

---

## What Wave 3 Looks Like

**Backend-gated concierge chat** — depends on:
1. `POST /api/v1/concierge/chat` live (backend Phase 2)
2. `POST /api/v1/context` live (backend Phase 3)
3. `useMemoryConcierge()` hook wired to SidePanel streaming

Also: intelligence hook surfacing — `useIntelligence()` + `useMemoryCollectionHealth()` wired into SidePanel for tag suggestions and collection health display.

---

_Last updated: 2026-05-08 — Wave 2 plan written, ready for execution_