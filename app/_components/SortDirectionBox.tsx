"use client";

// Import Types
// Import External Packages
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
// Import Components
import { Button } from "@/ui/Button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/Select";
// Import Functions & Actions & Hooks & State
// Import Data
import { SORT_DIRECTIONS } from "@/constants";
// Import Assets & Icons
import { ChevronDown, SortDescIcon } from "lucide-react";

/**
 * Renders a component for sorting direction selection.
 */
export function SortDirectionBox() {
  const [value, setValue] = useState("mostPopular");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const Router = useRouter();

  /**
   * Creates a query string with the specified name and value.
   * @param name - The name of the query parameter.
   * @param value - The value of the query parameter.
   * @returns The created query string.
   */
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    const sortString = searchParams.get("sort");
    if (!sortString) return;
    setValue(sortString);
  }, [searchParams]);

  const handleSelect = (value: string) => {
    if (value === "") {
      setValue("mostPopular");
      Router.push(pathname + "?" + createQueryString("sort", "mostPopular"), {
        scroll: false,
      });
      return;
    }
    const finalUrl = pathname + "?" + createQueryString("sort", value);
    Router.push(finalUrl, { scroll: false });
  };

  return (
    <div className="overflow-visible relative w-52 flex flex-col items-start">
      <Select
        value={value}
        onValueChange={(value) => {
          handleSelect(value);
        }}
      >
        <SelectTrigger className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
          <SelectValue placeholder="Popular" />
          <ChevronDown
            aria-hidden="true"
            className="-mr-1 ml-2 h-5 w-5 text-gray-500"
          />
        </SelectTrigger>
        <SelectContent className="bg-white text-foreground dark:bg-black dark:text-white">
          <SelectGroup>
            {SORT_DIRECTIONS.map((direction) => (
              <SelectItem
                key={direction.value}
                value={direction.value}
                className="hover:bg-neutral-100 cursor-pointer"
              >
                {direction.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
