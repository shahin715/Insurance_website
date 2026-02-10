"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import Image from "next/image";

export default function AdminCEOPreview() {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const page = await api("/pages/ceo-message");
      const main = page.sections.find(s => s.type === "main");
      if (main) setData(main.data);
    })();
  }, []);

  if (!data) {
    return <div className="p-6 md:p-10">No CEO message found</div>;
  }

  const paragraphs = (data.content || "")
    .split("\n\n")
    .filter(Boolean);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">

      {/* top action */}
      <div className="flex justify-end mb-4 md:mb-6">
        <Link
          href="/ceo-message/update-message"
          className="
            bg-gradient-to-br from-[#B34AA0] to-[#7A1E6A]
            text-white text-sm font-semibold
            px-4 py-2 rounded-lg shadow
            hover:opacity-90 transition
          "
        >
          Edit Message
        </Link>
      </div>

      {/* card */}
      <div className="
        bg-white rounded-xl md:rounded-2xl
        shadow-sm
        p-5 md:p-8 lg:p-10
      ">

        {/* title */}
        <h1 className="
          text-center
          text-xl sm:text-2xl md:text-3xl
          font-bold
          bg-gradient-to-br from-[#B34AA0] to-[#7A1E6A]
          bg-clip-text text-transparent
          mb-8 md:mb-12
          tracking-wide
        ">
          CEO MESSAGE
        </h1>

        {/* layout */}
        <div className="
          grid
          grid-cols-1
          md:grid-cols-1
          lg:grid-cols-[1.45fr_0.75fr]
          gap-8 md:gap-10 lg:gap-14
          items-start
        ">

          {/*IMAGE FIRST ON MOBILE  */}
          {data.image && (
            <div className="
              order-1 lg:order-2
              flex justify-center
            ">
              <div className="
                w-full max-w-[340px]
                bg-gray-50
                p-2 md:p-3
                rounded-xl
                shadow-sm
              ">
                <Image
                  src={`http://127.0.0.1:5000${data.image}`}
                  alt="CEO"
                  width={340}
                  height={440}
                  unoptimized
                  className="
                    rounded-lg
                    object-cover
                    w-full
                    h-[320px] sm:h-[380px] md:h-[420px]
                  "
                />
              </div>
            </div>
          )}

          {/*  TEXT SIDE  */}
          <div className="
            order-2 lg:order-1
            max-w-none lg:max-w-[720px]
          ">

            {/* lead paragraph */}
            {paragraphs[0] && (
              <p className="
                text-[15.5px] sm:text-[16px] md:text-[17px]
                text-gray-900
                font-medium
                mb-5 md:mb-6
                leading-7 md:leading-8
              ">
                {paragraphs[0]}
              </p>
            )}

            {/* body block */}
            <div className="
              space-y-4 md:space-y-5
              text-gray-700
              leading-7 md:leading-8
              text-[15px] md:text-[16px]
              border-l-4 border-purple-200
              pl-4 md:pl-6
            ">
              {paragraphs.slice(1).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* signature */}
            <div className="
              mt-8 md:mt-10
              pt-5 md:pt-6
              border-t
            ">
              <div className="
                text-base md:text-lg
                font-semibold
                bg-gradient-to-br from-[#B34AA0] to-[#7A1E6A]
                bg-clip-text text-transparent
              ">
                {data.ceo_name}
              </div>

              <div className="
                text-sm md:text-[15px]
                text-gray-500
                font-medium
              ">
                {data.designation}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}



