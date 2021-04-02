let data = [
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
]

module.exports = {
  get() {
    return data
  },

  update(updatedJobs) {
    data = updatedJobs
  },

  delete(id) {
    data = data.filter( job => Number(job.id) !==  Number(id) )
  }
}
