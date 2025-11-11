import type { ReactNode } from "react";
import { DashboardShell } from "@/components/core/dashboard-shell";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
