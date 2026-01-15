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
export class VersionManager {
  #version;
  #codename;
  #brand;
  #product;
  #scope;
  #deprecations = new Map();
  #breakingChanges = [];

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
