"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AboutSection2({ showEditIcon = false }) {
  const [data, setData] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/about/section2")
      .then(r => r.json())
      .then(setData);
  }, []);

  if (!data) return null;

  const mission = data.mission_text || "";
  const vision = data.vision_text || "";

  const shortMission =
    mission.length > 450 ? mission.slice(0, 450) : mission;

  const showReadMore = mission.length > 450;

  return (
    <section className="relative py-14 bg-white overflow-hidden">

      {/*  Admin Edit Shortcut */}
      {showEditIcon && (
        <Link
          href="/about/section2"
          className="absolute top-4 right-4 z-20 bg-white border shadow rounded-full p-2 hover:scale-110 transition"
        >
          ⚙️
        </Link>
      )}

      {/* watermark */}
      <div
        className="absolute right-0 bottom-0 w-[420px] h-[420px] opacity-10 bg-no-repeat bg-contain pointer-events-none"
        style={{ backgroundImage: "url('/bgdimon.png')" }}
      />

      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT IMAGE — from DB */}
        <div>
          {data.image && (
            <Image
              src={"http://localhost:5000" + data.image}
              alt="Mission & Vision"
              width={700}
              height={700}
              unoptimized
              className="rounded-2xl shadow-lg w-full h-auto"
            />
          )}
        </div>

        {/* RIGHT TEXT */}
        <div className="space-y-6">

          <div className="w-14 h-1 bg-gradient-to-br from-[#B34AA0] to-[#7A1E6A] rounded" />

          <h2 className="text-3xl font-bold bg-gradient-to-br from-[#B34AA0] to-[#7A1E6A] bg-clip-text text-transparent">
            Our Mission
          </h2>

          <p className="text-gray-600 leading-8 whitespace-pre-line">
            {expanded ? mission : shortMission}
            {!expanded && showReadMore && "..."}
          </p>

          {/* Read More */}
          {showReadMore && (
            <button
              onClick={() => setExpanded(v => !v)}
              className="px-5 py-2 rounded-lg text-white font-semibold shadow-sm
                         bg-gradient-to-br from-[#B34AA0] to-[#7A1E6A]
                         hover:opacity-90 transition"
            >
              {expanded ? "Read Less" : "Read More"}
            </button>
          )}

          {/* Vision */}
          {vision && (
            <>
              <h3 className="text-xl font-semibold text-purple-700 pt-4">
                Our Vision
              </h3>

              <p className="text-gray-600 leading-8 whitespace-pre-line">
                {vision}
              </p>
            </>
          )}

        </div>

      </div>
    </section>
  );
}
