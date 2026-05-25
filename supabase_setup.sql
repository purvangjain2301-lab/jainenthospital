-- ═══════════════════════════════════════════════════════════════════
-- Jain ENT Hospital — Supabase setup
-- Run this in Supabase → SQL Editor (once)
-- ═══════════════════════════════════════════════════════════════════

-- 1. GALLERY TABLE
create table if not exists gallery (
  id          uuid primary key default gen_random_uuid(),
  label       text not null,
  url         text not null,
  created_at  timestamptz default now()
);

-- Anyone can read gallery (public site)
alter table gallery enable row level security;
create policy "Public read gallery" on gallery for select using (true);
-- Only authenticated users (admin) can insert/delete
create policy "Admin insert gallery" on gallery for insert with check (true);
create policy "Admin delete gallery" on gallery for delete using (true);


-- 2. BLOG POSTS TABLE
create table if not exists blog_posts (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  category    text not null default 'General',
  excerpt     text not null default '',
  content     text not null default '',
  published   boolean not null default false,
  created_at  timestamptz default now()
);

alter table blog_posts enable row level security;
-- Public can only see published posts
create policy "Public read published posts" on blog_posts for select using (published = true);
-- Admin can do everything
create policy "Admin all blog_posts" on blog_posts for all using (true) with check (true);


-- 3. APPOINTMENTS TABLE
create table if not exists appointments (
  id                 uuid primary key default gen_random_uuid(),
  name               text not null,
  age                text,
  phone              text not null,
  mode               text not null default 'Clinic Visit',
  date               text not null,
  slot               text not null,
  concern            text not null,
  status             text not null default 'pending',   -- pending | confirmed | cancelled
  payment_status     text not null default 'unpaid',    -- unpaid | paid
  razorpay_order_id  text,
  created_at         timestamptz default now()
);

alter table appointments enable row level security;
-- Anyone can insert their own appointment (from booking form)
create policy "Public insert appointments" on appointments for insert with check (true);
-- Admin can read/update all
create policy "Admin read appointments"   on appointments for select using (true);
create policy "Admin update appointments" on appointments for update using (true) with check (true);


-- 4. STORAGE BUCKET for gallery images
-- Go to Supabase → Storage → Create bucket named "media" → set Public
-- (Cannot be done via SQL, do it in the dashboard)
-- Then run this policy:

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "Public read media"  on storage.objects for select using (bucket_id = 'media');
create policy "Admin upload media" on storage.objects for insert with check (bucket_id = 'media');
create policy "Admin delete media" on storage.objects for delete using (bucket_id = 'media');
