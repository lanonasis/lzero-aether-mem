Cross-platform memory management system spanning VS Code extension, Chrome web extension, and mobile PWA. Key integration points include shared SDK initialization [1b], VS Code extension activation [2a], web extension background service worker setup [4a], mobile app authentication flow [6b], and semantic search with AI embeddings [8c].

AI generated guide
VS Code Extension Activation & Memory Service Initialization
Motivation
VS Code extensions need a controlled initialization sequence to register their functionality with the editor. The LZero Aether Memory extension must:

Securely store API keys using VS Code's encrypted SecretStorage rather than plain text
Register chat commands so users can interact via @lanonasis.memory in the chat interface
Provide UI panels for memory management without cluttering the editor
Without proper activation, the extension's commands won't appear, the chat participant won't respond, and users can't access their memories.

Details
Activation Entry Point
VS Code calls the activate() function when the extension loads [1a]. This is the single entry point for all extension setup. The function receives an ExtensionContext object that provides access to VS Code's APIs for secrets, storage, and subscriptions.

Memory Service Initialization
The extension immediately instantiates a MemoryService [1b], passing the context for secure storage access. Inside the MemoryService constructor, a SecureApiKeyService is created [1c] using context.secrets, which provides encrypted storage that persists across VS Code sessions but never touches the filesystem in plain text.

This architecture ensures API keys are:

Never committed to version control
Encrypted at rest by VS Code's credential manager
Accessible only to this extension
Chat Participant Registration
The extension registers a chat participant with the identifier 'lanonasis.memory' [1d]. This makes the extension callable from VS Code's chat interface—users can type @lanonasis.memory store this thought and the extension's handler function will receive the message.

Command Registration
Finally, the extension registers commands like 'lanonasis.openMemoryPanel' [1e] by pushing them onto context.subscriptions. This array tracks disposable resources that VS Code will automatically clean up when the extension deactivates. The command opens a webview panel for browsing and managing memories through a React-based UI.

All registrations happen synchronously during activation to ensure the extension is fully functional before VS Code considers it loaded.

VS Code Extension Activation Flow
1a
Extension activation entry point
1b
Instantiate memory service
MemoryService constructor
1c
Initialize secure API key service
uses context.secrets
1d
Register chat participant
registers @lanonasis.memory
registerCommand() subscriptions
1e
Register webview panel command
creates webview panel

AI generated guide
Motivation
The VS Code extension needs to store user memories (notes, code snippets, context) from within the IDE's chat interface. When a developer types something like @lanonasis.memory save this function in VS Code's chat, the system must securely authenticate, transmit the data to a remote API, and persist it to a database—all while handling the extension's sandboxed environment constraints.

The core challenge: VS Code extensions run in a restricted context where sensitive data like API keys must be stored in encrypted storage, not plain configuration files. The chat participant acts as the user-facing entry point, but the actual storage logic must coordinate between the extension's secure key management, HTTP client, and the server's validation/persistence layers.

Details
Chat Participant Entry Point
The flow begins when the chat participant handler receives a user message [2a]. This is a VS Code API callback that fires when users interact with @lanonasis.memory in the chat interface. The handler immediately delegates to memoryService.storeMemory(), passing the user's input as a memory object.

Secure Authentication
Before making any API calls, the memory service must retrieve the user's API key [2b]. It calls apiKeyService.getApiKey(), which uses VS Code's SecretStorage API—an encrypted key-value store that persists across sessions but remains inaccessible to other extensions or the filesystem. This ensures API keys never appear in plaintext configuration files.

HTTP Request to Server
With the API key in hand, the service constructs an authenticated HTTP POST request [2c]. The fetch() call targets /api/memories with the memory content in the request body and the API key in the Authorization header. This crosses the boundary from the client-side extension into the server infrastructure.

Server-Side Validation
The server's Express route handler receives the POST request [2d]. Before touching the database, it validates the request body against a schema (typically using Zod or similar) to ensure required fields are present and types are correct. Malformed requests are rejected with a 400 error before any persistence occurs.

