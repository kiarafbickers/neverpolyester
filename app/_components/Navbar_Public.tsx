"use client";

import { Dialog, Disclosure, Popover } from "@headlessui/react";
import {
  Bars3Icon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import {
  COMPANY_BASIC_INFORMATION,
  GENERAL_SETTINGS,
} from "../_constants/constants";
import { cn } from "../_lib/utils";
import { buttonVariants } from "./_ui/Button";

const NAVBAR_ADD_LINKS = {
  MENU: [
    { name: "Women", href: "#" },
    { name: "Men", href: "#" },
    { name: "Kids", href: "#" },
  ],
  CATEGORIES: [
    {
      name: "All Clothes",
      all: [
        { name: "Beachwear and Swimwear", href: "#" },
        { name: "Coats", href: "#" },
        { name: "Dresses", href: "#" },
        { name: "Hosiery", href: "#" },
        { name: "Jackets", href: "#" },
        { name: "Jeans", href: "#" },
        { name: "Jumpsuits and Rompers", href: "#" },
        { name: "Knitwear", href: "#" },
        { name: "Lingerie", href: "#" },
        { name: "Nightwear and Sleepwear", href: "#" },
        { name: "Pants", href: "#" },
      ],
      featured: [
        [
          { name: "True Religion Jeans", href: "#" },
          { name: "Wrangler Jeans", href: "#" },
          { name: "Reformation Dresses", href: "#" },
          { name: "GOOD AMERICAN Jeans", href: "#" },
          { name: "Rock Revival Jeans", href: "#" },
          { name: "Mother Jeans", href: "#" },
          { name: "PAIGE Jeans", href: "#" },
          { name: "Levi's Jeans", href: "#" },
          { name: "Democracy Jeans", href: "#" },
          { name: "Agolde Jeans", href: "#" },
          { name: "Spanx Pants", href: "#" },
        ],
        [
          { name: "PacSun Jeans", href: "#" },
          { name: "Carhartt Jackets", href: "#" },
          { name: "Spanx Jeans", href: "#" },
          { name: "Columbia Jackets", href: "#" },
          { name: "Patagonia Jackets", href: "#" },
          { name: "Flying Monkey Jeans", href: "#" },
          { name: "Eliza J Dresses", href: "#" },
          { name: "Adrianna Papell Dresses", href: "#" },
          { name: "Adidas Shorts", href: "#" },
        ],
      ],
    },
    {
      name: "All Brands",
      all: [
        { name: "Nike", href: "#" },
        { name: "Adidas", href: "#" },
        { name: "Patagonia", href: "#" },
        { name: "Levi's", href: "#" },
        { name: "Wrangler", href: "#" },
        { name: "Columbia", href: "#" },
        { name: "Carhartt", href: "#" },
        { name: "Reformation", href: "#" },
        { name: "True Religion", href: "#" },
        { name: "GOOD AMERICAN", href: "#" },
      ],
      featured: [
        [
          { name: "Luxury Brands", href: "#" },
          { name: "Eco-Friendly Brands", href: "#" },
          { name: "Activewear Brands", href: "#" },
          { name: "Denim Experts", href: "#" },
        ],
        [
          { name: "Outdoor and Hiking", href: "#" },
          { name: "Casual Classics", href: "#" },
          { name: "Premium Streetwear", href: "#" },
          { name: "Iconic Labels", href: "#" },
        ],
      ],
    },
  ],
  OTHER: [{ name: "Sale", href: "#" }],
  PAGES: [
    { name: "Why", href: "#why" },
    { name: "How", href: "#how" },
    { name: "Deals", href: "#deals" },
    { name: "Blog", href: "#blog" },
  ],
};

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <Dialog.Backdrop
          //   transition
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <Dialog.Panel
            // transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <div className="relative flex items-center justify-center p-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute left-4 -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>

              <Link href={"/"} className="text-lg font-bold">
                {COMPANY_BASIC_INFORMATION.NAME}
              </Link>
            </div>

            {/* Sign up or log in */}
            <div className="border-b border-gray-200 px-4 py-6">
              <Link
                href="#"
                onClick={() => setOpen(false)}
                className="block w-full text-center bg-primaryDz px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondaryDz"
              >
                Sign up or Log in
              </Link>
            </div>

            <div className="px-4 py-6 space-y-6">
              {/* Menu */}
              {NAVBAR_ADD_LINKS.MENU.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block font-medium text-primaryDz"
                  >
                    {item.name}
                  </Link>
                </div>
              ))}

              {/* Categories */}
              {NAVBAR_ADD_LINKS.CATEGORIES.map((category) => (
                <Disclosure key={category.name} as="div">
                  {({ open }) => (
                    <div>
                      <Disclosure.Button className="flex w-full items-center justify-between text-left text-base font-medium text-primaryDz">
                        <span>{category.name}</span>
                        <ChevronRightIcon
                          className={`h-5 w-5 transform transition-transform duration-200 ${
                            open ? "rotate-90 text-accentDz" : "text-gray-400"
                          }`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-6 space-y-6">
                        <div>
                          <p className="sr-only">All Categories</p>
                          <ul className="mt-6 space-y-6">
                            {category.all.map((item) => (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  onClick={() => setOpen(false)}
                                  className="text-gray-500"
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-primaryDz">
                            Featured Categories
                          </p>
                          <ul className="mt-6 space-y-6">
                            {category.featured[0].map((item) => (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  className="text-gray-500"
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                            {category.featured[1].map((item) => (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  className="text-gray-500"
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
              ))}

              {/* Other */}
              {NAVBAR_ADD_LINKS.OTHER.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block font-medium text-primaryDz"
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>

            {/* Pages */}
            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {NAVBAR_ADD_LINKS.PAGES.map((page) => (
                <div key={page.name}>
                  <Link
                    href={page.href}
                    onClick={() => setOpen(false)}
                    className="block font-medium text-primaryDz"
                  >
                    {page.name}
                  </Link>
                </div>
              ))}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      <header className="relative">
        <nav aria-label="Top">
          {/* Top navigation */}
          <div className="hidden lg:block">
            <div className="mx-auto flex mt-6 -mb-4 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
              <div className="flex items-center space-x-6">
                {NAVBAR_ADD_LINKS.MENU.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium text-gray-700 hover:text-secondaryDz"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {/* Secondary navigation */}
          <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex flex-1 items-center lg:hidden">
                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                  >
                    <span className="sr-only">Open menu</span>
                    <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>

                {/* Flyout menus */}
                <Popover.Group className="hidden lg:block lg:flex-1 lg:self-stretch">
                  <div className="flex h-full space-x-4 lg:space-x-6">
                    {NAVBAR_ADD_LINKS.CATEGORIES.map(
                      (category, categoryIdx) => (
                        <Popover key={category.name} className="flex">
                          <div className="relative flex">
                            <Popover.Button className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-accentDz data-[open]:border-accentDz data-[open]:text-accentDz">
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Popover.Panel
                            //   transition
                            className="absolute inset-x-0 top-full text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in sm:text-sm z-10"
                          >
                            {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                            <div
                              aria-hidden="true"
                              className="absolute inset-0 top-1/2 bg-white shadow"
                            />

                            <div className="relative bg-white">
                              <div className="mx-auto max-w-7xl px-8">
                                <div className="grid grid-cols-2 items-start gap-x-8 gap-y-10 pb-12 pt-10">
                                  <div className="pr-8 border-r border-gray-200">
                                    <p
                                      id={`desktop-all-heading-${categoryIdx}`}
                                      className="sr-only"
                                    >
                                      All Categories
                                    </p>
                                    <ul
                                      role="list"
                                      aria-labelledby={`desktop-all-heading-${categoryIdx}`}
                                      className="space-y-6 sm:space-y-4"
                                    >
                                      {category.all.map((item) => (
                                        <li key={item.name}>
                                          <Link
                                            href={item.href}
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
                                    </ul>
                                  </div>
                                  <div className="grid grid-cols-1 gap-x-6 gap-y-10 lg:gap-x-8">
                                    <div>
                                      <p
                                        id="featured-categories"
                                        className="font-medium text-primaryDz"
                                      >
                                        Featured Categories
                                      </p>
                                      <div className="sm:grid sm:grid-cols-2 sm:gap-x-6">
                                        <ul
                                          role="list"
                                          aria-labelledby="featured-categories"
                                          className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                        >
                                          {category.featured[0].map((item) => (
                                            <li
                                              key={item.name}
                                              className="flex"
                                            >
                                              <Link
                                                href={item.href}
                                                className="hover:text-accentDz"
                                              >
                                                {item.name}
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                        <ul
                                          role="list"
                                          aria-label="More clothing"
                                          className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                        >
                                          {category.featured[1].map((item) => (
                                            <li
                                              key={item.name}
                                              className="flex"
                                            >
                                              <Link
                                                href={item.href}
                                                className="hover:text-accentDz"
                                              >
                                                {item.name}
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Popover.Panel>
                        </Popover>
                      )
                    )}

                    {NAVBAR_ADD_LINKS.OTHER.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center text-sm font-medium text-gray-700 hover:text-accentDz"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </Popover.Group>

                {/* Logo */}
                <Link href={"/"} className="flex">
                  <span className="text-lg font-bold">
                    {COMPANY_BASIC_INFORMATION.NAME}
                  </span>
                </Link>

                <div className="flex flex-1 items-center justify-end space-x-4 lg:space-x-6">
                  {/* Pages */}
                  <div className="hidden lg:block">
                    <div className="flex h-full space-x-4 lg:space-x-6">
                      {NAVBAR_ADD_LINKS.PAGES.map((pages) => (
                        <Link
                          key={pages.name}
                          href={pages.href}
                          className="flex items-center text-sm font-medium text-gray-700 hover:text-accentDz"
                        >
                          {pages.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href="#"
                    className="hidden bg-primaryDz px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondaryDz focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryDz lg:block"
                  >
                    Sign up or Log in
                  </Link>

                  {/* Search and Account */}
                  <div className="flex items-center">
                    <Link
                      href="#"
                      className="group flex items-center p-2 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Search</span>
                      <MagnifyingGlassIcon
                        aria-hidden="true"
                        className="h-6 w-6"
                      />
                    </Link>
                    {GENERAL_SETTINGS.USE_PUBLISH && (
                      <>
                        <Link
                          href={"/account"}
                          className="group -mr-2 flex items-center p-2 text-gray-400 hover:text-gray-500"
                          prefetch={false}
                          data-umami-event="Navbar: Account"
                        >
                          <UserIcon aria-hidden="true" className="h-6 w-6" />
                          <span className="sr-only">Account</span>
                        </Link>
                        {process.env.NODE_ENV === "development" && (
                          <Link
                            href={"/secret-admin"}
                            className={cn(
                              buttonVariants({
                                variant: "default",
                                size: "sm",
                              }),
                              "absolute top-40 md:top-20 right-4"
                            )}
                            prefetch={false}
                          >
                            Admin
                          </Link>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
