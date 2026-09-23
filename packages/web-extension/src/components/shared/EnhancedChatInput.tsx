import React, { useRef, useEffect } from "react";
import { Terminal, Paperclip, SendHorizontal, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface EnhancedChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  placeholder?: string;
  disabled?: boolean;
  isSending?: boolean;
  rows?: number;
  className?: string;
  showActions?: boolean;
  showFooter?: boolean;
  assistantLabel?: string;
  version?: string;
}

export const EnhancedChatInput: React.FC<EnhancedChatInputProps> = ({
  value,
  onChange,
  onSend,
  placeholder = "Paste context to remember or ask AI...",
  disabled = false,
  isSending = false,
  rows = 2,
  className,
  showActions = true,
  showFooter = true,
  assistantLabel = "AI Orchestrator Active",
  version,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Auto-resize textarea
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + "px";
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className={cn("p-3 bg-[#1E1E1E] border-t border-[#3C3C3C] shrink-0 space-y-2", className)}>
      <div className="relative group">
        <div className="absolute left-3 top-3 text-[#007ACC] pointer-events-none">
          <Terminal className="h-4 w-4" />
        </div>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={disabled ? "Connect to access orchestrator..." : placeholder}
          disabled={disabled}
          rows={rows}
          className={cn(
            "w-full bg-[#252526] border border-[#3C3C3C] rounded-lg pl-9 pr-24 py-2.5 text-sm text-[#CCCCCC] placeholder:text-[#555555] resize-none focus:outline-none focus:border-[#007ACC] focus:ring-1 focus:ring-[#007ACC]/20 disabled:opacity-50 transition-all",
            rows === 1 && "min-h-[46px] max-h-[46px]"
          )}
        />
        {showActions && (
          <div className="absolute right-2 bottom-2 flex gap-1">
            <button
              type="button"
              className="h-7 w-7 flex items-center justify-center rounded-md text-[#888888] hover:text-[#CCCCCC] hover:bg-[#3C3C3C] transition-colors disabled:opacity-30"
              disabled={disabled}
              title="Attach file"
            >
              <Paperclip className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onSend}
              className={cn(
                "h-7 w-7 flex items-center justify-center rounded-md text-white transition-all disabled:opacity-50",
                "bg-gradient-to-r from-[#007ACC] to-[#0E639C] hover:shadow-md hover:shadow-[#007ACC]/30"
              )}
              disabled={disabled || !value.trim() || isSending}
              title="Send (Enter)"
            >
              {isSending ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <SendHorizontal className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        )}
      </div>
      {showFooter && isSending && (
        <div className="flex justify-between items-center px-1">
          <span className="text-[9px] text-[#666666]">{assistantLabel}</span>
          {version && <span className="text-[9px] text-[#666666]">v{version}</span>}
        </div>
      )}
    </div>
  );
};
