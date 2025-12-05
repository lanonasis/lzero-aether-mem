import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// Path to the memory-client dist folder
const memoryClientDist = path.resolve(__dirname, 'node_modules/@lanonasis/memory-client/dist');

// Vite build dedicated to the VS Code webview bundle.
// It reuses the main client's IDEPanel and Tailwind/theme setup.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../../client/src'),
      '@lanonasis/shared': path.resolve(__dirname, '../shared/src'),
      // Stub out heavy AI module that doesn't work in webview context
      '@xenova/transformers': path.resolve(__dirname, 'src/webview/stubs/transformers.ts'),
      // Fix memory-client internal imports
      '@lanonasis/memory-client/react': path.join(memoryClientDist, 'react/index.js'),
      '@lanonasis/memory-client': path.join(memoryClientDist, 'index.esm.js'),
      // Resolve core imports from within the SDK
      '../core/client': path.join(memoryClientDist, 'core/index.js'),
      '../core/types': path.join(memoryClientDist, 'core/index.js'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/webview/main.tsx'),
      formats: ['es'],
      fileName: () => 'sidebar-react.js',
    },
    outDir: path.resolve(__dirname, 'media'),
    emptyOutDir: false,
    assetsDir: '.',
    cssCodeSplit: false,
    rollupOptions: {
      // Externalize problematic modules that don't work in webview
      external: [],
    },
  },
  define: {
    // Define process.env for browser compatibility
    'process.env': JSON.stringify({
      NODE_ENV: 'production',
      VSCODE_WEBVIEW: 'true',
    }),
    'process.platform': JSON.stringify('browser'),
    'process.version': JSON.stringify(''),
  },
});
