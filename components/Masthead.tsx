import React, { useContext, useRef } from "react";
import { ScrollContext } from "../utils/scroll-observer";

const Masthead = () => {
  const refContainer = useRef<HTMLDivElement>(null);
  const { scrollY } = useContext(ScrollContext);

  let progress = 0;

  const { current: elContainer } = refContainer;
  if (elContainer) {
    progress = Math.min(1, scrollY / elContainer.clientHeight);
  }

  return (
    <div
      ref={refContainer}
      style={{ transform: `translateY(-${progress * 15}vh)` }}
      className="min-h-screen sticky top-0 -z-10 flex flex-col items-center justify-center"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover"
      >
        <source src="assets/masthead.mp4" type="video/mp4" />
      </video>
      <div className="p-12 font-bold z-10 text-center text-white drop-shadow-[0_5px_3px_rgba(0,0,0,0.4)]">
        <h1 className="text-6xl lg:text-8xl mb-6">AirPods Max</h1>
        <h2 className="text-3xl lg:text-4xl">
          The ultimate personal listening experience is here.
        </h2>
      </div>
    </div>
  );
};

export default Masthead;
