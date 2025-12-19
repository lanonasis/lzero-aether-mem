/**
 * IDEPanel - Main sidebar component for L0 Memory VS Code Extension
 * Uses @lanonasis/memory-client for memory operations
 * Auth is managed by VS Code extension host (secrets storage)
 *
 * Enhanced Features:
 * - Local memory caching with offline support
 * - Natural language semantic search
 * - AI-powered chat interface
 * - Sync status and pending queue indicator
 */
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  useMemories,
  useCreateMemory,
  useSearchMemories,
} from "@lanonasis/memory-client/react";
import type {
  MemoryEntry,
  CreateMemoryRequest,
} from "@lanonasis/memory-client/react";

// Types for cache and sync
interface CachedMemory extends MemoryEntry {
  _pending?: "create" | "update" | "delete";
  _localId?: string;
}

interface SyncStatus {
  isOnline: boolean;
  lastSyncAt: number | null;
  pendingCount: number;
  isSyncing: boolean;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  memories?: CachedMemory[];
  timestamp: number;
}

// VS Code API bridge
declare global {
  interface Window {
    vscode?: {
      postMessage: (message: unknown) => void;
      getState: () => unknown;
      setState: (state: unknown) => void;
    };
  }
}
import { Button, Input } from "./components/ui";
import { L0Logo } from "./components/L0Logo";

// Icons (inline SVG to avoid external dependencies)
const icons = {
  search: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  ),
  plus: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  refresh: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M23 4v6h-6M1 20v-6h6" />
      <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
    </svg>
  ),
  settings: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  ),
  logout: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
    </svg>
  ),
  chevronRight: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="9,18 15,12 9,6" />
    </svg>
  ),
  globe: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
  lightbulb: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M9 18h6M10 22h4M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14" />
    </svg>
  ),
  file: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14,2 14,8 20,8" />
    </svg>
  ),
  send: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22,2 15,22 11,13 2,9 22,2" />
    </svg>
  ),
  paperclip: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l8.57-8.57A4 4 0 1118 8.84l-8.59 8.57a2 2 0 01-2.83-2.83l8.49-8.48" />
    </svg>
  ),
};

// ============================================
// Welcome View (Unauthenticated State)
// ============================================

interface WelcomeViewProps {
  onLoginOAuth?: () => void;
  onLoginApiKey?: (apiKey: string) => void;
  isLoading?: boolean;
  error?: string | null;
}

