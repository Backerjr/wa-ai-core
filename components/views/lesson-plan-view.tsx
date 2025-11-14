"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, FileText, Lightbulb, Plus, Save, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

export function LessonPlanView() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = React.useState(false);
  const isMountedRef = React.useRef(true);

  React.useEffect(() => {
    // Track mounted state
    isMountedRef.current = true;

    return () => {
      // Cleanup: mark component as unmounted
      isMountedRef.current = false;
    };
  }, []);

  const handleAIGenerate = () => {
    setIsGenerating(true);
    const timeoutId = setTimeout(() => {
      // Only update state if component is still mounted
      if (isMountedRef.current) {
        setIsGenerating(false);
        toast({
          title: "AI Lesson Plan Generated",
          description: "Review and customize the suggested content below.",
        });
      }
    }, 2000);

    // Return cleanup function to clear timeout if needed
    return () => clearTimeout(timeoutId);
  };

  const handleSave = () => {
    toast({
      title: "Lesson Plan Saved",
      description: "Your lesson plan has been saved successfully.",
    });
  };

  return (
    <section className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-fg)]">Lesson Plan</h1>
            <p className="text-sm text-slate-500 mt-1">
              Create and manage your lesson plans with AI assistance
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleAIGenerate} disabled={isGenerating}>
              <Sparkles className="mr-2 h-4 w-4" />
              {isGenerating ? "Generating..." : "AI Generate"}
            </Button>
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Plan
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2 p-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="activities">Activities</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="assessment">Assessment</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Lesson Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Introduction to Quadratic Functions"
                    defaultValue="Quadratic Functions"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" defaultValue="Mathematics" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="grade">Grade Level</Label>
                    <Input id="grade" defaultValue="Grade 10" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input id="duration" defaultValue="50 minutes" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="objectives">Learning Objectives</Label>
                  <textarea
                    id="objectives"
                    className="w-full min-h-[100px] rounded-md border border-slate-300 p-3 text-sm"
                    placeholder="Enter learning objectives..."
                    defaultValue="• Students will understand the standard form of quadratic equations&#10;• Students will graph parabolas using vertex and intercepts&#10;• Students will solve real-world problems using quadratic models"
                  />
                </div>
              </TabsContent>

              <TabsContent value="activities" className="space-y-4 mt-4">
                <div className="space-y-4">
                  {[
                    {
                      time: "0-10 min",
                      title: "Warm-up & Review",
                      desc: "Review linear functions and introduce parabolas",
                    },
                    {
                      time: "10-25 min",
                      title: "Direct Instruction",
                      desc: "Teach quadratic equation components and graphing",
                    },
                    {
                      time: "25-40 min",
                      title: "Guided Practice",
                      desc: "Students practice graphing with teacher support",
                    },
                    {
                      time: "40-50 min",
                      title: "Independent Work",
                      desc: "Complete worksheet problems individually",
                    },
                  ].map((activity, idx) => (
                    <Card key={idx} className="p-4 border-l-4 border-l-blue-500">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Clock className="h-4 w-4 text-slate-500" />
                            <span className="text-xs font-medium text-slate-500">
                              {activity.time}
                            </span>
                          </div>
                          <h4 className="font-semibold text-[var(--color-fg)]">
                            {activity.title}
                          </h4>
                          <p className="text-sm text-slate-600 mt-1">{activity.desc}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Activity
                </Button>
              </TabsContent>

              <TabsContent value="resources" className="space-y-4 mt-4">
                <div className="space-y-3">
                  {[
                    { type: "Textbook", name: "Algebra 2 - Chapter 5, Section 1-3" },
                    { type: "Handout", name: "Quadratic Functions Worksheet" },
                    { type: "Technology", name: "Desmos Graphing Calculator" },
                    { type: "Visual Aid", name: "Parabola Poster" },
                  ].map((resource, idx) => (
                    <Card key={idx} className="p-4 flex items-center gap-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <div className="flex-1">
                        <Badge variant="outline" className="mb-1">
                          {resource.type}
                        </Badge>
                        <p className="text-sm font-medium text-[var(--color-fg)]">
                          {resource.name}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Resource
                </Button>
              </TabsContent>

              <TabsContent value="assessment" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="formative">Formative Assessment</Label>
                  <textarea
                    id="formative"
                    className="w-full min-h-[80px] rounded-md border border-slate-300 p-3 text-sm"
                    placeholder="How will you check understanding during the lesson?"
                    defaultValue="• Exit ticket with 3 graphing problems&#10;• Think-pair-share discussions&#10;• Monitor guided practice work"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="summative">Summative Assessment</Label>
                  <textarea
                    id="summative"
                    className="w-full min-h-[80px] rounded-md border border-slate-300 p-3 text-sm"
                    placeholder="How will you assess learning at the end?"
                    defaultValue="• Unit test on quadratic functions (Friday)&#10;• Project: Real-world quadratic modeling"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="differentiation">Differentiation</Label>
                  <textarea
                    id="differentiation"
                    className="w-full min-h-[80px] rounded-md border border-slate-300 p-3 text-sm"
                    placeholder="How will you support all learners?"
                    defaultValue="• Advanced: Challenge problems with complex coefficients&#10;• Support: Simplified graphing templates&#10;• ELL: Visual vocabulary cards"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </Card>

          <div className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="h-5 w-5 text-yellow-600" />
                <h3 className="font-semibold text-[var(--color-fg)]">AI Suggestions</h3>
              </div>
              <div className="space-y-3">
                <div className="rounded-lg bg-blue-50 p-3 text-sm">
                  <p className="font-medium text-blue-900 mb-1">Engagement Tip</p>
                  <p className="text-blue-700">
                    Start with a real-world example like projectile motion to hook
                    students.
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-3 text-sm">
                  <p className="font-medium text-green-900 mb-1">Common Misconception</p>
                  <p className="text-green-700">
                    Many students confuse the vertex with the y-intercept. Address this
                    early.
                  </p>
                </div>
                <div className="rounded-lg bg-purple-50 p-3 text-sm">
                  <p className="font-medium text-purple-900 mb-1">Extension Activity</p>
                  <p className="text-purple-700">
                    Have advanced students explore transformations of parent functions.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-slate-600" />
                <h3 className="font-semibold text-[var(--color-fg)]">Upcoming Plans</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Today</span>
                  <Badge>Active</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Tomorrow</span>
                  <Badge variant="outline">Solving Quadratics</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Thursday</span>
                  <Badge variant="outline">Vertex Form</Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
