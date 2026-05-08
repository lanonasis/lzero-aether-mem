/**
 * Side Panel Component
 * Full-featured memory panel with AI search and memory orchestration
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Search,
  Terminal,
  SendHorizontal,
  LogOut,
  Settings,
  Loader2,
  Lock,
  ArrowRight,
  Hash,
  FileCode,
  Lightbulb,
  BookOpen,
  GitBranch,
  Terminal as TerminalIcon,
  Zap,
  X,
  Plus,
  Copy,
  Check,
  Database,
  RefreshCw,
  User,
  Bot,
} from 'lucide-react';
import { format } from 'date-fns';
import { useSemanticSearch } from '../hooks/useSemanticSearch';

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

// ============================================
// Helpers
// ============================================

const MEMORY_ICONS: Record<string, React.FC<{ className?: string }>> = {
  code: FileCode,
  docs: BookOpen,
  todo: Lightbulb,
  workflow: GitBranch,
  status: TerminalIcon,
  note: Hash,
  snippet: FileCode,
  idea: Lightbulb,
  context: Database,
};

function getMemoryIcon(type: string): React.FC<{ className?: string }> {
  return MEMORY_ICONS[type] ?? Hash;
}

function formatMemoryDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Recent';
    const now = Date.now();
    const diff = now - date.getTime();
    if (diff < 86_400_000) return format(date, 'h:mm a');
    return format(date, 'MMM d');
  } catch {
    return 'Recent';
  }
}

/**
 * Composes a plain-language response from search results.
 */
function synthesizeResponse(query: string, memories: Memory[]): string {
  if (memories.length === 0) {
    return `Nothing in your memory bank about "${query}" yet.`;
  }

  if (memories.length === 1) {
    const m = memories[0];
    const firstLine = m.content.split('\n').find(l => l.trim()) ?? '';
    const preview = firstLine.slice(0, 140).trim();
    return `Found **${m.title}**${preview ? `: ${preview}${firstLine.length > 140 ? '…' : ''}` : '.'}`;
  }

  const topTitles = memories.slice(0, 3).map(m => m.title).join(', ');
  const extra = memories.length > 3 ? ` and ${memories.length - 3} more` : '';
  return `Found ${memories.length} memories about "${query}" — including ${topTitles}${extra}.`;
}

// ============================================
// Memory Card
// ============================================

