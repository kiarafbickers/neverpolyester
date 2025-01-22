"use client";

// Import Types
import {
  CategoryType,
  SubcategoryType,
  SubtagType,
} from "@/supabase-special-types";
import { ValueLabelPair } from "@/types";
// Import External Packages
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
// Import Components
import Searchbar from "@/components/Searchbar";
import { DualSlider } from "@/ui/DualSlider";
import { Checkbox } from "@/ui/Checkbox";
import { Label } from "@/ui/Label";
import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";
import { Combobox } from "@/ui/Combobox";
import { Switch } from "@/ui/Switch";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/ui/Sheet";
// Import Functions & Actions & Hooks & State
// Import Data
import { cn } from "@/lib/utils";
// Import Assets & Icons
import { ChevronDownIcon, ChevronUpIcon, MenuIcon, X } from "lucide-react";
import { Disclosure } from "@headlessui/react";
import { LinkList } from "../_ui/LinkList";
import { LISTINGS_SETTINGS } from "@/app/_constants/constants";

export function TagSearchBoxMobile({
  tags,
  categories,
  subcategories,
  listings,
  className,
}: {
  tags: SubtagType[];
  categories: CategoryType[];
  subcategories: SubcategoryType[];
  listings: ValueLabelPair[];
  className?: string;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "rounded-full text-muted-foreground bg-transparent w-24 px-2",
            className
          )}
        >
          <MenuIcon className="h-5 w-5" />
          <span className="px-2">Filter</span>
          <span className="sr-only">Toggle filter menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        className="w-80 pt-10 max-h-screen overflow-y-auto"
        side="right"
      >
        <SheetTitle>
          <span className="sr-only">Filter menu</span>
        </SheetTitle>
        <SheetDescription>
          <span className="sr-only">Filter through all products</span>
        </SheetDescription>

        <TagSearchBox
          tags={tags}
          categories={categories}
          subcategories={subcategories}
          listings={listings}
          className="w-full"
        />
      </SheetContent>
    </Sheet>
  );
}

/**
 * Renders a tag search box component.
 * @param tags - An array of tags.
 */
