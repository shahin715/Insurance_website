"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import EditorUI from "../_EditorUI";
import { useRouter } from "next/navigation";

export default function NewCompanyProfile() {

  const router = useRouter();
  const [pageId, setPageId] = useState(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({

    incorporation_no: "C-114232/14, February 20, 2014",

    business_start: "February 20, 2014",

    idra_no: "LIFE 14/2014",

    authorized_capital: "Tk. 1,000 million (One Billion)",

    paidup_capital: "Tk. 180 million (One hundred Eighty million)",

    head_office: `Tropical Molla Tower (4th Floor)
Middle Badda
15/1-15/4 Bir Uttam Rafiqul Islam Ave
Dhaka-1212
Bangladesh`,

    reinsurer: "Trust International Insurance and Reinsurance Co.",

    auditors: `G.KIBRIA & CO.
Chartered Accountants`,

    actuary: "Afsar Uddin Ahmed",

    bankers: "Pubali Bank PLC, NCC Bank PLC, GIB Bank PLC, Janata Bank PLC, Agrani Bank PLC",

    membership: "Bangladesh Insurance Association",

    telephone: "+88-02-9564957, +88-02-9565547, +88-02-9515546",

    fax: "88-02-9564975",

    email: "Info1@diamondlifebd.com",

    website: "www.diamondlifebd.com"
  });

  // get page id
  useEffect(() => {
    api("/pages/company-profile")
      .then(p => setPageId(p.id));
  }, []);

  const save = async () => {
    if (!pageId) return;

    setSaving(true);

    await api("/sections", {
      method: "POST",
      body: JSON.stringify({
        page_id: pageId,
        type: "company_profile",
        data: form,
        order_index: 1
      })
    });

    setSaving(false);
    router.push("/company-profile");
  };

  if (!pageId) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <EditorUI
      form={form}
      setForm={setForm}
      save={save}
      saving={saving}
    />
  );
}

