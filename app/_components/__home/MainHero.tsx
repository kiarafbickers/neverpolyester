import {
  HERO_BUTTON_HREF,
  HERO_BUTTON_TEXT,
  HERO_SLOGAN,
  HERO_TITLE,
} from "@/app/_constants/constants";
import Image from "next/image";
import Link from "next/link";

export default function MainHero() {
  return (
    <div className="bg-backgroundDz">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-7/12 relative">
          <div className="aspect-w-4 aspect-h-5 md:aspect-w-3 md:aspect-h-2">
            <Image
              src="/img/homepage/hero1.png"
              alt="Image 1"
              height={1080}
              width={1920}
              className="object-cover"
              priority
            />
          </div>
        </div>
        <div className="w-full md:w-5/12 flex items-center">
          <div className="p-8 md:p-16">
            <h2 className="text-3xl font-bold tracking-tight text-primaryDz md:text-4xl">
              {HERO_TITLE}
            </h2>
            <p className="mt-4 text-sm text-mutedDz">{HERO_SLOGAN}</p>
            <div className="mt-6 flex items-center gap-x-6">
              <Link
                href={HERO_BUTTON_HREF}
                className="border-t-2 border-r-2 border-b-[3px] border-l-2 border-primaryDz bg-white px-3.5 py-2.5 text-sm font-medium text-primaryDz hover:bg-gray-100 shadow-sm"
              >
                {HERO_BUTTON_TEXT}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-7/12 order-1 md:order-2 relative">
          <div className="aspect-w-4 aspect-h-5 md:aspect-w-3 md:aspect-h-2">
            <Image
              src="/img/homepage/hero2.png"
              alt="Image 2"
              height={1080}
              width={1920}
              className="object-cover"
              priority
            />
          </div>
        </div>
        <div className="w-full md:w-5/12 flex items-center order-2 md:order-1">
          <div className="p-8 md:p-16">
            <h2 className="text-3xl font-bold tracking-tight text-primaryDz md:text-4xl">
              {HERO_TITLE}
            </h2>
            <p className="mt-6 text-sm text-mutedDz">{HERO_SLOGAN}</p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                href={HERO_BUTTON_HREF}
                className="border-2 border-b-[3px] border-primaryDz bg-white px-3.5 py-2.5 text-sm font-medium text-primaryDz hover:bg-gray-100 shadow-sm"
              >
                {HERO_BUTTON_TEXT}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
