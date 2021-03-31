const express = require('express')
const routes = express.Router()

const views = __dirname + '/views/'

const Profile = {
  data: {
    name: 'Felipe',
    avatar: 'https://github.com/felipepereirapinto.png',
    'monthly-budget': 3000,
    'days-per-week': 5,
    'hours-per-day': 5,
    'vacation-per-year': 4,
    'hourly-rate': 75
  },

  controllers: {
    index(req, res) {
      return res.render(views + 'profile', { profile: Profile.data })
    },

    update(req, res) {
      // Data from req.body
      const data = req.body

      // How many weeks in a year: 52
      const weeksPerYear = 52

      // Average weeks per month minus vacation
      const weeksPerMonth = (weeksPerYear - data['vacation-per-year']) / 12

      // Working hours per week
      const weeklyTotalHours = data['hours-per-day'] * data['days-per-week']
      
      // Working hours per month
      const monthlyTotalHours = weeklyTotalHours * weeksPerMonth

      // Hourly Rate
      const hourlyRate = data['monthly-budget'] / monthlyTotalHours

      // Update
      Profile.data = {
        ...Profile.data,
        ...req.body,
        'hourly-rate': hourlyRate
      }

      return res.redirect('/profile')
    }
  }
}

const Job = {
  data: [
    {
      id: 1,
      name: 'dev.finances',
      'daily-hours': 2,
      'total-hours': 20,
      created_at: Date.now()
    },
    {
      id: 2,
      name: 'JobsCalc',
      'daily-hours': 3,
      'total-hours': 60,
      created_at: Date.now()
    },
  ],

  controllers: {
    index(req, res) {
      const updatedJobs = Job.data.map( job => {

        const remaining = Job.services.remainingDays(job)
        const status = remaining <= 0 ? 'done' : 'progress'
    
        return {
          ...job,
          remaining,
          status,
          budget: Job.services.calculateBudget(job, Profile.data['hourly-rate'])
        }
      })
    
      return res.render(views + 'index', { jobs: updatedJobs })
    },

    create(req, res) {
      return res.render(views + 'job')
    },

    save(req, res) {
      const lastId = Job.data[Job.data.length - 1]?.id || 0
      
      Job.data.push({
        id: lastId + 1,
        name: req.body.name,
        'daily-hours': req.body["daily-hours"],
        'total-hours': req.body["total-hours"],
        created_at: Date.now()
      })
    
      return res.redirect('/')
    },

    show(req, res) {
      const jobId = req.params.id

      const job = Job.data.find( job => Number(job.id) === Number(jobId) )

      if(!job) {
        return res.send('Job not found')
      }

      job.budget = Job.services.calculateBudget(job, Profile.data['hourly-rate'])

      return res.render(views + 'job-edit', { job })
    },

    update(req, res) {
      const jobId = req.params.id

      const job = Job.data.find( job => Number(job.id) === Number(jobId) )

      if(!job) {
        return res.send('Job not found')
      }

      const updatedJob = {
        ...job,
        name: req.body.name,
        'daily-hours': req.body['daily-hours'],
        'total-hours': req.body['total-hours']
      }

      Job.data = Job.data.map(job => {
        if( Number(job.id) === Number(jobId) ) {
          job = updatedJob
        }

        return job
      })

      res.redirect('/job/' + jobId)
    },

    delete(req, res) {
      const jobId = req.params.id

      // Filter all but the target
      Job.data = Job.data.filter( job => Number(job.id) !== Number(jobId) )

      res.redirect('/')
    },
  },


  services: {
    remainingDays(job) {
      // Remaining time in days
      
      const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed()
    
      const createdDate = new Date(job.created_at)
      const dueDate = createdDate.getDate() + Number(remainingDays)
      const dueDateInMs = createdDate.setDate(dueDate)
    
      const timeDiffInMs = dueDateInMs - Date.now()
    
      const dayInMs = 1000 * 60 * 60 * 24
      const dayDiff = Math.floor(timeDiffInMs / dayInMs)
    
      return dayDiff
    },

    calculateBudget: (job, hourlyRate) => hourlyRate * job['total-hours']
  }
}


routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)

routes.get('/job/:id', Job.controllers.show)
routes.post('/job/:id', Job.controllers.update)

routes.post('/job/delete/:id', Job.controllers.delete)

routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)

// CommonJS
module.exports = routes