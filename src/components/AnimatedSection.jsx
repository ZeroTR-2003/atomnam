import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AnimatedSection = ({
  children,
  delay = 0.2,
  duration = 0.8,
  y = 30,
  triggerOnce = true,
  threshold = 0.2,
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce, threshold });

  React.useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [inView, controls]);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={controls}
      transition={{ duration, delay }}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;
