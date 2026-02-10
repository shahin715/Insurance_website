"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import EditorUI from "../_EditorUI";
import { useRouter } from "next/navigation";

export default function AdminCEONewPage() {

  const router = useRouter();

  const [pageId, setPageId] = useState(null);

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
    })();
  }, []);

  const save = async () => {
    if (!pageId) return;

    setSaving(true);

    await api("/sections", {
      method: "POST",
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

  return (
    <EditorUI
      form={form}
      setForm={setForm}
      save={save}
      saving={saving}
    />
  );
}
