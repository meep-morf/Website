"use client";

import { useEffect, useRef, useCallback, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Point {
  x: number;
  y: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  born: number;
}

type Theme = {
  bg: string;
  lineBase: { r: number; g: number; b: number; a: number };
  nodeBase: { r: number; g: number; b: number; a: number };
  lineActive: { r: number; g: number; b: number; a: number };
  nodeActive: { r: number; g: number; b: number; a: number };
  glow: string;
  ripple: string;
};

const CELL_SIZE = 48;
const INFLUENCE_RADIUS = 260;
const MAX_WARP = 24;
const DOT_SPACING = 28;
const LERP_SPEED = 0.08;
const MAX_DPR = 2;

const LINE_BASE = { r: 255, g: 255, b: 255, a: 0.13 };
const NODE_BASE = { r: 255, g: 255, b: 255, a: 0.2 };
const NODE_BASE_RADIUS = 1.8;
const NODE_ACTIVE_RADIUS = 3.2;

const THEMES: Record<"default" | "monochrome", Theme> = {
  default: {
    bg: "#161618",
    lineBase: LINE_BASE,
    nodeBase: NODE_BASE,
    lineActive: { r: 74, g: 158, b: 255, a: 0.9 },
    nodeActive: { r: 74, g: 158, b: 255, a: 1.0 },
    glow: "74,158,255",
    ripple: "100,180,255",
  },
  monochrome: {
    bg: "#000000",
    lineBase: LINE_BASE,
    nodeBase: NODE_BASE,
    lineActive: { r: 255, g: 255, b: 255, a: 0.9 },
    nodeActive: { r: 255, g: 255, b: 255, a: 1.0 },
    glow: "255,255,255",
    ripple: "255,255,255",
  },
};

const NOMAD_THEME: Theme = {
  bg: "#161618",
  lineBase: { r: 200, g: 230, b: 215, a: 0.5 },
  nodeBase: { r: 45, g: 184, b: 138, a: 0.55 },
  lineActive: { r: 55, g: 210, b: 165, a: 1.0 },
  nodeActive: { r: 70, g: 230, b: 180, a: 1.0 },
  glow: "55,210,165",
  ripple: "70,230,180",
};

function lerpN(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpColor(
  base: { r: number; g: number; b: number; a: number },
  active: { r: number; g: number; b: number; a: number },
  t: number,
): string {
  const r = Math.round(lerpN(base.r, active.r, t));
  const g = Math.round(lerpN(base.g, active.g, t));
  const b = Math.round(lerpN(base.b, active.b, t));
  const a = lerpN(base.a, active.a, t);
  return `rgba(${r},${g},${b},${a.toFixed(3)})`;
}

function resolveTheme(
  globalColor: "default" | "monochrome",
  accent?: "nomad",
): Theme {
  if (accent === "nomad") return NOMAD_THEME;
  return THEMES[globalColor];
}

export default function KineticGrid({
  children,
  className,
  globalColor = "default",
  accent,
  fillContainer = true,
}: {
  children?: ReactNode;
  className?: string;
  globalColor?: "default" | "monochrome";
  accent?: "nomad";
  /** Size canvas to parent element instead of viewport. Default true. */
  fillContainer?: boolean;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<Point>({ x: -9999, y: -9999 });
  const targetMouseRef = useRef<Point>({ x: -9999, y: -9999 });
  const ripplesRef = useRef<Ripple[]>([]);
  const rafRef = useRef<number>(0);
  const sizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const visibleRef = useRef(true);

  const getWarpedPoint = useCallback(
    (
      gx: number,
      gy: number,
      col: number,
      row: number,
      mouse: Point,
      ripples: Ripple[],
      cols: number,
      rows: number,
    ): { pt: Point; proximity: number } => {
      const edgeMargin = 1.5;
      const colPin = Math.min(
        col / edgeMargin,
        (cols - 1 - col) / edgeMargin,
        1,
      );
      const rowPin = Math.min(
        row / edgeMargin,
        (rows - 1 - row) / edgeMargin,
        1,
      );
      const pinFactor = colPin * colPin * rowPin * rowPin;

      const dx = gx - mouse.x;
      const dy = gy - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const proximity = Math.max(0, 1 - dist / INFLUENCE_RADIUS) * pinFactor;

      let rx = 0;
      let ry = 0;
      for (const r of ripples) {
        const rdx = gx - r.x;
        const rdy = gy - r.y;
        const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
        const waveWidth = 55;
        const diff = rdist - r.radius;
        if (Math.abs(diff) < waveWidth) {
          const strength =
            (1 - Math.abs(diff) / waveWidth) * r.opacity * 18 * pinFactor;
          const angle = Math.atan2(rdy, rdx);
          const sign = diff < 0 ? -1 : 1;
          rx += Math.cos(angle) * strength * sign * -1;
          ry += Math.sin(angle) * strength * sign * -1;
        }
      }

      if (dist < INFLUENCE_RADIUS && dist > 0 && pinFactor > 0) {
        const t = dist / INFLUENCE_RADIUS;
        const eased = t < 0.01 ? 0 : (1 - t) * (1 - t) * Math.min(1, dist / 60);
        const warpAmt = eased * MAX_WARP * pinFactor;
        const angle = Math.atan2(dy, dx);
        return {
          pt: {
            x: gx - Math.cos(angle) * warpAmt + rx,
            y: gy - Math.sin(angle) * warpAmt + ry,
          },
          proximity,
        };
      }

      return { pt: { x: gx + rx, y: gy + ry }, proximity };
    },
    [],
  );

  const draw = useCallback(
    (now: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const { w: W, h: H } = sizeRef.current;
      const mouse = mouseRef.current;
      const ripples = ripplesRef.current;
      const theme = resolveTheme(globalColor, accent);

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = theme.bg;
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = "rgba(255,255,255,0.05)";
      for (let x = DOT_SPACING / 2; x < W; x += DOT_SPACING) {
        for (let y = DOT_SPACING / 2; y < H; y += DOT_SPACING) {
          ctx.beginPath();
          ctx.arc(x, y, 0.7, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        const age = (now - r.born) / 1000;
        r.radius = Math.max(0, age * 400);
        r.opacity = Math.max(0, 1 - age * 1.2);
        if (r.opacity <= 0) ripples.splice(i, 1);
      }

      const cols = Math.max(2, Math.ceil(W / CELL_SIZE)) + 1;
      const rows = Math.max(2, Math.ceil(H / CELL_SIZE)) + 1;
      const cellW = W / (cols - 1);
      const cellH = H / (rows - 1);

      const pts: Point[][] = [];
      const prox: number[][] = [];

      for (let row = 0; row < rows; row++) {
        pts[row] = [];
        prox[row] = [];
        for (let col = 0; col < cols; col++) {
          const { pt, proximity } = getWarpedPoint(
            col * cellW,
            row * cellH,
            col,
            row,
            mouse,
            ripples,
            cols,
            rows,
          );
          pts[row][col] = pt;
          prox[row][col] = proximity;
        }
      }

      const drawSeg = (p1: Point, p2: Point, pr1: number, pr2: number) => {
        const avg = (pr1 + pr2) / 2;
        const t = avg * avg * (3 - 2 * avg);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = lerpColor(theme.lineBase, theme.lineActive, t);
        ctx.lineWidth = lerpN(1.0, 2.0, t);
        ctx.stroke();
      };

      ctx.lineCap = "butt";

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols - 1; col++) {
          drawSeg(
            pts[row][col],
            pts[row][col + 1],
            prox[row][col],
            prox[row][col + 1],
          );
        }
      }

      for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows - 1; row++) {
          drawSeg(
            pts[row][col],
            pts[row + 1][col],
            prox[row][col],
            prox[row + 1][col],
          );
        }
      }

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const p = pts[row][col];
          const pr = prox[row][col];
          const t = pr * pr * (3 - 2 * pr);
          const nodeR = Math.max(0, lerpN(NODE_BASE_RADIUS, NODE_ACTIVE_RADIUS, t));

          if (t > 0.3) {
            const glowR = Math.max(
              0,
              nodeR + lerpN(0, 6, (t - 0.3) / 0.7),
            );
            if (glowR > 0) {
              const grd = ctx.createRadialGradient(
                p.x,
                p.y,
                nodeR * 0.5,
                p.x,
                p.y,
                glowR,
              );
              grd.addColorStop(0, `rgba(${theme.glow},${(t * 0.3).toFixed(3)})`);
              grd.addColorStop(1, `rgba(${theme.glow},0)`);
              ctx.beginPath();
              ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
              ctx.fillStyle = grd;
              ctx.fill();
            }
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, nodeR, 0, Math.PI * 2);
          ctx.fillStyle = lerpColor(theme.nodeBase, theme.nodeActive, t);
          ctx.fill();
        }
      }

      for (const r of ripples) {
        const safeRadius = Math.max(0, r.radius);
        if (safeRadius <= 0) continue;
        ctx.beginPath();
        ctx.arc(r.x, r.y, safeRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${theme.ripple},${(r.opacity * 0.28).toFixed(3)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    },
    [accent, getWarpedPoint, globalColor],
  );

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const setSize = () => {
      const rect = fillContainer
        ? wrapper.getBoundingClientRect()
        : { width: window.innerWidth, height: window.innerHeight };
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w, h };
    };

    const stopLoop = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };

    const animate = (now: number) => {
      if (!visibleRef.current) {
        rafRef.current = 0;
        return;
      }

      const m = mouseRef.current;
      const t = targetMouseRef.current;
      m.x = lerpN(m.x, t.x, LERP_SPEED);
      m.y = lerpN(m.y, t.y, LERP_SPEED);

      draw(now);
      rafRef.current = requestAnimationFrame(animate);
    };

    const startLoop = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();
      targetMouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const onMouseLeave = () => {
      targetMouseRef.current = { x: -9999, y: -9999 };
    };

    const onClick = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();
      ripplesRef.current.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 0,
        opacity: 1,
        born: performance.now(),
      });
    };

    setSize();

    const ro = new ResizeObserver(() => {
      setSize();
      draw(performance.now());
    });
    ro.observe(wrapper);

    if (!fillContainer) {
      window.addEventListener("resize", setSize);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry?.isIntersecting ?? true;
        if (visibleRef.current && !reducedMotion) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.05 },
    );
    io.observe(wrapper);

    wrapper.addEventListener("mousemove", onMouseMove);
    wrapper.addEventListener("mouseleave", onMouseLeave);
    wrapper.addEventListener("click", onClick);

    if (reducedMotion) {
      draw(performance.now());
    } else {
      startLoop();
    }

    return () => {
      ro.disconnect();
      io.disconnect();
      if (!fillContainer) {
        window.removeEventListener("resize", setSize);
      }
      wrapper.removeEventListener("mousemove", onMouseMove);
      wrapper.removeEventListener("mouseleave", onMouseLeave);
      wrapper.removeEventListener("click", onClick);
      stopLoop();
    };
  }, [draw, fillContainer]);

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "relative overflow-hidden",
        fillContainer && "h-full w-full",
        className,
      )}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
        aria-hidden
      />
      {children ? (
        <div className="relative z-10 w-full">{children}</div>
      ) : null}
    </div>
  );
}
