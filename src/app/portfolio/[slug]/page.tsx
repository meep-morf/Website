import { notFound } from "next/navigation";
import { FadeIn } from "@/components/motion/FadeIn";
import { CaseStudyProgress } from "@/components/motion/CaseStudyProgress";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ExternalLinkButton } from "@/components/ui/ExternalLinkButton";
import { BackToPortfolio } from "@/components/ui/BackToPortfolio";
import { FinalCta } from "@/components/sections/FinalCta";
import { getProject, projects } from "@/content/projects";
import { buildMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/portfolio/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const sections = [
    { label: "Context", content: project.context },
    { label: "Challenge", content: project.challenge },
    { label: "NomadLabz role", content: project.role },
    { label: "Solution", content: project.solution },
    { label: "Outcome", content: project.outcome },
  ];

  return (
    <>
      <CaseStudyProgress />
      <section className="section-pad border-b border-border-subtle">
        <div className="container-page max-w-4xl">
          <FadeIn>
            <p className="mono-label mb-4">{project.industry}</p>
            <h1 className="display-heading text-4xl md:text-5xl">{project.title}</h1>
            <p className="mt-5 text-lg text-muted">{project.summary}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-faint">
                {project.status === "live" ? "Public / Live" : "Confidential"}
              </span>
              {project.url ? (
                <>
                  <ButtonLink href={project.url} variant="secondary" external>
                    Visit Live Site
                  </ButtonLink>
                  <ExternalLinkButton
                    href={project.url}
                    ariaLabel={`Open ${project.title} in a new tab`}
                  />
                </>
              ) : null}
            </div>
            <ul className="mt-6 flex flex-wrap gap-2">
              {project.capabilities.map((cap) => (
                <li
                  key={cap}
                  className="border border-accent-border/40 bg-accent-muted/20 px-3 py-1 font-mono text-xs uppercase tracking-[0.12em] text-accent"
                >
                  {cap}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      <section className="section-pad border-b border-border-subtle">
        <div className="container-page grid max-w-4xl gap-12">
          {sections.map((section, index) => (
            <FadeIn key={section.label} delay={index * 0.05}>
              <div>
                <h2 className="mono-label mb-3">{section.label}</h2>
                <p className="text-muted">{section.content}</p>
              </div>
            </FadeIn>
          ))}
          <FadeIn delay={0.1}>
            <div>
              <h2 className="mono-label mb-3">Core capabilities</h2>
              <ul className="space-y-2 text-muted">
                {project.coreCapabilities.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-accent" aria-hidden>—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          {project.technologies?.length ? (
            <FadeIn delay={0.12}>
              <div>
                <h2 className="mono-label mb-3">Technologies</h2>
                <ul className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="border border-border px-3 py-1 font-mono text-xs uppercase tracking-[0.12em] text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ) : null}
          <BackToPortfolio />
        </div>
      </section>

      <FinalCta
        title="Interested in similar work?"
        description="Describe your project. We will respond with an honest assessment of fit and next steps."
      />
    </>
  );
}
