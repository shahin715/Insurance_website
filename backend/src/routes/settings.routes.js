const router = require('express').Router()
const db = require('../config/db')

// GET site settings
router.get('/', async (req, res) => {
  try {
    const r = await db.query(
      'SELECT * FROM site_settings LIMIT 1'
    )
    res.json(r.rows[0])
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'server error' })
  }
})

// UPDATE site settings
router.put('/', async (req, res) => {
  try {
    const { logo_url, site_name, tagline, cta_text, cta_link } = req.body

    const r = await db.query(
      `UPDATE site_settings
       SET logo_url=$1,
           site_name=$2,
           tagline=$3,
           cta_text=$4,
           cta_link=$5
       WHERE id=1
       RETURNING *`,
      [logo_url, site_name, tagline, cta_text, cta_link]
    )

    res.json(r.rows[0])
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'server error' })
  }
})

module.exports = router
