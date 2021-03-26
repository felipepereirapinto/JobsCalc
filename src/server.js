// Server config
const express = require('express')
const server = express()
const port = 3000
const routes = require('./routes')

// Template engine
server.set('view engine', 'ejs')

// Middleware - Allow static files
server.use( express.static('public') )

// Routes
server.use(routes)

// Server On
server.listen(port, () => console.log(`Server listening at http://localhost:${port}`))