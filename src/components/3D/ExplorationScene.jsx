// 📁 File: src/components/3D/ExplorationScene.jsx

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';

const SurveyDrone = () => {
  const ref = useRef();
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
      ref.current.position.y = 1 + Math.sin(Date.now() * 0.001) * 0.3;
    }
  });

  return (
    <mesh ref={ref} position={[0, 1, 0]}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial color="#facc15" emissive="#facc15" emissiveIntensity={0.5} />
    </mesh>
  );
};

const ExplorationScene = ({ active }) => {
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
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }} shadows style={{ background: '#1f2937' }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} />
        <SurveyDrone />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#374151" />
        </mesh>
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </motion.div>
  );
};

export default ExplorationScene;