// Import Types
import { Metadata } from "next/types";
// Import External Packages
// Import Components
import { SortDirectionBox } from "@/components/SortDirectionBox";
import ListingOverview from "@/components/listings/ListingOverview";
import {
  TagSearchBox,
  TagSearchBoxMobile,
} from "@/components/tags/TagSearchBox";
import AdSlot from "@/components/ads/AdSlot";
import {
  ImageCard,
  ImageCardDescription,
  ImageCardFooter,
  ImageCardImageContainer,
  ImageCardTitle,
} from "@/ui/ImageCard";
import NewsletterBox_BeeHiiv from "@/components/NewsletterSection";
import Breadcrumps from "@/components/_ui/Breadcrumps";
// Import Functions & Actions & Hooks & State
import getPartialCategories from "@/actions/categories/getPartialCategories";
import getPartialTags from "@/actions/tags/getPartialTags";
import createMetaData from "@/lib/createMetaData";
// Import Data
import { COMPANY_BASIC_INFORMATION, LISTINGS_SETTINGS } from "@/constants";
import { Suspense } from "react";
// Import Assets & Icons

export const metadata: Metadata = createMetaData({
  customTitle: "Explore",
  customDescription: `See, filter and sort all listings on ${COMPANY_BASIC_INFORMATION.NAME}. Find the best creators in the world. Get inspired by their work and hire them for your next project`,
  customSlug: `explore`,
});

function OverviewLoading(params: {
  limit?: number;
  categoryName?: string;
  maxCols: number;
}) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-8 lg:grid-cols-${params.maxCols.toString()} w-full`}
    >
      {Array.from({ length: params.limit || 3 }, (_, i) => (
        <ImageCard key={i} className="animate-pulse min-h-24">
          <ImageCardImageContainer>
            <div className="w-full h-full min-w-48 min-h-48 bg-gray-200" />
          </ImageCardImageContainer>
          <ImageCardFooter className="grid space-y-2">
            <ImageCardTitle className="text-gray-500">Loading</ImageCardTitle>
            <ImageCardDescription className="text-gray-500">
              ...
            </ImageCardDescription>
          </ImageCardFooter>
        </ImageCard>
      ))}
    </div>
  );
}

// Dynamic Page because of searchParams. Could be changed to static if we push the searchParams to the client by using useSearchParams in the next best client component. However, this would require a lot of changes in the codebase.
export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const tagData = await getPartialTags("active");
  const categoryData = await getPartialCategories("active");
  return (
    <div className="bg-white">
      <div className="md:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumps />
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            <Suspense fallback={null}>
              <TagSearchBox
                tags={tagData.data}
                categories={categoryData.data}
                className="hidden lg:block"
              />
            </Suspense>
            <div className="lg:col-span-3">
              <div className="flex flex-wrap sm:flex-nowrap justify-between">
                <h1 className="text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
                  All {LISTINGS_SETTINGS.pluralName}
                </h1>
                <div className="flex justify-between w-full  sm:w-fit pt-4 sm:pt-0">
                  <TagSearchBoxMobile
                    tags={tagData.data}
                    categories={categoryData.data}
                    className="lg:hidden"
                  />
                  <Suspense fallback={null}>
                    <SortDirectionBox />
                  </Suspense>
                </div>
              </div>
              <Suspense fallback={<OverviewLoading limit={6} maxCols={3} />}>
                <ListingOverview
                  categoryNavigation={false}
                  filterAndSortParams={searchParams}
                  maxNumListings={1000}
                  maxCols={3}
                  preferPromoted
                  itemsPerPage={3}
                  showSearch={false}
                  className="py-0 md:py-0"
                />
              </Suspense>
            </div>
          </div>

          <AdSlot slot={`explore-2`} />
        </div>
      </div>
      <NewsletterBox_BeeHiiv className="bg-white dark:bg-background-secondary" />
    </div>
  );
}
