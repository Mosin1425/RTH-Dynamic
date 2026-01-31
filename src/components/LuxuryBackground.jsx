import React from "react";
import { motion } from "framer-motion";

const particles = Array.from({ length: 25 });

const LuxuryBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      
      {/* Subtle Texture Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,215,0,0.05),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.05),transparent_50%)]" />

      {/* Floating Golden Particles */}
      {particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 0.2,
            y: Math.random() * 800,
            x: Math.random() * 1200,
          }}
          animate={{
            y: ["0%", "-100%"],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute w-2 h-2 bg-yellow-300 rounded-full blur-sm"
        />
      ))}
    </div>
  );
};

export default LuxuryBackground;
