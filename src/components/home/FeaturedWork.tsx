import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import ProjectCard from "@/components/projects/ProjectCard";
import { projectBySlug } from "@/data/projects";

const slugs = ["adastra-active-directory-security-assessment", "workledger", "pulse-analytics", "askly", "ciphershare", "nitin-mahi-duo-studio"];
const selected = slugs.map((slug) => projectBySlug(slug)).filter((project) => project !== undefined);

export default function FeaturedWork() {
  return (
    <section id="work" className="section-pad relative">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Selected work"
            title={<>Built to solve, <span className="text-gradient">built to last.</span></>}
            description="A cross-section of security tooling, managed systems, full-stack products and mobile applications. Each card opens a case study."
          />
          <Link href="/projects" className="btn btn-ghost">
            All projects <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {selected.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.06}>
              <ProjectCard project={project} compact />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
