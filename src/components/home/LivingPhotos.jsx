import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import Reveal, { EASE } from '@/components/motion/Reveal';
import DepthPhoto from '@/components/motion/DepthPhoto';
import TiltPrompt from '@/components/motion/TiltPrompt';
import { whatsappLink } from '@/constants/data';

// Real event photos turned into 3D scenes with pre-computed depth maps (public/assets/depth).
const scenes = [
  { src: '/assets/AI_01.png', depth: '/assets/depth/AI_01.jpg', title: 'Garden mandap', note: 'Open-air wedding' },
  { src: '/assets/003-vmake.jpg', depth: '/assets/depth/003-vmake.jpg', title: 'Royal stage', note: 'Wedding reception' },
  { src: '/assets/002-vmake.jpg', depth: '/assets/depth/002-vmake.jpg', title: 'Ivory throne', note: 'Ring ceremony' },
  { src: '/assets/006-vmake.jpg', depth: '/assets/depth/006-vmake.jpg', title: 'Rani pink lounge', note: 'Sangeet night' },
  { src: '/assets/005-vmake.jpg', depth: '/assets/depth/005-vmake.jpg', title: 'Rose canopy', note: 'Varmala stage' },
];

export default function LivingPhotos() {
  const [index, setIndex] = useState(0);
  const touchX = useRef(null);
  const scene = scenes[index];
  const go = (d) => setIndex((i) => (i + d + scenes.length) % scenes.length);

  return (
    <section className="grain relative overflow-hidden bg-emerald-950 py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(201,154,53,0.22),transparent_60%)]" />

      <div className="container relative">
        <SectionHeading
          dark
          eyebrow="Step inside"
          title="Our setups, now in *3D*"
          description="Real stages we’ve built, turned into living scenes. Tilt your phone or move your mouse and look around."
        />

        <Reveal delay={0.1} className="mx-auto mt-12 max-w-5xl">
          <div
            className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)] ring-1 ring-gold-400/30 sm:aspect-[16/10]"
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current == null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
            style={{ touchAction: 'pan-y' }}
          >
            <DepthPhoto src={scene.src} depth={scene.depth} alt={scene.title} strength={0.042} className="absolute inset-0" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-emerald-950/85 via-transparent to-emerald-950/30" />

            <div className="absolute inset-x-0 top-0 flex justify-center p-4 sm:justify-start sm:p-6">
              <TiltPrompt />
            </div>

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={scene.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-300">{scene.note}</p>
                  <p className="mt-1 font-display text-3xl font-semibold text-ivory sm:text-5xl">{scene.title}</p>
                </motion.div>
              </AnimatePresence>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => go(-1)} aria-label="Previous scene" className="grid h-11 w-11 place-items-center rounded-full bg-white/15 text-ivory backdrop-blur-md transition hover:bg-white/25">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button onClick={() => go(1)} aria-label="Next scene" className="grid h-11 w-11 place-items-center rounded-full bg-gold-400 text-emerald-950 transition hover:bg-gold-300">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Scene picker */}
          <div className="no-scrollbar mt-5 flex gap-3 overflow-x-auto pb-2 sm:justify-center">
            {scenes.map((s, i) => (
              <button
                key={s.src}
                onClick={() => setIndex(i)}
                aria-label={`Show ${s.title}`}
                className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl transition sm:h-20 sm:w-32 ${
                  i === index ? 'ring-2 ring-gold-400 ring-offset-2 ring-offset-emerald-950' : 'opacity-50 hover:opacity-90'
                }`}
              >
                <img src={s.src} alt="" loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <a href={whatsappLink(`Hi, I loved the "${scene.title}" setup on your website. Can you share a quote?`)} target="_blank" rel="noopener noreferrer" className="btn-gold">
              <MessageCircle className="h-4 w-4" /> I want this setup
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
