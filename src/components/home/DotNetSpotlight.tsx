import Link from "next/link";
import { ArrowUpRight, Braces, ClipboardCheck, Clock3, Wallet } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const features = [
  { icon: ClipboardCheck, label: "Attendance management" },
  { icon: Braces, label: "Project work tracking" },
  { icon: Clock3, label: "Overtime tracking" },
  { icon: Wallet, label: "Salary verification" },
];

export default function DotNetSpotlight() {
  return (
    <section className="section-pad relative border-y border-white/[0.06] bg-surface/20">
      <div className="shell grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">.NET engineering</p>
          <h2 className="display mt-4 text-4xl sm:text-5xl">
            WorkLedger — <span className="text-sky-300">managed systems</span> that keep records honest.
          </h2>
          <p className="pretty mt-6 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            A private C#, ASP.NET Core 8 and React system for attendance, tracked work, overtime and salary verification.
            Built as one coherent workflow rather than a set of disconnected spreadsheets.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.label} className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-bg/50 px-4 py-3">
                <feature.icon className="size-4 shrink-0 text-sky-300" />
                <span className="text-xs font-medium text-ink">{feature.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/projects/workledger" className="btn btn-primary">
              View case study <ArrowUpRight className="size-4" />
            </Link>
            <Link href="/skills" className="btn btn-ghost">
              .NET skill set
            </Link>
          </div>
          <p className="mt-5 text-[11px] text-dim">Source repository is private; no code or undisclosed architecture is published.</p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="panel relative overflow-hidden p-6 sm:p-8">
            <div className="absolute -right-16 -top-16 size-56 rounded-full bg-sky-400/10 blur-3xl" />
            <div className="relative flex items-center justify-between border-b border-white/[0.08] pb-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-dim">System snapshot</p>
                <p className="mt-1 font-display text-lg font-bold">WorkLedger</p>
              </div>
              <span className="chip border-sky-300/30 text-sky-300">ASP.NET Core 8</span>
            </div>
            <div className="relative mt-6 space-y-3">
              {[
                { label: "Attendance", value: "Tracked", width: "82%" },
                { label: "Project work", value: "Logged", width: "68%" },
                { label: "Overtime", value: "Verified", width: "54%" },
                { label: "Salary review", value: "Checked", width: "74%" },
              ].map((row) => (
                <div key={row.label} className="rounded-xl border border-white/[0.07] bg-bg/60 p-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted">{row.label}</span>
                    <span className="font-semibold text-ink">{row.value}</span>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <div className="h-full rounded-full bg-gradient-to-r from-sky-400 to-cyan" style={{ width: row.width }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="relative mt-5 text-[10px] text-dim">Interface illustration — not a screenshot of private source code.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
