import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png', 'icons/*.png'],
      manifest: false, // We use our own manifest.json
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            // Cache AI model files aggressively
            urlPattern: /^https:\/\/(huggingface\.co|cdn-lfs\.huggingface\.co)\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'ai-models-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            // Network-first for API calls
            urlPattern: /^https:\/\/api\.lanonasis\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24, // 24 hours
              },
              networkTimeoutSeconds: 10,
            },
          },
          {
            // Stale-while-revalidate for images
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: true, // Enable SW in development for testing
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@lanonasis/shared': path.resolve(__dirname, '../shared/src'),
    },
  },
  optimizeDeps: {
    include: [
      '@xenova/transformers',
      '@xenova/transformers/dist/transformers.min.js',
    ],
    esbuildOptions: {
      target: 'esnext',
    },
  },
  esbuild: {
    target: 'esnext',
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          // Split transformers.js into its own chunk
          'ai-engine': ['@xenova/transformers'],
          // Split React ecosystem
          'react-vendor': ['react', 'react-dom', 'framer-motion'],
          // Split UI components
          'ui': ['@radix-ui/react-dialog', '@radix-ui/react-scroll-area', 'lucide-react'],
        },
      },
    },
  },
  server: {
    host: true,
    port: 5173,
    // Enable CORS for testing on mobile devices
    cors: true,
    headers: {
      // Required headers for SharedArrayBuffer (needed by some WASM)
      // Using 'credentialless' to allow external resources
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'credentialless',
    },
  },
});
