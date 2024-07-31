// Import Types
import { Metadata } from 'next/types';
// Import External Packages
// Import Components
import { SortDirectionBox } from '@/components/SortDirectionBox';
import ListingOverview from '@/components/listings/ListingOverview';
import { TagSearchBox } from '@/components/tags/TagSearchBox';
import CategoryBar from '@/components/categories/CategoryBar';
import AdSlot from '@/components/ads/AdSlot';
import Hero from '@/components/Hero';
import {
	SectionOuterContainer,
	SubSectionInnerContainer,
	SubSectionOuterContainer,
} from '@/ui/Section';
import {
	ImageCard,
	ImageCardDescription,
	ImageCardFooter,
	ImageCardImageContainer,
	ImageCardTitle,
} from '@/ui/ImageCard';
// Import Functions & Actions & Hooks & State
import getPartialTags from '@/actions/tags/getPartialTags';
import createMetaData from '@/lib/createMetaData';
// Import Data
import { COMPANY_BASIC_INFORMATION } from '@/constants';
import { Suspense } from 'react';
// Import Assets & Icons

export const metadata: Metadata = createMetaData({
	customTitle: 'Explore',
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

async function FilterBar() {
	const tagData = await getPartialTags('active');
	return (
		<SubSectionOuterContainer>
			<SubSectionInnerContainer>
				<div className="flex flex-wrap md:flex-nowrap items-start justify-between w-full align-top md:h-24 space-y-4 md:space-y-0">
					<Suspense fallback={null}>
						<SortDirectionBox />
					</Suspense>
					<TagSearchBox tags={tagData.data} />
				</div>
			</SubSectionInnerContainer>
		</SubSectionOuterContainer>
	);
}

// Dynamic Page because of searchParams. Could be changed to static if we push the searchParams to the client by using useSearchParams in the next best client component. However, this would require a lot of changes in the codebase.
export default function Page({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) {
	return (
		<SectionOuterContainer className="max-w-5xl mx-auto py-0 pb-12">
			<CategoryBar
				hrefPrefix="/category/"
				text="Trending Categories"
				className="self-start"
				badgeClassName="hover:bg-muted/60"
			/>
			<Hero />
			<Suspense fallback={null}>
				<FilterBar />
			</Suspense>
			<Suspense fallback={<OverviewLoading limit={6} maxCols={3} />}>
				<ListingOverview
					categoryNavigation={false}
					filterAndSortParams={searchParams}
					maxNumListings={1000}
					maxCols={3}
					preferPromoted
					itemsPerPage={12}
				/>
			</Suspense>
			<AdSlot slot={`explore-2`} />
		</SectionOuterContainer>
	);
}
