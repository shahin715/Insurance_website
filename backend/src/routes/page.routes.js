const router = require('express').Router()
const db = require('../config/db')

/**
 * GET all pages
 */
router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT id, title, slug, status FROM pages ORDER BY id DESC'
    )
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'server error' })
  }
})

/**
 * GET page by slug + sections
 */
router.get('/:slug', async (req, res) => {
  try {
    const page = await db.query(
      'SELECT * FROM pages WHERE slug=$1',
      [req.params.slug]
    )

    if (!page.rows.length) {
      return res.status(404).json({ error: 'Page not found' })
    }

    const sections = await db.query(
      'SELECT * FROM sections WHERE page_id=$1 ORDER BY order_index',
      [page.rows[0].id]
    )

    res.json({
      ...page.rows[0],
      sections: sections.rows
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'server error' })
  }
})

/**
 * CREATE page
 */
router.post('/', async (req, res) => {
  try {
    let { title, slug } = req.body

    if (!title || !slug) {
      return res.status(400).json({ error: 'title and slug required' })
    }

    // slug normalize
    slug = slug.toLowerCase().trim().replace(/\s+/g, '-')

    const result = await db.query(
      `INSERT INTO pages(title, slug, status)
       VALUES($1,$2,'draft')
       RETURNING *`,
      [title.trim(), slug]
    )

    res.json(result.rows[0])

  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ error: 'slug already exists' })
    }

    console.error(err)
    res.status(500).json({ error: 'server error' })
  }
})

/**
 * UPDATE page (title + SEO + status)
 */
router.put('/:id', async (req, res) => {
  try {
    const { title, seo_title, seo_description, status } = req.body

    const result = await db.query(
      `UPDATE pages
       SET title=$1,
           seo_title=$2,
           seo_description=$3,
           status=$4
       WHERE id=$5
       RETURNING *`,
      [title, seo_title, seo_description, status, req.params.id]
    )

    if (!result.rows.length) {
      return res.status(404).json({ error: 'Page not found' })
    }

    res.json(result.rows[0])

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'server error' })
  }
})

/**
 * DELETE page
 */
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM pages WHERE id=$1', [req.params.id])
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'server error' })
  }
})

module.exports = router


