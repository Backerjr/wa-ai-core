"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>) => (
  <TabsPrimitive.List
    className={cn(
      "inline-flex items-center rounded-full bg-slate-100/80 p-1 text-slate-500",
      className,
    )}
    {...props}
  />
);

const TabsTrigger = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>) => (
  <TabsPrimitive.Trigger
    className={cn(
      "inline-flex items-center justify-center rounded-full px-4 py-1.5 text-sm font-medium transition data-[state=active]:bg-white data-[state=active]:text-slate-900",
      className,
    )}
    {...props}
  />
);

const TabsContent = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>) => (
  <TabsPrimitive.Content
    className={cn("mt-4 rounded-2xl border border-slate-100 bg-white/70 p-6", className)}
    {...props}
  />
);

export { Tabs, TabsList, TabsTrigger, TabsContent };
