import type { Memory, CreateMemory, SearchResult } from "./types";

export class LanonasisClient {
  private apiUrl: string;
  private apiKey?: string;

  constructor(config: { apiUrl: string; apiKey?: string }) {
    this.apiUrl = config.apiUrl;
    this.apiKey = config.apiKey;
  }

  async getMemories(): Promise<Memory[]> {
    const response = await fetch(`${this.apiUrl}/memories`, {
      headers: this.getHeaders(),
    });
    return response.json();
  }

  async createMemory(memory: CreateMemory): Promise<Memory> {
    const response = await fetch(`${this.apiUrl}/memories`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(memory),
    });
    return response.json();
  }

  async searchMemories(query: string): Promise<SearchResult[]> {
    const response = await fetch(`${this.apiUrl}/search`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ query }),
    });
    return response.json();
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (this.apiKey) {
      headers["Authorization"] = `Bearer ${this.apiKey}`;
    }
    return headers;
  }
}
