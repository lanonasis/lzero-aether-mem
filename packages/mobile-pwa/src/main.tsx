import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanonasisProvider } from '@lanonasis/shared/sdk/react-hooks';
import { MobileApp } from './MobileApp';
import './index.css';

// Create React Query client with offline-friendly defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      retry: (failureCount, error) => {
        // Don't retry if offline
        if (!navigator.onLine) return false;
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: 'always',
    },
  },
});

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });
      console.log('🔧 Service Worker registered:', registration.scope);
      
      // Check for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New version available
              console.log('🔄 New version available! Refresh to update.');
              // Optionally show a toast notification here
            }
          });
        }
      });
    } catch (error) {
      console.error('❌ Service Worker registration failed:', error);
    }
  });
}

// Handle iOS standalone mode
const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                     (window.navigator as any).standalone;

if (isStandalone) {
  document.documentElement.classList.add('standalone');
}

// Root render
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <LanonasisProvider
        config={{
          baseUrl: import.meta.env.VITE_API_URL || 'https://api.lanonasis.com/api/v1',
          enableOffline: true,
          enableLocalAI: true,
        }}
      >
        <MobileApp />
      </LanonasisProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
