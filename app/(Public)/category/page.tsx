// Import Types
import { Metadata } from 'next';
// Import External Packages
import Link from 'next/link';
// Import Components
import {
	SectionDescription,
	SectionOuterContainer,
	SectionTitle,
} from '@/ui/Section';
// Import Functions & Actions & Hooks & State
import getFullCategories from '@/actions/categories/getFullCategories';
import createMetaData from '@/lib/createMetaData';
// Import Data
import { COMPANY_BASIC_INFORMATION } from '@/constants';
// Import Assets & Icons
import { Suspense } from 'react';

export const metadata: Metadata = createMetaData({
	customTitle: 'Categories',
	customDescription: `See all categories used on ${COMPANY_BASIC_INFORMATION.NAME}. Quickly find what you are looking for by clicking on a category. Categories are used to categorize and filter listings.`,
	customSlug: `category`,
});

const explanationOfCategories =
	'Categories are used to categorize and filter listings. Quickly find what you are looking for by clicking on a category.';

export default async function Page() {
	const { data: categoryData } = await getFullCategories('active');
	return (
		<SectionOuterContainer className="px-8 lg:px-12">
			<SectionTitle className="text-4xl md:text-5xl">
				Browse all Categories
			</SectionTitle>
			<SectionDescription className=" py-12 text-base">
				{explanationOfCategories}
			</SectionDescription>
			<Suspense fallback={null}>
				<table className="table-auto">
					<thead>
						<tr className="table-row text-sm bg-muted">
							<th className="table-cell px-2 text-left align-middle text-lg font-semibold italic">
								Category
							</th>
							<th className="table-cell px-2 text-left align-middle text-lg font-semibold italic">
								Description
							</th>
						</tr>
					</thead>
					<tbody>
						{categoryData.map((category) => (
							<tr key={category.id} className="h-20">
								<td className="p-2 text-lg font-semibold whitespace-nowrap">
									<Link
										href={`/category/${category.slug}`}
										className="underline"
									>
										{category.name}
									</Link>
								</td>
								<td className="p-2 text-base text-muted-foreground">
									{category.description}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</Suspense>
		</SectionOuterContainer>
	);
}
