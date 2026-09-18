/**
 * Broadcast helper — sends a message to all extension pages.
 * Silently handles the case where no listener is mounted (try/catch).
 */
export async function broadcastToExtensionPages(
  message: { type: string; payload?: unknown }
): Promise<void> {
  try {
    await chrome.runtime.sendMessage(message);
  } catch {
    // No listener mounted — that's fine, the panel will pick up state via storage
  }
}
