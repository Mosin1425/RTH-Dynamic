import React, { useEffect, useState } from 'react';
import { Smartphone } from 'lucide-react';
import { isGyroActive, needsGyroPermission, onGyroChange, requestGyro } from '@/lib/tilt';

// Small pill explaining the 3D effect. On iPhones it doubles as the button that asks for motion access.
export default function TiltPrompt({ className = '' }) {
  const [needsTap, setNeedsTap] = useState(() => needsGyroPermission());
  const [active, setActive] = useState(() => isGyroActive());
  const [touch] = useState(() => window.matchMedia('(pointer: coarse)').matches);

  useEffect(() => onGyroChange(() => {
    setActive(true);
    setNeedsTap(false);
  }), []);

  const label = active ? 'Tilt your phone to look around' : needsTap ? 'Tap to enable 3D tilt' : touch ? 'Tilt your phone to look around' : 'Move your mouse to look around';

  const content = (
    <>
      <span className="relative grid h-7 w-7 place-items-center rounded-full bg-gold-400 text-emerald-950">
        <Smartphone className="h-3.5 w-3.5 origin-bottom animate-[tilt-rock_2.4s_ease-in-out_infinite]" />
      </span>
      {label}
    </>
  );

  const classes = `inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-black/35 py-1.5 pl-1.5 pr-4 text-xs font-semibold text-ivory backdrop-blur-md ${className}`;

  if (needsTap) {
    return (
      <button
        type="button"
        onClick={async () => {
          if (await requestGyro()) setNeedsTap(false);
        }}
        className={`${classes} transition hover:bg-black/50`}
      >
        {content}
      </button>
    );
  }
  return <span className={classes}>{content}</span>;
}
