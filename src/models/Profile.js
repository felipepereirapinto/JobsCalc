let data = {
  name: 'Felipe',
  avatar: 'https://github.com/felipepereirapinto.png',
  'monthly-budget': 3000,
  'days-per-week': 5,
  'hours-per-day': 5,
  'vacation-per-year': 4,
  'hourly-rate': 75
}

module.exports = {
  get() {
    return data
  },

  update(newData) {
    data = newData
  }
}
