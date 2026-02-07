import Image from "next/image";

export default function AboutSection1Preview({ title, content, image }) {
  const paragraphs = content?.split("\n") || [];

  return (
    <section className="relative py-10 bg-white overflow-hidden border rounded-xl mt-10">

      <div className="max-w-5xl mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-8 items-center">

          <div className="space-y-5">

            <div className="w-12 h-1 rounded bg-gradient-to-br from-[#B34AA0] to-[#7A1E6A]" />

            <h2 className="text-2xl font-bold bg-gradient-to-br from-[#B34AA0] to-[#7A1E6A] bg-clip-text text-transparent">
              {title}
            </h2>

            <div className="space-y-3 text-gray-600 text-sm leading-6">
              {paragraphs.slice(0, 2).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

          </div>

          <div className="rounded-lg overflow-hidden shadow-sm bg-gray-50">
            {image && (
              <Image
                src={"http://localhost:5000" + image}
                alt=""
                width={600}
                height={400}
                unoptimized
                className="w-full h-auto object-cover"
              />
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
