"use client";

import Link from "next/link";
import ThemeToggleButton from "../ui/theme-toggle-button";

const Navbar = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex items-center justify-center m-2 md:m-5  ">
      <div
        className="card rounded-full dark:bg-[#161616] border-1 border-[#E5E7EB] dark:border-[#262626]  shadow-lg backdrop-blur-md dark:rounded-full flex items-center justify-center"
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
          {/* Home Link */}
          <Link
            className="relative z-[99] text-sm md:text-base font-medium flex items-center justify-center"
            href="/"
          >
            Home
          </Link>

          {/* Projects Link */}
          <Link
            className="relative z-[99] hidden text-sm md:flex md:items-center md:justify-center md:text-base opacity-50"
            href="/projects"
          >
            Projects
          </Link>

          <div className="flex items-center justify-center">
            <ThemeToggleButton />
          </div>

          {/* About Link */}
          <Link
            className="relative z-[99] text-sm md:text-base opacity-50 flex items-center justify-center"
            href="/about"
          >
            About
          </Link>

          {/* Designs Link */}
          <Link
            className="relative z-[99] hidden text-sm md:flex md:items-center md:justify-center md:text-base opacity-50"
            href="/design"
          >
            Designs
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
