/**
 * Side Panel Component
 * Full-featured memory panel matching the demo RichPanel
 * 
 * This is adapted from client/src/packages/web-extension/RichPanel.tsx
 */

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Terminal, 
  SendHorizontal,
  LogOut,
  Settings,
  Paperclip,
  Loader2,
  Lock,
  ArrowRight,
  Hash,
  FileCode,
  Lightbulb,
  BookOpen,
  GitBranch,
  Terminal as TerminalIcon,
} from 'lucide-react';
import { format } from 'date-fns';

interface Memory {
  id: string;
  title: string;
  content: string;
  memory_type: string;
  tags: string[];
  created_at: string;
  _pending?: string;
}

interface SyncStatus {
  isOnline: boolean;
  pendingCount: number;
  isSyncing: boolean;
  lastSyncAt: number | null;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  memories?: Memory[];
  timestamp: number;
}

// Helper to get icon for memory type
const getMemoryIcon = (type: string) => {
  const icons: Record<string, React.FC<{ className?: string }>> = {
    code: FileCode,
    docs: BookOpen,
    todo: Lightbulb,
    workflow: GitBranch,
    status: TerminalIcon,
    note: Hash,
    snippet: FileCode,
    idea: Lightbulb,
  };
  const Icon = icons[type] || Hash;
  return Icon;
};

const MemoryCard: React.FC<{ memory: Memory }> = ({ memory }) => {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Recent';
      return format(date, 'MMM d');
    } catch {
      return 'Recent';
    }
  };

  const Icon = getMemoryIcon(memory.memory_type);

  return (
    <div className="group relative flex flex-col gap-2 rounded-lg border border-[#2D2D2D] bg-gradient-to-br from-[#252526] to-[#1E1E1E] p-3 hover:from-[#2A2D2E] hover:to-[#252526] hover:border-[#007ACC]/50 transition-all duration-200">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-[#CCCCCC] leading-tight line-clamp-2">
          {memory.title}
        </h3>
        <span className="text-[8px] bg-[#007ACC]/10 border border-[#007ACC]/30 text-[#007ACC] px-1.5 py-0.5 rounded">
          {memory.memory_type}
        </span>
      </div>
      <div className="flex items-center gap-3 text-[10px] text-[#888888]">
        <div className="flex items-center gap-1">
          <Icon className="h-3 w-3" />
          <span>{formatDate(memory.created_at)}</span>
        </div>
        {memory.tags.slice(0, 2).map((tag) => (
          <div key={tag} className="flex items-center gap-1 bg-[#007ACC]/10 px-1.5 py-0.5 rounded text-[#007ACC] text-[9px]">
            <span>#{tag}</span>
          </div>
        ))}
        {memory._pending && (
          <span className="text-yellow-400">⏳</span>
        )}
      </div>
    </div>
  );
};

const WelcomeView: React.FC<{ onLogin: () => void; isConnecting: boolean }> = ({ onLogin, isConnecting }) => (
  <div className="p-6 space-y-8 flex flex-col items-center justify-center min-h-[400px]">
    <div className="h-14 w-14 bg-gradient-to-br from-[#007ACC] to-[#0E639C] rounded-full flex items-center justify-center shadow-lg shadow-[#007ACC]/30">
      <span className="text-2xl font-bold text-white">L0</span>
    </div>
    <div className="space-y-3 text-center">
      <h3 className="text-lg font-bold text-white">Your Memory Awaits</h3>
      <p className="text-sm text-gray-400 max-w-[240px] mx-auto leading-relaxed">
        Connect to your personal AI orchestrator. Store, search, and recall your development context instantly.
      </p>
    </div>
    <button 
      onClick={onLogin} 
      disabled={isConnecting} 
      className="bg-gradient-to-r from-[#007ACC] to-[#0E639C] hover:shadow-lg hover:shadow-[#007ACC]/50 text-white font-medium w-full max-w-[220px] py-2 px-4 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
    >
      {isConnecting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Initializing...
        </>
      ) : (
        <>
          Connect to Memory
          <ArrowRight className="h-4 w-4" />
        </>
      )}
    </button>
    <div className="w-full border-t border-[#2D2D2D]" />
    <div className="space-y-2 w-full">
      <p className="text-xs text-[#888888] text-center font-medium">What you can do:</p>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center gap-2 p-2 rounded bg-[#1E1E1E]">
          <Search className="h-3 w-3 text-yellow-500" />
          <span className="text-[10px] text-gray-400">Semantic Search</span>
        </div>
        <div className="flex items-center gap-2 p-2 rounded bg-[#1E1E1E]">
          <Lock className="h-3 w-3 text-green-500" />
          <span className="text-[10px] text-gray-400">Offline Support</span>
        </div>
      </div>
    </div>
  </div>
);

