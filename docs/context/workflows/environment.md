# Environment Variables Reference

## Server / Backend

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | Yes | PostgreSQL connection string | `postgresql://user:pass@host/db` |
| `OAUTH_CLIENT_ID` | For OAuth | OAuth2 provider client ID | `clerk_client_xyz` |
| `OAUTH_CLIENT_SECRET` | For OAuth | OAuth2 provider secret | `secret_abc` |
| `OAUTH_REDIRECT_URI` | For OAuth | Callback URL | `http://localhost:3000/auth/callback` |
| `ENCRYPTION_KEY` | For OAuth | Key for encrypting stored tokens | `32-char-hex-string` |
| `NODE_ENV` | Recommended | `development` or `production` | `production` |

## Client / Web Dashboard

| Variable | Prefix | Required | Description | Example |
|----------|--------|----------|-------------|---------|
| `VITE_API_URL` | `VITE_` | Yes | Backend API base URL | `https://api.lanonasis.com/api/v1` |
| `VITE_API_KEY` | `VITE_` | Yes | API key for requests | `lano_nmpidur33vcn2t8qh61iffy08ulyerd5` |
| `VITE_ORGANIZATION_ID` | `VITE_` | Yes | Organization context | `ba2c1b22-3c4d-4a5b-aca3-881995d863d5` |

**Note**: Only variables prefixed with `VITE_` are exposed to client-side code. Standard `process.env` vars are NOT available in the browser.

## VSCode Extension

| Setting | Location | Description |
|-----------|----------|-------------|
| `lanonasis.apiUrl` | VSCode settings | Backend API URL |
| `lanonasis.apiKey` | VSCode settings | User API key |
| `lanonasis.organizationId` | VSCode settings | Organization ID |

## Mobile PWA

Mobile PWA uses the same `VITE_*` variables at build time. For runtime configuration, consider:
- A `/config.json` endpoint fetched on app load
- Or bake environment into build per deployment target

## Web Extension

Browser extensions typically store config in:
- `chrome.storage.local` / `browser.storage.local`
- Set via extension options page

## Development Defaults

Create `.env` at root for local development:

```bash
# Database
DATABASE_URL=postgresql://localhost:5432/aether_memory

# OAuth (optional for local dev)
OAUTH_CLIENT_ID=local_dev_client
OAUTH_CLIENT_SECRET=local_dev_secret
OAUTH_REDIRECT_URI=http://localhost:3000/auth/callback

# Client (Vite)
VITE_API_URL=http://localhost:5000/api/v1
VITE_API_KEY=dev_key_123
VITE_ORGANIZATION_ID=dev_org_123
```

**Never commit `.env` to Git.** The repo includes `.env.production.example` for reference.

## Production Deployment Checklist

- [ ] `DATABASE_URL` points to production PostgreSQL (with pgvector extension enabled)
- [ ] `VITE_API_URL` points to production API domain
- [ ] `VITE_API_KEY` is a valid production API key
- [ ] `ENCRYPTION_KEY` is a strong random 32-char hex string
- [ ] OAuth credentials match production redirect URI
- [ ] All secrets rotated from development values
