"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function AboutSection2() {
  const [data, setData] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/about/section2")
      .then(r => r.json())
      .then(setData);
  }, []);

  if (!data) return null;

  const mission = data.mission_text || "";

  // ✅ split paragraphs safely
  const paragraphs = mission
    .split("\n")
    .map(p => p.trim())
    .filter(Boolean);

  const firstParagraph = paragraphs[0] || "";
  const restParagraphs = paragraphs.slice(1);

  return (
    <section className="relative py-14 bg-white overflow-hidden">

      {/* watermark */}
      <div
        className="absolute right-0 bottom-0 w-[420px] h-[420px] opacity-10 bg-no-repeat bg-contain pointer-events-none"
        style={{ backgroundImage: "url('/bgdimon.png')" }}
      />

      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT IMAGE */}
        <div className="rounded-xl overflow-hidden shadow-sm">
          {data.image && (
            <Image
              src={"http://localhost:5000" + data.image}
              alt="Mission"
              width={900}
              height={650}
              unoptimized
              className="w-full h-auto object-cover"
            />
          )}
        </div>

        {/* RIGHT TEXT */}
        <div className="space-y-6">

          <div className="w-14 h-1 bg-gradient-to-br from-[#B34AA0] to-[#7A1E6A] rounded" />

          <h2 className="text-3xl font-bold bg-gradient-to-br from-[#B34AA0] to-[#7A1E6A] bg-clip-text text-transparent">
            Our Mission
          </h2>

          {/* ✅ always show first paragraph */}
          <p className="text-gray-600 leading-8">
            {firstParagraph}
          </p>

          {/* ✅ show rest only when expanded */}
          {expanded && restParagraphs.map((p, i) => (
            <p key={i} className="text-gray-600 leading-8">
              {p}
            </p>
          ))}

          {/* ✅ Read More button */}
          {restParagraphs.length > 0 && (
            <button
              onClick={() => setExpanded(v => !v)}
              className="px-5 py-2 rounded-lg text-white font-semibold shadow-sm
                         bg-gradient-to-br from-[#B34AA0] to-[#7A1E6A]
                         hover:opacity-90 transition"
            >
              {expanded ? "Read Less" : "Read More"}
            </button>
          )}

        </div>

      </div>
    </section>
  );
}


