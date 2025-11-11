"use client";

import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { studentProgress } from "@/lib/data/mock";

export function StudentPortal() {
  return (
    <section className="space-y-6">
      <Card className="rounded-3xl border border-white/40 p-6">
        <p className="text-sm text-slate-500">Welcome back</p>
        <h2 className="font-display text-3xl text-[var(--color-fg)]">Hi {studentProgress.name} 👋</h2>
        <p className="text-sm text-slate-500">Here&apos;s how you&apos;re growing this week.</p>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {studentProgress.subjects.map((subject, index) => (
          <motion.div
            key={subject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
          >
            <Card className="rounded-3xl border border-white/40 p-5 text-center">
              <p className="text-sm text-slate-500">{subject.name}</p>
              <p className="text-4xl font-semibold text-[var(--color-fg)]">
                {Math.round(subject.score * 100)}%
              </p>
              <div className="mt-4 h-2 rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-green-400"
                  style={{ width: `${subject.score * 100}%` }}
                />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="rounded-3xl border border-white/40 p-5">
        <h3 className="text-lg font-semibold text-[var(--color-fg)]">AI Coach</h3>
        <p className="text-sm text-slate-500">Personalized daily nudge</p>
        <p className="mt-3 text-base">“{studentProgress.coachSuggestion}”</p>
        <Button className="mt-4 w-full gap-2" size="lg">
          <PlayCircle className="h-5 w-5" />
          Start Study Session
        </Button>
      </Card>

      <Card className="rounded-3xl border border-white/40 p-5">
        <p className="text-sm font-semibold text-slate-500">Achievements</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {studentProgress.achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="rounded-2xl border border-white/40 bg-white/70 px-4 py-3 text-sm font-semibold text-[var(--color-fg)]"
            >
              {achievement.label}: {achievement.detail}
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
