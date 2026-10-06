import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ChevronsDown, MessageCircle } from 'lucide-react';
import Petals from '@/components/motion/Petals';
import Magnetic from '@/components/motion/Magnetic';
import { EASE } from '@/components/motion/Reveal';
import { whatsappLink } from '@/constants/data';

/*
  Scroll-driven "palace door" hero. The section is several screens tall and its content is pinned,
  so scroll progress (p, 0 → 1) scrubs a timeline that works the same with a mouse wheel or a thumb:

    0.00–0.30  the jharokha arch window grows until its photo fills the screen; title letters fly apart
    0.32–0.74  full-screen photos change with giant words (Weddings, Haldi, Sangeet, Receptions)
    0.76–1.00  the screen darkens, the headline builds word by word, and the CTAs appear
*/

const ARCH_RATIO = 1.4; // height / width of the arch shape below
const ARCH_PATH = 'M0 140V62C0 38 18 22 34 15C42 11 47 6 50 0C53 6 58 11 66 15C82 22 100 38 100 62V140Z';
const ARCH_MASK = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 140' preserveAspectRatio='none'><path d='${ARCH_PATH}'/></svg>`
)}")`;
// The arch grows around this point (in its own box); it is pinned at FOCUS_Y of the screen height.
const ORIGIN_Y = 0.71;
const FOCUS_Y = 0.52;

const opening = { src: '/assets/AI_01.png' };
const chapters = [
  { src: '/assets/003-vmake.jpg', word: 'Weddings', caption: 'Royal stages & mandaps' },
  { src: '/assets/photos4.jpg', word: 'Haldi', caption: 'Marigold-bright mornings' },
  { src: '/assets/006-vmake.jpg', word: 'Sangeet', caption: 'Lights, music & colour' },
  { src: '/assets/005-vmake.jpg', word: 'Receptions', caption: 'Evenings to remember' },
];
const STAGE2 = [0.32, 0.74];
const chapterRange = (i) => {
  const len = (STAGE2[1] - STAGE2[0]) / chapters.length;
  return [STAGE2[0] + i * len, STAGE2[0] + (i + 1) * len];
};

const TITLE = 'RAJASTHAN';
const HEADLINE = 'Crafting grand celebrations & timeless memories'.split(' ');

const floaters = [
  { src: '/assets/photos5.jpg', className: 'left-[-6%] top-[18%] w-24 sm:left-[4%] sm:top-[20%] sm:w-40 lg:w-48', dir: [-1, -0.4], rotate: -8, mobile: true },
  { src: '/assets/photos9.jpg', className: 'right-[-5%] top-[46%] w-24 sm:right-[5%] sm:top-[16%] sm:w-36 lg:w-44', dir: [1, -0.3], rotate: 7, mobile: true },
  { src: '/assets/photos3.jpg', className: 'hidden sm:block left-[10%] bottom-[14%] w-32 lg:w-40', dir: [-1, 0.5], rotate: 5 },
  { src: '/assets/photos10.jpg', className: 'hidden sm:block right-[9%] bottom-[18%] w-32 lg:w-40', dir: [1, 0.5], rotate: -6 },
];

