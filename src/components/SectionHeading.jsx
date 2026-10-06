import React from 'react';
import SplitText from '@/components/motion/SplitText';
import Reveal from '@/components/motion/Reveal';

// Eyebrow + animated serif title + optional intro paragraph.
export default function SectionHeading({ eyebrow, title, description, align = 'center', dark = false, className = '', as = 'h2' }) {
  const centered = align === 'center';
  return (
    <div className={`${centered ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && (
        <Reveal y={12}>
          <span className={`eyebrow ${centered ? 'justify-center' : ''} ${dark ? 'text-gold-300' : ''}`}>{eyebrow}</span>
        </Reveal>
      )}
      <SplitText
        as={as}
        text={title}
        highlightClassName={`italic ${dark ? 'text-gold-gradient' : 'text-gold-deep'}`}
        className={`mt-4 text-balance text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl ${dark ? 'text-ivory' : 'text-emerald-900'}`}
      />
      {description && (
        <Reveal delay={0.15}>
          <p className={`mt-5 text-base leading-relaxed sm:text-lg ${dark ? 'text-ivory/70' : 'text-ink-soft'} ${centered ? 'mx-auto max-w-2xl' : ''}`}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
