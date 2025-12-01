import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// Vite build dedicated to the VS Code webview bundle.
// It reuses the main client's IDEPanel and Tailwind/theme setup.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../../client/src'),
      '@lanonasis/shared': path.resolve(__dirname, '../shared/src'),
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
  },
});
