"use client";

import { Disclosure } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
// import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

interface PolyesterProcessItem {
  step: string;
  imageSrc: string;
}

interface Benefit {
  title: string;
  imageSrc: string;
}

interface Props {
  polyesterProcess: PolyesterProcessItem[];
  benefits: Benefit[];
}

export default function Why({ polyesterProcess, benefits }: Props) {
  return (
    <div className="bg-primaryDz">
      {/* Header Section */}
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative">
            <div className="w-full">
              <div className="aspect-w-4 aspect-h-3 md:aspect-w-16 md:aspect-h-9">
                <Image
                  src="/img/homepage/header_img1.png"
                  alt="Image 3"
                  height={1080}
                  width={1920}
                  className="absolute inset-0 w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="w-full">
              <div className="aspect-w-4 aspect-h-3 md:aspect-w-16 md:aspect-h-9">
                <Image
                  src="/img/homepage/header_img2.png"
                  alt="Image 4"
                  height={1080}
                  width={1920}
                  className="absolute inset-0 w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-primaryDz bg-opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative mx-auto max-w-3xl flex-col items-center text-center">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              never polyester
            </h2>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        id="why"
        className="mx-auto max-w-7xl px-4 pt-4 pb-16 sm:px-6 sm:pt-8 sm:pb-24 md:px-8"
      >
        <div className="text-base/7 font-semibold text-mutedDz uppercase">
          Sponsor Ad
        </div>

        {/* Polyester Process Section */}
        <Disclosure as="div">
          <Disclosure.Button className="group flex mt-8 pb-8 mb-8 w-full items-center justify-between  border-b border-mutedDz">
            <div className="text-left">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Why never polyester
              </h2>
              <p className="mt-4 text-base text-mutedDz">
                We’re never polyester—the go-to spot for 100% natural fiber
                clothes.
              </p>
            </div>
            <ChevronDown
              aria-hidden="true"
              className="size-5 flex-none group-data-[open]:rotate-180 text-white"
            />
          </Disclosure.Button>

          <Disclosure.Panel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="grid grid-rows-4">
                  {polyesterProcess.map((process, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-w-3 aspect-h-1 md:aspect-w-16 md:aspect-h-3"
                    >
                      <Link href={`#${process.step.toLowerCase()}`}>
                        <Image
                          src={process.imageSrc}
                          alt={process.step}
                          height={1080}
                          width={1080}
                          className="w-full h-full object-cover"
                          priority
                        />
                        <span className="absolute inset-0" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                          <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                            {process.step}
                          </h3>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <h3 className="text-base font-semibold text-white">
                    Polyester
                  </h3>
                  <p className="mt-2 text-sm text-white">
                    Polyester is petroleum designed to make oil companies richer
                    and our bodies sicker. It’s packed with endocrine
                    disruptors, linked to infertility, and every time you wash
                    it, microplastics break off.
                  </p>
                </div>
              </div>
              <div>
                <div className="relative aspect-w-3 aspect-h-4 md:aspect-w-4 md:aspect-h-3">
                  <Link href="#love">
                    <Image
                      src="/img/homepage/polyester_love.png"
                      alt="Love"
                      height={1080}
                      width={1080}
                      className="w-full h-full object-cover"
                      priority
                    />
                    <span className="absolute inset-0" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-center">
                      <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        Love
                      </h3>
                    </div>
                  </Link>
                </div>
                <div className="mt-4">
                  <h3 className="text-base font-semibold text-white">
                    Natural Fibers
                  </h3>
                  <p className="mt-2 text-sm text-white">
                    Natural fibers come straight from the Earth—plants and
                    animals. They’re renewable, kind to your skin, and naturally
                    antibacterial. When woven into fabric, they hold onto these
                    properties.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <div className="mx-auto max-w-xl md:max-w-none">
                <div className="mx-auto mt-24 grid max-w-sm grid-cols-2 gap-8 sm:max-w-none md:grid-cols-4">
                  {benefits.map((benefit) => (
                    <div key={benefit.title} className="text-center">
                      <Image
                        alt={benefit.title}
                        src={benefit.imageSrc}
                        height={1080}
                        width={1080}
                        className="mx-auto h-16 w-16"
                        priority
                      />
                      <h3 className="mt-3 text-lg font-medium text-gray-100 lg:max-w-48 mx-auto">
                        {benefit.title}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Disclosure.Panel>
        </Disclosure>
      </div>
    </div>
  );
}
