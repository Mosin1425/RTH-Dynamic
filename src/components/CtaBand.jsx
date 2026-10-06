import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import SplitText from '@/components/motion/SplitText';
import Reveal from '@/components/motion/Reveal';
import Magnetic from '@/components/motion/Magnetic';
import { whatsappLink } from '@/constants/data';

// Closing call-to-action used at the bottom of most pages.
export default function CtaBand({
  eyebrow = 'Let’s begin',
  title = 'Planning a wedding or event in *Rajasthan?*',
  text = 'Tell us your date and the feeling you want. We’ll handle décor, planning and flawless execution.',
  message = 'Hi, I want to plan an event with Rajasthan Tent House.',
}) {
  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="grain relative mx-auto max-w-6xl overflow-hidden rounded-4xl bg-emerald-900 px-6 py-16 text-center sm:px-12 sm:py-24">
        <div className="pattern-jaali absolute inset-0 opacity-60" />
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-gold-500/25 blur-3xl" />
        <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" />

        <div className="relative">
          <Reveal y={10}>
            <span className="eyebrow justify-center text-gold-300">{eyebrow}</span>
          </Reveal>
          <SplitText
            text={title}
            className="mx-auto mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] text-ivory sm:text-6xl"
          />
          <Reveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-xl text-ivory/70 sm:text-lg">{text}</p>
          </Reveal>
          <Reveal delay={0.25} className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className="btn-gold">
                <MessageCircle className="h-4 w-4" /> Get a quote on WhatsApp
              </a>
            </Magnetic>
            <Link to="/contact" className="btn-ghost">
              Plan with us <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
