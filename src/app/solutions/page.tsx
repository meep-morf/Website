import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlobeStudyLazy } from "@/components/ui/globe-study-lazy";
import { FinalCta } from "@/components/sections/FinalCta";
import { industries } from "@/content/industries";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Solutions",
  description:
    "Industry solutions from NomadLabz — startups, enterprises, operations, professional services, and sensitive environments.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <section className="section-pad border-b border-border-subtle">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <FadeIn>
            <SectionHeader
              as="h1"
              kicker="Solutions"
              title="Industry context. Same operating discipline."
              description="We adapt software and security work to the constraints of your sector — without inventing domain credentials we do not have."
            />
          </FadeIn>
          <FadeIn delay={0.05}>
            <div className="relative aspect-square max-h-[min(68vw,360px)] w-full overflow-hidden rounded-sm border border-border-subtle bg-bg-elevated lg:max-h-[400px] lg:justify-self-end">
              <GlobeStudyLazy mode="dark" opacity={0.9} scale={0.95} />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page space-y-16">
          {industries.map((industry, index) => (
            <FadeIn key={industry.slug}>
              <article
                id={industry.slug}
                className="scroll-mt-28 grid gap-8 border-t border-border-subtle pt-12 lg:grid-cols-[0.9fr_1.1fr]"
              >
                <div>
                  <p className="font-mono text-xs text-faint">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-3 display-heading text-3xl md:text-4xl">
                    {industry.title}
                  </h2>
                  <p className="mt-4 text-muted">{industry.summary}</p>
                </div>
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <h3 className="mono-label mb-3">Common challenges</h3>
                    <ul className="space-y-2 text-sm text-muted">
                      {industry.challenges.map((item) => (
                        <li key={item} className="border-l border-border pl-3">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="mono-label mb-3">How NomadLabz helps</h3>
                    <ul className="space-y-2 text-sm text-muted">
                      {industry.approach.map((item) => (
                        <li key={item} className="border-l border-accent-border pl-3">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      <FinalCta title="Building for a specific industry context?" />
    </>
  );
}
