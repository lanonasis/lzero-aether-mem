import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// MemoryCache's constructor installs `self` (service-worker) online/offline
// listeners; polyfill a no-op `self` for the Node test environment (same
// polyfill background-cache-mutations.test.ts uses, needed here because
// aiRouter.ts imports helpers from ./cache).
if (typeof (globalThis as any).self === 'undefined') {
  (globalThis as any).self = { addEventListener: () => {}, removeEventListener: () => {} };
}

import { AiRouterRateLimitError, queryAIRouter } from '../background/aiRouter';

function installChromeStorageMock(values: Record<string, unknown>) {
  (globalThis as any).chrome = {
    storage: {
      local: {
        get: async (_keys: string[]) => values,
      },
    },
  };
}

describe('queryAIRouter', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    (globalThis as any).fetch = fetchMock;
    fetchMock.mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('throws without prompting when no credential is stored', async () => {
    installChromeStorageMock({});
    await expect(queryAIRouter('what did I decide about billing?')).rejects.toThrow(
      'No stored credentials'
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('sends an API key as X-API-Key with use_case: memory-analysis', async () => {
    installChromeStorageMock({ l0_auth_token: 'lano_test_123' });
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      headers: { get: () => null },
      json: async () => ({ response: 'you decided to migrate in Q2' }),
    });

    const answer = await queryAIRouter('what did I decide about billing?');

    expect(answer).toBe('you decided to migrate in Q2');
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://ai.vortexcore.app/api/v1/ai-chat');
    expect(init.headers['X-API-Key']).toBe('lano_test_123');
    expect(init.headers['Authorization']).toBeUndefined();
    expect(JSON.parse(init.body)).toEqual({
      use_case: 'memory-analysis',
      messages: [{ role: 'user', content: 'what did I decide about billing?' }],
    });
  });

  it('sends a JWT credential as Authorization: Bearer', async () => {
    const jwt = 'eyJhbGciOiAiSFMyNTYifQ.eyJzdWIiOiAiMTIzIiwgImV4cCI6IDk5OTk5OTk5OTl9.signature123';
    installChromeStorageMock({ l0_auth_token: jwt });
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      headers: { get: () => null },
      json: async () => ({ response: 'ok' }),
    });

    await queryAIRouter('hi');

    const [, init] = fetchMock.mock.calls[0];
    expect(init.headers['Authorization']).toBe(`Bearer ${jwt}`);
    expect(init.headers['X-API-Key']).toBeUndefined();
  });

  it('reads data.response and ignores any data.message.content shape', async () => {
    installChromeStorageMock({ l0_auth_token: 'lano_x' });
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      headers: { get: () => null },
      json: async () => ({
        response: 'the real answer',
        message: { content: 'a hallucinated shape' },
      }),
    });

    await expect(queryAIRouter('q')).resolves.toBe('the real answer');
  });

  it('throws AiRouterRateLimitError with Retry-After on 429', async () => {
    installChromeStorageMock({ l0_auth_token: 'lano_x' });
    fetchMock.mockResolvedValue({
      ok: false,
      status: 429,
      headers: { get: (name: string) => (name === 'Retry-After' ? '30' : null) },
      json: async () => ({}),
    });

    const err = await queryAIRouter('q').catch((e) => e);
    expect(err).toBeInstanceOf(AiRouterRateLimitError);
    expect((err as AiRouterRateLimitError).retryAfterSeconds).toBe(30);
  });

  it('respects a custom aiRouterUrl from storage', async () => {
    installChromeStorageMock({ l0_auth_token: 'lano_x', aiRouterUrl: 'https://custom.router.test/' });
    fetchMock.mockResolvedValue({
      ok: true,
      status: 200,
      headers: { get: () => null },
      json: async () => ({ response: 'ok' }),
    });

    await queryAIRouter('q');

    const [url] = fetchMock.mock.calls[0];
    expect(url).toBe('https://custom.router.test/api/v1/ai-chat');
  });
});
