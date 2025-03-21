// Import Types
import { ListingType } from "@/supabase-special-types";
import { SortDirectionObject } from "@/types";
// Import External Packages
import { Suspense } from "react";
import Link from "next/link";
// Import Components
import ListingGrid from "@/components/listings/ListingGrid";
import { buttonVariants } from "@/ui/Button";
import {
  SubSectionOuterContainer,
  SubSectionInnerContainer,
  SubSectionTitle,
  SubSectionContentContainer,
} from "@/ui/Section";
import {
  ImageCard,
  ImageCardDescription,
  ImageCardFooter,
  ImageCardImageContainer,
  ImageCardTitle,
} from "@/ui/ImageCard";
// Import Functions & Actions & Hooks & State
import publishedListingsByAi from "@/actions/listings/getPublishedListingsByAi";
import getPublishedListings from "@/actions/listings/getPublishedListings";
import { cn, stringToSlug } from "@/lib/utils";
// Import Data
import { SORT_DIRECTIONS } from "@/constants";
// Import Assets & Icons

function OverviewLoading(params: {
  limit?: number;
  categoryName?: string;
  maxCols: number;
}) {
  return (
    <div className="space-y-8">
      {Array.from({ length: params.limit || 3 }, (_, i) => (
        <div
          key={i}
          className="flex flex-col lg:flex-row overflow-hidden animate-pulse"
        >
          {/* Image Placeholder */}
          <div className="w-full lg:w-1/3 relative">
            <div className="block w-full aspect-[16/9] bg-gray-200 lg:h-full"></div>
          </div>

          {/* Content Placeholder */}
          <div className="w-full lg:w-2/3 py-4 flex flex-col justify-between lg:p-4">
            {/* Title Placeholder */}
            <div className="space-y-3">
              <div className="h-6 bg-gray-300 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>

            {/* Excerpt Placeholder */}
            <div className="mt-4 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>

            {/* Actions Placeholder */}
            <div className="mt-6 flex space-x-4">
              <div className="h-10 bg-gray-300 rounded w-32"></div>
              <div className="h-10 bg-gray-300 rounded w-24"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

async function OverviewGrid({
  limit,
  tagArray,
  sortBy,
  maxCols,
  categoryFilter,
  searchQuery,
  preferPromoted,
  showPagination,
  itemsPerPage,
  showSearch,
}: {
  limit?: number;
  tagArray?: string[] | undefined;
  sortBy: SortDirectionObject;
  maxCols: number;
  categoryFilter?: string;
  searchQuery?: string;
  preferPromoted?: boolean;
  showPagination?: boolean;
  itemsPerPage: number;
  showSearch: boolean;
}) {
  let listingData: ListingType[] = [];

  const { data: regularSearchData } = await getPublishedListings(
    limit,
    null,
    searchQuery ?? undefined,
    tagArray,
    categoryFilter,
    sortBy.sortKey,
    sortBy.sortDir ? (sortBy.sortDir === "asc" ? true : false) : null
  );

  listingData = regularSearchData;

  if (listingData.length === 0 && searchQuery) {
    const { data: aiSearchData } = await publishedListingsByAi(
      10,
      searchQuery,
      tagArray,
      categoryFilter
    );
    listingData = aiSearchData;
  }

  function sortListings(
    listings: ListingType[],
    sortByKey: keyof ListingType,
    sortByOrder: "asc" | "desc" = "asc"
  ): ListingType[] {
    return listings.sort((a, b) => {
      if (preferPromoted && a.is_promoted !== b.is_promoted) {
        return a.is_promoted ? -1 : 1;
      }
      const valueA = a[sortByKey];
      const valueB = b[sortByKey];

      // Handle null values and optional properties
      if (valueA == null || valueB == null) return 0;

      // Example: Sort by boolean fields
      if (typeof valueA === "boolean" && typeof valueB === "boolean") {
        return sortByOrder === "asc"
          ? valueA === valueB
            ? 0
            : valueA
            ? -1
            : 1
          : valueA === valueB
          ? 0
          : valueA
          ? 1
          : -1;
      }

      // Example: Sort by string fields
      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortByOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      // Example: Sort by number fields
      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortByOrder === "asc" ? valueA - valueB : valueB - valueA;
      }

      // Example: Sort by date (assuming date is a string that can be converted to Date)
      if (sortByKey === "created_at" || sortByKey === "updated_at") {
        const dateA = new Date(valueA as string);
        const dateB = new Date(valueB as string);
        return sortByOrder === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }

      // Default no sorting change
      return 0;
    });
  }

  const listings = sortListings(listingData, sortBy.sortKey, sortBy.sortDir);

  return (
    <ListingGrid
      listings={listings}
      maxCols={maxCols}
      showPagination={showPagination}
      initialItemsPerPage={itemsPerPage}
      showSearch={showSearch}
    />
  );
}

/**
 * Renders the category overview component.
 *
 * @param categoryName - The name of the category.
 * @param title - The title of the category overview. Defaults to `Browse ${categoryName}`.
 * @param categoryNavigation - Indicates whether to show category navigation. Defaults to `true`.
 * @param description - The description of the category overview.
 * @param className - The CSS class name for the component.
 * @param maxNumListings - The maximum number of listings to display. Defaults to `8`.
 * @param maxCols - The maximum number of columns to display. Defaults to `3`.
 * @param filterAndSortParams - The filter and sort parameters for the listings.
 * @param preferPromoted - Indicates whether to show only new listings. Defaults to `false`.
 * @returns The rendered category overview component.
 */
export default function ListingOverview({
  title = "Most Recent",
  buttonText = "View All",
  buttonHref = "/explore",
  categoryNavigation = true,
  className,
  maxNumListings = 3,
  maxCols = 3,
  filterAndSortParams,
  preferPromoted = false,
  showPagination = true,
  itemsPerPage,
  showSearch = true,
}: {
  title?: string;
  buttonText?: string;
  buttonHref?: string;
  categoryNavigation?: boolean;
  className?: string;
  maxNumListings?: number;
  maxCols?: number;
  filterAndSortParams: { [key: string]: string | undefined };
  preferPromoted?: boolean;
  showPagination?: boolean;
  itemsPerPage?: number;
  showSearch?: boolean;
}) {
  const tagArray = filterAndSortParams?.tags
    ? filterAndSortParams?.tags.split(",").map((tagName) => tagName)
    : [];
  const categoryFilter = filterAndSortParams?.category ?? "";
  const searchFilter =
    filterAndSortParams?.search && filterAndSortParams?.search.length > 0
      ? filterAndSortParams?.search
      : undefined;
  const sortBy =
    SORT_DIRECTIONS.find(
      (direction) => direction.value === (filterAndSortParams?.sort || "")
    ) || SORT_DIRECTIONS[0];

  return (
    <div>
      {categoryNavigation && <SubSectionTitle>{title}</SubSectionTitle>}

      <div className="mt-6">
        <Suspense fallback={<OverviewLoading limit={6} maxCols={maxCols} />}>
          <OverviewGrid
            limit={maxNumListings}
            tagArray={tagArray}
            sortBy={sortBy}
            maxCols={maxCols}
            preferPromoted={preferPromoted}
            categoryFilter={categoryFilter}
            searchQuery={searchFilter}
            showPagination={showPagination}
            itemsPerPage={itemsPerPage || maxCols * 2}
            showSearch={showSearch}
          />
        </Suspense>

        {categoryNavigation && (
          <div
            className="flex items-center mt-10
						 dark:text-white justify-center"
          >
            <Link
              href={buttonHref}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "border-2 text-muted-foreground text-white bg-dark-foreground hover:border-gray-400 rounded-full"
              )}
            >
              {buttonText}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
