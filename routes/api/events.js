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
router.post("/public", (req, res) => {
  const { UniversityID } = req.body;

  let sql =
    'SELECT EventID, Event.Name, Description, Time, Date, Location, ContactPhone, ContactEmail FROM Event INNER JOIN RSO ON Event.RSOID = RSO.RSOID WHERE Visibility = "public" AND EventUniversityID = ?';

  db.query(sql, UniversityID, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }

    res.status(200).json({ message: "get public event successfully" });
  });
});

/*
// @router POST to api/events/
// @desc   Loads public events
// @access Public
router.post('/rating', (req,res) => {
    const {EventID, rating, numRatings, scoreRatings} = req.body;

    let sql = 'UPDATE Event SET rating = ?, numRatings = ?, scoreRatings =? WHERE EventID = ?';
    db.query(sql, [rating, numRatings, scoreRatings, EventID ], (err, result) => {
        if (err)
        {
            return res.status(400).send(err);
        }

        res.json(result);

    });
}); */

// @router POST to api/events/private
// @desc   Loads public and private events
// @access Private
router.post("/private", (req, res) => {
  const { UniversityID } = req.body;

  let sql =
    'SELECT * FROM Event WHERE Visibility = "public" AND EventUniversityID = ?';

  db.query(sql, UniversityID, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }
    res.status(200).json({ message: "get private event successfully" });
  });
});

// @router POST to api/events/rso
// @desc   Loads public, private, and RSO events
// @access Private
router.post("/rso", (req, res) => {
  const { UniversityID } = req.body;

  let sql =
    'SELECT * FROM Event WHERE Visibility = "rso" AND EventUniversityID = ?';
  db.query(sql, UniversityID, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }

    res.status(200).json({ message: "get rso event successfully" });
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
    RSOID,
    Visibility,
    UniversityID,
  } = req.body;

  // console.log("ROUTE:" + name, category, description, time, date, location, phone, email, status, Events_university_id, Events_RSO_id, Events_admin_id);
  let sql =
    "INSERT INTO Event (Name, Description, Time , Date , Location , ContactPhone , ContactEmail , RSOID, Visibility, EventUniversityID ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
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
      RSOID,
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

// router.post("/checkTime", (req, res) => {
//   const { university, Location, Date, Time } = req.body;

//   let sql =
//     "SELECT COUNT(*) as count FROM events WHERE (EventID = ? AND Location = ? AND Date = ? AND Time = ?)";
//   db.query(sql, [university, Location, Date, Time], (err, result) => {
//     res.json(result[0].count);
//   });
// });

// @router POST to api/events/approval
// @desc   Loads events that need admin approval
// @access Private
// router.post("/getUnapprovedEvents", (req, res) => {
//   const { UniversityID } = req.body;

//   let sql =
//     "SELECT EventID, event.Name  AS Name , category, description, time, events.date, Location , ContactPhone , ContactEmail, rsos.name FROM events INNER JOIN rsos ON events.Events_RSO_id = rsos.idRSO WHERE events.approved = 0 AND events.EventID = ?";
//   db.query(sql, UniversityID, (err, result) => {
//     if (err) {
//       return res.status(400).send(err);
//     }

//     res.json(result);
//   });
// });

// @router POST to api/events/approval
// @desc   Loads events that need admin approval
// @access Private
// router.post("/approveEvent", (req, res) => {
//   const { EventID } = req.body;

//   let sql = "UPDATE events SET approved = 1 WHERE EventID = ?";
//   db.query(sql, EventID, (err, result) => {
//     if (err) {
//       return res.status(400).send(err);
//     }

//     res.json(result);
//   });
// });

// @router POST to api/events/approval
// @desc   Loads events that need admin approval
// @access Private
// router.post("/denyEvent", (req, res) => {
//   const { EventID } = req.body;

//   let sql = "DELETE FROM events WHERE EventID = ?";
//   db.query(sql, EventID, (err, result) => {
//     if (err) {
//       return res.status(400).send(err);
//     }

//     res.json(result);
//   });
// });

module.exports = router;

/* const express = require("express");
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

module.exports = router; */
