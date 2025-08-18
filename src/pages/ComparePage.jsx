import React from "react";
import "./ComparePage.css";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Stars } from "@react-three/drei";
import { useNavigate } from "react-router-dom";

const compareData = [
  {
    label: "Land Disruption",
    conventional: "🌋 High surface excavation, blasting, and tailings dams",
    biotech: "🌱 Minimal disturbance, in-situ extraction underground"
  },
  {
    label: "Energy Use",
    conventional: "⚡ Very High — heavy machinery & processing",
    biotech: "🔋 Moderate — pumps and microbial reactions only"
  },
  {
    label: "Worker Safety",
    conventional: "🚧 High exposure to dust, radiation, and collapse",
    biotech: "🧪 Low — remotely monitored, safer environments"
  },
  {
    label: "Tailings Reuse",
    conventional: "🚫 Rarely re-used, often left as waste",
    biotech: "♻️ Efficient recovery from tailings using microbes"
  },
  {
    label: "Cost Efficiency",
    conventional: "💸 High operational and maintenance costs",
    biotech: "📉 Up to 30% lower cost over project lifetime"
  }
];

const ComparePage = () => {
  const navigate = useNavigate();

  return (
    <div className="compare-page">
      <main className="compare-wrapper">
        {/* Abstract animated background */}
        <Canvas className="compare-canvas">
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Stars radius={100} depth={50} count={2000} factor={4} fade speed={1} />
          <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <mesh position={[0, 0, 0]}>
              <torusKnotGeometry args={[1.5, 0.4, 128, 32]} />
              <meshStandardMaterial color="#facc15" emissive="#f97316" roughness={0.3} metalness={0.8} />
            </mesh>
          </Float>
          <OrbitControls enableZoom={false} />
        </Canvas>

        <button className="back-button" onClick={() => navigate("/home")}>← Back to Home</button>

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="compare-heading"
        >
          Compare Uranium Extraction Methods
        </motion.h1>

        <div className="compare-grid">
          <motion.div
            className="compare-column column-left"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <h2>Conventional Mining</h2>
            {compareData.map((item, idx) => (
              <motion.div
                className="compare-card"
                key={idx}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <strong>{item.label}</strong>
                <p>{item.conventional}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="compare-column column-right"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <h2>Biotech ISR</h2>
            {compareData.map((item, idx) => (
              <motion.div
                className="compare-card"
                key={idx}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <strong>{item.label}</strong>
                <p>{item.biotech}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ComparePage;
