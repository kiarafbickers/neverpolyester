"use client";
import { useRef, useEffect } from "react";

interface ScrollingLabelsProps {
  labels: string[];
}

export default function ScrollingLabels({ labels }: ScrollingLabelsProps) {
  const scrollContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainer.current;
    if (!container) return;

    const scrollSpeed = 0.5;
    let animationFrameId: number;
    let currentPosition = 0;

    const populateContent = () => {
      const containerWidth = container.offsetWidth;
      let totalContentWidth = 0;

      while (totalContentWidth < containerWidth * 2) {
        labels.forEach((label) => {
          const labelDiv = document.createElement("div");
          labelDiv.className =
            "flex items-center flex-shrink-0 px-4 py-2 text-center mx-2";
          labelDiv.innerHTML = `<p class="font-semibold text-blackDz uppercase">${label}</p>`;
          container.appendChild(labelDiv);

          const bullet = document.createElement("span");
          bullet.className = "mx-2 text-blackDz";
          bullet.innerHTML = "&bull;";
          container.appendChild(bullet);

          totalContentWidth += labelDiv.offsetWidth + bullet.offsetWidth;
        });
      }
    };

    const startScrolling = () => {
      const scroll = () => {
        currentPosition += scrollSpeed;
        container.scrollLeft = currentPosition;

        if (container.scrollLeft >= container.scrollWidth / 2) {
          currentPosition = 0;
          container.scrollLeft = currentPosition;
        }
        animationFrameId = requestAnimationFrame(scroll);
      };

      scroll();
    };

    populateContent();
    startScrolling();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.innerHTML = "";
    };
  }, [labels]);

  return (
    <div className="bg-successDz w-full">
      <div className="overflow-hidden">
        <nav aria-label="Scrolling Labels">
          <div
            ref={scrollContainer}
            className="flex items-center whitespace-nowrap overflow-hidden w-full"
          ></div>
        </nav>
      </div>
    </div>
  );
}