function useViewport() {
  const [vp, setVp] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }));
  useEffect(() => {
    // Mobile browsers resize the viewport as the URL bar shows/hides; only react to width changes
    // or big height changes so the pinned scene doesn't jitter mid-scroll.
    const onResize = () =>
      setVp((prev) =>
        prev.w !== window.innerWidth || Math.abs(prev.h - window.innerHeight) > 120
          ? { w: window.innerWidth, h: window.innerHeight }
          : prev
      );
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return vp;
}

export default function CinematicHero() {
  const ref = useRef(null);
  const { w, h } = useViewport();
  const mobile = w < 640;
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  // Arch box, sized to the screen, and the scale at which it covers the whole screen.
  const archH = Math.min(h * (mobile ? 0.54 : 0.58), w * 0.8 * ARCH_RATIO);
  const archW = archH / ARCH_RATIO;
  const archLeft = (w - archW) / 2;
  const archTop = h * FOCUS_Y - archH * ORIGIN_Y;
  const rectHalf = archH * (ORIGIN_Y - 62 / 140); // straight-sided part of the arch above the origin
  const coverScale = Math.max(w / archW, (h * FOCUS_Y) / rectHalf, (h * (1 - FOCUS_Y)) / (archH * (1 - ORIGIN_Y))) * 1.08;

  const scale = useTransform(p, [0, 0.3], [1, coverScale]);
  const maskSize = useTransform(scale, (s) => `${archW * s}px ${archH * s}px`);
  const maskPosition = useTransform(scale, (s) => `${w / 2 - (archW * s) / 2}px ${h * FOCUS_Y - archH * ORIGIN_Y * s}px`);
  const openingZoom = useTransform(p, [0, 0.3], [1.15, 1]);
  const outline = useTransform(p, [0, 0.12, 0.22], [1, 0.6, 0]);
  const introOut = useTransform(p, [0, 0.07], [1, 0]);
  const introY = useTransform(p, [0, 0.07], [0, -30]);
  const titleOpacity = useTransform(p, [0.04, 0.2], [1, 0]);
  const spread = useTransform(p, [0, 0.22], [0, w * (mobile ? 0.14 : 0.08)]);
  const floatOut = useTransform(p, [0, 0.25], [0, 1]);
  const darken = useTransform(p, [0.74, 0.84], [0, 0.62]);
  const chapterTint = useTransform(p, [0.28, 0.34, 0.72, 0.76], [0, 0.35, 0.35, 0]);
  const progressBar = useTransform(p, [STAGE2[0], STAGE2[1]], ['0%', '100%']);
  const counterOpacity = useTransform(p, [0.3, 0.34, 0.72, 0.75], [0, 1, 1, 0]);
  const ctaOpacity = useTransform(p, [0.88, 0.95], [0, 1]);
  const ctaY = useTransform(p, [0.88, 0.95], [30, 0]);
  // Invisible buttons must not catch taps.
  const introPointer = useTransform(p, (v) => (v < 0.05 ? 'auto' : 'none'));
  const ctaPointer = useTransform(p, (v) => (v > 0.88 ? 'auto' : 'none'));

  return (
    <section ref={ref} className="relative bg-emerald-950" style={{ height: mobile ? '420svh' : '460vh' }} aria-label="Rajasthan Tent House">
      <div className="grain sticky top-0 h-[100svh] overflow-hidden">
        {/* Ambient glow behind the arch */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(201,154,53,0.28),transparent_60%)]" />
        <div className="pattern-jaali absolute inset-0 opacity-30" />

        {/* Floating photos around the arch */}
        {floaters.map((f, i) => (
          <Floater key={f.src} f={f} i={i} out={floatOut} w={w} h={h} />
        ))}

        {/* The arch window: a full-screen photo layer revealed through a growing arch-shaped mask.
            Only the mask grows, so the photos are never upscaled and stay sharp. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
          className="absolute inset-0"
          style={{
            WebkitMaskImage: ARCH_MASK,
            maskImage: ARCH_MASK,
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskSize: maskSize,
            maskSize,
            WebkitMaskPosition: maskPosition,
            maskPosition,
          }}
        >
          <motion.img src={opening.src} alt="" style={{ scale: openingZoom }} className="absolute inset-0 h-full w-full object-cover" />
          {chapters.map((c, i) => (
            <ChapterImage key={c.src} src={c.src} p={p} range={chapterRange(i)} first={i === 0} />
          ))}
          {/* Darkens the foot of the arch so the title reads, gone once the arch opens */}
          <motion.div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/10 via-40% to-transparent" style={{ opacity: introOut }} />
          <motion.div className="absolute inset-0 bg-emerald-950" style={{ opacity: chapterTint }} />
          <motion.div className="absolute inset-0 bg-emerald-950" style={{ opacity: darken }} />
        </motion.div>

        {/* Gold outline that draws itself on load, then grows with the arch and fades */}
        <motion.svg
          viewBox="0 0 100 140"
          preserveAspectRatio="none"
          className="pointer-events-none absolute overflow-visible"
          style={{ left: archLeft, top: archTop, width: archW, height: archH, scale, opacity: outline, transformOrigin: `50% ${ORIGIN_Y * 100}%` }}
        >
          <motion.path
            d={ARCH_PATH}
            fill="none"
            stroke="#e8c873"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, ease: EASE }}
          />
          <motion.path
            d={ARCH_PATH}
            fill="none"
            stroke="#e8c873"
            strokeOpacity="0.35"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            transform="translate(50 70) scale(1.06) translate(-50 -70)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.6, ease: EASE, delay: 0.3 }}
          />
        </motion.svg>

        <Petals count={mobile ? 12 : 22} />

        {/* Giant title, letters fly apart on scroll */}
        <motion.h1
          aria-label="Rajasthan Tent House"
          style={{ opacity: titleOpacity, top: archTop + archH * (mobile ? 1.03 : 0.9) }}
          className="pointer-events-none absolute inset-x-0 flex -translate-y-1/2 justify-center font-display font-semibold leading-none"
        >
          {TITLE.split('').map((ch, i) => (
            <Letter key={i} ch={ch} i={i} spread={spread} center={(TITLE.length - 1) / 2} mobile={mobile} />
          ))}
        </motion.h1>

        {/* Intro copy and CTA (fades as soon as scrolling starts) */}
        <motion.div style={{ opacity: introOut, y: introY, pointerEvents: introPointer }} className="absolute inset-x-0 bottom-0 flex flex-col items-center px-5 pb-7 text-center sm:pb-9">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.3 }}
            className="text-[11px] font-semibold uppercase tracking-[0.35em] text-ivory/80 sm:text-xs"
          >
            Tent House · Weddings & Events · Since 1989
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.5 }}
            className="mt-5 flex items-center gap-3"
          >
            <Link to="/contact" className="btn-gold !px-6 !py-3">
              Book your event <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-5 flex flex-col items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-ivory/50"
          >
            Scroll to enter
            <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
              <ChevronsDown className="h-4 w-4 text-gold-300" />
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Stage 2: chapter words */}
        {chapters.map((c, i) => (
          <ChapterWord key={c.word} c={c} p={p} range={chapterRange(i)} />
        ))}
        <motion.div style={{ opacity: counterOpacity }} className="absolute inset-x-0 bottom-8 flex justify-center px-5">
          <div className="w-full max-w-xs">
            <div className="h-[2px] overflow-hidden rounded-full bg-white/20">
              <motion.div style={{ width: progressBar }} className="h-full bg-gold-300" />
            </div>
            <p className="mt-3 text-center text-[10px] font-semibold uppercase tracking-[0.35em] text-ivory/60">What we celebrate</p>
          </div>
        </motion.div>

        {/* Stage 3: headline + CTAs */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
          <h2 className="max-w-4xl text-balance font-display text-[clamp(2.6rem,10vw,6rem)] font-semibold leading-[1.02] text-ivory">
            {HEADLINE.map((word, i) => (
              <HeadlineWord key={i} word={word} i={i} p={p} highlight={i === 1 || i === 2} />
            ))}
          </h2>
          <motion.div style={{ opacity: ctaOpacity, y: ctaY, pointerEvents: ctaPointer }} className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <Magnetic>
              <Link to="/contact" className="btn-gold !px-8 !py-4 text-base">
                Book your event <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Magnetic>
            <a href={whatsappLink('Hi, I want to plan an event with Rajasthan Tent House.')} target="_blank" rel="noopener noreferrer" className="btn-ghost !py-4">
              <MessageCircle className="h-4 w-4" /> Instant quote on WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Letter({ ch, i, spread, center, mobile }) {
  const offset = i - center;
  const x = useTransform(spread, (s) => offset * s);
  const y = useTransform(spread, (s) => Math.abs(offset) * s * -0.15);
  const rotate = useTransform(spread, (s) => offset * s * 0.06);
  return (
    <motion.span style={{ x, y, rotate }} className="inline-block overflow-hidden px-[0.01em]">
      <motion.span
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.5 + i * 0.06 }}
        className={`text-gold-gradient inline-block drop-shadow-[0_8px_30px_rgba(0,0,0,0.45)] ${mobile ? 'text-[15vw]' : 'text-[clamp(5rem,13vw,12rem)]'}`}
      >
        {ch}
      </motion.span>
    </motion.span>
  );
}

