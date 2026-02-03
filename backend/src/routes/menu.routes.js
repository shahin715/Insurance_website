const router = require('express').Router()
const db = require('../config/db')

// GET menu items
router.get('/', async (req, res) => {
  const r = await db.query(
    `SELECT * FROM nav_menu
     WHERE is_visible=true
     ORDER BY order_index`
  )
  res.json(r.rows)
})

// UPDATE one menu item
router.put('/:id', async (req, res) => {
  const { label, href, order_index, is_visible } = req.body

  const r = await db.query(
    `UPDATE nav_menu
     SET label=$1,
         href=$2,
         order_index=$3,
         is_visible=$4
     WHERE id=$5
     RETURNING *`,
    [label, href, order_index, is_visible, req.params.id]
  )

  res.json(r.rows[0])
})

module.exports = router
