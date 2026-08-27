"use client";

import dynamic from "next/dynamic";
import type { GlobeStudyProps } from "@/components/ui/globe-study";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { GlobeStudyFallback } from "@/components/ui/GlobeStudyFallback";

const GlobeStudy = dynamic(() => import("@/components/ui/globe-study"), {
  ssr: false,
  loading: () => (
    <div
      className="h-full w-full animate-pulse rounded-sm bg-surface/40"
      aria-hidden="true"
    />
  ),
});

export function GlobeStudyLazy(props: GlobeStudyProps) {
  return (
    <ErrorBoundary fallback={<GlobeStudyFallback className="h-full w-full" />}>
      <GlobeStudy {...props} />
    </ErrorBoundary>
  );
}
