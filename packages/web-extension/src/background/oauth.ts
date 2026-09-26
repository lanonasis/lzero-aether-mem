/**
 * L0 Memory Browser Extension - OAuth Authentication Service
 *
 * Implements OAuth 2.0 Device Code Flow (primary) and PKCE Flow (fallback)
 * for browser extension authentication.
 *
 * Storage keys (chrome.storage.local):
 *   - l0_oauth_token      : { access_token, expires_at, refresh_token }
 *   - l0_oauth_credential_type : 'oauth'
 *   - l0_code_verifier    : ephemeral PKCE verifier (deleted after use)
 *   - l0_oauth_state      : ephemeral PKCE state (deleted after use)
 */

// ---- types ----

export interface DeviceCodeResponse {
  device_code: string;
  user_code: string;
  verification_uri: string;
  verification_uri_complete: string;
  expires_in: number;
  interval: number;
}

export interface OAuthTokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  error?: string;
  error_description?: string;
}

export interface StoredOAuthToken {
  access_token: string;
  expires_at: number;
  refresh_token?: string;
}

export type CredentialType = 'oauth' | 'apiKey';

// ---- constants ----

const CLIENT_ID = 'web-extension';
const SCOPE = 'memories:read memories:write memories:delete profile';
const OAUTH_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes
const STORAGE_KEY_TOKEN = 'l0_oauth_token';
const STORAGE_KEY_CREDENTIAL_TYPE = 'l0_oauth_credential_type';
const STORAGE_KEY_CODE_VERIFIER = 'l0_code_verifier';
const STORAGE_KEY_OAUTH_STATE = 'l0_oauth_state';

// ---- helpers ----

function deriveAuthUrl(apiUrl: string): string {
  // Swap host: api.lanonasis.com → auth.lanonasis.com
  const base = 'https://auth.lanonasis.com';
  if (!apiUrl) return base;
  try {
    const u = new URL(apiUrl);
    const hostname = u.hostname.replace(/^api\./, 'auth.');
    return `${u.protocol}//${hostname}`;
  } catch {
    return base;
  }
}

async function getAuthConfig(): Promise<{ authUrl: string; apiUrl: string } | null> {
  const { apiUrl } = await chrome.storage.local.get('apiUrl');
  const normalized = apiUrl || 'https://api.lanonasis.com';
  return { authUrl: deriveAuthUrl(normalized), apiUrl: normalized };
}

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  const base64 = btoa(binary);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function generateCodeVerifier(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return base64UrlEncode(bytes);
}

async function generateCodeChallenge(verifier: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier));
  return base64UrlEncode(new Uint8Array(digest));
}

function generateState(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('');
}

// ---- storage helpers ----

async function storeOAuthTokens(token: StoredOAuthToken): Promise<void> {
  await chrome.storage.local.set({
    [STORAGE_KEY_TOKEN]: token,
    [STORAGE_KEY_CREDENTIAL_TYPE]: 'oauth',
  });
}

async function getStoredOAuthToken(): Promise<StoredOAuthToken | null> {
  const raw = await chrome.storage.local.get(STORAGE_KEY_TOKEN);
  const data = raw[STORAGE_KEY_TOKEN] as StoredOAuthToken | undefined;
  if (!data?.access_token) return null;
  return data;
}

async function clearOAuthStorage(): Promise<void> {
  await chrome.storage.local.remove([
    STORAGE_KEY_TOKEN,
    STORAGE_KEY_CREDENTIAL_TYPE,
    STORAGE_KEY_CODE_VERIFIER,
    STORAGE_KEY_OAUTH_STATE,
  ]);
}

// ---- device code flow ----

export async function startDeviceCodeFlow(): Promise<DeviceCodeResponse> {
  const config = await getAuthConfig();
  if (!config) throw new Error('Unable to determine auth URL');

  const resp = await fetch(`${config.authUrl}/oauth/device`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: CLIENT_ID,
      scope: SCOPE,
    }),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Device code request failed: ${resp.status} ${text}`);
  }

  return (await resp.json()) as DeviceCodeResponse;
}

export function pollDeviceToken(
  deviceCode: DeviceCodeResponse,
  opts?: { onCancel?: () => boolean; onProgress?: (msg: string) => void }
): Promise<{ access_token: string; refresh_token?: string }> {
  return new Promise((resolve, reject) => {
    const baseInterval = Math.max((deviceCode.interval || 5) * 1000, 1000);
    let interval = baseInterval;
    const maxInterval = 30_000;
    const expiresAt = Date.now() + deviceCode.expires_in * 1000;
    const grantType = 'urn:ietf:params:oauth:grant-type:device_code';

    async function poll(): Promise<void> {
      if (opts?.onCancel?.()) {
        reject(new Error('User cancelled'));
        return;
      }
      if (Date.now() >= expiresAt) {
        reject(new Error('Device code expired'));
        return;
      }

      await new Promise((r) => setTimeout(r, interval));

      try {
        const config = await getAuthConfig();
        if (!config) {
          reject(new Error('Unable to determine auth URL'));
          return;
        }

        const tokenResp = await fetch(`${config.authUrl}/oauth/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
          },
          body: new URLSearchParams({
            grant_type: grantType,
            device_code: deviceCode.device_code,
            client_id: CLIENT_ID,
          }).toString(),
        });

        const tokenData = (await tokenResp.json()) as OAuthTokenResponse;

        if (tokenData.error === 'authorization_pending') {
          opts?.onProgress?.('Waiting for you to authorize in browser…');
          interval = baseInterval;
          void poll();
          return;
        }

        if (tokenData.error === 'slow_down') {
          interval = Math.min(interval * 2, maxInterval);
          void poll();
          return;
        }

        if (tokenData.error === 'authorization_denied' || tokenData.error === 'access_denied') {
          reject(new Error('Authorization denied'));
          return;
        }

        if (tokenData.error === 'expired_token') {
          reject(new Error('Device code expired'));
          return;
        }

        if (tokenData.error) {
          reject(new Error(tokenData.error_description || tokenData.error));
          return;
        }

        if (tokenData.access_token) {
          resolve({
            access_token: tokenData.access_token,
            refresh_token: tokenData.refresh_token,
          });
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Polling error';
        interval = Math.min(interval * 2, maxInterval);
        opts?.onProgress?.(`Retry polling… ${msg}`);
        await new Promise((r) => setTimeout(r, interval));
        void poll();
      }
    }

    void poll();
  });
}

