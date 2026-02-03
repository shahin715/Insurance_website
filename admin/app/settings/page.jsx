"use client"

import { useEffect, useState } from "react"

export default function SettingsPage() {
  const [data, setData] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/settings")
      .then(r => r.json())
      .then(setData)
  }, [])

  function update(k, v) {
    setData({ ...data, [k]: v })
  }

  async function save() {
    setSaving(true)

    await fetch("http://127.0.0.1:5000/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })

    setSaving(false)
    alert("Saved")
  }

  if (!data) return <div className="p-10">Loading...</div>

  return (
    <main className="p-10 space-y-4 max-w-xl">

      <h1 className="text-2xl font-bold">
        Navbar Settings
      </h1>

      <input
        className="border p-2 w-full"
        value={data.logo_url}
        onChange={e => update("logo_url", e.target.value)}
        placeholder="Logo URL"
      />

      <input
        className="border p-2 w-full"
        value={data.site_name}
        onChange={e => update("site_name", e.target.value)}
        placeholder="Site name"
      />

      <input
        className="border p-2 w-full"
        value={data.tagline}
        onChange={e => update("tagline", e.target.value)}
        placeholder="Tagline"
      />

      <input
        className="border p-2 w-full"
        value={data.cta_text}
        onChange={e => update("cta_text", e.target.value)}
        placeholder="CTA text"
      />

      <input
        className="border p-2 w-full"
        value={data.cta_link}
        onChange={e => update("cta_link", e.target.value)}
        placeholder="CTA link"
      />

      <button
        onClick={save}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        {saving ? "Saving..." : "Save"}
      </button>

    </main>
  )
}
