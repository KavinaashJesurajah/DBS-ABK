const express = require("express");
const router = express.Router();
const config = require("config");

const mySql = require("mysql2");

// Setup connection
const db = mySql.createPool({
  host: config.get("host"),
  user: config.get("user"),
  password: config.get("password"),
  database: config.get("database"),
});

router.get("/", (req, res) => {
  res.json("Events server");
});

module.exports = router;
