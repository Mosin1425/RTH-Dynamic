import React from 'react';

// Infinite horizontal scroller. Content is rendered twice so the loop is seamless.
export default function Marquee({ children, duration = 40, reverse = false, pauseOnHover = true, className = '' }) {
  return (
    <div className={`group flex overflow-hidden ${className}`}>
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1}
          className={`flex shrink-0 animate-marquee items-center ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''}`}
          style={{ '--marquee-duration': `${duration}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
