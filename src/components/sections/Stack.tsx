"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { PinContainer } from "../ui/3d-pin";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

const textToType = "{ Using the Best Possible Stack }";

// Example stack data for 10 items
const stackItems = [
  {
    title: "css",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    img: "/stacked/css.svg",
    alt: "css",
  },
  {
    title: "html",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    img: "/stacked/html.svg",
    alt: "html",
  },
  {
    title: "js",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    img: "/stacked/js.svg",
    alt: "js",
  },
  {
    title: "es",
    href: "https://www.typescriptlang.org/",
    img: "/stacked/es.svg",
    alt: "es",
  },
  {
    title: "react",
    href: "https://react.dev/",
    img: "/stacked/react.svg",
    alt: "react",
  },
  {
    title: "next",
    href: "https://nextjs.org/",
    img: "/stacked/next.svg",
    alt: "next",
  },
  {
    title: "tailwind",
    href: "https://tailwindcss.com/",
    img: "/stacked/tail.svg",
    alt: "tailwind",
  },
  {
    title: "node",
    href: "https://nodejs.org/",
    img: "/stacked/node.svg",
    alt: "node",
  },
  {
    title: "mongo",
    href: "https://gsap.com/",
    img: "/stacked/mongo.svg",
    alt: "mongo",
  },
  {
    title: "ex",
    href: "https://vercel.com/",
    img: "/stacked/ex.svg",
    alt: "ex",
  },
];

const testimonials = [
  {
    image: "/stack/figma.svg",
  },
  {
    image: "/stack/github.svg",
  },
  {
    image: "/stack/notion.svg",
  },
  {
    image: "/stack/npm.svg",
  },
  {
    image: "/stack/openai.svg",
  },
  {
    image: "/stack/vercel.svg",
  },
  {
    image: "/stack/vscode.svg",
  },
  {
    image: "/stack/figma.svg",
  },
  {
    image: "/stack/github.svg",
  },
  {
    image: "/stack/notion.svg",
  },
  {
    image: "/stack/npm.svg",
  },
  {
    image: "/stack/openai.svg",
  },
  {
    image: "/stack/vercel.svg",
  },
  {
    image: "/stack/vscode.svg",
  },
];

const Stack = () => {
  const [displayed, setDisplayed] = useState("");
  const sectionRef = useRef<HTMLDivElement>(null);
  const typingRef = useRef<boolean>(false);

  useEffect(() => {
    const section = sectionRef.current;
    let observer: IntersectionObserver | null = null;
    let timeout: NodeJS.Timeout | null = null;

    const startTyping = () => {
      if (typingRef.current) return;
      typingRef.current = true;
      let i = 0;
      const type = () => {
        if (i <= textToType.length) {
          setDisplayed(textToType.slice(0, i));
          gsap.to(".stack-typing", { opacity: 1, duration: 0.1 });
          i++;
          timeout = setTimeout(type, 45);
        }
      };
      type();
    };

    if (section) {
      observer = new window.IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              startTyping();
            }
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(section);
    }

    return () => {
      if (observer && section) observer.unobserve(section);
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="hidden lg:block">
      <div
        ref={sectionRef}
        className="hidden md:flex flex-center mt-14 w-screen h-screen flex-col content-between "
      >
        <br />
        <br />
        <br />
        <p
          className="stack-typing flex-center flex-wrap font-medium text-left h2-bold z-20"
          style={{ opacity: 0, transition: "opacity 0.3s" }}
        >
          {displayed}
        </p>

        <div className="flex-center z-10 mt-10 ">
          {stackItems.map((item, idx) => (
            <PinContainer
              key={item.title + idx}
              title={item.title}
              href={item.href}
            >
              <div className="flex basis-full flex-1 p-1 sm:basis-1 w-[80px] h-[80px] items-center justify-center">
                <img
                  src={item.img}
                  alt={item.alt}
                  className=""
                  width="80px"
                  height="80px"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </PinContainer>
          ))}
        </div>
      </div>
      <div className="  relative flex  flex-col sc items-center justify-center overflow-hidden rounded-md invert dark:invert-0  ">
        <InfiniteMovingCards
          items={testimonials}
          direction="left"
          speed="slow"
        />
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />
      </div>
    </div>
  );
};

export default Stack;
