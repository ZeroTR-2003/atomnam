// 📁 File: src/components/TimelineNavigator.jsx

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";

const stages = [
  { label: "Exploration", icon: "🧭" },
  { label: "Blasting", icon: "💥" },
  { label: "Hauling", icon: "🚚" },
  { label: "Processing", icon: "🧪" },
  { label: "Enrichment", icon: "⚗️" },
  { label: "Fuel", icon: "📦" },
  { label: "Reactor", icon: "⚛️" },
  { label: "Grid", icon: "🔌" }
];

const TimelineNavigator = ({ onStageChange }) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const explosionSoundRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (stages[currentStage].label === "Blasting") {
      const explosion = new Audio("/sounds/ambient.mp3");
      explosion.volume = 0.6;
      explosion.play();
      explosionSoundRef.current = explosion;
    }
  }, [currentStage]);

  const handleNext = () => {
    if (currentStage < stages.length - 1) {
      const nextStage = currentStage + 1;
      setCurrentStage(nextStage);
      setShowConfetti(true);
      if (onStageChange) onStageChange(stages[nextStage].label);
      setTimeout(() => setShowConfetti(false), 1400);
    } else {
      navigate("/quiz");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        background: "rgba(30, 41, 59, 0.75)",
        backdropFilter: "blur(10px)",
        padding: "28px",
        borderRadius: "16px",
        marginBottom: "40px",
        border: "1px solid rgba(250, 204, 21, 0.15)",
        boxShadow: "0 6px 18px rgba(0,0,0,0.4)",
        color: "#fefce8",
        textAlign: "center",
        fontFamily: "Sora, sans-serif",
        position: "relative"
      }}
    >
      <AnimatePresence>
        {showConfetti && (
          <>
            <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={100} recycle={false} />
            <motion.div
              key="badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{
                position: "absolute",
                top: "-60px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "#facc15",
                color: "#1e293b",
                borderRadius: "20px",
                padding: "12px 28px",
                fontWeight: "bold",
                boxShadow: "0 4px 16px #facc1577",
                zIndex: 10,
                fontSize: "1.1rem"
              }}
            >
              Stage Complete!
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <h3 style={{ marginBottom: "24px", fontSize: "1.3rem", color: "#facc15" }}>⛏️ Mining Timeline</h3>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "14px" }}>
        {stages.map((stage, index) => (
          <div
            key={stage.label}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              opacity: index > currentStage ? 0.35 : 1,
              transition: "opacity 0.3s ease-in-out"
            }}
          >
            <motion.div
              animate={{
                scale: index === currentStage ? 1.2 : 1,
                backgroundColor: index === currentStage ? "#facc15" : "#334155"
              }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.3rem",
                fontWeight: "bold",
                color: index === currentStage ? "#1f1d1a" : "#fefce8",
                boxShadow: index === currentStage ? "0 0 12px #facc15" : "none"
              }}
            >
              {stage.icon}
            </motion.div>
            <span style={{ fontSize: "0.75rem", marginTop: "6px" }}>{stage.label}</span>
          </div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleNext}
        style={{
          marginTop: "28px",
          padding: "12px 24px",
          background: "#facc15",
          color: "#1f1d1a",
          border: "none",
          borderRadius: "10px",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow: "0 0 10px #facc1560"
        }}
      >
        Next Stage →
      </motion.button>
    </motion.div>
  );
};

export default TimelineNavigator;