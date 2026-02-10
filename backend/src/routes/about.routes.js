const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET section
router.get("/:key", async (req, res) => {
  try {
    const { key } = req.params;

    const r = await db.query(
      "SELECT * FROM about_sections WHERE section_key=$1",
      [key]
    );

    if (!r.rows.length) {
      return res.json(null);
    }

    const row = r.rows[0];

    let parsed = {};

    // safe JSON parse
    if (row.content) {
      try {
        parsed =
          typeof row.content === "string"
            ? JSON.parse(row.content)
            : row.content;
      } catch (e) {
        console.log("JSON parse failed → fallback raw");
        parsed = { content: row.content };
      }
    }

    res.json({
      id: row.id,
      section_key: row.section_key,
      title: row.title || "",
      image: row.image || "",
      ...parsed
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SAVE section

router.post("/:key", async (req, res) => {
  try {
    const { key } = req.params;
    const { title, content, image } = req.body;

    const contentString =
      typeof content === "string"
        ? content
        : JSON.stringify(content);

    await db.query(
      `INSERT INTO about_sections(section_key,title,content,image)
       VALUES($1,$2,$3,$4)
       ON CONFLICT(section_key)
       DO UPDATE SET
         title=$2,
         content=$3,
         image=$4`,
      [key, title || "", contentString || "{}", image || ""]
    );

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;





