"use client";

import React, { useRef, useEffect, useState, type ReactNode } from "react";

export interface InteractiveSynapseNetworkProps {
  children?: ReactNode;
  /** Base fill color for nodes — alpha applied per-node at draw time */
  nodeColor?: string;
  /** Base stroke color for connection lines — alpha applied per connection */
  connectionColor?: string;
  /** Color of the traveling pulse */
  pulseColor?: string;
  nodeCount?: number;
  connectionRadius?: number;
  /** Opacity of the fading background trail (0–1) */
  trailOpacity?: number;
  /** Near-black trail fill RGB components */
  trailRgb?: [number, number, number];
  ariaLabel?: string;
  className?: string;
}

const DEFAULT_NODE = "rgba(52, 211, 153, 0.75)";
const DEFAULT_CONNECTION = "rgba(52, 211, 153, 1)";
const DEFAULT_PULSE = "rgba(242, 243, 245, 0.95)";
const DEFAULT_TRAIL_RGB: [number, number, number] = [8, 9, 10];
const MAX_DPR = 2;

/** Parse rgba/rgb/hex into [r,g,b] or null if unsupported (e.g. CSS vars). */
function parseRgb(color: string): [number, number, number] | null {
  const rgba = color.match(
    /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i,
  );
  if (rgba) {
    return [Number(rgba[1]), Number(rgba[2]), Number(rgba[3])];
  }
  const hex = color.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hex) {
    let h = hex[1];
    if (h.length === 3) {
      h = h
        .split("")
        .map((c) => c + c)
        .join("");
    }
    return [
      parseInt(h.slice(0, 2), 16),
      parseInt(h.slice(2, 4), 16),
      parseInt(h.slice(4, 6), 16),
    ];
  }
  return null;
}

function rgbaFrom(color: string, alpha: number): string {
  const rgb = parseRgb(color);
  if (rgb) {
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
  }
  return color;
}

