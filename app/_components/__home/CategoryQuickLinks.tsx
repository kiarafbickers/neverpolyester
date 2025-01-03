"use client";

import Link from "next/link";
import Image from "next/image";
import SupabaseImage from "../SupabaseImage";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

type CategoryQuickLinksProps = {
  categoryData: {
    name: string;
    slug: string;
    image_url_small?: string | null;
    description?: string | null;
  }[];
};

export default function CategoryQuickLinks({
  categoryData,
}: CategoryQuickLinksProps) {
  const title = "Shop Popular Categories";
  const description =
    "We've got everything from everyday basics to statement pieces.";

  return (
    <div className="bg-backgroundDz">
      <Disclosure
        as="div"
        className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 md:px-8"
        defaultOpen
      >
        <Disclosure.Button className="group flex w-full items-center justify-between border-b border-mutedDz pb-8">
          <div className="text-left">
            <h2 className="text-3xl font-bold text-primaryDz sm:text-4xl">
              Shop Popular Categories
            </h2>
            <p className="mt-4 text-base text-mutedDz">
              We&apos;ve got everything from everyday basics to statement
              pieces.
            </p>
          </div>
          <ChevronDownIcon
            aria-hidden="true"
            className="w-5 h-5 transition-transform duration-200 group-data-[open]:-rotate-180"
          />
        </Disclosure.Button>

        <Disclosure.Panel>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-6 mt-8">
            {categoryData.map((category) => (
              <Link
                key={category.name}
                href="#"
                className="flex flex-col items-center group"
              >
                <div
                  className="relative w-full pb-[100%] bg-white overflow-hidden border-2 border-b-4 border-primaryDz aspect-1"
                  aria-hidden="true"
                >
                  {category.image_url_small ? (
                    <SupabaseImage
                      dbImageUrl={category.image_url_small}
                      imageAlt={
                        category.description
                          ? category.description
                          : "Tag Image"
                      }
                      width={640}
                      height={640}
                      className="object-fill object-center transition-transform duration-300 group-hover:scale-105"
                      database="cattag_images"
                      priority
                    />
                  ) : (
                    <Image
                      src="/img/placeholder.png"
                      alt="Hero Image"
                      className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      width={1920}
                      height={1080}
                      priority
                    />
                  )}
                </div>
                <h3 className="mt-4 text-sm font-semibold text-gray-700">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link
              href={`/category`}
              className="bg-white px-4 py-2 text-sm font-semibold text-primaryDz shadow-sm ring-1 ring-inset ring-primaryDz hover:bg-gray-50 hover:ring-secondaryDz"
            >
              Shop All
            </Link>
          </div>
        </Disclosure.Panel>
      </Disclosure>
    </div>
  );
}