Database Persistence
After validation passes, the handler calls storage.createMemory() [2e] to write the memory to the database. This abstraction layer (likely using Drizzle ORM based on the project structure) handles the SQL insertion, auto-generates timestamps/IDs, and returns the created memory object back up the chain to confirm success.

The entire flow is asynchronous with proper error handling at each layer—if the API key is missing, the fetch fails, or validation rejects the data, the chat participant can display an appropriate error message to the user without crashing the extension.

VS Code Chat Participant → Memory Storage Flow
Chat participant handler receives message
2a
Store memory via service
Retrieve API key from SecretStorage
2b
Retrieve encrypted API key
HTTP POST to server
2c
POST to memories API endpoint
Server API Layer
2d
Server receives memory creation request
Validate request body
Persist to database
2e
Persist to database

AI generated guide
Motivation
The VS Code extension needs to display a rich UI panel for managing memories, but VS Code extensions run in a Node.js environment while modern UIs are built with React. The webview system solves this by embedding a sandboxed browser context inside VS Code where React can run, with message-passing between the extension host and the webview.

The core problem: when a user opens the memory panel, the webview must authenticate, fetch memories from the server, and render them — all while being isolated from the extension's Node.js context.

Details
Webview Initialization
The webview entry point [3a] creates a React root and mounts the application inside VS Code's webview container. This happens in an isolated JavaScript context that cannot directly access VS Code APIs or Node.js modules.

Data Fetching Architecture
The IDEPanel component uses a custom React hook pattern [3b] to manage memory fetching. The useMemories() hook encapsulates the API call logic, making a GET request [3c] to /api/memories through an API client that handles authentication headers.

Server Integration
The request hits an Express route handler [3d] on the backend server, which validates the user's authentication token and queries the database via storage.getMemories(). The server returns a JSON array of memory objects.

Rendering Strategy
Once the hook receives the data, React re-renders the component. The memories array is mapped [3e] to individual MemoryCard components, creating a grid of interactive cards that users can search, filter, and manage.

Key Design Decision
The architecture separates data fetching (hooks) from presentation (components), making the codebase testable and allowing the same UI components to be reused across the VS Code extension, web extension, and mobile PWA platforms.

VS Code Extension Webview Panel Memory Flow
Webview Entry Point (main.tsx)
3a
Initialize React root
<IDEPanel /> component
3b
Hook fetches memories
3c
API client GET request
HTTP GET request
Server Express Route
3d
Server handles GET memories
storage.getMemories()
Returns memory array
Render Phase
3e
Render memory cards

AI generated guide
Motivation
The Chrome web extension needs to initialize critical infrastructure when the user first installs or updates the extension. Without this setup, the extension cannot cache memories locally, provide right-click context menus, or sync data in the background. The browser provides a single lifecycle hook—chrome.runtime.onInstalled—to perform this one-time initialization [4a].

The core problem: Chrome extensions run in a service worker environment with no persistent state. Every time the service worker wakes up, it needs access to previously stored memories, but fetching from the server on every interaction would be too slow. The solution is an IndexedDB cache that persists locally in the browser.

Details
Cache Initialization
When the extension installs, it immediately calls initializeCache() [4b] to set up local storage. This opens an IndexedDB database named 'lanonasis-memories' [4c] with version 2, creating the schema if it doesn't exist.

The database creates an object store for memories with 'id' as the primary key, plus indexes on timestamp and tags for efficient querying. This allows the extension to search and filter memories without hitting the network.

Context Menu Registration
The setupContextMenus() function [4d] registers a "Save to Memory" option in the browser's right-click menu. This uses chrome.contextMenus.create() to add the menu item, which appears when users select text on any webpage. When clicked, it captures the selected text and stores it as a new memory.

Background Sync Scheduling
To keep the local cache fresh, initializeSync() creates a periodic alarm that fires every 15 minutes [4e]. Chrome's alarm API ensures this sync happens even when the extension isn't actively being used, pulling new memories from the server and pushing local changes.

