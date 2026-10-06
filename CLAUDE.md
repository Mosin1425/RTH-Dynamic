# Rajasthan Tent House (RTH-Dynamic)

Marketing site for an event/tent-house business in Bhilwara, Rajasthan. The original client stopped
paying, so rajasthantenthouse.com and the old Hostinger PHP/MySQL backend are gone. The site is now
Mosin's portfolio demo for new clients, deployed as a Render Static Site. Next phase: modernize it.

## Stack

- React 18 + Vite 4 (plain JS), Tailwind 3, framer-motion, Lenis (smooth scroll), lucide-react,
  react-router-dom 6, react-helmet-async for SEO. `@/` resolves to `src/`.
- Backend: Supabase (Postgres + Storage + Auth) called directly from the browser. No server.

## Commands

- `npm run dev` – dev server on port 3000
- `npm run build` – production build to `dist/` (on Windows run `npx vite build`; the script's `|| true` is POSIX-only)

## Backend (Supabase)

- Schema, bucket and RLS policies: `supabase/setup.sql` (idempotent). Setup steps: `supabase/README.md`.
- Photos live in the `images` table (`type` = `gallery` | `service`, `key` = `main` | service id from
  `src/constants/data.js`, `path` in the public `images` bucket). Only users listed in `public.admins` can write.
- Client code: `src/lib/supabase.js`, `src/lib/images.js`, `src/hooks/useAdmin.js`,
  `src/hooks/useImages.js`, `src/pages/AdminPage.jsx`.
- Admin login is the unlisted `/admin` page (noindex, linked from nowhere); photo pages show Add/Delete only to admins.
- Env: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` (see `.env.example`). The publishable key is
  public by design; never commit the secret key.
- Free tier pauses after ~7 days without traffic; restore it in the dashboard before a demo.

## Design system

- Palette (tailwind.config.js): `emerald-*` (brand green, `emerald-500` = old #5a9b7f), `gold-*`, `ivory`, `ink`.
  Fonts: Cormorant Garamond (`font-display`, all headings) + Manrope (body), loaded in `index.html`.
- Shared CSS classes in `src/index.css`: `eyebrow`, `btn-gold`, `btn-ghost`, `btn-dark`, `glass`, `grain`,
  `pattern-jaali`, `text-gold-gradient` (dark backgrounds), `text-gold-deep` (light backgrounds).
- Motion primitives in `src/components/motion/`: `Reveal`, `SplitText` (wrap words in `*…*` to highlight),
  `Magnetic`, `Marquee`, `CountUp`, `SpotlightCard`, `ScrollProgress`, `SmoothScroll` (`useLenis()`).
  `MotionConfig reducedMotion="user"` in `App.jsx` respects the OS reduced-motion setting.
- Page building blocks: `PageHero`, `SectionHeading`, `CtaBand`, `SEOFAQ`, `PhotoGallery` (masonry + lightbox +
  admin controls, shared by Gallery and Service pages). Home sections live in `src/components/home/`.
- Shared content (services with images, stats, testimonials, FAQs, WhatsApp number) is in `src/constants/data.js`.
- All pages except Home are lazy-loaded; Supabase only loads on Gallery/Service/Admin pages.

## Content notes

- Enquiries go to WhatsApp (`WHATSAPP_NUMBER` / `whatsappLink()` in `src/constants/data.js`); there is no
  email backend. Mosin's own number (916350089531) is used only by the "built by Mosin" lead links.
- Static photos are in `public/assets`. If Supabase returns no photos (empty or paused), visitors see the
  bundled `fallbackGallery` / `showcaseImages` instead; admins always see the real state.

## Known issues / backlog

- SEO canonical URLs (`SITE_URL`) still point to the dead domain.
- Testimonials in `data.js` are placeholder copy.
- Deep links like `/gallery` need a Render rewrite rule `/*` → `/index.html`.
