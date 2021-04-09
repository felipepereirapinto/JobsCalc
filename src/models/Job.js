const Database = require('../db/config')

module.exports = {
  async get() {
    const db = await Database()

    const data = await db.all(`SELECT * FROM jobs`)

    await db.close()

    return data
  },
  
  async update(updatedJob, jobId) {
    const db = await Database()

    await db.run(`UPDATE jobs SET 
      name = "${updatedJob.name}",
      dailyHours = ${updatedJob.dailyHours},
      totalHours = ${updatedJob.totalHours}
      WHERE id = ${jobId}
    `)
    
    await db.close()
  },

  async delete(id) {
    const db = await Database()

    await db.run(`DELETE FROM jobs WHERE id = ${id}`)
    
    await db.close()
  },

  async create(newJob) {
    const db = await Database()

    await db.run(`INSERT INTO jobs (
      name,
      dailyHours,
      totalHours,
      createdAt
    ) VALUES (
      "${newJob.name}",
      ${newJob.dailyHours},
      ${newJob.totalHours},
      ${newJob.createdAt}
    )`)

    await db.close()
  }
}
