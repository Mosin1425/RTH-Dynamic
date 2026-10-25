import React from 'react';
import Marquee from '@/components/motion/Marquee';
import { showcaseImages } from '@/constants/data';

// Two tilted rows of event photos drifting in opposite directions.
export default function PhotoRibbon() {
  const half = Math.ceil(showcaseImages.length / 2);
  const rows = [showcaseImages.slice(0, half), showcaseImages.slice(half)];

  return (
    <section aria-label="Event photos" className="overflow-hidden py-10">
      <div className="-rotate-2 space-y-4">
        {rows.map((row, r) => (
          <Marquee key={r} duration={r ? 50 : 40} reverse={r === 1}>
            {[...row, ...row].map((src, i) => (
              <img
                key={i}
                src={src}
                alt={r === 0 && i < row.length ? `Rajasthan Tent House event setup ${i + 1}` : ''}
                loading="lazy"
                className="mx-2 h-44 w-44 shrink-0 rounded-2xl object-cover sm:h-60 sm:w-60"
              />
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}
