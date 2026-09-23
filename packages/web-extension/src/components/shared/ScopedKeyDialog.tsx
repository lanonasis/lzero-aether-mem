import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Lock } from "lucide-react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScopedKeyDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScopedKeyDialog: React.FC<ScopedKeyDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const [environment, setEnvironment] = useState<
    "development" | "staging" | "production"
  >("development");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // TODO: Implement key generation via chrome.runtime.sendMessage
    // For now, just close after a brief delay
    setTimeout(() => {
      setIsGenerating(false);
      onClose();
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-[#1E1E1E] to-[#252526] border-[#3C3C3C] text-white max-w-md shadow-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <Shield className="h-5 w-5 text-[#007ACC]" />
            Generate Scoped Key
          </DialogTitle>
          <DialogDescription className="text-gray-400 mt-2">
            Create a secure, environment-specific API key with granular
            permissions.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Environment
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["development", "staging", "production"].map((env) => (
                <button
                  key={env}
                  onClick={() => setEnvironment(env as any)}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-all",
                    environment === env
                      ? "bg-[#007ACC] text-white shadow-lg shadow-[#007ACC]/30"
                      : "bg-[#2D2D2D] text-gray-400 hover:bg-[#3C3C3C]"
                  )}
                >
                  {env.charAt(0).toUpperCase() + env.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#1E1E1E] border border-[#3C3C3C] rounded-lg p-3 text-xs text-gray-400 space-y-1">
            <p className="flex items-center gap-2">
              <Zap className="h-3 w-3 text-yellow-500" /> Full read/write access
            </p>
            <p className="flex items-center gap-2">
              <Shield className="h-3 w-3 text-green-500" /> Auto-rotated every
              90 days
            </p>
            <p className="flex items-center gap-2">
              <Lock className="h-3 w-3 text-blue-500" /> Encrypted in transit
              and at rest
            </p>
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-gray-400"
          >
            Cancel
          </Button>
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="bg-[#007ACC] hover:bg-[#0063A5] text-white"
          >
            {isGenerating ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {isGenerating ? "Generating..." : "Generate Key"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
