import Image from "next/image";
import Link from "next/link";
import { navItems, siteConfig } from "@/content/site";
import { services } from "@/content/services";

function serviceHref(slug: string) {
  return slug === "cybersecurity" ? "/cybersecurity" : `/services#${slug}`;
}

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-[#060708]">
      <div className="container-page section-pad !pb-10 !pt-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block" aria-label={`${siteConfig.name} home`}>
              <Image
                src="/brand/nomadlabz-logo.png"
                alt="NomadLabz"
                width={200}
                height={56}
                className="h-12 w-auto"
              />
            </Link>
            <p className="mt-5 max-w-xs text-sm text-muted">
              Software that moves business. Security that protects it. The invisible
              operating layer behind ambitious teams.
            </p>
          </div>

          <div>
            <p className="mono-label mb-4">Navigate</p>
            <ul className="space-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="cursor-pointer text-sm text-muted transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mono-label mb-4">Services</p>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={serviceHref(service.slug)}
                    className="cursor-pointer text-sm text-muted transition-colors hover:text-accent"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mono-label mb-4">Contact</p>
            <p className="text-sm text-muted">Project inquiries</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-2 inline-block cursor-pointer text-sm font-medium text-accent transition-colors hover:text-focus"
            >
              {siteConfig.email}
            </a>
            <Link
              href="/contact"
              className="mt-6 inline-flex cursor-pointer rounded-sm border border-border px-4 py-2 text-sm font-semibold text-text transition-colors hover:border-accent-border hover:text-accent"
            >
              Start a Project
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border-subtle pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-faint">
            © {siteConfig.copyrightYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-faint">
            Invisible Operating Layer
          </p>
        </div>
      </div>
    </footer>
  );
}
