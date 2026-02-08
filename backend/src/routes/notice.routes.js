const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// ---------- slug generator ----------
function makeSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-");
}

/* ======================================================
   CREATE NOTICE
====================================================== */

router.post("/", async (req, res) => {
  try {
    const { title, summary, content, cover_file, status } = req.body;

    if (!title) {
      return res.status(400).json({ error: "title required" });
    }

    const slug = makeSlug(title);

    const result = await pool.query(
      `INSERT INTO notices
       (title, slug, summary, content, cover_file, status)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING *`,
      [title, slug, summary, content, cover_file, status || "published"]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "create failed" });
  }
});


/* ======================================================
   LIST WITH PAGINATION (ADMIN + FRONTEND)
====================================================== */

router.get("/", async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const offset = (page - 1) * limit;

    const data = await pool.query(
      `SELECT *
       FROM notices
       WHERE status='published'
       ORDER BY publish_date DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    const total = await pool.query(
      `SELECT COUNT(*) FROM notices WHERE status='published'`
    );

    res.json({
      data: data.rows,
      total: Number(total.rows[0].count),
      page,
      limit
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "list failed" });
  }
});


/* ======================================================
   GET SINGLE BY ID  ✅ (ADMIN DETAIL USES THIS)
   MUST COME BEFORE SLUG ROUTE
====================================================== */

router.get("/id/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM notices WHERE id=$1",
      [req.params.id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "not found" });
    }

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "fetch failed" });
  }
});


/* ======================================================
   GET SINGLE BY SLUG (FRONTEND PUBLIC PAGE)
====================================================== */

router.get("/:slug", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM notices WHERE slug=$1",
      [req.params.slug]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "not found" });
    }

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "fetch failed" });
  }
});


/* ======================================================
   UPDATE
====================================================== */

router.put("/:id", async (req, res) => {
  try {
    const { title, summary, content, cover_file, status } = req.body;

    if (!title) {
      return res.status(400).json({ error: "title required" });
    }

    const slug = makeSlug(title);

    const result = await pool.query(
      `UPDATE notices
       SET title=$1,
           slug=$2,
           summary=$3,
           content=$4,
           cover_file=$5,
           status=$6
       WHERE id=$7
       RETURNING *`,
      [title, slug, summary, content, cover_file, status, req.params.id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "not found" });
    }

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "update failed" });
  }
});


/* ======================================================
   DELETE
====================================================== */

router.delete("/:id", async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM notices WHERE id=$1",
      [req.params.id]
    );

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "delete failed" });
  }
});


module.exports = router;
