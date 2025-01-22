"use client";

import { Disclosure } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Step {
  name: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  buttonText: string;
}

interface Props {
  steps: Step[];
}

export default function Steps({ steps }: Props) {
  return (
    <div id="how" className="bg-backgroundDz">
      <Disclosure
        as="div"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:px-8"
      >
        <Disclosure.Button className="group flex w-full items-center justify-between border-b border-mutedDz pb-8">
          <div className="text-left">
            <h2 className="text-3xl font-bold text-blackDz sm:text-4xl">
              Find 100% natural fibers
            </h2>
            <p className="mt-4 text-base text-mutedDz">
              We’ve made finding clothes that are actually good for you easier
              than ever.
            </p>
          </div>
          <ChevronDown
            aria-hidden="true"
            className="w-5 h-5 transition-transform duration-200 group-data-[open]:-rotate-180"
          />
        </Disclosure.Button>

        <Disclosure.Panel className="mt-10 grid sm:grid-cols-[3fr_3fr_3fr_1.5fr] gap-8">
          {steps.map(({ name, href, imageSrc, imageAlt, buttonText }) => (
            <div key={name} className="group">
              <div className="aspect-h-6 aspect-w-5 overflow-hidden group-hover:opacity-75">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  width={500}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="mt-4 text-base font-semibold text-blackDz">
                {name}
              </h3>
              <Link
                href={href}
                className="mt-2 block w-full border-2 border-b-[3px] border-blackDz bg-white px-4 py-2 text-center text-sm font-medium text-blackDz hover:bg-gray-50"
              >
                {buttonText}
              </Link>
            </div>
          ))}

          <div className="flex flex-col items-center justify-center bg-blackDz text-center text-white p-6">
            <h3 className="text-xl font-bold mb-4">Sign up to get</h3>
            <Link
              href="#"
              className="w-full bg-white px-4 py-2 text-sm font-medium text-blackDz hover:bg-gray-100"
            >
              Join Now
            </Link>
          </div>
        </Disclosure.Panel>
      </Disclosure>
    </div>
  );
}
