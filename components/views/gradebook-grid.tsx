"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Calculator, Download, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { GradebookRow, type ClassSummary } from "@/lib/data/mock";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const weights = {
  assignment: 0.4,
  project: 0.3,
  assessment: 0.3,
};

export const calculateFinalGrade = (row: GradebookRow) =>
  Math.round(
    row.assignment * weights.assignment +
      row.project * weights.project +
      row.assessment * weights.assessment,
  );

type ClassOption = Pick<ClassSummary, "id" | "title">;

interface GradebookGridProps {
  classNameLabel: string;
  classId: string;
  rows: GradebookRow[];
  classOptions: ClassOption[];
}

export function GradebookGrid({
  classNameLabel,
  classId,
  rows,
  classOptions,
}: GradebookGridProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [records, setRecords] = React.useState(() =>
    rows.map((row) => ({ ...row, final: calculateFinalGrade(row) })),
  );

  const updateScore = (
    id: string,
    field: keyof Pick<GradebookRow, "assignment" | "project" | "assessment">,
    value: number,
  ) => {
    setRecords((prev) =>
      prev.map((row) =>
        row.id === id
          ? {
              ...row,
              [field]: value,
              final: calculateFinalGrade({ ...row, [field]: value }),
            }
          : row,
      ),
    );
  };

  const runAi = () => {
    toast({
      title: "AI Insight",
      description: "Detected 2 students trending up 5% week-over-week.",
    });
  };

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-2">
          <p className="text-sm text-slate-500">Gradebook 2.0</p>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-semibold text-[var(--color-fg)]">
              {classNameLabel}
            </h2>
            <Select
              value={classId}
              onValueChange={(value) => router.push(`/gradebook/${value}`)}
            >
              <SelectTrigger className="w-48 rounded-full border-slate-200 bg-white/70 text-sm">
                <SelectValue placeholder="Switch class" />
              </SelectTrigger>
              <SelectContent>
                {classOptions.map((option) => (
                  <SelectItem value={option.id} key={option.id}>
                    {option.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="text-xs text-slate-500">
            Weights — Assignments 40%, Projects 30%, Assessments 30%
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2" onClick={runAi}>
            <Sparkles className="h-4 w-4" />
            AI Check
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Button variant="default" className="gap-2">
            <Calculator className="h-4 w-4" />
            Sync SIS
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-white/40 bg-white/80 shadow-card">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="text-left text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-6 py-3">Student</th>
              <th className="px-6 py-3">Assignment (40%)</th>
              <th className="px-6 py-3">Project (30%)</th>
              <th className="px-6 py-3">Assessment (30%)</th>
              <th className="px-6 py-3">Final</th>
              <th className="px-6 py-3">AI Insight</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {records.map((row) => (
              <tr key={row.id}>
                <td className="px-6 py-4 text-sm font-semibold text-[var(--color-fg)]">
                  {row.name}
                </td>
                {(["assignment", "project", "assessment"] as const).map((key) => (
                  <td key={key} className="px-6 py-4">
                    <input
                      type="number"
                      value={row[key]}
                      min={0}
                      max={100}
                      aria-label={`${row.name} ${key} score`}
                      onChange={(event) =>
                        updateScore(row.id, key, Number(event.target.value))
                      }
                      className="w-24 rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-sm text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
                    />
                  </td>
                ))}
                <td className="px-6 py-4 text-lg font-semibold text-[var(--color-fg)]">
                  {row.final}%
                </td>
                <td className="px-6 py-4">
                  <Badge variant="outline">{row.aiInsight}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
