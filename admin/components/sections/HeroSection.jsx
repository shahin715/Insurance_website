"use client";

import Link from "next/link";

export default function HeroSection({ data }) {
  if (!data) return null;

  const d = typeof data === "string" ? JSON.parse(data) : data;

  return (
    <section className="relative w-full h-[560px] overflow-hidden">

      {/* Background Image */}
      {d.imageUrl && (
        <img
          src={`http://127.0.0.1:5000${d.imageUrl}`}
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 via-purple-800/60 to-purple-700/40" />

      {/* ⚙️ Settings Button — Admin only */}
      <Link
        href="/hero-editor"
        className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur transition"
        title="Edit Hero"
      >
        ⚙️
      </Link>

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center">
        <div className="max-w-2xl text-left text-white">

          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
            {d.title}
          </h1>

          <p className="text-lg md:text-xl opacity-95 mb-8">
            {d.subtitle}
          </p>

          <div className="flex gap-4 flex-wrap">

            {d.primaryBtnLink && (
              <a
                href={d.primaryBtnLink}
                className="bg-white text-purple-900 px-7 py-3 rounded-lg font-semibold hover:bg-purple-100 transition"
              >
                {d.primaryBtnText}
              </a>
            )}

            {d.secondaryBtnLink && (
              <a
                href={d.secondaryBtnLink}
                className="border border-white px-7 py-3 rounded-lg hover:bg-white hover:text-purple-900 transition"
              >
                {d.secondaryBtnText}
              </a>
            )}

          </div>

        </div>
      </div>

    </section>
  );
}

