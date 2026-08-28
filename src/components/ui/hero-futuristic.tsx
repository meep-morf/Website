"use client";

/* eslint-disable react-hooks/immutability -- R3F useFrame loops mutate shader uniforms by design */

import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { useAspect, useTexture } from "@react-three/drei";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three/webgpu";
import { bloom } from "three/examples/jsm/tsl/display/BloomNode.js";
import type { Mesh } from "three";

import {
  abs,
  blendScreen,
  float,
  mod,
  mx_cell_noise_float,
  oneMinus,
  smoothstep,
  texture,
  uniform,
  uv,
  vec2,
  vec3,
  pass,
  mix,
  add,
} from "three/tsl";

const TEXTUREMAP = { src: "/textures/hero-abstract.jpg" };
const DEPTHMAP = { src: "/textures/hero-depth.webp" };

/** Sea-green cybersecurity scan tint with subtle warm accent for visibility. */
const SCAN_TINT = vec3(0.2, 0.85, 0.65);
const SCAN_WARM = vec3(0.95, 0.42, 0.12);
const MASK_TINT = vec3(0.55, 7.5, 0.38);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
extend(THREE as any);

export type HeroFuturisticProps = {
  titleWords?: string;
  subtitle?: string;
  showOverlay?: boolean;
  className?: string;
  heightClassName?: string;
  /** 0–1 visual intensity for the WebGPU layer (default 0.95). */
  intensity?: number;
};

function PostProcessing({
  strength = 1.35,
  threshold = 0.85,
  fullScreenEffect = true,
}: {
  strength?: number;
  threshold?: number;
  fullScreenEffect?: boolean;
}) {
  const { gl, scene, camera } = useThree();

  const { render, uScanProgress } = useMemo(() => {
    const postProcessing = new THREE.PostProcessing(gl as never);
    const scenePass = pass(scene, camera);
    const scenePassColor = scenePass.getTextureNode("output");
    const bloomPass = bloom(scenePassColor, strength, 0.5, threshold);

    const scanProgress = uniform(0);

    const scanPos = float(scanProgress.value);
    const uvY = uv().y;
    const scanWidth = float(0.07);
    const scanLine = smoothstep(0, scanWidth, abs(uvY.sub(scanPos)));
    const scanOverlayGreen = SCAN_TINT.mul(oneMinus(scanLine)).mul(0.5);
    const scanOverlayWarm = SCAN_WARM.mul(oneMinus(scanLine)).mul(0.22);
    const scanOverlay = scanOverlayGreen.add(scanOverlayWarm);

    const withScanEffect = mix(
      scenePassColor,
      add(scenePassColor, scanOverlay),
      fullScreenEffect ? smoothstep(0.9, 1.0, oneMinus(scanLine)) : 1.0,
    );

    const final = withScanEffect.add(bloomPass);
    postProcessing.outputNode = final;
    return { render: postProcessing, uScanProgress: scanProgress };
  }, [camera, gl, scene, strength, threshold, fullScreenEffect]);

  useFrame(({ clock }) => {
    uScanProgress.value = Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5;
    void render.renderAsync();
  }, 1);

  return null;
}

const WIDTH = 300;
const HEIGHT = 300;

function Scene() {
  const [rawMap, depthMap] = useTexture([TEXTUREMAP.src, DEPTHMAP.src]);
  const meshRef = useRef<Mesh>(null);

  const { material, uniforms } = useMemo(() => {
    const uPointer = uniform(new THREE.Vector2(0));
    const uProgress = uniform(0);
    const strength = 0.01;
    const tDepthMap = texture(depthMap);
    const tMap = texture(rawMap, uv().add(tDepthMap.r.mul(uPointer).mul(strength)));
    const aspect = float(WIDTH).div(HEIGHT);
    const tUv = vec2(uv().x.mul(aspect), uv().y);
    const tiling = vec2(120.0);
    const tiledUv = mod(tUv.mul(tiling), 2.0).sub(1.0);
    const brightness = mx_cell_noise_float(tUv.mul(tiling).div(2));
    const dist = float(tiledUv.length());
    const dot = float(smoothstep(0.5, 0.49, dist)).mul(brightness);
    const depth = tDepthMap;
    const flow = oneMinus(smoothstep(0, 0.02, abs(depth.sub(uProgress))));
    const mask = dot.mul(flow).mul(MASK_TINT);
    const final = blendScreen(tMap, mask);

    const mat = new THREE.MeshBasicNodeMaterial({
      colorNode: final,
      transparent: true,
      opacity: 0,
    });

    return { material: mat, uniforms: { uPointer, uProgress } };
  }, [rawMap, depthMap]);

  const [w, h] = useAspect(WIDTH, HEIGHT);

  useFrame(({ clock, pointer }) => {
    // R3F animation loop — shader uniform updates are intentional.
    uniforms.uProgress.value = Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5;
    uniforms.uPointer.value = pointer;
    if (meshRef.current?.material && "opacity" in meshRef.current.material) {
      const mat = meshRef.current.material as THREE.MeshBasicNodeMaterial;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, 1, 0.07);
    }
  });

  const scaleFactor = 0.72;
  return (
    <mesh ref={meshRef} scale={[w * scaleFactor, h * scaleFactor, 1]} material={material}>
      <planeGeometry />
    </mesh>
  );
}

