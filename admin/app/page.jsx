import { getPages } from "@/lib/api"
import Link from "next/link"

export default async function AdminHome() {
  const pages = await getPages()

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-6">Pages</h1>

      <div className="space-y-3">
        {pages.map(p => (
          <Link
            key={p.id}
            href={`/pages/${p.id}`}
            className="block border p-4 rounded hover:bg-gray-50"
          >
            {p.title} — {p.status}
          </Link>
        ))}
      </div>
    </main>
  )
}
