-- Rajasthan Tent House – database + storage setup for Supabase.
-- Paste this whole file into Supabase Dashboard → SQL Editor → Run.
-- Safe to run more than once.

-- ─── Admins ──────────────────────────────────────────────────────────────────
-- Only users listed here can upload/delete photos. Being signed in is not enough,
-- so a stranger who signs up through the public API still can't touch anything.
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade
);

alter table public.admins enable row level security;
revoke all on public.admins from anon, authenticated;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admins where user_id = (select auth.uid()));
$$;

-- ─── Images ──────────────────────────────────────────────────────────────────
-- type = 'gallery' (key = 'main') or 'service' (key = service id, e.g. 'wedding-events')
create table if not exists public.images (
  id         uuid primary key default gen_random_uuid(),
  type       text not null check (type in ('gallery', 'service')),
  key        text not null check (key <> ''),
  path       text not null unique, -- object path inside the "images" storage bucket
  created_at timestamptz not null default now()
);

create index if not exists images_type_key_created_at_idx
  on public.images (type, key, created_at desc);

alter table public.images enable row level security;

grant select on public.images to anon, authenticated;
grant insert, delete on public.images to authenticated;

drop policy if exists "Anyone can view images" on public.images;
create policy "Anyone can view images"
  on public.images for select
  to anon, authenticated
  using (true);

drop policy if exists "Admins can add images" on public.images;
create policy "Admins can add images"
  on public.images for insert
  to authenticated
  with check ((select public.is_admin()));

drop policy if exists "Admins can delete images" on public.images;
create policy "Admins can delete images"
  on public.images for delete
  to authenticated
  using ((select public.is_admin()));

-- ─── Storage bucket ──────────────────────────────────────────────────────────
-- Public bucket: anyone can view files by URL; only admins can upload/delete.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('images', 'images', true, 10485760, array['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Admins can upload site images" on storage.objects;
create policy "Admins can upload site images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'images' and (select public.is_admin()));

drop policy if exists "Admins can read site images" on storage.objects;
create policy "Admins can read site images"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'images' and (select public.is_admin()));

drop policy if exists "Admins can delete site images" on storage.objects;
create policy "Admins can delete site images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'images' and (select public.is_admin()));

-- ─── Make yourself an admin ──────────────────────────────────────────────────
-- 1. Authentication → Users → Add user → Create new user (tick "Auto Confirm User").
-- 2. Put that email below, then run ONLY this statement (it must run AFTER the user exists):
--
-- insert into public.admins (user_id)
-- select id from auth.users where email = lower('you@example.com')
-- on conflict do nothing;
--
-- Check who is an admin:
-- select u.email, a.user_id is not null as is_admin
-- from auth.users u left join public.admins a on a.user_id = u.id;
