"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface TimelineItem {
  month: string;
  title: string;
  icon?: string;
}

interface Props {
  timelineData: TimelineItem[];
}

export default function Timeline({ timelineData }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth < 768 ? 2 : 5);
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, timelineData.length - itemsPerPage)
    );
  };

  const getVisibleItems = () => {
    return timelineData.slice(currentIndex, currentIndex + itemsPerPage);
  };

  return (
    <div className="bg-backgroundDz pb-16">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:px-8">
        <h2 className="text-blackDz text-center text-lg xl:text-2xl font-semibold mb-16 xl:mb-20">
          This is part of my personal challenge: 12 startups in 12 months.
        </h2>
        <div className="flex items-center gap-8">
          <button
            className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            aria-disabled={currentIndex === 0}
          >
            <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
          </button>
          <div className="relative flex-1 overflow-hidden">
            <div className="absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-mutedDz z-0"></div>
            <div className="flex justify-between items-center relative z-10">
              {getVisibleItems().map((item, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center"
                  style={{
                    minHeight: "120px",
                    flex: `0 0 ${100 / itemsPerPage}%`,
                  }}
                >
                  <span className="text-sm text-blackDz font-semibold mb-2">
                    {item.month || ""}
                  </span>
                  <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full border-2 border-highlightDz shadow">
                    {item.icon ? (
                      <Image
                        src={item.icon}
                        alt={item.title || ""}
                        height={32}
                        width={32}
                        className="w-8 h-8 object-contain"
                        priority
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-white text-highlightDz flex items-center justify-center">
                        ?
                      </div>
                    )}
                  </div>
                  <span className="text-sm text-blackDz font-semibold mt-2 h-5">
                    {item.title || ""}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <button
            className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleNext}
            disabled={currentIndex >= timelineData.length - itemsPerPage}
            aria-disabled={currentIndex >= timelineData.length - itemsPerPage}
          >
            <ChevronRightIcon className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
}
