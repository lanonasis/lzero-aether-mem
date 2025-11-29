/**
 * LanOnasis Mobile PWA
 * ARM-Optimized Memory Companion
 * 
 * Key Features for Hackathon:
 * - On-device AI embedding generation
 * - Offline-first architecture
 * - Beautiful mobile UX
 * - Cross-platform sync
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import {
  Search,
  Plus,
  Mic,
  Send,
  Cpu,
  Wifi,
  WifiOff,
  RefreshCw,
  ChevronUp,
  Sparkles,
  CheckCircle2,
  Clock,
  Tag,
  Copy,
  Check,
  Settings,
  LogOut,
  Zap,
  Loader2,
  AlertCircle,
  X,
  Menu,
  Home,
  Bookmark,
  User,
  MessageSquare,
  Bot,
  ArrowUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  useLanonasis, 
  useMemories, 
  useLocalAI, 
  useSyncStatus 
} from '@lanonasis/shared/sdk/react-hooks';
import { Memory, MemoryType } from '@lanonasis/shared/types';
import { LanoLogo } from './components/LanoLogo';

// ============================================
// Color Palette (matches VS Code extension)
// ============================================
const colors = {
  bg: {
    primary: '#0D0D0D',
    secondary: '#1A1A1A',
    card: '#252526',
    elevated: '#2D2D2D',
  },
  accent: {
    primary: '#007ACC',
    secondary: '#0E639C',
    success: '#4EC9B0',
    warning: '#DCDCAA',
    error: '#F14C4C',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#CCCCCC',
    muted: '#888888',
    disabled: '#666666',
  },
};

// ============================================
// AI Status Banner
// ============================================
const AIStatusBanner = () => {
  const { isReady, isLoading, loadProgress, deviceInfo, benchmark } = useLocalAI();
  const [benchmarkResult, setBenchmarkResult] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (isReady && !benchmarkResult) {
      benchmark().then(setBenchmarkResult);
    }
  }, [isReady, benchmark, benchmarkResult]);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-4 mt-4 p-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <LanoLogo size={20} className="text-purple-400 animate-pulse" />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-purple-400"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-purple-300">
              Loading On-Device AI...
            </p>
            <div className="mt-1 h-1.5 bg-purple-900/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${loadProgress}%` }}
              />
            </div>
          </div>
          <span className="text-xs text-purple-400">{loadProgress}%</span>
        </div>
      </motion.div>
    );
  }

  if (!isReady) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-4 mt-4"
    >
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="w-full p-3 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 text-left"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-green-400">
              On-Device AI Active
            </span>
          </div>
          <Badge 
            variant="outline" 
            className="bg-green-500/10 border-green-500/30 text-green-400 text-[10px]"
          >
            ARM Optimized
          </Badge>
        </div>
        
        <AnimatePresence>
          {showDetails && benchmarkResult && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-3 pt-3 border-t border-green-500/20 grid grid-cols-2 gap-2"
            >
              <div className="text-xs">
                <span className="text-gray-500">Device:</span>
                <p className="text-green-300">{benchmarkResult.device}</p>
              </div>
              <div className="text-xs">
                <span className="text-gray-500">Compute:</span>
                <p className="text-green-300">{benchmarkResult.compute.toUpperCase()}</p>
              </div>
              <div className="text-xs">
                <span className="text-gray-500">Embedding Time:</span>
                <p className="text-green-300">{benchmarkResult.embeddingTimeMs.toFixed(0)}ms</p>
              </div>
              <div className="text-xs">
                <span className="text-gray-500">Dimensions:</span>
                <p className="text-green-300">{benchmarkResult.dimensions}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
};

// ============================================
// Sync Status Bar
// ============================================
const SyncStatusBar = () => {
  const { isOnline, pending, isSyncing, sync } = useSyncStatus();

  if (isOnline && pending === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className={cn(
        'px-4 py-2 flex items-center justify-between text-xs',
        isOnline ? 'bg-blue-500/10' : 'bg-orange-500/10'
      )}
    >
      <div className="flex items-center gap-2">
        {isOnline ? (
          <Wifi className="h-3.5 w-3.5 text-blue-400" />
        ) : (
          <WifiOff className="h-3.5 w-3.5 text-orange-400" />
        )}
        <span className={isOnline ? 'text-blue-400' : 'text-orange-400'}>
          {isOnline
            ? `${pending} changes to sync`
            : 'Offline - changes will sync when online'}
        </span>
      </div>
      {isOnline && pending > 0 && (
        <Button
          size="sm"
          variant="ghost"
          onClick={sync}
          disabled={isSyncing}
          className="h-6 text-xs text-blue-400 hover:text-blue-300"
        >
          {isSyncing ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <RefreshCw className="h-3 w-3" />
          )}
        </Button>
      )}
    </motion.div>
  );
};

// ============================================
// Memory Card Component
// ============================================
const MobileMemoryCard = ({ 
  memory, 
  onSelect,
  index 
}: { 
  memory: Memory; 
  onSelect?: () => void;
  index: number;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(memory.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    // Haptic feedback on mobile
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const typeColors: Record<MemoryType, string> = {
    code: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
    docs: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
    todo: 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30',
    note: 'from-gray-500/20 to-slate-500/20 border-gray-500/30',
    snippet: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
    workflow: 'from-indigo-500/20 to-violet-500/20 border-indigo-500/30',
    status: 'from-teal-500/20 to-cyan-500/20 border-teal-500/30',
    idea: 'from-pink-500/20 to-rose-500/20 border-pink-500/30',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onSelect}
      className={cn(
        'p-4 rounded-2xl border bg-gradient-to-br transition-all duration-200 active:scale-[0.98]',
        typeColors[memory.type] || typeColors.note,
        onSelect && 'cursor-pointer'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white text-sm leading-tight line-clamp-2">
            {memory.title}
          </h3>
          <p className="mt-1.5 text-xs text-gray-400 line-clamp-2">
            {memory.content}
          </p>
        </div>
        <Button
          size="icon"
          variant="ghost"
          onClick={handleCopy}
          className="h-8 w-8 shrink-0 text-gray-400 hover:text-white hover:bg-white/10"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      <div className="mt-3 flex items-center gap-2 flex-wrap">
        <Badge 
          variant="outline" 
          className="text-[10px] bg-white/5 border-white/10 text-gray-300"
        >
          {memory.type}
        </Badge>
        {memory.tags.slice(0, 2).map(tag => (
          <Badge
            key={tag}
            variant="outline"
            className="text-[10px] bg-white/5 border-white/10 text-gray-400"
          >
            #{tag}
          </Badge>
        ))}
        <span className="text-[10px] text-gray-500 ml-auto">
          {format(new Date(memory.createdAt), 'MMM d')}
        </span>
        {!memory.synced && (
          <div className="h-1.5 w-1.5 rounded-full bg-orange-500" title="Not synced" />
        )}
      </div>
    </motion.div>
  );
};

// ============================================
// Quick Capture Sheet
// ============================================
const QuickCaptureSheet = ({
  isOpen,
  onClose,
  onCreate,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (content: string, type: MemoryType) => Promise<void>;
}) => {
  const [content, setContent] = useState('');
  const [type, setType] = useState<MemoryType>('note');
  const [isCreating, setIsCreating] = useState(false);
  const { embed, isReady: aiReady } = useLocalAI();

  const handleCreate = async () => {
    if (!content.trim()) return;
    
    setIsCreating(true);
    try {
      await onCreate(content, type);
      setContent('');
      setType('note');
      onClose();
      
      // Success haptic
      if ('vibrate' in navigator) {
        navigator.vibrate([50, 50, 50]);
      }
    } finally {
      setIsCreating(false);
    }
  };

  const types: { value: MemoryType; label: string; emoji: string }[] = [
    { value: 'note', label: 'Note', emoji: '📝' },
    { value: 'idea', label: 'Idea', emoji: '💡' },
    { value: 'code', label: 'Code', emoji: '💻' },
    { value: 'todo', label: 'Todo', emoji: '✅' },
    { value: 'snippet', label: 'Snippet', emoji: '✂️' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          
          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-[#1A1A1A] rounded-t-3xl border-t border-white/10"
          >
            {/* Handle */}
            <div className="flex justify-center py-3">
              <div className="h-1 w-12 rounded-full bg-white/20" />
            </div>
            
            <div className="px-4 pb-8 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">Quick Capture</h2>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={onClose}
                  className="h-8 w-8 text-gray-400"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Type Selector */}
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
                {types.map(t => (
                  <button
                    key={t.value}
                    onClick={() => setType(t.value)}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm whitespace-nowrap transition-all',
                      type === t.value
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    )}
                  >
                    <span>{t.emoji}</span>
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
              
              {/* Content Input */}
              <div className="relative">
                <textarea
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="What's on your mind?"
                  rows={4}
                  autoFocus
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-500 resize-none focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                />
                
                {aiReady && content.length > 10 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute bottom-3 right-3 flex items-center gap-1 text-[10px] text-green-400"
                  >
                    <LanoLogo size={12} />
                    <span>AI will generate embedding</span>
                  </motion.div>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 h-12 border-white/10 text-gray-300"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreate}
                  disabled={!content.trim() || isCreating}
                  className="flex-1 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Save Memory
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ============================================
// AI Chat Sheet Component
// ============================================
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  memories?: Memory[];
  timestamp: Date;
}

const AIChatSheet = ({
  isOpen,
  onClose,
  memories,
}: {
  isOpen: boolean;
  onClose: () => void;
  memories: Memory[];
}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "I'm your AI Memory Assistant. I can help you search and explore your memories semantically. Try asking me something like:\n\n• \"Find notes about API authentication\"\n• \"What did I save about React patterns?\"\n• \"Show me recent code snippets\"",
      timestamp: new Date(),
    }
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const { embed, isReady: aiReady, findSimilar } = useLocalAI();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isThinking) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsThinking(true);

    try {
      // Use local AI to find similar memories
      let relevantMemories: Memory[] = [];
      
      if (aiReady && embed) {
        // Generate embedding for the query
        const queryEmbedding = await embed(userMessage.content);
        
        // Find similar memories (simple text search as fallback)
        relevantMemories = memories.filter(m => 
          m.title.toLowerCase().includes(userMessage.content.toLowerCase()) ||
          m.content.toLowerCase().includes(userMessage.content.toLowerCase())
        ).slice(0, 5);
      } else {
        // Fallback to text search
        relevantMemories = memories.filter(m => 
          m.title.toLowerCase().includes(userMessage.content.toLowerCase()) ||
          m.content.toLowerCase().includes(userMessage.content.toLowerCase())
        ).slice(0, 5);
      }

      // Generate response
      let responseContent = '';
      if (relevantMemories.length > 0) {
        responseContent = `Found ${relevantMemories.length} relevant ${relevantMemories.length === 1 ? 'memory' : 'memories'}:\n\n`;
        relevantMemories.forEach((m, i) => {
          responseContent += `**${i + 1}. ${m.title}**\n${m.content.slice(0, 150)}${m.content.length > 150 ? '...' : ''}\n\n`;
        });
      } else {
        responseContent = "I couldn't find any memories matching your query. Try:\n\n• Using different keywords\n• Asking about a specific topic\n• Creating a new memory with the + button";
      }

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        memories: relevantMemories,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Sorry, I encountered an error while searching. Please try again.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          
          {/* Full Screen Chat */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 top-16 z-50 bg-[#0D0D0D] rounded-t-3xl border-t border-white/10 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-white">AI Orchestrator</h2>
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "h-2 w-2 rounded-full",
                      aiReady ? "bg-green-400" : "bg-yellow-400 animate-pulse"
                    )} />
                    <span className="text-xs text-gray-400">
                      {aiReady ? 'On-device AI ready' : 'Loading AI model...'}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center"
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex gap-3",
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.role === 'assistant' && (
                    <div className="h-8 w-8 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                      <Sparkles className="h-4 w-4 text-blue-400" />
                    </div>
                  )}
                  <div className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-3",
                    message.role === 'user' 
                      ? 'bg-blue-500 text-white rounded-br-md' 
                      : 'bg-[#1A1A1A] text-gray-200 rounded-bl-md border border-white/5'
                  )}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className="text-[10px] mt-2 opacity-50">
                      {format(message.timestamp, 'h:mm a')}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {isThinking && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="h-8 w-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-blue-400 animate-pulse" />
                  </div>
                  <div className="bg-[#1A1A1A] rounded-2xl rounded-bl-md px-4 py-3 border border-white/5">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-[#0D0D0D]">
              <div className="flex items-center gap-2 bg-[#1A1A1A] rounded-2xl border border-white/10 p-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  placeholder="Ask about your memories..."
                  className="flex-1 bg-transparent border-none focus-visible:ring-0 text-white placeholder:text-gray-500"
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isThinking}
                  size="icon"
                  className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50"
                >
                  <ArrowUp className="h-5 w-5" />
                </Button>
              </div>
              <p className="text-[10px] text-gray-500 text-center mt-2">
                {aiReady ? '✨ Powered by on-device ARM AI' : '⏳ AI model loading...'}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ============================================
// Main Mobile App Component
// ============================================
export const MobileApp = () => {
  const { isAuthenticated, isConnecting, login, logout, user } = useLanonasis();
  const { memories, isLoading, searchQuery, setSearchQuery, create } = useMemories();
  const { initialize: initAI, isReady: aiReady } = useLocalAI();
  const [showCapture, setShowCapture] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'chat' | 'profile'>('home');

  // Auto-login for demo/hackathon mode
  useEffect(() => {
    if (!isAuthenticated && !isConnecting) {
      // Auto-login after a brief delay to show the splash
      const timer = setTimeout(() => {
        login().catch(console.error);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, isConnecting, login]);

  // Initialize AI on mount
  useEffect(() => {
    initAI().catch(console.error);
  }, [initAI]);

  const handleCreate = async (content: string, type: MemoryType) => {
    const title = content.split('\n')[0].slice(0, 50) || 'Untitled';
    await create({
      title,
      content,
      type,
      tags: [],
    });
  };

  // Unauthenticated View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-6"
        >
          {/* Logo */}
          <motion.div
            animate={{ 
              boxShadow: ['0 0 20px rgba(0,122,204,0.3)', '0 0 40px rgba(0,122,204,0.5)', '0 0 20px rgba(0,122,204,0.3)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-20 w-20 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center"
          >
            <LanoLogo size={40} className="text-white" />
          </motion.div>
          
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white">LanOnasis</h1>
            <p className="text-gray-400 text-sm max-w-[250px]">
              Your AI-powered memory companion. Capture, search, and recall instantly.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-3 pt-4">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <LanoLogo size={20} className="text-blue-400 mb-2" />
              <p className="text-xs text-gray-300">On-Device AI</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <WifiOff className="h-5 w-5 text-green-400 mb-2" />
              <p className="text-xs text-gray-300">Offline First</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <Zap className="h-5 w-5 text-yellow-400 mb-2" />
              <p className="text-xs text-gray-300">ARM Optimized</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <RefreshCw className="h-5 w-5 text-purple-400 mb-2" />
              <p className="text-xs text-gray-300">Cross-Platform Sync</p>
            </div>
          </div>
          
          <Button
            onClick={() => login()}
            disabled={isConnecting}
            size="lg"
            className="w-full h-14 mt-6 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl"
          >
            {isConnecting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                Get Started
                <ChevronUp className="ml-2 h-5 w-5 rotate-90" />
              </>
            )}
          </Button>
          
          <p className="text-xs text-gray-500">
            Powered by ARM • Works offline
          </p>
        </motion.div>
      </div>
    );
  }

  // Authenticated View
  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#0D0D0D]/80 backdrop-blur-xl border-b border-white/5 safe-area-top">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <LanoLogo size={16} className="text-white" />
            </div>
            <span className="font-bold text-white">LanOnasis</span>
          </div>
          
          <Button
            size="icon"
            variant="ghost"
            onClick={logout}
            className="h-8 w-8 text-gray-400"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
        
        <SyncStatusBar />
      </header>

      {/* AI Status */}
      <AIStatusBanner />

      {/* Search */}
      <div className="px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search your memories..."
            className="pl-10 h-12 bg-white/5 border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:border-blue-500/50"
          />
          {aiReady && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Badge 
                variant="outline" 
                className="text-[9px] bg-green-500/10 border-green-500/30 text-green-400"
              >
                <LanoLogo size={10} className="mr-1" />
                Semantic
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 px-4">
        <div className="space-y-3 pb-24">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-8 w-8 text-blue-400 animate-spin" />
              <p className="mt-3 text-sm text-gray-400">Loading memories...</p>
            </div>
          ) : memories.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-16 w-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                <Sparkles className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-white font-semibold">No memories yet</h3>
              <p className="text-sm text-gray-500 mt-1 max-w-[200px]">
                Tap the + button to capture your first thought
              </p>
            </div>
          ) : (
            memories.map((memory, index) => (
              <MobileMemoryCard
                key={memory.id}
                memory={memory}
                index={index}
              />
            ))
          )}
        </div>
      </ScrollArea>

      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowCapture(true)}
        className="fixed bottom-24 right-4 h-14 w-14 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30 flex items-center justify-center z-20"
      >
        <Plus className="h-6 w-6 text-white" />
      </motion.button>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#1A1A1A]/90 backdrop-blur-xl border-t border-white/5 safe-area-bottom z-30">
        <div className="flex items-center justify-around py-2">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'chat', icon: MessageSquare, label: 'AI Chat' },
            { id: 'profile', icon: User, label: 'Profile' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'chat') {
                  setShowChat(true);
                } else {
                  setActiveTab(item.id as any);
                }
              }}
              className={cn(
                'flex flex-col items-center gap-1 px-4 py-2 transition-colors',
                item.id === 'chat' ? 'text-blue-400' : (activeTab === item.id ? 'text-blue-400' : 'text-gray-500')
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px]">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Quick Capture Sheet */}
      <QuickCaptureSheet
        isOpen={showCapture}
        onClose={() => setShowCapture(false)}
        onCreate={handleCreate}
      />

      {/* AI Chat Sheet */}
      <AIChatSheet
        isOpen={showChat}
        onClose={() => setShowChat(false)}
        memories={memories}
      />
    </div>
  );
};

export default MobileApp;
