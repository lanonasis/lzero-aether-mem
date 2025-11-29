# Component Variants - Animated & Static

This folder contains reusable component variants with animated and static (non-animated) versions.

## Structure

```
variants/
├── animated/        # Framer-motion animated components
├── static/          # Non-animated components
├── index.ts         # Main export file
└── README.md        # This file
```

## Usage

### Default (Animated)
```tsx
import { MemoryCard } from '@/components/variants';

// Uses animated version
<MemoryCard memory={memory} />
```

### Explicit Animated Version
```tsx
import { Animated } from '@/components/variants';

<Animated.MemoryCard memory={memory} />
```

### Static (Non-animated)
```tsx
import { Static } from '@/components/variants';

// Uses static version for performance
<Static.MemoryCard memory={memory} />
```

## When to Use Each

- **Animated**: Default choice, provides smooth transitions and micro-interactions
- **Static**: Use when performance is critical or animations are distracting

## Adding New Component Variants

1. Create the animated version in `animated/ComponentName.tsx`
2. Create the static version in `static/ComponentName.tsx`
3. Add exports in both `animated/index.ts` and `static/index.ts`
4. Update the main `index.ts` to include the new component

Example:
```tsx
// animated/MyComponent.tsx
import { motion } from 'framer-motion';

export const MyComponent = ({ data }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    {/* ... */}
  </motion.div>
);

// static/MyComponent.tsx
export const MyComponent = ({ data }) => (
  <div>
    {/* ... */}
  </div>
);
```

## Benefits

- ✅ Consistent API across both versions
- ✅ Easy to switch between animated/static
- ✅ Performance optimization options
- ✅ Reusable across the application
- ✅ Clear separation of concerns
