-- Resume Management System: private storage, versioned metadata, audit trail.
-- Run this in the Supabase SQL editor (or `supabase db push`) before enabling env vars.

create extension if not exists pgcrypto;

create table if not exists public.resume_versions (
  id uuid primary key default gen_random_uuid(),
  storage_key text not null unique,
  original_filename text not null,
  file_size bigint not null check (file_size > 0 and file_size <= 10485760),
  mime_type text not null default 'application/pdf',
  version integer not null check (version > 0),
  is_active boolean not null default false,
  checksum text,
  uploaded_by uuid,
  uploaded_at timestamptz not null default now()
);

-- Exactly one active resume at a time.
create unique index if not exists resume_single_active
  on public.resume_versions ((is_active)) where is_active;
create index if not exists resume_versions_order_idx
  on public.resume_versions (version desc);

create table if not exists public.resume_audit_log (
  id bigint generated always as identity primary key,
  actor_id uuid,
  action text not null,
  target_id uuid,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists resume_audit_created_idx
  on public.resume_audit_log (created_at desc);

create table if not exists public.resume_rate_limits (
  key text primary key,
  count integer not null default 0,
  window_start timestamptz not null default now()
);

-- Private bucket: 10 MB, PDF only. No public policies are created.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('resumes', 'resumes', false, 10485760, array['application/pdf']::text[])
on conflict (id) do update set
  public = false,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

alter table public.resume_versions enable row level security;
alter table public.resume_audit_log enable row level security;
alter table public.resume_rate_limits enable row level security;

-- Deny by default: no anon/authenticated policies exist. All access goes through
-- server-side route handlers using the service role key, which is never sent to clients.
revoke all on public.resume_versions from anon, authenticated;
revoke all on public.resume_audit_log from anon, authenticated;
revoke all on public.resume_rate_limits from anon, authenticated;

create or replace function public.resume_rate_limit(p_key text, p_limit integer, p_window integer)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count integer;
  v_start timestamptz;
begin
  select count, window_start into v_count, v_start
  from public.resume_rate_limits where key = p_key for update;

  if v_start is null or now() >= v_start + make_interval(secs => greatest(p_window, 1)) then
    insert into public.resume_rate_limits (key, count, window_start)
    values (p_key, 1, now())
    on conflict (key) do update set count = 1, window_start = now();
    return true;
  end if;

  if v_count >= p_limit then
    return false;
  end if;

  update public.resume_rate_limits set count = count + 1 where key = p_key;
  return true;
end;
$$;

create or replace function public.create_resume_version(
  p_storage_key text,
  p_original_filename text,
  p_file_size bigint,
  p_checksum text,
  p_uploaded_by uuid
)
returns public.resume_versions
language plpgsql
security definer
set search_path = public
as $$
declare
  v_version integer;
  v_row public.resume_versions;
begin
  -- Advisory lock keeps concurrent uploads from claiming the same version number.
  perform pg_advisory_xact_lock(hashtext('resume_versions_create'));
  select coalesce(max(version), 0) + 1 into v_version from public.resume_versions;

  insert into public.resume_versions
    (storage_key, original_filename, file_size, mime_type, version, is_active, checksum, uploaded_by)
  values
    (p_storage_key, p_original_filename, p_file_size, 'application/pdf', v_version, false, p_checksum, p_uploaded_by)
  returning * into v_row;

  insert into public.resume_audit_log (actor_id, action, target_id, details)
  values (p_uploaded_by, 'upload', v_row.id, jsonb_build_object('version', v_version, 'file_size', p_file_size));

  return v_row;
end;
$$;

create or replace function public.publish_resume_version(
  p_id uuid,
  p_actor uuid,
  p_action text default 'publish'
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_target public.resume_versions;
begin
  select * into v_target from public.resume_versions where id = p_id for update;
  if not found then
    raise exception 'NOT_FOUND';
  end if;

  update public.resume_versions set is_active = false
  where is_active = true and id <> p_id;

  update public.resume_versions set is_active = true where id = p_id;

  insert into public.resume_audit_log (actor_id, action, target_id, details)
  values (p_actor, p_action, p_id, jsonb_build_object('version', v_target.version));

  return true;
end;
$$;

create or replace function public.delete_resume_version(p_id uuid, p_actor uuid)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_active boolean;
  v_key text;
  v_version integer;
begin
  select is_active, storage_key, version into v_active, v_key, v_version
  from public.resume_versions where id = p_id for update;

  if not found then
    raise exception 'NOT_FOUND';
  end if;
  if v_active then
    raise exception 'ACTIVE_VERSION';
  end if;

  delete from public.resume_versions where id = p_id;

  insert into public.resume_audit_log (actor_id, action, target_id, details)
  values (p_actor, 'delete', p_id, jsonb_build_object('version', v_version));

  return v_key;
end;
$$;

revoke all on function public.resume_rate_limit(text, integer, integer) from public, anon, authenticated;
revoke all on function public.create_resume_version(text, text, bigint, text, uuid) from public, anon, authenticated;
revoke all on function public.publish_resume_version(uuid, uuid, text) from public, anon, authenticated;
revoke all on function public.delete_resume_version(uuid, uuid) from public, anon, authenticated;

grant execute on function public.resume_rate_limit(text, integer, integer) to service_role;
grant execute on function public.create_resume_version(text, text, bigint, text, uuid) to service_role;
grant execute on function public.publish_resume_version(uuid, uuid, text) to service_role;
grant execute on function public.delete_resume_version(uuid, uuid) to service_role;

-- Optional verification query:
-- select id, version, is_active, original_filename from public.resume_versions order by version desc;
