const express = require("express");
const router = express.Router();
const config = require("config");
const mysql = require("mysql2");

const db = mysql.createPool({
  host: config.get("host"),
  user: config.get("user"),
  password: config.get("password"),
  database: config.get("database"),
});

router.get("/universities", (req, res) => {
  let sql = "SELECT * FROM University";
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(400).send(err);
    }
    res.status(200).json(data);
  });
});

router.post("/newUniversity", (req, res) => {
  const { name, location, description } = req.body;
  let sql =
    "INSERT INTO University(Name, Location, Description) VALUES (?, ?, ?)";
  db.query(sql, [name, location, description], (err, data) => {
    if (err) {
      return res.status(400).send(err);
    }
    res.status(200).json(data);
  });
});

module.exports = router;
