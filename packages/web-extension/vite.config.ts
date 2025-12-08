import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { copyFileSync, mkdirSync, existsSync } from 'fs';

// Copy manifest and icons after build
function copyExtensionFiles() {
  return {
    name: 'copy-extension-files',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      
      // Copy manifest
      copyFileSync(
        path.resolve(__dirname, 'manifest.json'),
        path.resolve(distDir, 'manifest.json')
      );
      
      // Copy icons
      const iconsDir = path.resolve(distDir, 'icons');
      if (!existsSync(iconsDir)) {
        mkdirSync(iconsDir, { recursive: true });
      }
      const srcIcons = path.resolve(__dirname, 'public/icons');
      if (existsSync(srcIcons)) {
        const icons = ['icon-16.png', 'icon-32.png', 'icon-48.png', 'icon-128.png'];
        icons.forEach(icon => {
          const src = path.resolve(srcIcons, icon);
          if (existsSync(src)) {
            copyFileSync(src, path.resolve(iconsDir, icon));
          }
        });
      }
      
      // Copy locales
      const localesDir = path.resolve(distDir, '_locales/en');
      if (!existsSync(localesDir)) {
        mkdirSync(localesDir, { recursive: true });
      }
      const srcLocales = path.resolve(__dirname, 'public/_locales/en/messages.json');
      if (existsSync(srcLocales)) {
        copyFileSync(srcLocales, path.resolve(localesDir, 'messages.json'));
      }
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    copyExtensionFiles(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@lanonasis/shared': path.resolve(__dirname, '../shared/src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup: path.resolve(__dirname, 'src/popup/index.html'),
        sidepanel: path.resolve(__dirname, 'src/sidepanel/index.html'),
        options: path.resolve(__dirname, 'src/options/index.html'),
        background: path.resolve(__dirname, 'src/background/index.ts'),
        content: path.resolve(__dirname, 'src/content/index.ts'),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'background' || chunkInfo.name === 'content') {
            return `${chunkInfo.name}/index.js`;
          }
          return 'assets/[name]-[hash].js';
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
  define: {
    'process.env': JSON.stringify({
      NODE_ENV: process.env.NODE_ENV || 'production',
    }),
  },
});
