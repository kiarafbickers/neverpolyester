"use client";

import { Disclosure } from "@headlessui/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import SupabaseImage from "../SupabaseImage";
import Link from "next/link";

export default function LatestArticles({ articles }: { articles: BlogPost[] }) {
  const title = "Read Our Latest";
  const subtitle =
    "Stay up to date with the latest in cosy fashion, ethical sourcing, and tips for living plastic-free.";
  return (
    <div id="blog" className="bg-backgroundDz">
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
                  {title}
                </h2>
                <p className="mt-4 text-base text-secondaryDz">{subtitle}</p>
              </div>
              <span className="ml-6 flex h-7 items-center">
                {open ? (
                  <ChevronUp
                    className="w-5 h-5 transition-transform duration-200"
                    aria-hidden="true"
                  />
                ) : (
                  <ChevronDown
                    className="w-5 h-5 transition-transform duration-200"
                    aria-hidden="true"
                  />
                )}
              </span>
            </Disclosure.Button>

            <Disclosure.Panel>
              <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
                {articles.map((article) => (
                  <div key={article.id} className="group">
                    <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                      <SupabaseImage
                        dbImageUrl={article.default_image_url}
                        imageAlt={article.title ? article.title : "Title"}
                        width={1280}
                        height={720}
                        className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                        database="blog_images"
                        priority
                      />
                    </div>

                    <h3 className="mt-4 text-lg font-semibold text-blackDz">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-sm text-mutedDz">
                      {article.description}
                    </p>
                    <div className="mt-4 flex justify-end">
                      <Link
                        href={`/blog/${article.slug}`}
                        className="bg-white px-4 py-2 text-sm font-semibold text-blackDz shadow-sm ring-1 ring-blackDz hover:bg-gray-50 hover:ring-secondaryDz"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                <Link
                  href={`/blog`}
                  className="bg-blackDz px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondaryDz"
                >
                  Read All
                </Link>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
