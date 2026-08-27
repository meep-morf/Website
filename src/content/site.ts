export const siteConfig = {
  name: "NomadLabz",
  legalName: "NomadLabz",
  tagline: "The Invisible Operating Layer",
  headline: "Software that moves business. Security that protects it.",
  description:
    "NomadLabz designs and builds software systems and cybersecurity capabilities that quietly power operations — from customer interfaces through integrations, cloud delivery, and controls.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nomadlabz.com",
  email: "projects@nomadlabz.com",
  locale: "en_US",
  copyrightYear: 2026,
} as const;

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/solutions", label: "Solutions" },
  { href: "/portfolio", label: "Work" },
  { href: "/about", label: "Company" },
  { href: "/contact", label: "Contact" },
] as const;

/** Primary-nav active state — /cybersecurity belongs under Services. */
export function isNavItemActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (pathname === href || pathname.startsWith(`${href}/`)) return true;
  if (href === "/services" && pathname.startsWith("/cybersecurity")) return true;
  return false;
}

export const ctaPrimary = {
  href: "/contact",
  label: "Start a Project",
} as const;

export const ctaSecondary = {
  href: "/portfolio",
  label: "Explore Our Work",
} as const;

export const processSteps = [
  {
    step: "01",
    title: "Discover",
    description:
      "We map objectives, constraints, systems, and risk — so scope reflects how the business actually runs.",
  },
  {
    step: "02",
    title: "Architect",
    description:
      "We define the operating layer: interfaces, data paths, integrations, and security controls before code expands.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "We ship in deliberate increments with clear checkpoints — software you can operate, not just demo.",
  },
  {
    step: "04",
    title: "Launch & Harden",
    description:
      "We deploy, monitor, and strengthen. Security and reliability stay active after go-live.",
  },
] as const;

export const operatingLayers = [
  { id: "interface", label: "Interface", detail: "Products people use" },
  { id: "ops", label: "Operations", detail: "Workflows & automation" },
  { id: "data", label: "Data", detail: "Truth & movement" },
  { id: "infra", label: "Infrastructure", detail: "Cloud & delivery" },
  { id: "security", label: "Security", detail: "Controls & assurance" },
  { id: "outcome", label: "Outcome", detail: "Business continuity" },
] as const;
