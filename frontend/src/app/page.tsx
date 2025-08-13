import React from "react";

import Header from "@/components/Layout/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Project from "@/components/sections/Project";
import Design from "@/components/sections/Design";
import Stack from "@/components/sections/Stack";
import Contact from "@/components/sections/Contact";

export default function Page() {
  return (
    <div>
      <Header/>
      <Hero />
      <About/>
      <Project/>
      <Design/>
      <Stack/>
      <Contact/>
    </div>
  );
}
