"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import EditorUI from "../_EditorUI";
import { useRouter } from "next/navigation";

export default function UpdateCompanyProfile() {

  const router = useRouter();

  const [sectionId, setSectionId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    incorporation_no: "",
    business_start: "",
    idra_no: "",
    authorized_capital: "",
    paidup_capital: "",
    head_office: "",
    reinsurer: "",
    auditors: "",
    actuary: "",
    bankers: "",
    membership: "",
    telephone: "",
    fax: "",
    email: "",
    website: ""
  });

  useEffect(() => {
    (async () => {

      const page = await api("/pages/company-profile");

      const section = page.sections.find(
        s => s.type === "company_profile"
      );

      if (section) {
        setSectionId(section.id);
        setForm(section.data || {});
      }

      setLoading(false);

    })();
  }, []);

  const save = async () => {

    if (!sectionId) {
      alert("No company profile found — create first");
      router.push("/company-profile/new");
      return;
    }

    setSaving(true);

    await api("/sections/" + sectionId, {
      method: "PUT",
      body: JSON.stringify({
        data: form
      })
    });

    setSaving(false);
    router.push("/company-profile");
  };

  if (loading) {
    return (
      <div className="p-12 text-center">
        Loading company profile editor...
      </div>
    );
  }

  return (
    <EditorUI
      form={form}
      setForm={setForm}
      save={save}
      saving={saving}
      onCancel={() => router.push("/company-profile")}
    />
  );
}
