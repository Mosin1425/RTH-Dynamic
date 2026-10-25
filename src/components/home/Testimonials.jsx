import React from 'react';
import { Quote, Star } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import Marquee from '@/components/motion/Marquee';
import { testimonials } from '@/constants/data';

const Card = ({ t }) => (
  <figure className="mx-2.5 w-[320px] shrink-0 rounded-3xl border border-emerald-900/10 bg-white p-7 shadow-[0_20px_50px_-30px_rgba(12,31,26,0.35)] sm:w-[400px]">
    <div className="flex items-center justify-between">
      <span className="flex gap-0.5 text-gold-500">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className="h-4 w-4" fill="currentColor" strokeWidth={0} />
        ))}
      </span>
      <Quote className="h-8 w-8 text-gold-300" />
    </div>
    <blockquote className="mt-5 font-display text-xl leading-snug text-emerald-900 sm:text-2xl">“{t.text}”</blockquote>
    <figcaption className="mt-6 flex items-center gap-3">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald-900 font-semibold text-gold-300">{t.name[0]}</span>
      <span>
        <span className="block text-sm font-semibold text-ink">{t.name}</span>
        <span className="block text-xs text-ink-soft">{t.event}</span>
      </span>
    </figcaption>
  </figure>
);

export default function Testimonials() {
  const half = Math.ceil(testimonials.length / 2);
  return (
    <section className="overflow-hidden bg-ivory-100 py-24 sm:py-32">
      <div className="container">
        <SectionHeading eyebrow="Kind words" title="Loved by *families* across Rajasthan" />
      </div>
      <div className="mask-fade-x mt-14 space-y-5">
        <Marquee duration={55}>
          {testimonials.slice(0, half).concat(testimonials.slice(0, half)).map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </Marquee>
        <Marquee duration={60} reverse>
          {testimonials.slice(half).concat(testimonials.slice(half)).map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
