// Import Types
import { LinkListItem } from '@/types';
// Import External Packages
import Image from 'next/image';
import Link from 'next/link';
// Import Components
import SocialFollowBar from '@/components/SocialFollowBar';
import ExternalLink from '@/ui/ExternalLink';
// Import Functions & Actions & Hooks & State
import { capitalize, cn } from '@/lib/utils';
// Import Data
import {
	COMPANY_BASIC_INFORMATION,
	CREATOR_INFORMATION,
	FOOTER_DISCLAIMERS,
	FOOTER_EXTERNAL_LINK_LIST,
	FOOTER_SLOGAN,
} from '@/constants';
// Import Assets & Icons
import { ExternalLinkIcon } from 'lucide-react';
// FIXED DATA

// What links do you want to show in the Footer?
const FOOTER_NAVIGATION_LINKS: {
	[key: string]: { label: string; href: string }[];
} = {
	resources: [
		{ label: 'Explore Listings', href: '/explore' },
		{ label: 'All Categories', href: '/category' },
		{ label: 'All Tags', href: '/tag' },
		{ label: 'Blog', href: '/blog' },
	],
	legal: [
		{ label: 'Terms', href: '/terms' },
		{ label: 'Imprint', href: '/imprint' },
		{ label: 'Privacy', href: '/privacy-policy' },
		{ label: 'Cookies', href: '/cookie-policy' },
	],
};

type PortfolioLinkBarProps = {
	title?: string;
	linkList: LinkListItem[];
};

function PortfolioLinkBar({
	title = 'External Links',
	linkList,
}: PortfolioLinkBarProps) {
	return (
		<div className="relative border-t border-white/10 py-8 mt-4 text-gray-400">
			<h3 className="flex items-center text-sm font-semibold leading-6 text-white">
				{title}
				<span>
					<ExternalLinkIcon size={12} className="ml-1" />
				</span>
			</h3>

			<ul
				role="list"
				className="grid md:flex mt-6 md:space-x-4 space-y-4 md:space-y-0"
			>
				{linkList.map((link) => (
					<li key={link.label} className="h-6 md:border-r last:border-r-0">
						<ExternalLink
							href={link.href}
							className="text-sm leading-6 text-gray-300 hover:text-white pr-4"
							follow
							trusted
							data-umami-event="Portfolio Link Clicked"
							data-umami-event-item={link.href}
						>
							{link.label}
						</ExternalLink>
					</li>
				))}
			</ul>
		</div>
	);
}

function FooterCopyright() {
	const copyrightDuration =
		COMPANY_BASIC_INFORMATION.FOUNDING_YEAR ===
		new Date().getFullYear().toString()
			? COMPANY_BASIC_INFORMATION.FOUNDING_YEAR
			: `${COMPANY_BASIC_INFORMATION.FOUNDING_YEAR} - ${new Date()
					.getFullYear()
					.toString()}`;

	return (
		<div className="py-4 border-t border-white/10">
			<div className="flex text-xs leading-5 text-gray-400 whitespace-nowrap flex-wrap">
				&copy; {copyrightDuration}. All rights reserved.{' '}
				{COMPANY_BASIC_INFORMATION.PARENT_COMPANY_URL ? (
					<>
						A service of
						<ExternalLink
							href={COMPANY_BASIC_INFORMATION.PARENT_COMPANY_URL}
							className="underline mx-1"
						>
							{COMPANY_BASIC_INFORMATION.LEGAL_NAME}.
						</ExternalLink>
					</>
				) : (
					<p className="mx-1">
						A service of {COMPANY_BASIC_INFORMATION.LEGAL_NAME}.
					</p>
				)}
				{CREATOR_INFORMATION ? (
					CREATOR_INFORMATION.HREF ? (
						<>
							{' '}
							By
							<ExternalLink
								href={CREATOR_INFORMATION.HREF}
								className="underline mx-1"
							>
								{CREATOR_INFORMATION.NAME}.
							</ExternalLink>
						</>
					) : (
						<p className="mx-1">By {CREATOR_INFORMATION.NAME}.</p>
					)
				) : null}
			</div>
		</div>
	);
}

function InternalLinkBar({
	linkList,
}: {
	linkList: typeof FOOTER_NAVIGATION_LINKS;
}) {
	return (
		<div
			className={cn(
				'mt-16 grid grid-cols-2 gap-8 xl:mt-0 col-span-2',
				`lg:grid-cols-${Object.keys(linkList).length}`
			)}
		>
			{Object.keys(linkList).map((category) => (
				<div key={category}>
					<h3 className="text-sm font-semibold leading-6 text-white">
						{capitalize(category)}
					</h3>
					<ul role="list" className="mt-6 space-y-4">
						{linkList[category].map((link) => (
							<li key={link.label}>
								<Link
									href={link.href}
									className="text-sm leading-6 text-gray-300 hover:text-white"
								>
									{link.label}
								</Link>
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
}

/**
 * Renders the footer component.
 *
 * @returns The rendered footer component.
 */
export default function Footer() {
	return (
		<footer
			className="relative w-full pt-10 z-20 bg-black"
			aria-labelledby="footer-heading"
		>
			<h2 id="footer-heading" className="sr-only">
				Footer
			</h2>
			<div className="mx-auto max-w-7xl px-4 lg:px-12 pb-8 pt-16">
				<div className="xl:grid xl:grid-cols-3 xl:gap-8">
					<div className="space-y-8 pr-12">
						<Image
							className="h-auto w-48"
							src="/logos/logo_for_dark.png"
							width={150}
							height={100}
							alt={`${COMPANY_BASIC_INFORMATION.NAME} Logo White on transparent background`}
						/>
						<p className="text-sm leading-6 text-gray-300">{FOOTER_SLOGAN}</p>

						<SocialFollowBar
							className="text-sm text-gray-300 fill-white hover:text-white"
							direction="horizontal"
							size="sm"
						/>
					</div>

					<InternalLinkBar linkList={FOOTER_NAVIGATION_LINKS} />
				</div>

				<PortfolioLinkBar
					title="Need a Domain or Website Template?"
					linkList={FOOTER_EXTERNAL_LINK_LIST}
				/>

				<div className="py-4 border-t border-white/10 text-gray-400">
					{FOOTER_DISCLAIMERS.map((disclaimer) => (
						<p key={disclaimer} className="text-xs leading-5">
							{disclaimer}
						</p>
					))}
				</div>
				<FooterCopyright />
			</div>
		</footer>
	);
}
