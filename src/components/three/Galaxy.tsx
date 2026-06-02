"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface GalaxyProps {
  count?: number;
  radius?: number;
  branches?: number;
  spin?: number;
  randomness?: number;
  randomnessPower?: number;
}

export default function Galaxy({
  count = 80000,
  radius = 6,
  branches = 5,
  spin = 1.2,
  randomness = 0.4,
  randomnessPower = 3,
}: GalaxyProps) {
  const ref = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorInside = new THREE.Color("#00d9ff");   // cyan
    const colorMiddle = new THREE.Color("#7c3aed");   // purple
    const colorOutside = new THREE.Color("#ec4899");  // pink

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const r = Math.random() * radius;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;
      const spinAngle = r * spin;

      const randomX =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        r;
      const randomY =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        r *
        0.3;
      const randomZ =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        r;

      positions[i3] = Math.cos(branchAngle + spinAngle) * r + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;

      // Color interpolation based on radius
      const mixRatio = r / radius;
      let mixedColor: THREE.Color;

      if (mixRatio < 0.5) {
        mixedColor = colorInside.clone().lerp(colorMiddle, mixRatio * 2);
      } else {
        mixedColor = colorMiddle.clone().lerp(colorOutside, (mixRatio - 0.5) * 2);
      }

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    return [positions, colors];
  }, [count, radius, branches, spin, randomness, randomnessPower]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
      // Subtle mouse parallax
      ref.current.rotation.x = THREE.MathUtils.lerp(
        ref.current.rotation.x,
        mouse.y * 0.08,
        0.02
      );
      ref.current.rotation.z = THREE.MathUtils.lerp(
        ref.current.rotation.z,
        mouse.x * 0.04,
        0.02
      );
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        sizeAttenuation
        vertexColors
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        transparent
        opacity={0.9}
      />
    </points>
  );
}
