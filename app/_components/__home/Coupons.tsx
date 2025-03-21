"use client";

import { Disclosure } from "@headlessui/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import SupabaseImage from "../SupabaseImage";
import Link from "next/link";
import ListingCoupon from "../listings/ListingCoupon";

type CouponProps = {
  listings: Listing[];
  user: User | null;
};

export default function Coupons({ listings, user }: CouponProps) {
  return (
    <section id="deals" className="bg-backgroundDz">
      <Disclosure
        as="div"
        className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 md:px-8"
        defaultOpen
      >
        {({ open }) => (
          <>
            <Disclosure.Button className="group flex w-full items-center justify-between border-b border-mutedDz pb-8">
              <div className="text-left">
                <h2 className="text-3xl font-bold text-blackDz sm:text-4xl">
                  Shop Our Brand Deals
                </h2>
                <p className="mt-4 text-base text-mutedDz">
                  Sustainable style without the sticker shock—see what’s on
                  sale.
                </p>
              </div>
              <span className="ml-6 flex h-7 items-center">
                {open ? (
                  <ChevronUp className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <ChevronDown className="h-5 w-5" aria-hidden="true" />
                )}
              </span>
            </Disclosure.Button>

            <Disclosure.Panel>
              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {listings.map((listing, index) => (
                  <div
                    key={index}
                    className="relative bg-white shadow-sm border-2 border-b-4 border-blackDz p-4 flex flex-col justify-between"
                  >
                    {listing.is_promoted && (
                      <span className="absolute top-0 right-0 bg-redDz text-white text-xs font-bold px-2 py-1">
                        Featured
                      </span>
                    )}

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 relative">
                        <SupabaseImage
                          dbImageUrl={listing.logo_image_url}
                          imageAlt={listing.title}
                          width={48}
                          height={48}
                          className="object-contain rounded-full border border-highlightDz p-0.5"
                          database="listing_images"
                          priority
                        />
                      </div>
                      <h3 className="sr-only">{listing.title}</h3>
                    </div>

                    <p className="mt-4 text-sm text-mutedDz">
                      {listing.excerpt}
                    </p>

                    <ListingCoupon
                      listing={listing}
                      user={user}
                      layout="card"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-10 flex justify-center">
                <Link
                  href="/explore"
                  className="bg-blackDz px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondaryDz"
                >
                  View All
                </Link>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </section>
  );
}
