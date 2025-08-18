// 📁 File: src/components/3D/ReactorScene.jsx

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';

const GlowingCore = () => {
  const coreRef = useRef();
  useFrame(() => {
    if (coreRef.current) coreRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={coreRef} position={[0, 0.6, 0]}>
      <cylinderGeometry args={[0.4, 0.4, 1.2, 32]} />
      <meshStandardMaterial
        color="#f59e0b"
        emissive="#fbbf24"
        emissiveIntensity={1.2}
        metalness={0.4}
        roughness={0.3}
      />
    </mesh>
  );
};

const ReactorScene = ({ active }) => {
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
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 6, 4]} intensity={1.3} />
        <GlowingCore />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.75, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </motion.div>
  );
};

export default ReactorScene;