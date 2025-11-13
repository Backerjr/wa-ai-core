import { Suspense } from "react";

import { QuizBuilderView } from "@/components/views/quiz-builder-view";

function QuizPageContent() {
  return <QuizBuilderView />;
}

export default function QuizPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading quiz builder...</div>}>
      <QuizPageContent />
    </Suspense>
  );
}
