"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="shell flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <span className="grid size-16 place-items-center rounded-2xl border border-gold/30 bg-gold/10 text-gold">
        <AlertTriangle className="size-7" />
      </span>
      <h1 className="display mt-7 text-4xl sm:text-5xl">Something broke in the build.</h1>
      <p className="pretty mt-4 max-w-md text-sm leading-relaxed text-muted">
        This page hit an unexpected error. Retrying is safe — no data was changed by the failed render.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={reset} className="btn btn-primary"><RotateCcw className="size-4" /> Try again</button>
        <Link href="/" className="btn btn-ghost">Back to home</Link>
      </div>
    </section>
  );
}
