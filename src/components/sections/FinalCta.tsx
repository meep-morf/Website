import { FadeIn } from "@/components/motion/FadeIn";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ctaPrimary, ctaSecondary, siteConfig } from "@/content/site";

type FinalCtaProps = {
  title?: string;
  description?: string;
};

export function FinalCta({
  title = "Ready to strengthen your operating layer?",
  description = "Tell us what you are building or securing. We respond with clear next steps — and you can always reach us directly by email.",
}: FinalCtaProps) {
  return (
    <section className="section-pad">
      <div className="container-page">
        <FadeIn>
          <div className="border border-border-subtle bg-surface/50 px-6 py-12 md:px-12 md:py-16">
            <p className="mono-label mb-4">Next step</p>
            <h2 className="display-heading max-w-3xl text-3xl md:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="mt-5 max-w-2xl text-muted">{description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={ctaPrimary.href}>{ctaPrimary.label}</ButtonLink>
              <ButtonLink href={ctaSecondary.href} variant="secondary">
                {ctaSecondary.label}
              </ButtonLink>
            </div>
            <p className="mt-8 text-sm text-faint">
              Or email{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="cursor-pointer text-accent hover:text-focus"
              >
                {siteConfig.email}
              </a>
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
