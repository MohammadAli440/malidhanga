'use client'
import React, { useState } from "react";
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import FullScreenMenu from "./FullScreenMenu";

const Herobtn = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"30min"});
      cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, [])

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      {/* Floating Button One - Top Left */}
      <div className="fixed z-[99]">
        <div
          className="cursor-pointer border rounded-full px-4 py-3 backdrop-blur-md fixed 
                   flex gap-3 items-center justify-center top-8 right-12"
          onClick={handleMenuToggle}
        >
          <img
            alt="menu"
            loading="lazy"
            width={20}
            height={20}
            decoding="async"
            className="dark:invert"
            style={{ color: "transparent" }}
            src="/icon/menu.svg"
          />
          <p className="text-sm hidden md:block font-light">Go to menu</p>
        </div>
      </div>
      {/* Floating Button Two - Top Right */}
      <div className="fixed left-8 top-8 z-50">
        <button
          className="justify-center whitespace-nowrap text-sm font-medium ring-offset-white 
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 
          focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
          dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 
          text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 
          dark:hover:bg-slate-50/90 h-10 px-4 py-2 flex items-center gap-4 rounded-full 
          border-[0.3px] border-transparent shadow-none transition-all"
          data-cal-namespace="30min"
    data-cal-link="mohammadali-dhanga-neqrco/30min"
    
    data-cal-config='{"layout":"month_view","theme":"auto"}'
        >
          <img
            alt="cal"
            loading="lazy"
            width={20}
            height={20}
            decoding="async"
            className="dark:invert"
            style={{ color: "transparent" }}
            src="/icon/cal.svg"
          />
          <div className="hidden text-sm font-light md:block">
            Schedule a call
          </div>
        </button>
      </div>

      {/* Full Screen Menu */}
      <FullScreenMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />
    </div>
  );
};

export default Herobtn;
