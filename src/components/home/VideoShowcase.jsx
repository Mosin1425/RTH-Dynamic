import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';

const VIDEO_ID = '-Q70hPY9rfY';

// The YouTube player only loads after a click, keeping the page fast.
export default function VideoShowcase() {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [64, 32]);

  return (
    <section className="py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Events in action"
          title="Watch a venue *come alive*"
          description="See how our team transforms ordinary spaces into extraordinary experiences."
        />

        <motion.div
          ref={ref}
          style={{ scale, borderRadius: radius }}
          className="relative mx-auto mt-14 aspect-video max-w-6xl overflow-hidden bg-emerald-950 shadow-[0_40px_100px_-40px_rgba(12,31,26,0.6)]"
        >
          {playing ? (
            <iframe
              className="h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
              title="Rajasthan Tent House event highlights"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button onClick={() => setPlaying(true)} className="group absolute inset-0" aria-label="Play event highlights video">
              <img src="/assets/006-vmake.jpg" alt="" className="h-full w-full object-cover transition-transform [transition-duration:1.4s] group-hover:scale-105" />
              <span className="absolute inset-0 bg-emerald-950/40 transition group-hover:bg-emerald-950/30" />
              <span className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold-400 text-emerald-950 shadow-2xl transition-transform duration-500 group-hover:scale-110 sm:h-28 sm:w-28">
                <span className="absolute inset-0 animate-ping rounded-full bg-gold-300/50 [animation-duration:2s]" />
                <Play className="relative h-8 w-8 translate-x-0.5 sm:h-10 sm:w-10" fill="currentColor" />
              </span>
              <span className="absolute bottom-5 left-5 rounded-full bg-black/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-ivory backdrop-blur-md sm:bottom-8 sm:left-8">
                Event highlights
              </span>
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
