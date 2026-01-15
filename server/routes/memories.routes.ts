import type { Express, Request } from "express";
import { storage } from "../storage";
import { insertMemorySchema } from "../../shared/schema";

export function registerMemoryRoutes(app: Express) {
  // Memory Routes
  app.get("/api/memories", async (req: Request, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });

      const memories = await storage.getMemories(userId);
      res.json(memories);
    } catch (error) {
      console.error("Error fetching memories:", error);
      const message = error instanceof Error ? error.message : "Unknown error";
      res.status(500).json({ error: `Failed to fetch memories: ${message}` });
    }
  });

  app.get("/api/memories/search", async (req: Request, res) => {
    try {
      const userId = req.user?.id;
      const { q } = req.query;

      if (!userId) return res.status(401).json({ error: "Unauthorized" });
      if (!q || typeof q !== "string") return res.status(400).json({ error: "Missing query" });

      const results = await storage.searchMemories(userId, q);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Search failed" });
    }
  });

  app.post("/api/memories", async (req: Request, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });

      const validated = insertMemorySchema.parse(req.body);
      const memory = await storage.createMemory({ ...validated, userId });
      res.status(201).json(memory);
    } catch (error) {
      res.status(400).json({ error: "Invalid memory data" });
    }
  });

  app.patch("/api/memories/:id", async (req: Request, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });

      const memory = await storage.getMemory(req.params.id);
      if (!memory || memory.userId !== userId) return res.status(404).json({ error: "Not found" });

      const validated = insertMemorySchema.partial().parse(req.body);
      const updated = await storage.updateMemory(req.params.id, validated);
      res.json(updated);
    } catch (error) {
      res.status(400).json({ error: "Invalid update data" });
    }
  });

  app.delete("/api/memories/:id", async (req: Request, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });

      const memory = await storage.getMemory(req.params.id);
      if (!memory || memory.userId !== userId) return res.status(404).json({ error: "Not found" });

      await storage.deleteMemory(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete memory" });
    }
  });
}
