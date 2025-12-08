/**
 * Context Menu Setup
 * Right-click menu integration for saving and searching memories
 */

export async function setupContextMenus(): Promise<void> {
  // Remove existing menus first
  await chrome.contextMenus.removeAll();

  // Create parent menu
  chrome.contextMenus.create({
    id: 'l0-memory-parent',
    title: 'L0 Memory',
    contexts: ['selection', 'page'],
  });

  // Save selection as memory
  chrome.contextMenus.create({
    id: 'l0-memory-save',
    parentId: 'l0-memory-parent',
    title: 'Save "%s" as Memory',
    contexts: ['selection'],
  });

  // Search memories for selection
  chrome.contextMenus.create({
    id: 'l0-memory-search',
    parentId: 'l0-memory-parent',
    title: 'Search Memories for "%s"',
    contexts: ['selection'],
  });

  // Separator
  chrome.contextMenus.create({
    id: 'l0-memory-separator',
    parentId: 'l0-memory-parent',
    type: 'separator',
    contexts: ['selection', 'page'],
  });

  // Open side panel
  chrome.contextMenus.create({
    id: 'l0-memory-sidepanel',
    parentId: 'l0-memory-parent',
    title: 'Open L0 Memory Panel',
    contexts: ['selection', 'page'],
  });

  // Handle clicks
  chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    const selectedText = info.selectionText?.trim();

    switch (info.menuItemId) {
      case 'l0-memory-save':
        if (selectedText && tab?.id) {
          // Send message to save the selection
          chrome.runtime.sendMessage({
            type: 'CREATE_MEMORY',
            payload: {
              memory: {
                title: selectedText.slice(0, 50) + (selectedText.length > 50 ? '...' : ''),
                content: selectedText,
                memory_type: 'snippet',
                tags: ['context-menu'],
                source_url: tab.url,
              },
            },
          });
          
          // Show notification
          // Note: Would need notifications permission
          console.log('[L0 Memory] Saved selection as memory');
        }
        break;

      case 'l0-memory-search':
        if (selectedText && tab?.id) {
          // Open side panel with search query
          await chrome.sidePanel.open({ tabId: tab.id });
          // Send search query to side panel
          setTimeout(() => {
            chrome.runtime.sendMessage({
              type: 'SEARCH_QUERY',
              payload: { query: selectedText },
            });
          }, 500);
        }
        break;

      case 'l0-memory-sidepanel':
        if (tab?.id) {
          await chrome.sidePanel.open({ tabId: tab.id });
        }
        break;
    }
  });

  console.log('[L0 Memory] Context menus created');
}
