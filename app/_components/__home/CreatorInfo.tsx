import { Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CreatorInfo() {
  return (
    <div className="bg-backgroundDz">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 bg-white border-t-2 border-r-[6px] border-b-[6px] border-l-2 border-blackDz p-6 md:p-10">
          <div className="p-8 flex flex-col items-center justify-center lg:w-60">
            <Image
              src="/img/kiara-bickers.png"
              alt="Kiara Bickers"
              width={96}
              height={96}
              className="rounded-full object-cover"
            />
            <h3 className="mt-4 text-lg font-semibold text-blackDz">
              Kiara Bickers
            </h3>
            <div className="mt-4 flex space-x-4">
              <Link
                href="https://x.com/kiarabickers"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 bg-blackDz rounded-lg text-white hover:bg-secondaryDz"
              >
                <span className="sr-only">X</span>
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-5 w-5"
                >
                  <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
                </svg>
              </Link>
              <Link
                href="https://kiarabickers.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 bg-successDz rounded-lg text-blackDz hover:bg-highlightDz"
              >
                <span className="sr-only">Website</span>
                <Globe className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <hr className="lg:hidden border-t border-neutralDz-200" />
          <div className="hidden lg:block h-[230px] border-l border-neutralDz-100 lg:mr-7"></div>

          <div className="lg:flex-1">
            <h2 className="text-3xl font-bold tracking-tight text-blackDz sm:text-4xl">
              Why I Built TimeFound AI?
            </h2>
            <p className="mt-8 text-mutedDz">Hey there, I&apos;m Kiara.</p>
            <p className="mt-2 text-mutedDz">
              I&apos;ve dedicated my life to building startups. Every single
              day. I created this directory with a simple objective to assist
              those who have developed self-hosted software and want to share it
              with others, as well as those who are searching for exceptional
              self-hosted solutions
            </p>
            <p className="mt-2 text-mutedDz">
              You can find me on Twitter, where I share snippets from my daily
              startup journey and engage in conversations on a wide range of
              topics.
            </p>
            <p className="mt-2 text-mutedDz">
              If you&apos;re a fellow builder in need of advice, feel free to
              reach out!
            </p>
            <p className="mt-4">
              <a
                href="https://x.com/kiarabickers"
                className=" text-infoDz font-semibold underline hover:text-blue-500"
              >
                https://x.com/kiarabickers
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
