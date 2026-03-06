/**
 * Mobile Memory Card Component
 * Aligned with desktop MemoryCard but mobile-optimized
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Copy, Check, FileText, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Memory, MemoryType } from '@lanonasis/shared';

// Type color mappings (aligned with SDK MemoryType values)
const typeGradients: Record<string, string> = {
  // SDK MemoryType values
  context: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
  project: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
  knowledge: 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30',
  reference: 'from-gray-500/20 to-slate-500/20 border-gray-500/30',
  personal: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
  workflow: 'from-indigo-500/20 to-violet-500/20 border-indigo-500/30',
  // Legacy desktop values (for backwards compatibility during migration)
  note: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
  docs: 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30',
  code: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
  snippet: 'from-gray-500/20 to-slate-500/20 border-gray-500/30',
  todo: 'from-indigo-500/20 to-violet-500/20 border-indigo-500/30',
  idea: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
  status: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
};

const typeLabels: Record<string, string> = {
  // SDK MemoryType values
  context: 'Context',
  project: 'Project',
  knowledge: 'Knowledge',
  reference: 'Reference',
  personal: 'Personal',
  workflow: 'Workflow',
  // Legacy desktop values
  note: 'Note',
  docs: 'Docs',
  code: 'Code',
  snippet: 'Snippet',
  todo: 'Todo',
  idea: 'Idea',
  status: 'Status',
};

interface MemoryCardProps {
  memory: Memory;
  onOpen?: (memory: Memory) => void;
  index?: number;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({
  memory,
  onOpen,
  index = 0,
}) => {
  const [copied, setCopied] = useState(false);
  const Icon = memory.icon || FileText;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = memory.content ?? '';

    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      navigator.clipboard.writeText(text).catch(() => {
        // Ignore clipboard errors
      });
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    // Haptic feedback on mobile
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const formatDate = (memory: Memory) => {
    const rawDate = memory.createdAt ?? memory.updatedAt;
    if (!rawDate) return '—';
    const parsed = rawDate instanceof Date ? rawDate : new Date(rawDate);
    if (Number.isNaN(parsed.getTime())) return '—';
    return format(parsed, 'MMM d');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={() => onOpen?.(memory)}
      className={cn(
        'group relative flex cursor-pointer flex-col gap-2 rounded-2xl border bg-gradient-to-br p-4 transition-all duration-200 active:scale-[0.98]',
        typeGradients[memory.type] || typeGradients.note,
        onOpen && 'cursor-pointer'
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <Icon className="h-4 w-4 shrink-0 text-white/70" />
          <h3 className="line-clamp-2 text-sm font-semibold leading-tight text-white">
            {memory.title}
          </h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className="h-8 w-8 shrink-0 text-gray-400 hover:bg-white/10 hover:text-white"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>

      <p className="line-clamp-2 text-xs text-gray-400">
        {memory.content || ''}
      </p>

      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        <Badge
          variant="outline"
          className="border-white/10 bg-white/5 text-[10px] text-gray-300"
        >
          {typeLabels[memory.type] || memory.type}
        </Badge>

        {memory.tags?.slice(0, 2).map((tag: string) => (
          <span
            key={tag}
            className="inline-flex max-w-[100px] items-center gap-0.5 rounded-full border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-gray-400"
          >
            <Hash className="h-2.5 w-2.5" />
            <span className="truncate">{tag}</span>
          </span>
        ))}

        <span className="ml-auto text-[10px] text-gray-500">
          {formatDate(memory)}
        </span>

        {!memory.synced && (
          <div
            className="h-1.5 w-1.5 rounded-full bg-orange-500"
            title="Not synced"
          />
        )}
      </div>
    </motion.div>
  );
};
