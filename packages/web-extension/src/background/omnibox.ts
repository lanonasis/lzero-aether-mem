/**
 * Omnibox (Address Bar) Integration
 * Type "mem" in address bar to search memories
 */

import type { MemoryCache } from './cache';

export function setupOmnibox(cache: MemoryCache): void {
  // Set default suggestion
  chrome.omnibox.setDefaultSuggestion({
    description: 'Search L0 Memory: <match>%s</match>',
  });

  // Handle input changes
  chrome.omnibox.onInputChanged.addListener(async (text, suggest) => {
    if (!text.trim()) {
      suggest([]);
      return;
    }

    try {
      const results = await cache.searchLocal(text);
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
    // Open side panel with search query
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (tab?.id) {
      await chrome.sidePanel.open({ tabId: tab.id });
      
      // Send search query to side panel
      setTimeout(() => {
        chrome.runtime.sendMessage({
          type: 'SEARCH_QUERY',
          payload: { query: text },
        });
      }, 500);
    }
  });

  console.log('[L0 Memory] Omnibox setup complete');
}
