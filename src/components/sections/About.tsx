'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MaskedDiv from '../ui/masked-div';

gsap.registerPlugin(ScrollTrigger);

const TYPING_TEXT = " { Simplicity for the Future } ";

const About = () => {
  const typingRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Helper to set refs for typing animation
  const setTypingRef = (el: HTMLSpanElement | null, idx: number) => {
    typingRefs.current[idx] = el;
  };

  useEffect(() => {
    if (typingRefs.current.length === 0) return;

    // Hide all chars initially
    typingRefs.current.forEach((el) => {
      if (el) el.style.opacity = "0";
    });

    let scrollTriggerInstance: ScrollTrigger | undefined;

    // Animate in one by one (typing effect) when section enters viewport
    if (sectionRef.current) {
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%", // when section top enters 80% of viewport
        onEnter: () => {
          gsap.to(
            typingRefs.current.filter(Boolean),
            {
              opacity: 1,
              stagger: 0.08,
              duration: 0.2,
              ease: "power1.inOut",
              overwrite: "auto",
            }
          );
        },
        onLeaveBack: () => {
          // Hide all chars when scrolling back up out of view
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

  return (
    <section ref={sectionRef}>
      <div className="flex min-h-screen w-full snap-start flex-col-reverse items-center justify-center gap-6 p-4 md:p-8 lg:flex-row lg:p-20">
        
        {/* Left Content */}
        <div
          className="card-l flex size-full flex-col justify-center gap-4 rounded-[30px] p-4 text-left shadow-apple-s dark:border dark:border-dark-50 dark:shadow-none md:gap-6 md:p-6 lg:h-[548px] lg:w-3/4 lg:p-12"
          style={{ maxHeight: "548px" }}
        >
          <div className="w-full">
            <p className="h2-light w-full text-left text-2xl md:text-3xl lg:text-4xl">*</p>
            <h2 className="h2-light w-full text-left text-2xl md:text-3xl lg:text-4xl">
              I&apos;m your <span className="font-bold">Full Stack Developer</span>
            </h2>
          </div>

          <h4 className="h3-light text-left text-lg leading-snug opacity-20 md:text-2xl lg:text-3xl">
            From designing beautiful interfaces to making sure everything runs smoothly behind the
            scenes, I&apos;ve got you covered. Let&apos;s turn your ideas into interactive wonders
            that make waves online. With me by your side, your website will be more than just pixels
          </h4>

          <p
            className="flex-center flex-wrap font-medium h2-light-H mt-6 lg:mt-10 text-2xl md:text-3xl lg:text-4xl text-left pl-0 self-start bg-[#fc5d1e] bg-gradient-to-r from-orangeG to-pinkG bg-clip-text text-transparent"
            style={{ opacity: 1 }}
          >
            {TYPING_TEXT.split("").map((char, idx) => (
              <span
                key={idx}
                ref={el => setTypingRef(el, idx)}
                style={{ opacity: 1, transition: "opacity 0.2s" }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </p>
        </div>

        {/* Right Image */}
        <div className="relative w-full max-w-[452px] lg:mt-0 lg:h-[548px]">
          <MaskedDiv maskType="type-1" className="size-full object-contain">
            <img src="/images/me2.JPG" alt="shp1" className="size-full object-contain" />
          </MaskedDiv>

          <div
            className="flex-center absolute -right-3 top-0 md:right-0"
            style={{ opacity: 1, transform: "none" }}
          >
            <div className="flex-center animate-wiggle">
              <img
                src="/Shapes/shp02.svg"
                alt="shp2"
                className="h-auto w-3/4 drop-shadow-badge md:w-full"
              />
              <h2 className="absolute font-peste text-7xl text-white" style={{
                fontFamily: "Peste",
              }}>M</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
