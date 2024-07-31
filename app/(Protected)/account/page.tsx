// Import Types
// Import External Packages
import { redirect } from 'next/navigation';
import Link from 'next/link';
// Import Components
import {
	SectionOuterContainer,
	SectionTitle,
	SubSectionInnerContainer,
	SubSectionTitle,
} from '@/ui/Section';
// Import Functions & Actions & Hooks & State
import createSupabaseRLSClient from '@/lib/createSupabaseRLSClient';
import getListingStats from '@/actions/listings/getListingStats';
import serverAuth from '@/actions/auth/serverAuth';
// Import Data
// Import Assets & Icons

const formatter = Intl.NumberFormat('en', { notation: 'compact' });

export default async function Dashboard() {
	const { user, error } = await serverAuth({ checkUser: true });

	if (user && 'is_active' in user && user.is_active === false) {
		const supabase = createSupabaseRLSClient();
		await supabase.auth.signOut();
		return redirect('/auth-error');
	}

	if (!user || error) {
		return redirect('/sign-up');
	}

	const { data: stats } = await getListingStats(user.id);

	const sumOfAllListings = stats.total_listings;
	const sumOfAllLikes = stats.total_likes;
	const sumOfAllViews = stats.total_views;
	const sumOfAllClicks = stats.total_clicks;

	return (
		<SectionOuterContainer>
			<SectionTitle>Dashboard</SectionTitle>
			{!user && <>You Are not Logged In!</>}
			<SubSectionInnerContainer>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
					<div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-4">
						<p className="text-2xl text-muted-foreground">
							{formatter.format(sumOfAllListings).toLocaleString()}
						</p>
						<h3 className="text-lg font-bold tracking-tight">Total Listings</h3>
					</div>
					<div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-4">
						<p className="text-2xl text-muted-foreground">
							{formatter.format(sumOfAllViews).toLocaleString()}
						</p>
						<h3 className="text-lg font-bold tracking-tight">Total Views</h3>
					</div>
					<div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-4">
						<p className="text-2xl text-muted-foreground">
							{formatter.format(sumOfAllLikes).toLocaleString()}
						</p>
						<h3 className="text-lg font-bold tracking-tight">Total Likes</h3>
					</div>
					<div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-4">
						<p className="text-2xl text-muted-foreground">
							{formatter.format(sumOfAllClicks).toLocaleString()}
						</p>
						<h3 className="text-lg font-bold tracking-tight">Total Clicks</h3>
					</div>
				</div>

				<div className="place-self-start mt-8">
					<SubSectionTitle className="text-left md:text-xl">
						Quick Links
					</SubSectionTitle>
					<ul className="grid grid-cols-2 gap-2">
						<li>
							<Link href="/account/listings" className="text-blue-500">
								Manage Your Listings
							</Link>
						</li>
						<li>
							<Link href="/account/new-listing" className="text-blue-500">
								Create New Listing
							</Link>
						</li>
						<li>
							<Link href="/account/posts" className="text-blue-500">
								Manage Your Blog Posts
							</Link>
						</li>
						<li>
							<Link href="/account/new-post" className="text-blue-500">
								Create New Blog Post
							</Link>
						</li>
						<li>
							<Link href="/account/settings" className="text-blue-500">
								Manage Account Settings
							</Link>
						</li>
					</ul>
				</div>
			</SubSectionInnerContainer>
		</SectionOuterContainer>
	);
}
