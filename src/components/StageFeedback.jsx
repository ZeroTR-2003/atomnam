// 📁 File: src/components/StageFeedback.jsx

import React from 'react';
import { motion } from 'framer-motion';

const StageFeedback = ({ feedback }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'fixed',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(31, 41, 55, 0.9)',
        color: '#fefce8',
        padding: '16px 28px',
        borderRadius: '12px',
        border: '1px solid #facc15',
        fontSize: '1rem',
        maxWidth: '640px',
        textAlign: 'center',
        zIndex: 1000,
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
      }}
    >
      {feedback}
    </motion.div>
  );
};

export default StageFeedback;