const InteractiveSynapseNetwork: React.FC<InteractiveSynapseNetworkProps> = ({
  children,
  nodeColor = DEFAULT_NODE,
  connectionColor = DEFAULT_CONNECTION,
  pulseColor = DEFAULT_PULSE,
  nodeCount = 50,
  connectionRadius = 200,
  trailOpacity = 0.2,
  trailRgb = DEFAULT_TRAIL_RGB,
  ariaLabel = "Interactive synapse network",
  className = "",
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let rafId = 0;
    let visible = true;
    let tabVisible = !document.hidden;

    interface Pulse {
      start: NodeImpl;
      end: NodeImpl;
      progress: number;
      speed: number;
      update(): void;
      draw(): void;
    }

    class PulseImpl implements Pulse {
      start: NodeImpl;
      end: NodeImpl;
      progress = 0;
      speed = 0.03;

      constructor(s: NodeImpl, e: NodeImpl) {
        this.start = s;
        this.end = e;
      }

      update() {
        this.progress += this.speed;
      }

      draw() {
        const x = this.start.x + (this.end.x - this.start.x) * this.progress;
        const y = this.start.y + (this.end.y - this.start.y) * this.progress;
        ctx!.beginPath();
        ctx!.arc(x, y, 3, 0, Math.PI * 2);
        ctx!.fillStyle = pulseColor;
        ctx!.fill();
      }
    }

    class NodeImpl {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      connections: NodeImpl[] = [];
      pulses: Pulse[] = [];
      activation = 0;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 2;
      }

      update(mouse: { x: number; y: number }, w: number, h: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;

        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        const target = Math.max(0, 1 - dist / (connectionRadius * 0.8));
        this.activation += (target - this.activation) * 0.1;

        // Autonomous pulses — visible motion without pointer hover
        if (Math.random() > 0.992 && this.connections.length > 0) {
          const to =
            this.connections[Math.floor(Math.random() * this.connections.length)];
          if (to) this.pulses.push(new PulseImpl(this, to));
        }

        this.pulses = this.pulses.filter((p) => p.progress < 1);
        this.pulses.forEach((p) => p.update());
      }

      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        const alpha = Math.max(0.45, this.activation * 0.55 + 0.45);
        ctx!.fillStyle = rgbaFrom(nodeColor, alpha);
        ctx!.fill();
        this.pulses.forEach((p) => p.draw());
      }
    }

    let nodes: NodeImpl[] = [];
    const mouse = { x: -9999, y: -9999 };

    const buildConnections = () => {
      nodes.forEach((n1) => {
        n1.connections = [];
        nodes.forEach((n2) => {
          if (n1 !== n2) {
            const d = Math.hypot(n1.x - n2.x, n1.y - n2.y);
            if (d < connectionRadius) n1.connections.push(n2);
          }
        });
      });
    };

    const resize = () => {
      const rect = wrapper.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (nodes.length === 0) {
        nodes = Array.from({ length: nodeCount }, () => new NodeImpl(width, height));
        buildConnections();
      }
    };

    const animate = () => {
      if (!visible || !tabVisible) {
        rafId = requestAnimationFrame(animate);
        return;
      }

      ctx.fillStyle = `rgba(${trailRgb[0]}, ${trailRgb[1]}, ${trailRgb[2]}, ${trailOpacity})`;
      ctx.fillRect(0, 0, width, height);

      nodes.forEach((n1) => {
        n1.connections.forEach((n2) => {
          const a = Math.max(0.14, n1.activation, n2.activation) * 0.38;
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.strokeStyle = rgbaFrom(connectionColor, a);
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      });

      nodes.forEach((n) => {
        n.update(mouse, width, height);
        n.draw();
      });

      rafId = requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const onVisibility = () => {
      tabVisible = !document.hidden;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true;
      },
      { threshold: 0.05 },
    );
    observer.observe(wrapper);

    const ro = new ResizeObserver(() => {
      resize();
      nodes = Array.from({ length: nodeCount }, () => new NodeImpl(width, height));
      buildConnections();
    });
    ro.observe(wrapper);

    resize();
    buildConnections();
    animate();

    wrapper.addEventListener("mousemove", onMouseMove);
    wrapper.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      ro.disconnect();
      wrapper.removeEventListener("mousemove", onMouseMove);
      wrapper.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [
    prefersReducedMotion,
    nodeColor,
    connectionColor,
    pulseColor,
    nodeCount,
    connectionRadius,
    trailOpacity,
    trailRgb,
  ]);

  useEffect(() => {
    if (!prefersReducedMotion) return;

    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawReducedMotionFallback = () => {
      const rect = wrapper.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.fillStyle = `rgba(${trailRgb[0]}, ${trailRgb[1]}, ${trailRgb[2]}, 1)`;
      ctx.fillRect(0, 0, width, height);

      const nodes = Array.from({ length: Math.min(nodeCount, 36) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 2,
      }));

      nodes.forEach((n1, i) => {
        nodes.forEach((n2, j) => {
          if (i >= j) return;
          const d = Math.hypot(n1.x - n2.x, n1.y - n2.y);
          if (d < connectionRadius) {
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = rgbaFrom(connectionColor, 0.1);
            ctx.stroke();
          }
        });
      });

      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = rgbaFrom(nodeColor, 0.4);
        ctx.fill();
      });
    };

    drawReducedMotionFallback();
    const ro = new ResizeObserver(drawReducedMotionFallback);
    ro.observe(wrapper);
    return () => ro.disconnect();
  }, [
    prefersReducedMotion,
    nodeColor,
    connectionColor,
    nodeCount,
    connectionRadius,
    trailRgb,
  ]);

  return (
    <div
      ref={wrapperRef}
      role="img"
      aria-label={ariaLabel}
      className={`relative overflow-hidden bg-[var(--network-bg,#08090a)] ${className}`}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 block h-full w-full"
      />
      {children ? (
        <div className="relative z-10 h-full w-full">{children}</div>
      ) : null}
    </div>
  );
};

export default InteractiveSynapseNetwork;

export const NOMAD_SYNAPSE_THEME = {
  nodeColor: DEFAULT_NODE,
  connectionColor: DEFAULT_CONNECTION,
  pulseColor: DEFAULT_PULSE,
  trailRgb: DEFAULT_TRAIL_RGB,
} as const;
