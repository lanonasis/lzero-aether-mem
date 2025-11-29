/**
 * LanOnasis Design Tokens
 * Shared across Web, Mobile PWA, VS Code Extension, and Native Apps
 * 
 * Usage:
 * - Web/PWA: Use CSS variables via `theme.cssVars()`
 * - React Native: Use `theme.colors` directly
 * - Tailwind: Import `tailwindConfig` for theme extension
 */

// ============================================
// Color Palette - VS Code Inspired
// ============================================
export const colors = {
  // Primary brand colors
  brand: {
    primary: '#007ACC',      // VS Code blue
    secondary: '#0E639C',    // Darker blue
    accent: '#4EC9B0',       // Teal accent
  },

  // Background colors
  bg: {
    primary: '#0D0D0D',      // Main background
    secondary: '#1A1A1A',    // Card background
    elevated: '#252526',     // Elevated surfaces
    muted: '#2D2D2D',        // Muted background
    overlay: 'rgba(0, 0, 0, 0.6)',
  },

  // Text colors
  text: {
    primary: '#FFFFFF',
    secondary: '#CCCCCC',
    muted: '#888888',
    disabled: '#666666',
    accent: '#007ACC',
  },

  // Border colors
  border: {
    default: 'rgba(255, 255, 255, 0.1)',
    hover: 'rgba(255, 255, 255, 0.2)',
    active: '#007ACC',
  },

  // Status colors
  status: {
    success: '#4EC9B0',
    warning: '#DCDCAA',
    error: '#F14C4C',
    info: '#007ACC',
  },

  // Memory type colors (for badges/cards)
  memoryTypes: {
    code: { bg: 'rgba(0, 122, 204, 0.2)', border: 'rgba(0, 122, 204, 0.3)', text: '#007ACC' },
    docs: { bg: 'rgba(128, 0, 255, 0.2)', border: 'rgba(128, 0, 255, 0.3)', text: '#9B59B6' },
    todo: { bg: 'rgba(255, 193, 7, 0.2)', border: 'rgba(255, 193, 7, 0.3)', text: '#FFC107' },
    note: { bg: 'rgba(128, 128, 128, 0.2)', border: 'rgba(128, 128, 128, 0.3)', text: '#888888' },
    snippet: { bg: 'rgba(78, 201, 176, 0.2)', border: 'rgba(78, 201, 176, 0.3)', text: '#4EC9B0' },
    workflow: { bg: 'rgba(102, 102, 255, 0.2)', border: 'rgba(102, 102, 255, 0.3)', text: '#6666FF' },
    status: { bg: 'rgba(0, 200, 200, 0.2)', border: 'rgba(0, 200, 200, 0.3)', text: '#00C8C8' },
    idea: { bg: 'rgba(255, 105, 180, 0.2)', border: 'rgba(255, 105, 180, 0.3)', text: '#FF69B4' },
  },

  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #007ACC 0%, #0E639C 100%)',
    accent: 'linear-gradient(135deg, #4EC9B0 0%, #007ACC 100%)',
    purple: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
    glow: 'linear-gradient(135deg, rgba(0, 122, 204, 0.3) 0%, rgba(128, 0, 255, 0.3) 100%)',
  },
} as const;

// ============================================
// Spacing System (8px base)
// ============================================
export const spacing = {
  px: '1px',
  0: '0',
  0.5: '2px',
  1: '4px',
  1.5: '6px',
  2: '8px',
  2.5: '10px',
  3: '12px',
  3.5: '14px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  11: '44px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  24: '96px',
} as const;

// ============================================
// Typography
// ============================================
export const typography = {
  fontFamily: {
    sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: '"SF Mono", "Fira Code", "Menlo", monospace',
  },
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
    '7xl': '4.5rem',    // 72px
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
} as const;

// ============================================
// Border Radius
// ============================================
export const borderRadius = {
  none: '0',
  sm: '0.25rem',    // 4px
  default: '0.5rem', // 8px
  md: '0.75rem',    // 12px
  lg: '1rem',       // 16px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  full: '9999px',
} as const;

// ============================================
// Shadows
// ============================================
export const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
  default: '0 2px 4px rgba(0, 0, 0, 0.4)',
  md: '0 4px 8px rgba(0, 0, 0, 0.4)',
  lg: '0 8px 16px rgba(0, 0, 0, 0.4)',
  xl: '0 16px 32px rgba(0, 0, 0, 0.4)',
  glow: {
    primary: '0 0 20px rgba(0, 122, 204, 0.4)',
    accent: '0 0 20px rgba(78, 201, 176, 0.4)',
  },
} as const;

// ============================================
// Animation
// ============================================
export const animation = {
  durations: {
    fast: '150ms',
    normal: '250ms',
    slow: '400ms',
  },
  easings: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
} as const;

// ============================================
// Breakpoints (for responsive design)
// ============================================
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ============================================
// Z-Index Layers
// ============================================
export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modal: 40,
  popover: 50,
  tooltip: 60,
} as const;

// ============================================
// CSS Variables Generator
// ============================================
export function generateCssVariables(): Record<string, string> {
  return {
    // Brand
    '--color-brand-primary': colors.brand.primary,
    '--color-brand-secondary': colors.brand.secondary,
    '--color-brand-accent': colors.brand.accent,
    
    // Backgrounds
    '--color-bg-primary': colors.bg.primary,
    '--color-bg-secondary': colors.bg.secondary,
    '--color-bg-elevated': colors.bg.elevated,
    '--color-bg-muted': colors.bg.muted,
    
    // Text
    '--color-text-primary': colors.text.primary,
    '--color-text-secondary': colors.text.secondary,
    '--color-text-muted': colors.text.muted,
    
    // Status
    '--color-status-success': colors.status.success,
    '--color-status-warning': colors.status.warning,
    '--color-status-error': colors.status.error,
    '--color-status-info': colors.status.info,
    
    // Spacing
    '--spacing-1': spacing[1],
    '--spacing-2': spacing[2],
    '--spacing-3': spacing[3],
    '--spacing-4': spacing[4],
    '--spacing-6': spacing[6],
    '--spacing-8': spacing[8],
    
    // Border radius
    '--radius-sm': borderRadius.sm,
    '--radius-md': borderRadius.md,
    '--radius-lg': borderRadius.lg,
    '--radius-full': borderRadius.full,
  };
}

// ============================================
// Tailwind Config Extension
// ============================================
export const tailwindTheme = {
  colors: {
    brand: colors.brand,
    surface: colors.bg,
    foreground: colors.text,
    status: colors.status,
  },
  fontFamily: typography.fontFamily,
  borderRadius: borderRadius,
  boxShadow: shadows,
} as const;

// ============================================
// Theme Object (for runtime use)
// ============================================
export const theme = {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  animation,
  breakpoints,
  zIndex,
  cssVars: generateCssVariables,
  tailwind: tailwindTheme,
} as const;

export default theme;
