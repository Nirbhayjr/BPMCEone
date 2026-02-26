import { Sparkles, Cpu, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIBadgeProps {
  className?: string;
  variant?: "default" | "gemini" | "demo";
}

export function AIBadge({ className, variant = "default" }: AIBadgeProps) {
  if (variant === "gemini") {
    return (
      <span className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/30",
        className
      )}>
        <Cpu className="w-3 h-3" />
        Powered by Google Gemini API
      </span>
    );
  }

  if (variant === "demo") {
    return (
      <span className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        "bg-amber-500/20 text-amber-400 border border-amber-500/30",
        className
      )}>
        <Info className="w-3 h-3" />
        Demo Data
      </span>
    );
  }

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
      "bg-primary/20 text-primary border border-primary/30",
      className
    )}>
      <Sparkles className="w-3 h-3" />
      AI-Powered
    </span>
  );
}

export function DemoBanner() {
  return (
    <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 border border-amber-500/20 rounded-xl p-4 mb-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
          <Info className="w-3 h-3" />
          Hackathon Demo
        </span>
        <p className="text-sm text-muted-foreground">
          This is a prototype showcasing planned features. Data shown is for demonstration purposes.
        </p>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/30">
          <Cpu className="w-3 h-3" />
          Google Gemini Integration Planned
        </span>
      </div>
    </div>
  );
}
