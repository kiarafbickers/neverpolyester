// https://ui.shadcn.com/docs/components/badge

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
	'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
	{
		variants: {
			variant: {
				default:
					'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
				secondary:
					'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
				destructive:
					'border-transparent bg-destructive/60 text-destructive-foreground shadow hover:bg-destructive/60',
				outline: 'text-foreground',
				tinyPrimary:
					'px-1.5 py-0.5 text-xs bg-primary text-primary-foreground mb-2 border-transparent',
				tinySecondary:
					'px-1.5 py-0.5 text-xs border-transparent bg-secondary text-secondary-foreground mb-2',
				huge: 'text-2xl text-foreground font-semibold hover:bg-secondary/80 shadow',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	}
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<div className={cn(badgeVariants({ variant }), className)} {...props} />
	);
}

export { Badge, badgeVariants };
