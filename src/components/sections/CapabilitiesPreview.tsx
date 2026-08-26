import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
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
            description="Six services that connect product surfaces to the systems, data, and security underneath."
          />
        </FadeIn>
        <div className="mt-12 divide-y divide-border-subtle border-y border-border-subtle">
          {services.map((service, index) => (
            <FadeIn key={service.slug} delay={index * 0.04}>
              <Link
                href={serviceHref(service.slug)}
                className="group grid cursor-pointer gap-3 py-7 transition-colors duration-200 hover:bg-surface/40 md:grid-cols-[8rem_1fr_auto] md:items-baseline md:gap-8 md:px-2"
              >
                <span className="font-mono text-xs text-faint">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-text transition-colors group-hover:text-accent md:text-2xl">
                    {service.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm text-muted md:text-base">
                    {service.summary}
                  </p>
                </div>
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-faint transition-colors group-hover:text-accent">
                  View
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
        <div className="mt-10">
          <ButtonLink href="/services" variant="secondary">
            All Services
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
