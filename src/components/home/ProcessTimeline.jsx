import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import SectionHeading from '@/components/SectionHeading';
import { EASE } from '@/components/motion/Reveal';
import { processSteps } from '@/constants/data';

// Steps alternate either side of a gold line that draws itself as you scroll.
export default function ProcessTimeline() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section className="py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="How we work"
          title="From first call to *final dance*"
          description="A calm, clear process so your family can enjoy the celebration while we take care of the rest."
        />

        <div ref={ref} className="relative mx-auto mt-20 max-w-5xl">
          <div className="absolute bottom-0 left-6 top-0 w-px bg-emerald-900/10 md:left-1/2" />
          <motion.div style={{ scaleY }} className="absolute bottom-0 left-6 top-0 w-px origin-top bg-gradient-to-b from-gold-300 via-gold-500 to-emerald-600 md:left-1/2" />

          <div className="space-y-16 md:space-y-24">
            {processSteps.map((step, i) => {
              const right = i % 2 === 1;
              return (
                <div key={step.title} className="relative grid items-center gap-6 pl-20 md:grid-cols-2 md:gap-24 md:pl-0">
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                    className="absolute left-6 top-0 z-10 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-full border-4 border-ivory bg-emerald-900 font-display text-lg font-semibold text-gold-300 shadow-lg md:left-1/2 md:top-1/2 md:-translate-y-1/2"
                  >
                    {i + 1}
                  </motion.span>

                  <motion.div
                    initial={{ opacity: 0, x: right ? 60 : -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.9, ease: EASE }}
                    className={right ? 'md:col-start-2' : 'md:text-right'}
                  >
                    <p className="font-display text-7xl font-semibold leading-none text-gold-400/30">{String(i + 1).padStart(2, '0')}</p>
                    <h3 className="-mt-6 text-3xl font-semibold text-emerald-900 sm:text-4xl">{step.title}</h3>
                    <p className={`mt-3 max-w-sm leading-relaxed text-ink-soft ${right ? '' : 'md:ml-auto'}`}>{step.description}</p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
