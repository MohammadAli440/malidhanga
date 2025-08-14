'use client'
// loading.tsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Loading: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const hellos = [
    "Hola", "Bonjour", "Hallo", "Ciao", "Olá", "Привет",
    "こんにちは", "你好", "नमस्ते", "مرحبا", "Hej"
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Slide up animation to hero
        gsap.to(loaderRef.current, {
          y: "-100%",
          duration: 1,
          ease: "power3.inOut",
          onComplete
        });
      }
    });

    hellos.forEach((word, idx) => {
      tl.call(() => {
        if (textRef.current) textRef.current.innerText = word;
      });
      tl.to({}, { duration: 0.1 }); // Show each word for 0.5s (no opacity change)
    });

  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed top-0 left-0 w-screen h-screen bg-white dark:bg-black z-[999] flex items-center justify-center overflow-hidden"
    >
      {/* Background large text */}
      <div className="absolute text-[#000] dark:text-[#fff] opacity-5 text-[30vw] font-bold select-none"
        style={{ fontFamily: "PesteTRIAL" }}
      >
        MD
      </div>

      {/* Changing Hello text */}
      <div
        ref={textRef}
        className="relative text-3xl md:text-6xl lg:text-7xl font-medium font-sans text-[#7b7b7b] dark:text-[#b3b3b3] pointer-events-none select-none"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        Hello
      </div>
    </div>
  );
};

export default Loading;
