# Mobile PWA ↔ Desktop Alignment Plan

## Current State Analysis

### Desktop (VS Code Extension) Architecture
```
client/src/packages/vscode-extension/
├── IDEPanel.tsx                 # Main container component
├── components/
│   ├── MemoryCard.tsx           # Re-export from variants
│   ├── SearchBar.tsx            # Search input component
│   ├── ChatInterface.tsx        # Chat UI component
│   ├── ApiKeyManager.tsx        # API key management
│   └── variants/
│       └── animated/
│           └── MemoryCard.tsx   # Actual implementation
├── hooks/
│   ├── useAuth.ts               # Authentication hook
│   ├── useMemories.ts           # Memory data hook
│   └── useApiKeys.ts            # API keys hook
├── context/
│   └── LanonasisContext.tsx     # Provider context
└── services/
    └── MemoryIntelligenceService.ts
```

**Key Desktop Patterns:**
- Clean separation of concerns (hooks, components, services)
- Uses `useAuth()` and `useMemories()` hooks for data
- `WelcomeView` component for unauthenticated state
- Collapsible sections for Assistant and Memories
- Memory cards with icon, title, tags, and copy functionality

### Mobile PWA Current Architecture
```
packages/mobile-pwa/src/
├── MobileApp.tsx                # 1,074 lines - EVERYTHING in one file
├── components/
│   ├── LanoLogo.tsx             # Only the logo
│   └── ui/                      # shadcn UI components
├── main.tsx                     # Entry point
└── index.css                    # Styles
```

**Current Mobile Issues:**
- All components defined inline in MobileApp.tsx (AIStatusBanner, SyncStatusBar, MobileMemoryCard, QuickCaptureSheet, AIChatSheet)
- Different authentication flow (no WelcomeView)
- Different memory type system (6 types vs 8 types on desktop)
- Bottom sheet patterns instead of collapsible sections
- Mobile-optimized but NOT aligned with desktop UX patterns

---

## Alignment Strategy

### Phase 1: Component Extraction
Extract inline components from MobileApp.tsx into separate files:

```
packages/mobile-pwa/src/
├── MobileApp.tsx                    # Slimmed-down main container
├── components/
│   ├── LanoLogo.tsx
│   ├── MemoryCard.tsx               # NEW - Align with desktop MemoryCard
│   ├── SearchBar.tsx                # NEW - Mobile-optimized SearchBar
│   ├── ChatInterface.tsx            # NEW - Mobile chat (replaces AIChatSheet)
│   ├── QuickCapture.tsx             # NEW - Extracted from QuickCaptureSheet
│   ├── AIStatusBanner.tsx           # NEW - Extracted AI status
│   ├── SyncStatusBar.tsx            # NEW - Extracted sync status
│   ├── WelcomeView.tsx              # NEW - Align with desktop WelcomeView
│   └── ui/                          # Existing shadcn components
├── hooks/
│   ├── useAuth.ts                   # NEW - Mirror desktop useAuth
│   └── useMemories.ts               # NEW - Mirror desktop useMemories
└── ...
```

### Phase 2: Hook Alignment
Create mobile versions of desktop hooks:

| Desktop Hook | Mobile Hook | Notes |
|--------------|-------------|-------|
| `useAuth()` | `useAuth()` | Same API, uses @lanonasis/shared |
| `useMemories()` | `useMemories()` | Same API, local + cloud sync |

### Phase 3: Component Alignment

#### MemoryCard Alignment
| Aspect | Desktop | Mobile (Current) | Mobile (Target) |
|--------|---------|------------------|-----------------|
| Container | `motion.div` with hover | `motion.div` with gradient | Keep mobile gradients |
| Icon | `LucideIcon` from memory | None | Add icon support |
| Title | line-clamp-1 | line-clamp-2 | line-clamp-2 |
| Copy button | Yes | Yes | Keep |
| Tags | Hash icon + tag name | Badge style | Combine both |
| Date | "MMM d" format | "MMM d" format | Same |
| Click | `onOpen` callback | `onSelect` callback | Standardize |

#### WelcomeView Alignment
| Feature | Desktop | Mobile (Target) |
|---------|---------|-----------------|
| Logo | L0Logo | LanoLogo (keep mobile) |
| Title | "Welcome to LanOnasis Memory" | Same |
| Subtitle | "Authenticate to access..." | Mobile-optimized text |
| Auth Options | OAuth + API Key | OAuth only (simpler) |
| Features List | Yes | Add features carousel |

### Phase 4: Layout Alignment

#### Desktop Layout (IDEPanel)
```
┌─────────────────────────────┐
│  Header (Logo + User Menu)  │
├─────────────────────────────┤
│                             │
│  ┌─────────────────────┐    │
│  │  Chat/Assistant     │    │
│  │  (Collapsible)      │    │
│  └─────────────────────┘    │
│                             │
│  ┌─────────────────────┐    │
│  │  Search Bar         │    │
│  └─────────────────────┘    │
│                             │
│  ┌─────────────────────┐    │
│  │  Memory List        │    │
│  │  (Scrollable)       │    │
│  └─────────────────────┘    │
│                             │
└─────────────────────────────┘
```

#### Mobile Layout (Target)
```
┌─────────────────────────────┐
│  Header (Logo + Actions)    │
├─────────────────────────────┤
│  AI Status Banner           │
├─────────────────────────────┤
│  Search Bar                 │
├─────────────────────────────┤
│                             │
│  Memory List                │
│  (Scrollable)               │
│                             │
│                             │
│                             │
├─────────────────────────────┤
│  [+ FAB Button]             │
├─────────────────────────────┤
│  [Home] [Chat] [Profile]    │
└─────────────────────────────┘
```

---

## Implementation Details

### Shared Types
Both desktop and mobile should use the same types from `@lanonasis/shared`:
- `Memory` interface
- `MemoryType` union
- Consistent date handling

### Styling Approach
- Desktop: Uses CSS variables (`var(--vscode-*)`)
- Mobile: Uses Tailwind with custom colors
- **Decision**: Keep mobile Tailwind approach but standardize color palette

### Memory Type Mapping
Desktop has 8 types, Mobile has 6. Standardize on desktop's 8 types:

| Desktop Type | Maps to Mobile |
|--------------|----------------|
| note | personal |
| docs | knowledge |
| code | project |
| todo | workflow |
| workflow | workflow |
| snippet | reference |
| idea | knowledge |
| status | context |

---

## Migration Steps

1. **Create mobile hooks** (`useAuth.ts`, `useMemories.ts`) that mirror desktop API
2. **Extract components** from MobileApp.tsx into separate files
3. **Create WelcomeView** component matching desktop pattern
4. **Update MobileApp.tsx** to use new structure
5. **Test** all flows: auth, search, create, edit, delete

## Success Criteria

- [ ] Mobile PWA file structure mirrors desktop pattern
- [ ] Components are in separate files, not inline
- [ ] Authentication flow matches desktop (WelcomeView)
- [ ] Memory card design is consistent
- [ ] Search functionality works the same
- [ ] All existing mobile features preserved (offline, AI, sync)
