// Import Types
// Import External Packages
import Image from 'next/image';
import Link from 'next/link';
// Import Components
import {
	SubSectionOuterContainer,
	SubSectionInnerContainer,
	SubSectionTitle,
	SubSectionDescription,
	SubSectionContentContainer,
} from '@/ui/Section';
import { buttonVariants } from '@/ui/Button';
// Import Functions & Actions & Hooks & State
import { cn } from '@/lib/utils';
// Import Data
// Import Assets & Icons

/**
 * A component that displays a breaker ad.
 */
export default function Breaker({ className }: { className?: string }) {
	return (
		<SubSectionOuterContainer id="breaker" className={className}>
			<SubSectionInnerContainer>
				<SubSectionContentContainer className="mt-0">
					<div className="md:flex rounded-lg bg-white dark:bg-background-secondary">
						<Image
							className="h-60 w-auto object-cover rounded-xl drop-shadow-xl -rotate-6 hidden md:block"
							src="/img/ranch.png"
							alt="Ranch with cows"
							fetchPriority="high"
							width={600}
							height={400}
						/>
						<div className="col-span-1" />
						<div className="flex align-middle mx-auto col-span-2 self-center">
							<div className="p-6 xl:p-8 mx-auto h-fit">
								<h2 className="text-base font-semibold leading-7 text-muted-foreground">
									Have Your Own Farm?
								</h2>
								<p className="my-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl uppercase">
									Claim Your Listing Today
								</p>
								<Image
									className="h-auto w-full object-cover rounded-lg md:hidden"
									src="/img/ranch.png"
									alt="Ranch with cows"
									fetchPriority="high"
									width={600}
									height={400}
								/>
								<p className="mt-4 text-base leading-7 text-muted-foreground">
									Whether you&apos;re just getting started or looking to grow
									your farm business, we have the tools and resources to help
									you succeed.
								</p>
								<div className="mt-2">
									<Link
										href="/account"
										className={cn(
											buttonVariants({ variant: 'outline', size: 'lg' }),
											'bg-white dark:hover:bg-white/70 dark:text-black rounded-full text-foreground py-4 border border-black'
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
				</SubSectionContentContainer>
			</SubSectionInnerContainer>
		</SubSectionOuterContainer>
	);
}
