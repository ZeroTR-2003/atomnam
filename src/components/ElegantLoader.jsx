import React, { useEffect, useRef } from "react";
import "./ElegantLoader.css";

const ElegantLoader = ({ onComplete }) => {
  const loaderRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2800); // Adjust duration as needed

    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <div className="loader-screen" ref={loaderRef}>
      <div className="floating-circle">
        <span className="loader-orbit" />
        <span className="loader-center" />
      </div>
      <p className="loader-text">
        <span className="char">U</span>
        <span className="char">3</span>
        <span className="char">O</span>
        <span className="char">8</span>
        <span className="char">F</span>
        <span className="char">L</span>
        <span className="char">O</span>
        <span className="char">W</span>
        <span className="char">.</span>
        <span className="char">.</span>
        <span className="char">.</span>
      </p>
    </div>
  );
};

export default ElegantLoader;
