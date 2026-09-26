/**
 * Omnibox (Address Bar) Integration
 * Type "mem" in address bar to search memories
 */

import type { MemoryCache } from './cache';

/** Generate a UUID v4 token for request deduplication. */
function generateToken(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function setupOmnibox(cache: MemoryCache): void {
  // Set default suggestion
  chrome.omnibox.setDefaultSuggestion({
    description: 'Search L0 Memory: <match>%s</match>',
  });

  // Handle input changes
  // Overlapping keystrokes can fire searchLocalAsync calls that resolve out of
  // order; store the request token in storage.session so the SW can recover
  // the latest token on wake.
  chrome.omnibox.onInputChanged.addListener(async (text, suggest) => {
    if (!text.trim()) {
      suggest([]);
      return;
    }

    const token = generateToken();
    await chrome.storage.session.set({ _omniboxSearchToken: token });

    try {
      const results = await cache.searchLocalAsync(text);
      // Discard results if a newer keystroke has already superseded this request.
      const current = await chrome.storage.session.get('_omniboxSearchToken');
      if (current._omniboxSearchToken !== token) return;
      const suggestions = results.slice(0, 5).map((memory) => ({
        content: memory.title,
        description: `<match>${memory.title}</match> - <dim>${memory.content.slice(0, 50)}...</dim>`,
      }));
      suggest(suggestions);
    } catch (err) {
      console.error('[L0 Memory] Omnibox search error:', err);
      suggest([]);
    }
  });

  // Handle selection
  chrome.omnibox.onInputEntered.addListener(async (text, _disposition) => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) return;

    const token = generateToken();
    // Store token + query so the side panel can drain it on mount.
    await chrome.storage.session.set({
      _pendingPanelQuery: { token, query: text },
    });

    await chrome.sidePanel.open({ tabId: tab.id });
  });

  console.log('[L0 Memory] Omnibox setup complete');
}
