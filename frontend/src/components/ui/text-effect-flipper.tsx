import React from "react"
import { motion } from "framer-motion"
import type { HTMLMotionProps } from "framer-motion"

const DURATION = 0.25
const STAGGER = 0.025

type FlipLinkProps = HTMLMotionProps<'a'> & {
  children: string
  href: string
}

const FlipLink: React.FC<FlipLinkProps> = ({ children, href, className, style, ...rest }) => {
  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      className={`relative block overflow-hidden whitespace-nowrap text-4xl font-semibold uppercase dark:text-white/90 sm:text-7xl md:text-8xl ${className ?? ""}`}
      style={{
        lineHeight: 0.75,
        ...style,
      }}
      {...rest}
    >
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: "-100%",
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: {
                y: "100%",
              },
              hovered: {
                y: 0,
              },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  )
}

export default FlipLink
