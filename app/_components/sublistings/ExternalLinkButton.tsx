'use client';

// Import Types
import { SublistingType } from '@/supabase-special-types';
// Import External Packages
// Import Components
import ExternalLink from '@/ui/ExternalLink';
import { buttonVariants } from '@/ui/Button';
// Import Functions & Actions & Hooks & State
import incrementStatCounters from '@/actions/sublistings/incrementStatCounters';
import insertActivity from '@/actions/activites/insertActivity';
import { cn } from '@/utils';
// Import Data
import { COMPANY_BASIC_INFORMATION, GENERAL_SETTINGS } from '@/constants';
// Import Assets & Icons

/**
 * A button component that opens an external link to a sublisting.
 * @param sublisting - The sublisting to link to.
 * @param textVariant - The text variant (1: Website, 2: Title of Company) to display on the button.
 * @param className - The class name to apply to the button.
 */
export default function ExternalLinkButton({
	sublisting,
	className,
	type,
}: {
	sublisting: SublistingType;
	className?: string;
	type: 'farm' | 'product';
}) {
	if (!sublisting?.click_url) return null;
	return (
		<ExternalLink
			href={
				/* @ts-ignore */
				(type === 'farm' ? sublisting.owner.click_url : sublisting.click_url) +
				`?ref=${COMPANY_BASIC_INFORMATION.NAME.toLowerCase()
					.split(' ')
					.join('-')}`
			}
			className={cn(
				buttonVariants({
					variant: type === 'farm' ? 'default' : 'outline',
					size: 'lg',
				}),
				type === 'farm' && 'dark:bg-primary',
				className
			)}
			trusted
			follow
			onClick={async () => {
				GENERAL_SETTINGS.USE_CLICK
					? await incrementStatCounters(sublisting.id, 'clicks')
					: null;
				await insertActivity('new_click', sublisting.title);
			}}
			data-umami-event="External Link Clicked"
			data-umami-event-sublisting={
				/* @ts-ignore */
				type === 'farm' ? sublisting.owner.click_url : sublisting.click_url
			}
		>
			{type === 'farm' ? 'Meet Rancher' : 'Buy Now'}
		</ExternalLink>
	);
}
