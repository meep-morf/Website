import { FadeIn } from "@/components/motion/FadeIn";
import { ProjectListItem } from "@/components/motion/ProjectCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HeroFuturisticLazy } from "@/components/ui/hero-futuristic-lazy";
import { FinalCta } from "@/components/sections/FinalCta";
import { projects } from "@/content/projects";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Work",
  description:
    "Selected NomadLabz work — verified public projects and confidential engagements described without invented metrics or client names.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <section className="relative min-h-[min(58vh,520px)] overflow-hidden border-b border-border-subtle section-tint-info">
        <div className="absolute inset-0 z-0" aria-hidden>
          <HeroFuturisticLazy
            titleWords="Selected projects"
            subtitle="Engineering work across products, platforms, and security."
            heightClassName="h-full min-h-[min(58vh,520px)]"
            intensity={0.82}
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg/25 via-bg/55 to-bg/88"
            aria-hidden
          />
        </div>
        <div className="container-page relative z-10 flex min-h-[min(58vh,520px)] items-center section-pad">
          <FadeIn>
            <div className="max-w-2xl rounded-sm border border-border-subtle bg-bg/88 p-8 backdrop-blur-md md:p-10">
              <SectionHeader
                as="h1"
                kicker="Work"
                title="Selected projects"
                description="Verified live URLs where we can share them. Confidential engagements are described without client names, fabricated metrics, or unverifiable claims."
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <p className="mono-label mb-8">
            {projects.length} projects — public and confidential
          </p>
          <ul className="divide-y divide-border-subtle border-y border-border-subtle">
            {projects.map((project, index) => (
              <ProjectListItem
                key={project.slug}
                slug={project.slug}
                industry={project.industry}
                title={project.title}
                summary={project.summary}
                status={project.status}
                index={index}
              />
            ))}
          </ul>
        </div>
      </section>

      <FinalCta
        title="Want work like this for your team?"
        description="Share your goals and constraints. We will tell you honestly whether NomadLabz is the right fit."
      />
    </>
  );
}
