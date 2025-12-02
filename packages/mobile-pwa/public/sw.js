/**
 * LanOnasis PWA Service Worker
 * Enables offline-first functionality for the mobile app
 */

const CACHE_NAME = 'lanonasis-v2.0.0';
const STATIC_CACHE = 'lanonasis-static-v2.0.0';
const DYNAMIC_CACHE = 'lanonasis-dynamic-v2.0.0';
const AI_MODEL_CACHE = 'lanonasis-ai-models-v1';

// Static assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
];

// AI model files to cache (from transformers.js CDN)
const AI_MODEL_PATTERNS = [
  'huggingface.co',
  'cdn-lfs.huggingface.co',
];

// ============================================
// Installation
// ============================================
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      }),
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
      self.clients.claim(),
    ])
  );
});

// ============================================
// Fetch Handling
// ============================================
self.addEventListener('fetch', (event) => {
  const request = event.request;
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

  // Handle static assets (stale-while-revalidate)
  event.respondWith(handleStaticRequest(request));
});

// ============================================
// Request Handlers
// ============================================

async function handleStaticRequest(request) {
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
    // Return a basic offline response for navigation
    if (request.mode === 'navigate') {
      return new Response(
        '<!DOCTYPE html><html><body><h1>Offline</h1><p>Please check your connection.</p></body></html>',
        { headers: { 'Content-Type': 'text/html' } }
      );
    }
    throw error;
  }
}

async function handleAPIRequest(request) {
  const url = new URL(request.url);
  const cacheKey = url.pathname + url.search;

  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(cacheKey, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(cacheKey);
    
    if (cachedResponse) {
      console.log('[SW] Returning cached API response for:', cacheKey);
      return cachedResponse;
    }
    
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

async function handleAIModelRequest(request) {
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

async function fetchAndCache(request, cacheName) {
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

async function syncMemories() {
  // Notify clients of sync
  const clients = await self.clients.matchAll();
  clients.forEach((client) => {
    client.postMessage({
      type: 'SYNC_COMPLETE',
      timestamp: Date.now(),
    });
  });
}

// ============================================
// Message Handling
// ============================================
self.addEventListener('message', (event) => {
  console.log('[SW] Received message:', event.data);

  switch (event.data?.type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'CLEAR_CACHE':
      caches.keys().then((keys) => {
        keys.forEach((key) => caches.delete(key));
      });
      break;
  }
});

console.log('[SW] Service worker loaded');