const MemoryCard: React.FC<{ memory: Memory; onSelect?: (m: Memory) => void }> = ({ memory, onSelect }) => {
  const [copied, setCopied] = useState(false);
  const Icon = getMemoryIcon(memory.memory_type);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(`${memory.title}\n\n${memory.content}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable
    }
  };

  return (
    <div
      onClick={() => onSelect?.(memory)}
      className={`group relative flex flex-col gap-2 rounded-lg border border-[#2D2D2D] bg-gradient-to-br from-[#252526] to-[#1E1E1E] p-3 hover:from-[#2A2D2E] hover:to-[#252526] hover:border-[#007ACC]/50 transition-all duration-200 ${onSelect ? 'cursor-pointer' : ''}`}
    >
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 rounded bg-[#3C3C3C] hover:bg-[#4C4C4C] transition-all"
        title="Copy to clipboard"
      >
        {copied
          ? <Check className="h-3 w-3 text-green-400" />
          : <Copy className="h-3 w-3 text-[#888888]" />
        }
      </button>

      <div className="flex items-start justify-between gap-2 pr-6">
        <h3 className="text-sm font-semibold text-[#CCCCCC] leading-tight line-clamp-2">
          {memory.title}
        </h3>
        <span className="shrink-0 text-[8px] bg-[#007ACC]/10 border border-[#007ACC]/30 text-[#007ACC] px-1.5 py-0.5 rounded whitespace-nowrap">
          {memory.memory_type}
        </span>
      </div>

      <div className="flex items-center gap-2 text-[10px] text-[#888888] flex-wrap">
        <div className="flex items-center gap-1">
          <Icon className="h-3 w-3" />
          <span>{formatMemoryDate(memory.created_at)}</span>
        </div>
        {memory._pending && <span className="text-yellow-400">· pending</span>}
        {memory.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="bg-[#007ACC]/10 px-1.5 py-0.5 rounded text-[#007ACC] text-[9px]">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

// ============================================
// Memory Detail Modal
// ============================================

const MemoryDetailModal: React.FC<{ memory: Memory; onClose: () => void }> = ({ memory, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${memory.title}\n\n${memory.content}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-[520px] max-h-[85vh] overflow-hidden rounded-xl border border-[#3C3C3C] bg-gradient-to-b from-[#1E1E1E] to-[#0D0D0D] shadow-2xl flex flex-col">
        <div className="flex items-start justify-between gap-3 border-b border-[#3C3C3C] p-4 shrink-0">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-[#007ACC]/10 border border-[#007ACC]/30 text-[#007ACC] px-2 py-0.5 rounded">
                {memory.memory_type}
              </span>
              {memory._pending && (
                <span className="text-[10px] text-yellow-400">Pending sync</span>
              )}
            </div>
            <h2 className="mt-2 text-sm font-semibold text-white leading-tight break-words">
              {memory.title}
            </h2>
            <div className="mt-1 text-[10px] text-[#888888]">
              {format(new Date(memory.created_at), 'PPpp')}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-md border border-[#3C3C3C] bg-[#252526] hover:bg-[#2A2D2E] text-[#CCCCCC]"
            >
              {copied ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md border border-[#3C3C3C] bg-[#1E1E1E] hover:bg-[#252526] text-[#CCCCCC]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="p-4 overflow-y-auto flex-1">
          {memory.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {memory.tags.map((tag) => (
                <span key={tag} className="text-[10px] bg-[#007ACC]/10 border border-[#007ACC]/20 text-[#007ACC] px-2 py-0.5 rounded">
                  #{tag}
                </span>
              ))}
            </div>
          )}
          <div className="rounded-lg border border-[#2D2D2D] bg-[#0D0D0D]/40 p-3">
            <div className="text-[10px] uppercase tracking-wide text-[#888888] mb-2">Content</div>
            <div className="text-sm text-[#CCCCCC] whitespace-pre-wrap break-words leading-relaxed">
              {memory.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// Quick-Add Form
// ============================================

const QuickAddForm: React.FC<{
  onSave: (title: string, content: string, tags: string[]) => void;
  onCancel: () => void;
  isSaving: boolean;
}> = ({ onSave, onCancel, isSaving }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => { titleRef.current?.focus(); }, []);

  const parsedTags = tagInput
    .split(/[\s,]+/)
    .map(t => t.replace(/^#/, '').trim())
    .filter(Boolean);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onSave(title.trim(), content.trim(), parsedTags);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-3 rounded-lg border border-[#007ACC]/30 bg-[#007ACC]/5">
      <div className="text-[10px] text-[#007ACC] font-medium uppercase tracking-wide mb-2">New Memory</div>
      <input
        ref={titleRef}
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-[#252526] border border-[#3C3C3C] rounded-md px-3 py-2 text-sm text-white placeholder:text-[#666666] focus:outline-none focus:border-[#007ACC] transition-colors"
      />
      <textarea
        placeholder="Content…"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        className="w-full bg-[#252526] border border-[#3C3C3C] rounded-md px-3 py-2 text-sm text-white placeholder:text-[#666666] focus:outline-none focus:border-[#007ACC] resize-none transition-colors"
      />
      <input
        type="text"
        placeholder="Tags (space or comma separated)"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        className="w-full bg-[#252526] border border-[#3C3C3C] rounded-md px-3 py-2 text-sm text-white placeholder:text-[#666666] focus:outline-none focus:border-[#007ACC] transition-colors"
      />
      {parsedTags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {parsedTags.map(t => (
            <span key={t} className="text-[9px] bg-[#007ACC]/20 text-[#007ACC] px-1.5 py-0.5 rounded">#{t}</span>
          ))}
        </div>
      )}
      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          disabled={isSaving || !title.trim() || !content.trim()}
          className="flex-1 flex items-center justify-center gap-1.5 bg-[#007ACC] hover:bg-[#0E639C] text-white text-xs font-medium py-1.5 rounded-md disabled:opacity-50 transition-colors"
        >
          {isSaving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check className="h-3 w-3" />}
          {isSaving ? 'Saving…' : 'Save Memory'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-3 text-xs text-[#888888] hover:text-[#CCCCCC] border border-[#3C3C3C] rounded-md transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

// ============================================
// Welcome View
// ============================================

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
        <><Loader2 className="h-4 w-4 animate-spin" />Initializing...</>
      ) : (
        <>Connect to Memory<ArrowRight className="h-4 w-4" /></>
      )}
    </button>
    <div className="w-full border-t border-[#2D2D2D]" />
    <div className="space-y-2 w-full">
      <p className="text-xs text-[#888888] text-center font-medium">What you can do:</p>
      <div className="grid grid-cols-2 gap-2">
        {[
          { icon: Search, color: 'text-yellow-500', label: 'Semantic Search' },
          { icon: Lock, color: 'text-green-500', label: 'Offline Support' },
          { icon: Terminal, color: 'text-blue-400', label: 'AI Assistant' },
          { icon: Database, color: 'text-purple-400', label: 'Memory Bank' },
        ].map(({ icon: Icon, color, label }) => (
          <div key={label} className="flex items-center gap-2 p-2 rounded bg-[#1E1E1E]">
            <Icon className={`h-3 w-3 ${color}`} />
            <span className="text-[10px] text-gray-400">{label}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ============================================
// Main Component
// ============================================

export const SidePanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isLoadingMemories, setIsLoadingMemories] = useState(true);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [isSavingQuickAdd, setIsSavingQuickAdd] = useState(false);
  const [aiMode, setAiMode] = useState<'off' | 'auto' | 'on'>('auto');
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isOnline: true,
    pendingCount: 0,
    isSyncing: false,
    lastSyncAt: null,
  });

  // New state
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [showInlineSettings, setShowInlineSettings] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastAssistantResponse, setLastAssistantResponse] = useState<ChatMessage | null>(null);

  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const version = chrome.runtime.getManifest?.()?.version ?? '0.2.0';

  const {
    isAIReady,
    isAILoading,
    loadProgress,
    initializeAI,
    search: semanticSearch,
  } = useSemanticSearch();

  const shouldUseLocalAI = aiMode === 'on' || (aiMode === 'auto' && !syncStatus.isOnline);

  // ── Initial load ──────────────────────────────────────────────────────

  useEffect(() => {
    chrome.runtime.sendMessage({ type: 'GET_AUTH_STATUS' }, (response) => {
      setIsAuthenticated(response?.isAuthenticated || false);
    });

    chrome.runtime.sendMessage({ type: 'GET_MEMORIES' }, (response) => {
      if (Array.isArray(response)) setMemories(response);
      setIsLoadingMemories(false);
    });

    chrome.runtime.sendMessage({ type: 'GET_SYNC_STATUS' }, (response) => {
      if (response) setSyncStatus(response);
    });

    chrome.storage.local.get(['aiMode', 'userEmail'], (result) => {
      if (result.aiMode === 'off' || result.aiMode === 'auto' || result.aiMode === 'on') {
        setAiMode(result.aiMode);
      }
      if (result.userEmail) setUserEmail(result.userEmail);
    });

    const handleStorageChange: Parameters<typeof chrome.storage.onChanged.addListener>[0] = (changes, area) => {
      if (area !== 'local') return;
      const next = changes.aiMode?.newValue;
      if (next === 'off' || next === 'auto' || next === 'on') setAiMode(next);
      if (changes.userEmail?.newValue) setUserEmail(changes.userEmail.newValue);
    };
    chrome.storage.onChanged.addListener(handleStorageChange);

    const handleRuntimeMessage = (message: any) => {
      if (message.type === 'SEARCH_QUERY') {
        const q = message.payload?.query || '';
        setSearchQuery(q);
        triggerSearch(q);
      }
    };
    chrome.runtime.onMessage.addListener(handleRuntimeMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(handleRuntimeMessage);
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  // ── Search ────────────────────────────────────────────────────────────

  const triggerSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      chrome.runtime.sendMessage({ type: 'GET_MEMORIES' }, (response) => {
        if (Array.isArray(response)) setMemories(response);
      });
      return;
    }

    if (shouldUseLocalAI) {
      try {
        if (!isAIReady && !isAILoading) void initializeAI();
        if (!isAIReady) throw new Error('Local AI not ready');

        chrome.runtime.sendMessage({ type: 'GET_MEMORIES' }, async (response) => {
          if (Array.isArray(response)) {
            const results = await semanticSearch(query, response);
            setMemories(results.map(r => ({
              id: r.id,
              title: r.title,
              content: r.content,
              memory_type: r.memory_type,
              tags: r.tags,
              created_at: r.created_at,
              _pending: r._pending,
            })));
          }
        });
        return;
      } catch {
        // fall through to API search
      }
    }

    chrome.runtime.sendMessage(
      { type: 'SEARCH_MEMORIES', payload: { query } },
      (response) => { if (Array.isArray(response)) setMemories(response); }
    );
  }, [shouldUseLocalAI, isAIReady, isAILoading, initializeAI, semanticSearch]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => triggerSearch(value), 280);
  }, [triggerSearch]);

  // ── Auth ──────────────────────────────────────────────────────────────

  const handleLogin = () => {
    setIsConnecting(true);
    chrome.runtime.openOptionsPage();
  };

  const handleLogout = () => {
    chrome.runtime.sendMessage({ type: 'LOGOUT' }, () => {
      setIsAuthenticated(false);
      setUserEmail(null);
      setMemories([]);
      setLastAssistantResponse(null);
    });
  };

  // ── Sync & Refresh ────────────────────────────────────────────────────

  const handleSync = () => {
    setSyncStatus(prev => ({ ...prev, isSyncing: true }));
    chrome.runtime.sendMessage({ type: 'SYNC_MEMORIES' }, () => {
      chrome.runtime.sendMessage({ type: 'GET_MEMORIES' }, (response) => {
        if (Array.isArray(response)) setMemories(response);
        chrome.runtime.sendMessage({ type: 'GET_SYNC_STATUS' }, (status) => {
          if (status) setSyncStatus(status);
        });
      });
    });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    chrome.runtime.sendMessage({ type: 'GET_MEMORIES' }, (response) => {
      if (Array.isArray(response)) setMemories(response);
      setIsRefreshing(false);
    });
  };

  // ── AI Mode ───────────────────────────────────────────────────────────

  const handleSetAiMode = (mode: 'off' | 'auto' | 'on') => {
    setAiMode(mode);
    chrome.storage.local.set({ aiMode: mode });
  };

  // ── Quick-add ─────────────────────────────────────────────────────────

  const handleQuickAdd = (title: string, content: string, tags: string[]) => {
    setIsSavingQuickAdd(true);
    chrome.runtime.sendMessage({
      type: 'CREATE_MEMORY',
      payload: { memory: { title, content, memory_type: 'note', tags } },
    }, () => {
      setIsSavingQuickAdd(false);
      setShowQuickAdd(false);
      chrome.runtime.sendMessage({ type: 'GET_MEMORIES' }, (response) => {
        if (Array.isArray(response)) setMemories(response);
      });
    });
  };

  // ── Chat / unified input ──────────────────────────────────────────────

  const handleSendChat = async () => {
    const content = chatInput.trim();
    if (!content || isSending) return;

    setChatInput('');
    setIsSending(true);
    setLastAssistantResponse(null);

    const isCreate = /^(save|create|remember|store)\s+/i.test(content);

    if (isCreate) {
      const memoryContent = content.replace(/^(save|create|remember|store)\s+/i, '');
      chrome.runtime.sendMessage({
        type: 'CREATE_MEMORY',
        payload: {
          memory: {
            title: memoryContent.slice(0, 50) + (memoryContent.length > 50 ? '…' : ''),
            content: memoryContent,
            memory_type: 'note',
            tags: [],
          },
        },
      }, () => {
        setLastAssistantResponse({
          id: `assistant_${Date.now()}`,
          role: 'assistant',
          content: 'Saved to your memory bank.',
          timestamp: Date.now(),
        });
        setIsSending(false);
        chrome.runtime.sendMessage({ type: 'GET_MEMORIES' }, (response) => {
          if (Array.isArray(response)) setMemories(response);
        });
      });
    } else {
      chrome.runtime.sendMessage(
        { type: 'SEARCH_MEMORIES', payload: { query: content } },
        (response) => {
          const results: Memory[] = Array.isArray(response) ? response : [];
          setLastAssistantResponse({
            id: `assistant_${Date.now()}`,
            role: 'assistant',
            content: synthesizeResponse(content, results),
            memories: results.slice(0, 3),
            timestamp: Date.now(),
          });
          setIsSending(false);
        }
      );
    }
  };

  // ── Render ────────────────────────────────────────────────────────────

  return (
    <div className="flex h-screen w-full bg-gradient-to-b from-[#1E1E1E] to-[#0D0D0D] text-[#CCCCCC] font-mono overflow-hidden flex-col">

      {/* ── Header ── */}
      <header className="flex items-center justify-between px-4 py-2.5 bg-[#1E1E1E]/80 backdrop-blur-sm border-b border-[#3C3C3C] shrink-0">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 bg-gradient-to-br from-[#007ACC] to-[#0E639C] rounded-lg flex items-center justify-center shadow-md">
            <span className="text-xs font-bold text-white">L0</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold tracking-tight text-white leading-none">LanOnasis</h1>
            <span className="text-[9px] text-[#888888] leading-none mt-0.5">Memory Orchestrator</span>
          </div>
        </div>

        {isAuthenticated ? (
          <div className="flex items-center gap-1.5">
            {/* Online/sync dot */}
            <div
              className={`h-1.5 w-1.5 rounded-full shrink-0 ${syncStatus.isOnline ? 'bg-green-400' : 'bg-yellow-400'} ${syncStatus.isSyncing ? 'animate-pulse' : ''}`}
              title={syncStatus.isOnline ? 'Online' : 'Offline'}
            />

            {/* Refresh */}
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-1.5 hover:bg-[#3C3C3C] rounded-md transition-colors"
              title="Refresh memories"
            >
              <RefreshCw className={`h-3.5 w-3.5 text-[#888888] hover:text-white transition-colors ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>

            {/* User avatar */}
            <div
              className="h-6 w-6 rounded-full bg-[#007ACC]/15 border border-[#007ACC]/30 flex items-center justify-center text-[10px] text-[#007ACC] font-bold select-none cursor-default"
              title={userEmail || 'Connected'}
            >
              {userEmail ? userEmail[0].toUpperCase() : <User className="h-3 w-3" />}
            </div>

            {/* Settings toggle */}
            <button
              onClick={() => setShowInlineSettings(v => !v)}
              className={`p-1.5 rounded-md transition-colors ${showInlineSettings ? 'bg-[#007ACC]/20 text-[#007ACC]' : 'hover:bg-[#3C3C3C] text-[#888888] hover:text-white'}`}
              title="Settings"
            >
              <Settings className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : null}
      </header>

      {/* ── Inline settings panel ── */}
      {isAuthenticated && showInlineSettings && (
        <div className="px-4 py-3 bg-[#161616] border-b border-[#3C3C3C] shrink-0 space-y-3">
          {userEmail && (
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 rounded-full bg-[#007ACC]/20 border border-[#007ACC]/40 flex items-center justify-center text-[9px] text-[#007ACC] font-bold shrink-0">
                {userEmail[0].toUpperCase()}
              </div>
              <span className="text-xs text-[#CCCCCC] truncate">{userEmail}</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#888888]">AI Mode</span>
            <div className="flex gap-1">
              {(['off', 'auto', 'on'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => handleSetAiMode(mode)}
                  className={`text-[9px] px-2 py-0.5 rounded capitalize transition-colors ${
                    aiMode === mode ? 'bg-[#007ACC] text-white' : 'bg-[#2D2D2D] text-[#888888] hover:bg-[#3C3C3C]'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {isAILoading && (
            <div className="h-0.5 bg-purple-900/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
          )}

          <div className="flex items-center justify-between pt-1 border-t border-[#2D2D2D]">
            <button
              onClick={() => { chrome.runtime.openOptionsPage(); setShowInlineSettings(false); }}
              className="text-[10px] text-[#007ACC] hover:text-[#0E9CED] transition-colors"
            >
              Full Settings →
            </button>
            <button
              onClick={() => { handleLogout(); setShowInlineSettings(false); }}
              className="text-[10px] text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
            >
              <LogOut className="h-2.5 w-2.5" />
              Log out
            </button>
          </div>
        </div>
      )}

      {/* ── Scrollable content ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-3 space-y-3">
          {isAuthenticated ? (
            <>
              {/* Filter bar + New button */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#555555] pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Filter memories…"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg pl-8 pr-7 py-1.5 text-xs text-white placeholder:text-[#444444] focus:outline-none focus:border-[#007ACC]/50 transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => handleSearchChange('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-[#555555] hover:text-[#CCCCCC] transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
                <button
                  onClick={() => setShowQuickAdd(v => !v)}
                  className={`shrink-0 h-8 w-8 flex items-center justify-center rounded-lg border transition-colors ${
                    showQuickAdd
                      ? 'bg-[#007ACC] border-[#007ACC] text-white'
                      : 'bg-[#1A1A1A] border-[#2A2A2A] text-[#555555] hover:text-white hover:border-[#007ACC]/50'
                  }`}
                  title="New memory"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Quick-add form */}
              {showQuickAdd && (
                <QuickAddForm
                  onSave={handleQuickAdd}
                  onCancel={() => setShowQuickAdd(false)}
                  isSaving={isSavingQuickAdd}
                />
              )}

              {/* Memory count + status row */}
              <div className="flex items-center justify-between text-[9px] text-[#444444] px-0.5">
                <span>
                  {searchQuery
                    ? `${memories.length} result${memories.length !== 1 ? 's' : ''} for "${searchQuery}"`
                    : `${memories.length} memor${memories.length !== 1 ? 'ies' : 'y'} · most recent first`
                  }
                </span>
                <div className="flex items-center gap-2">
                  {isAIReady && (
                    <span className="flex items-center gap-0.5 text-green-400">
                      <Zap className="h-2.5 w-2.5" />
                      <span>AI</span>
                    </span>
                  )}
                  {syncStatus.pendingCount > 0 && (
                    <button
                      onClick={handleSync}
                      disabled={syncStatus.isSyncing}
                      className="text-yellow-400 hover:text-yellow-300 disabled:opacity-50"
                    >
                      {syncStatus.isSyncing ? 'Syncing…' : `${syncStatus.pendingCount} pending · Sync`}
                    </button>
                  )}
                </div>
              </div>

              {/* Memory list */}
              <div className="space-y-2">
                {isLoadingMemories ? (
                  <div className="flex flex-col items-center justify-center py-12 gap-3">
                    <Loader2 className="h-5 w-5 text-[#007ACC] animate-spin" />
                    <p className="text-xs text-[#888888]">Loading memories…</p>
                  </div>
                ) : memories.length === 0 ? (
                  <div className="text-center py-10">
                    <div className="h-10 w-10 mx-auto mb-3 rounded-full bg-[#1E1E1E] flex items-center justify-center">
                      <Search className="h-4 w-4 text-[#444444]" />
                    </div>
                    <p className="text-sm text-[#666666]">
                      {searchQuery ? `No memories matched "${searchQuery}"` : 'No memories yet'}
                    </p>
                    <p className="text-xs text-[#444444] mt-1">
                      {searchQuery ? 'Try different terms' : 'Type below to save your first memory'}
                    </p>
                  </div>
                ) : (
                  memories.map((memory) => (
                    <MemoryCard key={memory.id} memory={memory} onSelect={setSelectedMemory} />
                  ))
                )}
              </div>
            </>
          ) : (
            <WelcomeView onLogin={handleLogin} isConnecting={isConnecting} />
          )}
        </div>
      </div>

      {selectedMemory && (
        <MemoryDetailModal memory={selectedMemory} onClose={() => setSelectedMemory(null)} />
      )}

      {/* ── Assistant response (inline, dismissible) ── */}
      {lastAssistantResponse && isAuthenticated && (
        <div className="px-3 pt-2 shrink-0">
          <div className="relative rounded-lg border border-[#007ACC]/20 bg-[#007ACC]/5 p-3">
            <div className="flex items-center gap-1.5 mb-1.5 text-[9px] text-[#007ACC]">
              <Bot className="h-3 w-3" />
              <span>Memory assistant</span>
            </div>
            <p className="text-xs text-[#CCCCCC] leading-relaxed">{lastAssistantResponse.content}</p>
            {lastAssistantResponse.memories && lastAssistantResponse.memories.length > 0 && (
              <div className="mt-2 space-y-1.5">
                {lastAssistantResponse.memories.map((m) => (
                  <MemoryCard key={m.id} memory={m} onSelect={setSelectedMemory} />
                ))}
              </div>
            )}
            <button
              onClick={() => setLastAssistantResponse(null)}
              className="absolute top-2 right-2 text-[#444444] hover:text-[#888888] transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}

      {/* ── Unified input ── */}
      <footer className="p-3 bg-[#1E1E1E] border-t border-[#3C3C3C] shrink-0">
        <div className="relative">
          <div className="absolute left-3 top-3 text-[#007ACC]/70 pointer-events-none">
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
            placeholder={isAuthenticated ? 'Search, save, or ask your memory assistant…' : 'Connect to access orchestrator…'}
            disabled={!isAuthenticated}
            rows={2}
            className="w-full bg-[#252526] border border-[#3C3C3C] rounded-lg pl-9 pr-12 py-2.5 text-sm text-[#CCCCCC] placeholder:text-[#555555] resize-none focus:outline-none focus:border-[#007ACC] focus:ring-1 focus:ring-[#007ACC]/20 disabled:opacity-50 transition-all"
          />
          <button
            onClick={handleSendChat}
            className="absolute right-2 bottom-2 h-7 w-7 flex items-center justify-center bg-gradient-to-r from-[#007ACC] to-[#0E639C] hover:shadow-md hover:shadow-[#007ACC]/30 text-white rounded-md disabled:opacity-50 transition-all"
            disabled={!isAuthenticated || !chatInput.trim() || isSending}
            title="Send (Enter)"
          >
            {isSending
              ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
              : <SendHorizontal className="h-3.5 w-3.5" />
            }
          </button>
        </div>
        {isAuthenticated && (
          <div className="flex justify-between items-center px-1 mt-1">
            <span className="text-[9px] text-[#3C3C3C]">Enter to send · Shift+Enter for newline</span>
            <span className="text-[9px] text-[#333333]">v{version}</span>
          </div>
        )}
      </footer>
    </div>
  );
};
