// Import Types
import { Metadata } from 'next';
// Import External Packages
import { Suspense } from 'react';
import Link from 'next/link';
// Import Components
import ComponentMultiplier from '@/ui/ComponentMultiplier';
import ListingTable from '@/components/listings/ListingTable';
import { buttonVariants } from '@/ui/Button';
import { Skeleton } from '@/ui/Skeleton';
import { SectionOuterContainer, SectionTitle } from '@/ui/Section';
// Import Functions & Actions & Hooks & State
import getListingsByUserId from '@/actions/listings/getListingsByUserId';
import serverAuth from '@/actions/auth/serverAuth';
import { cn } from '@/lib/utils';
import {
	Card,
	CardHeader,
	CardDescription,
	CardContent,
} from '@/components/_ui/Card';
import { PlusIcon } from 'lucide-react';
// Import Data
// Import Assets & Icons

export const metadata: Metadata = {
	title: `Listings Overview`,
};

export default async function ListingPage() {
	const { user, error } = await serverAuth({
		mustBeSignedIn: true,
		checkAdmin: true,
	});

	if (!user || error) {
		return error;
	}

	// Listings that belong to the user
	const { data: listingData } = await getListingsByUserId(user.id);

	return (
		<SectionOuterContainer className="grid flex-1 items-start gap-4 px-6 sm:px-0 py-6">
			<div className="flex justify-end space-x-2">
				<Link
					href="/account/new-listing"
					className={cn(buttonVariants({ variant: 'default', size: 'sm' }))}
				>
					<PlusIcon className="h-4 w-4" />
					New Listing
				</Link>
			</div>
			<Card>
				<CardHeader>
					<SectionTitle>Your Listings</SectionTitle>

					<CardDescription>
						Here, you&apos;ll find an overview of all your listings. You can
						update a listing by clicking on the &apos;Edit&apos;-button.
					</CardDescription>
				</CardHeader>
				<CardContent>
					{listingData.length === 0 ? (
						<div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm min-h-96">
							<div className="flex flex-col items-center gap-1 text-center">
								<h3 className="text-2xl font-bold tracking-tight">
									You have no listings
								</h3>
								<p className="text-sm text-muted-foreground">
									We will display your listings here, once you add them.
								</p>

								<Link
									href="/account/new-listing"
									className={cn(
										buttonVariants({ variant: 'default', size: 'lg' }),
										'my-4'
									)}
								>
									Add Listing
								</Link>
							</div>
						</div>
					) : (
						<Suspense
							fallback={
								<ComponentMultiplier
									component={<Skeleton className="w-full h-[40px]" />}
									multiplier={1}
								/>
							}
						>
							<ListingTable listings={listingData} />
						</Suspense>
					)}
				</CardContent>
			</Card>
		</SectionOuterContainer>
	);
}
