'use client';
// Import Types
import { FullTagType } from '@/supabase-special-types';
// Import External Packages
import Link from 'next/link';
// Import Components
import { buttonVariants } from '@/ui/Button';
import TagDeleteModal from './TagDeleteModal';
import Pagination from '@/ui/Pagination';
import { Input } from '@/ui/Input';
import { Badge } from '@/ui/Badge';
// Import Functions & Actions & Hooks & State
import usePagination from '@/lib/usePagination';
import { cn } from '@/utils';
// Import Data
// Import Assets & Icons

export default function TagTable({ tags }: { tags: FullTagType[] | null }) {
	const data = tags === null ? [] : tags;

	const {
		currentData,
		currentPage,
		totalPages,
		itemsPerPage,
		paginateBack,
		paginateFront,
		paginateBackFF,
		paginateFrontFF,
		setItemsPerPage,
		setSearchTerm,
	} = usePagination({
		initialItemsPerPage: 5,
		data: data,
		searchField: 'name',
	});

	return (
		<>
			<div className="w-full flex justify-end">
				<Input
					className="w-58"
					placeholder="Search by name..."
					onChange={(e) => setSearchTerm(e.target.value || '')}
				/>
			</div>
			<div className="table table-auto w-full mt-6">
				<div className="table-header-group">
					<div className="table-row text-sm">
						<div className="table-cell h-10 px-2 text-left align-middle font-medium whitespace-nowrap border-b-2 border-neutral-200">
							Tag Name
						</div>
						<div className="hidden sm:table-cell h-10 px-2 text-left align-middle font-medium  border-b-2 border-neutral-200">
							Headline
						</div>
						<div className="hidden sm:table-cell h-10 px-2 text-left align-middle font-medium  border-b-2 border-neutral-200">
							Description
						</div>
						<div className="table-cell w-24 h-10 px-2 text-left align-middle font-medium  border-b-2 border-neutral-200">
							Edit / Delete
						</div>
					</div>
				</div>
				<div className="table-row-group">
					{currentData.map((tag) => (
						<div key={tag.id} className="table-row h-auto">
							<div className="table-cell content-center font-medium p-2 align-middle border-b-2 border-neutral-200">
								<Badge variant="default" className="whitespace-nowrap">
									{tag.name}
								</Badge>
							</div>
							<div className="hidden sm:table-cell content-center p-2 text-sm text-muted-foreground overflow-hidden  border-b-2 border-neutral-200">
								{tag.headline}
							</div>

							<div className="hidden sm:table-cell content-center p-2 text-sm text-muted-foreground overflow-hidden  border-b-2 border-neutral-200">
								{tag.description}
							</div>

							<div className="table-cell content-center p-2  border-b-2 border-neutral-200">
								<div className="flex gap-2">
									<Link
										href={`/secret-admin/tag-manager/` + tag.id}
										className={cn(
											buttonVariants({ variant: 'outline', size: 'sm' })
										)}
									>
										Edit
									</Link>
									<TagDeleteModal tagId={tag.id} />
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<Pagination
				itemsPerPage={itemsPerPage}
				totalItems={data.length}
				paginateBack={paginateBack}
				paginateFront={paginateFront}
				paginateBackFF={paginateBackFF}
				paginateFrontFF={paginateFrontFF}
				currentPage={currentPage}
				totalPages={totalPages}
				setItemsPerPage={setItemsPerPage}
				pageSizeOptions={[5, 10, 25, 50]}
				nameOfItems="items"
			/>
		</>
	);
}
