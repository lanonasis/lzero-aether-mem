/**
 * Onasis AI Router client for the memory concierge chat box.
 *
 * Mirrors the AI-router integration already shipped in the Lan Onasis IDE
 * extensions (VSCode/Cursor/Windsurf `queryAIRouter`) and repl-cli's
 * ai-router-client.ts, so every surface talks to the router the same way:
 * lano_* keys -> X-API-Key, anything else -> Authorization: Bearer;
 * use_case: memory-analysis; 45s timeout; 429 surfaces Retry-After.
 * Any other failure throws so the caller can degrade to local memory
 * search -- the concierge must never go fully silent.
 */

import { buildAuthHeaders, inferAuthType } from './cache';

const DEFAULT_AI_ROUTER_URL = 'https://ai.vortexcore.app';
const AI_ROUTER_TIMEOUT_MS = 45_000;

export class AiRouterRateLimitError extends Error {
  constructor(public readonly retryAfterSeconds?: number) {
    super('AI router rate-limited (429)');
    this.name = 'AiRouterRateLimitError';
  }
}

async function resolveRouterConfig(): Promise<{ token: string; baseUrl: string } | null> {
  const { l0_auth_token, aiRouterUrl } = await chrome.storage.local.get(['l0_auth_token', 'aiRouterUrl']);
  if (!l0_auth_token) return null;

  const baseUrl = (aiRouterUrl || DEFAULT_AI_ROUTER_URL).trim().replace(/\/+$/, '') || DEFAULT_AI_ROUTER_URL;
  return { token: l0_auth_token, baseUrl };
}

/**
 * Ask the Onasis AI Router for a synthesized memory-concierge answer.
 * Throws on any failure (no credential, network, timeout, non-2xx, 429).
 */
export async function queryAIRouter(query: string): Promise<string> {
  const cfg = await resolveRouterConfig();
  if (!cfg) {
    throw new Error('No stored credentials for AI router');
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), AI_ROUTER_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(`${cfg.baseUrl}/api/v1/ai-chat`, {
      method: 'POST',
      credentials: 'omit',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        ...buildAuthHeaders({ token: cfg.token, authType: inferAuthType(cfg.token) }),
      },
      body: JSON.stringify({
        use_case: 'memory-analysis',
        messages: [{ role: 'user', content: query }],
      }),
      signal: controller.signal,
    });
  } catch (error) {
    throw new Error(`AI router unreachable: ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    clearTimeout(timeout);
  }

  if (response.status === 429) {
    const headerValue = response.headers.get('Retry-After');
    const seconds = headerValue ? parseInt(headerValue, 10) : undefined;
    throw new AiRouterRateLimitError(Number.isFinite(seconds) ? seconds : undefined);
  }

  if (!response.ok) {
    throw new Error(`AI router request failed: ${response.status} ${response.statusText}`);
  }

  let data: { response?: unknown };
  try {
    data = await response.json();
  } catch {
    throw new Error('AI router returned an unreadable response');
  }

  // The answer is `data.response` -- not data.message.content or any
  // OpenAI-style shape. See the router's integration guide.
  const answer = typeof data.response === 'string' ? data.response.trim() : '';
  if (!answer) {
    throw new Error('AI router returned an empty response');
  }

  return answer;
}
