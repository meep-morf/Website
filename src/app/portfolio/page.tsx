import { ProjectListItem } from "@/components/motion/ProjectCard";
import { PortfolioHero } from "@/components/sections/PortfolioHero";
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
      <PortfolioHero />

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
