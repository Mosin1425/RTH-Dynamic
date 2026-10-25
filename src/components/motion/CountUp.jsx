import React, { useEffect, useRef } from 'react';
import { animate, useInView } from 'framer-motion';

// Counts from 0 to `value` once the number scrolls into view.
export default function CountUp({ value, suffix = '', duration = 2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v).toLocaleString('en-IN') + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix, duration]);

  return <span ref={ref}>0{suffix}</span>;
}