function Floater({ f, i, out, w, h }) {
  const x = useTransform(out, (v) => v * f.dir[0] * w * 0.6);
  const y = useTransform(out, (v) => v * f.dir[1] * h * 0.6);
  const rotate = useTransform(out, (v) => f.rotate + v * f.rotate * 3);
  const opacity = useTransform(out, [0, 0.8], [1, 0]);
  return (
    <motion.div style={{ x, y, rotate, opacity }} className={`absolute ${f.className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.6, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.9 + i * 0.12 }}
      >
        <div className="animate-bob rounded-2xl bg-ivory p-1.5 pb-5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)]" style={{ animationDelay: `${i * -1.5}s` }}>
          <img src={f.src} alt="" className="aspect-square w-full rounded-xl object-cover" />
        </div>
      </motion.div>
    </motion.div>
  );
}

function ChapterImage({ src, p, range, first }) {
  const [start] = range;
  // The first chapter fades in over the opening photo; the rest wipe up from below.
  const opacity = useTransform(p, [start - 0.025, start + 0.02], [0, 1]);
  const clip = useTransform(p, [start - 0.03, start + 0.03], ['inset(100% 0 0 0)', 'inset(0% 0 0 0)']);
  const scale = useTransform(p, [start - 0.03, range[1] + 0.05], [1.18, 1]);
  return (
    <motion.img
      src={src}
      alt=""
      loading="lazy"
      style={first ? { opacity, scale } : { clipPath: clip, scale }}
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}

function ChapterWord({ c, p, range }) {
  const [start, end] = range;
  const opacity = useTransform(p, [start - 0.01, start + 0.03, end - 0.03, end + 0.005], [0, 1, 1, 0]);
  const y = useTransform(p, [start - 0.01, start + 0.03, end - 0.03, end + 0.005], [80, 0, 0, -80]);
  const letterSpacing = useTransform(p, [start, end], ['0em', '0.04em']);
  return (
    <motion.div style={{ opacity }} className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
      <motion.p style={{ y }} className="text-[11px] font-semibold uppercase tracking-[0.4em] text-gold-300">
        {c.caption}
      </motion.p>
      <motion.p style={{ y, letterSpacing }} className="mt-3 font-display text-[clamp(3.5rem,19vw,13rem)] font-semibold italic leading-none text-ivory drop-shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        {c.word}
      </motion.p>
    </motion.div>
  );
}

function HeadlineWord({ word, i, p, highlight }) {
  const start = 0.78 + i * 0.016;
  const opacity = useTransform(p, [start, start + 0.03], [0, 1]);
  const y = useTransform(p, [start, start + 0.03], ['0.6em', '0em']);
  const blur = useTransform(p, [start, start + 0.03], ['blur(12px)', 'blur(0px)']);
  return (
    <>
      <motion.span style={{ opacity, y, filter: blur }} className={`inline-block ${highlight ? 'text-gold-gradient italic' : ''}`}>
        {word}
      </motion.span>{' '}
    </>
  );
}
