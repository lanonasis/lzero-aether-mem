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

type AuthMethod = "apiKey" | "oauth" | "none";

type PendingApiRequest = {
  resolve: (response: Response) => void;
  reject: (error: Error) => void;
  timeoutId: number;
};

type ApiBridgeResponsePayload = {
  requestId?: string;
  status?: number;
  statusText?: string;
  headers?: Array<[string, string]>;
  body?: string;
  error?: string;
};

const apiBridgeState = {
  apiUrl: "https://api.lanonasis.com",
  pending: new Map<string, PendingApiRequest>(),
};

let apiBridgeInstalled = false;
let apiBridgeSequence = 0;

function updateApiBridgeConfig(nextApiUrl?: string) {
  if (nextApiUrl) {
    apiBridgeState.apiUrl = nextApiUrl;
  }
}

function resolveRequestUrl(input: RequestInfo | URL): string {
  if (typeof input === "string") {
    return input;
  }

  if (input instanceof URL) {
    return input.toString();
  }

  return input.url;
}

function shouldProxyRequest(url: string): boolean {
  try {
    const requestUrl = new URL(url, window.location.href);
    const apiBaseUrl = new URL(apiBridgeState.apiUrl);
    return (
      requestUrl.origin === apiBaseUrl.origin &&
      requestUrl.pathname.startsWith("/api/")
    );
  } catch {
    return false;
  }
}

function normalizeHeaders(headersInit?: HeadersInit): Record<string, string> {
  const headers = new Headers(headersInit || {});
  const normalized: Record<string, string> = {};

  headers.forEach((value, key) => {
    normalized[key] = value;
  });

  delete normalized.authorization;
  delete normalized.Authorization;
  delete normalized["x-api-key"];
  delete normalized["X-API-Key"];

  return normalized;
}

async function getRequestBody(
  input: RequestInfo | URL,
  init: RequestInit | undefined,
  method: string,
): Promise<string | undefined> {
  const upperMethod = method.toUpperCase();
  if (upperMethod === "GET" || upperMethod === "HEAD") {
    return undefined;
  }

  if (typeof init?.body === "string") {
    return init.body;
  }

  if (init?.body instanceof URLSearchParams) {
    return init.body.toString();
  }

  if (init?.body != null) {
    return String(init.body);
  }

  if (input instanceof Request) {
    const text = await input.clone().text();
    return text || undefined;
  }

  return undefined;
}

function handleApiBridgeMessage(event: MessageEvent) {
  const message = event.data;
  if (!message || message.type !== "lanonasis:api:response") {
    return;
  }

  const payload = (message.payload || {}) as ApiBridgeResponsePayload;
  const requestId = payload.requestId;
  if (!requestId) {
    return;
  }

  const pendingRequest = apiBridgeState.pending.get(requestId);
  if (!pendingRequest) {
    return;
  }

  apiBridgeState.pending.delete(requestId);
  window.clearTimeout(pendingRequest.timeoutId);

  if (payload.error) {
    pendingRequest.reject(new Error(payload.error));
    return;
  }

  const status = payload.status ?? 500;
  const body =
    payload.body && ![204, 205, 304].includes(status) ? payload.body : null;

  pendingRequest.resolve(
    new Response(body, {
      status,
      statusText: payload.statusText,
      headers: payload.headers || [],
    }),
  );
}

function installApiBridge() {
  if (
    apiBridgeInstalled ||
    typeof window === "undefined" ||
    typeof window.fetch !== "function"
  ) {
    return;
  }

  apiBridgeInstalled = true;
  const nativeFetch = window.fetch.bind(window);
  window.addEventListener("message", handleApiBridgeMessage);

  window.fetch = async (
    input: RequestInfo | URL,
    init?: RequestInit,
  ): Promise<Response> => {
    const requestUrl = resolveRequestUrl(input);

    if (
      !shouldProxyRequest(requestUrl) ||
      !window.vscode ||
      typeof window.vscode.postMessage !== "function"
    ) {
      return input instanceof URL
        ? nativeFetch(input.toString(), init)
        : nativeFetch(input, init);
    }

    const method =
      init?.method || (input instanceof Request ? input.method : "GET");
    const headers = normalizeHeaders(
      init?.headers || (input instanceof Request ? input.headers : undefined),
    );
    const body = await getRequestBody(input, init, method);
    const requestId = `api_${Date.now()}_${apiBridgeSequence++}`;

    return new Promise<Response>((resolve, reject) => {
      const timeoutId = window.setTimeout(() => {
        apiBridgeState.pending.delete(requestId);
        reject(new Error("API proxy timed out"));
      }, 30000);

      apiBridgeState.pending.set(requestId, {
        resolve,
        reject,
        timeoutId,
      });

      window.vscode?.postMessage({
        type: "lanonasis:api:request",
        payload: {
          requestId,
          url: requestUrl,
          init: {
            method,
            headers,
            body,
          },
        },
      });
    });
  };
}

installApiBridge();

function App() {
  const [injectedChat, setInjectedChat] = useState("");
  const [apiUrl, setApiUrl] = useState("https://api.lanonasis.com");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMethod, setAuthMethod] = useState<AuthMethod>("none");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<{
    id?: string;
    name?: string;
    email?: string;
  } | null>(null);

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
        const nextIsAuthenticated = message.payload?.isAuthenticated as
          | boolean
          | undefined;
        const nextAuthMethod = message.payload?.authMethod as
          | AuthMethod
          | undefined;
        const user = message.payload?.user as
          | { id?: string; name?: string; email?: string }
          | null
          | undefined;

        if (newApiUrl) {
          setApiUrl(newApiUrl);
          updateApiBridgeConfig(newApiUrl);
        }
        if (nextIsAuthenticated !== undefined) {
          setIsAuthenticated(nextIsAuthenticated);
          setAuthLoading(false);
          setAuthError(null);
        }
        if (nextAuthMethod !== undefined) {
          setAuthMethod(nextAuthMethod);
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
    setIsAuthenticated(false);
    setAuthMethod("none");
    setAuthError(null);
    setAuthLoading(false);
    window.vscode?.setState?.({
      injectedChat,
      authError: null,
    });
  };

  return (
    <MemoryProvider apiUrl={apiUrl}>
      <IDEPanel
        initialChatInput={injectedChat}
        onAttachFromClipboard={handleAttachFromClipboard}
        isAuthenticated={isAuthenticated}
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
