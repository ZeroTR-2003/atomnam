// 📁 File: src/components/MineSimulator.jsx

import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const Pit = ({ speed }) => {
  const pitRef = useRef();

  useFrame(() => {
    if (pitRef.current) {
      pitRef.current.scale.y = 0.5 + speed / 100;
    }
  });

  return (
    <mesh ref={pitRef} position={[0, -0.5, 0]}>
      <cylinderGeometry args={[1.5, 2, 1.5, 32]} />
      <meshStandardMaterial color="#3b3b3b" roughness={0.8} metalness={0.3} />
    </mesh>
  );
};

const Dust = ({ protection }) => {
  const dustRef = useRef();
  useFrame(() => {
    if (dustRef.current) {
      dustRef.current.material.opacity = protection < 30 ? 0.5 : 0;
    }
  });

  return (
    <mesh ref={dustRef} position={[0, 1.2, 0]}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshStandardMaterial color="#aaaaaa" transparent opacity={0} />
    </mesh>
  );
};

const Glow = ({ impact }) => {
  const glowRef = useRef();
  useFrame(() => {
    if (glowRef.current) {
      glowRef.current.material.emissiveIntensity = impact === "High" ? 2 : 0.1;
    }
  });

  return (
    <mesh ref={glowRef} position={[0, 0, 0]}>
      <ringGeometry args={[2.2, 2.5, 64]} />
      <meshStandardMaterial
        color="#ff0000"
        emissive="#ff0000"
        emissiveIntensity={0.1}
        transparent
        opacity={0.2}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const MineSimulator = ({ speed, protection, impact }) => {
  return (
    <div style={{ width: "100%", height: "300px", borderRadius: "12px", overflow: "hidden" }}>
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[3, 5, 2]} intensity={0.9} />
        <Pit speed={speed} />
        <Dust protection={protection} />
        <Glow impact={impact} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default MineSimulator;
