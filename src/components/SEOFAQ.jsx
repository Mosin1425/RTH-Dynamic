import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { faqs } from '@/constants/data';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/motion/Reveal';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

// Visible FAQ accordion plus FAQPage JSON-LD for search engines.
const SEOFAQ = () => {
  const [open, setOpen] = useState(0);

  return (
    <section className="py-20 sm:py-28">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <div className="container grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <SectionHeading
          align="left"
          eyebrow="Good to know"
          title="Questions, *answered*"
          description="Everything families usually ask before booking. Can’t find yours? Message us on WhatsApp."
        />

        <div className="divide-y divide-emerald-900/10 border-y border-emerald-900/10">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.06}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <h3 className="font-display text-xl font-semibold text-emerald-900 sm:text-2xl">{f.q}</h3>
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                      isOpen ? 'rotate-45 border-gold-500 bg-gold-400 text-emerald-950' : 'border-emerald-900/20 text-emerald-900'
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 leading-relaxed text-ink-soft">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SEOFAQ;
