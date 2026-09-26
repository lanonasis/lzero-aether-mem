# Chrome Web Store Listing — L0 Memory

## Short Description (≤132 chars)
Your AI-powered developer memory. Store, search, and recall context across all your tools.

## Detailed Description

L0 Memory is your personal AI-powered memory layer for software development. It captures, organizes, and retrieves everything that matters across your projects and workflows.

**Core Features:**
- **Memory Capture** — Save code snippets, architecture decisions, API patterns, and institutional knowledge with a single right-click or keyboard shortcut
- **Instant Recall** — Type `mem` in your Chrome address bar to search across all your memories in milliseconds
- **AI Concierge** — Ask questions about your codebase and get synthesized answers grounded in your own memory store
- **Offline-First Sync** — Works without internet; syncs when connected; queues changes locally
- **On-Device AI Ready** — Privacy-preserving embedding generation (feature-flagged, coming soon)

**Permissions Justification:**
- `storage` — Persist your memories and settings locally in the browser
- `contextMenus` — Right-click to save selected text as a memory
- `sidePanel` — Display the memory panel alongside your work
- `activeTab` — Access the current tab to save page context
- `alarms` — Schedule periodic background sync
- `offscreen` — Run AI embedding models in a hidden document
- `scripting` — Inject content scripts for enhanced page interactions
- `*://api.lanonasis.com/*` — Communicate with the L0 Memory backend API
- `*://auth.lanonasis.com/*` — Handle OAuth authentication
- `*://ai.vortexcore.app/*` — Route AI concierge queries through the Onasis AI Router

## Version History

### 0.2.0 (current)
- AI-powered memory concierge chat
- Omnibox (address bar) search with type `mem`
- Offline-first IndexedDB cache
- Chrome side panel UI
- Unsynced memory badge
- Context menu memory creation

### 0.1.0
- Initial release
- Basic memory CRUD
- Side panel search
