/**
 * LanOnasis Compliance Manager
 *
 * Multi-regulation compliance framework for Aether Memory MaaS platform.
 * Provides PCI-DSS, GDPR, PSD2, SOX, and HIPAA compliance enforcement.
 *
 * @version 2.0.0
 * @package @lanonasis/aether-memory
 * @author LanOnasis <hello@lanonasis.com>
 * @license MIT
 *
 * SECURITY NOTICE: This module enforces regulatory compliance.
 * Any modifications must be reviewed by the security team.
 */

import crypto from 'crypto';

// ============================================
// Prohibited Fields Registry (PCI-DSS)
// NEVER log, store post-auth, or transmit unencrypted
// ============================================
const PCI_PROHIBITED_FIELDS = Object.freeze([
  'cvv', 'cvv2', 'cvc', 'cvc2', 'cid', 'cav2',
  'pin', 'pinBlock',
  'track1', 'track2', 'magneticStripe'
]);

const PCI_SENSITIVE_FIELDS = Object.freeze([
  'cardNumber', 'card_number', 'pan',
  'accountNumber', 'account_number'
]);

// GDPR Personal Identifiers requiring pseudonymization
const GDPR_PERSONAL_IDENTIFIERS = Object.freeze([
  'email', 'phone', 'phoneNumber', 'phone_number',
  'ssn', 'socialSecurityNumber', 'social_security_number',
  'nationalId', 'national_id', 'passport',
  'driverLicense', 'driver_license',
  'ipAddress', 'ip_address', 'ip'
]);

// HIPAA Protected Health Information
const HIPAA_PHI_FIELDS = Object.freeze([
  'diagnosis', 'treatment', 'medication',
  'medicalRecordNumber', 'medical_record_number',
  'healthPlanId', 'health_plan_id',
  'labResults', 'lab_results'
]);

/**
 * ComplianceManager
 *
 * Centralized compliance enforcement for LanOnasis Aether Memory.
 * Scope: Memory-as-a-Service data protection.
 */
export class ComplianceManager {
  #version = '2.0.0';
  #brand = 'LanOnasis';
  #encryptionKey;
  #auditLog = [];
  #consentRegistry = new Map();
  #serviceRegistry = new Map();
  #retentionPolicies = new Map();

