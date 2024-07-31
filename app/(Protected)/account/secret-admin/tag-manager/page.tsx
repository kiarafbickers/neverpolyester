// Import Types
import { Metadata } from 'next';
// Import External Packages
import { Suspense } from 'react';
// Import Components
import TagEditModal from './_components/TagEditModal';
import TagTable from './_components/TagTable';
import ComponentMultiplier from '@/ui/ComponentMultiplier';
import { Skeleton } from '@/ui/Skeleton';
import { SectionOuterContainer, SectionTitle } from '@/ui/Section';
import { CardHeader, CardDescription, CardContent, Card } from '@/ui/Card';
// Import Functions & Actions & Hooks & State
import getFullTags from '@/actions/tags/getFullTags';
import serverAuth from '@/actions/auth/serverAuth';
// Import Data
// Import Assets & Icons
// Import Types

export const metadata: Metadata = {
	title: `Admin Area: Tag Manager`,
};

export default async function TagManagerPage() {
	const { error } = await serverAuth({ mustBeAdmin: true });

	if (error) {
		return error;
	}

	const tagData = await getFullTags('all');

	return (
		<SectionOuterContainer className="grid flex-1 items-start gap-4 py-6">
			<div className="flex justify-end space-x-2">
				<TagEditModal tag={null} />
			</div>
			<Card>
				<CardHeader>
					<SectionTitle>Tag Manager</SectionTitle>
					<CardDescription>
						Here you can add, edit, and delete tags. Each listing can be
						assigned to multiple tags.
					</CardDescription>
				</CardHeader>

				<CardContent>
					{tagData && tagData.data.length === 0 ? (
						<div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm min-h-96">
							<div className="flex flex-col items-center gap-1 text-center">
								<h3 className="text-2xl font-bold tracking-tight">
									You have no tags!
								</h3>
								<p className="text-sm text-muted-foreground">
									We will display your tags here, once you add them.
								</p>

								<TagEditModal tag={null} />
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
							<TagTable tags={tagData.data} />
						</Suspense>
					)}
				</CardContent>
			</Card>
		</SectionOuterContainer>
	);
}
