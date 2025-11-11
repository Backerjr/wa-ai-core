import { notFound } from "next/navigation";

import { AttendanceBoard } from "@/components/views/attendance-board";
import { attendanceByClass, teacherClasses, type ClassSummary } from "@/lib/data/mock";

interface AttendancePageProps {
  params: Promise<{ classId: string }>;
}

export default async function AttendancePage({ params }: AttendancePageProps) {
  const { classId } = await params;
  const students = attendanceByClass[classId];
  if (!students) {
    notFound();
  }
  const classMeta = teacherClasses.find((cls: ClassSummary) => cls.id === classId);
  return (
    <AttendanceBoard
      classId={classId}
      classNameLabel={`${classMeta?.title ?? classId} • Attendance`}
      students={students}
      classOptions={teacherClasses}
    />
  );
}
