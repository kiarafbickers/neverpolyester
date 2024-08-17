// Import Types
// Import External Packages
import Link from 'next/link';
import Image from 'next/image';
// Import Components
import {
	SubSectionContentContainer,
	SubSectionInnerContainer,
	SubSectionOuterContainer,
} from '@/ui/Section';
import { buttonVariants } from '@/ui/Button';
// Import Functions & Actions & Hooks & State
import { cn } from '@/lib/utils';
// Import Data
// Import Assets & Icons

export default function VideoBreaker({ className }: { className?: string }) {
	return (
		<SubSectionOuterContainer id="video-breaker" className={className}>
			<SubSectionInnerContainer>
				<SubSectionContentContainer className="mt-0">
					<div className="w-full z-10 relative isolate overflow-hidden rounded-xl">
						<video
						  src="/videos/grilled-steak.mp4"
						  className="absolute inset-0 z-20 h-full w-full object-cover"
						  width={1920}
						  height={1080}
						  autoPlay
						  loop
						  muted
						  playsInline
						/>

						<div className="relative px-12 text-white rounded-xl z-30 mx-auto text-center h-full w-full flex items-center py-10">
							<div className="space-y-2 max-w-xl mx-auto">
								<div className="m-auto text-3xl tracking-tight sm:text-7xl font-semibold">
									<h2>QUALITY</h2>
								</div>
								<div className="mx-auto w-full">
									<p className="text-base font-medium">
										We're putting power back in the hands of independent
										food producers - and changing the food system for the
										better.
									</p>
								</div>
							</div>
						</div>
					</div>
				</SubSectionContentContainer>
			</SubSectionInnerContainer>
		</SubSectionOuterContainer>
	);
}
