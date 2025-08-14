'use client'
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface TextScrollProps {
  text: string;
  className?: string;
  speed?: number;
}

const TextScroll: React.FC<TextScrollProps> = ({ 
  text, 
  className = "", 
  speed = 1 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const container = containerRef.current;
    const textElement = textRef.current;
    
    // Clone the text for seamless loop
    const clone = textElement.cloneNode(true) as HTMLElement;
    container.appendChild(clone);

    // Get the width of the text
    const textWidth = textElement.offsetWidth;
    
    // Set initial position
    gsap.set(textElement, { x: 0 });
    gsap.set(clone, { x: textWidth });

    // Create the scrolling animation
    const tl = gsap.timeline({ repeat: -1 });
    
    tl.to([textElement, clone], {
      x: -textWidth,
      duration: textWidth / (50 * speed), // Adjust speed based on text width
      ease: "none"
    });

    // Cleanup function
    return () => {
      tl.kill();
    };
  }, [text, speed]);

  return (
    <div 
      ref={containerRef} 
      className={`overflow-hidden whitespace-nowrap ${className}`}
      style={{ position: 'relative' }}
    >
      <div 
        ref={textRef} 
        className="inline-block"
        style={{ whiteSpace: 'nowrap' }}
      >
        {text}
      </div>
    </div>
  );
};

export default TextScroll;
