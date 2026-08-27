import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/motion/FadeIn";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ExternalLinkButton } from "@/components/ui/ExternalLinkButton";
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

  return (
    <>
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
          </FadeIn>
        </div>
      </section>

      <section className="section-pad border-b border-border-subtle">
        <div className="container-page grid max-w-4xl gap-12">
          <FadeIn>
            <div>
              <h2 className="mono-label mb-3">Challenge</h2>
              <p className="text-muted">{project.challenge}</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div>
              <h2 className="mono-label mb-3">Approach</h2>
              <p className="text-muted">{project.approach}</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div>
              <h2 className="mono-label mb-3">Outcome</h2>
              <p className="text-muted">{project.outcome}</p>
            </div>
          </FadeIn>
          {project.technologies?.length ? (
            <FadeIn delay={0.1}>
              <div>
                <h2 className="mono-label mb-3">Focus</h2>
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
          <Link
            href="/portfolio"
            className="cursor-pointer font-mono text-xs uppercase tracking-[0.14em] text-accent hover:text-focus"
          >
            ← All work
          </Link>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
