'use strict'

const sqlite3 = require('sqlite3').verbose()
const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE medication (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            weight text, 
            description text, 
            expirationDate text,
            pieces num,
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                const insert = 'INSERT INTO medication (name, weight, description, expirationDate, pieces) VALUES (?,?,?,?,?)'
                db.run(insert, ["Aspirina","20g", 'pastila', '12/02/2020', 5])
                db.run(insert, ["Nurofen","20g", 'pastila', '12/12/2025', 15])
                db.run(insert, ["Amoxicilina","20g", 'pastila', '12/12/2025', 35])
                db.run(insert, ["Strepsils","20g", 'pastila', '12/12/2025', 45])

            }
        });  
    }
});


module.exports = db