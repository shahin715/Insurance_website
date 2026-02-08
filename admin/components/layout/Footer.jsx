"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Footer() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/footer")
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return null;

  return (
    <footer className="bg-gradient-to-r from-[#6A1B5D] via-[#7A1E6A] to-[#4A0E3E] text-white">

      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/dimond_logo.png"
              alt="Diamond Life"
              width={40}
              height={40}
            />
            <div>
              <h3 className="font-bold text-lg">
                Diamond Life
              </h3>
              <p className="text-sm text-purple-200">
                Insurance Company Limited
              </p>
            </div>
          </div>

          <p className="text-sm font-semibold text-purple-100 leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Products */}
        <div>
          <h4 className="font-semibold mb-4">Products</h4>
          <ul className="space-y-2 text-sm text-purple-100">
            <li>Protection</li>
            <li>Retirement</li>
            <li>Investment</li>
            <li>Health</li>
            <li>Group Life</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-purple-100">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>

          <div className="text-sm text-purple-100 space-y-2">

            {/* Clickable Map */}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-white transition"
            >
              📍 {data.address}
            </a>

            <a href={`tel:${data.phone}`} className="block hover:text-white">
              ☎ {data.phone}
            </a>

            <a href={`tel:${data.mobile1}`} className="block hover:text-white">
              📱 {data.mobile1}
            </a>

            <a href={`tel:${data.mobile2}`} className="block hover:text-white">
              📱 {data.mobile2}
            </a>

            <a href={`mailto:${data.email}`} className="block hover:text-white">
              ✉️ {data.email}
            </a>

          </div>
        </div>

      </div>

      {/* Bottom Bar + Admin Edit Shortcut */}
      <div className="border-t border-white/20 py-4 text-sm text-purple-200 flex items-center justify-center gap-4">

        <span>
          © {new Date().getFullYear()} {data.copyright}
        </span>

       
        <Link
          href="/footer-settings"
          className="hover:text-white "
          title="Edit Footer"
        >
           ⚙️
        </Link>

      </div>

    </footer>
  );
}
