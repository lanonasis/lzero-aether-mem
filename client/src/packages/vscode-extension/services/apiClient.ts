export interface ApiClientConfig {
  baseUrl?: string;
  token?: string;
}

class ApiClient {
  private baseUrl: string;
  private token?: string;

  constructor(config: ApiClientConfig = {}) {
    this.baseUrl = config.baseUrl || '/api';
    this.token = config.token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  }

  async getMemories() {
    return this.request('/memories');
  }

  async searchMemories(query: string) {
    return this.request(`/memories/search?q=${encodeURIComponent(query)}`);
  }

  async createMemory(data: any) {
    return this.request('/memories', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateMemory(id: string, data: any) {
    return this.request(`/memories/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteMemory(id: string) {
    return this.request(`/memories/${id}`, { method: 'DELETE' });
  }

  async getApiKeys() {
    return this.request('/keys');
  }

  async generateApiKey(data: any) {
    return this.request('/keys/generate', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async rotateApiKey(id: string) {
    return this.request(`/keys/${id}/rotate`, { method: 'POST' });
  }

  async revokeApiKey(id: string) {
    return this.request(`/keys/${id}/revoke`, { method: 'POST' });
  }
}

export const apiClient = new ApiClient();
