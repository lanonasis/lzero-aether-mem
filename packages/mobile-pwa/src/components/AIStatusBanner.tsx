/**
 * AI Status Banner
 * Shows on-device AI loading and status
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLocalAI } from '@lanonasis/shared';
import { LanoLogo } from './LanoLogo';

export const AIStatusBanner: React.FC = () => {
  const { isReady, isLoading, loadProgress, error } = useLocalAI();
  const [benchmarkResult, setBenchmarkResult] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (isReady && !benchmarkResult) {
      // Would run benchmark here if available
    }
  }, [isReady, benchmarkResult]);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-4 mt-4 rounded-xl border border-purple-500/30 bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-3"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <LanoLogo size={20} className="animate-pulse text-purple-400" />
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
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-purple-900/50">
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

  // Show error banner if AI failed to load
  if (error && !dismissed) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-4 mt-4 rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-3"
      >
        <div className="flex items-center gap-3">
          <AlertCircle className="h-5 w-5 shrink-0 text-yellow-400" />
          <div className="flex-1 text-sm">
            <p className="font-medium text-yellow-300">On-Device AI unavailable</p>
            <p className="mt-1 text-xs text-yellow-400/70">
              Using cloud search instead. Check console for details.
            </p>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="text-yellow-400 hover:text-yellow-300"
          >
            <X className="h-4 w-4" />
          </button>
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
        className="w-full rounded-xl border border-green-500/30 bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-3 text-left"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <span className="text-sm font-medium text-green-400">
              On-Device AI Active
            </span>
          </div>
          <Badge
            variant="outline"
            className="border-green-500/30 bg-green-500/10 text-[10px] text-green-400"
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
              className="mt-3 grid grid-cols-2 gap-2 border-t border-green-500/20 pt-3"
            >
              <div className="text-xs">
                <span className="text-gray-500">Device:</span>
                <p className="text-green-300">{benchmarkResult.device}</p>
              </div>
              <div className="text-xs">
                <span className="text-gray-500">Compute:</span>
                <p className="text-green-300">
                  {benchmarkResult.compute.toUpperCase()}
                </p>
              </div>
              <div className="text-xs">
                <span className="text-gray-500">Embedding Time:</span>
                <p className="text-green-300">
                  {benchmarkResult.embeddingTimeMs.toFixed(0)}ms
                </p>
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
