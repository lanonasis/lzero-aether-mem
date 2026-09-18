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

// Initialize cache
const cache = new MemoryCache();

// ASK_AI cancellation: Map<requestId, AbortController>.
// The SidePanel generates the requestId once and puts it in the ASK_AI payload;
// the SW never calls crypto.randomUUID() — it only reads message.payload.id.
const inflightAskAi = new Map<string, AbortController>();

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
      // Memory-concierge chat: route through the Onasis AI Router
      // (use_case: memory-analysis, which drives its own memory search
      // server-side). Callers must fall back to SEARCH_MEMORIES on
      // { success: false } -- the concierge must never go silent.
      //
      // The SidePanel generates the requestId once and puts it in the ASK_AI
      // payload; the SW never calls crypto.randomUUID() for this — it only
      // reads message.payload.id. This is the one-sentence rule that prevents
      // the cancellation ID-mismatch bug.
      const { id, query } = message.payload ?? {};
      if (!id) return { success: false, error: 'Missing request id' };

      // In-flight guard: only one request per id.
      if (inflightAskAi.has(id)) {
        return { success: false, error: 'Request already in-flight' };
      }

      const controller = new AbortController();
      inflightAskAi.set(id, controller);

      try {
        const response = await queryAIRouter(query || '', controller.signal);
        inflightAskAi.delete(id);
        return { id, success: true, response };
      } catch (error) {
        inflightAskAi.delete(id);
        if (error instanceof AiRouterRateLimitError) {
          return { id, success: false, error: error.message, retryAfterSeconds: error.retryAfterSeconds };
        }
        return { id, success: false, error: error instanceof Error ? error.message : String(error) };
      }
    }

    case 'CANCEL_ASK_AI': {
      const { id } = message.payload ?? {};
      if (!id) return { success: false };
      inflightAskAi.get(id)?.abort();
      inflightAskAi.delete(id);
      return { ok: true };
    }
    
    case 'CREATE_MEMORY': {
      const result = await cache.addLocal(message.payload?.memory);
      broadcastToExtensionPages({ type: 'MEMORY_ADDED', payload: { memory: result } });
      return result;
    }

    case 'UPDATE_MEMORY':
      return cache.updateMemory(message.payload?.id, message.payload?.updates || {});

    case 'DELETE_MEMORY': {
      const deleteResult = await cache.deleteMemory(message.payload?.id);
      if (deleteResult.success) {
        broadcastToExtensionPages({ type: 'MEMORY_DELETED', payload: { id: message.payload?.id } });
      }
      return deleteResult;
    }

    case 'SYNC_MEMORIES': {
      await cache.sync();
      broadcastToExtensionPages({ type: 'SYNC_COMPLETED', payload: { count: 0 } });
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

// Handle side panel behavior — lifted to module top level so it survives SW restart
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error('[L0 Memory] Side panel error:', error));

console.log('[L0 Memory] Background service worker initialized');
