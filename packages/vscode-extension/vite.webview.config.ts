import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { existsSync } from 'fs';
import path from 'path';

function resolvePackageRoot(packageName: string): string {
  const packageSegments = packageName.split('/');
  let currentDir = __dirname;

  while (true) {
    const candidate = path.join(currentDir, 'node_modules', ...packageSegments);

    if (existsSync(path.join(candidate, 'package.json'))) {
      return candidate;
    }

    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) {
      break;
    }

    currentDir = parentDir;
  }

  throw new Error(`Unable to resolve ${packageName} from ${__dirname}`);
}

const memoryClientDist = path.join(resolvePackageRoot('@lanonasis/memory-client'), 'dist');

// Vite build dedicated to the VS Code webview bundle.
// It reuses the main client's IDEPanel and Tailwind/theme setup.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  css: {
    postcss: './postcss.config.js',
  },
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
      external: [],
      output: {
        // Runtime polyfill injected before all bundle code.
        // Handles any process.* references that survive Rollup's define replacement
        // (e.g. CJS module conditionals that Rollup doesn't statically fold).
        // VS Code webviews do NOT provide process — Windsurf does, which masked this bug.
        banner: [
          'var process = typeof process !== "undefined" ? process : {',
          '  env: { NODE_ENV: "production", VSCODE_WEBVIEW: "true" },',
          '  platform: "browser",',
          '  version: "",',
          '  versions: {},',
          '  browser: true,',
          '  nextTick: function(cb) { return setTimeout(cb, 0); }',
          '};',
        ].join('\n'),
      },
    },
  },
  define: {
    // Most-specific match first — replaces React CJS dev/prod splits at compile time.
    // Order matters: longer keys must precede shorter prefix keys.
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env': JSON.stringify({
      NODE_ENV: 'production',
      VSCODE_WEBVIEW: 'true',
    }),
    'process.platform': JSON.stringify('browser'),
    'process.version': JSON.stringify(''),
    'process.versions': JSON.stringify({}),
    'process.browser': 'true',
  },
});
