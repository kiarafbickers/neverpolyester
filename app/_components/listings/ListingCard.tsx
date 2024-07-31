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
import { BadgeCheckIcon, BarChart2Icon, Heart, StarIcon } from 'lucide-react';

type ListingCardSettings = {
	size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	type: 'col' | 'row';
	showImage: true | false;
	priority: true | false;
};

/**
 * A card component that displays a listing.
 * @param listing - The listing to display.
 * @param settings - The settings for the card.
 */
export default function ListingCard({
	listing,
	settings,
}: {
	listing: ListingType;
	settings: ListingCardSettings;
}) {
	const isNew =
		new Date(listing.created_at || Date.now()) >
		new Date(
			Date.now() -
				GENERAL_SETTINGS.MAX_NUM_DAY_AGE_FOR_NEW_BADGE * 24 * 60 * 60 * 1000
		);
	return (
		<ImageCard
			linkHover
			className={cn(
				settings.type === 'row' && 'flex',
				'dark:border border-muted fade-in'
			)}
		>
			{!settings.showImage === false && (
				<ImageCardImageContainer
					className={cn(
						settings.type === 'row' && 'rounded-tr-none rounded-bl-xl',
						settings.size === 'xs' && 'rounded-xl',
						settings.size === 'sm' && 'w-3/12'
					)}
				>
					<SupabaseImage
						dbImageUrl={listing.default_image_url}
						width={1600}
						height={900}
						database="listing_images"
						priority={settings.priority}
					/>

					<ImageCardBanner className="flex gap-2 bg-transparent" location="tr">
						{listing.is_promoted && (
							<span className="bg-green-400/60 text-green-800 rounded-sm w-fit px-1 text-sm tracking-tight">
								Promoted
							</span>
						)}
						{listing.created_at && isNew && (
							<span className="bg-red-400/60 text-red-800 rounded-sm w-fit px-1 text-sm tracking-tight">
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
			)}
			<ImageCardFooter
				className={cn(
					'flex flex-col space-y-2 relative w-full overflow-hidden',
					settings.size === 'xs' && 'hidden'
				)}
			>
				<div className="relative w-full gap-x-2 flex overflow-x-hidden">
					{listing.category_id && (
						<ImageCardTagGroup
							tags={[{ name: listing.category?.name || 'Not Found' }]}
						/>
					)}
				</div>
				<ImageCardLink
					href={`/explore/${listing.slug}`}
					data-umami-event="Listing Card"
					data-umami-event-listing={listing.slug}
				/>
				<ImageCardTitle>{listing.title}</ImageCardTitle>

				{GENERAL_SETTINGS.USE_RATING_ON_CARD &&
				listing.average_rating &&
				listing.average_rating > 0 ? (
					<div className="flex flex-wrap items-center gap-x-2 py-2">
						<StarRating
							rating={listing.average_rating}
							maxRating={5}
							numberOfStars={5}
						/>{' '}
						<p className="text-sm text-muted-foreground">
							{listing.ratings_count}{' '}
							{listing.ratings_count === 1 ? 'rating' : 'ratings'}
						</p>
					</div>
				) : null}

				<ImageCardDescription>{listing.excerpt}</ImageCardDescription>
				<ImageCardTagGroup tags={listing.tags} />
				{GENERAL_SETTINGS.USE_STATS &&
					GENERAL_SETTINGS.USE_LIKE &&
					GENERAL_SETTINGS.USE_VIEW &&
					GENERAL_SETTINGS.USE_RATE && (
						<div
							className="flex flex-wrap flex-end flex-row gap-1 pt-2 justify-between items-center text-slate-600 dark:text-slate-200 z-40"
							style={{ fontSize: 13 }}
						>
							<NumberIconBadge value={listing.likes ?? 0} Icon={Heart} />
							<NumberIconBadge
								value={listing.views ?? 0}
								Icon={BarChart2Icon}
							/>
							<NumberIconBadge
								value={listing.average_rating ?? 0}
								Icon={StarIcon}
							/>
						</div>
					)}
			</ImageCardFooter>
		</ImageCard>
	);
}
