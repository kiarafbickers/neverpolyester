"use client";

// Import Types
// Import External Packages
import Link from "next/link";
import Image from "next/image";
// Import Components
import { CookieConsentButton_Accept } from "@/components/CookieConsentBanner";
import {
  SubSectionContentContainer,
  SubSectionInnerContainer,
  SubSectionOuterContainer,
} from "@/ui/Section";
// Import Functions & Actions & Hooks & State
import { useCookieConsent } from "@/state/useCookieConsent";
import { cn } from "@/lib/utils";
import BeehiivSignupForm from "./BeehiivSignupForm";
// Import Data
// Import Assets & Icons

/**
 * Renders a newsletter subscription box powered by BeeHiiv.
 *
 * @param size - The size of the newsletter box. Defaults to 'lg'.
 * @param className - Additional CSS class for the container element.
 * @param title - The title of the newsletter box.
 * @param description - The description of the newsletter box.
 * @param disclaimer - The disclaimer text of the newsletter box.
 * @param textForPrivacyPolicy - The text for the privacy policy link. Defaults to 'Read our privacy policy'.
 * @param linkToPrivacyPolicy - The URL of the privacy policy page. Defaults to '/privacy-policy'.
 * @returns The rendered newsletter subscription box.
 */
export default function NewsletterBox_BeeHiiv({
  size = "lg",
  className,
  title = "JOIN THE FAMILY",
  description = "Subscribe for farm stories and the freshest deals in your inbox.",
  disclaimer = "We care about your data.",
  textForPrivacyPolicy = "Read our privacy policy",
  linkToPrivacyPolicy = "/privacy-policy",
}: {
  size?: "sm" | "lg";
  className?: string;
  title?: string;
  description?: string;
  disclaimer?: string;
  textForPrivacyPolicy?: string;
  linkToPrivacyPolicy?: string;
}) {
  const { hasCookieConsent } = useCookieConsent();
  const beeHiivEmbedUrl = process.env.NEXT_PUBLIC_BEEHIIV_EMBED_URL;

  if (!beeHiivEmbedUrl) {
    return null;
  }

  /**
   * Size=sm will render the NewsletterBox component with a small size, i.e. just the box.
   */
  if (size === "sm") {
    return (
      <div id="newsletter" className={className}>
        <BeehiivSignupForm />
      </div>
    );
  }

  /**
   * Size=lg will render the NewsletterBox Section with a large size, with title, description and full disclaimer.
   */
  return (
    <SubSectionOuterContainer
      id="newsletter"
      className={cn("px-0 py-0 overflow-hidden", className)}
    >
      <SubSectionInnerContainer>
        <SubSectionContentContainer className="mt-0">
          <div className="pt-10 md:pt-20 pb-6 md:pb-12 px-10 md:px-20 bg-primary text-white md:rounded-xl relative">
            <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-8">
              <div className="space-y-2">
                <div className="m-auto max-w-4xl text-3xl font-bold tracking-tight sm:text-4xl">
                  <h2 className="flex">{title}</h2>
                </div>
                <div className="mx-auto w-full">
                  <p className="text-lg leading-8 text-gray-300">
                    {description}
                  </p>
                </div>
              </div>

              <div className="m-auto mt-4 w-full max-w-lg">
                <BeehiivSignupForm />
                <p className="mt-2 text-sm leading-6 text-gray-300">
                  {disclaimer}{" "}
                  <Link
                    href={linkToPrivacyPolicy}
                    className="font-semibold text-white"
                  >
                    {textForPrivacyPolicy}
                  </Link>
                </p>
              </div>
            </div>
            <div className="absolute -right-32 -bottom-8 w-[112.71px] h-[180.5px] hidden md:block">
              <Image
                src="/img/honey.png"
                width={209}
                height={209}
                alt="steak stake"
                className="size-full object-cover"
              />
            </div>
          </div>
        </SubSectionContentContainer>
      </SubSectionInnerContainer>
    </SubSectionOuterContainer>
  );
}
