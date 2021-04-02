// Server config
const express = require('express')
const server = express()
const routes = require('./routes')
const path = require('path')

// Template engine
server.set('view engine', 'ejs')

// Set 'views' path
server.set('views', path.join(__dirname, 'views'))

// Middleware - Allow static files
server.use( express.static('public') )

// Use req.body
server.use( express.urlencoded({ extended: true }) )

// Routes
server.use(routes)

// Server On
server.listen(3000, () => console.log('Server listening at http://localhost:3000'))