import React from 'react';
import { motion } from 'framer-motion';
import { EASE } from './Reveal';

// Reveals text word by word from behind a mask. `text` is a plain string; wrap words to
// highlight in *asterisks* to render them in the gold gradient.
export default function SplitText({
  text,
  as = 'h2',
  className,
  delay = 0,
  stagger = 0.06,
  animateOnMount = false,
  highlightClassName = 'text-gold-gradient italic',
}) {
  const Component = motion[as];
  // "*grand events*" marks a highlighted phrase that may span several words.
  let inHighlight = false;
  const words = text.split(' ').map((raw) => {
    const starts = raw.startsWith('*');
    const ends = raw.endsWith('*') && (raw.length > 1 || !starts);
    if (starts) inHighlight = true;
    const word = { text: raw.replace(/\*/g, ''), highlight: inHighlight };
    if (ends) inHighlight = false;
    return word;
  });
  const trigger = animateOnMount
    ? { initial: 'hidden', animate: 'show' }
    : { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.4 } };

  return (
    <Component
      className={className}
      aria-label={text.replace(/\*/g, '')}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...trigger}
    >
      {words.map((word, i) => (
        <React.Fragment key={i}>
        <span aria-hidden="true" className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className={`inline-block ${word.highlight ? highlightClassName : ''}`}
            variants={{
              hidden: { y: '110%', rotate: 4 },
              show: { y: '0%', rotate: 0, transition: { duration: 1, ease: EASE } },
            }}
          >
            {word.text}
          </motion.span>
        </span>
        {i < words.length - 1 && ' '}
        </React.Fragment>
      ))}
    </Component>
  );
}