const WelcomeView: React.FC<WelcomeViewProps> = ({
  onLoginOAuth,
  onLoginApiKey,
  isLoading = false,
  error = null,
}) => {
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [apiKeyValue, setApiKeyValue] = useState("");

  const handleApiKeySubmit = () => {
    if (apiKeyValue.trim() && onLoginApiKey) {
      onLoginApiKey(apiKeyValue.trim());
    }
  };

  return (
    <div className="p-4 space-y-6 select-none">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-[var(--vscode-sideBarTitle-foreground)]">
          <L0Logo className="h-5 w-5" size={20} />
          <span className="text-[11px] font-bold uppercase tracking-wide">
            LanOnasis Memory
          </span>
        </div>
        <h2 className="text-sm font-semibold text-[var(--vscode-editor-foreground)]">
          Welcome to L0 Memory
        </h2>
        <p className="text-[13px] text-[var(--vscode-descriptionForeground)] leading-relaxed">
          Authenticate to access synchronized context and intelligent memory.
        </p>

        {error && (
          <div className="p-2 rounded text-[12px] bg-red-500/10 text-red-400 border border-red-500/20">
            {error}
          </div>
        )}

        {showApiKeyInput ? (
          <div className="space-y-2 pt-2">
            <Input
              type="password"
              placeholder="Enter your API key (lano_... or lns_...)"
              value={apiKeyValue}
              onChange={(e) => setApiKeyValue(e.target.value)}
              className="h-8 text-[13px]"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleApiKeySubmit()}
            />
            <div className="flex gap-2">
              <Button
                className="flex-1"
                onClick={handleApiKeySubmit}
                disabled={!apiKeyValue.trim() || isLoading}
              >
                {isLoading ? "Connecting..." : "Connect"}
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowApiKeyInput(false);
                  setApiKeyValue("");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-2 pt-2">
            <Button
              className="w-full"
              onClick={onLoginOAuth}
              disabled={isLoading}
            >
              {isLoading ? "Connecting..." : "Connect in Browser"}
            </Button>
            <Button
              className="w-full"
              variant="secondary"
              onClick={() => setShowApiKeyInput(true)}
              disabled={isLoading}
            >
              Enter API Key
            </Button>
            <p className="text-[11px] text-[var(--vscode-descriptionForeground)] text-center opacity-70">
              Or use Command Palette: "LanOnasis: Authenticate"
            </p>
          </div>
        )}
      </div>

      <div className="h-px bg-[var(--vscode-panel-border)] w-full" />

      <div className="space-y-4">
        <h3 className="text-[11px] font-bold text-[var(--vscode-editor-foreground)] uppercase opacity-80">
          Features
        </h3>

        <div className="space-y-3">
          <div className="flex gap-3">
            <span className="mt-0.5 text-[var(--vscode-button-background)]">
              {icons.lightbulb}
            </span>
            <div className="space-y-1">
              <h4 className="text-[12px] font-medium text-[var(--vscode-editor-foreground)]">
                Intelligent Memory
              </h4>
              <p className="text-[11px] text-[var(--vscode-descriptionForeground)] leading-relaxed opacity-80">
                Vector search and semantic understanding for your codebase.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <span className="mt-0.5 text-[var(--vscode-button-background)]">
              {icons.globe}
            </span>
            <div className="space-y-1">
              <h4 className="text-[12px] font-medium text-[var(--vscode-editor-foreground)]">
                Real-time Sync
              </h4>
              <p className="text-[11px] text-[var(--vscode-descriptionForeground)] leading-relaxed opacity-80">
                Synchronized context across all your devices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// Memory Card Component
// ============================================

interface MemoryCardProps {
  memory: MemoryEntry;
  onClick?: () => void;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ memory, onClick }) => {
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "—";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    } catch {
      return "—";
    }
  };

  return (
    <div
      className="group relative flex flex-col gap-1.5 rounded-sm p-2 hover:bg-[var(--vscode-list-hoverBackground)] transition-colors duration-100 cursor-pointer border border-transparent hover:border-[var(--vscode-focusBorder)]"
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[var(--vscode-editor-foreground)] opacity-70 shrink-0">
            {icons.file}
          </span>
          <h3 className="text-[13px] text-[var(--vscode-editor-foreground)] leading-tight line-clamp-1">
            {memory.title}
          </h3>
        </div>
      </div>

      <div className="flex items-center gap-3 text-[11px] text-[var(--vscode-descriptionForeground)] pl-5">
        <span className="opacity-60">{formatDate(memory.created_at)}</span>
        <span className="px-1 rounded bg-[var(--vscode-badge-background)]/10 text-[var(--vscode-editor-foreground)] opacity-60">
          {memory.memory_type}
        </span>
        {memory.tags?.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="px-1 rounded bg-[var(--vscode-badge-background)]/10 text-[var(--vscode-editor-foreground)] opacity-60"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

// ============================================
// Section Header Component
// ============================================

interface SectionHeaderProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  actions?: React.ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  isOpen,
  onToggle,
  actions,
}) => (
  <div
    className="flex items-center justify-between px-2 py-1.5 cursor-pointer hover:bg-[var(--vscode-list-hoverBackground)] group"
    onClick={onToggle}
  >
    <div className="flex items-center">
      <span
        className={`text-[var(--vscode-icon-foreground)] transition-transform mr-0.5 opacity-80 ${
          isOpen ? "rotate-90" : ""
        }`}
      >
        {icons.chevronRight}
      </span>
      <span className="text-[11px] font-bold text-[var(--vscode-sideBarSectionHeader-foreground)] uppercase">
        {title}
      </span>
    </div>
    {actions && (
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {actions}
      </div>
    )}
  </div>
);

// ============================================
// Offline Status Banner
// ============================================

interface OfflineStatusProps {
  syncStatus: SyncStatus;
  onSync: () => void;
}

