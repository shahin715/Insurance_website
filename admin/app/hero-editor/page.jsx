"use client";

import { useEffect, useState } from "react";

export default function HeroEditor() {
  const [section, setSection] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/pages/home")
      .then(r => r.json())
      .then(page => {
        const hero = page.sections.find(s => s.type === "hero");
        setSection(hero);
      });
  }, []);

  function update(k, v) {
    setSection(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [k]: v
      }
    }));
  }

  async function uploadImage(file) {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);   

    setUploading(true);

    const res = await fetch(
      "http://127.0.0.1:5000/api/upload/hero",
      {
        method: "POST",
        body: formData
      }
    );

    const json = await res.json();
    
    update("imageUrl", json.url);

    setUploading(false);
  }

  async function save() {
    setSaving(true);

    await fetch(
      `http://127.0.0.1:5000/api/sections/${section.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          data: section.data
        })
      }
    );

    setSaving(false);
    alert("Hero updated successfully");
  }

  if (!section) {
    return <div className="p-10">Loading hero...</div>;
  }

  const d = section.data;

  return (
    <main className="p-10 max-w-2xl space-y-4">

      <h1 className="text-2xl font-bold">
        Hero Section Editor
      </h1>

      <input
        className="border p-2 w-full"
        value={d.title || ""}
        onChange={e => update("title", e.target.value)}
        placeholder="Hero Title"
      />

      <textarea
        className="border p-2 w-full"
        value={d.subtitle || ""}
        onChange={e => update("subtitle", e.target.value)}
        placeholder="Hero Subtitle"
      />

      <input
        className="border p-2 w-full"
        value={d.imageUrl || ""}
        onChange={e => update("imageUrl", e.target.value)}
        placeholder="Image URL"
      />

      {/* ✅ Upload */}
      <div className="space-y-2">
        <label className="font-medium">
          Upload Hero Image
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={e => uploadImage(e.target.files[0])}
        />

        {uploading && (
          <p className="text-sm text-gray-600">
            Uploading image...
          </p>
        )}
      </div>

      <button
        onClick={save}
        className="bg-purple-700 text-white px-6 py-2 rounded"
      >
        {saving ? "Saving..." : "Save Hero"}
      </button>

    </main>
  );
}
