const Profile = require('../models/Profile')
const Job = require('../models/Job')
const JobUtils = require('../utils/JobUtils')

module.exports = {
  create(req, res) {
    return res.render('job')
  },

  async save(req, res) {
    console.log('req.body')
    console.log(req.body)
    await Job.create({
      name: req.body.name,
      dailyHours: req.body.dailyHours,
      totalHours: req.body.totalHours,
      createdAt: Date.now()
    })
  
    return res.redirect('/')
  },

  async show(req, res) {
    const jobs = await Job.get()
    const profile = await Profile.get()

    const jobId = req.params.id
    const job = jobs.find( job => Number(job.id) === Number(jobId) )

    if(!job) {
      return res.send('Job not found')
    }

    job.budget = JobUtils.calculateBudget(job, profile.hourlyRate)

    return res.render('job-edit', { job })
  },

  async update(req, res) {
    const jobId = req.params.id

    const updatedJob = {
      name: req.body.name,
      dailyHours: req.body.dailyHours,
      totalHours: req.body.totalHours
    }

    await Job.update(updatedJob, jobId)

    res.redirect('/')
  },

  async delete(req, res) {
    const jobId = req.params.id

    await Job.delete(jobId)

    res.redirect('/')
  },
}