import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DataCardProps {
  title: string;
  subtitle: string;
  meta: string;
  actions?: Array<{ label: string; href: string }>;
  health?: "good" | "warning" | "critical";
}

const healthTone: Record<NonNullable<DataCardProps["health"]>, string> = {
  good: "bg-green-100 text-green-700",
  warning: "bg-amber-100 text-amber-700",
  critical: "bg-red-100 text-red-600"
};

export function DataCard({ title, subtitle, meta, actions = [], health = "good" }: DataCardProps) {
  return (
    <Card className="flex flex-col gap-4 rounded-3xl border border-white/40 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-400">{subtitle}</p>
          <h3 className="text-xl font-semibold text-[var(--color-fg)]">{title}</h3>
        </div>
        <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", healthTone[health])}>{health}</span>
      </div>
      <p className="text-sm text-slate-500">{meta}</p>
      {actions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {actions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600 transition hover:border-blue-200 hover:text-blue-600"
            >
              {action.label}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          ))}
        </div>
      )}
    </Card>
  );
}
