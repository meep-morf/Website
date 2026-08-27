"use client";

import dynamic from "next/dynamic";
import type { InteractiveSynapseNetworkProps } from "@/components/ui/interactive-synapse-network";

const InteractiveSynapseNetwork = dynamic(
  () => import("@/components/ui/interactive-synapse-network"),
  {
    ssr: false,
    loading: () => (
      <div
        className="hero-scan-fallback absolute inset-0 h-full w-full"
        aria-hidden
      />
    ),
  },
);

export function InteractiveSynapseNetworkLazy(
  props: InteractiveSynapseNetworkProps,
) {
  return <InteractiveSynapseNetwork {...props} />;
}
