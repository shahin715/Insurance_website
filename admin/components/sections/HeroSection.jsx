"use client";

import Link from "next/link";

export default function HeroSection({ data }) {
  if (!data) return null;

  const d = typeof data === "string" ? JSON.parse(data) : data;

  return (
    <section className="relative w-full h-140 overflow-hidden">

      {/* Background Image */}
      {d.imageUrl && (
        <img
          src={`http://127.0.0.1:5000${d.imageUrl}`}
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Gradient Overlay */}
     <div className="absolute inset-0 bg-linear-to-r from-white/90 via-white/50 to-transparent" />

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
         <div className="max-w-xl px-6 md:px-12 text-[#7A1E6A]">

          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
            {d.title}
          </h1>

          <p className="text-lg md:text-xl text-black opacity-95 mb-8">
            {d.subtitle}
          </p>

          <div className="flex gap-4 flex-wrap">

            {d.primaryBtnLink && (
              <a
                href={d.primaryBtnLink}
                 className="bg-linear-to-br from-[#B34AA0] to-[#7A1E6A] text-white px-6 py-3 rounded-md font-medium text-center"
              >
                {d.primaryBtnText}
              </a>
            )}

            {d.secondaryBtnLink && (
              <a
                href={d.secondaryBtnLink}
className="bg-white text-[#7A1E6A] px-6 py-3 rounded-md font-medium text-center"
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

