import React from 'react';
import { motion } from 'framer-motion';

export const EASE = [0.22, 1, 0.36, 1];

// Fades and lifts its children into place the first time they scroll into view.
export default function Reveal({ as = 'div', children, delay = 0, y = 32, x = 0, className, amount = 0.2, ...rest }) {
  const Component = motion[as];
  return (
    <Component
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
}

// Parent/child variants for staggered lists.
export const staggerParent = (stagger = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

export const fadeUpChild = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};
