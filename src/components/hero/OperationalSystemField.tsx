"use client";

import { useEffect, useRef } from "react";
import { operatingLayers } from "@/content/site";

/**
 * Operational System Field — lightweight Canvas signature hero.
 * Layers: interface → ops → data → infra → security → outcome
 * Pointer response on desktop, simplified on mobile, pause offscreen, DPR capped, reduced-motion safe.
 */
export function OperationalSystemField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const pointer = { x: 0.5, y: 0.45, active: false };
    let raf = 0;
    let visible = true;
    let t = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const { width, height } = wrap.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawStatic = () => {
      const { width, height } = wrap.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      drawField(ctx, width, height, 0, pointer, true, isMobile);
    };

    const tick = () => {
      if (!visible) {
        raf = requestAnimationFrame(tick);
        return;
      }
      t += 0.008;
      const { width, height } = wrap.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      drawField(ctx, width, height, t, pointer, false, isMobile);
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (isMobile) return;
      const rect = wrap.getBoundingClientRect();
      pointer.x = (e.clientX - rect.left) / rect.width;
      pointer.y = (e.clientY - rect.top) / rect.height;
      pointer.active = true;
    };

    const onLeave = () => {
      pointer.active = false;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true;
      },
      { threshold: 0.05 },
    );
    io.observe(wrap);

    resize();
    window.addEventListener("resize", resize);
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);

    if (reduceMotion) {
      drawStatic();
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(7,8,9,0.15)] via-transparent to-[rgba(7,8,9,0.92)]" />
      <ul className="absolute bottom-6 left-1/2 hidden w-[min(920px,92%)] -translate-x-1/2 grid-cols-6 gap-2 md:grid">
        {operatingLayers.map((layer) => (
          <li
            key={layer.id}
            className="border border-border-subtle/80 bg-[rgba(14,16,18,0.55)] px-2 py-2 text-center backdrop-blur-[2px]"
          >
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-accent">
              {layer.label}
            </p>
            <p className="mt-1 text-[0.65rem] text-faint">{layer.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function drawField(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  t: number,
  pointer: { x: number; y: number; active: boolean },
  staticMode: boolean,
  isMobile: boolean,
) {
  const cx = width * (pointer.active ? 0.42 + pointer.x * 0.16 : 0.5);
  const cy = height * (pointer.active ? 0.35 + pointer.y * 0.2 : 0.42);
  const layers = operatingLayers.length;
  const maxR = Math.min(width, height) * (isMobile ? 0.38 : 0.48);

  // Soft vignette field
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 1.35);
  g.addColorStop(0, "rgba(45, 184, 138, 0.09)");
  g.addColorStop(0.45, "rgba(45, 184, 138, 0.03)");
  g.addColorStop(1, "rgba(7, 8, 9, 0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, width, height);

  // Grid
  ctx.save();
  ctx.strokeStyle = "rgba(154, 163, 171, 0.07)";
  ctx.lineWidth = 1;
  const step = isMobile ? 42 : 36;
  const offset = staticMode ? 0 : (t * 8) % step;
  for (let x = -step; x < width + step; x += step) {
    ctx.beginPath();
    ctx.moveTo(x + offset, 0);
    ctx.lineTo(x + offset * 0.2, height);
    ctx.stroke();
  }
  for (let y = -step; y < height + step; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y + offset * 0.35);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  ctx.restore();

  // Concentric operational rings
  for (let i = 0; i < layers; i++) {
    const progress = (i + 1) / layers;
    const pulse = staticMode ? 0 : Math.sin(t * 1.4 + i * 0.7) * 4;
    const r = maxR * progress + pulse;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle =
      i === layers - 2
        ? "rgba(45, 184, 138, 0.45)"
        : `rgba(154, 163, 171, ${0.08 + progress * 0.12})`;
    ctx.lineWidth = i === layers - 2 ? 1.5 : 1;
    ctx.stroke();

    // Node markers
    const nodes = isMobile ? 4 : 6;
    for (let n = 0; n < nodes; n++) {
      const angle = (Math.PI * 2 * n) / nodes + t * (0.15 + i * 0.02) + i * 0.3;
      const nx = cx + Math.cos(angle) * r;
      const ny = cy + Math.sin(angle) * r;
      ctx.beginPath();
      ctx.arc(nx, ny, i === layers - 2 ? 2.4 : 1.6, 0, Math.PI * 2);
      ctx.fillStyle =
        i === layers - 2 ? "rgba(61, 206, 160, 0.9)" : "rgba(242, 244, 245, 0.35)";
      ctx.fill();
    }
  }

  // Connecting arcs between layers (desktop)
  if (!isMobile) {
    ctx.strokeStyle = "rgba(45, 184, 138, 0.18)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 8; i++) {
      const a = t * 0.5 + i * 0.8;
      ctx.beginPath();
      ctx.arc(cx, cy, maxR * (0.25 + (i % 4) * 0.12), a, a + 0.7);
      ctx.stroke();
    }
  }

  // Core
  ctx.beginPath();
  ctx.arc(cx, cy, 5, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(45, 184, 138, 0.85)";
  ctx.fill();
}
