import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
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
            <FadeIn key={project.slug} delay={index * 0.05}>
              <Link
                href={`/portfolio/${project.slug}`}
                className="group flex h-full cursor-pointer flex-col bg-bg p-7 transition-colors duration-200 hover:bg-surface md:p-9"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="mono-label !text-faint">{project.industry}</p>
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-faint">
                    {project.status === "live" ? "Live" : "Confidential"}
                  </span>
                </div>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                  {project.title}
                </h3>
                <p className="mt-3 flex-1 text-sm text-muted md:text-base">{project.summary}</p>
                <span className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-accent">
                  Case detail
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
        <div className="mt-10">
          <ButtonLink href="/portfolio" variant="secondary">
            Explore Our Work
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
