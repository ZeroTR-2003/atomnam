// 📁 File: src/components/3D/BlastingScene.jsx

import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';

const Rock = ({ triggerBlast }) => {
  const groupRef = useRef();
  const [blastStarted, setBlastStarted] = useState(false);

  useEffect(() => {
    if (triggerBlast && groupRef.current && !blastStarted) {
      const children = groupRef.current.children;
      children.forEach((piece, i) => {
        piece.position.set(0, 0, 0);
        piece.visible = true;
      });

      setBlastStarted(true);

      let t = 0;
      const blastInterval = setInterval(() => {
        if (t > 1) return clearInterval(blastInterval);
        t += 0.05;
        children.forEach((piece, i) => {
          const angle = (i / children.length) * Math.PI * 2;
          piece.position.x += Math.cos(angle) * 0.1;
          piece.position.y += Math.random() * 0.2;
          piece.position.z += Math.sin(angle) * 0.1;
        });
      }, 50);
    }
  }, [triggerBlast, blastStarted]);

  return (
    <group ref={groupRef}>
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} visible={false}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial color="#9ca3af" />
        </mesh>
      ))}
    </group>
  );
};

const BlastingScene = ({ active }) => {
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
        <ambientLight intensity={0.5} />
        <directionalLight
          castShadow
          position={[5, 10, 5]}
          intensity={1.2}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <Rock triggerBlast={active} />
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.5, 0]}
          receiveShadow
        >
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#374151" />
        </mesh>
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </motion.div>
  );
};

export default BlastingScene;