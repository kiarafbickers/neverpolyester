// Import Types
import { Metadata } from 'next/types';
// Import External Packages
import { Suspense } from 'react';
// Import Components
import { SortDirectionBox } from '@/components/SortDirectionBox';
import ListingOverview from '@/components/listings/ListingOverview';
import Hero from '@/components/Hero';
import {
	SectionOuterContainer,
	SubSectionInnerContainer,
	SubSectionOuterContainer,
} from '@/ui/Section';
// Import Functions & Actions & Hooks & State
import getFullTags from '@/actions/tags/getFullTags';
import createSupabaseBrowserClient from '@/lib/createSupabaseBrowserClient';
import createMetaData from '@/lib/createMetaData';
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
	const { data: tagsData } = await supabase.rpc('get_full_active_tags');
	if (!tagsData) return [];
	return tagsData.map((tag) => ({ slug: tag.slug }));
}

// https://nextjs.org/docs/app/building-your-application/optimizing/metadata

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const tagsData = await getFullTags('active');

	const tagData = tagsData.data.find((t) => t.slug === params.slug);

	if (!tagData) {
		return createMetaData({
			customTitle: 'Tag Directory',
			customDescription: `This tag is used on ${COMPANY_BASIC_INFORMATION.NAME} to cluster listings. Find everything you need to know about this tag here on ${COMPANY_BASIC_INFORMATION.NAME}.`,
		});
	}

	return createMetaData({
		customTitle: `${tagData.name} Directory`,
		customDescription: tagData.description ?? undefined,
		customTags: [tagData.name, 'directory'],
		customSlug: `tag/${tagData.slug}`,
	});
}

async function FilterBar() {
	return (
		<SubSectionOuterContainer>
			<SubSectionInnerContainer>
				<div className="flex flex-wrap md:flex-nowrap items-center pb-12">
					<SortDirectionBox />
				</div>
			</SubSectionInnerContainer>
		</SubSectionOuterContainer>
	);
}

export default async function Page({ params, searchParams }: Props) {
	const tagData = await getFullTags('active');

	const tag = tagData.data.find((t) => t.slug === params.slug);

	return (
		<SectionOuterContainer className="max-w-5xl mx-auto ">
			<Suspense fallback={null}>
				<Hero
					keyword={tag?.name}
					headline={tag?.headline ?? `All ${tag?.name} Listings`}
					description={
						tag?.description ?? `All listings with the tag ${tag?.name}.`
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
						tags: params.slug,
						sort: searchParams.sort ?? 'newest',
					}}
					maxNumListings={100}
					maxCols={3}
				/>
			</Suspense>
		</SectionOuterContainer>
	);
}
