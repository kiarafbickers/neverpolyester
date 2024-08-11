'use client';
// Import Types
// Import External Packages
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
// Import Components
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/ui/Sheet';
import { Button, buttonVariants } from '@/ui/Button';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuItem,
} from '@/ui/Dropdown';
// Import Functions & Actions & Hooks & State
import useClientAuth from '@/lib/useClientAuth';
import { cn } from '@/lib/utils';
// Import Data
import { COMPANY_BASIC_INFORMATION } from '@/constants'; // Import Assets & Icons
import {
	CircleUser,
	CogIcon,
	GaugeIcon,
	LayoutTemplateIcon,
	LockIcon,
	MegaphoneIcon,
	Menu,
	NewspaperIcon,
	PlusIcon,
} from 'lucide-react';

const ACCOUNT_NAV_BUTTONS = [
	{
		label: 'New Listing',
		href: '/account/new-listing',
		icon: PlusIcon,
	},
	{
		label: 'New Post',
		href: '/account/new-post',
		icon: PlusIcon,
	},
];

const ACCOUNT_NAV_LINKS = [
	{
		label: 'Dashboard',
		href: '/account',
		icon: GaugeIcon,
		needSuperAdmin: false,
	},
	{
		label: 'Farms',
		href: '/account/listings',
		icon: LayoutTemplateIcon,
		needSuperAdmin: false,
	},
	{
		label: 'Products',
		href: '/account/sublistings',
		icon: LayoutTemplateIcon,
		needSuperAdmin: false,
	},
	{
		label: 'Posts',
		href: '/account/posts',
		icon: NewspaperIcon,
		needSuperAdmin: false,
	},
	{
		label: 'Promotions',
		href: '/account/promotions',
		icon: MegaphoneIcon,
		needSuperAdmin: false,
	},
	{
		label: 'Settings',
		href: '/account/settings',
		icon: CogIcon,
		needSuperAdmin: false,
	},
	{
		label: 'Admin',
		href: '/secret-admin',
		icon: LockIcon,
		needSuperAdmin: true,
	},
];

/**
 * A header component that displays links to account pages.
 */
export default function Navbar_Protected() {
	const pathname = usePathname();
	const { isSuperAdmin } = useClientAuth({
		checkAdmin: true,
	});

	return (
		<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
			<nav className="hidden flex-col gap-6 text-lg font-medium lg:flex lg:flex-row lg:items-center lg:gap-5 lg:text-sm">
				<Link href="/" className="h-8 w-8">
					<Image
						src="/icons/icon-192.png"
						alt={`${COMPANY_BASIC_INFORMATION.NAME} Icon`}
						width={192}
						height={192}
						className="h-8 w-8"
						priority
					/>
					<span className="sr-only">Icon</span>
				</Link>

				{ACCOUNT_NAV_LINKS.map((link) =>
					link.needSuperAdmin && !isSuperAdmin ? null : (
						<Link
							key={link.label}
							href={link.href}
							className={cn(
								'text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-3 p-3 transition-all',
								link.href === pathname ? 'text-foreground bg-muted' : ''
							)}
						>
							<link.icon className="h-5 w-5 hidden xl:flex" />
							{link.label}
						</Link>
					)
				)}
			</nav>
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline" size="icon" className="shrink-0 lg:hidden">
						<Menu className="h-5 w-5" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="flex flex-col">
					<nav className="flex flex-col gap-2 text-lg font-medium">
						<div className="flex h-14 w-auto">
							<Link href="/">
								<Image
									src="/logos/logo_for_light.png"
									alt={`${COMPANY_BASIC_INFORMATION.NAME} Icon`}
									width={192}
									height={40}
									className="h-auto w-auto dark:hidden"
									priority
								/>
							</Link>
						</div>

						{ACCOUNT_NAV_LINKS.map((link) => (
							<SheetClose asChild key={link.label}>
								<Link
									href={link.href}
									className={cn(
										'text-muted-foreground hover:text-foreground hover:bg-muted flex items-center gap-3 p-3 transition-all',
										link.href === pathname ? 'text-foreground bg-muted' : ''
									)}
								>
									<link.icon className="h-5 w-5" />
									{link.label}
								</Link>
							</SheetClose>
						))}
						<div className="absolute bottom-6 left-6">
							<form action="/api/auth/signout" method="post">
								<Button
									variant="outline"
									className="button block"
									type="submit"
								>
									Sign out
								</Button>
							</form>
						</div>
					</nav>
				</SheetContent>
			</Sheet>
			<div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
				{ACCOUNT_NAV_BUTTONS.map((button) => (
					<Link
						key={button.label}
						href={button.href}
						className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
					>
						{button.icon && <button.icon className="h-4 w-4" />}
						{button.label}
					</Link>
				))}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="secondary" size="icon" className="rounded-full">
							<CircleUser className="h-5 w-5" />
							<span className="sr-only">Toggle user menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-full">
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<Link href="/account/settings">Settings</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />

						<form action="/api/auth/signout" method="post">
							<Button variant="outline" className="mx-auto block" type="submit">
								Sign out
							</Button>
						</form>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
}
