"use client";

import { ChevronRight, Copy } from "lucide-react";
import { useState } from "react";

type CouponProps = {
  listing: Listing;
  user: User | null;
  layout: "card" | "detail";
};

// Utilitas untuk masker kode diskon
const maskCode = (code?: string) =>
  code ? code.replace(/.(?=.{2})/g, "*") : "NO CODE";

// Sub-komponen untuk tombol copy dengan indikator "Copied!"
const CopyButton = ({
  onCopy,
  isCopied,
  className = "",
}: {
  onCopy: () => void;
  isCopied: boolean;
  className?: string;
}) => (
  <div className={`relative ${className}`}>
    <button
      onClick={onCopy}
      className="flex flex-col items-center text-red-500 hover:text-red-700"
    >
      <Copy className="w-5 h-5" aria-hidden="true" />
      <span className="sr-only">Copy</span>
    </button>
    {isCopied && (
      <span className="absolute top-[-1.5rem] left-0 bg-gray-900 text-white text-xs font-semibold px-2 py-1 rounded">
        Copied!
      </span>
    )}
  </div>
);

export function ListingCoupon({ listing, user, layout }: CouponProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000); // Reset copied status after 2 seconds
  };

  const code = user ? listing.discount_code : maskCode(listing.discount_code);

  // Layout "card"
  if (layout === "card") {
    return (
      <div className="relative w-full h-12 bg-lightDz border border-dashed border-gray-400 flex items-center mt-4">
        {user ? (
          <div className="flex items-center justify-between w-full px-4">
            <span className="text-sm font-semibold text-primaryDz">{code}</span>
            <CopyButton
              onCopy={() => handleCopy(listing.discount_code, 0)}
              isCopied={copiedIndex === 0}
            />
          </div>
        ) : (
          <>
            <button className="absolute left-[-1px] top-[-1px] w-[81%] h-[calc(100%+2px)] bg-primaryDz text-white px-4 text-sm font-medium hover:bg-secondaryDz flex items-center justify-between z-10">
              <span>Sign up to view</span>
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primaryDz text-sm font-semibold px-2">
              {maskCode(listing.discount_code)}
            </span>
          </>
        )}
      </div>
    );
  }

  // Layout "detail"
  if (layout === "detail") {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-[auto,1fr,auto] bg-white p-2 border border-gray-200 gap-4 items-center relative">
        {/* Kolom Kode Diskon */}
        <div className="flex items-center justify-between bg-gray-100 px-4 py-2 border border-dashed">
          <p className="text-lg font-bold text-gray-800 tracking-wide">
            {code}
          </p>
          {user && (
            <CopyButton
              onCopy={() => handleCopy(listing.discount_code, 1)}
              isCopied={copiedIndex === 1}
              className="ml-3 lg:hidden"
            />
          )}
        </div>

        {/* Kolom Deskripsi Diskon */}
        <div className="text-sm text-gray-600">
          <p>
            Use code{" "}
            <span className="font-semibold text-gray-800">{`"${code}"`}</span>{" "}
            to get {listing.discount_code_percentage || "0"}% off on your
            orders.
          </p>
        </div>

        {/* Tombol Copy (Desktop) */}
        {user && (
          <div className="hidden lg:flex justify-end items-center">
            <CopyButton
              onCopy={() => handleCopy(listing.discount_code, 2)}
              isCopied={copiedIndex === 2}
              className="px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-md"
            />
          </div>
        )}
      </div>
    );
  }

  return null; // Default fallback
}

export default ListingCoupon;
