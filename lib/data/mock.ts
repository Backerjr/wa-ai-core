export type AttendanceStatus = "Present" | "Absent" | "Tardy";

export type StudentRecord = {
  id: string;
  name: string;
  status: AttendanceStatus;
  notes?: string;
  tardies?: number;
};

export type GradebookRow = {
  id: string;
  name: string;
  assignment: number;
  project: number;
  assessment: number;
  final?: number;
  aiInsight: string;
};

export type ClassSummary = {
  id: string;
  title: string;
  schedule: string;
  nextTopic: string;
  status: string;
  averageGrade: number;
  attendance: number;
  alerts: number;
};

export type Insight = {
  id: string;
  title: string;
  detail: string;
  severity: "success" | "warning" | "info";
};

export const teacherClasses: ClassSummary[] = [
  {
    id: "grade-10-math",
    title: "Grade 10 Math",
    schedule: "08:45 AM • Room 201",
    nextTopic: "Quadratic Functions",
    status: "Next in 15 mins",
    averageGrade: 0.91,
    attendance: 0.96,
    alerts: 2
  },
  {
    id: "grade-11-physics",
    title: "Grade 11 Physics",
    schedule: "10:30 AM • Lab 3",
    nextTopic: "Wave Interference",
    status: "Starts in 85 mins",
    averageGrade: 0.88,
    attendance: 0.94,
    alerts: 1
  },
  {
    id: "homeroom",
    title: "Homeroom",
    schedule: "12:10 PM • Commons",
    nextTopic: "Goal Planning",
    status: "Completed",
    averageGrade: 0.9,
    attendance: 0.99,
    alerts: 0
  }
];

export const aiInsights: Insight[] = [
  {
    id: "insight-1",
    title: "Attendance",
    detail: "3 students showed consistent lateness this week.",
    severity: "warning"
  },
  {
    id: "insight-2",
    title: "Performance",
    detail: "Algebra quiz scores improved by 8% vs last month.",
    severity: "success"
  },
  {
    id: "insight-3",
    title: "Engagement",
    detail: "Physics forum participation dropped 12% yesterday.",
    severity: "info"
  }
];

export const managerKpis = {
  attendance: 0.96,
  avgGrade: 0.87,
  activeAlerts: 4,
  forecast: "+2% improvement next quarter"
};

export const topPerformingClasses = [
  { id: "grade-10-math", name: "Grade 10 Math", avg: 0.94 },
  { id: "grade-9-sci", name: "Grade 9 Science", avg: 0.91 },
  { id: "grade-12-bio", name: "Grade 12 Biology", avg: 0.89 }
];

export const staffAlerts = [
  { id: "alert-1", message: "Submit updated safety drill checklist." },
  { id: "alert-2", message: "Onboard the new counselor by Friday." }
];

export const attendanceByClass: Record<string, StudentRecord[]> = {
  "grade-10-math": [
    { id: "s1", name: "Liam Chen", status: "Present" },
    { id: "s2", name: "Ava Patel", status: "Tardy", notes: "Doc appt" },
    { id: "s3", name: "Maya Ortiz", status: "Present" },
    { id: "s4", name: "Ethan Brooks", status: "Absent", notes: "Travel" }
  ],
  "grade-11-physics": [
    { id: "s5", name: "Noah Reed", status: "Present" },
    { id: "s6", name: "Sofia Gomez", status: "Present" },
    { id: "s7", name: "Isla Ford", status: "Tardy", notes: "Bus delay" }
  ]
};

export const gradebookByClass: Record<string, GradebookRow[]> = {
  "grade-10-math": [
    {
      id: "s1",
      name: "Liam Chen",
      assignment: 92,
      project: 88,
      assessment: 94,
      aiInsight: "Strong retention"
    },
    {
      id: "s2",
      name: "Ava Patel",
      assignment: 85,
      project: 91,
      assessment: 87,
      aiInsight: "Focus on speed"
    },
    {
      id: "s3",
      name: "Maya Ortiz",
      assignment: 89,
      project: 93,
      assessment: 90,
      aiInsight: "Great participation"
    }
  ],
  "grade-11-physics": [
    {
      id: "s5",
      name: "Noah Reed",
      assignment: 94,
      project: 90,
      assessment: 95,
      aiInsight: "Mentor others"
    }
  ]
};

export const studentProgress = {
  name: "Emily",
  subjects: [
    { id: "math", name: "Math", score: 0.82 },
    { id: "english", name: "English", score: 0.9 },
    { id: "science", name: "Science", score: 0.85 }
  ],
  coachSuggestion: "Focus 20 min on Geometry today.",
  achievements: [
    { id: "streak", label: "Consistency", detail: "10 day streak" },
    { id: "math", label: "Math", detail: "+8% this month" }
  ]
};

export type AiCommand = {
  command: string;
  description: string;
};

export const aiCommands: AiCommand[] = [
  {
    command: "/ask",
    description: "Summarize student progress"
  },
  {
    command: "/generate",
    description: "Create differentiated practice set"
  },
  {
    command: "/insight",
    description: "Show attendance anomalies"
  }
];
