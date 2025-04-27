// Enhanced HeroSection.jsx
"use client";
import { motion } from "framer-motion";

export const ServiceHeroSection = ({
  className = "",
  title = "Partnering with you on your Digital Journey",
  description = `From inception to execution, to sustainment... I can help. Whether you're beginning your digital journey, transitioning, or need support for existing systems.`,
  titleClass = "text-4xl font-bold text-white mb-6",
  descClass = "text-white/80 font-light max-w-3xl mx-auto text-lg leading-relaxed",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
      className={`mb-12 text-center ${className}`}
    >
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
        className={titleClass}
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9 }}
        className={descClass}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};
