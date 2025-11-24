export interface ApiKey {
  id: string;
  name: string;
  scope: string;
  lastUsed: string;
  token?: string;
}

export class ApiKeyService {
  static async getApiKeys(userId: string): Promise<ApiKey[]> {
    // API call would happen here
    return [];
  }

  static async generateApiKey(
    userId: string,
    name: string,
    scope: string
  ): Promise<ApiKey> {
    // API call would happen here
    return {
      id: `key-${Date.now()}`,
      name,
      scope,
      lastUsed: 'Never',
    };
  }

  static async rotateApiKey(userId: string, keyId: string): Promise<ApiKey> {
    // API call would happen here
    return {} as ApiKey;
  }

  static async revokeApiKey(userId: string, keyId: string): Promise<void> {
    // API call would happen here
  }
}
