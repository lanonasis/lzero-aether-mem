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
  Brain,
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
            <Brain className="h-5 w-5 text-purple-400 animate-pulse" />
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
                    <Brain className="h-3 w-3" />
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
// Main Mobile App Component
// ============================================
export const MobileApp = () => {
  const { isAuthenticated, isConnecting, login, logout, user } = useLanonasis();
  const { memories, isLoading, searchQuery, setSearchQuery, create } = useMemories();
  const { initialize: initAI, isReady: aiReady } = useLocalAI();
  const [showCapture, setShowCapture] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'saved' | 'profile'>('home');

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
            <Brain className="h-10 w-10 text-white" />
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
              <Brain className="h-5 w-5 text-blue-400 mb-2" />
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
              <Brain className="h-4 w-4 text-white" />
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
                <Brain className="h-2.5 w-2.5 mr-1" />
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
            { id: 'saved', icon: Bookmark, label: 'Saved' },
            { id: 'profile', icon: User, label: 'Profile' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={cn(
                'flex flex-col items-center gap-1 px-4 py-2 transition-colors',
                activeTab === item.id ? 'text-blue-400' : 'text-gray-500'
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
    </div>
  );
};

export default MobileApp;
