"use client"

import { useState } from "react"

export default function SectionEditor({ section }) {
  const [data, setData] = useState(section.data)
  const [saving, setSaving] = useState(false)

  function updateField(key, value) {
    setData({ ...data, [key]: value })
  }

  async function save() {
    setSaving(true)

    await fetch(
      `http://127.0.0.1:5000/api/sections/${section.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data,
          order_index: section.order_index
        })
      }
    )

    setSaving(false)
    alert("Saved")
  }

  return (
    <div className="border p-4 rounded space-y-3">
      <div className="font-semibold">
        Section: {section.type}
      </div>

      {Object.entries(data).map(([k, v]) => (
        <input
          key={k}
          value={v}
          onChange={e => updateField(k, e.target.value)}
          className="border p-2 w-full"
        />
      ))}

      <button
        onClick={save}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  )
}
