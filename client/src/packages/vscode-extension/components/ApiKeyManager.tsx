import React, { useMemo, useState } from "react";
import { Check, Copy, Key, RefreshCw, ShieldCheck, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useApiKeys } from "../hooks/useApiKeys";
import { useAuth } from "../hooks/useAuth";

interface ApiKeyManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiKeyManager = ({ isOpen, onClose }: ApiKeyManagerProps) => {
  const { isAuthenticated } = useAuth();
  const { apiKeys, isLoading, error, generateKey, rotateKey, revokeKey } =
    useApiKeys(isAuthenticated);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyScope, setNewKeyScope] = useState<
    "read" | "write" | "read:write"
  >("read:write");
  const [generatedToken, setGeneratedToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const canGenerate = newKeyName.trim().length > 2 && !isLoading;

  const orderedKeys = useMemo(() => {
    return [...apiKeys].sort((a, b) =>
      (a.name || "").localeCompare(b.name || "")
    );
  }, [apiKeys]);

  const handleGenerate = async () => {
    if (!canGenerate) return;
    const created = await generateKey(newKeyName.trim(), newKeyScope);
    if (created?.token) {
      setGeneratedToken(created.token);
    }
    setNewKeyName("");
  };

  const handleRotate = async (id: string) => {
    const rotated = await rotateKey(id);
    if (rotated?.token) {
      setGeneratedToken(rotated.token);
    }
  };

  const handleRevoke = async (id: string) => {
    const confirmed = window.confirm(
      "Revoke this API key? This action cannot be undone."
    );
    if (!confirmed) return;
    await revokeKey(id);
  };

  const handleCopyToken = async () => {
    if (!generatedToken) return;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(generatedToken);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
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
          {!isAuthenticated && (
            <div className="rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-editor-background)] p-3 text-[12px] text-[var(--vscode-descriptionForeground)]">
              Connect to manage scoped API keys.
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[11px] font-medium text-[var(--vscode-descriptionForeground)] uppercase">
              Create New Key
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="Key Name (e.g., CI/CD Pipeline)"
                className="vscode-input h-7 text-[13px]"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                data-testid="input-key-name"
                disabled={!isAuthenticated || isLoading}
              />
              <select
                value={newKeyScope}
                onChange={(e) =>
                  setNewKeyScope(e.target.value as typeof newKeyScope)
                }
                className="vscode-input h-7 rounded-sm border border-[var(--vscode-input-border)] bg-[var(--vscode-input-background)] px-2 text-[12px] text-[var(--vscode-input-foreground)]"
                disabled={!isAuthenticated || isLoading}
              >
                <option value="read:write">read:write</option>
                <option value="read">read</option>
                <option value="write">write</option>
              </select>
              <Button
                size="sm"
                className="vscode-button h-7"
                onClick={handleGenerate}
                data-testid="btn-generate-key"
                disabled={!canGenerate || !isAuthenticated}
              >
                {isLoading ? "Generating..." : "Generate"}
              </Button>
            </div>
          </div>

          {generatedToken && (
            <div className="rounded-sm border border-[var(--vscode-panel-border)] bg-[var(--vscode-editor-background)] p-3 space-y-2">
              <div className="flex items-center gap-2 text-[11px] uppercase text-[var(--vscode-descriptionForeground)]">
                <ShieldCheck className="h-3.5 w-3.5" />
                New token (copy now)
              </div>
              <div className="flex items-center gap-2">
                <Input
                  value={generatedToken}
                  readOnly
                  className="vscode-input h-7 text-[12px]"
                />
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-7"
                  onClick={handleCopyToken}
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </Button>
              </div>
              <p className="text-[11px] text-[var(--vscode-descriptionForeground)]">
                This token will only be shown once. Store it securely.
              </p>
            </div>
          )}

          {error && (
            <div className="rounded-sm border border-red-500/20 bg-red-500/10 p-2 text-[11px] text-red-300">
              {error}
            </div>
          )}

          <div className="h-px bg-[var(--vscode-panel-border)] w-full" />

          <div className="space-y-2">
            <label className="text-[11px] font-medium text-[var(--vscode-descriptionForeground)] uppercase">
              Active Keys
            </label>
            {isLoading && (
              <div className="text-[12px] text-[var(--vscode-descriptionForeground)]">
                Loading keys...
              </div>
            )}
            {!isLoading && orderedKeys.length === 0 && (
              <div className="text-[12px] text-[var(--vscode-descriptionForeground)]">
                No scoped keys yet. Create one above.
              </div>
            )}
            {orderedKeys.map((key) => (
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
                    Last used: {key.lastUsed || "—"}
                  </p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-[var(--vscode-descriptionForeground)] hover:text-[var(--vscode-editor-foreground)]"
                    onClick={() => handleRotate(key.id)}
                    disabled={isLoading}
                    title="Rotate key"
                    data-testid={`btn-key-rotate-${key.id}`}
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-[var(--vscode-descriptionForeground)] hover:text-[var(--vscode-editor-foreground)]"
                    onClick={() => handleRevoke(key.id)}
                    disabled={isLoading}
                    title="Revoke key"
                    data-testid={`btn-key-revoke-${key.id}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
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
