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
  const listeners: {
    inputChanged?: (text: string, suggest: (results: unknown[]) => void) => void;
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
        addListener: vi.fn(),
      },
    },
    tabs: { query: vi.fn().mockResolvedValue([]) },
    sidePanel: { open: vi.fn() },
    runtime: { sendMessage: vi.fn() },
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
});
