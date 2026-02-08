"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";

export default function EditNoticePage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await api("/notices?page=1&limit=200");
        const row = data.data.find(x => String(x.id) === String(id));
        setForm(row);
      } catch (err) {
        console.error(err);
        alert("Load failed");
      }
    })();
  }, [id]);

  const change = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const save = async () => {
    if (!form.title.trim()) {
      alert("Title required");
      return;
    }

    try {
      setSaving(true);

      await api("/notices/" + id, {
        method: "PUT",
        body: JSON.stringify(form)
      });

      router.push("/admin/notices");

    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (!form) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 700 }}>
      <h1>Edit Notice</h1>

      <label>Title</label>
      <input name="title" value={form.title} onChange={change}/>
      <br/><br/>

      <label>Summary</label>
      <textarea name="summary" rows={3} value={form.summary || ""} onChange={change}/>
      <br/><br/>

      <label>Content</label>
      <textarea name="content" rows={8} value={form.content || ""} onChange={change}/>
      <br/><br/>

      <label>Status</label>
      <select name="status" value={form.status} onChange={change}>
        <option value="published">Published</option>
        <option value="draft">Draft</option>
      </select>

      <br/><br/>

      <button onClick={save} disabled={saving}>
        {saving ? "Updating..." : "Update Notice"}
      </button>
    </div>
  );
}
