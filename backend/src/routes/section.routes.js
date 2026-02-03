const router = require('express').Router()
const db = require('../config/db')

/**
 * CREATE section
 */
router.post('/', async (req, res) => {
  try {
    const { page_id, type, data, order_index } = req.body

    const result = await db.query(
      `INSERT INTO sections(page_id, type, data, order_index)
       VALUES($1,$2,$3,$4)
       RETURNING *`,
      [page_id, type, data, order_index]
    )

    res.json(result.rows[0])

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'server error' })
  }
})

/**
 * UPDATE section data
 */
router.put('/:id', async (req, res) => {
  try {
    const { data } = req.body

    const result = await db.query(
      `UPDATE sections
       SET data = $1
       WHERE id = $2
       RETURNING *`,
      [data, req.params.id]
    )

    res.json(result.rows[0])

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'server error' })
  }
})

/**
 * DELETE section
 */
router.delete('/:id', async (req, res) => {
  try {
    await db.query(
      'DELETE FROM sections WHERE id=$1',
      [req.params.id]
    )

    res.json({ success: true })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'server error' })
  }
})

module.exports = router
