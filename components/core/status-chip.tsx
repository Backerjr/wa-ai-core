"use client";

import { AttendanceStatus } from "@/lib/data/mock";
import { cn } from "@/lib/utils";

const toneMap: Record<AttendanceStatus, string> = {
  Present: "bg-green-100 text-green-700",
  Absent: "bg-red-100 text-red-600",
  Tardy: "bg-amber-100 text-amber-700",
};

interface StatusChipProps {
  value: AttendanceStatus;
  active: boolean;
  onSelect: (value: AttendanceStatus) => void;
}

export function StatusChip({ value, active, onSelect }: StatusChipProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={() => onSelect(value)}
      onKeyDown={(event) => {
        if (event.key === " " || event.key === "Enter") {
          event.preventDefault();
          onSelect(value);
        }
      }}
      className={cn(
        "rounded-full border px-3 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200",
        active ? toneMap[value] : "border-slate-200 text-slate-500 hover:border-blue-200",
      )}
    >
      {value}
    </button>
  );
}
