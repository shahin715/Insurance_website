import Image from "next/image";
import Link from "next/link";

async function getNotice(slug) {
  const res = await fetch(
    "http://127.0.0.1:5000/api/notices/" + slug,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

export default async function NoticeDetailPage({ params }) {

  const { slug } = await params;

  const notice = await getNotice(slug);

  if (!notice) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-xl font-semibold">
          Notice not found
        </h1>
      </div>
    );
  }

  const pubDate = notice.publish_date
    ? new Date(notice.publish_date)
    : null;

  const fileUrl = notice.cover_file
    ? "http://127.0.0.1:5000" + notice.cover_file
    : null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      <Link
        href="/notices"
        className="text-sm font-semibold text-gray-600 hover:text-black"
      >
        ← Back to notices
      </Link>

      <div className="
        mt-6 border border-gray-200
        rounded-2xl overflow-hidden
        shadow-sm
      ">

        {/* header */}
        <div className="
          bg-gradient-to-br from-[#B34AA0] to-[#7A1E6A]
          text-white p-8
        ">
          <h1 className="text-2xl md:text-3xl font-bold">
            {notice.title}
          </h1>

          <div className="mt-3 text-sm opacity-90">
            {pubDate ? pubDate.toDateString() : ""}
          </div>
        </div>

        {/* body */}
        <div className="p-8 bg-white">

          {notice.summary && (
            <div className="
              mb-6 p-5 rounded-lg
              bg-gray-50 border
              text-gray-700
            ">
              {notice.summary}
            </div>
          )}

          {notice.content && (
            <div className="prose max-w-none prose-p:my-3">
              {notice.content.split("\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}

          {/* attachment */}
          {fileUrl && (
            <div className="mt-10">

              <div className="text-sm font-semibold mb-3">
                Attachment
              </div>

              {fileUrl.toLowerCase().endsWith(".pdf") ? (

                <a
                  href={fileUrl}
                  target="_blank"
                  className="
                    inline-block
                    bg-red-600 hover:bg-red-700
                    text-white font-semibold
                    px-5 py-2.5 rounded-lg
                  "
                >
                  Open PDF
                </a>

              ) : (

                <Image
                  src={fileUrl}
                  alt={notice.title}
                  width={1000}
                  height={650}
                  className="rounded-lg border mt-4"
                />

              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
