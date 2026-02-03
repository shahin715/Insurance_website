"use client";

import { useEffect, useState } from "react";

export default function FooterSettingsPage() {
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/footer")
      .then(r => r.json())
      .then(setData);
  }, []);

  function update(k, v) {
    setData({ ...data, [k]: v });
  }

  async function save() {
    setSaving(true);

    await fetch("http://127.0.0.1:5000/api/footer", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    setSaving(false);
    alert("Footer updated");
  }

  if (!data) return <div className="p-10">Loading...</div>;

  return (
    <main className="p-10 max-w-2xl space-y-4">

      <h1 className="text-2xl font-bold">
        Footer Settings
      </h1>

      <textarea
        className="border p-2 w-full h-24"
        value={data.description || ""}
        onChange={e => update("description", e.target.value)}
        placeholder="Description"
      />

      <input
        className="border p-2 w-full"
        value={data.address || ""}
        onChange={e => update("address", e.target.value)}
        placeholder="Address"
      />

      <input
        className="border p-2 w-full"
        value={data.phone || ""}
        onChange={e => update("phone", e.target.value)}
        placeholder="Phone"
      />

      <input
        className="border p-2 w-full"
        value={data.mobile1 || ""}
        onChange={e => update("mobile1", e.target.value)}
        placeholder="Mobile 1"
      />

      <input
        className="border p-2 w-full"
        value={data.mobile2 || ""}
        onChange={e => update("mobile2", e.target.value)}
        placeholder="Mobile 2"
      />

      <input
        className="border p-2 w-full"
        value={data.email || ""}
        onChange={e => update("email", e.target.value)}
        placeholder="Email"
      />

      <input
        className="border p-2 w-full"
        value={data.copyright || ""}
        onChange={e => update("copyright", e.target.value)}
        placeholder="Copyright text"
      />

      <button
        onClick={save}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        {saving ? "Saving..." : "Save Footer"}
      </button>

    </main>
  );
}
