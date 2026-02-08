require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

// middleware
app.use(cors())
app.use(express.json())

// routes
app.use('/api/test', require('./src/routes/test.routes'))
app.use('/api/pages', require('./src/routes/page.routes'))
app.use('/api/sections', require('./src/routes/section.routes'))
app.use('/api/settings', require('./src/routes/settings.routes'))
app.use('/api/menu', require('./src/routes/menu.routes'))
app.use('/api/footer', require('./src/routes/footer.routes'))
app.use("/api/notices", require("./src/routes/notice.routes"));


// ✅ reusable upload
app.use("/api/upload", require("./src/routes/upload.routes"))

// ✅ about cms data
app.use("/api/about", require("./src/routes/about.routes"))

// ✅ static uploads serve (only once)
app.use("/uploads", express.static("uploads"))

// health
app.get('/', (req, res) => {
  res.json({ status: 'API running' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


