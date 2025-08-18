import React, { useState } from "react";
import "./GlossaryTooltip.css";

const glossary = {
  uranium: "A heavy metal used as fuel in nuclear reactors to generate electricity.",
  "uranium desert": "The semi-arid regions in Namibia rich in uranium ore deposits.",
  "fuel cycle": "The series of processes involved in producing nuclear energy from uranium.",
  isl: "In-situ leaching — a method of mining uranium using a solution to extract it underground.",
  carbon: "Carbon dioxide (CO₂) — a major greenhouse gas emitted by fossil fuel energy sources.",
  "nuclear policy": "A framework of laws and goals governing the use and regulation of nuclear technology."
};

const GlossaryTooltip = ({ term }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const description = glossary[term.toLowerCase()] || "No description found.";

  return (
    <span
      className="glossary-term"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
    >
      {term}
      {showTooltip && <div className="tooltip-box">{description}</div>}
    </span>
  );
};

export default GlossaryTooltip;
