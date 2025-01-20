"use client";

// Import Types
import { SublistingType } from "@/supabase-special-types";
// Import Components
import { buttonVariants } from "@/ui/Button";
// Import Functions & Actions & Hooks & State
import incrementStatCounters from "@/actions/sublistings/incrementStatCounters";
import insertActivity from "@/actions/activites/insertActivity";
import { cn } from "@/utils";
// Import Data
import { COMPANY_BASIC_INFORMATION, GENERAL_SETTINGS } from "@/constants";

/**
 * A button component that opens an external link to a sublisting.
 * @param sublisting - The sublisting to link to.
 * @param className - The class name to apply to the button.
 * @param type - The button type (listing or product).
 * @param setIsLoading - Function to show the loading overlay.
 */
export default function ExternalLinkButton({
  sublisting,
  className,
  type,
  setIsLoading = () => {},
}: {
  sublisting: Sublisting;
  className?: string;
  type: "listing" | "product";
  setIsLoading?: (loading: boolean) => void;
}) {
  if (!sublisting?.click_url) return null;

  const referral = COMPANY_BASIC_INFORMATION.URL.replace("https://", "");

  const handleClick = async () => {
    // Show loading overlay
    setIsLoading(true);

    // Increment stats and log activity
    if (GENERAL_SETTINGS.USE_CLICK) {
      await incrementStatCounters(sublisting.id, "clicks");
    }
    await insertActivity("new_click", sublisting.title);

    // Delay for loading overlay visibility
    setTimeout(() => {
      window.location.href =
        (type === "listing"
          ? sublisting.owner.click_url
          : sublisting.click_url) + `?ref=${referral}`;
    }, 1000); // 1-second delay
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        buttonVariants({
          variant: type === "listing" ? "default" : "outline",
          size: "lg",
        }),
        className
      )}
      data-umami-event="External Link Clicked"
      data-umami-event-sublisting={
        type === "listing" ? sublisting.owner.click_url : sublisting.click_url
      }
    >
      {type === "listing" ? "See Listing" : "Buy Now"}
    </button>
  );
}
