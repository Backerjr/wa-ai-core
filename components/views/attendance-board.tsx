"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { CalendarIcon, FileText, StickyNote } from "lucide-react";

import { StatusChip } from "@/components/core/status-chip";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { AttendanceStatus, StudentRecord, type ClassSummary } from "@/lib/data/mock";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type ClassOption = Pick<ClassSummary, "id" | "title">;

interface AttendanceBoardProps {
  classNameLabel: string;
  classId: string;
  students: StudentRecord[];
  classOptions: ClassOption[];
}

export function AttendanceBoard({
  classNameLabel,
  classId,
  students,
  classOptions
}: AttendanceBoardProps) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [records, setRecords] = React.useState<StudentRecord[]>(students);
  const [activeStudent, setActiveStudent] = React.useState<StudentRecord | null>(null);
  const { toast } = useToast();

  const updateStatus = (studentId: string, status: AttendanceStatus) => {
    setRecords((prev) =>
      prev.map((student) => (student.id === studentId ? { ...student, status } : student))
    );
    const studentName = records.find((student) => student.id === studentId)?.name;
    toast({
      title: `${studentName ?? "Student"} marked ${status}`,
      description: format(selectedDate, "MMM d")
    });
  };

  const updateNotes = (notes: string) => {
    if (!activeStudent) return;
    setRecords((prev) =>
      prev.map((student) => (student.id === activeStudent.id ? { ...student, notes } : student))
    );
    setActiveStudent({ ...activeStudent, notes });
  };

  const saveAll = () => {
    toast({ title: "Attendance saved", description: `Synced ${records.length} students for ${format(selectedDate, "MMM d")}.` });
  };

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-2">
          <p className="text-sm text-slate-500">{format(selectedDate, "EEEE, MMM d")}</p>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-semibold text-[var(--color-fg)]">
              {classNameLabel}
            </h2>
            <Select
              value={classId}
              onValueChange={(value) => router.push(`/attendance/${value}`)}
            >
              <SelectTrigger className="w-48 rounded-full border-slate-200 bg-white/70 text-sm">
                <SelectValue placeholder="Switch class" />
              </SelectTrigger>
              <SelectContent>
                {classOptions.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <CalendarIcon className="h-4 w-4" />
                {format(selectedDate, "MMM d")}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="p-0">
              <Calendar mode="single" selected={selectedDate} onSelect={(date) => date && setSelectedDate(date)} initialFocus />
            </PopoverContent>
          </Popover>
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Generate Report
          </Button>
          <Button variant="default" className="gap-2" onClick={saveAll}>
            Save All
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/40 bg-white/80 shadow-card">
        <div className="hidden grid-cols-[2fr_1fr_1fr] gap-4 border-b border-slate-100 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400 md:grid">
          <span>Student</span>
          <span>Status</span>
          <span>Notes</span>
        </div>
        <div className="divide-y divide-slate-100">
          {records.map((student) => (
            <div
              key={student.id}
              data-student-id={student.id}
              className="grid grid-cols-1 gap-4 px-4 py-4 md:grid-cols-[2fr_1fr_1fr] md:items-center"
            >
              <div>
                <p className="text-sm font-semibold text-[var(--color-fg)]">{student.name}</p>
                <p className="text-xs text-slate-500">ID: {student.id}</p>
              </div>
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={`${student.name} status`}>
                {(["Present", "Absent", "Tardy"] as AttendanceStatus[]).map((status) => (
                  <StatusChip
                    key={status}
                    value={status}
                    active={student.status === status}
                    onSelect={() => updateStatus(student.id, status)}
                  />
                ))}
              </div>
              <div>
                <Button
                  variant="ghost"
                  className="gap-2 text-slate-500"
                  onClick={() => setActiveStudent(student)}
                >
                  <StickyNote className="h-4 w-4" />
                  {student.notes ? "View Note" : "Add Note"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Sheet open={!!activeStudent} onOpenChange={(open) => !open && setActiveStudent(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Notes for {activeStudent?.name}</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <label className="text-sm font-medium text-slate-600" htmlFor="note-input">
              Inline note
            </label>
            <Input
              id="note-input"
              value={activeStudent?.notes ?? ""}
              onChange={(event) => updateNotes(event.target.value)}
              placeholder="e.g. Parent emailed, arriving late"
            />
            <Button onClick={() => setActiveStudent(null)}>Save Note</Button>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
}
