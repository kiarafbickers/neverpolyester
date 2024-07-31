'use client';

// Import Types
// Import External Packages
import { useState, useEffect } from 'react';
// Import Components
import { Badge } from '@/ui/Badge';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
} from '@/ui/Select';
// Import Functions & Actions & Hooks & State
import { noWhiteSpaceString } from '@/lib/utils';
// Import Data
// Import Assets & Icons
import { X } from 'lucide-react';

export function TagSelect({
	possibleTags,
	selectedTags,
	updaterFunction,
}: {
	possibleTags: { name: string }[];
	selectedTags: { name: string }[] | null;
	updaterFunction: (value: { name: string }[], config?: Object) => void;
}) {
	const [allTags, setAllTags] = useState<{ name: string }[]>([]);
	const [selected, setSelected] = useState<{ name: string }[]>([]);

	useEffect(() => {
		setAllTags(
			possibleTags.map((tag) => ({
				name: noWhiteSpaceString(tag.name),
			}))
		);
		if (selectedTags)
			setSelected(
				selectedTags.map((tag) => ({
					name: noWhiteSpaceString(tag.name),
				}))
			);
	}, [possibleTags, selectedTags]);

	const handleSelect = (value: string | undefined, type: 'add' | 'remove') => {
		if (value === '' && type === 'remove') {
			setSelected([]);
			return;
		}
		const newTag = allTags.find((tag) => tag.name === value);
		let newTagArray = [];
		if (!newTag) return;
		if (type === 'remove') {
			newTagArray = selected.filter((tag) => tag.name !== value);
			setSelected((prev) => prev.filter((s) => s.name !== value));
		} else {
			newTagArray = selected.concat(newTag);
			setSelected((prev) => prev.concat(newTag));
		}
		updaterFunction(newTagArray);
	};

	const selectables = allTags.filter(
		(tag) => !selected.some((selectedTag) => selectedTag.name === tag.name)
	);

	return (
		<div className="overflow-visible relative w-full flex flex-col items-start">
			<div className="w-full flex justify-between items-center">
				<p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pb-3">
					Tag Select
				</p>
			</div>

			<Select
				onValueChange={(value) => {
					handleSelect(value, 'add');
				}}
				value={''}
			>
				<SelectTrigger className="text-muted-foreground">
					Choose some Tags
				</SelectTrigger>
				<SelectContent className="bg-white text-black dark:bg-black dark:text-white">
					<SelectGroup>
						<SelectLabel>
							{selectables.length > 0 ? 'Tags' : 'You selected all tags!'}
						</SelectLabel>
						{selectables.map((tag) => (
							<SelectItem
								key={tag.name}
								value={tag.name!}
								className="hover:bg-neutral-100 hover:dark:text-black cursor-pointer"
							>
								{tag.name}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
			<div className="flex gap-1 flex-wrap max-h-24 overflow-auto mt-1 p-1">
				{selected.map((tag) => (
					<Badge key={tag.name} variant="outline" className="z-50">
						{tag.name}
						<button
							className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-primary"
							onClick={() => handleSelect(tag.name, 'remove')}
						>
							<X className="h-3 w-3" />
						</button>
					</Badge>
				))}
			</div>
		</div>
	);
}
