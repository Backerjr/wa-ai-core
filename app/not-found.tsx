import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[var(--color-bg)] text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-slate-400">AI Platform</p>
      <h1 className="text-4xl font-display text-[var(--color-fg)]">Page not found</h1>
      <p className="text-slate-500">
        The requested classroom does not exist. Try returning home.
      </p>
      <Link
        href="/dashboard/teacher"
        className="rounded-full bg-[var(--color-brand)] px-6 py-3 text-white shadow-lg"
      >
        Back to Teacher Dashboard
      </Link>
    </div>
  );
}
