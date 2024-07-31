'use client';

// Import Types
import { TagType } from '@/supabase-special-types';
import { ValueLabelPair } from '@/types';
// Import External Packages
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
// Import Components
import { Button } from '@/ui/Button';
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
// Import Data
// Import Assets & Icons
import { X } from 'lucide-react';

/**
 * Renders a tag search box component.
 * @param tags - An array of tags.
 */
export function TagSearchBox({ tags }: { tags: TagType[] }) {
	const [allTags, setAllTags] = useState<ValueLabelPair[]>([]);
	const [selected, setSelected] = useState<ValueLabelPair[]>([]);
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const Router = useRouter();

	useEffect(() => {
		if (tags.length === 0) return;
		const formattedTags: ValueLabelPair[] = tags.map((tag) => {
			return {
				value: tag.slug,
				label: tag.name,
			};
		});
		setAllTags(formattedTags);

		const searchTags = searchParams.get('tags');

		if (!searchTags) return;

		const preSelected = searchTags
			.split(',')
			.map((searchTag) => formattedTags.find((tag) => tag.value === searchTag))
			.filter(Boolean) as ValueLabelPair[];

		setSelected(preSelected);
	}, [tags, searchParams]);

	const handleSelect = (value: string, type: 'add' | 'remove') => {
		const currentUrl = new URL(window.location.href);
		const currentSearchParams = new URLSearchParams(currentUrl.search);

		if (value === '' && type === 'remove') {
			currentSearchParams.delete('tags');
			setSelected([]);
			Router.push(pathname + currentSearchParams.toString(), { scroll: false });
			return;
		}
		const newTag = allTags.find((tag) => tag.value === value);
		let newTagArray = [];
		if (!newTag) return;
		if (type === 'remove') {
			newTagArray = selected.filter((tag) => tag.value !== value);
			setSelected((prev) => prev.filter((s) => s.value !== value));
		} else {
			newTagArray = selected.concat(newTag);
		}

		if (newTagArray.length === 0) {
			currentSearchParams.delete('tags');
			Router.push(pathname + '?' + currentSearchParams.toString(), {
				scroll: false,
			});
			return;
		}
		const newTagString = newTagArray.map((tag) => tag.value).join(',');
		currentSearchParams.set('tags', newTagString);
		const finalUrl = pathname + '?' + currentSearchParams.toString();
		Router.push(finalUrl, { scroll: false });
	};

	const selectables = allTags.filter(
		(tag) => !selected.some((selectedTag) => selectedTag.value === tag.value)
	);

	return (
		<div className="overflow-visible relative w-full md:w-96 flex flex-col items-start">
			<div className="w-full flex justify-between items-end">
				<p className="text-sm font-semibold py-2">Filter by...</p>
				<Button
					variant="link"
					className="self-end text-xs text-black"
					onClick={() => handleSelect('', 'remove')}
				>
					clear
				</Button>
			</div>

			<Select
				onValueChange={(value) => {
					handleSelect(value, 'add');
				}}
				value={''}
			>
				<SelectTrigger className="w-full overflow-x-clip">
					{selected.length > 0
						? (selected.length === 1 ? 'Tag: ' : 'Tags: ') +
						  selected.map((selection) => selection.label).join(', ')
						: 'Tags'}
				</SelectTrigger>
				<SelectContent className="bg-white text-black dark:bg-black dark:text-white">
					<SelectGroup>
						<SelectLabel>
							{selectables.length > 0 ? 'Tags' : 'You selected all tags!'}
						</SelectLabel>
						{selectables.map((tag) => (
							<SelectItem
								key={tag.value}
								value={tag.value}
								className="hover:bg-neutral-100 hover:dark:text-black cursor-pointer"
							>
								{tag.label}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
			<div className="flex gap-1 flex-wrap max-h-24 overflow-auto mt-1 p-1">
				{selected.map((tag) => (
					<Badge key={tag.value} variant="outline" className="z-50">
						{tag.label}
						<button
							className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-primary"
							onClick={() => handleSelect(tag.value, 'remove')}
						>
							<X className="h-3 w-3" />
						</button>
					</Badge>
				))}
			</div>
		</div>
	);
}
