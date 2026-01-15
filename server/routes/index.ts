import type { Express } from "express";
import { createServer, type Server } from "http";
import { registerMemoryRoutes } from "./memories.routes";
import { registerKeyRoutes } from "./keys.routes";

declare global {
  namespace Express {
    interface User {
      id: string;
    }
    interface Request {
      user?: Express.User;
    }
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  registerMemoryRoutes(app);
  registerKeyRoutes(app);

  return httpServer;
}
