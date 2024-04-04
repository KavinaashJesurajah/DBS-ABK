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

router.get("/", (req, res) => {
  res.json("Rso server");
});

router.post("/join", (req, res) => {
  const { RSO_User_Id, RSO_ID } = req.body;
  let sql =
    "INSERT INTO RSO_Member (RSO_User_Id, RSO_Member_RSO) VALUES (?, ?)";
  db.query(sql, [RSO_User_Id, RSO_ID], (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }
    res.json(result);
  });
});

// Cretae RSO
router.post("/create", (req, res) => {
  const { universityID, name, adminID } = req.body;

  let sql = "INSERT INTO RSO (UniversityID, Name, AdminID) VALUES (?, ?, ?)";
  db.query(sql, [universityID, name, adminID], (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }
    res.json(result);
  });
});

module.exports = router;
