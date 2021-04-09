const Database = require('./config')

const initDb = {
  async init(){         
    const db = await Database()

    await db.exec(`CREATE TABLE profile (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT, 
        avatar TEXT, 
        monthlyBudget INT, 
        daysPerWeek INT,
        hoursPerDay INT,
        vacationPerYear INT,
        hourlyRate INT
    )`)

    await db.exec(`CREATE TABLE jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT, 
        dailyHours INT,
        totalHours INT,
        createdAt DATETIME
    )`)

    await db.run(`INSERT INTO profile (
        name, 
        avatar, 
        monthlyBudget, 
        daysPerWeek, 
        hoursPerDay, 
        vacationPerYear,
        hourlyRate
    ) VALUES (
        'Felipe',
        'https://github.com/felipepereirapinto.png',
        3000,
        5,
        5,
        4,
        70
    );`)

    await db.run(`INSERT INTO jobs (
        name, 
        dailyHours,
        totalHours,
        createdAt
    ) VALUES (
        'dev.finances',
        2,
        1,
        1617514376018
    );`)

    await db.run(`INSERT INTO jobs (
        name, 
        dailyHours,
        totalHours,
        createdAt
    ) VALUES (
        'JobsCalc',
        3,
        47,
        1617941704004
    );`)

    await db.close()
    }
}

initDb.init()
