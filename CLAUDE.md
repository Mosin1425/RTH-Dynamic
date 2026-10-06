# Rajasthan Tent House (RTH-Dynamic)

Marketing site for an event/tent-house business in Bhilwara, Rajasthan. The original client stopped
paying, so rajasthantenthouse.com and the old Hostinger PHP/MySQL backend are gone. The site is now
Mosin's portfolio demo for new clients, deployed as a Render Static Site. Next phase: modernize it.

## Stack

- React 18 + Vite 4 (plain JS), Tailwind 3, framer-motion, lucide-react, react-router-dom 6,
  react-helmet-async for SEO. `@/` resolves to `src/`.
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

## Content notes

- Enquiries go to WhatsApp (919636798937, hardcoded in several components); there is no email backend.
- Static photos are in `public/assets`.

## Known issues / backlog

- `src/index.css`: the Google Fonts `@import` comes after `@tailwind`, so Inter likely never loads (Vite warns).
- SEO canonical URLs and `events@rajasthantenthouse.com` still point to the dead domain.
- JS bundle is ~664 KB with no code splitting.
- Lightbox and photo-grid code is duplicated between `GalleryPage` and `ServiceDetailPage`.
- Deep links like `/gallery` need a Render rewrite rule `/*` → `/index.html`.
