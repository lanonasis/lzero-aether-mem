/**
 * LanOnasis Version Manager
 *
 * Centralized version management for Aether Memory MaaS platform.
 * Provides semver compliance, deprecation lifecycle, and breaking change detection.
 *
 * @version 2.0.0
 * @package @lanonasis/aether-memory
 * @author LanOnasis <hello@lanonasis.com>
 * @license MIT
 */

// ============================================
// Version Constants
// ============================================

const CURRENT_VERSION = '2.0.0';
const VERSION_CODENAME = 'hackathon';
const BRAND = 'LanOnasis';
const PRODUCT = 'Aether Memory';
const SCOPE = 'Memory-as-a-Service';

// Minimum supported versions for backwards compatibility
const MIN_SUPPORTED_VERSIONS = Object.freeze({
  api: '1.0.0',
  sdk: '1.0.0',
  client: '1.0.0'
});

/**
 * VersionManager
 *
 * Centralized version management with semver compliance.
 */
const DEPRECATION_MIN_DAYS = 30;
const DEPRECATION_WARNING_DANGER_DAYS = 29;

export class VersionManager {
  #version;
  #codename;
  #brand;
  #product;
  #scope;
  #deprecations = new Map();
  #breakingChanges = [];
  #versions = new Map();
  #eventListeners = new Map();

  constructor() {
    this.#version = CURRENT_VERSION;
    this.#codename = VERSION_CODENAME;
    this.#brand = BRAND;
    this.#product = PRODUCT;
    this.#scope = SCOPE;

    this.#initializeDeprecations();
  }

  // ============================================
  // Version Information
  // ============================================

  get version() {
    return this.#version;
  }

  get codename() {
    return this.#codename;
  }

  get brand() {
    return this.#brand;
  }

  get product() {
    return this.#product;
  }

  get scope() {
    return this.#scope;
  }

  getFullVersion() {
    return `${this.#version}-${this.#codename}`;
  }

  getBrandInfo() {
    return {
      brand: this.#brand,
      product: this.#product,
      version: this.#version,
      codename: this.#codename,
      scope: this.#scope,
      fullName: `${this.#brand} ${this.#product}`,
      versionString: `v${this.#version}-${this.#codename}`
    };
  }

  // ============================================
  // Semver Parsing
  // ============================================

  parseVersion(versionString) {
    if (!versionString || typeof versionString !== 'string') {
      return null;
    }

    // Remove 'v' prefix if present
    const cleaned = versionString.replace(/^v/, '');

    // Match semver pattern: MAJOR.MINOR.PATCH[-PRERELEASE][+BUILD]
    const match = cleaned.match(/^(\d+)\.(\d+)\.(\d+)(?:-([a-zA-Z0-9.-]+))?(?:\+([a-zA-Z0-9.-]+))?$/);

    if (!match) {
      return null;
    }

    return {
      major: parseInt(match[1], 10),
      minor: parseInt(match[2], 10),
      patch: parseInt(match[3], 10),
      prerelease: match[4] || null,
      build: match[5] || null,
      raw: versionString
    };
  }

  // ============================================
  // Version Comparison
  // ============================================

  compareVersions(v1, v2) {
    const parsed1 = typeof v1 === 'string' ? this.parseVersion(v1) : v1;
    const parsed2 = typeof v2 === 'string' ? this.parseVersion(v2) : v2;

    if (!parsed1 || !parsed2) {
      throw new Error('[VersionManager] Invalid version format');
    }

    // Compare major
    if (parsed1.major !== parsed2.major) {
      return parsed1.major - parsed2.major;
    }

    // Compare minor
    if (parsed1.minor !== parsed2.minor) {
      return parsed1.minor - parsed2.minor;
    }

    // Compare patch
    if (parsed1.patch !== parsed2.patch) {
      return parsed1.patch - parsed2.patch;
    }

    // Handle prerelease comparison
    if (parsed1.prerelease && !parsed2.prerelease) return -1;
    if (!parsed1.prerelease && parsed2.prerelease) return 1;
    if (parsed1.prerelease && parsed2.prerelease) {
      return parsed1.prerelease.localeCompare(parsed2.prerelease);
    }

    return 0;
  }

  isNewerThan(v1, v2) {
    return this.compareVersions(v1, v2) > 0;
  }

  isOlderThan(v1, v2) {
    return this.compareVersions(v1, v2) < 0;
  }

  isEqual(v1, v2) {
    return this.compareVersions(v1, v2) === 0;
  }

  // ============================================
  // Compatibility Checking
  // ============================================

