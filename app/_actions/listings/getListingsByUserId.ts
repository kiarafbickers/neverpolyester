'use server';

// Import Types
// Import External Packages
// Import Components
// Import Functions & Actions & Hooks & State
import createSupabaseRLSClient from '@/lib/createSupabaseRLSClient';
// Import Data
// Import Assets & Icons
// Import Error Handling
import {
	InternalServerError,
	handleServerError,
	handleServerSuccess,
} from '@/lib/handlingServerResponses';

/**
 * Retrieves listings by user ID.
 * @param finder_id - The ID of the user.
 * @returns A Promise that resolves to the retrieved listings.
 */
export default async function getListingsByUserId(finder_id: string) {
	try {
		const supabase = createSupabaseRLSClient();
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
			.match({ finder_id: finder_id });
		if (error) {
			console.error('Error getting listings by users:', error);
			throw new InternalServerError(
				'Error retrieving listings. Contact Support.'
			);
		}
		return handleServerSuccess(data);
	} catch (error) {
		return handleServerError(error, []);
	}
}
