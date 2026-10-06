import React from "react";
import { motion } from "framer-motion";

const particles = Array.from({ length: 25 });

const GoldenParticles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((_, i) => (
        <motion.span
          key={i}
          initial={{
            opacity: 0,
            y: Math.random() * 300,
            x: Math.random() * 1200,
          }}
          animate={{
            opacity: [0, 0.6, 0],
            y: "-120vh",
          }}
          transition={{
            duration: 8 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          className="absolute w-1.5 h-1.5 bg-yellow-400 rounded-full blur-sm"
        />
      ))}
    </div>
  );
};

export default GoldenParticles;
