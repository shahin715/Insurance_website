"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import EditorUI from "../_EditorUI";
import { useRouter } from "next/navigation";

export default function AdminCEOUpdatePage() {

  const router = useRouter();

  const [pageId, setPageId] = useState(null);
  const [sectionId, setSectionId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    ceo_name: "",
    designation: "",
    content: "",
    image: ""
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const page = await api("/pages/ceo-message");
      setPageId(page.id);

      const main = page.sections.find(s => s.type === "main");

      if (main) {
        setSectionId(main.id);
        setForm(main.data || {});
      }

      setLoading(false);
    })();
  }, []);

  const save = async () => {
    if (!sectionId) {
      alert("No message exists — create first");
      return;
    }

    setSaving(true);

    await api("/sections/" + sectionId, {
      method: "PUT",
      body: JSON.stringify({
        page_id: pageId,
        type: "main",
        data: form,
        order_index: 1
      })
    });

    setSaving(false);
    router.push("/ceo-message");
  };

  if (loading) {
    return <div className="p-10 text-center">Loading editor...</div>;
  }

  return (
    <EditorUI
      form={form}
      setForm={setForm}
      save={save}
      saving={saving}
      onCancel={() => router.push("/ceo-message")}
    />
  );
}
