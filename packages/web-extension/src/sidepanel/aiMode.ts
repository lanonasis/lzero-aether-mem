/**
 * On-Device AI Mode — P4 Feature Flag: L0_FF_ON_DEVICE_AI
 *
 * Uses Chrome's built-in LanguageModel API for local AI inference.
 * Feature-detected at runtime; falls back to cloud AI when unavailable.
 */

export const L0_FF_ON_DEVICE_AI = 'L0_FF_ON_DEVICE_AI';

/** Check if on-device AI is available in this Chrome version. */
export function isOnDeviceAvailable(): boolean {
  // @ts-ignore - LanguageModel API is available in Chrome 118+ but @types/chrome may not have it
  return typeof (globalThis as any).chrome?.ai?.LanguageModel !== 'undefined';
}

/** Get the current feature flag state from storage. */
export async function isOnDeviceEnabled(): Promise<boolean> {
  const result = await chrome.storage.local.get(L0_FF_ON_DEVICE_AI);
  return result[L0_FF_ON_DEVICE_AI] === true;
}

interface OnDeviceMemory {
  title: string;
  content: string;
  memory_type: string;
}

/** Start an on-device chat session using Chrome's LanguageModel API.
 * Falls back to throwing if the model is unavailable.
 */
export async function startOnDeviceChat(
  query: string,
  topMemories: OnDeviceMemory[],
  signal?: AbortSignal
): Promise<string> {
  // @ts-ignore - LanguageModel API
  const session = await chrome.ai.LanguageModel.create({
    systemPrompt: buildSystemPrompt(topMemories),
  });

  const chunks: string[] = [];
  const stream = session.promptStreaming(query);

  // Collect streamed chunks into the full response
  for await (const chunk of stream) {
    chunks.push(chunk);
    if (signal?.aborted) {
      session.destroy();
      throw new DOMException('On-device AI session cancelled', 'AbortError');
    }
  }

  session.destroy();
  return chunks.join('');
}

function buildSystemPrompt(memories: OnDeviceMemory[]): string {
  if (memories.length === 0) {
    return 'You are L0 Memory AI, a developer-focused memory concierge. Answer questions about the user\'s saved memories.';
  }

  const memoryList = memories
    .slice(0, 10)
    .map((m, i) => `${i + 1}. [${m.memory_type}] ${m.title}\n${m.content.slice(0, 200)}`)
    .join('\n\n');

  return `You are L0 Memory AI, a developer-focused memory concierge. Here are the user's relevant memories:\n\n${memoryList}\n\nAnswer questions based on these memories when relevant.`;
}
