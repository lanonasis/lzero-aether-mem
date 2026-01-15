import { Memory, CreateMemoryInput } from '../packages/shared/types';
import { createMemoryClient, MemoryClient } from '@lanonasis/memory-client';

export class MemoryService {
  private static memoryClient: MemoryClient | undefined;

  private static getClient(): MemoryClient {
    if (!MemoryService.memoryClient) {
      // Assuming VITE_API_URL, VITE_API_KEY, VITE_ORGANIZATION_ID are available
      // in the environment where this client-side code runs.
      // In a real application, these would be securely managed.
      const baseUrl = import.meta.env.VITE_API_URL || 'https://api.lanonasis.com/api/v1';
      const apiKey = import.meta.env.VITE_API_KEY;
      const organizationId = import.meta.env.VITE_ORGANIZATION_ID;

      if (!apiKey) {
        throw new Error("VITE_API_KEY is not defined. Cannot initialize MemoryService.");
      }

      MemoryService.memoryClient = createMemoryClient({
        baseUrl,
        apiKey,
        organizationId
      });
    }
    return MemoryService.memoryClient;
  }

  static async getMemories(userId: string): Promise<Memory[]> {
    const client = MemoryService.getClient();
    // The client might not need userId if API key/org ID is used for context
    // Adjust as per actual API design of @lanonasis/memory-client
    const response = await client.getMemories();
    if (response.success && response.data) {
      return response.data;
    }
    console.error("Failed to fetch memories:", response.error);
    return [];
  }

  static async searchMemories(
    userId: string,
    query: string
  ): Promise<Memory[]> {
    const client = MemoryService.getClient();
    const response = await client.searchMemories({ query });
    if (response.success && response.data) {
      return response.data;
    }
    console.error("Failed to search memories:", response.error);
    return [];
  }

  static async createMemory(userId: string, memoryInput: CreateMemoryInput): Promise<Memory> {
    const client = MemoryService.getClient();
    const response = await client.createMemory(memoryInput);
    if (response.success && response.data) {
      return response.data;
    }
    console.error("Failed to create memory:", response.error);
    throw new Error(response.error?.message || "Failed to create memory.");
  }

  static async updateMemory(
    userId: string,
    id: string,
    updates: Partial<Memory>
  ): Promise<Memory> {
    const client = MemoryService.getClient();
    const response = await client.updateMemory(id, updates);
    if (response.success && response.data) {
      return response.data;
    }
    console.error("Failed to update memory:", response.error);
    throw new Error(response.error?.message || "Failed to update memory.");
  }

  static async deleteMemory(userId: string, id: string): Promise<void> {
    const client = MemoryService.getClient();
    const response = await client.deleteMemory(id);
    if (!response.success) {
      console.error("Failed to delete memory:", response.error);
      throw new Error(response.error?.message || "Failed to delete memory.");
    }
  }
}
