import React from "react";
import { motion } from "framer-motion";

const GoldHeading = ({ children, className = "" }) => {
  return (
    <motion.h2
      initial={{ backgroundPosition: "-200% center" }}
      animate={{ backgroundPosition: "200% center" }}
      transition={{
        repeat: Infinity,
        duration: 6,
        ease: "linear",
      }}
      className={`
        bg-gradient-to-r 
        from-yellow-300 
        via-yellow-500 
        to-yellow-300 
        bg-[length:200%_100%] 
        bg-clip-text 
        text-transparent 
        font-bold
        ${className}
      `}
    >
      {children}
    </motion.h2>
  );
};

export default GoldHeading;
