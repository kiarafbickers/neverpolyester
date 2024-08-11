// Import Types
import { ListingType } from '@/supabase-special-types';
// Import External Packages
// Import Components
import { StarRating } from '@/components/listings/StarRating';
import NumberIconBadge from '@/ui/NumberIconBadge';
import SupabaseImage from '@/components/SupabaseImage';
import {
	ImageCard,
	ImageCardDescription,
	ImageCardFooter,
	ImageCardImageContainer,
	ImageCardLink,
	ImageCardTitle,
	ImageCardBanner,
	ImageCardTagGroup,
} from '@/ui/ImageCard';
// Import Functions & Actions & Hooks & State
import { cn } from '@/lib/utils';
// Import Data
import { GENERAL_SETTINGS } from '@/constants';
// Import Assets & Icons
import { BadgeCheckIcon, BadgePercentIcon, MapIcon } from 'lucide-react';

/**
 * A card component that displays a listing.
 * @param listing - The listing to display.
 * @param settings - The settings for the card.
 */
export default function ListingCard({ listing }: { listing: ListingType }) {
	const isNew =
		new Date(listing.created_at || Date.now()) >
		new Date(
			Date.now() -
				GENERAL_SETTINGS.MAX_NUM_DAY_AGE_FOR_NEW_BADGE * 24 * 60 * 60 * 1000
		);
	return (
		<ImageCard
			linkHover
			className="border-1 border-transparent fade-in bg-transparent shadow-none group "
		>
			<ImageCardImageContainer className="rounded-lg aspect-video w-auto">
				<SupabaseImage
					dbImageUrl={listing.default_image_url}
					width={1600}
					height={900}
					database="listing_images"
					priority
					className="group-hover:scale-105 transition-transform duration-300 h-full w-full"
				/>

				<ImageCardBanner className="flex gap-2 bg-transparent" location="tr">
					{listing.is_promoted && (
						<span className="bg-green-400/60 text-green-800 rounded-sm w-fit px-1 text-sm tracking-tight">
							Promoted
						</span>
					)}
					{listing.created_at && isNew && (
						<span className="bg-light-red-bg text-text-on-light-red rounded-sm w-fit px-1 text-sm tracking-tight">
							New
						</span>
					)}
					{listing.owner_id && (
						<span className="bg-transparent">
							<BadgeCheckIcon className="h-5 w-5 text-green-500" />
						</span>
					)}
				</ImageCardBanner>

				<ImageCardLink
					href={`/explore/${listing.slug}`}
					data-umami-event="Listing Card"
					data-umami-event-listing={listing.slug}
				/>
			</ImageCardImageContainer>

			<ImageCardFooter className="flex flex-col relative w-full overflow-hidden bg-transparent p-0 pt-2">
				<ImageCardLink
					href={`/explore/${listing.slug}`}
					data-umami-event="Listing Card"
					data-umami-event-listing={listing.slug}
				/>
				<div className="flex justify-between items-center h-7 overflow-hidden w-full">
					<ImageCardTitle>{listing.title}</ImageCardTitle>
					{/* @ts-ignore TODO : fix : Supabase Error: https://github.com/supabase/postgrest-js/issues/408#issuecomment-2175585000 */}
					{!!listing.discount_code_percentage && (
						<div className="bg-light-red-bg text-text-on-light-red whitespace-nowrap h-fit p-1 rounded-md text-sm font-medium items-center hidden md:flex">
							<BadgePercentIcon size={14} className="mr-1" />{' '}
							{/* @ts-ignore TODO : fix : Supabase Error: https://github.com/supabase/postgrest-js/issues/408#issuecomment-2175585000 */}
							{listing.discount_code_percentage}% Off
						</div>
					)}
				</div>
				<div className="relative w-full gap-x-2 flex text-sm items-center text-muted-foreground">
					<MapIcon className="h-4 w-4" />
					{!!listing.category?.name && <p>{listing.category?.name}, USA</p>}
				</div>
			</ImageCardFooter>
		</ImageCard>
	);
}
