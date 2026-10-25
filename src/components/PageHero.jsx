import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import SplitText from '@/components/motion/SplitText';
import { EASE } from '@/components/motion/Reveal';

// Inner-page hero: parallax photo, breadcrumb and an animated title.
export default function PageHero({ eyebrow, title, subtitle, image, crumbs = [], children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="grain relative isolate flex min-h-[72svh] items-end overflow-hidden bg-emerald-950 pb-16 pt-36 sm:pb-20">
      <motion.img
        src={image}
        alt=""
        aria-hidden="true"
        style={{ y, scale }}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-emerald-950 via-emerald-950/60 to-emerald-950/30" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(201,154,53,0.25),transparent_55%)]" />

      <motion.div style={{ opacity: fade }} className="container">
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-1.5 text-xs font-medium uppercase tracking-[0.2em] text-ivory/60"
        >
          <Link to="/" className="transition hover:text-gold-300">Home</Link>
          {crumbs.map((c) => (
            <React.Fragment key={c.label}>
              <ChevronRight className="h-3 w-3" />
              {c.to ? (
                <Link to={c.to} className="transition hover:text-gold-300">{c.label}</Link>
              ) : (
                <span className="text-gold-300">{c.label}</span>
              )}
            </React.Fragment>
          ))}
        </motion.nav>

        {eyebrow && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="eyebrow text-gold-300"
          >
            {eyebrow}
          </motion.span>
        )}

        <SplitText
          as="h1"
          text={title}
          animateOnMount
          delay={0.25}
          className="mt-4 max-w-4xl text-balance text-5xl font-semibold leading-[1.02] text-ivory sm:text-6xl lg:text-7xl"
        />

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-ivory/75 sm:text-lg"
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.85 }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
