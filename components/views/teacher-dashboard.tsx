"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MessageSquare, NotebookPen, PlusCircle } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { DataCard } from "@/components/core/data-card";
import { InsightCard } from "@/components/core/insight-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { aiInsights, teacherClasses } from "@/lib/data/mock";
import { StudentSpotlight } from "@/components/views/student-spotlight";

const quickActions = [
  {
    label: "Message Parent",
    description: "Send recap",
    href: "/messages",
    icon: MessageSquare,
  },
  {
    label: "Create Quiz",
    description: "AI-assisted",
    href: "/quiz",
    icon: NotebookPen,
  },
];

const addGradeSchema = z.object({
  student: z.string().min(1, "Student is required"),
  category: z.enum(["assignment", "project", "assessment"]),
  score: z.coerce.number().min(0, "Min 0").max(100, "Max 100"),
});

type AddGradeValues = z.infer<typeof addGradeSchema>;

export function TeacherDashboard() {
  const { toast } = useToast();
  const [addGradeOpen, setAddGradeOpen] = React.useState(false);
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<AddGradeValues>({
    resolver: zodResolver(addGradeSchema),
    defaultValues: {
      student: "",
      category: "assignment",
      score: 92,
    },
  });

  const onSubmit = (values: AddGradeValues) => {
    toast({
      title: "Grade staged",
      description: `${values.student} logged for ${values.category} (${values.score}%)`,
    });
    setAddGradeOpen(false);
    reset();
  };

  return (
    <section className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-6 lg:grid-cols-3"
      >
        <div className="lg:col-span-2 rounded-3xl border border-white/40 bg-white/80 p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">What&apos;s Next</p>
              <p className="text-sm text-slate-500">What&apos;s Next</p>
              <h2 className="text-2xl font-semibold text-[var(--color-fg)]">
                Grade 10 Math • Quadratic Functions
              </h2>
              <p className="text-sm text-slate-500">
                15 minutes • Room 201 • 32 students
              </p>
            </div>
            <Badge variant="outline">Live Prep</Badge>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Button variant="default" className="w-full justify-between" asChild>
              <Link href="/attendance/grade-10-math">
                Take Attendance
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" className="w-full justify-between" asChild>
              <Link href="/lesson-plan">
                View Lesson Plan
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="rounded-3xl border border-white/40 bg-white/80 p-6 shadow-card">
          <h3 className="text-lg font-semibold text-[var(--color-fg)]">AI Insights 💡</h3>
          <p className="text-sm text-slate-500">3 students showed consistent lateness.</p>
          <div className="mt-4 space-y-4">
            {aiInsights.slice(0, 2).map((insight) => (
              <InsightCard
                key={insight.id}
                title={insight.title}
                detail={insight.detail}
                severity={insight.severity}
              />
            ))}
          </div>
        </div>
      </motion.div>

      <StudentSpotlight />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="grid gap-5 md:grid-cols-3"
      >
        {teacherClasses.map((cls) => (
          <DataCard
            key={cls.id}
            title={cls.title}
            subtitle={cls.schedule}
            meta={`${Math.round(cls.averageGrade * 100)}% avg • ${Math.round(cls.attendance * 100)}% attendance`}
            actions={[
              { label: "View Reports", href: `/gradebook/${cls.id}` },
              { label: "Message", href: `/messages?class=${cls.id}` },
            ]}
            health={cls.alerts > 1 ? "warning" : "good"}
          />
        ))}
      </motion.div>

      <div className="rounded-3xl border border-dashed border-slate-200 bg-white/60 p-6">
        <p className="text-sm font-semibold text-slate-500">Quick Actions</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <Dialog open={addGradeOpen} onOpenChange={setAddGradeOpen}>
            <DialogTrigger asChild>
              <Button className="flex w-full items-center justify-between rounded-2xl border border-white/50 bg-white/80 px-4 py-3 text-left text-[var(--color-fg)] shadow-none hover:border-blue-200">
                <div>
                  <p className="text-sm font-semibold">Add Grade</p>
                  <p className="text-xs text-slate-500">Update Gradebook 2.0</p>
                </div>
                <PlusCircle className="h-5 w-5 text-slate-400" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Log a quick grade</DialogTitle>
                <DialogDescription>
                  Save time by capturing the highlight before class begins.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={void handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600" htmlFor="student">
                    Student
                  </label>
                  <Input
                    id="student"
                    placeholder="e.g. Liam Chen"
                    {...register("student")}
                  />
                  {errors.student && (
                    <p className="text-sm text-red-500">{errors.student.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-slate-600"
                    htmlFor="category"
                  >
                    Category
                  </label>
                  <Controller
                    control={control}
                    name="category"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="assignment">Assignment</SelectItem>
                          <SelectItem value="project">Project</SelectItem>
                          <SelectItem value="assessment">Assessment</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.category && (
                    <p className="text-sm text-red-500">{errors.category.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-600" htmlFor="score">
                    Score (%)
                  </label>
                  <Input
                    id="score"
                    type="number"
                    inputMode="numeric"
                    placeholder="92"
                    {...register("score")}
                  />
                  {errors.score && (
                    <p className="text-sm text-red-500">{errors.score.message}</p>
                  )}
                </div>
                <div className="flex justify-end gap-3">
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => setAddGradeOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save grade</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center justify-between rounded-2xl border border-white/50 bg-white/80 px-4 py-3 text-[var(--color-fg)] transition hover:border-blue-200 hover:shadow-lg"
            >
              <div>
                <p className="text-sm font-semibold">{action.label}</p>
                <p className="text-xs text-slate-500">{action.description}</p>
              </div>
              <action.icon className="h-5 w-5 text-slate-400" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
