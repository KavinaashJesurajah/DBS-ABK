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
  res.json("Auth server");
});

router.post("/registerUser", (req, res) => {
  const { userName, password, userType, userEmail } = req.body;
  console.log(userName, password);
  if (!userName || !password)
    return res.status(400).json("Missing password or username");

  let sql =
    "INSERT INTO User(Username, Password, UserType, Email) VALUES (?, ?, ?, ?)";
  db.query(sql, [userName, password, userType, userEmail], (err, result) => {
    if (err) {
      if (err.code == "ER_DUP_ENTRY")
        return res
          .status(400)
          .json({ msg: "Username already exists! Please try again" });
      return res.status(400).send(err);
    }

    res.status(200).send({ message: "Username register successfully" });
  });
});

router.post("/loginUser", (req, res) => {
  const { userName, password } = req.body;
  if (userName === "" || password === "")
    return res.status(400).json({ msg: "Please enter username and password" });

  let sql = "SELECT * FROM User WHERE Username =  ?";
  db.query(sql, userName, (err, data) => {
    if (err) {
      return res.send(200);
    }
    console.log(data);
    if (Object.keys(data).length !== 1)
      return res.status(400).json({ msg: "Username not found" });

    if (data[0].Password != password)
      return res.status(400).json({ msg: "Invalid username/password" });

    res.status(200).send({ message: "Username login successfully" });
  });
});

// db.end();
module.exports = router;
