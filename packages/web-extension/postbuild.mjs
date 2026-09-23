/**
 * Post-build script: copy manifest, icons, and locales to dist/.
 *
 * This runs AFTER Vite's build completes, so the dist directory is guaranteed
 * to exist. Moving these operations out of the Vite plugin avoids issues with
 * `emptyOutDir` and Rolldown's plugin lifecycle.
 */
import { copyFileSync, mkdirSync, existsSync, readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';

const _dir = dirname(new URL(import.meta.url).pathname);
const distDir = resolve(_dir, 'dist');

// Copy manifest
copyFileSync(resolve(_dir, 'manifest.json'), resolve(distDir, 'manifest.json'));
console.log('[postbuild] Copied manifest.json');

// Copy icons
const iconsDir = resolve(distDir, 'icons');
if (!existsSync(iconsDir)) {
  mkdirSync(iconsDir, { recursive: true });
}
const srcIcons = resolve(_dir, 'public/icons');
if (existsSync(srcIcons)) {
  const icons = ['icon-16.png', 'icon-32.png', 'icon-48.png', 'icon-128.png'];
  icons.forEach(icon => {
    const src = resolve(srcIcons, icon);
    if (existsSync(src)) {
      copyFileSync(src, resolve(iconsDir, icon));
    }
  });
  console.log('[postbuild] Copied icons');
}

// Copy locales
const localesDir = resolve(distDir, '_locales/en');
if (!existsSync(localesDir)) {
  mkdirSync(localesDir, { recursive: true });
}
const srcLocales = resolve(_dir, 'public/_locales/en/messages.json');
if (existsSync(srcLocales)) {
  copyFileSync(srcLocales, resolve(localesDir, 'messages.json'));
  console.log('[postbuild] Copied locales');
}

console.log('[postbuild] Done');
