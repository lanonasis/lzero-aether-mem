import * as esbuild from "esbuild";

const production = process.argv.includes("--production");
const watch = process.argv.includes("--watch");

/**
 * @type {import('esbuild').Plugin}
 */
const esbuildProblemMatcherPlugin = {
  name: "esbuild-problem-matcher",
  setup(build) {
    build.onStart(() => {
      console.log("[watch] build started");
    });
    build.onEnd((result) => {
      result.errors.forEach(({ text, location }) => {
        console.error(`✘ [ERROR] ${text}`);
        console.error(
          `    ${location.file}:${location.line}:${location.column}:`
        );
      });
      console.log("[watch] build finished");
    });
  },
};

// Base config shared between Node and Web builds
const baseConfig = {
  entryPoints: ["src/extension.ts"],
  bundle: true,
  minify: production,
  sourcemap: !production,
  sourcesContent: false,
  external: ["vscode"], // VS Code API is provided by the host
  logLevel: "info",
  plugins: [esbuildProblemMatcherPlugin],
};

// Node.js build for desktop VS Code
const nodeConfig = {
  ...baseConfig,
  format: "cjs",
  platform: "node",
  outfile: "out/extension.js",
  // Node-specific defines
  define: {
    "process.env.VSCODE_ENV": '"node"',
  },
};

// Browser build for VS Code Web (vscode.dev, github.dev)
const webConfig = {
  ...baseConfig,
  format: "cjs",
  platform: "browser",
  outfile: "out/extension.web.js",
  // Browser-specific settings
  define: {
    "process.env.VSCODE_ENV": '"web"',
    global: "globalThis",
  },
  // Polyfill Node.js globals for browser
  inject: [],
  // Don't bundle Node.js built-ins - they won't work in browser anyway
  // Our crypto.ts handles this with runtime detection
};

async function main() {
  // Build for Node.js (desktop)
  const nodeCtx = await esbuild.context(nodeConfig);

  // Build for Browser (web)
  const webCtx = await esbuild.context(webConfig);

  if (watch) {
    console.log("[watch] Watching both Node and Web builds...");
    await Promise.all([nodeCtx.watch(), webCtx.watch()]);
  } else {
    console.log("[build] Building for Node.js (desktop)...");
    await nodeCtx.rebuild();
    await nodeCtx.dispose();

    console.log("[build] Building for Browser (web)...");
    await webCtx.rebuild();
    await webCtx.dispose();

    console.log("[build] All builds completed!");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
