// Mock storage for demo purposes (no database required)
import type { Memory, ApiKey } from "../shared/schema";

const mockMemories: Memory[] = [
  {
    id: "1",
    userId: "dev-user-1",
    title: "OAuth2 PKCE Implementation Pattern",
    content: "Implementing OAuth2 with PKCE for secure authentication in SPAs. Key considerations: code_verifier generation, state parameter validation, token exchange flow.",
    type: "code",
    tags: ["authentication", "security", "oauth"],
    createdAt: new Date("2024-11-27"),
    updatedAt: new Date("2024-11-27"),
  },
  {
    id: "2",
    userId: "dev-user-1",
    title: "ARM Optimization Techniques for ML Models",
    content: "Leveraging ARM NEON instructions for faster inference. WebGPU acceleration on M1/M2/M3 chips. Quantization strategies for reduced memory footprint.",
    type: "docs",
    tags: ["arm", "optimization", "ml"],
    createdAt: new Date("2024-11-26"),
    updatedAt: new Date("2024-11-26"),
  },
  {
    id: "3",
    userId: "dev-user-1",
    title: "MCP Server Best Practices",
    content: "Model Context Protocol server implementation guidelines. Resource management, tool registration, and error handling patterns.",
    type: "workflow",
    tags: ["mcp", "architecture", "patterns"],
    createdAt: new Date("2024-11-25"),
    updatedAt: new Date("2024-11-25"),
  },
  {
    id: "4",
    userId: "dev-user-1",
    title: "Vector Search Similarity Threshold Tuning",
    content: "Optimal cosine similarity thresholds for semantic search: 0.7-0.8 for strict matches, 0.5-0.7 for exploratory search. Consider domain-specific calibration.",
    type: "docs",
    tags: ["vectors", "search", "tuning"],
    createdAt: new Date("2024-11-24"),
    updatedAt: new Date("2024-11-24"),
  },
  {
    id: "5",
    userId: "dev-user-1",
    title: "React 19 Server Components Migration",
    content: "Migration checklist: Update to React 19, refactor client components, implement server actions, optimize bundle size with selective hydration.",
    type: "todo",
    tags: ["react", "migration", "frontend"],
    createdAt: new Date("2024-11-23"),
    updatedAt: new Date("2024-11-23"),
  },
];

const mockApiKeys: ApiKey[] = [
  {
    id: "key-1",
    userId: "dev-user-1",
    name: "Development Key",
    token: "sk_development_demo123456789",
    scope: "read:write",
    environment: "development",
    createdAt: new Date("2024-11-20"),
    lastRotated: new Date("2024-11-20"),
    lastUsed: new Date(),
  },
];

export class MockStorage {
  async getMemories(userId: string): Promise<Memory[]> {
    return mockMemories.filter(m => m.userId === userId);
  }

  async getMemory(id: string): Promise<Memory | undefined> {
    return mockMemories.find(m => m.id === id);
  }

  async createMemory(memory: any): Promise<Memory> {
    const newMemory: Memory = {
      id: String(Date.now()),
      userId: memory.userId,
      title: memory.title,
      content: memory.content,
      type: memory.type || "docs",
      tags: memory.tags || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockMemories.unshift(newMemory);
    return newMemory;
  }

  async updateMemory(id: string, updates: any): Promise<Memory | undefined> {
    const index = mockMemories.findIndex(m => m.id === id);
    if (index === -1) return undefined;
    
    mockMemories[index] = {
      ...mockMemories[index],
      ...updates,
      updatedAt: new Date(),
    };
    return mockMemories[index];
  }

  async deleteMemory(id: string): Promise<boolean> {
    const index = mockMemories.findIndex(m => m.id === id);
    if (index === -1) return false;
    mockMemories.splice(index, 1);
    return true;
  }

  async searchMemories(userId: string, query: string): Promise<Memory[]> {
    const queryLower = query.toLowerCase();
    return mockMemories.filter(m => 
      m.userId === userId &&
      (m.title.toLowerCase().includes(queryLower) ||
       m.content.toLowerCase().includes(queryLower) ||
       m.tags?.some((tag: string) => tag.toLowerCase().includes(queryLower)))
    );
  }

  async getApiKeys(userId: string): Promise<ApiKey[]> {
    return mockApiKeys.filter(k => k.userId === userId);
  }

  async createApiKey(key: any): Promise<ApiKey> {
    const newKey: ApiKey = {
      id: String(Date.now()),
      userId: key.userId,
      name: key.name,
      token: key.token,
      scope: key.scope || "read:write",
      environment: key.environment || "development",
      createdAt: new Date(),
      lastRotated: new Date(),
      lastUsed: undefined,
    };
    mockApiKeys.push(newKey);
    return newKey;
  }

  async getApiKeyByToken(token: string): Promise<ApiKey | undefined> {
    return mockApiKeys.find(k => k.token === token);
  }

  async rotateApiKey(keyId: string): Promise<ApiKey | undefined> {
    const key = mockApiKeys.find(k => k.id === keyId);
    if (!key) return undefined;
    key.lastRotated = new Date();
    return key;
  }

  async revokeApiKey(keyId: string): Promise<boolean> {
    const index = mockApiKeys.findIndex(k => k.id === keyId);
    if (index === -1) return false;
    mockApiKeys.splice(index, 1);
    return true;
  }
}

export const mockStorage = new MockStorage();
