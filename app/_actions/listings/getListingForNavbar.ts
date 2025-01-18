"use server";

import createSupabaseBrowserClient from "@/lib/createSupabaseBrowserClient";
import { InternalServerError } from "@/lib/handlingServerResponses";

/**
 * Retrieves listings for the navbar with specified columns.
 * @param {number | undefined} limit - Optional limit for the number of listings.
 * @returns {Promise<{ data: Listing[] }>} An array of listings wrapped in an object.
 */
export async function getAllListingsForNavbar(
  limit?: number
): Promise<{ data: Listing[] }> {
  try {
    const supabase = createSupabaseBrowserClient();

    let query = supabase
      .from("listings")
      .select("id, title, slug, is_promoted");

    if (limit !== undefined) {
      query = query.limit(limit);
    }

    const { data: listings, error } = await query;

    if (error) {
      console.error("Error fetching all listings:", error);
      throw new InternalServerError(
        "Error fetching all listings. Contact Support."
      );
    }

    return { data: listings ?? [] };
  } catch (error) {
    console.error("Unexpected error fetching all listings:", error);
    return { data: [] }; // Fallback to empty array on error
  }
}

/**
 * Retrieves promoted listings for the navbar with specified columns.
 * @param {number | undefined} limit - Optional limit for the number of promoted listings.
 * @returns {Promise<{ data: Listing[] }>} An array of promoted listings wrapped in an object.
 */
export async function getPromotedListingsForNavbar(
  limit?: number
): Promise<{ data: Listing[] }> {
  try {
    const supabase = createSupabaseBrowserClient();

    let query = supabase
      .from("listings")
      .select("id, title, slug, is_promoted")
      .eq("is_promoted", true);

    if (limit !== undefined) {
      query = query.limit(limit);
    }

    const { data: listings, error } = await query;

    if (error) {
      console.error("Error fetching promoted listings:", error);
      throw new InternalServerError(
        "Error fetching promoted listings. Contact Support."
      );
    }

    return { data: listings ?? [] };
  } catch (error) {
    console.error("Unexpected error fetching promoted listings:", error);
    return { data: [] }; // Fallback to empty array on error
  }
}
