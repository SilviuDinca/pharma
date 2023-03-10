const express = require('express')
const app = express()
const db = require("../db/database.js")

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})

app.get("/api/medication", (req, res, next) => {
    const sql = "select * from medication"
    const params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});