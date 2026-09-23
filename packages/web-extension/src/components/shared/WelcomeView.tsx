import React from "react";
import { Loader2, ArrowRight, Sparkles, Lock, Search, Database } from "lucide-react";
import { cn } from "@/lib/utils";
import { LanoLogo } from "@/components/lano-logo";

interface WelcomeViewProps {
  onLogin: () => void;
  isConnecting: boolean;
  className?: string;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({
  onLogin,
  isConnecting,
  className,
}) => (
  <div className={cn("p-6 space-y-8 flex flex-col items-center justify-center min-h-[400px]", className)}>
    <div className="h-14 w-14 bg-gradient-to-br from-[#007ACC] to-[#0E639C] rounded-full flex items-center justify-center shadow-lg shadow-[#007ACC]/30">
      <LanoLogo size={28} className="text-white" />
    </div>
    <div className="space-y-3 text-center">
      <h3 className="text-lg font-bold text-white">Your Memory Awaits</h3>
      <p className="text-sm text-gray-400 max-w-[240px] mx-auto leading-relaxed">
        Connect to your personal AI orchestrator. Store, search, and recall your development context instantly.
      </p>
    </div>
    <button
      onClick={onLogin}
      disabled={isConnecting}
      className="bg-gradient-to-r from-[#007ACC] to-[#0E639C] hover:shadow-lg hover:shadow-[#007ACC]/50 text-white font-medium w-full max-w-[220px] py-2 px-4 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
    >
      {isConnecting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Initializing...
        </>
      ) : (
        <>
          Connect to Memory
          <ArrowRight className="h-4 w-4" />
        </>
      )}
    </button>
    <div className="w-full border-t border-[#2D2D2D]" />
    <div className="space-y-2 w-full">
      <p className="text-xs text-[#888888] text-center font-medium">What you can do:</p>
      <div className="grid grid-cols-2 gap-2">
        {[
          { icon: Search, color: "text-yellow-500", label: "Semantic Search" },
          { icon: Lock, color: "text-green-500", label: "Scoped Keys" },
          { icon: Sparkles, color: "text-blue-400", label: "AI Assistant" },
          { icon: Database, color: "text-purple-400", label: "Memory Bank" },
        ].map(({ icon: Icon, color, label }) => (
          <div key={label} className="flex items-center gap-2 p-2 rounded bg-[#1E1E1E]">
            <Icon className={`h-3 w-3 ${color}`} />
            <span className="text-[10px] text-gray-400">{label}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);
