import Image from "next/image";

async function getPage() {
  const res = await fetch(
    "http://127.0.0.1:5000/api/pages/ceo-message",
    {
      cache: "no-store"
    }
  );

  if (!res.ok) return null;
  return res.json();
}

export default async function CEOMessagePage() {
  const page = await getPage();

  if (!page) {
    return (
      <div className="p-16 text-center text-xl">
        CEO Message page not found
      </div>
    );
  }

  const main = page.sections?.find(s => s.type === "main");

  if (!main) {
    return (
      <div className="p-16 text-center text-xl">
        No CEO message added yet
      </div>
    );
  }

  const data = main.data || {};

  const paragraphs = (data.content || "")
    .split("\n\n")
    .filter(Boolean);

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-6 py-12">

      {/* Title */}
      <h1 className="
        text-center text-3xl md:text-4xl font-bold mb-12
        bg-gradient-to-br from-[#B34AA0] to-[#7A1E6A]
        bg-clip-text text-transparent
      ">
        CEO Message
      </h1>

      {/* Layout */}
      <div className="
        grid grid-cols-1
        lg:grid-cols-[1.45fr_0.75fr]
        gap-10 items-start
      ">

        {/* TEXT */}
        <div>

          {paragraphs[0] && (
            <p className="
              text-[17px] font-medium mb-6
              leading-8 text-gray-900
            ">
              {paragraphs[0]}
            </p>
          )}

          <div className="
            space-y-5 text-gray-700
            leading-8 text-[16px]
            border-l-4 border-purple-200
            pl-6
          ">
            {paragraphs.slice(1).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Signature */}
          <div className="mt-10 pt-6 border-t">
            <div className="
              text-lg font-semibold
              bg-gradient-to-br from-[#B34AA0] to-[#7A1E6A]
              bg-clip-text text-transparent
            ">
              {data.ceo_name}
            </div>

            <div className="text-gray-500 font-medium">
              {data.designation}
            </div>
          </div>

        </div>

        {/* IMAGE */}
        {data.image && (
          <div className="flex justify-center">
            <div className="
              w-full max-w-[360px]
              bg-gray-50 p-3
              rounded-xl shadow-sm
            ">
              <Image
                src={`http://127.0.0.1:5000${data.image}`}
                alt="CEO"
                width={360}
                height={460}
                unoptimized
                className="rounded-lg object-cover w-full h-[420px]"
              />
            </div>
          </div>
        )}

      </div>

    </main>
  );
}
