"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection({ data }) {
  if (!data) return null;

  const imageSrc = data.imageUrl
    ? `http://localhost:5000${data.imageUrl}`
    : null;

  return (
    <section className="relative w-full h-105 md:h-130 overflow-hidden">
      {/* Background Image */}
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={data.title || "Hero"}
          fill
          priority
          unoptimized
          className="object-cover"
        />
      )}

      {/* Overlay */}
   <div className="absolute inset-0 bg-linear-to-r from-white/10 via-white/20 to-transparent" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 flex items-center"
      >
        <div className="max-w-xl px-6 md:px-12 text-[#7A1E6A]">
          {/* Title */}
          {data.title && (
            <h1 className="text-2xl md:text-4xl font-bold mb-4">
              {data.title}
            </h1>
          )}

          {/* Subtitle */}
          {data.subtitle && (
            <p className="text-sm md:text-base text-black mb-6">
              {data.subtitle}
            </p>
          )}

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4">
            {data.primaryBtnText && (
              <motion.a
                href={data.primaryBtnLink || "#"}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-linear-to-br from-[#B34AA0] to-[#7A1E6A] text-white px-6 py-3 rounded-md font-medium text-center"
              >
                {data.primaryBtnText}
              </motion.a>
            )}

            {data.secondaryBtnText && (
              <motion.a
                href={data.secondaryBtnLink || "#"}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#7A1E6A] px-6 py-3 rounded-md font-medium text-center"
              >
                {data.secondaryBtnText}
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}