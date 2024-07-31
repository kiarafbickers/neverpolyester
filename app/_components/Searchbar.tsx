'use client';
// Import Types
// Import External Packages
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { z } from 'zod';
// Import Components
import { Input } from '@/ui/Input';
import { Button } from '@/ui/Button';
// Import Functions & Actions & Hooks & State
import { cn, removeSpecialCharacters } from '@/utils';
// Import Data
// Import Assets & Icons
import { SearchIcon } from 'lucide-react';

const searchSchema = z.object({
	search: z.string().min(2),
});

/**
 * Searchbar component.
 *
 * @component
 * @param placeholder - The placeholder text for the search input.
 * @param className - The CSS class name for the component.
 * @param id - The HTML id attribute for the component.
 */
export default function Searchbar({
	placeholder,
	className,
	id,
}: {
	placeholder?: string;
	className?: string;
	id?: string;
}) {
	const Router = useRouter();

	const [disableButton, setDisableButton] = useState(false);
	const [currentSearchQuery, setCurrentSearchQuery] = useState<string>();

	const {
		watch,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof searchSchema>>({
		resolver: zodResolver(searchSchema),
	});

	let tempSearchQuery = '';

	if (typeof window !== 'undefined') {
		const currentUrl = new URL(window.location.href);
		const currentSearchParams = new URLSearchParams(currentUrl.search);
		tempSearchQuery = currentSearchParams.get('search') || '';
	}

	useEffect(() => {
		if (tempSearchQuery && tempSearchQuery !== '') {
			setCurrentSearchQuery(removeSpecialCharacters(tempSearchQuery));
			setDisableButton(false);
		} else {
			setCurrentSearchQuery(removeSpecialCharacters(tempSearchQuery));
		}
	}, [tempSearchQuery]);

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setDisableButton(true);
		const search = removeSpecialCharacters(data['search'] as string);
		setCurrentSearchQuery(search);
		if (typeof window !== 'undefined') {
			const currentUrl = new URL(window.location.href);
			const currentSearchParams = new URLSearchParams(currentUrl.search);
			currentSearchParams.set('search', search);
			Router.push(`/explore?${currentSearchParams.toString()}`, {
				scroll: false,
			});
		}
	};

	return (
		<div id={id} className={className}>
			<form onSubmit={handleSubmit(onSubmit)} className="flex space-x-2">
				<Input
					id="search"
					type="text"
					placeholder={
						placeholder ||
						'Search our collection with AI: I need a tool that...'
					}
					defaultValue={currentSearchQuery}
					{...register('search')}
					className={cn(
						'bg-white dark:bg-black',
						errors.search ? 'border-red-500' : ''
					)}
				/>
				<div className="bg-white dark:bg-black rounded-md">
					<Button
						variant="outline"
						type="submit"
						className="text-xs font-medium"
						data-umami-event="Search"
						data-umami-event-input={watch('search')}
						disabled={watch('search') === currentSearchQuery || disableButton}
					>
						<span>
							<SearchIcon size={14} />
						</span>
						<span className="hidden lg:block ml-1">Search</span>
					</Button>
				</div>
			</form>
		</div>
	);
}
