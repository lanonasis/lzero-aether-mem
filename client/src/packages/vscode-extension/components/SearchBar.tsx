import React from "react";
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
    <div className="relative mb-3">
      <Input
        placeholder={placeholder}
        className="vscode-input h-7 text-[13px] pl-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        ref={inputRef}
        data-testid="input-search"
      />
    </div>
  );
};
