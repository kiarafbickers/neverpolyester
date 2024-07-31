'use client';
// Import Types
import { FullCategoryType } from '@/supabase-special-types';
// Import External Packages
import { useFormState } from 'react-dom';
import { useState } from 'react';
// Import Components
import { Textarea } from '@/ui/Textarea';
import { Button } from '@/ui/Button';
import { Input } from '@/ui/Input';
import { Label } from '@/ui/Label';
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
	DialogHeader,
} from '@/ui/Dialog';
// Import Functions & Actions & Hooks & State
import getCategoryDescriptionWithAi from '@/actions/categories/getCategoryDescriptionWithAi';
import upsertCategory from '@/actions/categories/upsertCategory';
// Import Data
// Import Assets & Icons
import { PlusCircleIcon, SparklesIcon } from 'lucide-react';

// We can use this for categories as well because the data structure is the same
export default function CategoryEditModal({
	category,
	buttonSize = 'sm',
	buttonVariant = 'default',
}: {
	category: FullCategoryType | null;
	buttonSize?: 'lg' | 'sm';
	buttonVariant?: 'default' | 'outline';
}) {
	const [state, formAction] = useFormState(upsertCategory, undefined);
	const [categoryName, setCategoryName] = useState<string>(
		category?.name || ''
	);
	const [categoryDescription, setCategoryDescription] = useState<string>(
		category?.description || ''
	);
	const [categoryHeadline, setCategoryHeadline] = useState<string>(
		category?.headline || ''
	);
	const [aiIsLoading, setAiIsLoading] = useState<boolean>(false);
	const [dialogOpen, setDialogOpen] = useState(false);

	const handleCategoryAI = async () => {
		setAiIsLoading(true);
		if (!categoryName) {
			setAiIsLoading(false);
			return null;
		}
		const aiData = await getCategoryDescriptionWithAi(categoryName);
		if (aiData.error) {
			console.error(aiData.error);
			setAiIsLoading(false);
			return null;
		}
		setCategoryDescription(aiData.data.description);
		setCategoryHeadline(aiData.data.headline);
		setAiIsLoading(false);
	};

	return (
		<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
			<DialogTrigger asChild>
				<Button variant={buttonVariant} size={buttonSize}>
					{category?.id ? (
						`Edit`
					) : (
						<>
							{' '}
							<PlusCircleIcon className="h-4 w-4 mr-1" /> Add new category
						</>
					)}
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>
						{category?.id ? `Update a category` : `Add a category`}
					</DialogTitle>
					<DialogDescription className="flex">
						{category ? (
							<span>Update the details below.</span>
						) : (
							<span>Not enough, yet? Add one!</span>
						)}
					</DialogDescription>
				</DialogHeader>

				<form
					action={formAction}
					onSubmit={() =>
						state?.success
							? (setDialogOpen(false),
							  setCategoryDescription(''),
							  setCategoryName(''),
							  setCategoryHeadline(''))
							: {}
					}
				>
					<div className="grid gap-4 w-full">
						<Input
							id="slug"
							placeholder="automatic"
							name="slug"
							type="hidden"
							value={category?.slug || ''}
						/>

						<Input
							id="id"
							placeholder="automatic"
							name="id"
							type="hidden"
							value={category?.id || ''}
						/>

						<div className="grid gap-2">
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								placeholder="Category name"
								name="name"
								type="text"
								onChange={(e) => setCategoryName(e.target.value)}
								minLength={2}
								value={categoryName}
							/>
							{!state ||
								(!state.success &&
									state?.errors?.name &&
									state?.errors?.name?.length > 0 && (
										<div className="text-red-500 text-xs">
											<p>Category Name must:</p>
											<ul>
												{state.errors.name.map((error) => (
													<li key={error}>- {error}</li>
												))}
											</ul>
										</div>
									))}
						</div>
						<div className="grid gap-2">
							<Label htmlFor="headline">Headline (max 60 char)</Label>
							<Textarea
								id="headline"
								placeholder="Category headline"
								name="headline"
								onChange={(e) => setCategoryHeadline(e.target.value)}
								minLength={10}
								maxLength={60}
								value={categoryHeadline}
							/>
							{!state ||
								(!state.success &&
									state?.errors?.headline &&
									state?.errors?.headline?.length > 0 && (
										<div className="text-red-500 text-xs">
											<p>Category Headline must:</p>
											<ul>
												{state.errors.headline.map((error) => (
													<li key={error}>- {error}</li>
												))}
											</ul>
										</div>
									))}
						</div>
						<div className="grid gap-2">
							<Label htmlFor="description">Description (max 160 char)</Label>
							<Textarea
								id="description"
								placeholder="Category description"
								name="description"
								rows={6}
								onChange={(e) => setCategoryDescription(e.target.value)}
								minLength={10}
								maxLength={160}
								value={categoryDescription}
							/>
							{!state ||
								(!state.success &&
									state?.errors?.description &&
									state?.errors?.description?.length > 0 && (
										<div className="text-red-500 text-xs">
											<p>Category Description must:</p>
											<ul>
												{state.errors.description.map((error) => (
													<li key={error}>- {error}</li>
												))}
											</ul>
										</div>
									))}
						</div>
					</div>
					<div className="flex justify-between mt-4">
						<Button
							variant="outline"
							type="button"
							size="lg"
							onClick={async () => await handleCategoryAI()}
							disabled={!categoryName || aiIsLoading}
						>
							<SparklesIcon size={18} className="mr-2 stroke-2" />
							{aiIsLoading ? 'Loading..' : 'AI Gen'}
						</Button>
						<Button
							variant="default"
							type="submit"
							size="lg"
							disabled={
								!categoryName || !categoryHeadline || !categoryDescription
							}
						>
							Save
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