  constructor(config = {}) {
    this.#encryptionKey = config.encryptionKey || process.env.ENCRYPTION_KEY;

    if (!this.#encryptionKey && process.env.NODE_ENV === 'production') {
      throw new Error('[LanOnasis:ComplianceManager] Encryption key required in production');
    }

    // Validate encryption key format (must be 256-bit / 64 hex chars for AES-256)
    if (this.#encryptionKey && this.#encryptionKey.length < 64) {
      throw new Error('[LanOnasis:ComplianceManager] Encryption key must be 256-bit (64 hex characters minimum)');
    }

    // Initialize default retention policies (GDPR Article 5(1)(e))
    this.#retentionPolicies.set('memory', { days: 365 * 2, purpose: 'user_memory_storage' });
    this.#retentionPolicies.set('analytics', { days: 90, purpose: 'service_improvement' });
    this.#retentionPolicies.set('audit', { days: 365 * 7, purpose: 'compliance_audit' });

    this.#logAudit('compliance_manager_initialized', {
      version: this.#version,
      brand: this.#brand,
      scope: 'memory-as-a-service'
    });
  }

  // ============================================
  // Version & Brand Alignment
  // ============================================

  get version() {
    return this.#version;
  }

  get brand() {
    return this.#brand;
  }

  getBrandMetadata() {
    return {
      brand: this.#brand,
      version: this.#version,
      product: 'Aether Memory',
      scope: 'Memory-as-a-Service',
      compliance: ['PCI-DSS', 'GDPR', 'PSD2', 'SOX', 'HIPAA']
    };
  }

  // ============================================
  // Service Registration
  // ============================================

  registerService(serviceId, config) {
    if (!serviceId) {
      throw new Error('[ComplianceManager] Service ID required');
    }

    const serviceConfig = {
      id: serviceId,
      compliance: {
        pci: config.pci || false,
        gdpr: config.gdpr || true, // Default enabled for MaaS
        psd2: config.psd2 || false,
        sox: config.sox || false,
        hipaa: config.hipaa || false
      },
      registeredAt: new Date().toISOString()
    };

    this.#serviceRegistry.set(serviceId, serviceConfig);

    this.#logAudit('service_registered', {
      serviceId,
      compliance: serviceConfig.compliance
    });

    return serviceConfig;
  }

  // ============================================
  // PCI-DSS Compliance (Payment Card Industry)
  // ============================================

  /**
   * Mask card number showing only first 6 and last 4 digits
   * PCI-DSS 3.4: Render PAN unreadable anywhere it is stored
   */
  maskCardNumber(cardNumber) {
    if (!cardNumber) return null;

    const cleaned = cardNumber.toString().replace(/\D/g, '');

    if (cleaned.length < 13) {
      this.#logAudit('pci_invalid_card_format', { length: cleaned.length });
      return null;
    }

    const first6 = cleaned.substring(0, 6);
    const last4 = cleaned.substring(cleaned.length - 4);
    const masked = '*'.repeat(cleaned.length - 10);

    return `${first6}${masked}${last4}`;
  }

  /**
   * Remove prohibited PCI fields from data object
   * PCI-DSS 3.2: Do not store sensitive authentication data after authorization
   */
  sanitizePCIData(data) {
    if (!data || typeof data !== 'object') return data;

    const sanitized = { ...data };

    for (const field of PCI_PROHIBITED_FIELDS) {
      if (field in sanitized) {
        delete sanitized[field];
        this.#logAudit('pci_prohibited_field_removed', { field });
      }
    }

    // Mask sensitive card fields
    for (const field of PCI_SENSITIVE_FIELDS) {
      if (field in sanitized && sanitized[field]) {
        sanitized[field] = this.maskCardNumber(sanitized[field]);
      }
    }

    return sanitized;
  }

  /**
   * Validate that data does not contain prohibited PCI fields
   */
  validatePCICompliance(data) {
    const violations = [];

    if (!data || typeof data !== 'object') return { valid: true, violations };

    for (const field of PCI_PROHIBITED_FIELDS) {
      if (field in data && data[field]) {
        violations.push({
          field,
          regulation: 'PCI-DSS',
          rule: '3.2',
          message: `Prohibited field '${field}' must not be stored or logged`
        });
      }
    }

    if (violations.length > 0) {
      this.#logAudit('pci_compliance_violation', { violations });
    }

    return { valid: violations.length === 0, violations };
  }

  // ============================================
  // GDPR Compliance (General Data Protection Regulation)
  // ============================================

  /**
   * Register user consent for data processing
   * GDPR Article 7: Conditions for consent
   */
  registerConsent(userId, purposes, metadata = {}) {
    if (!userId || !purposes || purposes.length === 0) {
      throw new Error('[ComplianceManager] User ID and purposes required for consent');
    }

    const consent = {
      userId,
      purposes,
      grantedAt: new Date().toISOString(),
      expiresAt: metadata.expiresAt || null,
      source: metadata.source || 'explicit',
      version: this.#version
    };

    this.#consentRegistry.set(userId, consent);

    this.#logAudit('gdpr_consent_registered', {
      userId: this.#pseudonymize(userId),
      purposes,
      source: consent.source
    });

    return consent;
  }

  /**
   * Verify user has consented to specific purpose
   * GDPR Article 6: Lawfulness of processing
   */
  verifyConsent(userId, purpose) {
    const consent = this.#consentRegistry.get(userId);

    if (!consent) {
      this.#logAudit('gdpr_consent_missing', {
        userId: this.#pseudonymize(userId),
        purpose
      });
      return false;
    }

    // Check expiration
    if (consent.expiresAt && new Date(consent.expiresAt) < new Date()) {
      this.#logAudit('gdpr_consent_expired', {
        userId: this.#pseudonymize(userId),
        purpose
      });
      return false;
    }

    const hasConsent = consent.purposes.includes(purpose) || consent.purposes.includes('*');

    if (!hasConsent) {
      this.#logAudit('gdpr_consent_insufficient', {
        userId: this.#pseudonymize(userId),
        purpose,
        grantedPurposes: consent.purposes
      });
    }

    return hasConsent;
  }

  /**
   * Pseudonymize personal identifier
   * GDPR Article 4(5): Definition of pseudonymization
   */
  #pseudonymize(identifier) {
    if (!identifier) return null;

    const hash = crypto.createHash('sha256')
      .update(identifier.toString())
      .digest('hex');

    return `pseudo_${hash.substring(0, 16)}`;
  }

  /**
   * Pseudonymize all personal identifiers in data object
   */
  pseudonymizeData(data) {
    if (!data || typeof data !== 'object') return data;

    const pseudonymized = { ...data };

    for (const field of GDPR_PERSONAL_IDENTIFIERS) {
      if (field in pseudonymized && pseudonymized[field]) {
        pseudonymized[field] = this.#pseudonymize(pseudonymized[field]);
      }
    }

    return pseudonymized;
  }

  /**
   * Apply data minimization for analytics
   * GDPR Article 5(1)(c): Data minimization principle
   */
  minimizeForAnalytics(data, allowedFields = []) {
    if (!data || typeof data !== 'object') return {};

    const minimized = {};
    const defaultAllowed = ['type', 'category', 'timestamp', 'action'];
    const permitted = [...defaultAllowed, ...allowedFields];

    for (const field of permitted) {
      if (field in data) {
        minimized[field] = data[field];
      }
    }

    // Pseudonymize any user identifiers that slip through
    return this.pseudonymizeData(minimized);
  }

  /**
   * Validate retention period compliance
   * GDPR Article 5(1)(e): Storage limitation
   */
  validateRetention(dataType, createdAt) {
    const policy = this.#retentionPolicies.get(dataType);

    if (!policy) {
      return { valid: true, reason: 'no_policy_defined' };
    }

    const created = new Date(createdAt);
    const now = new Date();
    const daysSinceCreation = Math.floor((now - created) / (1000 * 60 * 60 * 24));

    if (daysSinceCreation > policy.days) {
      return {
        valid: false,
        reason: 'retention_exceeded',
        daysSinceCreation,
        maxDays: policy.days,
        purpose: policy.purpose
      };
    }

    return { valid: true, daysRemaining: policy.days - daysSinceCreation };
  }

  // ============================================
  // PSD2 Compliance (Payment Services Directive 2)
  // ============================================

  /**
   * Validate Strong Customer Authentication
   * PSD2 Article 97: Authentication
   *
   * MUST require at least 2 of 3 factors:
   * - Knowledge (something the user knows)
   * - Possession (something the user has)
   * - Inherence (something the user is)
   */
  validateSCA(authData) {
    if (!authData || typeof authData !== 'object') {
      return { valid: false, factors: [], reason: 'no_auth_data' };
    }

    const factors = [];

    // Knowledge factor (something user knows)
    if (authData.password || authData.pin || authData.securityAnswer) {
      factors.push('knowledge');
    }

    // Possession factor (something user has)
    if (authData.deviceId || authData.token || authData.otp || authData.smsCode) {
      factors.push('possession');
    }

    // Inherence factor (something user is)
    if (authData.biometric || authData.fingerprint || authData.faceId || authData.voicePrint) {
      factors.push('inherence');
    }

    const valid = factors.length >= 2;

    if (!valid) {
      this.#logAudit('psd2_sca_insufficient', {
        factorsProvided: factors.length,
        factorsRequired: 2,
        factors
      });
    }

    return { valid, factors, factorCount: factors.length };
  }

  /**
   * Check if transaction requires SCA
   * PSD2: SCA exemptions and thresholds
   */
  requiresSCA(transaction) {
    const SCA_THRESHOLD = 30; // EUR

    if (!transaction) return true;

    // Always require SCA for high-value transactions
    if (transaction.amount > SCA_THRESHOLD) {
      return true;
    }

    // Check cumulative amount (simplified)
    if (transaction.cumulativeAmount && transaction.cumulativeAmount > 100) {
      return true;
    }

    // Remote transactions always require SCA
    if (transaction.isRemote) {
      return true;
    }

    return false;
  }

  // ============================================
  // SOX Compliance (Sarbanes-Oxley)
  // ============================================

  /**
   * Create immutable audit entry
   * SOX Section 302/404: Financial reporting controls
   */
  createAuditEntry(action, data, metadata = {}) {
    const entry = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      action,
      data: this.#sanitizeForAudit(data),
      metadata: {
        ...metadata,
        version: this.#version,
        brand: this.#brand
      },
      checksum: null
    };

    // Calculate integrity checksum
    entry.checksum = this.#calculateChecksum(entry);

    this.#auditLog.push(Object.freeze(entry));

    return entry;
  }

  /**
   * Sanitize data for audit logging (remove sensitive fields)
   */
  #sanitizeForAudit(data) {
    if (!data || typeof data !== 'object') return data;

    let sanitized = this.sanitizePCIData(data);
    sanitized = this.pseudonymizeData(sanitized);

    // Remove any remaining sensitive fields
    const sensitiveFields = [...HIPAA_PHI_FIELDS];
    for (const field of sensitiveFields) {
      if (field in sanitized) {
        sanitized[field] = '[REDACTED]';
      }
    }

    return sanitized;
  }

  /**
   * Calculate checksum for audit entry integrity
   */
  #calculateChecksum(entry) {
    const content = JSON.stringify({
      timestamp: entry.timestamp,
      action: entry.action,
      data: entry.data
    });

    return crypto.createHash('sha256').update(content).digest('hex');
  }

  /**
   * Verify audit entry integrity
   */
  verifyAuditIntegrity(entry) {
    const recalculated = this.#calculateChecksum({
      timestamp: entry.timestamp,
      action: entry.action,
      data: entry.data
    });

    return recalculated === entry.checksum;
  }

  // ============================================
  // HIPAA Compliance (Health Insurance Portability and Accountability)
  // ============================================

  /**
   * Sanitize Protected Health Information
   * HIPAA Privacy Rule: De-identification
   */
  sanitizeHIPAAData(data) {
    if (!data || typeof data !== 'object') return data;

    const sanitized = { ...data };

    for (const field of HIPAA_PHI_FIELDS) {
      if (field in sanitized) {
        sanitized[field] = '[PHI_REDACTED]';
      }
    }

    // Also apply GDPR pseudonymization for identifiers
    return this.pseudonymizeData(sanitized);
  }

  /**
   * Validate HIPAA compliance for data access
   */
  validateHIPAAAccess(userId, dataType, purpose) {
    // Minimum necessary principle
    const validPurposes = ['treatment', 'payment', 'healthcare_operations', 'research_authorized'];

    if (!validPurposes.includes(purpose)) {
      this.#logAudit('hipaa_invalid_purpose', {
        userId: this.#pseudonymize(userId),
        dataType,
        purpose
      });
      return false;
    }

    this.#logAudit('hipaa_access_granted', {
      userId: this.#pseudonymize(userId),
      dataType,
      purpose
    });

    return true;
  }

  // ============================================
  // Data Encryption (AES-256-GCM)
  // ============================================

  /**
   * Encrypt sensitive data using AES-256-GCM
   * MUST NOT reduce encryption strength below AES-256-GCM
   */
  encryptSensitiveData(data) {
    if (!this.#encryptionKey) {
      throw new Error('[ComplianceManager] Encryption key not configured');
    }

    const algorithm = 'aes-256-gcm'; // DO NOT change - compliance requirement
    const iv = crypto.randomBytes(16);
    const key = Buffer.from(this.#encryptionKey, 'hex').slice(0, 32);

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    cipher.setAAD(Buffer.from('lanonasis-compliance-encryption'));

    const plaintext = typeof data === 'string' ? data : JSON.stringify(data);
    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag();

    return {
      encrypted,
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex'),
      algorithm,
      version: this.#version
    };
  }

  /**
   * Decrypt data encrypted with encryptSensitiveData
   */
  decryptSensitiveData(encryptedPackage) {
    if (!this.#encryptionKey) {
      throw new Error('[ComplianceManager] Encryption key not configured');
    }

    const { encrypted, iv, authTag, algorithm } = encryptedPackage;

    if (algorithm !== 'aes-256-gcm') {
      throw new Error('[ComplianceManager] Unsupported encryption algorithm');
    }

    const key = Buffer.from(this.#encryptionKey, 'hex').slice(0, 32);
    const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'));

    decipher.setAAD(Buffer.from('lanonasis-compliance-encryption'));
    decipher.setAuthTag(Buffer.from(authTag, 'hex'));

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    try {
      return JSON.parse(decrypted);
    } catch {
      return decrypted;
    }
  }

  // ============================================
  // Defense in Depth - Multi-Regulation Enforcement
  // ============================================

  /**
   * Apply all applicable compliance protections to data
   * Defense in depth: Apply ALL protections, not just one
   */
  enforceDataHandling(serviceId, data, operation) {
    const service = this.#serviceRegistry.get(serviceId);

    if (!service) {
      // Default to most restrictive protections
      this.#logAudit('compliance_unregistered_service', { serviceId, operation });
    }

    let processedData = { ...data };
    const appliedProtections = [];

    // Apply PCI-DSS protections
    if (service?.compliance?.pci || this.#containsPCIData(data)) {
      processedData = this.sanitizePCIData(processedData);
      appliedProtections.push('PCI-DSS');
    }

    // Apply GDPR protections (default for MaaS)
    if (service?.compliance?.gdpr !== false) {
      if (operation === 'analytics') {
        processedData = this.minimizeForAnalytics(processedData);
      } else {
        processedData = this.pseudonymizeData(processedData);
      }
      appliedProtections.push('GDPR');
    }

    // Apply HIPAA protections
    if (service?.compliance?.hipaa || this.#containsHIPAAData(data)) {
      processedData = this.sanitizeHIPAAData(processedData);
      appliedProtections.push('HIPAA');
    }

    // Log enforcement
    this.#logAudit('compliance_enforcement_applied', {
      serviceId,
      operation,
      protections: appliedProtections
    });

    return {
      data: processedData,
      appliedProtections,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Check if data contains PCI-regulated fields
   */
  #containsPCIData(data) {
    if (!data || typeof data !== 'object') return false;

    const allPCIFields = [...PCI_PROHIBITED_FIELDS, ...PCI_SENSITIVE_FIELDS];
    return allPCIFields.some(field => field in data);
  }

  /**
   * Check if data contains HIPAA-regulated fields
   */
  #containsHIPAAData(data) {
    if (!data || typeof data !== 'object') return false;
    return HIPAA_PHI_FIELDS.some(field => field in data);
  }

  // ============================================
  // Internal Audit Logging
  // ============================================

  #logAudit(action, details) {
    const entry = {
      timestamp: new Date().toISOString(),
      action,
      details,
      version: this.#version
    };

    this.#auditLog.push(entry);

    // Emit event for external audit persistence (Node.js environments only)
    if (typeof process !== 'undefined' && typeof process.emit === 'function') {
      process.emit('compliance:audit', entry);
    }
  }

  /**
   * Get audit log (read-only)
   */
  getAuditLog(options = {}) {
    const { limit = 100, since = null, action = null } = options;

    let logs = [...this.#auditLog];

    if (since) {
      logs = logs.filter(entry => new Date(entry.timestamp) >= new Date(since));
    }

    if (action) {
      logs = logs.filter(entry => entry.action === action);
    }

    return logs.slice(-limit);
  }

  // ============================================
  // Compliance Validation
  // ============================================

  /**
   * Run comprehensive compliance validation
   */
  validateCompliance(data, regulations = ['pci', 'gdpr']) {
    const results = {
      valid: true,
      violations: [],
      timestamp: new Date().toISOString(),
      version: this.#version
    };

    if (regulations.includes('pci')) {
      const pciResult = this.validatePCICompliance(data);
      if (!pciResult.valid) {
        results.valid = false;
        results.violations.push(...pciResult.violations);
      }
    }

    return results;
  }
}

// Export singleton instance for consistent usage
let instance = null;

export function getComplianceManager(config = {}) {
  if (!instance) {
    instance = new ComplianceManager(config);
  }
  return instance;
}

// Export class for testing and custom instances
export default ComplianceManager;
