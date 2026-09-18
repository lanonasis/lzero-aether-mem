/**
 * Broadcast helper — notifies side panel pages of SW-level events.
 *
 * Wrapped in try/catch because chrome.runtime.sendMessage rejects with
 * "Receiving end does not exist" when no listener is mounted (e.g. panel
 * is closed).
 */

type BroadcastEvent =
  | { type: 'SYNC_COMPLETED'; payload: { count: number } }
  | { type: 'MEMORY_ADDED'; payload: { memory: Record<string, unknown> } }
  | { type: 'MEMORY_UPDATED'; payload: { id: string } }
  | { type: 'MEMORY_DELETED'; payload: { id: string } };

export function broadcastToExtensionPages(event: BroadcastEvent): void {
  chrome.runtime.sendMessage(event).catch(() => {
    // No listener mounted — safe to ignore.
  });
}
