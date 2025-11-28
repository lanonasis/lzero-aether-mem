// Re-export both versions for flexible usage
export * as Animated from './animated';
export * as Static from './static';

// Default export uses animated version
export { MemoryCard } from './animated';
export type * from './animated/MemoryCard';
