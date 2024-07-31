'use server';

// Import Types
// Import External Packages
// Import Components
// Import Functions & Actions & Hooks & State
import createSupabaseBrowserClient from '@/lib/createSupabaseBrowserClient';
// Import Data
// Import Assets & Icons
// Import Error Handling
import {
	InternalServerError,
	handleServerError,
	handleServerSuccess,
} from '@/lib/handlingServerResponses';

/**
 * Retrieves a published listing by its slug.
 * @param slug - The slug of the listing.
 * @returns The data of the published listing, or null if not found or an error occurred.
 */
export default async function getPublishedListingBySlug(slug: string) {
	try {
		const supabase = createSupabaseBrowserClient();

		const { data, error } = await supabase
			.from('listings')
			.select(
				`
				id, created_at, default_image_url, is_promoted, owner_id, slug, title, category_id, excerpt, average_rating, ratings_count, likes, views,updated_at, click_url, clicks, description, is_admin_published, is_user_published, is_promoted,
				category:categories!inner(id, name, slug),
				tags ( id, name, slug ),
				owner:users!owner_id(id, username, avatar_url)
          		`
			)
			.match({ slug: slug, is_user_published: true, is_admin_published: true })
			.single();
		if (error) {
			console.error('Error finding listing by Slug:', error);
			throw new InternalServerError(
				'Error retrieving listings. Contact Support.'
			);
		}

		return handleServerSuccess(data);
	} catch (error) {
		return handleServerError(error, {});
	}
}
