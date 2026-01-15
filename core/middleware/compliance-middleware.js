/**
 * LanOnasis Compliance Middleware
 *
 * Express middleware for automatic compliance enforcement.
 *
 * @version 2.0.0
 * @package @lanonasis/aether-memory
 * @author LanOnasis <hello@lanonasis.com>
 * @license MIT
 */

import { getComplianceManager } from '../security/compliance-manager.js';
import { getVersionManager } from '../versioning/version-manager.js';

/**
 * Compliance validation middleware
 * Validates request data against compliance rules
 */
export function complianceValidation(options = {}) {
  const compliance = getComplianceManager();
  const regulations = options.regulations || ['gdpr'];

  return (req, res, next) => {
    try {
      // Validate request body if present
      if (req.body && Object.keys(req.body).length > 0) {
        const result = compliance.validateCompliance(req.body, regulations);

        if (!result.valid) {
          return res.status(400).json({
            error: 'Compliance validation failed',
            violations: result.violations.map(v => ({
              field: v.field,
              regulation: v.regulation,
              message: v.message
            }))
          });
        }
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

/**
 * Data sanitization middleware
 * Automatically sanitizes sensitive data in responses
 */
export function dataSanitization(serviceId = 'default') {
  const compliance = getComplianceManager();

  return (req, res, next) => {
    // Store original json method
    const originalJson = res.json.bind(res);

    // Override json to sanitize output
    res.json = (data) => {
      if (data && typeof data === 'object') {
        const { data: sanitized } = compliance.enforceDataHandling(
          serviceId,
          data,
          'response'
        );
        return originalJson(sanitized);
      }
      return originalJson(data);
    };

    next();
  };
}

/**
 * Consent verification middleware
 * Ensures user has consented to data processing
 */
export function consentVerification(purpose) {
  const compliance = getComplianceManager();

  return (req, res, next) => {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!compliance.verifyConsent(userId, purpose)) {
      return res.status(403).json({
        error: 'Consent required',
        purpose,
        message: `User consent for '${purpose}' is required to proceed`
      });
    }

    next();
  };
}

/**
 * SCA verification middleware (PSD2)
 * Validates Strong Customer Authentication for transactions
 */
export function scaVerification() {
  const compliance = getComplianceManager();

  return (req, res, next) => {
    // Check if transaction requires SCA
    const transaction = req.body?.transaction || req.body;

    if (compliance.requiresSCA(transaction)) {
      const authData = {
        password: req.body?.password || req.headers['x-auth-knowledge'],
        deviceId: req.body?.deviceId || req.headers['x-device-id'],
        token: req.body?.token || req.headers['x-auth-token'],
        biometric: req.body?.biometric || req.headers['x-auth-biometric']
      };

      const scaResult = compliance.validateSCA(authData);

      if (!scaResult.valid) {
        return res.status(403).json({
          error: 'Strong Customer Authentication required',
          factorsProvided: scaResult.factorCount,
          factorsRequired: 2,
          factors: scaResult.factors
        });
      }
    }

    next();
  };
}

/**
 * Audit logging middleware
 * Creates audit entries for all requests
 */
export function auditLogging(options = {}) {
  const compliance = getComplianceManager();
  const includeBody = options.includeBody || false;

  return (req, res, next) => {
    const startTime = Date.now();

    // Capture response
    const originalEnd = res.end.bind(res);

    res.end = function(chunk, encoding) {
      const responseTime = Date.now() - startTime;

      compliance.createAuditEntry('http_request', {
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        responseTime,
        userId: req.user?.id || 'anonymous',
        ip: req.ip,
        userAgent: req.get('user-agent'),
        ...(includeBody && req.body ? { body: req.body } : {})
      }, {
        source: 'compliance-middleware'
      });

      return originalEnd(chunk, encoding);
    };

    next();
  };
}

/**
 * Version headers middleware
 * Adds LanOnasis brand/version headers to responses
 */
export function versionHeaders() {
  const versioning = getVersionManager();

  return (req, res, next) => {
    const headers = versioning.getVersionHeaders();

    for (const [key, value] of Object.entries(headers)) {
      res.setHeader(key, value);
    }

    next();
  };
}

/**
 * Combined compliance middleware stack
 * Applies all compliance middleware in correct order
 */
export function complianceStack(options = {}) {
  const middlewares = [
    versionHeaders(),
    auditLogging(options.audit),
  ];

  if (options.validation !== false) {
    middlewares.push(complianceValidation(options.validation));
  }

  if (options.sanitization !== false) {
    middlewares.push(dataSanitization(options.serviceId));
  }

  return middlewares;
}

export default {
  complianceValidation,
  dataSanitization,
  consentVerification,
  scaVerification,
  auditLogging,
  versionHeaders,
  complianceStack
};
