// Import Types
import { Metadata } from 'next';
// Import External Packages
// Import Components
import {
	SectionOuterContainer,
	SectionTitle,
	SectionDescription,
	SubSectionOuterContainer,
	SubSectionInnerContainer,
} from '@/ui/Section';
// Import Functions & Actions & Hooks & State
// Import Data
import { COMPANY_BASIC_INFORMATION, CREATOR_INFORMATION } from '@/constants';
// Import Assets & Icons

export const metadata: Metadata = {
	title: `Imprint`,
	description: `Imprint by ${COMPANY_BASIC_INFORMATION.NAME}.`,
};

export default function ImprintPage() {
	return (
		<SectionOuterContainer id="Imprint">
			<SectionTitle>Imprint</SectionTitle>
			<SectionDescription>
				Information required under § 5 Para. 1 of the German Telemedia Act.
			</SectionDescription>
			<SubSectionOuterContainer className="max-w-3xl">
				<SubSectionInnerContainer className="items-start">
					<ul className="text-black dark:text-zinc-200 text-left space-y-2 mt-4">
						<li className="italic">
							{COMPANY_BASIC_INFORMATION.NAME} is a service of the{' '}
							{COMPANY_BASIC_INFORMATION.LEGAL_NAME} -{' '}
							{CREATOR_INFORMATION.NAME}
						</li>
						<li className="py-4 font-semibold">
							Contact person & responsible for all media and content
						</li>
						<li>
							Mail Address: {CREATOR_INFORMATION.NAME},{' '}
							{COMPANY_BASIC_INFORMATION.ADDRESS}
						</li>
						<li>Contact Phone : {COMPANY_BASIC_INFORMATION.SUPPORT_PHONE}</li>
						<li>Contact Email: {COMPANY_BASIC_INFORMATION.SUPPORT_EMAIL}</li>
						{COMPANY_BASIC_INFORMATION.OTHER_INFO_LINES.map((line, index) => (
							<li key={index}>{line}</li>
						))}
					</ul>
				</SubSectionInnerContainer>
			</SubSectionOuterContainer>
		</SectionOuterContainer>
	);
}
