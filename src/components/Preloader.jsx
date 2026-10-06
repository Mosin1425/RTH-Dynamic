import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from '@/components/motion/Reveal';
import Logo from './Logo';

// Short branded intro shown once per browser session.
export default function Preloader() {
  const [show, setShow] = useState(() => {
    try {
      return !sessionStorage.getItem('rth-intro');
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (!show) return;
    try {
      sessionStorage.setItem('rth-intro', '1');
    } catch {
      /* private mode: just show it */
    }
    const t = setTimeout(() => setShow(false), 1900);
    return () => clearTimeout(t);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="grain fixed inset-0 z-[100] flex flex-col items-center justify-center bg-emerald-950"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <Logo className="h-20 w-32" />
          </motion.div>
          <div className="mt-6 overflow-hidden">
            <motion.p
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
              className="font-display text-3xl font-semibold text-gold-300"
            >
              Rajasthan Tent House
            </motion.p>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
            className="mt-6 h-px w-40 origin-left bg-gradient-to-r from-transparent via-gold-300 to-transparent"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-4 text-[10px] font-semibold uppercase tracking-[0.4em] text-ivory/50"
          >
            Since 1989 · Bhilwara
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
