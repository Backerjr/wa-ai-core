"use client";

import * as React from "react";
import { Download, Share2 } from "lucide-react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { aiCommands } from "@/lib/data/mock";
import type { AiCommand } from "@/lib/data/mock";
import { useUIStore, type CommandResponse } from "@/lib/state/store";

const generateResponse = (command: string) => {
  switch (command) {
    case "/ask":
      return "Summary sent: Emily is trending +8% in Math with 96% attendance.";
    case "/generate":
      return "New quiz drafted: 5 adaptive questions on geometry, 2 challenge prompts.";
    case "/insight":
      return "Alert: 3 students tardy twice this week. Suggest parent update.";
    default:
      return "Command acknowledged. No mock response configured.";
  }
};

export function CommandCenter() {
  const { toast } = useToast();
  const {
    commandCenterOpen,
    openCommandCenter,
    closeCommandCenter,
    pushCommandResponse,
    commandHistory,
  } = useUIStore();
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openCommandCenter();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [openCommandCenter]);

  const runCommand = (command: string) => {
    const trimmed = command.split(" ")[0];
    const result = generateResponse(trimmed);
    pushCommandResponse({ command: trimmed, result });
    toast({ title: "AI Command executed", description: result });
  };

  return (
    <CommandDialog
      open={commandCenterOpen}
      onOpenChange={(isOpen: boolean) =>
        isOpen ? openCommandCenter() : closeCommandCenter()
      }
    >
      <Command className="shadow-none">
        <CommandInput
          placeholder="Type /ask to summarize, /generate for assets, /insight for anomalies"
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>No commands found.</CommandEmpty>
          <CommandGroup heading="Suggested">
            {aiCommands.map((item: AiCommand) => (
              <CommandItem
                key={item.command}
                value={item.command}
                onSelect={(value: string) => {
                  runCommand(value);
                }}
              >
                <span className="font-semibold text-[var(--color-fg)]">
                  {item.command}
                </span>
                <span className="ml-2 text-sm text-slate-500">{item.description}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
        <div className="border-t border-slate-100 bg-white/90 p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-500">Output</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
          {commandHistory.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-sm text-slate-500">
              Results will appear here. Try running /ask for a quick insight.
            </div>
          ) : (
            <div className="space-y-3">
              {commandHistory.slice(0, 3).map((entry: CommandResponse) => (
                <div
                  key={entry.id}
                  className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm"
                >
                  <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    <Badge variant="outline">{entry.command}</Badge>
                    <span>Response</span>
                  </div>
                  <p className="text-sm text-[var(--color-fg)]">{entry.result}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </Command>
    </CommandDialog>
  );
}
