'use server';

// Import Types
// Import External Packages
// Import Components
// Import Functions & Actions & Hooks & State
import createSupabaseRLSClient from '@/lib/createSupabaseRLSClient';
import serverAuth from '@/actions/auth/serverAuth';
// Import Data
// Import Assets & Icons
// Import Error Handling
import {
	InternalServerError,
	UnauthorizedError,
	handleServerError,
	handleServerSuccess,
} from '@/lib/handlingServerResponses';

/**
 * Retrieves all listings for admin users.
 */
export default async function getListings_ALL_ADMIN() {
	try {
		const { isSuperAdmin, error: authError } = await serverAuth({
			mustBeAdmin: true,
		});

		if (authError || !isSuperAdmin) {
			throw new UnauthorizedError('Auth Error.');
		}

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
			.order('is_admin_published', { ascending: true });
		if (error) {
			console.error('Error getting all listings (admin protected):', error);
			throw new InternalServerError(
				'Error getting all listings (admin protected):'
			);
		}
		return handleServerSuccess(data);
	} catch (error) {
		return handleServerError(error, []);
	}
}
