/**
 * LanOnasis Mobile PWA
 * ARM-Optimized Memory Companion
 *
 * Aligned with desktop VS Code extension architecture:
 * - Uses extracted components (WelcomeView, MemoryCard, SearchBar, etc.)
 * - Uses aligned hooks (useAuth, useMemories)
 * - Same authentication flow and UX patterns
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Home,
  MessageSquare,
  User,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  useLanonasis,
  useMemories as useSharedMemories,
  useLocalAI,
  type Memory,
  type MemoryType,
} from '@lanonasis/shared';
import {
  useAuth,
  useMemories,
} from './hooks';
import {
  WelcomeView,
  MemoryCard,
  SearchBar,
  AIStatusBanner,
  SyncStatusBar,
  QuickCapture,
  ChatInterface,
  LanoLogo,
} from './components';

export const MobileApp: React.FC = () => {
  // Auth (aligned with desktop useAuth)
  const {
    isAuthenticated,
    isLoading: authLoading,
    error: authError,
    login,
    logout,
  } = useAuth();

  // Memories (aligned with desktop useMemories)
  const {
    memories,
    searchQuery,
    setSearchQuery,
    filteredMemories,
    isLoading: memoriesLoading,
    createMemory,
    searchMemories,
  } = useMemories(isAuthenticated);

  // Local AI
  const { isReady: aiReady, embed } = useLocalAI();

  // UI State
  const [showCapture, setShowCapture] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'profile'>('home');

  // Handle memory creation
  const handleCreateMemory = async (
    content: string,
    type: MemoryType
  ): Promise<void> => {
    await createMemory({
      title: content.slice(0, 50) + (content.length > 50 ? '...' : ''),
      content,
      memory_type: type,
    });
  };

  // Handle memory selection
  const handleMemoryOpen = (memory: Memory) => {
    // TODO: Implement memory detail view
    console.log('Open memory:', memory);
  };

  // Unauthenticated State (aligned with desktop WelcomeView)
  if (!isAuthenticated) {
    return (
      <WelcomeView
        onLoginOAuth={login}
        isLoading={authLoading}
        error={authError || null}
      />
    );
  }

  // Loading State
  if (authLoading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-[#0D0D0D]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
        <p className="mt-4 text-sm text-gray-400">Loading...</p>
      </div>
    );
  }

  // Authenticated Main View
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#0D0D0D]">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-white/5 bg-[#0D0D0D]/80 backdrop-blur-xl safe-area-top">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
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
            <User className="h-4 w-4" />
          </Button>
        </div>

        <SyncStatusBar />
      </header>

      {/* AI Status */}
      <AIStatusBanner />

      {/* Search */}
      <div className="px-4 py-3">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search your memories..."
        />
      </div>

      {/* Content */}
      <div
        className="flex-1 overflow-y-auto overflow-x-hidden px-4 overscroll-contain"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div className="space-y-3 pb-24">
          {memoriesLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
              <p className="mt-3 text-sm text-gray-400">Loading memories...</p>
            </div>
          ) : filteredMemories.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5">
                <Sparkles className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="font-semibold text-white">No memories yet</h3>
              <p className="mt-1 max-w-[200px] text-sm text-gray-500">
                Tap the + button to capture your first thought
              </p>
            </div>
          ) : (
            filteredMemories.map((memory, index) => (
              <MemoryCard
                key={memory.id}
                memory={memory}
                onOpen={handleMemoryOpen}
                index={index}
              />
            ))
          )}
        </div>
      </div>

      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowCapture(true)}
        className="fixed bottom-24 right-4 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30"
      >
        <Plus className="h-6 w-6 text-white" />
      </motion.button>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/5 bg-[#1A1A1A]/90 backdrop-blur-xl safe-area-bottom">
        <div className="flex items-center justify-around py-2">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'chat', icon: MessageSquare, label: 'AI Chat' },
            { id: 'profile', icon: User, label: 'Profile' },
          ].map((item) => (
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
                item.id === 'chat'
                  ? 'text-blue-400'
                  : activeTab === item.id
                    ? 'text-blue-400'
                    : 'text-gray-500'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px]">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Quick Capture Sheet */}
      <QuickCapture
        isOpen={showCapture}
        onClose={() => setShowCapture(false)}
        onCreate={handleCreateMemory}
      />

      {/* AI Chat Sheet */}
      <ChatInterface
        isOpen={showChat}
        onClose={() => setShowChat(false)}
        memories={filteredMemories}
        onSearch={searchMemories}
        aiReady={aiReady}
        embed={embed}
      />
    </div>
  );
};

export default MobileApp;
