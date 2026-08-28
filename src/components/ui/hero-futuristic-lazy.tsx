"use client";

import dynamic from "next/dynamic";
import type { HeroFuturisticProps } from "@/components/ui/hero-futuristic";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

const HeroFuturistic = dynamic(() => import("@/components/ui/hero-futuristic"), {
  ssr: false,
  loading: () => (
    <div
      className="hero-scan-fallback h-full min-h-[280px] w-full"
      aria-hidden="true"
    />
  ),
});

function ScanFallback({ className }: { className?: string }) {
  return (
    <div
      className={`hero-scan-fallback h-full min-h-[280px] w-full ${className ?? ""}`}
      aria-hidden="true"
    />
  );
}

export function HeroFuturisticLazy(props: HeroFuturisticProps) {
  return (
    <ErrorBoundary fallback={<ScanFallback className={props.className} />}>
      <HeroFuturistic {...props} />
    </ErrorBoundary>
  );
}
