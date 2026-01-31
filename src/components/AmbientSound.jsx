import React, { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

const AmbientSound = () => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggleSound = () => {
    if (!audioRef.current) return;

    if (!playing) {
      audioRef.current.volume = 0.1; // very subtle
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

    setPlaying(!playing);
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/audio/shehnai.mp3" type="audio/mpeg" />
      </audio>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleSound}
        className="
          fixed bottom-40 right-4 z-40
          bg-white/90 backdrop-blur
          shadow-lg border border-gray-200
          rounded-full p-3
          hover:shadow-xl transition
        "
      >
        {playing ? (
          <Volume2 className="w-5 h-5 text-[#5a9b7f]" />
        ) : (
          <VolumeX className="w-5 h-5 text-gray-500" />
        )}
      </motion.button>
    </>
  );
};

export default AmbientSound;
