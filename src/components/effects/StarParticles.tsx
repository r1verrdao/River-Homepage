"use client";

import { useState, useEffect } from "react";

interface StarParticlesProps {
  count?: number;
  colors?: string[];
}

interface Particle {
  id: number;
  left: string;
  top: string;
  size: number;
  color: string;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
}

/**
 * Lightweight CSS-only floating star particles.
 * Renders absolutely-positioned dots that float with CSS keyframes.
 * Much lighter than Three.js — suitable for non-hero sections.
 * Particles are generated client-side only to avoid hydration mismatch.
 */
export default function StarParticles({
  count = 35,
  colors = [
    "rgba(0,217,255,0.4)",
    "rgba(124,58,237,0.35)",
    "rgba(236,72,153,0.3)",
    "rgba(232,234,246,0.2)",
  ],
}: StarParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => {
        const size = Math.random() * 2.5 + 0.8;
        return {
          id: i,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          size,
          color: colors[Math.floor(Math.random() * colors.length)],
          duration: Math.random() * 6 + 4,
          delay: Math.random() * 5,
          drift: Math.random() * 20 - 10,
          opacity: Math.random() * 0.6 + 0.2,
        };
      })
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        {particles.map((p) => (
          <span
            key={p.id}
            className="star-particle"
            style={{
              position: "absolute",
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: "50%",
              background: p.color,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
              opacity: p.opacity,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              // @ts-expect-error -- CSS custom properties
              "--drift": `${p.drift}px`,
            }}
          />
        ))}
      </div>

      <style>{`
        .star-particle {
          animation: particleFloat var(--duration, 5s) ease-in-out infinite;
        }

        @keyframes particleFloat {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: var(--start-opacity, 0.3);
          }
          25% {
            transform: translateY(-8px) translateX(var(--drift, 5px));
          }
          50% {
            transform: translateY(-14px) translateX(calc(var(--drift, 5px) * -0.5));
            opacity: calc(var(--start-opacity, 0.3) * 2.2);
          }
          75% {
            transform: translateY(-6px) translateX(var(--drift, 5px));
          }
        }
      `}</style>
    </>
  );
}
