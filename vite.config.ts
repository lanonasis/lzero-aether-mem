import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
      "@lanonasis/shared": path.resolve(import.meta.dirname, "packages", "shared", "src"),
      "@lanonasis/oauth-client": path.resolve(
        import.meta.dirname,
        "client",
        "src",
        "lib",
        "oauth-client-browser.ts",
      ),
    },
  },
  css: {
    postcss: {
      plugins: [],
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    target: 'esnext',
  },
  // Required for @xenova/transformers WASM support
  optimizeDeps: {
    exclude: ['@xenova/transformers'],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
    // Headers required for SharedArrayBuffer (WASM threading)
    // Using 'credentialless' to allow external resources like Google Fonts
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'credentialless',
    },
  },
  worker: {
    format: 'es',
  },
});
