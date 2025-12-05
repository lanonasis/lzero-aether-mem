import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  RefreshCw,
  Lightbulb,
  Globe,
  Settings,
  ChevronRight,
  MoreHorizontal,
  LogOut,
  User,
  Key,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { useAuth } from "./hooks/useAuth";
import { useMemories } from "./hooks/useMemories";
import { useApiKeys } from "./hooks/useApiKeys";
import { MemoryCard } from "./components/MemoryCard";
import { SearchBar } from "./components/SearchBar";
import { ChatInterface } from "./components/ChatInterface";
import { ApiKeyManager } from "./components/ApiKeyManager";
import { ErrorBoundary } from "@/services/ErrorBoundary";
import { L0Logo } from "@/components/L0Logo";
import { Input } from "@/components/ui/input";

interface WelcomeViewProps {
  onLoginOAuth: () => void;
  onLoginApiKey: (apiKey: string) => void;
  isLoading?: boolean;
  error?: string | null;
}

const WelcomeView = ({
  onLoginOAuth,
  onLoginApiKey,
  isLoading,
  error,
}: WelcomeViewProps) => {
  const [showApiKeyInput, setShowApiKeyInput] = React.useState(false);
  const [apiKeyValue, setApiKeyValue] = React.useState("");

  const handleApiKeySubmit = () => {
    if (apiKeyValue.trim()) {
      onLoginApiKey(apiKeyValue.trim());
    }
  };

  return (
    <div className="p-4 space-y-6 select-none">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-[var(--vscode-sideBarTitle-foreground)]">
          <L0Logo className="h-5 w-5" />
          <span className="text-[11px] font-bold uppercase tracking-wide">
            LanOnasis Memory
          </span>
        </div>
        <h2 className="text-sm font-semibold text-[var(--vscode-editor-foreground)]">
          Welcome to LanOnasis Memory
        </h2>
        <p className="text-[13px] text-[var(--vscode-descriptionForeground)] leading-relaxed">
          Authenticate to access synchronized context and scoped API keys.
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
              placeholder="Enter your API key (lns_...)"
              value={apiKeyValue}
              onChange={(e) => setApiKeyValue(e.target.value)}
              className="vscode-input h-8 text-[13px]"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleApiKeySubmit()}
            />
            <div className="flex gap-2">
              <Button
                className="flex-1 vscode-button"
                onClick={handleApiKeySubmit}
                disabled={!apiKeyValue.trim() || isLoading}
                data-testid="btn-submit-key"
              >
                {isLoading ? "Connecting..." : "Connect"}
              </Button>
              <Button
                className="vscode-button vscode-button-secondary"
                onClick={() => {
                  setShowApiKeyInput(false);
                  setApiKeyValue("");
                }}
                data-testid="btn-cancel-key"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-2 pt-2">
            <Button
              className="w-full vscode-button"
              onClick={onLoginOAuth}
              disabled={isLoading}
              data-testid="btn-connect-browser"
            >
              {isLoading ? "Connecting..." : "Connect in Browser"}
            </Button>
            <Button
              className="w-full vscode-button vscode-button-secondary"
              onClick={() => setShowApiKeyInput(true)}
              disabled={isLoading}
              data-testid="btn-enter-key"
            >
              Enter API Key
            </Button>
          </div>
        )}
      </div>

      <Separator className="bg-[var(--vscode-panel-border)]" />

      <div className="space-y-4">
        <h3 className="text-[11px] font-bold text-[var(--vscode-editor-foreground)] uppercase opacity-80">
          Features
        </h3>

        <div className="space-y-3">
          <div className="flex gap-3">
            <Lightbulb className="h-4 w-4 text-[var(--vscode-button-background)] mt-0.5" />
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
            <Globe className="h-4 w-4 text-[var(--vscode-button-background)] mt-0.5" />
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

interface IDEPanelProps {
  initialChatInput?: string;
  onAttachFromClipboard?: () => void;
}

