"use client";

import Image from "next/image";
import Link from "next/link";

export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-50 bg-gray-50 overflow-y-auto flex items-center justify-center"
      role="dialog"
      aria-labelledby="loading-title"
      aria-describedby="loading-description"
    >
      <div className="flex flex-col items-center text-center">
        {/* Main text */}
        <p
          id="loading-title"
          className="text-gray-900 text-xl font-semibold mb-4"
        >
          Never Polyester
        </p>
        <p id="loading-description" className="text-gray-600 text-sm mb-4">
          Now taking you to
        </p>

        {/* GAP Logo */}
        <div className="mb-4 p-2 h-12 w-12 rounded-full overflow-hidden border border-gray-200 flex items-center justify-center">
          <Image
            src="/img/gap.png"
            alt="GAP Logo"
            height={48}
            width={48}
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Loading Spinner */}
        <svg
          className="animate-spin h-12 w-12 text-gray-600 mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>

        {/* Retry text */}
        <p className="text-gray-600 text-sm">
          Taking too long?{" "}
          <Link href="#" className="text-blue-500 underline">
            Click here
          </Link>
        </p>
      </div>
    </div>
  );
}
