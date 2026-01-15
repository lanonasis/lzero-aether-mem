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
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import {
  useMemories,
  useCreateMemory,
  useSearchMemories,
  useMemoryClient,
} from "@lanonasis/memory-client/react";
import type {
  MemoryEntry,
  CreateMemoryRequest,
  UpdateMemoryRequest,
  CoreMemoryClient,
} from "@lanonasis/memory-client/react";

// Types for cache and sync
interface CachedMemory extends MemoryEntry {
  id: string;
  title: string;
  content: string;
  memory_type: string;
  tags: string[];
  created_at?: string;
  updated_at?: string;
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

interface MemoryEditDraft {
  title: string;
  content: string;
  memory_type: string;
  tags: string;
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
  edit: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  ),
  trash: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
    </svg>
  ),
  copy: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  ),
  close: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
};

const MEMORY_TYPES = [
  "context",
  "project",
  "knowledge",
  "reference",
  "personal",
  "workflow",
] as const;

const formatDateShort = (dateStr?: string) => {
  if (!dateStr) return "—";
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return "—";
  }
};

const formatDateTime = (dateStr?: string) => {
  if (!dateStr) return "—";
  try {
    const date = new Date(dateStr);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "—";
  }
};

const tagsToText = (tags?: string[]) =>
  tags && tags.length > 0 ? tags.join(", ") : "";

const parseTags = (value: string) =>
  value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

const matchesQuery = (memory: CachedMemory, query: string) => {
  const q = query.toLowerCase();
  return (
    memory.title.toLowerCase().includes(q) ||
    memory.content.toLowerCase().includes(q) ||
    (memory.tags || []).some((tag) => tag.toLowerCase().includes(q))
  );
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
    <div className="space-y-3 select-none">
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-[var(--vscode-editor-foreground)]">
          Connect to sync memories
        </h2>
        <p className="text-[12px] text-[var(--vscode-descriptionForeground)] leading-relaxed">
          You can still work locally, but connecting unlocks sync and full AI
          search.
        </p>

        {error && (
          <div className="p-2 rounded text-[12px] bg-red-500/10 text-red-400 border border-red-500/20">
            {error}
          </div>
        )}

        {showApiKeyInput ? (
          <div className="space-y-2 pt-1">
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
          <div className="space-y-2 pt-1">
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
          </div>
        )}
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
        <span className="opacity-60">{formatDateShort(memory.created_at)}</span>
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
      {memory._pending && (
        <div className="text-[10px] text-yellow-400 pl-5">
          Pending {memory._pending}
        </div>
      )}
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
  isAuthenticated: boolean;
  hasLocalMemories: boolean;
  onConnect?: () => void;
}

