"use client";

import dynamic from "next/dynamic";
import type { InteractiveSynapseNetworkProps } from "@/components/ui/interactive-synapse-network";

const InteractiveSynapseNetwork = dynamic(
  () => import("@/components/ui/interactive-synapse-network"),
  {
    ssr: false,
    loading: () => (
      <div
        className="absolute inset-0 bg-[var(--network-bg,#08090a)]"
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
