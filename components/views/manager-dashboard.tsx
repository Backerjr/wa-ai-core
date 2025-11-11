"use client";

import Link from "next/link";
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip as ReTooltip } from "recharts";
import { AlertTriangle, ArrowUpRight, FileBarChart2, Users2 } from "lucide-react";

import { KpiTile } from "@/components/core/kpi-tile";
import { Card } from "@/components/ui/card";
import { staffAlerts, managerKpis, topPerformingClasses } from "@/lib/data/mock";

const chartData = topPerformingClasses.map((item) => ({ name: item.name, avg: Math.round(item.avg * 100) }));

export function ManagerDashboard() {
  return (
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <KpiTile
          label="Attendance"
          value={`${Math.round(managerKpis.attendance * 100)}%`}
          trendLabel="+1.2% vs last week"
          trendTone="up"
          icon={Users2}
        />
        <KpiTile
          label="Average Grade"
          value={`${Math.round(managerKpis.avgGrade * 100)}%`}
          trendLabel="Stable across departments"
          trendTone="neutral"
          icon={FileBarChart2}
        />
        <KpiTile
          label="Active Alerts"
          value={managerKpis.activeAlerts.toString()}
          trendLabel={managerKpis.forecast}
          trendTone="down"
          icon={AlertTriangle}
        />
      </div>

      <Card className="rounded-3xl border border-white/40 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">Forecast</p>
            <h2 className="font-display text-2xl text-[var(--color-fg)]">
              +2% improvement next quarter
            </h2>
          </div>
          <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:text-blue-600">
            Generate Report
          </button>
        </div>
        <div className="mt-6 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barSize={24}>
              <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <ReTooltip cursor={{ fill: "rgba(37, 99, 235, 0.08)" }} formatter={(value: number) => `${value}%`} />
              <Bar dataKey="avg" radius={[12, 12, 4, 4]} fill="#2563EB" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {topPerformingClasses.map((cls, index) => (
          <Card
            key={cls.id}
            className="rounded-3xl border border-white/50 p-5 transition hover:border-blue-200 hover:shadow-lg"
          >
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Top {index + 1}
            </p>
            <h4 className="mt-2 text-lg font-semibold text-[var(--color-fg)]">{cls.name}</h4>
            <p className="text-3xl font-semibold text-slate-900">
              {Math.round(cls.avg * 100)}%
            </p>
            <Link
              href={`/gradebook/${cls.id}`}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-500"
            >
              View class
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Card>
        ))}
      </div>

      <Card className="rounded-3xl border border-white/60 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">Staff Alerts</p>
            <h3 className="text-xl font-semibold text-[var(--color-fg)]">Stay ahead of compliance</h3>
          </div>
          <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:text-blue-600">
            View Alerts
          </button>
        </div>
        <ul className="mt-4 space-y-3">
          {staffAlerts.map((alert) => (
            <li
              key={alert.id}
              className="flex items-center justify-between rounded-2xl border border-white/40 bg-white/70 px-4 py-3 text-sm text-slate-600"
            >
              <span>{alert.message}</span>
              <span className="text-xs uppercase tracking-wide text-slate-400">Due Soon</span>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  );
}
