"use client";

import { useEffect, useState, useCallback } from "react";
import { api } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

export default function NoticeDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const data = await api("/notices/id/" + id);
      setNotice(data);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;
    load();
  }, [id, load]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        Loading notice...
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        Notice not found.
      </div>
    );
  }

  const d = new Date(notice.publish_date);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">

      {/* back */}
      <button
        onClick={() => router.back()}
        className="mb-6 text-sm font-semibold text-gray-600 hover:text-black"
      >
        ← Back to notices
      </button>

      {/* card */}
      <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">

        {/* header */}
        <div className="
          bg-gradient-to-br from-[#B34AA0] to-[#7A1E6A]
          text-white p-8
        ">
          <h1 className="text-2xl font-bold leading-snug">
            {notice.title}
          </h1>

          <div className="mt-3 text-sm opacity-90">
            Published: {d.toDateString()}
          </div>
        </div>

        {/* body */}
        <div className="p-8 bg-white">

          {/* summary */}
          {notice.summary && (
            <div className="mb-6 rounded-lg bg-gray-50 border border-gray-200 p-4">
              <div className="text-sm font-semibold text-gray-700 mb-1">
                Summary
              </div>
              <div className="text-gray-700">
                {notice.summary}
              </div>
            </div>
          )}

          {/* content */}
          {notice.content && (
            <div className="prose max-w-none">
              {notice.content.split("\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}

          {/* attachment */}
          {notice.cover_file && (
            <div className="mt-8">

              <div className="text-sm font-semibold text-gray-700 mb-3">
                Attachment
              </div>

              {notice.cover_file.toLowerCase().endsWith(".pdf") ? (

                <a
                  href={"http://127.0.0.1:5000" + notice.cover_file}
                  target="_blank"
                  className="
                    inline-block
                    bg-red-600 hover:bg-red-700
                    text-white font-semibold
                    px-4 py-2 rounded-lg
                  "
                >
                  Open PDF
                </a>

              ) : (

                <Image
                  src={"http://127.0.0.1:5000" + notice.cover_file}
                  alt="Notice attachment"
                  width={800}
                  height={500}
                  className="rounded-lg border border-gray-200 shadow-sm"
                />

              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

