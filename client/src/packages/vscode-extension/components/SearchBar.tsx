import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
}

export const SearchBar = ({
  value,
  onChange,
  placeholder = "Search memories...",
  disabled = false,
  inputRef,
}: SearchBarProps) => {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--vscode-input-placeholderForeground)]" />
      <Input
        placeholder={placeholder}
        className="vscode-input h-8 rounded-sm pr-2 pl-8 text-[13px]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        ref={inputRef}
        data-testid="input-search"
      />
    </div>
  );
};
