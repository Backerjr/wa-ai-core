import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PublicLandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="space-y-6 text-center">
        <h1 className="text-5xl font-bold">RozmoWA HYPER — Neural Classroom</h1>
        <div className="flex justify-center gap-4 pt-4">
          <Link href="/dashboard/teacher" passHref>
            <Button size="lg">I&apos;m a Teacher</Button>
          </Link>
          <Link href="/student" passHref>
            <Button size="lg">I&apos;m a Student</Button>
          </Link>
          <Link href="/dashboard/manager" passHref>
            <Button size="lg">I&apos;m a Manager</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
