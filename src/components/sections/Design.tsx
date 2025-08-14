"use client";
import React, { useState } from "react";

const desktopImages = [
  "img0.png", // featured
  "img3.png",
  "img2.png",
  "img7.png",
  "img8.png",
];

const mobileImages = [
  "img0.png",
  "img3.png",
  "img2.png",
  "img7.png",
  "img8.png",
];

const Design = () => {
  // For desktop, track which image is expanded (0 = featured, 1+ = others)
  const [expandedIdx, setExpandedIdx] = useState(0);

  // For mobile, track which image is expanded (for future, but not required by prompt)
  // const [mobileExpandedIdx, setMobileExpandedIdx] = useState(null);

  return (
    <section
      id="projects"
      className="min-h-screen p-5 transition-all duration-150 ease-in-out md:p-10 lg:p-14"
    >
      {/* Section Heading */}
      <div className="my-10 text-center font-spaceGrotesk text-[42px] font-medium leading-none tracking-tighter md:text-7xl lg:text-7xl">
        <div className="text-left">
          <h2>*</h2>
          <h2 className="font-light">SOME FEATURED</h2>
          <h2 className="font-bold">DESIGNS</h2>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden gap-3 lg:flex">
        {desktopImages.map((src, idx) => {
          // Expanded image is the "featured" one, others are smaller
          const isExpanded = idx === expandedIdx;
          return (
            <div
              key={idx}
              className={[
                "relative overflow-hidden rounded-[24px] flex min-w-[170px] cursor-pointer items-center justify-center transition-all duration-700 ease-in-out",
                isExpanded
                  ? "h-[630px] flex-[3.5] opacity-100 z-10"
                  : "h-[200px] lg:h-[630px] lg:flex-[0.5] opacity-40 z-0",
              ].join(" ")}
              onClick={() => setExpandedIdx(idx)}
              tabIndex={0}
              role="button"
              aria-label={`Expand design ${idx + 1}`}
            >
              <div className="relative mb-3 size-full overflow-hidden rounded-3xl bg-[#E7EAEE]">
                <img
                  className="absolute size-full object-cover transition-all duration-150 ease-in-out"
                  src={`/imgMe/${src}`}
                  alt="ui"
                />
                <div
                  className={[
                    "flex-center absolute size-full transition-all duration-700 ease-in-out",
                    isExpanded
                      ? "opacity-100 hover:opacity-100"
                      : "opacity-0 hover:opacity-100",
                  ].join(" ")}
                >
                  <div className="absolute size-full bg-black opacity-20 transition-all ease-in-out"></div>
                  <h2
                    className={[
                      "h3-light flex-center absolute z-10 gap-3 rounded-full bg-[#FFFFFFDD] px-5 py-2 !text-black backdrop-blur-3xl transition-all delay-500 ease-in-out",
                      isExpanded ? "opacity-100" : "opacity-0",
                    ].join(" ")}
                  >
                    <img
                      src="/social/dribbble.svg"
                      className="drop-shadow-lg"
                      alt=""
                    />
                    See on Dribble
                  </h2>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile View */}
      <div className="flex flex-col gap-3 lg:hidden">
        {mobileImages.map((src, idx) => (
          <img
            key={idx}
            alt={`Design ${idx}`}
            className="w-full rounded-3xl border"
            src={`/imgMe/${src}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Design;
