import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import TimelineNavigator from "../components/TimelineNavigator";
import ReferenceModals from "../components/ReferenceModals";
import stageInfo from "../data/stageInfo";
import BlastingScene from "../components/3D/BlastingScene";
import HaulingScene from "../components/3D/HaulingScene";
import ProcessingScene from "../components/3D/ProcessingScene";
import ExplorationScene from "../components/3D/ExplorationScene";
import EnrichmentScene from "../components/3D/EnrichmentScene";
import FuelFabricationScene from "../components/3D/FuelFabricationScene";
import ReactorScene from "../components/3D/ReactorScene";
import GridScene from "../components/3D/GridScene";
import "./Timeline.css";

gsap.registerPlugin(ScrollTrigger);

const stageAudioMap = {
  Exploration: "/sounds/exploration.mp3",
  Blasting: "/sounds/blasting.mp3",
  Hauling: "/sounds/hauling.mp3",
  Processing: "/sounds/processing.mp3",
  Enrichment: "/sounds/enrichment.mp3",
  Fuel: "/sounds/fabrication.mp3",
  Reactor: "/sounds/reactor.mp3",
  Grid: "/sounds/grid.mp3"
};

const Timeline = () => {
  const [currentStage, setCurrentStage] = useState("Exploration");
  const [feedback, setFeedback] = useState("");
  const [audio, setAudio] = useState(null);
  const contentRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    // Play transition sound every time stage changes
    const transitionAudio = new Audio("/sounds/blasting.mp3");
    transitionAudio.volume = 0.2;
    transitionAudio.play();

    // Stop previous audio
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    // Play stage-specific audio
    if (stageAudioMap[currentStage]) {
      const newAudio = new Audio(stageAudioMap[currentStage]);
      newAudio.volume = 0.4;
      newAudio.play();
      setAudio(newAudio);
    }
  }, [currentStage]);

  useEffect(() => {
    const { title, text } = stageInfo[currentStage] || {};
    setFeedback(`${title} — ${text}`);
    const timer = setTimeout(() => setFeedback(""), 3000);
    return () => clearTimeout(timer);
  }, [currentStage]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stage-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%"
          }
        }
      );
    }, contentRef);
    return () => ctx.revert();
  }, [currentStage]);

  const renderStageScene = () => {
    switch (currentStage) {
      case "Exploration": return <ExplorationScene active />;
      case "Blasting": return <BlastingScene active />;
      case "Hauling": return <HaulingScene active />;
      case "Processing": return <ProcessingScene active />;
      case "Enrichment": return <EnrichmentScene active />;
      case "Fuel": return <FuelFabricationScene active />;
      case "Reactor": return <ReactorScene active />;
      case "Grid": return <GridScene active />;
      default: return null;
    }
  };

  return (
    <div className="timeline-wrapper">
      <svg className="timeline-wave" viewBox="0 0 1440 320">
        <path fill="#fef08a" fillOpacity="0.3" d="M0,128L720,224L1440,96L1440,0L720,0L0,0Z" />
      </svg>

      <button className="back-home-btn" onClick={() => navigate("/home")}>← Back to Home</button>

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="timeline-title"
      >
        🌍 Uranium Lifecycle Timeline
      </motion.h2>

      <TimelineNavigator onStageChange={setCurrentStage} />

      <motion.div
        ref={contentRef}
        key={currentStage}
        className="stage-card"
      >
        <h3>{stageInfo[currentStage]?.title}</h3>
        <p>{stageInfo[currentStage]?.text}</p>
      </motion.div>

      {renderStageScene()}

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="timeline-feedback"
          >
            {feedback}
          </motion.div>
        )}
      </AnimatePresence>

      <ReferenceModals />
    </div>
  );
};

export default Timeline;