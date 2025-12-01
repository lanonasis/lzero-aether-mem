import React from 'react';
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

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <LanonasisProvider
        config={{
          baseUrl: 'https://api.lanonasis.com/api/v1',
          apiKey: undefined,
          organizationId: undefined,
          enableOffline: true,
          enableLocalAI: true,
        }}
      >
        <IDEPanel />
      </LanonasisProvider>
    </React.StrictMode>,
  );
}
