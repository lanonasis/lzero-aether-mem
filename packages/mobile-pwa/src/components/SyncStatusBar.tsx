/**
 * Sync Status Bar
 * Shows online/offline status and pending sync count
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, WifiOff, RefreshCw, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSyncStatus } from '@lanonasis/shared';
import { cn } from '@/lib/utils';

export const SyncStatusBar: React.FC = () => {
  const { isOnline, pending, isSyncing, sync } = useSyncStatus();

  if (isOnline && pending === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className={cn(
        'flex items-center justify-between px-4 py-2 text-xs',
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
