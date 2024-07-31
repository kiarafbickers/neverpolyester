// Import Types
import type { Metadata } from 'next';
// Import External Packages
import { MDXRemote as ArticleContent } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
// Import Components
import ListingActionBar from '../_components/ListingActionBar';
import ExternalLinkButton from '@/components/listings/ExternalLinkButton';
import CommentSystem from '@/components/comments/CommentSystem';
import { Avatar, AvatarFallback } from '@/ui/Avatar';
import { useMDXComponents } from '@/mdx-components';
import ListingCard from '@/components/listings/ListingCard';
import SupabaseImage from '@/components/SupabaseImage';
import ViewPixel from '@/components/tracking/ViewPixel';
import Breadcrumps from '@/ui/Breadcrumps';
import UserAvatar from '@/ui/UserAvatar';
import { Badge } from '@/ui/Badge';
import {
	SectionOuterContainer,
	SectionTitle,
	SubSectionTitle,
	SectionDescription,
	SubSectionInnerContainer,
} from '@/ui/Section';
// Import Functions & Actions & Hooks & State
import getCommentsByCategoryAndId from '@/actions/comments/getCommentsByCategoryAndId';
import getPublishedListingBySlug from '@/actions/listings/getPublishedListingBySlug';
import getPublishedListings from '@/actions/listings/getPublishedListings';
import createMetaData from '@/lib/createMetaData';
import createSupabaseBrowserClient from '@/lib/createSupabaseBrowserClient';
import { stringToSlug } from '@/utils';
// Import Data
import { COMPANY_BASIC_INFORMATION, GENERAL_SETTINGS } from '@/constants';
// Import Assets & Icons
import { BadgeCheckIcon } from 'lucide-react';

type Props = {
	params: { slug: string };
};

// https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#generating-static-params

export async function generateStaticParams() {
	const supabase = createSupabaseBrowserClient();
	let results;
	try {
		results = await supabase
			.from('listings')
			.select('slug')
			.match({ is_user_published: true, is_admin_published: true });
		if (results.error) {
			console.error(results.error.message);
			return [];
		}
		if (!results.data) {
			return [];
		} else {
			return results.data.map(({ slug }) => ({ slug: slug }));
		}
	} catch (error) {
		console.error(error);
		return [];
	}
}

// https://nextjs.org/docs/app/building-your-application/optimizing/metadata

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { data: listingData } = await getPublishedListingBySlug(params.slug);

	if (!('id' in listingData)) {
		return createMetaData({
			customTitle: 'Listing',
			customDescription: `This service is listed on ${COMPANY_BASIC_INFORMATION.NAME}. Find everything you need to know about this service and get in touch with the creator.`,
		});
	}

	const supabase = createSupabaseBrowserClient();
	let ogImageUrl = '';

	if (listingData.default_image_url) {
		const publicUrlLocation = supabase.storage
			.from('listing_images')
			.getPublicUrl(listingData.default_image_url);
		ogImageUrl = publicUrlLocation.data?.publicUrl ?? '';
	}

	return createMetaData({
		customTitle: listingData.title,
		customDescription:
			listingData.excerpt ??
			listingData.title ??
			`Listing on ${COMPANY_BASIC_INFORMATION.NAME}`,
		customTags: [
			listingData.category.name,
			...listingData.tags.map((tag) => tag.name),
		],
		customImages:
			ogImageUrl && ogImageUrl !== ''
				? [
						{
							url: ogImageUrl,
							alt: `Image of ${listingData.title} on ${COMPANY_BASIC_INFORMATION.NAME}`,
							type: 'image',
							width: 900,
							height: 600,
						},
				  ]
				: undefined,
		customSlug: `explore/${params.slug}`,
	});
}

