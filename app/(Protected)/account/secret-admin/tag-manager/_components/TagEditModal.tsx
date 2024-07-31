'use client';
// Import Types
import { FullTagType } from '@/supabase-special-types';
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
import getTagDescriptionWithAi from '@/actions/tags/getTagDescriptionWithAi';
import upsertTag from '@/actions/tags/upsertTag';
// Import Data
// Import Assets & Icons
import { PlusCircleIcon, SparklesIcon } from 'lucide-react';

export default function TagEditModal({
	tag,
	buttonSize = 'sm',
	buttonVariant = 'default',
}: {
	tag: FullTagType | null;
	buttonSize?: 'lg' | 'sm';
	buttonVariant?: 'default' | 'outline';
}) {
	const [state, formAction] = useFormState(upsertTag, undefined);
	const [tagName, setTagName] = useState<string>(tag?.name || '');
	const [tagDescription, setTagDescription] = useState<string>(
		tag?.description || ''
	);
	const [tagHeadline, setTagHeadline] = useState<string>(tag?.headline || '');
	const [aiIsLoading, setAiIsLoading] = useState<boolean>(false);
	const [dialogOpen, setDialogOpen] = useState(false);

	const handleTagAI = async () => {
		setAiIsLoading(true);
		if (!tagName) {
			setAiIsLoading(false);
			return null;
		}
		const aiData = await getTagDescriptionWithAi(tagName);
		if (!aiData.success) {
			console.error(aiData.error);
			setAiIsLoading(false);
			return null;
		}
		setTagDescription(aiData.data.description);
		setTagHeadline(aiData.data.headline);
		setAiIsLoading(false);
	};
	return (
		<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
			<DialogTrigger asChild>
				<Button variant={buttonVariant} size={buttonSize}>
					{tag ? (
						`Edit`
					) : (
						<>
							{' '}
							<PlusCircleIcon className="h-4 w-4 mr-1" /> Add new tag
						</>
					)}
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{tag ? `Update a tag` : `Add a tag`}</DialogTitle>
					<DialogDescription className="flex">
						{tag ? (
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
							  setTagDescription(''),
							  setTagName(''),
							  setTagHeadline(''))
							: {}
					}
				>
					<div className="grid gap-4 w-full">
						<Input
							id="slug"
							placeholder="automatic"
							name="slug"
							type="hidden"
							value={tag?.slug || ''}
						/>

						<Input
							id="id"
							placeholder="automatic"
							name="id"
							type="hidden"
							value={tag?.id || ''}
						/>

						<div className="grid gap-2">
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								placeholder="Tag name"
								name="name"
								type="text"
								defaultValue={tagName ?? ''}
								onChange={(e) => setTagName(e.target.value)}
								minLength={2}
							/>
							{!state ||
								(!state.success &&
									state?.errors?.name &&
									state?.errors?.name?.length > 0 && (
										<div className="text-red-500 text-xs">
											<p>Tag Name must:</p>
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
								placeholder="Tag headline"
								name="headline"
								defaultValue={tagHeadline ?? ''}
								onChange={(e) => setTagHeadline(e.target.value)}
								minLength={10}
								maxLength={60}
							/>

							{!state ||
								(!state.success &&
									state?.errors?.headline &&
									state?.errors?.headline?.length > 0 && (
										<div className="text-red-500 text-xs">
											<p>Tag Headline must:</p>
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
								placeholder="Tag description"
								name="description"
								rows={6}
								defaultValue={tagDescription ?? ''}
								onChange={(e) => setTagDescription(e.target.value)}
								minLength={10}
								maxLength={160}
							/>
							{!state ||
								(!state.success &&
									state?.errors?.description &&
									state?.errors?.description?.length > 0 && (
										<div className="text-red-500 text-xs">
											<p>Tag Description must:</p>
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
							onClick={async () => await handleTagAI()}
							disabled={!tagName || aiIsLoading}
						>
							<SparklesIcon size={18} className="mr-2 stroke-2" />
							{aiIsLoading ? 'Loading..' : 'AI Gen'}
						</Button>
						<Button
							variant="default"
							type="submit"
							size="lg"
							disabled={!tagName || !tagHeadline || !tagDescription}
						>
							Save
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
