"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col space-y-4",
        caption: "flex justify-center py-2 mb-2 relative items-center",
        caption_label: "text-sm font-medium text-slate-900",
        nav: "space-x-2 flex items-center",
        nav_button:
          "h-8 w-8 rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200",
        table: "w-full border-collapse",
        head_row: "flex",
        head_cell: "rounded-md w-10 text-xs font-medium text-slate-400",
        row: "flex w-full mt-2",
        cell: "relative h-10 w-10 text-center text-sm focus-within:relative focus-within:z-20",
        day: cn(
          "h-10 w-10 rounded-full p-0 font-medium text-slate-600 transition",
          "hover:bg-blue-50"
        ),
        day_selected: "bg-blue-500 text-white hover:bg-blue-500",
        day_today: "text-blue-600",
        day_disabled: "text-slate-300",
        day_outside: "text-slate-300"
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
