
-- Roles
create type public.app_role as enum ('admin');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Users can view own roles" on public.user_roles for select to authenticated using (user_id = auth.uid());
create policy "Admins manage roles" on public.user_roles for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Appointments
create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  age text,
  phone text not null,
  email text,
  mode text not null default 'Clinic Visit',
  date date not null,
  slot text not null,
  concern text not null,
  status text not null default 'pending',
  payment_status text not null default 'unpaid',
  razorpay_order_id text,
  token_number int,
  created_at timestamptz not null default now()
);
alter table public.appointments enable row level security;

create policy "Anyone can request appointment" on public.appointments for insert to anon, authenticated with check (true);
create policy "Admin reads appointments" on public.appointments for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Patient reads own appointments" on public.appointments for select to authenticated using (user_id = auth.uid());
create policy "Admin updates appointments" on public.appointments for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Patient cancels own appointment" on public.appointments for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "Admin deletes appointments" on public.appointments for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Slots
create table public.slots (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  time_label text not null,
  max_capacity int not null default 1000,
  is_blocked boolean not null default false,
  created_at timestamptz not null default now(),
  unique (date, time_label)
);
alter table public.slots enable row level security;
create policy "Public reads slots" on public.slots for select to anon, authenticated using (true);
create policy "Admin writes slots" on public.slots for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Token allocation function
create or replace function public.allocate_token(_date date, _slot text)
returns int
language plpgsql security definer set search_path = public
as $$
declare
  next_token int;
begin
  select coalesce(max(token_number), 0) + 1 into next_token
    from public.appointments where date = _date and slot = _slot;
  return next_token;
end;
$$;
grant execute on function public.allocate_token(date, text) to anon, authenticated;

-- Contact messages
create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  message text not null,
  created_at timestamptz not null default now()
);
alter table public.contact_messages enable row level security;
create policy "Anyone can send message" on public.contact_messages for insert to anon, authenticated with check (true);
create policy "Admin reads messages" on public.contact_messages for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admin deletes messages" on public.contact_messages for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Gallery
create table public.gallery (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  url text not null,
  created_at timestamptz not null default now()
);
alter table public.gallery enable row level security;
create policy "Public reads gallery" on public.gallery for select to anon, authenticated using (true);
create policy "Admin writes gallery" on public.gallery for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Blog posts
create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null,
  excerpt text,
  content text,
  published boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.blog_posts enable row level security;
create policy "Public reads published posts" on public.blog_posts for select to anon, authenticated
  using (published = true or public.has_role(auth.uid(), 'admin'));
create policy "Admin writes posts" on public.blog_posts for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Storage
insert into storage.buckets (id, name, public) values ('media', 'media', true) on conflict (id) do nothing;
create policy "Public reads media" on storage.objects for select to anon, authenticated using (bucket_id = 'media');
create policy "Admin uploads media" on storage.objects for insert to authenticated with check (bucket_id = 'media' and public.has_role(auth.uid(), 'admin'));
create policy "Admin updates media" on storage.objects for update to authenticated using (bucket_id = 'media' and public.has_role(auth.uid(), 'admin'));
create policy "Admin deletes media" on storage.objects for delete to authenticated using (bucket_id = 'media' and public.has_role(auth.uid(), 'admin'));

-- First user becomes admin
create or replace function public.bootstrap_first_admin()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  if not exists (select 1 from public.user_roles where role = 'admin') then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  end if;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_bootstrap_admin on auth.users;
create trigger on_auth_user_created_bootstrap_admin
  after insert on auth.users for each row execute function public.bootstrap_first_admin();

revoke execute on function public.bootstrap_first_admin() from public, anon, authenticated;
