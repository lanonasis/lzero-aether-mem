import * as vscode from 'vscode';

declare const __non_webpack_require__: NodeRequire | undefined;

type NodeHttp = typeof import('http');

export type CredentialType = 'oauth' | 'apiKey';

export interface StoredCredential {
    type: CredentialType;
    token: string;
}

export class SecureApiKeyService {
    private static readonly API_KEY_KEY = 'lzero.apiKey';
    private static readonly API_KEY_RAW_KEY = 'lzero.apiKey.raw';
    private static readonly AUTH_TOKEN_KEY = 'lzero.authToken';
    private static readonly REFRESH_TOKEN_KEY = 'lzero.refreshToken';
    private static readonly CREDENTIAL_TYPE_KEY = 'lzero.credentialType';
    private static readonly CALLBACK_PORT = 8080;
    private static readonly OAUTH_TIMEOUT_MS = 5 * 60 * 1000;

    private migrationCompleted = false;

    constructor(
        private readonly context: vscode.ExtensionContext,
        private readonly outputChannel: vscode.OutputChannel,
    ) { }

    async initialize(): Promise<void> {
        await this.migrateLegacySecrets();
    }

    async getApiKeyOrPrompt(): Promise<string | null> {
        const apiKey = await this.getApiKey();
        if (apiKey) return apiKey;

        const credential = await this.getStoredCredentials();
        if (credential?.type === 'oauth') {
            return credential.token;
        }

        return await this.promptForAuthentication();
    }

    async getApiKey(): Promise<string | null> {
        try {
            const rawKey = await this.context.secrets.get(SecureApiKeyService.API_KEY_RAW_KEY);
            if (rawKey) {
                return rawKey;
            }

            const apiKey = await this.context.secrets.get(SecureApiKeyService.API_KEY_KEY);
            if (!apiKey) {
                return null;
            }

            const storedType = await this.context.secrets.get(SecureApiKeyService.CREDENTIAL_TYPE_KEY) as CredentialType | null;

            if (storedType === 'oauth' || this.looksLikeJwt(apiKey)) {
                this.log('Retrieved OAuth token from secure storage (unhashed)');
                return apiKey;
            }

            // Legacy raw key stored in API_KEY_KEY
            await this.context.secrets.store(SecureApiKeyService.API_KEY_RAW_KEY, apiKey);
            this.log('Migrated plaintext API key to raw storage');
            return apiKey;
        } catch (error) {
            this.logError('Failed to retrieve API key from secure storage', error);
            return null;
        }
    }

    async hasApiKey(): Promise<boolean> {
        const apiKey = await this.getApiKey();
        if (apiKey) return true;

        const authHeader = await this.getAuthenticationHeader();
        return authHeader !== null;
    }

    async promptForAuthentication(): Promise<string | null> {
        const choice = await vscode.window.showQuickPick(
            [
                {
                    label: '$(key) OAuth (Browser)',
                    description: 'Authenticate using OAuth2 with browser (Recommended)',
                    value: 'oauth'
                },
                {
                    label: '$(key) API Key',
                    description: 'Enter API key directly',
                    value: 'apikey'
                },
                {
                    label: '$(circle-slash) Cancel',
                    description: 'Cancel authentication',
                    value: 'cancel'
                }
            ],
            {
                placeHolder: 'Choose authentication method'
            }
        );

        if (!choice || choice.value === 'cancel') {
            return null;
        }

        if (choice.value === 'oauth') {
            return await this.authenticateWithOAuthFlow();
        }

        return await this.promptForApiKeyEntry();
    }

    async authenticateWithOAuthFlow(): Promise<string | null> {
        const success = await this.authenticateOAuth();
        if (!success) return null;

        const apiKey = await this.getApiKey();
        if (apiKey) return apiKey;

        const authHeader = await this.getAuthenticationHeader();
        if (authHeader?.startsWith('Bearer ')) {
            return authHeader.replace('Bearer ', '');
        }

        return null;
    }

