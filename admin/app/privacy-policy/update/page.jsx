"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function PrivacyPolicyEditor() {

  const router = useRouter();

  const [sectionId, setSectionId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    hero_title: "",
    hero_text: "",
    intro_title: "",
    intro_text: ""
  });

  useEffect(() => {
    (async () => {
      const page = await api("/pages/privacy-policy");

      const sec = page.sections
        .filter(s => s.type === "privacy_policy")
        .sort((a,b)=>b.id-a.id)[0];

      if (sec) {
        setSectionId(sec.id);
        setForm(sec.data || {});
      }

      setLoading(false);
    })();
  }, []);

  const save = async () => {
    if (!sectionId) return alert("section not found");

    setSaving(true);

    await api("/sections/" + sectionId, {
      method: "PUT",
      body: JSON.stringify({ data: form })
    });

    setSaving(false);
    alert("Saved ✅");
  };

  if (loading) {
    return <div className="p-12">Loading editor…</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-10 space-y-6">

      <h1 className="text-2xl font-bold">
        Privacy Policy Editor
      </h1>

      <Field
        label="Hero Title"
        value={form.hero_title}
        onChange={v => setForm(f => ({ ...f, hero_title: v }))}
      />

      <Textarea
        label="Hero Text"
        value={form.hero_text}
        onChange={v => setForm(f => ({ ...f, hero_text: v }))}
      />

      <Field
        label="Intro Title"
        value={form.intro_title}
        onChange={v => setForm(f => ({ ...f, intro_title: v }))}
      />

      <Textarea
        label="Intro Text"
        value={form.intro_text}
        onChange={v => setForm(f => ({ ...f, intro_text: v }))}
      />

      <div className="flex gap-4">
        <button
          onClick={save}
          disabled={saving}
          className="px-6 py-2 bg-purple-600 text-white rounded"
        >
          {saving ? "Saving..." : "Save"}
        </button>

        <button
          onClick={()=>router.back()}
          className="px-6 py-2 border rounded"
        >
          Cancel
        </button>
      </div>

    </div>
  );
}

/* ---------- small inputs ---------- */

function Field({ label, value, onChange }) {
  return (
    <div>
      <div className="text-sm font-semibold mb-1">
        {label}
      </div>
      <input
        className="w-full border rounded px-3 py-2"
        value={value || ""}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}

function Textarea({ label, value, onChange }) {
  return (
    <div>
      <div className="text-sm font-semibold mb-1">
        {label}
      </div>
      <textarea
        rows={5}
        className="w-full border rounded px-3 py-2"
        value={value || ""}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}
