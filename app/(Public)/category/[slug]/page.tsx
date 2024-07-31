// Import Types
import { Metadata } from 'next/types';
// Import External Packages
import { Suspense } from 'react';
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
// Import Functions & Actions & Hooks & State
import getPartialTags from '@/actions/tags/getPartialTags';
import getFullCategories from '@/actions/categories/getFullCategories';
import createMetaData from '@/lib/createMetaData';
import createSupabaseBrowserClient from '@/lib/createSupabaseBrowserClient';
// Import Data
import { COMPANY_BASIC_INFORMATION } from '@/constants';
// Import Assets & Icons

type Props = {
	params: { slug: string };
	searchParams: { [key: string]: string | undefined };
};

// https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#generating-static-params

export async function generateStaticParams() {
	const supabase = createSupabaseBrowserClient();
	const { data: categoryData } = await supabase.rpc(
		'get_full_active_categories'
	);
	if (!categoryData) return [];
	return categoryData.map((category) => ({ slug: category.slug }));
}

// https://nextjs.org/docs/app/building-your-application/optimizing/metadata

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const categoriesData = await getFullCategories('active');
	const categoryData = categoriesData.data.find((c) => c.slug === params.slug);

	if (!categoryData) {
		return createMetaData({
			customTitle: 'Category Directory',
			customDescription: `This category is used on ${COMPANY_BASIC_INFORMATION.NAME} to cluster listings. Find everything you need to know about this category here on ${COMPANY_BASIC_INFORMATION.NAME}.`,
		});
	}

	return createMetaData({
		customTitle: `${categoryData.name} Directory`,
		customDescription: categoryData.description ?? undefined,
		customTags: [categoryData.name, 'directory'],
		customSlug: `category/${categoryData.slug}`,
	});
}

async function FilterBar() {
	const tagData = await getPartialTags('active');
	return (
		<SubSectionOuterContainer>
			<SubSectionInnerContainer>
				<div className="flex flex-wrap md:flex-nowrap items-start justify-between w-full align-top md:h-24 space-y-4 md:space-y-0">
					<SortDirectionBox />
					<TagSearchBox tags={tagData.data} />
				</div>
			</SubSectionInnerContainer>
		</SubSectionOuterContainer>
	);
}

export default async function Page({ params, searchParams }: Props) {
	const categoriesData = await getFullCategories('active');

	const category = categoriesData.data.find((t) => t.slug === params.slug);

	return (
		<SectionOuterContainer className="max-w-5xl mx-auto py-0 pb-12">
			<CategoryBar
				hrefPrefix="/category/"
				text="Other Categories"
				className="self-start"
				badgeClassName="hover:bg-muted/60"
			/>
			<Suspense fallback={null}>
				<Hero
					keyword={category?.name}
					headline={category?.headline ?? `All ${category?.name} Listings`}
					description={
						category?.description ??
						`All listings with the category ${category?.name}.`
					}
				/>
			</Suspense>
			<Suspense fallback={null}>
				<FilterBar />
			</Suspense>
			<Suspense fallback={null}>
				<ListingOverview
					categoryNavigation={false}
					filterAndSortParams={{
						category: params.slug,
						sort: searchParams.sort ?? 'newest',
						tags: searchParams.tags ?? '',
					}}
					maxNumListings={100}
					maxCols={3}
					preferPromoted
				/>
			</Suspense>
			<AdSlot slot={`${params.slug}-2`} />
		</SectionOuterContainer>
	);
}
