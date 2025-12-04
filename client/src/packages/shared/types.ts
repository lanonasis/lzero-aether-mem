import { LucideIcon } from "lucide-react";

export type MemoryType = "todo" | "code" | "docs" | "status" | "workflow" | "note" | "snippet" | "idea";

export interface Memory {
  id: string;
  title: string;
  type: MemoryType;
  /**
   * Legacy field used by the mock data. Real API returns createdAt/updatedAt.
   */
  date?: Date | string | number | null;
  createdAt?: Date | string | number | null;
  updatedAt?: Date | string | number | null;
  tags: string[];
  content: string;
  icon?: LucideIcon;
  synced?: boolean;
}

export interface ApiKey {
  id: string;
  name: string;
  scope: string;
  created: string;
  lastUsed: string;
}
