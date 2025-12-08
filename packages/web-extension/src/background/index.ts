/**
 * L0 Memory Browser Extension - Background Service Worker
 * 
 * Handles:
 * - Context menu integration
 * - Omnibox (address bar) search
 * - Background sync
 * - Message passing between components
 * - Side panel management
 */

import { setupContextMenus } from './contextMenu';
import { setupOmnibox } from './omnibox';
import { MemoryCache } from './cache';
import { setupSync } from './sync';

// Initialize cache
const cache = new MemoryCache();

// Setup on install
chrome.runtime.onInstalled.addListener(async (details) => {
  console.log('[L0 Memory] Extension installed:', details.reason);
  
  // Setup context menus
  await setupContextMenus();
  
  // Initialize cache
  await cache.init();
  
  // Open options page on first install
  if (details.reason === 'install') {
    chrome.runtime.openOptionsPage();
  }
});

// Setup omnibox
setupOmnibox(cache);

// Setup background sync
setupSync(cache);

// Handle keyboard commands
chrome.commands.onCommand.addListener(async (command) => {
  console.log('[L0 Memory] Command:', command);
  
  if (command === 'open_side_panel') {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab?.id) {
      await chrome.sidePanel.open({ tabId: tab.id });
    }
  }
  
  if (command === 'save_selection') {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab?.id) {
      chrome.tabs.sendMessage(tab.id, { type: 'SAVE_SELECTION' });
    }
  }
});

// Handle messages from popup, sidepanel, content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('[L0 Memory] Message:', message.type, 'from:', sender.id);
  
  handleMessage(message, sender)
    .then(sendResponse)
    .catch((err) => sendResponse({ error: err.message }));
  
  return true; // Keep channel open for async response
});

async function handleMessage(
  message: { type: string; payload?: any },
  _sender: chrome.runtime.MessageSender
): Promise<any> {
  switch (message.type) {
    case 'GET_MEMORIES':
      return cache.getMemories();
    
    case 'SEARCH_MEMORIES':
      // Use SDK-powered search with fallback to local
      return cache.searchWithApi(message.payload?.query || '');
    
    case 'CREATE_MEMORY':
      return cache.addLocal(message.payload?.memory);
    
    case 'SYNC_MEMORIES':
      return cache.sync();
    
    case 'GET_SYNC_STATUS':
      return cache.getStatus();
    
    case 'GET_AUTH_STATUS':
      const token = await chrome.storage.local.get('authToken');
      return { isAuthenticated: !!token.authToken };
    
    case 'SET_AUTH_TOKEN':
      await chrome.storage.local.set({ authToken: message.payload?.token });
      return { success: true };
    
    case 'LOGOUT':
      await chrome.storage.local.remove(['authToken', 'userEmail']);
      await cache.clear();
      return { success: true };
    
    default:
      console.warn('[L0 Memory] Unknown message type:', message.type);
      return { error: 'Unknown message type' };
  }
}

// Handle side panel behavior
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: false })
  .catch((error) => console.error('[L0 Memory] Side panel error:', error));

console.log('[L0 Memory] Background service worker initialized');
