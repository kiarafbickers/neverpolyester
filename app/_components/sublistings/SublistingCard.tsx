"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import SupabaseImage from "@/components/SupabaseImage";
import LikeButton from "./Button_Like";

// Icon
import { Copy, Link2Icon, XIcon } from "lucide-react";
import ExternalLinkButton from "./ExternalLinkButton";
import CopyCouponCode from "@/app/(Public)/products/_components/CopyCouponCode";

export default function SublistingCard({
  sublisting,
  user,
  showAsRow,
}: {
  sublisting: Sublisting;
  user: User | null;
  showAsRow?: boolean;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const isSoldOut = !sublisting.availability;
  const isOnSale =
    sublisting.availability && !!sublisting.price_promotional_in_cents;

  const calculateDiscountPercentage = (
    regularPrice: number,
    promotionalPrice: number
  ) => {
    if (regularPrice && promotionalPrice) {
      return Math.round(
        ((regularPrice - promotionalPrice) / regularPrice) * 100
      );
    }
    return 0;
  };

  const handleCardClick = () => {
    setIsDialogOpen(true);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(sublisting.discount_code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      {/* Main Card */}
      <div
        className="relative rounded-lg overflow-hidden cursor-pointer"
        onClick={handleCardClick}
      >
        {/* Featured Banner */}
        {sublisting.is_promoted && (
          <div className="absolute top-2 z-10">
            <div
              className="bg-red-800 text-white text-xs font-bold py-1 px-3"
              style={{
                clipPath: "polygon(0 0, 100% 0, 90% 50%, 100% 100%, 0 100%)",
              }}
            >
              Featured
            </div>
          </div>
        )}

        {/* Image */}
        <div className="relative">
          <SupabaseImage
            dbImageUrl={sublisting.default_image_url}
            width={1600}
            height={900}
            database="sublisting_images"
            priority
            className="aspect-1 w-full rounded-md bg-gray-200 object-cover"
          />

          {/* Sold Out Banner */}
          {isSoldOut && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="bg-black text-white rounded-full h-20 w-20 flex items-center justify-center text-xs font-bold">
                Sold Out
              </div>
            </div>
          )}
        </div>

        <div className="mt-4">
          {/* Price and Like Button */}
          <div className="flex items-center justify-between">
            <p className="text-sm">
              {sublisting.price_promotional_in_cents ? (
                <>
                  <span className="text-gray-500 line-through mr-2">
                    ${sublisting.price_regular_in_cents / 100}
                  </span>
                  <span className="font-semibold text-red-600">
                    From ${sublisting.price_promotional_in_cents / 100}
                  </span>
                </>
              ) : (
                <span className="font-semibold text-gray-900">
                  ${sublisting.price_regular_in_cents / 100}
                </span>
              )}
            </p>
            {/* Like Button */}
            <div
              onClick={(e) => e.stopPropagation()} // Prevents dialog from opening
            >
              <LikeButton sublisting={sublisting} user={user} />
            </div>
          </div>

          {/* Subcategory */}
          {sublisting.subcategory?.name && (
            <p className="mt-2 text-sm font-medium text-gray-900">
              {sublisting.subcategory.name}
            </p>
          )}

          {/* Title */}
          <h3 className="text-sm text-gray-500">{sublisting.title}</h3>
        </div>

        {/* Owner */}
        {sublisting.owner?.title && (
          <p className="mt-1 text-xs text-gray-400 flex items-center">
            <Link2Icon
              className="w-4 h-4 mr-1 text-gray-400"
              aria-hidden="true"
            />
            {sublisting.owner.title}
          </p>
        )}

        {/* Sale Banner */}
        {isOnSale && (
          <div className="mt-3 text-xs font-bold text-green-600 uppercase">
            SALE
          </div>
        )}
      </div>

      {/* Dialog */}
      {isDialogOpen && (
        <Dialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
            <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
              <Dialog.Panel className="flex w-full transform text-left text-base transition data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:my-8 md:max-w-2xl md:px-4 data-[closed]:md:translate-y-0 data-[closed]:md:scale-95 lg:max-w-4xl">
                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    <XIcon className="h-6 w-6" />
                    <span className="sr-only">Close</span>
                  </button>
                  <div className="grid w-full grid-cols-1 sm:grid-cols-12 sm:gap-x-6 lg:gap-x-8">
                    {/* Details */}
                    <div className="sm:col-span-6 lg:col-span-6 order-2 sm:order-1">
                      {/* Title */}
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="mt-8 text-2xl font-bold text-gray-900 sm:mt-0">
                            {sublisting.owner?.title
                              ? sublisting.owner.title
                              : "No seller information available."}
                          </h2>
                          <h3 className="text-sm text-gray-600">
                            {sublisting.title}
                          </h3>
                        </div>
                        <LikeButton sublisting={sublisting} user={user} />
                      </div>

                      {/* Voucher */}
                      {sublisting.owner?.discount_code_text && (
                        <div className="mt-2 flex items-center">
                          <p className="text-sm text-gray-600 mr-2">
                            Code:
                            <span className="ml-2 inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs uppercase font-medium text-gray-800">
                              {copied
                                ? "Copied!"
                                : sublisting.owner?.discount_code_text}
                            </span>
                          </p>
                          <button
                            onClick={handleCopyCode}
                            className="text-xs text-gray-600 hover:text-gray-800"
                          >
                            <Copy className="w-4 h-4 inline-block mr-1" />
                            <span className="sr-only">
                              {copied ? "Copied!" : "Copy"}
                            </span>
                          </button>
                        </div>
                      )}

                      {/* Price */}
                      <div className="mt-4">
                        {sublisting.price_promotional_in_cents ? (
                          <div className="flex items-center">
                            <span className="text-gray-500 line-through mr-2">
                              ${sublisting.price_regular_in_cents / 100}
                            </span>
                            <span className="font-semibold text-red-600">
                              ${sublisting.price_promotional_in_cents / 100}
                            </span>
                            <span className="ml-2 inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-600">
                              {calculateDiscountPercentage(
                                sublisting.price_regular_in_cents,
                                sublisting.price_promotional_in_cents
                              )}
                              % OFF
                            </span>
                          </div>
                        ) : (
                          <span className="font-semibold text-gray-900">
                            ${sublisting.price_regular_in_cents / 100}
                          </span>
                        )}
                      </div>

                      {/* Tombol */}
                      <div className="mt-6">
                        <ExternalLinkButton
                          sublisting={sublisting}
                          className="w-full bg-gray-900 text-white rounded-none border-none hover:bg-gray-800 hover:text-white"
                          type="product"
                        />
                      </div>

                      <CopyCouponCode listingData={sublisting} />
                    </div>
                    {/* Images */}
                  </div>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
}