export const SidePanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isOnline: true,
    pendingCount: 0,
    isSyncing: false,
    lastSyncAt: null,
  });

  useEffect(() => {
    // Check auth status
    chrome.runtime.sendMessage({ type: 'GET_AUTH_STATUS' }, (response) => {
      setIsAuthenticated(response?.isAuthenticated || false);
    });

    // Get memories
    chrome.runtime.sendMessage({ type: 'GET_MEMORIES' }, (response) => {
      if (Array.isArray(response)) {
        setMemories(response);
      }
    });

    // Get sync status
    chrome.runtime.sendMessage({ type: 'GET_SYNC_STATUS' }, (response) => {
      if (response) {
        setSyncStatus(response);
      }
    });

    // Listen for search queries from omnibox/context menu
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === 'SEARCH_QUERY') {
        setSearchQuery(message.payload?.query || '');
        handleSearch(message.payload?.query || '');
      }
    });
  }, []);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      chrome.runtime.sendMessage({ type: 'GET_MEMORIES' }, (response) => {
        if (Array.isArray(response)) {
          setMemories(response);
        }
      });
      return;
    }

    chrome.runtime.sendMessage(
      { type: 'SEARCH_MEMORIES', payload: { query } },
      (response) => {
        if (Array.isArray(response)) {
          setMemories(response);
        }
      }
    );
  };

  const handleLogin = () => {
    setIsConnecting(true);
    chrome.runtime.openOptionsPage();
    // The options page will handle auth
  };

  const handleLogout = () => {
    chrome.runtime.sendMessage({ type: 'LOGOUT' }, () => {
      setIsAuthenticated(false);
      setMemories([]);
      setChatMessages([]);
    });
  };

  const handleSync = () => {
    setSyncStatus(prev => ({ ...prev, isSyncing: true }));
    chrome.runtime.sendMessage({ type: 'SYNC_MEMORIES' }, () => {
      chrome.runtime.sendMessage({ type: 'GET_MEMORIES' }, (response) => {
        if (Array.isArray(response)) {
          setMemories(response);
        }
        chrome.runtime.sendMessage({ type: 'GET_SYNC_STATUS' }, (status) => {
          if (status) {
            setSyncStatus(status);
          }
        });
      });
    });
  };

  const handleSendChat = async () => {
    const content = chatInput.trim();
    if (!content || isSending) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content,
      timestamp: Date.now(),
    };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsSending(true);

    // Parse intent
    const lower = content.toLowerCase();
    const isCreate = /^(save|create|remember|store)\s+/i.test(lower);

    if (isCreate) {
      // Create memory
      const memoryContent = content.replace(/^(save|create|remember|store)\s+/i, '');
      chrome.runtime.sendMessage({
        type: 'CREATE_MEMORY',
        payload: {
          memory: {
            title: memoryContent.slice(0, 50) + (memoryContent.length > 50 ? '...' : ''),
            content: memoryContent,
            memory_type: 'note',
            tags: [],
          },
        },
      }, () => {
        const assistantMessage: ChatMessage = {
          id: `assistant_${Date.now()}`,
          role: 'assistant',
          content: `✅ Saved: "${memoryContent.slice(0, 50)}${memoryContent.length > 50 ? '...' : ''}"`,
          timestamp: Date.now(),
        };
        setChatMessages(prev => [...prev, assistantMessage]);
        setIsSending(false);
        
        // Refresh memories
        chrome.runtime.sendMessage({ type: 'GET_MEMORIES' }, (response) => {
          if (Array.isArray(response)) {
            setMemories(response);
          }
        });
      });
    } else {
      // Search
      chrome.runtime.sendMessage(
        { type: 'SEARCH_MEMORIES', payload: { query: content } },
        (response) => {
          const results = Array.isArray(response) ? response : [];
          const assistantMessage: ChatMessage = {
            id: `assistant_${Date.now()}`,
            role: 'assistant',
            content: results.length > 0 
              ? `Found ${results.length} relevant memories:`
              : `No memories found for "${content}"`,
            memories: results,
            timestamp: Date.now(),
          };
          setChatMessages(prev => [...prev, assistantMessage]);
          setIsSending(false);
        }
      );
    }
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-b from-[#1E1E1E] to-[#0D0D0D] text-[#CCCCCC] font-sans overflow-hidden flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-[#1E1E1E]/80 backdrop-blur-sm border-b border-[#3C3C3C] shrink-0">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 bg-gradient-to-br from-[#007ACC] to-[#0E639C] rounded-lg flex items-center justify-center shadow-md">
            <span className="text-xs font-bold text-white">L0</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold tracking-tight text-white leading-none">LanOnasis</h1>
            <span className="text-[9px] text-[#888888] leading-none mt-0.5">Memory Orchestrator</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          {isAuthenticated && (
            <>
              <button
                onClick={() => chrome.runtime.openOptionsPage()}
                className="p-1.5 hover:bg-[#3C3C3C] rounded-md transition-colors"
                title="Settings"
              >
                <Settings className="h-4 w-4 text-[#888888] hover:text-white" />
              </button>
              <button
                onClick={handleLogout}
                className="p-1.5 hover:bg-[#3C3C3C] rounded-md transition-colors"
                title="Logout"
              >
                <LogOut className="h-4 w-4 text-[#888888] hover:text-white" />
              </button>
            </>
          )}
        </div>
      </header>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-3 space-y-3">
          {isAuthenticated ? (
            <>
              {/* Orchestrator Status */}
              <div className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-[#007ACC]/10 to-[#0E639C]/10 border border-[#007ACC]/20">
                <div className={`h-2 w-2 rounded-full ${syncStatus.isOnline ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`} />
                <span className="text-xs text-[#007ACC] font-medium">
                  {syncStatus.isOnline ? 'Orchestrator Ready' : 'Offline Mode'}
                </span>
                {syncStatus.pendingCount > 0 && (
                  <button
                    onClick={handleSync}
                    disabled={syncStatus.isSyncing}
                    className="ml-auto text-[10px] text-yellow-400 hover:text-yellow-300 disabled:opacity-50"
                  >
                    {syncStatus.isSyncing ? 'Syncing...' : `${syncStatus.pendingCount} pending · Sync`}
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#888888]" />
                <input 
                  type="text"
                  placeholder="Search your memory..." 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    handleSearch(e.target.value);
                  }}
                  className="w-full bg-[#252526] border border-[#3C3C3C] rounded-lg pl-9 pr-3 py-2.5 text-sm text-white placeholder:text-[#666666] focus:outline-none focus:border-[#007ACC] focus:ring-1 focus:ring-[#007ACC]/20 transition-all"
                />
              </div>

              {/* Chat Messages */}
              {chatMessages.length > 0 && (
                <div className="space-y-2 p-3 bg-[#252526]/80 rounded-lg border border-[#3C3C3C]">
                  {chatMessages.slice(-5).map((msg) => (
                    <div key={msg.id} className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                        msg.role === 'user' 
                          ? 'bg-[#007ACC] text-white'
                          : 'bg-[#1E1E1E] text-[#CCCCCC] border border-[#3C3C3C]'
                      }`}>
                        {msg.content}
                      </div>
                      {msg.memories && msg.memories.length > 0 && (
                        <div className="w-full space-y-2 mt-2">
                          {msg.memories.slice(0, 3).map((memory) => (
                            <MemoryCard key={memory.id} memory={memory} />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Memories List */}
              <div className="space-y-2">
                {memories.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="h-12 w-12 mx-auto mb-3 rounded-full bg-[#252526] flex items-center justify-center">
                      <Search className="h-5 w-5 text-[#666666]" />
                    </div>
                    <p className="text-sm text-[#888888]">
                      {searchQuery ? `No memories found for "${searchQuery}"` : 'No memories yet'}
                    </p>
                    <p className="text-xs text-[#666666] mt-1">
                      {searchQuery ? 'Try a different search term' : 'Start pasting context below'}
                    </p>
                  </div>
                ) : (
                  memories.map((memory) => (
                    <MemoryCard key={memory.id} memory={memory} />
                  ))
                )}
              </div>
            </>
          ) : (
            <WelcomeView onLogin={handleLogin} isConnecting={isConnecting} />
          )}
        </div>
      </div>
      
      {/* Chat Input - Fixed at bottom */}
      <footer className="p-3 bg-[#1E1E1E] border-t border-[#3C3C3C] shrink-0">
        <div className="relative">
          <div className="absolute left-3 top-3 text-[#007ACC]">
            <Terminal className="h-4 w-4" />
          </div>
          <textarea
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendChat();
              }
            }}
            placeholder={isAuthenticated ? "Ask anything or paste context to save..." : "Connect to access orchestrator..."}
            disabled={!isAuthenticated}
            className="w-full min-h-[56px] bg-[#252526] border border-[#3C3C3C] rounded-lg pl-9 pr-20 py-3 text-sm text-[#CCCCCC] placeholder:text-[#666666] resize-none focus:outline-none focus:border-[#007ACC] focus:ring-1 focus:ring-[#007ACC]/20 disabled:opacity-50 transition-all"
          />
          <div className="absolute right-2 bottom-2 flex gap-1">
            <button
              className="h-7 w-7 flex items-center justify-center text-[#888888] hover:text-[#CCCCCC] hover:bg-[#3C3C3C] rounded-md transition-colors disabled:opacity-50"
              disabled={!isAuthenticated}
              title="Attach file"
            >
              <Paperclip className="h-4 w-4" />
            </button>
            <button
              onClick={handleSendChat}
              className="h-7 w-7 flex items-center justify-center bg-gradient-to-r from-[#007ACC] to-[#0E639C] hover:shadow-lg hover:shadow-[#007ACC]/30 text-white rounded-md disabled:opacity-50 transition-all"
              disabled={!isAuthenticated || !chatInput.trim() || isSending}
              title="Send"
            >
              {isSending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <SendHorizontal className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
        {isAuthenticated && (
          <div className="flex justify-between items-center px-1 mt-2">
            <span className="text-[9px] text-[#666666]">AI Orchestrator Active</span>
            <span className="text-[9px] text-[#666666]">v0.1.0</span>
          </div>
        )}
      </footer>
    </div>
  );
};
