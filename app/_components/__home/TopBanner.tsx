// Import Types
// Import External Packages
// Import Components
// Import Functions & Actions & Hooks & State
import { cn } from '@/utils';
// Import Data
// Import Assets & Icons

export default function TopBanner({ className }: { className?: string }) {
	return (
		<section className={cn('w-full mx-auto bg-black py-2', className)}>
			<p className="text-sm leading-6 text-primary-foreground text-center">
				Get Closer to the Source: <a href="https://rancherslist.beehiiv.com/subscribe" className="text-white underline">Get Exclusive Local Meat Deals—Sign Up To Our Newsletter Now!</a>
			</p>
		</section>
	);
}
