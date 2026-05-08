# Deployment Workflow

## Web Dashboard (Vercel)

### Automated Deploy (Recommended)

1. Connect GitHub repo to Vercel
2. Set build command: `bun run build:shared && bun run build:web`
3. Set output directory: `dist/public`
4. Install command: `bun install`
5. Add environment variables in Vercel dashboard:
   - `VITE_API_URL`
   - `VITE_API_KEY`
   - `VITE_ORGANIZATION_ID`

### Manual Deploy (Vercel CLI)

```bash
# Install CLI
npm i -g vercel

# Build locally
bun install
bun run build:shared
bun run build:web

# Deploy
vercel --prod
```

### Alternative Static Hosts

Build output in `dist/public/` can be deployed to:
- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront
- GitHub Pages

## Mobile PWA

```bash
cd packages/mobile-pwa
bun install
bun run build
# Deploy `dist/` folder to any static host
```

Users install via "Add to Home Screen" in Safari/Chrome.

## VSCode Extension

```bash
# Build
bun run build:extension

# Package manually (if needed outside CI)
cd packages/vscode-extension
# Use vsce or similar to package

# Install locally
code --install-extension packages/vscode-extension/lanonasis-memory-*.vsix
```

## Web Extension

```bash
# Build
bun run build

# Load unpacked in Chrome/Edge:
# 1. Open chrome://extensions
# 2. Enable Developer Mode
# 3. Click "Load unpacked"
# 4. Select `packages/web-extension/dist/`
```

## Backend API

The Express server can be deployed to:
- Vercel (serverless functions)
- Railway / Render / Fly.io (Node.js container)
- Self-hosted VPS

### Environment Variables Required

```
DATABASE_URL=postgresql://...
OAUTH_CLIENT_ID=...
OAUTH_CLIENT_SECRET=...
OAUTH_REDIRECT_URI=http://localhost:3000/auth/callback
ENCRYPTION_KEY=... (for OAuth token storage)
```

### Database Setup

```bash
# Push schema to database
npx drizzle-kit push

# Or generate and run migrations
npx drizzle-kit generate
npx drizzle-kit migrate
```

## Vercel Configuration (`vercel.json`)

```json
{
  "buildCommand": "bun run build:shared && bun run build:web",
  "outputDirectory": "dist/public",
  "installCommand": "bun install",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Cross-Origin-Opener-Policy", "value": "same-origin" },
        { "key": "Cross-Origin-Embedder-Policy", "value": "require-corp" }
      ]
    }
  ],
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**Critical headers**: COOP/COEP are required for WASM/SharedArrayBuffer (ONNX Runtime needs these).

## Pre-Deploy Checklist

- [ ] `bun run build` passes without errors
- [ ] `bun run typecheck` has zero errors
- [ ] `bun run test` passes
- [ ] Environment variables set in hosting platform
- [ ] Database schema pushed (`drizzle-kit push`)
- [ ] `packages/shared` built before dependent packages
- [ ] Vercel headers include COOP/COEP (for web deployment)
