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
import {
  ensureOffscreenDocument,
  hasOffscreenDocument,
  initializeOffscreenAI,
  generateEmbedding,
  getOffscreenAIStatus,
} from './offscreenManager';
import { queryAIRouter, AiRouterRateLimitError } from './aiRouter';
import { broadcastToExtensionPages } from './broadcast';

// Map of active Ask-AI request token -> AbortController.
// Only one inflight AI request is allowed at a time.
const inflightAskAi = new Map<string, AbortController>();

// Set side panel behavior at module init (not inside a message handler).
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: false })
  .catch((error) => console.error('[L0 Memory] Side panel error:', error));

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
  if (!message || typeof message !== 'object' || !('type' in message)) {
    sendResponse({ error: 'Malformed message' });
    return false;
  }

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

    case 'ASK_AI': {
      // Memory-concierge chat: route through the Onasis AI Router.
      // Only one inflight request allowed; cancel any prior one.
      const requestToken = (message.payload as any)?.requestToken as string | undefined;
      if (requestToken) {
        for (const [token, ctrl] of inflightAskAi) {
          if (token !== requestToken) {
            ctrl.abort();
            inflightAskAi.delete(token);
          }
        }
        const ctrl = new AbortController();
        inflightAskAi.set(requestToken, ctrl);
        try {
          const response = await queryAIRouter(message.payload?.query || '', ctrl.signal);
          inflightAskAi.delete(requestToken);
          return { success: true, response };
        } catch (error) {
          inflightAskAi.delete(requestToken);
          if (error instanceof AiRouterRateLimitError) {
            return { success: false, error: error.message, retryAfterSeconds: error.retryAfterSeconds };
          }
          if (error instanceof Error && error.name === 'AbortError') {
            return { success: false, error: 'Request cancelled', cancelled: true };
          }
          return { success: false, error: error instanceof Error ? error.message : String(error) };
        }
      }
      // Fallback: no token, run without cancellation support.
      try {
        const response = await queryAIRouter(message.payload?.query || '');
        return { success: true, response };
      } catch (error) {
        if (error instanceof AiRouterRateLimitError) {
          return { success: false, error: error.message, retryAfterSeconds: error.retryAfterSeconds };
        }
        return { success: false, error: error instanceof Error ? error.message : String(error) };
      }
    }

    case 'CANCEL_ASK_AI': {
      const requestToken = (message.payload as any)?.requestToken as string | undefined;
      if (requestToken) {
        const ctrl = inflightAskAi.get(requestToken);
        if (ctrl) {
          ctrl.abort();
          inflightAskAi.delete(requestToken);
        }
      }
      return { success: true };
    }

    case 'BROADCAST_STATE':
      await broadcastToExtensionPages({ type: 'STATE_UPDATE', payload: message.payload });
      return { success: true };
    
    case 'CREATE_MEMORY': {
      const memory = await cache.addLocal(message.payload?.memory);
      await broadcastToExtensionPages({ type: 'MEMORY_ADDED', payload: { memory } });
      return memory;
    }

    case 'UPDATE_MEMORY': {
      const memory = await cache.updateMemory(message.payload?.id, message.payload?.updates || {});
      await broadcastToExtensionPages({ type: 'MEMORY_UPDATED', payload: { memory } });
      return memory;
    }

    case 'DELETE_MEMORY': {
      const id = message.payload?.id as string;
      await cache.deleteMemory(id);
      await broadcastToExtensionPages({ type: 'MEMORY_DELETED', payload: { id } });
      return { success: true };
    }

    case 'SYNC_MEMORIES': {
      await cache.sync();
      await broadcastToExtensionPages({ type: 'SYNC_COMPLETED' });
      return { success: true };
    }
    
    case 'GET_SYNC_STATUS':
      return cache.getStatus();
    
    case 'GET_AUTH_STATUS':
      const token = await chrome.storage.local.get('l0_auth_token');
      return { isAuthenticated: !!token.l0_auth_token };

    case 'SET_AUTH_TOKEN':
      await chrome.storage.local.set({ l0_auth_token: message.payload?.token });
      return { success: true };

    case 'LOGOUT':
      await chrome.storage.local.remove(['l0_auth_token', 'userEmail']);
      await cache.clear();
      return { success: true };

    // Offscreen AI handlers
    case 'OFFSCREEN_INIT_AI':
      try {
        await ensureOffscreenDocument();
        const status = await initializeOffscreenAI();
        return status;
      } catch (error) {
        console.error('[L0 Memory] Offscreen AI init failed:', error);
        return { isReady: false, loadProgress: 0, deviceInfo: '', error: error instanceof Error ? error.message : 'Unknown error' };
      }

    case 'OFFSCREEN_EMBED':
      try {
        await ensureOffscreenDocument();
        const embedding = await generateEmbedding(message.payload?.text || '');
        return { embedding };
      } catch (error) {
        console.error('[L0 Memory] Offscreen embed failed:', error);
        return { error: error instanceof Error ? error.message : 'Unknown error' };
      }

    case 'OFFSCREEN_STATUS':
      try {
        // Only query status if the offscreen document already exists.
        // Do NOT create it here — that would eagerly spin up the AI context.
        if (!(await hasOffscreenDocument())) {
          return { isReady: false, loadProgress: 0, deviceInfo: '' };
        }
        return await getOffscreenAIStatus();
      } catch (error) {
        return { isReady: false, loadProgress: 0, deviceInfo: '' };
      }

    default:
      console.warn('[L0 Memory] Unknown message type:', message.type);
      return { error: 'Unknown message type' };
  }
}

console.log('[L0 Memory] Background service worker initialized');
