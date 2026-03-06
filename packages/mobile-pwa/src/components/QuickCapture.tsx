/**
 * Quick Capture Component
 * Mobile-optimized memory creation (sheet-based)
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocalAI, type MemoryType } from '@lanonasis/shared';
import { LanoLogo } from './LanoLogo';
import { cn } from '@/lib/utils';

interface QuickCaptureProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (content: string, type: MemoryType) => Promise<void>;
}

// Memory types aligned with SDK MemoryType values
const types: { value: MemoryType; label: string; emoji: string }[] = [
  { value: 'personal', label: 'Note', emoji: '📝' },
  { value: 'knowledge', label: 'Idea', emoji: '💡' },
  { value: 'project', label: 'Code', emoji: '💻' },
  { value: 'workflow', label: 'Todo', emoji: '✅' },
  { value: 'reference', label: 'Snippet', emoji: '✂️' },
  { value: 'context', label: 'Context', emoji: '☁️' },
];

export const QuickCapture: React.FC<QuickCaptureProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [content, setContent] = useState('');
  const [type, setType] = useState<MemoryType>('personal');
  const [isCreating, setIsCreating] = useState(false);
  const { isReady: aiReady } = useLocalAI();

  const handleCreate = async () => {
    if (!content.trim()) return;

    setIsCreating(true);
    try {
      await onCreate(content, type);
      setContent('');
      setType('personal');
      onClose();

      // Success haptic
      if ('vibrate' in navigator) {
        navigator.vibrate([50, 50, 50]);
      }
    } finally {
      setIsCreating(false);
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
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl border-t border-white/10 bg-[#1A1A1A]"
          >
            {/* Handle */}
            <div className="flex justify-center py-3">
              <div className="h-1 w-12 rounded-full bg-white/20" />
            </div>

            <div className="space-y-4 px-4 pb-8">
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
              <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2">
                {types.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setType(t.value)}
                    className={cn(
                      'flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-2 text-sm transition-all',
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
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What's on your mind?"
                  rows={4}
                  autoFocus
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 p-4 text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20"
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
                  className="h-12 flex-1 border-white/10 text-gray-300"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreate}
                  disabled={!content.trim() || isCreating}
                  className="h-12 flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
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
