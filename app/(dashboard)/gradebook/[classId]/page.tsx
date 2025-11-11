import { notFound } from "next/navigation";

import { GradebookGrid } from "@/components/views/gradebook-grid";
import { gradebookByClass, teacherClasses, type ClassSummary } from "@/lib/data/mock";

interface GradebookPageProps {
  params: Promise<{ classId: string }>;
}

export default async function GradebookPage({ params }: GradebookPageProps) {
  const { classId } = await params;
  const rows = gradebookByClass[classId];
  if (!rows) {
    notFound();
  }
  const classMeta = teacherClasses.find((cls: ClassSummary) => cls.id === classId);
  return (
    <GradebookGrid
      classNameLabel={classMeta?.title ?? classId}
      classId={classId}
      rows={rows}
      classOptions={teacherClasses}
    />
  );
}
