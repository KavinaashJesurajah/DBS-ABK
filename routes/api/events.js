const express = require("express");
const router = express.Router();
const config = require("config");
// const auth =  require('../../middleware/auth');

const mySql = require("mysql2");

// Setup connection
const db = mySql.createPool({
  host: config.get("host"),
  user: config.get("user"),
  password: config.get("password"),
  database: config.get("database"),
});

// @router POST to api/events/
// @desc   Loads public events from the university
// @access Public
router.get("/public", (req, res) => {
  // const { UniversityID } = req.body;

  let sql =
    'SELECT EventID, Event.Name, Description, Time, Date, Location, ContactPhone, ContactEmail FROM Event WHERE Visibility = "public"';

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }
    console.log(result);
    res.status(200).json(result);
    // res.status(200).json({ message: "get public event successfully" });
  });
});

// @router POST to api/events/private
// @desc   Loads public and private events
// @access Private
router.get("/private", (req, res) => {
  // const { UniversityID } = req.body;

  let sql = 'SELECT * FROM Event WHERE Visibility = "private" ';

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }
    res.status(200).json(result);
    // res.status(200).json({ message: "get private event successfully" });
  });
});

// @router POST to api/events/rso
// @desc   Loads public, private, and RSO events
// @access Private
router.get("/rso", (req, res) => {
  // const { UniversityID } = req.body;

  let sql = 'SELECT * FROM Event WHERE Visibility = "rso"';
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }
    res.status(200).json(result);
    // res.status(200).json({ message: "get rso event successfully" });
  });
});

router.post("/create", (req, res) => {
  const {
    Name,
    Description,
    Time,
    Date,
    Location,
    ContactPhone,
    ContactEmail,
    Visibility,
    UniversityID,
  } = req.body;

  // console.log("ROUTE:" + name, category, description, time, date, location, phone, email, status, Events_university_id, Events_RSO_id, Events_admin_id);
  let sql =
    "INSERT INTO Event (Name, Description, Time , Date , Location , ContactPhone , ContactEmail , Visibility, EventUniversityID ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [
      Name,
      Description,
      Time,
      Date,
      Location,
      ContactPhone,
      ContactEmail,
      Visibility,
      UniversityID,
    ],
    (err, result) => {
      if (err) {
        return res.status(400).send(err);
      }

      res.status(200).json({ message: "Create Event Successfully" });
    }
  );
});

module.exports = router;
