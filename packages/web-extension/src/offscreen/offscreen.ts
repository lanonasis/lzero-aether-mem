/**
 * Offscreen Document for AI Processing
 *
 * This runs in a separate context without CSP restrictions,
 * allowing @xenova/transformers to use eval() and WASM.
 */

// Types for messages
interface AIRequest {
  type: 'INIT_AI' | 'EMBED' | 'EMBED_BATCH' | 'GET_STATUS';
  id: string;
  payload?: {
    text?: string;
    texts?: string[];
  };
}

interface AIResponse {
  type: 'AI_RESPONSE';
  id: string;
  success: boolean;
  error?: string;
  data?: {
    embedding?: number[];
    embeddings?: number[][];
    isReady?: boolean;
    loadProgress?: number;
    deviceInfo?: string;
  };
}

// AI Engine state
let pipeline: any = null;
let embedder: any = null;
let isReady = false;
let loadProgress = 0;
let deviceInfo = '';
let initPromise: Promise<void> | null = null;

const MODEL_NAME = 'Xenova/all-MiniLM-L6-v2';

/**
 * Initialize the AI model
 */
async function initializeAI(): Promise<void> {
  if (initPromise) return initPromise;
  if (isReady) return;

  initPromise = (async () => {
    try {
      console.log('[Offscreen AI] Loading transformers.js...');

      // Dynamic import - offscreen context allows eval()
      const { pipeline: pipelineFn, env } = await import('@xenova/transformers');
      pipeline = pipelineFn;

      // Configure for browser use
      env.allowLocalModels = false;
      env.useBrowserCache = typeof caches !== 'undefined';
      env.remoteHost = 'https://huggingface.co';
      env.remotePathTemplate = '{model}/resolve/{revision}/';

      // WASM config
      env.backends.onnx.wasm.numThreads = 1;

      console.log('[Offscreen AI] Loading embedding model...');

      // Progress callback
      const progressCallback = (progress: any) => {
        if (progress.status === 'progress') {
          loadProgress = Math.round(progress.progress);
          console.log(`[Offscreen AI] Loading: ${loadProgress}%`);
        }
      };

      // Initialize embedder
      embedder = await pipeline('feature-extraction', MODEL_NAME, {
        progress_callback: progressCallback,
      });

      isReady = true;
      loadProgress = 100;
      deviceInfo = getDeviceInfo();

      console.log('[Offscreen AI] Ready on:', deviceInfo);
    } catch (error) {
      console.error('[Offscreen AI] Init failed:', error);
      initPromise = null;
      throw error;
    }
  })();

  return initPromise;
}

/**
 * Generate embedding for text
 */
async function embed(text: string): Promise<number[]> {
  if (!isReady) {
    await initializeAI();
  }

  const output = await embedder(text, {
    pooling: 'mean',
    normalize: true,
  });

  return Array.from(output.data) as number[];
}

/**
 * Generate embeddings for multiple texts
 */
async function embedBatch(texts: string[]): Promise<number[][]> {
  const results: number[][] = [];
  for (const text of texts) {
    results.push(await embed(text));
  }
  return results;
}

/**
 * Get device info
 */
function getDeviceInfo(): string {
  if (typeof navigator === 'undefined') return 'Unknown';

  const ua = navigator.userAgent;

  if (/iPhone|iPad|iPod/.test(ua)) return 'iOS ARM';
  if (/Android/.test(ua)) return 'Android ARM';
  if (/Mac/.test(ua)) return 'macOS (Apple Silicon)';
  if (/Windows/.test(ua) && /ARM/.test(ua)) return 'Windows ARM';
  if (/Linux/.test(ua) && /aarch64/.test(ua)) return 'Linux ARM64';

  return 'Desktop';
}

/**
 * Handle messages from extension
 */
chrome.runtime.onMessage.addListener((
  message: AIRequest,
  _sender: chrome.runtime.MessageSender,
  sendResponse: (response: AIResponse) => void
) => {
  const { type, id, payload } = message;

  // Only handle AI-related messages
  if (!['INIT_AI', 'EMBED', 'EMBED_BATCH', 'GET_STATUS'].includes(type)) {
    return false;
  }

  (async () => {
    try {
      switch (type) {
        case 'INIT_AI': {
          await initializeAI();
          sendResponse({
            type: 'AI_RESPONSE',
            id,
            success: true,
            data: { isReady, loadProgress, deviceInfo },
          });
          break;
        }

        case 'EMBED': {
          if (!payload?.text) {
            throw new Error('No text provided for embedding');
          }
          const embedding = await embed(payload.text);
          sendResponse({
            type: 'AI_RESPONSE',
            id,
            success: true,
            data: { embedding },
          });
          break;
        }

        case 'EMBED_BATCH': {
          if (!payload?.texts || !Array.isArray(payload.texts)) {
            throw new Error('No texts provided for batch embedding');
          }
          const embeddings = await embedBatch(payload.texts);
          sendResponse({
            type: 'AI_RESPONSE',
            id,
            success: true,
            data: { embeddings },
          });
          break;
        }

        case 'GET_STATUS': {
          sendResponse({
            type: 'AI_RESPONSE',
            id,
            success: true,
            data: { isReady, loadProgress, deviceInfo },
          });
          break;
        }
      }
    } catch (error) {
      console.error('[Offscreen AI] Error:', error);
      sendResponse({
        type: 'AI_RESPONSE',
        id,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  })();

  return true; // Keep channel open for async response
});

console.log('[Offscreen AI] Document loaded, waiting for commands...');
