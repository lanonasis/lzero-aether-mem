import type { Express, Request } from "express";
import { storage } from "../storage";
import { randomBytes } from "crypto";

export function registerKeyRoutes(app: Express) {
  // API Key Routes
  app.get("/auth/api-keys", async (req: Request, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });

      const keys = await storage.getApiKeys(userId);
      res.json(keys.map(k => ({ ...k, token: k.token.slice(0, 12) + "..." })));
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch keys" });
    }
  });

  app.post("/auth/api-keys", async (req: Request, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });

      const { name, environment, scope } = req.body;
      const token = `sk_${environment}_${randomBytes(32).toString("hex")}`;

      const key = await storage.createApiKey({
        name,
        token,
        environment,
        scope: scope || "read:write",
        userId,
      });

      res.status(201).json({ ...key, token });
    } catch (error) {
      res.status(400).json({ error: "Failed to generate key" });
    }
  });

  app.post("/auth/api-keys/:keyId/rotate", async (req: Request, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });

      const key = await storage.getApiKeyByToken(req.params.keyId);
      if (!key || key.userId !== userId) return res.status(404).json({ error: "Not found" });

      const rotated = await storage.rotateApiKey(key.id);
      res.json(rotated);
    } catch (error) {
      res.status(500).json({ error: "Failed to rotate key" });
    }
  });

  app.post("/auth/api-keys/:keyId/revoke", async (req: Request, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });

      const key = await storage.getApiKeyByToken(req.params.keyId);
      if (!key || key.userId !== userId) return res.status(404).json({ error: "Not found" });

      await storage.revokeApiKey(key.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to revoke key" });
    }
  });
}
