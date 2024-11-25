'use client';
// Import Types
// Import External Packages
import { useState } from 'react';
// Import Components
import { Button } from '@/ui/Button';
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogHeader,
} from '@/ui/Dialog';
// Import Functions & Actions & Hooks & State
import deleteSubcategory from '@/actions/subcategories/deleteSubcategory';
// Import Data
// Import Assets & Icons
import { XCircleIcon } from 'lucide-react';

export default function SubcategoryDeleteModal({
	subcategoryId,
	buttonSize = 'sm',
	buttonVariant = 'outline',
}: {
	subcategoryId: string;
	buttonSize?: 'lg' | 'sm';
	buttonVariant?: 'default' | 'outline';
}) {
	const [dialogOpen, setDialogOpen] = useState(false);

	return (
		<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
			<DialogTrigger asChild>
				<Button variant={buttonVariant} size={buttonSize}>
					<XCircleIcon className="h-4 w-4 mr-1 text-primary" />{' '}
					<span className="sr-only">Delete subcategory</span>
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						Are you sure you want to delete this subcategory?
					</DialogTitle>
				</DialogHeader>

				<div className="flex gap-2 mt-6">
					<Button
						variant="default"
						type="button"
						size="lg"
						disabled={!subcategoryId}
						onClick={async () => {
							await deleteSubcategory(subcategoryId), setDialogOpen(false);
						}}
					>
						Yes, delete this subcategory
					</Button>
					<Button
						variant="outline"
						type="button"
						size="lg"
						disabled={!subcategoryId}
						onClick={async () => {
							setDialogOpen(false);
						}}
					>
						No, keep this subcategory
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