export default async function ListingPage({ params }: Props) {
	const { data: listing } = await getPublishedListingBySlug(params.slug);

	if (!('id' in listing)) return notFound();

	const { data: comments } = await getCommentsByCategoryAndId(
		'listing_id',
		listing.id
	);

	const { data: listingData } = await getPublishedListings(2, listing.id);

	return (
		<SectionOuterContainer className="max-w-2xl">
			<Breadcrumps />
			<SupabaseImage
				dbImageUrl={listing.default_image_url}
				width={1350}
				height={900}
				database="listing_images"
				priority
			/>
			{GENERAL_SETTINGS.USE_VIEW && <ViewPixel listingId={listing.id} />}

			<div className="flex justify-between mt-4">
				<div className="flex gap-x-2">
					<SectionTitle>{listing.title}</SectionTitle>
					{listing.owner_id && (
						<BadgeCheckIcon className="w-6 h-6 mr-2 text-green-400" />
					)}
				</div>

				<ExternalLinkButton listing={listing} textVariant={1} />
			</div>

			<div className="flex gap-1 w-fit my-2">
				<Link
					href={`/explore?category=${stringToSlug(
						listing.category?.slug || ''
					)}`}
					key={listing.category_id}
				>
					<Badge
						variant="secondary"
						className="z-50 border border-transparent hover:border-slate-500 whitespace-nowrap"
					>
						{listing.category.name}
					</Badge>
				</Link>
				<span className="text-muted-foreground">|</span>
				{listing &&
					listing?.tags?.map((tag) => (
						<Link
							href={`/explore?tags=${stringToSlug(tag.name!)}`}
							key={tag.name}
						>
							<Badge
								variant="secondary"
								className="z-50 border border-transparent hover:border-slate-500 whitespace-nowrap"
							>
								{tag.name}
							</Badge>
						</Link>
					))}
			</div>

			<SectionDescription>{listing.excerpt}</SectionDescription>
			<ListingActionBar listing={listing} className="mt-4" />
			<hr className="border-accent-2 my-8" />

			<article className="prose dark:prose-invert xl:prose-xl text-justify max-w-none">
				<ArticleContent
					source={listing.description}
					components={{
						...useMDXComponents,
					}}
				/>
			</article>

			<div className="w-full">
				<ExternalLinkButton
					listing={listing}
					textVariant={2}
					className="w-full mt-8"
				/>

				<hr className="border-accent-2 mt-12" />

				<Suspense>
					<CommentSystem
						comments={comments}
						blog_or_listing_id={listing.id}
						blog_or_listing="listing_id"
					/>
				</Suspense>

				{listing.owner && (
					<SubSectionInnerContainer>
						<SubSectionTitle>Meet the Owner</SubSectionTitle>
						<Suspense>
							<header className="flex flex-col sm:flex-row items-center justify-between mb-8">
								<div className="flex items-center space-x-4">
									<Avatar className="w-16 h-16 rounded-full">
										{/* @ts-ignore TODO : fix : Supabase Error: https://github.com/supabase/postgrest-js/issues/408#issuecomment-2175585000 */}
										<UserAvatar url={listing.owner.avatar_url} size={64} />
										<AvatarFallback>
											{/* @ts-ignore : Supabase Error: https://github.com/supabase/postgrest-js/issues/408#issuecomment-2175585000 */}
											{listing.owner.username?.slice(0, 2).toUpperCase()}
										</AvatarFallback>
									</Avatar>
									<div>
										<h1 className="text-2xl font-bold">
											{/* @ts-ignore : Supabase Error: https://github.com/supabase/postgrest-js/issues/408#issuecomment-2175585000 */}
											{listing.owner.username}
										</h1>
									</div>
								</div>

								<div className="flex items-center space-x-4 mt-4 sm:mt-0">
									{/* @ts-ignore : Supabase Error: https://github.com/supabase/postgrest-js/issues/408#issuecomment-2175585000 */}
									<Link
										href={`/user/${(listing.owner as any).username}`}
										className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
										prefetch={false}
									>
										See the user&apos;s profile
										<span className="sr-only">User Profile</span>
									</Link>
								</div>
							</header>
						</Suspense>
					</SubSectionInnerContainer>
				)}

				<SubSectionTitle>You May Also Like</SubSectionTitle>
				<>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						{listingData?.map((listing) => (
							<ListingCard
								key={listing.id}
								listing={listing}
								settings={{ size: 'lg', showImage: true, type: 'col' }}
							/>
						))}
					</div>
				</>
			</div>
		</SectionOuterContainer>
	);
}
