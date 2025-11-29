/**
 * Memory Intelligence MCP Server
 * AI-powered analytics and insights for LanOnasis Memory-as-a-Service
 * 
 * Provides intelligent features on top of existing memory infrastructure:
 * - Pattern analysis
 * - Smart tagging suggestions
 * - Duplicate detection
 * - Topic clustering
 * - Insight extraction
 * - Memory health monitoring
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express from "express";
import { z } from "zod";
import OpenAI from "openai";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment
dotenv.config();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Supabase client
const supabase: SupabaseClient = createClient(
  process.env.ONASIS_SUPABASE_URL!,
  process.env.ONASIS_SUPABASE_SERVICE_KEY!
);

// Response format enum
const ResponseFormat = {
  JSON: "json",
  MARKDOWN: "markdown",
} as const;

type ResponseFormatType = (typeof ResponseFormat)[keyof typeof ResponseFormat];

// Memory type enum
const MemoryType = z.enum([
  "context",
  "project", 
  "knowledge",
  "reference",
  "personal",
  "workflow",
]);

// Character limit for responses
const CHARACTER_LIMIT = 50000;

// Initialize MCP Server with modern patterns
const server = new McpServer({
  name: "memory-intelligence-mcp-server",
  version: "1.0.0",
});

// =============================================================================
// SHARED UTILITIES
// =============================================================================

/**
 * Generate embedding for text using OpenAI
 */
async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
    encoding_format: "float",
  });
  return response.data[0].embedding;
}

/**
 * Calculate cosine similarity between two vectors
 */
function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Format response based on requested format
 */
function formatResponse<T>(
  data: T,
  format: ResponseFormatType,
  markdownFormatter: (data: T) => string
): string {
  if (format === ResponseFormat.JSON) {
    return JSON.stringify(data, null, 2);
  }
  return markdownFormatter(data);
}

/**
 * Truncate response if too long
 */
function truncateIfNeeded(text: string): string {
  if (text.length > CHARACTER_LIMIT) {
    return (
      text.substring(0, CHARACTER_LIMIT) +
      `\n\n... (truncated, ${text.length - CHARACTER_LIMIT} characters omitted)`
    );
  }
  return text;
}

/**
 * Query memories from Supabase
 */
async function queryMemories(
  userId: string,
  options: {
    type?: string;
    limit?: number;
    offset?: number;
    includeEmbeddings?: boolean;
  } = {}
): Promise<any[]> {
  const { type, limit = 100, offset = 0, includeEmbeddings = false } = options;

  let query = supabase
    .from("memory_entries")
    .select(includeEmbeddings ? "*" : "id, title, content, type, tags, metadata, created_at, updated_at")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (type) {
    query = query.eq("type", type);
  }

  const { data, error } = await query;
  if (error) throw new Error(`Database query failed: ${error.message}`);
  return data || [];
}

// =============================================================================
// TOOL 1: ANALYZE MEMORY PATTERNS
// =============================================================================

const AnalyzePatternsSchema = z.object({
  user_id: z.string().uuid().describe("User ID to analyze patterns for"),
  time_range_days: z
    .number()
    .int()
    .min(1)
    .max(365)
    .default(30)
    .describe("Number of days to analyze (default: 30)"),
  response_format: z
    .enum([ResponseFormat.JSON, ResponseFormat.MARKDOWN])
    .default(ResponseFormat.MARKDOWN)
    .describe("Output format: 'markdown' for human-readable or 'json' for machine-readable"),
}).strict();


interface PatternAnalysis {
  total_memories: number;
  memories_by_type: Record<string, number>;
  memories_by_day_of_week: Record<string, number>;
  peak_creation_hours: number[];
  average_content_length: number;
  most_common_tags: Array<{ tag: string; count: number }>;
  creation_velocity: {
    daily_average: number;
    trend: "increasing" | "stable" | "decreasing";
  };
  insights: string[];
}

