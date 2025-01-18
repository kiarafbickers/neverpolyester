import Link from "next/link";
import { BadgeCheckIcon } from "lucide-react";
import SupabaseImage from "@/components/SupabaseImage";
import { GENERAL_SETTINGS } from "@/constants";
import { AuthUserType, ListingType } from "@/supabase-special-types";

export default function ListingCard({
  listing,
  user,
}: {
  listing: ListingType;
  user: AuthUserType | null;
}) {
  const isNew =
    new Date(listing.created_at || Date.now()) >
    new Date(
      Date.now() -
        GENERAL_SETTINGS.MAX_NUM_DAY_AGE_FOR_NEW_BADGE * 24 * 60 * 60 * 1000
    );

  return (
    <div key={listing.id} className="flex flex-col lg:flex-row overflow-hidden">
      {/* Image */}
      <div className="w-full lg:w-1/3 relative">
        {listing.default_image_url ? (
          <SupabaseImage
            dbImageUrl={listing.default_image_url}
            width={800}
            height={600}
            database="listing_images"
            priority
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="block w-full aspect-[16/9] bg-gray-200 lg:h-full" />
        )}
        <div className="absolute top-2 right-2 flex flex-col space-y-1">
          {listing.is_promoted && (
            <span className="inline-flex items-center rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
              Promoted
            </span>
          )}
          {isNew && (
            <span className="inline-flex items-center rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
              New
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="w-full lg:w-2/3 py-4 flex flex-col justify-between lg:p-4">
        {/* Title */}
        <div>
          <div className="flex items-center space-x-2">
            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-800">
              <Link
                href={`/explore/${listing.slug}`}
                className="hover:underline"
                data-umami-event="Listing Card"
                data-umami-event-listing={listing.slug}
              >
                {listing.title}
              </Link>
            </h3>

            {/* Badge */}
            {listing.owner_id && (
              <div className="inline-flex items-center text-sm text-gray-600">
                <BadgeCheckIcon className="w-4 h-4 text-blue-500" />
                <span className="sr-only">Verified Owner</span>
              </div>
            )}
          </div>

          {/* Voucher Code */}
          {listing.discount_code && (
            <div className="mt-3 flex items-center">
              <p className="text-sm font-medium text-gray-600">Voucher Code:</p>
              {user ? (
                <span className="ml-2 rounded bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
                  {listing.discount_code}
                </span>
              ) : (
                <>
                  <span className="ml-2 rounded bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-800">
                    *****{listing.discount_code.slice(-2)}
                  </span>
                  <span className="ml-2 rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                    Log in to view
                  </span>
                </>
              )}
            </div>
          )}

          {/* Excerpt */}
          <p className="mt-4 text-sm text-gray-700">
            {listing.excerpt || "No description available."}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex space-x-4">
          <Link
            href={`/explore/${listing.slug}`}
            className="inline-flex items-center justify-center rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
}
