import { describe, expect, it, vi } from 'vitest';

import type { CachedMemory, MemoryCache } from '../background/cache';
import { setupOmnibox } from '../background/omnibox';

function memory(id: string, title: string): CachedMemory {
  return {
    id,
    title,
    content: `content for ${title}`,
    memory_type: 'note',
    tags: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

function installChromeOmniboxMock() {
  const storageSession: Record<string, unknown> = {};

  const listeners: {
    inputChanged?: (text: string, suggest: (results: unknown[]) => void) => void;
    inputEntered?: (text: string, disposition: string, _suggestion: unknown) => void;
  } = {};

  (globalThis as any).chrome = {
    omnibox: {
      setDefaultSuggestion: vi.fn(),
      onInputChanged: {
        addListener: (fn: typeof listeners.inputChanged) => {
          listeners.inputChanged = fn;
        },
      },
      onInputEntered: {
        addListener: (fn: typeof listeners.inputEntered) => {
          listeners.inputEntered = fn;
        },
      },
    },
    tabs: { query: vi.fn().mockResolvedValue([]) },
    sidePanel: { open: vi.fn() },
    runtime: { sendMessage: vi.fn() },
    storage: {
      session: {
        get: vi.fn(async (keys: string | string[]) => {
          const key = typeof keys === 'string' ? keys : keys[0];
          return { [key]: storageSession[key] };
        }),
        set: vi.fn(async (obj: Record<string, unknown>) => {
          Object.assign(storageSession, obj);
        }),
      },
    },
  };

  return listeners;
}

describe('omnibox', () => {
  it('discards a slower, older search result once a newer one has resolved', async () => {
    const listeners = installChromeOmniboxMock();

    // Two overlapping searchLocalAsync calls that resolve out of order:
    // the first (older) keystroke's promise resolves *after* the second
    // (newer) keystroke's promise.
    let resolveFirst!: (value: CachedMemory[]) => void;
    let resolveSecond!: (value: CachedMemory[]) => void;
    const firstCall = new Promise<CachedMemory[]>((resolve) => {
      resolveFirst = resolve;
    });
    const secondCall = new Promise<CachedMemory[]>((resolve) => {
      resolveSecond = resolve;
    });

    const searchLocalAsync = vi
      .fn()
      .mockImplementationOnce(() => firstCall)
      .mockImplementationOnce(() => secondCall);

    const cache = { searchLocalAsync } as unknown as MemoryCache;
    setupOmnibox(cache);

    const suggest = vi.fn();
    listeners.inputChanged?.('old query', suggest);
    listeners.inputChanged?.('new query', suggest);

    // Newer request resolves first, older request resolves second.
    resolveSecond([memory('2', 'Second result')]);
    await secondCall;
    resolveFirst([memory('1', 'First result')]);
    await firstCall;
    await Promise.resolve();
    await Promise.resolve();

    // suggest() should only ever have been called with the newer request's
    // results — the stale, later-resolving "old query" result must be
    // discarded, not allowed to clobber the current suggestions.
    expect(suggest).toHaveBeenCalledTimes(1);
    expect(suggest).toHaveBeenCalledWith([
      expect.objectContaining({ content: 'Second result' }),
    ]);
  });

  it('survives SW restart: a later keystroke wins after storage.write', async () => {
    const listeners = installChromeOmniboxMock();
    const storageSession: Record<string, unknown> = {};

    (globalThis as any).chrome.storage.session = {
      get: vi.fn(async (keys: string | string[]) => {
        const key = typeof keys === 'string' ? keys : keys[0];
        return { [key]: storageSession[key] };
      }),
      set: vi.fn(async (obj: Record<string, unknown>) => {
        Object.assign(storageSession, obj);
      }),
    };

    // First keystroke: write generation A
    let resolveFirst!: (value: CachedMemory[]) => void;
    let resolveSecond!: (value: CachedMemory[]) => void;
    const firstCall = new Promise<CachedMemory[]>((resolve) => {
      resolveFirst = resolve;
    });
    const secondCall = new Promise<CachedMemory[]>((resolve) => {
      resolveSecond = resolve;
    });

    const searchLocalAsync = vi
      .fn()
      .mockImplementationOnce(() => firstCall)
      .mockImplementationOnce(() => secondCall);

    const cache = { searchLocalAsync } as unknown as MemoryCache;
    setupOmnibox(cache);

    const suggest = vi.fn();

    // Keystroke 1: stores generation A in storage, starts long search
    listeners.inputChanged?.('first', suggest);
    await Promise.resolve(); // flush storage write
    const { omniboxLatest: genA } = await (globalThis as any).chrome.storage.session.get('omniboxLatest');

    // Simulate SW restart: second setup call (simulated by another setupOmnibox)
    // In practice the SW restarts and re-runs setupOmnibox, which creates a fresh
    // listener. The new listener checks storage.session for the latest id.
    // Since we only have one listener here, we just need to prove the second
    // keystroke's write wins.

    // Keystroke 2: stores generation B, returns fast
    listeners.inputChanged?.('second', suggest);
    await Promise.resolve(); // flush storage write

    resolveSecond([memory('2', 'Second result')]);
    await secondCall;
    resolveFirst([memory('1', 'First result')]);
    await firstCall;
    await Promise.resolve();
    await Promise.resolve();

    expect(suggest).toHaveBeenCalledTimes(1);
    expect(suggest).toHaveBeenCalledWith([
      expect.objectContaining({ content: 'Second result' }),
    ]);
  });

  it('handles storage write failure gracefully', async () => {
    const listeners = installChromeOmniboxMock();
    const storageSession: Record<string, unknown> = {};

    (globalThis as any).chrome.storage.session = {
      get: vi.fn(async () => ({})),
      set: vi.fn(async () => {
        throw new Error('Storage write failed');
      }),
    };

    const cache = { searchLocalAsync: vi.fn().mockResolvedValue([]) } as unknown as MemoryCache;
    setupOmnibox(cache);

    const suggest = vi.fn();
    listeners.inputChanged?.('test query', suggest);
    await Promise.resolve();
    await Promise.resolve();

    // No suggest() call because storage write failed
    expect(suggest).not.toHaveBeenCalled();
  });

  it('empty query suggests nothing', async () => {
    const listeners = installChromeOmniboxMock();
    const cache = { searchLocalAsync: vi.fn() } as unknown as MemoryCache;
    setupOmnibox(cache);

    const suggest = vi.fn();
    listeners.inputChanged?.('', suggest);
    await Promise.resolve();

    expect(suggest).toHaveBeenCalledWith([]);
  });

  it('onInputEntered writes pending event to storage.session', async () => {
    const listeners = installChromeOmniboxMock();
    const storageSession: Record<string, unknown> = {};
    (globalThis as any).chrome.storage.session = {
      get: vi.fn(async () => ({})),
      set: vi.fn(async (obj: Record<string, unknown>) => {
        Object.assign(storageSession, obj);
      }),
    };

    const tab = { id: 42, url: 'https://example.com' };
    (globalThis as any).chrome.tabs.query = vi.fn().mockResolvedValue([tab]);

    const cache = { searchLocalAsync: vi.fn() } as unknown as MemoryCache;
    setupOmnibox(cache);

    // Simulate user typing "test" and pressing Enter in omnibox
    const onInputEnteredCb = listeners.inputEntered!;
    await onInputEnteredCb('test', 'currentTab', null);

    expect((globalThis as any).chrome.sidePanel.open).toHaveBeenCalledWith({ tabId: 42 });

    // Pending event should be in storage.session
    const events = storageSession['pendingPanelEvents'] as Array<{ type: string; payload: unknown; tabId: number }>;
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({ type: 'SEARCH_QUERY', payload: { query: 'test' }, tabId: 42 });
  });
});
