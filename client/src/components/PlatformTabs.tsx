import React, { useState } from "react";
import { Monitor, Code2, PanelRight, Smartphone, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Platform {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
  action?: {
    label: string;
    href: string;
  };
  badge?: string;
}

const platforms: Platform[] = [
  {
    id: "pwa",
    label: "PWA",
    icon: Monitor,
    description: "Progressive Web App with offline-first architecture. Full memory access from any browser.",
    action: { label: "Try PWA", href: "http://localhost:5173" },
  },
  {
    id: "vscode",
    label: "VS Code",
    icon: Code2,
    description: "Native sidebar extension. Access memories without leaving your editor.",
    action: { label: "Try Extension", href: "/vscode" },
  },
  {
    id: "web",
    label: "Web Panel",
    icon: PanelRight,
    description: "Lightweight side panel for quick context capture and semantic search.",
    action: { label: "Try Panel", href: "/dashboard" },
  },
  {
    id: "mobile",
    label: "Mobile",
    icon: Smartphone,
    description: "Native iOS & Android apps via Expo. Capture context on the go.",
    badge: "Coming Soon",
  },
];

export function PlatformTabs() {
  const [active, setActive] = useState("pwa");
  const current = platforms.find((p) => p.id === active)!;

  return (
    <section className="py-16 px-6 bg-[#0A0A0A]/50 border-y border-white/5">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 mb-4">
            <Sparkles className="h-3 w-3 text-[#007ACC]" />
            <span>Available Everywhere</span>
          </div>
          <h2 className="text-2xl font-bold text-white">One Memory, Every Platform</h2>
        </div>

        {/* Tab Strip */}
        <div className="flex justify-center gap-2 mb-8">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            const isActive = active === platform.id;
            return (
              <button
                key={platform.id}
                onClick={() => setActive(platform.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
                  isActive
                    ? "bg-[#007ACC] text-white shadow-lg shadow-[#007ACC]/30"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{platform.label}</span>
                {platform.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-gray-300">
                    {platform.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Content Panel */}
        <div className="relative p-6 rounded-xl bg-gradient-to-br from-[#1E1E1E] to-[#151515] border border-white/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-lg bg-[#007ACC]/20 flex items-center justify-center shrink-0">
                <current.icon className="h-6 w-6 text-[#007ACC]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  {current.label}
                  {current.badge && (
                    <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400">
                      {current.badge}
                    </span>
                  )}
                </h3>
                <p className="text-sm text-gray-400 max-w-md">{current.description}</p>
              </div>
            </div>

            {current.action ? (
              <Button
                className="bg-gradient-to-r from-[#007ACC] to-[#0E639C] hover:shadow-lg hover:shadow-[#007ACC]/30 text-white shrink-0 group"
                onClick={() => {
                  if (current.action!.href.startsWith("http")) {
                    window.location.href = current.action!.href;
                  } else {
                    window.location.href = current.action!.href;
                  }
                }}
              >
                {current.action.label}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            ) : (
              <Button
                disabled
                className="bg-white/5 text-gray-500 cursor-not-allowed shrink-0"
              >
                Notify Me
              </Button>
            )}
          </div>

          {/* Subtle glow */}
          <div className="absolute -inset-px bg-gradient-to-r from-[#007ACC]/20 to-purple-500/20 rounded-xl blur-xl opacity-30 -z-10" />
        </div>
      </div>
    </section>
  );
}
