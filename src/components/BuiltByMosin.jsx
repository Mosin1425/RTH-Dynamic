import React, { useState } from "react";
import { motion } from "framer-motion";

const WHATSAPP = "919636798937";
const MESSAGE = encodeURIComponent(
  "Hi Mosin, I visited Rajasthan Tent House’s website and I want a similar website for my business."
);

const BuiltByMosin = () => {
  const [open, setOpen] = useState(false);

  const handleClick = (e) => {
    // On mobile: first tap just expands
    if (!open) {
      e.preventDefault();
      setOpen(true);
      return;
    }

    // Second tap → go to WhatsApp
    window.open(`https://wa.me/${WHATSAPP}?text=${MESSAGE}`, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        fixed bottom-24 right-4 z-40
        bg-white/90 backdrop-blur
        border border-gray-200
        shadow-md rounded-full
        px-3 py-2
        text-[11px]
        text-gray-700
        hover:shadow-lg
        transition-all
        max-w-[220px]
        cursor-pointer
      "
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={handleClick}
    >
      <div className="leading-tight">
        <span className="text-[#5a9b7f] font-semibold block">
          Want a website like this?
        </span>

        {open && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="block text-[10px] text-gray-500 mt-0.5"
          >
            Built by Mosin · Chat on WhatsApp
          </motion.span>
        )}
      </div>
    </motion.div>
  );
};

export default BuiltByMosin;
