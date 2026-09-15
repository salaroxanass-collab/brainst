-- BrainStorming Engine real data model.
-- Target: Supabase Postgres with pgvector enabled.
-- Run in Supabase SQL editor or through `supabase db push`.

create extension if not exists pgcrypto;
create extension if not exists vector;

create schema if not exists brainstorming;

create type brainstorming.source_status as enum ('pending', 'approved', 'paused', 'blocked', 'retired');
create type brainstorming.permission_status as enum ('unknown', 'allowed', 'limited', 'denied');
create type brainstorming.project_status as enum ('draft', 'needs_review', 'published', 'archived');
create type brainstorming.image_status as enum ('pending', 'approved', 'blocked');
create type brainstorming.job_status as enum ('queued', 'running', 'succeeded', 'failed', 'cancelled');
create type brainstorming.job_type as enum ('robots_check', 'crawl_source', 'index_project', 'ai_tag_project', 'embed_project', 'refresh_source');
create type brainstorming.embedding_subject as enum ('project', 'image', 'moodboard');
create type brainstorming.user_role as enum ('viewer', 'designer', 'editor', 'admin');
create type brainstorming.export_format as enum ('pdf', 'pptx');

create or replace function brainstorming.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table brainstorming.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  role brainstorming.user_role not null default 'designer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table brainstorming.sources (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  homepage_url text not null,
  status brainstorming.source_status not null default 'pending',
  robots_txt_url text,
  robots_checked_at timestamptz,
  permission_status brainstorming.permission_status not null default 'unknown',
  permission_notes text,
  allowed_content jsonb not null default '{
    "title": true,
    "designer": true,
    "location": true,
    "snippet": true,
    "thumbnail": false,
    "image_url": false,
    "source_url": true
  }'::jsonb,
  attribution_template text not null default 'Source: {source_name}. Link: {source_url}.',
  crawl_delay_seconds integer not null default 10 check (crawl_delay_seconds >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table brainstorming.projects (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null references brainstorming.sources(id) on delete restrict,
  source_project_id text,
  source_url text not null,
  canonical_url text,
  title text not null,
  title_i18n jsonb not null default '{}'::jsonb,
  designer text,
  collaborators text[] not null default '{}',
  location text,
  country text,
  latitude numeric,
  longitude numeric,
  year_completed integer,
  description_snippet text,
  description_i18n jsonb not null default '{}'::jsonb,
  source_published_at date,
  source_accessed_at timestamptz not null default now(),
  attribution text not null,
  status brainstorming.project_status not null default 'needs_review',
  metadata jsonb not null default '{}'::jsonb,
  search_document tsvector generated always as (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(designer, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(location, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(description_snippet, '')), 'C') ||
    setweight(to_tsvector('english', coalesce(metadata::text, '')), 'D')
  ) stored,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (source_id, source_url)
);

create table brainstorming.project_ai_metadata (
  project_id uuid primary key references brainstorming.projects(id) on delete cascade,
  typology text,
  landscape_typology text,
  materials text[] not null default '{}',
  planting_style text,
  atmosphere text,
  climate text,
  colour_palette text[] not null default '{}',
  project_scale text,
  spatial_character text,
  design_elements text[] not null default '{}',
  sustainability_features text[] not null default '{}',
  nature_based_solutions text[] not null default '{}',
  biodiversity_strategies text[] not null default '{}',
  accessibility_features text[] not null default '{}',
  public_health_themes text[] not null default '{}',
  environmental_themes text[] not null default '{}',
  gis_spatial_analysis_themes text[] not null default '{}',
  client_facing_keywords text[] not null default '{}',
  ai_summary text,
  ai_model text,
  confidence numeric check (confidence is null or (confidence >= 0 and confidence <= 1)),
  reviewed_by uuid references brainstorming.profiles(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table brainstorming.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references brainstorming.projects(id) on delete cascade,
  source_id uuid not null references brainstorming.sources(id) on delete restrict,
  image_url text not null,
  thumbnail_url text,
  alt_text text,
  caption text,
  credit text not null,
  license_notes text,
  permission_status brainstorming.permission_status not null default 'unknown',
  status brainstorming.image_status not null default 'pending',
  width integer,
  height integer,
  dominant_colours text[] not null default '{}',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table brainstorming.tags (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  label text not null,
  category text not null,
  description text,
  is_ai_generated boolean not null default true,
  created_at timestamptz not null default now()
);

create table brainstorming.project_tags (
  project_id uuid not null references brainstorming.projects(id) on delete cascade,
  tag_id uuid not null references brainstorming.tags(id) on delete cascade,
  confidence numeric check (confidence is null or (confidence >= 0 and confidence <= 1)),
  source text not null default 'ai',
  created_at timestamptz not null default now(),
  primary key (project_id, tag_id)
);

create table brainstorming.embeddings (
  id uuid primary key default gen_random_uuid(),
  subject brainstorming.embedding_subject not null,
  project_id uuid references brainstorming.projects(id) on delete cascade,
  image_id uuid references brainstorming.project_images(id) on delete cascade,
  moodboard_id uuid,
  content text not null,
  embedding vector(1536) not null,
  embedding_model text not null default 'text-embedding-3-small',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  check (
    (subject = 'project' and project_id is not null and image_id is null) or
    (subject = 'image' and image_id is not null) or
    (subject = 'moodboard' and moodboard_id is not null)
  )
);

create table brainstorming.saved_searches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references brainstorming.profiles(id) on delete cascade,
  title text,
  prompt text not null,
  filters jsonb not null default '{}'::jsonb,
  ai_interpretation jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table brainstorming.moodboards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references brainstorming.profiles(id) on delete cascade,
  saved_search_id uuid references brainstorming.saved_searches(id) on delete set null,
  title text not null,
  concept_description text,
  tags text[] not null default '{}',
  colour_palette text[] not null default '{}',
  export_status jsonb not null default '{}'::jsonb,
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table brainstorming.embeddings
  add constraint embeddings_moodboard_fk
  foreign key (moodboard_id) references brainstorming.moodboards(id) on delete cascade;

create table brainstorming.moodboard_items (
  id uuid primary key default gen_random_uuid(),
  moodboard_id uuid not null references brainstorming.moodboards(id) on delete cascade,
  project_id uuid not null references brainstorming.projects(id) on delete restrict,
  image_id uuid references brainstorming.project_images(id) on delete set null,
  caption text,
  source_credit text not null,
  source_url text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique (moodboard_id, project_id, image_id)
);

create table brainstorming.moodboard_exports (
  id uuid primary key default gen_random_uuid(),
  moodboard_id uuid not null references brainstorming.moodboards(id) on delete cascade,
  format brainstorming.export_format not null,
  file_url text,
  status brainstorming.job_status not null default 'queued',
  error_message text,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create table brainstorming.crawler_jobs (
  id uuid primary key default gen_random_uuid(),
  source_id uuid references brainstorming.sources(id) on delete set null,
  type brainstorming.job_type not null,
  status brainstorming.job_status not null default 'queued',
  target_url text,
  scheduled_for timestamptz not null default now(),
  started_at timestamptz,
  finished_at timestamptz,
  attempts integer not null default 0,
  max_attempts integer not null default 3,
  input jsonb not null default '{}'::jsonb,
  output jsonb not null default '{}'::jsonb,
  error_message text,
  created_by uuid references brainstorming.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table brainstorming.ai_tag_reviews (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references brainstorming.projects(id) on delete cascade,
  reviewer_id uuid not null references brainstorming.profiles(id) on delete cascade,
  before_metadata jsonb not null default '{}'::jsonb,
  after_metadata jsonb not null default '{}'::jsonb,
  notes text,
  created_at timestamptz not null default now()
);

create index sources_status_idx on brainstorming.sources(status);
create index projects_status_idx on brainstorming.projects(status);
create index projects_source_idx on brainstorming.projects(source_id);
create index projects_search_idx on brainstorming.projects using gin(search_document);
create index project_ai_metadata_typology_idx on brainstorming.project_ai_metadata(typology);
create index project_images_project_idx on brainstorming.project_images(project_id);
create unique index project_images_project_url_unique on brainstorming.project_images(project_id, image_url);
create index tags_category_idx on brainstorming.tags(category);
create index crawler_jobs_status_idx on brainstorming.crawler_jobs(status, scheduled_for);
create index saved_searches_user_idx on brainstorming.saved_searches(user_id);
create index moodboards_user_idx on brainstorming.moodboards(user_id);
create index moodboard_items_moodboard_idx on brainstorming.moodboard_items(moodboard_id, sort_order);
create index embeddings_project_idx on brainstorming.embeddings(project_id);
create unique index embeddings_project_model_unique
  on brainstorming.embeddings(project_id, embedding_model)
  where subject = 'project' and project_id is not null;
create index embeddings_vector_idx on brainstorming.embeddings using ivfflat (embedding vector_cosine_ops) with (lists = 100);

create trigger profiles_set_updated_at
  before update on brainstorming.profiles
  for each row execute function brainstorming.set_updated_at();

create trigger sources_set_updated_at
  before update on brainstorming.sources
  for each row execute function brainstorming.set_updated_at();

create trigger projects_set_updated_at
  before update on brainstorming.projects
  for each row execute function brainstorming.set_updated_at();

create trigger project_ai_metadata_set_updated_at
  before update on brainstorming.project_ai_metadata
  for each row execute function brainstorming.set_updated_at();

create trigger project_images_set_updated_at
  before update on brainstorming.project_images
  for each row execute function brainstorming.set_updated_at();

create trigger saved_searches_set_updated_at
  before update on brainstorming.saved_searches
  for each row execute function brainstorming.set_updated_at();

create trigger moodboards_set_updated_at
  before update on brainstorming.moodboards
  for each row execute function brainstorming.set_updated_at();

create trigger crawler_jobs_set_updated_at
  before update on brainstorming.crawler_jobs
  for each row execute function brainstorming.set_updated_at();

create or replace function brainstorming.is_admin()
returns boolean
language sql
stable
security definer
set search_path = brainstorming, public
as $$
  select exists (
    select 1
    from brainstorming.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

create or replace function brainstorming.match_projects(
  query_embedding vector(1536),
  match_count integer default 24,
  similarity_threshold numeric default 0.15,
  metadata_filter jsonb default '{}'::jsonb
)
returns table (
  project_id uuid,
  similarity numeric,
  title text,
  designer text,
  location text,
  source_url text,
  thumbnail_url text,
  metadata jsonb
)
language sql
stable
security definer
set search_path = brainstorming, public
as $$
  select
    p.id as project_id,
    1 - (e.embedding <=> query_embedding) as similarity,
    p.title,
    p.designer,
    p.location,
    p.source_url,
    (
      select coalesce(pi.thumbnail_url, pi.image_url)
      from brainstorming.project_images pi
      where pi.project_id = p.id
        and pi.status = 'approved'
      order by pi.sort_order asc, pi.created_at asc
      limit 1
    ) as thumbnail_url,
    coalesce(p.metadata, '{}'::jsonb) || jsonb_build_object(
      'typology', m.typology,
      'materials', m.materials,
      'planting_style', m.planting_style,
      'atmosphere', m.atmosphere,
      'climate', m.climate,
      'nature_based_solutions', m.nature_based_solutions
    ) as metadata
  from brainstorming.embeddings e
  join brainstorming.projects p on p.id = e.project_id
  left join brainstorming.project_ai_metadata m on m.project_id = p.id
  where e.subject = 'project'
    and p.status = 'published'
    and (
      metadata_filter = '{}'::jsonb
      or (coalesce(p.metadata, '{}'::jsonb) || coalesce(to_jsonb(m), '{}'::jsonb)) @> metadata_filter
    )
    and 1 - (e.embedding <=> query_embedding) >= similarity_threshold
  order by e.embedding <=> query_embedding
  limit match_count;
$$;

alter table brainstorming.profiles enable row level security;
alter table brainstorming.sources enable row level security;
alter table brainstorming.projects enable row level security;
alter table brainstorming.project_ai_metadata enable row level security;
alter table brainstorming.project_images enable row level security;
alter table brainstorming.tags enable row level security;
alter table brainstorming.project_tags enable row level security;
alter table brainstorming.embeddings enable row level security;
alter table brainstorming.saved_searches enable row level security;
alter table brainstorming.moodboards enable row level security;
alter table brainstorming.moodboard_items enable row level security;
alter table brainstorming.moodboard_exports enable row level security;
alter table brainstorming.crawler_jobs enable row level security;
alter table brainstorming.ai_tag_reviews enable row level security;

create policy "profiles select own or admin"
  on brainstorming.profiles for select
  using (id = auth.uid() or brainstorming.is_admin());

create policy "profiles update own"
  on brainstorming.profiles for update
  using (id = auth.uid())
  with check (id = auth.uid());

create policy "public read approved sources"
  on brainstorming.sources for select
  using (status = 'approved');

create policy "admins manage sources"
  on brainstorming.sources for all
  using (brainstorming.is_admin())
  with check (brainstorming.is_admin());

create policy "public read published projects"
  on brainstorming.projects for select
  using (status = 'published');

create policy "admins manage projects"
  on brainstorming.projects for all
  using (brainstorming.is_admin())
  with check (brainstorming.is_admin());

create policy "public read metadata for published projects"
  on brainstorming.project_ai_metadata for select
  using (
    exists (
      select 1 from brainstorming.projects p
      where p.id = project_id and p.status = 'published'
    )
  );

create policy "admins manage project metadata"
  on brainstorming.project_ai_metadata for all
  using (brainstorming.is_admin())
  with check (brainstorming.is_admin());

create policy "public read approved images"
  on brainstorming.project_images for select
  using (
    status = 'approved'
    and exists (
      select 1 from brainstorming.projects p
      where p.id = project_id and p.status = 'published'
    )
  );

create policy "admins manage images"
  on brainstorming.project_images for all
  using (brainstorming.is_admin())
  with check (brainstorming.is_admin());

create policy "public read tags"
  on brainstorming.tags for select
  using (true);

create policy "admins manage tags"
  on brainstorming.tags for all
  using (brainstorming.is_admin())
  with check (brainstorming.is_admin());

create policy "public read published project tags"
  on brainstorming.project_tags for select
  using (
    exists (
      select 1 from brainstorming.projects p
      where p.id = project_id and p.status = 'published'
    )
  );

create policy "admins manage project tags"
  on brainstorming.project_tags for all
  using (brainstorming.is_admin())
  with check (brainstorming.is_admin());

create policy "public read project embeddings through functions only"
  on brainstorming.embeddings for select
  using (false);

create policy "admins manage embeddings"
  on brainstorming.embeddings for all
  using (brainstorming.is_admin())
  with check (brainstorming.is_admin());

create policy "users manage own saved searches"
  on brainstorming.saved_searches for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "admins read saved searches"
  on brainstorming.saved_searches for select
  using (brainstorming.is_admin());

create policy "users manage own moodboards"
  on brainstorming.moodboards for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "public read public moodboards"
  on brainstorming.moodboards for select
  using (is_public = true);

create policy "users manage own moodboard items"
  on brainstorming.moodboard_items for all
  using (
    exists (
      select 1 from brainstorming.moodboards m
      where m.id = moodboard_id and m.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from brainstorming.moodboards m
      where m.id = moodboard_id and m.user_id = auth.uid()
    )
  );

create policy "public read public moodboard items"
  on brainstorming.moodboard_items for select
  using (
    exists (
      select 1 from brainstorming.moodboards m
      where m.id = moodboard_id and m.is_public = true
    )
  );

create policy "users read own exports"
  on brainstorming.moodboard_exports for select
  using (
    exists (
      select 1 from brainstorming.moodboards m
      where m.id = moodboard_id and m.user_id = auth.uid()
    )
  );

create policy "admins manage exports"
  on brainstorming.moodboard_exports for all
  using (brainstorming.is_admin())
  with check (brainstorming.is_admin());

create policy "admins manage crawler jobs"
  on brainstorming.crawler_jobs for all
  using (brainstorming.is_admin())
  with check (brainstorming.is_admin());

create policy "admins manage tag reviews"
  on brainstorming.ai_tag_reviews for all
  using (brainstorming.is_admin())
  with check (brainstorming.is_admin());

insert into brainstorming.sources (
  slug,
  name,
  homepage_url,
  status,
  robots_txt_url,
  permission_status,
  allowed_content,
  attribution_template
) values
  (
    'landezine',
    'Landezine',
    'https://landezine.com',
    'pending',
    'https://landezine.com/robots.txt',
    'unknown',
    '{"title": true, "designer": true, "location": true, "snippet": true, "thumbnail": false, "image_url": false, "source_url": true}'::jsonb,
    'Project reference from Landezine. View original: {source_url}.'
  ),
  (
    'landscape-first',
    'Landscape First',
    'https://www.landscapefirst.com',
    'pending',
    'https://www.landscapefirst.com/robots.txt',
    'unknown',
    '{"title": true, "designer": true, "location": true, "snippet": true, "thumbnail": false, "image_url": false, "source_url": true}'::jsonb,
    'Project reference from Landscape First. View original: {source_url}.'
  )
on conflict (slug) do nothing;
