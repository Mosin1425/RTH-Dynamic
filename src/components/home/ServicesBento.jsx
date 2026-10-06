import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { EASE } from '@/components/motion/Reveal';
import { servicesData } from '@/constants/data';

// Bento layout: the first service is the large feature tile.
const spans = [
  'sm:col-span-2 lg:col-span-2 lg:row-span-2',
  'lg:col-span-2',
  '',
  '',
  'lg:col-span-2',
  '',
  '',
];

export default function ServicesBento() {
  // Phones get a deck of full-height cards that stack as you scroll; larger screens get the bento grid.
  const [stacked, setStacked] = useState(() => window.matchMedia('(max-width: 639px)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const update = () => setStacked(mq.matches);
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <section className="bg-ivory-100 py-24 sm:py-32">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            align="left"
            eyebrow="What we create"
            title="Every celebration, *beautifully* handled"
            description="From intimate gatherings to grand weddings, our own crew and inventory deliver every detail."
          />
          <Link to="/contact" className="btn-dark shrink-0">
            Get a custom quote <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {stacked ? <StackedCards /> : (
        <div className="mt-14 grid auto-rows-[260px] grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[240px] lg:grid-cols-4">
          {servicesData.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: EASE, delay: (i % 4) * 0.08 }}
              className={spans[i]}
            >
              <Link
                to={`/services/${s.id}`}
                className="group relative flex h-full flex-col justify-end overflow-hidden rounded-3xl bg-emerald-900 p-6 text-ivory"
              >
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform [transition-duration:1.4s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-950/40 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

                <span className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/15 backdrop-blur-md transition-all duration-500 group-hover:rotate-45 group-hover:bg-gold-400 group-hover:text-emerald-950">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
                <span className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-black/25 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] backdrop-blur-md">
                  <s.icon className="h-3.5 w-3.5 text-gold-300" /> {s.shortTitle}
                </span>

                <div className="relative">
                  <h3 className={`font-semibold leading-tight ${i === 0 ? 'text-3xl sm:text-4xl lg:text-5xl' : 'text-2xl'}`}>{s.title}</h3>
                  <p
                    className={`mt-2 max-w-md text-sm leading-relaxed text-ivory/75 ${
                      i === 0 ? 'line-clamp-3 sm:line-clamp-none' : 'max-h-0 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100'
                    }`}
                  >
                    {s.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}

function StackedCards() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const n = servicesData.length;

  return (
    <div ref={ref} className="mt-10">
      {servicesData.map((s, i) => (
        <StackCard key={s.id} s={s} i={i} n={n} progress={scrollYProgress} />
      ))}
    </div>
  );
}

function StackCard({ s, i, n, progress }) {
  // Each card shrinks and dims slightly as the cards after it slide over it.
  const scale = useTransform(progress, [i / n, 1], [1, 1 - (n - i) * 0.035]);
  const dim = useTransform(progress, [i / n, Math.min(1, (i + 1) / n)], [0, i === n - 1 ? 0 : 0.35]);

  return (
    <div className="sticky top-0 flex h-[78svh] items-center">
      <motion.div style={{ scale, top: `${i * 14}px` }} className="relative w-full origin-top">
        <Link to={`/services/${s.id}`} className="relative block h-[62svh] overflow-hidden rounded-[2rem] bg-emerald-900 text-ivory shadow-[0_-20px_50px_-20px_rgba(12,31,26,0.6)]">
          <img src={s.image} alt={s.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent" />
          <motion.div className="absolute inset-0 bg-emerald-950" style={{ opacity: dim }} />

          <span className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-black/30 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] backdrop-blur-md">
            <s.icon className="h-3.5 w-3.5 text-gold-300" /> {s.shortTitle}
          </span>
          <span className="absolute right-5 top-5 font-display text-4xl font-semibold text-transparent [-webkit-text-stroke:1px_rgba(250,246,238,0.7)]">
            {String(i + 1).padStart(2, '0')}
          </span>

          <div className="absolute inset-x-0 bottom-0 p-6">
            <h3 className="text-3xl font-semibold leading-tight">{s.title}</h3>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ivory/75">{s.description}</p>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold-400 px-5 py-2.5 text-sm font-semibold text-emerald-950">
              Explore <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
