const Profile = require('../models/Profile')

module.exports =  {
  index(req, res) {
    return res.render('profile', { profile: Profile.get() })
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
    Profile.update({
      ...Profile.get(),
      ...req.body,
      'hourly-rate': hourlyRate
    })

    return res.redirect('/profile')
  }
}