    async promptForApiKeyEntry(): Promise<string | null> {
        const apiKey = await vscode.window.showInputBox({
            prompt: 'Enter your L0 Memory API Key',
            placeHolder: 'Get your API key from api.lanonasis.com',
            password: true,
            ignoreFocusOut: true,
            validateInput: (value) => {
                if (!value || value.trim().length === 0) {
                    return 'API key is required';
                }
                if (value.length < 20) {
                    return 'API key seems too short';
                }
                return null;
            }
        });

        if (apiKey) {
            await this.storeApiKey(apiKey, 'apiKey');
            await this.context.secrets.delete(SecureApiKeyService.AUTH_TOKEN_KEY);
            await this.context.secrets.delete(SecureApiKeyService.REFRESH_TOKEN_KEY);
            this.log('API key stored securely');
            return apiKey;
        }

        return null;
    }

    async storeApiKeyDirect(apiKey: string): Promise<void> {
        await this.storeApiKey(apiKey, 'apiKey');
        await this.context.secrets.delete(SecureApiKeyService.AUTH_TOKEN_KEY);
        await this.context.secrets.delete(SecureApiKeyService.REFRESH_TOKEN_KEY);
        this.log('API key stored from webview');
    }

    async authenticateOAuth(): Promise<boolean> {
        try {
            const config = vscode.workspace.getConfiguration('lzero');
            const authUrl = config.get<string>('authUrl') || 'https://auth.lanonasis.com';
            const clientId = 'vscode-extension';

            this.log('Starting Device Code authentication flow...');

            const deviceResponse = await fetch(`${authUrl}/oauth/device`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    client_id: clientId,
                    scope: 'memories:read memories:write memories:delete profile'
                })
            });

            if (!deviceResponse.ok) {
                const errorText = await deviceResponse.text();
                throw new Error(`Failed to request device code: ${deviceResponse.status} ${errorText}`);
            }

            const deviceData = await deviceResponse.json() as {
                device_code: string;
                user_code: string;
                verification_uri: string;
                verification_uri_complete: string;
                expires_in: number;
                interval: number;
            };

            this.log(`Device code received. User code: ${deviceData.user_code}`);

            const openBrowser = await vscode.window.showInformationMessage(
                `Enter this code in your browser: ${deviceData.user_code}`,
                { modal: true },
                'Open Browser',
                'Copy Code'
            );

            if (openBrowser === 'Open Browser') {
                await vscode.env.openExternal(vscode.Uri.parse(deviceData.verification_uri_complete));
            } else if (openBrowser === 'Copy Code') {
                await vscode.env.clipboard.writeText(deviceData.user_code);
                await vscode.env.openExternal(vscode.Uri.parse(deviceData.verification_uri));
                vscode.window.showInformationMessage('Code copied! Paste it in the browser window.');
            } else {
                this.log('User cancelled device code flow');
                return false;
            }

            const basePollIntervalMs = Math.max((deviceData.interval || 5) * 1000, 1000);
            let pollIntervalMs = basePollIntervalMs;
            const maxPollIntervalMs = 30000;
            const expiresAt = Date.now() + (deviceData.expires_in * 1000);
            const grantType = 'urn:ietf:params:oauth:grant-type:device_code';

            return await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: 'Waiting for authorization...',
                cancellable: true
            }, async (progress, cancellationToken) => {
                while (Date.now() < expiresAt) {
                    if (cancellationToken.isCancellationRequested) {
                        this.log('User cancelled device code polling');
                        return false;
                    }

                    await new Promise(resolve => setTimeout(resolve, pollIntervalMs));

                    try {
                        const tokenResponse = await fetch(`${authUrl}/oauth/token`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'Accept': 'application/json'
                            },
                            body: new URLSearchParams({
                                grant_type: grantType,
                                device_code: deviceData.device_code,
                                client_id: clientId
                            }).toString()
                        });

                        const tokenData = await tokenResponse.json() as {
                            access_token?: string;
                            refresh_token?: string;
                            expires_in?: number;
                            error?: string;
                            error_description?: string;
                        };

                        if (tokenData.error === 'authorization_pending') {
                            progress.report({ message: 'Waiting for you to authorize in browser...' });
                            pollIntervalMs = basePollIntervalMs;
                            continue;
                        }

                        if (tokenData.error === 'slow_down') {
                            pollIntervalMs = Math.min(pollIntervalMs * 2, maxPollIntervalMs);
                            await new Promise(resolve => setTimeout(resolve, pollIntervalMs));
                            continue;
                        }

                        if (tokenData.error === 'access_denied') {
                            this.log('User denied authorization');
                            vscode.window.showWarningMessage('Authorization was denied.');
                            return false;
                        }

                        if (tokenData.error === 'expired_token') {
                            this.log('Device code expired');
                            vscode.window.showWarningMessage('Authorization timed out. Please try again.');
                            return false;
                        }

                        if (tokenData.error) {
                            throw new Error(tokenData.error_description || tokenData.error);
                        }

                        if (tokenData.access_token) {
                            await this.storeApiKey(tokenData.access_token, 'oauth');
                            if (tokenData.refresh_token) {
                                await this.context.secrets.store(SecureApiKeyService.REFRESH_TOKEN_KEY, tokenData.refresh_token);
                            }

                            const tokenInfo = {
                                access_token: tokenData.access_token,
                                expires_at: Date.now() + (tokenData.expires_in ? tokenData.expires_in * 1000 : 3600000)
                            };
                            await this.context.secrets.store(SecureApiKeyService.AUTH_TOKEN_KEY, JSON.stringify(tokenInfo));

                            this.log('Device code authentication successful!');
                            vscode.window.showInformationMessage('✓ Authentication successful!');
                            return true;
                        }
                    } catch (pollError) {
                        this.logError('Token polling error', pollError);
                        pollIntervalMs = Math.min(pollIntervalMs * 2, maxPollIntervalMs);
                    }
                }

                this.log('Device code expired');
                vscode.window.showWarningMessage('Authorization timed out. Please try again.');
                return false;
            });

        } catch (error) {
            this.logError('Device code authentication failed', error);

            if (vscode.env.uiKind === vscode.UIKind.Web) {
                return false;
            }

            this.log('Falling back to PKCE redirect flow...');
            return await this.authenticateOAuthPKCE();
        }
    }

    private async authenticateOAuthPKCE(): Promise<boolean> {
        if (vscode.env.uiKind === vscode.UIKind.Web) {
            this.log('PKCE flow not supported in web environment');
            return false;
        }

        return new Promise((resolve, reject) => {
            let timeoutId: NodeJS.Timeout | undefined;

            try {
                const config = vscode.workspace.getConfiguration('lzero');
                const authUrl = config.get<string>('authUrl') || 'https://auth.lanonasis.com';
                const clientId = 'vscode-extension';
                const redirectUri = `http://localhost:${SecureApiKeyService.CALLBACK_PORT}/callback`;

                const codeVerifier = this.generateCodeVerifier();
                const state = this.generateState();

                const startServer = async (): Promise<void> => {
                    const codeChallenge = await this.generateCodeChallenge(codeVerifier);

                    await this.context.secrets.store('lzero.oauth_code_verifier', codeVerifier);
                    await this.context.secrets.store('lzero.oauth_state', state);

                    const authUrlObj = new URL('/oauth/authorize', authUrl);
                    authUrlObj.searchParams.set('client_id', clientId);
                    authUrlObj.searchParams.set('response_type', 'code');
                    authUrlObj.searchParams.set('redirect_uri', redirectUri);
                    authUrlObj.searchParams.set('scope', 'memories:read memories:write memories:delete profile');
                    authUrlObj.searchParams.set('code_challenge', codeChallenge);
                    authUrlObj.searchParams.set('code_challenge_method', 'S256');
                    authUrlObj.searchParams.set('state', state);

                    const http = this.getNodeHttp();

                    const server = http.createServer(async (req: import('http').IncomingMessage, res: import('http').ServerResponse) => {
                        try {
                            if (!req.url) {
                                res.writeHead(400, { 'Content-Type': 'text/plain' });
                                res.end('Missing URL');
                                return;
                            }
                            const url = new URL(req.url, `http://localhost:${SecureApiKeyService.CALLBACK_PORT}`);

                            if (url.pathname === '/callback') {
                                const code = url.searchParams.get('code');
                                const returnedState = url.searchParams.get('state');
                                const error = url.searchParams.get('error');

                                const storedState = await this.context.secrets.get('lzero.oauth_state');
                                if (returnedState !== storedState) {
                                    res.writeHead(400, { 'Content-Type': 'text/html' });
                                    res.end('<h1>Invalid state parameter</h1>');
                                    server.close();
                                    if (timeoutId) clearTimeout(timeoutId);
                                    reject(new Error('Invalid state parameter'));
                                    return;
                                }

                                if (error) {
                                    res.writeHead(400, { 'Content-Type': 'text/html' });
                                    res.end(`<h1>OAuth Error: ${error}</h1>`);
                                    server.close();
                                    if (timeoutId) clearTimeout(timeoutId);
                                    reject(new Error(`OAuth error: ${error}`));
                                    return;
                                }

                                if (code) {
                                    const token = await this.exchangeCodeForToken(code, codeVerifier, redirectUri, authUrl);

                                    await this.storeApiKey(token.access_token, 'oauth');
                                    if (token.refresh_token) {
                                        await this.context.secrets.store(SecureApiKeyService.REFRESH_TOKEN_KEY, token.refresh_token);
                                    }

                                    res.writeHead(200, { 'Content-Type': 'text/html' });
                                    res.end(`
                                  <html>
                                    <head><title>Authentication Success</title></head>
                                    <body>
                                      <h1 style="color: green;">✓ Authentication Successful!</h1>
                                      <p>You can close this window and return to VS Code.</p>
                                      <script>setTimeout(() => window.close(), 2000);</script>
                                    </body>
                                  </html>
                                `);

                                    await this.context.secrets.delete('lzero.oauth_code_verifier');
                                    await this.context.secrets.delete('lzero.oauth_state');
                                    server.close();
                                    if (timeoutId) clearTimeout(timeoutId);
                                    resolve(true);
                                }
                            } else {
                                res.writeHead(404, { 'Content-Type': 'text/plain' });
                                res.end('Not found');
                            }
                        } catch (err) {
                            res.writeHead(500, { 'Content-Type': 'text/html' });
                            res.end(`<h1>Error: ${err instanceof Error ? err.message : 'Unknown error'}</h1>`);
                            server.close();
                            if (timeoutId) clearTimeout(timeoutId);
                            reject(err);
                        }
                    });

                    server.on('error', (err: NodeJS.ErrnoException) => {
                        if (timeoutId) clearTimeout(timeoutId);

                        if (err.code === 'EADDRINUSE') {
                            reject(new Error(`Port ${SecureApiKeyService.CALLBACK_PORT} is already in use. Please close any applications using this port and try again.`));
                        } else {
                            reject(new Error(`Failed to start OAuth callback server: ${err.message}`));
                        }
                    });

                    server.listen(SecureApiKeyService.CALLBACK_PORT, 'localhost', () => {
                        this.outputChannel.appendLine(`OAuth callback server listening on port ${SecureApiKeyService.CALLBACK_PORT}`);
                        vscode.env.openExternal(vscode.Uri.parse(authUrlObj.toString()));
                    });

                    timeoutId = setTimeout(() => {
                        server.close();
                        reject(new Error('OAuth authentication timeout'));
                    }, SecureApiKeyService.OAUTH_TIMEOUT_MS);
                };

                startServer().catch((error) => {
                    if (timeoutId) clearTimeout(timeoutId);
                    reject(error);
                });

            } catch (error) {
                if (timeoutId) clearTimeout(timeoutId);
                reject(error);
            }
        });
    }

    async getAuthenticationHeader(): Promise<string | null> {
        const credential = await this.getStoredCredentials();
        if (credential?.type === 'oauth') {
            return `Bearer ${credential.token}`;
        }
        return null;
    }

    async getStoredCredentials(): Promise<StoredCredential | null> {
        const authToken = await this.context.secrets.get(SecureApiKeyService.AUTH_TOKEN_KEY);
        if (authToken) {
            try {
                const token = JSON.parse(authToken);
                if (token?.access_token) {
                    if (this.isTokenValid(token)) {
                        return { type: 'oauth', token: token.access_token };
                    }

                    this.log('Access token expired, attempting refresh...');
                    const refreshedToken = await this.refreshAccessToken();
                    if (refreshedToken) {
                        return { type: 'oauth', token: refreshedToken };
                    }

                    this.log('Token refresh failed, clearing expired credentials');
                    await this.deleteApiKey();
                    return null;
                }
            } catch (error) {
                this.logError('Failed to parse stored OAuth token', error);
            }
        }

        const apiKey = await this.getApiKey();
        if (apiKey) {
            const storedType = await this.context.secrets.get(SecureApiKeyService.CREDENTIAL_TYPE_KEY) as CredentialType | null;
            const inferredType: CredentialType = storedType === 'oauth' || storedType === 'apiKey'
                ? storedType
                : (this.looksLikeJwt(apiKey) ? 'oauth' : 'apiKey');
            return { type: inferredType, token: apiKey };
        }

        return null;
    }

    private async refreshAccessToken(): Promise<string | null> {
        try {
            const refreshToken = await this.context.secrets.get(SecureApiKeyService.REFRESH_TOKEN_KEY);
            if (!refreshToken) {
                this.log('No refresh token available');
                return null;
            }

            const config = vscode.workspace.getConfiguration('lzero');
            const authUrl = config.get<string>('authUrl') || 'https://auth.lanonasis.com';
            const tokenUrl = new URL('/oauth/token', authUrl);

            this.log(`Refreshing token via ${tokenUrl.toString()}`);

            const body = new URLSearchParams({
                grant_type: 'refresh_token',
                client_id: 'vscode-extension',
                refresh_token: refreshToken
            });

            const response = await fetch(tokenUrl.toString(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                },
                body: body.toString()
            });

            if (!response.ok) {
                const errorText = await response.text();
                this.logError(`Token refresh failed: ${response.status}`, errorText);

                if (response.status === 400 || response.status === 401) {
                    await this.context.secrets.delete(SecureApiKeyService.REFRESH_TOKEN_KEY);
                }
                return null;
            }

            const tokenData = await response.json() as {
                access_token: string;
                refresh_token?: string;
                expires_in?: number;
            };

            const newToken = {
                access_token: tokenData.access_token,
                expires_at: Date.now() + (tokenData.expires_in ? tokenData.expires_in * 1000 : 3600000)
            };
            await this.context.secrets.store(SecureApiKeyService.AUTH_TOKEN_KEY, JSON.stringify(newToken));

            await this.storeApiKey(tokenData.access_token, 'oauth');

            if (tokenData.refresh_token) {
                await this.context.secrets.store(SecureApiKeyService.REFRESH_TOKEN_KEY, tokenData.refresh_token);
                this.log('Refresh token rotated');
            }

            this.log('Access token refreshed successfully');
            return tokenData.access_token;

        } catch (error) {
            this.logError('Token refresh error', error);
            return null;
        }
    }

    async deleteApiKey(): Promise<void> {
        await this.context.secrets.delete(SecureApiKeyService.API_KEY_KEY);
        await this.context.secrets.delete(SecureApiKeyService.API_KEY_RAW_KEY);
        await this.context.secrets.delete(SecureApiKeyService.AUTH_TOKEN_KEY);
        await this.context.secrets.delete(SecureApiKeyService.REFRESH_TOKEN_KEY);
        await this.context.secrets.delete(SecureApiKeyService.CREDENTIAL_TYPE_KEY);
        this.log('API key removed from secure storage');
    }

    private async storeApiKey(apiKey: string, type: CredentialType): Promise<void> {
        if (type === 'oauth') {
            await this.context.secrets.store(SecureApiKeyService.API_KEY_RAW_KEY, apiKey);
            await this.context.secrets.store(SecureApiKeyService.API_KEY_KEY, apiKey);
            await this.context.secrets.store(SecureApiKeyService.CREDENTIAL_TYPE_KEY, type);
            return;
        }

        await this.context.secrets.store(SecureApiKeyService.API_KEY_RAW_KEY, apiKey);
        await this.context.secrets.store(SecureApiKeyService.API_KEY_KEY, apiKey);
        await this.context.secrets.store(SecureApiKeyService.CREDENTIAL_TYPE_KEY, type);
    }

    private async migrateLegacySecrets(): Promise<void> {
        if (this.migrationCompleted) {
            return;
        }

        const hasSecureKey = await this.hasApiKey();
        if (hasSecureKey) {
            this.migrationCompleted = true;
            return;
        }

        const legacyApiKey = await this.context.secrets.get('lanonasis.apiKey');
        const legacyTokens = await this.context.secrets.get('lanonasis.tokens');

        if (legacyTokens) {
            try {
                const parsed = JSON.parse(legacyTokens) as { access_token?: string };
                if (parsed.access_token) {
                    await this.storeApiKey(parsed.access_token, 'oauth');
                    this.log('Migrated OAuth token from legacy storage');
                }
            } catch (error) {
                this.logError('Failed to migrate legacy tokens', error);
            }
        } else if (legacyApiKey) {
            await this.storeApiKey(legacyApiKey, 'apiKey');
            this.log('Migrated API key from legacy storage');
        }

        this.migrationCompleted = true;
    }

    private async exchangeCodeForToken(
        code: string,
        codeVerifier: string,
        redirectUri: string,
        authUrl: string
    ): Promise<{ access_token: string; refresh_token?: string }> {
        const tokenUrl = new URL('/oauth/token', authUrl);

        const body = new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: 'vscode-extension',
            code,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier
        });

        const response = await fetch(tokenUrl.toString(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            body: body.toString()
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Token exchange failed: ${response.status} ${errorText}`);
        }

        const tokenData = await response.json() as {
            access_token: string;
            refresh_token?: string;
            expires_in?: number;
        };

        const token = {
            access_token: tokenData.access_token,
            expires_at: Date.now() + (tokenData.expires_in ? tokenData.expires_in * 1000 : 3600000)
        };
        await this.context.secrets.store(SecureApiKeyService.AUTH_TOKEN_KEY, JSON.stringify(token));

        return {
            access_token: tokenData.access_token,
            refresh_token: tokenData.refresh_token
        };
    }

    private isTokenValid(token: { expires_at?: number }): boolean {
        if (!token.expires_at) return true;
        return Date.now() < token.expires_at - 60000;
    }

    private looksLikeJwt(value: string): boolean {
        const parts = value.split('.');
        if (parts.length !== 3) return false;
        const jwtSegment = /^[A-Za-z0-9-_]+$/;
        return parts.every(segment => jwtSegment.test(segment));
    }

    private generateCodeVerifier(): string {
        const bytes = this.getRandomBytes(32);
        return this.base64UrlEncode(bytes);
    }

    private async generateCodeChallenge(verifier: string): Promise<string> {
        const crypto = this.getWebCrypto();
        const data = new TextEncoder().encode(verifier);
        const digest = await crypto.subtle.digest('SHA-256', data);
        return this.base64UrlEncode(new Uint8Array(digest));
    }

    private generateState(): string {
        const bytes = this.getRandomBytes(16);
        return Array.from(bytes).map((byte) => byte.toString(16).padStart(2, '0')).join('');
    }

    private getWebCrypto(): Crypto {
        if (globalThis.crypto) {
            return globalThis.crypto;
        }

        throw new Error('WebCrypto is not available in this environment');
    }

    private getRandomBytes(length: number): Uint8Array {
        const crypto = this.getWebCrypto();
        const bytes = new Uint8Array(length);
        crypto.getRandomValues(bytes);
        return bytes;
    }

    private base64UrlEncode(bytes: Uint8Array): string {
        let base64: string;

        if (typeof Buffer !== 'undefined') {
            base64 = Buffer.from(bytes).toString('base64');
        } else {
            let binary = '';
            for (const byte of bytes) {
                binary += String.fromCharCode(byte);
            }
            base64 = btoa(binary);
        }

        return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }

    private getNodeHttp(): NodeHttp {
        const nodeRequire = this.getNodeRequire();
        return nodeRequire('http') as NodeHttp;
    }

    private getNodeRequire(): NodeRequire {
        if (typeof __non_webpack_require__ === 'function') {
            return __non_webpack_require__;
        }

        if (typeof require !== 'undefined') {
            return require;
        }

        if (typeof module !== 'undefined' && typeof module.require === 'function') {
            return module.require.bind(module) as NodeRequire;
        }

        throw new Error('Node require not available in this environment');
    }

    private log(message: string): void {
        const timestamp = new Date().toISOString();
        this.outputChannel.appendLine(`[${timestamp}] [SecureApiKeyService] ${message}`);
    }

    private logError(message: string, error: unknown): void {
        const errorMessage = error instanceof Error ? error.message : String(error);
        this.log(`${message}: ${errorMessage}`);
        console.error(message, error);
    }
}