const OfflineStatusBanner: React.FC<OfflineStatusProps> = ({
  syncStatus,
  onSync,
  isAuthenticated,
  hasLocalMemories,
  onConnect,
}) => {
  const showLocal = !isAuthenticated;
  if (!showLocal && syncStatus.isOnline && syncStatus.pendingCount === 0)
    return null;

  return (
    <div
      className={`px-3 py-2 text-[11px] flex items-center justify-between ${
        showLocal
          ? "bg-blue-500/10 text-blue-300 border-b border-blue-500/20"
          : syncStatus.isOnline
          ? "bg-yellow-500/10 text-yellow-400 border-b border-yellow-500/20"
          : "bg-red-500/10 text-red-400 border-b border-red-500/20"
      }`}
    >
      <div className="flex items-center gap-2">
        {showLocal ? (
          <>
            <span className="opacity-80">{icons.globe}</span>
            <span>Local mode{hasLocalMemories ? "" : " (no cache yet)"}</span>
          </>
        ) : !syncStatus.isOnline ? (
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
      {showLocal
        ? onConnect && (
            <button
              onClick={onConnect}
              className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 hover:bg-blue-500/30 transition-colors"
            >
              Connect
            </button>
          )
        : syncStatus.pendingCount > 0 &&
          syncStatus.isOnline && (
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
  onOpenMemory?: (memory: CachedMemory) => void;
}

const ChatMessageView: React.FC<ChatMessageProps> = ({
  message,
  onOpenMemory,
}) => {
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
              className="p-2 rounded bg-[var(--vscode-editor-background)] border border-[var(--vscode-panel-border)] text-[12px] cursor-pointer hover:border-[var(--vscode-focusBorder)]"
              onClick={() => onOpenMemory?.(memory)}
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
  /** Current user name (if available) */
  userName?: string | null;
  /** Auth method for display */
  authMethod?: "apiKey" | "oauth" | "none";
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
  userName = null,
  authMethod = "none",
}) => {
  // Memory hooks from @lanonasis/memory-client/react
  const {
    memories,
    loading: memoriesLoading,
    refresh,
  } = useMemories({
    limit: 200,
    order: "desc",
  });
  const { createMemory, loading: createLoading } = useCreateMemory();
  const {
    search,
    results: searchResults,
    loading: searchLoading,
  } = useSearchMemories();
  const memoryClient = useMemoryClient() as CoreMemoryClient;

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
  const [errorNotification, setErrorNotification] = useState<string | null>(
    null
  );
  const [selectedMemory, setSelectedMemory] = useState<CachedMemory | null>(
    null
  );
  const [isEditingMemory, setIsEditingMemory] = useState(false);
  const [editDraft, setEditDraft] = useState<MemoryEditDraft>({
    title: "",
    content: "",
    memory_type: "knowledge",
    tags: "",
  });
  const [isSavingMemory, setIsSavingMemory] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsApiKey, setSettingsApiKey] = useState("");
  const [showSettingsApiKeyInput, setShowSettingsApiKeyInput] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Auto-dismiss error notification after 5 seconds
  useEffect(() => {
    if (errorNotification) {
      const timer = setTimeout(() => setErrorNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorNotification]);

  useEffect(() => {
    if (initialChatInput !== undefined) {
      setChatInput(initialChatInput);
    }
  }, [initialChatInput]);

  const canUseApi = isAuthenticated && syncStatus.isOnline;
  const hasLocalMemories = cachedMemories.length > 0;
  const isLocalMode = !isAuthenticated || !syncStatus.isOnline;
  const authLabel = isAuthenticated
    ? authMethod === "apiKey"
      ? "API key"
      : "OAuth"
    : hasLocalMemories
    ? "Local cache"
    : "Not connected";
  const userDisplayName = userName || userEmail || null;
  const selectedIsLocal =
    !!selectedMemory &&
    (selectedMemory.id.startsWith("local_") ||
      selectedMemory._pending === "create");

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
          (prev) =>
            message.payload?.status || {
              ...prev,
              isSyncing: false,
              isOnline: true,
            }
        );
      }
      if (message.type === "lanonasis:sync:error") {
        // Only mark as offline for network errors, not API errors (404, etc.)
        const isNetworkError = message.payload?.isNetworkError === true;
        const errorMessage = message.payload?.error || "Sync failed";
        setSyncStatus((prev) => ({
          ...prev,
          isSyncing: false,
          isOnline: isNetworkError ? false : prev.isOnline,
        }));
        // Show error to user
        setErrorNotification(
          isNetworkError ? "Network error - working offline" : errorMessage
        );
      }

      // Handle auth errors
      if (
        message.type === "lanonasis:auth:result" &&
        !message.payload?.success
      ) {
        const errorMessage = message.payload?.error || "Authentication failed";
        setErrorNotification(errorMessage);
      }

      // Handle AI search results
      if (message.type === "lanonasis:ai:search:local") {
        const results = message.payload?.results || [];
        const query = message.payload?.query || "";
        // Update the last assistant message with local results
        setChatMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant") {
            return [
              ...prev.slice(0, -1),
              {
                ...last,
                content:
                  results.length > 0
                    ? `Found ${results.length} local memories:`
                    : `No local matches for "${query}". Try saving more context or connect for full search.`,
                memories: results,
              },
            ];
          }
          return prev;
        });
        setIsAISearching(false);
      }
      if (message.type === "lanonasis:ai:search:api") {
        const results = message.payload?.results || [];
        const query = message.payload?.query || "";
        setIsAISearching(false);
        // Merge with existing results, preferring API results, and update content
        setChatMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant") {
            const existingIds = new Set((last.memories || []).map((m) => m.id));
            const newMemories = results.filter(
              (m: CachedMemory) => !existingIds.has(m.id)
            );
            const allMemories = [
              ...(last.memories || []),
              ...newMemories,
            ].slice(0, 5);
            return [
              ...prev.slice(0, -1),
              {
                ...last,
                content:
                  allMemories.length > 0
                    ? `Found ${allMemories.length} relevant memories:`
                    : `No memories found for "${query}"`,
                memories: allMemories,
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

      if (message.type === "lanonasis:cache:updated") {
        const updatedMemory = message.payload?.memory as
          | CachedMemory
          | undefined;
        if (updatedMemory) {
          setCachedMemories((prev) =>
            prev.map((memory) =>
              memory.id === updatedMemory.id ||
              memory._localId === updatedMemory._localId
                ? updatedMemory
                : memory
            )
          );
          setSelectedMemory((prev) =>
            prev &&
            (prev.id === updatedMemory.id ||
              prev._localId === updatedMemory._localId)
              ? updatedMemory
              : prev
          );
        }
        if (message.payload?.status) {
          setSyncStatus(message.payload.status);
        }
      }

      if (message.type === "lanonasis:cache:deleted") {
        const deletedId = message.payload?.id as string | undefined;
        if (deletedId) {
          setCachedMemories((prev) =>
            prev.filter((memory) => memory.id !== deletedId)
          );
          setSelectedMemory((prev) =>
            prev && prev.id === deletedId ? null : prev
          );
        }
        if (message.payload?.status) {
          setSyncStatus(message.payload.status);
        }
      }

      if (message.type === "lanonasis:cache:cleared") {
        setCachedMemories([]);
        setSelectedMemory(null);
        if (message.payload?.status) {
          setSyncStatus(message.payload.status);
        } else {
          setSyncStatus((prev) => ({
            ...prev,
            lastSyncAt: null,
            pendingCount: 0,
            isSyncing: false,
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
    if (searchQuery.length > 2 && canUseApi) {
      search(searchQuery);
    }
  }, [searchQuery, search, canUseApi]);

  const localSearchResults = useMemo(() => {
    if (searchQuery.length <= 2) return [];
    return cachedMemories.filter((memory) => matchesQuery(memory, searchQuery));
  }, [cachedMemories, searchQuery]);

  const useCacheFirst = isLocalMode || syncStatus.pendingCount > 0;
  const baseMemories = useCacheFirst ? cachedMemories : memories;
  const searchDisplay =
    canUseApi && searchResults.length > 0
      ? (searchResults as CachedMemory[])
      : localSearchResults;

  const displayMemories =
    searchQuery.length > 2
      ? searchDisplay
      : baseMemories.length > 0
      ? baseMemories
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
      if (canUseApi) {
        await createMemory(request);
        setChatInput("");
        await refresh();
      } else {
        throw new Error("Local-only mode");
      }
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
      if (isAuthenticated) {
        await refresh();
      }
    } finally {
      setIsSyncing(false);
    }
  };

  // Parse user intent from natural language
  const parseIntent = (
    input: string
  ): { action: "search" | "create" | "help" | "list"; query: string } => {
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

    // List intent
    const listPatterns = [
      /^list$/i,
      /^list\s+(?:my\s+)?(?:memories|notes)$/i,
      /^show\s+(?:my\s+)?(?:memories|notes)$/i,
      /^recent\s+(?:memories|notes)$/i,
    ];
    if (listPatterns.some((pattern) => pattern.test(input))) {
      return { action: "list", query: "" };
    }

    // Default: search intent
    return { action: "search", query: input };
  };

  const openMemory = useCallback((memory: CachedMemory) => {
    setSelectedMemory(memory);
    setEditDraft({
      title: memory.title || "",
      content: memory.content || "",
      memory_type: memory.memory_type || "knowledge",
      tags: tagsToText(memory.tags),
    });
    setIsEditingMemory(false);
  }, []);

  const closeMemory = useCallback(() => {
    setSelectedMemory(null);
    setIsEditingMemory(false);
  }, []);

  const handleCopyContent = useCallback((content: string) => {
    if (window.vscode) {
      window.vscode.postMessage({
        type: "lanonasis:clipboard:write",
        payload: { text: content },
      });
      return;
    }
    if (navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(content);
    }
  }, []);

  const handleStartEdit = useCallback(() => {
    if (!selectedMemory) return;
    setEditDraft({
      title: selectedMemory.title || "",
      content: selectedMemory.content || "",
      memory_type: selectedMemory.memory_type || "knowledge",
      tags: tagsToText(selectedMemory.tags),
    });
    setIsEditingMemory(true);
  }, [selectedMemory]);

  const handleSaveEdit = useCallback(async () => {
    if (!selectedMemory) return;
    const payload: UpdateMemoryRequest = {
      title: editDraft.title.trim() || selectedMemory.title,
      content: editDraft.content.trim() || selectedMemory.content,
      memory_type:
        (editDraft.memory_type as UpdateMemoryRequest["memory_type"]) ||
        selectedMemory.memory_type,
      tags: parseTags(editDraft.tags),
    };

    setIsSavingMemory(true);
    try {
      if (canUseApi) {
        const result = await memoryClient.updateMemory(
          selectedMemory.id,
          payload
        );
        if (result?.error) {
          throw new Error(result.error);
        }
        const updated = (result?.data || selectedMemory) as CachedMemory;
        setSelectedMemory(updated);
        setCachedMemories((prev) =>
          prev.map((memory) => (memory.id === updated.id ? updated : memory))
        );
        setIsEditingMemory(false);
        await refresh();
        return;
      }

      if (window.vscode) {
        window.vscode.postMessage({
          type: "lanonasis:cache:update",
          payload: { id: selectedMemory.id, updates: payload },
        });
        setSelectedMemory((prev) =>
          prev
            ? {
                ...prev,
                ...payload,
                tags: payload.tags || prev.tags,
                updated_at: new Date().toISOString(),
              }
            : prev
        );
      }
      setIsEditingMemory(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Update failed";
      setErrorNotification(message);
    } finally {
      setIsSavingMemory(false);
    }
  }, [
    selectedMemory,
    editDraft.title,
    editDraft.content,
    editDraft.memory_type,
    editDraft.tags,
    canUseApi,
    memoryClient,
    refresh,
  ]);

  const handleDeleteSelected = useCallback(async () => {
    if (!selectedMemory) return;
    const confirmDelete = window.confirm(
      `Delete "${selectedMemory.title}"? This cannot be undone.`
    );
    if (!confirmDelete) return;

    setIsSavingMemory(true);
    try {
      if (canUseApi) {
        const result = await memoryClient.deleteMemory(selectedMemory.id);
        if (result?.error) {
          throw new Error(result.error);
        }
        await refresh();
      } else if (window.vscode) {
        window.vscode.postMessage({
          type: "lanonasis:cache:delete",
          payload: { id: selectedMemory.id },
        });
      }
      setCachedMemories((prev) =>
        prev.filter((memory) => memory.id !== selectedMemory.id)
      );
      setSelectedMemory(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Delete failed";
      setErrorNotification(message);
    } finally {
      setIsSavingMemory(false);
    }
  }, [selectedMemory, canUseApi, memoryClient, refresh]);

  const handleOpenSettings = useCallback(() => {
    setIsSettingsOpen(true);
  }, []);

  const handleCloseSettings = useCallback(() => {
    setIsSettingsOpen(false);
    setShowSettingsApiKeyInput(false);
    setSettingsApiKey("");
  }, []);

  const handleSubmitSettingsApiKey = useCallback(() => {
    if (!settingsApiKey.trim()) return;
    if (onLoginApiKey) {
      onLoginApiKey(settingsApiKey.trim());
    }
    setSettingsApiKey("");
    setShowSettingsApiKeyInput(false);
  }, [settingsApiKey, onLoginApiKey]);

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
      const request: CreateMemoryRequest = {
        title:
          intent.query.slice(0, 50) + (intent.query.length > 50 ? "..." : ""),
        content: intent.query,
        memory_type: "knowledge",
        tags: [],
      };

      if (canUseApi) {
        try {
          await createMemory(request);
          const confirmMessage: ChatMessage = {
            id: `assistant_${Date.now()}`,
            role: "assistant",
            content: `✅ Memory saved: "${intent.query.slice(0, 50)}${
              intent.query.length > 50 ? "..." : ""
            }"`,
            timestamp: Date.now(),
          };
          setChatMessages((prev) => [...prev, confirmMessage]);
          await refresh();
          return;
        } catch (err) {
          console.log("Create failed, saving locally:", err);
        }
      }

      // Fall back to local cache
      if (window.vscode) {
        window.vscode.postMessage({
          type: "lanonasis:cache:add",
          payload: { memory: request },
        });
      }
      const confirmMessage: ChatMessage = {
        id: `assistant_${Date.now()}`,
        role: "assistant",
        content: `✅ Memory saved locally (will sync when online): "${intent.query.slice(
          0,
          50
        )}${intent.query.length > 50 ? "..." : ""}"`,
        timestamp: Date.now(),
      };
      setChatMessages((prev) => [...prev, confirmMessage]);
      return;
    }

    if (intent.action === "list") {
      const listSource =
        canUseApi && memories.length > 0
          ? (memories as CachedMemory[])
          : cachedMemories;
      const preview = listSource.slice(0, 5);
      const listMessage: ChatMessage = {
        id: `assistant_${Date.now()}`,
        role: "assistant",
        content:
          preview.length > 0
            ? `Here are your recent memories:`
            : "I don't have any memories yet. Try saving one!",
        memories: preview,
        timestamp: Date.now(),
      };
      setChatMessages((prev) => [...prev, listMessage]);
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
    // The extension host handles both local and API search, sending results via messages
    // This avoids race conditions from duplicate API calls
    if (window.vscode) {
      window.vscode.postMessage({
        type: "lanonasis:ai:search",
        payload: { query: intent.query },
      });
    } else {
      // Fallback for non-vscode context (e.g., browser testing)
      try {
        await search(intent.query);
        const results = cachedMemories.filter((memory) =>
          matchesQuery(memory, intent.query)
        );
        setChatMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant") {
            return [
              ...prev.slice(0, -1),
              {
                ...last,
                content:
                  results && results.length > 0
                    ? `Found ${results.length} relevant memories:`
                    : `No memories found for "${intent.query}"`,
                memories: (results || []) as CachedMemory[],
              },
            ];
          }
          return prev;
        });
      } catch (err) {
        console.log("Search failed:", err);
      } finally {
        setIsAISearching(false);
      }
    }
  };

  return (
    <div className="flex h-screen w-full bg-[var(--vscode-sideBar-background)] text-[var(--vscode-sideBar-foreground)] font-sans overflow-hidden justify-center select-none">
      <div className="w-full max-w-[400px] h-full flex flex-col bg-[var(--vscode-sideBar-background)] relative">
        {/* Error Notification Banner */}
        {errorNotification && (
          <div className="absolute top-0 left-0 right-0 z-50 px-3 py-2 bg-red-900/90 border-b border-red-700 flex items-center justify-between">
            <span className="text-[11px] text-red-200">
              {errorNotification}
            </span>
            <button
              onClick={() => setErrorNotification(null)}
              className="text-red-200 hover:text-white text-xs ml-2"
            >
              ✕
            </button>
          </div>
        )}

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

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-[10px] text-[var(--vscode-descriptionForeground)]">
              <div
                className={`h-1.5 w-1.5 rounded-full ${
                  isAuthenticated
                    ? syncStatus.isOnline
                      ? "bg-green-500"
                      : "bg-red-500"
                    : "bg-yellow-500"
                }`}
                title={
                  isAuthenticated
                    ? syncStatus.isOnline
                      ? "Online"
                      : "Offline"
                    : "Local"
                }
              />
              <span>
                {isAuthenticated
                  ? syncStatus.isOnline
                    ? "Online"
                    : "Offline"
                  : "Local"}
              </span>
            </div>
            <span className="text-[10px] text-[var(--vscode-descriptionForeground)] opacity-80">
              {authLabel}
            </span>
            {isLocalMode && (
              <span className="text-[10px] text-blue-300/90">Local mode</span>
            )}
            {isAuthenticated && (
              <span className="text-[10px] text-[var(--vscode-descriptionForeground)] opacity-80">
                {syncStatus.isSyncing
                  ? "Syncing..."
                  : syncStatus.pendingCount > 0
                  ? `${syncStatus.pendingCount} pending`
                  : syncStatus.lastSyncAt
                  ? `Synced ${formatDateShort(
                      new Date(syncStatus.lastSyncAt).toISOString()
                    )}`
                  : "Not synced"}
              </span>
            )}
            {userDisplayName && (
              <span
                className="text-[10px] text-[var(--vscode-descriptionForeground)] max-w-[120px] truncate"
                title={userDisplayName}
              >
                {userDisplayName}
              </span>
            )}
            <Button
              variant="ghost"
              size="icon"
              title="Settings"
              onClick={handleOpenSettings}
            >
              {icons.settings}
            </Button>
            {isAuthenticated && (
              <Button
                variant="ghost"
                size="icon"
                title="Logout"
                onClick={onLogout}
              >
                {icons.logout}
              </Button>
            )}
          </div>
        </div>

        {/* Offline/Pending Status Banner */}
        <OfflineStatusBanner
          syncStatus={syncStatus}
          onSync={handleSync}
          isAuthenticated={isAuthenticated}
          hasLocalMemories={hasLocalMemories}
          onConnect={handleOpenSettings}
        />

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
                    <>
                      <p className="italic opacity-80">
                        Local mode: search cached memories or save new ones.
                      </p>
                      <p className="text-[11px] mt-1 opacity-60">
                        Connect for full AI search and sync.
                      </p>
                    </>
                  )}
                </div>
              ) : (
                chatMessages.map((msg) => (
                  <ChatMessageView
                    key={msg.id}
                    message={msg}
                    onOpenMemory={openMemory}
                  />
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
            title={`Memories${
              syncStatus.pendingCount > 0
                ? ` (${syncStatus.pendingCount} pending)`
                : ""
            }`}
            isOpen={isMemoriesOpen}
            onToggle={() => setIsMemoriesOpen(!isMemoriesOpen)}
            actions={
              (isAuthenticated || cachedMemories.length > 0) && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => searchInputRef.current?.focus()}
                  >
                    {icons.search}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSync}
                    disabled={!isAuthenticated}
                  >
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
              <div className="p-2 space-y-2">
                {!isAuthenticated && (
                  <div className="rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-editor-background)] p-3">
                    <WelcomeView
                      onLoginOAuth={onLoginOAuth}
                      onLoginApiKey={onLoginApiKey}
                      isLoading={authLoading}
                      error={authError}
                    />
                  </div>
                )}

                {/* Search */}
                <Input
                  ref={searchInputRef}
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
                      icons.plus
                    )}
                    {createLoading
                      ? "Creating..."
                      : canUseApi
                      ? "Create"
                      : "Save Local"}
                  </Button>
                  <Button
                    className="flex-1 h-7 gap-1.5"
                    variant="secondary"
                    onClick={handleSync}
                    disabled={
                      !isAuthenticated || isSyncing || syncStatus.isSyncing
                    }
                  >
                    <span
                      className={
                        isSyncing || syncStatus.isSyncing ? "animate-spin" : ""
                      }
                    >
                      {icons.refresh}
                    </span>
                    {isSyncing || syncStatus.isSyncing ? "Syncing..." : "Sync"}
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
                      <MemoryCard
                        key={memory.id}
                        memory={memory}
                        onClick={() => openMemory(memory as CachedMemory)}
                      />
                    ))
                  )}
                </div>
              </div>
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
                    : "Search cached memories or save a note"
                }
                className="w-full min-h-[40px] bg-transparent border-none text-[13px] text-[var(--vscode-input-foreground)] placeholder:text-[var(--vscode-input-placeholderForeground)] resize-none focus:outline-none font-sans"
              />
            </div>

            <div className="absolute left-2 bottom-1.5 flex gap-1">
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6"
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
                disabled={!chatInput.trim() || isAISearching}
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

        {selectedMemory && (
          <div
            className="absolute inset-0 z-40"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.35)" }}
          >
            <div className="absolute inset-0" onClick={closeMemory} />
            <div className="relative h-full w-full p-3">
              <div className="flex h-full flex-col rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-sideBar-background)] p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="text-[10px] uppercase tracking-wide text-[var(--vscode-descriptionForeground)] opacity-70">
                      Memory Detail
                    </div>
                    <h3 className="text-[14px] font-semibold text-[var(--vscode-editor-foreground)]">
                      {selectedMemory.title}
                    </h3>
                    <div className="text-[11px] text-[var(--vscode-descriptionForeground)]">
                      {formatDateTime(
                        selectedMemory.updated_at || selectedMemory.created_at
                      )}
                      {" • "}
                      {selectedMemory.memory_type}
                      {" • "}
                      {selectedIsLocal ? "Local" : "Synced"}
                      {selectedMemory._pending
                        ? ` (${selectedMemory._pending})`
                        : ""}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Copy content"
                      onClick={() => handleCopyContent(selectedMemory.content)}
                    >
                      {icons.copy}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Edit memory"
                      onClick={handleStartEdit}
                    >
                      {icons.edit}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Delete memory"
                      onClick={handleDeleteSelected}
                      disabled={isSavingMemory}
                    >
                      {icons.trash}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Close"
                      onClick={closeMemory}
                    >
                      {icons.close}
                    </Button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto mt-3">
                  {isEditingMemory ? (
                    <div className="flex flex-col gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] text-[var(--vscode-descriptionForeground)]">
                          Title
                        </label>
                        <Input
                          value={editDraft.title}
                          onChange={(e) =>
                            setEditDraft((prev) => ({
                              ...prev,
                              title: e.target.value,
                            }))
                          }
                          className="h-8 text-[13px]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] text-[var(--vscode-descriptionForeground)]">
                          Type
                        </label>
                        <select
                          value={editDraft.memory_type}
                          onChange={(e) =>
                            setEditDraft((prev) => ({
                              ...prev,
                              memory_type: e.target.value,
                            }))
                          }
                          className="vscode-input h-8 w-full rounded-sm border border-[var(--vscode-input-border)] bg-[var(--vscode-input-background)] px-2 text-[13px] text-[var(--vscode-input-foreground)]"
                        >
                          {MEMORY_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] text-[var(--vscode-descriptionForeground)]">
                          Tags (comma separated)
                        </label>
                        <Input
                          value={editDraft.tags}
                          onChange={(e) =>
                            setEditDraft((prev) => ({
                              ...prev,
                              tags: e.target.value,
                            }))
                          }
                          className="h-8 text-[13px]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] text-[var(--vscode-descriptionForeground)]">
                          Content
                        </label>
                        <textarea
                          value={editDraft.content}
                          onChange={(e) =>
                            setEditDraft((prev) => ({
                              ...prev,
                              content: e.target.value,
                            }))
                          }
                          className="vscode-input w-full min-h-[140px] rounded-sm border border-[var(--vscode-input-border)] bg-[var(--vscode-input-background)] p-2 text-[13px] text-[var(--vscode-input-foreground)] resize-none"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <div
                        className="text-[13px] text-[var(--vscode-editor-foreground)]"
                        style={{ whiteSpace: "pre-wrap" }}
                      >
                        {selectedMemory.content}
                      </div>
                      {selectedMemory.tags?.length > 0 && (
                        <div
                          className="flex gap-1"
                          style={{ flexWrap: "wrap" }}
                        >
                          {selectedMemory.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-1.5 py-0.5 rounded bg-[var(--vscode-badge-background)]/10 text-[11px] text-[var(--vscode-editor-foreground)]"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[var(--vscode-panel-border)] mt-3">
                  {isEditingMemory ? (
                    <div className="flex gap-2">
                      <Button
                        className="flex-1 h-7"
                        onClick={handleSaveEdit}
                        disabled={isSavingMemory}
                      >
                        {isSavingMemory ? "Saving..." : "Save Changes"}
                      </Button>
                      <Button
                        className="flex-1 h-7"
                        variant="secondary"
                        onClick={() => setIsEditingMemory(false)}
                        disabled={isSavingMemory}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-[11px] text-[var(--vscode-descriptionForeground)]">
                      <span>
                        Updated {formatDateTime(selectedMemory.updated_at)}
                      </span>
                      {selectedMemory._pending && (
                        <span className="text-yellow-400">Pending sync</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {isSettingsOpen && (
          <div
            className="absolute inset-0 z-50"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.35)" }}
          >
            <div className="absolute inset-0" onClick={handleCloseSettings} />
            <div className="relative h-full w-full p-3">
              <div className="flex h-full flex-col rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-sideBar-background)] p-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-[14px] font-semibold text-[var(--vscode-editor-foreground)]">
                    Settings
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    title="Close"
                    onClick={handleCloseSettings}
                  >
                    {icons.close}
                  </Button>
                </div>

                <div className="flex-1 overflow-y-auto mt-3 space-y-3">
                  <div className="rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-editor-background)] p-3 space-y-2">
                    <div className="text-[10px] uppercase tracking-wide text-[var(--vscode-descriptionForeground)] opacity-70">
                      Connection
                    </div>
                    <div className="text-[12px] text-[var(--vscode-editor-foreground)]">
                      Status:{" "}
                      {isAuthenticated
                        ? syncStatus.isOnline
                          ? "Online"
                          : "Offline"
                        : "Local"}
                    </div>
                    <div className="text-[12px] text-[var(--vscode-editor-foreground)]">
                      Auth: {authLabel}
                    </div>
                    {(userName || userEmail) && (
                      <div className="text-[12px] text-[var(--vscode-editor-foreground)]">
                        User: {userName || userEmail}
                      </div>
                    )}
                    {userName && userEmail && (
                      <div className="text-[12px] text-[var(--vscode-descriptionForeground)]">
                        Email: {userEmail}
                      </div>
                    )}
                    <div className="text-[12px] text-[var(--vscode-editor-foreground)]">
                      Last sync:{" "}
                      {syncStatus.lastSyncAt
                        ? formatDateTime(
                            new Date(syncStatus.lastSyncAt).toISOString()
                          )
                        : "—"}
                    </div>
                    <div className="text-[12px] text-[var(--vscode-editor-foreground)]">
                      Pending changes: {syncStatus.pendingCount}
                    </div>
                  </div>

                  <div className="rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-editor-background)] p-3 space-y-2">
                    <div className="text-[10px] uppercase tracking-wide text-[var(--vscode-descriptionForeground)] opacity-70">
                      API Access
                    </div>
                    {isAuthenticated ? (
                      <div className="text-[12px] text-[var(--vscode-descriptionForeground)]">
                        Connected via {authLabel}.
                      </div>
                    ) : (
                      <div className="text-[12px] text-[var(--vscode-descriptionForeground)]">
                        Connect to sync and search across devices.
                      </div>
                    )}

                    {showSettingsApiKeyInput ? (
                      <div className="space-y-2">
                        <Input
                          type="password"
                          placeholder="Enter your API key (lano_... or lns_...)"
                          value={settingsApiKey}
                          onChange={(e) => setSettingsApiKey(e.target.value)}
                          className="h-8 text-[13px]"
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleSubmitSettingsApiKey()
                          }
                        />
                        <div className="flex gap-2">
                          <Button
                            className="flex-1"
                            onClick={handleSubmitSettingsApiKey}
                            disabled={!settingsApiKey.trim() || authLoading}
                          >
                            {authLoading ? "Connecting..." : "Save API Key"}
                          </Button>
                          <Button
                            className="flex-1"
                            variant="secondary"
                            onClick={() => {
                              setShowSettingsApiKeyInput(false);
                              setSettingsApiKey("");
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          className="flex-1 h-7"
                          onClick={onLoginOAuth}
                          disabled={authLoading}
                        >
                          {authLoading ? "Connecting..." : "Connect in Browser"}
                        </Button>
                        <Button
                          className="flex-1 h-7"
                          variant="secondary"
                          onClick={() => setShowSettingsApiKeyInput(true)}
                          disabled={authLoading}
                        >
                          Enter API Key
                        </Button>
                      </div>
                    )}

                    <Button
                      className="w-full h-7"
                      variant="secondary"
                      onClick={() =>
                        window.vscode?.postMessage({
                          type: "lanonasis:open-dashboard",
                          payload: { section: "api-keys" },
                        })
                      }
                    >
                      Manage API Keys in Dashboard
                    </Button>
                  </div>

                  <div className="rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-editor-background)] p-3 space-y-2">
                    <div className="text-[10px] uppercase tracking-wide text-[var(--vscode-descriptionForeground)] opacity-70">
                      Cache
                    </div>
                    <div className="text-[12px] text-[var(--vscode-descriptionForeground)]">
                      Clear cached memories and pending changes stored locally.
                    </div>
                    <Button
                      className="w-full h-7"
                      variant="secondary"
                      onClick={() => {
                        const confirmClear = window.confirm(
                          "Clear cached memories and pending changes? This cannot be undone."
                        );
                        if (confirmClear) {
                          window.vscode?.postMessage({
                            type: "lanonasis:cache:clear",
                          });
                        }
                      }}
                    >
                      Clear Local Cache
                    </Button>
                  </div>

                  <div className="rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-editor-background)] p-3 space-y-2">
                    <div className="text-[10px] uppercase tracking-wide text-[var(--vscode-descriptionForeground)] opacity-70">
                      Extension Settings
                    </div>
                    <Button
                      className="w-full h-7"
                      variant="secondary"
                      onClick={() =>
                        window.vscode?.postMessage({
                          type: "lanonasis:open-settings",
                        })
                      }
                    >
                      Open VS Code Settings
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IDEPanel;
