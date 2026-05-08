import React, { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Copy, Check, Hash, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Memory } from "../../../../shared/types";

declare global {
  interface Window {
    vscode?: {
      postMessage?: (message: unknown) => void;
    };
  }
}

const formatMemoryDate = (memory: Memory) => {
  const rawDate = memory.date ?? memory.createdAt ?? memory.updatedAt;
  if (!rawDate) return "—";

  const parsed = rawDate instanceof Date ? rawDate : new Date(rawDate);
  if (Number.isNaN(parsed.getTime())) return "—";

  return format(parsed, "MMM d");
};

export const MemoryCard = ({
  memory,
  onOpen,
}: {
  memory: Memory;
  onOpen?: (memory: Memory) => void;
}) => {
  const [copied, setCopied] = useState(false);
  const Icon = memory.icon || FileText;
  const formattedDate = formatMemoryDate(memory);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = memory.content ?? "";

    if (window.vscode && typeof window.vscode.postMessage === "function") {
      window.vscode.postMessage({
        type: "lanonasis:clipboard:write",
        payload: { text },
      });
    } else if (
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function"
    ) {
      navigator.clipboard.writeText(text).catch(() => {
        // Ignore clipboard errors in plain web preview
      });
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -5 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn(
        "group relative flex cursor-pointer flex-col gap-2 rounded-sm border border-transparent p-2.5 transition-colors duration-100 hover:border-[var(--vscode-focusBorder)] hover:bg-[var(--vscode-list-hoverBackground)]"
      )}
      onClick={() => onOpen?.(memory)}
      data-testid={`memory-card-${memory.id}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <Icon className="h-3.5 w-3.5 text-[var(--vscode-editor-foreground)] opacity-70 shrink-0" />
          <h3 className="line-clamp-1 text-[13px] font-medium leading-tight text-[var(--vscode-editor-foreground)]">
            {memory.title}
          </h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Copy memory content"
          className="mt-[-1px] mr-[-2px] h-5 w-5 shrink-0 rounded-sm text-[var(--vscode-editor-foreground)] opacity-60 transition-opacity hover:bg-[var(--vscode-button-secondaryHoverBackground)] group-hover:opacity-100"
          onClick={handleCopy}
          data-testid="btn-copy-memory"
        >
          {copied ? (
            <Check className="h-3 w-3 text-green-400" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 pl-5 text-[11px] text-[var(--vscode-descriptionForeground)]">
        <div className="inline-flex items-center gap-1 rounded-full border border-[var(--vscode-panel-border)] px-1.5 py-0.5 opacity-70">
          <span data-testid="text-memory-date">{formattedDate}</span>
        </div>
        {memory.tags?.map((tag: string) => (
          <span
            key={tag}
            className="inline-flex max-w-[140px] items-center gap-1 rounded-full border border-[var(--vscode-panel-border)] bg-[var(--vscode-badge-background)]/10 px-1.5 py-0.5 text-[var(--vscode-editor-foreground)] opacity-80"
            data-testid={`tag-${tag}`}
          >
            <Hash className="h-2.5 w-2.5" />
            <span className="truncate">{tag}</span>
          </span>
        ))}
      </div>
    </motion.div>
  );
};
