import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface InsightCardProps {
  title: string;
  detail: string;
  severity?: "success" | "warning" | "info";
}

const severityCopy: Record<NonNullable<InsightCardProps["severity"]>, string> = {
  success: "Insight",
  warning: "Alert",
  info: "Trend"
};

export function InsightCard({ title, detail, severity = "info" }: InsightCardProps) {
  return (
    <Card className="flex flex-col gap-3 rounded-3xl border border-white/50 p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-500">{title}</p>
        <Badge variant={severity === "warning" ? "warning" : severity === "success" ? "success" : "outline"}>
          {severityCopy[severity]}
        </Badge>
      </div>
      <p className="text-base text-[var(--color-fg)]">{detail}</p>
    </Card>
  );
}
