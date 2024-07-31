// Import Types
// Import External Packages
import * as React from 'react';
// Import Components
// Import Functions & Actions & Hooks & State
import { cn } from '@/lib/utils';
// Import Data
// Import Assets & Icons

const SectionOuterContainer = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			'max-w-screen stretch mx-auto flex flex-col max-w-5xl py-12 px-2 lg:px-0',
			className
		)}
		{...props}
	/>
));
SectionOuterContainer.displayName = 'SectionOuterContainer';

const SectionTitle = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<h1
		ref={ref}
		className={cn(
			'font-semibold tracking-tight text-4xl dark:text-white',
			className
		)}
		{...props}
	/>
));
SectionTitle.displayName = 'SectionTitle';

const SectionDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<p
		ref={ref}
		className={cn('mt-2 text-muted-foreground', className)}
		{...props}
	/>
));
SectionDescription.displayName = 'SectionDescription';

const SubSectionOuterContainer = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div>
		<div
			ref={ref}
			className={cn('mx-auto w-full pb-4', className)}
			{...props}
		/>
	</div>
));
SubSectionOuterContainer.displayName = 'SubSectionOuterContainer';

const SubSectionInnerContainer = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn('flex flex-col w-full pt-4', className)}
		{...props}
	/>
));
SubSectionInnerContainer.displayName = 'SubSectionInnerContainer';

const SubSectionTitle = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<h2
		ref={ref}
		className={cn(
			'my-8 text-4xl font-bold leading-tight tracking-tighter  dark:text-white',
			className
		)}
		{...props}
	/>
));
SubSectionTitle.displayName = 'SubSectionTitle';

const SubSectionDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<p
		ref={ref}
		className={cn('mt-6 text-muted-foreground', className)}
		{...props}
	/>
));
SubSectionDescription.displayName = 'SubSectionDescription';

export {
	SectionOuterContainer,
	SectionTitle,
	SectionDescription,
	SubSectionOuterContainer,
	SubSectionInnerContainer,
	SubSectionTitle,
	SubSectionDescription,
};
