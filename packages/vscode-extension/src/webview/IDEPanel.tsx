/**
 * IDEPanel - Main sidebar component for L0 Memory VS Code Extension
 * Uses @lanonasis/memory-client for memory operations
 * Auth is managed by VS Code extension host (secrets storage)
 */
import React, { useState, useEffect } from "react";
import {
  useMemories,
  useCreateMemory,
  useSearchMemories,
} from "@lanonasis/memory-client/react";
import type {
  MemoryEntry,
  CreateMemoryRequest,
} from "@lanonasis/memory-client/react";
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

  useEffect(() => {
    if (initialChatInput !== undefined) {
      setChatInput(initialChatInput);
    }
  }, [initialChatInput]);

  // Handle search with debounce
  useEffect(() => {
    if (searchQuery.length > 2) {
      search(searchQuery);
    }
  }, [searchQuery, search]);

  const displayMemories = searchQuery.length > 2 ? searchResults : memories;

  const handleCreate = async () => {
    const content = chatInput.trim();
    if (!content) {
      // Don't create empty memories
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
    }
  };

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      await refresh();
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSendChat = async () => {
    // Create a memory from the chat input
    const content = chatInput.trim();
    if (!content) return;

    try {
      const request: CreateMemoryRequest = {
        title: content.slice(0, 50) + (content.length > 50 ? "..." : ""),
        content,
        memory_type: "context",
        tags: [],
      };
      await createMemory(request);
      setChatInput("");
      await refresh();
    } catch (err) {
      console.error("Failed to create memory from chat:", err);
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
                {userEmail && (
                  <span
                    className="text-[10px] text-[var(--vscode-descriptionForeground)] mr-2 max-w-[100px] truncate"
                    title={userEmail}
                  >
                    {userEmail}
                  </span>
                )}
                <Button variant="ghost" size="icon" title="Settings">
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

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Memory Assistant Section */}
          <SectionHeader
            title="Memory Assistant"
            isOpen={isAssistantOpen}
            onToggle={() => setIsAssistantOpen(!isAssistantOpen)}
          />
          {isAssistantOpen && (
            <div className="min-h-[80px] p-4 text-[13px] text-[var(--vscode-descriptionForeground)] flex items-center justify-center text-center italic opacity-80">
              {isAuthenticated
                ? "Ready to assist. Ask me to recall context or refine prompts."
                : "Please connect to enable AI assistance."}
            </div>
          )}

          {/* Memories Section */}
          <SectionHeader
            title="Memories"
            isOpen={isMemoriesOpen}
            onToggle={() => setIsMemoriesOpen(!isMemoriesOpen)}
            actions={
              isAuthenticated && (
                <>
                  <Button variant="ghost" size="icon">
                    {icons.search}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={handleSync}>
                    {icons.refresh}
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
                      disabled={createLoading || memoriesLoading}
                    >
                      {icons.plus}
                      Create
                    </Button>
                    <Button
                      className="flex-1 h-7 gap-1.5"
                      variant="secondary"
                      onClick={handleSync}
                      disabled={isSyncing || memoriesLoading}
                    >
                      <span className={isSyncing ? "animate-spin" : ""}>
                        {icons.refresh}
                      </span>
                      {isSyncing ? "Syncing..." : "Sync"}
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
                placeholder={
                  isAuthenticated ? "Refine context..." : "Connect to chat"
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
                disabled={!isAuthenticated || !chatInput.trim()}
                onClick={handleSendChat}
                title="Send"
              >
                {icons.send}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IDEPanel;
