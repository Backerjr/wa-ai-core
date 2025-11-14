"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Brain,
  CalendarRange,
  CheckCircle2,
  Copy,
  FileText,
  Loader2,
  Plus,
  Settings2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const aiTemplates = [
  {
    id: "diagnostic",
    title: "Diagnostic",
    description: "Gauge prior knowledge before starting a new unit.",
    duration: "10 questions • 15 min",
  },
  {
    id: "practice",
    title: "Practice Set",
    description: "Daily skill-building with scaffolded hints.",
    duration: "8 questions • 20 min",
  },
  {
    id: "exit",
    title: "Exit Ticket",
    description: "Quick pulse-check at the end of class.",
    duration: "5 questions • 8 min",
  },
] as const;

const seedQuestions = [
  {
    id: "q1",
    prompt: "Solve for x: x^2 - 6x + 8 = 0",
    answer: "x = 2 or x = 4",
    difficulty: "Medium",
  },
  {
    id: "q2",
    prompt: "The parabola y = (x-3)^2 - 4 has what vertex?",
    answer: "Vertex at (3, -4)",
    difficulty: "Easy",
  },
  {
    id: "q3",
    prompt:
      "A basketball is thrown with height h(t) = -16t^2 + 40t + 6. What is the maximum height?",
    answer: "The maximum height is 26 feet at t = 1.25 seconds.",
    difficulty: "Challenge",
  },
];

