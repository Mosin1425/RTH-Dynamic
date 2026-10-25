import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import CountUp from '@/components/motion/CountUp';
import { ownerPhotos, stats } from '@/constants/data';

// Family photos in a parallax collage next to the brand story and headline numbers.
export default function LegacySection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const y3 = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  return (
    <section ref={ref} className="relative overflow-hidden py-24 sm:py-32">
      <div className="pattern-jaali absolute inset-y-0 right-0 w-1/2 opacity-50 [mask-image:linear-gradient(to_left,#000,transparent)]" />

      <div className="container relative grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <SectionHeading
            align="left"
            eyebrow="A legacy of excellence"
            title="A family legacy, *carried with pride*"
            description="For over three decades, families across Rajasthan have trusted us with their most precious celebrations. What began in 1989 as a modest tent rental service in Bhilwara is now a complete wedding and event house, built on trust and carried forward with pride."
          />
          <Reveal delay={0.2} className="mt-8">
            <Link to="/our-story" className="group inline-flex items-center gap-2 font-semibold text-emerald-800">
              <span className="border-b border-emerald-800/30 pb-0.5 transition group-hover:border-gold-500">Read our story</span>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-900 text-gold-300 transition group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-emerald-900/10 pt-10 sm:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <p className="font-display text-5xl font-semibold text-emerald-900">
                  <CountUp value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.15em] text-ink-soft">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="relative mx-auto h-[520px] w-full max-w-md sm:h-[600px]">
          <motion.div style={{ rotate }} className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-gold-400/50" />
          <motion.div style={{ y: y1 }} className="absolute left-0 top-6 w-[52%]">
            <img src={ownerPhotos[0]} alt="Founder of Rajasthan Tent House" className="aspect-[3/4] w-full rounded-[2rem] object-cover shadow-2xl" loading="lazy" />
          </motion.div>
          <motion.div style={{ y: y2 }} className="absolute right-0 top-0 w-[44%]">
            <img src={ownerPhotos[1]} alt="Rajasthan Tent House family member" className="aspect-[3/4] w-full rounded-[2rem] object-cover object-top shadow-2xl" loading="lazy" />
          </motion.div>
          <motion.div style={{ y: y3 }} className="absolute bottom-0 right-[12%] w-[46%]">
            <img src={ownerPhotos[2]} alt="Rajasthan Tent House family member" className="aspect-[3/4] w-full rounded-[2rem] border-4 border-ivory object-cover object-top shadow-2xl" loading="lazy" />
          </motion.div>
          <Reveal delay={0.3} className="absolute bottom-10 left-2 rounded-2xl bg-emerald-900 px-5 py-4 text-ivory shadow-2xl">
            <p className="font-display text-3xl font-semibold text-gold-300">Since 1989</p>
            <p className="text-xs uppercase tracking-[0.2em] text-ivory/70">Asind · Bhilwara</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
