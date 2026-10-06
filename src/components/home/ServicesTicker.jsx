import React, { useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';

const items = ['Royal Weddings', 'Haldi Ceremonies', 'Grand Entryways', 'Ring Ceremonies', 'Birthday Celebrations', 'Dining Setups', 'DJ Nights', 'Mandap Décor'];

const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

const Star = ({ className }) => (
  <svg viewBox="0 0 24 24" className={`h-4 w-4 shrink-0 ${className}`} aria-hidden="true">
    <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" fill="currentColor" />
  </svg>
);

// A ribbon that drifts on its own and speeds up / skews with the speed of the user's scroll.
function VelocityRow({ baseVelocity, className, starClassName }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [0, 1000], [0, 4], { clamp: false });
  const skew = useTransform(velocity, [-2500, 2500], [-10, 10]);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    let move = direction.current * baseVelocity * (delta / 1000);
    if (factor.get() < 0) direction.current = -1;
    else if (factor.get() > 0) direction.current = 1;
    move += direction.current * move * factor.get();
    baseX.set(baseX.get() + move);
  });

  return (
    <div className={`flex overflow-hidden whitespace-nowrap py-3.5 sm:py-4 ${className}`}>
      <motion.div style={{ x, skewX: skew }} className="flex shrink-0">
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {items.map((item) => (
              <span key={item} className="flex items-center gap-6 pr-6 font-display text-xl font-semibold italic sm:gap-10 sm:pr-10 sm:text-3xl">
                {item}
                <Star className={starClassName} />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// Two crossing "festival tape" ribbons right after the hero.
export default function ServicesTicker() {
  return (
    <div className="relative z-10 overflow-hidden bg-ivory py-10 sm:py-14">
      <div className="-mx-[6%] rotate-[-4deg] shadow-[0_20px_40px_-20px_rgba(12,31,26,0.5)]">
        <VelocityRow baseVelocity={-2.5} className="bg-gold-400 text-emerald-950" starClassName="text-emerald-900" />
      </div>
      <div className="-mx-[6%] -mt-12 rotate-[3deg] sm:-mt-14">
        <VelocityRow baseVelocity={2} className="bg-emerald-900 text-ivory" starClassName="text-gold-300" />
      </div>
    </div>
  );
}
