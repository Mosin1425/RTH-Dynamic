import React, { useMemo } from 'react';

const COLORS = ['#f59e0b', '#fb923c', '#facc15', '#e8c873', '#f472b6'];

// Falling marigold/rose petals, pure CSS animation. Deterministic layout so it doesn't jump on re-render.
export default function Petals({ count = 16, className = '' }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const r = (n) => ((Math.sin(i * 999 + n * 37) + 1) / 2); // stable pseudo-random 0..1
        return {
          left: `${r(1) * 100}%`,
          size: 8 + r(2) * 12,
          duration: 9 + r(3) * 10,
          delay: -r(4) * 18,
          sway: (r(5) - 0.5) * 140,
          color: COLORS[i % COLORS.length],
          blur: r(6) > 0.75 ? 1.5 : 0,
        };
      }),
    [count]
  );

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {petals.map((p, i) => (
        <span
          key={i}
          className="absolute -top-8 animate-petal-fall"
          style={{
            left: p.left,
            '--petal-duration': `${p.duration}s`,
            '--petal-sway': `${p.sway}px`,
            animationDelay: `${p.delay}s`,
            filter: p.blur ? `blur(${p.blur}px)` : undefined,
          }}
        >
          <svg width={p.size} height={p.size * 1.4} viewBox="0 0 10 14">
            <path d="M5 0C8 3 10 7 5 14C0 7 2 3 5 0Z" fill={p.color} opacity="0.85" />
          </svg>
        </span>
      ))}
    </div>
  );
}
