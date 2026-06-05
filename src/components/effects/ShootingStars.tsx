"use client";

import { useEffect, useRef } from "react";

/* ─── Types ──────────────────────────────────────────────────────────── */

interface ShootingStar {
  x: number;   // head x
  y: number;   // head y
  vx: number;  // px / ms
  vy: number;
  trailLen: number;
  alpha: number; // max opacity
  age: number;   // ms elapsed
  duration: number; // ms total life
  r: number; g: number; b: number;
}

/* ─── Helpers ────────────────────────────────────────────────────────── */

const COLORS = [
  { r: 255, g: 255, b: 255 },  // white (most common)
  { r: 255, g: 255, b: 255 },
  { r: 255, g: 255, b: 255 },
  { r: 0,   g: 217, b: 255 }, // cyan
  { r: 180, g: 160, b: 255 }, // soft lavender
];

function spawnStar(cw: number, ch: number): ShootingStar {
  const col = COLORS[Math.floor(Math.random() * COLORS.length)];

  // Spawn along the top edge or upper-left edge
  const fromTop = Math.random() < 0.65;
  const x = fromTop ? Math.random() * cw * 0.85 : -10;
  const y = fromTop ? Math.random() * ch * 0.3 - 20 : Math.random() * ch * 0.35;

  // Angle: 20–40° below horizontal (diagonal streak)
  const angleDeg = 20 + Math.random() * 20;
  const angle    = (angleDeg * Math.PI) / 180;
  const speed    = 0.18 + Math.random() * 0.13; // px/ms  (≈ 180–310 px/s)

  return {
    x, y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    trailLen:  90 + Math.random() * 130,
    alpha:     0.65 + Math.random() * 0.35,
    age:       0,
    duration:  1400 + Math.random() * 800,
    ...col,
  };
}

function drawStar(ctx: CanvasRenderingContext2D, s: ShootingStar) {
  const t = s.age / s.duration; // 0 → 1

  // Opacity envelope: quick fade-in, hold, then fade-out
  let env: number;
  if      (t < 0.12) env = t / 0.12;
  else if (t > 0.75) env = (1 - t) / 0.25;
  else               env = 1;
  const op = env * s.alpha;
  if (op < 0.01) return;

  // Head position
  const hx = s.x;
  const hy = s.y;

  // Tail grows from zero at birth
  const len  = s.trailLen * Math.min(1, t * 8);
  const norm = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
  const tx   = hx - (s.vx / norm) * len;
  const ty   = hy - (s.vy / norm) * len;

  // ── Trail ─────────────────────────────────────────────────────────
  const grad = ctx.createLinearGradient(tx, ty, hx, hy);
  grad.addColorStop(0,    `rgba(${s.r},${s.g},${s.b},0)`);
  grad.addColorStop(0.55, `rgba(${s.r},${s.g},${s.b},${+(op * 0.25).toFixed(3)})`);
  grad.addColorStop(0.85, `rgba(${s.r},${s.g},${s.b},${+(op * 0.70).toFixed(3)})`);
  grad.addColorStop(1,    `rgba(${s.r},${s.g},${s.b},${+op.toFixed(3)})`);

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(tx, ty);
  ctx.lineTo(hx, hy);
  ctx.strokeStyle  = grad;
  ctx.lineWidth    = 1.6;
  ctx.lineCap      = "round";
  ctx.stroke();

  // ── Bright head glow ──────────────────────────────────────────────
  const headGrad = ctx.createRadialGradient(hx, hy, 0, hx, hy, 4);
  headGrad.addColorStop(0,   `rgba(255,255,255,${+op.toFixed(3)})`);
  headGrad.addColorStop(0.5, `rgba(${s.r},${s.g},${s.b},${+(op * 0.5).toFixed(3)})`);
  headGrad.addColorStop(1,   `rgba(${s.r},${s.g},${s.b},0)`);

  ctx.beginPath();
  ctx.arc(hx, hy, 4, 0, Math.PI * 2);
  ctx.fillStyle = headGrad;
  ctx.fill();

  ctx.restore();
}

/* ─── Component ──────────────────────────────────────────────────────── */

export default function ShootingStars() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const starsRef     = useRef<ShootingStar[]>([]);
  const rafRef       = useRef<number>(0);
  const lastTimeRef  = useRef<number>(0);
  const nextSpawnRef = useRef<number>(0); // ms until next star

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

    // Stagger the very first spawn so we don't see one immediately on load
    nextSpawnRef.current = 2000 + Math.random() * 2000;

    const animate = (time: number) => {
      const dt = lastTimeRef.current ? time - lastTimeRef.current : 16;
      lastTimeRef.current = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ── Spawning ────────────────────────────────────────────────────
      nextSpawnRef.current -= dt;
      if (nextSpawnRef.current <= 0) {
        starsRef.current.push(spawnStar(canvas.width, canvas.height));
        // Next star: every 3.5 – 7 s
        nextSpawnRef.current = 3500 + Math.random() * 3500;
      }

      // ── Update & draw ───────────────────────────────────────────────
      starsRef.current = starsRef.current.filter((s) => {
        s.age += dt;
        s.x   += s.vx * dt;
        s.y   += s.vy * dt;
        drawStar(ctx, s);
        return s.age < s.duration; // remove when expired
      });

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
        zIndex: 2, // above DiskGalaxies (z:1), below content (z:10)
      }}
    />
  );
}
