import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PageHero from '@/components/PageHero';
import SEO from '@/components/SEO';
import CtaBand from '@/components/CtaBand';
import Reveal from '@/components/motion/Reveal';
import { SITE_URL } from '@/constants/data';

const chapters = [
  {
    year: '1989',
    title: 'Humble beginnings',
    text: 'Rajasthan Tent House began with a simple yet ambitious vision: to redefine event management in Bhilwara. What started as a modest tent rental service evolved into one of Rajasthan’s most trusted wedding and event management companies.',
    image: '/assets/photos10.jpg',
  },
  {
    year: 'Growth',
    title: 'More than chairs and tents',
    text: 'Our founder understood that clients wanted more than chairs and tents. They wanted atmosphere, elegance, and emotion. That belief led us to specialize in wedding decoration, stage décor, lighting, and complete event planning across Rajasthan.',
    image: '/assets/photos8.jpg',
  },
  {
    year: 'Decades',
    title: 'Thousands of celebrations',
    text: 'Over the decades we have executed thousands of weddings, haldi ceremonies, ring ceremonies, birthdays, and corporate events. Each one sharpened our ability to deliver flawless setups under every condition.',
    image: '/assets/photos6.jpg',
  },
  {
    year: 'Today',
    title: 'Tradition meets modern design',
    text: 'Today Rajasthan Tent House is known across Bhilwara and Rajasthan for premium wedding decoration, royal mandap setups, DJ nights, and complete event management. We keep blending modern trends with Rajasthan’s timeless hospitality.',
    image: '/assets/AI_01.png',
  },
];

function Chapter({ chapter, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  const flip = index % 2 === 1;

  return (
    <div ref={ref} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
      <div className={`overflow-hidden rounded-4xl ${flip ? 'lg:order-2' : ''}`}>
        <motion.img style={{ y, scale: 1.25 }} src={chapter.image} alt={chapter.title} loading="lazy" className="aspect-[4/3] w-full object-cover" />
      </div>
      <Reveal>
        <p className="font-display text-7xl font-semibold leading-none text-gold-400/40 sm:text-8xl">{chapter.year}</p>
        <h2 className="mt-2 text-4xl font-semibold text-emerald-900 sm:text-5xl">{chapter.title}</h2>
        <p className="mt-5 text-lg leading-relaxed text-ink-soft">{chapter.text}</p>
      </Reveal>
    </div>
  );
}

const OurStoryPage = () => {
  return (
    <div className="overflow-x-clip">
      <SEO
        title="Our Story – Event Management in Bhilwara Since 1989"
        description="Discover the journey of Rajasthan Tent House, a trusted tent house and event management company in Bhilwara since 1989, crafting royal weddings and grand celebrations across Rajasthan."
        url={`${SITE_URL}/our-story`}
      />

      <PageHero
        eyebrow="Our story"
        title="From humble beginnings to *royal celebrations*"
        subtitle="A trusted event management company in Bhilwara since 1989."
        image="/assets/007-vmake.jpg"
        crumbs={[{ label: 'Our Story' }]}
      />

      <section className="py-24 sm:py-32">
        <div className="container space-y-24 sm:space-y-32">
          {chapters.map((c, i) => (
            <Chapter key={c.title} chapter={c} index={i} />
          ))}
        </div>
      </section>

      <section className="grain relative overflow-hidden bg-emerald-950 py-24 sm:py-32">
        <div className="pattern-jaali absolute inset-0 opacity-40" />
        <Reveal className="container relative max-w-4xl text-center">
          <span className="font-display text-8xl leading-none text-gold-400">“</span>
          <blockquote className="-mt-6 font-display text-3xl font-medium italic leading-snug text-ivory sm:text-5xl">
            We don’t just plan events. We craft experiences that become lifelong memories. Every smile is our reward.
          </blockquote>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-gold-300">The Rajasthan Tent House family</p>
        </Reveal>
      </section>

      <CtaBand />
    </div>
  );
};

export default OurStoryPage;
