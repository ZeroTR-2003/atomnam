import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import MineSimulator from "../components/MineSimulator";
import SimulatorDashboard from "../components/SimulatorDashboard";
import ReportExport from "../components/ReportExport";
import "./SimulatorPage.css";

const SimulatorPage = () => {
  const [blasting, setBlasting] = useState(50);
  const [protection, setProtection] = useState(50);
  const [impact, setImpact] = useState("Moderate");

  const feedbackSound = new Audio("/sounds/blasting.mp3");
  feedbackSound.volume = 0.4;

  const calculateImpact = () => {
    if (blasting > 70 && protection < 30) return "High";
    if (blasting < 30 && protection > 70) return "Low";
    return "Moderate";
  };

  const handleChange = (setter) => (e) => {
    const val = parseInt(e.target.value);
    setter(val);
    setImpact(calculateImpact());
    try {
      feedbackSound.currentTime = 0;
      feedbackSound.play();
    } catch (err) {
      console.warn("Audio playback failed:", err);
    }
  };

  return (
    <div className="simulator-wrapper">
      <Link to="/home" className="simulator-back">← Back to Home</Link>

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="simulator-heading"
      >
        🎛️ Nuclear Mining Simulator
      </motion.h1>

      <MineSimulator speed={blasting} protection={protection} impact={impact} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="simulator-controls"
      >
        <div className="simulator-slider">
          <label>💥 Blasting Intensity: <strong>{blasting}</strong></label>
          <input
            type="range"
            min="0"
            max="100"
            value={blasting}
            onChange={handleChange(setBlasting)}
          />
        </div>

        <div className="simulator-slider">
          <label>🛡️ Environmental Protection: <strong>{protection}</strong></label>
          <input
            type="range"
            min="0"
            max="100"
            value={protection}
            onChange={handleChange(setProtection)}
          />
        </div>

        <div className="simulator-feedback">
          ⚖️ Sustainability Score: <span>{impact}</span>
        </div>

        <SimulatorDashboard
          blasting={blasting}
          protection={protection}
          impact={impact}
        />

        <ReportExport data={{ blasting, protection, impact }} />
      </motion.div>
    </div>
  );
};

export default SimulatorPage;
