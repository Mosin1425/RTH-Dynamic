import React from 'react';
import { ArrowUpRight, Code2, Gauge, Smartphone, Sparkles } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import SpotlightCard from '@/components/motion/SpotlightCard';

const perks = [
  { icon: Sparkles, label: 'Cinematic motion' },
  { icon: Smartphone, label: 'Mobile-first' },
  { icon: Gauge, label: 'Fast & SEO-ready' },
];

// Lead-generation block for Mosin's web design work.
export default function BuiltByMosinSection() {
  return (
    <section className="px-4 pb-24">
      <Reveal>
        <SpotlightCard className="mx-auto max-w-6xl rounded-4xl border border-emerald-900/10 bg-white p-8 shadow-[0_30px_80px_-40px_rgba(12,31,26,0.4)] sm:p-12">
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                <Code2 className="h-3.5 w-3.5" /> Designed & developed by Mosin
              </span>
              <h2 className="mt-5 text-4xl font-semibold leading-tight text-emerald-900 sm:text-5xl">
                Want a website like this for <span className="text-gold-deep italic">your business?</span>
              </h2>
              <p className="mt-4 max-w-xl text-ink-soft">
                I design and build premium business websites like this one that turn visitors into customers.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {perks.map(({ icon: Icon, label }) => (
                  <span key={label} className="inline-flex items-center gap-2 rounded-full border border-emerald-900/10 px-3 py-1.5 text-xs font-medium text-ink">
                    <Icon className="h-3.5 w-3.5 text-gold-600" /> {label}
                  </span>
                ))}
              </div>
            </div>
            <div className="lg:text-right">
              <a
                href="https://wa.me/916350089531?text=I%20want%20a%20website%20like%20Rajasthan%20Tent%20House"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-dark !px-8 !py-4 text-base"
              >
                Chat with Mosin on WhatsApp <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </SpotlightCard>
      </Reveal>
    </section>
  );
}
