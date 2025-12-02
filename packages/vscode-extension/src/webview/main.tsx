import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { IDEPanel } from '@/packages/vscode-extension/IDEPanel';
import { LanonasisProvider } from '@lanonasis/shared/sdk/react-hooks';
import '@/index.css';

// Expose VS Code API for later message-bridge wiring.
declare global {
  interface Window {
    acquireVsCodeApi?: () => any;
    vscode?: any;
  }
}

if (
  typeof window !== 'undefined' &&
  typeof window.acquireVsCodeApi === 'function'
) {
  window.vscode = window.acquireVsCodeApi();
}

const container = document.getElementById('root');

function App() {
  const [injectedChat, setInjectedChat] = useState('');
  const [config, setConfig] = useState({
    baseUrl: 'https://api.lanonasis.com/api/v1',
    apiKey: undefined as string | undefined,
    enableOffline: true,
    enableLocalAI: true,
  });

  useEffect(() => {
    if (!window.vscode || typeof window.vscode.postMessage !== 'function') {
      return;
    }
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;
      if (!message || typeof message !== 'object') return;
      if (message.type === 'lanonasis:host-ready') {
        return;
      }
      if (
        message.type === 'lanonasis:config:init' ||
        message.type === 'lanonasis:config:update'
      ) {
        const apiUrl = message.payload?.apiUrl as string | undefined;
        const apiKey = message.payload?.apiKey as string | undefined;

        setConfig(prev => ({
          ...prev,
          ...(apiUrl ? { baseUrl: apiUrl } : {}),
          ...(apiKey !== undefined ? { apiKey: apiKey || undefined } : {}),
        }));
        return;
      }
      if (message.type === 'lanonasis:memory:createFromSelection') {
        const text = message.payload?.text ?? '';
        if (text) {
          setInjectedChat(text);
        }
        return;
      }
      if (message.type === 'lanonasis:clipboard:read:result') {
        const text = message.payload?.text ?? '';
        if (text) {
          setInjectedChat(text);
        }
        return;
      }
    };

    window.addEventListener('message', handleMessage);
    window.vscode.postMessage({ type: 'lanonasis:webview-ready' });
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const handleAttachFromClipboard = () => {
    if (!window.vscode || typeof window.vscode.postMessage !== 'function') {
      return;
    }

    window.vscode.postMessage({ type: 'lanonasis:clipboard:read' });
  };

  return (
    <LanonasisProvider config={config}>
      <IDEPanel
        initialChatInput={injectedChat}
        onAttachFromClipboard={handleAttachFromClipboard}
      />
    </LanonasisProvider>
  );
}

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
