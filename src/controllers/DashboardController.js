const Profile = require("../models/Profile")
const Job = require("../models/Job")
const JobUtils = require("../utils/JobUtils")

module.exports = {
  async index(req, res) {
    const jobs = await Job.get()
    const profile = await Profile.get()

    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length
    }

    let jobTotalHours = 0

    const updatedJobs = jobs.map( job => {
      // Update status
      const remaining = JobUtils.remainingDays( job )
      const status = remaining <= 0 ? 'done' : 'progress'

      // Count done or progress using status as a key
      statusCount[status] +=1
    
      if( status == 'progress' ) {
        jobTotalHours += Number(job.dailyHours)
      }

      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile.hourlyRate)
      }
    })

    // Free hours per day
    const freeHours = profile.hoursPerDay - jobTotalHours

    return res.render('index', {
      jobs: updatedJobs,
      profile,
      statusCount,
      freeHours
    })
  },
}