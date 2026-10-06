import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Code2, MessageCircle, Volume2, VolumeX } from 'lucide-react';
import { whatsappLink } from '@/constants/data';

const MOSIN_WHATSAPP = '916350089531';
const MOSIN_MESSAGE = encodeURIComponent(
  'Hi Mosin, I visited Rajasthan Tent House’s website and I want a similar website for my business.'
);

// Bottom-right dock: ambient shehnai toggle, "built by Mosin" badge and the WhatsApp button.
export default function FloatingActions() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const [badgeOpen, setBadgeOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const toggleSound = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    audio.volume = 0.12;
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} loop preload="none">
        <source src="/audio/shehnai.mp3" type="audio/mpeg" />
      </audio>

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-4 right-4 z-[80] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6"
          >
            <button
              onClick={toggleSound}
              aria-label={playing ? 'Mute ambient music' : 'Play ambient shehnai music'}
              className="relative grid h-11 w-11 place-items-center rounded-full border border-white/60 bg-white/80 text-emerald-800 shadow-lg backdrop-blur-xl transition hover:scale-105"
            >
              {playing && <span className="absolute inset-0 animate-ping rounded-full bg-gold-300/40" />}
              {playing ? <Volume2 className="relative h-5 w-5" /> : <VolumeX className="relative h-5 w-5 text-ink-soft" />}
            </button>

            <a
              href={`https://wa.me/${MOSIN_WHATSAPP}?text=${MOSIN_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setBadgeOpen(true)}
              onMouseLeave={() => setBadgeOpen(false)}
              onFocus={() => setBadgeOpen(true)}
              onBlur={() => setBadgeOpen(false)}
              aria-label="Want a website like this? Built by Mosin"
              className="flex items-center gap-2 rounded-full border border-white/60 bg-white/80 p-2 text-xs sm:pr-3 text-emerald-900 shadow-lg backdrop-blur-xl"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-emerald-900 text-gold-300">
                <Code2 className="h-3.5 w-3.5" />
              </span>
              <span className="hidden font-semibold sm:inline">Want a site like this?</span>
              <AnimatePresence>
                {badgeOpen && window.matchMedia('(min-width: 640px)').matches && (
                  <motion.span
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 'auto', opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="overflow-hidden whitespace-nowrap text-ink-soft"
                  >
                    · Built by Mosin
                  </motion.span>
                )}
              </AnimatePresence>
            </a>

            <a
              href={whatsappLink('Hi, I visited your website and want to enquire about an event.')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="group relative flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3.5 text-white shadow-[0_15px_35px_-10px_rgba(37,211,102,0.7)] transition hover:scale-105"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="hidden text-sm font-semibold sm:inline">Chat on WhatsApp</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
