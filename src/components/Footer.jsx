import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowUp, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const toggleScrollBtn = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleScrollBtn);
    return () => window.removeEventListener("scroll", toggleScrollBtn);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.footer
      className="footer-new"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Yellow wave background */}
      <svg className="footer-wave" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path fill="#fef08a" fillOpacity="0.25" d="M0,80L720,10L1440,100L1440,0L720,0L0,0Z" />
      </svg>

      <div className="footer-grid">
        <div className="footer-brand-block">
          <h2>U3O8Flow</h2>
          <p>Namibia’s clean energy future — powered by knowledge.</p>
        </div>

        <div className="footer-link-block">
          <h4>Pages</h4>
          <Link to="/home">Home</Link>
          <Link to="/timeline">Timeline</Link>
          <Link to="/quiz">Quiz</Link>
          <Link to="/simulator">Simulator</Link>
        </div>

        <div className="footer-social-block">
          <h4>Follow</h4>
          <div className="social-icons">
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaFacebookF /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <small>© {new Date().getFullYear()} U3O8Flow. All rights reserved.</small>
      </div>

      {showTopBtn && (
        <button className="footer-scroll-top" onClick={scrollToTop} aria-label="Scroll to Top">
          <FaArrowUp />
        </button>
      )}
    </motion.footer>
  );
};

export default Footer;
