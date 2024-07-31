// Import Types
import { Metadata } from 'next';
// Import External Packages
import { Suspense } from 'react';
// Import Components
import CategoryEditModal from './_components/CategoryEditModal';
import CategoryTable from './_components/CategoryTable';
import ComponentMultiplier from '@/ui/ComponentMultiplier';
import { Skeleton } from '@/ui/Skeleton';
import { SectionOuterContainer, SectionTitle } from '@/ui/Section';
import {
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	Card,
} from '@/ui/Card';
// Import Functions & Actions & Hooks & State
import getFullCategories from '@/actions/categories/getFullCategories';
import serverAuth from '@/actions/auth/serverAuth';
// Import Data
// Import Assets & Icons
// Import Types

export const metadata: Metadata = {
	title: `Admin Area: Category Manager`,
};

export default async function CategoryManagerPage() {
	const { error } = await serverAuth({ mustBeAdmin: true });

	if (error) {
		return error;
	}

	const { data: categoryData } = await getFullCategories('all');

	return (
		<SectionOuterContainer className="grid flex-1 items-start gap-4 py-6">
			<div className="flex justify-end space-x-2">
				<CategoryEditModal category={null} />
			</div>
			<Card>
				<CardHeader>
					<SectionTitle>Category Manager</SectionTitle>
					<CardDescription>
						Here you can add, edit, and delete categories. Each listing can be
						assigned to exactly 1 category.
					</CardDescription>
				</CardHeader>

				<CardContent>
					{categoryData && categoryData.length === 0 ? (
						<div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm min-h-96">
							<div className="flex flex-col items-center gap-1 text-center">
								<h3 className="text-2xl font-bold tracking-tight">
									You have no categories!
								</h3>
								<p className="text-sm text-muted-foreground">
									We will display your categories here, once you add them.
								</p>

								<CategoryEditModal category={null} />
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
							<CategoryTable categories={categoryData} />
						</Suspense>
					)}
				</CardContent>
			</Card>
		</SectionOuterContainer>
	);
}
