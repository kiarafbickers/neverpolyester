create extension if not exists "vector" with schema "public" version '0.7.0';

create table "public"."activities" (
    "id" uuid not null default gen_random_uuid(),
    "value" text not null,
    "created_at" timestamp with time zone default now(),
    "user_id" uuid,
    "type" text not null default '''unknown''::text'::text
);


alter table "public"."activities" enable row level security;

create table "public"."ad_campaigns" (
    "id" uuid not null default gen_random_uuid(),
    "start_date" date not null,
    "end_date" date not null,
    "invoice_id" text,
    "price" numeric,
    "contact_name" text,
    "contact_email" text,
    "redirect_url" text not null,
    "image_url" text not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "slot_name" text,
    "name" text
);


alter table "public"."ad_campaigns" enable row level security;

create table "public"."blog_posts" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid,
    "topic_id" uuid,
    "title" text not null,
    "slug" text not null,
    "description" text not null,
    "content" text not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone,
    "is_admin_approved" boolean default false,
    "is_sponsored" boolean default false,
    "keywords" text[],
    "is_user_published" boolean default false,
    "default_image_url" text,
    "published_at" date
);


alter table "public"."blog_posts" enable row level security;

create table "public"."categories" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "name" text not null,
    "slug" text not null,
    "headline" text,
    "description" text
);


alter table "public"."categories" enable row level security;

create table "public"."comments" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "listing_id" uuid,
    "blog_post_id" uuid,
    "parent_comment_id" uuid,
    "content" text,
    "is_approved" boolean default false,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
);


alter table "public"."comments" enable row level security;

create table "public"."feedback" (
    "id" uuid not null default gen_random_uuid(),
    "feedback_type" text,
    "url" text,
    "description" text,
    "email" text,
    "is_handled" boolean default false,
    "created_at" timestamp with time zone default now()
);


alter table "public"."feedback" enable row level security;

create table "public"."listings" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "title" text not null,
    "slug" text not null,
    "description" text not null,
    "excerpt" text,
    "likes" integer default 0,
    "views" integer default 0,
    "clicks" integer default 0,
    "average_rating" double precision default 0,
    "ratings_count" integer default 0,
    "click_url" text not null,
    "is_user_published" boolean default false,
    "is_admin_published" boolean default false,
    "is_promoted" boolean default false,
    "finder_id" uuid,
    "owner_id" uuid,
    "category_id" uuid,
    "default_image_url" text,
    "embedding" vector(1536),
    "fts" tsvector generated always as (to_tsvector('english'::regconfig, ((((COALESCE(title, ''::text) || ' '::text) || COALESCE(description, ''::text)) || ' '::text) || COALESCE(excerpt, ''::text)))) stored
);


alter table "public"."listings" enable row level security;

create table "public"."listings_tags" (
    "listing_id" uuid not null,
    "tag_id" uuid not null
);


alter table "public"."listings_tags" enable row level security;

create table "public"."promotions" (
    "id" uuid not null default gen_random_uuid(),
    "listing_id" uuid not null,
    "profile_id" uuid,
    "start_date" date not null,
    "end_date" date not null,
    "price" bigint not null,
    "is_paid" boolean default false,
    "stripe_checkout_id" text,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "category_id" uuid not null,
    "stripe_payment_intent" text,
    "stripe_receipt_url" text,
    "is_admin_approved" boolean not null default true
);


alter table "public"."promotions" enable row level security;

create table "public"."tags" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "name" text not null,
    "slug" text not null,
    "headline" text,
    "description" text
);


alter table "public"."tags" enable row level security;

create table "public"."topics" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "name" text not null,
    "slug" text not null
);


alter table "public"."topics" enable row level security;

create table "public"."users" (
    "id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone,
    "username" text,
    "full_name" text,
    "avatar_url" text,
    "website" text,
    "email" text,
    "is_super_admin" boolean default false,
    "tag_line" text,
    "is_active" boolean default true,
);


alter table "public"."users" enable row level security;

CREATE UNIQUE INDEX blog_posts_pkey ON public.blog_posts USING btree (id);

CREATE UNIQUE INDEX blog_posts_slug_key ON public.blog_posts USING btree (slug);

CREATE UNIQUE INDEX campaigns_pkey ON public.ad_campaigns USING btree (id);

CREATE UNIQUE INDEX categories_pkey ON public.categories USING btree (id);

CREATE UNIQUE INDEX categories_slug_key ON public.categories USING btree (slug);

CREATE UNIQUE INDEX comments_pkey ON public.comments USING btree (id);

CREATE UNIQUE INDEX feedback_pkey ON public.feedback USING btree (id);

CREATE INDEX idx_categories_slug ON public.categories USING btree (slug);

CREATE INDEX idx_listings_category_id ON public.listings USING btree (category_id);

CREATE INDEX idx_listings_embedding ON public.listings USING ivfflat (embedding) WITH (lists='100');

CREATE INDEX idx_listings_finder_id ON public.listings USING btree (finder_id);

CREATE INDEX idx_listings_is_active ON public.listings USING btree (is_user_published, is_admin_published);

CREATE INDEX idx_listings_owner_id ON public.listings USING btree (owner_id);

CREATE INDEX idx_listings_slug ON public.listings USING btree (slug);

CREATE INDEX idx_listings_tags_tag_id ON public.listings_tags USING btree (tag_id);

CREATE INDEX idx_listings_title ON public.listings USING btree (title);

CREATE UNIQUE INDEX idx_profiles_email ON public.users USING btree (email);

CREATE INDEX idx_profiles_full_name ON public.users USING btree (full_name);

CREATE INDEX idx_tags_slug ON public.tags USING btree (slug);

CREATE INDEX listings_fts ON public.listings USING gin (fts);

CREATE UNIQUE INDEX listings_pkey ON public.listings USING btree (id);

CREATE UNIQUE INDEX listings_slug_key ON public.listings USING btree (slug);

CREATE UNIQUE INDEX listings_tags_pkey ON public.listings_tags USING btree (listing_id, tag_id);

CREATE UNIQUE INDEX profiles_email_key ON public.users USING btree (email);

CREATE UNIQUE INDEX profiles_id_key ON public.users USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON public.users USING btree (id);

CREATE UNIQUE INDEX profiles_username_key ON public.users USING btree (username);

CREATE UNIQUE INDEX promotions_invoice_url_key ON public.promotions USING btree (stripe_receipt_url);

CREATE UNIQUE INDEX promotions_payment_intent_key ON public.promotions USING btree (stripe_payment_intent);

CREATE UNIQUE INDEX promotions_pkey ON public.promotions USING btree (id);

CREATE UNIQUE INDEX promotions_stripe_id_key ON public.promotions USING btree (stripe_checkout_id);

CREATE UNIQUE INDEX tags_pkey ON public.tags USING btree (id);

CREATE UNIQUE INDEX tags_slug_key ON public.tags USING btree (slug);

CREATE UNIQUE INDEX topics_pkey ON public.topics USING btree (id);

CREATE UNIQUE INDEX topics_slug_key ON public.topics USING btree (slug);

CREATE UNIQUE INDEX user_searches_pkey ON public.activities USING btree (id);

alter table "public"."activities" add constraint "user_searches_pkey" PRIMARY KEY using index "user_searches_pkey";

alter table "public"."ad_campaigns" add constraint "campaigns_pkey" PRIMARY KEY using index "campaigns_pkey";

alter table "public"."blog_posts" add constraint "blog_posts_pkey" PRIMARY KEY using index "blog_posts_pkey";

alter table "public"."categories" add constraint "categories_pkey" PRIMARY KEY using index "categories_pkey";

alter table "public"."comments" add constraint "comments_pkey" PRIMARY KEY using index "comments_pkey";

alter table "public"."feedback" add constraint "feedback_pkey" PRIMARY KEY using index "feedback_pkey";

alter table "public"."listings" add constraint "listings_pkey" PRIMARY KEY using index "listings_pkey";

alter table "public"."listings_tags" add constraint "listings_tags_pkey" PRIMARY KEY using index "listings_tags_pkey";

alter table "public"."promotions" add constraint "promotions_pkey" PRIMARY KEY using index "promotions_pkey";

alter table "public"."tags" add constraint "tags_pkey" PRIMARY KEY using index "tags_pkey";

alter table "public"."topics" add constraint "topics_pkey" PRIMARY KEY using index "topics_pkey";

alter table "public"."users" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."activities" add constraint "user_searches_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) not valid;

alter table "public"."activities" validate constraint "user_searches_user_id_fkey";

alter table "public"."blog_posts" add constraint "blog_posts_slug_key" UNIQUE using index "blog_posts_slug_key";

alter table "public"."blog_posts" add constraint "blog_posts_topic_id_fkey" FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE SET NULL not valid;

alter table "public"."blog_posts" validate constraint "blog_posts_topic_id_fkey";

alter table "public"."blog_posts" add constraint "blog_posts_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."blog_posts" validate constraint "blog_posts_user_id_fkey";

alter table "public"."categories" add constraint "categories_slug_key" UNIQUE using index "categories_slug_key";

alter table "public"."comments" add constraint "comments_blog_post_id_fkey" FOREIGN KEY (blog_post_id) REFERENCES blog_posts(id) ON DELETE CASCADE not valid;

alter table "public"."comments" validate constraint "comments_blog_post_id_fkey";

alter table "public"."comments" add constraint "comments_content_check" CHECK ((char_length(content) <= 1000)) not valid;

alter table "public"."comments" validate constraint "comments_content_check";

alter table "public"."comments" add constraint "comments_listing_id_fkey" FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE not valid;

alter table "public"."comments" validate constraint "comments_listing_id_fkey";

alter table "public"."comments" add constraint "comments_parent_comment_id_fkey" FOREIGN KEY (parent_comment_id) REFERENCES comments(id) ON DELETE CASCADE not valid;

alter table "public"."comments" validate constraint "comments_parent_comment_id_fkey";

alter table "public"."comments" add constraint "comments_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."comments" validate constraint "comments_user_id_fkey";

alter table "public"."listings" add constraint "listings_category_id_fkey" FOREIGN KEY (category_id) REFERENCES categories(id) not valid;

alter table "public"."listings" validate constraint "listings_category_id_fkey";

alter table "public"."listings" add constraint "listings_finder_id_fkey" FOREIGN KEY (finder_id) REFERENCES users(id) not valid;

alter table "public"."listings" validate constraint "listings_finder_id_fkey";

alter table "public"."listings" add constraint "listings_owner_id_fkey" FOREIGN KEY (owner_id) REFERENCES users(id) not valid;

alter table "public"."listings" validate constraint "listings_owner_id_fkey";

alter table "public"."listings" add constraint "listings_slug_key" UNIQUE using index "listings_slug_key";

alter table "public"."listings_tags" add constraint "listings_tags_listing_id_fkey" FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE not valid;

alter table "public"."listings_tags" validate constraint "listings_tags_listing_id_fkey";

alter table "public"."listings_tags" add constraint "listings_tags_tag_id_fkey" FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE not valid;

alter table "public"."listings_tags" validate constraint "listings_tags_tag_id_fkey";

alter table "public"."promotions" add constraint "promotions_category_id_fkey" FOREIGN KEY (category_id) REFERENCES categories(id) not valid;

alter table "public"."promotions" validate constraint "promotions_category_id_fkey";

alter table "public"."promotions" add constraint "promotions_invoice_url_key" UNIQUE using index "promotions_invoice_url_key";

alter table "public"."promotions" add constraint "promotions_listing_id_fkey" FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE not valid;

alter table "public"."promotions" validate constraint "promotions_listing_id_fkey";

alter table "public"."promotions" add constraint "promotions_payment_intent_key" UNIQUE using index "promotions_payment_intent_key";

alter table "public"."promotions" add constraint "promotions_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."promotions" validate constraint "promotions_profile_id_fkey";

alter table "public"."promotions" add constraint "promotions_stripe_id_key" UNIQUE using index "promotions_stripe_id_key";

alter table "public"."tags" add constraint "tags_slug_key" UNIQUE using index "tags_slug_key";

alter table "public"."topics" add constraint "topics_slug_key" UNIQUE using index "topics_slug_key";

alter table "public"."users" add constraint "profiles_email_key" UNIQUE using index "profiles_email_key";

alter table "public"."users" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) not valid;

alter table "public"."users" validate constraint "profiles_id_fkey";

alter table "public"."users" add constraint "profiles_id_key" UNIQUE using index "profiles_id_key";

alter table "public"."users" add constraint "profiles_username_key" UNIQUE using index "profiles_username_key";

alter table "public"."users" add constraint "username_length" CHECK ((char_length(username) >= 3)) not valid;

alter table "public"."users" validate constraint "username_length";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_active_categories()
 RETURNS TABLE(id uuid, name text, slug text)
 LANGUAGE sql
 STABLE
AS $function$ select distinct c.id, c.name, c.slug from categories c join listings l on c.id = l.category_id; $function$
;

CREATE OR REPLACE FUNCTION public.get_active_tags()
 RETURNS TABLE(id uuid, name text, slug text)
 LANGUAGE sql
 STABLE
AS $function$
  select distinct t.id, t.name, t.slug
  from tags t
  join listings_tags lt on t.id = lt.tag_id;
$function$
;

CREATE OR REPLACE FUNCTION public.get_active_topics()
 RETURNS TABLE(id uuid, name text, slug text)
 LANGUAGE sql
AS $function$
select
    t.id,
    t.name,
    t.slug
from
    topics t
where
    exists (
        select 1
        from blog_posts bp
        where bp.topic_id = t.id
        and bp.is_admin_approved = true
        and bp.is_user_published = true
    )
order by
    t.name;
$function$
;

CREATE OR REPLACE FUNCTION public.get_categories_with_listing_count()
 RETURNS TABLE(id uuid, name text, slug text, headline text, listing_count bigint)
 LANGUAGE sql
AS $function$
select
    c.id,
    c.name,
    c.slug,
    c.headline,
    count(l.id) as listing_count
from
    categories c
left join
    listings l on l.category_id = c.id
where
    l.is_user_published = true
    and l.is_admin_published = true
group by
    c.id, c.name, c.slug, c.headline
order by
    c.name;
$function$
;

CREATE OR REPLACE FUNCTION public.get_full_active_categories()
 RETURNS TABLE(id uuid, name text, slug text, headline text, description text)
 LANGUAGE sql
 STABLE
AS $function$select distinct c.id, c.name, c.slug, c.headline, c.description
  from categories c 
  join listings l on c.id = l.category_id
  where
    l.is_user_published = true
    and l.is_admin_published = true;$function$
;

CREATE OR REPLACE FUNCTION public.get_full_active_tags()
 RETURNS TABLE(id uuid, name text, slug text, headline text, description text)
 LANGUAGE sql
 STABLE
AS $function$
  select distinct t.id, t.name, t.slug, t.headline, t.description
  from tags t
  join listings_tags lt on t.id = lt.tag_id;
$function$
;

CREATE OR REPLACE FUNCTION public.get_listing_statistics(logged_user_id uuid DEFAULT NULL::uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$declare
    result jsonb;
begin
  select jsonb_build_object(
    'total_listings', count(l.id),
    'total_promotions', coalesce(sum(l.is_promoted::int)),
    'total_likes', coalesce(sum(l.likes), 0),
    'total_views', coalesce(sum(l.views), 0),
    'total_clicks', coalesce(sum(l.clicks), 0),
    'total_ratings', coalesce(sum(l.ratings_count), 0),
    'total_claims', count(l.owner_id)
  )
  into result
  from listings l
  where
    (logged_user_id is null or l.finder_id = logged_user_id)
    and l.is_user_published = true
    and l.is_admin_published = true;

  return result;
end;$function$
;

CREATE OR REPLACE FUNCTION public.get_user_usernames()
 RETURNS TABLE(username text)
 LANGUAGE sql
AS $function$select distinct u.username
    from users u
    join listings l on u.id = l.owner_id;$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  insert into public.users (id, email)
  values (new.id, new.email);
  return new;
end;
$function$
;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

CREATE OR REPLACE FUNCTION public.increment_field(listing_id uuid, field_name text)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
begin
  execute format('update listings set %I = %I + 1 where id = %L', field_name, field_name, listing_id);
end;
$function$
;

CREATE OR REPLACE FUNCTION public.match_listings(embedding vector, match_threshold double precision, match_count integer)
 RETURNS TABLE(id uuid, title text, similarity double precision)
 LANGUAGE plpgsql
AS $function$
#variable_conflict use_variable
begin
  return query
  select
    listings.id,
    listings.title,
    (listings.embedding <#> embedding) * -1 as similarity
  from listings

  -- The dot product is negative because of a Postgres limitation, so we negate it
  where (listings.embedding <#> embedding) * -1 > match_threshold

  -- OpenAI embeddings are normalized to length 1, so
  -- cosine similarity and dot product will produce the same results.
  -- Using dot product which can be computed slightly faster.
  --
  -- For the different syntaxes, see https://github.com/pgvector/pgvector
  order by listings.embedding <#> embedding

  limit match_count;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.update_rating(listing_id uuid, new_rating numeric)
 RETURNS void
 LANGUAGE plpgsql
AS $function$begin
    update listings
    set
        ratings_count = ratings_count + 1,
        average_rating = case 
        when ratings_count = 0 then new_rating 
        else (average_rating * (ratings_count - 1) + new_rating) / ratings_count
        end
    where id = listing_id;
end;$function$
;

grant delete on table "public"."activities" to "anon";

grant insert on table "public"."activities" to "anon";

grant references on table "public"."activities" to "anon";

grant select on table "public"."activities" to "anon";

grant trigger on table "public"."activities" to "anon";

grant truncate on table "public"."activities" to "anon";

grant update on table "public"."activities" to "anon";

grant delete on table "public"."activities" to "authenticated";

grant insert on table "public"."activities" to "authenticated";

grant references on table "public"."activities" to "authenticated";

grant select on table "public"."activities" to "authenticated";

grant trigger on table "public"."activities" to "authenticated";

grant truncate on table "public"."activities" to "authenticated";

grant update on table "public"."activities" to "authenticated";

grant delete on table "public"."activities" to "service_role";

grant insert on table "public"."activities" to "service_role";

grant references on table "public"."activities" to "service_role";

grant select on table "public"."activities" to "service_role";

grant trigger on table "public"."activities" to "service_role";

grant truncate on table "public"."activities" to "service_role";

grant update on table "public"."activities" to "service_role";

grant delete on table "public"."ad_campaigns" to "anon";

grant insert on table "public"."ad_campaigns" to "anon";

grant references on table "public"."ad_campaigns" to "anon";

grant select on table "public"."ad_campaigns" to "anon";

grant trigger on table "public"."ad_campaigns" to "anon";

grant truncate on table "public"."ad_campaigns" to "anon";

grant update on table "public"."ad_campaigns" to "anon";

grant delete on table "public"."ad_campaigns" to "authenticated";

grant insert on table "public"."ad_campaigns" to "authenticated";

grant references on table "public"."ad_campaigns" to "authenticated";

grant select on table "public"."ad_campaigns" to "authenticated";

grant trigger on table "public"."ad_campaigns" to "authenticated";

grant truncate on table "public"."ad_campaigns" to "authenticated";

grant update on table "public"."ad_campaigns" to "authenticated";

grant delete on table "public"."ad_campaigns" to "service_role";

grant insert on table "public"."ad_campaigns" to "service_role";

grant references on table "public"."ad_campaigns" to "service_role";

grant select on table "public"."ad_campaigns" to "service_role";

grant trigger on table "public"."ad_campaigns" to "service_role";

grant truncate on table "public"."ad_campaigns" to "service_role";

grant update on table "public"."ad_campaigns" to "service_role";

grant delete on table "public"."blog_posts" to "anon";

grant insert on table "public"."blog_posts" to "anon";

grant references on table "public"."blog_posts" to "anon";

grant select on table "public"."blog_posts" to "anon";

grant trigger on table "public"."blog_posts" to "anon";

grant truncate on table "public"."blog_posts" to "anon";

grant update on table "public"."blog_posts" to "anon";

grant delete on table "public"."blog_posts" to "authenticated";

grant insert on table "public"."blog_posts" to "authenticated";

grant references on table "public"."blog_posts" to "authenticated";

grant select on table "public"."blog_posts" to "authenticated";

grant trigger on table "public"."blog_posts" to "authenticated";

grant truncate on table "public"."blog_posts" to "authenticated";

grant update on table "public"."blog_posts" to "authenticated";

grant delete on table "public"."blog_posts" to "service_role";

grant insert on table "public"."blog_posts" to "service_role";

grant references on table "public"."blog_posts" to "service_role";

grant select on table "public"."blog_posts" to "service_role";

grant trigger on table "public"."blog_posts" to "service_role";

grant truncate on table "public"."blog_posts" to "service_role";

grant update on table "public"."blog_posts" to "service_role";

grant delete on table "public"."categories" to "anon";

grant insert on table "public"."categories" to "anon";

grant references on table "public"."categories" to "anon";

grant select on table "public"."categories" to "anon";

grant trigger on table "public"."categories" to "anon";

grant truncate on table "public"."categories" to "anon";

grant update on table "public"."categories" to "anon";

grant delete on table "public"."categories" to "authenticated";

grant insert on table "public"."categories" to "authenticated";

grant references on table "public"."categories" to "authenticated";

grant select on table "public"."categories" to "authenticated";

grant trigger on table "public"."categories" to "authenticated";

grant truncate on table "public"."categories" to "authenticated";

grant update on table "public"."categories" to "authenticated";

grant delete on table "public"."categories" to "service_role";

grant insert on table "public"."categories" to "service_role";

grant references on table "public"."categories" to "service_role";

grant select on table "public"."categories" to "service_role";

grant trigger on table "public"."categories" to "service_role";

grant truncate on table "public"."categories" to "service_role";

grant update on table "public"."categories" to "service_role";

grant delete on table "public"."comments" to "anon";

grant insert on table "public"."comments" to "anon";

grant references on table "public"."comments" to "anon";

grant select on table "public"."comments" to "anon";

grant trigger on table "public"."comments" to "anon";

grant truncate on table "public"."comments" to "anon";

grant update on table "public"."comments" to "anon";

grant delete on table "public"."comments" to "authenticated";

grant insert on table "public"."comments" to "authenticated";

grant references on table "public"."comments" to "authenticated";

grant select on table "public"."comments" to "authenticated";

grant trigger on table "public"."comments" to "authenticated";

grant truncate on table "public"."comments" to "authenticated";

grant update on table "public"."comments" to "authenticated";

grant delete on table "public"."comments" to "service_role";

grant insert on table "public"."comments" to "service_role";

grant references on table "public"."comments" to "service_role";

grant select on table "public"."comments" to "service_role";

grant trigger on table "public"."comments" to "service_role";

grant truncate on table "public"."comments" to "service_role";

grant update on table "public"."comments" to "service_role";

grant delete on table "public"."feedback" to "anon";

grant insert on table "public"."feedback" to "anon";

grant references on table "public"."feedback" to "anon";

grant select on table "public"."feedback" to "anon";

grant trigger on table "public"."feedback" to "anon";

grant truncate on table "public"."feedback" to "anon";

grant update on table "public"."feedback" to "anon";

grant delete on table "public"."feedback" to "authenticated";

grant insert on table "public"."feedback" to "authenticated";

grant references on table "public"."feedback" to "authenticated";

grant select on table "public"."feedback" to "authenticated";

grant trigger on table "public"."feedback" to "authenticated";

grant truncate on table "public"."feedback" to "authenticated";

grant update on table "public"."feedback" to "authenticated";

grant delete on table "public"."feedback" to "service_role";

grant insert on table "public"."feedback" to "service_role";

grant references on table "public"."feedback" to "service_role";

grant select on table "public"."feedback" to "service_role";

grant trigger on table "public"."feedback" to "service_role";

grant truncate on table "public"."feedback" to "service_role";

grant update on table "public"."feedback" to "service_role";

grant delete on table "public"."listings" to "anon";

grant insert on table "public"."listings" to "anon";

grant references on table "public"."listings" to "anon";

grant select on table "public"."listings" to "anon";

grant trigger on table "public"."listings" to "anon";

grant truncate on table "public"."listings" to "anon";

grant update on table "public"."listings" to "anon";

grant delete on table "public"."listings" to "authenticated";

grant insert on table "public"."listings" to "authenticated";

grant references on table "public"."listings" to "authenticated";

grant select on table "public"."listings" to "authenticated";

grant trigger on table "public"."listings" to "authenticated";

grant truncate on table "public"."listings" to "authenticated";

grant update on table "public"."listings" to "authenticated";

grant delete on table "public"."listings" to "service_role";

grant insert on table "public"."listings" to "service_role";

grant references on table "public"."listings" to "service_role";

grant select on table "public"."listings" to "service_role";

grant trigger on table "public"."listings" to "service_role";

grant truncate on table "public"."listings" to "service_role";

grant update on table "public"."listings" to "service_role";

grant delete on table "public"."listings_tags" to "anon";

grant insert on table "public"."listings_tags" to "anon";

grant references on table "public"."listings_tags" to "anon";

grant select on table "public"."listings_tags" to "anon";

grant trigger on table "public"."listings_tags" to "anon";

grant truncate on table "public"."listings_tags" to "anon";

grant update on table "public"."listings_tags" to "anon";

grant delete on table "public"."listings_tags" to "authenticated";

grant insert on table "public"."listings_tags" to "authenticated";

grant references on table "public"."listings_tags" to "authenticated";

grant select on table "public"."listings_tags" to "authenticated";

grant trigger on table "public"."listings_tags" to "authenticated";

grant truncate on table "public"."listings_tags" to "authenticated";

grant update on table "public"."listings_tags" to "authenticated";

grant delete on table "public"."listings_tags" to "service_role";

grant insert on table "public"."listings_tags" to "service_role";

grant references on table "public"."listings_tags" to "service_role";

grant select on table "public"."listings_tags" to "service_role";

grant trigger on table "public"."listings_tags" to "service_role";

grant truncate on table "public"."listings_tags" to "service_role";

grant update on table "public"."listings_tags" to "service_role";

grant delete on table "public"."promotions" to "anon";

grant insert on table "public"."promotions" to "anon";

grant references on table "public"."promotions" to "anon";

grant select on table "public"."promotions" to "anon";

grant trigger on table "public"."promotions" to "anon";

grant truncate on table "public"."promotions" to "anon";

grant update on table "public"."promotions" to "anon";

grant delete on table "public"."promotions" to "authenticated";

grant insert on table "public"."promotions" to "authenticated";

grant references on table "public"."promotions" to "authenticated";

grant select on table "public"."promotions" to "authenticated";

grant trigger on table "public"."promotions" to "authenticated";

grant truncate on table "public"."promotions" to "authenticated";

grant update on table "public"."promotions" to "authenticated";

grant delete on table "public"."promotions" to "service_role";

grant insert on table "public"."promotions" to "service_role";

grant references on table "public"."promotions" to "service_role";

grant select on table "public"."promotions" to "service_role";

grant trigger on table "public"."promotions" to "service_role";

grant truncate on table "public"."promotions" to "service_role";

grant update on table "public"."promotions" to "service_role";

grant delete on table "public"."tags" to "anon";

grant insert on table "public"."tags" to "anon";

grant references on table "public"."tags" to "anon";

grant select on table "public"."tags" to "anon";

grant trigger on table "public"."tags" to "anon";

grant truncate on table "public"."tags" to "anon";

grant update on table "public"."tags" to "anon";

grant delete on table "public"."tags" to "authenticated";

grant insert on table "public"."tags" to "authenticated";

grant references on table "public"."tags" to "authenticated";

grant select on table "public"."tags" to "authenticated";

grant trigger on table "public"."tags" to "authenticated";

grant truncate on table "public"."tags" to "authenticated";

grant update on table "public"."tags" to "authenticated";

grant delete on table "public"."tags" to "service_role";

grant insert on table "public"."tags" to "service_role";

grant references on table "public"."tags" to "service_role";

grant select on table "public"."tags" to "service_role";

grant trigger on table "public"."tags" to "service_role";

grant truncate on table "public"."tags" to "service_role";

grant update on table "public"."tags" to "service_role";

grant delete on table "public"."topics" to "anon";

grant insert on table "public"."topics" to "anon";

grant references on table "public"."topics" to "anon";

grant select on table "public"."topics" to "anon";

grant trigger on table "public"."topics" to "anon";

grant truncate on table "public"."topics" to "anon";

grant update on table "public"."topics" to "anon";

grant delete on table "public"."topics" to "authenticated";

grant insert on table "public"."topics" to "authenticated";

grant references on table "public"."topics" to "authenticated";

grant select on table "public"."topics" to "authenticated";

grant trigger on table "public"."topics" to "authenticated";

grant truncate on table "public"."topics" to "authenticated";

grant update on table "public"."topics" to "authenticated";

grant delete on table "public"."topics" to "service_role";

grant insert on table "public"."topics" to "service_role";

grant references on table "public"."topics" to "service_role";

grant select on table "public"."topics" to "service_role";

grant trigger on table "public"."topics" to "service_role";

grant truncate on table "public"."topics" to "service_role";

grant update on table "public"."topics" to "service_role";

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";

create policy "Allow admin users to delete user searches"
on "public"."activities"
as permissive
for delete
to public
using ((EXISTS ( SELECT 1
   FROM users
  WHERE ((users.id = auth.uid()) AND (users.is_super_admin = true)))));


create policy "Allow admin users to select user searches"
on "public"."activities"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM users
  WHERE ((users.id = auth.uid()) AND (users.is_super_admin = true)))));


create policy "Allow admin users to update user searches"
on "public"."activities"
as permissive
for update
to public
using ((EXISTS ( SELECT 1
   FROM users
  WHERE ((users.id = auth.uid()) AND (users.is_super_admin = true)))));


create policy "Allow everyone to insert user searches"
on "public"."activities"
as permissive
for insert
to public
with check (true);


create policy "Allow admin users to delete campaigns"
on "public"."ad_campaigns"
as permissive
for delete
to public
using ((EXISTS ( SELECT 1
   FROM users
  WHERE ((users.id = auth.uid()) AND (users.is_super_admin = true)))));


create policy "Allow admin users to insert campaigns"
on "public"."ad_campaigns"
as permissive
for insert
to public
with check ((EXISTS ( SELECT 1
   FROM users
  WHERE ((users.id = auth.uid()) AND (users.is_super_admin = true)))));


create policy "Allow admin users to update campaigns"
on "public"."ad_campaigns"
as permissive
for update
to public
using ((EXISTS ( SELECT 1
   FROM users
  WHERE ((users.id = auth.uid()) AND (users.is_super_admin = true)))));


create policy "Enable read access for all users"
on "public"."ad_campaigns"
as permissive
for select
to public
using (true);


create policy "Public can view published blog posts"
on "public"."blog_posts"
as permissive
for select
to public
using ((is_admin_approved = true));


create policy "Super-admins can manage all blog posts"
on "public"."blog_posts"
as permissive
for all
to public
using ((EXISTS ( SELECT 1
   FROM users
  WHERE ((users.id = auth.uid()) AND (users.is_super_admin = true)))))
with check ((EXISTS ( SELECT 1
   FROM users
  WHERE ((users.id = auth.uid()) AND (users.is_super_admin = true)))));


create policy "Users can manage their own blog posts"
on "public"."blog_posts"
as permissive
for all
to public
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));


create policy "Public categories are viewable by everyone."
on "public"."categories"
as permissive
for select
to public
using (true);


create policy "Super-admins can manage categories"
on "public"."categories"
as permissive
for all
to public
using ((EXISTS ( SELECT 1
   FROM users
  WHERE ((users.id = auth.uid()) AND (users.is_super_admin = true)))));


create policy "Allow admin users to delete comments"
on "public"."comments"
as permissive
for delete
to public
using ((EXISTS ( SELECT 1
   FROM users
  WHERE ((users.id = auth.uid()) AND (users.is_super_admin = true)))));


create policy "Allow admin users to select all comments"
on "public"."comments"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM users
  WHERE ((users.id = auth.uid()) AND (users.is_super_admin = true)))));


create policy "Allow admin users to update comments"
on "public"."comments"
as permissive
for update
to public
using ((EXISTS ( SELECT 1
   FROM users
  WHERE ((users.id = auth.uid()) AND (users.is_super_admin = true)))));


create policy "Allow authenticated users to insert comments"
on "public"."comments"
as permissive
for insert
to public
with check ((auth.role() = 'authenticated'::text));


create policy "Allow everyone to select approved comments"
on "public"."comments"
as permissive
for select
to public
using ((is_approved = true));


create policy "Allow admin users to delete feedback"
on "public"."feedback"
as permissive
for delete
to public
using ((EXISTS ( SELECT 1
   FROM users
  WHERE ((users.id = auth.uid()) AND (users.is_super_admin = true)))));


create policy "Allow admin users to select feedback"
on "public"."feedback"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM users
  WHERE ((users.id = auth.uid()) AND (users.is_super_admin = true)))));


create policy "Allow admin users to update feedback"
on "public"."feedback"
as permissive
for update
to public
using ((EXISTS ( SELECT 1
   FROM users
  WHERE ((users.id = auth.uid()) AND (users.is_super_admin = true)))));


create policy "Allow everyone to insert feedback"
on "public"."feedback"
as permissive
for insert
to public
with check (true);


create policy "Public listings are viewable by everyone."
on "public"."listings"
as permissive
for select
to public
using (true);


create policy "Super admins can update any listing"
on "public"."listings"
as permissive
for update
to public
using ((auth.uid() = ( SELECT users.id
   FROM users
  WHERE ((users.id = auth.uid()) AND users.is_super_admin))));


create policy "Users can insert their own listing."
on "public"."listings"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) = finder_id));


create policy "Users can update their own listing."
on "public"."listings"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) = finder_id));


create policy "Allow authenticated users to delete listings_tags"
on "public"."listings_tags"
as permissive
for delete
to public
using ((auth.role() = 'authenticated'::text));


create policy "Allow authenticated users to insert listings_tags"
on "public"."listings_tags"
as permissive
for insert
to public
with check ((auth.role() = 'authenticated'::text));


create policy "Allow authenticated users to select listings_tags"
on "public"."listings_tags"
as permissive
for select
to public
using ((auth.role() = 'authenticated'::text));


create policy "Allow authenticated users to update listing_tags"
on "public"."listings_tags"
as permissive
for update
to public
using ((auth.role() = 'authenticated'::text));


create policy "Allow everyone to select listings_tags"
on "public"."listings_tags"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."listings_tags"
as permissive
for select
to public
using (true);


create policy "Allow admins to delete promotions"
on "public"."promotions"
as permissive
for delete
to public
using ((EXISTS ( SELECT 1
   FROM users
  WHERE ((users.id = auth.uid()) AND (users.is_super_admin = true)))));


create policy "Allow authenticated users to insert promotions"
on "public"."promotions"
as permissive
for insert
to public
with check ((auth.role() = 'authenticated'::text));


create policy "Allow everyone to update promotions"
on "public"."promotions"
as permissive
for update
to public
using (true);


create policy "Allow users to select their promotions"
on "public"."promotions"
as permissive
for select
to public
using (true);


create policy "Public tags are viewable by everyone."
on "public"."tags"
as permissive
for select
to public
using (true);


create policy "Super-admins can manage tags"
on "public"."tags"
as permissive
for all
to public
using ((EXISTS ( SELECT 1
   FROM users
  WHERE ((users.id = auth.uid()) AND (users.is_super_admin = true)))));


create policy "Public topics are viewable by everyone."
on "public"."topics"
as permissive
for select
to public
using (true);


create policy "Super-admins can manage categories"
on "public"."topics"
as permissive
for all
to public
using ((EXISTS ( SELECT 1
   FROM users
  WHERE ((users.id = auth.uid()) AND (users.is_super_admin = true)))));


create policy "Public profiles are viewable by everyone."
on "public"."users"
as permissive
for select
to public
using (true);


create policy "Super-admins can update any profile field"
on "public"."users"
as permissive
for update
to public
using ((EXISTS ( SELECT 1
   FROM users users_1
  WHERE ((users_1.id = auth.uid()) AND (users_1.is_super_admin = true)))));


create policy "Users can insert their own profile."
on "public"."users"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) = id));


create policy "Users can update own profile."
on "public"."users"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) = id));


create policy "Users can update their own profile except is_super_admin"
on "public"."users"
as permissive
for update
to public
using ((auth.uid() = id))
with check (((auth.uid() = id) AND (is_super_admin = ( SELECT users_1.is_super_admin
   FROM users users_1
  WHERE (users_1.id = auth.uid())))));

create policy "Allow admin users to delete ad images"
on "storage"."objects"
as permissive
for delete
to public
using (((bucket_id = 'ad_images'::text) AND (auth.role() = 'authenticated'::text) AND (EXISTS ( SELECT 1
   FROM users
  WHERE ((users.id = auth.uid()) AND (users.is_super_admin = true))))));


create policy "Allow admin users to update ad images"
on "storage"."objects"
as permissive
for update
to public
using (((bucket_id = 'ad_images'::text) AND (auth.role() = 'authenticated'::text) AND (EXISTS ( SELECT 1
   FROM users
  WHERE ((users.id = auth.uid()) AND (users.is_super_admin = true))))));


create policy "Allow admin users to upload ad images"
on "storage"."objects"
as permissive
for insert
to public
with check (((bucket_id = 'ad_images'::text) AND (auth.role() = 'authenticated'::text) AND (EXISTS ( SELECT 1
   FROM users
  WHERE ((users.id = auth.uid()) AND (users.is_super_admin = true))))));


create policy "Allow authenticated Users to delete their listing images"
on "storage"."objects"
as permissive
for delete
to public
using (((bucket_id = 'listing_images'::text) AND (auth.role() = 'authenticated'::text) AND (auth.uid() = owner)));


create policy "Allow authenticated Users to insert listing images"
on "storage"."objects"
as permissive
for insert
to public
with check (((bucket_id = 'listing_images'::text) AND (auth.role() = 'authenticated'::text)));


create policy "Allow authenticated users to delete their blog images"
on "storage"."objects"
as permissive
for delete
to public
using (((bucket_id = 'blog_images'::text) AND (auth.role() = 'authenticated'::text) AND (auth.uid() = owner)));


create policy "Allow authenticated users to update their blog images"
on "storage"."objects"
as permissive
for update
to public
using (((bucket_id = 'blog_images'::text) AND (auth.role() = 'authenticated'::text) AND (auth.uid() = owner)));


create policy "Allow authenticated users to upload blog images"
on "storage"."objects"
as permissive
for insert
to public
with check (((bucket_id = 'blog_images'::text) AND (auth.role() = 'authenticated'::text)));


create policy "Allow read access to ad images"
on "storage"."objects"
as permissive
for select
to public
using ((bucket_id = 'ad_images'::text));


create policy "Allow read access to blog images"
on "storage"."objects"
as permissive
for select
to public
using ((bucket_id = 'blog_images'::text));


create policy "Anyone can update their own avatar."
on "storage"."objects"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) = owner))
with check ((bucket_id = 'avatars'::text));


create policy "Anyone can update their own listing image."
on "storage"."objects"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) = owner))
with check ((bucket_id = 'listing_images'::text));


create policy "Anyone can upload an avatar."
on "storage"."objects"
as permissive
for insert
to public
with check ((bucket_id = 'avatars'::text));


create policy "Authenticated Users can update listing images"
on "storage"."objects"
as permissive
for update
to public
using (((bucket_id = 'listing_images'::text) AND (auth.role() = 'authenticated'::text) AND (auth.uid() = owner)));


create policy "Avatar images are publicly accessible."
on "storage"."objects"
as permissive
for select
to public
using ((bucket_id = 'avatars'::text));


create policy "Listing images are publicly accessible."
on "storage"."objects"
as permissive
for select
to public
using ((bucket_id = 'listing_images'::text));

