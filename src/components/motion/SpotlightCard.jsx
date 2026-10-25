import React, { useRef } from 'react';

// Card with a soft light that follows the cursor.
export default function SpotlightCard({ children, className = '', color = 'rgba(232,200,115,0.18)' }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div ref={ref} onPointerMove={onMove} className={`group relative overflow-hidden ${className}`}>
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(420px circle at var(--spot-x) var(--spot-y), ${color}, transparent 60%)` }}
      />
      {children}
    </div>
  );
}
