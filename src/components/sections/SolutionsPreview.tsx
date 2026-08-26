import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { industries } from "@/content/industries";

export function SolutionsPreview() {
  return (
    <section className="section-pad border-b border-border-subtle">
      <div className="container-page">
        <FadeIn>
          <SectionHeader
            kicker="Solutions"
            title="Built around how industries actually operate"
            description="Same engineering discipline — different constraints. We adapt the operating layer to context."
          />
        </FadeIn>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => (
            <FadeIn key={industry.slug} delay={index * 0.04}>
              <article className="border-t border-accent-border pt-5">
                <h3 className="text-xl font-semibold tracking-tight">{industry.title}</h3>
                <p className="mt-3 text-sm text-muted">{industry.summary}</p>
              </article>
            </FadeIn>
          ))}
        </div>
        <div className="mt-10">
          <ButtonLink href="/solutions" variant="secondary">
            Industry Solutions
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
