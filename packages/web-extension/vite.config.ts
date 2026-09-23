import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { existsSync, readFileSync, writeFileSync } from 'fs';

// Use the project root directory
const _dir = import.meta.dirname;

// Fix relative paths in HTML files for browser extension
function fixHtmlPaths() {
  return {
    name: 'fix-html-paths',
    closeBundle() {
      const distDir = path.resolve(_dir, 'dist');
      const htmlDirs = ['src/popup', 'src/sidepanel', 'src/options', 'src/offscreen'];

      htmlDirs.forEach(dir => {
        const htmlPath = path.resolve(distDir, dir, 'index.html');
        if (existsSync(htmlPath)) {
          let content = readFileSync(htmlPath, 'utf-8');
          // Replace absolute paths with relative paths (go up 2 levels from src/popup to dist root)
          content = content.replace(/src="\/assets\//g, 'src="../../assets/');
          content = content.replace(/href="\/assets\//g, 'href="../../assets/');
          writeFileSync(htmlPath, content);
          console.log(`[fix-html-paths] Fixed: ${dir}/index.html`);
        }
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    fixHtmlPaths(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(_dir, 'src'),
      '@lanonasis/shared': path.resolve(_dir, '../shared/src'),
    },
  },
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    rollupOptions: {
      input: {
        popup: path.resolve(_dir, 'src/popup/index.html'),
        sidepanel: path.resolve(_dir, 'src/sidepanel/index.html'),
        options: path.resolve(_dir, 'src/options/index.html'),
        offscreen: path.resolve(_dir, 'src/offscreen/index.html'),
        background: path.resolve(_dir, 'src/background/index.ts'),
        content: path.resolve(_dir, 'src/content/index.ts'),
      },
      output: {
        banner: 'var process=typeof process!=="undefined"?process:{env:{NODE_ENV:"production"},platform:"browser",version:"",versions:{},browser:true,nextTick:function(cb){return setTimeout(cb,0)}};',
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'background' || chunkInfo.name === 'content') {
            return `${chunkInfo.name}/index.js`;
          }
          return 'assets/[name]-[hash].js';
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        manualChunks: (id) => {
          // Merge all React-containing code into the globals chunk to prevent
          // "Cannot read properties of null (reading 'useState')" caused by
          // multiple React instances (dispatcher lives on the first one).
          // Rolldown creates a separate "shared" chunk for @lanonasis/shared
          // components and UI primitives. Force them into globals instead.
          if (
            id.includes('node_modules/react') ||
            id.includes('packages/web-extension/src/components') ||
            id.includes('packages/shared/src/sdk')
          ) {
            return 'globals';
          }
        },
      },
    },
  },
  define: {
    // Most-specific first — eliminates React CJS dev/prod splits at compile time.
    // Same fix as packages/vscode-extension/vite.webview.config.ts.
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env': JSON.stringify({ NODE_ENV: 'production' }),
    'process.platform': JSON.stringify('browser'),
    'process.version': JSON.stringify(''),
  },
});
