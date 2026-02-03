const router = require('express').Router()
const db = require('../config/db')

router.get('/', async (req,res) => {
  const r = await db.query(
    'SELECT * FROM footer_settings LIMIT 1'
  )
  res.json(r.rows[0])
})

router.put('/', async (req,res) => {
  const {
    description,address,phone,mobile1,mobile2,email,copyright
  } = req.body

  const r = await db.query(
    `UPDATE footer_settings SET
     description=$1,address=$2,phone=$3,
     mobile1=$4,mobile2=$5,email=$6,
     copyright=$7
     WHERE id=1 RETURNING *`,
    [description,address,phone,mobile1,mobile2,email,copyright]
  )

  res.json(r.rows[0])
})

module.exports = router
