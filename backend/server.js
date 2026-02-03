require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

// ✅ middleware FIRST
app.use(cors())
app.use(express.json())

// ✅ routes
const testRoutes = require('./src/routes/test.routes')
app.use('/api/test', testRoutes)

const pageRoutes = require('./src/routes/page.routes')
app.use('/api/pages', pageRoutes)

const sectionRoutes = require('./src/routes/section.routes')
app.use('/api/sections', sectionRoutes)
const settingsRoutes = require('./src/routes/settings.routes')
app.use('/api/settings', settingsRoutes)

const menuRoutes = require('./src/routes/menu.routes')
app.use('/api/menu', menuRoutes)
const footerRoutes = require('./src/routes/footer.routes')
app.use('/api/footer', footerRoutes)

app.use("/uploads", express.static("uploads"))

const uploadRoutes = require("./src/routes/upload.routes")
app.use("/api/upload", uploadRoutes)



// ✅ health check
app.get('/', (req, res) => {
  res.json({ status: 'API running' })
})

// start
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

