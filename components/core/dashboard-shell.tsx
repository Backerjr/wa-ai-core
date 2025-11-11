"use client";

import { Sidebar } from "@/components/core/sidebar";
import { Topbar } from "@/components/core/topbar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen gap-6 bg-[var(--color-bg)] p-4 md:p-6">
      <Sidebar />
      <div className="flex w-full flex-1 flex-col gap-6">
        <Topbar />
        <main id="content" className="flex-1 pb-10">
          {children}
        </main>
      </div>
    </div>
  );
}
