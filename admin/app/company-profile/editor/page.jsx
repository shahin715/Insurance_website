"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function CompanyProfileEditor() {

  const [pageId, setPageId] = useState(null);
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
    const run = async () => {

      const page = await api("/pages/company-profile");
      setPageId(page.id);

      const sec = page.sections.find(
        s => s.type === "company_profile"
      );

      if (sec) {
        setSectionId(sec.id);
        setForm(sec.data || {});
      }

      setLoading(false);
    };

    run();
  }, []);

  const save = async () => {

    if (!pageId) return;

    setSaving(true);

    if (sectionId) {
      await api("/sections/" + sectionId, {
        method: "PUT",
        body: JSON.stringify({ data: form })
      });
    } else {
      await api("/sections", {
        method: "POST",
        body: JSON.stringify({
          page_id: pageId,
          type: "company_profile",
          data: form,
          order_index: 1
        })
      });
    }

    setSaving(false);
    alert("Saved successfully");
  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">

      <h1 className="text-3xl font-bold text-purple-700">
        Company Profile Editor
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <Field label="Incorporation No">
          <input className="input"
            value={form.incorporation_no}
            onChange={e => setForm({...form, incorporation_no:e.target.value})}
          />
        </Field>

        <Field label="Business Start">
          <input className="input"
            value={form.business_start}
            onChange={e => setForm({...form, business_start:e.target.value})}
          />
        </Field>

        <Field label="IDRA No">
          <input className="input"
            value={form.idra_no}
            onChange={e => setForm({...form, idra_no:e.target.value})}
          />
        </Field>

        <Field label="Authorized Capital">
          <input className="input"
            value={form.authorized_capital}
            onChange={e => setForm({...form, authorized_capital:e.target.value})}
          />
        </Field>

        <Field label="Paidup Capital">
          <input className="input"
            value={form.paidup_capital}
            onChange={e => setForm({...form, paidup_capital:e.target.value})}
          />
        </Field>

      </div>

      <Field label="Head Office">
        <textarea rows={5} className="textarea"
          value={form.head_office}
          onChange={e => setForm({...form, head_office:e.target.value})}
        />
      </Field>

      <button
        onClick={save}
        disabled={saving}
        className="bg-purple-700 text-white px-8 py-3 rounded-lg"
      >
        {saving ? "Saving..." : "Save"}
      </button>

    </div>
  );
}

function Field({label, children}) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}

