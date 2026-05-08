# 📱 Aether Memory - Mobile App

ARM-optimized mobile demo for the ARM AI Developer Challenge.

## 🚀 Quick Start

```bash
# Install dependencies (from root)
bun install

# Start Expo dev server
bun run dev:mobile-native

# Or from this directory
cd apps/mobile
bun run dev
```

## 📱 Running on Device

### iOS
```bash
bun run ios
```

### Android
```bash
bun run android
```

### Web (for testing)
```bash
bun run web
```

## 🎯 Features Demonstrated

- ⚡ **On-Device AI** - Simulated embedding generation
- 📴 **Offline First** - Local storage with sync queue
- 🔍 **Semantic Search** - Meaning-based memory retrieval
- 🎨 **Native UX** - Dark mode, gestures, animations

## 🏗️ Architecture

```
apps/mobile/
├── app/
│   ├── _layout.tsx      # Root layout with providers
│   ├── index.tsx        # Home screen
│   ├── memories.tsx     # Memory list
│   └── search.tsx       # Semantic search
├── app.json            # Expo config
└── package.json
```

## 🔧 Tech Stack

- **Expo Router** - File-based routing
- **React Native StyleSheet** - Native styling without monorepo Tailwind coupling
- **TanStack Query** - Data fetching & caching
- **TypeScript** - Type safety

## 📊 Performance Targets

| Device | Target Time |
|--------|-------------|
| iPhone 15 Pro | 45ms |
| Pixel 8 | 52ms |
| MacBook M3 | 28ms |

## 🎥 Demo Scenarios

1. **Offline Mode** - Enable airplane mode, create memories
2. **Semantic Search** - Search by meaning, not keywords
3. **Cross-Platform** - Same data across mobile/web/desktop

## 🔗 Integration

This app uses the shared package (`packages/shared`) for:
- Type definitions
- React hooks
- SDK client

Changes to shared code automatically reflect in the mobile app.
