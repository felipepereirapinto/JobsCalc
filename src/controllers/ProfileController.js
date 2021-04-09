const Profile = require('../models/Profile')

module.exports =  {
  async index(req, res) {
    return res.render('profile', { profile: await Profile.get() })
  },

  async update(req, res) {
    // Data from req.body
    const data = req.body

    // How many weeks in a year: 52
    const weeksPerYear = 52

    // Average weeks per month minus vacation
    const weeksPerMonth = (weeksPerYear - data.vacationPerYear) / 12

    // Working hours per week
    const weeklyTotalHours = data.hoursPerDay * data.daysPerWeek
    
    // Working hours per month
    const monthlyTotalHours = weeklyTotalHours * weeksPerMonth

    // Hourly Rate
    const hourlyRate = data.monthlyBudget / monthlyTotalHours
    
    // Update
    const profile = await Profile.get()

    await Profile.update({
      ...profile,
      ...req.body,
      hourlyRate
    })

    return res.redirect('/profile')
  }
}