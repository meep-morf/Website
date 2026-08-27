import { FadeIn } from "@/components/motion/FadeIn";
import { CapabilityRow } from "@/components/motion/CapabilityRow";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { services } from "@/content/services";

function serviceHref(slug: string) {
  return slug === "cybersecurity" ? "/cybersecurity" : `/services#${slug}`;
}

export function CapabilitiesPreview() {
  return (
    <section className="section-pad border-b border-border-subtle">
      <div className="container-page">
        <FadeIn>
          <SectionHeader
            kicker="Services"
            title="Engineering that compounds into an operating advantage"
            description="Six connected capabilities — from product surfaces to the infrastructure and security underneath."
          />
        </FadeIn>
        <div className="mt-12 divide-y divide-border-subtle border-y border-border-subtle">
          {services.map((service, index) => (
            <CapabilityRow
              key={service.slug}
              href={serviceHref(service.slug)}
              index={index}
              title={service.title}
              summary={service.summary}
            />
          ))}
        </div>
        <div className="mt-10">
          <ButtonLink href="/services" variant="secondary">
            View All Services
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