All three initialization tasks—cache, context menus, and sync—must complete successfully before the service worker is considered ready to handle user interactions.

Chrome Extension Lifecycle
Extension Installation/Update Event
4a
Extension install listener
4b
Initialize IndexedDB cache
4c
Open IndexedDB connection
Create object stores
Setup indexes
4d
Register context menus
chrome.contextMenus.create()
initializeSync()
4e
Schedule periodic sync
Service Worker Activated
Background tasks ready

AI generated guide
Motivation
The Chrome extension needs to provide instant, intelligent search over a user's stored memories without sending every query to a server. Traditional keyword search fails when users remember concepts but not exact words. The solution: semantic search using AI embeddings that runs entirely in the browser, finding memories by meaning rather than exact text matches [5a].

Details
Architecture
The search system lives in the sidepanel UI (SidePanel.tsx) and uses a custom React hook useSemanticSearch() to manage state and orchestrate the search pipeline [5a]. When a user types a query [5b], the system:

Converts the query to a vector using the generateEmbedding() function [5c], which runs a lightweight transformer model (Xenova/all-MiniLM-L6-v2) via transformers.js [5d]
Retrieves cached memories from IndexedDB (populated by background sync)
Scores each memory using cosine similarity between the query vector and each memory's pre-computed embedding vector [5e]
Ranks results by similarity score and returns the top matches
Key Implementation Details
The embedding model runs client-side using @xenova/transformers, which means zero latency from network calls and complete privacy—queries never leave the browser [5d]. Each memory has its embedding pre-computed and cached, so search only needs to generate one embedding (the query) and perform vector math [5e].

The cosine similarity calculation [5e] is a simple dot product between normalized vectors, implemented in the shared embeddings.ts module. Higher scores (closer to 1.0) mean more semantically similar content.

Results are rendered immediately in the UI [5f], typically within 100-300ms for a typical query against hundreds of memories, providing a Google-like instant search experience entirely offline.

Web Extension Sidepanel Search Flow
SidePanel.tsx Component Mount
5a
Initialize semantic search hook
User types in search input
5b
Trigger search on user input
5c
Generate query embedding
embeddings.ts
5d
Run transformer model
Fetch cached memories
5e
Rank by cosine similarity
Score = dot(queryVec, memVec)
Sort by score descending
5f
Render ranked results
Display ranked memory cards

AI generated guide
Mobile PWA Authentication System
Motivation
The mobile PWA needs to maintain user sessions across app restarts without forcing users to log in every time they open the app. This is critical for a memory management tool where users expect instant access to their stored memories. The authentication system solves this by persisting auth tokens locally and validating them on startup, providing a seamless experience while maintaining security.

Details
App Initialization Flow
When the mobile PWA starts, the React app mounts at the entry point [6a] and immediately renders the MobileApp component. This component's first action is to initialize the useAuth hook [6b], which determines whether to show the login screen or the authenticated interface.

Session Restoration
The auth hook checks localStorage for a previously stored authentication token [6c]. If found, it validates the token with the server [6d] via a fetch call to /api/auth/validate. This server-side validation is essential—it prevents users from accessing the app with expired or revoked tokens.

Conditional UI Rendering
Based on the authentication state, the app renders one of two paths:

Unauthenticated users see the WelcomeView component [6e], which presents the login interface
Authenticated users proceed to the full app interface with access to their memories
This pattern ensures that authentication state drives the entire UI, preventing unauthorized access to memory data while providing instant access for valid sessions.

Key Design Decision
The system uses optimistic session restoration—it assumes the stored token is valid and only falls back to login if validation fails. This provides the fastest possible startup experience for returning users while maintaining security through server-side validation.

