#!/usr/bin/env node
// Minimal CDP client for the L0 Memory side panel.
//
// Requires a debuggable Chrome with the extension loaded:
//   packages/web-extension/scripts/dev-chrome.sh --open
//
// Commands:
//   node scripts/l0-cdp.mjs probe            # layout/a11y probe + console dump
//   node scripts/l0-cdp.mjs shot out.png     # screenshot the side panel
//   node scripts/l0-cdp.mjs eval "<expr>"    # run an expression in the panel
//   node scripts/l0-cdp.mjs watch            # stream console + exceptions for 60s
//
// Env: L0_CDP_PORT (default 9222)

const PORT = process.env.L0_CDP_PORT || '9222';
const cmd = process.argv[2] || 'probe';

const targets = await fetch(`http://127.0.0.1:${PORT}/json/list`).then(r => r.json()).catch(() => {
  console.error(`No Chrome on 127.0.0.1:${PORT}. Run scripts/dev-chrome.sh first.`);
  process.exit(2);
});

// Resolve our extension id first: a lazily-started MV3 worker means live
// targets may belong to built-in component extensions that also serve
// sidepanel-ish pages, so never guess from the first chrome-extension target.
const PACKAGE_DIR = new URL('..', import.meta.url).pathname;
let extId = process.env.L0_EXT_ID || '';
if (!extId) {
  try {
    const { readFileSync } = await import('node:fs');
    extId = readFileSync(`${PACKAGE_DIR}.dev-chrome/ext-id`, 'utf8').trim();
  } catch { /* fall through */ }
}
if (!extId) {
  const own = targets.find(t => t.url.includes('/src/sidepanel/index.html'));
  if (own) extId = new URL(own.url).host;
}
if (!extId) {
  console.error('Could not resolve the extension id. Run scripts/dev-chrome.sh --open first.');
  process.exit(2);
}

const PANEL_PATH = '/src/sidepanel/index.html';
const matchesOwn = (t) => t.url === `chrome-extension://${extId}${PANEL_PATH}`;

let target = targets.find(matchesOwn);
if (!target) {
  const url = `chrome-extension://${extId}${PANEL_PATH}`;
  target = await fetch(`http://127.0.0.1:${PORT}/json/new?${encodeURIComponent(url)}`, { method: 'PUT' }).then(r => r.json());
  await new Promise(r => setTimeout(r, 2500));
}

const ws = new WebSocket(target.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
const logs = [];
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); return; }
  if (m.method === 'Runtime.consoleAPICalled') {
    logs.push(`[${m.params.type}] ` + m.params.args.map(a => a.value ?? a.description ?? a.type).join(' ').slice(0, 300));
  }
  if (m.method === 'Runtime.exceptionThrown') {
    const d = m.params.exceptionDetails;
    logs.push(`[exception] ${d.text} ${d.exception?.description?.split('\n')[0] ?? ''}`);
  }
  if (m.method === 'Log.entryAdded') logs.push(`[log ${m.params.entry.level}] ${m.params.entry.text.slice(0, 300)}`);
});
const send = (method, params = {}) => new Promise(res => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
await new Promise(r => ws.addEventListener('open', r));
await send('Runtime.enable');
await send('Log.enable');
await send('Page.enable');

const evaluate = (expression) => send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });

if (cmd === 'eval') {
  const r = await evaluate(process.argv[3] || '1');
  console.log(JSON.stringify(r.result?.result?.value ?? r.result ?? r, null, 2));
} else if (cmd === 'shot') {
  const out = process.argv[3] || '/tmp/l0-panel.png';
  const shot = await send('Page.captureScreenshot', { format: 'png' });
  (await import('node:fs')).writeFileSync(out, Buffer.from(shot.result.data, 'base64'));
  console.log('saved', out);
} else if (cmd === 'watch') {
  const secs = Number(process.argv[3] || 60);
  console.log(`streaming console for ${secs}s…`);
  await new Promise(r => setTimeout(r, secs * 1000));
  console.log(logs.length ? logs.join('\n') : '(clean)');
} else {
  const expr = `(() => {
    const vw = document.documentElement.clientWidth;
    const cards = [...document.querySelectorAll('[class*="group relative"]')];
    const paddingOf = (el) => el ? getComputedStyle(el).padding : null;
    const filter = document.querySelector('input[placeholder^="Filter"]');
    const composer = document.querySelector('footer');
    const scroller = [...document.querySelectorAll('div')]
      .find(d => getComputedStyle(d).overflowY === 'auto' && d.scrollHeight > d.clientHeight + 10);
    return {
      viewport: { w: vw, h: document.documentElement.clientHeight },
      horizontalOverflow: document.documentElement.scrollWidth > vw,
      memoriesRendered: cards.length,
      listScrollHeight: scroller ? { scroll: scroller.scrollHeight, visible: scroller.clientHeight, rowsPerViewport: +(cards.length / (scroller.scrollHeight / scroller.clientHeight)).toFixed(1) } : null,
      cardPadding: paddingOf(cards[0]),
      headerPadding: paddingOf(document.querySelector('header')),
      filterPaddingLeft: filter ? getComputedStyle(filter).paddingLeft : null,
      composerInViewport: composer ? composer.getBoundingClientRect().bottom <= document.documentElement.clientHeight + 0.5 : null,
      modalOpen: !!document.querySelector('[role=dialog]'),
      modalFocusInside: document.querySelector('[role=dialog]')?.contains(document.activeElement) ?? null,
      unlabeledButtons: [...document.querySelectorAll('button')].filter(b => !b.textContent.trim() && !b.getAttribute('aria-label')).map(b => b.title || '(none)'),
      typeBadges: [...new Set([...document.querySelectorAll('[class*="group relative"] span')].map(s => s.textContent.trim()).filter(Boolean))].slice(0, 12),
    };
  })()`;
  const r = await evaluate(expr);
  console.log(JSON.stringify(r.result?.result?.value ?? r.result ?? r, null, 2));
  console.log('--- console ---');
  console.log(logs.length ? logs.join('\n') : '(clean)');
}

process.exit(0);
