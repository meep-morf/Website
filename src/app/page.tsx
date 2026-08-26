import { HomeHero } from "@/components/sections/HomeHero";
import { CapabilitiesPreview } from "@/components/sections/CapabilitiesPreview";
import { CyberTeaser } from "@/components/sections/CyberTeaser";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { SolutionsPreview } from "@/components/sections/SolutionsPreview";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({ path: "/" });

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <CapabilitiesPreview />
      <CyberTeaser />
      <FeaturedWork />
      <SolutionsPreview />
      <ProcessSection />
      <FinalCta />
    </>
  );
}