function WebGPUCanvas() {
  return (
    <Canvas
      flat
      className="h-full w-full"
      gl={async (props) => {
        const renderer = new THREE.WebGPURenderer(props as ConstructorParameters<typeof THREE.WebGPURenderer>[0]);
        await renderer.init();
        return renderer;
      }}
    >
      <PostProcessing fullScreenEffect />
      <Scene />
    </Canvas>
  );
}

function StaticFallback() {
  return (
    <div
      className="hero-scan-fallback h-full w-full"
      aria-hidden="true"
    />
  );
}

function useWebGPUSupport() {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function check() {
      try {
        if (!("gpu" in navigator)) {
          if (!cancelled) setSupported(false);
          return;
        }
        const adapter = await (
          navigator as Navigator & {
            gpu: { requestAdapter: () => Promise<unknown> };
          }
        ).gpu.requestAdapter();
        if (!cancelled) setSupported(Boolean(adapter));
      } catch {
        if (!cancelled) setSupported(false);
      }
    }
    void check();
    return () => {
      cancelled = true;
    };
  }, []);

  return supported;
}

function TextOverlay({
  titleWords,
  subtitle,
}: {
  titleWords: string[];
  subtitle: string;
}) {
  const [visibleWords, setVisibleWords] = useState(0);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const delays = useMemo(
    () => titleWords.map((word, index) => ((word.length + index) % 7) * 0.01),
    [titleWords],
  );
  const subtitleDelay = useMemo(() => (titleWords.length % 5) * 0.02, [titleWords]);

  useEffect(() => {
    if (visibleWords < titleWords.length) {
      const timeout = setTimeout(() => setVisibleWords((v) => v + 1), 600);
      return () => clearTimeout(timeout);
    }
    const timeout = setTimeout(() => setSubtitleVisible(true), 800);
    return () => clearTimeout(timeout);
  }, [visibleWords, titleWords.length]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 uppercase">
      <div className="text-2xl font-extrabold md:text-4xl lg:text-5xl">
        <div className="flex flex-wrap justify-center gap-x-3 overflow-hidden text-text">
          {titleWords.map((word, index) => (
            <div
              key={`${word}-${index}`}
              className={index < visibleWords ? "hero-fade-in" : ""}
              style={{
                animationDelay: `${index * 0.13 + (delays[index] ?? 0)}s`,
                opacity: index < visibleWords ? undefined : 0,
              }}
            >
              {word}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 overflow-hidden text-sm font-semibold text-muted md:text-lg">
        <div
          className={subtitleVisible ? "hero-fade-in-subtitle" : ""}
          style={{
            animationDelay: `${titleWords.length * 0.13 + 0.2 + subtitleDelay}s`,
            opacity: subtitleVisible ? undefined : 0,
          }}
        >
          {subtitle}
        </div>
      </div>
    </div>
  );
}

export default function HeroFuturistic({
  titleWords = "Security that protects software in motion",
  subtitle = "Continuous assessment across your operating layer.",
  showOverlay = false,
  className = "",
  heightClassName = "h-full min-h-[280px]",
  intensity = 0.95,
}: HeroFuturisticProps) {
  const webgpu = useWebGPUSupport();
  const words = titleWords.split(" ");
  const layerOpacity = Math.min(1, Math.max(0.4, intensity));

  return (
    <div className={`relative overflow-hidden ${heightClassName} ${className}`}>
      {showOverlay ? <TextOverlay titleWords={words} subtitle={subtitle} /> : null}
      <div className="absolute inset-0" style={{ opacity: layerOpacity }}>
        {webgpu === null ? (
          <div className="hero-scan-fallback h-full w-full" aria-hidden="true" />
        ) : webgpu ? (
          <WebGPUCanvas />
        ) : (
          <StaticFallback />
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg/10 via-transparent to-bg/80" />
    </div>
  );
}
