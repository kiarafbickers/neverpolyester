// Import Types
import { Metadata } from 'next/types';
// Import External Packages
import { Suspense } from 'react';
// Import Components
import SublistingOverview from '@/components/sublistings/SublistingOverview';
import Hero from '@/components/Hero';
import { SectionOuterContainer } from '@/ui/Section';
// Import Functions & Actions & Hooks & State
import createSupabaseBrowserClient from '@/lib/createSupabaseBrowserClient';
import createMetaData from '@/lib/createMetaData';
import getFullSubtags from '@/actions/subtags/getFullSubtags';
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
	const { data: tagsData } = await supabase.rpc('get_full_active_subtags');
	if (!tagsData) return [];
	return tagsData.map((tag) => ({ slug: tag.slug }));
}

// https://nextjs.org/docs/app/building-your-application/optimizing/metadata

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const tagsData = await getFullSubtags('active');

	const tagData = tagsData.data.find((t) => t.slug === params.slug);

	if (!tagData) {
		return createMetaData({
			customTitle: 'Subtag Directory',
			customDescription: `This tag is used on ${COMPANY_BASIC_INFORMATION.NAME} to cluster listings. Find everything you need to know about this tag here on ${COMPANY_BASIC_INFORMATION.NAME}.`,
		});
	}

	return createMetaData({
		customTitle: `${tagData.name} Directory`,
		customDescription: tagData.description ?? undefined,
		customTags: [tagData.name, 'directory'],
		customSlug: `subtags/${tagData.slug}`,
	});
}

export default async function Page({ params, searchParams }: Props) {
	const tagData = await getFullSubtags('active');

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
				<SublistingOverview
					categoryNavigation={false}
					filterAndSortParams={{
						tags: params.slug,
						sort: searchParams.sort ?? 'newest',
					}}
					maxNumSublistings={100}
					maxCols={3}
					className="py-0 md:py-0 mb-10"
				/>
			</Suspense>
		</SectionOuterContainer>
	);
}
