"use client";

import { useEffect, useState, useMemo } from "react";
import useGeolocation from "../_lib/useGeolocation";
import ListingOverview from "./listings/ListingOverview";

const RanchesbyCategory = ({ categories }: { categories: any[] }) => {
  const { state: userLocation, error: geoError } = useGeolocation();

  // Memoize the matched category to avoid unnecessary recalculations
  const matchedCategory = useMemo(() => {
    if (!userLocation || categories.length === 0) return null;

    return (
      categories.find(
        (category) =>
          category.name?.toLowerCase() === userLocation.toLowerCase()
      ) || null
    );
  }, [userLocation, categories]);

  // Early return if there is a geolocation error or no matched category
  if (geoError || !matchedCategory) return null;

  return (
    <ListingOverview
      title={`Ranches in ${matchedCategory.name}`}
      buttonText="View All Ranches"
      buttonHref={`/ranches?category=${matchedCategory.slug}`}
      filterAndSortParams={{ category: matchedCategory.slug }}
      maxNumListings={3}
      maxCols={3}
      showPagination={false}
      showSearch={false}
    />
  );
};

export default RanchesbyCategory;
