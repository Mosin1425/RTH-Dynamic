# Backend setup (Supabase)

The Gallery and Service pages store photos in Supabase: a Postgres table (`images`) plus a
public storage bucket (`images`). Admin login uses Supabase Auth. There is no server to host;
the React app talks to Supabase directly and Row Level Security decides who may write.

## 1. Create the project

1. Sign in at <https://supabase.com> → **New project** (free plan, region **Mumbai / ap-south-1**).
2. **SQL Editor** → paste all of [`setup.sql`](./setup.sql) → **Run**.

## 2. Create the admin login

1. **Authentication → Users → Add user → Create new user**, enter email + password,
   tick **Auto Confirm User**.
2. **SQL Editor**, run (with that email). It must run *after* the user exists, otherwise it adds nothing:
   ```sql
   insert into public.admins (user_id)
   select id from auth.users where email = lower('you@example.com')
   on conflict do nothing;
   ```
   Check it worked (your email should show `is_admin = true`):
   ```sql
   select u.email, a.user_id is not null as is_admin
   from auth.users u left join public.admins a on a.user_id = u.id;
   ```
   If login says "This account is not an admin", this step is what's missing.
3. Recommended: **Authentication → Sign In / Providers** → turn off **Allow new users to sign up**.

## 3. Connect the site

From **Project Settings → API Keys** copy the **Project URL** and the **publishable** key.

- **Local:** copy `.env.example` to `.env` and fill both values, then `npm run dev`.
- **Render (Static Site):** **Environment** → add `VITE_SUPABASE_URL` and
  `VITE_SUPABASE_PUBLISHABLE_KEY` → **Manual Deploy → Clear build cache & deploy**.
  Vite bakes these in at build time, so a redeploy is required after changing them.

## Managing photos

Go to `/admin` (it isn't linked anywhere on the site), log in, and pick a page. The Gallery and
Service pages then show **Add** / delete buttons. Visitors never see an admin button.

## Notes

- Free Supabase projects **pause after ~7 days with no traffic**. Before a demo, open the
  dashboard and click **Restore** if it is paused (takes a minute or two).
- Uploaded photos are resized in the browser to max 1920px JPEG before upload, so the free
  1 GB storage lasts.
