import { FadeIn } from "@/components/motion/FadeIn";
import { GlobeStudyLazy } from "@/components/ui/globe-study-lazy";
import { AboutHeroContent, ValuesGrid } from "@/components/sections/AboutMotion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FinalCta } from "@/components/sections/FinalCta";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Company",
  description:
    "About NomadLabz — a software and cybersecurity studio building the invisible operating layer. Honest positioning, no invented credentials.",
  path: "/about",
});

const values = [
  {
    title: "Integrity",
    text: "We do not invent metrics, team bios, office locations, or awards. What we publish should be true.",
  },
  {
    title: "Craft",
    text: "Software should be operable after launch — readable, maintainable, and intentional.",
  },
  {
    title: "Security awareness",
    text: "Controls belong in design and delivery. Risk is discussed plainly, not dramatized.",
  },
  {
    title: "Partnership",
    text: "We listen carefully, communicate clearly, and treat scope as a shared responsibility.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="section-pad border-b border-border-subtle">
        <div className="container-page max-w-3xl">
          <FadeIn>
            <AboutHeroContent
              kicker="Company"
              title="NomadLabz builds the invisible operating layer"
              description="We design and ship software systems — and the security practices that protect them — so businesses can move with confidence."
            />
          </FadeIn>
        </div>
      </section>

      <section className="section-pad border-b border-border-subtle">
        <div className="container-page max-w-3xl prose-site">
          <FadeIn>
            <h2 className="display-heading text-3xl">Who we are</h2>
            <p className="mt-5 text-muted">
              NomadLabz is a software and cybersecurity studio focused on practical systems:
              product surfaces, integrations, cloud delivery, and security engineering that
              stay useful after the launch announcement fades.
            </p>
            <p className="text-muted">
              We believe technology should reduce operational friction — not add theater. That
              means honest scoping, durable architecture, and security treated as part of how
              systems run.
            </p>
            <p className="text-muted">
              This page intentionally omits invented founding myths, fabricated headcount,
              office tours, and year-count claims. If you need specifics for a proposal, ask —
              we will answer directly.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-pad border-b border-border-subtle bg-bg-elevated/40">
        <div className="container-page">
          <FadeIn>
            <SectionHeader
              kicker="Principles"
              title="What guides the work"
              description="A short set of operating principles — not a culture deck."
            />
          </FadeIn>
          <ValuesGrid values={values} />
        </div>
      </section>

      <section className="section-pad border-b border-border-subtle">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <FadeIn>
            <SectionHeader
              kicker="Global reach"
              title="Systems without borders"
              description="NomadLabz partners with teams across regions — building software and security capabilities that travel with the business, not against it."
            />
          </FadeIn>
          <FadeIn delay={0.06}>
            <div className="relative aspect-square max-h-[min(72vw,420px)] w-full overflow-hidden rounded-sm border border-border-subtle bg-bg-elevated lg:max-h-[480px] lg:justify-self-end">
              <GlobeStudyLazy mode="dark" opacity={0.95} />
            </div>
          </FadeIn>
        </div>
      </section>

      <FinalCta
        title="Want to work with NomadLabz?"
        description="Tell us what you are building. We will respond with clear next steps — or an honest no if we are not the right fit."
      />
    </>
  );
}
