// Import Types
// Import External Packages
// Import Components
import {
	SectionDescription,
	SectionOuterContainer,
	SectionTitle,
	SubSectionDescription,
	SubSectionInnerContainer,
	SubSectionOuterContainer,
	SubSectionTitle,
} from '@/ui/Section';
// Import Functions & Actions & Hooks & State
// Import Data
import { COMPANY_BASIC_INFORMATION } from '@/constants';
// Import Assets & Icons

export default function AdvertisePage() {
	return (
		<SectionOuterContainer>
			<SectionTitle>
				Succeed with {COMPANY_BASIC_INFORMATION.NAME}!
			</SectionTitle>
			<SectionDescription>
				At {COMPANY_BASIC_INFORMATION.NAME}, we empower companies like yours to
				grow your business and enhance visibility in a competitive market.
				Here&apos;s how you can leverage our platform to maximize your reach and
				impact:
			</SectionDescription>
			<SubSectionOuterContainer>
				<SubSectionTitle>1. Advertise</SubSectionTitle>
				<SubSectionDescription>
					Advertising on {COMPANY_BASIC_INFORMATION.NAME} puts your business in
					front of potential future customers. Our advertising options allow you
					to reach the right audience, increasing your visibility and user
					engagement. We are flexible in terms of duration and dimensions of
					your campaigns. Email us at{' '}
					<span className="font-semibold">
						{COMPANY_BASIC_INFORMATION.SUPPORT_EMAIL}
					</span>{' '}
					to discuss your needs.{' '}
				</SubSectionDescription>
				<SubSectionInnerContainer className="prose">
					<h3>Options</h3>
					<p className="text-muted-foreground">
						{' '}
						We only serve image ads with links, no embedds.
					</p>
					<ol>
						<li>
							Category - Above the Fold: Your ad will appear at the top of one
							category page such as &apos;Domain Registration&apos;.{' '}
							<span className="font-semibold">
								Current fix price per month: USD XXX (incl. tax).
							</span>
						</li>
						<li>
							Category - Below the Fold: Your ad will appear at the bottom of
							one category page such as &apos;Domain Registration&apos;.{' '}
							<span className="font-semibold">
								Current fix price per month: USD XXX (incl. tax).
							</span>
						</li>
						<li>
							Explore - Above the Fold: Your ad will appear at the top of the
							most frequented page &apos;Explore&apos;.{' '}
							<span className="font-semibold">
								Current fix price per month: USD XXX (incl. tax).
							</span>
						</li>
						<li>
							Explore - Below the Fold: Your ad will appear at the bottom of the
							most frequented page &apos;Explore&apos;.{' '}
							<span className="font-semibold">
								Current fix price per month: USD XXX (incl. tax).
							</span>
						</li>
						<li>
							Blog - Side: Your ad will appear at the side of each blog article.
							2 spots at the same time max.{' '}
							<span className="font-semibold">
								Current fix price per month: USD XXX (incl. tax).
							</span>
						</li>
						<li>
							Blog - Below the Fold: Your ad will appear at the bottom of each
							blog article.{' '}
							<span className="font-semibold">
								Current fix price per month: USD XXX (incl. tax).
							</span>
						</li>
					</ol>
				</SubSectionInnerContainer>
			</SubSectionOuterContainer>
			<SubSectionOuterContainer>
				<SubSectionInnerContainer>
					<SubSectionTitle>2. Claim & Edit </SubSectionTitle>
					<SubSectionDescription>
						Claim or create a listing for your business to fully customize how
						it appears to potential users. Add detailed descriptions, update
						contact information, and upload high-resolution images to make your
						directory stand out. <br />
						<br />
						<span className="font-semibold">
							For listings in the category &apos;Private Domain Portfolio&apos;:
							XX USD / month or XX USD / year (incl. tax).
						</span>
						<br />
						<span className="font-semibold">
							For listings in any other category: FREE
						</span>
					</SubSectionDescription>
				</SubSectionInnerContainer>
				<SubSectionInnerContainer>
					<SubSectionTitle>3. Promote </SubSectionTitle>
					<SubSectionDescription>
						Promote your listing to ensure it appears at the top of category
						searches or on the homepage. This premium positioning can
						significantly increase your company&apos;s exposure and user clicks.
						We allow only one promoted listing per category. <br />
						<br />
						<span className="font-semibold">
							For any category: X USD / day (excl. tax).
						</span>
					</SubSectionDescription>
				</SubSectionInnerContainer>
			</SubSectionOuterContainer>
			<SubSectionInnerContainer>
				<SubSectionTitle>
					Ready to Amplify Your Company&apos;s Presence?
				</SubSectionTitle>
				<SubSectionDescription>
					Contact us today to discuss your options and find the best solution
					for your business needs. Our team is dedicated to helping you succeed
					in the vast digital landscape.
					<br /> <br />
					Email us at{' '}
					<span className="font-semibold">
						{COMPANY_BASIC_INFORMATION.SUPPORT_EMAIL}
					</span>
				</SubSectionDescription>
			</SubSectionInnerContainer>
		</SectionOuterContainer>
	);
}