const OfflineStatusBanner: React.FC<OfflineStatusProps> = ({
  syncStatus,
  onSync,
}) => {
  if (syncStatus.isOnline && syncStatus.pendingCount === 0) return null;

  return (
    <div
      className={`px-3 py-2 text-[11px] flex items-center justify-between ${
        syncStatus.isOnline
          ? "bg-yellow-500/10 text-yellow-400 border-b border-yellow-500/20"
          : "bg-red-500/10 text-red-400 border-b border-red-500/20"
      }`}
    >
      <div className="flex items-center gap-2">
        {!syncStatus.isOnline ? (
          <>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="1" y1="1" x2="23" y2="23" />
              <path d="M16.72 11.06A10.94 10.94 0 0119 12.55" />
              <path d="M5 12.55a10.94 10.94 0 015.17-2.39" />
              <path d="M10.71 5.05A16 16 0 0122.58 9" />
              <path d="M1.42 9a15.91 15.91 0 014.7-2.88" />
              <path d="M8.53 16.11a6 6 0 016.95 0" />
              <line x1="12" y1="20" x2="12.01" y2="20" />
            </svg>
            <span>Offline</span>
          </>
        ) : (
          <>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="animate-pulse"
            >
              <path d="M23 4v6h-6M1 20v-6h6" />
              <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
            </svg>
            <span>{syncStatus.pendingCount} pending</span>
          </>
        )}
      </div>
      {syncStatus.pendingCount > 0 && syncStatus.isOnline && (
        <button
          onClick={onSync}
          disabled={syncStatus.isSyncing}
          className="text-[10px] px-2 py-0.5 rounded bg-yellow-500/20 hover:bg-yellow-500/30 transition-colors disabled:opacity-50"
        >
          {syncStatus.isSyncing ? "Syncing..." : "Sync now"}
        </button>
      )}
    </div>
  );
};

// ============================================
// Chat Message Component
// ============================================

interface ChatMessageProps {
  message: ChatMessage;
}

