"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TYPING_TEXT = "Bringing Ideas to Reality";

const Hero = () => {
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const typingRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [showM, setShowM] = useState(true);

  // Helper to set refs for typing animation
  const setTypingRef = useCallback((el: HTMLSpanElement | null, idx: number) => {
    typingRefs.current[idx] = el;
  }, []);

  // Typing effect on mount and on scroll up (bottom to up)
  useEffect(() => {
    if (typingRefs.current.length === 0) return;

    // Hide all chars initially
    typingRefs.current.forEach((el) => {
      if (el) el.style.opacity = "0";
    });

    // Animate in one by one (on mount)
    gsap.to(
      typingRefs.current.filter(Boolean),
      {
        opacity: 1,
        stagger: 0.05,
        duration: 0.6,
        ease: "power1.inOut",
        delay: 0.5,
      }
    );

    // Scroll-triggered typing effect (when scrolling bottom to up)
    let scrollTriggerInstance: ScrollTrigger | undefined;
    if (typingRefs.current.length > 0) {
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: typingRefs.current[0]?.parentElement,
        start: "top+=-50%", // when the p tag enters the viewport from bottom
        end: "top end",
        onEnter: () => {
          // Animate in one by one again (scroll up into view)
          gsap.to(
            typingRefs.current.filter(Boolean),
            {
              opacity: 1,
              stagger: 0.05,
              duration: 0.6,
              ease: "power1.inOut",
              overwrite: "auto",
            }
          );
        },
        onLeaveBack: () => {
          // Hide all chars when scrolling back down (out of view at bottom)
          typingRefs.current.forEach((el) => {
            if (el) el.style.opacity = "0";
          });
        },
        onEnterBack: () => {
          // Animate in one by one again (scroll up from below)
          gsap.to(
            typingRefs.current.filter(Boolean),
            {
              opacity: 1,
              stagger: 0.05,
              duration: 0.6,
              ease: "power1.inOut",
              overwrite: "auto",
            }
          );
        },
        onLeave: () => {
          // Hide all chars when scrolling up out of view at top
          typingRefs.current.forEach((el) => {
            if (el) el.style.opacity = "0";
          });
        },
      });
    }

    return () => {
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
    };
  }, []);

  useEffect(() => {
    if (!h2Ref.current || !imgRef.current) return;

    const ctx = gsap.context(() => {
      // Animate h2 scale
      gsap.fromTo(
        h2Ref.current,
        { scale: 1 },
        {
          scale: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: h2Ref.current,
            start: "top top",
            end: "bottom+=20% top",
            scrub: 1,
            // markers: true, // Uncomment for debugging
            onUpdate: (self) => {
              // When fully scrolled (progress === 1), hide M
              if (self.progress >= 1) {
                setShowM(false);
              } else {
                setShowM(true);
              }
            },
          },
        }
      );
      // Animate image
      gsap.fromTo(
        imgRef.current,
        { y: 0 },
        {
          y: "-15vh", // Move image up to flow to top of side
          ease: "power2.out",
          scrollTrigger: {
            trigger: h2Ref.current,
            start: "top top",
            end: "bottom+=30%",
            scrub: 1,
            // markers: true, // Uncomment for debugging
          },
        }
      );
    }, [h2Ref, imgRef]);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <main
        className="relative flex h-screen snap-start overflow-hidden items-center justify-center"
        style={{ opacity: 1, transform: "none" }}
      >
        <section className="flex flex-col items-center justify-center relative z-0 h-screen w-screen">
          <div
            className="flex flex-col items-center justify-center relative"
            style={{ opacity: 1, transform: "none" }}
          >
            <h1 className="h1-light mb-8 p-0 md:m-0 text-center flex items-center justify-center">
              i&apos;m
              {/* Show image on all device views, but size responsively */}
              <img
                ref={imgRef}
                data-scroll="true"
                data-scroll-speed="0.25"
                className="inline-block pb-3 align-middle is-inview w-[60px] h-[80px] sm:w-[80px] sm:h-[110px] md:w-[120px] hidden md:inline md:h-[160px] lg:w-[150px] lg:h-[200px]"
                src="/images/me1.png"
                height={200}
                width={150}
                alt=""
                style={{ transform: "translate3d(0px, 0px, 0px)" }}
              />{" "}
              mohammadali
            </h1>

            <h1 className="h1-bolder flex flex-col items-center justify-center -mt-6 mb-10 p-4">
              <p
                className="flex flex-wrap font-medium text-center text-black dark:text-white items-center justify-center"
                style={{ opacity: 1 }}
              >
                {TYPING_TEXT.split("").map((char, idx) => (
                  <span
                    key={idx}
                    ref={el => setTypingRef(el, idx)}
                    style={{ opacity: 0, display: "inline-block", transition: "opacity 0.2s" }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </p>
            </h1>

            <h2
              ref={h2Ref}
              className="absolute w-full text-center font-peste text-[200px] leading-[0.8] opacity-5 md:text-[380px] md:leading-normal"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                transform: "translate(0px, 0px)",
                fontFamily: "PesteTRIAL"
              }}
              aria-hidden="true"
            >
              {showM && (
                <span className="hidden md:inline">
                  <span>M·</span>
                </span>
              )}
              <span className="block md:inline">
                <span>ALI</span>
              </span>
            </h2>
          </div>
        </section>
      </main>
    </>
  );
};

export default Hero;