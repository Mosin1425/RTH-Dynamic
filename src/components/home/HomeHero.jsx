import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Play, Star } from 'lucide-react';
import SplitText from '@/components/motion/SplitText';
import Magnetic from '@/components/motion/Magnetic';
import { EASE } from '@/components/motion/Reveal';

const slides = [
  { src: '/assets/003-vmake.jpg', label: 'Royal wedding stages' },
  { src: '/assets/AI_01.png', label: 'Open-air mandaps' },
  { src: '/assets/005-vmake.jpg', label: 'Floral receptions' },
  { src: '/assets/007-vmake.jpg', label: 'Lights & DJ nights' },
];
const SLIDE_MS = 6000;

export default function HomeHero() {
  const ref = useRef(null);
  const [current, setCurrent] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const t = setTimeout(() => setCurrent((c) => (c + 1) % slides.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [current]);

  return (
    <section ref={ref} className="grain relative isolate flex min-h-[100svh] items-end overflow-hidden bg-emerald-950 pb-28 pt-32 sm:items-center sm:pb-24">
      {/* Ken Burns slideshow */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-20">
        <AnimatePresence initial={false}>
          <motion.img
            key={current}
            src={slides[current].src}
            alt=""
            aria-hidden="true"
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1.02, transition: { opacity: { duration: 1.6 }, scale: { duration: SLIDE_MS / 1000 + 1.6, ease: 'linear' } } }}
            exit={{ opacity: 0, transition: { duration: 1.6 } }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-emerald-950 via-emerald-950/55 to-emerald-950/40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-950/80 via-emerald-950/20 to-transparent" />

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="container">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="glass inline-flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-4 text-xs text-ivory"
          >
            <span className="flex items-center gap-0.5 rounded-full bg-gold-400 px-2.5 py-1 text-emerald-950">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-3 w-3" fill="currentColor" strokeWidth={0} />
              ))}
            </span>
            Trusted by 1,000+ families across Rajasthan
          </motion.div>

          <SplitText
            as="h1"
            animateOnMount
            delay={0.35}
            stagger={0.07}
            text="Crafting *grand celebrations* & timeless memories"
            className="mt-7 text-balance text-[clamp(2.75rem,8vw,6.5rem)] font-semibold leading-[0.98] text-ivory"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 1 }}
            className="mt-7 max-w-xl text-base leading-relaxed text-ivory/75 sm:text-lg"
          >
            Rajasthan Tent House brings tradition, elegance and flawless execution to weddings and celebrations
            across Bhilwara and Rajasthan, since 1989.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 1.15 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <Link to="/contact" className="btn-gold !px-8 !py-4 text-base">
                Book your event <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Magnetic>
            <Link to="/gallery" className="btn-ghost !py-4">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-ivory text-emerald-900">
                <Play className="h-3 w-3 translate-x-px" fill="currentColor" />
              </span>
              View our work
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Slide indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-0 right-0"
      >
        <div className="container flex items-end justify-between gap-6">
          <div className="flex flex-1 gap-3 sm:max-w-xl">
            {slides.map((s, i) => (
              <button key={s.src} onClick={() => setCurrent(i)} className="group flex-1 text-left" aria-label={`Show ${s.label}`}>
                <span className="relative block h-[2px] overflow-hidden rounded-full bg-white/20">
                  {i === current && (
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: SLIDE_MS / 1000, ease: 'linear' }}
                      className="absolute inset-0 origin-left bg-gold-300"
                    />
                  )}
                  {i < current && <span className="absolute inset-0 bg-white/60" />}
                </span>
                <span className={`mt-2 hidden text-[11px] font-medium uppercase tracking-[0.18em] transition sm:block ${i === current ? 'text-ivory' : 'text-ivory/40 group-hover:text-ivory/70'}`}>
                  {s.label}
                </span>
              </button>
            ))}
          </div>

          <div className="hidden flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-ivory/60 md:flex">
            Scroll
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="grid h-10 w-6 place-items-start justify-center rounded-full border border-white/30 pt-1.5"
            >
              <ArrowDown className="h-3 w-3" />
            </motion.span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
