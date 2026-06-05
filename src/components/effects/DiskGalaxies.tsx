"use client";

import { useEffect, useRef } from "react";

/* ─── Galaxy configuration ──────────────────────────────────────────── */

interface GalaxyConfig {
  xFrac: number;    // 0–1 of canvas width
  yFrac: number;    // 0–1 of canvas height
  size: number;     // outer radius px
  tilt: number;     // fixed tilt angle (radians) — no rotation
  aspectY: number;  // disk flatness: lower = more edge-on

  r: number; g: number; b: number;
  alpha: number;    // base opacity

  // breathing
  breathSpeed: number; // cycles/ms  (e.g. 0.00025 ≈ 25 s period)
  breathPhase: number; // initial phase offset
  breathAmp: number;   // ±fraction of alpha (e.g. 0.18 = ±18 %)

  // drift — tiny sinusoidal wander
  driftAmpX: number;   // px
  driftAmpY: number;
  driftSpeedX: number; // rad/ms
  driftSpeedY: number;
  driftPhaseX: number;
  driftPhaseY: number;
}

const CONFIGS: GalaxyConfig[] = [
  {
    xFrac: 0.055, yFrac: 0.22, size: 140, tilt: -0.38, aspectY: 0.14,
    r: 0,   g: 217, b: 255, alpha: 0.50,
    breathSpeed: 0.00022, breathPhase: 0.00,  breathAmp: 0.16,
    driftAmpX: 7,  driftAmpY: 5,  driftSpeedX: 0.00031, driftSpeedY: 0.00019, driftPhaseX: 0.0,  driftPhaseY: 1.1,
  },
  {
    xFrac: 0.945, yFrac: 0.18, size: 95, tilt: 0.62, aspectY: 0.20,
    r: 124, g: 58, b: 237, alpha: 0.44,
    breathSpeed: 0.00018, breathPhase: 2.10, breathAmp: 0.14,
    driftAmpX: 5,  driftAmpY: 8,  driftSpeedX: 0.00024, driftSpeedY: 0.00037, driftPhaseX: 3.5,  driftPhaseY: 0.6,
  },
  {
    xFrac: 0.08,  yFrac: 0.65, size: 72, tilt: 0.22, aspectY: 0.26,
    r: 236, g: 72, b: 153, alpha: 0.37,
    breathSpeed: 0.00028, breathPhase: 1.20, breathAmp: 0.18,
    driftAmpX: 6,  driftAmpY: 6,  driftSpeedX: 0.00020, driftSpeedY: 0.00028, driftPhaseX: 1.8,  driftPhaseY: 4.2,
  },
  {
    xFrac: 0.92,  yFrac: 0.82, size: 118, tilt: -0.52, aspectY: 0.13,
    r: 0,   g: 217, b: 255, alpha: 0.41,
    breathSpeed: 0.00015, breathPhase: 3.80, breathAmp: 0.13,
    driftAmpX: 9,  driftAmpY: 4,  driftSpeedX: 0.00016, driftSpeedY: 0.00022, driftPhaseX: 5.1,  driftPhaseY: 2.3,
  },
  {
    xFrac: 0.50,  yFrac: 0.04, size: 58, tilt: 0.48, aspectY: 0.21,
    r: 124, g: 58, b: 237, alpha: 0.27,
    breathSpeed: 0.00032, breathPhase: 0.80, breathAmp: 0.20,
    driftAmpX: 8,  driftAmpY: 3,  driftSpeedX: 0.00040, driftSpeedY: 0.00018, driftPhaseX: 2.4,  driftPhaseY: 0.9,
  },
  {
    xFrac: 0.22,  yFrac: 0.90, size: 48, tilt: -0.15, aspectY: 0.18,
    r: 124, g: 58, b: 237, alpha: 0.23,
    breathSpeed: 0.00026, breathPhase: 5.00, breathAmp: 0.15,
    driftAmpX: 5,  driftAmpY: 7,  driftSpeedX: 0.00022, driftSpeedY: 0.00034, driftPhaseX: 4.7,  driftPhaseY: 3.1,
  },
];

/* ─── Pre-computed star dust ─────────────────────────────────────────── */

interface Star {
  x: number; y: number;
  sz: number;
  alphaMul: number;
  twinklePhase: number; // unique phase for independent twinkle
  twinkleSpeed: number;
}

interface Galaxy extends GalaxyConfig {
  stars: Star[];
}

