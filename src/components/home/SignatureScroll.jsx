import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionHeading from '@/components/SectionHeading';

const setups = [
  { src: '/assets/001.jpg', title: 'Palace-style stage', place: 'Wedding reception' },
  { src: '/assets/002-vmake.jpg', title: 'Ivory & gold throne', place: 'Ring ceremony' },
  { src: '/assets/AI_01.png', title: 'Garden mandap', place: 'Open-air wedding' },
  { src: '/assets/005-vmake.jpg', title: 'Rose canopy', place: 'Varmala stage' },
  { src: '/assets/006-vmake.jpg', title: 'Rani pink lounge', place: 'Sangeet night' },
  { src: '/assets/photos6.jpg', title: 'Chandelier hall', place: 'Reception dining' },
  { src: '/assets/007-vmake.jpg', title: 'Neon arch stage', place: 'DJ night' },
];

const Card = ({ s, i }) => (
  <figure className="group relative h-[60vh] max-h-[560px] min-h-[380px] w-[80vw] shrink-0 snap-center overflow-hidden rounded-[2rem] sm:w-[60vw] lg:w-[46vw]">
    <img src={s.src} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform [transition-duration:1.4s] group-hover:scale-105" />
    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-transparent to-transparent" />
    <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 sm:p-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">{s.place}</p>
        <p className="mt-2 font-display text-3xl font-semibold text-ivory sm:text-4xl">{s.title}</p>
      </div>
      <span className="font-display text-6xl font-semibold text-transparent [-webkit-text-stroke:1px_rgba(250,246,238,0.5)]">
        {String(i + 1).padStart(2, '0')}
      </span>
    </figcaption>
  </figure>
);

// Desktop: vertical scroll drives a horizontal filmstrip. Touch screens get a native swipe carousel.
export default function SignatureScroll() {
  const target = useRef(null);
  const track = useRef(null);
  const [distance, setDistance] = useState(0);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (pointer: fine)');
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // How far the filmstrip must travel and where the section starts; re-measured whenever the
  // layout switches or the page above it changes height. (useScroll's `target` can't be used here:
  // the ref is still empty on the first, mobile-layout render.)
  const sectionTop = useRef(0);
  useEffect(() => {
    if (!desktop) return;
    const measure = () => {
      if (!track.current || !target.current) return;
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
      sectionTop.current = target.current.getBoundingClientRect().top + window.scrollY;
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    return () => observer.disconnect();
  }, [desktop]);

  const { scrollY } = useScroll();
  const scrollYProgress = useTransform(scrollY, (y) =>
    distance ? Math.min(1, Math.max(0, (y - sectionTop.current) / distance)) : 0
  );
  const x = useTransform(scrollYProgress, (p) => -p * distance);
  const progress = useTransform(scrollYProgress, (p) => `${p * 100}%`);

  const heading = (
    <SectionHeading
      dark
      align="left"
      eyebrow="Signature setups"
      title="Spaces we’ve *transformed*"
      description="A glimpse of stages, mandaps and lounges designed and built by our team."
    />
  );

  if (!desktop) {
    return (
      <section className="grain relative bg-emerald-950 py-24">
        <div className="container">{heading}</div>
        <div ref={track} className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4">
          {setups.map((s, i) => (
            <Card key={s.src} s={s} i={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={target} className="grain relative bg-emerald-950" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="container mb-10 flex items-end justify-between gap-10">
          {heading}
          <div className="mb-3 h-px w-48 shrink-0 bg-white/15">
            <motion.div style={{ width: progress }} className="h-full bg-gold-300" />
          </div>
        </div>
        <motion.div ref={track} style={{ x }} className="flex gap-6 pl-[max(2rem,calc((100vw-1320px)/2+2rem))] pr-8">
          {setups.map((s, i) => (
            <Card key={s.src} s={s} i={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
