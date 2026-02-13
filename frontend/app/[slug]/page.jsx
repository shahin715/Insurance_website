import HeroSection from "@/components/sections/HeroSection"

async function getPage(slug) {
  const res = await fetch(
    `http://127.0.0.1:5000/api/pages/${slug}`,
    {
      cache: "no-store"
    }
  )

  if (!res.ok) return null
  return res.json()
}

export default async function Page({ params }) {
  const { slug } = await params
  const page = await getPage(slug)

  if (!page) {
    return (
      <div className="p-20 text-center text-2xl">
        Page not found
      </div>
    )
  }

  return (
    <main className="space-y-10 ">

      {page.sections?.map(section => {

        switch (section.type) {

          case "hero":
            return (
              <HeroSection
                key={section.id}
                data={section.data}
              />
            )

          default:
            return (
              <div key={section.id} className="p-10 border">
                Unknown section: {section.type}
              </div>
            )
        }

      })}

    </main>
  )
}