function buildGalaxies(): Galaxy[] {
  return CONFIGS.map((cfg) => {
    const count = Math.floor(cfg.size * 1.4);
    const stars: Star[] = [];
    for (let i = 0; i < count; i++) {
      const dist  = Math.pow(Math.random(), 0.55) * cfg.size * 0.96;
      const angle = Math.random() * Math.PI * 2;
      const edgeFade = 1 - dist / cfg.size;
      stars.push({
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        sz: Math.random() < 0.07 ? 1.5 : 0.65,
        alphaMul: edgeFade * edgeFade * (0.25 + Math.random() * 0.75),
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.0008 + Math.random() * 0.0018, // ~3–9 s period
      });
    }
    return { ...cfg, stars };
  });
}

/* ─── Draw one galaxy ────────────────────────────────────────────────── */

function drawGalaxy(
  ctx: CanvasRenderingContext2D,
  g: Galaxy,
  cw: number,
  ch: number,
  time: number
) {
  // ── breathing: oscillate alpha ──────────────────────────────────────
  const breath = 1 + g.breathAmp * Math.sin(time * g.breathSpeed * Math.PI * 2 + g.breathPhase);
  const a = Math.max(0, Math.min(1, g.alpha * breath));

  // ── drift: slow sinusoidal position wander ──────────────────────────
  const ox = Math.sin(time * g.driftSpeedX + g.driftPhaseX) * g.driftAmpX;
  const oy = Math.cos(time * g.driftSpeedY + g.driftPhaseY) * g.driftAmpY;

  const cx = g.xFrac * cw + ox;
  const cy = g.yFrac * ch + oy;

  // ── disk ────────────────────────────────────────────────────────────
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(g.tilt);
  ctx.scale(1, g.aspectY);

  const diskGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, g.size);
  diskGrad.addColorStop(0,    `rgba(${g.r},${g.g},${g.b},${+a.toFixed(3)})`);
  diskGrad.addColorStop(0.12, `rgba(${g.r},${g.g},${g.b},${+(a * 0.88).toFixed(3)})`);
  diskGrad.addColorStop(0.38, `rgba(${g.r},${g.g},${g.b},${+(a * 0.38).toFixed(3)})`);
  diskGrad.addColorStop(0.72, `rgba(${g.r},${g.g},${g.b},${+(a * 0.10).toFixed(3)})`);
  diskGrad.addColorStop(1,    `rgba(${g.r},${g.g},${g.b},0)`);

  ctx.beginPath();
  ctx.ellipse(0, 0, g.size, g.size, 0, 0, Math.PI * 2);
  ctx.fillStyle = diskGrad;
  ctx.fill();

  // ── bright nucleus ──────────────────────────────────────────────────
  const coreR    = g.size * 0.10;
  const coreAlpha = Math.min(1, a * 1.35);
  const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, coreR);
  coreGrad.addColorStop(0,    `rgba(255,255,255,${+coreAlpha.toFixed(3)})`);
  coreGrad.addColorStop(0.45, `rgba(${g.r},${g.g},${g.b},${+(a * 0.85).toFixed(3)})`);
  coreGrad.addColorStop(1,    `rgba(${g.r},${g.g},${g.b},0)`);

  ctx.beginPath();
  ctx.ellipse(0, 0, coreR, coreR, 0, 0, Math.PI * 2);
  ctx.fillStyle = coreGrad;
  ctx.fill();

  // ── star dust with individual twinkle ───────────────────────────────
  g.stars.forEach(({ x, y, sz, alphaMul, twinklePhase, twinkleSpeed }) => {
    // twinkle: 80 %–100 % of base brightness, each star at its own rhythm
    const twinkle = 0.80 + 0.20 * Math.sin(time * twinkleSpeed + twinklePhase);
    const sa = +(a * alphaMul * twinkle).toFixed(3);
    if (sa < 0.015) return;
    ctx.beginPath();
    ctx.arc(x, y, sz, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${g.r},${g.g},${g.b},${sa})`;
    ctx.fill();
  });

  ctx.restore();
}

/* ─── Component ──────────────────────────────────────────────────────── */

export default function DiskGalaxies() {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const galaxiesRef = useRef<Galaxy[]>(buildGalaxies());
  const rafRef      = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      const parent = canvas.parentElement;
      canvas.width  = parent ? parent.offsetWidth  : window.innerWidth;
      canvas.height = parent ? parent.offsetHeight : window.innerHeight;
    };

    setSize();
    const ro = new ResizeObserver(setSize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const galaxies = galaxiesRef.current;

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      galaxies.forEach((g) => drawGalaxy(ctx, g, canvas.width, canvas.height, time));
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}
