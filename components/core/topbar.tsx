"use client";

import * as React from "react";
import { Bell, Menu, Search, Sparkles } from "lucide-react";

import { SidebarNavList } from "@/components/core/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useUIStore } from "@/lib/state/store";

export function Topbar() {
  const { openCommandCenter } = useUIStore();
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const today = React.useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      }).format(new Date()),
    [],
  );

  return (
    <header className="glass-card flex flex-col gap-4 rounded-3xl border border-white/40 px-5 py-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm text-slate-500">{today}</p>
          <h1 className="font-display text-2xl text-[var(--color-fg)]">
            Good morning, Wiktoria 🌤️
          </h1>
          <p className="text-sm text-slate-500">
            Next: Grade 10 Math in 15 minutes — attendance and lesson plan ready.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 rounded-full border border-white/40 bg-white/60 px-3 py-1 text-xs font-medium text-slate-500">
            <span className="text-slate-900">Campus sync</span>
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" aria-hidden />
            <span>Live</span>
          </div>
          <Button
            variant="secondary"
            className="hidden md:inline-flex"
            onClick={openCommandCenter}
          >
            <Sparkles className="mr-2 h-4 w-4 text-blue-500" />
            Open AI
          </Button>
          <Button variant="ghost" size="icon" className="relative text-slate-500">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <div
            className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-400 text-sm font-semibold text-white"
            aria-label="Wiktoria avatar"
          >
            MD
          </div>
          <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 border-none bg-white/90">
              <SidebarNavList
                collapsed={false}
                onNavigate={() => setMobileNavOpen(false)}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search classes, students, or run /commands"
            className="pl-11"
            aria-label="Search classes, students, or commands"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="min-w-[140px]">
            Take Attendance
          </Button>
          <Button variant="outline" className="min-w-[140px]">
            View Lesson Plan
          </Button>
          <Button variant="default" className="min-w-[140px]" onClick={openCommandCenter}>
            Command Center
          </Button>
        </div>
      </div>
    </header>
  );
}
