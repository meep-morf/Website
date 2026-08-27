"use client";

import dynamic from "next/dynamic";
import type { GlobeStudyProps } from "@/components/ui/globe-study";

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
  return <GlobeStudy {...props} />;
}
