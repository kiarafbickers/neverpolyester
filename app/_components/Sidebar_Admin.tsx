'use client';
// Import Types
// Import External Packages
import { usePathname } from 'next/navigation';
import Link from 'next/link';
// Import Components
// Import Functions & Actions & Hooks & State
import { cn } from '@/lib/utils';
// Import Data
import {
	GaugeIcon,
	MessageCircleHeartIcon,
	LayoutTemplateIcon,
	NewspaperIcon,
	GemIcon,
	MegaphoneIcon,
	MessageCircleMoreIcon,
	TagIcon,
	TagsIcon,
	User2Icon,
} from 'lucide-react';
// Import Assets & Icons

const ADMIN_NAV_LINKS = [
	{
		label: 'Dashboard',
		href: '/account/secret-admin',
		icon: GaugeIcon,
	},
	{
		label: 'Activities',
		href: '/account/secret-admin/activity-manager',
		icon: MessageCircleHeartIcon,
	},
	{
		label: 'Listings',
		href: '/account/secret-admin/listing-manager',
		icon: LayoutTemplateIcon,
	},
	{
		label: 'Blog Posts',
		href: '/account/secret-admin/blog-manager',
		icon: NewspaperIcon,
	},
	{
		label: 'Users',
		href: '/account/secret-admin/user-manager',
		icon: User2Icon,
	},
	{
		label: 'Ads',
		href: '/account/secret-admin/ad-manager',
		icon: GemIcon,
	},
	{
		label: 'Promotions',
		href: '/account/secret-admin/promotion-manager',
		icon: MegaphoneIcon,
	},
	{
		label: 'Feedback',
		href: '/account/secret-admin/feedback-manager',
		icon: MessageCircleHeartIcon,
	},
	{
		label: 'Comments',
		href: '/account/secret-admin/comment-manager',
		icon: MessageCircleMoreIcon,
	},
	{
		label: 'Categories',
		href: '/account/secret-admin/category-manager',
		icon: TagIcon,
	},
	{
		label: 'Tags',
		href: '/account/secret-admin/tag-manager',
		icon: TagsIcon,
	},
];

/**
 * A header component that displays links to account pages.
 */
export default function Sidebar_Admin() {
	const pathname = usePathname();

	return (
		<div className="h-full w-full">
			<header className="sticky top-20 items-start pt-8 h-fit px-2">
				<h2 className="text-lg font-bold py-2">Quick Links</h2>
				<nav className="grid">
					{ADMIN_NAV_LINKS.map((link) => (
						<Link
							key={link.label}
							href={link.href}
							className={cn(
								'text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-3 p-2 transition-all',
								link.href === pathname ? 'text-foreground bg-muted' : ''
							)}
						>
							{<link.icon className="h-4 w-4 ml-1" />}
							{link.label}
						</Link>
					))}
				</nav>
			</header>
		</div>
	);
}
