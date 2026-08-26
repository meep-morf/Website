import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { absoluteUrl } from "@/lib/utils";

type BuildMetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "",
  noIndex = false,
}: BuildMetadataInput = {}): Metadata {
  const pageTitle = title
    ? `${title} · ${siteConfig.name}`
    : `${siteConfig.name} · ${siteConfig.headline}`;
  const url = absoluteUrl(path);

  return {
    title: pageTitle,
    description,
    metadataBase: new URL(absoluteUrl()),
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: pageTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: absoluteUrl(),
    email: siteConfig.email,
    description: siteConfig.description,
    logo: absoluteUrl("/brand/nomadlabz-logo.png"),
  };
}
