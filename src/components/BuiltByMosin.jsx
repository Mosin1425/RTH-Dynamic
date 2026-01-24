import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

const WHATSAPP = "916350089531";
const MESSAGE = encodeURIComponent(
  "Hi Mosin, I visited Rajasthan Tent House’s website and I want a similar website for my business."
);

const BuiltByMosin = () => {
  const [open, setOpen] = useState(false);
  const lastTap = useRef(0);

  const isTouchDevice = () =>
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  const handleClick = (e) => {
    if (isTouchDevice()) {
      const now = Date.now();

      // First tap → expand only
      if (!open || now - lastTap.current > 1200) {
        e.preventDefault();
        setOpen(true);
        lastTap.current = now;
        return;
      }

      // Second tap (within 1.2s) → open WhatsApp
      window.open(`https://wa.me/${WHATSAPP}?text=${MESSAGE}`, "_blank");
    } else {
      // Desktop → direct open
      window.open(`https://wa.me/${WHATSAPP}?text=${MESSAGE}`, "_blank");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        fixed bottom-24 right-4 z-40
        bg-white/95 backdrop-blur
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
      onMouseEnter={() => !isTouchDevice() && setOpen(true)}
      onMouseLeave={() => !isTouchDevice() && setOpen(false)}
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
            Built by Mosin · Tap again to chat
          </motion.span>
        )}
      </div>
    </motion.div>
  );
};

export default BuiltByMosin;
