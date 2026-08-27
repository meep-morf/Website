"use client";

import dynamic from "next/dynamic";
import type { HeroFuturisticProps } from "@/components/ui/hero-futuristic";

const HeroFuturistic = dynamic(() => import("@/components/ui/hero-futuristic"), {
  ssr: false,
  loading: () => (
    <div
      className="hero-scan-fallback h-full min-h-[280px] w-full"
      aria-hidden="true"
    />
  ),
});

export function HeroFuturisticLazy(props: HeroFuturisticProps) {
  return <HeroFuturistic {...props} />;
}