  isCompatible(version, component = 'api') {
    const minVersion = MIN_SUPPORTED_VERSIONS[component];

    if (!minVersion) {
      return { compatible: true, reason: 'no_minimum_defined' };
    }

    const parsed = this.parseVersion(version);
    const minParsed = this.parseVersion(minVersion);

    if (!parsed) {
      return { compatible: false, reason: 'invalid_version_format' };
    }

    const isSupported = this.compareVersions(parsed, minParsed) >= 0;

    return {
      compatible: isSupported,
      version,
      minSupported: minVersion,
      reason: isSupported ? 'version_supported' : 'version_too_old'
    };
  }

  // ============================================
  // Breaking Change Detection
  // ============================================

  detectBreakingChanges(fromVersion, toVersion) {
    const from = this.parseVersion(fromVersion);
    const to = this.parseVersion(toVersion);

    if (!from || !to) {
      throw new Error('[VersionManager] Invalid version format');
    }

    const changes = {
      hasBreakingChanges: false,
      type: 'none',
      from: fromVersion,
      to: toVersion,
      details: []
    };

    // Major version bump indicates breaking changes
    if (to.major > from.major) {
      changes.hasBreakingChanges = true;
      changes.type = 'major';
      changes.details.push({
        type: 'major_version_bump',
        message: `Major version changed from ${from.major} to ${to.major}. Breaking changes expected.`
      });
    }

    // Check registered breaking changes
    for (const change of this.#breakingChanges) {
      const changeVersion = this.parseVersion(change.introducedIn);
      if (changeVersion &&
          this.compareVersions(changeVersion, from) > 0 &&
          this.compareVersions(changeVersion, to) <= 0) {
        changes.hasBreakingChanges = true;
        changes.details.push(change);
      }
    }

    return changes;
  }

