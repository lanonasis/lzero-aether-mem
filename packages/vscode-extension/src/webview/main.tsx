import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { IDEPanel } from "./IDEPanel";
import { MemoryProvider } from "@lanonasis/memory-client/react";
import "@/index.css";

// Expose VS Code API for later message-bridge wiring.
declare global {
  interface Window {
    acquireVsCodeApi?: () => {
      postMessage: (message: unknown) => void;
      getState: () => unknown;
      setState: (state: unknown) => void;
    };
    vscode?: {
      postMessage: (message: unknown) => void;
      getState: () => unknown;
      setState: (state: unknown) => void;
    };
  }
}

if (
  typeof window !== "undefined" &&
  typeof window.acquireVsCodeApi === "function"
) {
  window.vscode = window.acquireVsCodeApi();
}

const container = document.getElementById("root");

function App() {
  const [injectedChat, setInjectedChat] = useState("");
  const [apiKey, setApiKey] = useState<string | undefined>(undefined);
  const [apiUrl, setApiUrl] = useState("https://api.lanonasis.com");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<{
    id?: string;
    name?: string;
    email?: string;
  } | null>(null);
  const authMethod =
    apiKey && (apiKey.startsWith("lano_") || apiKey.startsWith("lns_"))
      ? "apiKey"
      : apiKey
        ? "oauth"
        : "none";

  // Restore lightweight UI state (non-secret) from VS Code persisted state
  useEffect(() => {
    if (!window.vscode || typeof window.vscode.getState !== "function") return;
    const state = (window.vscode.getState?.() || {}) as Partial<{
      injectedChat: string;
      authError: string | null;
    }>;
    if (state.injectedChat) setInjectedChat(state.injectedChat);
    if (state.authError !== undefined) setAuthError(state.authError);
  }, []);

  useEffect(() => {
    if (!window.vscode || typeof window.vscode.postMessage !== "function") {
      return;
    }

    const handleMessage = (event: MessageEvent) => {
      const message = event.data;
      if (!message || typeof message !== "object") return;

      if (message.type === "lanonasis:host-ready") {
        console.log("[Webview] Host ready");
        return;
      }

      if (
        message.type === "lanonasis:config:init" ||
        message.type === "lanonasis:config:update"
      ) {
        const newApiUrl = message.payload?.apiUrl as string | undefined;
        const newApiKey = message.payload?.apiKey as string | undefined;
        const user = message.payload?.user as
          | { id?: string; name?: string; email?: string }
          | null
          | undefined;

        if (newApiUrl) {
          setApiUrl(newApiUrl);
        }
        if (newApiKey !== undefined) {
          setApiKey(newApiKey || undefined);
          setAuthLoading(false);
          setAuthError(null);
          console.log("[Webview] API key received from host");
        }
        if (user !== undefined) {
          setUserProfile(user);
        }
        return;
      }

      // Handle auth result from extension host
      if (message.type === "lanonasis:auth:result") {
        setAuthLoading(false);
        if (message.payload?.success) {
          // API key will come via config:update
          setAuthError(null);
        } else {
          setAuthError(message.payload?.error || "Authentication failed");
        }
        return;
      }

      if (message.type === "lanonasis:memory:createFromSelection") {
        const text = message.payload?.text ?? "";
        if (text) {
          setInjectedChat(text);
          window.vscode?.setState?.({
            injectedChat: text,
            authError,
          });
        }
        return;
      }

      if (message.type === "lanonasis:clipboard:read:result") {
        const text = message.payload?.text ?? "";
        if (text) {
          setInjectedChat(text);
          window.vscode?.setState?.({
            injectedChat: text,
            authError,
          });
        }
        return;
      }
    };

    window.addEventListener("message", handleMessage);
    window.vscode.postMessage({ type: "lanonasis:webview-ready" });

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const handleAttachFromClipboard = () => {
    if (!window.vscode || typeof window.vscode.postMessage !== "function") {
      return;
    }
    window.vscode.postMessage({ type: "lanonasis:clipboard:read" });
  };

  /** Trigger OAuth browser flow for users without API key */
  const handleLoginOAuth = () => {
    if (!window.vscode || typeof window.vscode.postMessage !== "function") {
      return;
    }
    setAuthLoading(true);
    setAuthError(null);
    window.vscode?.setState?.({
      injectedChat,
      authError: null,
    });
    window.vscode.postMessage({
      type: "lanonasis:request-auth",
      method: "oauth",
    });
  };

  /** Submit API key directly from user input */
  const handleLoginApiKey = (key: string) => {
    if (!window.vscode || typeof window.vscode.postMessage !== "function") {
      return;
    }
    setAuthLoading(true);
    setAuthError(null);
    window.vscode?.setState?.({
      injectedChat,
      authError: null,
    });
    window.vscode.postMessage({
      type: "lanonasis:submit-api-key",
      payload: { apiKey: key },
    });
  };

  /** Logout and clear credentials */
  const handleLogout = () => {
    if (!window.vscode || typeof window.vscode.postMessage !== "function") {
      return;
    }
    window.vscode.postMessage({ type: "lanonasis:logout" });
    // Clear local state immediately for responsive UI
    setApiKey(undefined);
    setAuthError(null);
    setAuthLoading(false);
    window.vscode?.setState?.({
      injectedChat,
      authError: null,
    });
  };

  return (
    <MemoryProvider apiKey={apiKey} apiUrl={apiUrl}>
      <IDEPanel
        initialChatInput={injectedChat}
        onAttachFromClipboard={handleAttachFromClipboard}
        isAuthenticated={!!apiKey}
        authMethod={authMethod}
        onLoginOAuth={handleLoginOAuth}
        onLoginApiKey={handleLoginApiKey}
        onLogout={handleLogout}
        authLoading={authLoading}
        authError={authError}
        userName={userProfile?.name || null}
        userEmail={userProfile?.email || null}
      />
    </MemoryProvider>
  );
}

// Mount the React app
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