export const IDEPanel: React.FC<IDEPanelProps> = ({
  initialChatInput = "",
  onAttachFromClipboard,
}) => {
  const {
    isAuthenticated,
    loginWithOAuth,
    loginWithApiKey,
    logout,
    isLoading: authLoading,
    error: authError,
  } = useAuth();
  const {
    searchQuery,
    setSearchQuery,
    filteredMemories,
    isLoading: memoriesLoading,
    createMemory,
    refetch,
  } = useMemories(isAuthenticated);
  const { apiKeys, isLoading: keysLoading } = useApiKeys(isAuthenticated);
  const [chatInput, setChatInput] = useState(initialChatInput);
  const [showApiKeys, setShowApiKeys] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(true);
  const [isMemoriesOpen, setIsMemoriesOpen] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    if (initialChatInput !== undefined) {
      setChatInput(initialChatInput);
    }
  }, [initialChatInput]);

  const handleCreate = async () => {
    // For now, create a memory from the chat input or a placeholder
    const content = chatInput.trim() || "New memory";
    try {
      await createMemory({
        title: content.slice(0, 50) + (content.length > 50 ? "..." : ""),
        content,
        memory_type: "knowledge",
      });
      setChatInput("");
    } catch (err) {
      console.error("Failed to create memory:", err);
    }
  };

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      await refetch();
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="flex h-screen w-full bg-[var(--vscode-sideBar-background)] text-[var(--vscode-sideBar-foreground)] font-sans overflow-hidden justify-center select-none">
        {/* Sidebar Container */}
        <div className="w-full max-w-[400px] h-full flex flex-col bg-[var(--vscode-sideBar-background)] relative">
          {/* Top Header */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--vscode-sideBar-background)]">
            <div className="flex items-center gap-2">
              <L0Logo className="h-4 w-4 text-[var(--vscode-icon-foreground)]" />
              <span className="text-[11px] font-bold uppercase tracking-wide text-[var(--vscode-sideBarTitle-foreground)]">
                LanOnasis Memory
              </span>
            </div>

            <div className="flex items-center gap-1">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 hover:bg-[var(--vscode-list-hoverBackground)] rounded-sm"
                      data-testid="btn-user-menu"
                    >
                      <Settings className="h-3.5 w-3.5 text-[var(--vscode-icon-foreground)]" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-[var(--vscode-menu-background)] border-[var(--vscode-panel-border)] text-[var(--vscode-menu-foreground)] min-w-[160px] p-1 gap-0.5 shadow-xl"
                  >
                    <DropdownMenuLabel className="text-[11px] text-[var(--vscode-descriptionForeground)] px-2 py-1.5 font-normal">
                      My Account
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-[var(--vscode-panel-border)] my-1" />
                    <DropdownMenuItem
                      className="text-[13px] hover:bg-[var(--vscode-menu-selectionBackground)] hover:text-[var(--vscode-menu-selectionForeground)] cursor-pointer rounded-sm px-2 py-1.5"
                      onClick={() => setShowApiKeys(true)}
                      data-testid="menu-api-keys"
                    >
                      <Key className="mr-2 h-3.5 w-3.5 opacity-70" />
                      <span>API Keys</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-[13px] hover:bg-[var(--vscode-menu-selectionBackground)] hover:text-[var(--vscode-menu-selectionForeground)] cursor-pointer rounded-sm px-2 py-1.5"
                      data-testid="menu-profile"
                    >
                      <User className="mr-2 h-3.5 w-3.5 opacity-70" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-[var(--vscode-panel-border)] my-1" />
                    <DropdownMenuItem
                      className="text-[13px] hover:bg-[var(--vscode-menu-selectionBackground)] hover:text-[var(--vscode-menu-selectionForeground)] cursor-pointer rounded-sm px-2 py-1.5"
                      onClick={logout}
                      data-testid="menu-logout"
                    >
                      <LogOut className="mr-2 h-3.5 w-3.5 opacity-70" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 hover:bg-[var(--vscode-list-hoverBackground)] rounded-sm"
                data-testid="btn-more"
              >
                <MoreHorizontal className="h-3.5 w-3.5 text-[var(--vscode-icon-foreground)]" />
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="flex flex-col min-h-full">
              {/* Memory Assistant Section */}
              <Collapsible
                open={isAssistantOpen}
                onOpenChange={setIsAssistantOpen}
              >
                <div
                  className="vscode-section-header group"
                  onClick={() => setIsAssistantOpen(!isAssistantOpen)}
                  data-testid="header-assistant"
                >
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 text-[var(--vscode-icon-foreground)] transition-transform mr-0.5 opacity-80",
                      isAssistantOpen && "rotate-90"
                    )}
                  />
                  <span className="text-[11px] font-bold text-[var(--vscode-sideBarSectionHeader-foreground)] uppercase">
                    Memory Assistant
                  </span>
                </div>
                <CollapsibleContent>
                  <div className="min-h-[80px] p-4 text-[13px] text-[var(--vscode-descriptionForeground)] flex items-center justify-center text-center italic opacity-80">
                    {isAuthenticated
                      ? "Ready to assist. Ask me to recall context or refine prompts."
                      : "Please connect to enable AI assistance."}
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Memories Section */}
              <Collapsible
                open={isMemoriesOpen}
                onOpenChange={setIsMemoriesOpen}
                className="flex-1 flex flex-col"
              >
                <div
                  className="vscode-section-header group"
                  onClick={() => setIsMemoriesOpen(!isMemoriesOpen)}
                  data-testid="header-memories"
                >
                  <div className="flex items-center">
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 text-[var(--vscode-icon-foreground)] transition-transform mr-0.5 opacity-80",
                        isMemoriesOpen && "rotate-90"
                      )}
                    />
                    <span className="text-[11px] font-bold text-[var(--vscode-sideBarSectionHeader-foreground)] uppercase">
                      Memories
                    </span>
                  </div>
                  <div className="flex items-center gap-1 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 hover:bg-[var(--vscode-list-hoverBackground)] rounded-sm"
                      data-testid="btn-search"
                    >
                      <Search className="h-3.5 w-3.5 text-[var(--vscode-icon-foreground)]" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 hover:bg-[var(--vscode-list-hoverBackground)] rounded-sm"
                      data-testid="btn-refresh"
                    >
                      <RefreshCw className="h-3.5 w-3.5 text-[var(--vscode-icon-foreground)]" />
                    </Button>
                  </div>
                </div>

                <CollapsibleContent className="flex-1">
                  {isAuthenticated ? (
                    <div className="p-2 space-y-2">
                      <SearchBar
                        value={searchQuery}
                        onChange={setSearchQuery}
                      />

                      <div className="flex gap-2 mb-4">
                        <Button
                          className="flex-1 vscode-button h-7 gap-1.5"
                          data-testid="btn-create"
                          onClick={handleCreate}
                          disabled={memoriesLoading}
                        >
                          <Plus className="h-3.5 w-3.5" />
                          Create
                        </Button>
                        <Button
                          className="flex-1 vscode-button vscode-button-secondary h-7 gap-1.5"
                          data-testid="btn-sync"
                          onClick={handleSync}
                          disabled={isSyncing || memoriesLoading}
                        >
                          <RefreshCw
                            className={cn(
                              "h-3.5 w-3.5",
                              isSyncing && "animate-spin"
                            )}
                          />
                          {isSyncing ? "Syncing..." : "Sync"}
                        </Button>
                      </div>

                      <div className="space-y-0.5">
                        {filteredMemories.map((memory) => (
                          <MemoryCard key={memory.id} memory={memory} />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <WelcomeView
                      onLoginOAuth={loginWithOAuth}
                      onLoginApiKey={loginWithApiKey}
                      isLoading={authLoading}
                      error={authError}
                    />
                  )}
                </CollapsibleContent>
              </Collapsible>
            </div>
          </ScrollArea>

          {/* Bottom Chat Interface */}
          <ChatInterface
            value={chatInput}
            onChange={setChatInput}
            onSend={() => setChatInput("")}
            isAuthenticated={isAuthenticated}
            onAttach={onAttachFromClipboard}
          />

          {/* API Key Manager Modal */}
          <ApiKeyManager
            isOpen={showApiKeys}
            onClose={() => setShowApiKeys(false)}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
};
