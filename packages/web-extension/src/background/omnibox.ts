/**
 * Omnibox (Address Bar) Integration
 * Type "mem" in address bar to search memories
 */

import type { MemoryCache } from './cache';

/**
 * A generation token for the omnibox. Written to chrome.storage.session on
 * every keystroke so that an SW restart (which resets in-memory state) still
 * preserves the ordering invariant.
 */
type OmniboxGeneration = {
  id: string;      // crypto.randomUUID()
  issuedAt: number; // Date.now()
};

const OMNIBOX_LATEST_KEY = 'omniboxLatest' as const;

// Pending events waiting for the side panel to mount (keyed by tabId so
// concurrent actions don't collide).
const PENDING_PANEL_EVENTS_KEY = 'pendingPanelEvents' as const;

export function setupOmnibox(cache: MemoryCache): void {
  // Set default suggestion
  chrome.omnibox.setDefaultSuggestion({
    description: 'Search L0 Memory: <match>%s</match>',
  });

  // Handle input changes
  // Overlapping keystrokes can fire searchLocalAsync calls that resolve out of
  // order; write a UUID + timestamp to storage so a surviving keystroke wins
  // even after an SW restart.
  chrome.omnibox.onInputChanged.addListener(async (text, suggest) => {
    const generation: OmniboxGeneration = {
      id: crypto.randomUUID(),
      issuedAt: Date.now(),
    };

    try {
      await chrome.storage.session.set({ [OMNIBOX_LATEST_KEY]: generation });
    } catch {
      // Storage write failure — fall through, no suggest() call.
      return;
    }

    if (!text.trim()) {
      suggest([]);
      return;
    }

    try {
      const results = await cache.searchLocalAsync(text);

      // Check if this generation is still the latest (superseded by newer keystroke).
      const { omniboxLatest } = await chrome.storage.session.get(OMNIBOX_LATEST_KEY);
      if ((omniboxLatest as OmniboxGeneration | undefined)?.id !== generation.id) {
        return; // superseded by a newer keystroke
      }

      const suggestions = results.slice(0, 5).map((memory) => ({
        content: memory.title,
        description: `<match>${memory.title}</match> - <dim>${memory.content.slice(0, 50)}...</dim>`,
      }));
      suggest(suggestions);
    } catch (err) {
      // Check if this generation is still the latest.
      const { omniboxLatest } = await chrome.storage.session.get(OMNIBOX_LATEST_KEY);
      if ((omniboxLatest as OmniboxGeneration | undefined)?.id !== generation.id) {
        return; // superseded by a newer keystroke
      }
      console.error('[L0 Memory] Omnibox search error:', err);
      suggest([]);
    }
  });

  // Handle selection — open side panel with search query
  chrome.omnibox.onInputEntered.addListener(async (text, _disposition) => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tab?.id) return;

    // Open the side panel first, then queue the SEARCH_QUERY so the panel
    // can drain it on mount (avoids the old setTimeout(500) race).
    await chrome.sidePanel.open({ tabId: tab.id });

    // Write pending event to storage.session so the panel can pick it up
    // on mount, even if it takes >500ms to hydrate.
    const pendingEvents = await chrome.storage.session.get(PENDING_PANEL_EVENTS_KEY);
    const events = Array.isArray(pendingEvents[PENDING_PANEL_EVENTS_KEY])
      ? pendingEvents[PENDING_PANEL_EVENTS_KEY]
      : [];
    events.push({ type: 'SEARCH_QUERY', payload: { query: text }, tabId: tab.id });
    await chrome.storage.session.set({ [PENDING_PANEL_EVENTS_KEY]: events });
  });

  console.log('[L0 Memory] Omnibox setup complete');
}
