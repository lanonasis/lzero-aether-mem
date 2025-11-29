import { useState, useEffect } from 'react';
import { Memory, ApiKey } from '../packages/shared/types';
import { Terminal, FileCode, Hash, Zap, GitBranch, Bug, Lightbulb, BookOpen } from "lucide-react";

// Demo memories showcasing the platform's capabilities
const DEMO_MEMORIES: Memory[] = [
  {
    id: "mem_1",
    title: "OAuth2 PKCE Implementation Pattern",
    type: "code",
    date: new Date(2025, 10, 27),
    tags: ["authentication", "security", "oauth"],
    content: "Use PKCE flow for mobile and SPA apps. Store code_verifier in sessionStorage, generate code_challenge with SHA256. Never store tokens in localStorage.",
    icon: FileCode
  },
  {
    id: "mem_2", 
    title: "ARM Optimization Techniques for ML Models",
    type: "docs",
    date: new Date(2025, 10, 26),
    tags: ["arm", "optimization", "ml"],
    content: "Quantize models to INT8 for 4x speedup on ARM. Use NEON SIMD for vector operations. all-MiniLM-L6-v2 runs at 28ms on M3.",
    icon: Zap
  },
  {
    id: "mem_3",
    title: "MCP Server Best Practices",
    type: "workflow",
    date: new Date(2025, 10, 25),
    tags: ["mcp", "architecture", "patterns"],
    content: "Use server.registerTool() with Zod schemas. Support both stdio and HTTP transports. Return structured content with proper typing.",
    icon: Terminal
  },
  {
    id: "mem_4",
    title: "Vector Search Similarity Threshold Tuning",
    type: "docs",
    date: new Date(2025, 10, 24),
    tags: ["vectors", "search", "tuning"],
    content: "0.7 threshold for related content, 0.9 for duplicates. Lower thresholds increase recall but add noise. Test with representative queries.",
    icon: Hash
  },
  {
    id: "mem_5",
    title: "React 19 Server Components Migration",
    type: "todo",
    date: new Date(2025, 10, 23),
    tags: ["react", "migration", "frontend"],
    content: "Migrate dashboard components to RSC. Keep interactive components client-side. Use 'use client' directive sparingly.",
    icon: GitBranch
  },
  {
    id: "mem_6",
    title: "Supabase RLS Policy Patterns",
    type: "code",
    date: new Date(2025, 10, 22),
    tags: ["supabase", "security", "database"],
    content: "Always enable RLS on user-owned tables. Use auth.uid() for ownership checks. Add indexes on filtered columns for performance.",
    icon: Bug
  },
  {
    id: "mem_7",
    title: "Hackathon Submission Checklist",
    type: "todo",
    date: new Date(2025, 10, 27),
    tags: ["hackathon", "arm", "submission"],
    content: "✅ Live MCP servers deployed ✅ SDK published on npm ✅ Documentation site live ⏳ Demo video ⏳ Final testing",
    icon: Lightbulb
  },
  {
    id: "mem_8",
    title: "Context Intelligence Engine Architecture",
    type: "docs",
    date: new Date(2025, 10, 27),
    tags: ["aether", "vortex", "architecture"],
    content: "Aether Vortex provides: Pattern recognition, semantic tag suggestions, duplicate detection, insight extraction. Microservice architecture for independent scaling.",
    icon: BookOpen
  }
];

const DEMO_API_KEYS: ApiKey[] = [
  { id: "key_prod", name: "Production API Key", scope: "read:write", created: "2025-10-15", lastUsed: "Just now" },
  { id: "key_dev", name: "Development Key", scope: "read:write", created: "2025-11-20", lastUsed: "2 hours ago" },
  { id: "key_mcp", name: "MCP Server Key", scope: "read", created: "2025-11-27", lastUsed: "Active" },
];

// @lanonasis/memory-sdk client simulation
export class LanonasisClient {
  private apiKey: string | null = null;
  private baseUrl = "https://api.lanonasis.com";

  constructor(apiKey?: string) {
    this.apiKey = apiKey || null;
  }

  isAuthenticated() {
    return !!this.apiKey;
  }

  async connect(apiKey: string) {
    await new Promise(resolve => setTimeout(resolve, 800));
    this.apiKey = apiKey;
    return { success: true, user: { id: 'demo_user', name: 'ARM Hackathon Judge', email: 'judge@devpost.com' } };
  }

  async disconnect() {
    this.apiKey = null;
    return { success: true };
  }

  get memory() {
    return {
      list: async (query?: string): Promise<Memory[]> => {
        await new Promise(resolve => setTimeout(resolve, 400));
        if (!query) return DEMO_MEMORIES;
        const q = query.toLowerCase();
        return DEMO_MEMORIES.filter(m => 
          m.title.toLowerCase().includes(q) ||
          m.content.toLowerCase().includes(q) ||
          m.tags.some(tag => tag.toLowerCase().includes(q))
        );
      },
      add: async (content: string, title?: string) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const newMemory: Memory = {
          id: `mem_${Date.now()}`,
          title: title || content.slice(0, 50) + "...",
          type: "docs",
          date: new Date(),
          tags: ["new"],
          content,
          icon: Lightbulb
        };
        DEMO_MEMORIES.unshift(newMemory);
        return { success: true, id: newMemory.id, memory: newMemory };
      },
      search: async (query: string): Promise<Memory[]> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        // Simulate semantic search with scoring
        const q = query.toLowerCase();
        return DEMO_MEMORIES
          .map(m => ({
            ...m,
            score: (m.title.toLowerCase().includes(q) ? 0.4 : 0) +
                   (m.content.toLowerCase().includes(q) ? 0.4 : 0) +
                   (m.tags.some(t => t.toLowerCase().includes(q)) ? 0.2 : 0)
          }))
          .filter(m => m.score > 0)
          .sort((a, b) => b.score - a.score);
      }
    };
  }

  get keys() {
    return {
      list: async (): Promise<ApiKey[]> => {
        await new Promise(resolve => setTimeout(resolve, 200));
        return DEMO_API_KEYS;
      },
      generate: async (name: string, environment: string) => {
        await new Promise(resolve => setTimeout(resolve, 400));
        const token = `sk_${environment}_${Math.random().toString(36).substr(2, 32)}`;
        return { id: `key_${Date.now()}`, name, token, masked: `sk_${environment}_...${token.slice(-8)}` };
      }
    };
  }
}

// @lanonasis/memory-sdk React hook with auto-connect for demo
export function useLanonasis() {
  const [client] = useState(() => new LanonasisClient());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [user, setUser] = useState<{ id: string; name: string; email?: string } | null>(null);

  // Auto-connect for demo experience
  useEffect(() => {
    const autoConnect = async () => {
      setIsConnecting(true);
      const result = await client.connect("demo_lano_key_2024");
      setUser(result.user);
      setIsAuthenticated(true);
      setIsConnecting(false);
    };
    
    // Small delay to show the welcome screen briefly
    const timer = setTimeout(autoConnect, 1500);
    return () => clearTimeout(timer);
  }, [client]);

  const login = async () => {
    setIsConnecting(true);
    const result = await client.connect("demo_lano_key_2024");
    setUser(result.user);
    setIsAuthenticated(true);
    setIsConnecting(false);
  };

  const logout = async () => {
    await client.disconnect();
    setIsAuthenticated(false);
    setUser(null);
  };

  return {
    client,
    isAuthenticated,
    isConnecting,
    user,
    login,
    logout
  };
}
