"use client";

import React, { useEffect, useState } from "react";
import useGeolocation from "./_lib/useGeolocation";
import TopBanner from "./_components/__home/TopBanner";
import Navbar_Public from "./_components/Navbar_Public";
import { SectionOuterContainer } from "./_components/_ui/Section";
import { HERO_SLOGAN, HERO_TITLE } from "./_constants/constants";
import NewsletterBox_BeeHiiv from "./_components/NewsletterSection";
import Image from "next/image";
import Breaker from "./_components/__home/Breaker";
import TestimonialBand from "./_components/__home/TestimonialBand";
import FAQ from "./_components/__home/FAQ";
import VideoBreaker from "./_components/__home/VideoBreaker";
import ListingOverview from "./_components/listings/ListingOverview";
import { allCategoriesQuery } from "./_lib/supabaseQueries";

const Page = () => {
  const { state, error: geoError } = useGeolocation();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [catError, setCatError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await allCategoriesQuery;
      if (error) {
        setCatError("Error fetching categories");
      } else {
        setCategories(data);
      }
      setLoading(false);
    };
    fetchCategories();
  }, []);

  const matchCategory = () => {
    const matchedCategory = categories.find(
      (category) => category.name.toLowerCase() === state?.toLowerCase()
    );
    return matchedCategory
      ? { category: matchedCategory.slug }
      : { sort: "mostPopular" };
  };

  const generateTitle = () => {
    const matchedCategory = categories.find(
      (category) => category.name.toLowerCase() === state?.toLowerCase()
    );
    return matchedCategory
      ? `Ranches in ${matchedCategory.name}`
      : "Featured Ranches";
  };

  if (loading) return <p>Loading categories...</p>;
  if (catError || geoError) return <p>{catError || geoError}</p>;

  return (
    <>
      <TopBanner />
      <Navbar_Public />
      <SectionOuterContainer className="mx-auto py-0">
        <div className="bg-primary relative">
          <div className="w-full h-fit py-6 px-4 max-w-5xl mx-auto lg:px-0">
            <div className="grid space-y-2 justify-left mx-auto max-w-5xl pt-8 overflow-hidden">
              <div className="max-w-2xl z-20">
                <h1 className="text-4xl sm:text-5xl flex flex-wrap gap-4 text-white font-semibold uppercase">
                  {HERO_TITLE}
                </h1>
                <p className=" text-lg leading-8 font-normal text-white pt-4">
                  {HERO_SLOGAN}
                </p>
                <div className="w-full pt-10">
                  <NewsletterBox_BeeHiiv size="sm" />
                </div>
              </div>
              <Image
                src="/img/hero_highlight_center.png"
                width={200}
                height={203}
                alt="meat box"
                className="absolute right-[0%] lg:right-[10%] xl:right-[25%] -bottom-32 md:-bottom-28 lg:-bottom-8 scale-75 lg:scale-100 l z-10 w-[200px] h-[203px]"
                style={{ height: "auto" }}
                priority
              />
              <Image
                src="/img/hero_highlight_left.png"
                width={150}
                height={100}
                alt="meat knife"
                className="absolute -left-8 bottom-0 z-10 w-[150px] h-[100px]"
                priority
              />
              <Image
                src="/img/hero_highlight_right.png"
                width={150}
                height={100}
                alt="steak stake"
                className="absolute -right-0 top-8 z-10  w-[150px] h-[100px]"
                priority
              />
            </div>
          </div>
        </div>
        <div className="w-full relative">
          <div className="hidden absolute -z-10 -left-0 top-8 md:block">
            <div className="max-w-32 h-auto">
              <Image
                src="/img/featured_farms_1.png"
                width={247}
                height={418}
                alt="steak stake"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
          <div className="hidden absolute -z-10 -right-0 bottom-8 md:block">
            <div className="max-w-32 h-auto">
              <Image
                src="/img/featured_farms_2.png"
                width={266}
                height={395}
                alt="steak stake"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
          <div>
            {state ? (
              <ListingOverview
                title={generateTitle()}
                buttonText="View All Ranches"
                buttonHref="/ranches?sort=mostPopular"
                filterAndSortParams={matchCategory()}
                maxNumListings={3}
                maxCols={3}
                showPagination={false}
                showSearch={false}
              />
            ) : (
              <p>Detecting your location...</p>
            )}
          </div>
        </div>
        <Breaker className="bg-background-secondary" />
        {/* <SubategoryQuickLinks /> */}
        <TestimonialBand className="bg-background-secondary" />
        <FAQ title="HOW IT WORKS" description="" />
        <VideoBreaker className="bg-background-secondary" />
        <NewsletterBox_BeeHiiv />
      </SectionOuterContainer>
    </>
  );
};

export default Page;
