import React from "react";
import { motion } from "framer-motion";

const SilkReveal = ({ children }) => {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-b from-[#5a9b7f] to-[#4a826a] origin-top z-20"
      />
      {children}
    </div>
  );
};

export default SilkReveal;
