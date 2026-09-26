/**
 * Promisified wrapper for chrome.runtime.sendMessage.
 * Converts the callback-based API to Promise-based for cleaner async/await code.
 */
export function sendMessage<T = unknown>(
  message: { type: string; payload?: unknown }
): Promise<T> {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, (response) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
      } else {
        resolve(response as T);
      }
    });
  });
}
