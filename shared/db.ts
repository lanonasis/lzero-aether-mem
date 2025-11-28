import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "./schema";

neonConfig.webSocketConstructor = ws;

// Allow app to run without database for development/demo purposes
const connectionString = process.env.DATABASE_URL;

export const pool = connectionString ? new Pool({ connectionString }) : null;
export const db = pool ? drizzle({ client: pool, schema }) : null as any;
