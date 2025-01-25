"use client";

import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import SupabaseImage from "../SupabaseImage";
import Image from "next/image";

export default function CategoryLinks({
  subcategories,
}: {
  subcategories: Category[];
}) {
  const title = "Shop Popular Categories";
  const description =
    "We've got everything from everyday basics to statement pieces.";
  const limitedSubcategories = subcategories.slice(0, 12);

  return (
    <div className="bg-backgroundDz">
      <Disclosure
        as="div"
        className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 md:px-8"
        defaultOpen
      >
        <Disclosure.Button className="group flex w-full items-center justify-between border-b border-mutedDz pb-8">
          <div className="text-left">
            <h2 className="text-3xl font-bold text-blackDz sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-base text-mutedDz">{description}</p>
          </div>
          <ChevronDownIcon
            aria-hidden="true"
            className="w-5 h-5 transition-transform duration-200 group-data-[open]:-rotate-180"
          />
        </Disclosure.Button>

        <Disclosure.Panel>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-6 mt-8">
            {limitedSubcategories.map((subcategory) => (
              <Link
                key={subcategory.id}
                href={`/subcategory/${subcategory.slug}`}
                className="flex flex-col items-center group"
              >
                <div
                  className="relative w-full pb-[100%] bg-white overflow-hidden border-2 border-b-4 border-blackDz aspect-1"
                  aria-hidden="true"
                >
                  {subcategory.image_url_small ? (
                    <SupabaseImage
                      dbImageUrl={subcategory.image_url_small}
                      imageAlt={
                        subcategory.description
                          ? subcategory.description
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
                      alt={subcategory.name}
                      className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      width={320}
                      height={320}
                      priority
                    />
                  )}
                </div>
                <h3 className="mt-4 text-sm font-semibold text-gray-700">
                  {subcategory.name}
                </h3>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link
              href={`/subcategory`}
              className="bg-white px-4 py-2 text-sm font-semibold text-blackDz shadow-sm ring-1 ring-inset ring-blackDz hover:bg-gray-50 hover:ring-secondaryDz"
            >
              Shop All
            </Link>
          </div>
        </Disclosure.Panel>
      </Disclosure>
    </div>
  );
}
