"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const FullScreenMenu: React.FC<FullScreenMenuProps> = ({ isOpen, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const stairsRef = useRef<HTMLDivElement>(null);
  const socialIconsRef = useRef<HTMLUListElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Remove isActive from menuItems
  const menuItems = [
    { name: "DESIGNS IN 3D SPACE", href: "/design" },
    { name: "WHO IS ALI ?", href: "/about" },
    { name: "SCHEDULE A CALL", href: "#contact" },
    { name: "GO TO HOME", href: "/" },
    { name: "SEE PROJECTS", href: "/projects" },
  ];

  // Memoize openMenu and closeMenu to avoid stale closures in useEffect
  const openMenu = useCallback(() => {
    setIsAnimating(true);

    // Animate the background overlay
    if (menuRef.current) {
      gsap.to(menuRef.current, {
        duration: 0.8,
        opacity: 1,
        visibility: "visible",
        ease: "power2.out",
      });
    }

    // Animate stairs effect
    const stairs = stairsRef.current?.children;
    if (stairs && stairs.length > 0) {
      // Set initial state for stairs
      gsap.set(stairs, {
        scaleY: 0,
        transformOrigin: "top center",
      });

      // Animate stairs one by one
      gsap.to(stairs, {
        duration: 0.6,
        scaleY: 1,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.2,
      });
    }

    // Animate menu items appearing in 5 columns with staggered dropdown
    const items = menuItemsRef.current?.children;
    if (items && items.length > 0) {
      gsap.set(items, { y: -50, opacity: 0 });

      gsap.to(items, {
        duration: 0.6,
        y: 0,
        opacity: 1,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.8,
      });
    }

    // Animate social icons
    const socialIcons = socialIconsRef.current?.children;
    if (socialIcons && socialIcons.length > 0) {
      gsap.set(socialIcons, { y: 30, opacity: 0, scale: 0.8 });
      gsap.to(socialIcons, {
        duration: 0.5,
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.08,
        ease: "back.out(1.7)",
        delay: 1.4,
      });
    }

    // Animate close button
    if (closeButtonRef.current) {
      gsap.fromTo(
        closeButtonRef.current,
        { scale: 0, opacity: 0 },
        {
          duration: 0.5,
          scale: 1,
          opacity: 1,
          ease: "back.out(1.7)",
          delay: 1.2,
        }
      );
    }

    setTimeout(() => setIsAnimating(false), 2000);
  }, []);

  const closeMenu = useCallback(() => {
    setIsAnimating(true);

    // Animate close button disappearing
    if (closeButtonRef.current) {
      gsap.to(closeButtonRef.current, {
        duration: 0.3,
        scale: 0,
        opacity: 0,
        ease: "power2.in",
      });
    }

    // Animate menu items disappearing in reverse order
    const items = menuItemsRef.current?.children;
    if (items && items.length > 0) {
      gsap.to(items, {
        duration: 0.4,
        y: -30,
        opacity: 0,
        stagger: 0.05,
        ease: "power2.in",
      });
    }

    // Animate social icons disappearing
    const socialIcons = socialIconsRef.current?.children;
    if (socialIcons && socialIcons.length > 0) {
      gsap.to(socialIcons, {
        duration: 0.3,
        y: 30,
        opacity: 0,
        scale: 0.8,
        stagger: 0.05,
        ease: "power2.in",
      });
    }

    // Animate stairs disappearing in reverse order
    const stairs = stairsRef.current?.children;
    if (stairs && stairs.length > 0) {
      gsap.to(stairs, {
        duration: 0.4,
        scaleY: 0,
        stagger: 0.05,
        ease: "power2.in",
        delay: 0.2,
      });
    }

    // Animate background overlay
    if (menuRef.current) {
      gsap.to(menuRef.current, {
        duration: 0.6,
        opacity: 0,
        ease: "power2.in",
        delay: 0.6,
        onComplete: () => {
          if (menuRef.current) {
            gsap.set(menuRef.current, { visibility: "hidden" });
          }
          setIsAnimating(false);
        },
      });
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      openMenu();
    } else {
      closeMenu();
    }
    // Only depend on isOpen, openMenu, closeMenu
  }, [isOpen, openMenu, closeMenu]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleClose = () => {
    if (!isAnimating) {
      onClose();
    }
  };

  return (
    <div
      ref={menuRef}
      className={`fixed inset-0 z-[999]  ${isOpen ? "visible" : "invisible"}`}
      style={{ opacity: 0, fontFamily: "ui-sans-serif, system-ui, serif" }}
    >
      {/* Stairs Animation */}
      <div
        ref={stairsRef}
        className="absolute inset-0 flex"
        style={{ zIndex: 1, fontFamily: "ui-sans-serif, system-ui, serif" }}
      >
        <div className="flex-1 bg-black" style={{ height: "100%" }}></div>
        <div className="flex-1 bg-black" style={{ height: "100%" }}></div>
        <div className="flex-1 bg-black" style={{ height: "100%" }}></div>
        <div className="flex-1 bg-black" style={{ height: "100%" }}></div>
        <div className="flex-1 bg-black" style={{ height: "100%" }}></div>
      </div>

      {/* Close Button */}
      <button
        ref={closeButtonRef}
        onClick={handleClose}
        className="absolute top-8 right-8 z-10 p-2 hover:bg-white/10 rounded-full transition-colors group"
        style={{
          opacity: 0,
          transform: "scale(0)",
          fontFamily: "ui-sans-serif, system-ui, serif",
        }}
        aria-label="Close menu"
        type="button"
      >
        <svg
          width="68"
          height="68"
          viewBox="0 0 68 68"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: "none" }}
        >
          <path
            d="M1.5 1.5L67 67"
            stroke="white"
            strokeWidth="2"
            className="group-hover:stroke-[#df0] transition-colors"
          />
          <path
            d="M66.5 1L0.999997 66.5"
            stroke="white"
            strokeWidth="2"
            className="group-hover:stroke-[#df0] transition-colors"
          />
        </svg>
      </button>
      <div className="fixed flex z-[3] h-full w-full flex-col justify-between">
        {/* Menu Items Container */}
        <div
          className="flex flex-col justify-center h-full relative font-extrabold"
          style={{
            zIndex: 2,
            fontFamily: "ui-sans-serif, system-ui, serif",
          }}
        >
          <div
            ref={menuItemsRef}
            className="flex flex-col items-center space-8 w-full max-w-full mx-auto"
          >
            {menuItems.map((item, index) => (
              <div
                key={item.name}
                className="text-center w-full font-extrabold "
                style={{
                  opacity: 0,
                  transform: "translateY(-50px)",
                  fontFamily: "ui-sans-serif, system-ui, serif",
                }}
              >
                <a
                  href={item.href}
                  className="text-white font-medium text-2xl md:text-[96px] lg:text-[96px] transition-all duration-500 block p-10 hover:bg-[#df0] hover:text-black"
                  style={{
                    textTransform: "uppercase",
                    fontSize: "5vw",
                    fontWeight: 400,
                    margin: 0,
                    textDecoration: "none",
                    borderTop: "1px solid #fff",
                    fontFamily: "ui-sans-serif, system-ui, serif",
                  }}
                  onClick={handleClose}
                >
                  {item.name}
                </a>
                {/* {index < menuItems.length - 1 && (
                <div
                  className="h-px bg-white/30"
                  style={{
                    width: "100vw",
                    marginLeft: "calc(-50vw + 50%)",
                    fontFamily: "ui-sans-serif, system-ui, serif",
                  }}
                ></div>
              )} */}
              </div>
            ))}
          </div>
        </div>
        {/* Social Icons Section */}
        <div className="mt" style={{ opacity: 1 }}>
          <ul ref={socialIconsRef} className="flex-center gap-2">
            <li className="z-[99] cursor-pointer transition-all duration-200 ease-out hover:translate-y-[-7px] hover:scale-125 hover:drop-shadow-5xl">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/gurvindersingh02/"
              >
                <img
                  alt="LinkedIn"
                  loading="lazy"
                  width={20}
                  height={20}
                  decoding="async"
                  src="/link/linkedin.svg"
                />
              </a>
            </li>
            <li className="z-[99] cursor-pointer transition-all duration-200 ease-out hover:translate-y-[-7px] hover:scale-125 hover:drop-shadow-5xl">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.behance.net/guribhullar2"
              >
                <img
                  alt="Behance"
                  loading="lazy"
                  width={20}
                  height={20}
                  decoding="async"
                  src="/link/behance.svg"
                />
              </a>
            </li>
            <li className="z-[99] cursor-pointer transition-all duration-200 ease-out hover:translate-y-[-7px] hover:scale-125 hover:drop-shadow-5xl">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/Gurvinder-Singh02"
              >
                <img
                  alt="GitHub"
                  loading="lazy"
                  width={20}
                  height={20}
                  decoding="async"
                  src="/link/github.svg"
                />
              </a>
            </li>
            <li className="z-[99] cursor-pointer transition-all duration-200 ease-out hover:translate-y-[-7px] hover:scale-125 hover:drop-shadow-5xl">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://dribbble.com/gbhullar6791"
              >
                <img
                  alt="Dribbble"
                  loading="lazy"
                  width={20}
                  height={20}
                  decoding="async"
                  src="/link/dribble.svg"
                />
              </a>
            </li>
            <li className="z-[99] cursor-pointer transition-all duration-200 ease-out hover:translate-y-[-7px] hover:scale-125 hover:drop-shadow-5xl">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/___.gxuri/"
              >
                <img
                  alt="Instagram"
                  loading="lazy"
                  width={20}
                  height={20}
                  decoding="async"
                  src="/link/instagram.svg"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FullScreenMenu;