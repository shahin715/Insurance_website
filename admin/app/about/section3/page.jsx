"use client";
import { useEffect, useState } from "react";
import Image from "next/image";


export default function AboutSection1Editor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/about/section3")
      .then(r => r.json())
      .then(d => {
        if (!d) return;
        setTitle(d.title || "");
        setContent(d.content || "");
        setImage(d.image || "");
      });
  }, []);

  const uploadImage = async (file) => {
    setUploading(true);

    const form = new FormData();
    form.append("file", file);

    const res = await fetch(
      "http://localhost:5000/api/upload/about",
      { method: "POST", body: form }
    );

    const data = await res.json();
    setImage(data.url);
    setUploading(false);
  };

  const save = async () => {
    await fetch("http://localhost:5000/api/about/section3", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, image })
    });

    alert("Section Saved");
  };

  return (
    <div className="p-8 max-w-3xl">

      <h1 className="text-2xl font-bold mb-6">
        About — Section 1 Editor
      </h1>

      {/* TITLE */}
      <input
        className="border p-2 w-full mb-4 rounded"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      {/* CONTENT */}
      <textarea
        className="border p-2 w-full h-48 mb-4 rounded"
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      {/* IMAGE UPLOAD */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) uploadImage(f);
        }}
        className="mb-3"
      />

      {uploading && <p>Uploading...</p>}

      {image && (
        <Image
          src={"http://localhost:5000" + image}
          alt=""
          width={220}
          height={150}
          unoptimized
          className="mt-2 rounded border"
        />
      )}

      {/* SAVE */}
      <button
        onClick={save}
        className="bg-black text-white px-5 py-2 mt-5 rounded"
      >
        Save Section
      </button>

      {/* PREVIEW */}
    

    </div>
  );
}
