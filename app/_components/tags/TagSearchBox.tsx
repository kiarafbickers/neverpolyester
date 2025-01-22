"use client";

// Import Types
import { CategoryType, TagType } from "@/supabase-special-types";
import { ValueLabelPair } from "@/types";
// Import External Packages
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
// Import Components
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/ui/Sheet";

import { Checkbox } from "@/ui/Checkbox";
import { Label } from "@/ui/Label";
import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";
// Import Functions & Actions & Hooks & State
import { cn } from "@/lib/utils";
// Import Data
// Import Assets & Icons
import { ChevronDownIcon, ChevronUpIcon, MenuIcon, X } from "lucide-react";
import { Disclosure } from "@headlessui/react";
import { LinkList } from "../_ui/LinkList";

export function TagSearchBoxMobile({
  tags,
  categories,
  className,
}: {
  tags: TagType[];
  categories: CategoryType[];
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
          <span className="sr-only">Filter through all listings</span>
        </SheetDescription>

        <TagSearchBox tags={tags} categories={categories} className="w-full" />
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
  className,
}: {
  tags: TagType[];
  categories: CategoryType[];
  className?: string;
}) {
  const [allTags, setAllTags] = useState<ValueLabelPair[]>([]);
  const [selected, setSelected] = useState<ValueLabelPair[]>([]);
  const [resetCategorySelector, setResetCategorySelector] = useState("");

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const Router = useRouter();

  function clusterTagsByGroups(selectables: ValueLabelPair[]) {
    const tagChoiceGroups: {
      [groupName: string]: ValueLabelPair[];
    } = { Other: [] };

    selectables.forEach((selectableTag) => {
      const correspondingTag = tags.find(
        (tag) => tag.slug === selectableTag.value
      );

      if (!correspondingTag || !correspondingTag.tag_groups) return;

      if (correspondingTag.tag_groups.length === 0) {
        tagChoiceGroups["Other"].push({
          value: correspondingTag.slug,
          label: correspondingTag.name,
        });
      } else {
        correspondingTag.tag_groups.forEach((group) => {
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

    const searchTags = searchParams.get("tags");

    if (!searchTags) return;

    const preSelected = searchTags
      .split(",")
      .map((searchTag) => formattedTags.find((tag) => tag.value === searchTag))
      .filter(Boolean) as ValueLabelPair[];

    setSelected(preSelected);
  }, [tags, searchParams]);

  const handleRemoveAllParams = () => {
    setSelected([]);
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

  const valueLabelPairCategories = categories
    .map((category) => {
      return {
        value: category.slug,
        label: category.name,
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

  const handleCategorySelect = (value: string) => {
    const currentUrl = new URL(window.location.href);
    const currentSearchParams = new URLSearchParams(currentUrl.search);

    currentSearchParams.set("category", value);
    const finalUrl = pathname + "?" + currentSearchParams.toString();
    Router.push(finalUrl, { scroll: false });
  };

  const currentCategory = searchParams.get("category") || "";

  return (
    <div className={cn("border border-neutral-300 rounded-md p-4", className)}>
      <div className="flex justify-between pb-4">
        <h2 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
          Filter
        </h2>
        <Button
          variant="link"
          className="self-end text-xs text-foreground"
          onClick={() => handleRemoveAllParams()}
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
              className="z-50  rounded-full"
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
                itemName="category"
                valueLabelPair={valueLabelPairCategories}
                changeFunction={handleCategorySelect}
                currentValue={currentCategory}
              />
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {Object.keys(groupedTags).map((tagGroupName) => (
        <Disclosure
          as="div"
          key={tagGroupName}
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
                        <Label className="ml-3 text-sm text-gray-600">
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
            <p className="text-sm font-semibold py-2">Search by name</p>
          </div>

          <Searchbar
            placeholder="Search listing"
            className="w-full"
            id="filter_search"
          />
        </div> */}
    </div>
  );
}
