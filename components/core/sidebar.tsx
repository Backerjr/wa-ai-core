"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  CalendarCheck,
  ChevronLeft,
  GraduationCap,
  LayoutDashboard,
  PieChart,
  Settings,
  Sparkles,
  UsersRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/lib/state/store";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  activePrefix?: string;
};

export const navItems: NavItem[] = [
  {
    label: "Teacher Home",
    href: "/dashboard/teacher",
    icon: LayoutDashboard,
  },
  {
    label: "Manager Hub",
    href: "/dashboard/manager",
    icon: PieChart,
  },
  {
    label: "Attendance",
    href: "/attendance/grade-10-math",
    activePrefix: "/attendance",
    icon: CalendarCheck,
  },
  {
    label: "Gradebook 2.0",
    href: "/gradebook/grade-10-math",
    activePrefix: "/gradebook",
    icon: GraduationCap,
  },
  {
    label: "Student Portal",
    href: "/student",
    icon: UsersRound,
  },
];

type SidebarNavListProps = {
  collapsed?: boolean;
  onNavigate?: () => void;
};

const isActiveRoute = (pathname: string, item: NavItem) =>
  item.activePrefix ? pathname.startsWith(item.activePrefix) : pathname === item.href;

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, openCommandCenter } = useUIStore();

  return (
    <aside
      aria-label="Primary navigation"
      className={cn(
        "glass-card sticky top-4 hidden h-[calc(100vh-2rem)] flex-col rounded-3xl border border-white/40 px-3 py-5 transition-all duration-300 md:flex",
        sidebarCollapsed ? "w-24" : "w-72",
      )}
    >
      <div className="flex items-center justify-between px-3 pb-6">
        <div className={cn("space-y-1", sidebarCollapsed && "text-center")}>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">AI School</p>
          {!sidebarCollapsed && (
            <p className="font-display text-xl text-[var(--color-fg)]">Command Core</p>
          )}
        </div>
        <Button
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-slate-500"
        >
          <ChevronLeft
            className={cn("h-5 w-5 transition", sidebarCollapsed && "rotate-180")}
          />
        </Button>
      </div>
      <SidebarNavList collapsed={sidebarCollapsed} />
      <div className="mt-auto space-y-4 px-2">
        <Link
          href="/settings"
          aria-label="Platform settings"
          className="flex items-center gap-3 rounded-2xl border border-white/40 px-3 py-3 text-sm font-semibold text-slate-500 transition hover:bg-white/70"
        >
          <Settings className="h-5 w-5" />
          {!sidebarCollapsed && <span>Settings</span>}
        </Link>
        <div className="rounded-3xl bg-gradient-to-br from-blue-500 to-green-400 p-4 text-white shadow-card">
          <p className="text-sm font-semibold">AI Command Center</p>
          <p className="text-xs text-white/80">Run /ask, /generate, /insight anywhere.</p>
          <Button
            variant="secondary"
            size="sm"
            className="mt-3 bg-white/90 text-blue-600 hover:bg-white"
            onClick={openCommandCenter}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Launch
          </Button>
          <p className="pt-1 text-[11px] uppercase tracking-wide text-white/80">
            Cmd/Ctrl + K
          </p>
        </div>
      </div>
    </aside>
  );
}

export function SidebarNavList({ collapsed, onNavigate }: SidebarNavListProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="flex flex-1 flex-col gap-1 overflow-y-auto px-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = isActiveRoute(pathname, item);
        const linkClasses = cn(
          "group flex items-center rounded-2xl px-3 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200",
          collapsed ? "justify-center" : "justify-start",
          active
            ? "bg-blue-600/10 text-blue-700"
            : "text-slate-600 hover:bg-white/80 hover:text-slate-900",
        );
        const iconClasses = cn(
          "h-5 w-5 transition",
          active ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600",
        );
        const labelClasses = cn(
          "ml-3 text-sm font-semibold",
          collapsed && "ml-0 sr-only",
        );
        const content = (
          <>
            <Icon aria-hidden className={iconClasses} />
            <span className={labelClasses}>{item.label}</span>
          </>
        );

        if (collapsed) {
          return (
            <Tooltip key={item.href} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  aria-label={item.label}
                  className={linkClasses}
                  onClick={onNavigate}
                >
                  {content}
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={linkClasses}
            onClick={onNavigate}
          >
            {content}
          </Link>
        );
      })}
    </nav>
  );
}
