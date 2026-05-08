# ADR-005: PostgreSQL + Drizzle ORM

Status: Accepted | Date: 2025-12-19

## Context

The backend needs a relational database for users, memories, and API keys. Future features require vector similarity search (pgvector). The ORM should be type-safe and schema-driven.

## Decision

Use PostgreSQL with Drizzle ORM and `drizzle-zod` for schema validation.

## Alternatives Considered

1. **SQLite (local file)** - Rejected: Not suitable for concurrent multi-user cloud sync; no vector extension.
2. **MongoDB** - Rejected: No native vector search support at decision time; schema-less adds complexity for structured memory data.
3. **Supabase (managed Postgres)** - Considered but not primary: Used for vector search in some SDK features, but self-hosted PostgreSQL chosen for backend to avoid vendor lock-in.
4. **PostgreSQL + Drizzle ORM** - Accepted: Native pgvector support, type-safe schema definitions, Zod integration for runtime validation, excellent TypeScript support.

## Consequences

**Positive:**
- `pgvector` extension enables vector similarity search for embeddings
- Drizzle ORM generates type-safe queries from schema definitions
- `drizzle-zod` provides automatic runtime validation of inserts/updates
- `@neondatabase/serverless` allows edge-compatible PostgreSQL connections
- Schema migrations managed via `drizzle.config.ts`

**Negative:**
- Requires PostgreSQL instance (Neon, local, or managed)
- Schema changes require migration generation and application
- More operational complexity than SQLite

## Schema Overview

Defined in `shared/schema.ts`:
- `users` - Authentication records
- `memories` - Core memory storage with tags and type enum
- `api_keys` - Scoped API tokens with rotation tracking

## Key Files

- `shared/schema.ts` - Source of truth for all tables
- `drizzle.config.ts` - Migration configuration
- `server/db.ts` - Connection initialization
- `server/storage.ts` - Query abstraction layer