export function QuizBuilderView() {
  const { toast } = useToast();
  const [questions, setQuestions] = React.useState(seedQuestions);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [includeHints, setIncludeHints] = React.useState(true);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleGenerate = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsGenerating(true);
    timeoutRef.current = setTimeout(() => {
      setQuestions((prev) => [
        ...prev,
        {
          id: `q${prev.length + 1}`,
          prompt: "Graph the function y = -2(x+1)^2 + 5 and identify its key features.",
          answer:
            "Axis of symmetry x = -1, vertex (-1, 5), opening downward, vertical stretch by 2, y-intercept at 3.",
          difficulty: "Medium",
        },
      ]);
      setIsGenerating(false);
      timeoutRef.current = null;
      toast({
        title: "Quiz expanded",
        description: "Added an AI-suggested question based on today's lesson focus.",
      });
    }, 1600);
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleTemplateClick = (templateTitle: string) => {
    toast({
      title: "Template applied",
      description: `Loaded the ${templateTitle} template.`,
    });
  };

  const handleCopy = () => {
    toast({
      title: "Quiz copied",
      description: "Link copied to your clipboard.",
    });
  };

  return (
    <section className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[var(--color-fg)]">
              AI Quiz Builder
            </h1>
            <p className="text-sm text-slate-500">
              Generate, customize, and share formative checks in minutes.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCopy}>
              <Copy className="mr-2 h-4 w-4" /> Copy share link
            </Button>
            <Button onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-4 w-4" />
                  AI boost
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.4 }}
        className="grid gap-6 lg:grid-cols-[2fr_1fr]"
      >
        <Card className="p-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="quiz-title">Quiz title</Label>
              <Input id="quiz-title" defaultValue="Quadratic Functions Quick Check" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quiz-date">Assigned on</Label>
              <div className="flex gap-2">
                <Input id="quiz-date" type="date" className="flex-1" />
                <Select defaultValue="algebra-2">
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="algebra-2">Algebra II • Period 3</SelectItem>
                    <SelectItem value="algebra-2-5">Algebra II • Period 5</SelectItem>
                    <SelectItem value="honors">Honors Math • Period 1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Tabs defaultValue="questions">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="questions">Questions</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>

            <TabsContent value="questions" className="space-y-4 pt-4">
              {questions.map((question) => (
                <Card
                  key={question.id}
                  className="border-l-4 border-l-blue-500 bg-blue-50/50 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-[var(--color-fg)]">
                        {question.prompt}
                      </p>
                      <p className="text-xs text-slate-500">
                        Suggested answer: {question.answer}
                      </p>
                    </div>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600">
                      {question.difficulty}
                    </span>
                  </div>
                </Card>
              ))}
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                <Plus className="mr-2 h-4 w-4" />
                {isGenerating ? "Adding question..." : "Ask AI for another question"}
              </Button>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4 pt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty blend</Label>
                  <Select defaultValue="balanced">
                    <SelectTrigger id="difficulty">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gentle">Gentle scaffold</SelectItem>
                      <SelectItem value="balanced">Balanced mix</SelectItem>
                      <SelectItem value="stretch">Stretch and challenge</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="standards">Align to standards</Label>
                  <Input
                    id="standards"
                    placeholder="e.g., CCSS.MATH.CONTENT.HSA.CED.A.2"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-dashed border-slate-200 bg-white p-4">
                <div>
                  <p className="text-sm font-semibold text-[var(--color-fg)]">
                    Include step-by-step hints
                  </p>
                  <p className="text-xs text-slate-500">
                    Students can reveal hints after their first attempt.
                  </p>
                </div>
                <Switch checked={includeHints} onCheckedChange={setIncludeHints} />
              </div>
              <Card className="p-4">
                <h4 className="text-sm font-semibold text-[var(--color-fg)]">
                  Auto feedback tone
                </h4>
                <p className="text-xs text-slate-500">
                  Choose how the AI responds to student answers and misconceptions.
                </p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {["Encouraging", "Direct", "Growth-minded", "Socratic"].map((tone) => (
                    <Button key={tone} variant="ghost" className="justify-start">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-500" /> {tone}
                    </Button>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4 pt-4">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <CalendarRange className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-fg)]">Window</p>
                    <p className="text-xs text-slate-500">
                      Opens today at 3:15 PM • Closes tomorrow at 11:59 PM
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-start gap-3">
                  <Settings2 className="h-5 w-5 text-blue-600" />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-[var(--color-fg)]">
                      Release conditions
                    </p>
                    <p className="text-xs text-slate-500">
                      Shuffle question order, allow one retake, auto-submit when timer
                      expires.
                    </p>
                  </div>
                </div>
              </Card>
              <div className="rounded-2xl border border-dashed border-blue-200 bg-blue-50/50 p-4 text-sm text-slate-600">
                <p className="font-semibold text-[var(--color-fg)]">Tip</p>
                <p className="mt-1">
                  Share instantly to Google Classroom or export as a printable PDF once
                  you finalize the settings.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        <div className="space-y-4">
          <Card className="p-6 space-y-4">
            <h3 className="text-sm font-semibold text-[var(--color-fg)]">AI templates</h3>
            <div className="space-y-3">
              {aiTemplates.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => handleTemplateClick(template.title)}
                  className="w-full rounded-2xl border border-slate-200 bg-white/80 p-4 text-left transition hover:border-blue-200 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[var(--color-fg)]">
                        {template.title}
                      </p>
                      <p className="text-xs text-slate-500">{template.description}</p>
                    </div>
                    <span className="text-xs font-medium text-slate-400">
                      {template.duration}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          <Card className="space-y-4 p-6">
            <h3 className="text-sm font-semibold text-[var(--color-fg)]">
              Smart alignment
            </h3>
            <div className="space-y-3 text-xs text-slate-500">
              <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-3">
                <p className="font-medium text-[var(--color-fg)]">Lesson focus</p>
                <p>Quadratic graph transformations • Vertex form • Applications</p>
              </div>
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-3">
                <p className="font-medium text-[var(--color-fg)]">Student signals</p>
                <p>
                  27 students mastered factoring, 6 flagged for support with interpreting
                  graphs.
                </p>
              </div>
              <div className="rounded-2xl border border-purple-100 bg-purple-50/60 p-3">
                <p className="font-medium text-[var(--color-fg)]">
                  Recommended adjustments
                </p>
                <p>
                  Add an optional challenge problem on modeling projectile motion and
                  enable hints for question 3.
                </p>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              <FileText className="mr-2 h-4 w-4" /> Export preview
            </Button>
          </Card>
        </div>
      </motion.div>
    </section>
  );
}
