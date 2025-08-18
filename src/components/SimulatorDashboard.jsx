import React from "react";
import { motion } from "framer-motion";
import "./SimulatorDashboard.css";

const SimulatorDashboard = ({ blasting, protection, impact }) => {
  const yieldPercent = Math.round((blasting * 0.6 + (100 - protection) * 0.4));
  const risk =
    impact === "High" ? "⚠️ High" :
    impact === "Moderate" ? "🟠 Moderate" :
    "✅ Low";

  return (
    <motion.div
      className="dashboard-grid"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="dashboard-card">
        <h4>Yield Output</h4>
        <p>{yieldPercent}%</p>
      </div>

      <div className="dashboard-card">
        <h4>Environmental Risk</h4>
        <p>{risk}</p>
      </div>

      <div className="dashboard-card">
        <h4>Protection Level</h4>
        <p>{protection}%</p>
      </div>
    </motion.div>
  );
};

export default SimulatorDashboard;
