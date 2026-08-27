import { FadeIn } from "@/components/motion/FadeIn";
import { ProjectListItem } from "@/components/motion/ProjectCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
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
      <section className="border-b border-border-subtle bg-bg-elevated/50">
        <div className="container-page grid items-center gap-10 section-pad lg:grid-cols-[1.15fr_0.85fr]">
          <FadeIn>
            <div className="relative rounded-sm border border-border-subtle bg-bg/90 p-8 backdrop-blur-sm md:p-10">
              <SectionHeader
                as="h1"
                kicker="Work"
                title="Selected projects"
                description="Only verified live URLs are linked. Confidential work is listed without client names, fabricated stats, or unverifiable claims."
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.06}>
            <div
              className="relative hidden min-h-[220px] overflow-hidden rounded-sm border border-border-subtle lg:block"
              aria-hidden
            >
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-info/5" />
              <div className="absolute bottom-6 left-6 right-6 space-y-3">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-10 rounded-sm border border-border-subtle bg-surface/40"
                    style={{ width: `${88 - i * 12}%`, marginLeft: `${i * 4}%` }}
                  />
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
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
