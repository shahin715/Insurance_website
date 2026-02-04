"use client";

import { useEffect, useState } from "react";
import SectionRenderer from "@/components/sections/SectionRenderer";

export default function PageRenderer({ slug }) {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/pages/${slug}`)
      .then(r => r.json())
      .then(page => setSections(page.sections || []))
      .catch(console.error);
  }, [slug]);

  return (
    <>
      {sections.map(sec => (
        <SectionRenderer key={sec.id} section={sec} />
      ))}
    </>
  );
}



