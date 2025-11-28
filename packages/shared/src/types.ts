import { z } from "zod";

export const MemoryTypeSchema = z.enum(["code", "note", "idea", "reference"]);
export type MemoryType = z.infer<typeof MemoryTypeSchema>;

export const MemorySchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  content: z.string(),
  type: MemoryTypeSchema,
  tags: z.array(z.string()),
  embedding: z.array(z.number()).optional(),
  synced: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Memory = z.infer<typeof MemorySchema>;

export const CreateMemorySchema = MemorySchema.omit({
  id: true,
  userId: true,
  synced: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateMemory = z.infer<typeof CreateMemorySchema>;

export interface SearchResult {
  memory: Memory;
  similarity: number;
}

export interface AIModelInfo {
  name: string;
  size: string;
  embeddingDim: number;
  avgInferenceTime: string;
}
