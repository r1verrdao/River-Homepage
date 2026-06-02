"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function NebulaCloud() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.008;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.003) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Purple nebula cloud */}
      <mesh position={[-2, 0.5, -2]}>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshBasicMaterial
          color={new THREE.Color("#7c3aed")}
          transparent
          opacity={0.04}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Cyan nebula cloud */}
      <mesh position={[2.5, -0.5, -1]}>
        <sphereGeometry args={[1.2, 16, 16]} />
        <meshBasicMaterial
          color={new THREE.Color("#00d9ff")}
          transparent
          opacity={0.04}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Pink nebula cloud */}
      <mesh position={[0, -1, 1]}>
        <sphereGeometry args={[1.0, 16, 16]} />
        <meshBasicMaterial
          color={new THREE.Color("#ec4899")}
          transparent
          opacity={0.03}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
