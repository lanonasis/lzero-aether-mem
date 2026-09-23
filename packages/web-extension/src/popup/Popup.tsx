/**
 * Popup Component
 * Compact quick-access panel from toolbar icon
 * Redesigned to match RichPanel demo layout
 */

import React, { useState, useEffect } from "react";
import {
  Search,
  RefreshCw,
  Loader2,
  X,
  Zap,
  LogOut,
  Settings,
} from "lucide-react";
import { useSemanticSearch } from "../hooks/useSemanticSearch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { LanoLogo } from "@/components/lano-logo";
import { MemoryCard, WelcomeView } from "@/components/shared";
import { cn } from "@/lib/utils";

interface Memory {
  id: string;
  title: string;
  content: string;
  memory_type: string;
  tags: string[];
  created_at: string;
}

interface SyncStatus {
  isOnline: boolean;
  pendingCount: number;
  isSyncing: boolean;
}

export const Popup: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isOnline: true,
    pendingCount: 0,
    isSyncing: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // On-device AI status
  const { isAIReady, isAILoading, loadProgress } = useSemanticSearch();

  const version = chrome.runtime.getManifest?.()?.version ?? "0.2.0";

  // ── Initial Load ────────────────────────────────────────────────
  useEffect(() => {
    // Check auth status
    chrome.runtime.sendMessage({ type: "GET_AUTH_STATUS" }, (response) => {
      setIsAuthenticated(response?.isAuthenticated || false);
    });

    // Get memories
    chrome.runtime.sendMessage({ type: "GET_MEMORIES" }, (response) => {
      if (Array.isArray(response)) {
        setMemories(response.slice(0, 10));
      }
      setIsLoading(false);
    });

    // Get sync status
    chrome.runtime.sendMessage({ type: "GET_SYNC_STATUS" }, (response) => {
      if (response) setSyncStatus(response);
    });
  }, []);

  // ── Handlers ────────────────────────────────────────────────────
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    chrome.runtime.sendMessage(
      { type: "SEARCH_MEMORIES", payload: { query: searchQuery } },
      (response) => {
        if (Array.isArray(response)) {
          setMemories(response.slice(0, 10));
        }
        setIsSearching(false);
      }
    );
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setIsLoading(true);
    chrome.runtime.sendMessage({ type: "GET_MEMORIES" }, (response) => {
      if (Array.isArray(response)) {
        setMemories(response.slice(0, 10));
      }
      setIsLoading(false);
    });
  };

  const handleSync = () => {
    setSyncStatus((prev) => ({ ...prev, isSyncing: true }));
    chrome.runtime.sendMessage({ type: "SYNC_MEMORIES" }, () => {
      chrome.runtime.sendMessage({ type: "GET_MEMORIES" }, (response) => {
        if (Array.isArray(response)) {
          setMemories(response.slice(0, 10));
        }
        setSyncStatus((prev) => ({ ...prev, isSyncing: false }));
      });
    });
  };

  const handleRefresh = () => {
    chrome.runtime.sendMessage({ type: "GET_MEMORIES" }, (response) => {
      if (Array.isArray(response)) {
        setMemories(response.slice(0, 10));
      }
    });
  };

  const openSidePanel = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (tab?.id) {
      await chrome.sidePanel.open({ tabId: tab.id });
      window.close();
    }
  };

  const openOptions = () => {
    chrome.runtime.openOptionsPage();
  };

  const handleLogout = () => {
    chrome.runtime.sendMessage({ type: "LOGOUT" }, () => {
      setIsAuthenticated(false);
      setMemories([]);
      setShowSettings(false);
    });
  };

  // ── Unauthenticated State ───────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="w-[320px] h-[480px] bg-gradient-to-b from-[#1E1E1E] to-[#0D0D0D] text-[#CCCCCC] flex flex-col overflow-hidden">
        <WelcomeView onLogin={openOptions} isConnecting={false} />
        <div className="p-3 border-t border-[#3C3C3C]">
          <button
            onClick={openOptions}
            className="w-full bg-[#007ACC] hover:bg-[#0063A5] text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
          >
            Connect Account
          </button>
        </div>
      </div>
    );
  }

  // ── Authenticated State ─────────────────────────────────────────
  return (
    <div className="w-[320px] h-[480px] bg-gradient-to-b from-[#1E1E1E] to-[#0D0D0D] text-[#CCCCCC] font-mono flex flex-col overflow-hidden relative">
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-3 py-2.5 bg-[#1E1E1E]/80 backdrop-blur-sm border-b border-[#3C3C3C] shrink-0">
        <div className="flex items-center gap-2">
          <LanoLogo size={16} className="text-[#007ACC]" />
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-tight text-white leading-none">
              LanOnasis
            </span>
            <span className="text-[8px] text-[#888888] leading-none mt-0.5">
              Memory Orchestrator
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {/* AI Status */}
          {isAILoading ? (
            <div
              className="flex items-center gap-1 px-1 py-0.5 bg-purple-500/10 rounded"
              title={`Loading AI: ${loadProgress}%`}
            >
              <Loader2 className="h-3 w-3 text-purple-400 animate-spin" />
            </div>
          ) : isAIReady ? (
            <div
              className="flex items-center gap-1 px-1 py-0.5 bg-green-500/10 rounded"
              title="On-Device AI Ready"
            >
              <Zap className="h-3 w-3 text-green-400" />
            </div>
          ) : null}
          {/* Online/Sync Status */}
          <button
            onClick={handleSync}
            disabled={syncStatus.isSyncing}
            className="p-1.5 hover:bg-[#3C3C3C] rounded-md transition-colors"
            title={syncStatus.isSyncing ? "Syncing..." : "Sync now"}
          >
            <RefreshCw
              className={cn(
                "h-3.5 w-3.5 text-[#888888]",
                syncStatus.isSyncing && "animate-spin"
              )}
            />
          </button>
          {/* Settings */}
          <button
            onClick={() => setShowSettings(true)}
            className="p-1.5 hover:bg-[#3C3C3C] rounded-md transition-colors"
            title="Settings"
          >
            <Settings className="h-3.5 w-3.5 text-[#888888]" />
          </button>
          {/* Logout */}
          <button
            onClick={handleLogout}
            className="p-1.5 hover:bg-[#3C3C3C] rounded-md transition-colors"
            title="Logout"
          >
            <LogOut className="h-3.5 w-3.5 text-[#888888]" />
          </button>
        </div>
      </div>

      {/* ── Settings Panel ── */}
      {showSettings && (
        <div className="px-3 py-2.5 bg-[#161616] border-b border-[#3C3C3C] shrink-0 space-y-2">
          <button
            onClick={() => {
              chrome.runtime.openOptionsPage();
              setShowSettings(false);
            }}
            className="w-full flex items-center justify-between text-[10px] text-[#007ACC] hover:text-[#0E9CED] transition-colors"
          >
            <span>Full Settings</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
          <div className="border-t border-[#2D2D2D] pt-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-1.5 text-[10px] text-red-400 hover:text-red-300 transition-colors"
            >
              <LogOut className="h-2.5 w-2.5" />
              Log out
            </button>
          </div>
        </div>
      )}

      {/* ── Status Badge ── */}
      <div className="px-3 py-2 border-b border-[#3C3C3C] shrink-0">
        <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-gradient-to-r from-[#007ACC]/10 to-[#0E639C]/10 border border-[#007ACC]/20">
          <div
            className={cn(
              "h-1.5 w-1.5 rounded-full animate-pulse",
              syncStatus.isOnline ? "bg-green-500" : "bg-yellow-500"
            )}
          />
          <span className="text-[10px] text-[#007ACC] font-medium">
            {syncStatus.isOnline
              ? "Orchestrator Ready"
              : "Orchestrator Offline"}
          </span>
          {isAIReady && (
            <Badge
              variant="outline"
              className="text-[7px] bg-purple-500/10 border-purple-500/30 text-purple-400 ml-auto"
            >
              On-device
            </Badge>
          )}
        </div>
      </div>

      {/* ── Search ── */}
      <div className="px-3 py-2 border-b border-[#3C3C3C] shrink-0">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#888888]" />
          <input
            type="text"
            placeholder="Search your memory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full bg-[#1E1E1E] border border-[#2D2D2D] rounded-lg pl-8 pr-14 py-1.5 text-xs text-white placeholder:text-[#666666] focus:outline-none focus:border-[#007ACC]/50 transition-colors"
          />
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="text-[#666666] hover:text-[#CCCCCC] transition-colors"
                title="Clear search"
                aria-label="Clear search"
              >
                <X className="h-3 w-3" />
              </button>
            )}
            <button
              onClick={handleSearch}
              disabled={!searchQuery.trim() || isSearching}
              className="text-[9px] px-1.5 py-0.5 bg-[#007ACC]/20 hover:bg-[#007ACC]/40 text-[#007ACC] rounded disabled:opacity-40 transition-colors flex items-center gap-0.5"
            >
              {isSearching ? (
                <Loader2 className="h-2.5 w-2.5 animate-spin" />
              ) : (
                "Go"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Pending Sync ── */}
      {syncStatus.pendingCount > 0 && (
        <div className="px-3 py-1.5 bg-yellow-500/5 border-b border-yellow-500/10 shrink-0">
          <div className="flex items-center justify-between">
            <span className="text-[9px] text-yellow-400">
              {syncStatus.pendingCount} pending sync
            </span>
            <button
              onClick={handleSync}
              disabled={syncStatus.isSyncing}
              className="text-[9px] text-yellow-400 hover:text-yellow-300 disabled:opacity-50"
            >
              {syncStatus.isSyncing ? "Syncing..." : "Sync now"}
            </button>
          </div>
        </div>
      )}

      {/* ── Memory List ── */}
      <ScrollArea className="flex-1 px-3 py-2">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8 gap-2">
            <Loader2 className="h-5 w-5 text-[#007ACC] animate-spin" />
            <p className="text-xs text-[#888888]">Loading memories...</p>
          </div>
        ) : memories.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xs text-[#888888] italic">
              {searchQuery
                ? "No memories found"
                : "No memories yet. Start pasting context below."}
            </p>
          </div>
        ) : (
          <div className="space-y-1.5">
            {memories.map((memory) => (
              <MemoryCard
                key={memory.id}
                title={memory.title}
                memoryType={memory.memory_type}
                tags={memory.tags}
                createdAt={memory.created_at}
                variant="compact"
              />
            ))}
          </div>
        )}
      </ScrollArea>

      {/* ── Footer ── */}
      <div className="px-3 py-2 border-t border-[#3C3C3C] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleRefresh}
            className="p-1 hover:bg-[#3C3C3C] rounded transition-colors"
            title="Refresh"
          >
            <RefreshCw className="h-3 w-3 text-[#888888]" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={openSidePanel}
            className="text-[9px] text-[#007ACC] hover:text-[#0E9CED] transition-colors"
          >
            Open Panel →
          </button>
          <span className="text-[8px] text-[#666666]">v{version}</span>
        </div>
      </div>

      {/* ── Scoped Keys Dialog ── */}
      {/* TODO: Implement with ScopedKeyDialog when chrome messaging is ready */}
    </div>
  );
};
