// 📁 File: src/components/3D/GridScene.jsx

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';

const PowerLines = () => {
  const wiresRef = useRef();
  useFrame(() => {
    if (wiresRef.current) {
      wiresRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={wiresRef} position={[0, 0.2, 0]}>
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} position={[i * 0.6 - 1.2, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 1.6]} />
          <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.4} />
        </mesh>
      ))}
    </group>
  );
};

const GridScene = ({ active }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        width: '100%',
        height: '400px',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        marginBottom: '40px'
      }}
    >
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }} style={{ background: '#0f172a' }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 5, 4]} intensity={1.2} />
        <PowerLines />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </motion.div>
  );
};

export default GridScene;