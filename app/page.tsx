// Import Types
// Import External Packages
import { Suspense } from 'react';
import Image from 'next/image';
// Import Components
import BreakerPropose from '@/components/__home/BreakerPropose';
import CategoryQuickLinks from '@/components/__home/CategoryQuickLinks';
import ListingOverview from '@/components/listings/ListingOverview';
import { SectionOuterContainer } from '@/ui/Section';
import Searchbar from '@/components/Searchbar';
import CategoryBar from '@/components/categories/CategoryBar';
import Breaker from '@/components/__home/Breaker';
import Navbar_Public from '@/components/Navbar_Public';
import FAQ from '@/components/__home/FAQ';
// Import Functions & Actions & Hooks & State
import { backgroundPattern } from '@/lib/utils';
// Import Data
import { HERO_TITLE, HERO_SLOGAN } from '@/constants';
// Import Assets & Icons

export default async function Page() {
	return (
		<>
			<Navbar_Public />

			<SectionOuterContainer className="mx-auto max-w-5xl px-2 lg:px-2 py-0 pb-12">
				<CategoryBar
					text="Trending Categories"
					className="self-start"
					badgeClassName="hover:bg-muted/60"
					hrefPrefix="/category/"
				/>

				<div className="rounded-xl bg-black">
					<div className="w-full z-10 relative isolate overflow-hidden rounded-md">
						<Image
							src="/img/hero_main.jpg"
							alt="Hero Image"
							className="absolute inset-0 -z-10 h-full w-full object-cover"
							width={1920}
							height={1080}
							priority
						/>
						<div
							className="text-center relative py-6 z-50 bg-black/30"
							style={{ backgroundImage: backgroundPattern('boxes-sm') }}
						>
							<div className="w-full h-fit p-6">
								<div className="grid space-y-2 justify-center mx-auto max-w-2xl">
									<h1 className="text-5xl sm:text-7xl flex flex-wrap justify-center gap-4 text-white font-black [text-shadow:0_4px_12px_rgba(0,0,0,0.6)]">
										{HERO_TITLE}
									</h1>
									<p className="text-xl font-semibold text-white pt-4 [text-shadow:0_4px_12px_rgba(0,0,0,0.6)]">
										{HERO_SLOGAN}
									</p>
									<Suspense fallback={null}>
										<Searchbar className="pt-4" id="hero_search" />
									</Suspense>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="mx-auto max-w-7xl">
					<ListingOverview
						title="Recently Added"
						buttonText="Show more new listings"
						buttonHref="/explore?sort=newest"
						filterAndSortParams={{ sort: 'newest' }}
						maxNumListings={3}
						maxCols={3}
						showPagination={false}
					/>
					<BreakerPropose />

					<ListingOverview
						title="The Most Liked"
						buttonText="Show all best rated listings"
						buttonHref="/explore?sort=mostPopular"
						filterAndSortParams={{ sort: 'mostPopular' }}
						maxNumListings={3}
						preferPromoted
						showPagination={false}
					/>
					<CategoryQuickLinks />
				</div>
				<FAQ className="py-14 mx-auto text-center" />
				<Breaker />
			</SectionOuterContainer>
		</>
	);
}
