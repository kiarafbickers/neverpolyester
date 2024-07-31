'use server';

// Import Types
// Import External Packages
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
// Import Components
// Import Functions & Actions & Hooks & State
import createSupabaseRLSClient from '@/lib/createSupabaseRLSClient';
import { formDataToObject, stringToSlug } from '@/lib/utils';
// Import Data
// Import Assets & Icons
// Import Error Handling
import {
	InternalServerError,
	HookFormError,
	handleServerError,
	handleServerSuccess,
	ServerResponse,
} from '@/lib/handlingServerResponses';

type CategoryFormState =
	| {
			errors?:
				| {
						name?: string[] | undefined;
						headline?: string[] | undefined;
						description?: string[] | undefined;
				  }
				| undefined;
			success?: boolean | undefined;
	  }
	| undefined;

const CategoryFormSchema = z.object({
	id: z.string().nullable(),
	slug: z.string().nullable(),
	name: z.string().min(2, { message: 'Be at least 2 characters long' }),
	headline: z
		.string()
		.min(10, { message: 'Be at least 10 characters long' })
		.max(60, { message: 'Be at most 60 characters long' }),
	description: z
		.string()
		.min(10, { message: 'Be at least 10 characters long' })
		.max(160, { message: 'Be at most 160 characters long' }),
});

/**
 * Upserts a category in the database.
 *
 * @param state - The state of the category form.
 * @param formData - The form data containing the category information.
 * @returns A promise that resolves to a server response.
 */
export default async function upsertCategory(
	state: CategoryFormState,
	formData: FormData
): Promise<ServerResponse<any, Record<string, string[]>>> {
	try {
		const formatedFormData = formDataToObject(formData);
		const validatedFields = CategoryFormSchema.safeParse(formatedFormData);
		if (!validatedFields.success) {
			throw new HookFormError(
				validatedFields.error.flatten().fieldErrors as CategoryFormState
			);
		}

		const supabase = createSupabaseRLSClient();

		if (!formData.get('id') || formData.get('id') === '') {
			const { error } = await supabase
				.from('categories')
				.insert({
					description: formData.get('description') as string,
					headline: formData.get('headline') as string,
					name: formData.get('name') as string,
					slug: stringToSlug(formData.get('name') as string),
				})
				.single();
			if (error) {
				console.error('Error inserting category:', error);
				throw new InternalServerError('Error storing category.');
			}
		} else {
			const { error } = await supabase
				.from('categories')
				.update({
					description: formData.get('description') as string,
					headline: formData.get('headline') as string,
					name: formData.get('name') as string,
					slug: stringToSlug(formData.get('name') as string),
					updated_at: new Date().toISOString(),
				})
				.eq('id', formData.get('id') as string)
				.single();

			if (error) {
				console.error('Error updating category:', error);
				throw new InternalServerError('Error updating category.');
			}
		}

		revalidatePath('/', 'layout');

		return handleServerSuccess();
	} catch (error) {
		return handleServerError(error, {});
	}
}
