const express = require('express')
const routes = express.Router()

const DashboardController = require('./controllers/DashboardController')
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')

routes.get('/', DashboardController.index)

routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)

routes.get('/job', JobController.create)
routes.post('/job', JobController.save)

routes.get('/job/:id', JobController.show)
routes.post('/job/:id', JobController.update)

routes.post('/job/delete/:id', JobController.delete)

// CommonJS
module.exports = routes