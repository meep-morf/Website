"use client";

import InteractiveSynapseNetwork, {
  NOMAD_SYNAPSE_THEME,
  type InteractiveSynapseNetworkProps,
} from "@/components/ui/interactive-synapse-network";

export function InteractiveSynapseNetworkDemo() {
  const demoProps: InteractiveSynapseNetworkProps = {
    ...NOMAD_SYNAPSE_THEME,
    nodeCount: 60,
    connectionRadius: 180,
    trailOpacity: 0.15,
    className: "flex h-screen w-full items-center justify-center",
  };

  return (
    <InteractiveSynapseNetwork {...demoProps}>
      <div className="select-none text-center">
        <div className="rounded-xl bg-black/40 px-8 py-6 backdrop-blur-md">
          <h1
            className="display-heading text-5xl uppercase tracking-widest text-accent sm:text-7xl"
            style={{ textShadow: "0 0 24px rgba(45, 184, 138, 0.35)" }}
          >
            Synapse
          </h1>
          <h2 className="mono-label mt-2 text-lg sm:text-2xl text-muted">
            Interactive Network
          </h2>
        </div>
        <p className="mono-label mt-8 text-sm text-faint">
          The cursor excites the neural pathways.
        </p>
      </div>
    </InteractiveSynapseNetwork>
  );
}

export default InteractiveSynapseNetworkDemo;
