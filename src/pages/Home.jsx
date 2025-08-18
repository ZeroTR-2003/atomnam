import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GlossaryTooltip from "../components/GlossaryTooltip";
import ElegantLoader from "../components/ElegantLoader";
import ReferenceModals from "../components/ReferenceModals";
import { motion } from "framer-motion";
import "./Home.css";

const cardData = [
  {
    title: "Uranium Timeline",
    subtitle: "Trace the story of uranium — from cosmic formation, geological deposits in Namibia, to its refinement into usable nuclear energy.",
    image: "/assets/timeline.jpg",
    glossary: "fuel cycle",
    color: "orange"
  },
  {
    title: "Fuel Cycle",
    subtitle: "Explore ISL mining, uranium milling, enrichment, fuel fabrication, reactor use, and waste management techniques.",
    image: "/assets/fuel.jpg",
    glossary: "isl",
    color: "lime"
  },
  {
    title: "CO₂ Comparison",
    subtitle: "Simulate carbon footprints of coal, solar, wind, and uranium-based energy projects. Discover nuclear’s emissions advantage.",
    image: "/assets/co2.jpg",
    glossary: "carbon",
    color: "blue"
  },
  {
    title: "Knowledge Hub",
    subtitle: "Dive deeper into Namibia’s nuclear policy, energy strategy, international safety standards, and educational resources.",
    image: "/assets/nkow.jpg",
    glossary: "nuclear policy",
    color: "mint"
  },
  {
    title: "Compare Methods",
    subtitle: "Conventional vs Biotech ISR: Interactive visual comparison of uranium extraction methods.",
    image: "/assets/isr.jpg",
    glossary: "ISR",
    color: "orange"
  },
  {
    title: "Geological Types",
    subtitle: "Learn about sandstone, vein-type, and surficial uranium deposits — and what mining method suits each.",
    image: "/assets/geo.jpg",
    glossary: "geology",
    color: "lime"
  },
  {
    title: "Knowledge Quizzes",
    subtitle: "Test your understanding of nuclear science, uranium mining, safety, sustainability, and more.",
    image: "/assets/quiz.jpg",
    glossary: "quizzes",
    color: "blue"
  },
  {
    title: "Biotech Case Study",
    subtitle: "Compare the sustainability and efficiency of biotech-enhanced ISR vs conventional mining.",
    image: "/assets/case-study.jpg",
    glossary: "bacterial leaching",
    color: "mint"
  }
];

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "auto";
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <ElegantLoader />;

  return (
    <motion.div
      className="home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Navbar />

      <main className="home-wrapper">
        <svg className="svg-background" viewBox="0 0 1440 320">
          <path fill="#fef08a" fillOpacity="0.3" d="M0,128L720,224L1440,96L1440,0L720,0L0,0Z" />
        </svg>

        <div className="hero-banner">
          <h1 className="hero-heading">Understanding Namibia’s Nuclear Energy System</h1>
          <p className="hero-subtext">
            From <GlossaryTooltip term="uranium desert" /> to nuclear energy — each section below describes a stage in the journey.
          </p>
        </div>

        <section className="grid-card-section">
          <h2 className="section-heading">Explore the System</h2>

          <div className="grid-card-container">
            {cardData.map((card, idx) => (
              <motion.div
                key={idx}
                className={`grid-card card-${card.color}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * idx }}
              >
                <img src={card.image} alt={card.title} className="grid-card-image" />
                <div className="grid-card-body">
                  <h3>{card.title}</h3>
                  <p>{card.subtitle}</p>
                  <GlossaryTooltip term={card.glossary} />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="cta-section">
          <h2>Ready to launch the simulator?</h2>
          <p>Interact with Namibia’s nuclear development projects in real-time.</p>
          <a href="/simulator" className="launch-button">Launch Simulator</a>
        </section>

        <section className="cta-section">
          <h2>See the Full Timeline</h2>
          <p>
            Trace uranium’s journey — from cosmic origin to Namibian desert, to reactor fuel powering the world.
          </p>
          <a href="/timeline" className="launch-button">View Timeline</a>
        </section>
      </main>

      <Footer />
      <ReferenceModals />
    </motion.div>
  );
};

export default Home;
