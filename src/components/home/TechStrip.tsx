const tech = [
  "Python", "C#", "C++", "TypeScript", "React", "Next.js", ".NET", "Flutter", "Dart",
  "FastAPI", "PostgreSQL", "Active Directory", "OWASP", "RAG", "Docker", "Linux", "Git",
];

export default function TechStrip() {
  return (
    <section aria-label="Technologies" className="relative overflow-hidden border-y border-white/[0.07] bg-surface/30 py-5">
      <div className="marquee-track items-center gap-10">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-10" aria-hidden={copy === 1}>
            {tech.map((item) => (
              <span key={`${copy}-${item}`} className="flex items-center gap-10 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.2em] text-dim">
                {item}
                <span className="size-1 rounded-full bg-cyan/40" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
