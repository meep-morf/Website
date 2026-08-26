import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FinalCta } from "@/components/sections/FinalCta";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Company",
  description:
    "About NomadLabz — software engineering and cybersecurity for the invisible operating layer behind modern businesses.",
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
            <SectionHeader
              as="h1"
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
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {values.map((value, index) => (
              <FadeIn key={value.title} delay={index * 0.04}>
                <article className="border-t border-border-subtle pt-5">
                  <h3 className="text-xl font-semibold">{value.title}</h3>
                  <p className="mt-3 text-sm text-muted">{value.text}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <FinalCta title="Want to work with NomadLabz?" />
    </>
  );
}
