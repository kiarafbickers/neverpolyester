"use client";

import { useState } from "react";
import { Dialog, Disclosure, Popover } from "@headlessui/react";
import { Menu, UserIcon, XIcon, ChevronRightIcon, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  COMPANY_BASIC_INFORMATION,
  GENERAL_SETTINGS,
  NAVBAR_ADD_LINKS,
} from "../_constants/constants";
import { cn } from "../_lib/utils";
import { buttonVariants } from "./_ui/Button";
import Searchbar from "./Searchbar";

export default function Navbar_Public({
  allListings,
  promotedListings,
}: {
  allListings: Listing[];
  promotedListings: Listing[];
}) {
  const [open, setOpen] = useState(false);

  // Transform data listing menjadi { name, href } untuk submenu
  const allListingsAsLinks = allListings.map((item) => ({
    name: item.title,
    href: `/explore/${item.slug}`,
  }));

  const promotedListingsAsLinks = promotedListings.map((item) => ({
    name: item.title,
    href: `/explore/${item.slug}`,
  }));

  // Fungsi untuk membatasi item dan menambahkan "More" jika ada lebih dari 9
  const limitListingsWithMore = (
    listings: { name: string; href: string }[]
  ) => {
    const limitedListings = listings.slice(0, 9); // Ambil maksimal 9 item
    if (listings.length > 9) {
      return [
        ...limitedListings,
        {
          name: "More",
          href: "/all-listings", // Tautan ke halaman semua listing
        },
      ];
    }
    return listings;
  };

  // Batasi item untuk submenu All Listings dan All Brands
  const limitedAllListingsAsLinks = limitListingsWithMore(allListingsAsLinks);
  const limitedPromotedListingsAsLinks = limitListingsWithMore(
    promotedListingsAsLinks
  );

  // Inject data ke "All Clothes" & "All Brands" di NAVBAR_ADD_LINKS
  const updatedNavLinks = NAVBAR_ADD_LINKS.map((link) => {
    if (link.name === "All Clothes") {
      return {
        ...link,
        ALL: limitedAllListingsAsLinks,
        FEATURED: [limitedPromotedListingsAsLinks],
      };
    }
    if (link.name === "All Brands") {
      return {
        ...link,
        ALL: limitedAllListingsAsLinks,
        FEATURED: [limitedPromotedListingsAsLinks],
      };
    }
    return link;
  });

  // Filter untuk navigasi utama (sebelum logo)
  const mainNavLinks = updatedNavLinks.filter((link) =>
    ["Women", "Men", "Kids", "All Clothes", "All Brands", "Sale"].includes(
      link.name
    )
  );

  // Filter untuk navigasi setelah logo
  const rightOfLogoLinks = updatedNavLinks.filter((link) =>
    ["Why", "How", "Deals", "Blog"].includes(link.name)
  );

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <Dialog.Backdrop className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0" />
        <div className="fixed inset-0 z-40 flex">
          <Dialog.Panel className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full">
            <div className="bg-gray-100 relative flex items-center justify-center p-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute left-4 -m-3 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="sr-only">Close menu</span>
                <XIcon aria-hidden="true" className="h-6 w-6" />
              </button>
              <Link href="/" className="text-xl font-extrabold lowercase">
                {COMPANY_BASIC_INFORMATION.NAME}
              </Link>
            </div>

            {/* Sign up or log in */}
            <div className="border-y border-gray-200 px-4 py-6">
              <Link
                href="/propose"
                className={cn(
                  buttonVariants({ variant: "default", size: "sm" }),
                  "block w-full text-center bg-primaryDz px-3 py-2 rounded-none hover:bg-secondaryDz"
                )}
              >
                Sign up or Log in
              </Link>
            </div>

            <div className="p-4 space-y-4">
              {updatedNavLinks.map((link) =>
                link.ALL ? (
                  <Disclosure key={link.name} as="div">
                    {({ open }) => (
                      <div>
                        <Disclosure.Button className="flex w-full items-center justify-between text-left text-sm font-semibold text-primaryDz">
                          <span>{link.name}</span>
                          <ChevronRightIcon
                            className={`h-5 w-5 transform transition-transform duration-200 ${
                              open ? "rotate-90" : "text-gray-400"
                            }`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-4 space-y-4">
                          <div>
                            <p className="sr-only">All Categories</p>
                            <ul className="mt-4 space-y-4">
                              {/* Tampilkan hanya 9 item pertama */}
                              {link.ALL.slice(0, 9).map((item) => (
                                <li key={item.name}>
                                  <Link
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className="text-sm text-gray-500"
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              ))}

                              {/* Jika lebih dari 9, tampilkan link More */}
                              {link.ALL.length > 9 && (
                                <li key="more-link">
                                  <Link
                                    href="/explore" // ganti ke link apapun yang Anda mau
                                    onClick={() => setOpen(false)}
                                    className="text-sm text-gray-500 font-semibold"
                                  >
                                    More
                                  </Link>
                                </li>
                              )}
                            </ul>
                          </div>
                          <div>
                            <p className="font-medium text-primaryDz">
                              Featured Categories
                            </p>
                            <ul className="mt-4 space-y-4">
                              {link.FEATURED[0].map((item) => (
                                <li key={item.name}>
                                  <Link
                                    href={item.href}
                                    className="text-sm text-gray-500"
                                    onClick={() => setOpen(false)}
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </Disclosure.Panel>
                      </div>
                    )}
                  </Disclosure>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href ?? "#"}
                    className="block text-sm font-semibold text-primaryDz"
                    onClick={() => setOpen(false)}
                  >
                    {link.name}
                  </Link>
                )
              )}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      <header className="relative">
        <nav aria-label="Top">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between lg:space-x-6">
              {/* Left Navigation Links */}
              <Popover.Group className="hidden lg:flex lg:flex-1">
                <div className="flex h-full space-x-4 lg:space-x-6">
                  {mainNavLinks.map((link, index) =>
                    link.ALL ? (
                      <Popover key={index} className="flex">
                        <Popover.Button className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-primaryDz transition-colors duration-200 ease-out hover:text-accentDz focus:outline-none whitespace-nowrap">
                          {link.name}
                        </Popover.Button>

                        <Popover.Panel className="absolute inset-x-0 top-full text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in sm:text-sm z-50">
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 top-1/2 bg-white shadow"
                          />
                          <div className="relative bg-white">
                            <div className="mx-auto max-w-7xl px-8">
                              <div className="grid grid-cols-2 items-start gap-x-8 gap-y-10 pb-12 pt-10">
                                <div className="pr-8 border-r border-gray-200">
                                  <ul className="space-y-6 sm:space-y-4">
                                    {/* Tampilkan hanya 9 item pertama */}
                                    {link.ALL.slice(0, 9).map((item) => (
                                      <li key={item.name}>
                                        <Link
                                          href={item.href ?? "#"}
                                          className="flex justify-between items-center w-full hover:text-accentDz"
                                        >
                                          <span>{item.name}</span>
                                          <ChevronRightIcon
                                            className="h-4 w-4 text-gray-400"
                                            aria-hidden="true"
                                          />
                                        </Link>
                                      </li>
                                    ))}

                                    {/* Jika lebih dari 9, tampilkan link More */}
                                    {link.ALL.length > 9 && (
                                      <li key="more-link">
                                        <Link
                                          href="/explore" // ganti ke link yang sesuai
                                          className="flex justify-between items-center w-full font-semibold hover:text-accentDz"
                                        >
                                          <span>More</span>
                                          <ChevronRightIcon
                                            className="h-4 w-4 text-gray-400"
                                            aria-hidden="true"
                                          />
                                        </Link>
                                      </li>
                                    )}
                                  </ul>
                                </div>
                                <div className="grid grid-cols-1 gap-x-6 gap-y-10 lg:gap-x-8">
                                  <div>
                                    <p className="font-medium text-primaryDz">
                                      Featured
                                    </p>
                                    <div className="sm:grid sm:grid-cols-2 sm:gap-x-6">
                                      <ul className="mt-4 space-y-4">
                                        {link.FEATURED[0].map((item) => (
                                          <li key={item.name}>
                                            <Link
                                              href={item.href ?? "#"}
                                              className="hover:text-accentDz"
                                            >
                                              {item.name}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                      {/* 
                                      Jika Anda ingin membagi data FEATURED menjadi 2 kolom, 
                                      silakan pisahkan array promotedListingsAsLinks 
                                      menjadi 2 array (misalnya dengan slice).
                                      */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Popover>
                    ) : (
                      <Link
                        key={link.name}
                        href={link.href ?? "#"}
                        className="text-sm font-medium text-primaryDz hover:text-accentDz"
                      >
                        {link.name}
                      </Link>
                    )
                  )}
                </div>
              </Popover.Group>

              {/* Mobile menu button */}
              <div className="flex items-center lg:hidden">
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="-ml-2 p-2 text-gray-400"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </div>

              {/* Logo */}
              <div className="flex justify-center lg:flex-1">
                <Link href="/" className="flex">
                  <h1 className="text-xl font-extrabold lowercase lg:text-2xl">
                    {COMPANY_BASIC_INFORMATION.NAME}
                  </h1>
                </Link>
              </div>

              {/* Links next to the logo */}
              <div className="hidden lg:flex lg:space-x-6">
                {rightOfLogoLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href ?? "#"}
                    className="text-sm font-medium text-primaryDz hover:text-accentDz"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Search and Account Icons */}
              <div className="flex items-center space-x-4">
                {/* Sign up or log in */}
                <Link
                  href="/propose"
                  className={cn(
                    buttonVariants({ variant: "default", size: "sm" }),
                    "hidden bg-primaryDz rounded-none hover:bg-secondaryDz md:inline-flex"
                  )}
                >
                  Sign up or Log in
                </Link>

                {/* Search Icon */}
                <Popover className="relative">
                  <Popover.Button className="flex items-center text-primaryDz hover:text-secondaryDz focus:outline-none">
                    <Search className="h-6 w-6" />
                  </Popover.Button>
                  <Popover.Panel className="absolute right-0 mt-2 w-96 bg-white border border-gray-200 shadow-lg p-4 z-10">
                    <Searchbar
                      placeholder="Search by name.."
                      id="nav_search"
                      rootPage="/explore"
                    />
                  </Popover.Panel>
                </Popover>

                {/* Account Icon */}
                <Link
                  href="/account"
                  className="flex items-center text-sm font-medium text-primaryDz hover:text-secondaryDz"
                >
                  <UserIcon className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
