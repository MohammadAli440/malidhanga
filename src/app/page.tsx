"use client";
import React, { useState } from "react";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Project from "@/components/sections/Project";
import Design from "@/components/sections/Design";
import Stack from "@/components/sections/Stack";
import Contact from "@/components/sections/Contact";
import LoadingPage from "@/components/LoadingPage";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && <LoadingPage onComplete={handleLoadingComplete} />}
      
      {/* Only show navbar and content when loading is complete */}
      {!isLoading && (
        <>
          <Hero />
          <About/>
          <Project/>
          <Design/>
          <Stack/>
          <Contact/>
        </>
      )}
    </div>
  );
}
