// Import Types
// Import External Packages
import { Suspense } from 'react';
import Image from 'next/image';
// Import Components
import TopBanner from '@/components/__home/TopBanner';
import VideoBreaker from './_components/__home/VideoBreaker';
import SublistingOverview from './_components/sublistings/SublistingOverview';
import SubategoryQuickLinks from './_components/__home/SubcategoryQuickLinks';
import ListingOverview from '@/components/listings/ListingOverview';
import { SectionOuterContainer } from '@/ui/Section';
import Searchbar from '@/components/Searchbar';
import Breaker from '@/components/__home/Breaker';
import Navbar_Public from '@/components/Navbar_Public';
import FAQ from '@/components/__home/FAQ';
import NewsletterBox_BeeHiiv from '@/components/NewsletterSection';
import TestimonialBand from '@/components/__home/TestimonialBand';
// Import Functions & Actions & Hooks & State
// Import Data
import { HERO_TITLE, HERO_SLOGAN } from '@/constants';

// Import Assets & Icons

export default async function Page() {
	return (
		<>
			<TopBanner />

			<Navbar_Public />

			<SectionOuterContainer className="mx-auto py-0">
				<div className="bg-primary relative">
					<div className="w-full h-fit pt-6  max-w-5xl mx-auto">
						<div className="grid space-y-2 justify-left mx-auto max-w-5xl pt-8 overflow-hidden">
							<div className="max-w-2xl z-20">
								<h1 className="text-4xl sm:text-4xl flex flex-wrap gap-4 text-white font-medium uppercase">
									{HERO_TITLE}
								</h1>
								<p className=" text-lg leading-8 font-normal text-white pt-4">
									{HERO_SLOGAN}
								</p>
								<div className="w-full pt-10">
									<Suspense fallback={null}>
										<NewsletterBox_BeeHiiv size="sm" />
									</Suspense>
								</div>
							</div>
							<Image
								src="/img/hero_highlight_center.png"
								width={200}
								height={203}
								alt="meat box"
								className="absolute right-[0%] lg:right-[10%] xl:right-[25%] -bottom-32 md:-bottom-28 lg:-bottom-8 scale-75 lg:scale-100 l z-10 w-[200px] h-[203px]"
								style={{ height: 'auto' }}
								priority
							/>
							<Image
								src="/img/hero_highlight_left.png"
								width={150}
								height={100}
								alt="meat knife"
								className="absolute -left-8 bottom-0 z-10 w-[150px] h-[100px]"
								priority
							/>
							<Image
								src="/img/hero_highlight_right.png"
								width={150}
								height={100}
								alt="steak stake"
								className="absolute -right-0 top-8 z-10  w-[150px] h-[100px]"
								priority
							/>
						</div>
					</div>
				</div>

				<SublistingOverview
					title="FEATURED PRODUCTS"
					buttonText="View All Products"
					buttonHref="/products?sort=mostPopular"
					filterAndSortParams={{ sort: 'mostPopular' }}
					maxNumSublistings={8}
					maxCols={4}
					preferPromoted
					showPagination={false}
					showSearch={false}
					className="bg-background-secondary pt-32"
					showAsRow
				/>

				<div className="w-full relative">
					<Image
						src="/img/featured_farms_1.png"
						width={150}
						height={150}
						alt="steak stake"
						className="absolute -left-0 top-8 z-10  w-[150px] h-[100px]"
					/>

					<Image
						src="/img/featured_farms_2.png"
						width={150}
						height={150}
						alt="steak stake"
						className="absolute -right-0 bottom-8 z-10  w-[150px] h-[100px]"
					/>

					<ListingOverview
						title="FEATURED FARMS"
						buttonText="View All Farms"
						buttonHref="/explore?sort=mostPopular"
						filterAndSortParams={{ sort: 'mostPopular' }}
						maxNumListings={3}
						maxCols={3}
						showPagination={false}
						showSearch={false}
					/>
				</div>

				<Breaker className="bg-background-secondary" />

				<SubategoryQuickLinks />

				<TestimonialBand className="bg-background-secondary" />

				<FAQ title="HOW IT WORKS" description="" />

				<VideoBreaker className="bg-background-secondary" />

				<NewsletterBox_BeeHiiv />
			</SectionOuterContainer>
		</>
	);
}
