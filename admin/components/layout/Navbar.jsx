"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled((prev) => {
        if (!prev && y > 60) return true;
        if (prev && y < 25) return false;
        return prev;
      });
    };

    window.addEventListener("scroll", onScroll);

    fetch("http://127.0.0.1:5000/api/settings")
      .then((r) => r.json())
      .then(setSettings)
      .catch(() => setSettings(null));

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navHeight = scrolled ? "h-14" : "h-20";

  return (
    <>
      <div className="h-20" />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navHeight}`}
      >
        <div
          className={`h-full transition-all duration-300
          ${
            scrolled
              ? "bg-[#7a1e6a] shadow-lg"
              : "bg-gradient-to-r from-[#8b2f6b] via-[#a03a7a] to-[#7a1e6a]"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 h-full">
            <div className="flex items-center justify-between h-full">
              {/* Logo */}
              <div
                className={`flex items-center text-white transition-all duration-300
                ${scrolled ? "gap-2" : "gap-3"}
              `}
              >
                {settings?.logo_url && (
                  <>
                    <div
                      className={`transition-transform duration-300 ${scrolled ? "scale-90" : "scale-100"}`}
                    >
                      <Image
                        src={settings.logo_url}
                        alt="logo"
                        width={42}
                        height={42}
                        priority
                      />
                    </div>

                    <div className="leading-tight">
                      <h1
                        className={`font-bold transition-all duration-300
                        ${scrolled ? "text-lg" : "text-xl"}
                      `}
                      >
                        {settings.site_name}
                      </h1>

                      <p className="text-xs text-purple-200 leading-none">
                        {settings.tagline}
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/*  Desktop Menu  */}
              <nav
                className={`hidden md:flex items-center text-white font-medium relative
                transition-all duration-300
                ${scrolled ? "gap-6 text-xs" : "gap-8 text-sm"}
              `}
              >
                {/* Home */}
                <Link href="/home" className="hover:text-purple-200">
                  Home
                </Link>

                {/* About Dropdown */}
                <div className="relative group">
                  <span className="cursor-pointer hover:text-purple-200">
                    About
                  </span>

                  <div
                    className="absolute top-full left-0 mt-3 w-56 bg-white text-gray-800 rounded-lg shadow-xl
                                  opacity-0 invisible group-hover:opacity-100 group-hover:visible
                                  transition-all duration-200"
                  >
                    <Link
                      href="/about"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      About Us
                    </Link>

                    <Link
                      href="/ceo-message"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      CEO Message
                    </Link>

                    <Link
                      href="/company-profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Company Profile
                    </Link>

                    <Link
                      href="/public-disclosure"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Public Disclosure
                    </Link>

                    <Link
                      href="/privacy-policy"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Privacy Policy
                    </Link>
                  </div>
                </div>

                {/* Notice */}
                <Link href="/notices" className="hover:text-purple-200">
                  Notice
                </Link>

                {/* Services */}
                <Link href="/services" className="hover:text-purple-200">
                  Services
                </Link>

                {/* Product */}
                <Link href="/product" className="hover:text-purple-200">
                  Product
                </Link>

                {/* Gallery */}
                <Link href="/gallery" className="hover:text-purple-200">
                  Gallery
                </Link>

                {/* CTA */}
                {settings?.cta_link && (
                  <Link href={settings.cta_link}>
                    <button
                      className={`relative overflow-hidden border border-white rounded-full group transition-all duration-300
                      ${scrolled ? "px-5 py-1.5 text-xs" : "px-7 py-2 text-sm"}
                    `}
                    >
                      <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                      <span className="relative z-10 text-white group-hover:text-black">
                        {settings.cta_text}
                      </span>
                    </button>
                  </Link>
                )}

                {/* Admin shortcut */}
                <Link href="/hero-editor" title="Edit Hero">
                  <span className="ml-3 text-lg opacity-80 hover:opacity-100 transition">
                    ⚙️
                  </span>
                </Link>
              </nav>

              {/* Mobile toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden text-white text-3xl"
              >
                ☰
              </button>
            </div>
          </div>
        </div>

        {/*  Mobile Menu  */}
        <div
          className={`${menuOpen ? "max-h-[520px]" : "max-h-0"} md:hidden overflow-hidden transition-all duration-300`}
        >
          <div className="px-6 pb-6 pt-4 space-y-3 text-white bg-[#7a1e6a]">
            <Link href="/admin" onClick={() => setMenuOpen(false)}>
              Home
            </Link>

            <div className="pt-2 font-semibold">About</div>
            <div className="ml-4 space-y-2 text-sm opacity-90">
              <Link href="/about" onClick={() => setMenuOpen(false)}>
                About Us
              </Link>
              <Link href="/ceo-message" onClick={() => setMenuOpen(false)}>
                CEO Message
              </Link>
              <Link href="/company-profile" onClick={() => setMenuOpen(false)}>
                Company Profile
              </Link>
              <Link
                href="/public-disclosure"
                onClick={() => setMenuOpen(false)}
              >
                Public Disclosure
              </Link>
              <Link href="/privacy-policy" onClick={() => setMenuOpen(false)}>
                Privacy Policy
              </Link>
            </div>

            <Link href="/notices" onClick={() => setMenuOpen(false)}>
              Notice
            </Link>
            <Link href="/services" onClick={() => setMenuOpen(false)}>
              Services
            </Link>
            <Link href="/product" onClick={() => setMenuOpen(false)}>
              Product
            </Link>
            <Link href="/gallery" onClick={() => setMenuOpen(false)}>
              Gallery
            </Link>

            <Link href="/hero-editor" onClick={() => setMenuOpen(false)}>
              ⚙️ Hero Editor
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