Mobile PWA: App Initialization & Authentication Flow
main.tsx entry point
6a
Mount React app
<MobileApp /> component
6b
Initialize auth hook
6c
Check local storage for token
getItem('auth_token')
6d
Validate token with server
fetch('/api/auth/validate')
Conditional rendering
if (!isAuthenticated)
6e
Show login screen if unauthenticated
else
<AuthenticatedApp />

AI generated guide
Mobile PWA Memory Creation Flow
Motivation
Users need a fast, mobile-friendly way to capture thoughts and information on the go. The mobile PWA provides a dedicated QuickCapture component that lets users create memories with minimal friction—just type content, optionally add tags and a type, then submit. The system uses optimistic UI updates to make the interface feel instant, even before the server confirms the save.

Details
Component Architecture
The MobileApp component renders the QuickCapture form component, which handles user input for creating new memories [7a]. When the user submits, the component calls createMemory() from the useMemories hook [7b], passing the content, type, and tags.

API Integration
The useMemories hook sends a POST request to /api/memories [7c], which hits the Express server's memory creation endpoint. The server validates the data and persists it to the database via storage.createMemory().

Optimistic Updates
The key UX optimization: immediately after calling the API, the hook updates local state with setMemories([newMemory, ...prev]) [7d] without waiting for the server response. This means the new memory appears in the UI instantly. React's state propagation causes MobileApp to re-render, and the memories.map() loop [7e] displays the new memory card at the top of the list.

If the server request fails, the hook can roll back the optimistic update—but in the happy path, users see their memory saved immediately with zero perceived latency.

File Locations
Form UI: packages/mobile-pwa/src/components/QuickCapture.tsx
Memory management hook: packages/mobile-pwa/src/hooks/useMemories.ts
Server endpoint: server/routes/memories.routes.ts
Main app component: packages/mobile-pwa/src/MobileApp.tsx
Mobile PWA: Creating a New Memory Flow
MobileApp component renders
QuickCapture component
User fills form (content, type, tags)
7a
User submits memory form
7b
Call create memory hook
useMemories hook
7c
POST to API endpoint
Server processes request
Database persistence
7d
Optimistic UI update
setMemories([new, ...prev])
State propagates to parent
MobileApp re-renders
7e
Render updated memory list
UI shows new memory

AI generated guide
Motivation
The shared SDK needs to enable semantic search across user memories—finding relevant content based on meaning rather than exact keyword matches. For example, searching "vacation plans" should surface memories about "trip to Hawaii" even though the words don't match. This requires converting text into mathematical vectors (embeddings) that capture semantic meaning, then comparing those vectors to find similar content.

The challenge: this must work offline-first across three platforms (VS Code extension, Chrome extension, mobile PWA) without requiring a server-side AI API. The solution uses Transformers.js [8a], which runs AI models directly in the browser/Node.js using WebAssembly.

Details
Model Initialization
The SDK lazy-loads the AI infrastructure on first use. It dynamically imports the @xenova/transformers library [8a] to avoid blocking app startup, then initializes the MiniLM-L6-v2 model [8b]—a lightweight sentence transformer optimized for semantic similarity. This 80MB model runs entirely client-side and produces 384-dimensional embedding vectors.

Embedding Generation
When text needs to be searched or indexed, the extractor function transforms it into a vector [8c]. The model processes the input text through multiple transformer layers, producing a dense numerical representation where semantically similar texts have similar vectors. This happens for both the search query and all stored memories.

Similarity Ranking
To find relevant memories, the SDK computes cosine similarity between the query embedding and each memory's embedding [8d]. The dot product calculation measures how aligned two vectors are—higher scores mean more semantic similarity. Results are sorted by score and the top-k matches are returned [8e], giving users the most relevant memories first.

This entire pipeline runs locally with no network calls, enabling instant semantic search even offline.

Shared SDK: Semantic Search Pipeline
AI Model Initialization
8a
Import transformers.js library
8b
Load embedding model
Text → Vector Conversion
8c
Generate embedding vector
Similarity Computation
8d
Calculate cosine similarity
Result Ranking & Filtering
8e
Return top-k results
