import { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KpiTileProps {
  label: string;
  value: string;
  trendLabel?: string;
  trendTone?: "up" | "down" | "neutral";
  icon: LucideIcon;
}

export function KpiTile({
  label,
  value,
  trendLabel,
  trendTone = "up",
  icon: Icon,
}: KpiTileProps) {
  return (
    <Card className="flex flex-col gap-3 rounded-3xl border border-white/50 p-5">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-white/70 p-2.5 shadow-sm">
          <Icon className="h-5 w-5 text-blue-500" />
        </div>
        <p className="text-sm font-medium text-slate-500">{label}</p>
      </div>
      <p className="text-3xl font-semibold text-[var(--color-fg)]">{value}</p>
      {trendLabel && (
        <p
          className={cn(
            "text-sm font-medium",
            trendTone === "up" && "text-green-600",
            trendTone === "down" && "text-red-500",
            trendTone === "neutral" && "text-slate-500",
          )}
        >
          {trendLabel}
        </p>
      )}
    </Card>
  );
}
