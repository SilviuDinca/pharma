const express = require("express");
const app = express();
const db = require("../db/database.js");
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/api/medication", (req, res, next) => {
  let data = {
    name: req.body.name,
    dose: req.body.dose,
    description: req.body.description,
    expirationDate: req.body.expirationDate,
    pieces: req.body.pieces,
  };
  let sql =
    "INSERT INTO medication (name, dose, description, expirationDate, pieces) VALUES (?,?,?,?,?)";
  let params = [
    data.name,
    data.dose,
    data.description,
    data.expirationDate,
    data.pieces,
  ];
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data,
      id: this.lastID,
    });
  });
});

app.get("/api/medication", (req, res, next) => {
  const sql = "select * from medication";
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

app.put("/api/medication/:id", (req, res, next) => {
  let data = {
    name: req.body.name,
    dose: req.body.dose,
    description: req.body.description,
    expirationDate: req.body.expirationDate,
    pieces: req.body.pieces,
  };
  db.run(
    `UPDATE medication set 
         name = COALESCE(?,name), 
         dose = COALESCE(?,dose), 
         description = COALESCE(?,description),
         expirationDate = COALESCE(?,expirationDate),
         pieces = COALESCE(?,pieces)
         WHERE id = ?`,
    [
      data.name,
      data.dose,
      data.description,
      data.expirationDate,
      data.pieces,
      req.params.id,
    ],
    function (err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({
        message: "success",
        data: data,
        changes: this.changes,
      });
    }
  );
});

app.delete("/api/medication/:id", (req, res, next) => {
  db.run(
    "DELETE FROM medication WHERE id = ?",
    req.params.id,
    function (err, result) {
      if (err) {
        res.status(400).json({ error: res.message });
        return;
      }
      res.json({ message: "deleted", changes: this.changes });
    }
  );
});
