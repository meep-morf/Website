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
      <section className="relative overflow-hidden border-b border-border-subtle">
        <div className="absolute inset-0 opacity-50">
          <HeroFuturisticLazy
            titleWords="Selected projects"
            subtitle="Verified work. Honest descriptions."
            heightClassName="h-full min-h-[240px]"
          />
        </div>
        <div className="container-page relative z-10 section-pad">
          <FadeIn>
            <SectionHeader
              as="h1"
              kicker="Work"
              title="Selected projects"
              description="Only verified live URLs are linked. Confidential work is listed without client names, fabricated stats, or unverifiable claims."
            />
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
