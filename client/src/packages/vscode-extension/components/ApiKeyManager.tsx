import React, { useState } from 'react';
import { Key, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { MOCK_API_KEYS } from '../../shared/mock-data';

interface ApiKeyManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiKeyManager = ({ isOpen, onClose }: ApiKeyManagerProps) => {
  const [newKeyName, setNewKeyName] = useState('');

  const handleGenerate = () => {
    setNewKeyName('');
    // API call would happen here
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[var(--vscode-editor-background)] border-[var(--vscode-panel-border)] text-[var(--vscode-editor-foreground)] max-w-md gap-0 p-0 overflow-hidden shadow-2xl">
        <DialogHeader className="p-4 border-b border-[var(--vscode-panel-border)] bg-[var(--vscode-sideBarSectionHeader-background)]">
          <DialogTitle className="text-[13px] font-semibold flex items-center gap-2">
            <Key className="h-4 w-4 text-[var(--vscode-button-background)]" />
            Manage Scoped API Keys
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 p-4">
          <div className="space-y-2">
            <label className="text-[11px] font-medium text-[var(--vscode-descriptionForeground)] uppercase">
              Create New Key
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="Key Name (e.g., CI/CD Pipeline)"
                className="vscode-input h-7 text-[13px]"
                value={newKeyName}
                onChange={e => setNewKeyName(e.target.value)}
                data-testid="input-key-name"
              />
              <Button
                size="sm"
                className="vscode-button h-7"
                onClick={handleGenerate}
                data-testid="btn-generate-key"
              >
                Generate
              </Button>
            </div>
          </div>

          <div className="h-px bg-[var(--vscode-panel-border)] w-full" />

          <div className="space-y-2">
            <label className="text-[11px] font-medium text-[var(--vscode-descriptionForeground)] uppercase">
              Active Keys
            </label>
            {MOCK_API_KEYS.map(key => (
              <div
                key={key.id}
                className="flex items-center justify-between p-2 rounded-sm hover:bg-[var(--vscode-list-hoverBackground)] border border-transparent hover:border-[var(--vscode-focusBorder)] group"
                data-testid={`key-item-${key.id}`}
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-medium">{key.name}</span>
                    <Badge
                      variant="outline"
                      className="text-[10px] border-[var(--vscode-panel-border)] text-[var(--vscode-descriptionForeground)] h-4 px-1 font-normal"
                    >
                      {key.scope}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-[var(--vscode-descriptionForeground)] opacity-70">
                    Last used: {key.lastUsed}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-[var(--vscode-descriptionForeground)] hover:text-[var(--vscode-editor-foreground)] opacity-0 group-hover:opacity-100 transition-opacity"
                  data-testid={`btn-key-menu-${key.id}`}
                >
                  <Briefcase className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="p-2 border-t border-[var(--vscode-panel-border)] bg-[var(--vscode-sideBar-background)]">
          <Button
            variant="secondary"
            size="sm"
            onClick={onClose}
            className="vscode-button vscode-button-secondary h-6 text-[12px]"
            data-testid="btn-close-keys"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
