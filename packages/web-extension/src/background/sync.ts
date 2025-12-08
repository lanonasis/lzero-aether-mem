/**
 * Background Sync
 * Periodic sync using Chrome alarms API
 */

import type { MemoryCache } from './cache';

const SYNC_ALARM_NAME = 'l0-memory-sync';
const SYNC_INTERVAL_MINUTES = 5;

export function setupSync(cache: MemoryCache): void {
  // Create periodic sync alarm
  chrome.alarms.create(SYNC_ALARM_NAME, {
    periodInMinutes: SYNC_INTERVAL_MINUTES,
  });

  // Handle alarm
  chrome.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name === SYNC_ALARM_NAME) {
      console.log('[L0 Memory] Background sync triggered');
      await cache.sync();
    }
  });

  // Initial sync on startup
  setTimeout(() => {
    cache.sync().catch(console.error);
  }, 5000);

  console.log('[L0 Memory] Background sync setup complete');
}
