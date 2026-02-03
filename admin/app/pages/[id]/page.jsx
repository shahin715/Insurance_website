import SectionEditor from "@/components/SectionEditor"

async function getPage(id) {
  const res = await fetch(`http://127.0.0.1:5000/api/pages`, {
    cache: "no-store"
  })
  const pages = await res.json()
  return pages.find(p => p.id === Number(id))
}

async function getFullPage(slug) {
  const res = await fetch(
    `http://127.0.0.1:5000/api/pages/${slug}`,
    { cache: "no-store" }
  )
  return res.json()
}

export default async function PageEditor({ params }) {
  const { id } = await params

  const pageMeta = await getPage(id)
  if (!pageMeta) return <div>Not found</div>

  const page = await getFullPage(pageMeta.slug)

  return (
    <main className="p-10 space-y-6">
      <h1 className="text-2xl font-bold">
        Edit: {page.title}
      </h1>

      {page.sections.map(section => (
        <SectionEditor key={section.id} section={section} />
      ))}
    </main>
  )
}
