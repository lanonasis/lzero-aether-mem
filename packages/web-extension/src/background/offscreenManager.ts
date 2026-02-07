/**
 * Offscreen Document Manager
 *
 * Manages the lifecycle of the offscreen document used for AI processing.
 * The offscreen document runs in a context that allows eval() and WASM,
 * bypassing the strict CSP of extension pages.
 */

const OFFSCREEN_DOCUMENT_PATH = 'src/offscreen/index.html';

let creating: Promise<void> | null = null;

/**
 * Check if the offscreen document exists
 */
async function hasOffscreenDocument(): Promise<boolean> {
  // Chrome 116+ has runtime.getContexts
  if ('getContexts' in chrome.runtime) {
    const contexts = await (chrome.runtime as any).getContexts({
      contextTypes: ['OFFSCREEN_DOCUMENT'],
      documentUrls: [chrome.runtime.getURL(OFFSCREEN_DOCUMENT_PATH)],
    });
    return contexts.length > 0;
  }

  // Fallback for older Chrome versions
  try {
    // Try to create - if it fails with "only one" error, it exists
    await chrome.offscreen.createDocument({
      url: OFFSCREEN_DOCUMENT_PATH,
      reasons: [chrome.offscreen.Reason.WORKERS],
      justification: 'Running AI/ML inference using transformers.js',
    });
    // If we got here, it didn't exist but now does
    return true;
  } catch (error: any) {
    if (error.message?.includes('Only a single offscreen')) {
      return true;
    }
    throw error;
  }
}

/**
 * Ensure the offscreen document is created
 */
export async function ensureOffscreenDocument(): Promise<void> {
  if (await hasOffscreenDocument()) {
    return;
  }

  // Avoid race conditions
  if (creating) {
    return creating;
  }

  creating = chrome.offscreen.createDocument({
    url: OFFSCREEN_DOCUMENT_PATH,
    reasons: [chrome.offscreen.Reason.WORKERS],
    justification: 'Running AI/ML inference using transformers.js',
  });

  try {
    await creating;
    console.log('[OffscreenManager] Document created');
  } finally {
    creating = null;
  }
}

/**
 * Close the offscreen document
 */
export async function closeOffscreenDocument(): Promise<void> {
  if (await hasOffscreenDocument()) {
    await chrome.offscreen.closeDocument();
    console.log('[OffscreenManager] Document closed');
  }
}

/**
 * Send a message to the offscreen document and wait for response
 */
export async function sendToOffscreen<T>(
  type: 'INIT_AI' | 'EMBED' | 'EMBED_BATCH' | 'GET_STATUS',
  payload?: { text?: string; texts?: string[] }
): Promise<T> {
  await ensureOffscreenDocument();

  const id = `${type}_${Date.now()}_${Math.random().toString(36).slice(2)}`;

  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      { type, id, payload },
      (response) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
          return;
        }

        if (!response.success) {
          reject(new Error(response.error || 'Unknown error'));
          return;
        }

        resolve(response.data);
      }
    );
  });
}

/**
 * Initialize AI in the offscreen document
 */
export async function initializeOffscreenAI(): Promise<{
  isReady: boolean;
  loadProgress: number;
  deviceInfo: string;
}> {
  return sendToOffscreen('INIT_AI');
}

/**
 * Generate embedding using the offscreen document
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const result = await sendToOffscreen<{ embedding: number[] }>('EMBED', { text });
  return result.embedding;
}

/**
 * Generate embeddings for multiple texts
 */
export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  const result = await sendToOffscreen<{ embeddings: number[][] }>('EMBED_BATCH', { texts });
  return result.embeddings;
}

/**
 * Get AI status from offscreen document
 */
export async function getOffscreenAIStatus(): Promise<{
  isReady: boolean;
  loadProgress: number;
  deviceInfo: string;
}> {
  return sendToOffscreen('GET_STATUS');
}
