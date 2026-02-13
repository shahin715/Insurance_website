import Link from "next/link";

async function getRows() {
  const res = await fetch(
    "http://127.0.0.1:5000/api/notices?page=1&limit=50",
    { cache: "no-store" }
  );
  return res.json();
}

export default async function NoticesPage() {
  const data = await getRows();
  const rows = data.data || [];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* header  */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Notices
        </h1>
      </div>

      {/* same grid as admin */}
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
              </div>

              {/* ONLY details button on hover */}
              <div className="
                opacity-0 translate-x-2
                group-hover:opacity-100
                group-hover:translate-x-0
                transition
              ">
                <Link
                  href={`/notices/${n.slug}`}
                  className="
                    bg-gradient-to-br from-[#B34AA0] to-[#7A1E6A]
                    text-white text-sm font-semibold
                    px-3.5 py-2 rounded-lg
                    shadow-sm hover:shadow
                    whitespace-nowrap
                  "
                >
                  Details →
                </Link>
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
