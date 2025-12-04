# Deployment Guide

## Vercel Deployment

### Quick Deploy

**Build Command:**
```bash
bun install && bun run build:shared && bun run build:web
```

**Output Directory:**
```
dist/public
```

**Install Command:**
```bash
bun install
```

### Environment Variables

Add these in Vercel Project Settings → Environment Variables:

```
VITE_API_URL=https://api.lanonasis.com/api/v1
VITE_API_KEY=lano_nmpidur33vcn2t8qh61iffy08ulyerd5
VITE_ORGANIZATION_ID=ba2c1b22-3c4d-4a5b-aca3-881995d863d5
```

### Manual Commands

```bash
# Install dependencies
bun install

# Build shared SDK first
bun run build:shared

# Build the web app
bun run build:web

# Output will be in: dist/public/
```

### Vercel CLI Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Project Structure

```
lzero-aether-mem/
├── client/              # Web app source
│   ├── src/
│   └── index.html
├── packages/
│   ├── shared/          # Shared SDK (must build first!)
│   ├── mobile-pwa/      # PWA (separate deployment)
│   └── vscode-extension/ # VS Code extension
├── vite.config.ts       # Root Vite config (builds client/)
├── vercel.json          # Vercel configuration
└── dist/public/         # Build output
```

### Important Notes

1. **Build Order Matters**: `shared` package must build before `web`
2. **Headers Required**: WASM/SharedArrayBuffer requires COOP/COEP headers (configured in vercel.json)
3. **SPA Routing**: All routes rewrite to `/index.html` for client-side routing
4. **Environment Variables**: All `VITE_*` variables must be set in Vercel dashboard

### Troubleshooting

**"Cannot find module '@lanonasis/shared'"**
- Solution: Run `bun run build:shared` first

**"turbo: command not found" or ":web not recognized"**
- Don't use `turbo run build:web`
- Use: `bun run build:web` (defined in root package.json)

**Vercel build fails on "vite build"**
- Check that `vercel.json` has correct `buildCommand`
- Ensure `outputDirectory` is set to `dist/public`

**App loads but API calls fail**
- Check environment variables are set in Vercel dashboard
- Verify `VITE_API_KEY` and `VITE_ORGANIZATION_ID` are correct

## Alternative: Manual Build & Deploy

```bash
# 1. Build locally
bun install
bun run build:shared
bun run build:web

# 2. Deploy dist/public/ to any static host
# - Netlify
# - Cloudflare Pages
# - AWS S3 + CloudFront
# - GitHub Pages

# 3. Set environment variables in your hosting platform
```

## PWA Deployment (Separate)

The mobile PWA is a separate app:

```bash
cd packages/mobile-pwa
bun install
bun run build
# Deploy dist/ to hosting platform
```
