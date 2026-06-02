"use client";

import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import Galaxy from "../three/Galaxy";
import StarField from "../three/StarField";
import NebulaCloud from "../three/NebulaCloud";

export default function GalaxyCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 2.5, 6], fov: 65 }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      style={{ background: "transparent" }}
    >
      <AdaptiveDpr pixelated />
      <ambientLight intensity={0.2} />
      <Galaxy count={80000} radius={5.5} branches={5} spin={1.2} />
      <StarField count={2500} />
      <NebulaCloud />
    </Canvas>
  );
}
