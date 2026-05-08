/**
 * Popup Component
 * Quick access panel from toolbar icon
 */

import React, { useState, useEffect } from 'react';
import { Search, RefreshCw, Settings, LogOut, ExternalLink, Zap, Loader2, X } from 'lucide-react';
import { format } from 'date-fns';
import { useSemanticSearch } from '../hooks/useSemanticSearch';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isOnline: true,
    pendingCount: 0,
    isSyncing: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  // On-device AI status
  const { isAIReady, isAILoading, loadProgress } = useSemanticSearch();

  useEffect(() => {
    // Check auth status
    chrome.runtime.sendMessage({ type: 'GET_AUTH_STATUS' }, (response) => {
      setIsAuthenticated(response?.isAuthenticated || false);
    });

    // Get memories
    chrome.runtime.sendMessage({ type: 'GET_MEMORIES' }, (response) => {
      if (Array.isArray(response)) {
        setMemories(response.slice(0, 5));
      }
      setIsLoading(false);
    });

    // Get sync status
    chrome.runtime.sendMessage({ type: 'GET_SYNC_STATUS' }, (response) => {
      if (response) {
        setSyncStatus(response);
      }
    });
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    chrome.runtime.sendMessage(
      { type: 'SEARCH_MEMORIES', payload: { query: searchQuery } },
      (response) => {
        if (Array.isArray(response)) {
          setMemories(response.slice(0, 5));
        }
        setIsSearching(false);
      }
    );
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setIsLoading(true);
    chrome.runtime.sendMessage({ type: 'GET_MEMORIES' }, (response) => {
      if (Array.isArray(response)) {
        setMemories(response.slice(0, 5));
      }
      setIsLoading(false);
    });
  };

  const handleSync = () => {
    setSyncStatus(prev => ({ ...prev, isSyncing: true }));
    chrome.runtime.sendMessage({ type: 'SYNC_MEMORIES' }, () => {
      chrome.runtime.sendMessage({ type: 'GET_MEMORIES' }, (response) => {
        if (Array.isArray(response)) {
          setMemories(response.slice(0, 5));
        }
        setSyncStatus(prev => ({ ...prev, isSyncing: false }));
      });
    });
  };

  const openSidePanel = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab?.id) {
      await chrome.sidePanel.open({ tabId: tab.id });
      window.close();
    }
  };

  const openOptions = () => {
    chrome.runtime.openOptionsPage();
  };

  const handleLogout = () => {
    chrome.runtime.sendMessage({ type: 'LOGOUT' }, () => {
      setIsAuthenticated(false);
      setMemories([]);
    });
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      return format(date, 'MMM d');
    } catch {
      return '';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="w-[320px] min-h-[400px] bg-gradient-to-b from-[#1E1E1E] to-[#0D0D0D] text-white p-4 flex flex-col items-center justify-center gap-4">
        <div className="h-12 w-12 bg-gradient-to-br from-[#007ACC] to-[#0E639C] rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold">L0</span>
        </div>
        <h2 className="text-lg font-bold">L0 Memory</h2>
        <p className="text-sm text-gray-400 text-center">
          Connect to access your developer memory across all platforms.
        </p>
        <button
          onClick={openOptions}
          className="w-full bg-[#007ACC] hover:bg-[#0063A5] text-white py-2 px-4 rounded-lg font-medium transition-colors"
        >
          Connect Account
        </button>
      </div>
    );
  }

  return (
    <div className="w-[320px] min-h-[400px] bg-gradient-to-b from-[#1E1E1E] to-[#0D0D0D] text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-[#3C3C3C]">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 bg-gradient-to-br from-[#007ACC] to-[#0E639C] rounded flex items-center justify-center">
            <span className="text-xs font-bold">L0</span>
          </div>
          <span className="font-semibold text-sm">L0 Memory</span>
        </div>
        <div className="flex items-center gap-1">
          {/* AI Status */}
          {isAILoading ? (
            <div className="flex items-center gap-1 px-1.5 py-0.5 bg-purple-500/10 rounded" title={`Loading AI: ${loadProgress}%`}>
              <Loader2 className="h-3 w-3 text-purple-400 animate-spin" />
            </div>
          ) : isAIReady ? (
            <div className="flex items-center gap-1 px-1.5 py-0.5 bg-green-500/10 rounded" title="On-Device AI Ready">
              <Zap className="h-3 w-3 text-green-400" />
            </div>
          ) : null}
          {/* Online Status */}
          <div
            className={`h-2 w-2 rounded-full ${syncStatus.isOnline ? 'bg-green-500' : 'bg-red-500'}`}
            title={syncStatus.isOnline ? 'Online' : 'Offline'}
          />
          <button
            onClick={openOptions}
            className="p-1.5 hover:bg-[#3C3C3C] rounded transition-colors"
            title="Settings"
          >
            <Settings className="h-4 w-4 text-gray-400" />
          </button>
          <button
            onClick={handleLogout}
            className="p-1.5 hover:bg-[#3C3C3C] rounded transition-colors"
            title="Logout"
          >
            <LogOut className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search memories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full bg-[#252526] border border-[#3C3C3C] rounded-lg pl-9 pr-16 py-2 text-sm text-white placeholder:text-[#666666] focus:outline-none focus:border-[#007ACC] transition-colors"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="text-[#666666] hover:text-[#CCCCCC] transition-colors"
                title="Clear search"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
            <button
              onClick={handleSearch}
              disabled={!searchQuery.trim() || isSearching}
              className="text-[10px] px-2 py-0.5 bg-[#007ACC]/20 hover:bg-[#007ACC]/40 text-[#007ACC] rounded disabled:opacity-40 transition-colors flex items-center gap-1"
              title="Search"
            >
              {isSearching ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Go'}
            </button>
          </div>
        </div>
      </div>

      {/* Pending indicator */}
      {syncStatus.pendingCount > 0 && (
        <div className="mx-3 mb-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded text-xs text-yellow-400 flex items-center justify-between">
          <span>{syncStatus.pendingCount} pending sync</span>
          <button
            onClick={handleSync}
            disabled={syncStatus.isSyncing}
            className="text-yellow-400 hover:text-yellow-300 disabled:opacity-50"
          >
            {syncStatus.isSyncing ? 'Syncing...' : 'Sync now'}
          </button>
        </div>
      )}

      {/* Memories */}
      <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-2">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8 gap-2">
            <Loader2 className="h-5 w-5 text-[#007ACC] animate-spin" />
            <p className="text-xs text-gray-500">Loading memories...</p>
          </div>
        ) : memories.length === 0 ? (
          <div className="text-center py-8 text-gray-500 text-sm">
            {searchQuery ? 'No memories found' : 'No memories yet'}
          </div>
        ) : (
          memories.map((memory) => (
            <div
              key={memory.id}
              className="p-3 bg-[#252526] border border-[#3C3C3C] rounded-lg hover:border-[#007ACC]/50 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-medium text-white line-clamp-1 flex-1">
                  {memory.title}
                </h3>
                {memory.created_at && (
                  <span className="text-[10px] text-[#666666] shrink-0">
                    {formatDate(memory.created_at)}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 line-clamp-2 mt-1">
                {memory.content}
              </p>
              <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                <span className="text-[10px] px-1.5 py-0.5 bg-[#007ACC]/20 text-[#007ACC] rounded">
                  {memory.memory_type}
                </span>
                {memory.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-1.5 py-0.5 bg-[#3C3C3C] text-[#AAAAAA] rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-[#3C3C3C] flex gap-2">
        <button
          onClick={handleSync}
          disabled={syncStatus.isSyncing}
          className="flex-1 flex items-center justify-center gap-2 bg-[#252526] hover:bg-[#3C3C3C] py-2 rounded-lg text-sm transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${syncStatus.isSyncing ? 'animate-spin' : ''}`} />
          Sync
        </button>
        <button
          onClick={openSidePanel}
          className="flex-1 flex items-center justify-center gap-2 bg-[#007ACC] hover:bg-[#0063A5] py-2 rounded-lg text-sm transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          Open Panel
        </button>
      </div>
    </div>
  );
};
