import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ElegantLoader from "../components/ElegantLoader";
import "./ScrollIntro.css";

const lines = [
  "Beneath Namibia's timeless sands lies a silent energy.",
  "Uranium — invisible, potent, and waiting.",
  "For decades, it powered cities oceans away, while its story lay buried.",
  "Now, you shape what becomes of this power."
];

const ScrollIntro = () => {
  const navigate = useNavigate();
  const audioRef = useRef(null);

  const [index, setIndex] = useState(0);
  const [showEnter, setShowEnter] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleLoaderComplete = () => setLoading(false);

  // Setup intro lines playback
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Lock scroll

    return () => {
      document.body.style.overflow = "auto"; // ✅ Restore scroll on exit
    };
  }, []);

  useEffect(() => {
    if (loading) return;

    let current = 0;
    const interval = setInterval(() => {
      if (current < lines.length - 1) {
        current += 1;
        setIndex(current);
      } else {
        setShowEnter(true);
        clearInterval(interval);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [loading]);

  const handleEnter = () => {
    setFadeOut(true);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setTimeout(() => navigate("/home"), 1000);
  };

  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.volume = 0.4;
        audio.loop = true;
        await audio.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.warn("Audio toggle failed:", err);
    }
  };

  if (loading) return <ElegantLoader onComplete={handleLoaderComplete} />;

  return (
    <section className="intro-container">
      <audio ref={audioRef} src="/sounds/one.mp3" preload="auto" />
      <div className="intro-overlay" />

      <div className="intro-logo">U3O8FLOW</div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 1.1 }}
          className="intro-line"
        >
          {lines[index]}
        </motion.div>
      </AnimatePresence>

      {showEnter && (
        <div className="enter-button-wrapper">
          <motion.button
            onClick={handleEnter}
            className="modern-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Enter
          </motion.button>
          <p className="enter-subtext">Click to begin your journey</p>
        </div>
      )}

      <div className="audio-toggle" onClick={toggleAudio}>
        {isPlaying ? <FaVolumeUp size={18} /> : <FaVolumeMute size={18} />}
      </div>

      {fadeOut && <div className="fade-out-overlay" />}
    </section>
  );
};

export default ScrollIntro;
