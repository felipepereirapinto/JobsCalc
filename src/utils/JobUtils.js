module.exports = {
  remainingDays(job) {
    // Remaining time in days
    const remainingDays = (job.totalHours / job.dailyHours).toFixed()
  
    const createdDate = new Date(job.createdAt)
    const dueDate = createdDate.getDate() + Number(remainingDays)
    const dueDateInMs = createdDate.setDate(dueDate)
  
    const timeDiffInMs = dueDateInMs - Date.now()
  
    const dayInMs = 1000 * 60 * 60 * 24
    const dayDiff = Math.floor(timeDiffInMs / dayInMs)
  
    return dayDiff
  },

  calculateBudget: (job, hourlyRate) => hourlyRate * job.totalHours
}