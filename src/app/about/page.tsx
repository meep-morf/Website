import { FadeIn } from "@/components/motion/FadeIn";
import { OperationalSystemField } from "@/components/hero/OperationalSystemField";
import { AboutHeroContent, ValuesGrid } from "@/components/sections/AboutMotion";
import { AboutEditorial } from "@/components/sections/AboutEditorial";
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
      <section className="relative min-h-[min(72vh,560px)] overflow-hidden border-b border-border-subtle">
        <OperationalSystemField />
        <div className="container-page relative z-10 flex min-h-[min(72vh,560px)] items-center section-pad">
          <FadeIn>
            <div className="max-w-3xl rounded-sm border border-border-subtle bg-bg/85 p-8 backdrop-blur-md md:p-10">
              <AboutHeroContent
                kicker="Company"
                title="NomadLabz builds the invisible operating layer"
                description="We design and ship software systems — and the security practices that protect them — so businesses can move with confidence."
              />
            </div>
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
            <p className="mono-label mb-4">Principles</p>
            <h2 className="display-heading text-3xl md:text-4xl">What guides the work</h2>
            <p className="mt-4 max-w-2xl text-muted">
              A short set of operating principles — not a culture deck.
            </p>
          </FadeIn>
          <ValuesGrid values={values} />
        </div>
      </section>

      <section className="section-pad border-b border-border-subtle">
        <div className="container-page">
          <FadeIn>
            <AboutEditorial />
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
