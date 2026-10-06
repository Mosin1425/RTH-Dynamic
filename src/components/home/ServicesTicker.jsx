import React from 'react';
import Marquee from '@/components/motion/Marquee';

const items = ['Royal Weddings', 'Haldi Ceremonies', 'Grand Entryways', 'Ring Ceremonies', 'Birthday Celebrations', 'Dining Setups', 'DJ Nights', 'Mandap Décor'];

export default function ServicesTicker() {
  return (
    <div className="relative z-10 -mt-px overflow-hidden bg-gold-400 py-4 text-emerald-950 sm:py-5">
      <Marquee duration={45} pauseOnHover={false}>
        {items.map((item) => (
          <span key={item} className="flex items-center gap-6 pr-6 font-display text-xl font-semibold italic sm:gap-10 sm:pr-10 sm:text-2xl">
            {item}
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-emerald-900" aria-hidden="true">
              <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
            </svg>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
