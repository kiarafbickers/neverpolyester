import { useState, useEffect, useMemo } from "react";
import { cn, stringToSlug } from "@/lib/utils";
import getPartialCategories from "@/actions/categories/getPartialCategories";

export default function CategorySelectBox({
  text = "State",
  className,
  maxNumItems = 4,
}: {
  text?: string;
  hrefPrefix?: string;
  className?: string;
  maxNumItems?: number;
}) {
  const [items, setItems] = useState<{ name: string }[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>("");

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await getPartialCategories("active");
      setItems(data.slice(0, maxNumItems));
    }
    fetchCategories();

    const storedValue = localStorage.getItem("selectedCategory");
    if (storedValue) {
      setSelectedValue(storedValue);
    }
  }, [maxNumItems]);

  const memoizedItems = useMemo(() => items, [items]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    localStorage.setItem("selectedCategory", value);

    setTimeout(() => {
      const url = new URL(window.location.href);
      const searchParams = new URLSearchParams(url.search);

      if (value === "All") {
        searchParams.delete("category");
      } else {
        searchParams.set("category", stringToSlug(value));
      }

      url.search = searchParams.toString();
      window.location.href = url.toString();
    }, 150);
  };

  return (
    <div
      className={cn(
        "overflow-visible relative w-full flex flex-col items-start border-t border-b group-last:border-b-0 py-4",
        className
      )}
    >
      <div className="w-full flex justify-between items-end">
        <p className="text-sm font-semibold py-2">{text}</p>
      </div>
      <select
        value={selectedValue}
        onChange={handleChange}
        className="w-full text-sm border px-2 py-1 rounded"
      >
        <option value="All">All</option>
        {memoizedItems.map((item) => (
          <option key={item.name} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}
