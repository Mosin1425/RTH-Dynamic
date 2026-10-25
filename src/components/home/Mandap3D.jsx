import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import TiltPrompt from '@/components/motion/TiltPrompt';
import { whatsappLink } from '@/constants/data';

// Captions for each step of the build-up (ranges match the timeline in mandap/scene.js).
const steps = [
  { range: [0, 0.22], label: '01 · Structure', text: 'Hand-finished pillars rise on a marble platform.' },
  { range: [0.22, 0.45], label: '02 · Canopy', text: 'A royal velvet dome, crowned with a golden kalash.' },
  { range: [0.45, 0.68], label: '03 · Drapes & florals', text: 'Ivory drapes and marigold strings soften every line.' },
  { range: [0.68, 1.01], label: '04 · Lights', text: 'Diyas and warm light bring your mandap to life.' },
];

const hasWebGL = () => {
  try {
    const c = document.createElement('canvas');
    return Boolean(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
};

// Pinned section where a 3D mandap assembles itself as you scroll. three.js is only downloaded
// when the section gets close to the viewport.
export default function Mandap3D() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const [status, setStatus] = useState('idle'); // idle | loading | ready | fallback
  const [shouldLoad, setShouldLoad] = useState(false);
  const [mobile] = useState(() => window.matchMedia('(max-width: 639px)').matches);

  const { scrollYProgress: p } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  useMotionValueEvent(p, 'change', (v) => sceneRef.current?.setProgress(v));

  // Load the 3D code once the section is within ~1.5 screens.
  useEffect(() => {
    const section = sectionRef.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        if (!hasWebGL()) {
          setStatus('fallback');
          return;
        }
        setStatus('loading');
        setShouldLoad(true);
      },
      { rootMargin: '150% 0px' }
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return undefined;
    let cancelled = false;
    let ro;
    let io;
    import('./mandap/scene.js')
      .then(({ createMandapScene }) => {
        if (cancelled || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const scene = createMandapScene(canvas, { reducedMotion, mobile });
        sceneRef.current = scene;
        scene.setProgress(p.get());
        const size = () => scene.resize(canvas.clientWidth, canvas.clientHeight);
        size();
        ro = new ResizeObserver(size);
        ro.observe(canvas);
        // Only animate while the canvas is on screen.
        io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? scene.start() : scene.stop()));
        io.observe(canvas);
        setStatus('ready');
      })
      .catch((err) => {
        console.warn('3D mandap failed to load', err);
        if (!cancelled) setStatus('fallback');
      });
    return () => {
      cancelled = true;
      ro?.disconnect();
      io?.disconnect();
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
    // Built once per mount; progress and size are pushed in imperatively.
  }, [shouldLoad]); // eslint-disable-line react-hooks/exhaustive-deps

  const ctaOpacity = useTransform(p, [0.86, 0.95], [0, 1]);
  const ctaPointer = useTransform(p, (v) => (v > 0.86 ? 'auto' : 'none'));
  const hintOpacity = useTransform(p, [0, 0.08], [1, 0]);

  return (
    <section ref={sectionRef} className="relative bg-emerald-950" style={{ height: mobile ? '380svh' : '420vh' }} aria-label="3D mandap">
      <div className="grain sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(201,154,53,0.32),transparent_62%)]" />
        <div className="pattern-jaali absolute inset-0 opacity-25" />

        {status === 'fallback' ? (
          <img src="/assets/AI_01.png" alt="Mandap setup by Rajasthan Tent House" className="absolute inset-0 h-full w-full object-cover opacity-60" />
        ) : (
          <canvas ref={canvasRef} className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${status === 'ready' ? 'opacity-100' : 'opacity-0'}`} />
        )}
        {status !== 'ready' && status !== 'fallback' && (
          <div className="absolute inset-0 grid place-items-center">
            <div className="flex flex-col items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-ivory/50">
              <span className="h-10 w-10 animate-spin rounded-full border-2 border-gold-400/30 border-t-gold-300" />
              Building your mandap
            </div>
          </div>
        )}

        {/* Heading */}
        <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-emerald-950 via-emerald-950/70 to-transparent px-5 pb-16 pt-24 text-center sm:pt-28">
          <span className="eyebrow justify-center text-gold-300">Designed in 3D</span>
          <h2 className="mx-auto mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight text-ivory sm:text-6xl">
            Watch a mandap <span className="text-gold-gradient italic">come together</span>
          </h2>
        </div>

        {/* Step captions */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-emerald-950 via-emerald-950/80 to-transparent px-5 pb-8 pt-24">
          <div className="relative mx-auto h-20 max-w-xl text-center">
            {steps.map((s) => (
              <StepCaption key={s.label} step={s} p={p} />
            ))}
          </div>
          <div className="mx-auto mt-2 flex max-w-xs gap-2">
            {steps.map((s) => (
              <StepBar key={s.label} step={s} p={p} />
            ))}
          </div>
        </div>

        <motion.div style={{ opacity: hintOpacity }} className="absolute inset-x-0 bottom-40 flex justify-center px-5 sm:bottom-44">
          <TiltPrompt />
        </motion.div>

        {/* Final CTA */}
        <motion.div style={{ opacity: ctaOpacity, pointerEvents: ctaPointer }} className="absolute inset-x-0 bottom-[10.5rem] flex flex-wrap justify-center gap-3 px-5 sm:bottom-44">
          <a href={whatsappLink('Hi, I want to design a mandap for my wedding with Rajasthan Tent House.')} target="_blank" rel="noopener noreferrer" className="btn-gold">
            <MessageCircle className="h-4 w-4" /> Design my mandap
          </a>
          <Link to="/services/wedding-events" className="btn-ghost">
            See real weddings <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function StepCaption({ step, p }) {
  const [a, b] = step.range;
  const opacity = useTransform(p, [a, a + 0.04, b - 0.04, b], [0, 1, 1, a === 0.68 ? 1 : 0]);
  const y = useTransform(p, [a, a + 0.04, b - 0.04, b], [24, 0, 0, a === 0.68 ? 0 : -24]);
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0">
      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-300">{step.label}</p>
      <p className="mt-2 font-display text-xl font-medium leading-snug text-ivory sm:text-3xl">{step.text}</p>
    </motion.div>
  );
}

function StepBar({ step, p }) {
  const width = useTransform(p, step.range, ['0%', '100%']);
  return (
    <span className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/15">
      <motion.span style={{ width }} className="block h-full bg-gold-300" />
    </span>
  );
}
