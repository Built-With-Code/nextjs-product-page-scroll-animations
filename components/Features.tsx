import Image from "next/image";
import React, { useContext, useRef } from "react";
import { featuresContent } from "../utils/content-data";
import { ScrollContext } from "../utils/scroll-observer";

const Features = () => {
  return (
    <TileWrapper numOfPages={featuresContent.length}>
      {featuresContent.map((feature, idx) => (
        <Feature page={idx} feature={feature} />
      ))}
    </TileWrapper>
  );
};

export default Features;

// Feature component

type FeatureProps = {
  feature: any;
  page: number;
};

const Feature: React.FC<FeatureProps> = ({ page, feature }) => {
  const { currentPage, numOfPages } = useContext(TileContext);
  const progress = Math.max(0, currentPage - page);
  const refContainer = useRef<HTMLDivElement>(null);

  let opacity = Math.min(1, Math.max(0, progress * 4));
  if (progress > 0.85 && page < numOfPages - 1) {
    opacity = Math.max(0, (1.0 - progress) * 4);
  }

  let translateYLeft = Math.max(0, 50 - progress * 3 * 50);
  if (progress > 0.85) {
    translateYLeft = Math.max(-50, -(progress - 0.85) * 2 * 50);
  }
  let translateYRight = Math.max(-50, -(progress - 0.5) * 50);

  return (
    <div
      ref={refContainer}
      className="absolute top-0 w-full"
      style={{
        pointerEvents: progress <= 0 || progress >= 1 ? "none" : undefined,
        opacity,
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-screen">
        <div
          className="flex flex-col items-center justify-center text-3xl h-[30vh] lg:h-auto"
          style={{ transform: `translateY(${translateYLeft})px` }}
        >
          <div className="leading-10 mx-20 max-w-xl">
            <div className="mb-4 xl:mb-6 font-semibold xl:text-5xl">
              {feature.title}
            </div>
            <div className="text-gray-300 text-2xl">{feature.content}</div>
          </div>
        </div>
        <div
          className="flex flex-1 lg:items-center justify-center h-[70vh] lg:h-screen"
          style={{ transform: `translateY(${translateYRight})px` }}
        >
          <div className="w-full max-w-md pt-10 lg:pt-0 px-10 md:px-0 flex items-center">
            <Image
              src={feature.image}
              layout="responsive"
              width={840}
              height={1620}
              alt={feature.title}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Abstracted Tile component to support scroll animations

interface TileContextValue {
  numOfPages: number;
  currentPage: number;
}

const TileContext = React.createContext<TileContextValue>({
  numOfPages: 0,
  currentPage: 0,
});

type TileWrapperProps = {
  numOfPages: number;
  children?: React.ReactNode;
};

const TileWrapper: React.FC<TileWrapperProps> = ({ children, numOfPages }) => {
  const refContainer = useRef<HTMLDivElement>(null);
  const { scrollY } = useContext(ScrollContext);

  let currentPage = 0;

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
    currentPage = percentY * numOfPages;
  }

  return (
    <TileContext.Provider value={{ numOfPages, currentPage }}>
      <div
        ref={refContainer}
        className="relative bg-black text-white"
        style={{ height: numOfPages * 100 + "vh" }}
      >
        <div className="absolute h-full w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-screen top-0 sticky">
            <div className="bg-black h-[30vh] lg:h-auto"></div>
            <div className="bg-white h-[70vh] lg:min-h-screen"></div>
          </div>
        </div>
        <div className="sticky top-0 h-screen overflow-hidden">{children}</div>
      </div>
    </TileContext.Provider>
  );
};
