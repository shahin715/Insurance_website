"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/lib/api";

import {
  FileText,
  Landmark,
  ShieldCheck,
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe
} from "lucide-react";

export default function AdminCompanyProfilePage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const page = await api("/pages/company-profile");

      const sections = page.sections
        .filter(s => s.type === "company_profile")
        .sort((a, b) => b.id - a.id);

      if (sections.length) {
        setData(sections[0].data);
      }
    })();
  }, []);

  if (!data) return <div className="p-20 text-center">Loading…</div>;

  const banks = (data.bankers || "")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  const bankLogos = {
    "Pubali Bank PLC": "/banks/pubali.jpg",
    "NCC Bank PLC": "/banks/ncc.png",
    "GIB Bank PLC": "/banks/gib.jpg",
    "Janata Bank PLC": "/banks/janata.jpg",
    "Agrani Bank PLC": "/banks/agrani.png"
  };

  return (
    <div className="bg-[#f6f3fb] min-h-screen pb-24">

      {/*  HEADER  */}

      <div className="bg-white border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-6 py-12 flex justify-between items-start">

          <div className="flex items-start gap-5">
            <div className="w-1 h-16 bg-gradient-to-b from-[#B34AA0] to-[#7A1E6A] rounded-full" />

            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-br from-[#B34AA0] to-[#7A1E6A] bg-clip-text text-transparent">
                Company Profile
              </h1>

              <p className="mt-2 text-lg font-medium  ">
                Corporate & Regulatory Information
              </p>
            </div>
          </div>

          {/* ADMIN EDIT BUTTON */}
          <Link
            href="/company-profile/update"
            className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-br from-[#B34AA0] to-[#7A1E6A] shadow-md hover:opacity-90 transition"
          >
            Edit Profile
          </Link>

        </div>
      </div>

      {/*  REGISTRATION PANEL  */}

      <div className="max-w-7xl mx-auto px-6 -mt-10">
        <div className="bg-white rounded-2xl shadow-xl border border-purple-100 overflow-hidden">

          <div className="px-8 py-5 bg-purple-50 border-b border-purple-100">
            <div className="text-lg font-semibold bg-gradient-to-br from-[#B34AA0] to-[#7A1E6A] bg-clip-text text-transparent">
              Registration & Capital Details
            </div>
          </div>

          <div className="grid md:grid-cols-2">
            <Row icon={FileText} label="Certificate of Incorporation No. & Date" value={data.incorporation_no} />
            <Row icon={FileText} label="Certificate for Commencement" value={data.business_start} />
            <Row icon={ShieldCheck} label="IDRA Registration No." value={data.idra_no} />
            <Row icon={Landmark} label="Authorized Capital" value={data.authorized_capital} />
            <Row icon={Landmark} label="Paid-up Capital" value={data.paidup_capital} last />
          </div>

        </div>
      </div>

      {/*  HEAD OFFICE  */}

      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-8 grid lg:grid-cols-[380px_1fr] gap-10 items-center">

          <div className="relative h-[260px] rounded-xl overflow-hidden">
            <Image src="/tropical.png" fill alt="office" className="object-cover" />
          </div>

          <div>
            <div className="inline-block px-4 py-1 rounded-full text-sm mb-4 text-white bg-gradient-to-br from-[#B34AA0] to-[#7A1E6A]">
              Head Office
            </div>

            <p className="whitespace-pre-line text-gray-800 leading-relaxed font-medium">
              {data.head_office}
            </p>

            <a
              href="https://maps.google.com"
              target="_blank"
              className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-lg text-white text-sm font-semibold bg-gradient-to-br from-[#B34AA0] to-[#7A1E6A] shadow-md hover:opacity-90"
            >
              <MapPin size={16} />
              View on Map
            </a>
          </div>

        </div>
      </div>

      {/*  PARTNERS  */}

      <div className="max-w-7xl mx-auto px-6 mt-14 grid md:grid-cols-2 gap-6 ">
        <SimpleBox title="Re-Insurer" icon={Building2}>{data.reinsurer}</SimpleBox>
        <SimpleBox title="Auditors" icon={Building2}>
          <span className="whitespace-pre-line">{data.auditors}</span>
        </SimpleBox>
        <SimpleBox title="Actuary" icon={ShieldCheck}>{data.actuary}</SimpleBox>
        <SimpleBox title="Membership" icon={ShieldCheck}>{data.membership}</SimpleBox>
      </div>

      {/*  BANKERS  */}

      <div className="max-w-7xl mx-auto px-6 mt-14">
        <div className="text-lg font-semibold mb-6 bg-gradient-to-br from-[#B34AA0] to-[#7A1E6A] bg-clip-text text-transparent">
          Bankers
        </div>

        <div className="grid md:grid-cols-5 gap-5">
          {banks.map(name => (
            <div key={name} className="bg-white  rounded-xl p-4 flex items-center gap-3 shadow-sm">
              {bankLogos[name] && (
                <Image src={bankLogos[name]} width={34} height={34} alt={name} />
              )}
              <span className="text-sm font-medium text-gray-800">{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/*  CONTACT  */}

      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="rounded-2xl bg-gradient-to-br from-white to-purple-50 border border-purple-100 shadow-sm p-8">

          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-lg text-white flex items-center justify-center bg-gradient-to-br from-[#B34AA0] to-[#7A1E6A]">
              +
            </div>

            <div className="text-lg font-semibold bg-gradient-to-br from-[#B34AA0] to-[#7A1E6A] bg-clip-text text-transparent">
              Contact Information
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <ContactRow icon={Phone} label="Telephone" value={data.telephone} />
              <ContactRow icon={Phone} label="Fax" value={data.fax} />
            </div>

            <div className="h-px bg-purple-100" />

            <div className="grid md:grid-cols-2 gap-6">
              <ContactRow icon={Mail} label="Email" value={data.email} />
              <ContactRow icon={Globe} label="Website" value={data.website} />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

/*  COMPONENTS  */

function Row({ icon: Icon, label, value, last }) {
  return (
    <div className={`flex gap-4 px-8 py-6 ${!last ? "border-b border-purple-100" : ""}`}>
      <div className="bg-purple-100 p-3 rounded-xl h-fit">
        <Icon className="text-[#7A1E6A]" size={20} />
      </div>

      <div>
        <div className="text-sm font-semibold bg-gradient-to-br from-[#B34AA0] to-[#7A1E6A] bg-clip-text text-transparent">
          {label}
        </div>
        <div className="text-gray-900 font-medium mt-1">{value}</div>
      </div>
    </div>
  );
}
function SimpleBox({ icon: Icon, title, children }) {
  return (
    <div className="
      bg-white rounded-xl p-6
      shadow-md hover:shadow-lg
      transition
      flex gap-4
    ">
      <div className="bg-purple-100 p-3 rounded-xl h-fit">
        <Icon className="text-[#7A1E6A]" size={18} />
      </div>

      <div>
        <div className="text-sm font-semibold bg-gradient-to-br from-[#B34AA0] to-[#7A1E6A] bg-clip-text text-transparent">
          {title}
        </div>

        <div className="font-medium text-gray-800 mt-1">
          {children}
        </div>
      </div>
    </div>
  );
}


function ContactRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 text-gray-800">
      <Icon className="text-[#7A1E6A]" size={18} />
      <div>
        <div className="text-sm font-semibold bg-gradient-to-br from-[#B34AA0] to-[#7A1E6A] bg-clip-text text-transparent">
          {label}
        </div>
        <div className="font-medium">{value}</div>
      </div>
    </div>
  );
}

