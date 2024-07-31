// Import Types
// Import External Packages
// Import Components
// Import Functions & Actions & Hooks & State
import createSupabaseBrowserClient from '@/lib/createSupabaseBrowserClient';
import { QueryData } from '@supabase/supabase-js';
// Import Data
// Import Assets & Icons

// CUSTOME SUPABASE QUERIES to EXPORT TYPES

const supabase = createSupabaseBrowserClient();

const listings = supabase.from('listings').select(`
id, created_at, default_image_url, is_promoted, owner_id, slug, title, category_id, excerpt, average_rating, ratings_count, likes, views,updated_at, click_url, clicks, description, is_admin_published, is_user_published, is_promoted,
category:categories!inner(id, name, slug),
tags ( id, name, slug ),
owner:users!owner_id(id, username, avatar_url)
`);
export type ListingsType = QueryData<typeof listings>;
export type ListingType = ListingsType[0];

const allTagsQuery = supabase.from('tags').select(`id, name, slug`);
export type TagType = QueryData<typeof allTagsQuery>[0];

const allCategoriesQuery = supabase.from('categories').select(`id, name, slug`);
export type CategoryType = QueryData<typeof allCategoriesQuery>[0];

const allTopicQuery = supabase.from('topics').select(`id, name, slug`);
export type TopicType = QueryData<typeof allTopicQuery>[0];

const fullAllTagsQuery = supabase
	.from('tags')
	.select(`id, name, slug, headline, description`);
export type FullTagType = QueryData<typeof fullAllTagsQuery>[0];

const fullAllCategoriesQuery = supabase
	.from('categories')
	.select(`id, name, slug, headline, description`);

export type FullCategoryType = QueryData<typeof fullAllCategoriesQuery>[0];

const slugQuery = supabase.from('listings').select('slug');
export type SlugType = QueryData<typeof slugQuery>[0];

const commentQuery = supabase
	.from('comments')
	.select(
		`*, author:users(username, avatar_url), blog_post_name: blog_posts!blog_post_id(title), listing_name:listings!listing_id(title)`
	);

export type FullCommentType = QueryData<typeof commentQuery>[0];

const fullPromotionQuery = supabase
	.from('promotions')
	.select('*, listing:listings!inner(title), category:categories!inner(name)');

type HalfPromotionType = QueryData<typeof fullPromotionQuery>[0];

export type FullPromotionType = HalfPromotionType & {
	listing_name: string;
	category_name: string;
};
