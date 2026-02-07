"use client";

import AboutSection1 from "@/components/sections/AboutSection1";
import AboutSection2 from "@/components/sections/AboutSection2";
import AboutSection3 from "@/components/sections/AboutSection3";


export default function AdminAboutPage() {
  return (
    <>
      <AboutSection1 showEditIcon={true} />
      <AboutSection2 showEditIcon={true} />
      <AboutSection3 showEditIcon={true} />

    </>
  );
}