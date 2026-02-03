const router = require('express').Router()
const db = require('../config/db')

router.get('/db', async (req, res) => {
  const result = await db.query('SELECT NOW()')
  res.json(result.rows[0])
})

module.exports = router
