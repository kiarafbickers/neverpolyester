"use client";

// Import Types
import { SublistingType } from "@/supabase-special-types";
// Import External Packages
// Import Components
import { Alert, AlertTitle, AlertDescription } from "@/ui/Alert";
import SublistingCard from "@/components/sublistings/SublistingCard";
import ListingPagination from "../ListingPagination";
import { Input } from "@/ui/Input";
// Import Functions & Actions & Hooks & State
import useListingPagination from "@/lib/useListingPagination";
// Import Data
// Import Assets & Icons
import { AlertCircle } from "lucide-react";
import { sub } from "date-fns";

export default function SublistingGrid({
  sublistings,
  maxCols,
  showPagination,
  initialItemsPerPage,
  showSearch = true,
  showAsRow = false,
  user,
}: {
  sublistings: SublistingType[];
  maxCols: number;
  showPagination?: boolean;
  initialItemsPerPage: number;
  showSearch?: boolean;
  showAsRow?: boolean;
  user: User | null;
}) {
  const {
    currentData,
    currentPage,
    totalPages,
    itemsPerPage,
    paginateBack,
    paginateFront,
    paginateBackFF,
    paginateFrontFF,
    setItemsPerPage,
    setSearchTerm,
    setCurrentPage,
  } = useListingPagination({
    initialItemsPerPage: initialItemsPerPage || maxCols * 2,
    data: sublistings,
    searchField: "title",
  });

  return (
    <>
      {sublistings.length === 0 ? (
        <Alert
          variant="destructive"
          className="bg-white w-fit h-fit mx-auto col-span-full"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Ohh!</AlertTitle>
          <AlertDescription>
            It seems like we did not find any sublistings given search
            parameters. <br /> Please change your filters. Thank you!
          </AlertDescription>
        </Alert>
      ) : (
        <>
          {showSearch && (
            <div className="w-full flex justify-end mt-8 mb-4">
              <Input
                className="w-58"
                placeholder="Filter by name..."
                onChange={(e) => setSearchTerm(e.target.value || "")}
              />
            </div>
          )}
          {currentData.length === 0 ? (
            <Alert
              variant="destructive"
              className="bg-white w-fit h-fit mx-auto col-span-full"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Ohh!</AlertTitle>
              <AlertDescription>
                It seems like we did not find any sublistings given search
                parameters. <br /> Please change your filters. Thank you!
              </AlertDescription>
            </Alert>
          ) : (
            <div
              className={
                showAsRow
                  ? `flex flex-nowrap overflow-x-auto space-x-4 py-4 md:space-x-0 md:py-0 md:overflow-hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-y-10 md:gap-x-8 xl:grid-cols-${maxCols.toString()} w-full`
                  : `grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-8 lg:grid-cols-3 xl:grid-cols-${maxCols.toString()} w-full`
              }
            >
              {currentData.map((sublisting) => (
                <SublistingCard
                  key={sublisting.slug}
                  sublisting={sublisting}
                  showAsRow={showAsRow}
                  user={user}
                />
              ))}
            </div>
          )}
          {showPagination && sublistings.length > itemsPerPage && (
            <ListingPagination
              itemsPerPage={itemsPerPage}
              totalItems={sublistings.length}
              currentPage={currentPage}
              totalPages={totalPages}
              paginateFront={paginateFront}
              paginateBack={paginateBack}
              paginateFrontFF={paginateFrontFF}
              paginateBackFF={paginateBackFF}
              setCurrentPage={setCurrentPage}
              nameOfItems="listings"
              pageSizeOptions={[10, 20, 50]}
            />
          )}
        </>
      )}
    </>
  );
}
