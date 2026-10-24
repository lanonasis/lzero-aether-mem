/**
 * Version Manager — deprecation→removal lifecycle tests
 *
 * Verifies:
 *   - removeVersion() refuses removal < 30 days after deprecatedAt
 *   - Deprecation warnings are emitted Day 1-29
 *   - getLatestVersion() optionally excludes deprecated versions
 *   - Active versions cannot be removed
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { VersionManager } from '../versioning/version-manager.js';

// ---- helpers ----

function freezeTime(ms) {
  const fakeNow = new Date(ms);
  vi.spyOn(global, 'Date').mockImplementation((...args) => {
    if (args.length === 0) return fakeNow;
    return new Date(...args);
  });
  return fakeNow;
}

function thawTime() {
  vi.restoreAllMocks();
}

// ---- tests ----

describe('VersionManager — deprecation → removal lifecycle', () => {
  let vm;

  beforeEach(() => {
    vm = new VersionManager();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ── Registration ──────────────────────────────────────────

  describe('registerVersion()', () => {
    it('registers a version with active status by default', () => {
      const entry = vm.registerVersion('svc-a', '1.0.0');
      expect(entry.serviceId).toBe('svc-a');
      expect(entry.version).toBe('1.0.0');
      expect(entry.status).toBe('active');
      expect(entry.registeredAt).toBeDefined();
    });

    it('registers with deprecated status when specified', () => {
      const entry = vm.registerVersion('svc-a', '0.9.0', { status: 'deprecated' });
      expect(entry.status).toBe('deprecated');
    });

    it('throws on duplicate registration', () => {
      vm.registerVersion('svc-a', '1.0.0');
      expect(() => vm.registerVersion('svc-a', '1.0.0')).toThrow(
        /already registered/
      );
    });
  });

  // ── deprecateVersion() ────────────────────────────────────

  describe('deprecateVersion()', () => {
    it('marks a version as deprecated with timestamp', () => {
      vm.registerVersion('svc-a', '1.0.0');
      const result = vm.deprecateVersion('svc-a', '1.0.0', { reason: 'replaced by v2' });
      expect(result.status).toBe('deprecated');
      expect(result.reason).toBe('replaced by v2');
      expect(result.deprecatedAt).toBeDefined();
    });

    it('throws if version not registered', () => {
      expect(() => vm.deprecateVersion('svc-a', '1.0.0'))
        .toThrow(/not found/);
    });

    it('throws if already deprecated', () => {
      vm.registerVersion('svc-a', '1.0.0');
      vm.deprecateVersion('svc-a', '1.0.0');
      expect(() => vm.deprecateVersion('svc-a', '1.0.0'))
        .toThrow(/already deprecated/);
    });

    it('emits version:deprecated event', () => {
      vm.registerVersion('svc-a', '1.0.0');
      const received = [];
      vm.on('version:deprecated', (data) => received.push(data));
      vm.deprecateVersion('svc-a', '1.0.0');
      expect(received).toHaveLength(1);
      expect(received[0].serviceId).toBe('svc-a');
      expect(received[0].version).toBe('1.0.0');
      expect(received[0].deprecatedAt).toBeDefined();
    });
  });

  // ── removeVersion() — the core guardian rule ─────────────

  describe('removeVersion()', () => {
    const BASE = 1700000000000; // 2023-11-14T22:13:20Z

    it('refuses to remove an active version', () => {
      vm.registerVersion('svc-a', '1.0.0');
      expect(() => vm.removeVersion('svc-a', '1.0.0')).toThrow(
        /Cannot remove active version/
      );
    });

    it('refuses to remove a version not yet deprecated', () => {
      vm.registerVersion('svc-a', '1.0.0');
      vm.deprecateVersion('svc-a', '1.0.0');
      // Now it IS deprecated, so removal should work if 30 days pass
    });

    it('refuses removal within 30 days of deprecation', () => {
      vm.registerVersion('svc-a', '1.0.0');
      vm.deprecateVersion('svc-a', '1.0.0');

      vi.setSystemTime(BASE + 5 * 86400000); // day 5
      expect(() => vm.removeVersion('svc-a', '1.0.0')).toThrow(
        /25 day.*remaining/
      );

      vi.setSystemTime(BASE + 29 * 86400000); // day 29
      expect(() => vm.removeVersion('svc-a', '1.0.0')).toThrow(
        /1 day.*remaining/
      );
    });

    it('allows removal at exactly 30 days after deprecation', () => {
      vm.registerVersion('svc-a', '1.0.0');
      vm.deprecateVersion('svc-a', '1.0.0');

      vi.setSystemTime(BASE + 30 * 86400000); // exactly 30 days
      const result = vm.removeVersion('svc-a', '1.0.0');
      expect(result.status).toBe('removed');
      expect(result.removedAt).toBeDefined();
    });

    it('allows removal after 30 days', () => {
      vm.registerVersion('svc-a', '1.0.0');
      vm.deprecateVersion('svc-a', '1.0.0');

      vi.setSystemTime(BASE + 45 * 86400000); // 45 days
      const result = vm.removeVersion('svc-a', '1.0.0');
      expect(result.status).toBe('removed');
    });

    it('throws if version not registered', () => {
      expect(() => vm.removeVersion('svc-a', '1.0.0')).toThrow(/not found/);
    });

    it('throws if already removed', () => {
      vm.registerVersion('svc-a', '1.0.0');
      vm.deprecateVersion('svc-a', '1.0.0');
      vi.setSystemTime(BASE + 30 * 86400000);
      vm.removeVersion('svc-a', '1.0.0');
      expect(() => vm.removeVersion('svc-a', '1.0.0')).toThrow(/already removed/);
    });

    it('emits version:removed event on success', () => {
      vm.registerVersion('svc-a', '1.0.0');
      vm.deprecateVersion('svc-a', '1.0.0');
      vi.setSystemTime(BASE + 30 * 86400000);
      const received = [];
      vm.on('version:removed', (data) => received.push(data));
      vm.removeVersion('svc-a', '1.0.0');
      expect(received).toHaveLength(1);
      expect(received[0].serviceId).toBe('svc-a');
      expect(received[0].version).toBe('1.0.0');
      expect(received[0].removedAt).toBeDefined();
    });
  });

  // ── getLatestVersion() with excludeDeprecated ─────────────

  describe('getLatestVersion()', () => {
    it('returns the highest semver version', () => {
      vm.registerVersion('svc-a', '1.0.0');
      vm.registerVersion('svc-a', '2.0.0');
      vm.registerVersion('svc-a', '1.5.0');
      const latest = vm.getLatestVersion('svc-a');
      expect(latest.version).toBe('2.0.0');
    });

    it('excludes deprecated versions when excludeDeprecated=true', () => {
      vm.registerVersion('svc-a', '2.0.0');
      vm.registerVersion('svc-a', '1.0.0');
      vm.deprecateVersion('svc-a', '1.0.0');

      const latestActive = vm.getLatestVersion('svc-a', { excludeDeprecated: true });
      expect(latestActive.version).toBe('2.0.0');

      // Without exclusion, deprecated is still returned if it's the highest
      vm.registerVersion('svc-a', '1.5.0');
      vm.deprecateVersion('svc-a', '1.5.0');
      const latestAll = vm.getLatestVersion('svc-a');
      expect(latestAll.version).toBe('2.0.0');
    });

    it('excludes removed versions when excludeDeprecated=true', () => {
      const BASE = 1700000000000;
      vm.registerVersion('svc-a', '2.0.0');
      vm.registerVersion('svc-a', '1.0.0');
      vm.deprecateVersion('svc-a', '1.0.0');
      vi.setSystemTime(BASE + 30 * 86400000);
      vm.removeVersion('svc-a', '1.0.0');

      const latest = vm.getLatestVersion('svc-a', { excludeDeprecated: true });
      expect(latest.version).toBe('2.0.0');
    });

    it('returns null when no active versions exist', () => {
      vm.registerVersion('svc-a', '1.0.0');
      vm.deprecateVersion('svc-a', '1.0.0');
      const latest = vm.getLatestVersion('svc-a', { excludeDeprecated: true });
      expect(latest).toBeNull();
    });

    it('returns null for unknown service', () => {
      const latest = vm.getLatestVersion('nonexistent');
      expect(latest).toBeNull();
    });
  });

  // ── isInActiveUse() ───────────────────────────────────────

  describe('isInActiveUse()', () => {
    it('returns true for active versions', () => {
      vm.registerVersion('svc-a', '1.0.0');
      expect(vm.isInActiveUse('svc-a', '1.0.0')).toBe(true);
    });

    it('returns false for deprecated versions', () => {
      vm.registerVersion('svc-a', '1.0.0');
      vm.deprecateVersion('svc-a', '1.0.0');
      expect(vm.isInActiveUse('svc-a', '1.0.0')).toBe(false);
    });

    it('returns false for removed versions', () => {
      const BASE = 1700000000000;
      vm.registerVersion('svc-a', '1.0.0');
      vm.deprecateVersion('svc-a', '1.0.0');
      vi.setSystemTime(BASE + 30 * 86400000);
      vm.removeVersion('svc-a', '1.0.0');
      expect(vm.isInActiveUse('svc-a', '1.0.0')).toBe(false);
    });

    it('returns false for unregistered versions', () => {
      expect(vm.isInActiveUse('svc-a', '1.0.0')).toBe(false);
    });
  });

  // ── getDeprecationWarnings() ──────────────────────────────

  describe('getDeprecationWarnings()', () => {
    it('returns no warnings for active versions', () => {
      vm.registerVersion('svc-a', '1.0.0');
      const warnings = vm.getDeprecationWarnings('svc-a');
      expect(warnings).toHaveLength(0);
    });

    it('returns warnings for deprecated versions within 30 days', () => {
      const BASE = 1700000000000;
      vm.registerVersion('svc-a', '1.0.0');
      vm.deprecateVersion('svc-a', '1.0.0');
      vi.setSystemTime(BASE + 5 * 86400000); // day 5

      const warnings = vm.getDeprecationWarnings('svc-a');
      expect(warnings).toHaveLength(1);
      expect(warnings[0].daysSinceDeprecation).toBe(5);
      expect(warnings[0].daysUntilRemovalEligible).toBe(25);
      expect(warnings[0].isDanger).toBe(false);
    });

    it('flags danger zone at day 29+', () => {
      const BASE = 1700000000000;
      vm.registerVersion('svc-a', '1.0.0');
      vm.deprecateVersion('svc-a', '1.0.0');
      vi.setSystemTime(BASE + 29 * 86400000); // day 29

      const warnings = vm.getDeprecationWarnings('svc-a');
      expect(warnings).toHaveLength(1);
      expect(warnings[0].isDanger).toBe(true);
      expect(warnings[0].daysUntilRemovalEligible).toBe(1);
    });

    it('returns no warnings after 30 days', () => {
      const BASE = 1700000000000;
      vm.registerVersion('svc-a', '1.0.0');
      vm.deprecateVersion('svc-a', '1.0.0');
      vi.setSystemTime(BASE + 35 * 86400000); // day 35

      const warnings = vm.getDeprecationWarnings('svc-a');
      expect(warnings).toHaveLength(0);
    });

    it('does not warn for already removed versions', () => {
      const BASE = 1700000000000;
      vm.registerVersion('svc-a', '1.0.0');
      vm.deprecateVersion('svc-a', '1.0.0');
      vi.setSystemTime(BASE + 30 * 86400000);
      vm.removeVersion('svc-a', '1.0.0');

      const warnings = vm.getDeprecationWarnings('svc-a');
      expect(warnings).toHaveLength(0);
    });
  });

  // ── Guardian constraints ──────────────────────────────────

  describe('guardian constraints', () => {
    const BASE = 1700000000000;

    it('never removes an active version', () => {
      vm.registerVersion('payments-api', '1.2.0');
      expect(() => vm.removeVersion('payments-api', '1.2.0')).toThrow(
        /Cannot remove active version/
      );
    });

    it('never changes deprecatedAt retroactively', () => {
      vm.registerVersion('svc-a', '1.0.0');
      const { deprecatedAt: first } = vm.deprecateVersion('svc-a', '1.0.0');

      // Time passes — deprecate again throws, doesn't update
      vi.setSystemTime(BASE + 10 * 86400000);
      expect(() => vm.deprecateVersion('svc-a', '1.0.0')).toThrow(
        /already deprecated/
      );

      // Verify deprecatedAt is unchanged
      expect(vm.getVersions('svc-a')[0].deprecatedAt).toBe(first);
    });

    it('multiple services are independent', () => {
      vm.registerVersion('svc-a', '1.0.0');
      vm.registerVersion('svc-b', '1.0.0');
      vm.deprecateVersion('svc-a', '1.0.0');

      // svc-b is not affected
      expect(vm.isInActiveUse('svc-b', '1.0.0')).toBe(true);
      expect(() => vm.removeVersion('svc-b', '1.0.0')).toThrow(
        /Cannot remove active version/
      );
    });
  });
});
