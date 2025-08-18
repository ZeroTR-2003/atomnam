import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ReferenceModals.css";
import { FaInfoCircle, FaTimes } from "react-icons/fa";

const references = [
  "IAEA – Uranium Extraction Technology (2020)",
  "World Nuclear Association – ISR Mining Overview (2023)",
  "Rosatom Reports – ISR Operations at Khiagda & Dalur",
  "OECD NEA – Decarbonisation System Costs (2022)",
  "UNESCO – Nuclear Science Education Tools (2022)"
];

const ReferenceModals = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="ref-container">
      <button className="ref-toggle" onClick={() => setOpen(true)}>
        <FaInfoCircle size={20} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="ref-modal"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
          >
            <div className="ref-header">
              <h4>Sources</h4>
              <button onClick={() => setOpen(false)}><FaTimes size={14} /></button>
            </div>
            <ul>
              {references.map((ref, idx) => (
                <li key={idx}>{ref}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReferenceModals;
