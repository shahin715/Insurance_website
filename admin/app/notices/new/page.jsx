"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function NewNoticePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    summary: "",
    content: "",
    status: "published"
  });

  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);

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

      let cover_file = null;

      if (file) {
        const fd = new FormData();
        fd.append("file", file);

        const res = await fetch(
          "http://127.0.0.1:5000/api/upload/notices",
          { method: "POST", body: fd }
        );

        const up = await res.json();
        cover_file = up.url;
      }

      await api("/notices", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          cover_file
        })
      });

      router.push("/notices");

    } catch (err) {
      console.error(err);
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{
      maxWidth: 900,
      margin: "40px auto",
      padding: 24
    }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>
        Create Notice
      </h1>

      <div style={{
        background: "#ffffff",
        padding: 24,
        borderRadius: 12,
        boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
        display: "grid",
        gap: 18
      }}>

        {/* Title */}
        <Field label="Title">
          <input
            name="title"
            value={form.title}
            onChange={change}
            style={inputStyle}
            placeholder="Notice title"
          />
        </Field>

        {/* Summary */}
        <Field label="Summary">
          <textarea
            name="summary"
            rows={3}
            value={form.summary}
            onChange={change}
            style={inputStyle}
            placeholder="Short summary (shown in list)"
          />
        </Field>

        {/* Content */}
        <Field label="Full Content">
          <textarea
            name="content"
            rows={8}
            value={form.content}
            onChange={change}
            style={inputStyle}
            placeholder="Full notice details"
          />
        </Field>

        {/* Status + File row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

          <Field label="Status">
            <select
              name="status"
              value={form.status}
              onChange={change}
              style={inputStyle}
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </Field>

          <Field label="Attachment (Image / PDF)">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ ...inputStyle, padding: 10 }}
            />
          </Field>

        </div>

        {/* Actions */}
        <div style={{
          display: "flex",
          gap: 12,
          justifyContent: "flex-end",
          marginTop: 10
        }}>
          <button
            onClick={() => router.push("/notices")}
            style={btnGhost}
          >
            Cancel
          </button>

          <button
            onClick={save}
            disabled={saving}
            style={btnPrimary}
          >
            {saving ? "Saving..." : "Save Notice"}
          </button>
        </div>

      </div>
    </div>
  );
}

/* ---------- Small UI Helpers ---------- */

function Field({ label, children }) {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <label style={{
        fontSize: 14,
        fontWeight: 600,
        color: "#374151"
      }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 8,
  border: "1px solid #d1d5db",
  fontSize: 14,
  outline: "none"
};

const btnPrimary = {
  background: "#7c3aed",
  color: "#fff",
  border: "none",
  padding: "12px 18px",
  borderRadius: 8,
  fontWeight: 600,
  cursor: "pointer"
};

const btnGhost = {
  background: "#f3f4f6",
  border: "1px solid #e5e7eb",
  padding: "12px 18px",
  borderRadius: 8,
  cursor: "pointer"
};

