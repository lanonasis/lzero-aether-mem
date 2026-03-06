/**
 * Mobile Search Bar
 * Aligned with desktop SearchBar but mobile-optimized
 */

import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useLocalAI } from '@lanonasis/shared';
import { LanoLogo } from './LanoLogo';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search your memories...',
}) => {
  const { isReady: aiReady } = useLocalAI();

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 border-white/10 bg-white/5 pl-10 text-white placeholder:text-gray-500 focus:border-blue-500/50"
      />
      {aiReady && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <Badge
            variant="outline"
            className="border-green-500/30 bg-green-500/10 text-[9px] text-green-400"
          >
            <LanoLogo size={10} className="mr-1" />
            Semantic
          </Badge>
        </div>
      )}
    </div>
  );
};