// ---- PKCE flow ----

export async function startPkceFlow(): Promise<{ authUrl: string; state: string; codeVerifier: string }> {
  const config = await getAuthConfig();
  if (!config) throw new Error('Unable to determine auth URL');

  const codeVerifier = generateCodeVerifier();
  const state = generateState();
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  const authParams = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: `${config.apiUrl}/oauth/callback`,
    response_type: 'code',
    scope: SCOPE,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
    state,
  });

  return {
    authUrl: `${config.authUrl}/authorize?${authParams.toString()}`,
    state,
    codeVerifier,
  };
}

export async function completePkce(
  code: string,
  codeVerifier: string,
  redirectUri: string
): Promise<{ access_token: string; refresh_token?: string }> {
  const config = await getAuthConfig();
  if (!config) throw new Error('Unable to determine auth URL');

  const resp = await fetch(`${config.authUrl}/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: CLIENT_ID,
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }).toString(),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Token exchange failed: ${resp.status} ${text}`);
  }

  const data = (await resp.json()) as OAuthTokenResponse;
  if (!data.access_token) {
    throw new Error('Token exchange returned no access_token');
  }

  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
  };
}

// ---- token management ----

export async function refreshAccessToken(): Promise<string | null> {
  const stored = await getStoredOAuthToken();
  if (!stored?.refresh_token) {
    console.log('[OAuth] No refresh token available');
    return null;
  }

  const config = await getAuthConfig();
  if (!config) {
    console.error('[OAuth] Unable to determine auth URL for refresh');
    return null;
  }

  try {
    const resp = await fetch(`${config.authUrl}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: CLIENT_ID,
        refresh_token: stored.refresh_token,
      }).toString(),
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error(`[OAuth] Token refresh failed: ${resp.status} ${text}`);
      if (resp.status === 400 || resp.status === 401) {
        await clearOAuthStorage();
      }
      return null;
    }

    const data = (await resp.json()) as {
      access_token: string;
      refresh_token?: string;
      expires_in?: number;
    };

    const newToken: StoredOAuthToken = {
      access_token: data.access_token,
      expires_at: Date.now() + (data.expires_in ? data.expires_in * 1000 : 3_600_000),
      refresh_token: data.refresh_token ?? stored.refresh_token,
    };

    await storeOAuthTokens(newToken);
    console.log('[OAuth] Access token refreshed successfully');
    return data.access_token;
  } catch (err) {
    console.error('[OAuth] Token refresh error:', err);
    return null;
  }
}

export async function getEffectiveToken(): Promise<{ token: string; authType: CredentialType } | null> {
  // 1. Check OAuth tokens first
  const oauthToken = await getStoredOAuthToken();
  if (oauthToken?.access_token) {
    // Check if expired — attempt refresh if so
    if (Date.now() >= oauthToken.expires_at - 60_000) {
      console.log('[OAuth] Token expired, attempting refresh…');
      const refreshed = await refreshAccessToken();
      if (refreshed) {
        return { token: refreshed, authType: 'oauth' };
      }
      // Refresh failed — clear stale OAuth state
      await clearOAuthStorage();
    } else {
      return { token: oauthToken.access_token, authType: 'oauth' };
    }
  }

  // 2. Fall back to API key stored in l0_auth_token
  const raw = await chrome.storage.local.get('l0_auth_token');
  const apiKey = raw.l0_auth_token;
  if (apiKey) {
    return { token: apiKey, authType: 'apiKey' };
  }

  return null;
}

export async function storeAuthToken(access_token: string, refresh_token?: string): Promise<void> {
  const token: StoredOAuthToken = {
    access_token,
    expires_at: Date.now() + 3_600_000, // 1 hour default; server expires_in should adjust
    refresh_token,
  };
  await storeOAuthTokens(token);
}

export async function clearOAuthTokens(): Promise<void> {
  await clearOAuthStorage();
}

// ---- helpers for background script ----

/**
 * Exchange an auth code received from the PKCE redirect for tokens,
 * store them, and return the access token. Used by background/index.ts
 * when processing the callback message.
 */
export async function handlePkceCallback(
  code: string,
  redirectUri: string,
  _storedState?: string
): Promise<{ success: boolean; token?: string; error?: string }> {
  try {
    const verifierData = await chrome.storage.local.get(STORAGE_KEY_CODE_VERIFIER);
    const codeVerifier = verifierData[STORAGE_KEY_CODE_VERIFIER] as string | undefined;
    if (!codeVerifier) {
      return { success: false, error: 'No PKCE verifier found in storage' };
    }

    const result = await completePkce(code, codeVerifier, redirectUri);
    await storeAuthToken(result.access_token, result.refresh_token);
    await chrome.storage.local.remove([STORAGE_KEY_CODE_VERIFIER]);

    console.log('[OAuth] PKCE callback completed successfully');
    return { success: true, token: result.access_token };
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'PKCE callback failed';
    console.error('[OAuth] PKCE callback error:', err);
    return { success: false, error: msg };
  }
}