const ChatMessageView: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex flex-col gap-1 ${isUser ? "items-end" : "items-start"}`}
    >
      <div
        className={`max-w-[90%] rounded-lg px-3 py-2 text-[13px] ${
          isUser
            ? "bg-[var(--vscode-button-background)] text-[var(--vscode-button-foreground)]"
            : "bg-[var(--vscode-editor-background)] text-[var(--vscode-editor-foreground)] border border-[var(--vscode-panel-border)]"
        }`}
      >
        {message.content}
      </div>

      {/* Show relevant memories for assistant responses */}
      {!isUser && message.memories && message.memories.length > 0 && (
        <div className="w-full mt-2 space-y-1">
          <div className="text-[10px] text-[var(--vscode-descriptionForeground)] uppercase tracking-wide px-1">
            Related memories ({message.memories.length})
          </div>
          {message.memories.slice(0, 3).map((memory) => (
            <div
              key={memory.id}
              className="p-2 rounded bg-[var(--vscode-editor-background)] border border-[var(--vscode-panel-border)] text-[12px]"
            >
              <div className="font-medium text-[var(--vscode-editor-foreground)] line-clamp-1">
                {memory.title}
              </div>
              <div className="text-[var(--vscode-descriptionForeground)] line-clamp-2 mt-0.5">
                {memory.content.slice(0, 100)}
                {memory.content.length > 100 ? "..." : ""}
              </div>
              {memory._pending && (
                <div className="text-[10px] text-yellow-400 mt-1">
                  ⏳ Pending sync
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ============================================
// Main IDEPanel Component
// ============================================

interface IDEPanelProps {
  initialChatInput?: string;
  onAttachFromClipboard?: () => void;
  isAuthenticated?: boolean;
  /** Trigger OAuth browser flow for users without API key */
  onLoginOAuth?: () => void;
  /** Submit API key for users who have one from dashboard */
  onLoginApiKey?: (apiKey: string) => void;
  /** Logout and clear credentials */
  onLogout?: () => void;
  /** Auth loading state */
  authLoading?: boolean;
  /** Auth error message */
  authError?: string | null;
  /** Current user email (if available) */
  userEmail?: string | null;
}

export const IDEPanel: React.FC<IDEPanelProps> = ({
  initialChatInput = "",
  onAttachFromClipboard,
  isAuthenticated = false,
  onLoginOAuth,
  onLoginApiKey,
  onLogout,
  authLoading = false,
  authError = null,
  userEmail = null,
}) => {
  // Memory hooks from @lanonasis/memory-client/react
  const { memories, loading: memoriesLoading, refresh } = useMemories();
  const { createMemory, loading: createLoading } = useCreateMemory();
  const {
    search,
    results: searchResults,
    loading: searchLoading,
  } = useSearchMemories();

  const [searchQuery, setSearchQuery] = useState("");
  const [chatInput, setChatInput] = useState(initialChatInput);
  const [isAssistantOpen, setIsAssistantOpen] = useState(true);
  const [isMemoriesOpen, setIsMemoriesOpen] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  // New state for enhanced features
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isAISearching, setIsAISearching] = useState(false);
  const [cachedMemories, setCachedMemories] = useState<CachedMemory[]>([]);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isOnline: true,
    lastSyncAt: null,
    pendingCount: 0,
    isSyncing: false,
  });
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialChatInput !== undefined) {
      setChatInput(initialChatInput);
    }
  }, [initialChatInput]);

  // Listen for messages from extension host
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;
      if (!message || typeof message !== "object") return;

      // Handle cache data
      if (message.type === "lanonasis:cache:data") {
        setCachedMemories(message.payload?.memories || []);
        if (message.payload?.status) {
          setSyncStatus(message.payload.status);
        }
      }

      // Handle sync status updates
      if (message.type === "lanonasis:sync:start") {
        setSyncStatus((prev) => ({ ...prev, isSyncing: true }));
      }
      if (message.type === "lanonasis:sync:complete") {
        setCachedMemories(message.payload?.memories || []);
        setSyncStatus(
          message.payload?.status || {
            ...syncStatus,
            isSyncing: false,
            isOnline: true,
          }
        );
      }
      if (message.type === "lanonasis:sync:error") {
        // Only mark as offline for network errors, not API errors (404, etc.)
        const isNetworkError = message.payload?.isNetworkError === true;
        setSyncStatus((prev) => ({
          ...prev,
          isSyncing: false,
          isOnline: isNetworkError ? false : prev.isOnline,
        }));
      }

      // Handle AI search results
      if (message.type === "lanonasis:ai:search:local") {
        const results = message.payload?.results || [];
        if (results.length > 0) {
          // Update the last assistant message with local results
          setChatMessages((prev) => {
            const last = prev[prev.length - 1];
            if (last?.role === "assistant") {
              return [...prev.slice(0, -1), { ...last, memories: results }];
            }
            return prev;
          });
        }
      }
      if (message.type === "lanonasis:ai:search:api") {
        const results = message.payload?.results || [];
        setIsAISearching(false);
        // Merge with existing results, preferring API results
        setChatMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant") {
            const existingIds = new Set((last.memories || []).map((m) => m.id));
            const newMemories = results.filter(
              (m: CachedMemory) => !existingIds.has(m.id)
            );
            return [
              ...prev.slice(0, -1),
              {
                ...last,
                memories: [...(last.memories || []), ...newMemories].slice(
                  0,
                  5
                ),
              },
            ];
          }
          return prev;
        });
      }

      // Handle memory added
      if (message.type === "lanonasis:cache:added") {
        const newMemory = message.payload?.memory;
        if (newMemory) {
          setCachedMemories((prev) => [newMemory, ...prev]);
          setSyncStatus((prev) => ({
            ...prev,
            pendingCount: prev.pendingCount + 1,
          }));
        }
      }
    };

    window.addEventListener("message", handleMessage);

    // Request initial cache data
    if (window.vscode) {
      window.vscode.postMessage({ type: "lanonasis:cache:get" });
    }

    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Handle search with debounce
  useEffect(() => {
    if (searchQuery.length > 2) {
      search(searchQuery);
    }
  }, [searchQuery, search]);

  // Combine API memories with cached memories
  const displayMemories =
    searchQuery.length > 2
      ? searchResults
      : memories.length > 0
        ? memories
        : cachedMemories;

  const handleCreate = async () => {
    const content = chatInput.trim() || searchQuery.trim();
    if (!content) {
      // Focus the chat input if no content
      const textarea = document.querySelector("textarea");
      if (textarea) {
        textarea.focus();
        textarea.placeholder = "Type content to save as a memory...";
      }
      return;
    }

    try {
      const request: CreateMemoryRequest = {
        title: content.slice(0, 50) + (content.length > 50 ? "..." : ""),
        content,
        memory_type: "knowledge",
        tags: [],
      };
      await createMemory(request);
      setChatInput("");
      await refresh();
    } catch (err) {
      console.error("Failed to create memory:", err);
      // Fall back to local cache
      if (window.vscode) {
        window.vscode.postMessage({
          type: "lanonasis:cache:add",
          payload: {
            memory: {
              title: content.slice(0, 50) + (content.length > 50 ? "..." : ""),
              content,
              memory_type: "knowledge",
              tags: [],
            },
          },
        });
        setChatInput("");
      }
    }
  };

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      // Request sync from extension host
      if (window.vscode) {
        window.vscode.postMessage({ type: "lanonasis:cache:sync" });
      }
      await refresh();
    } finally {
      setIsSyncing(false);
    }
  };

  // Parse user intent from natural language
  const parseIntent = (
    input: string
  ): { action: "search" | "create" | "help"; query: string } => {
    const lower = input.toLowerCase().trim();

    // Help intent
    if (lower === "help" || lower === "?" || lower.includes("how do i")) {
      return { action: "help", query: input };
    }

    // Create intent
    const createPatterns = [
      /^save\s+(.+)/i,
      /^create\s+(?:a\s+)?(?:memory|note)\s*:?\s*(.+)/i,
      /^remember\s+(.+)/i,
      /^store\s+(.+)/i,
    ];
    for (const pattern of createPatterns) {
      const match = input.match(pattern);
      if (match) {
        return { action: "create", query: match[1] || input };
      }
    }

    // Default: search intent
    return { action: "search", query: input };
  };

  const handleSendChat = async () => {
    const content = chatInput.trim();
    if (!content) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      role: "user",
      content,
      timestamp: Date.now(),
    };
    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");

    // Parse intent
    const intent = parseIntent(content);

    if (intent.action === "help") {
      // Show help message
      const helpMessage: ChatMessage = {
        id: `assistant_${Date.now()}`,
        role: "assistant",
        content: `🧠 **L0 Memory Assistant**\n\nI can help you:\n• **Search**: "find my OAuth notes" or "what was that regex?"\n• **Save**: "save Use PKCE for mobile OAuth"\n• **List**: "show my memories"\n\nTry asking me something!`,
        timestamp: Date.now(),
      };
      setChatMessages((prev) => [...prev, helpMessage]);
      return;
    }

    if (intent.action === "create") {
      // Create a memory
      try {
        const request: CreateMemoryRequest = {
          title:
            intent.query.slice(0, 50) + (intent.query.length > 50 ? "..." : ""),
          content: intent.query,
          memory_type: "knowledge",
          tags: [],
        };
        await createMemory(request);

        const confirmMessage: ChatMessage = {
          id: `assistant_${Date.now()}`,
          role: "assistant",
          content: `✅ Memory saved: "${intent.query.slice(0, 50)}${intent.query.length > 50 ? "..." : ""}"`,
          timestamp: Date.now(),
        };
        setChatMessages((prev) => [...prev, confirmMessage]);
        await refresh();
      } catch (err) {
        // Fall back to local cache
        if (window.vscode) {
          window.vscode.postMessage({
            type: "lanonasis:cache:add",
            payload: {
              memory: {
                title:
                  intent.query.slice(0, 50) +
                  (intent.query.length > 50 ? "..." : ""),
                content: intent.query,
                memory_type: "knowledge",
                tags: [],
              },
            },
          });
        }
        const confirmMessage: ChatMessage = {
          id: `assistant_${Date.now()}`,
          role: "assistant",
          content: `✅ Memory saved locally (will sync when online): "${intent.query.slice(0, 50)}${intent.query.length > 50 ? "..." : ""}"`,
          timestamp: Date.now(),
        };
        setChatMessages((prev) => [...prev, confirmMessage]);
      }
      return;
    }

    // Search intent - use AI search
    setIsAISearching(true);

    // Add assistant response placeholder
    const assistantMessage: ChatMessage = {
      id: `assistant_${Date.now()}`,
      role: "assistant",
      content: `🔍 Searching for: "${intent.query}"`,
      memories: [],
      timestamp: Date.now(),
    };
    setChatMessages((prev) => [...prev, assistantMessage]);

    // Request AI search from extension host
    if (window.vscode) {
      window.vscode.postMessage({
        type: "lanonasis:ai:search",
        payload: { query: intent.query },
      });
    }

    // Also try API search
    try {
      const results = await search(intent.query);
      if (results && results.length > 0) {
        setChatMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant") {
            return [
              ...prev.slice(0, -1),
              {
                ...last,
                content:
                  results.length > 0
                    ? `Found ${results.length} relevant memories:`
                    : `No memories found for "${intent.query}"`,
                memories: results as CachedMemory[],
              },
            ];
          }
          return prev;
        });
      }
    } catch (err) {
      // API search failed, rely on local results
      console.log("API search failed, using local results");
    } finally {
      setIsAISearching(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[var(--vscode-sideBar-background)] text-[var(--vscode-sideBar-foreground)] font-sans overflow-hidden justify-center select-none">
      <div className="w-full max-w-[400px] h-full flex flex-col bg-[var(--vscode-sideBar-background)] relative">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--vscode-sideBar-background)]">
          <div className="flex items-center gap-2">
            <L0Logo
              className="h-4 w-4 text-[var(--vscode-icon-foreground)]"
              size={16}
            />
            <span className="text-[11px] font-bold uppercase tracking-wide text-[var(--vscode-sideBarTitle-foreground)]">
              LanOnasis Memory
            </span>
          </div>

          <div className="flex items-center gap-1">
            {isAuthenticated ? (
              <>
                {/* Online/Offline indicator */}
                <div
                  className={`h-1.5 w-1.5 rounded-full mr-1 ${syncStatus.isOnline ? "bg-green-500" : "bg-red-500"}`}
                  title={syncStatus.isOnline ? "Online" : "Offline"}
                />
                {userEmail && (
                  <span
                    className="text-[10px] text-[var(--vscode-descriptionForeground)] mr-2 max-w-[100px] truncate"
                    title={userEmail}
                  >
                    {userEmail}
                  </span>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  title="Settings"
                  onClick={() => {
                    if (window.vscode) {
                      window.vscode.postMessage({
                        type: "lanonasis:open-settings",
                      });
                    }
                  }}
                >
                  {icons.settings}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  title="Logout"
                  onClick={onLogout}
                >
                  {icons.logout}
                </Button>
              </>
            ) : (
              <div
                className="h-1.5 w-1.5 rounded-full bg-yellow-500"
                title="Not connected"
              />
            )}
          </div>
        </div>

        {/* Offline/Pending Status Banner */}
        {isAuthenticated && (
          <OfflineStatusBanner syncStatus={syncStatus} onSync={handleSync} />
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Memory Assistant Section */}
          <SectionHeader
            title="Memory Assistant"
            isOpen={isAssistantOpen}
            onToggle={() => setIsAssistantOpen(!isAssistantOpen)}
          />
          {isAssistantOpen && (
            <div
              ref={chatContainerRef}
              className="min-h-[120px] max-h-[200px] overflow-y-auto p-3 space-y-3"
            >
              {chatMessages.length === 0 ? (
                <div className="text-[13px] text-[var(--vscode-descriptionForeground)] flex flex-col items-center justify-center text-center py-4">
                  {isAuthenticated ? (
                    <>
                      <div className="text-[var(--vscode-button-background)] mb-2">
                        {icons.lightbulb}
                      </div>
                      <p className="italic opacity-80">
                        Ask me to find or save memories
                      </p>
                      <p className="text-[11px] mt-1 opacity-60">
                        Try: "find my OAuth notes"
                      </p>
                    </>
                  ) : (
                    <p className="italic opacity-80">
                      Please connect to enable AI assistance.
                    </p>
                  )}
                </div>
              ) : (
                chatMessages.map((msg) => (
                  <ChatMessageView key={msg.id} message={msg} />
                ))
              )}
              {isAISearching && (
                <div className="flex items-center gap-2 text-[12px] text-[var(--vscode-descriptionForeground)]">
                  <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Searching...
                </div>
              )}
            </div>
          )}

          {/* Memories Section */}
          <SectionHeader
            title={`Memories${syncStatus.pendingCount > 0 ? ` (${syncStatus.pendingCount} pending)` : ""}`}
            isOpen={isMemoriesOpen}
            onToggle={() => setIsMemoriesOpen(!isMemoriesOpen)}
            actions={
              isAuthenticated && (
                <>
                  <Button variant="ghost" size="icon">
                    {icons.search}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={handleSync}>
                    <span
                      className={
                        isSyncing || syncStatus.isSyncing ? "animate-spin" : ""
                      }
                    >
                      {icons.refresh}
                    </span>
                  </Button>
                </>
              )
            }
          />
          {isMemoriesOpen && (
            <div className="flex-1">
              {isAuthenticated ? (
                <div className="p-2 space-y-2">
                  {/* Search */}
                  <Input
                    placeholder="Search memories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-7 text-[13px]"
                  />

                  {/* Action Buttons */}
                  <div className="flex gap-2 mb-4">
                    <Button
                      className="flex-1 h-7 gap-1.5"
                      onClick={handleCreate}
                      disabled={createLoading}
                    >
                      {createLoading ? (
                        <svg
                          className="animate-spin h-3 w-3"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                      ) : (
                        icons.plus
                      )}
                      {createLoading ? "Creating..." : "Create"}
                    </Button>
                    <Button
                      className="flex-1 h-7 gap-1.5"
                      variant="secondary"
                      onClick={handleSync}
                      disabled={isSyncing || syncStatus.isSyncing}
                    >
                      <span
                        className={
                          isSyncing || syncStatus.isSyncing
                            ? "animate-spin"
                            : ""
                        }
                      >
                        {icons.refresh}
                      </span>
                      {isSyncing || syncStatus.isSyncing
                        ? "Syncing..."
                        : "Sync"}
                    </Button>
                  </div>

                  {/* Memory List */}
                  <div className="space-y-0.5">
                    {memoriesLoading || searchLoading ? (
                      <div className="p-4 text-center text-[13px] text-[var(--vscode-descriptionForeground)]">
                        Loading...
                      </div>
                    ) : displayMemories.length === 0 ? (
                      <div className="p-4 text-center text-[13px] text-[var(--vscode-descriptionForeground)]">
                        {searchQuery
                          ? "No memories found"
                          : cachedMemories.length > 0
                            ? "Loading from cache..."
                            : "No memories yet. Create one!"}
                      </div>
                    ) : (
                      displayMemories.map((memory) => (
                        <MemoryCard key={memory.id} memory={memory} />
                      ))
                    )}
                  </div>
                </div>
              ) : (
                <WelcomeView
                  onLoginOAuth={onLoginOAuth}
                  onLoginApiKey={onLoginApiKey}
                  isLoading={authLoading}
                  error={authError}
                />
              )}
            </div>
          )}
        </div>

        {/* Bottom Chat Interface */}
        <div className="p-3 bg-[var(--vscode-sideBar-background)] border-t border-[var(--vscode-panel-border)]">
          <div className="relative bg-[var(--vscode-input-background)] border border-[var(--vscode-input-border)] focus-within:border-[var(--vscode-focusBorder)] rounded-sm transition-colors">
            <div className="p-2 pb-8">
              <textarea
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendChat();
                  }
                }}
                placeholder={
                  isAuthenticated
                    ? "Ask me anything... (e.g., 'find my OAuth notes')"
                    : "Connect to chat"
                }
                disabled={!isAuthenticated}
                className="w-full min-h-[40px] bg-transparent border-none text-[13px] text-[var(--vscode-input-foreground)] placeholder:text-[var(--vscode-input-placeholderForeground)] resize-none focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed font-sans"
              />
            </div>

            <div className="absolute left-2 bottom-1.5 flex gap-1">
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6"
                disabled={!isAuthenticated}
                onClick={onAttachFromClipboard}
                title="Attach from clipboard"
              >
                {icons.paperclip}
              </Button>
            </div>

            <div className="absolute right-2 bottom-1.5">
              <Button
                size="icon"
                className="h-6 w-6"
                disabled={
                  !isAuthenticated || !chatInput.trim() || isAISearching
                }
                onClick={handleSendChat}
                title="Send (Enter)"
              >
                {isAISearching ? (
                  <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  icons.send
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IDEPanel;
