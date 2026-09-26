/**
 * Diagnostics — lightweight runtime health checks for the web extension.
 *
 * Produces a DiagnosticResult with 4 checks:
 *  1. Connection health (GET /api/v1/health)
 *  2. Auth shape (token prefix / JWT decode)
 *  3. Storage round-trip (chrome.storage.local write + read)
 *  4. API URL reachability (fetch with mode: no-cors)
 *
 * Used by the Options page to surface diagnostics to the user.
 */

// ---------- types ----------

export interface DiagnosticCheck {
  name: string;
  status: 'healthy' | 'degraded' | 'critical';
  detail: string;
  action?: string;
}

export interface DiagnosticResult {
  checks: DiagnosticCheck[];
  overall: 'healthy' | 'degraded' | 'critical';
  timestamp: number;
}

// ---------- constants ----------

const HEALTH_ENDPOINT = '/api/v1/health';
const STORAGE_TEST_KEY = 'l0.diagnosticTest';
const HEALTH_TIMEOUT_MS = 5_000;

// ---------- check functions ----------

async function checkConnectionHealth(apiUrl: string): Promise<DiagnosticCheck> {
  try {
    const url = `${apiUrl}${HEALTH_ENDPOINT}`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), HEALTH_TIMEOUT_MS);

    const start = performance.now();
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'omit',
      cache: 'no-store',
      signal: controller.signal,
    });
    clearTimeout(timer);

    const latency = Math.round(performance.now() - start);

    if (!res.ok) {
      const body = await res.text().catch(() => '');
      return {
        name: 'Connection Health',
        status: 'critical',
        detail: `${res.status} (${latency}ms) — ${body.slice(0, 120)}`,
        action: 'Check API URL and network',
      };
    }

    if (latency > 2000) {
      return {
        name: 'Connection Health',
        status: 'degraded',
        detail: `OK (${latency}ms) — slow response`,
        action: 'Consider a closer API endpoint',
      };
    }

    return {
      name: 'Connection Health',
      status: 'healthy',
      detail: `OK (${latency}ms)`,
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return {
      name: 'Connection Health',
      status: 'critical',
      detail: `Failed: ${msg}`,
      action: 'Check API URL and network',
    };
  }
}

async function checkAuthShapeAsync(): Promise<DiagnosticCheck> {
  const { l0_auth_token } = await chrome.storage.local.get('l0_auth_token');
  const token = l0_auth_token;

  if (!token) {
    return {
      name: 'Auth Shape',
      status: 'degraded',
      detail: 'No token stored',
      action: 'Sign in to L0 Memory',
    };
  }

  const prefixes = ['lano_', 'lms_', 'lns_', 'vibe_', 'sk_', 'pk_', 'master_'];
  const hasPrefix = prefixes.some((p) => token.startsWith(p));

  if (hasPrefix) {
    return {
      name: 'Auth Shape',
      status: 'healthy',
      detail: `Valid prefix (${token.slice(0, 8)}...)`,
    };
  }

  // Check JWT structure as fallback
  try {
    const parts = token.trim().split('.');
    if (parts.length === 3 && parts.every((p: string) => /^[A-Za-z0-9_-]+$/.test(p))) {
      return {
        name: 'Auth Shape',
        status: 'healthy',
        detail: 'Looks like a valid JWT',
      };
    }
  } catch {
    // ignore
  }

  return {
    name: 'Auth Shape',
    status: 'critical',
    detail: `Invalid token format (${token.slice(0, 12)}...)`,
    action: 'Re-authenticate',
  };
}

async function checkStorageRoundTrip(): Promise<DiagnosticCheck> {
  try {
    const testValue = Date.now();
    const writeStart = performance.now();

    await chrome.storage.local.set({ [STORAGE_TEST_KEY]: testValue });

    const readStart = performance.now();
    const result = await chrome.storage.local.get(STORAGE_TEST_KEY);
    const readValue = (result as Record<string, unknown>)[STORAGE_TEST_KEY];

    const writeLatency = Math.round(readStart - writeStart);
    const readLatency = Math.round(performance.now() - readStart);

    if (readValue !== testValue) {
      return {
        name: 'Storage Round-Trip',
        status: 'critical',
        detail: `Write/read mismatch (wrote ${testValue}, got ${readValue})`,
        action: 'Check browser storage permissions',
      };
    }

    if (writeLatency > 100 || readLatency > 100) {
      return {
        name: 'Storage Round-Trip',
        status: 'degraded',
        detail: `Slow (write: ${writeLatency}ms, read: ${readLatency}ms)`,
      };
    }

    return {
      name: 'Storage Round-Trip',
      status: 'healthy',
      detail: `OK (write: ${writeLatency}ms, read: ${readLatency}ms)`,
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return {
      name: 'Storage Round-Trip',
      status: 'critical',
      detail: `Failed: ${msg}`,
      action: 'Check browser storage permissions',
    };
  }
}

async function checkApiUrlReachability(apiUrl: string): Promise<DiagnosticCheck> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3_000);

    const start = performance.now();
    await fetch(apiUrl, {
      method: 'HEAD',
      mode: 'no-cors',
      cache: 'no-store',
      signal: controller.signal,
    });
    clearTimeout(timer);

    const latency = Math.round(performance.now() - start);

    return {
      name: 'API URL Reachability',
      status: 'healthy',
      detail: `Origin reachable (${latency}ms)`,
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return {
      name: 'API URL Reachability',
      status: 'critical',
      detail: `Origin unreachable: ${msg}`,
      action: 'Check API URL and CORS settings',
    };
  }
}

// ---------- orchestrator ----------

export async function runDiagnostics(
  apiUrl?: string,
): Promise<DiagnosticResult> {
  const stored = await chrome.storage.local.get('apiUrl');
  const baseApiUrl = (apiUrl ?? (stored.apiUrl as string)) || 'https://api.lanonasis.com';

  const [health, auth, storage, reachability] = await Promise.all([
    checkConnectionHealth(baseApiUrl),
    checkAuthShapeAsync(),
    checkStorageRoundTrip(),
    checkApiUrlReachability(baseApiUrl),
  ]);

  const checks = [health, auth, storage, reachability];
  const overall = determineOverallHealth(checks);

  return {
    checks,
    overall,
    timestamp: Date.now(),
  };
}

function determineOverallHealth(checks: DiagnosticCheck[]): 'healthy' | 'degraded' | 'critical' {
  if (checks.some((c) => c.status === 'critical')) return 'critical';
  if (checks.some((c) => c.status === 'degraded')) return 'degraded';
  return 'healthy';
}
