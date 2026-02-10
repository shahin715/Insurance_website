"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AboutSection3({ showEditIcon = false }) {
  const [data, setData] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/about/section3")
      .then(r => r.json())
      .then(setData);
  }, []);

  if (!data) return null;

  const paragraphs = data.content?.split("\n") || [];
  const visible = expanded ? paragraphs : paragraphs.slice(0, 2);

  return (
    <section className="relative py-14 bg-white overflow-hidden">

      {/* Admin Edit Shortcut */}
      {showEditIcon && (
        <Link
          href="/about/section3"
          className="absolute top-4 right-4 z-20 bg-white border shadow rounded-full p-2 hover:scale-110 transition"
        >
          ⚙️
        </Link>
      )}

      {/* Diamond watermark */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-6 left-6 w-[420px] h-[420px] opacity-10 bg-no-repeat bg-contain"
          style={{ backgroundImage: "url('/bgdimon.png')" }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT TEXT */}
          <div className="space-y-6">

            <div className="w-14 h-1 rounded bg-gradient-to-br from-[#B34AA0] to-[#7A1E6A]" />

            <h2 className="text-3xl font-bold bg-gradient-to-br from-[#B34AA0] to-[#7A1E6A] bg-clip-text text-transparent">
              {data.title}
            </h2>

            <div className="space-y-4 text-gray-600 leading-7 text-base max-w-lg">
              {visible.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {paragraphs.length > 2 && (
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

          {/* RIGHT IMAGE */}
          <div className="rounded-xl overflow-hidden shadow-sm">
            {data.image && (
              <Image
                src={"http://localhost:5000" + data.image}
                alt="About section image"
                width={900}
                height={650}
                unoptimized
                className="w-full h-auto object-cover"
              />
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
