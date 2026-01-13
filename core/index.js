/**
 * LanOnasis Aether Memory - Core Module
 *
 * Centralized exports for compliance, versioning, and brand alignment.
 *
 * @version 2.0.0
 * @package @lanonasis/aether-memory
 * @author LanOnasis <hello@lanonasis.com>
 * @license MIT
 */

// Security & Compliance
export {
  ComplianceManager,
  getComplianceManager
} from './security/compliance-manager.js';

// Versioning
export {
  VersionManager,
  getVersionManager
} from './versioning/version-manager.js';

// Brand Constants
export const BRAND = {
  name: 'LanOnasis',
  product: 'Aether Memory',
  scope: 'Memory-as-a-Service',
  version: '2.0.0',
  codename: 'hackathon',
  tagline: 'Change the world one simple solution at a time',
  contact: 'hello@lanonasis.com',
  repository: 'https://github.com/lanonasis/aether-memory'
};

// Compliance Regulations Supported
export const COMPLIANCE_REGULATIONS = Object.freeze([
  'PCI-DSS',
  'GDPR',
  'PSD2',
  'SOX',
  'HIPAA'
]);

/**
 * Initialize core services
 */
export function initializeCore(config = {}) {
  const compliance = getComplianceManager(config.compliance || {});
  const versioning = getVersionManager();

  // Register default Memory service with GDPR compliance
  compliance.registerService('memory-service', {
    gdpr: true,
    pci: false,
    hipaa: false
  });

  return {
    compliance,
    versioning,
    brand: BRAND
  };
}

export default {
  BRAND,
  COMPLIANCE_REGULATIONS,
  initializeCore
};
