// Import Types
// Import External Packages
import Image from 'next/image';
import Link from 'next/link';
// Import Components
import { buttonVariants } from '@/ui/Button';
// Import Functions & Actions & Hooks & State
import { cn } from '@/lib/utils';
// Import Data
// Import Assets & Icons

/**
 * A component that displays a breaker ad.
 */
export default function Breaker() {
	return (
		<div className="relative max-w-screen-md mx-auto py-24">
			<div className="relative grid md:grid-cols-3 bg-neutral-100 dark:bg-neutral-100/50 rounded-xl">
				<Image
					className="absolute hidden md:block h-80 w-2/5 object-cover rounded-xl drop-shadow-xl -rotate-6 -left-12 -bottom-8"
					src="/img/directory.jpg"
					alt="Directory | Aubrey Odom | Unsplash"
					fetchPriority="high"
					width={600}
					height={400}
				/>
				<div className="col-span-1" />
				<div className="flex align-middle mx-auto col-span-2 self-center">
					<div className="p-6 xl:p-8 mx-auto h-fit">
						<h2 className="text-base font-semibold leading-7 text-black">
							Have your own domain business?
						</h2>
						<p className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-4xl">
							Claim Your Listing Today
						</p>
						<p className="mt-6 text-base leading-7 text-black">
							Whether you&apos;re just getting started or looking to grow your
							domain business, we have the tools and resources to help you
							succeed.
						</p>
						<div className="mt-8">
							<Link
								href="/account"
								className={cn(
									buttonVariants({ variant: 'outline', size: 'lg' }),
									''
								)}
								prefetch={false}
								data-umami-event="Claim Link Clicked"
							>
								Claim your listing
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
