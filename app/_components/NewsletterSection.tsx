'use client';

// Import Types
// Import External Packages
import { useEffect } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import Image from 'next/image';
// Import Components
import { CookieConsentButton_Accept } from '@/components/CookieConsentBanner';
import {
	SubSectionContentContainer,
	SubSectionInnerContainer,
	SubSectionOuterContainer,
	SubSectionTitle,
} from '@/ui/Section';
// Import Functions & Actions & Hooks & State
import { useCookieConsent } from '@/state/useCookieConsent';
import { cn } from '@/lib/utils';
// Import Data
// Import Assets & Icons

/**
 * Renders a newsletter subscription box powered by BeeHiiv.
 *
 * @param size - The size of the newsletter box. Defaults to 'lg'.
 * @param className - Additional CSS class for the container element.
 * @param title - The title of the newsletter box.
 * @param description - The description of the newsletter box.
 * @param disclaimer - The disclaimer text of the newsletter box.
 * @param textForPrivacyPolicy - The text for the privacy policy link. Defaults to 'Read our privacy policy'.
 * @param linkToPrivacyPolicy - The URL of the privacy policy page. Defaults to '/privacy-policy'.
 * @returns The rendered newsletter subscription box.
 */
export default function NewsletterBox_BeeHiiv({
	size = 'lg',
	className,
	title = 'JOIN THE FAMILY',
	description = 'Subscribe for farm stories and the freshest deals in your inbox.',
	disclaimer = 'We care about your data.',
	textForPrivacyPolicy = 'Read our privacy policy',
	linkToPrivacyPolicy = '/privacy-policy',
}: {
	size?: 'sm' | 'lg';
	className?: string;
	title?: string;
	description?: string;
	disclaimer?: string;
	textForPrivacyPolicy?: string;
	linkToPrivacyPolicy?: string;
}) {
	const { hasCookieConsent } = useCookieConsent();
	const beeHiivEmbedUrl = process.env.NEXT_PUBLIC_BEEHIIV_EMBED_URL;

	if (!beeHiivEmbedUrl) {
		return null;
	}

	/**
	 * Size=sm will render the NewsletterBox component with a small size, i.e. just the box.
	 */
	if (size === 'sm') {
		return (
			<div id="newsletter" className={className}>
				{hasCookieConsent === true ? (
					<>
						<div id="beehiiv-recommendations-widget" />
						<Script
							src="https://embeds.beehiiv.com/recommendations.js?_bhpid=2f5a4c1d-82e1-4c43-be73-9df0a894f2bd&v=1"
							data-beehiiv-recommendations-widget
							defer
							onLoad={() => console.log('Beehiiv script loaded successfully')}
							onError={() => console.log('Failed to load the Beehiiv script')}
						/>
					</>
				) : (
					<CookieConsentButton_Accept buttonText="Accept Cookies to display" />
				)}
			</div>
		);
	}

	/**
	 * Size=lg will render the NewsletterBox Section with a large size, with title, description and full disclaimer.
	 */
	return (
		<SubSectionOuterContainer
			id="newsletter"
			className={cn('px-0 py-0', className)}
		>
			<SubSectionInnerContainer>
				<SubSectionContentContainer className="mt-0">
					<div className="pt-10 md:pt-20 pb-6 md:pb-12 px-10 md:px-20 bg-primary text-white md:rounded-xl relative">
						<div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-8">
							<div className="space-y-2">
								<div className="m-auto max-w-4xl text-3xl font-bold tracking-tight sm:text-4xl">
									<h2 className="flex">{title}</h2>
								</div>
								<div className="mx-auto w-full">
									<p className="text-base">{description}</p>
								</div>
								<p className="text-sm italic leading-6">
									{disclaimer}{' '}
									<Link
										href={linkToPrivacyPolicy}
										className="font-semibold underline"
									>
										{textForPrivacyPolicy}
									</Link>
								</p>
							</div>

							<div className="m-auto mt-4 w-full max-w-lg">
								<div className="flex gap-x-4">
									<label htmlFor="email-address" className="sr-only">
										Email address
									</label>
								</div>
								{hasCookieConsent === true ? (
									<>
										<div id="beehiiv-recommendations-widget" />
										<Script
											src="https://embeds.beehiiv.com/recommendations.js?_bhpid=2f5a4c1d-82e1-4c43-be73-9df0a894f2bd&v=1"
											data-beehiiv-recommendations-widget
											defer
											onLoad={() => console.log('Beehiiv script loaded successfully')}
											onError={() => console.log('Failed to load the Beehiiv script')}
										/>
									</>
								) : (
									<CookieConsentButton_Accept
										buttonText="Accept Cookies to display Newsletter Signup"
										className="h-20 w-full"
										variant="default"
									/>
								)}
							</div>
						</div>
						<Image
							src="/img/honey.png"
							width={150}
							height={150}
							alt="steak stake"
							className="absolute -right-32 -bottom-8 z-10  w-[150px] h-[150px] hidden md:block"
						/>
					</div>
				</SubSectionContentContainer>
			</SubSectionInnerContainer>
		</SubSectionOuterContainer>
	);
}