export function TagSearchBox({
  tags,
  categories,
  subcategories,
  listings,
  className,
}: {
  tags: SubtagType[];
  categories: CategoryType[];
  subcategories: SubcategoryType[];
  listings: ValueLabelPair[];
  className?: string;
}) {
  const [allTags, setAllTags] = useState<ValueLabelPair[]>([]);
  const [selected, setSelected] = useState<ValueLabelPair[]>([]);

  const [allSubcategories, setAllSubcategories] = useState<ValueLabelPair[]>(
    []
  );
  const [selectedSubcategories, setSelectedSubcategories] = useState<
    ValueLabelPair[]
  >([]);

  const [availabilityChecked, setAvailabilityChecked] = useState(false);
  const [initialRangeValues, setInitialRangeValue] = useState([0, 200]);
  const [rangeValues, setRangeValue] = useState([0, 200]);

  const [resetListingSelector, setResetListingSelector] = useState("");
  const [resetCategorySelector, setResetCategorySelector] = useState("");

  const handleRangeChange = (newValues: any) => {
    setRangeValue(newValues);
  };
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const Router = useRouter();

  function clusterSubcategoriesByGroups(selectables: ValueLabelPair[]) {
    const tagChoiceGroups: {
      [groupName: string]: ValueLabelPair[];
    } = { Other: [] };

    selectables.forEach((selectableTag) => {
      const correspondingTag = subcategories.find(
        (subcategory) => subcategory.slug === selectableTag.value
      );

      if (!correspondingTag || !correspondingTag.subcategory_groups) return;

      if (correspondingTag.subcategory_groups.length === 0) {
        tagChoiceGroups["Other"].push({
          value: correspondingTag.slug,
          label: correspondingTag.name,
        });
      } else {
        correspondingTag.subcategory_groups.forEach((group) => {
          if (!tagChoiceGroups[group.name]) {
            tagChoiceGroups[group.name] = [];
          }
          tagChoiceGroups[group.name].push({
            value: correspondingTag.slug,
            label: correspondingTag.name,
          });
        });
      }
    });

    if (tagChoiceGroups["Other"].length === 0) {
      delete tagChoiceGroups["Other"];
    }

    return tagChoiceGroups;
  }

  function clusterTagsByGroups(selectables: ValueLabelPair[]) {
    const tagChoiceGroups: {
      [groupName: string]: ValueLabelPair[];
    } = { Other: [] };

    selectables.forEach((selectableTag) => {
      const correspondingTag = tags.find(
        (tag) => tag.slug === selectableTag.value
      );

      if (!correspondingTag || !correspondingTag.subtag_groups) return;

      if (correspondingTag.subtag_groups.length === 0) {
        tagChoiceGroups["Other"].push({
          value: correspondingTag.slug,
          label: correspondingTag.name,
        });
      } else {
        correspondingTag.subtag_groups.forEach((group) => {
          if (!tagChoiceGroups[group.name]) {
            tagChoiceGroups[group.name] = [];
          }
          tagChoiceGroups[group.name].push({
            value: correspondingTag.slug,
            label: correspondingTag.name,
          });
        });
      }
    });

    if (tagChoiceGroups["Other"].length === 0) {
      delete tagChoiceGroups["Other"];
    }

    return tagChoiceGroups;
  }

  useEffect(() => {
    if (tags.length === 0) return;
    const formattedTags: ValueLabelPair[] = tags.map((tag) => {
      return {
        value: tag.slug,
        label: tag.name,
      };
    });
    setAllTags(formattedTags);

    const formattedSubcategories: ValueLabelPair[] = subcategories.map(
      (subcategory) => {
        return {
          value: subcategory.slug,
          label: subcategory.name,
        };
      }
    );
    setAllSubcategories(formattedSubcategories);

    const availability = searchParams.get("availability");
    if (availability) {
      setAvailabilityChecked(true);
    }

    const searchTags = searchParams.get("tags");
    if (searchTags) {
      const preSelected = searchTags
        .split(",")
        .map((searchTag) =>
          formattedTags.find((tag) => tag.value === searchTag)
        )
        .filter(Boolean) as ValueLabelPair[];

      setSelected(preSelected);
    }

    const searchSubcategories = searchParams.get("subcategory");
    if (searchSubcategories) {
      const preSelectedSubcategories = searchSubcategories
        .split(",")
        .map((searchSubcategory) =>
          formattedSubcategories.find(
            (subcategory) => subcategory.value === searchSubcategory
          )
        )
        .filter(Boolean) as ValueLabelPair[];

      setSelectedSubcategories(preSelectedSubcategories);
    }
  }, [tags, subcategories, searchParams]);

  const handleRemoveAllParams = () => {
    setSelected([]);
    setAvailabilityChecked(false);
    setResetListingSelector(Math.random().toString());
    setResetCategorySelector(Math.random().toString());
    const currentUrl = new URL(window.location.href);
    const currentSearchParams = new URLSearchParams(currentUrl.search);
    currentSearchParams.delete("tags");
    currentSearchParams.delete("subcategory");
    currentSearchParams.delete("availability");
    currentSearchParams.delete("minPrice");
    currentSearchParams.delete("maxPrice");
    currentSearchParams.delete("search");
    currentSearchParams.delete("category");
    currentSearchParams.delete("listing");
    Router.push(pathname + "?" + currentSearchParams.toString(), {
      scroll: false,
    });
  };

  const handleListingSelect = (value: string) => {
    const currentUrl = new URL(window.location.href);
    const currentSearchParams = new URLSearchParams(currentUrl.search);

    currentSearchParams.set("listing", value);
    const finalUrl = pathname + "?" + currentSearchParams.toString();
    Router.push(finalUrl, { scroll: false });
  };

  const handleSelectSelect = (value: string) => {
    const currentUrl = new URL(window.location.href);
    const currentSearchParams = new URLSearchParams(currentUrl.search);

    currentSearchParams.set("subcategory", value);
    const finalUrl = pathname + "?" + currentSearchParams.toString();
    Router.push(finalUrl, { scroll: false });
  };

  const handleSingleSelect = (value: string, type: "add" | "remove") => {
    const currentUrl = new URL(window.location.href);
    const currentSearchParams = new URLSearchParams(currentUrl.search);

    if (type === "remove") {
      currentSearchParams.delete(value);
      Router.push(pathname + "?" + currentSearchParams.toString(), {
        scroll: false,
      });
      return;
    }

    currentSearchParams.set(value, "true");
    const finalUrl = pathname + "?" + currentSearchParams.toString();
    Router.push(finalUrl, { scroll: false });
  };

  const handleRangeSelect = (value: number[], type: "add" | "remove") => {
    const currentUrl = new URL(window.location.href);
    const currentSearchParams = new URLSearchParams(currentUrl.search);

    if (type === "remove") {
      currentSearchParams.delete("minPrice");
      currentSearchParams.delete("maxPrice");
      Router.push(pathname + "?" + currentSearchParams.toString(), {
        scroll: false,
      });
      return;
    }

    currentSearchParams.set("minPrice", value[0].toString());
    currentSearchParams.set("maxPrice", value[1].toString());
    const finalUrl = pathname + "?" + currentSearchParams.toString();
    Router.push(finalUrl, { scroll: false });
  };

  const handleSubcategorySelect = (value: string, type: "add" | "remove") => {
    const currentUrl = new URL(window.location.href);
    const currentSearchParams = new URLSearchParams(currentUrl.search);

    if (value === "" && type === "remove") {
      currentSearchParams.delete("subcategory");
      setSelectedSubcategories([]);
      Router.push(pathname + "?" + currentSearchParams.toString(), {
        scroll: false,
      });
      return;
    }
    const newSubcategory = allSubcategories.find(
      (subcategory) => subcategory.value === value
    );
    let newSubcategoryArray = [];
    if (!newSubcategory) return;
    if (type === "remove") {
      newSubcategoryArray = selected.filter((tag) => tag.value !== value);
      setSelectedSubcategories((prev) => prev.filter((s) => s.value !== value));
    } else {
      newSubcategoryArray = selected.concat(newSubcategory);
    }

    if (newSubcategoryArray.length === 0) {
      currentSearchParams.delete("subcategory");
      Router.push(pathname + "?" + currentSearchParams.toString(), {
        scroll: false,
      });
      return;
    }
    const newSubcategoryString = newSubcategoryArray
      .map((subcategory) => subcategory.value)
      .join(",");
    currentSearchParams.set("subcategory", newSubcategoryString);
    const finalUrl = pathname + "?" + currentSearchParams.toString();
    Router.push(finalUrl, { scroll: false });
  };

  const handleSelect = (value: string, type: "add" | "remove") => {
    const currentUrl = new URL(window.location.href);
    const currentSearchParams = new URLSearchParams(currentUrl.search);

    if (value === "" && type === "remove") {
      currentSearchParams.delete("tags");
      setSelected([]);
      Router.push(pathname + "?" + currentSearchParams.toString(), {
        scroll: false,
      });
      return;
    }
    const newTag = allTags.find((tag) => tag.value === value);
    let newTagArray = [];
    if (!newTag) return;
    if (type === "remove") {
      newTagArray = selected.filter((tag) => tag.value !== value);
      setSelected((prev) => prev.filter((s) => s.value !== value));
    } else {
      newTagArray = selected.concat(newTag);
    }

    if (newTagArray.length === 0) {
      currentSearchParams.delete("tags");
      Router.push(pathname + "?" + currentSearchParams.toString(), {
        scroll: false,
      });
      return;
    }
    const newTagString = newTagArray.map((tag) => tag.value).join(",");
    currentSearchParams.set("tags", newTagString);
    const finalUrl = pathname + "?" + currentSearchParams.toString();
    Router.push(finalUrl, { scroll: false });
  };

  const selectables = allTags.filter(
    (tag) => !selected.some((selectedTag) => selectedTag.value === tag.value)
  );

  const groupedSelectables = clusterTagsByGroups(selectables);

  const groupedSelected = clusterTagsByGroups(selected);

  const groupedTags = clusterTagsByGroups(
    tags.map((tag) => {
      return {
        value: tag.slug,
        label: tag.name,
      };
    })
  );

  const selectableSubcategories = allSubcategories.filter(
    (subcategory) =>
      !selectedSubcategories.some(
        (selectedSubcategory) => selectedSubcategory.value === subcategory.value
      )
  );

  const groupedSubcategorySelectables = clusterSubcategoriesByGroups(
    selectableSubcategories
  );

  const groupedSelectedSubcategories = clusterSubcategoriesByGroups(
    selectedSubcategories
  );

  const groupedSubcategories = clusterSubcategoriesByGroups(
    subcategories.map((subcategory) => {
      return {
        value: subcategory.slug,
        label: subcategory.name,
      };
    })
  );

  const valueLabelPairSubCategories = subcategories
    .map((subcategory) => {
      return {
        value: subcategory.slug,
        label: subcategory.name,
      };
    })
    .sort((a, b) => {
      const nameA = a.label.toUpperCase();
      const nameB = b.label.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

  const valueLabelPairListings = listings
    .map((listing) => {
      return {
        value: listing.value,
        label: listing.label,
      };
    })
    .sort((a, b) => {
      const nameA = a.label.toUpperCase();
      const nameB = b.label.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

  const currentSubCategory = searchParams.get("subcategory") || "";
  const currentListing = searchParams.get("listing") || "";

  return (
    <div className={cn("border border-neutral-300 rounded-md p-4", className)}>
      <div className="flex justify-between pb-4">
        <h2 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
          Filter
        </h2>
        <Button
          variant="link"
          className="self-end text-xs text-foreground"
          onClick={() => {
            handleRemoveAllParams();
            setRangeValue([0, 200]);
          }}
        >
          Clear All
        </Button>
      </div>
      <div className="w-full">
        <div className="flex flex-wrap pb-4 gap-2">
          {selected.map((tag) => (
            <Badge
              key={tag.value}
              variant="secondary"
              className="z-50  hover:border-slate-500 whitespace-nowrap bg-neutral-200 dark:bg-background-secondary"
            >
              {tag.label}
              <button
                className="ml-1 outline-none focus:ring-2 focus:ring-primary"
                onClick={() => handleSelect(tag.value, "remove")}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      {/* categories */}
      <Disclosure as="div" className="border-b border-gray-200 py-6">
        {({ open }) => (
          <>
            <h3 className="-my-3 flow-root">
              <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                <span className="font-medium text-foreground">Category</span>
                <span className="ml-6 flex items-center">
                  {open ? (
                    <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </span>
              </Disclosure.Button>
            </h3>

            <Disclosure.Panel className="pt-6">
              <LinkList
                itemName="subcategory"
                valueLabelPair={valueLabelPairSubCategories}
                changeFunction={handleSelectSelect}
                currentValue={currentSubCategory}
              />
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* listings */}
      <Disclosure as="div" className="border-b border-gray-200 py-6">
        {({ open }) => (
          <>
            <h3 className="-my-3 flow-root">
              <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                <span className="font-medium text-foreground">
                  {LISTINGS_SETTINGS.singularName}
                </span>
                <span className="ml-6 flex items-center">
                  {open ? (
                    <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </span>
              </Disclosure.Button>
            </h3>

            <Disclosure.Panel className="pt-6">
              <LinkList
                itemName="listing"
                valueLabelPair={valueLabelPairListings}
                changeFunction={handleListingSelect}
                currentValue={currentListing}
              />
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* price */}
      <Disclosure as="div" className="border-b border-gray-200 py-6">
        {({ open }) => (
          <>
            <h3 className="-my-3 flow-root">
              <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                <span className="font-medium text-foreground">
                  Price & Deals
                </span>
                <span className="ml-6 flex items-center">
                  {open ? (
                    <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </span>
              </Disclosure.Button>
            </h3>

            <Disclosure.Panel className="pt-6">
              <div className="flex justify-between">
                <p className="text-sm font-semibold py-2">Price</p>
                <Button
                  variant="link"
                  className="self-end text-xs text-foreground"
                  onClick={() => handleRangeSelect(rangeValues, "add")}
                >
                  Search in Price Range
                </Button>
              </div>
              <div className="mt-2">
                <DualSlider
                  defaultValue={initialRangeValues}
                  minStepsBetweenThumbs={1}
                  max={200}
                  min={0}
                  step={1}
                  value={rangeValues}
                  onValueChange={handleRangeChange}
                  className={cn("w-full")}
                />
                <div className="flex justify-between mt-2">
                  <span className="text-xs">${rangeValues[0]} </span>
                  <span className="text-xs">${rangeValues[1]}</span>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* availability */}
      <Disclosure as="div" className="border-b border-gray-200 py-6">
        {({ open }) => (
          <>
            <h3 className="-my-3 flow-root">
              <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                <span className="font-medium text-foreground">
                  Availability
                </span>
                <span className="ml-6 flex items-center">
                  {open ? (
                    <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </span>
              </Disclosure.Button>
            </h3>
            <Disclosure.Panel className="pt-6">
              <div className="flex items-center">
                <Switch
                  checked={availabilityChecked}
                  onCheckedChange={() => {
                    availabilityChecked
                      ? handleSingleSelect("availability", "remove")
                      : handleSingleSelect("availability", "add"),
                      setAvailabilityChecked(!availabilityChecked);
                  }}
                />
                <Label className="ml-2 text-foreground">
                  Include Out Of Stock
                </Label>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* Subcategories */}
      {/* {Object.keys(groupedSubcategories).map((categoryGroupName) => (
        <Disclosure
          key={categoryGroupName}
          as="div"
          className="border-b border-gray-200 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-foreground">
                    {categoryGroupName}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="grid space-y-2">
                  {groupedSelectedSubcategories[categoryGroupName] &&
                    groupedSelectedSubcategories[categoryGroupName].map(
                      (subcategory) => (
                        <div
                          key={subcategory.label}
                          className="flex items-center"
                        >
                          <Checkbox
                            checked={true}
                            onCheckedChange={() => {
                              handleSubcategorySelect(
                                subcategory.value,
                                "remove"
                              );
                            }}
                          />
                          <Label className="ml-2 text-foreground">
                            {subcategory.label}
                          </Label>
                        </div>
                      )
                    )}

                  {groupedSubcategorySelectables[categoryGroupName] &&
                    groupedSubcategorySelectables[categoryGroupName].map(
                      (subcategory) => (
                        <div
                          key={subcategory.label}
                          className="flex items-center"
                        >
                          <Checkbox
                            checked={false}
                            onCheckedChange={() => {
                              handleSubcategorySelect(subcategory.value, "add");
                            }}
                          />
                          <Label className="ml-2 text-foreground">
                            {subcategory.label}
                          </Label>
                        </div>
                      )
                    )}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))} */}

      {/* Tags */}
      {Object.keys(groupedTags).map((tagGroupName) => (
        <Disclosure
          key={tagGroupName}
          as="div"
          className="border-b border-gray-200 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-foreground">
                    {tagGroupName}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-4">
                  {groupedSelected[tagGroupName] &&
                    groupedSelected[tagGroupName].map((tag) => (
                      <div key={tag.label} className="flex items-center">
                        <Checkbox
                          checked={true}
                          onCheckedChange={() => {
                            handleSelect(tag.value, "remove");
                          }}
                        />
                        <Label className="ml-2 text-foreground">
                          {tag.label}
                        </Label>
                      </div>
                    ))}

                  {groupedSelectables[tagGroupName] &&
                    groupedSelectables[tagGroupName].map((tag) => (
                      <div key={tag.label} className="flex items-center">
                        <Checkbox
                          checked={false}
                          onCheckedChange={() => {
                            handleSelect(tag.value, "add");
                          }}
                        />
                        <Label className="ml-2 text-foreground">
                          {tag.label}
                        </Label>
                      </div>
                    ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}

      {/* <div className="overflow-visible relative w-full flex flex-col items-start border-t border-b group-last:border-b-0 py-4">
          <div className="w-full flex justify-between items-end">
            <p className="text-sm font-semibold py-2">Keyword</p>
          </div>

          <Searchbar
            placeholder="Search product"
            className="w-full"
            id="filter_search"
            rootPage="/products"
          />
        </div> */}
    </div>
  );
}