  registerBreakingChange(change) {
    this.#breakingChanges.push({
      ...change,
      registeredAt: new Date().toISOString()
    });
  }

  // ============================================
  // Deprecation Lifecycle
  // ============================================

  #initializeDeprecations() {
    // Initialize known deprecations
    this.#deprecations.set('context-intelligence-engine', {
      feature: 'context-intelligence-engine',
      deprecatedIn: '1.5.0',
      removedIn: '2.0.0',
      replacement: '@lanonasis/mem-intel-sdk',
      message: 'Migrated to published npm package for better performance'
    });
  }

  deprecate(feature, details) {
    const deprecation = {
      feature,
      deprecatedIn: this.#version,
      removedIn: details.removedIn || null,
      replacement: details.replacement || null,
      message: details.message || `${feature} is deprecated`,
      deprecated: true,
      deprecatedAt: new Date().toISOString()
    };

    this.#deprecations.set(feature, deprecation);

    return deprecation;
  }

  isDeprecated(feature) {
    const deprecation = this.#deprecations.get(feature);

    if (!deprecation) {
      return { deprecated: false };
    }

    const currentParsed = this.parseVersion(this.#version);
    const removedParsed = deprecation.removedIn ?
      this.parseVersion(deprecation.removedIn) : null;

    return {
      deprecated: true,
      ...deprecation,
      removed: removedParsed ?
        this.compareVersions(currentParsed, removedParsed) >= 0 : false
    };
  }

  getDeprecations() {
    return Array.from(this.#deprecations.values());
  }

  // ============================================
  // Event Emission (simple pub/sub)
  // ============================================

  #emit(event, data) {
    const listeners = this.#eventListeners.get(event);
    if (listeners) {
      for (const fn of listeners) {
        try { fn(data); } catch (_) { /* guard against listener errors */ }
      }
    }
  }

  on(event, fn) {
    if (!this.#eventListeners.has(event)) {
      this.#eventListeners.set(event, []);
    }
    this.#eventListeners.get(event).push(fn);
    return () => {
      const listeners = this.#eventListeners.get(event);
      const idx = listeners.indexOf(fn);
      if (idx !== -1) listeners.splice(idx, 1);
      if (listeners.length === 0) this.#eventListeners.delete(event);
    };
  }

  // ============================================
  // Version Registration & Lifecycle
  // ============================================

  /**
   * Register a service version for lifecycle management.
   * @param {string} serviceId - Service identifier
   * @param {string} version - Semver version string
   * @param {Object} [options] - Registration options
   * @param {string} [options.status='active'] - Initial status: 'active' | 'deprecated'
   * @returns {Object} The registered version entry
   */
  registerVersion(serviceId, version, options = {}) {
    const key = `${serviceId}::${version}`;

    if (this.#versions.has(key)) {
      throw new Error(`[VersionManager] Version ${version} already registered for service ${serviceId}`);
    }

    const entry = {
      serviceId,
      version,
      status: options.status || 'active',
      registeredAt: new Date().toISOString(),
      deprecatedAt: null,
      deprecationReason: null,
      removedAt: null,
    };

    this.#versions.set(key, entry);
    this.#emit('version:registered', { serviceId, version, entry });
    return { ...entry };
  }

  /**
   * Mark a registered version as deprecated.
   * Records the deprecation timestamp and reason.
   * @param {string} serviceId - Service identifier
   * @param {string} version - Semver version string
   * @param {Object} [options] - Deprecation options
   * @param {string} [options.reason] - Reason for deprecation
   * @returns {Object} The updated deprecation info
   * @throws {Error} If version not registered or already deprecated/removed
   */
  deprecateVersion(serviceId, version, options = {}) {
    const key = `${serviceId}::${version}`;
    const entry = this.#versions.get(key);

    if (!entry) {
      throw new Error(`[VersionManager] Version ${version} not found for service ${serviceId}`);
    }

    if (entry.status === 'deprecated') {
      throw new Error(`[VersionManager] Version ${version} for service ${serviceId} is already deprecated`);
    }

    if (entry.status === 'removed') {
      throw new Error(`[VersionManager] Cannot deprecate removed version ${version} for service ${serviceId}`);
    }

    entry.status = 'deprecated';
    entry.deprecatedAt = new Date().toISOString();
    entry.deprecationReason = options.reason || 'No reason provided';

    this.#emit('version:deprecated', { serviceId, version, deprecatedAt: entry.deprecatedAt });
    return {
      serviceId,
      version,
      status: entry.status,
      deprecatedAt: entry.deprecatedAt,
      reason: entry.deprecationReason
    };
  }

  /**
   * Remove a deprecated version.
   * Refuses removal if less than 30 days have passed since deprecation.
   * Never removes a version that is still active or has active usage.
   * @param {string} serviceId - Service identifier
   * @param {string} version - Semver version string
   * @param {Object} [options] - Removal options
   * @param {boolean} [options.force=false] - Skip the 30-day rule (internal use only)
   * @returns {Object} The removed version entry
   * @throws {Error} If version not found, not deprecated, or within 30-day window
   */
  removeVersion(serviceId, version, options = {}) {
    const key = `${serviceId}::${version}`;
    const entry = this.#versions.get(key);

    if (!entry) {
      throw new Error(`[VersionManager] Version ${version} not found for service ${serviceId}`);
    }

    // Never delete a version still in active use
    if (entry.status === 'active') {
      throw new Error(
        `[VersionManager] Cannot remove active version ${version} for service ${serviceId}. ` +
        'Version must be deprecated first and observe the 30-day minimum deprecation period.'
      );
    }

    // Must be deprecated to remove
    if (entry.status === 'removed') {
      throw new Error(`[VersionManager] Version ${version} for service ${serviceId} is already removed`);
    }

    if (entry.status !== 'deprecated') {
      throw new Error(
        `[VersionManager] Version ${version} for service ${serviceId} is not deprecated ` +
        `(current status: ${entry.status}). Must deprecate before removal.`
      );
    }

    // Enforce 30-day minimum deprecation period
    if (!options.force) {
      const deprecatedAt = new Date(entry.deprecatedAt);
      const now = new Date();
      const daysSinceDeprecation = (now - deprecatedAt) / (1000 * 60 * 60 * 24);

      if (daysSinceDeprecation < DEPRECATION_MIN_DAYS) {
        const remainingDays = Math.ceil(DEPRECATION_MIN_DAYS - daysSinceDeprecation);
        throw new Error(
          `[VersionManager] Cannot remove version ${version} for service ${serviceId} ` +
          `until ${DEPRECATION_MIN_DAYS} days have passed since deprecation. ` +
          `Deprecation date: ${entry.deprecatedAt}. ${remainingDays} day(s) remaining.`
        );
      }
    }

    // Record removal
    entry.status = 'removed';
    entry.removedAt = new Date().toISOString();

    this.#emit('version:removed', {
      serviceId,
      version,
      deprecatedAt: entry.deprecatedAt,
      removedAt: entry.removedAt,
    });

    return {
      serviceId,
      version,
      status: entry.status,
      deprecatedAt: entry.deprecatedAt,
      removedAt: entry.removedAt,
    };
  }

  /**
   * Check if a version is still in active use.
   * @param {string} serviceId - Service identifier
   * @param {string} version - Semver version string
   * @returns {boolean} True if version is registered and active
   */
  isInActiveUse(serviceId, version) {
    const key = `${serviceId}::${version}`;
    const entry = this.#versions.get(key);
    return entry ? entry.status === 'active' : false;
  }

  /**
   * Get the latest version for a service.
   * @param {string} serviceId - Service identifier
   * @param {Object} [options] - Query options
   * @param {boolean} [options.excludeDeprecated=false] - Exclude deprecated/removed versions
   * @returns {Object|null} The latest version entry, or null if none found
   */
  getLatestVersion(serviceId, options = {}) {
    const excludeDeprecated = options.excludeDeprecated !== undefined
      ? options.excludeDeprecated
      : false;

    const serviceVersions = [];

    for (const [key, entry] of this.#versions) {
      if (entry.serviceId !== serviceId) continue;
      if (excludeDeprecated && (entry.status === 'deprecated' || entry.status === 'removed')) continue;
      serviceVersions.push({ ...entry, key });
    }

    if (serviceVersions.length === 0) return null;

    // Sort by semver descending, then by registeredAt descending for equal versions
    serviceVersions.sort((a, b) => {
      const cmp = this.compareVersions(b.version, a.version);
      if (cmp !== 0) return cmp;
      return new Date(b.registeredAt) - new Date(a.registeredAt);
    });

    return serviceVersions[0];
  }

  /**
   * Get all registered versions for a service.
   * @param {string} serviceId - Service identifier
   * @param {Object} [options] - Filter options
   * @param {string[]} [options.statuses] - Filter by specific statuses
   * @returns {Object[]} Array of version entries
   */
  getVersions(serviceId, options = {}) {
    const results = [];

    for (const [key, entry] of this.#versions) {
      if (entry.serviceId !== serviceId) continue;
      if (options.statuses && !options.statuses.includes(entry.status)) continue;
      results.push({ ...entry, key });
    }

    return results;
  }

  /**
   * Emit deprecation warnings for versions approaching the removal deadline.
   * Warnings are emitted for versions that are:
   *   - Day 1-29 after deprecation (still within the minimum period)
   *   - Especially urgent at Day 29 (danger threshold)
   * @param {string} serviceId - Service identifier
   * @returns {Object[]} Array of warning entries
   */
  getDeprecationWarnings(serviceId) {
    const warnings = [];
    const now = new Date();

    for (const [key, entry] of this.#versions) {
      if (entry.serviceId !== serviceId) continue;
      if (entry.status !== 'deprecated') continue;
      if (!entry.deprecatedAt) continue;

      const deprecatedAt = new Date(entry.deprecatedAt);
      const daysSince = (now - deprecatedAt) / (1000 * 60 * 60 * 24);

      if (daysSince < DEPRECATION_MIN_DAYS) {
        const remainingDays = Math.ceil(DEPRECATION_MIN_DAYS - daysSince);
        const isDanger = daysSince >= DEPRECATION_WARNING_DANGER_DAYS;

        warnings.push({
          serviceId,
          version: entry.version,
          status: entry.status,
          daysSinceDeprecation: Math.floor(daysSince),
          daysUntilRemovalEligible: remainingDays,
          isDanger: isDanger,
          message: isDanger
            ? `Version ${entry.version} for service ${serviceId} is at ${Math.floor(daysSince)}/29 days — removal eligible in ${remainingDays} day(s).`
            : `Version ${entry.version} for service ${serviceId} has been deprecated for ${Math.floor(daysSince)} days — ${remainingDays} day(s) until eligible for removal.`,
        });
      }
    }

    return warnings;
  }

  // ============================================
  // Version Increment
  // ============================================

  incrementVersion(type = 'patch') {
    const parsed = this.parseVersion(this.#version);

    if (!parsed) {
      throw new Error('[VersionManager] Invalid current version');
    }

    let newVersion;

    switch (type) {
      case 'major':
        newVersion = `${parsed.major + 1}.0.0`;
        break;
      case 'minor':
        newVersion = `${parsed.major}.${parsed.minor + 1}.0`;
        break;
      case 'patch':
      default:
        newVersion = `${parsed.major}.${parsed.minor}.${parsed.patch + 1}`;
        break;
    }

    return newVersion;
  }

  // ============================================
  // User Agent & Headers
  // ============================================

  getUserAgent() {
    return `${this.#brand}-${this.#product}/${this.#version} (${this.#scope})`;
  }

  getVersionHeaders() {
    return {
      'X-LanOnasis-Version': this.#version,
      'X-LanOnasis-Product': this.#product,
      'X-LanOnasis-Brand': this.#brand
    };
  }
}

// Export singleton instance
let instance = null;

export function getVersionManager() {
  if (!instance) {
    instance = new VersionManager();
  }
  return instance;
}

export default VersionManager;
