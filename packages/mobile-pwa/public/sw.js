/**
 * LanOnasis PWA Service Worker
 * Enables offline-first functionality for the mobile app
 */

/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;

const CACHE_NAME = 'lanonasis-v2.0.0';
const STATIC_CACHE = 'lanonasis-static-v2.0.0';
const DYNAMIC_CACHE = 'lanonasis-dynamic-v2.0.0';
const AI_MODEL_CACHE = 'lanonasis-ai-models-v1';

// Static assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html',
  // Add your bundled assets here
];

// AI model files to cache (from transformers.js CDN)
const AI_MODEL_PATTERNS = [
  'https://huggingface.co/',
  'https://cdn-lfs.huggingface.co/',
];

// API endpoints that should work offline with cached data
const CACHED_API_ENDPOINTS = [
  '/api/v1/memories',
  '/api/v1/user/me',
];

// ============================================
// Installation
// ============================================
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      }),
      // Skip waiting to activate immediately
      self.skipWaiting(),
    ])
  );
});

// ============================================
// Activation
// ============================================
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((keys) => {
        return Promise.all(
          keys
            .filter((key) => {
              return key !== STATIC_CACHE && 
                     key !== DYNAMIC_CACHE && 
                     key !== AI_MODEL_CACHE;
            })
            .map((key) => {
              console.log('[SW] Removing old cache:', key);
              return caches.delete(key);
            })
        );
      }),
      // Take control of all pages immediately
      self.clients.claim(),
    ])
  );
});

// ============================================
// Fetch Handling
// ============================================
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle AI model requests (cache first, network fallback)
  if (AI_MODEL_PATTERNS.some((pattern) => request.url.includes(pattern))) {
    event.respondWith(handleAIModelRequest(request));
    return;
  }

  // Handle API requests (network first, cache fallback)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleAPIRequest(request));
    return;
  }

  // Handle static assets (cache first, network fallback)
  event.respondWith(handleStaticRequest(request));
});

// ============================================
// Request Handlers
// ============================================

async function handleStaticRequest(request: Request): Promise<Response> {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    // Return cache but also update in background
    fetchAndCache(request, STATIC_CACHE);
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      const offlinePage = await caches.match('/offline.html');
      if (offlinePage) return offlinePage;
    }
    
    throw error;
  }
}

async function handleAPIRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const cacheKey = url.pathname;

  try {
    // Try network first
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache successful API responses
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(cacheKey, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Network failed, try cache
    const cachedResponse = await caches.match(cacheKey);
    
    if (cachedResponse) {
      console.log('[SW] Returning cached API response for:', cacheKey);
      return cachedResponse;
    }
    
    // Return offline JSON response
    return new Response(
      JSON.stringify({
        success: false,
        error: { code: 'OFFLINE', message: 'You are offline' },
        cached: true,
      }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

async function handleAIModelRequest(request: Request): Promise<Response> {
  // AI models should be heavily cached (they're large and don't change)
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    console.log('[SW] Returning cached AI model');
    return cachedResponse;
  }

  try {
    console.log('[SW] Fetching AI model:', request.url);
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(AI_MODEL_CACHE);
      cache.put(request, networkResponse.clone());
      console.log('[SW] Cached AI model');
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[SW] Failed to fetch AI model:', error);
    throw error;
  }
}

async function fetchAndCache(request: Request, cacheName: string): Promise<void> {
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response);
    }
  } catch (error) {
    // Silently fail for background updates
  }
}

// ============================================
// Background Sync
// ============================================
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync triggered:', event.tag);

  if (event.tag === 'sync-memories') {
    event.waitUntil(syncMemories());
  }
});

async function syncMemories(): Promise<void> {
  try {
    // Get pending operations from IndexedDB
    const pendingOps = await getPendingOperations();
    
    if (pendingOps.length === 0) return;

    console.log('[SW] Syncing', pendingOps.length, 'pending operations');

    for (const op of pendingOps) {
      try {
        const response = await fetch('/api/v1/memories', {
          method: op.method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(op.data),
        });

        if (response.ok) {
          await removePendingOperation(op.id);
        }
      } catch (error) {
        console.error('[SW] Sync failed for operation:', op.id);
      }
    }

    // Notify clients of sync completion
    const clients = await self.clients.matchAll();
    clients.forEach((client) => {
      client.postMessage({
        type: 'SYNC_COMPLETE',
        timestamp: Date.now(),
      });
    });
  } catch (error) {
    console.error('[SW] Background sync failed:', error);
  }
}

// IndexedDB helpers (simplified)
async function getPendingOperations(): Promise<any[]> {
  // In production, implement proper IndexedDB access
  return [];
}

async function removePendingOperation(id: string): Promise<void> {
  // In production, implement proper IndexedDB access
}

// ============================================
// Push Notifications
// ============================================
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  
  event.waitUntil(
    self.registration.showNotification(data.title || 'LanOnasis', {
      body: data.body || 'You have a new notification',
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge-72x72.png',
      tag: data.tag || 'default',
      data: data.data,
      actions: data.actions || [],
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const urlToOpen = event.notification.data?.url || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clients) => {
      // Focus existing window if available
      for (const client of clients) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      // Open new window
      return self.clients.openWindow(urlToOpen);
    })
  );
});

// ============================================
// Message Handling
// ============================================
self.addEventListener('message', (event) => {
  console.log('[SW] Received message:', event.data);

  switch (event.data.type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'CLEAR_CACHE':
      caches.keys().then((keys) => {
        keys.forEach((key) => caches.delete(key));
      });
      break;
      
    case 'CACHE_AI_MODEL':
      if (event.data.url) {
        caches.open(AI_MODEL_CACHE).then((cache) => {
          cache.add(event.data.url);
        });
      }
      break;
  }
});

console.log('[SW] Service worker loaded');
