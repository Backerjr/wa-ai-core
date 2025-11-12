import { Suspense } from "react";
import { MessagesView } from "@/components/views/messages-view";

function MessagesPageContent() {
  return <MessagesView />;
}

export default function MessagesPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading messages...</div>}>
      <MessagesPageContent />
    </Suspense>
  );
}
