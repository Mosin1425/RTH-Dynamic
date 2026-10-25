import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Expand, MessageCircle, Plus, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLenis } from '@/components/motion/SmoothScroll';
import { EASE } from '@/components/motion/Reveal';
import { whatsappLink } from '@/constants/data';

const absoluteUrl = (url) => new URL(url, window.location.origin).href;

const Loader = ({ label }) => (
  <div className="columns-1 gap-4 sm:columns-2 lg:columns-3" aria-label={label}>
    {[260, 340, 220, 300, 260, 340].map((h, i) => (
      <div
        key={i}
        style={{ height: h }}
        className="mb-4 break-inside-avoid animate-pulse rounded-2xl bg-gradient-to-br from-ivory-200 to-ivory-100"
      />
    ))}
  </div>
);

// Masonry photo grid with a full-screen lightbox. Admins also get Add/Delete controls.
// `images` come from useImages(); `requestLabel` is used in the WhatsApp message.
export default function PhotoGallery({
  images,
  loading,
  uploading,
  isAdmin,
  onUpload,
  onRemove,
  onLogout,
  altPrefix,
  requestLabel = 'this setup from your gallery',
  inputId = 'photo-upload',
  fallback = [],
}) {
  const [index, setIndex] = useState(null);

  // Visitors never see an empty page: if the backend has no photos (or is paused), show the
  // bundled ones. Admins always see the real state so they know what's uploaded.
  const usingFallback = !isAdmin && !loading && images.length === 0 && fallback.length > 0;
  const shown = usingFallback ? fallback.map((url) => ({ id: url, url })) : images;

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    e.target.value = '';
    if (files.length) onUpload(files);
  };

  const handleDelete = (img, e) => {
    e.stopPropagation();
    if (window.confirm('Delete this photo? This cannot be undone.')) onRemove(img);
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <p className="text-sm text-ink-soft">
          {loading ? 'Loading photos…' : shown.length > 0 && `${shown.length} ${shown.length === 1 ? 'photo' : 'photos'}`}
        </p>

        {isAdmin && (
          <div className="flex gap-2">
            <input type="file" id={inputId} className="hidden" accept="image/*" multiple disabled={uploading} onChange={handleFileUpload} />
            <label
              htmlFor={inputId}
              className={`inline-flex items-center gap-1.5 rounded-full bg-emerald-800 px-4 py-2 text-sm font-medium text-ivory ${uploading ? 'cursor-wait opacity-60' : 'cursor-pointer hover:bg-emerald-700'}`}
            >
              <Plus size={14} /> {uploading ? 'Uploading…' : 'Add photos'}
            </label>
            <Button variant="outline" size="sm" className="rounded-full" onClick={onLogout}>
              Logout
            </Button>
          </div>
        )}
      </div>

      {loading ? (
        <Loader label="Loading photos" />
      ) : shown.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-emerald-900/20 py-20 text-center text-ink-soft">
          {isAdmin ? 'No photos yet. Use “Add photos” to upload some.' : 'New photos are on their way. Check back soon.'}
        </div>
      ) : (
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {shown.map((img, i) => (
            <motion.figure
              key={img.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, ease: EASE, delay: (i % 3) * 0.08 }}
              onClick={() => setIndex(i)}
              className="group relative mb-4 cursor-zoom-in break-inside-avoid overflow-hidden rounded-2xl bg-ivory-200"
            >
              <img
                src={img.url}
                loading="lazy"
                alt={`${altPrefix} ${i + 1}`}
                className="w-full object-cover transition-transform [transition-duration:1.2s] ease-out group-hover:scale-[1.06]"
                draggable={false}
              />
              <div className="absolute inset-0 flex items-end justify-between gap-3 bg-gradient-to-t from-emerald-950/80 via-emerald-950/10 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <a
                  href={whatsappLink(`Hi, I want ${requestLabel}:\n${absoluteUrl(img.url)}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 rounded-full bg-ivory px-4 py-2 text-xs font-semibold text-emerald-900 transition hover:bg-gold-300"
                >
                  <MessageCircle className="h-3.5 w-3.5" /> Request this setup
                </a>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur">
                  <Expand className="h-4 w-4" />
                </span>
              </div>

              {isAdmin && !usingFallback && (
                <button
                  onClick={(e) => handleDelete(img, e)}
                  aria-label="Delete photo"
                  className="absolute right-3 top-3 z-20 rounded-full bg-red-600 p-2 text-white shadow-lg hover:bg-red-700"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </motion.figure>
          ))}
        </div>
      )}

      <Lightbox images={shown} index={index} setIndex={setIndex} altPrefix={altPrefix} requestLabel={requestLabel} />
    </div>
  );
}

function Lightbox({ images, index, setIndex, altPrefix, requestLabel }) {
  const lenis = useLenis();
  const [direction, setDirection] = useState(0);
  const open = index !== null && Boolean(images[index]);

  const go = useCallback(
    (delta) => {
      setDirection(delta);
      setIndex((i) => (i + delta + images.length) % images.length);
    },
    [images.length, setIndex]
  );
  const close = useCallback(() => setIndex(null), [setIndex]);

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      lenis?.start();
    };
  }, [open, go, close, lenis]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex flex-col bg-emerald-950/95 backdrop-blur-xl"
          data-lenis-prevent
        >
          <div className="flex items-center justify-between px-4 py-4 text-ivory sm:px-8">
            <span className="font-display text-lg tabular-nums">
              {index + 1} <span className="text-ivory/40">/ {images.length}</span>
            </span>
            <div className="flex items-center gap-2">
              <a
                href={whatsappLink(`Hi, I want ${requestLabel}:\n${absoluteUrl(images[index].url)}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-1.5 rounded-full bg-gold-400 px-4 py-2 text-xs font-semibold text-emerald-950 sm:inline-flex"
              >
                <MessageCircle className="h-3.5 w-3.5" /> Request this setup
              </a>
              <button onClick={close} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 sm:px-20">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.img
                key={images[index].id}
                src={images[index].url}
                alt={`${altPrefix} ${index + 1}`}
                custom={direction}
                variants={{
                  enter: (d) => ({ x: d >= 0 ? 120 : -120, opacity: 0, scale: 0.96 }),
                  center: { x: 0, opacity: 1, scale: 1 },
                  exit: (d) => ({ x: d >= 0 ? -120 : 120, opacity: 0, scale: 0.96 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: EASE }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) go(1);
                  else if (info.offset.x > 80) go(-1);
                }}
                className="max-h-[72vh] max-w-full touch-pan-y select-none rounded-xl object-contain shadow-2xl"
                draggable={false}
              />
            </AnimatePresence>

            {images.length > 1 && (
              <>
                <button onClick={() => go(-1)} aria-label="Previous photo" className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-ivory hover:bg-white/20 sm:grid">
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button onClick={() => go(1)} aria-label="Next photo" className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-ivory hover:bg-white/20 sm:grid">
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-4 sm:justify-center">
              {images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  aria-label={`Show photo ${i + 1}`}
                  className={`h-14 w-14 shrink-0 overflow-hidden rounded-lg transition sm:h-16 sm:w-16 ${
                    i === index ? 'ring-2 ring-gold-400 ring-offset-2 ring-offset-emerald-950' : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt="" className="h-full w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
