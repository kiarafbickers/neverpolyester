"use server";

// Import Types
// Import External Packages
// Import Components
// Import Functions & Actions & Hooks & State
import createSupabaseBrowserClient from "@/lib/createSupabaseBrowserClient";
import insertActivity from "@/actions/activites/insertActivity";
import { listingParams } from "@/lib/supabaseQueries";
// Import Data
// Import Assets & Icons
// Import Error Handling
import {
  InternalServerError,
  handleServerError,
  handleServerSuccess,
} from "@/lib/handlingServerResponses";

/**
 * Retrieves published listings from the database based on the specified filters.
 * @param limit - The maximum number of listings to retrieve.
 * @param skipId - The ID of the listing to skip.
 * @param searchTerm - The search term to match against listing titles.
 * @param tagArray - An array of tags to filter the listings by.
 * @param categoryFilter - The category to filter the listings by.
 * @returns An array of published listings that match the specified filters.
 */
export default async function getPublishedListings(
  limit?: number,
  skipId?: string | null,
  searchTerm?: string | null,
  tagArray?: string[] | null,
  categoryFilter?: string | null,
  sortByKey?: string | null,
  sortByOrder?: boolean | null
) {
  try {
    const supabase = createSupabaseBrowserClient();

    let query = supabase.from("listings").select(listingParams).match({
      is_user_published: true,
      is_admin_published: true,
    });

    // Apply category filter if provided
    if (categoryFilter) {
      query = query.eq("category.slug", categoryFilter);
    }

    // Apply search term if provided
    if (searchTerm) {
      query = query.textSearch("fts", searchTerm.replace(/\s+/g, " & "));
      await insertActivity("new_search", searchTerm);
    }

    // Exclude a specific listing ID if provided
    if (skipId) {
      query = query.not("id", "eq", skipId);
    }

    // Apply sorting and limit
    query = query
      .order(sortByKey || "created_at", { ascending: sortByOrder || false })
      .limit(limit || 200);

    const { data: listingData, error } = await query;

    if (error) {
      console.error("Error getting published listings:", error);
      throw new InternalServerError(
        "Error getting published listings. Contact Support."
      );
    }

    // Filter by tags if provided
    const results = listingData.filter((listing) => {
      if (tagArray && tagArray.length > 0) {
        const listingTags = listing.tags.map((tag) => tag.slug);
        return tagArray.every((tag) => listingTags.includes(tag));
      }
      return true;
    });

    return handleServerSuccess(results);
  } catch (error) {
    return handleServerError(error, []);
  }
}
