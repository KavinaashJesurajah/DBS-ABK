const express = require("express");
const router = express.Router();
// const config = require("config");
// const mysql = require("mysql");

// const db = mysql.createPool({
//   host: config.get("host"),
//   user: config.get("user"),
//   password: config.get("password"),
//   database: config.get("database"),
// });

router.get("/", (req, res) => {
  res.json("Rso server");
});

module.exports = router;
