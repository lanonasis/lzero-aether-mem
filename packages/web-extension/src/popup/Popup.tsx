/**
 * Popup Component
 * Quick access panel from toolbar icon
 */

import React, { useState, useEffect } from 'react';
import { Search, RefreshCw, Settings, LogOut, ExternalLink } from 'lucide-react';

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
    
    chrome.runtime.sendMessage(
      { type: 'SEARCH_MEMORIES', payload: { query: searchQuery } },
      (response) => {
        if (Array.isArray(response)) {
          setMemories(response.slice(0, 5));
        }
      }
    );
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
            className="w-full bg-[#252526] border border-[#3C3C3C] rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-[#007ACC]"
          />
        </div>
      </div>

      {/* Pending indicator */}
      {syncStatus.pendingCount > 0 && (
        <div className="mx-3 mb-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded text-xs text-yellow-400 flex items-center justify-between">
          <span>{syncStatus.pendingCount} pending sync</span>
          <button
            onClick={handleSync}
            disabled={syncStatus.isSyncing}
            className="text-yellow-400 hover:text-yellow-300"
          >
            {syncStatus.isSyncing ? 'Syncing...' : 'Sync now'}
          </button>
        </div>
      )}

      {/* Memories */}
      <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-2">
        {isLoading ? (
          <div className="text-center py-8 text-gray-500 text-sm">Loading...</div>
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
              <h3 className="text-sm font-medium text-white line-clamp-1">
                {memory.title}
              </h3>
              <p className="text-xs text-gray-400 line-clamp-2 mt-1">
                {memory.content}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] px-1.5 py-0.5 bg-[#007ACC]/20 text-[#007ACC] rounded">
                  {memory.memory_type}
                </span>
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
