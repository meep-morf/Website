import { ButtonLink } from "@/components/ui/ButtonLink";
import { OperationalSystemField } from "@/components/hero/OperationalSystemField";
import { StaggerItem, StaggerReveal } from "@/components/motion/StaggerReveal";
import { ctaPrimary, ctaSecondary, siteConfig } from "@/content/site";

export function HomeHero() {
  return (
    <section className="relative min-h-[min(92vh,920px)] overflow-hidden border-b border-border-subtle">
      <OperationalSystemField />
      <div className="container-page relative z-10 flex min-h-[min(92vh,920px)] flex-col justify-center pb-28 pt-16 md:pb-36 md:pt-20">
        <StaggerReveal>
          <StaggerItem>
            <p className="mono-label mb-6">{siteConfig.name}</p>
          </StaggerItem>
          <StaggerItem>
            <h1 className="display-heading max-w-4xl text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem]">
              {siteConfig.headline}
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-6 max-w-xl text-base text-muted md:text-lg">
              NomadLabz builds the invisible operating layer — products, integrations, cloud
              delivery, and cybersecurity — so teams move faster without leaving risk unmanaged.
            </p>
          </StaggerItem>
          <StaggerItem>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={ctaPrimary.href} className="cta-pulse">
                {ctaPrimary.label}
              </ButtonLink>
              <ButtonLink href={ctaSecondary.href} variant="secondary">
                {ctaSecondary.label}
              </ButtonLink>
            </div>
          </StaggerItem>
        </StaggerReveal>
      </div>
    </section>
  );
}
