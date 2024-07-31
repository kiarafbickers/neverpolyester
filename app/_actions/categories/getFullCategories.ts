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
	BadRequestError,
	InternalServerError,
	handleServerError,
	handleServerSuccess,
} from '@/lib/handlingServerResponses';

/**
 * Retrieves full categories based on the provided modifier.
 * @param modifier - The modifier to determine the type of categories to retrieve. Can be either 'active' or 'all'.
 * @returns A Promise that resolves to the retrieved categories.
 */
export default async function getFullCategories(modifier: 'active' | 'all') {
	let results;
	try {
		const supabase = createSupabaseBrowserClient();

		if (modifier === 'active') {
			results = await supabase.rpc('get_full_active_categories');
		} else if (modifier === 'all') {
			results = await supabase
				.from('categories')
				.select(`id, name, slug, headline, description`);
		} else {
			throw new BadRequestError('Invalid modifier.');
		}
		const { data, error } = results;

		if (error) {
			console.error('Error getting full categories:', error);
			throw new InternalServerError(
				'Error getting categories. Contact Support.'
			);
		}

		return handleServerSuccess(data);
	} catch (error) {
		return handleServerError(error, []);
	}
}
