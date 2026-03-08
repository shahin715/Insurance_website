"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { api } from "@/lib/api";

export default function PrivacyPolicyPage() {

  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const page = await api("/pages/privacy-policy");

      const sec = page.sections
        .filter(s => s.type === "privacy_policy")
        .sort((a,b)=>b.id-a.id)[0];

      if (sec) setData(sec.data);
    })();
  }, []);

  if (!data) {
    return (
      <div className="p-20 text-center">
        Loading privacy policy…
      </div>
    );
  }

  return (
    <div className="bg-[#f6f3fb] min-h-screen pb-24">

      {/* ================= HERO ================= */}

      <div className="
        relative 
       bg-white overflow-hidden
      ">

        <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT TEXT */}
          <div className="text-[#7A1E6A]">

            <h1 className="text-4xl md:text-4xl font-bold mb-6">
              {data.hero_title}
            </h1>

            <p className="text-[#7A1E6A] leading-relaxed text-lg">
              {data.hero_text}
            </p>

          </div>

          {/* RIGHT IMAGE */}
          <div className="relative h-65 lg:h-80">

            <Image
              src="/privacy-hero.png"
              fill
              alt="privacy"
              className="object-contain"
            />

          </div>

        </div>

      </div>

      {/* ================= INTRO SECTION ================= */}

      <div className="max-w-7xl mx-auto px-6 mt-14">

        <div className="
          bg-white
          rounded-2xl
          shadow-lg
          border border-purple-100
          p-10
        ">

          <div className="flex items-start gap-4 mb-6">

            <div className="
              w-1.5 h-10 rounded-full
              bg-linear-to-b
              from-[#B34AA0]
              to-[#7A1E6A]
            " />

            <h2 className="
              text-2xl md:text-3xl font-bold
              bg-linear-to-br
              from-[#B34AA0]
              to-[#7A1E6A]
              bg-clip-text text-transparent
            ">
              {data.intro_title}
            </h2>

          </div>

          <div className="
            text-gray-700
            leading-relaxed
            space-y-4
            whitespace-pre-line
          ">
            {data.intro_text}
          </div>

        </div>

      </div>

    </div>
  );
}

