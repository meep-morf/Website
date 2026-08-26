import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FinalCta } from "@/components/sections/FinalCta";
import { projects } from "@/content/projects";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Work",
  description:
    "Selected NomadLabz work — verified public projects and confidential engagements described without invented metrics.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <section className="section-pad border-b border-border-subtle">
        <div className="container-page">
          <FadeIn>
            <SectionHeader
              as="h1"
              kicker="Work"
              title="Selected projects"
              description="Only verified live URLs are linked. Confidential work is listed without client names, fake stats, or unverifiable claims."
            />
          </FadeIn>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <ul className="divide-y divide-border-subtle border-y border-border-subtle">
            {projects.map((project, index) => (
              <li key={project.slug}>
                <FadeIn delay={index * 0.03}>
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="group grid cursor-pointer gap-3 py-8 transition-colors hover:bg-surface/30 md:grid-cols-[10rem_1fr_8rem] md:items-center md:gap-8 md:px-2"
                  >
                    <p className="mono-label !text-faint">{project.industry}</p>
                    <div>
                      <h2 className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                        {project.title}
                      </h2>
                      <p className="mt-2 max-w-2xl text-sm text-muted">{project.summary}</p>
                    </div>
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-faint md:text-right">
                      {project.status === "live" ? "Live" : "Confidential"}
                    </p>
                  </Link>
                </FadeIn>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta title="Want work like this for your team?" />
    </>
  );
}
