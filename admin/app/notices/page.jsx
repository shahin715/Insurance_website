"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function NoticeListPage() {
  const [rows, setRows] = useState([]);
  const router = useRouter();

  // safe loader
  const fetchRows = async () => {
    const data = await api("/notices?page=1&limit=50");
    setRows(data.data || []);
  };

  // ✅ effect-safe pattern (no warning)
  useEffect(() => {
    let mounted = true;

    (async () => {
      const data = await api("/notices?page=1&limit=50");
      if (mounted) setRows(data.data || []);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const remove = async (id) => {
    if (!confirm("Delete this notice?")) return;
    await api("/notices/" + id, { method: "DELETE" });
    await fetchRows();
  };

  // always open detail page
  const openNotice = (n) => {
    router.push("/notices/view/" + n.id);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">

      {/* header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Notices</h1>

        <Link
          href="/notices/new"
          className="
            bg-gradient-to-br from-[#B34AA0] to-[#7A1E6A]
            hover:opacity-90
            text-white font-semibold
            px-5 py-2.5 rounded-xl
            shadow-sm hover:shadow
            transition
          "
        >
          + New Notice
        </Link>
      </div>

      {/* grid */}
      <div className="grid md:grid-cols-2 gap-6">

        {rows.map((n) => {
          const d = new Date(n.publish_date);

          return (
            <div
              key={n.id}
              className="
                group flex gap-5 p-6
                border border-gray-200
                rounded-xl
                bg-gray-50/70
                hover:bg-white
                hover:shadow-sm
                hover:-translate-y-0.5
                transition
              "
            >

              {/* date badge */}
              <div className="
                w-20 shrink-0
                bg-gradient-to-br from-[#B34AA0] to-[#7A1E6A]
                text-white rounded-lg
                text-center py-3
                shadow-sm
              ">
                <div className="text-xl font-bold">
                  {d.getDate()}
                </div>
                <div className="text-sm">
                  {d.toLocaleString("en", { month: "short" })}
                </div>
                <div className="text-xs opacity-90">
                  {d.getFullYear()}
                </div>
              </div>

              {/* text */}
              <div className="flex-1">
                <div className="font-semibold text-gray-900 mb-1">
                  {n.title}
                </div>

                <div className="text-sm text-gray-600 leading-relaxed">
                  {(n.summary || "").slice(0, 160)}
                </div>

                <span className={`
                  inline-block mt-3 text-xs font-semibold
                  px-2.5 py-1 rounded-md
                  ${n.status === "published"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"}
                `}>
                  {n.status}
                </span>
              </div>

              {/* hover actions */}
              <div className="
                flex flex-col gap-2
                opacity-0 translate-x-2
                group-hover:opacity-100
                group-hover:translate-x-0
                transition
              ">
                <button
                  onClick={() => openNotice(n)}
                  className="
                    bg-gradient-to-br from-[#B34AA0] to-[#7A1E6A]
                    text-white text-sm font-semibold
                    px-3.5 py-2 rounded-lg
                    shadow-sm hover:shadow
                  "
                >
                  Details →
                </button>

                <button
                  onClick={() => remove(n.id)}
                  className="
                    bg-red-100 hover:bg-red-200
                    text-red-700 text-sm font-semibold
                    px-3.5 py-2 rounded-lg
                  "
                >
                  Delete
                </button>
              </div>

            </div>
          );
        })}

        {rows.length === 0 && (
          <div className="text-gray-500">
            No notices found.
          </div>
        )}

      </div>
    </div>
  );
}







