"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function AboutSection2Editor() {
  const [mission, setMission] = useState("");
  const [vision, setVision] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  // load existing data
  useEffect(() => {
    fetch("http://localhost:5000/api/about/section2")
      .then(r => r.json())
      .then(d => {
        if (!d) return;
        setMission(d.mission_text || "");
        setVision(d.vision_text || "");
        setImage(d.image || "");
      });
  }, []);

  // upload image
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

  // save
  const save = async () => {
    const content = {
      mission_text: mission,
      vision_text: vision
    };

    await fetch(
      "http://localhost:5000/api/about/section2",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "",
          image,
          content
        })
      }
    );

    alert("Section 2 Saved");
  };

  return (
    <div className="p-8 max-w-4xl space-y-6">

      <h1 className="text-2xl font-bold">
        About — Section 2 Editor
      </h1>

      {/* Mission */}
      <div>
        <label className="font-semibold block mb-2">
          Mission Text
        </label>

        <textarea
          className="border p-3 w-full h-56"
          value={mission}
          onChange={e => setMission(e.target.value)}
        />
      </div>

  
   

      {/* Image */}
      <div>
        <label className="font-semibold block mb-2">
          Left Image
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={e => {
            const f = e.target.files?.[0];
            if (f) uploadImage(f);
          }}
        />

        {uploading && <p>Uploading...</p>}

        {image && (
          <Image
            src={"http://localhost:5000" + image}
            alt=""
            width={320}
            height={240}
            unoptimized
            className="mt-4 rounded border"
          />
        )}
      </div>

      <button
        onClick={save}
        className="bg-black text-white px-6 py-2 rounded"
      >
        Save Section 2
      </button>

    </div>
  );
}

