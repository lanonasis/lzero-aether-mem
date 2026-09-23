import * as React from "react";
import {
  FileCode,
  Hash,
  Terminal as TerminalIcon,
  GitBranch,
  Lightbulb,
  BookOpen,
  Check,
  Copy,
} from "lucide-react";
import { format } from "date-fns";

const MEMORY_ICONS: Record<string, React.FC<{ className?: string }>> = {
  code: FileCode,
  docs: BookOpen,
  todo: Lightbulb,
  workflow: GitBranch,
  status: TerminalIcon,
  note: Hash,
  snippet: FileCode,
  idea: Lightbulb,
  context: BookOpen,
};

export function getMemoryIcon(type: string): React.FC<{ className?: string }> {
  return MEMORY_ICONS[type] ?? Hash;
}

export function formatMemoryDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Recent";
    const now = Date.now();
    const diff = now - date.getTime();
    if (diff < 86_400_000) return format(date, "h:mm a");
    return format(date, "MMM d");
  } catch {
    return "Recent";
  }
}

export interface MemoryCardProps {
  title: string;
  memoryType: string;
  tags: string[];
  createdAt: string;
  iconType?: string;
  onClick?: () => void;
  variant?: "default" | "compact";
}

export const MemoryCard: React.FC<MemoryCardProps> = ({
  title,
  memoryType,
  tags,
  createdAt,
  iconType,
  onClick,
  variant = "default",
}) => {
  const [copied, setCopied] = React.useState(false);
  const Icon = getMemoryIcon(iconType ?? memoryType);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(title);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  const content = (
    <div
      onClick={onClick}
      className={`group relative rounded-lg border border-[#2D2D2D] bg-gradient-to-br from-[#252526] to-[#1E1E1E] p-3 hover:from-[#2A2D2E] hover:to-[#252526] hover:border-[#007ACC]/50 transition-all duration-200 ${onClick ? "cursor-pointer" : ""}`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-[#CCCCCC] leading-tight line-clamp-2">
          {title}
        </h3>
        <span className="shrink-0 text-[8px] bg-[#007ACC]/10 border border-[#007ACC]/30 text-[#007ACC] px-1.5 py-0.5 rounded whitespace-nowrap">
          {memoryType}
        </span>
      </div>
      <div className="flex items-center gap-2 text-[10px] text-[#888888] flex-wrap mt-1.5">
        <div className="flex items-center gap-1">
          <Icon className="h-3 w-3" />
          <span>{formatMemoryDate(createdAt)}</span>
        </div>
        {tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="bg-[#007ACC]/10 px-1.5 py-0.5 rounded text-[#007ACC] text-[9px]"
          >
            #{tag}
          </span>
        ))}
      </div>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 rounded bg-[#3C3C3C] hover:bg-[#4C4C4C] transition-all"
        title="Copy title"
      >
        {copied ? (
          <Check className="h-3 w-3 text-green-400" />
        ) : (
          <Copy className="h-3 w-3 text-[#888888]" />
        )}
      </button>
    </div>
  );

  if (variant === "compact") {
    return (
      <div className="rounded-lg border border-[#2D2D2D] bg-[#252526] p-2 hover:border-[#007ACC]/50 transition-colors cursor-pointer" onClick={onClick}>
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xs font-medium text-white truncate flex-1">{title}</h3>
          <span className="text-[10px] text-[#666666] shrink-0">{formatMemoryDate(createdAt)}</span>
        </div>
        <span className="text-[10px] px-1.5 py-0.5 bg-[#007ACC]/20 text-[#007ACC] rounded mt-1 inline-block">
          {memoryType}
        </span>
      </div>
    );
  }

  return content;
};