server.registerTool(
  "memory_analyze_patterns",
  {
    title: "Analyze Memory Patterns",
    description: `Analyze usage patterns and trends in the user's memory collection.

This tool examines memory creation patterns, type distribution, temporal trends, and tag usage to provide actionable insights about how the user is organizing their knowledge.

Args:
  - user_id (string): UUID of the user to analyze
  - time_range_days (number): Days to analyze, 1-365 (default: 30)
  - response_format ('markdown' | 'json'): Output format (default: 'markdown')

Returns:
  Pattern analysis including:
  - Memory distribution by type and time
  - Peak activity periods
  - Tag frequency analysis
  - Creation velocity trends
  - AI-generated insights

Examples:
  - "Analyze my memory usage patterns" -> { user_id: "...", time_range_days: 30 }
  - "Show my memory trends for the last week" -> { user_id: "...", time_range_days: 7 }`,
    inputSchema: AnalyzePatternsSchema,
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  },
  async (rawParams) => {
    try {
      // Parse input to apply Zod defaults
      const params = AnalyzePatternsSchema.parse(rawParams);
      
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - params.time_range_days);

      const { data: memories, error } = await supabase
        .from("memory_entries")
        .select("id, title, content, type, tags, created_at, updated_at")
        .eq("user_id", params.user_id)
        .gte("created_at", cutoffDate.toISOString())
        .order("created_at", { ascending: true });

      if (error) throw new Error(`Failed to fetch memories: ${error.message}`);

      if (!memories || memories.length === 0) {
        return {
          content: [
            {
              type: "text" as const,
              text: `No memories found for user in the last ${params.time_range_days} days.`,
            },
          ],
        };
      }

      // Analyze patterns
      const memoriesByType: Record<string, number> = {};
      const memoriesByDayOfWeek: Record<string, number> = {
        Sunday: 0,
        Monday: 0,
        Tuesday: 0,
        Wednesday: 0,
        Thursday: 0,
        Friday: 0,
        Saturday: 0,
      };
      const memoriesByHour: Record<number, number> = {};
      const tagCounts: Record<string, number> = {};
      let totalContentLength = 0;
      const dailyCounts: Record<string, number> = {};

      const dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      for (const memory of memories) {
        // Type distribution
        memoriesByType[memory.type] = (memoriesByType[memory.type] || 0) + 1;

        // Day of week distribution
        const createdDate = new Date(memory.created_at);
        const dayName = dayNames[createdDate.getUTCDay()];
        memoriesByDayOfWeek[dayName]++;

        // Hour distribution
        const hour = createdDate.getUTCHours();
        memoriesByHour[hour] = (memoriesByHour[hour] || 0) + 1;

        // Tag frequency
        if (memory.tags && Array.isArray(memory.tags)) {
          for (const tag of memory.tags) {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
          }
        }

        // Content length
        totalContentLength += memory.content.length;

        // Daily counts for velocity
        const dateKey = createdDate.toISOString().split("T")[0];
        dailyCounts[dateKey] = (dailyCounts[dateKey] || 0) + 1;
      }

      // Find peak hours
      const peakHours = Object.entries(memoriesByHour)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([hour]) => parseInt(hour));

      // Get most common tags
      const mostCommonTags = Object.entries(tagCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([tag, count]) => ({ tag, count }));

      // Calculate velocity trend
      const dailyValues = Object.values(dailyCounts);
      const dailyAverage = memories.length / params.time_range_days;
      let trend: "increasing" | "stable" | "decreasing" = "stable";

      if (dailyValues.length >= 7) {
        const firstHalf = dailyValues.slice(0, Math.floor(dailyValues.length / 2));
        const secondHalf = dailyValues.slice(Math.floor(dailyValues.length / 2));
        const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
        const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
        const change = ((secondAvg - firstAvg) / firstAvg) * 100;

        if (change > 20) trend = "increasing";
        else if (change < -20) trend = "decreasing";
      }

      // Generate insights using AI
      const insightPrompt = `Analyze these memory usage patterns and provide 3-5 actionable insights:
- Total memories: ${memories.length}
- Most used type: ${Object.entries(memoriesByType).sort((a, b) => b[1] - a[1])[0]?.[0] || "none"}
- Peak day: ${Object.entries(memoriesByDayOfWeek).sort((a, b) => b[1] - a[1])[0]?.[0] || "none"}
- Peak hours: ${peakHours.join(", ")} UTC
- Top tags: ${mostCommonTags.slice(0, 5).map((t) => t.tag).join(", ")}
- Daily average: ${dailyAverage.toFixed(2)} memories
- Trend: ${trend}
- Average content length: ${Math.round(totalContentLength / memories.length)} characters

Provide brief, actionable insights about productivity patterns, knowledge organization, and suggestions for improvement.`;

      const insightResponse = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: insightPrompt }],
        max_tokens: 500,
      });

      const insights = insightResponse.choices[0].message.content
        ?.split("\n")
        .filter((line) => line.trim().length > 0) || [];

      const analysis: PatternAnalysis = {
        total_memories: memories.length,
        memories_by_type: memoriesByType,
        memories_by_day_of_week: memoriesByDayOfWeek,
        peak_creation_hours: peakHours,
        average_content_length: Math.round(totalContentLength / memories.length),
        most_common_tags: mostCommonTags,
        creation_velocity: {
          daily_average: parseFloat(dailyAverage.toFixed(2)),
          trend,
        },
        insights,
      };

      const responseText = formatResponse(
        analysis,
        params.response_format,
        (data) => {
          let md = `# Memory Pattern Analysis\n\n`;
          md += `**Time Range:** Last ${params.time_range_days} days\n`;
          md += `**Total Memories:** ${data.total_memories}\n\n`;

          md += `## Distribution by Type\n`;
          for (const [type, count] of Object.entries(data.memories_by_type)) {
            const percentage = ((count / data.total_memories) * 100).toFixed(1);
            md += `- **${type}**: ${count} (${percentage}%)\n`;
          }

          md += `\n## Activity Patterns\n`;
          md += `- **Peak Hours (UTC):** ${data.peak_creation_hours.join(", ")}\n`;
          md += `- **Daily Average:** ${data.creation_velocity.daily_average} memories/day\n`;
          md += `- **Trend:** ${data.creation_velocity.trend}\n`;
          md += `- **Average Content Length:** ${data.average_content_length} characters\n`;

          md += `\n## Top Tags\n`;
          for (const { tag, count } of data.most_common_tags.slice(0, 5)) {
            md += `- **${tag}**: ${count} uses\n`;
          }

          md += `\n## AI Insights\n`;
          for (const insight of data.insights) {
            md += `${insight}\n`;
          }

          return md;
        }
      );

      return {
        content: [{ type: "text" as const, text: truncateIfNeeded(responseText) }],
        
      };
    } catch (error) {
      return {
        isError: true,
        content: [
          {
            type: "text" as const,
            text: `Error analyzing patterns: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
      };
    }
  }
);

// =============================================================================
// TOOL 2: SUGGEST TAGS
// =============================================================================

const SuggestTagsSchema = z.object({
  memory_id: z.string().uuid().describe("Memory ID to generate tag suggestions for"),
  user_id: z.string().uuid().describe("User ID who owns the memory"),
  max_suggestions: z
    .number()
    .int()
    .min(1)
    .max(20)
    .default(5)
    .describe("Maximum number of tag suggestions (default: 5)"),
  include_existing_tags: z
    .boolean()
    .default(true)
    .describe("Include analysis of existing user tags (default: true)"),
  response_format: z
    .enum([ResponseFormat.JSON, ResponseFormat.MARKDOWN])
    .default(ResponseFormat.MARKDOWN)
    .describe("Output format"),
}).strict();


interface TagSuggestion {
  tag: string;
  confidence: number;
  reason: string;
}

interface TagSuggestionsResult {
  memory_id: string;
  current_tags: string[];
  suggestions: TagSuggestion[];
  user_tag_context: string[];
}

server.registerTool(
  "memory_suggest_tags",
  {
    title: "Suggest Tags for Memory",
    description: `AI-powered tag suggestions for a memory based on its content and the user's existing tagging patterns.

Analyzes memory content and compares against the user's tag vocabulary to suggest relevant, consistent tags.

Args:
  - memory_id (string): UUID of the memory to analyze
  - user_id (string): UUID of the memory owner
  - max_suggestions (number): Max suggestions, 1-20 (default: 5)
  - include_existing_tags (boolean): Analyze user's tag history (default: true)
  - response_format ('markdown' | 'json'): Output format

Returns:
  Tag suggestions with confidence scores and reasoning.

Examples:
  - "Suggest tags for this memory" -> { memory_id: "...", user_id: "..." }
  - "What tags should I add?" -> { memory_id: "...", user_id: "...", max_suggestions: 10 }`,
    inputSchema: SuggestTagsSchema,
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: false, // AI results may vary
      openWorldHint: true,
    },
  },
  async (rawParams) => {
    try {
      // Parse input to apply Zod defaults
      const params = SuggestTagsSchema.parse(rawParams);
      
      // Fetch the specific memory
      const { data: memory, error: memoryError } = await supabase
        .from("memory_entries")
        .select("id, title, content, type, tags")
        .eq("id", params.memory_id)
        .eq("user_id", params.user_id)
        .single();

      if (memoryError || !memory) {
        throw new Error("Memory not found or access denied");
      }

      // Get user's existing tags for context
      let userTags: string[] = [];
      if (params.include_existing_tags) {
        const { data: allMemories } = await supabase
          .from("memory_entries")
          .select("tags")
          .eq("user_id", params.user_id)
          .not("tags", "is", null);

        if (allMemories) {
          const tagSet = new Set<string>();
          for (const mem of allMemories) {
            if (Array.isArray(mem.tags)) {
              mem.tags.forEach((tag: string) => tagSet.add(tag));
            }
          }
          userTags = Array.from(tagSet);
        }
      }

      // Generate tag suggestions using AI
      const prompt = `Analyze this memory and suggest appropriate tags.

Memory Title: ${memory.title}
Memory Type: ${memory.type}
Memory Content: ${memory.content.substring(0, 2000)}
Current Tags: ${(memory.tags || []).join(", ") || "none"}
${userTags.length > 0 ? `User's Existing Tag Vocabulary: ${userTags.slice(0, 50).join(", ")}` : ""}

Provide ${params.max_suggestions} tag suggestions. For each tag:
1. Use snake_case format
2. Prefer existing tags from user's vocabulary when relevant
3. Keep tags concise (1-3 words)
4. Consider the memory type and content theme

Return a JSON array with objects containing: tag, confidence (0-1), reason
Example: [{"tag": "machine_learning", "confidence": 0.95, "reason": "Content discusses ML concepts"}]`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        max_tokens: 800,
      });

      const aiResponse = JSON.parse(response.choices[0].message.content || "{}");
      const suggestions: TagSuggestion[] = (aiResponse.suggestions || aiResponse || [])
        .slice(0, params.max_suggestions)
        .map((s: any) => ({
          tag: String(s.tag).toLowerCase().replace(/\s+/g, "_"),
          confidence: parseFloat(s.confidence) || 0.5,
          reason: String(s.reason || "AI suggestion"),
        }));

      const result: TagSuggestionsResult = {
        memory_id: params.memory_id,
        current_tags: memory.tags || [],
        suggestions,
        user_tag_context: userTags.slice(0, 20),
      };

      const responseText = formatResponse(
        result,
        params.response_format,
        (data) => {
          let md = `# Tag Suggestions for Memory\n\n`;
          md += `**Memory ID:** ${data.memory_id}\n`;
          md += `**Current Tags:** ${data.current_tags.join(", ") || "none"}\n\n`;

          md += `## Suggested Tags\n`;
          for (const suggestion of data.suggestions) {
            const confidenceBar = "█".repeat(Math.round(suggestion.confidence * 10));
            const emptyBar = "░".repeat(10 - Math.round(suggestion.confidence * 10));
            md += `\n### \`${suggestion.tag}\`\n`;
            md += `**Confidence:** ${confidenceBar}${emptyBar} ${(suggestion.confidence * 100).toFixed(0)}%\n`;
            md += `**Reason:** ${suggestion.reason}\n`;
          }

          if (data.user_tag_context.length > 0) {
            md += `\n## Your Tag Vocabulary\n`;
            md += `Tags you've used: ${data.user_tag_context.join(", ")}\n`;
          }

          return md;
        }
      );

      return {
        content: [{ type: "text" as const, text: truncateIfNeeded(responseText) }],
        
      };
    } catch (error) {
      return {
        isError: true,
        content: [
          {
            type: "text" as const,
            text: `Error suggesting tags: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
      };
    }
  }
);

// =============================================================================
// TOOL 3: FIND RELATED MEMORIES
// =============================================================================

const FindRelatedSchema = z.object({
  memory_id: z.string().uuid().describe("Memory ID to find related memories for"),
  user_id: z.string().uuid().describe("User ID who owns the memories"),
  limit: z.number().int().min(1).max(50).default(10).describe("Maximum related memories to return"),
  similarity_threshold: z
    .number()
    .min(0)
    .max(1)
    .default(0.7)
    .describe("Minimum similarity score (0-1, default: 0.7)"),
  response_format: z
    .enum([ResponseFormat.JSON, ResponseFormat.MARKDOWN])
    .default(ResponseFormat.MARKDOWN)
    .describe("Output format"),
}).strict();


interface RelatedMemory {
  id: string;
  title: string;
  type: string;
  similarity_score: number;
  shared_tags: string[];
  snippet: string;
}

interface RelatedMemoriesResult {
  source_memory_id: string;
  source_title: string;
  related_memories: RelatedMemory[];
  total_found: number;
}

server.registerTool(
  "memory_find_related",
  {
    title: "Find Related Memories",
    description: `Find semantically related memories using vector similarity search.

Analyzes the source memory's content and finds other memories with similar themes, topics, or concepts.

Args:
  - memory_id (string): UUID of the source memory
  - user_id (string): UUID of the memory owner
  - limit (number): Max related memories, 1-50 (default: 10)
  - similarity_threshold (number): Min similarity score, 0-1 (default: 0.7)
  - response_format ('markdown' | 'json'): Output format

Returns:
  List of related memories with similarity scores and shared context.

Examples:
  - "Find memories related to this one" -> { memory_id: "...", user_id: "..." }
  - "What other memories are similar?" -> { memory_id: "...", user_id: "...", similarity_threshold: 0.8 }`,
    inputSchema: FindRelatedSchema,
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  },
  async (rawParams) => {
    try {
      // Parse input to apply Zod defaults
      const params = FindRelatedSchema.parse(rawParams);
      
      // Fetch source memory with embedding
      const { data: sourceMemory, error: sourceError } = await supabase
        .from("memory_entries")
        .select("id, title, content, type, tags, embedding")
        .eq("id", params.memory_id)
        .eq("user_id", params.user_id)
        .single();

      if (sourceError || !sourceMemory) {
        throw new Error("Source memory not found or access denied");
      }

      // Generate embedding if not exists
      let queryEmbedding = sourceMemory.embedding;
      if (!queryEmbedding) {
        queryEmbedding = await generateEmbedding(`${sourceMemory.title} ${sourceMemory.content}`);
      }

      // Perform vector search
      const { data: relatedData, error: searchError } = await supabase.rpc("match_memories", {
        query_embedding: queryEmbedding,
        match_threshold: params.similarity_threshold,
        match_count: params.limit + 1, // +1 to exclude self
        filter_user_id: params.user_id,
      });

      if (searchError) {
        throw new Error(`Vector search failed: ${searchError.message}`);
      }

      // Filter out self and format results
      const relatedMemories: RelatedMemory[] = (relatedData || [])
        .filter((item: any) => item.id !== params.memory_id)
        .slice(0, params.limit)
        .map((item: any) => {
          const sharedTags = (sourceMemory.tags || []).filter((tag: string) =>
            (item.tags || []).includes(tag)
          );

          return {
            id: item.id,
            title: item.title,
            type: item.type,
            similarity_score: parseFloat((item.similarity || 0).toFixed(4)),
            shared_tags: sharedTags,
            snippet: item.content.substring(0, 200) + (item.content.length > 200 ? "..." : ""),
          };
        });

      const result: RelatedMemoriesResult = {
        source_memory_id: params.memory_id,
        source_title: sourceMemory.title,
        related_memories: relatedMemories,
        total_found: relatedMemories.length,
      };

      const responseText = formatResponse(
        result,
        params.response_format,
        (data) => {
          let md = `# Related Memories\n\n`;
          md += `**Source:** ${data.source_title}\n`;
          md += `**Found:** ${data.total_found} related memories\n\n`;

          if (data.related_memories.length === 0) {
            md += `_No related memories found above similarity threshold._\n`;
          } else {
            for (const mem of data.related_memories) {
              const scoreBar = "█".repeat(Math.round(mem.similarity_score * 10));
              const emptyBar = "░".repeat(10 - Math.round(mem.similarity_score * 10));

              md += `## ${mem.title}\n`;
              md += `**ID:** ${mem.id}\n`;
              md += `**Type:** ${mem.type}\n`;
              md += `**Similarity:** ${scoreBar}${emptyBar} ${(mem.similarity_score * 100).toFixed(1)}%\n`;
              if (mem.shared_tags.length > 0) {
                md += `**Shared Tags:** ${mem.shared_tags.join(", ")}\n`;
              }
              md += `**Preview:** ${mem.snippet}\n\n`;
            }
          }

          return md;
        }
      );

      return {
        content: [{ type: "text" as const, text: truncateIfNeeded(responseText) }],
        
      };
    } catch (error) {
      return {
        isError: true,
        content: [
          {
            type: "text" as const,
            text: `Error finding related memories: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
      };
    }
  }
);

// =============================================================================
// TOOL 4: DETECT DUPLICATES
// =============================================================================

const DetectDuplicatesSchema = z.object({
  user_id: z.string().uuid().describe("User ID to check for duplicates"),
  similarity_threshold: z
    .number()
    .min(0.8)
    .max(0.99)
    .default(0.9)
    .describe("Minimum similarity to consider duplicate (default: 0.9)"),
  max_pairs: z
    .number()
    .int()
    .min(1)
    .max(100)
    .default(20)
    .describe("Maximum duplicate pairs to return"),
  response_format: z
    .enum([ResponseFormat.JSON, ResponseFormat.MARKDOWN])
    .default(ResponseFormat.MARKDOWN)
    .describe("Output format"),
}).strict();


interface DuplicatePair {
  memory_1: { id: string; title: string; created_at: string };
  memory_2: { id: string; title: string; created_at: string };
  similarity_score: number;
  recommendation: "keep_newer" | "keep_older" | "merge" | "review";
}

interface DuplicatesResult {
  total_memories_scanned: number;
  duplicate_pairs_found: number;
  potential_duplicates: DuplicatePair[];
  storage_savings_estimate: string;
}

server.registerTool(
  "memory_detect_duplicates",
  {
    title: "Detect Duplicate Memories",
    description: `Find potential duplicate memories in the user's collection.

Compares all memories using semantic similarity to identify duplicates or near-duplicates that may represent redundant information.

Args:
  - user_id (string): UUID of the user
  - similarity_threshold (number): Min similarity for duplicate, 0.8-0.99 (default: 0.9)
  - max_pairs (number): Max duplicate pairs to return, 1-100 (default: 20)
  - response_format ('markdown' | 'json'): Output format

Returns:
  List of potential duplicate pairs with recommendations.

Examples:
  - "Find duplicate memories" -> { user_id: "..." }
  - "Check for redundant knowledge" -> { user_id: "...", similarity_threshold: 0.95 }`,
    inputSchema: DetectDuplicatesSchema,
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  },
  async (rawParams) => {
    try {
      // Parse input to apply Zod defaults
      const params = DetectDuplicatesSchema.parse(rawParams);
      
      // Fetch all memories with embeddings
      const { data: memories, error } = await supabase
        .from("memory_entries")
        .select("id, title, content, embedding, created_at")
        .eq("user_id", params.user_id)
        .not("embedding", "is", null)
        .order("created_at", { ascending: false })
        .limit(500); // Limit for performance

      if (error) throw new Error(`Failed to fetch memories: ${error.message}`);

      if (!memories || memories.length < 2) {
        return {
          content: [
            {
              type: "text" as const,
              text: "Not enough memories with embeddings to detect duplicates. Ensure memories have vector embeddings.",
            },
          ],
        };
      }

      // Compare embeddings to find duplicates
      const duplicates: DuplicatePair[] = [];
      const compared = new Set<string>();

      for (let i = 0; i < memories.length && duplicates.length < params.max_pairs; i++) {
        for (let j = i + 1; j < memories.length && duplicates.length < params.max_pairs; j++) {
          const pairKey = `${memories[i].id}-${memories[j].id}`;
          if (compared.has(pairKey)) continue;
          compared.add(pairKey);

          const similarity = cosineSimilarity(memories[i].embedding, memories[j].embedding);

          if (similarity >= params.similarity_threshold) {
            const date1 = new Date(memories[i].created_at);
            const date2 = new Date(memories[j].created_at);
            const isNewer = date1 > date2;

            let recommendation: DuplicatePair["recommendation"] = "review";
            if (similarity >= 0.98) {
              recommendation = isNewer ? "keep_newer" : "keep_older";
            } else if (similarity >= 0.95) {
              recommendation = "merge";
            }

            duplicates.push({
              memory_1: {
                id: memories[i].id,
                title: memories[i].title,
                created_at: memories[i].created_at,
              },
              memory_2: {
                id: memories[j].id,
                title: memories[j].title,
                created_at: memories[j].created_at,
              },
              similarity_score: parseFloat(similarity.toFixed(4)),
              recommendation,
            });
          }
        }
      }

      // Estimate storage savings (rough estimate)
      const avgMemorySize = memories.reduce((sum, m) => sum + m.content.length, 0) / memories.length;
      const potentialSavings = duplicates.length * avgMemorySize;
      const savingsStr =
        potentialSavings > 1024 * 1024
          ? `${(potentialSavings / (1024 * 1024)).toFixed(2)} MB`
          : `${(potentialSavings / 1024).toFixed(2)} KB`;

      const result: DuplicatesResult = {
        total_memories_scanned: memories.length,
        duplicate_pairs_found: duplicates.length,
        potential_duplicates: duplicates,
        storage_savings_estimate: savingsStr,
      };

      const responseText = formatResponse(
        result,
        params.response_format,
        (data) => {
          let md = `# Duplicate Memory Detection\n\n`;
          md += `**Memories Scanned:** ${data.total_memories_scanned}\n`;
          md += `**Duplicate Pairs Found:** ${data.duplicate_pairs_found}\n`;
          md += `**Potential Storage Savings:** ${data.storage_savings_estimate}\n\n`;

          if (data.potential_duplicates.length === 0) {
            md += `✅ No duplicates found above ${params.similarity_threshold * 100}% similarity.\n`;
          } else {
            md += `## Potential Duplicates\n\n`;

            for (const pair of data.potential_duplicates) {
              md += `### Similarity: ${(pair.similarity_score * 100).toFixed(1)}%\n`;
              md += `**Memory 1:** ${pair.memory_1.title}\n`;
              md += `  - ID: ${pair.memory_1.id}\n`;
              md += `  - Created: ${new Date(pair.memory_1.created_at).toLocaleDateString()}\n`;
              md += `**Memory 2:** ${pair.memory_2.title}\n`;
              md += `  - ID: ${pair.memory_2.id}\n`;
              md += `  - Created: ${new Date(pair.memory_2.created_at).toLocaleDateString()}\n`;
              md += `**Recommendation:** ${pair.recommendation.replace(/_/g, " ")}\n\n`;
            }
          }

          return md;
        }
      );

      return {
        content: [{ type: "text" as const, text: truncateIfNeeded(responseText) }],
        
      };
    } catch (error) {
      return {
        isError: true,
        content: [
          {
            type: "text" as const,
            text: `Error detecting duplicates: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
      };
    }
  }
);

// =============================================================================
// TOOL 5: EXTRACT INSIGHTS
// =============================================================================

const ExtractInsightsSchema = z.object({
  user_id: z.string().uuid().describe("User ID to extract insights from"),
  topic: z.string().min(1).max(200).optional().describe("Specific topic to focus on (optional)"),
  memory_type: MemoryType.optional().describe("Filter by memory type (optional)"),
  max_memories: z
    .number()
    .int()
    .min(5)
    .max(100)
    .default(20)
    .describe("Maximum memories to analyze"),
  response_format: z
    .enum([ResponseFormat.JSON, ResponseFormat.MARKDOWN])
    .default(ResponseFormat.MARKDOWN)
    .describe("Output format"),
}).strict();


interface ExtractedInsight {
  insight: string;
  supporting_memories: string[];
  confidence: number;
  category: "pattern" | "learning" | "opportunity" | "risk" | "action_item";
}

interface InsightsResult {
  memories_analyzed: number;
  topic_focus: string | null;
  insights: ExtractedInsight[];
  summary: string;
}

server.registerTool(
  "memory_extract_insights",
  {
    title: "Extract Insights from Memories",
    description: `Use AI to extract key insights, patterns, and actionable items from a collection of memories.

Analyzes multiple memories to identify themes, patterns, learnings, opportunities, and risks.

Args:
  - user_id (string): UUID of the user
  - topic (string): Optional topic to focus analysis on
  - memory_type (string): Optional filter by memory type
  - max_memories (number): Max memories to analyze, 5-100 (default: 20)
  - response_format ('markdown' | 'json'): Output format

Returns:
  Structured insights with supporting evidence and confidence scores.

Examples:
  - "What insights can you extract from my memories?" -> { user_id: "..." }
  - "Analyze my project memories for patterns" -> { user_id: "...", memory_type: "project" }
  - "Extract learnings about machine learning" -> { user_id: "...", topic: "machine learning" }`,
    inputSchema: ExtractInsightsSchema,
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: false, // AI results may vary
      openWorldHint: true,
    },
  },
  async (rawParams) => {
    try {
      // Parse input to apply Zod defaults
      const params = ExtractInsightsSchema.parse(rawParams);
      
      let memories: any[] = [];

      if (params.topic) {
        // Use semantic search for topic-specific analysis
        const topicEmbedding = await generateEmbedding(params.topic);
        const { data, error } = await supabase.rpc("match_memories", {
          query_embedding: topicEmbedding,
          match_threshold: 0.6,
          match_count: params.max_memories,
          filter_user_id: params.user_id,
        });

        if (error) throw new Error(`Topic search failed: ${error.message}`);
        memories = data || [];
      } else {
        // Get recent memories
        memories = await queryMemories(params.user_id, {
          type: params.memory_type,
          limit: params.max_memories,
        });
      }

      if (memories.length < 3) {
        return {
          content: [
            {
              type: "text" as const,
              text: "Not enough memories to extract meaningful insights. Need at least 3 memories.",
            },
          ],
        };
      }

      // Prepare context for AI analysis
      const memorySummaries = memories.map((m, i) => ({
        index: i + 1,
        id: m.id,
        title: m.title,
        type: m.type,
        content: m.content.substring(0, 500),
        tags: m.tags || [],
      }));

      const prompt = `Analyze these ${memories.length} memories and extract key insights.

${params.topic ? `Focus Area: ${params.topic}` : "General analysis across all topics"}

Memories:
${memorySummaries.map((m) => `[${m.index}] Title: ${m.title}
Type: ${m.type}
Tags: ${m.tags.join(", ") || "none"}
Content: ${m.content}
---`).join("\n")}

Extract 3-7 key insights. For each insight:
1. Provide a clear, actionable insight
2. List memory indices that support it (e.g., [1, 3, 5])
3. Rate confidence 0-1
4. Categorize as: pattern, learning, opportunity, risk, or action_item

Also provide a brief executive summary (2-3 sentences).

Return JSON: {
  "insights": [
    {
      "insight": "string",
      "supporting_memory_indices": [1, 2],
      "confidence": 0.85,
      "category": "pattern"
    }
  ],
  "summary": "string"
}`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        max_tokens: 1500,
      });

      const aiResponse = JSON.parse(response.choices[0].message.content || "{}");

      const insights: ExtractedInsight[] = (aiResponse.insights || []).map((ins: any) => ({
        insight: ins.insight,
        supporting_memories: (ins.supporting_memory_indices || []).map(
          (idx: number) => memorySummaries[idx - 1]?.id || `memory-${idx}`
        ),
        confidence: parseFloat(ins.confidence) || 0.5,
        category: ins.category || "pattern",
      }));

      const result: InsightsResult = {
        memories_analyzed: memories.length,
        topic_focus: params.topic || null,
        insights,
        summary: aiResponse.summary || "Analysis complete.",
      };

      const responseText = formatResponse(
        result,
        params.response_format,
        (data) => {
          let md = `# Memory Insights Analysis\n\n`;
          md += `**Memories Analyzed:** ${data.memories_analyzed}\n`;
          if (data.topic_focus) {
            md += `**Topic Focus:** ${data.topic_focus}\n`;
          }
          md += `\n## Executive Summary\n${data.summary}\n\n`;

          md += `## Key Insights\n\n`;
          for (const insight of data.insights) {
            const icon =
              {
                pattern: "🔄",
                learning: "💡",
                opportunity: "🚀",
                risk: "⚠️",
                action_item: "✅",
              }[insight.category] || "📌";

            md += `### ${icon} ${insight.category.toUpperCase()}\n`;
            md += `${insight.insight}\n\n`;
            md += `**Confidence:** ${(insight.confidence * 100).toFixed(0)}%\n`;
            md += `**Based on:** ${insight.supporting_memories.length} memories\n\n`;
          }

          return md;
        }
      );

      return {
        content: [{ type: "text" as const, text: truncateIfNeeded(responseText) }],
        
      };
    } catch (error) {
      return {
        isError: true,
        content: [
          {
            type: "text" as const,
            text: `Error extracting insights: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
      };
    }
  }
);

// =============================================================================
// TOOL 6: MEMORY HEALTH CHECK
// =============================================================================

const HealthCheckSchema = z.object({
  user_id: z.string().uuid().describe("User ID to check memory health for"),
  response_format: z
    .enum([ResponseFormat.JSON, ResponseFormat.MARKDOWN])
    .default(ResponseFormat.MARKDOWN)
    .describe("Output format"),
}).strict();


interface MemoryHealth {
  total_memories: number;
  memories_with_embeddings: number;
  memories_without_tags: number;
  orphaned_memories: number; // No tags, no recent access
  type_balance_score: number; // 0-100, higher is more balanced
  tagging_consistency_score: number; // 0-100
  recommendations: string[];
  health_score: number; // Overall 0-100
}

server.registerTool(
  "memory_health_check",
  {
    title: "Memory Health Check",
    description: `Analyze the health and organization quality of the user's memory collection.

Checks for issues like missing embeddings, untagged memories, type imbalances, and provides actionable recommendations.

Args:
  - user_id (string): UUID of the user
  - response_format ('markdown' | 'json'): Output format

Returns:
  Health metrics with scores and improvement recommendations.

Examples:
  - "Check my memory health" -> { user_id: "..." }
  - "Is my knowledge base well organized?" -> { user_id: "..." }`,
    inputSchema: HealthCheckSchema,
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
  },
  async (rawParams) => {
    try {
      // Parse input to apply Zod defaults
      const params = HealthCheckSchema.parse(rawParams);
      
      const { data: memories, error } = await supabase
        .from("memory_entries")
        .select("id, title, type, tags, embedding, created_at, updated_at")
        .eq("user_id", params.user_id);

      if (error) throw new Error(`Failed to fetch memories: ${error.message}`);

      if (!memories || memories.length === 0) {
        return {
          content: [
            {
              type: "text" as const,
              text: "No memories found for this user.",
            },
          ],
        };
      }

      const total = memories.length;
      const withEmbeddings = memories.filter((m) => m.embedding != null).length;
      const withoutTags = memories.filter(
        (m) => !m.tags || (Array.isArray(m.tags) && m.tags.length === 0)
      ).length;

      // Orphaned: no tags and not updated in 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const orphaned = memories.filter((m) => {
        const hasNoTags = !m.tags || (Array.isArray(m.tags) && m.tags.length === 0);
        const isOld = new Date(m.updated_at) < thirtyDaysAgo;
        return hasNoTags && isOld;
      }).length;

      // Type balance score (entropy-based)
      const typeCounts: Record<string, number> = {};
      for (const m of memories) {
        typeCounts[m.type] = (typeCounts[m.type] || 0) + 1;
      }
      const typeProportions = Object.values(typeCounts).map((c) => c / total);
      const maxTypes = 6; // Total possible types
      const entropy =
        -typeProportions.reduce((sum, p) => sum + (p > 0 ? p * Math.log2(p) : 0), 0) / Math.log2(maxTypes);
      const typeBalanceScore = Math.round(entropy * 100);

      // Tagging consistency
      const allTags = memories.flatMap((m) => m.tags || []);
      const uniqueTags = new Set(allTags);
      const avgTagsPerMemory = allTags.length / total;
      const tagConsistency = Math.min(100, Math.round((avgTagsPerMemory / 3) * 100));

      // Generate recommendations
      const recommendations: string[] = [];

      if (withEmbeddings < total) {
        const pct = (((total - withEmbeddings) / total) * 100).toFixed(0);
        recommendations.push(
          `${pct}% of memories lack embeddings. Run vector embedding generation for better search.`
        );
      }

      if (withoutTags > total * 0.3) {
        recommendations.push(
          `${Math.round((withoutTags / total) * 100)}% of memories have no tags. Use 'memory_suggest_tags' to improve organization.`
        );
      }

      if (orphaned > 0) {
        recommendations.push(
          `${orphaned} memories are orphaned (no tags, not updated in 30+ days). Consider reviewing or archiving them.`
        );
      }

      if (typeBalanceScore < 50) {
        const dominantType = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0][0];
        recommendations.push(
          `Memory types are imbalanced. ${dominantType} dominates. Consider diversifying your knowledge capture.`
        );
      }

      if (uniqueTags.size > total * 0.5) {
        recommendations.push(
          `High tag fragmentation (${uniqueTags.size} unique tags for ${total} memories). Consider consolidating similar tags.`
        );
      }

      if (recommendations.length === 0) {
        recommendations.push("Excellent! Your memory organization looks healthy.");
      }

      // Calculate overall health score
      const embeddingScore = (withEmbeddings / total) * 100;
      const tagScore = ((total - withoutTags) / total) * 100;
      const orphanScore = ((total - orphaned) / total) * 100;

      const healthScore = Math.round(
        embeddingScore * 0.25 + tagScore * 0.25 + orphanScore * 0.2 + typeBalanceScore * 0.15 + tagConsistency * 0.15
      );

      const health: MemoryHealth = {
        total_memories: total,
        memories_with_embeddings: withEmbeddings,
        memories_without_tags: withoutTags,
        orphaned_memories: orphaned,
        type_balance_score: typeBalanceScore,
        tagging_consistency_score: tagConsistency,
        recommendations,
        health_score: healthScore,
      };

      const responseText = formatResponse(
        health,
        params.response_format,
        (data) => {
          let md = `# Memory Health Report\n\n`;

          // Health score visualization
          const healthIcon = data.health_score >= 80 ? "🟢" : data.health_score >= 60 ? "🟡" : "🔴";
          md += `## Overall Health: ${healthIcon} ${data.health_score}/100\n\n`;

          md += `## Metrics\n`;
          md += `- **Total Memories:** ${data.total_memories}\n`;
          md += `- **With Embeddings:** ${data.memories_with_embeddings} (${((data.memories_with_embeddings / data.total_memories) * 100).toFixed(0)}%)\n`;
          md += `- **Without Tags:** ${data.memories_without_tags} (${((data.memories_without_tags / data.total_memories) * 100).toFixed(0)}%)\n`;
          md += `- **Orphaned:** ${data.orphaned_memories}\n`;
          md += `- **Type Balance:** ${data.type_balance_score}/100\n`;
          md += `- **Tagging Consistency:** ${data.tagging_consistency_score}/100\n\n`;

          md += `## Recommendations\n`;
          for (const rec of data.recommendations) {
            md += `- ${rec}\n`;
          }

          return md;
        }
      );

      return {
        content: [{ type: "text" as const, text: truncateIfNeeded(responseText) }],
        
      };
    } catch (error) {
      return {
        isError: true,
        content: [
          {
            type: "text" as const,
            text: `Error checking memory health: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
      };
    }
  }
);

// =============================================================================
// SERVER STARTUP
// =============================================================================

async function runStdio(): Promise<void> {
  console.error("Starting Memory Intelligence MCP Server via stdio...");
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Server connected and running.");
}

async function runHTTP(): Promise<void> {
  const app = express();
  app.use(express.json());

  // Health check endpoint
  app.get("/health", (_req, res) => {
    res.json({
      status: "healthy",
      server: "memory-intelligence-mcp-server",
      version: "1.0.0",
      timestamp: new Date().toISOString(),
    });
  });

  // MCP endpoint with streamable HTTP
  app.post("/mcp", async (req, res) => {
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
      enableJsonResponse: true,
    });
    res.on("close", () => transport.close());
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  });

  const port = parseInt(process.env.PORT || "3010");
  app.listen(port, () => {
    console.error(`Memory Intelligence MCP Server running on http://localhost:${port}/mcp`);
    console.error(`Health check: http://localhost:${port}/health`);
  });
}

// Main entry point
const transport = process.env.TRANSPORT || "stdio";
if (transport === "http") {
  runHTTP().catch((error) => {
    console.error("Server error:", error);
    process.exit(1);
  });
} else {
  runStdio().catch((error) => {
    console.error("Server error:", error);
    process.exit(1);
  });
}

export { server };
