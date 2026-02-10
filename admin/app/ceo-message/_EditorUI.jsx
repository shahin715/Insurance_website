"use client";

import { useState } from "react";
import Image from "next/image";

export default function EditorUI({ form, setForm, save, saving, onCancel }) {

  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file) => {
    if (!file) return;

    const fd = new FormData();
    fd.append("file", file);

    setUploading(true);

    const res = await fetch(
      "http://127.0.0.1:5000/api/upload/ceo",
      { method: "POST", body: fd }
    );

    const data = await res.json();

    setForm({ ...form, image: data.url });
    setUploading(false);
  };

  const imgSrc = form.image?.startsWith("/uploads")
    ? "http://127.0.0.1:5000" + form.image
    : form.image;

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">

      {/* HEADER BAR  */}

      <div className="
        mb-8 p-6 rounded-2xl
        bg-gradient-to-r from-[#B34AA0]/10 to-[#7A1E6A]/10
        border
      ">
        <h1 className="
          text-2xl md:text-3xl font-bold
          bg-gradient-to-br from-[#B34AA0] to-[#7A1E6A]
          bg-clip-text text-transparent
        ">
          Update CEO Message
        </h1>

        <p className="text-gray-600 text-sm mt-2">
          Manage CEO profile, message and photo
        </p>
      </div>

      {/*GRID  */}

      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8">

        {/*  LEFT  */}

        <div className="space-y-6">

          {/* card */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">

            <SectionTitle>Profile Info</SectionTitle>

            <Field label="CEO Name">
              <input
                className="input"
                value={form.ceo_name || ""}
                onChange={e =>
                  setForm({ ...form, ceo_name: e.target.value })
                }
              />
            </Field>

            <Field label="Designation / Email">
              <input
                className="input"
                value={form.designation || ""}
                onChange={e =>
                  setForm({ ...form, designation: e.target.value })
                }
              />
            </Field>

          </div>

          {/* message card */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">

            <SectionTitle>Message Content</SectionTitle>

            <textarea
              rows={16}
              className="
                w-full rounded-xl border p-4
                text-[15px] leading-7
                focus:outline-none focus:ring-2 focus:ring-purple-300
              "
              value={form.content || ""}
              onChange={e =>
                setForm({ ...form, content: e.target.value })
              }
            />

            <div className="text-xs text-gray-400 mt-2">
              Tip: Use blank line to create paragraphs
            </div>

          </div>

        </div>

        {/*  RIGHT  */}

        <div className="bg-white rounded-2xl shadow-sm border p-6 h-fit">

          <SectionTitle>CEO Photo</SectionTitle>

          <label className="
            block border-2 border-dashed rounded-xl
            p-6 text-center cursor-pointer
            hover:bg-gray-50 transition
          ">
            <div className="text-sm font-medium mb-2">
              Upload Image
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => uploadImage(e.target.files[0])}
            />
            <div className="text-xs text-gray-500">
              JPG, PNG, WEBP supported
            </div>
          </label>

          {uploading && (
            <div className="text-sm text-gray-500 mt-4">
              Uploading...
            </div>
          )}

          {imgSrc && (
            <div className="
              relative mt-6 w-full h-[360px]
              rounded-xl overflow-hidden border
            ">
              <Image
                src={imgSrc}
                alt="CEO preview"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          )}

        </div>
      </div>

      {/*  ACTION BAR  */}

      <div className="
        mt-10 flex flex-col sm:flex-row gap-4
        justify-end
      ">
        <button
          onClick={onCancel}
          className="
            px-6 py-3 rounded-xl border
            font-medium hover:bg-gray-50
          "
        >
          Cancel
        </button>

        <button
          onClick={save}
          disabled={saving}
          className="
            bg-gradient-to-br from-[#B34AA0] to-[#7A1E6A]
            text-white px-8 py-3 rounded-xl
            font-semibold shadow
            hover:opacity-90 transition
          "
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div className="font-semibold mb-5 text-gray-800">
      {children}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-semibold mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}
