import { FadeIn } from "@/components/motion/FadeIn";
import { ProjectListItem } from "@/components/motion/ProjectCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { HeroVisualFallback } from "@/components/ui/HeroVisualFallback";
import { NOMAD_SYNAPSE_THEME } from "@/components/ui/interactive-synapse-network";
import { InteractiveSynapseNetworkLazy } from "@/components/ui/interactive-synapse-network-lazy";
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
      <section className="border-b border-border-subtle bg-bg-subtle/60 section-tint-info">
        <div className="container-page grid items-center gap-10 section-pad lg:grid-cols-[1.15fr_0.85fr]">
          <FadeIn>
            <div className="relative rounded-sm border border-border-subtle bg-bg/90 p-8 backdrop-blur-sm md:p-10">
              <SectionHeader
                as="h1"
                kicker="Work"
                title="Selected projects"
                description="Verified live URLs where we can share them. Confidential engagements are described without client names, fabricated metrics, or unverifiable claims."
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.06}>
            <div
              className="relative min-h-[220px] overflow-hidden rounded-sm border border-info-border/25 lg:min-h-[280px]"
              aria-hidden
            >
              <ErrorBoundary
                fallback={
                  <HeroVisualFallback
                    className="h-full min-h-[220px] lg:min-h-[280px]"
                    variant="gradient"
                  />
                }
              >
                <InteractiveSynapseNetworkLazy
                  {...NOMAD_SYNAPSE_THEME}
                  nodeCount={48}
                  connectionRadius={150}
                  trailOpacity={0.18}
                  className="absolute inset-0 h-full w-full"
                  ariaLabel="Portfolio work network visualization"
                />
              </ErrorBoundary>
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-bg/30 via-transparent to-accent-muted/30"
                aria-hidden
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
