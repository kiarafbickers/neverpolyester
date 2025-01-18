"use server";

// Import Types
// Import External Packages
// Import Components
// Import Functions & Actions & Hooks & State
import createSupabaseBrowserClient from "@/lib/createSupabaseBrowserClient";
import {
  InternalServerError,
  handleServerError,
  handleServerSuccess,
} from "@/lib/handlingServerResponses";

/**
 * Retrieves listings with non-empty discount codes, limited to specified columns.
 * @param limit - The maximum number of listings to retrieve.
 * @param filter - Additional filter criteria.
 * @returns An array of listings with non-empty discount codes.
 */
export default async function getListingCoupon(limit = 200, filter = {}) {
  try {
    const supabase = createSupabaseBrowserClient();

    // Build the initial query
    let query = supabase
      .from("listings")
      .select(
        `
                id,
                title,
                discount_code,
                logo_image_url,
                excerpt,
                is_promoted
                `
      ) // Select only the necessary columns
      .not("discount_code", "is", null); // Ensure discount_code is not empty

    // Apply additional filters if provided
    if (Object.keys(filter).length > 0) {
      query = query.match(filter);
    }

    // Apply limit
    query = query.limit(limit);

    const { data: listings, error } = await query;

    if (error) {
      console.error("Error fetching listings with coupons:", error);
      throw new InternalServerError(
        "Error fetching listings with coupons. Contact Support."
      );
    }

    return handleServerSuccess(listings);
  } catch (error) {
    return handleServerError(error, []);
  }
}
