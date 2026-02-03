import Link from "next/link"

export default function AdminNavbar() {
  return (
    <header className="sticky top-0 z-50 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

        <div className="font-bold">
          Insurance CMS — Admin
        </div>

        <nav className="flex gap-6 text-sm">
          <Link href="/">Dashboard</Link>
          <Link href="/pages">Pages</Link>
          <Link href="/media">Media</Link>
          <Link href="/settings">Settings</Link>
        </nav>

      </div>
    </header>
  )
}

