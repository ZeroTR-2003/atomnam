// 📁 File: src/components/3D/ProcessingScene.jsx

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';

const ReactorCore = () => {
  const coreRef = useRef();
  const fogRef = useRef();

  useFrame(() => {
    if (coreRef.current) coreRef.current.rotation.y += 0.01;
    if (fogRef.current) {
      fogRef.current.position.y += 0.005;
      if (fogRef.current.position.y > 2) fogRef.current.position.y = 0.5;
    }
  });

  return (
    <>
      <mesh ref={coreRef} position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 1.5, 32]} />
        <meshStandardMaterial color="#22d3ee" emissive="#0ea5e9" emissiveIntensity={0.6} />
      </mesh>
      <mesh ref={fogRef} position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.2} />
      </mesh>
    </>
  );
};

const ProcessingScene = ({ active }) => {
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
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
      }}
    >
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }} shadows style={{ background: '#1e1e1e' }}>
        <ambientLight intensity={0.6} />
        <directionalLight
          castShadow
          position={[3, 5, 5]}
          intensity={1.2}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <ReactorCore />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </motion.div>
  );
};

export default ProcessingScene;