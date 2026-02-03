"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [settings, setSettings] = useState(null);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);

    fetch("http://127.0.0.1:5000/api/settings")
      .then(r => r.json())
      .then(setSettings)
      .catch(console.error);

    fetch("http://127.0.0.1:5000/api/menu")
      .then(r => r.json())
      .then(setMenu)
      .catch(console.error);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`transition-all duration-300 ease-in-out
        ${
          scrolled
            ? "bg-[#7a1e6a] shadow-lg"
            : "bg-gradient-to-r from-[#8b2f6b] via-[#a03a7a] to-[#7a1e6a]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className={`flex items-center justify-between ${scrolled ? "h-16" : "h-20"}`}>

            {/* Logo */}
            <div className="flex items-center gap-3">
              {settings && (
                <>
                  <Image
                    src={settings.logo_url}
                    alt="logo"
                    width={scrolled ? 34 : 42}
                    height={scrolled ? 34 : 42}
                    priority
                  />
                  <div className="leading-tight text-white">
                    <h1 className={`font-bold ${scrolled ? "text-lg" : "text-xl"}`}>
                      {settings.site_name}
                    </h1>
                    <p className={`${scrolled ? "text-[10px]" : "text-xs"} text-purple-200`}>
                      {settings.tagline}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-8 text-white text-sm font-medium">

              {/* ✅ MENU → OPEN PUBLIC SITE */}
              {menu.map(item => (
                <a
                  key={item.id}
                  href={`http://localhost:3000${item.href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-200 transition"
                >
                  {item.label}
                </a>
              ))}

              {settings && (
                <>
                  {/* CTA → public site */}
                  <a
                    href={`http://localhost:3000${settings.cta_link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="relative px-7 py-2.5 border border-white rounded-full group overflow-hidden">
                      <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition origin-left"></span>
                      <span className="relative z-10 group-hover:text-black">
                        {settings.cta_text}
                      </span>
                    </button>
                  </a>

                  {/* Admin quick edit icon */}
                  <Link href="/hero-editor" title="Edit Hero">
                    <span className="ml-3 text-lg opacity-80 hover:opacity-100">
                      ⚙️
                    </span>
                  </Link>
                </>
              )}

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

        {/* Mobile Menu */}
        <div className={`${menuOpen ? "max-h-96" : "max-h-0"} md:hidden overflow-hidden transition-all`}>
          <div className="px-6 pb-6 pt-4 space-y-4 text-white">

            {/* ✅ MENU → PUBLIC SITE */}
            {menu.map(item => (
              <a
                key={item.id}
                href={`http://localhost:3000${item.href}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="block"
              >
                {item.label}
              </a>
            ))}

            {settings && (
              <>
                <a
                  href={`http://localhost:3000${settings.cta_link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                >
                  <button className="w-full border border-white rounded-full py-3">
                    {settings.cta_text}
                  </button>
                </a>

                <Link
                  href="/hero-editor"
                  onClick={() => setMenuOpen(false)}
                  className="block"
                >
                  ⚙️ Edit Hero
                </Link>
              </>
            )}

          </div>
        </div>

      </div>
    </header>
  );
}
