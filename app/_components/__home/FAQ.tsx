'use client';

// Import Types
// Import External Packages
import { Disclosure } from '@headlessui/react';
// Import Components
import {
	SubSectionOuterContainer,
	SubSectionInnerContainer,
	SubSectionTitle,
	SubSectionDescription,
	SubSectionContentContainer,
} from '@/ui/Section';
// Import Functions & Actions & Hooks & State
// Import Data
// Import Assets & Icons
import { MinusSquareIcon, PlusIcon, PlusSquareIcon } from 'lucide-react';

// What are the FAQs you want to show on the front page?

export const GENERAL_FAQS: { question: string; answer: string }[] = [
	{
		question: 'What is RanchersList.com?',
		answer:
			"Our platform connects you directly with local farmers and artisan food producers for fresh, high-quality food that will deliver to you or can be picked up locally. Sign up to our mailing list to get deals on  pasture-raised meats, fresh fruits and vegetables, dairy, eggs, and artisanal products products nationwide.",
	},
	{
		question: 'What kinds of products can I find here?',
		answer:
			"Right now, we're just listing the ranchers and farms themselves, but in the future we'll may have users be able to checkout on our platform.",
	},
	{
		question: 'How is the food delivered?',
		answer:
			"Details on delivery options, including shipping, pickup locations, and how to coordinate with producers. For now we just direct consumers to ranchers in their area.",
	},
];

/**
 * Renders a Frequently Asked Questions (FAQ) component.
 * @param title - The title of the FAQ section.
 * @param description - The description of the FAQ section.
 * @param faqs - An array of FAQ objects.
 * @param className - The CSS class name for the component.
 * @returns The rendered FAQ component.
 */
export default function FAQ({
	title = 'Frequently Asked Questions',
	description = 'We have compiled a list of frequently asked questions. If you have any other questions, please do not hesitate to contact us via email. We are here to help!',
	className,
}: {
	title?: string;
	description?: string;
	className?: string;
}) {
	return (
		<SubSectionOuterContainer id="faq" className={className}>
			<SubSectionInnerContainer>
				<SubSectionTitle>{title}</SubSectionTitle>
				{description && (
					<SubSectionDescription>{description}</SubSectionDescription>
				)}

				<SubSectionContentContainer className=" mt-6">
					<dl className="space-y-6 divide-y divide-neutral-200 dark:divide-white">
						{GENERAL_FAQS.map(
							(faq) =>
								faq.question &&
								faq.answer && (
									<Disclosure as="div" key={faq.question} className="pt-6">
										{({ open }) => (
											<>
												<dt>
													<Disclosure.Button className="flex w-full items-start justify-between text-left ">
														<span className="text-base font-semibold leading-7 dark:text-white">
															{faq.question}
														</span>
														<span className="ml-6 flex h-7 items-center text-foreground dark:text-white">
															{open ? (
																<MinusSquareIcon
																	className="h-6 w-6"
																	aria-hidden="true"
																/>
															) : (
																<PlusIcon
																	className="h-6 w-6"
																	aria-hidden="true"
																/>
															)}
														</span>
													</Disclosure.Button>
												</dt>
												<Disclosure.Panel as="dd" className="mt-2 pr-12">
													<p className="text-base text-justify leading-7 dark:text-white">
														{faq.answer}
													</p>
												</Disclosure.Panel>
											</>
										)}
									</Disclosure>
								)
						)}
					</dl>
				</SubSectionContentContainer>
			</SubSectionInnerContainer>
		</SubSectionOuterContainer>
	);
}
