// Import Types
// Import External Packages
import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
// Import Components
import { Toaster } from "@/ui/Toaster";
import Footer from "@/components/Footer";
// Import Functions & Actions & Hooks & State
import createMetaData from "@/lib/createMetaData";
import FeedbackDialog from "@/components/feedback/Dialog_Feedback";
import CookieConsentBanner from "@/components/CookieConsentBanner";
// Import Data
// Import Assets & Icons
import "./globals.css";
import localFont from "next/font/local";

const avenir = localFont({
  src: [
    {
      path: "../public/fonts/avenir-next-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/avenir-next-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/avenir-next-demi.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/avenir-next-bold.woff2",
      weight: "700",
      style: "bold",
    },
  ],
  display: "swap",
  variable: "--font-avenir",
});

export const metadata: Metadata = createMetaData({});

/**
 * The root layout for the application.
 * @param children - The children to display in the layout.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${avenir.className}`}>
      <Script
        defer
        src="https://analytics.eu.umami.is/script.js"
        data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
      ></Script>
      <body className="bg-white text-foreground dark:bg-black dark:text-white">
        <section className="min-h-screen">
          <main>{children}</main>
          <Toaster />
          <Suspense fallback={null}>
            <FeedbackDialog />
          </Suspense>
          <CookieConsentBanner />
          <Footer />
        </section>
      </body>
    </html>
  );
}
