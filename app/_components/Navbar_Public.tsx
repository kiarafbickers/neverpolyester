'use client';

// Import Types
// Import External Packages
import { Disclosure } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
// Import Components
import { buttonVariants } from '@/ui/Button';
import Searchbar from '@/components/Searchbar';
// Import Functions & Actions & Hooks & State
import { cn } from '@/lib/utils';
// Import Data
import { COMPANY_BASIC_INFORMATION, GENERAL_SETTINGS } from '@/constants';
// Import Assets & Icons
import { MenuIcon, MoonIcon, XIcon, SunIcon, PlusIcon } from 'lucide-react';

export const NAVBAR_ADD_LINKS = [
	{
		name: 'Explore',
		href: '/explore',
	},
	{
		name: 'Advertise',
		href: '/advertise',
	},
	{
		name: 'Blog',
		href: '/blog',
	},
];

/**
 * Renders a mode toggle button that allows the user to switch between light and dark mode.
 * If you want to use this component somewhere else, extract it to a separate file and import it.
 */
function ModeToggle() {
	function disableTransitionsTemporarily() {
		document.documentElement.classList.add('[&_*]:!transition-none');
		window.setTimeout(() => {
			document.documentElement.classList.remove('[&_*]:!transition-none');
		}, 0);
	}

	function toggleMode() {
		disableTransitionsTemporarily();

		const darkModeMediaQuery = window.matchMedia(
			'(prefers-color-scheme: dark)'
		);
		const isSystemDarkMode = darkModeMediaQuery.matches;
		const isDarkMode = document.documentElement.classList.toggle('dark');

		if (isDarkMode === isSystemDarkMode) {
			delete window.localStorage.isDarkMode;
		} else {
			window.localStorage.isDarkMode = isDarkMode;
		}
	}

	return (
		<button
			type="button"
			aria-label="Toggle dark mode"
			className="group rounded-full px-3 py-2"
			onClick={toggleMode}
		>
			<SunIcon className="h-6 w-6 fill-amber-200 stroke-amber-300 transition group-hover:hidden group-hover:dark:block dark:hidden " />
			<MoonIcon className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-400 group-hover:block group-hover:dark:hidden transition dark:block" />
		</button>
	);
}

export default function Navbar_Public() {
	return (
		<Disclosure
			as="nav"
			className="w-full sticky top-0 z-50 border-b dark:bg-black bg-white"
		>
			{({ open }) => (
				<>
					<div className="max-w-5xl mx-auto h-full grid px-2 py-2 lg:px-0">
						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<div className="-ml-2 mr-2 flex items-center lg:hidden">
									{/* Mobile menu button */}
									<Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-black dark:hover:bg-neutral-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
										<span className="absolute -inset-0.5" />
										<span className="sr-only">Open main menu</span>
										{open ? (
											<XIcon className="block h-6 w-6" aria-hidden="true" />
										) : (
											<MenuIcon className="block h-6 w-6" aria-hidden="true" />
										)}
									</Disclosure.Button>
								</div>
								{/* Desktop Nav */}
								{/* Logo */}
								<div className="flex flex-shrink-0 items-center mr-8">
									<Link href="/">
										<Image
											src="/logos/logo_for_light.png"
											alt={`${COMPANY_BASIC_INFORMATION.NAME} Logo Light Mode`}
											width={640}
											height={107}
											className="h-auto w-48 dark:hidden"
											priority
										/>
										<Image
											src="/logos/logo_for_dark.png"
											alt={`${COMPANY_BASIC_INFORMATION.NAME} Logo Dark Mode`}
											width={640}
											height={107}
											className="hidden h-auto w-48 dark:inline"
											priority
										/>
									</Link>
								</div>
								{/* Navbar_PublicItems */}
								<Searchbar
									placeholder="Search: A tool that..."
									className="hidden sm:block"
									id="nav_search"
								/>
							</div>

							<div className="flex items-center justify-end lg:max-w-fit whitespace-nowrap ">
								<div className="hidden items-center lg:flex lg:gap-x-1">
									{NAVBAR_ADD_LINKS.map((link) => (
										<div
											key={link.name}
											className="group relative flex items-center rounded-lg p-2 text-sm leading-6"
										>
											<div className="flex">
												<Link
													href={link.href}
													className="hover:underline text-muted-foreground"
												>
													{link.name}
												</Link>
											</div>
										</div>
									))}

									{GENERAL_SETTINGS.USE_PUBLISH && (
										<>
											<div className="hidden md:flex items-center space-x-2 mx-2">
												<Link
													href={'/account'}
													className="hover:underline text-muted-foreground text-sm"
													prefetch={false}
													data-umami-event="Navbar: Account"
												>
													Account
												</Link>
												{process.env.NODE_ENV === 'development' && (
													<Link
														href={'/account/secret-admin'}
														className={cn(
															buttonVariants({
																variant: 'default',
																size: 'sm',
															}),
															''
														)}
														prefetch={false}
													>
														Admin
													</Link>
												)}
											</div>
										</>
									)}
									<Link
										href={'/propose'}
										className={cn(
											buttonVariants({ variant: 'outline', size: 'sm' }),
											''
										)}
										prefetch={false}
										data-umami-event="Navbar: Propose new listing"
									>
										<PlusIcon size={14} /> Submit
									</Link>
								</div>

								<div className="pointer-events-auto border-gray-500">
									<ModeToggle />
								</div>
							</div>
						</div>
					</div>

					{/* Mobile menu, show/hide based on menu open state.*/}
					<Disclosure.Panel className="lg:hidden bg-white dark:bg-black">
						{({ close }) => (
							<div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
								{NAVBAR_ADD_LINKS.map((link) => (
									<Disclosure.Button key={link.name} className="block w-full">
										<Link
											href={link.href}
											className="hover:bg-black dark:hover:bg-neutral-800 hover:text-white dark:text-white block rounded-md px-3 py-2 text-base font-medium"
											onClick={() => close()}
										>
											{link.name}
										</Link>
									</Disclosure.Button>
								))}
								{GENERAL_SETTINGS.USE_PUBLISH && (
									<Disclosure.Button className="block w-full">
										{process.env.NODE_ENV === 'development' && (
											<Link
												href={'/studio/structure'}
												className="hover:bg-black dark:hover:bg-neutral-800 hover:text-white dark:text-white block rounded-md px-3 py-2 text-base font-medium"
												onClick={() => close()}
												prefetch={false}
											>
												Admin
											</Link>
										)}
										<Link
											href={'/account/new-listing'}
											className="hover:bg-black dark:hover:bg-neutral-800 hover:text-white dark:text-white block rounded-md px-3 py-2 text-base font-medium"
											onClick={() => close()}
											prefetch={false}
										>
											Submit a listing
										</Link>
										<Link
											href={'/account'}
											className="hover:bg-black dark:hover:bg-neutral-800 hover:text-white dark:text-white block rounded-md px-3 py-2 text-base font-medium"
											onClick={() => close()}
											prefetch={false}
										>
											Account
										</Link>
									</Disclosure.Button>
								)}
							</div>
						)}
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
