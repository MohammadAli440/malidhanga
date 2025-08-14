"use client";

import Link from "next/link";
import ThemeToggleButton from "../ui/theme-toggle-button";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home", showOnMobile: true },
  { href: "/project", label: "Projects", showOnMobile: true },
  { href: "/about", label: "About", showOnMobile: true },
  { href: "/design", label: "Designs", showOnMobile: true },
];

const Navbar = () => {
  const pathname = usePathname();

  // Split navLinks into left and right
  // For desktop: left = first two, right = last two
  // For mobile: only show links with showOnMobile true, so left = first, right = second
  const leftLinks = navLinks.filter((_, i) => i < 2);
  const rightLinks = navLinks.filter((_, i) => i >= 2);

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex items-center justify-center m-2 md:m-5">
      <div
        className="card rounded-full dark:bg-[#161616] border-1 border-[#E5E7EB] dark:border-[#262626] shadow-lg backdrop-blur-md dark:rounded-full flex items-center justify-center"
        style={{
          width: "425px",
          height: "50px",
          minWidth: "425px",
          minHeight: "50px",
          maxWidth: "425px",
          maxHeight: "50px",
        }}
      >
        <div className="p-bold flex items-center justify-center cursor-pointer gap-3 px-3 py-2 dark:text-white md:gap-6 md:px-4 md:py-1 w-full h-full">
          {/* Left side links */}
          <div className="flex items-center gap-3 md:gap-6 flex-1 justify-end">
            {leftLinks.map((link) => {
              // For mobile, only show links with showOnMobile true
              const showOnMobile = link.showOnMobile;
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              const baseClasses =
                "relative z-[99] text-sm md:text-base flex items-center justify-center";
              const mobileHidden = !showOnMobile
                ? "hidden md:flex md:items-center md:justify-center"
                : "";
              // Fix: Use text-black in light, text-white in dark for active
              const activeClasses = isActive
                ? "font-medium opacity-100 text-black dark:text-white"
                : "opacity-50";
              return (
                <Link
                  key={link.href}
                  className={`${baseClasses} ${mobileHidden} ${activeClasses}`}
                  href={link.href}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Theme Toggle Button in center */}
          <div className="flex items-center justify-center flex-shrink-0">
            <ThemeToggleButton />
          </div>

          {/* Right side links */}
          <div className="flex items-center gap-3 md:gap-6 flex-1 justify-start">
            {rightLinks.map((link) => {
              // For mobile, only show links with showOnMobile true
              const showOnMobile = link.showOnMobile;
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              const baseClasses =
                "relative z-[99] text-sm md:text-base flex items-center justify-center";
              const mobileHidden = !showOnMobile
                ? "hidden md:flex md:items-center md:justify-center"
                : "";
              // Fix: Use text-black in light, text-white in dark for active
              const activeClasses = isActive
                ? "font-medium opacity-100 text-black dark:text-white"
                : "opacity-50";
              return (
                <Link
                  key={link.href}
                  className={`${baseClasses} ${mobileHidden} ${activeClasses}`}
                  href={link.href}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
