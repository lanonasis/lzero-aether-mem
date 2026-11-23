#!/usr/bin/env node
// Package dist/ into a clean zip for the Chrome Web Store upload.
//
// Replaces the previous flow (`cd dist && zip -r ../lzero-memory-chrome.zip .`),
// which *appended* to an existing archive: every rebuild left the previous
// hashed bundles behind, so the shipped zip ended up with three different
// sidepanel-*.js files and leftovers from months earlier.
//
// Usage:
//   node scripts/package.js              # lzero-memory-chrome.zip
//   node scripts/package.js --out foo.zip

import { execFileSync } from 'node:child_process';
import { existsSync, rmSync, statSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const pkgDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = resolve(pkgDir, 'dist');
const outFlag = process.argv.indexOf('--out');
const outZip = resolve(pkgDir, outFlag > -1 ? process.argv[outFlag + 1] : 'lzero-memory-chrome.zip');

if (!existsSync(distDir)) {
  console.error('dist/ is missing — run `bun run build` first.');
  process.exit(1);
}

const manifest = JSON.parse(readFileSync(resolve(distDir, 'manifest.json'), 'utf8'));
for (const path of [manifest.background?.service_worker, manifest.side_panel?.default_path, manifest.options_ui?.page]) {
  if (path && !existsSync(resolve(distDir, path))) {
    console.error(`manifest points at a missing file: ${path}`);
    process.exit(1);
  }
}

// Start from scratch: no accumulating stale hashed bundles.
rmSync(outZip, { force: true });

// -X strips extra file attributes (keeps the zip reproducible), -r recurses,
// and `-x '*.DS_Store'` keeps macOS junk out of the store listing.
execFileSync('zip', ['-r', '-X', '-q', outZip, '.', '-x', '*.DS_Store', '-x', '__MACOSX/*'], {
  cwd: distDir,
  stdio: 'inherit',
});

const fileCount = execFileSync('unzip', ['-l', outZip], { encoding: 'utf8' })
  .split('\n')
  .filter((l) => /^\s+\d+\s+\d\d-\d\d-\d{4}/.test(l)).length;

const kb = (statSync(outZip).size / 1024).toFixed(0);
console.log(`✔ ${outZip}`);
console.log(`  ${fileCount} files, ${kb} KB, manifest v${manifest.version}`);
