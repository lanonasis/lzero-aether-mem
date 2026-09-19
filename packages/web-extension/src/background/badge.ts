/**
 * Update the extension icon badge to show unsynced memory count.
 * Badge is cleared when memory is synced or deleted.
 */

import { type MemoryCache } from './cache';

export async function refreshUnsyncedBadge(cache: Pick<MemoryCache, 'getPendingMemories'>): Promise<void> {
  const pending = await cache.getPendingMemories();
  const count = pending.length;

  if (count === 0) {
    chrome.action.setBadgeText({ text: '' });
    chrome.action.setBadgeBackgroundColor({ color: 'rgba(0,0,0,0)' });
  } else {
    chrome.action.setBadgeText({ text: String(count) });
    chrome.action.setBadgeBackgroundColor({ color: '#FF6B00' }); // Orange
  }
}
