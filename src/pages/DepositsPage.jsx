import React from "react";
import "./DepositsPage.css";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useNavigate } from "react-router-dom";

const deposits = [
  {
    title: "Sandstone-Hosted Deposits",
    icon: "🟠",
    description:
      "Porous sandstone aquifers containing uranium minerals. Ideal for In-Situ Recovery (ISR). Found in Namibia, Kazakhstan, USA.",
    mining: "Best suited for: Biotech ISR / ISL"
  },
  {
    title: "Hard Rock / Vein-Type Deposits",
    icon: "🟤",
    description:
      "Located in granite or metamorphic rock, often deep underground. Requires conventional mining. Found in Canada, Russia, South Africa.",
    mining: "Best suited for: Conventional Mining"
  },
  {
    title: "Surficial (Calcrete) Deposits",
    icon: "🟡",
    description:
      "Shallow deposits in calcrete soils, often in dry lakebeds. Sensitive to ecological disturbance. Found in Namibia, Australia.",
    mining: "Best suited for: ISR or shallow excavation with protection"
  }
];

const DepositsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="deposits-page">
      <Canvas className="deposits-canvas">
        <ambientLight intensity={0.5} />
        <Stars radius={100} depth={50} count={3000} factor={4} fade speed={2} />
      </Canvas>

      <main className="deposits-wrapper">
        <button className="back-button" onClick={() => navigate("/home")}>← Back to Home</button>

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="deposits-heading"
        >
          Geological Types of Uranium Deposits
        </motion.h1>

        <div className="deposit-card-container">
          {deposits.map((item, idx) => (
            <motion.div
              className="deposit-card"
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx, duration: 0.6 }}
            >
              <div className="deposit-icon">{item.icon}</div>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <span>{item.mining}</span>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DepositsPage;
