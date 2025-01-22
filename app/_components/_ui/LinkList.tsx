"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

export function LinkList({
  itemName,
  valueLabelPair,
  changeFunction,
  currentValue,
}: {
  itemName: string;
  valueLabelPair: { value: string; label: string }[];
  changeFunction: (value: string) => void;
  currentValue?: string;
}) {
  return (
    <ul role="list" className="w-full space-y-4 text-sm text-gray-600">
      {valueLabelPair.map((pair) => (
        <li key={pair.value}>
          <Button
            variant="link"
            className={cn(
              "text-sm text-gray-600 font-medium p-0 h-0 underline-offset-auto hover:no-underline",
              pair.value === currentValue
                ? "text-gray-900 hover:text-gray-600"
                : "text-gray-600 hover:text-gray-900"
            )}
            onClick={() => changeFunction(pair.value)}
          >
            {pair.label}
          </Button>
        </li>
      ))}
    </ul>
  );
}
