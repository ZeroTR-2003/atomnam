// 📁 File: src/components/3D/HaulingScene.jsx

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';

const Truck = ({ active }) => {
  const ref = useRef();
  const speed = 0.02;
  let direction = 1;

  useFrame(() => {
    if (!active || !ref.current) return;
    ref.current.position.x += speed * direction;
    if (ref.current.position.x > 2.5 || ref.current.position.x < -2.5) {
      direction *= -1;
    }
  });

  return (
    <group ref={ref} position={[-2, 0, 0]}>
      <mesh>
        <boxGeometry args={[1.2, 0.6, 0.8]} />
        <meshStandardMaterial color="#facc15" />
      </mesh>
      <mesh position={[-0.5, -0.4, 0.4]}>
        <cylinderGeometry args={[0.2, 0.2, 0.2, 16]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <mesh position={[0.5, -0.4, 0.4]}>
        <cylinderGeometry args={[0.2, 0.2, 0.2, 16]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
    </group>
  );
};

const HaulingScene = ({ active }) => {
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
        <Truck active={active} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#4b5563" />
        </mesh>
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </motion.div>
  );
};

export default HaulingScene;