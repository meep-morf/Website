"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MailButton } from "@/components/ui/MailButton";
import { ShinyArrowButton } from "@/components/ui/ShinyArrowButton";
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
          <div className="relative overflow-hidden border border-border-subtle bg-surface/50 px-6 py-12 md:px-12 md:py-16">
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/5 blur-3xl"
              aria-hidden
            />
            <p className="mono-label mb-4">Next step</p>
            <h2 className="display-heading max-w-3xl text-3xl md:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="mt-5 max-w-2xl text-muted">{description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href={ctaPrimary.href} className="cta-pulse">
                {ctaPrimary.label}
              </ButtonLink>
              <ShinyArrowButton
                direction="right"
                variant="green"
                ariaLabel={ctaPrimary.label}
                onClick={() => {
                  window.location.href = ctaPrimary.href;
                }}
              />
              <ButtonLink href={ctaSecondary.href} variant="secondary">
                {ctaSecondary.label}
              </ButtonLink>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-faint">
              <span>Or email</span>
              <a
                href={`mailto:${siteConfig.email}`}
                className="cursor-pointer font-medium text-accent hover:text-focus"
              >
                {siteConfig.email}
              </a>
              <MailButton email={siteConfig.email} ariaLabel={`Email ${siteConfig.email}`} />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
