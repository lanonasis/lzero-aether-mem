import React from 'react';
import { Button } from '@/components/ui/button';
import { SendHorizontal } from 'lucide-react';

interface ChatInterfaceProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isAuthenticated: boolean;
  disabled?: boolean;
  onAttach?: () => void;
}

function PaperclipIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

export const ChatInterface = ({
  value,
  onChange,
  onSend,
  isAuthenticated,
  disabled = false,
  onAttach,
}: ChatInterfaceProps) => {
  return (
    <div className="border-t border-[var(--vscode-panel-border)] bg-[var(--vscode-sideBar-background)] px-3 py-2.5">
      <div className="relative rounded-[2px] border border-[var(--vscode-input-border)] bg-[var(--vscode-input-background)] transition-colors focus-within:border-[var(--vscode-focusBorder)]">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={
            isAuthenticated ? "Refine context..." : "Connect to chat"
          }
          disabled={!isAuthenticated || disabled}
          className="min-h-[58px] w-full resize-none border-none bg-transparent px-2.5 pt-2 pb-9 text-[13px] text-[var(--vscode-input-foreground)] placeholder:text-[var(--vscode-input-placeholderForeground)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 font-sans"
          data-testid="textarea-chat"
        />

        <div className="absolute inset-x-2 bottom-1.5 flex items-center justify-between">
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6 rounded-[2px] text-[var(--vscode-icon-foreground)] hover:bg-[var(--vscode-list-hoverBackground)]"
            disabled={!isAuthenticated || disabled || !onAttach}
            onClick={onAttach}
            data-testid="btn-attach"
          >
            <PaperclipIcon className="h-3.5 w-3.5" />
          </Button>

          <Button
            size="icon"
            className="h-6 w-6 rounded-[2px] bg-[var(--vscode-button-background)] text-[var(--vscode-button-foreground)] hover:bg-[var(--vscode-button-hoverBackground)] disabled:opacity-50"
            disabled={!isAuthenticated || disabled}
            onClick={onSend}
            data-testid="btn-send"
          >
            <SendHorizontal className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
