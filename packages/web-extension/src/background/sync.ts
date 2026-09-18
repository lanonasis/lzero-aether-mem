/**
 * Background Sync
 * Periodic sync using Chrome alarms API
 */

import type { MemoryCache } from './cache';

const SYNC_ALARM_NAME = 'l0-memory-sync';
const SYNC_INTERVAL_MINUTES = 5;
const LAST_SYNC_ATTEMPT_KEY = 'l0_last_sync_attempt_at';

/**
 * Minimum gap between automatic syncs, whatever woke the worker.
 * Manual syncs (SYNC_MEMORIES from the UI) call cache.sync() directly and are not throttled.
 */
export const MIN_AUTO_SYNC_GAP_MS = 60_000;

export type AutoSyncReason = 'alarm' | 'startup';

// Promise-cache singleton: prevents two overlapping syncs from both starting.
// On SW wake, the alarm listener may fire while a previous sync is still in-flight.
// Instead of a boolean flag (TOCTOU race), we track the in-flight promise so the
// second caller awaits the same work. This survives SW termination because the
// promise is module-scoped — on cold wake a fresh null is created.
let inflight: Promise<void> | null = null;

/**
 * Run an automatic sync unless one was attempted within MIN_AUTO_SYNC_GAP_MS.
 *
 * The attempt time is kept in chrome.storage.local, not in memory: MV3 tears the service
 * worker down between events, so module state does not survive to the next wake.
 * It is recorded before syncing, so failed syncs are throttled too.
 */
export async function syncIfDue(
  cache: Pick<MemoryCache, 'sync'>,
  reason: AutoSyncReason,
  now: number = Date.now(),
): Promise<boolean> {
  const stored = await chrome.storage.local.get(['l0_auth_token', LAST_SYNC_ATTEMPT_KEY]);
  if (!stored.l0_auth_token) {
    if (reason === 'startup') {
      console.log('[L0 Memory] Skipping initial sync - not authenticated');
    }
    return false;
  }

  // A stored time in the future (the system clock moved backwards between wakes) must not
  // wedge automatic sync until the clock catches up, so only throttle on a past attempt.
  const lastAttempt = Number(stored[LAST_SYNC_ATTEMPT_KEY]) || 0;
  if (lastAttempt <= now && now - lastAttempt < MIN_AUTO_SYNC_GAP_MS) {
    return false;
  }

  await chrome.storage.local.set({ [LAST_SYNC_ATTEMPT_KEY]: now });
  console.log(`[L0 Memory] Background sync triggered (${reason})`);

  // Promise-cache: if a sync is already in-flight, wait for it instead of starting a new one.
  if (inflight) {
    console.log('[L0 Memory] Sync already in-flight, awaiting...');
    await inflight;
    return false;
  }

  inflight = cache.sync();
  try {
    await inflight;
    return true;
  } finally {
    inflight = null;
  }
}

export function setupSync(cache: MemoryCache): void {
  // This module runs again on every service-worker wake, including the wake the alarm
  // itself causes. Create the alarm only when it is missing so a wake does not reset it.
  chrome.alarms.get(SYNC_ALARM_NAME).then((existing) => {
    if (!existing) {
      chrome.alarms.create(SYNC_ALARM_NAME, {
        periodInMinutes: SYNC_INTERVAL_MINUTES,
      });
    }
  });

  // Handle alarm
  chrome.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name === SYNC_ALARM_NAME) {
      await syncIfDue(cache, 'alarm');
    }
  });

  // Initial sync on startup. Because this also runs on every alarm wake, it used to fire a
  // second full /memory/list about 5s after each alarm sync; syncIfDue now skips it.
  setTimeout(() => {
    syncIfDue(cache, 'startup').catch(console.error);
  }, 5000);

  console.log('[L0 Memory] Background sync setup complete');
}
