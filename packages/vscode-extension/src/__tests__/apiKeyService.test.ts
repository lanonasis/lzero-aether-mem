import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import * as vscode from 'vscode';
import { ApiKeyService } from '../services/ApiKeyService';
import type { ApiKey } from '../services/ApiKeyService';

vi.mock('vscode', () => ({
    workspace: {
        getConfiguration: vi.fn(() => ({
            get: (_key: string, defaultValue: unknown) => defaultValue,
        })),
    },
}));

const createApiKey = (overrides: Partial<ApiKey> = {}): ApiKey => ({
    id: 'key-1',
    name: 'Test Key',
    keyType: 'api_key',
    environment: 'development',
    accessLevel: 'team',
    projectId: 'proj-1',
    createdAt: new Date().toISOString(),
    tags: [],
    metadata: {},
    ...overrides,
});

describe('ApiKeyService', () => {
    beforeEach(() => {
        (vscode.workspace.getConfiguration as unknown as Mock).mockReturnValue({
            get: (_key: string, defaultValue: unknown) => defaultValue,
        });
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('fetches API keys with API key auth', async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ success: true, data: [createApiKey()] }),
        });
        vi.stubGlobal('fetch', fetchMock);

        const secureApiKeyService = {
            getStoredCredentials: vi.fn().mockResolvedValue({ type: 'apiKey', token: 'lano_test' }),
        };

        const service = new ApiKeyService(secureApiKeyService as any);
        const keys = await service.getApiKeys();

        expect(keys).toHaveLength(1);
        const [, init] = fetchMock.mock.calls[0];
        expect(init?.headers).toMatchObject({ 'X-API-Key': 'lano_test' });
    });

    it('uses OAuth introspection in testConnection', async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ active: true }),
        });
        vi.stubGlobal('fetch', fetchMock);

        const secureApiKeyService = {
            getStoredCredentials: vi.fn().mockResolvedValue({ type: 'oauth', token: 'oauth-token' }),
            getApiKeyOrPrompt: vi.fn(),
        };

        const service = new ApiKeyService(secureApiKeyService as any);
        const ok = await service.testConnection();

        expect(ok).toBe(true);
        const [url, init] = fetchMock.mock.calls[0];
        expect(url).toContain('/oauth/introspect');
        expect(init?.headers).toMatchObject({ Authorization: 'Bearer oauth-token' });
    });
});
