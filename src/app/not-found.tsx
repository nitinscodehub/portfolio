import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <span className="grid size-16 place-items-center rounded-2xl border border-cyan/30 bg-cyan/10 text-cyan">
        <Compass className="size-7" />
      </span>
      <p className="eyebrow mt-7">404 · Off the map</p>
      <h1 className="display mt-4 text-4xl sm:text-6xl">This route doesn&apos;t exist.</h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
        The page may have moved, or the URL may be incomplete. The project archive is a good place to restart.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary"><ArrowLeft className="size-4" /> Home</Link>
        <Link href="/projects" className="btn btn-ghost">Browse projects</Link>
      </div>
    </section>
  );
}
