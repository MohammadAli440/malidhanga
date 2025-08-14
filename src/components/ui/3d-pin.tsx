"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const PinContainer = ({
  children,
  title,
  href,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  title?: string;
  href?: string;
  className?: string;
  containerClassName?: string;
}) => {
  const [transform, setTransform] = useState(
    "translate(-50%,-50%) rotateX(0deg)"
  );

  const onMouseEnter = () => {
    setTransform("translate(-50%,-50%) rotateX(70deg) scale(0.8)");
  };
  const onMouseLeave = () => {
    setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)");
  };

  return (
    <a
      className={cn(
        "relative group/pin z-50 cursor-pointer",
        containerClassName
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      href={href || "/"}
    >
      <div
        style={{
          perspective: "1000px",
          transform: "rotateX(70deg) translateZ(0deg)",
        }}
        className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
      >
        <div
          style={{
            transform: transform,
          }}
          className={cn(
            "flex-center absolute left-1/2 top-1/2 flex border-white/[0.1]  bg-transparent transition duration-700 group-hover/pin:border-white/[0.2]"
          )}
        >
          <div className={cn("relative z-50 bottom-4", className)}>
            {children}
          </div>
        </div>
      </div>
      <PinPerspective title={title} href={href} />
    </a>
  );
};

export const PinPerspective = ({
  title,
  href,
}: {
  title?: string;
  href?: string;
}) => {
  return (
    <motion.div className="pointer-events-none  z-[60] flex size-20 items-center justify-center opacity-0 transition duration-500 group-hover/pin:opacity-100">
      <div className=" inset-0 -mt-7 size-full flex-none">
        <div className="absolute inset-x-0 top-0  flex justify-center">
          <a
            href={href}
            target={"_blank"}
            className="relative z-10 flex items-center space-x-2  px-4 py-0.5 "
          >
            <span className="card p-light relative bottom-28 z-20 inline-block p-4 py-0.5 font-spaceGrotesk text-sm dark:bg-dark-250">
              {title}
            </span>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover/btn:opacity-40"></span>
          </a>
        </div>

        <div
          style={{
            perspective: "1000px",
            transform: "rotateX(70deg) translateZ(0)",
          }}
          className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
        >
          <>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,
                z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 0,
              }}
              className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-black/10 dark:bg-white/10"
            ></motion.div>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,
                z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 2,
              }}
              className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-black/10 dark:bg-white/10"
            ></motion.div>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,
                z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 4,
              }}
              className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-black/10 dark:bg-white/10"
            ></motion.div>
          </>
        </div>

        <>
          <motion.div className="absolute bottom-15 right-1/2 h-20 w-px translate-y-[14px] bg-[#cccccc] blur-[2px] group-hover/pin:h-40" />
          <motion.div className="absolute bottom-15 right-1/2 h-20 w-px translate-y-[14px] bg-[#cccccc] group-hover/pin:h-40" />
          <motion.div className="absolute bottom-15 right-1/2 z-40 size-[4px] translate-x-[1.5px] translate-y-[14px] rounded-full bg-[#cccccc] blur-[3px]" />
          <motion.div className="absolute bottom-15 right-1/2 z-40 size-[2px] translate-x-[0.5px] translate-y-[14px] rounded-full bg-[#cccccc]" />
          </>
      </div>
    </motion.div>
  );
};
