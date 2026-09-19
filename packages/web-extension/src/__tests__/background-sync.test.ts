import { beforeEach, describe, expect, it, vi } from 'vitest';

import { MIN_AUTO_SYNC_GAP_MS, setupSync, syncIfDue } from '../background/sync';

type AlarmListener = (alarm: { name: string }) => Promise<void> | void;

function installChromeMock(initial: Record<string, unknown> = {}) {
  const store: Record<string, unknown> = { ...initial };
  const alarms = new Map<string, { name: string; periodInMinutes?: number }>();
  const listeners: { alarm?: AlarmListener } = {};

  const chromeMock = {
    storage: {
      local: {
        get: vi.fn(async (keys: string | string[]) => {
          const wanted = Array.isArray(keys) ? keys : [keys];
          return Object.fromEntries(wanted.filter((k) => k in store).map((k) => [k, store[k]]));
        }),
        set: vi.fn(async (items: Record<string, unknown>) => {
          Object.assign(store, items);
        }),
      },
    },
    alarms: {
      get: vi.fn(async (name: string) => alarms.get(name)),
      create: vi.fn((name: string, info: { periodInMinutes?: number }) => {
        alarms.set(name, { name, ...info });
      }),
      onAlarm: {
        addListener: (fn: AlarmListener) => {
          listeners.alarm = fn;
        },
      },
    },
  };
  (globalThis as any).chrome = chromeMock;
  return { chromeMock, store, alarms, listeners };
}

describe('background sync', () => {
  beforeEach(() => {
    vi.useRealTimers();
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('makes one /memory/list sync per alarm wake, not two', async () => {
    vi.useFakeTimers();
    const { listeners } = installChromeMock({ l0_auth_token: 'token' });
    const cache = { sync: vi.fn().mockResolvedValue(undefined) };

    // Worker wakes for the alarm: module top level runs, then the alarm event is delivered.
    setupSync(cache as any);
    await listeners.alarm!({ name: 'l0-memory-sync' });
    // The startup timer fires 5s later on the same wake.
    await vi.advanceTimersByTimeAsync(5000);

    expect(cache.sync).toHaveBeenCalledTimes(1);
  });

  it('syncs again once the minimum gap has passed', async () => {
    installChromeMock({ l0_auth_token: 'token' });
    const cache = { sync: vi.fn().mockResolvedValue(undefined) };

    expect(await syncIfDue(cache, 'alarm', 1_000_000)).toBe(true);
    expect(await syncIfDue(cache, 'startup', 1_000_000 + MIN_AUTO_SYNC_GAP_MS - 1)).toBe(false);
    expect(await syncIfDue(cache, 'alarm', 1_000_000 + MIN_AUTO_SYNC_GAP_MS)).toBe(true);
    expect(cache.sync).toHaveBeenCalledTimes(2);
  });

  it('throttles on the attempt, so a failing sync is not retried within the gap', async () => {
    const { store } = installChromeMock({ l0_auth_token: 'token' });
    const cache = { sync: vi.fn().mockRejectedValue(new Error('network')) };

    await expect(syncIfDue(cache, 'alarm', 5_000_000)).rejects.toThrow('network');
    expect(store.l0_last_sync_attempt_at).toBe(5_000_000);
    expect(await syncIfDue(cache, 'startup', 5_000_000 + 5_000)).toBe(false);
  });

  it('syncs when the stored attempt time is in the future (clock moved backwards)', async () => {
    const { store } = installChromeMock({
      l0_auth_token: 'token',
      l0_last_sync_attempt_at: 9_000_000,
    });
    const cache = { sync: vi.fn().mockResolvedValue(undefined) };

    expect(await syncIfDue(cache, 'alarm', 1_000_000)).toBe(true);
    expect(store.l0_last_sync_attempt_at).toBe(1_000_000);
  });

  it('does not sync or record an attempt when not authenticated', async () => {
    const { store } = installChromeMock();
    const cache = { sync: vi.fn() };

    expect(await syncIfDue(cache, 'startup', 42)).toBe(false);
    expect(cache.sync).not.toHaveBeenCalled();
    expect(store.l0_last_sync_attempt_at).toBeUndefined();
  });

  it('creates the alarm only when it does not already exist', async () => {
    // setupSync schedules a 5s startup timer on every call; fake timers keep both of them
    // from firing into a later test's chrome mock.
    vi.useFakeTimers();
    const { chromeMock, alarms } = installChromeMock();
    alarms.set('l0-memory-sync', { name: 'l0-memory-sync', periodInMinutes: 5 });
    setupSync({ sync: vi.fn() } as any);
    await Promise.resolve();
    expect(chromeMock.alarms.create).not.toHaveBeenCalled();

    const fresh = installChromeMock();
    setupSync({ sync: vi.fn() } as any);
    await vi.advanceTimersByTimeAsync(0);
    expect(fresh.chromeMock.alarms.create).toHaveBeenCalledWith('l0-memory-sync', { periodInMinutes: 5 });
  });
});
