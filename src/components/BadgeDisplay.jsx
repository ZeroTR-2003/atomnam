// 📁 File: src/components/BadgeDisplay.jsx

import React from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { Link } from "react-router-dom";

const BadgeDisplay = ({ score, total }) => {
  const passed = score >= Math.ceil(total * 0.6);
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "#fefce8",
        fontFamily: "Sora, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 32,
      }}
    >
      {passed && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} />}

      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{ background: "#1e293b", borderRadius: 16, padding: 32, boxShadow: "0 0 24px #facc1560" }}
      >
        <h2 style={{ fontSize: "2rem", color: "#facc15", marginBottom: 12 }}>
          {passed ? "🏅 Uranium Explorer Badge!" : "📝 Keep Exploring!"}
        </h2>
        <p style={{ fontSize: "1.2rem" }}>
          You scored {score} out of {total}.
        </p>

        <div style={{ marginTop: 32, display: "flex", gap: 16, justifyContent: "center" }}>
          <Link to="/home">
            <button style={buttonStyle}>🏠 Back to Home</button>
          </Link>
          {passed && (
            <Link to="/simulator">
              <button style={{ ...buttonStyle, background: "#34d399" }}>🎮 Launch Simulator</button>
            </Link>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const buttonStyle = {
  background: "#facc15",
  color: "#1f1f1f",
  padding: "12px 24px",
  fontSize: "1rem",
  fontWeight: 600,
  borderRadius: "12px",
  border: "none",
  cursor: "pointer",
  boxShadow: "0 6px 16px rgba(250,204,21,0.3)"
};

export default BadgeDisplay;
