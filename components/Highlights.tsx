import React, { useContext, useRef } from "react";
import { highlightsContent } from "../utils/content-data";
import { ScrollContext } from "../utils/scroll-observer";

const opacityForBlock = (sectionProgress: number, highlightIdx: number) => {
  const progress = sectionProgress - highlightIdx;
  if (progress >= 0 && progress < 1) return 1;
  return 0.2;
};

const Highlights = () => {
  const refContainer = useRef<HTMLDivElement>(null);
  const { scrollY } = useContext(ScrollContext);

  const numOfBlocks = 3;
  let progress = 0;

  const { current: elContainer } = refContainer;
  if (elContainer) {
    const { clientHeight, offsetTop } = elContainer;
    const screenH = window.innerHeight;
    const halfH = screenH / 2;
    const percentY =
      Math.min(
        clientHeight + halfH,
        Math.max(-screenH, scrollY - offsetTop) + halfH
      ) / clientHeight;
    progress = Math.min(
      numOfBlocks - 0.5,
      Math.max(0.5, percentY * numOfBlocks)
    );
  }

  return (
    <div ref={refContainer} className="bg-black text-white">
      <div className="min-h-screen max-w-5xl mx-auto px-10 lg:px-20 py-24 md:py-28 lg:py-36 flex flex-col justify-center items-center text-4xl md:text-5xl lg:text-6xl tracking-tight font-medium">
        <div className="leading-[1.15]">
          {highlightsContent.map((highlight, idx) => (
            <div
              className="transition-opacity duration-[400] inline-block my-10"
              style={{ opacity: opacityForBlock(progress, idx) }}
            >
              <strong>{highlight.header}</strong> {highlight.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Highlights;
