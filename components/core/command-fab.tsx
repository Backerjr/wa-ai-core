"use client";

import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useUIStore } from "@/lib/state/store";

export function CommandFab() {
  const { openCommandCenter } = useUIStore();
  return (
    <Button
      onClick={openCommandCenter}
      variant="default"
      size="lg"
      className="fixed bottom-6 right-6 z-40 shadow-card shadow-blue-500/20"
      aria-label="Open AI Command Center"
    >
      <Sparkles className="mr-2 h-5 w-5" />
      AI Command
    </Button>
  );
}
