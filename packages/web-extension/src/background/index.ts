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
import { MemoryCache, isTokenExpired } from './cache';
import { setupSync } from './sync';
import { startDeviceCodeFlow, storeAuthToken, getEffectiveToken } from './oauth';
import {
  ensureOffscreenDocument,
  hasOffscreenDocument,
  initializeOffscreenAI,
  generateEmbedding,
  getOffscreenAIStatus,
} from './offscreenManager';
import { queryAIRouter, AiRouterRateLimitError } from './aiRouter';
import { runDiagnostics } from './diagnostics';

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

    case 'ASK_AI':
      // Memory-concierge chat: route through the Onasis AI Router
      // (use_case: memory-analysis, which drives its own memory search
      // server-side). Callers must fall back to SEARCH_MEMORIES on
      // { success: false } -- the concierge must never go silent.
      try {
        const response = await queryAIRouter(message.payload?.query || '');
        return { success: true, response };
      } catch (error) {
        if (error instanceof AiRouterRateLimitError) {
          return { success: false, error: error.message, retryAfterSeconds: error.retryAfterSeconds };
        }
        return { success: false, error: error instanceof Error ? error.message : String(error) };
      }
    
    case 'CREATE_MEMORY':
      return cache.addLocal(message.payload?.memory);

    case 'UPDATE_MEMORY':
      return cache.updateMemory(message.payload?.id, message.payload?.updates || {});

    case 'DELETE_MEMORY':
      return cache.deleteMemory(message.payload?.id);

    case 'SYNC_MEMORIES':
      return cache.sync();
    
    case 'GET_SYNC_STATUS':
      return cache.getStatus();
    
    case 'GET_AUTH_STATUS': {
      const { l0_auth_token } = await chrome.storage.local.get('l0_auth_token');
      const hasApiKey = !!l0_auth_token && !isTokenExpired(l0_auth_token);
      const effective = await getEffectiveToken();
      return {
        isAuthenticated: hasApiKey || !!effective,
        authType: effective?.authType || (hasApiKey ? 'apiKey' : null),
      };
    }

    case 'LOGOUT':
      await chrome.storage.local.remove(['l0_auth_token', 'userEmail']);
      await chrome.storage.local.remove([
        'l0_oauth_token',
        'l0_oauth_credential_type',
        'l0_code_verifier',
        'l0_oauth_state',
      ]);
      await cache.clear();
      return { success: true };

    case 'LOGOUT_ON_EXPIRY':
      try {
        const stored = await chrome.storage.local.get('l0_auth_token');
        const auth = stored.l0_auth_token;
        if (auth && isTokenExpired(auth)) {
          await chrome.storage.local.remove(['l0_auth_token', 'userEmail']);
          await cache.clear();
          return { success: true, logout: true, reason: 'token_expired' };
        }
      } catch (error) {
        console.error('[L0 Memory] LOGOUT_ON_EXPIRY check failed:', error);
      }
      return { success: true, logout: false };

    case 'START_DEVICE_CODE_FLOW':
      try {
        const deviceCode = await startDeviceCodeFlow();
        console.log('[L0 Memory] Device code flow started. User code:', deviceCode.user_code);
        // Start polling in background
        const pollingPromise = import('./oauth').then(
          ({ pollDeviceToken }) =>
            new Promise<void>((resolve) => {
              pollDeviceToken(deviceCode, {
                onCancel: () => false, // never cancel
                onProgress: (msg) => console.log('[L0 Memory] Device code:', msg),
              })
                .then(async (tokens) => {
                  await storeAuthToken(tokens.access_token, tokens.refresh_token);
                  console.log('[L0 Memory] Device code auth successful');
                })
                .catch((err) => {
                  console.error('[L0 Memory] Device code flow failed:', err);
                })
                .finally(() => resolve());
            })
        );
        // Store polling promise reference for later cancellation (optional)
        return { success: true, deviceCode };
      } catch (err) {
        console.error('[L0 Memory] START_DEVICE_CODE_FLOW failed:', err);
        return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
      }

    case 'PKCE_CALLBACK':
      try {
        const { code, redirect_uri } = message.payload || {};
        if (!code || !redirect_uri) {
          return { success: false, error: 'Missing code or redirect_uri' };
        }
        const result = await import('./oauth').then((m) => m.handlePkceCallback(code, redirect_uri));
        if (result.success) {
          console.log('[L0 Memory] PKCE auth successful');
          // Send message to any listening tabs
          chrome.runtime.sendMessage({ type: 'AUTH_SUCCESS' });
        } else {
          console.error('[L0 Memory] PKCE auth failed:', result.error);
        }
        return result;
      } catch (err) {
        console.error('[L0 Memory] PKCE_CALLBACK failed:', err);
        return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
      }

    case 'GET_AUTH_TYPE':
      try {
        const effective = await getEffectiveToken();
        return { authType: effective?.authType || null };
      } catch {
        return { authType: null };
      }

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

    case 'RUN_DIAGNOSTICS':
      try {
        const result = await runDiagnostics(message.payload?.apiUrl);
        return { success: true, diagnostics: result };
      } catch (err) {
        return {
          success: false,
          error: err instanceof Error ? err.message : 'Diagnostics failed',
        };
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

// Handle side panel behavior
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: false })
  .catch((error) => console.error('[L0 Memory] Side panel error:', error));

console.log('[L0 Memory] Background service worker initialized');
