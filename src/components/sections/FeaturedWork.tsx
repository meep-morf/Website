import { FadeIn } from "@/components/motion/FadeIn";
import { FeaturedProjectCard } from "@/components/motion/ProjectCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getFeaturedProjects } from "@/content/projects";

export function FeaturedWork() {
  const featured = getFeaturedProjects();

  return (
    <section className="section-pad border-b border-border-subtle">
      <div className="container-page">
        <FadeIn>
          <SectionHeader
            kicker="Selected Work"
            title="Projects that prove the operating layer"
            description="Verified public work and confidential engagements — described honestly, without invented metrics."
          />
        </FadeIn>
        <div className="mt-12 grid gap-px bg-border-subtle md:grid-cols-2">
          {featured.map((project, index) => (
            <FeaturedProjectCard
              key={project.slug}
              slug={project.slug}
              industry={project.industry}
              title={project.title}
              summary={project.summary}
              status={project.status}
              index={index}
            />
          ))}
        </div>
        <div className="mt-10">
          <ButtonLink href="/portfolio" variant="secondary">
            Browse the Portfolio
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
